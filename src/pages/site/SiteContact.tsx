import { useI18n } from '@/lib/i18n';
import { Phone, Mail, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function SiteContact() {
  const { t } = useI18n();

  const contactItems = [
    { icon: Phone, label: { 0: '電話', 1: '电话', 2: 'Phone', 3: '電話' }, value: '+852 1234-5678' },
    { icon: Mail, label: { 0: '電郵', 1: '邮箱', 2: 'Email', 3: 'メール' }, value: 'info@starsdg.com' },
    { icon: MapPin, label: { 0: '地址', 1: '地址', 2: 'Address', 3: '住所' }, value: t({ 0: '香港九龍尖沙咀廣東道 123 號', 1: '香港九龙尖沙咀广东道 123 号', 2: '123 Canton Road, Tsim Sha Tsui, Kowloon, Hong Kong', 3: '香港九龍尖沙咀広東道123号' }) },
  ];

  return (
    <div>
      <section className="bg-gradient-to-b from-primary/10 to-transparent py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-foreground text-4xl font-bold mb-4">
            {t({ 0: '聯絡我們', 1: '联系我们', 2: 'Contact Us', 3: 'お問い合わせ' })}
          </h1>
          <p className="text-muted-foreground text-lg">
            {t({ 0: '如有任何問題，歡迎聯絡我們', 1: '如有任何问题，欢迎联系我们', 2: 'Feel free to reach out with any questions', 3: 'ご質問がありましたらお気軽にお問い合わせください' })}
          </p>
        </div>
      </section>

      <section className="max-w-2xl mx-auto px-4 py-12 space-y-4">
        {contactItems.map((item, i) => (
          <div key={i} className="bg-card rounded-2xl border border-border shadow-sm p-5 flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
              <item.icon className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-muted-foreground text-xs mb-1">{t(item.label)}</p>
              <p className="text-foreground font-medium">{item.value}</p>
            </div>
          </div>
        ))}

        <div className="text-center pt-6">
          <Link to="/site" className="text-primary font-medium no-underline hover:underline">
            ← {t({ 0: '返回首頁', 1: '返回首页', 2: 'Back to Home', 3: 'ホームに戻る' })}
          </Link>
        </div>
      </section>
    </div>
  );
}
