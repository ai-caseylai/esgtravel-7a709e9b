import { useQuery } from '@tanstack/react-query';
import { fetchBadges } from '@/lib/api';
import { useI18n, ui } from '@/lib/i18n';
import { useAuth } from '@/lib/auth';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Award, Globe, Compass, ChevronRight } from 'lucide-react';
import heroBg from '@/assets/mobile-hero-bg.jpg';

export default function HomePage() {
  const { lang, setLang, t } = useI18n();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const { data: badges } = useQuery({
    queryKey: ['badges', lang],
    queryFn: () => fetchBadges(lang),
  });

  const badgeId = searchParams.get('badge_id');
  const currentBadge = badges?.find(b => String(b.id) === badgeId) || badges?.[0];
  const tr = currentBadge?.translation;

  const langFlags = [
    { label: '繁', lang: 0 as const },
    { label: '简', lang: 1 as const },
    { label: 'EN', lang: 2 as const },
    { label: '日', lang: 3 as const },
  ];

  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5 } }),
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative w-full min-h-[55vh] overflow-hidden">
        <img src={heroBg} alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-background" />

        {/* Language Selector */}
        <div className="absolute top-4 right-4 z-20 flex gap-1.5">
          {langFlags.map(lf => (
            <button
              key={lf.lang}
              onClick={() => setLang(lf.lang)}
              className={`w-8 h-8 rounded-full text-[11px] font-semibold transition-all duration-300 ${
                lang === lf.lang
                  ? 'glass-strong text-primary shadow-lg scale-110'
                  : 'glass text-white/90 hover:scale-105'
              }`}
            >
              {lf.label}
            </button>
          ))}
        </div>

        {/* Hero Content */}
        <div className="relative z-10 flex flex-col items-center justify-end h-[55vh] pb-8 px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-white text-3xl font-bold tracking-wider drop-shadow-lg">
              STAR SDG
            </h1>
            <p className="text-white/80 text-sm mt-1 font-light tracking-wide">
              {t({ 0: '可持續旅遊徽章平台', 1: '可持续旅游徽章平台', 2: 'Sustainable Travel Badge Platform', 3: '持続可能な旅行バッジプラットフォーム' })}
            </p>
          </motion.div>
        </div>
      </div>

      {/* Main Card - Glassmorphism */}
      <div className="px-5 -mt-8 relative z-20 space-y-4 pb-28">
        <motion.div
          custom={0}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="glass-strong rounded-2xl p-6 text-center"
        >
          <p className="text-primary text-sm font-medium tracking-wide uppercase">
            {tr?.home_header || t({ 0: '高知觀光協會', 1: '高知观光协会', 2: 'Kochi Tourism Board', 3: '高知県観光協会' })}
          </p>
          <h2 className="text-foreground text-xl font-bold mt-2 leading-tight">
            {t({ 0: '成為可持續旅行大使', 1: '成为可持续旅行大使', 2: 'Become a Sustainable Travel Ambassador', 3: '持続可能な旅行アンバサダーになろう' })}
          </h2>
          <div className="w-12 h-0.5 bg-primary/40 mx-auto my-3 rounded-full" />
          <p className="text-muted-foreground text-sm leading-relaxed">
            {tr?.show_more?.substring(0, 120) || t({ 0: '通過收集徽章支持當地社區的可持續發展項目', 1: '通过收集徽章支持当地社区的可持续发展项目', 2: 'Support local sustainability projects by collecting badges', 3: 'バッジを集めて地域の持続可能性プロジェクトを支援' })}
          </p>
        </motion.div>

        {/* Action Buttons */}
        <motion.button
          custom={1}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          onClick={() => currentBadge && navigate(`/mobile/payment/${currentBadge.id}`)}
          className="w-full py-4 rounded-2xl font-semibold text-base text-primary-foreground border-none flex items-center justify-center gap-2"
          style={{ background: 'var(--gradient-ocean)' }}
        >
          <Award className="w-5 h-5" />
          {t({ 0: '支持及取得徽章', 1: '支持及取得徽章', 2: 'Support & Get Badge', 3: 'サポートしてバッジを取得' })}
        </motion.button>

        <motion.button
          custom={2}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          onClick={() => navigate('/mobile/passport')}
          className="w-full py-4 rounded-2xl font-semibold text-base glass-strong text-foreground border-none flex items-center justify-center gap-2"
        >
          <Compass className="w-5 h-5 text-primary" />
          {t({ 0: '我的徽章護照', 1: '我的徽章护照', 2: 'My Badge Passport', 3: 'マイバッジパスポート' })}
        </motion.button>

        {/* Quick Links Grid */}
        <motion.div
          custom={3}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-2 gap-3"
        >
          <button
            onClick={() => navigate('/mobile/badges')}
            className="glass-strong rounded-2xl p-4 text-left group"
          >
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-3">
              <Award className="w-5 h-5 text-primary" />
            </div>
            <p className="text-foreground font-semibold text-sm">
              {t({ 0: '探索徽章', 1: '探索徽章', 2: 'Explore Badges', 3: 'バッジを探索' })}
            </p>
            <p className="text-muted-foreground text-xs mt-1">
              {badges?.length ?? 0} {t({ 0: '個可用', 1: '个可用', 2: 'available', 3: '利用可能' })}
            </p>
          </button>
          <button
            onClick={() => currentBadge?.map_url ? window.open(currentBadge.map_url, '_blank') : null}
            className="glass-strong rounded-2xl p-4 text-left group"
          >
            <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center mb-3">
              <Globe className="w-5 h-5 text-accent" />
            </div>
            <p className="text-foreground font-semibold text-sm">
              {t({ 0: '官方網站', 1: '官方网站', 2: 'Official Site', 3: '公式サイト' })}
            </p>
            <p className="text-muted-foreground text-xs mt-1">
              {t({ 0: '了解更多', 1: '了解更多', 2: 'Learn more', 3: '詳しく見る' })}
            </p>
          </button>
        </motion.div>

        {/* Reactions Section */}
        <motion.div
          custom={4}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="glass-strong rounded-2xl p-5"
        >
          <p className="text-foreground font-semibold text-sm mb-4">
            {t({ 0: '支持者反應', 1: '支持者反应', 2: 'Supporter Reactions', 3: 'サポーターの反応' })}
          </p>
          <div className="flex justify-around">
            {['😀', '😊', '😍', '🤩', '😎'].map((emoji, i) => (
              <motion.div
                key={i}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5 + i * 0.08, type: 'spring', stiffness: 300 }}
                className="w-12 h-12 rounded-full bg-primary/5 flex items-center justify-center text-2xl"
              >
                {emoji}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Login CTA for non-logged in users */}
        {!user && (
          <motion.button
            custom={5}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            onClick={() => navigate('/mobile/login')}
            className="w-full py-3.5 rounded-2xl glass-strong text-primary font-semibold text-sm flex items-center justify-center gap-1"
          >
            {t({ 0: '登入帳號', 1: '登录帐号', 2: 'Sign In', 3: 'ログイン' })}
            <ChevronRight className="w-4 h-4" />
          </motion.button>
        )}
      </div>
    </div>
  );
}
