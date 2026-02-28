import { Link, useLocation } from 'react-router-dom';
import { useI18n } from '@/lib/i18n';
import { Home, Award, BookOpen, Ticket, Settings } from 'lucide-react';

const navItems = [
  { path: '/', icon: Home, labelKey: { 0: '首頁', 1: 'Home', 2: 'ホーム' } },
  { path: '/badges', icon: Award, labelKey: { 0: '徽章', 1: 'Badges', 2: 'バッジ' } },
  { path: '/passport', icon: BookOpen, labelKey: { 0: '護照', 1: 'Passport', 2: 'パスポート' } },
  { path: '/coupons', icon: Ticket, labelKey: { 0: '優惠', 1: 'Coupons', 2: 'クーポン' } },
  { path: '/settings', icon: Settings, labelKey: { 0: '設定', 1: 'Settings', 2: '設定' } },
];

export default function BottomNav() {
  const { t } = useI18n();
  const location = useLocation();

  // Hide on admin pages
  if (location.pathname.startsWith('/admin')) return null;

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-card border-t border-border shadow-[0_-2px_10px_rgba(0,0,0,0.05)]">
      <div className="flex justify-around items-center h-16 max-w-lg mx-auto">
        {navItems.map(item => {
          const isActive = location.pathname === item.path || 
            (item.path !== '/' && location.pathname.startsWith(item.path));
          const Icon = item.icon;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center gap-0.5 px-2 py-1 no-underline transition-colors ${
                isActive ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-[10px] font-medium">{t(item.labelKey)}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
