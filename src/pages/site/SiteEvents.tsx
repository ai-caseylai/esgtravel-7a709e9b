import { useI18n } from '@/lib/i18n';
import { motion } from 'framer-motion';

export default function SiteEvents() {
  const { lang, t } = useI18n();

  const events = [
    {
      titleKey: { 0: '高知縣生態旅遊體驗', 1: 'Kochi Eco-Tourism Experience', 2: '高知県エコツーリズム体験' },
      descKey: { 0: '與當地社區合作，體驗高知縣的自然生態之美。參加者深入了解當地的可持續發展項目，並親身參與海岸清潔活動。', 1: 'Partner with local communities to experience the natural beauty of Kochi Prefecture. Participants explore sustainable development projects and join coastal cleanup activities.', 2: '地域コミュニティと協力して高知県の自然の美しさを体験。参加者は持続可能な開発プロジェクトを探索し、海岸清掃活動に参加します。' },
      date: '2025-11-15',
      emoji: '🌊',
    },
    {
      titleKey: { 0: '永續旅遊論壇 2025', 1: 'Sustainable Tourism Forum 2025', 2: '持続可能な観光フォーラム2025' },
      descKey: { 0: '匯集全球旅遊業領袖、環保專家及社區代表，探討如何通過創新科技和數碼工具推動旅遊業的永續發展。', 1: 'Bringing together global tourism leaders, environmental experts and community representatives to explore how innovation and digital tools can drive sustainable tourism.', 2: '世界の観光リーダー、環境専門家、コミュニティ代表が集まり、イノベーションとデジタルツールが持続可能な観光をどう推進できるか探ります。' },
      date: '2025-09-20',
      emoji: '🎤',
    },
    {
      titleKey: { 0: '社區植樹活動', 1: 'Community Tree Planting', 2: 'コミュニティ植樹活動' },
      descKey: { 0: '在當地社區舉辦植樹活動，與居民一起為環境保護出一分力。活動同時教育參加者關於碳中和和氣候變化的知識。', 1: 'Organizing tree planting events in local communities, working with residents to contribute to environmental protection while educating participants about carbon neutrality and climate change.', 2: '地域コミュニティで植樹イベントを開催し、住民と共に環境保護に貢献。カーボンニュートラルと気候変動について参加者を教育します。' },
      date: '2025-06-05',
      emoji: '🌱',
    },
    {
      titleKey: { 0: '海洋保育徽章發佈', 1: 'Marine Conservation Badge Launch', 2: '海洋保全バッジ発表' },
      descKey: { 0: '正式發佈海洋保育主題徽章，與多個海洋保護組織合作，將徽章收入的 70% 用於支持珊瑚礁修復和海洋清潔項目。', 1: 'Official launch of marine conservation themed badges, partnering with ocean protection organisations. 70% of badge proceeds support coral reef restoration and ocean cleanup projects.', 2: '海洋保全テーマのバッジを正式に発表。海洋保護団体と提携し、バッジ収益の70%をサンゴ礁修復と海洋清掃プロジェクトに充てます。' },
      date: '2025-03-22',
      emoji: '🐋',
    },
  ];

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-b from-primary/10 to-transparent py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-foreground text-4xl font-bold mb-4">
            {t({ 0: '活動與資訊', 1: 'Events & Activities', 2: 'イベントと活動' })}
          </h1>
          <p className="text-muted-foreground text-lg">
            {t({ 0: '了解我們過去和即將舉辦的活動', 1: 'Discover our past and upcoming events', 2: '過去および今後のイベントをご覧ください' })}
          </p>
        </div>
      </section>

      {/* Events list */}
      <section className="max-w-4xl mx-auto px-4 py-12 space-y-6">
        {events.map((event, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden"
          >
            <div className="flex flex-col md:flex-row">
              {/* Image placeholder */}
              <div className="w-full md:w-48 h-40 md:h-auto bg-muted flex items-center justify-center text-5xl shrink-0">
                {event.emoji}
              </div>
              <div className="p-5 flex-1">
                <p className="text-muted-foreground text-xs mb-1">{event.date}</p>
                <h3 className="text-foreground font-bold text-lg mb-2">{t(event.titleKey)}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{t(event.descKey)}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </section>
    </div>
  );
}
