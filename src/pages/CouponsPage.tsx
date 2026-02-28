import { useI18n } from '@/lib/i18n';
import { useAuth } from '@/lib/auth';
import { Link } from 'react-router-dom';
import AppFooter from '@/components/AppFooter';

// Placeholder coupons - will be replaced with DB data when table exists
const sampleCoupons = [
  { id: 1, discount: '10%', titleZh: '餐飲折扣', titleEn: 'Dining Discount', titleJa: '飲食割引', descZh: '在合作餐廳享受優惠', descEn: 'Enjoy discounts at partner restaurants', descJa: '提携レストランで割引を受ける', expiry: '2026-12-31' },
  { id: 2, discount: '15%', titleZh: '住宿優惠', titleEn: 'Accommodation Deal', titleJa: '宿泊割引', descZh: '合作酒店住宿折扣', descEn: 'Discount at partner hotels', descJa: '提携ホテルでの宿泊割引', expiry: '2026-12-31' },
  { id: 3, discount: '20%', titleZh: '體驗活動折扣', titleEn: 'Activity Discount', titleJa: '体験割引', descZh: '生態旅遊體驗優惠', descEn: 'Eco-tourism activity discount', descJa: 'エコツーリズム体験割引', expiry: '2026-06-30' },
];

export default function CouponsPage() {
  const { lang, t } = useI18n();
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center pb-20">
        <p className="text-foreground mb-4">
          {t({ 0: '請先登入查看優惠券', 1: 'Please login to view coupons', 2: 'クーポンを表示するにはログインしてください' })}
        </p>
        <Link to="/login">
          <button className="bg-primary text-primary-foreground px-6 py-2 rounded-xl border-none">
            {t({ 0: '登入', 1: 'Login', 2: 'ログイン' })}
          </button>
        </Link>
      </div>
    );
  }

  const getTitle = (c: typeof sampleCoupons[0]) => lang === 0 ? c.titleZh : lang === 2 ? c.titleJa : c.titleEn;
  const getDesc = (c: typeof sampleCoupons[0]) => lang === 0 ? c.descZh : lang === 2 ? c.descJa : c.descEn;

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="pt-6 pb-4 text-center">
        <h1 className="text-primary font-bold text-2xl">
          {t({ 0: '優惠券', 1: 'Coupons', 2: 'クーポン' })}
        </h1>
        <p className="text-muted-foreground text-sm mt-1">
          {t({ 0: '使用徽章解鎖的折扣優惠', 1: 'Discounts unlocked with your badges', 2: 'バッジで解除された割引' })}
        </p>
      </div>

      <div className="px-4 space-y-3">
        {sampleCoupons.map(coupon => (
          <div key={coupon.id} className="bg-card rounded-2xl border border-border shadow-sm p-4 flex items-center gap-4">
            {/* Discount badge */}
            <div className="min-w-[60px] h-[60px] rounded-xl bg-primary/10 flex items-center justify-center">
              <span className="text-primary font-bold text-lg">{coupon.discount}</span>
            </div>
            {/* Info */}
            <div className="flex-1">
              <p className="text-foreground font-semibold">{getTitle(coupon)}</p>
              <p className="text-muted-foreground text-xs mt-1">{getDesc(coupon)}</p>
              <p className="text-muted-foreground text-xs mt-1">
                {t({ 0: '有效期至', 1: 'Valid until', 2: '有効期限' })}: {coupon.expiry}
              </p>
            </div>
          </div>
        ))}
      </div>

      <AppFooter />
    </div>
  );
}
