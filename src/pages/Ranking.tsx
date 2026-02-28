import { useQuery } from '@tanstack/react-query';
import { fetchRanking } from '@/lib/api';
import { useI18n, ui } from '@/lib/i18n';
import MobileHeader from '@/components/MobileHeader';
import { motion } from 'framer-motion';

const faceEmojis = ['😀', '😊', '😍', '🤩', '😎'];

export default function RankingPage() {
  const { t } = useI18n();

  const { data: ranking, isLoading } = useQuery({
    queryKey: ['ranking'],
    queryFn: fetchRanking,
  });

  return (
    <div className="min-h-screen bg-background">
      <MobileHeader title={t({ 0: '排行榜', 1: '排行榜', 2: 'Leaderboard', 3: 'ランキング' })} showBack />

      {/* Reactions */}
      <div className="flex justify-center gap-4 py-6">
        {faceEmojis.map((emoji, i) => (
          <motion.div
            key={i}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: i * 0.06, type: 'spring', stiffness: 400 }}
            className="w-12 h-12 rounded-full bg-muted flex items-center justify-center text-2xl cursor-pointer hover:bg-primary/10 transition-colors"
          >
            {emoji}
          </motion.div>
        ))}
      </div>

      {/* Leaderboard */}
      <div className="px-5">
        {isLoading ? (
          <div className="flex justify-center py-10">
            <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        ) : ranking && ranking.length > 0 ? (
          <div className="bg-card rounded-2xl border border-border overflow-hidden">
            {ranking.map((entry, i) => (
              <div key={entry.user_id} className={`flex items-center gap-3 px-4 py-3 ${i < ranking.length - 1 ? 'border-b border-border' : ''}`}>
                <span className={`w-7 h-7 rounded-full flex items-center justify-center text-[12px] font-bold shrink-0 ${
                  i === 0 ? 'bg-yellow-100 text-yellow-700' : i === 1 ? 'bg-gray-100 text-gray-600' : i === 2 ? 'bg-orange-100 text-orange-700' : 'bg-muted text-muted-foreground'
                }`}>
                  {i + 1}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-foreground text-[14px] font-medium truncate">{entry.contact_name}</p>
                  <p className="text-muted-foreground text-[11px]">{entry.badge_count} {t({ 0: '徽章', 1: '徽章', 2: 'badges', 3: 'バッジ' })}</p>
                </div>
                <span className="text-primary font-bold text-[14px]">${entry.total_donated}</span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground text-center py-10 text-[14px]">
            {t({ 0: '還沒有排名資料', 1: '还没有排名数据', 2: 'No data yet', 3: 'データがありません' })}
          </p>
        )}
      </div>
    </div>
  );
}
