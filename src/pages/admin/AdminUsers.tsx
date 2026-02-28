import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search } from 'lucide-react';

interface Profile {
  id: string;
  contact_name: string | null;
  country_code: string | null;
  mobile: string | null;
  lang: number;
  created_at: string;
}

export default function AdminUsers() {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      const { data } = await supabase.from('profiles').select('*').order('created_at', { ascending: false });
      setProfiles(data ?? []);
      setLoading(false);
    };
    fetch();
  }, []);

  const langMap: Record<number, string> = { 0: '中文', 1: 'EN', 2: '日本語' };

  const filtered = profiles.filter(p =>
    !search || (p.contact_name?.toLowerCase().includes(search.toLowerCase())) ||
    p.mobile?.includes(search) || p.id.includes(search)
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-foreground">用戶管理</h2>
        <div className="relative w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="搜尋名稱/電話/ID..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
      </div>
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>名稱</TableHead>
                <TableHead>國碼</TableHead>
                <TableHead>電話</TableHead>
                <TableHead>語言</TableHead>
                <TableHead>建立時間</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow><TableCell colSpan={5} className="text-center py-8 text-muted-foreground">載入中...</TableCell></TableRow>
              ) : filtered.length === 0 ? (
                <TableRow><TableCell colSpan={5} className="text-center py-8 text-muted-foreground">無結果</TableCell></TableRow>
              ) : (
                filtered.map(p => (
                  <TableRow key={p.id}>
                    <TableCell className="font-medium">{p.contact_name || '-'}</TableCell>
                    <TableCell>+{p.country_code}</TableCell>
                    <TableCell>{p.mobile || '-'}</TableCell>
                    <TableCell><Badge variant="secondary">{langMap[p.lang] || p.lang}</Badge></TableCell>
                    <TableCell className="text-muted-foreground text-sm">{new Date(p.created_at).toLocaleDateString()}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      <p className="text-sm text-muted-foreground mt-2">共 {filtered.length} 位用戶</p>
    </div>
  );
}
