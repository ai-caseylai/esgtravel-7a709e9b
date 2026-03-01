import { useQuery } from '@tanstack/react-query';
import { fetchUserOrders, fetchBadges } from '@/lib/api';
import { useAuth } from '@/lib/auth';
import { useI18n, ui } from '@/lib/i18n';
import { Link, useNavigate } from 'react-router-dom';
import MobileHeader from '@/components/MobileHeader';
import { motion } from 'framer-motion';
import { Award } from 'lucide-react';
import { useMobileContent } from '@/hooks/use-mobile-content';

export default function PassportPage() {
  const { user } = useAuth();
  const { lang } = useI18n();
  const navigate = useNavigate();
  const { mc } = useMobileContent();

  const { data: orders } = useQuery({
    queryKey: ['orders', user?.id],
    queryFn: () => fetchUserOrders(user!.id),
    enabled: !!user,
  });

  const { data: badges } = useQuery({
    queryKey: ['badges', lang],
    queryFn: () => fetchBadges(lang),
  });

  if (!user) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-4 px-8">
        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
          <Award className="w-8 h-8 text-primary" />
        </div>
        <p className="text-foreground font-semibold text-lg">{mc('passport', 'please_sign_in', 'Please sign in')}</p>
        <button
          onClick={() => navigate('/mobile/login')}
          className="bg-primary text-primary-foreground px-8 py-2.5 rounded-xl border-none text-[15px] font-medium"
        >
          {mc('login', 'page_title', 'Login')}
        </button>
      </div>
    );
  }

  const userBadgeIds = [...new Set(orders?.map(o => o.badge_id) || [])];
  const collectedBadges = badges?.filter(b => userBadgeIds.includes(b.id)) || [];

  return (
    <div className="min-h-screen bg-background">
      <MobileHeader title={mc('passport', 'page_title', 'My Passport')} />

      {/* Stats */}
      <div className="px-5 py-5">
        <div className="bg-card rounded-2xl border border-border p-5">
          <p className="text-muted-foreground text-[13px]">
            {mc('passport', 'badges_collected', 'Badges collected')}
          </p>
          <p className="text-[36px] font-bold text-foreground leading-tight">{userBadgeIds.length}</p>
        </div>
      </div>

      {/* Collected badges */}
      {collectedBadges.length > 0 ? (
        <div className="px-5 space-y-3">
          <h3 className="text-[15px] font-semibold text-foreground">
            {mc('passport', 'my_badges', 'My Badges')}
          </h3>
          {collectedBadges.map((badge, i) => (
            <motion.div
              key={badge.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <Link to={`/mobile/badge/${badge.id}`} className="no-underline">
                <div className="bg-card rounded-xl border border-border p-3 flex items-center gap-3 active:bg-muted transition-colors">
                  <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center shrink-0">
                    {badge.image_url ? (
                      <img src={badge.image_url} alt="" className="w-full h-full object-cover rounded-lg" />
                    ) : (
                      <span className="text-2xl">🏅</span>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-foreground font-semibold text-[14px] truncate">
                      {badge.translation?.home_header || badge.code}
                    </p>
                    <p className="text-muted-foreground text-[12px] truncate">
                      {badge.translation?.title}
                    </p>
                  </div>
                  <span className="text-primary text-[13px] font-medium shrink-0">
                    {mc('passport', 'view', 'View')}
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-16 px-8">
          <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mb-4">
            <Award className="w-10 h-10 text-muted-foreground" />
          </div>
          <p className="text-muted-foreground text-center mb-4">
            {mc('passport', 'no_badges', 'No badges collected yet')}
          </p>
          <button
            onClick={() => navigate('/mobile/badges')}
            className="bg-primary text-primary-foreground px-6 py-2.5 rounded-xl border-none text-[14px] font-medium"
          >
            {mc('passport', 'explore_badges', 'Explore Badges')}
          </button>
        </div>
      )}
    </div>
  );
}
