import { useI18n } from '@/lib/i18n';
import { useAuth } from '@/lib/auth';
import { useNavigate } from 'react-router-dom';
import MobileHeader from '@/components/MobileHeader';
import { motion } from 'framer-motion';
import { Ticket } from 'lucide-react';

const sampleCoupons = [
  { id: 1, discount: '10%', titleTw: '餐飲折扣', titleCn: '餐饮折扣', titleEn: 'Dining Discount', titleJa: '飲食割引', descTw: '在合作餐廳享受優惠', descCn: '在合作餐厅享受优惠', descEn: 'Enjoy discounts at partner restaurants', descJa: '提携レストランで割引', expiry: '2026-12-31' },
  { id: 2, discount: '15%', titleTw: '住宿優惠', titleCn: '住宿优惠', titleEn: 'Accommodation', titleJa: '宿泊割引', descTw: '合作酒店住宿折扣', descCn: '合作酒店住宿折扣', descEn: 'Discount at partner hotels', descJa: '提携ホテルでの割引', expiry: '2026-12-31' },
  { id: 3, discount: '20%', titleTw: '體驗活動', titleCn: '体验活动', titleEn: 'Activities', titleJa: '体験割引', descTw: '生態旅遊體驗優惠', descCn: '生态旅游体验优惠', descEn: 'Eco-tourism activity discount', descJa: 'エコツーリズム割引', expiry: '2026-06-30' },
];

export default function CouponsPage() {
  const { lang, t } = useI18n();
  const { user } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-4 px-8">
        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
          <Ticket className="w-8 h-8 text-primary" />
        </div>
        <p className="text-foreground font-semibold text-lg">
          {t({ 0: '請先登入', 1: '请先登录', 2: 'Please sign in', 3: 'ログインしてください' })}
        </p>
        <button
          onClick={() => navigate('/mobile/login')}
          className="bg-primary text-primary-foreground px-8 py-2.5 rounded-xl border-none text-[15px] font-medium"
        >
          {t({ 0: '登入', 1: '登录', 2: 'Sign In', 3: 'ログイン' })}
        </button>
      </div>
    );
  }

  const getTitle = (c: typeof sampleCoupons[0]) => lang === 0 ? c.titleTw : lang === 1 ? c.titleCn : lang === 3 ? c.titleJa : c.titleEn;
  const getDesc = (c: typeof sampleCoupons[0]) => lang === 0 ? c.descTw : lang === 1 ? c.descCn : lang === 3 ? c.descJa : c.descEn;

  return (
    <div className="min-h-screen bg-background">
      <MobileHeader title={t({ 0: '優惠券', 1: '优惠券', 2: 'Coupons', 3: 'クーポン' })} />

      <div className="p-5 space-y-3">
        {sampleCoupons.map((coupon, i) => (
          <motion.div
            key={coupon.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
            className="bg-card rounded-2xl border border-border overflow-hidden flex"
          >
            {/* Left accent */}
            <div className="w-[72px] shrink-0 flex items-center justify-center" style={{ background: 'var(--gradient-ocean)' }}>
              <span className="text-primary-foreground font-bold text-lg">{coupon.discount}</span>
            </div>
            <div className="flex-1 p-3.5">
              <p className="text-foreground font-semibold text-[14px]">{getTitle(coupon)}</p>
              <p className="text-muted-foreground text-[12px] mt-0.5">{getDesc(coupon)}</p>
              <p className="text-muted-foreground text-[11px] mt-1.5">
                {t({ 0: '有效期至', 1: '有效期至', 2: 'Valid until', 3: '有効期限' })} {coupon.expiry}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
