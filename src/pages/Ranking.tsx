import { useQuery } from '@tanstack/react-query';
import { fetchRanking } from '@/lib/api';
import { useI18n, ui } from '@/lib/i18n';
import AppFooter from '@/components/AppFooter';

const faceEmojis = ['😀', '😊', '😍', '🤩', '😎'];

export default function RankingPage() {
  const { t } = useI18n();

  const { data: ranking, isLoading } = useQuery({
    queryKey: ['ranking'],
    queryFn: fetchRanking,
  });

  return (
    <div className="min-h-screen bg-background text-center pt-8">
      <h1 className="text-primary font-normal text-2xl mb-4">
        {t({ 0: '支持者的反應', 1: 'Reactions by other supporters', 2: 'サポーターの反応' })}
      </h1>

      {/* Face emoji ranking */}
      <div className="flex justify-center gap-4 mb-8">
        {faceEmojis.map((emoji, i) => (
          <div key={i} className="flex flex-col items-center gap-1">
            <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center text-3xl cursor-pointer hover:bg-primary/10 transition-colors">
              {emoji}
            </div>
          </div>
        ))}
      </div>

      {/* Leaderboard */}
      {isLoading ? (
        <p className="text-muted-foreground">Loading...</p>
      ) : ranking && ranking.length > 0 ? (
        <div className="px-[5%]">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b">
                <th className="py-2 text-primary text-sm">#</th>
                <th className="py-2 text-primary text-sm">{t(ui.name)}</th>
                <th className="py-2 text-primary text-sm text-right">{t(ui.badgesCollected)}</th>
                <th className="py-2 text-primary text-sm text-right">{t(ui.totalDonation)}</th>
              </tr>
            </thead>
            <tbody>
              {ranking.map((entry, i) => (
                <tr key={entry.user_id} className="border-b border-muted">
                  <td className="py-3 text-foreground">{i + 1}</td>
                  <td className="py-3 text-foreground">{entry.contact_name}</td>
                  <td className="py-3 text-foreground text-right">{entry.badge_count}</td>
                  <td className="py-3 text-primary font-bold text-right">${entry.total_donated}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-muted-foreground py-8">
          {t({ 0: '還沒有排名資料', 1: 'No ranking data yet', 2: 'ランキングデータがまだありません' })}
        </p>
      )}

      <AppFooter />
    </div>
  );
}
