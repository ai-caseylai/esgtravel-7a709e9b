import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 0 | 1 | 2 | 3; // 0=繁體中文, 1=簡體中文, 2=en, 3=ja

interface I18nContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (translations: Record<number, string>) => string;
  langLabel: string;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

const langLabels: Record<Language, string> = { 0: '繁體中文', 1: '简体中文', 2: 'EN', 3: '日本語' };

export const I18nProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLang] = useState<Language>(() => {
    const saved = localStorage.getItem('esg-lang');
    return (saved ? parseInt(saved) : 0) as Language;
  });

  useEffect(() => {
    localStorage.setItem('esg-lang', String(lang));
  }, [lang]);

  const t = (translations: Record<number, string>) => {
    if (translations[lang] !== undefined) return translations[lang];
    // Fallback: simplified → traditional, then EN
    if (lang === 1 && translations[0] !== undefined) return translations[0];
    if (translations[2] !== undefined) return translations[2];
    return '';
  };

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

// Frontend lang → DB lang mapping
export function toDbLang(lang: Language): number {
  // DB: 0=zh, 1=en, 2=ja
  const map: Record<number, number> = { 0: 0, 1: 0, 2: 1, 3: 2 };
  return map[lang] ?? 0;
}

// Static UI translations
export const ui = {
  home: { 0: '首頁', 1: '首页', 2: 'Home', 3: 'ホーム' },
  passport: { 0: '我的護照', 1: '我的护照', 2: 'My Passport', 3: 'マイパスポート' },
  ranking: { 0: '排行榜', 1: '排行榜', 2: 'Rankings', 3: 'ランキング' },
  login: { 0: '登入', 1: '登录', 2: 'Login', 3: 'ログイン' },
  signup: { 0: '註冊', 1: '注册', 2: 'Sign Up', 3: '新規登録' },
  logout: { 0: '登出', 1: '退出登录', 2: 'Logout', 3: 'ログアウト' },
  contactUs: { 0: '聯絡我們', 1: '联系我们', 2: 'Contact Us', 3: 'お問い合わせ' },
  learnMore: { 0: '了解更多', 1: '了解更多', 2: 'Learn More', 3: '詳しく見る' },
  buyBadge: { 0: '購買徽章', 1: '购买徽章', 2: 'Buy Badge', 3: 'バッジを購入' },
  price: { 0: '價格', 1: '价格', 2: 'Price', 3: '価格' },
  extraHelp: { 0: '額外捐助', 1: '额外捐助', 2: 'Extra Help', 3: '追加寄付' },
  payNow: { 0: '立即付款', 1: '立即付款', 2: 'Pay Now', 3: '今すぐ支払う' },
  email: { 0: '電郵', 1: '邮箱', 2: 'Email', 3: 'メール' },
  name: { 0: '姓名', 1: '姓名', 2: 'Name', 3: '名前' },
  phone: { 0: '電話', 1: '电话', 2: 'Phone', 3: '電話番号' },
  heroTitle: { 0: '成為可持續旅遊大使', 1: '成为可持续旅游大使', 2: 'Become a Sustainable Travel Ambassador', 3: '持続可能な観光大使になろう' },
  heroSubtitle: { 0: '購買電子徽章，為地球的可持續發展出一分力', 1: '购买电子徽章，为地球的可持续发展出一分力', 2: 'Purchase digital badges and contribute to sustainable development', 3: 'デジタルバッジを購入して持続可能な開発に貢献しよう' },
  exploreBadges: { 0: '探索徽章', 1: '探索徽章', 2: 'Explore Badges', 3: 'バッジを探す' },
  sdgTitle: { 0: '聯合國永續發展目標', 1: '联合国可持续发展目标', 2: 'UN Sustainable Development Goals', 3: '国連持続可能な開発目標' },
  sdgDesc: { 0: '我們的計劃與聯合國SDGs一致，推動負責任的旅遊方式', 1: '我们的计划与联合国SDGs一致，推动负责任的旅游方式', 2: 'Our program aligns with the UN SDGs to promote responsible tourism', 3: '私たちのプログラムは国連SDGsと一致し、責任ある観光を推進します' },
  myBadges: { 0: '我的徽章', 1: '我的徽章', 2: 'My Badges', 3: 'マイバッジ' },
  noBadges: { 0: '你還沒有收集到任何徽章', 1: '你还没有收集到任何徽章', 2: 'You haven\'t collected any badges yet', 3: 'まだバッジを集めていません' },
  thankYou: { 0: '感謝你的支持！', 1: '感谢你的支持！', 2: 'Thank you for your support!', 3: 'ご支援ありがとうございます！' },
  paymentSuccess: { 0: '付款成功', 1: '付款成功', 2: 'Payment Successful', 3: '支払い完了' },
  paymentFailed: { 0: '付款失敗', 1: '付款失败', 2: 'Payment Failed', 3: '支払い失敗' },
  backHome: { 0: '返回首頁', 1: '返回首页', 2: 'Back to Home', 3: 'ホームに戻る' },
  totalDonation: { 0: '累計捐助', 1: '累计捐助', 2: 'Total Donations', 3: '累計寄付' },
  badgesCollected: { 0: '已收集徽章', 1: '已收集徽章', 2: 'Badges Collected', 3: '集めたバッジ' },
};
