import { useQuery } from '@tanstack/react-query';
import { fetchBadges } from '@/lib/api';
import { useI18n, ui } from '@/lib/i18n';
import { Link } from 'react-router-dom';
import AppFooter from '@/components/AppFooter';

export default function BadgesListPage() {
  const { lang, t } = useI18n();

  const { data: badges, isLoading } = useQuery({
    queryKey: ['badges', lang],
    queryFn: () => fetchBadges(lang),
  });

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="pt-6 pb-4 text-center">
        <h1 className="text-primary font-bold text-2xl">
          {t({ 0: '數碼徽章', 1: '数码徽章', 2: 'Digital Badges', 3: 'デジタルバッジ' })}
        </h1>
        <p className="text-muted-foreground text-sm mt-1">
          {t({ 0: '探索所有可用徽章', 1: '探索所有可用徽章', 2: 'Explore all available badges', 3: 'すべてのバッジを探す' })}
        </p>
      </div>

      {/* Badge grid */}
      {isLoading ? (
        <div className="flex justify-center py-12">
          <div className="animate-pulse text-muted-foreground">Loading...</div>
        </div>
      ) : (
        <div className="px-4 grid grid-cols-2 gap-4">
          {badges?.map(badge => {
            const tr = badge.translation;
            return (
              <Link key={badge.id} to={`/badge/${badge.id}`} className="no-underline">
                <div className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                  <div className="w-full aspect-square bg-muted flex items-center justify-center">
                    {badge.image_url ? (
                      <img src={badge.image_url} alt={tr?.title || ''} className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-5xl">🏅</span>
                    )}
                  </div>
                  <div className="p-3">
                    <p className="text-foreground font-semibold text-sm truncate">
                      {tr?.home_header || badge.code}
                    </p>
                    <p className="text-muted-foreground text-xs mt-1 truncate">
                      {tr?.title}
                    </p>
                    <p className="text-primary font-bold text-sm mt-2">
                      ${badge.price} USD
                    </p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}

      <AppFooter />
    </div>
  );
}
