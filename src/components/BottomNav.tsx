import { Link, useLocation } from 'react-router-dom';
import { useI18n } from '@/lib/i18n';
import { Home, Award, BookOpen, Ticket, Settings } from 'lucide-react';
import { motion } from 'framer-motion';

const navItems = [
  { path: '/mobile', icon: Home, labelKey: { 0: '首頁', 1: '首页', 2: 'Home', 3: 'ホーム' } },
  { path: '/mobile/badges', icon: Award, labelKey: { 0: '徽章', 1: '徽章', 2: 'Badges', 3: 'バッジ' } },
  { path: '/mobile/passport', icon: BookOpen, labelKey: { 0: '護照', 1: '护照', 2: 'Passport', 3: 'パスポート' } },
  { path: '/mobile/coupons', icon: Ticket, labelKey: { 0: '優惠', 1: '优惠', 2: 'Coupons', 3: 'クーポン' } },
  { path: '/mobile/settings', icon: Settings, labelKey: { 0: '設定', 1: '设置', 2: 'Settings', 3: '設定' } },
];

export default function BottomNav() {
  const { t } = useI18n();
  const location = useLocation();

  if (!location.pathname.startsWith('/mobile')) return null;

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 glass-strong border-t-0 safe-area-bottom">
      <div className="flex justify-around items-center h-16 max-w-lg mx-auto px-2">
        {navItems.map(item => {
          const isActive = location.pathname === item.path ||
            (item.path !== '/mobile' && location.pathname.startsWith(item.path));
          const Icon = item.icon;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`relative flex flex-col items-center gap-0.5 px-3 py-1.5 no-underline transition-all duration-300 ${
                isActive ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute -top-1 w-5 h-0.5 rounded-full bg-primary"
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                />
              )}
              <Icon className={`w-5 h-5 transition-transform duration-300 ${isActive ? 'scale-110' : ''}`} />
              <span className={`text-[10px] font-medium transition-all ${isActive ? 'font-semibold' : ''}`}>
                {t(item.labelKey)}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
