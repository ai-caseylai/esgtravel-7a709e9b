import { useQuery } from '@tanstack/react-query';
import { fetchRanking } from '@/lib/api';
import { useI18n, ui } from '@/lib/i18n';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Trophy, Medal, Award } from 'lucide-react';
import { motion } from 'framer-motion';

const rankIcons = [Trophy, Medal, Award];
const rankColors = ['text-accent', 'text-muted-foreground', 'text-earth'];

export default function RankingPage() {
  const { t } = useI18n();

  const { data: ranking, isLoading } = useQuery({
    queryKey: ['ranking'],
    queryFn: fetchRanking,
  });

  return (
    <div className="container py-8 md:py-16">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-10">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-accent/10">
            <Trophy className="h-8 w-8 text-accent" />
          </div>
          <h1 className="text-3xl font-bold">{t(ui.ranking)}</h1>
          <p className="text-muted-foreground mt-2">
            {t({ 0: '可持續旅遊大使排行', 1: 'Sustainable Travel Ambassador Rankings', 2: '持続可能な観光大使ランキング' })}
          </p>
        </div>

        {isLoading ? (
          <div className="space-y-3">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-16 bg-muted animate-pulse rounded-xl" />
            ))}
          </div>
        ) : ranking?.length === 0 ? (
          <p className="text-center text-muted-foreground py-16">
            {t({ 0: '還沒有排名資料', 1: 'No ranking data yet', 2: 'ランキングデータがまだありません' })}
          </p>
        ) : (
          <div className="space-y-3">
            {ranking?.map((entry, i) => {
              const RankIcon = rankIcons[i] || Award;
              const rankColor = rankColors[i] || 'text-muted-foreground';

              return (
                <motion.div
                  key={entry.user_id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Card className={`border-0 shadow-sm ${i < 3 ? 'shadow-md' : ''}`}>
                    <CardContent className="flex items-center gap-4 py-4">
                      <div className={`flex h-10 w-10 items-center justify-center rounded-full ${i < 3 ? 'bg-accent/10' : 'bg-muted'}`}>
                        {i < 3 ? (
                          <RankIcon className={`h-5 w-5 ${rankColor}`} />
                        ) : (
                          <span className="text-sm font-bold text-muted-foreground">#{i + 1}</span>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold truncate">{entry.contact_name}</p>
                        <p className="text-xs text-muted-foreground">
                          {entry.badge_count} {t(ui.badgesCollected)}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-primary">${entry.total_donated}</p>
                        <p className="text-xs text-muted-foreground">{t(ui.totalDonation)}</p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
