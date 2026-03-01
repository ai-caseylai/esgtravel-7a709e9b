import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const IMAGES = [
  "badge-kochi.jpg","badge-marine.jpg","badge-palau.jpg","badge-sabah-kinabalu.jpg",
  "badge-sabah-turtle.jpg","badge-sabah-wetland.jpg","badge-tree.jpg",
  "cert-bg.jpg","event-forum.jpg","event-kochi-eco.jpg","event-marine.jpg",
  "event-tree-planting.jpg","feature-badge.jpg","feature-community.jpg","feature-impact.jpg",
  "hero-mobile.jpg","mobile-hero-bg.jpg","passport-bg.jpg",
  "site-events-hero.jpg","site-hero.jpg","site-how-hero.jpg",
  "step-cert.jpg","step-explore.jpg","step-impact.jpg","step-purchase.jpg",
];

// public/badges images
const PUBLIC_BADGES = ["palau.jpg","sabah-kinabalu.jpg","sabah-turtle.jpg","sabah-wetland.jpg"];

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, serviceKey);

    // Get the published site URL from request body or use default
    const body = await req.json().catch(() => ({}));
    const siteUrl = body.siteUrl || "https://esgtra.lovable.app";

    const results: string[] = [];
    const errors: string[] = [];

    // Check existing files
    const { data: existing } = await supabase.storage.from("media").list("", { limit: 500 });
    const existingNames = new Set((existing ?? []).map((f: any) => f.name));

    // Upload src/assets images
    for (const name of IMAGES) {
      if (existingNames.has(name)) {
        results.push(`⏭ ${name} (already exists)`);
        continue;
      }
      try {
        const url = `${siteUrl}/src/assets/${name}`;
        const resp = await fetch(url);
        if (!resp.ok) {
          // Try alternate path
          const resp2 = await fetch(`${siteUrl}/assets/${name}`);
          if (!resp2.ok) {
            errors.push(`❌ ${name}: fetch failed (${resp.status})`);
            continue;
          }
          const blob = await resp2.arrayBuffer();
          const { error } = await supabase.storage.from("media").upload(name, blob, {
            contentType: "image/jpeg",
            upsert: false,
          });
          if (error) throw error;
          results.push(`✅ ${name}`);
          continue;
        }
        const blob = await resp.arrayBuffer();
        const { error } = await supabase.storage.from("media").upload(name, blob, {
          contentType: "image/jpeg",
          upsert: false,
        });
        if (error) throw error;
        results.push(`✅ ${name}`);
      } catch (e: any) {
        errors.push(`❌ ${name}: ${e.message}`);
      }
    }

    // Upload public/badges images
    for (const name of PUBLIC_BADGES) {
      const storageName = `badges-${name}`;
      if (existingNames.has(storageName)) {
        results.push(`⏭ ${storageName} (already exists)`);
        continue;
      }
      try {
        const resp = await fetch(`${siteUrl}/badges/${name}`);
        if (!resp.ok) {
          errors.push(`❌ ${storageName}: fetch failed (${resp.status})`);
          continue;
        }
        const blob = await resp.arrayBuffer();
        const { error } = await supabase.storage.from("media").upload(storageName, blob, {
          contentType: "image/jpeg",
          upsert: false,
        });
        if (error) throw error;
        results.push(`✅ ${storageName}`);
      } catch (e: any) {
        errors.push(`❌ ${storageName}: ${e.message}`);
      }
    }

    return new Response(JSON.stringify({ results, errors, total: results.length + errors.length }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e: any) {
    return new Response(JSON.stringify({ error: e.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
