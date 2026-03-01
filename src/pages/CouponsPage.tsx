import { useI18n } from '@/lib/i18n';
import { useAuth } from '@/lib/auth';
import { useNavigate, Navigate } from 'react-router-dom';
import MobileHeader from '@/components/MobileHeader';
import { motion } from 'framer-motion';
import { Ticket } from 'lucide-react';
import { useMobileContent } from '@/hooks/use-mobile-content';

export default function CouponsPage() {
  const { lang } = useI18n();
  const { user } = useAuth();
  const navigate = useNavigate();
  const { mc } = useMobileContent();

  if (!user) return <Navigate to="/mobile/login" replace />;

  const coupons = [
    { id: 1, discountKey: 'coupon1_discount', titleKey: 'coupon1_title', descKey: 'coupon1_desc', expiry: '2026-12-31' },
    { id: 2, discountKey: 'coupon2_discount', titleKey: 'coupon2_title', descKey: 'coupon2_desc', expiry: '2026-12-31' },
    { id: 3, discountKey: 'coupon3_discount', titleKey: 'coupon3_title', descKey: 'coupon3_desc', expiry: '2026-06-30' },
  ];

  return (
    <div className="min-h-screen bg-background">
      <MobileHeader title={mc('coupons', 'page_title', 'Coupons')} />

      <div className="p-5 space-y-3">
        {coupons.map((coupon, i) => (
          <motion.div
            key={coupon.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
            className="bg-card rounded-2xl border border-border overflow-hidden flex"
          >
            <div className="w-[72px] shrink-0 flex items-center justify-center" style={{ background: 'var(--gradient-ocean)' }}>
              <span className="text-primary-foreground font-bold text-lg">{mc('coupons', coupon.discountKey, '')}</span>
            </div>
            <div className="flex-1 p-3.5">
              <p className="text-foreground font-semibold text-[14px]">{mc('coupons', coupon.titleKey, '')}</p>
              <p className="text-muted-foreground text-[12px] mt-0.5">{mc('coupons', coupon.descKey, '')}</p>
              <p className="text-muted-foreground text-[11px] mt-1.5">
                {mc('coupons', 'valid_until', 'Valid until')} {coupon.expiry}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
