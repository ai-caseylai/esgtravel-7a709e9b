import { Link, Outlet, useLocation } from 'react-router-dom';
import { useI18n } from '@/lib/i18n';
import { useSiteContent } from '@/hooks/use-site-content';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';

const navItems = [
  { path: '/site', contentKey: 'home', fallbackKey: { 0: '首頁', 1: '首页', 2: 'Home', 3: 'ホーム' } },
  { path: '/site/how-it-works', contentKey: '', fallbackKey: { 0: '如何獲得徽章', 1: '如何获得徽章', 2: 'How to Get Badges', 3: 'バッジの取得方法' } },
  { path: '/site/events', contentKey: 'event', fallbackKey: { 0: '活動與資訊', 1: '活动与资讯', 2: 'Events & Activities', 3: 'イベント' } },
  { path: '/site/blog', contentKey: '', fallbackKey: { 0: '文章', 1: '文章', 2: 'Blog', 3: 'ブログ' } },
  { path: '/site/contact', contentKey: 'contactus', fallbackKey: { 0: '聯絡我們', 1: '联系我们', 2: 'Contact Us', 3: 'お問い合わせ' } },
];

export default function SiteLayout() {
  const { lang, setLang, t } = useI18n();
  const { tc } = useSiteContent();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const getLabel = (item: typeof navItems[0]) =>
    item.contentKey ? tc(item.contentKey, t(item.fallbackKey)) : t(item.fallbackKey);

  const langOptions = [
    { value: 0 as const, label: '繁中' },
    { value: 1 as const, label: '简中' },
    { value: 2 as const, label: 'EN' },
    { value: 3 as const, label: '日本語' },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Top Nav */}
      <header className="sticky top-0 z-50 bg-card/95 backdrop-blur border-b border-border">
        <div className="max-w-6xl mx-auto flex items-center justify-between px-4 h-16">
          <Link to="/site" className="text-primary font-bold text-xl no-underline tracking-wide">
            STAR SDG
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            {navItems.map(item => (
              <Link
                key={item.path}
                to={item.path}
                className={`text-sm font-medium no-underline transition-colors ${
                  location.pathname === item.path ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {getLabel(item)}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-2">
            {langOptions.map(opt => (
              <button
                key={opt.value}
                onClick={() => setLang(opt.value)}
                className={`px-2 py-1 rounded text-xs font-medium border transition-colors ${
                  lang === opt.value
                    ? 'bg-primary text-primary-foreground border-primary'
                    : 'bg-transparent text-muted-foreground border-border hover:border-primary'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>

          <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden text-foreground">
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden border-t border-border bg-card px-4 py-4 space-y-3">
            {navItems.map(item => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMenuOpen(false)}
                className={`block text-sm font-medium no-underline ${
                  location.pathname === item.path ? 'text-primary' : 'text-muted-foreground'
                }`}
              >
                {getLabel(item)}
              </Link>
            ))}
            <div className="flex gap-2 pt-2">
              {langOptions.map(opt => (
                <button
                  key={opt.value}
                  onClick={() => setLang(opt.value)}
                  className={`px-2 py-1 rounded text-xs font-medium border ${
                    lang === opt.value
                      ? 'bg-primary text-primary-foreground border-primary'
                      : 'bg-transparent text-muted-foreground border-border'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </header>

      <Outlet />

      <footer className="bg-card border-t border-border mt-16">
        <div className="max-w-6xl mx-auto px-4 py-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-primary font-bold text-lg mb-3">STAR SDG</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {t({ 0: '推動可持續旅遊，為地球的未來出一分力。', 1: '推动可持续旅游，为地球的未来出一分力。', 2: 'Promoting sustainable tourism for a better future.', 3: '持続可能な観光を推進し、より良い未来のために。' })}
              </p>
            </div>
            <div>
              <h4 className="text-foreground font-semibold text-sm mb-3">
                {t({ 0: '快速連結', 1: '快速链接', 2: 'Quick Links', 3: 'クイックリンク' })}
              </h4>
              <div className="space-y-2">
                {navItems.map(item => (
                  <Link key={item.path} to={item.path} className="block text-muted-foreground text-sm no-underline hover:text-primary">
                    {getLabel(item)}
                  </Link>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-foreground font-semibold text-sm mb-3">
                {tc('contactus', t({ 0: '聯絡方式', 1: '联系方式', 2: 'Contact', 3: '連絡先' }))}
              </h4>
              <p className="text-muted-foreground text-sm">{tc('email', 'info@starsdg.com')}</p>
              <p className="text-muted-foreground text-sm">{tc('contact', '+852 1234-5678')}</p>
            </div>
          </div>
          <div className="border-t border-border mt-8 pt-6 text-center text-muted-foreground text-xs">
            © 2026 STAR SDG. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
