import { useI18n } from '@/lib/i18n';
import { motion } from 'framer-motion';
import eventsHero from '@/assets/site-events-hero.jpg';
import eventKochi from '@/assets/event-kochi-eco.jpg';
import eventForum from '@/assets/event-forum.jpg';
import eventTree from '@/assets/event-tree-planting.jpg';
import eventMarine from '@/assets/event-marine.jpg';

export default function SiteEvents() {
  const { t } = useI18n();

  const events = [
    {
      titleKey: { 0: '高知縣生態旅遊體驗', 1: '高知县生态旅游体验', 2: 'Kochi Eco-Tourism Experience', 3: '高知県エコツーリズム体験' },
      descKey: { 0: '與當地社區合作，體驗高知縣的自然生態之美。參加者深入了解當地的可持續發展項目，並親身參與海岸清潔活動。', 1: '与当地社区合作，体验高知县的自然生态之美。参加者深入了解当地的可持续发展项目，并亲身参与海岸清洁活动。', 2: 'Partner with local communities to experience the natural beauty of Kochi Prefecture. Participants explore sustainable development projects and join coastal cleanup activities.', 3: '地域コミュニティと協力して高知県の自然の美しさを体験。参加者は持続可能な開発プロジェクトを探索し、海岸清掃活動に参加します。' },
      date: '2025-11-15',
      image: eventKochi,
    },
    {
      titleKey: { 0: '永續旅遊論壇 2025', 1: '可持续旅游论坛 2025', 2: 'Sustainable Tourism Forum 2025', 3: '持続可能な観光フォーラム2025' },
      descKey: { 0: '匯集全球旅遊業領袖、環保專家及社區代表，探討如何通過創新科技和數碼工具推動旅遊業的永續發展。', 1: '汇集全球旅游业领袖、环保专家及社区代表，探讨如何通过创新科技和数码工具推动旅游业的可持续发展。', 2: 'Bringing together global tourism leaders, environmental experts and community representatives to explore how innovation and digital tools can drive sustainable tourism.', 3: '世界の観光リーダー、環境専門家、コミュニティ代表が集まり、イノベーションとデジタルツールが持続可能な観光をどう推進できるか探ります。' },
      date: '2025-09-20',
      image: eventForum,
    },
    {
      titleKey: { 0: '社區植樹活動', 1: '社区植树活动', 2: 'Community Tree Planting', 3: 'コミュニティ植樹活動' },
      descKey: { 0: '在當地社區舉辦植樹活動，與居民一起為環境保護出一分力。活動同時教育參加者關於碳中和和氣候變化的知識。', 1: '在当地社区举办植树活动，与居民一起为环境保护出一分力。活动同时教育参加者关于碳中和和气候变化的知识。', 2: 'Organizing tree planting events in local communities, working with residents to contribute to environmental protection while educating participants about carbon neutrality and climate change.', 3: '地域コミュニティで植樹イベントを開催し、住民と共に環境保護に貢献。カーボンニュートラルと気候変動について参加者を教育します。' },
      date: '2025-06-05',
      image: eventTree,
    },
    {
      titleKey: { 0: '海洋保育徽章發佈', 1: '海洋保育徽章发布', 2: 'Marine Conservation Badge Launch', 3: '海洋保全バッジ発表' },
      descKey: { 0: '正式發佈海洋保育主題徽章，與多個海洋保護組織合作，將徽章收入的 70% 用於支持珊瑚礁修復和海洋清潔項目。', 1: '正式发布海洋保育主题徽章，与多个海洋保护组织合作，将徽章收入的 70% 用于支持珊瑚礁修复和海洋清洁项目。', 2: 'Official launch of marine conservation themed badges, partnering with ocean protection organisations. 70% of badge proceeds support coral reef restoration and ocean cleanup projects.', 3: '海洋保全テーマのバッジを正式に発表。海洋保護団体と提携し、バッジ収益の70%をサンゴ礁修復と海洋清掃プロジェクトに充てます。' },
      date: '2025-03-22',
      image: eventMarine,
    },
  ];

  return (
    <div>
      {/* Hero with background */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img src={eventsHero} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/40 to-background" />
        </div>
        <div className="max-w-4xl mx-auto px-4 py-20 text-center relative">
          <h1 className="text-foreground text-4xl font-bold mb-4 drop-shadow-lg">
            {t({ 0: '活動與資訊', 1: '活动与资讯', 2: 'Events & Activities', 3: 'イベントと活動' })}
          </h1>
          <p className="text-foreground/80 text-lg drop-shadow">
            {t({ 0: '了解我們過去和即將舉辦的活動', 1: '了解我们过去和即将举办的活动', 2: 'Discover our past and upcoming events', 3: '過去および今後のイベントをご覧ください' })}
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
              <div className="w-full md:w-64 h-48 md:h-auto overflow-hidden shrink-0">
                <img src={event.image} alt="" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-5 flex-1">
                <p className="text-primary text-xs font-medium mb-1">{event.date}</p>
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
