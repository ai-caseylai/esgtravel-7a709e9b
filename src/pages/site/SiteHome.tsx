import { Link } from 'react-router-dom';
import { useI18n } from '@/lib/i18n';
import { motion } from 'framer-motion';
import { ArrowRight, Globe, Award, Heart, Users, Home, Wheat, HeartPulse, GraduationCap, Equal, Droplets, Zap, Briefcase, Lightbulb, Scale, Building2, Recycle, Leaf, Fish, TreePine, Shield, Handshake } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import siteHero from '@/assets/site-hero.jpg';
import featureBadge from '@/assets/feature-badge.jpg';
import featureCommunity from '@/assets/feature-community.jpg';
import featureImpact from '@/assets/feature-impact.jpg';

const sdgs: { id: number; color: string; en: string; zh: string; ja: string; icon: LucideIcon }[] = [
  { id: 1, color: '#E5243B', en: 'No Poverty', zh: '消除貧窮', ja: '貧困をなくそう', icon: Home },
  { id: 2, color: '#DDA63A', en: 'Zero Hunger', zh: '消除飢餓', ja: '飢餓をゼロに', icon: Wheat },
  { id: 3, color: '#4C9F38', en: 'Good Health', zh: '健康與福祉', ja: '健康と福祉', icon: HeartPulse },
  { id: 4, color: '#C5192D', en: 'Quality Education', zh: '優質教育', ja: '質の高い教育', icon: GraduationCap },
  { id: 5, color: '#FF3A21', en: 'Gender Equality', zh: '性別平等', ja: 'ジェンダー平等', icon: Equal },
  { id: 6, color: '#26BDE2', en: 'Clean Water', zh: '清潔飲水', ja: '安全な水', icon: Droplets },
  { id: 7, color: '#FCC30B', en: 'Clean Energy', zh: '清潔能源', ja: 'クリーンエネルギー', icon: Zap },
  { id: 8, color: '#A21942', en: 'Decent Work', zh: '體面工作', ja: '働きがい', icon: Briefcase },
  { id: 9, color: '#FD6925', en: 'Innovation', zh: '產業創新', ja: 'イノベーション', icon: Lightbulb },
  { id: 10, color: '#DD1367', en: 'Reduced Inequalities', zh: '減少不平等', ja: '不平等の是正', icon: Scale },
  { id: 11, color: '#FD9D24', en: 'Sustainable Cities', zh: '永續城市', ja: '持続可能な都市', icon: Building2 },
  { id: 12, color: '#BF8B2E', en: 'Responsible Consumption', zh: '負責任消費', ja: '責任ある消費', icon: Recycle },
  { id: 13, color: '#3F7E44', en: 'Climate Action', zh: '氣候行動', ja: '気候変動対策', icon: Leaf },
  { id: 14, color: '#0A97D9', en: 'Life Below Water', zh: '水下生態', ja: '海の豊かさ', icon: Fish },
  { id: 15, color: '#56C02B', en: 'Life on Land', zh: '陸地生態', ja: '陸の豊かさ', icon: TreePine },
  { id: 16, color: '#00689D', en: 'Peace & Justice', zh: '和平正義', ja: '平和と公正', icon: Shield },
  { id: 17, color: '#19486A', en: 'Partnerships', zh: '夥伴關係', ja: 'パートナーシップ', icon: Handshake },
];

export default function SiteHome() {
  const { lang, t } = useI18n();

  const getSdgName = (s: typeof sdgs[0]) => lang === 0 ? s.zh : lang === 2 ? s.ja : s.en;

  const features = [
    { icon: Globe, image: siteHero, titleKey: { 0: '可持續旅遊', 1: 'Sustainable Tourism', 2: '持続可能な観光' }, descKey: { 0: '通過數碼徽章推動負責任的旅遊方式，保護我們的地球。', 1: 'Promote responsible tourism through digital badges to protect our planet.', 2: 'デジタルバッジを通じて責任ある観光を推進し、地球を守ります。' } },
    { icon: Award, image: featureBadge, titleKey: { 0: '數碼徽章', 1: 'Digital Badges', 2: 'デジタルバッジ' }, descKey: { 0: '收集各地的可持續旅遊徽章，記錄你的影響力。', 1: 'Collect sustainable tourism badges from around the world.', 2: '世界中の持続可能な観光バッジを集めましょう。' } },
    { icon: Heart, image: featureImpact, titleKey: { 0: '社會影響', 1: 'Social Impact', 2: '社会的影響' }, descKey: { 0: '70% 的費用投放於當地可持續發展項目。', 1: '70% of proceeds go to local sustainable development projects.', 2: '収益の70%は地域の持続可能な開発プロジェクトに使われます。' } },
    { icon: Users, image: featureCommunity, titleKey: { 0: '全球社群', 1: 'Global Community', 2: 'グローバルコミュニティ' }, descKey: { 0: '加入全球可持續旅遊大使社群。', 1: 'Join a global community of sustainable travel ambassadors.', 2: '持続可能な旅行大使のグローバルコミュニティに参加しましょう。' } },
  ];

  return (
    <div>
      {/* Hero with background image */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img src={siteHero} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/50 to-background" />
        </div>
        <div className="max-w-6xl mx-auto px-4 pt-24 pb-32 relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-foreground text-4xl md:text-6xl font-bold leading-tight mb-6 drop-shadow-lg">
              {t({ 0: '用旅遊改變世界', 1: 'Change the World Through Travel', 2: '旅行で世界を変えよう' })}
            </h1>
            <p className="text-foreground/80 text-lg md:text-xl mb-8 leading-relaxed drop-shadow">
              {t({ 0: 'STAR SDG 計劃透過數碼徽章，將旅遊與聯合國永續發展目標結合，讓每一次旅行都成為對地球的貢獻。', 1: 'The STAR SDG programme connects tourism with UN Sustainable Development Goals through digital badges, making every trip a contribution to the planet.', 2: 'STAR SDGプログラムはデジタルバッジを通じて観光と国連の持続可能な開発目標を結びつけ、すべての旅を地球への貢献にします。' })}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a href="https://apps.apple.com" target="_blank" rel="noopener noreferrer" className="bg-foreground text-background px-6 py-3 rounded-xl text-lg font-medium no-underline flex items-center justify-center gap-3 hover:opacity-90 transition-opacity shadow-lg">
                <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/></svg>
                App Store
              </a>
              <a href="https://play.google.com" target="_blank" rel="noopener noreferrer" className="bg-foreground text-background px-6 py-3 rounded-xl text-lg font-medium no-underline flex items-center justify-center gap-3 hover:opacity-90 transition-opacity shadow-lg">
                <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current"><path d="M3.18 23.67c-.413-.15-.725-.477-.876-.893-.07-.19-.104-.39-.104-.6V1.82c0-.21.034-.41.104-.6.15-.416.463-.742.876-.893L13.54 11.99 3.18 23.67zm1.447.18l11.39-6.57-2.49-2.49-8.9 9.06zm13.55-7.82L5.65.53l8.9 9.06 2.49-2.49-11.39-6.57 12.53 7.23 1.96-1.13c.5-.29.81-.81.81-1.38s-.31-1.09-.81-1.38l-1.96-1.13z" transform="translate(1,1) scale(0.9)"/></svg>
                Google Play
              </a>
            </div>
            <div className="mt-4">
              <Link to="/site/how-it-works" className="text-foreground/70 underline underline-offset-4 hover:text-foreground transition-colors">
                {t({ 0: '了解更多', 1: 'Learn More', 2: '詳しく見る' })}
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Programme Introduction */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-foreground text-3xl font-bold mb-3">
            {t({ 0: '計劃介紹', 1: 'About the Programme', 2: 'プログラム紹介' })}
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {t({ 0: 'STAR SDG 是一個結合旅遊與可持續發展的創新計劃，透過購買數碼徽章，旅客可以直接支持當地的環保及社區發展項目。', 1: 'STAR SDG is an innovative programme combining tourism and sustainability. By purchasing digital badges, travellers directly support local environmental and community projects.', 2: 'STAR SDGは観光と持続可能性を組み合わせた革新的なプログラムです。デジタルバッジを購入することで、旅行者は地域の環境およびコミュニティプロジェクトを直接支援します。' })}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-card rounded-2xl border border-border overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className="w-full h-40 overflow-hidden">
                <img src={f.image} alt="" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-5 text-center">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-3">
                  <f.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="text-foreground font-semibold mb-2">{t(f.titleKey)}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{t(f.descKey)}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 17 SDGs */}
      <section className="bg-muted/50 py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-foreground text-3xl font-bold mb-3">
              {t({ 0: '聯合國 17 項永續發展目標', 1: 'UN 17 Sustainable Development Goals', 2: '国連17の持続可能な開発目標' })}
            </h2>
            <p className="text-muted-foreground text-lg">
              {t({ 0: '我們的計劃涵蓋以下聯合國永續發展目標', 1: 'Our programme covers the following UN SDGs', 2: '私たちのプログラムは以下の国連SDGsをカバーしています' })}
            </p>
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
            {sdgs.map(sdg => {
              const SdgIcon = sdg.icon;
              return (
                <motion.div
                  key={sdg.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: sdg.id * 0.03 }}
                  className="rounded-xl p-3 text-center cursor-default hover:scale-105 transition-transform"
                  style={{ backgroundColor: sdg.color }}
                >
                  <SdgIcon className="w-6 h-6 text-white/90 mx-auto mb-1" strokeWidth={1.5} />
                  <span className="text-white font-bold text-sm block">{sdg.id}</span>
                  <span className="text-white/90 text-[10px] font-medium block leading-tight mt-0.5">
                    {getSdgName(sdg)}
                  </span>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA with background */}
      <section className="relative overflow-hidden py-20">
        <div className="absolute inset-0">
          <img src={featureCommunity} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" />
        </div>
        <div className="max-w-6xl mx-auto px-4 text-center relative">
          <h2 className="text-foreground text-3xl font-bold mb-4">
            {t({ 0: '準備好成為可持續旅遊大使了嗎？', 1: 'Ready to become a Sustainable Travel Ambassador?', 2: '持続可能な観光大使になる準備はできましたか？' })}
          </h2>
          <p className="text-muted-foreground text-lg mb-6 max-w-xl mx-auto">
            {t({ 0: '加入我們，一起為地球的可持續未來出一分力。', 1: 'Join us and contribute to a sustainable future for our planet.', 2: '私たちと一緒に、地球の持続可能な未来に貢献しましょう。' })}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a href="https://apps.apple.com" target="_blank" rel="noopener noreferrer" className="bg-foreground text-background px-6 py-3 rounded-xl text-lg font-medium no-underline flex items-center justify-center gap-3 hover:opacity-90 transition-opacity shadow-lg">
              <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/></svg>
              App Store
            </a>
            <a href="https://play.google.com" target="_blank" rel="noopener noreferrer" className="bg-foreground text-background px-6 py-3 rounded-xl text-lg font-medium no-underline flex items-center justify-center gap-3 hover:opacity-90 transition-opacity shadow-lg">
              <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current"><path d="M3.18 23.67c-.413-.15-.725-.477-.876-.893-.07-.19-.104-.39-.104-.6V1.82c0-.21.034-.41.104-.6.15-.416.463-.742.876-.893L13.54 11.99 3.18 23.67zm1.447.18l11.39-6.57-2.49-2.49-8.9 9.06zm13.55-7.82L5.65.53l8.9 9.06 2.49-2.49-11.39-6.57 12.53 7.23 1.96-1.13c.5-.29.81-.81.81-1.38s-.31-1.09-.81-1.38l-1.96-1.13z" transform="translate(1,1) scale(0.9)"/></svg>
              Google Play
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
