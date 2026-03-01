import { Link, useLocation } from 'react-router-dom';
import { Home, Award, BookOpen, Ticket, Settings } from 'lucide-react';
import { motion } from 'framer-motion';
import { useMobileContent } from '@/hooks/use-mobile-content';

const navItems = [
  { path: '/mobile', icon: Home, key: 'home' },
  { path: '/mobile/badges', icon: Award, key: 'badges' },
  { path: '/mobile/passport', icon: BookOpen, key: 'passport' },
  { path: '/mobile/coupons', icon: Ticket, key: 'coupons' },
  { path: '/mobile/settings', icon: Settings, key: 'settings' },
];

export default function BottomNav() {
  const { mc } = useMobileContent();
  const location = useLocation();

  if (!location.pathname.startsWith('/mobile')) return null;

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50"
      style={{ background: 'hsl(var(--teal))', paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
    >
      <div className="flex justify-around items-end h-14 max-w-lg mx-auto">
        {navItems.map(item => {
          const isActive = location.pathname === item.path ||
            (item.path !== '/mobile' && location.pathname.startsWith(item.path));
          const Icon = item.icon;
          const label = mc('nav', item.key, item.key);
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
                    className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full"
                    style={{ background: 'hsl(0 0% 100%)' }}
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  />
                )}
                <Icon className={`w-[22px] h-[22px] transition-colors ${isActive ? 'text-[hsl(0_0%_100%)]' : 'text-[hsl(0_0%_100%/0.6)]'}`} strokeWidth={isActive ? 2.2 : 1.8} />
              </div>
              <span className={`text-[10px] leading-tight transition-colors ${isActive ? 'text-[hsl(0_0%_100%)] font-semibold' : 'text-[hsl(0_0%_100%/0.6)]'}`}>
                {label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
