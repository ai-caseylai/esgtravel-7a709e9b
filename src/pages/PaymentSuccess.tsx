import { Link } from 'react-router-dom';
import { useI18n, ui } from '@/lib/i18n';
import AppFooter from '@/components/AppFooter';

export default function PaymentSuccessPage() {
  const { t } = useI18n();

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center px-4">
        <div className="text-6xl mb-6">✅</div>
        <h1 className="text-primary text-3xl font-bold mb-3">{t(ui.thankYou)}</h1>
        <p className="text-foreground text-lg mb-8 text-center">
          {t({ 0: '你的徽章已加入護照中', 1: '你的徽章已加入护照中', 2: 'Your badge has been added to your passport', 3: 'バッジがパスポートに追加されました' })}
        </p>
        <div className="flex gap-3">
          <Link to="/passport">
            <button className="bg-primary text-primary-foreground px-6 py-3 rounded-xl border-none text-lg">
              {t(ui.passport)}
            </button>
          </Link>
          <Link to="/">
            <button className="bg-card text-foreground px-6 py-3 rounded-xl border border-primary text-lg">
              {t(ui.backHome)}
            </button>
          </Link>
        </div>
      </div>
      <AppFooter />
    </div>
  );
}
