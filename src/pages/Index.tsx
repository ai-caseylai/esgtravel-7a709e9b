import { useQuery } from '@tanstack/react-query';
import { fetchBadges } from '@/lib/api';
import { useI18n, ui } from '@/lib/i18n';
import { useAuth } from '@/lib/auth';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import AppFooter from '@/components/AppFooter';

export default function HomePage() {
  const { lang, setLang, t } = useI18n();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const { data: badges } = useQuery({
    queryKey: ['badges', lang],
    queryFn: () => fetchBadges(lang),
  });

  // Use first badge or query param badge
  const badgeId = searchParams.get('badge_id');
  const currentBadge = badges?.find(b => String(b.id) === badgeId) || badges?.[0];
  const tr = currentBadge?.translation;

  const langFlags = [
    { label: '繁', lang: 0 as const },
    { label: '简', lang: 1 as const },
    { label: 'EN', lang: 2 as const },
    { label: '日', lang: 3 as const },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Background Image Area */}
      <div className="relative w-full">
        <div className="w-full h-[30vh] bg-gradient-to-b from-primary/30 to-primary/10 flex items-center justify-center relative overflow-hidden">
          {/* Placeholder for badge background image */}
          <div className="absolute inset-0 bg-[url('/placeholder.svg')] bg-cover bg-center opacity-50" />

          {/* Header text */}
          <div className="absolute top-[2vh] w-full text-center z-10">
            <h1 className="text-foreground font-medium text-[22px] tracking-[4px]">
              {tr?.home_header || 'VISITKOCHI'}
            </h1>
            <p className="text-foreground text-xs mt-1">
              {tr?.title || 'The blessings of nature'}
            </p>
          </div>

          {/* Title */}
          <div className="absolute top-[13vh] w-full text-center z-10">
            <h2 className="text-foreground font-medium text-[26px]">
              {t({ 0: '高知觀光協會', 1: '高知观光协会', 2: 'Kochi Japan Tourism Board', 3: '高知県観光協会' })}
            </h2>
            <p className="text-foreground text-lg mt-0">
              {t({ 0: '認證影響力授權者', 1: '认证影响力授权者', 2: 'Verified Impact Authorizer', 3: '認定インパクト・オーソライザー' })}
            </p>
          </div>

          {/* Language buttons */}
          <div className="absolute top-2 right-2 flex gap-1 z-10">
            {langFlags.map(lf => (
              <button
                key={lf.lang}
                onClick={() => setLang(lf.lang)}
                className={`w-8 h-8 rounded-full text-xs font-bold border-2 transition-colors ${
                  lang === lf.lang
                    ? 'bg-primary text-primary-foreground border-primary'
                    : 'bg-background/80 text-foreground border-border'
                }`}
              >
                {lf.label}
              </button>
            ))}
          </div>
        </div>

        {/* White overlay card */}
        <div className="relative -mt-10 mx-[10%] bg-card rounded-[20px] shadow-lg border p-5 text-center z-20">
          <h3 className="text-primary font-medium text-xl leading-snug">
            {t({ 0: '成為', 1: '成为', 2: 'Become', 3: 'なろう' })}
          </h3>
          <h3 className="text-primary font-bold text-[22px] leading-snug mt-1">
            {t(ui.heroTitle)}
          </h3>
          <hr className="w-[30%] h-1 bg-primary/60 border-none mx-auto my-3" />
          <p className="text-foreground text-sm leading-5 px-2">
            {tr?.show_more?.substring(0, 200) || t(ui.heroSubtitle)}
          </p>
        </div>

        {/* Buttons section */}
        <div className="mt-6 flex flex-col items-center gap-3 px-[15%]">
          <button
            onClick={() => currentBadge && navigate(`/mobile/payment/${currentBadge.id}`)}
            className="w-full py-4 bg-primary text-primary-foreground font-medium text-lg rounded-[20px] border-none"
          >
            {t({ 0: '支持及取得徽章', 1: '支持及取得徽章', 2: 'SUPPORT & GET A BADGE', 3: 'サポートしてバッジを取得' })}
          </button>

          <button
            onClick={() => navigate('/mobile/passport')}
            className="w-full py-4 bg-card text-foreground font-medium text-lg rounded-[20px] border border-primary"
          >
            {t({ 0: '徽章護照', 1: '徽章护照', 2: 'BADGE PASSPORT', 3: 'バッジパスポート' })}
          </button>

          <button
            onClick={() => {
              if (currentBadge?.map_url) window.open(currentBadge.map_url, '_blank');
            }}
            className="w-full py-4 bg-card text-foreground font-medium text-lg rounded-[20px] border border-primary"
          >
            {t({ 0: '官方網站', 1: '官方网站', 2: 'OFFICIAL WEBSITE', 3: '公式サイト' })}
          </button>
        </div>

        {/* Ranking section placeholder */}
        <div className="mt-8 text-center px-4">
          <p className="text-foreground font-medium mb-4">
            {t({ 0: '其他支持者的反應', 1: '其他支持者的反应', 2: 'Reactions by other supporters', 3: '他のサポーターの反応' })}
          </p>
          <div className="flex justify-center gap-4">
            {[0, 1, 2, 3, 4].map(i => (
              <div key={i} className="w-14 h-14 rounded-full bg-muted flex items-center justify-center text-2xl">
                {['😀', '😊', '😍', '🤩', '😎'][i]}
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <AppFooter />
      </div>
    </div>
  );
}
