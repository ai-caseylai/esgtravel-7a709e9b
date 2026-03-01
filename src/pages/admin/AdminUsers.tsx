import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Search, Plus } from 'lucide-react';
import { toast } from 'sonner';

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
  const [addOpen, setAddOpen] = useState(false);
  const [adding, setAdding] = useState(false);
  const [form, setForm] = useState({
    email: '',
    contact_name: '',
    country_code: '852',
    mobile: '',
    lang: 0,
  });

  const fetchProfiles = async () => {
    const { data } = await supabase.from('profiles').select('*').order('created_at', { ascending: false });
    setProfiles(data ?? []);
    setLoading(false);
  };

  useEffect(() => { fetchProfiles(); }, []);

  const langMap: Record<number, string> = { 0: '中文', 1: 'EN', 2: '日本語' };

  const filtered = profiles.filter(p =>
    !search || (p.contact_name?.toLowerCase().includes(search.toLowerCase())) ||
    p.mobile?.includes(search) || p.id.includes(search)
  );

  const handleAdd = async () => {
    if (!form.email.trim()) { toast.error('請輸入 Email'); return; }
    setAdding(true);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      const res = await fetch(
        `https://jbfybrxpdippdsettdgv.supabase.co/functions/v1/admin-create-user`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${session?.access_token}`,
          },
          body: JSON.stringify(form),
        }
      );
      const result = await res.json();
      if (!res.ok) throw new Error(result.error || '建立失敗');
      toast.success('用戶已建立');
      setAddOpen(false);
      setForm({ email: '', contact_name: '', country_code: '852', mobile: '', lang: 0 });
      fetchProfiles();
    } catch (e: any) {
      toast.error(e.message);
    } finally {
      setAdding(false);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <h2 className="text-2xl font-bold text-foreground">用戶管理</h2>
        <div className="flex items-center gap-3">
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="搜尋名稱/電話/ID..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="pl-9"
            />
          </div>
          <Dialog open={addOpen} onOpenChange={setAddOpen}>
            <DialogTrigger asChild>
              <Button size="sm"><Plus className="h-4 w-4 mr-1" /> 新增用戶</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader><DialogTitle>新增用戶</DialogTitle></DialogHeader>
              <div className="space-y-3">
                <div>
                  <Label>Email <span className="text-destructive">*</span></Label>
                  <Input value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} placeholder="user@example.com" />
                </div>
                <div>
                  <Label>名稱</Label>
                  <Input value={form.contact_name} onChange={e => setForm(f => ({ ...f, contact_name: e.target.value }))} />
                </div>
                <div className="grid grid-cols-[100px_1fr] gap-2">
                  <div>
                    <Label>國碼</Label>
                    <Input value={form.country_code} onChange={e => setForm(f => ({ ...f, country_code: e.target.value }))} placeholder="852" />
                  </div>
                  <div>
                    <Label>電話</Label>
                    <Input value={form.mobile} onChange={e => setForm(f => ({ ...f, mobile: e.target.value }))} />
                  </div>
                </div>
                <div>
                  <Label>語言</Label>
                  <Select value={String(form.lang)} onValueChange={v => setForm(f => ({ ...f, lang: Number(v) }))}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0">中文</SelectItem>
                      <SelectItem value="1">English</SelectItem>
                      <SelectItem value="2">日本語</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button onClick={handleAdd} disabled={adding} className="w-full">
                  {adding ? '建立中...' : '建立用戶'}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
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
