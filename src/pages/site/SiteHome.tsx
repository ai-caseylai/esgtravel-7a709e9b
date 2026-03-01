import { Link } from 'react-router-dom';
import { useI18n } from '@/lib/i18n';
import { useSiteContent } from '@/hooks/use-site-content';
import { motion } from 'framer-motion';
import { Globe, Award, Heart, Users, Home, Wheat, HeartPulse, GraduationCap, Equal, Droplets, Zap, Briefcase, Lightbulb, Scale, Building2, Recycle, Leaf, Fish, TreePine, Shield, Handshake } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import siteHero from '@/assets/site-hero.jpg';
import featureBadge from '@/assets/feature-badge.jpg';
import featureCommunity from '@/assets/feature-community.jpg';
import featureImpact from '@/assets/feature-impact.jpg';

const sdgs: { id: number; color: string; en: string; zhTw: string; zhCn: string; ja: string; icon: LucideIcon }[] = [
  { id: 1, color: '#E5243B', en: 'No Poverty', zhTw: '消除貧窮', zhCn: '消除贫穷', ja: '貧困をなくそう', icon: Home },
  { id: 2, color: '#DDA63A', en: 'Zero Hunger', zhTw: '消除飢餓', zhCn: '消除饥饿', ja: '飢餓をゼロに', icon: Wheat },
  { id: 3, color: '#4C9F38', en: 'Good Health', zhTw: '健康與福祉', zhCn: '健康与福祉', ja: '健康と福祉', icon: HeartPulse },
  { id: 4, color: '#C5192D', en: 'Quality Education', zhTw: '優質教育', zhCn: '优质教育', ja: '質の高い教育', icon: GraduationCap },
  { id: 5, color: '#FF3A21', en: 'Gender Equality', zhTw: '性別平等', zhCn: '性别平等', ja: 'ジェンダー平等', icon: Equal },
  { id: 6, color: '#26BDE2', en: 'Clean Water', zhTw: '清潔飲水', zhCn: '清洁饮水', ja: '安全な水', icon: Droplets },
  { id: 7, color: '#FCC30B', en: 'Clean Energy', zhTw: '清潔能源', zhCn: '清洁能源', ja: 'クリーンエネルギー', icon: Zap },
  { id: 8, color: '#A21942', en: 'Decent Work', zhTw: '體面工作', zhCn: '体面工作', ja: '働きがい', icon: Briefcase },
  { id: 9, color: '#FD6925', en: 'Innovation', zhTw: '產業創新', zhCn: '产业创新', ja: 'イノベーション', icon: Lightbulb },
  { id: 10, color: '#DD1367', en: 'Reduced Inequalities', zhTw: '減少不平等', zhCn: '减少不平等', ja: '不平等の是正', icon: Scale },
  { id: 11, color: '#FD9D24', en: 'Sustainable Cities', zhTw: '永續城市', zhCn: '可持续城市', ja: '持続可能な都市', icon: Building2 },
  { id: 12, color: '#BF8B2E', en: 'Responsible Consumption', zhTw: '負責任消費', zhCn: '负责任消费', ja: '責任ある消費', icon: Recycle },
  { id: 13, color: '#3F7E44', en: 'Climate Action', zhTw: '氣候行動', zhCn: '气候行动', ja: '気候変動対策', icon: Leaf },
  { id: 14, color: '#0A97D9', en: 'Life Below Water', zhTw: '水下生態', zhCn: '水下生态', ja: '海の豊かさ', icon: Fish },
  { id: 15, color: '#56C02B', en: 'Life on Land', zhTw: '陸地生態', zhCn: '陆地生态', ja: '陸の豊かさ', icon: TreePine },
  { id: 16, color: '#00689D', en: 'Peace & Justice', zhTw: '和平正義', zhCn: '和平正义', ja: '平和と公正', icon: Shield },
  { id: 17, color: '#19486A', en: 'Partnerships', zhTw: '夥伴關係', zhCn: '伙伴关系', ja: 'パートナーシップ', icon: Handshake },
];

export default function SiteHome() {
  const { lang } = useI18n();
  const { tc } = useSiteContent();

  const getSdgName = (s: typeof sdgs[0]) => lang === 0 ? s.zhTw : lang === 1 ? s.zhCn : lang === 3 ? s.ja : s.en;

  const features = [
    { icon: Globe, image: siteHero, title: tc('site_feature1_title', 'Sustainable Tourism'), desc: tc('site_feature1_desc', '') },
    { icon: Award, image: featureBadge, title: tc('site_feature2_title', 'Digital Badges'), desc: tc('site_feature2_desc', '') },
    { icon: Heart, image: featureImpact, title: tc('site_feature3_title', 'Social Impact'), desc: tc('site_feature3_desc', '') },
    { icon: Users, image: featureCommunity, title: tc('site_feature4_title', 'Global Community'), desc: tc('site_feature4_desc', '') },
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
              {tc('site_hero_title', 'Change the World Through Travel')}
            </h1>
            <p className="text-foreground/80 text-lg md:text-xl mb-8 leading-relaxed drop-shadow">
              {tc('site_hero_desc', '')}
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
                {tc('site_learnmore', 'Learn More')}
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Programme Introduction */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-foreground text-3xl font-bold mb-3">
            {tc('site_programme_title', 'About the Programme')}
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {tc('site_programme_desc', '')}
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
                <h3 className="text-foreground font-semibold mb-2">{f.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{f.desc}</p>
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
              {tc('site_sdg_title', 'UN 17 Sustainable Development Goals')}
            </h2>
            <p className="text-muted-foreground text-lg">
              {tc('site_sdg_desc', '')}
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
            {tc('site_cta_title', 'Ready to become a Sustainable Travel Ambassador?')}
          </h2>
          <p className="text-muted-foreground text-lg mb-6 max-w-xl mx-auto">
            {tc('site_cta_desc', '')}
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
