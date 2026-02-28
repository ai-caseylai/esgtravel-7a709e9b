import { useLocation } from 'react-router-dom';
import BottomNav from './BottomNav';

export default function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');
  const isMobile = location.pathname.startsWith('/mobile');

  return (
    <div className={`min-h-screen flex flex-col bg-background ${isMobile ? 'max-w-lg mx-auto' : ''}`}>
      <main className="flex-1 pb-[72px]">{children}</main>
      {!isAdmin && <BottomNav />}
    </div>
  );
}
