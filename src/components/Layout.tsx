import { useLocation } from 'react-router-dom';
import BottomNav from './BottomNav';

export default function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <main className="flex-1 pb-16">{children}</main>
      {!isAdmin && <BottomNav />}
    </div>
  );
}
