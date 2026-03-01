import { useQuery } from '@tanstack/react-query';
import { fetchBadges } from '@/lib/api';
import { useI18n } from '@/lib/i18n';
import { useAuth } from '@/lib/auth';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Award, MapPin, ChevronRight, Sparkles } from 'lucide-react';
import heroMobile from '@/assets/hero-mobile.jpg';
import MobileHeader from '@/components/MobileHeader';
import { useMobileContent } from '@/hooks/use-mobile-content';

export default function HomePage() {
  const { lang, setLang, t } = useI18n();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { mc } = useMobileContent();

  const { data: badges } = useQuery({
    queryKey: ['badges', lang],
    queryFn: () => fetchBadges(lang),
  });

  const badgeId = searchParams.get('badge_id');
  const currentBadge = badges?.find(b => String(b.id) === badgeId) || badges?.[0];
  const tr = currentBadge?.translation;

  return (
    <div className="min-h-screen bg-background">
      <MobileHeader title="STAR SDG" />

      <div className="px-5 pt-3 space-y-4 pb-4">
        {/* Featured badge card */}
        {currentBadge && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            onClick={() => navigate(`/mobile/badge/${currentBadge.id}`)}
            className="relative rounded-2xl overflow-hidden cursor-pointer"
          >
            <img src={currentBadge.image_url || heroMobile} alt="" className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/10" />
            <div className="relative p-5 pb-6">
              <div className="flex items-start justify-between mb-6">
                <div className="bg-primary-foreground/20 rounded-xl px-3 py-1.5">
                  <span className="text-primary-foreground text-[11px] font-semibold tracking-wide uppercase">
                    {mc('home', 'featured_label', 'Featured')}
                  </span>
                </div>
                <Sparkles className="w-5 h-5 text-primary-foreground/60" />
              </div>
              <h2 className="text-primary-foreground text-xl font-bold leading-tight mb-1">
                {tr?.home_header || tr?.title || currentBadge.code}
              </h2>
              <p className="text-primary-foreground/70 text-[13px] leading-relaxed line-clamp-2 mb-4">
                {tr?.show_more?.substring(0, 80) || mc('home', 'badge_desc_fallback', 'Support local sustainability projects')}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-primary-foreground font-bold text-lg">${currentBadge.price} USD</span>
                <div className="bg-primary-foreground/20 rounded-full p-2">
                  <ChevronRight className="w-4 h-4 text-primary-foreground" />
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Quick actions */}
        <div className="grid grid-cols-2 gap-3">
          <motion.button
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            onClick={() => navigate('/mobile/badges')}
            className="bg-card rounded-2xl border border-border p-4 text-left"
          >
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-3">
              <Award className="w-5 h-5 text-primary" />
            </div>
            <p className="text-foreground font-semibold text-[14px]">
              {mc('home', 'explore_button', 'Explore')}
            </p>
            <p className="text-muted-foreground text-[12px] mt-0.5">
              {badges?.length ?? 0} {mc('home', 'available_text', 'available')}
            </p>
          </motion.button>

          <motion.button
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            onClick={() => navigate('/mobile/passport')}
            className="bg-card rounded-2xl border border-border p-4 text-left"
          >
            <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center mb-3">
              <MapPin className="w-5 h-5 text-accent" />
            </div>
            <p className="text-foreground font-semibold text-[14px]">
              {mc('home', 'passport_button', 'Passport')}
            </p>
            <p className="text-muted-foreground text-[12px] mt-0.5">
              {mc('home', 'view_collection', 'View collection')}
            </p>
          </motion.button>
        </div>

        {/* Badge list preview */}
        {badges && badges.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-[15px] font-semibold text-foreground">
                {mc('home', 'all_badges_title', 'All Badges')}
              </h3>
              <button
                onClick={() => navigate('/mobile/badges')}
                className="text-[13px] text-primary font-medium bg-transparent border-none"
              >
                {mc('home', 'see_all', 'See all')}
              </button>
            </div>
            <div className="flex gap-3 overflow-x-auto pb-2 -mx-1 px-1 scrollbar-hide">
              {badges.slice(0, 6).map((badge, i) => (
                <motion.div
                  key={badge.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.25 + i * 0.05 }}
                  onClick={() => navigate(`/mobile/badge/${badge.id}`)}
                  className="shrink-0 w-[140px] bg-card rounded-xl border border-border overflow-hidden cursor-pointer"
                >
                  <div className="w-full aspect-square bg-muted flex items-center justify-center">
                    {badge.image_url ? (
                      <img src={badge.image_url} alt="" className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-4xl">🏅</span>
                    )}
                  </div>
                  <div className="p-2.5">
                    <p className="text-foreground text-[12px] font-semibold truncate">
                      {badge.translation?.home_header || badge.code}
                    </p>
                    <p className="text-primary text-[12px] font-bold mt-0.5">${badge.price}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Login CTA */}
        {!user && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.35 }}
            onClick={() => navigate('/mobile/login')}
            className="w-full py-3.5 rounded-2xl bg-card border border-border text-primary font-semibold text-[15px] flex items-center justify-center gap-1"
          >
            {mc('home', 'sign_in_button', 'Sign In')}
            <ChevronRight className="w-4 h-4" />
          </motion.button>
        )}
      </div>
    </div>
  );
}
