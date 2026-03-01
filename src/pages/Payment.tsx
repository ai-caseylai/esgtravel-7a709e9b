import { useParams, useNavigate, Navigate } from 'react-router-dom';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchBadgeDetail } from '@/lib/api';
import { useI18n, ui } from '@/lib/i18n';
import { useAuth } from '@/lib/auth';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import MobileHeader from '@/components/MobileHeader';

export default function PaymentPage() {
  const { badgeId } = useParams<{ badgeId: string }>();
  const { lang, t } = useI18n();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [extraHelp, setExtraHelp] = useState(0);
  const [loading, setLoading] = useState(false);

  const { data: badge } = useQuery({
    queryKey: ['badge', badgeId, lang],
    queryFn: () => fetchBadgeDetail(Number(badgeId), lang),
    enabled: !!badgeId,
  });

  if (!user) return <Navigate to="/mobile/login" replace />;

  const handlePayment = async () => {
    if (!badge || !user) return;
    setLoading(true);
    try {
      const { error } = await supabase.from('orders').insert({
        user_id: user.id, badge_id: badge.id, price: badge.price, extra_help: extraHelp, payment_status: 'paid', payment_method: 'card',
      });
      if (error) throw error;
      toast.success(t(ui.paymentSuccess));
      navigate('/mobile/payment-success');
    } catch (err: any) { toast.error(err.message || t(ui.paymentFailed)); }
    setLoading(false);
  };

  const total = (badge?.price || 0) + extraHelp;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <MobileHeader title={t(ui.buyBadge)} showBack />

      <div className="flex-1 px-5 py-5">
        {/* Badge info */}
        <div className="flex items-center gap-3 p-3 rounded-xl bg-card border border-border mb-6">
          <div className="w-14 h-14 bg-muted rounded-xl flex items-center justify-center shrink-0">
            {badge?.image_url ? (
              <img src={badge.image_url} alt="" className="w-full h-full object-cover rounded-xl" />
            ) : (
              <span className="text-3xl">🏅</span>
            )}
          </div>
          <div className="min-w-0">
            <p className="font-semibold text-foreground text-[14px] truncate">{badge?.translation?.home_header || badge?.code}</p>
            <p className="text-muted-foreground text-[12px] truncate">{badge?.translation?.title}</p>
          </div>
        </div>

        {/* Price breakdown */}
        <div className="space-y-4">
          <div className="flex justify-between text-[14px]">
            <span className="text-muted-foreground">{t(ui.price)}</span>
            <span className="text-foreground font-medium">${badge?.price || 0} USD</span>
          </div>

          <div>
            <label className="text-[13px] text-muted-foreground block mb-2">❤️ {t(ui.extraHelp)}</label>
            <div className="flex gap-2 flex-wrap">
              {[0, 1, 5, 10].map(amount => (
                <button
                  key={amount}
                  onClick={() => setExtraHelp(amount)}
                  className={`px-4 py-2 rounded-xl text-[13px] border transition-colors ${
                    extraHelp === amount
                      ? 'bg-primary text-primary-foreground border-primary'
                      : 'bg-card text-foreground border-border'
                  }`}
                >
                  ${amount}
                </button>
              ))}
            </div>
          </div>

          <div className="border-t border-border pt-4 flex justify-between items-center">
            <span className="text-foreground font-semibold text-[16px]">
              {t({ 0: '總計', 1: '总计', 2: 'Total', 3: '合計' })}
            </span>
            <span className="text-primary font-bold text-[20px]">${total} USD</span>
          </div>
        </div>
      </div>

      {/* Pay button */}
      <div className="px-5 py-4 border-t border-border">
        <button
          onClick={handlePayment} disabled={loading}
          className="w-full h-12 rounded-xl font-semibold text-[15px] text-primary-foreground border-none disabled:opacity-50"
          style={{ background: 'var(--gradient-ocean)' }}
        >
          {loading ? '...' : t(ui.payNow)}
        </button>
        <p className="text-[11px] text-center text-muted-foreground mt-2">
          {t({ 0: '70% 的費用將投放於當地可持續發展項目', 1: '70%用于当地可持续发展', 2: '70% goes to local sustainability', 3: '70%は地域の持続可能性に使用' })}
        </p>
      </div>
    </div>
  );
}
