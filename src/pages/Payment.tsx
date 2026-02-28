import { useParams, Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchBadgeDetail } from '@/lib/api';
import { useI18n, ui } from '@/lib/i18n';
import { useAuth } from '@/lib/auth';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import AppFooter from '@/components/AppFooter';

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

  if (!user) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center">
        <p>{t({ 0: '請先登入', 1: 'Please login first', 2: 'ログインしてください' })}</p>
        <Link to="/login">
          <button className="mt-4 bg-primary text-primary-foreground px-6 py-2 rounded-xl border-none">
            {t(ui.login)}
          </button>
        </Link>
      </div>
    );
  }

  const handlePayment = async () => {
    if (!badge || !user) return;
    setLoading(true);

    try {
      const { error } = await supabase.from('orders').insert({
        user_id: user.id,
        badge_id: badge.id,
        price: badge.price,
        extra_help: extraHelp,
        payment_status: 'paid',
        payment_method: 'card',
      });

      if (error) throw error;

      toast.success(t(ui.paymentSuccess));
      navigate('/payment-success');
    } catch (err: any) {
      toast.error(err.message || t(ui.paymentFailed));
    }
    setLoading(false);
  };

  const total = (badge?.price || 0) + extraHelp;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="flex items-center justify-center pt-6 pb-2 relative">
        <button onClick={() => navigate(-1)} className="absolute left-5 text-primary text-2xl">
          ←
        </button>
        <h1 className="text-primary font-normal text-2xl">
          {t(ui.buyBadge)}
        </h1>
      </div>

      <div className="px-[10%] mt-8">
        {/* Badge info */}
        <div className="flex items-center gap-4 p-4 rounded-xl bg-muted/50 mb-6">
          <div className="w-16 h-16 bg-muted rounded-xl flex items-center justify-center text-3xl">
            🏅
          </div>
          <div>
            <p className="font-semibold text-foreground">{badge?.translation?.home_header || badge?.code}</p>
            <p className="text-sm text-muted-foreground">{badge?.translation?.title}</p>
          </div>
        </div>

        {/* Price */}
        <div className="space-y-4">
          <div className="flex justify-between">
            <span className="text-foreground">{t(ui.price)}</span>
            <span className="font-semibold text-foreground">${badge?.price || 0} USD</span>
          </div>

          {/* Extra help */}
          <div>
            <label className="text-foreground text-sm mb-2 block">❤️ {t(ui.extraHelp)}</label>
            <div className="flex gap-2 flex-wrap">
              {[0, 1, 5, 10].map(amount => (
                <button
                  key={amount}
                  onClick={() => setExtraHelp(amount)}
                  className={`px-4 py-2 rounded-xl border text-sm ${
                    extraHelp === amount
                      ? 'bg-primary text-primary-foreground border-primary'
                      : 'bg-card text-foreground border-border'
                  }`}
                >
                  ${amount}
                </button>
              ))}
              <input
                type="number"
                min={0}
                placeholder="Other"
                className="w-20 px-2 py-2 rounded-xl border border-border bg-card text-foreground text-sm"
                onChange={e => setExtraHelp(Number(e.target.value) || 0)}
              />
            </div>
          </div>

          {/* Total */}
          <div className="border-t pt-4 flex justify-between text-lg font-bold">
            <span>{t({ 0: '總計', 1: 'Total', 2: '合計' })}</span>
            <span className="text-primary">${total} USD</span>
          </div>
        </div>

        <button
          onClick={handlePayment}
          disabled={loading}
          className="w-full py-4 bg-primary text-primary-foreground font-medium text-lg rounded-[20px] border-none mt-6 disabled:opacity-50"
        >
          {loading
            ? t({ 0: '處理中...', 1: 'Processing...', 2: '処理中...' })
            : t(ui.payNow)
          }
        </button>

        <p className="text-xs text-center text-muted-foreground mt-4">
          {t({ 0: '70% 的費用將投放於當地可持續發展項目', 1: '70% of proceeds go to local sustainable development', 2: '収益の70%は地域の持続可能な開発に使われます' })}
        </p>
      </div>

      <AppFooter />
    </div>
  );
}
