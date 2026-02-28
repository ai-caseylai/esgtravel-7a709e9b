import { Link, useLocation } from 'react-router-dom';
import { useSiteContent } from '@/hooks/use-site-content';
import { Home, Award, BookOpen, Ticket, Settings } from 'lucide-react';
import { motion } from 'framer-motion';

const navItems = [
  { path: '/mobile', icon: Home, contentKey: 'home', fallback: 'Home' },
  { path: '/mobile/badges', icon: Award, contentKey: 'badge', fallback: 'Badges' },
  { path: '/mobile/passport', icon: BookOpen, contentKey: 'passport', fallback: 'Passport' },
  { path: '/mobile/coupons', icon: Ticket, contentKey: '', fallback: 'Coupons' },
  { path: '/mobile/settings', icon: Settings, contentKey: '', fallback: 'Settings' },
];

// Fallback labels when DB content not yet loaded
const fallbackLabels: Record<string, Record<number, string>> = {
  '/mobile': { 0: '首頁', 1: '首页', 2: 'Home', 3: 'ホーム' },
  '/mobile/badges': { 0: '徽章', 1: '徽章', 2: 'Badges', 3: 'バッジ' },
  '/mobile/passport': { 0: '護照', 1: '护照', 2: 'Passport', 3: 'パスポート' },
  '/mobile/coupons': { 0: '優惠', 1: '优惠', 2: 'Coupons', 3: 'クーポン' },
  '/mobile/settings': { 0: '設定', 1: '设置', 2: 'Settings', 3: '設定' },
};

export default function BottomNav() {
  const { tc } = useSiteContent();
  const location = useLocation();

  if (!location.pathname.startsWith('/mobile')) return null;

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-card/80 backdrop-blur-xl border-t border-border/50"
      style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
    >
      <div className="flex justify-around items-end h-14 max-w-lg mx-auto">
        {navItems.map(item => {
          const isActive = location.pathname === item.path ||
            (item.path !== '/mobile' && location.pathname.startsWith(item.path));
          const Icon = item.icon;
          const label = item.contentKey
            ? tc(item.contentKey, fallbackLabels[item.path]?.[0] || item.fallback)
            : fallbackLabels[item.path]?.[0] || item.fallback;
          return (
            <Link
              key={item.path}
              to={item.path}
              className="relative flex flex-col items-center gap-0.5 pt-1.5 pb-1 w-16 no-underline transition-colors"
            >
              <div className="relative">
                {isActive && (
                  <motion.div
                    layoutId="navDot"
                    className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary"
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  />
                )}
                <Icon className={`w-[22px] h-[22px] transition-colors ${isActive ? 'text-primary' : 'text-muted-foreground'}`} strokeWidth={isActive ? 2.2 : 1.8} />
              </div>
              <span className={`text-[10px] leading-tight transition-colors ${isActive ? 'text-primary font-semibold' : 'text-muted-foreground'}`}>
                {label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
