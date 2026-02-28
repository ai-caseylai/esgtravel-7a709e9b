import { Link } from 'react-router-dom';
import { useI18n, ui } from '@/lib/i18n';

export default function AppFooter() {
  const { t } = useI18n();

  return (
    <div className="py-6 text-center">
      <div className="flex items-center justify-center gap-1 text-sm">
        <Link to="/mobile" className="text-primary hover:underline font-medium">
          {t(ui.home).toUpperCase()}
        </Link>
        <span className="text-primary">|</span>
        <Link to="/mobile/passport" className="text-primary hover:underline font-medium">
          {t(ui.passport).toUpperCase()}
        </Link>
        <span className="text-primary">|</span>
        <Link to="/mobile/contact" className="text-primary hover:underline font-medium">
          {t(ui.contactUs).toUpperCase()}
        </Link>
      </div>
    </div>
  );
}
