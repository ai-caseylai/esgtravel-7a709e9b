import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

interface Company {
  id: number;
  company_id: string;
  company_name: string;
  contact_name: string;
  country_code: string;
  tel: string;
  mobile: string;
  email: string;
  country: string;
  status: number;
}

export default function AdminCompanies() {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      const { data } = await supabase.from('companies').select('*').order('id');
      setCompanies(data ?? []);
      setLoading(false);
    };
    fetch();
  }, []);

  const filtered = companies.filter(c =>
    !search ||
    c.company_name.toLowerCase().includes(search.toLowerCase()) ||
    c.contact_name.toLowerCase().includes(search.toLowerCase()) ||
    c.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-foreground">公司管理</h2>
        <div className="relative w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="搜尋公司..." value={search} onChange={e => setSearch(e.target.value)} className="pl-9" />
        </div>
      </div>
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>公司名稱</TableHead>
                <TableHead>聯絡人</TableHead>
                <TableHead>電郵</TableHead>
                <TableHead>電話</TableHead>
                <TableHead>國家</TableHead>
                <TableHead>狀態</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow><TableCell colSpan={7} className="text-center py-8 text-muted-foreground">載入中...</TableCell></TableRow>
              ) : filtered.length === 0 ? (
                <TableRow><TableCell colSpan={7} className="text-center py-8 text-muted-foreground">無結果</TableCell></TableRow>
              ) : (
                filtered.map(c => (
                  <TableRow key={c.id}>
                    <TableCell>{c.id}</TableCell>
                    <TableCell className="font-medium">{c.company_name}</TableCell>
                    <TableCell>{c.contact_name}</TableCell>
                    <TableCell className="text-sm">{c.email}</TableCell>
                    <TableCell>+{c.country_code} {c.tel}</TableCell>
                    <TableCell>{c.country}</TableCell>
                    <TableCell><Badge variant={c.status === 1 ? 'default' : 'secondary'}>{c.status === 1 ? '啟用' : '停用'}</Badge></TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      <p className="text-sm text-muted-foreground mt-2">共 {filtered.length} 間公司</p>
    </div>
  );
}
