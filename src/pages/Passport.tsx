import { useQuery } from '@tanstack/react-query';
import { fetchUserOrders, fetchBadges } from '@/lib/api';
import { useAuth } from '@/lib/auth';
import { useI18n, ui } from '@/lib/i18n';
import { Link, useNavigate } from 'react-router-dom';
import AppFooter from '@/components/AppFooter';

export default function PassportPage() {
  const { user } = useAuth();
  const { lang, t } = useI18n();
  const navigate = useNavigate();

  const { data: orders } = useQuery({
    queryKey: ['orders', user?.id],
    queryFn: () => fetchUserOrders(user!.id),
    enabled: !!user,
  });

  const { data: badges } = useQuery({
    queryKey: ['badges', lang],
    queryFn: () => fetchBadges(lang),
  });

  if (!user) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center">
        <p className="text-foreground">{t({ 0: '請先登入', 1: 'Please login first', 2: 'ログインしてください' })}</p>
        <Link to="/login">
          <button className="mt-4 bg-primary text-primary-foreground px-6 py-2 rounded-xl border-none">
            {t(ui.login)}
          </button>
        </Link>
      </div>
    );
  }

  const userBadgeIds = [...new Set(orders?.map(o => o.badge_id) || [])];
  const collectedBadges = badges?.filter(b => userBadgeIds.includes(b.id)) || [];
  const badgeCount = userBadgeIds.length;

  // Group by month
  const groupedOrders = new Map<string, typeof collectedBadges>();
  orders?.forEach(order => {
    const date = new Date(order.created_at);
    const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
    if (!groupedOrders.has(key)) groupedOrders.set(key, []);
    const badge = badges?.find(b => b.id === order.badge_id);
    if (badge && !groupedOrders.get(key)!.find(b => b.id === badge.id)) {
      groupedOrders.get(key)!.push(badge);
    }
  });

  const getMonth = (dateStr: string) => {
    const [year, month] = dateStr.split('-');
    const monthNames = lang === 1
      ? ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
      : ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'];
    return monthNames[parseInt(month) - 1];
  };

  return (
    <div className="min-h-screen bg-background text-center pt-4">
      {/* Header */}
      <h1 className="text-primary font-normal text-2xl mb-1">
        {t({ 0: '我的護照', 1: 'My Passport', 2: 'マイパスポート' })}
      </h1>
      <hr className="w-full h-1 bg-primary border-none mb-4" />

      <p className="text-foreground text-2xl font-normal mb-2">
        {t({ 0: '你好', 1: 'Hi', 2: 'こんにちは' })}, {user.email?.split('@')[0]}
      </p>

      <p className="text-foreground text-lg mb-6">
        {t({ 0: '你收集了共', 1: 'You collected total', 2: '合計' })}{' '}
        <span className="text-primary font-normal">{badgeCount}</span>{' '}
        {t({ 0: '個徽章', 1: 'badges', 2: 'バッジを集めました' })}
      </p>

      {/* Badges grouped by date */}
      <div className="px-[5%] text-left">
        {Array.from(groupedOrders.entries()).map(([dateKey, dateBadges]) => (
          <div key={dateKey} className="mb-6">
            <p className="text-foreground text-lg mb-1">{dateKey.split('-')[0]}</p>
            <p className="text-foreground text-lg mb-2">{getMonth(dateKey)}</p>
            <div className="flex flex-wrap gap-2">
              {dateBadges.map(badge => (
                <Link key={badge.id} to={`/badge/${badge.id}`}>
                  <div className="w-[50px] h-[50px] bg-muted rounded flex items-center justify-center cursor-pointer hover:ring-2 hover:ring-primary">
                    <span className="text-2xl">🏅</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>

      {collectedBadges.length === 0 && (
        <div className="py-16">
          <p className="text-muted-foreground">{t(ui.noBadges)}</p>
          <Link to="/">
            <button className="mt-4 bg-primary text-primary-foreground px-6 py-2 rounded-xl border-none">
              {t(ui.exploreBadges)}
            </button>
          </Link>
        </div>
      )}

      <AppFooter />
    </div>
  );
}
