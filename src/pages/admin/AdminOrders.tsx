import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search } from 'lucide-react';

interface Order {
  id: number;
  badge_id: number;
  user_id: string;
  price: number;
  extra_help: number;
  payment_status: string;
  payment_method: string | null;
  created_at: string;
}

export default function AdminOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      const { data } = await supabase.from('orders').select('*').order('created_at', { ascending: false });
      setOrders(data ?? []);
      setLoading(false);
    };
    fetch();
  }, []);

  const statusColor = (s: string) => {
    if (s === 'paid' || s === '1') return 'default';
    if (s === 'pending' || s === '0') return 'secondary';
    return 'destructive';
  };

  const statusLabel = (s: string) => {
    if (s === 'paid' || s === '1') return '已付款';
    if (s === 'pending' || s === '0') return '待付款';
    if (s === '2') return '已拒絕';
    return s;
  };

  const filtered = orders.filter(o => {
    if (statusFilter !== 'all' && o.payment_status !== statusFilter) return false;
    if (search && !String(o.id).includes(search) && !o.user_id.includes(search)) return false;
    return true;
  });

  const totalRevenue = filtered.reduce((sum, o) => {
    if (o.payment_status === 'paid' || o.payment_status === '1') return sum + o.price + o.extra_help;
    return sum;
  }, 0);

  return (
    <div>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <h2 className="text-2xl font-bold text-foreground">訂單管理</h2>
        <div className="flex gap-2">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">全部</SelectItem>
              <SelectItem value="pending">待付款</SelectItem>
              <SelectItem value="0">待付款(0)</SelectItem>
              <SelectItem value="paid">已付款</SelectItem>
              <SelectItem value="1">已付款(1)</SelectItem>
              <SelectItem value="2">已拒絕(2)</SelectItem>
            </SelectContent>
          </Select>
          <div className="relative w-48">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="搜尋..." value={search} onChange={e => setSearch(e.target.value)} className="pl-9" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <Card><CardContent className="pt-4"><p className="text-sm text-muted-foreground">訂單總數</p><p className="text-2xl font-bold">{filtered.length}</p></CardContent></Card>
        <Card><CardContent className="pt-4"><p className="text-sm text-muted-foreground">已付款總額</p><p className="text-2xl font-bold">US${totalRevenue}</p></CardContent></Card>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>訂單ID</TableHead>
                <TableHead>徽章ID</TableHead>
                <TableHead>價格</TableHead>
                <TableHead>額外捐助</TableHead>
                <TableHead>狀態</TableHead>
                <TableHead>時間</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow><TableCell colSpan={6} className="text-center py-8 text-muted-foreground">載入中...</TableCell></TableRow>
              ) : filtered.length === 0 ? (
                <TableRow><TableCell colSpan={6} className="text-center py-8 text-muted-foreground">無結果</TableCell></TableRow>
              ) : (
                filtered.map(o => (
                  <TableRow key={o.id}>
                    <TableCell className="font-mono">#{o.id}</TableCell>
                    <TableCell>{o.badge_id}</TableCell>
                    <TableCell>US${o.price}</TableCell>
                    <TableCell>{o.extra_help > 0 ? `US$${o.extra_help}` : '-'}</TableCell>
                    <TableCell><Badge variant={statusColor(o.payment_status)}>{statusLabel(o.payment_status)}</Badge></TableCell>
                    <TableCell className="text-muted-foreground text-sm">{new Date(o.created_at).toLocaleString()}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
