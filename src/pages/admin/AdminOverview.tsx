import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, ShoppingCart, Award, Building2 } from 'lucide-react';

export default function AdminOverview() {
  const [stats, setStats] = useState({ users: 0, orders: 0, badges: 0, companies: 0 });

  useEffect(() => {
    const fetchStats = async () => {
      const [profiles, orders, badges, companies] = await Promise.all([
        supabase.from('profiles').select('id', { count: 'exact', head: true }),
        supabase.from('orders').select('id', { count: 'exact', head: true }),
        supabase.from('badges').select('id', { count: 'exact', head: true }),
        supabase.from('companies').select('id', { count: 'exact', head: true }),
      ]);
      setStats({
        users: profiles.count ?? 0,
        orders: orders.count ?? 0,
        badges: badges.count ?? 0,
        companies: companies.count ?? 0,
      });
    };
    fetchStats();
  }, []);

  const cards = [
    { label: '用戶數', value: stats.users, icon: Users, color: 'text-primary' },
    { label: '訂單數', value: stats.orders, icon: ShoppingCart, color: 'text-accent' },
    { label: '徽章數', value: stats.badges, icon: Award, color: 'text-primary' },
    { label: '公司數', value: stats.companies, icon: Building2, color: 'text-muted-foreground' },
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold text-foreground mb-6">後台總覽</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map(c => (
          <Card key={c.label}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{c.label}</CardTitle>
              <c.icon className={`h-5 w-5 ${c.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">{c.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
