import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
}

function json(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), { status, headers: { ...corsHeaders, 'Content-Type': 'application/json' } })
}

function err(message: string, status = 400) {
  return json({ error: message }, status)
}

// DB lang mapping: frontend 0=繁中,1=簡中,2=en,3=ja → DB 0=zh,1=en,2=ja
function toDbLang(lang: number): number {
  const map: Record<number, number> = { 0: 0, 1: 0, 2: 1, 3: 2 }
  return map[lang] ?? 0
}

function createSupabaseClient(authHeader?: string | null) {
  const url = Deno.env.get('SUPABASE_URL')!
  const anonKey = Deno.env.get('SUPABASE_ANON_KEY')!
  const opts: any = {}
  if (authHeader) {
    opts.global = { headers: { Authorization: authHeader } }
  }
  return createClient(url, anonKey, opts)
}

function createServiceClient() {
  return createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
  )
}

async function getUser(supabase: any, authHeader: string) {
  const token = authHeader.replace('Bearer ', '')
  const { data, error } = await supabase.auth.getClaims(token)
  if (error || !data?.claims) return null
  return { id: data.claims.sub, email: data.claims.email }
}

function parseRoute(url: string): { path: string; segments: string[]; params: URLSearchParams } {
  const u = new URL(url)
  // Edge function path: /mobile-api/...
  const fullPath = u.pathname.replace(/^\/mobile-api\/?/, '')
  const segments = fullPath.split('/').filter(Boolean)
  return { path: fullPath, segments, params: u.searchParams }
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const authHeader = req.headers.get('Authorization')
    const supabase = createSupabaseClient(authHeader)
    const { segments, params } = parseRoute(req.url)
    const method = req.method
    const resource = segments[0] || ''

    // ─── BADGES ───
    if (resource === 'badges') {
      if (method === 'GET' && segments.length === 1) {
        // GET /badges?lang=0
        const lang = toDbLang(Number(params.get('lang') ?? 0))
        const { data: badges, error: bErr } = await supabase
          .from('badges').select('*').eq('is_active', true).order('id')
        if (bErr) return err(bErr.message, 500)

        const { data: translations } = await supabase
          .from('badge_translations').select('*').eq('lang', lang)

        const result = (badges || []).map((b: any) => ({
          ...b,
          translation: (translations || []).find((t: any) => t.badge_id === b.id) || null,
        }))
        return json(result)
      }

      if (method === 'GET' && segments.length === 2) {
        // GET /badges/:id?lang=0
        const badgeId = Number(segments[1])
        const lang = toDbLang(Number(params.get('lang') ?? 0))

        const { data: badge, error: bErr } = await supabase
          .from('badges').select('*').eq('id', badgeId).single()
        if (bErr) return err('Badge not found', 404)

        const { data: translation } = await supabase
          .from('badge_translations').select('*')
          .eq('badge_id', badgeId).eq('lang', lang).single()

        // SDG goals
        const { data: sdgs } = await supabase
          .from('sdg_badges').select('sdg_id').eq('badge_id', badgeId)

        return json({ ...badge, translation: translation || null, sdg_ids: (sdgs || []).map((s: any) => s.sdg_id) })
      }
    }

    // ─── ORDERS ───
    if (resource === 'orders') {
      if (!authHeader) return err('Unauthorized', 401)
      const user = await getUser(supabase, authHeader)
      if (!user) return err('Unauthorized', 401)

      if (method === 'GET') {
        // GET /orders
        const { data, error: oErr } = await supabase
          .from('orders').select('*, badges(code, image_url)')
          .eq('user_id', user.id)
          .eq('payment_status', 'paid')
          .order('created_at', { ascending: false })
        if (oErr) return err(oErr.message, 500)
        return json(data || [])
      }

      if (method === 'POST') {
        // POST /orders { badge_id, extra_help, payment_method }
        const body = await req.json()
        const { badge_id, extra_help = 0, payment_method = 'card' } = body

        // Fetch badge price
        const { data: badge } = await supabase
          .from('badges').select('id, price').eq('id', badge_id).eq('is_active', true).single()
        if (!badge) return err('Badge not found or inactive', 404)

        const { data: order, error: oErr } = await supabase
          .from('orders').insert({
            user_id: user.id,
            badge_id: badge.id,
            price: badge.price,
            extra_help,
            payment_method,
            payment_status: 'paid',
          }).select().single()

        if (oErr) return err(oErr.message, 500)
        return json(order, 201)
      }
    }

    // ─── PROFILE ───
    if (resource === 'profile') {
      if (!authHeader) return err('Unauthorized', 401)
      const user = await getUser(supabase, authHeader)
      if (!user) return err('Unauthorized', 401)

      if (method === 'GET') {
        const { data, error: pErr } = await supabase
          .from('profiles').select('*').eq('id', user.id).single()
        if (pErr) return err('Profile not found', 404)
        return json({ ...data, email: user.email })
      }

      if (method === 'PUT' || method === 'PATCH') {
        const body = await req.json()
        const allowed = ['contact_name', 'mobile', 'country_code', 'avatar_url', 'lang']
        const updates: any = {}
        for (const key of allowed) {
          if (body[key] !== undefined) updates[key] = body[key]
        }
        const { data, error: uErr } = await supabase
          .from('profiles').update(updates).eq('id', user.id).select().single()
        if (uErr) return err(uErr.message, 500)
        return json(data)
      }
    }

    // ─── RANKINGS ───
    if (resource === 'rankings' && method === 'GET') {
      const serviceClient = createServiceClient()
      const { data: orders, error: oErr } = await serviceClient
        .from('orders').select('user_id, price, extra_help').eq('payment_status', 'paid')
      if (oErr) return err(oErr.message, 500)

      const userMap = new Map<string, { badge_count: number; total_donated: number }>()
      ;(orders || []).forEach((o: any) => {
        const existing = userMap.get(o.user_id) || { badge_count: 0, total_donated: 0 }
        existing.badge_count += 1
        existing.total_donated += o.price + o.extra_help
        userMap.set(o.user_id, existing)
      })

      const userIds = Array.from(userMap.keys())
      const { data: profiles } = await serviceClient
        .from('profiles').select('id, contact_name, avatar_url').in('id', userIds)

      const result = Array.from(userMap.entries())
        .map(([user_id, stats]) => {
          const profile = profiles?.find((p: any) => p.id === user_id)
          return {
            user_id,
            contact_name: profile?.contact_name || 'Anonymous',
            avatar_url: profile?.avatar_url || null,
            ...stats,
          }
        })
        .sort((a, b) => b.badge_count - a.badge_count || b.total_donated - a.total_donated)

      return json(result)
    }

    // ─── MOBILE CONTENT ───
    if (resource === 'mobile-content' && method === 'GET') {
      const section = params.get('section')
      let query = supabase.from('mobile_content').select('*').order('sort_order', { ascending: true })
      if (section) query = query.eq('section', section)
      const { data, error: cErr } = await query
      if (cErr) return err(cErr.message, 500)
      return json(data || [])
    }

    // ─── SITE CONTENT ───
    if (resource === 'site-content' && method === 'GET') {
      const { data, error: cErr } = await supabase.from('site_content').select('*')
      if (cErr) return err(cErr.message, 500)
      return json(data || [])
    }

    // ─── POSTS / BLOG ───
    if (resource === 'posts') {
      if (method === 'GET' && segments.length === 1) {
        const lang = toDbLang(Number(params.get('lang') ?? 0))
        const category = params.get('category') || 'blog'
        const limit = Math.min(Number(params.get('limit') || 20), 100)
        const offset = Number(params.get('offset') || 0)

        const { data: posts, error: pErr } = await supabase
          .from('posts').select('*')
          .eq('is_published', true).eq('category', category)
          .order('created_at', { ascending: false })
          .range(offset, offset + limit - 1)
        if (pErr) return err(pErr.message, 500)

        const postIds = (posts || []).map((p: any) => p.id)
        const { data: translations } = await supabase
          .from('post_translations').select('*')
          .in('post_id', postIds).eq('lang', lang)

        const result = (posts || []).map((p: any) => ({
          ...p,
          translation: (translations || []).find((t: any) => t.post_id === p.id) || null,
        }))
        return json(result)
      }

      if (method === 'GET' && segments.length === 2) {
        const slug = segments[1]
        const lang = toDbLang(Number(params.get('lang') ?? 0))

        const { data: post, error: pErr } = await supabase
          .from('posts').select('*').eq('slug', slug).eq('is_published', true).single()
        if (pErr) return err('Post not found', 404)

        const { data: translation } = await supabase
          .from('post_translations').select('*')
          .eq('post_id', post.id).eq('lang', lang).single()

        return json({ ...post, translation: translation || null })
      }
    }

    // ─── COUNTRY CODES ───
    if (resource === 'country-codes' && method === 'GET') {
      const { data, error: cErr } = await supabase
        .from('country_codes').select('*').eq('is_active', true).order('country_name')
      if (cErr) return err(cErr.message, 500)
      return json(data || [])
    }

    // ─── AUTH ───
    if (resource === 'auth') {
      const action = segments[1]

      if (action === 'signup' && method === 'POST') {
        const { email, password, contact_name } = await req.json()
        if (!email || !password) return err('Email and password required')
        const anonClient = createSupabaseClient()
        const { data, error: sErr } = await anonClient.auth.signUp({
          email, password,
          options: { data: { contact_name: contact_name || '' } },
        })
        if (sErr) return err(sErr.message, 422)
        return json({ user: data.user, session: data.session }, 201)
      }

      if (action === 'login' && method === 'POST') {
        const { email, password } = await req.json()
        if (!email || !password) return err('Email and password required')
        const anonClient = createSupabaseClient()
        const { data, error: lErr } = await anonClient.auth.signInWithPassword({ email, password })
        if (lErr) return err(lErr.message, 401)
        return json({ user: data.user, session: data.session })
      }

      if (action === 'refresh' && method === 'POST') {
        const { refresh_token } = await req.json()
        if (!refresh_token) return err('refresh_token required')
        const anonClient = createSupabaseClient()
        const { data, error: rErr } = await anonClient.auth.refreshSession({ refresh_token })
        if (rErr) return err(rErr.message, 401)
        return json({ user: data.user, session: data.session })
      }

      if (action === 'logout' && method === 'POST') {
        if (!authHeader) return err('Unauthorized', 401)
        const { error: lErr } = await supabase.auth.signOut()
        if (lErr) return err(lErr.message, 500)
        return json({ success: true })
      }

      if (action === 'reset-password' && method === 'POST') {
        const { email } = await req.json()
        if (!email) return err('Email required')
        const anonClient = createSupabaseClient()
        const { error: rErr } = await anonClient.auth.resetPasswordForEmail(email)
        if (rErr) return err(rErr.message, 422)
        return json({ success: true })
      }
    }

    return err('Not found', 404)
  } catch (e: any) {
    return err(e.message || 'Internal server error', 500)
  }
})
