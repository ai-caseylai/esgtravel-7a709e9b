import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Plus, Trash2 } from 'lucide-react';

type AppRole = 'user' | 'agent' | 'company_admin' | 'admin' | 'editor';

interface RoleRow {
  id: string;
  user_id: string;
  role: AppRole;
  email?: string;
}

const ROLE_LABELS: Record<AppRole, string> = {
  user: '用戶',
  editor: '小編',
  agent: '代理',
  company_admin: '公司管理員',
  admin: '管理員',
};

export default function AdminRoles() {
  const [roles, setRoles] = useState<RoleRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [newEmail, setNewEmail] = useState('');
  const [newRole, setNewRole] = useState<AppRole>('editor');
  const [adding, setAdding] = useState(false);

  const fetchRoles = async () => {
    setLoading(true);
    const { data } = await supabase.from('user_roles').select('*');
    if (data) {
      // Fetch emails from profiles for display
      const userIds = [...new Set(data.map((r: any) => r.user_id))];
      const { data: profiles } = await supabase
        .from('profiles')
        .select('id, contact_name')
        .in('id', userIds);
      const profileMap = new Map((profiles ?? []).map((p: any) => [p.id, p.contact_name || p.id]));
      setRoles(data.map((r: any) => ({ ...r, email: profileMap.get(r.user_id) || r.user_id })));
    }
    setLoading(false);
  };

  useEffect(() => { fetchRoles(); }, []);

  const handleAdd = async () => {
    if (!newEmail.trim()) { toast.error('請輸入用戶 ID (UUID)'); return; }
    setAdding(true);
    const { error } = await supabase.from('user_roles').insert({
      user_id: newEmail.trim(),
      role: newRole,
    });
    if (error) {
      toast.error(error.message);
    } else {
      toast.success('角色已新增');
      setNewEmail('');
      fetchRoles();
    }
    setAdding(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('確定移除此角色？')) return;
    await supabase.from('user_roles').delete().eq('id', id);
    toast.success('已移除');
    fetchRoles();
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-foreground mb-6">角色管理</h2>

      <Card className="mb-6">
        <CardContent className="pt-4 space-y-3">
          <p className="text-sm text-muted-foreground">新增角色給指定用戶</p>
          <div className="flex gap-3 items-end flex-wrap">
            <div className="flex-1 min-w-[200px]">
              <Label>用戶 ID (UUID)</Label>
              <Input value={newEmail} onChange={e => setNewEmail(e.target.value)} placeholder="user uuid..." />
            </div>
            <div className="w-40">
              <Label>角色</Label>
              <Select value={newRole} onValueChange={v => setNewRole(v as AppRole)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {(Object.keys(ROLE_LABELS) as AppRole[]).map(r => (
                    <SelectItem key={r} value={r}>{ROLE_LABELS[r]}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Button onClick={handleAdd} disabled={adding}>
              <Plus className="h-4 w-4 mr-1" />新增
            </Button>
          </div>
        </CardContent>
      </Card>

      {loading ? (
        <p className="text-muted-foreground">載入中...</p>
      ) : (
        <div className="space-y-2">
          {roles.map(r => (
            <Card key={r.id}>
              <CardContent className="flex items-center justify-between py-3">
                <div>
                  <p className="text-sm font-medium text-foreground">{r.email}</p>
                  <p className="text-xs text-muted-foreground">
                    <span className="inline-block px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-medium">
                      {ROLE_LABELS[r.role] || r.role}
                    </span>
                  </p>
                </div>
                <Button variant="destructive" size="sm" onClick={() => handleDelete(r.id)}>
                  <Trash2 className="h-3.5 w-3.5" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
