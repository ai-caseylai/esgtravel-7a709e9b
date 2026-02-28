import { useParams, Link } from 'react-router-dom';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchBadgeDetail } from '@/lib/api';
import { useI18n, ui } from '@/lib/i18n';
import { useAuth } from '@/lib/auth';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Leaf, CreditCard, Heart } from 'lucide-react';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

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
      <div className="container py-16 text-center">
        <p>{t({ 0: '請先登入', 1: 'Please login first', 2: 'ログインしてください' })}</p>
        <Link to="/login"><Button className="mt-4">{t(ui.login)}</Button></Link>
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
        payment_status: 'paid', // Simplified - in production use Stripe webhook
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
    <div className="container py-8 md:py-16">
      <div className="max-w-lg mx-auto">
        <Card className="border-0 shadow-lg">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <CreditCard className="h-6 w-6 text-primary" />
            </div>
            <CardTitle>{t(ui.buyBadge)}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Badge info */}
            <div className="flex items-center gap-4 p-4 rounded-xl bg-muted/50">
              <div className="h-16 w-16 rounded-xl bg-primary/10 flex items-center justify-center">
                <Leaf className="h-8 w-8 text-primary" />
              </div>
              <div>
                <p className="font-semibold">{badge?.translation?.home_header || badge?.code}</p>
                <p className="text-sm text-muted-foreground">{badge?.translation?.title}</p>
              </div>
            </div>

            {/* Price */}
            <div className="space-y-3">
              <div className="flex justify-between">
                <span>{t(ui.price)}</span>
                <span className="font-semibold">${badge?.price || 0} USD</span>
              </div>

              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <Heart className="h-4 w-4 text-destructive" />
                  {t(ui.extraHelp)}
                </Label>
                <div className="flex gap-2">
                  {[0, 1, 5, 10].map(amount => (
                    <Button
                      key={amount}
                      variant={extraHelp === amount ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setExtraHelp(amount)}
                    >
                      ${amount}
                    </Button>
                  ))}
                  <Input
                    type="number"
                    min={0}
                    placeholder="Other"
                    className="w-20"
                    onChange={e => setExtraHelp(Number(e.target.value) || 0)}
                  />
                </div>
              </div>

              <div className="border-t pt-3 flex justify-between text-lg font-bold">
                <span>{t({ 0: '總計', 1: 'Total', 2: '合計' })}</span>
                <span className="text-primary">${total} USD</span>
              </div>
            </div>

            <Button
              className="w-full"
              size="lg"
              disabled={loading}
              onClick={handlePayment}
            >
              {loading
                ? t({ 0: '處理中...', 1: 'Processing...', 2: '処理中...' })
                : t(ui.payNow)
              }
            </Button>

            <p className="text-xs text-center text-muted-foreground">
              {t({ 0: '70% 的費用將投放於當地可持續發展項目', 1: '70% of proceeds go to local sustainable development', 2: '収益の70%は地域の持続可能な開発に使われます' })}
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
