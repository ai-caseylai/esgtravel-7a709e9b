import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Plus, Trash2, Shield } from 'lucide-react';

type AppRole = 'user' | 'agent' | 'company_admin' | 'admin' | 'editor';

interface RoleRow {
  id: string;
  user_id: string;
  role: AppRole;
  displayName?: string;
}

interface UserOption {
  id: string;
  label: string;
}

const ROLE_LABELS: Record<AppRole, string> = {
  user: '用戶',
  editor: '小編',
  agent: '代理',
  company_admin: '公司管理員',
  admin: '管理員',
};

const ROLE_COLORS: Record<AppRole, string> = {
  admin: 'bg-destructive/10 text-destructive',
  editor: 'bg-primary/10 text-primary',
  company_admin: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400',
  agent: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
  user: 'bg-muted text-muted-foreground',
};

export default function AdminRoles() {
  const [roles, setRoles] = useState<RoleRow[]>([]);
  const [users, setUsers] = useState<UserOption[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState<string | undefined>(undefined);
  const [newRole, setNewRole] = useState<AppRole>('editor');
  const [adding, setAdding] = useState(false);

  const fetchData = async () => {
    setLoading(true);

    // Fetch roles
    const { data: roleData } = await supabase.from('user_roles').select('*');

    // Fetch all profiles for display names & user picker
    const { data: profiles } = await supabase
      .from('profiles')
      .select('id, contact_name, mobile');

    const profileMap = new Map(
      (profiles ?? []).map((p: any) => [p.id, p.contact_name || p.mobile || p.id.slice(0, 8)])
    );

    // Build role rows with display names
    const rows: RoleRow[] = (roleData ?? []).map((r: any) => ({
      ...r,
      displayName: profileMap.get(r.user_id) || r.user_id.slice(0, 8),
    }));
    setRoles(rows);

    // Build user options
    const userOptions: UserOption[] = (profiles ?? []).map((p: any) => ({
      id: p.id,
      label: p.contact_name
        ? `${p.contact_name}${p.mobile ? ` (${p.mobile})` : ''}`
        : p.mobile || p.id.slice(0, 8),
    }));
    userOptions.sort((a, b) => a.label.localeCompare(b.label));
    setUsers(userOptions);

    setLoading(false);
  };

  useEffect(() => { fetchData(); }, []);

  const handleAdd = async () => {
    if (!selectedUser) { toast.error('請選擇用戶'); return; }
    setAdding(true);
    const { error } = await supabase.from('user_roles').insert({
      user_id: selectedUser,
      role: newRole,
    });
    if (error) {
      toast.error(error.message.includes('duplicate') ? '此用戶已有該角色' : error.message);
    } else {
      toast.success('角色已新增');
      setSelectedUser(undefined);
      fetchData();
    }
    setAdding(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('確定移除此角色？')) return;
    await supabase.from('user_roles').delete().eq('id', id);
    toast.success('已移除');
    fetchData();
  };

  // Group roles by user
  const grouped = roles.reduce<Record<string, RoleRow[]>>((acc, r) => {
    const key = r.user_id;
    if (!acc[key]) acc[key] = [];
    acc[key].push(r);
    return acc;
  }, {});

  return (
    <div>
      <h2 className="text-2xl font-bold text-foreground mb-6">角色管理</h2>

      {/* Add role */}
      <Card className="mb-6">
        <CardContent className="pt-4 space-y-3">
          <p className="text-sm text-muted-foreground">新增角色給指定用戶</p>
          <div className="flex gap-3 items-end flex-wrap">
            <div className="flex-1 min-w-[200px]">
              <Label>選擇用戶</Label>
              <Select value={selectedUser} onValueChange={setSelectedUser}>
                <SelectTrigger>
                  <SelectValue placeholder="請選擇用戶..." />
                </SelectTrigger>
                <SelectContent>
                  {users.map(u => (
                    <SelectItem key={u.id} value={u.id}>{u.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
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

      {/* Roles list grouped by user */}
      {loading ? (
        <p className="text-muted-foreground">載入中...</p>
      ) : Object.keys(grouped).length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">
          <Shield className="h-10 w-10 mx-auto mb-3 opacity-40" />
          <p>尚無角色記錄</p>
        </div>
      ) : (
        <div className="space-y-3">
          {Object.entries(grouped).map(([userId, userRoles]) => (
            <Card key={userId}>
              <CardContent className="py-4">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-foreground">
                    {userRoles[0].displayName}
                  </p>
                  <div className="flex items-center gap-2 flex-wrap justify-end">
                    {userRoles.map(r => (
                      <div key={r.id} className="flex items-center gap-1">
                        <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-medium ${ROLE_COLORS[r.role] || ROLE_COLORS.user}`}>
                          {ROLE_LABELS[r.role] || r.role}
                        </span>
                        <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => handleDelete(r.id)}>
                          <Trash2 className="h-3 w-3 text-destructive" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <p className="text-xs text-muted-foreground mt-4">
        共 {roles.length} 個角色分配，{Object.keys(grouped).length} 位用戶
      </p>
    </div>
  );
}
