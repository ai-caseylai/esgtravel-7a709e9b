import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 0 | 1 | 2; // 0=zh, 1=en, 2=ja

interface I18nContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (translations: Record<number, string>) => string;
  langLabel: string;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

const langLabels: Record<Language, string> = { 0: '中文', 1: 'EN', 2: '日本語' };

export const I18nProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLang] = useState<Language>(() => {
    const saved = localStorage.getItem('esg-lang');
    return (saved ? parseInt(saved) : 0) as Language;
  });

  useEffect(() => {
    localStorage.setItem('esg-lang', String(lang));
  }, [lang]);

  const t = (translations: Record<number, string>) => translations[lang] || translations[1] || '';

  return (
    <I18nContext.Provider value={{ lang, setLang, t, langLabel: langLabels[lang] }}>
      {children}
    </I18nContext.Provider>
  );
};

export const useI18n = () => {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error('useI18n must be used within I18nProvider');
  return ctx;
};

// Static UI translations
export const ui = {
  home: { 0: '首頁', 1: 'Home', 2: 'ホーム' },
  passport: { 0: '我的護照', 1: 'My Passport', 2: 'マイパスポート' },
  ranking: { 0: '排行榜', 1: 'Rankings', 2: 'ランキング' },
  login: { 0: '登入', 1: 'Login', 2: 'ログイン' },
  signup: { 0: '註冊', 1: 'Sign Up', 2: '新規登録' },
  logout: { 0: '登出', 1: 'Logout', 2: 'ログアウト' },
  contactUs: { 0: '聯絡我們', 1: 'Contact Us', 2: 'お問い合わせ' },
  learnMore: { 0: '了解更多', 1: 'Learn More', 2: '詳しく見る' },
  buyBadge: { 0: '購買徽章', 1: 'Buy Badge', 2: 'バッジを購入' },
  price: { 0: '價格', 1: 'Price', 2: '価格' },
  extraHelp: { 0: '額外捐助', 1: 'Extra Help', 2: '追加寄付' },
  payNow: { 0: '立即付款', 1: 'Pay Now', 2: '今すぐ支払う' },
  email: { 0: '電郵', 1: 'Email', 2: 'メール' },
  name: { 0: '姓名', 1: 'Name', 2: '名前' },
  phone: { 0: '電話', 1: 'Phone', 2: '電話番号' },
  heroTitle: { 0: '成為可持續旅遊大使', 1: 'Become a Sustainable Travel Ambassador', 2: '持続可能な観光大使になろう' },
  heroSubtitle: { 0: '購買電子徽章，為地球的可持續發展出一分力', 1: 'Purchase digital badges and contribute to sustainable development', 2: 'デジタルバッジを購入して持続可能な開発に貢献しよう' },
  exploreBadges: { 0: '探索徽章', 1: 'Explore Badges', 2: 'バッジを探す' },
  sdgTitle: { 0: '聯合國永續發展目標', 1: 'UN Sustainable Development Goals', 2: '国連持続可能な開発目標' },
  sdgDesc: { 0: '我們的計劃與聯合國SDGs一致，推動負責任的旅遊方式', 1: 'Our program aligns with the UN SDGs to promote responsible tourism', 2: '私たちのプログラムは国連SDGsと一致し、責任ある観光を推進します' },
  myBadges: { 0: '我的徽章', 1: 'My Badges', 2: 'マイバッジ' },
  noBadges: { 0: '你還沒有收集到任何徽章', 1: 'You haven\'t collected any badges yet', 2: 'まだバッジを集めていません' },
  thankYou: { 0: '感謝你的支持！', 1: 'Thank you for your support!', 2: 'ご支援ありがとうございます！' },
  paymentSuccess: { 0: '付款成功', 1: 'Payment Successful', 2: '支払い完了' },
  paymentFailed: { 0: '付款失敗', 1: 'Payment Failed', 2: '支払い失敗' },
  backHome: { 0: '返回首頁', 1: 'Back to Home', 2: 'ホームに戻る' },
  totalDonation: { 0: '累計捐助', 1: 'Total Donations', 2: '累計寄付' },
  badgesCollected: { 0: '已收集徽章', 1: 'Badges Collected', 2: '集めたバッジ' },
};
