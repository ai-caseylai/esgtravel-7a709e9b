import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/lib/auth';
import { useI18n, ui } from '@/lib/i18n';

export default function Layout({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const { t } = useI18n();
  const location = useLocation();

  // Hide footer on home page (it has its own)
  const hideFooter = location.pathname === '/';

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <main className="flex-1">{children}</main>

      {!hideFooter && (
        <footer className="py-6 text-center bg-background">
          <div className="flex items-center justify-center gap-1 text-sm">
            <Link to="/" className="text-primary hover:underline font-medium">
              {t(ui.home).toUpperCase()}
            </Link>
            <span className="text-primary">|</span>
            <Link to="/passport" className="text-primary hover:underline font-medium">
              {t(ui.passport).toUpperCase()}
            </Link>
            <span className="text-primary">|</span>
            <Link to="/contact" className="text-primary hover:underline font-medium">
              {t(ui.contactUs).toUpperCase()}
            </Link>
          </div>
        </footer>
      )}
    </div>
  );
}
