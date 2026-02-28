import { useNavigate } from 'react-router-dom';
import { useI18n, ui } from '@/lib/i18n';
import AppFooter from '@/components/AppFooter';

export default function ContactPage() {
  const { t } = useI18n();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Logo */}
      <div className="flex justify-center pt-8">
        <div className="w-[94px] h-[107px] bg-muted rounded-lg flex items-center justify-center">
          <span className="text-4xl">🌍</span>
        </div>
      </div>

      {/* Back button */}
      <div className="px-4 mt-2">
        <button onClick={() => navigate(-1)} className="text-primary text-2xl">
          ←
        </button>
      </div>

      {/* Contact info */}
      <div className="mt-[10vh] text-center px-4">
        <h1 className="text-primary font-normal text-2xl mb-6">
          {t(ui.contactUs)}
        </h1>
        <p className="text-foreground text-lg mb-2">
          {t({ 0: '聯繫電話：+852 1234-5678', 1: '联系电话：+852 1234-5678', 2: 'Contact: +852 1234-5678', 3: '連絡先：+852 1234-5678' })}
        </p>
        <p className="text-foreground text-lg">
          {t({ 0: '電郵：info@starsdg.com', 1: '邮箱：info@starsdg.com', 2: 'Email: info@starsdg.com', 3: 'メール：info@starsdg.com' })}
        </p>
      </div>

      <div className="absolute bottom-0 w-full">
        <AppFooter />
      </div>
    </div>
  );
}
