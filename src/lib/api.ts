import { supabase } from '@/integrations/supabase/client';

export interface Badge {
  id: number;
  code: string;
  price: number;
  image_url: string | null;
  map_url: string | null;
  is_active: boolean;
}

export interface BadgeTranslation {
  id: number;
  badge_id: number;
  lang: number;
  home_header: string | null;
  title: string | null;
  show_more: string | null;
  content: string | null;
  details: string | null;
  summary: string | null;
  impact: string | null;
}

export interface BadgeWithTranslation extends Badge {
  translation: BadgeTranslation | null;
}

export async function fetchBadges(lang: number): Promise<BadgeWithTranslation[]> {
  const { data: badges, error: badgesErr } = await supabase
    .from('badges')
    .select('*')
    .eq('is_active', true)
    .order('id');

  if (badgesErr) throw badgesErr;

  const { data: translations, error: transErr } = await supabase
    .from('badge_translations')
    .select('*')
    .eq('lang', lang);

  if (transErr) throw transErr;

  return (badges || []).map(badge => ({
    ...badge,
    translation: (translations || []).find(t => t.badge_id === badge.id) || null,
  }));
}

export async function fetchBadgeDetail(badgeId: number, lang: number): Promise<BadgeWithTranslation | null> {
  const { data: badge, error: badgeErr } = await supabase
    .from('badges')
    .select('*')
    .eq('id', badgeId)
    .single();

  if (badgeErr) return null;

  const { data: translation } = await supabase
    .from('badge_translations')
    .select('*')
    .eq('badge_id', badgeId)
    .eq('lang', lang)
    .single();

  return { ...badge, translation: translation || null };
}

export interface Order {
  id: number;
  user_id: string;
  badge_id: number;
  price: number;
  extra_help: number;
  payment_status: string;
  created_at: string;
}

export async function fetchUserOrders(userId: string): Promise<Order[]> {
  const { data, error } = await supabase
    .from('orders')
    .select('*')
    .eq('user_id', userId)
    .eq('payment_status', 'paid')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data || [];
}

export async function fetchRanking(): Promise<{ user_id: string; contact_name: string; badge_count: number; total_donated: number }[]> {
  const { data: orders, error } = await supabase
    .from('orders')
    .select('user_id, price, extra_help')
    .eq('payment_status', 'paid');

  if (error) throw error;

  const userMap = new Map<string, { badge_count: number; total_donated: number }>();
  (orders || []).forEach(o => {
    const existing = userMap.get(o.user_id) || { badge_count: 0, total_donated: 0 };
    existing.badge_count += 1;
    existing.total_donated += o.price + o.extra_help;
    userMap.set(o.user_id, existing);
  });

  const userIds = Array.from(userMap.keys());
  const { data: profiles } = await supabase
    .from('profiles')
    .select('id, contact_name')
    .in('id', userIds);

  return Array.from(userMap.entries())
    .map(([user_id, stats]) => ({
      user_id,
      contact_name: profiles?.find(p => p.id === user_id)?.contact_name || 'Anonymous',
      ...stats,
    }))
    .sort((a, b) => b.badge_count - a.badge_count || b.total_donated - a.total_donated);
}
