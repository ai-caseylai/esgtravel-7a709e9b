import { useQuery } from '@tanstack/react-query';
import { fetchBadges } from '@/lib/api';
import { useI18n } from '@/lib/i18n';
import { Link } from 'react-router-dom';
import MobileHeader from '@/components/MobileHeader';
import { motion } from 'framer-motion';

export default function BadgesListPage() {
  const { lang, t } = useI18n();

  const { data: badges, isLoading } = useQuery({
    queryKey: ['badges', lang],
    queryFn: () => fetchBadges(lang),
  });

  return (
    <div className="min-h-screen bg-background">
      <MobileHeader title={t({ 0: '數碼徽章', 1: '数码徽章', 2: 'Digital Badges', 3: 'デジタルバッジ' })} />

      {isLoading ? (
        <div className="flex justify-center py-20">
          <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      ) : (
        <div className="p-4 grid grid-cols-2 gap-3">
          {badges?.map((badge, i) => {
            const tr = badge.translation;
            return (
              <motion.div
                key={badge.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <Link to={`/mobile/badge/${badge.id}`} className="no-underline">
                  <div className="bg-card rounded-2xl border border-border overflow-hidden active:scale-[0.97] transition-transform">
                    <div className="w-full aspect-square bg-muted flex items-center justify-center">
                      {badge.image_url ? (
                        <img src={badge.image_url} alt={tr?.title || ''} className="w-full h-full object-cover" />
                      ) : (
                        <span className="text-5xl">🏅</span>
                      )}
                    </div>
                    <div className="p-3">
                      <p className="text-foreground font-semibold text-[13px] truncate">
                        {tr?.home_header || badge.code}
                      </p>
                      <p className="text-muted-foreground text-[11px] mt-0.5 truncate">
                        {tr?.title}
                      </p>
                      <p className="text-primary font-bold text-[14px] mt-1.5">
                        ${badge.price} USD
                      </p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}
