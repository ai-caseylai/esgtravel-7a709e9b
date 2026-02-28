import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useI18n, ui } from '@/lib/i18n';
import { useAuth } from '@/lib/auth';
import { supabase } from '@/integrations/supabase/client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import MobileHeader from '@/components/MobileHeader';
import { User, Globe, Mail, LogOut, Lock, ChevronRight } from 'lucide-react';

export default function SettingsPage() {
  const { lang, setLang, t } = useI18n();
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [editingProfile, setEditingProfile] = useState(false);
  const [editingPassword, setEditingPassword] = useState(false);
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const { data: profile } = useQuery({
    queryKey: ['profile', user?.id],
    queryFn: async () => {
      if (!user) return null;
      const { data } = await supabase.from('profiles').select('*').eq('id', user.id).single();
      if (data) { setName(data.contact_name || ''); setMobile(data.mobile || ''); }
      return data;
    },
    enabled: !!user,
  });

  const updateProfile = useMutation({
    mutationFn: async () => {
      if (!user) return;
      const { error } = await supabase.from('profiles').update({ contact_name: name, mobile }).eq('id', user.id);
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success(t({ 0: '已更新', 1: '已更新', 2: 'Updated', 3: '更新しました' }));
      queryClient.invalidateQueries({ queryKey: ['profile'] });
      setEditingProfile(false);
    },
    onError: (err: any) => toast.error(err.message),
  });

  const updatePassword = useMutation({
    mutationFn: async () => {
      const { error } = await supabase.auth.updateUser({ password: newPassword });
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success(t({ 0: '密碼已更新', 1: '密码已更新', 2: 'Password updated', 3: 'パスワード更新済み' }));
      setEditingPassword(false);
      setNewPassword('');
    },
    onError: (err: any) => toast.error(err.message),
  });

  const handleLogout = async () => {
    await signOut();
    navigate('/mobile');
  };

  if (!user) { navigate('/mobile/login'); return null; }

  const langOptions = [
    { value: 0 as const, label: '繁體中文' },
    { value: 1 as const, label: '简体中文' },
    { value: 2 as const, label: 'English' },
    { value: 3 as const, label: '日本語' },
  ];

  const SettingsRow = ({ icon: Icon, label, onClick, destructive, right }: {
    icon: any; label: string; onClick?: () => void; destructive?: boolean; right?: React.ReactNode;
  }) => (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-4 py-3.5 bg-transparent border-none text-left transition-colors active:bg-muted/50 ${
        destructive ? '' : ''
      }`}
    >
      <Icon className={`w-[18px] h-[18px] ${destructive ? 'text-destructive' : 'text-primary'}`} />
      <span className={`flex-1 text-[15px] ${destructive ? 'text-destructive' : 'text-foreground'}`}>{label}</span>
      {right || (onClick && <ChevronRight className="w-4 h-4 text-muted-foreground" />)}
    </button>
  );

  return (
    <div className="min-h-screen bg-background">
      <MobileHeader title={t({ 0: '設定', 1: '设置', 2: 'Settings', 3: '設定' })} />

      {/* Account info */}
      <div className="px-5 py-4">
        <div className="bg-card rounded-2xl border border-border p-4 flex items-center gap-3">
          <div className="w-11 h-11 rounded-full bg-primary/10 flex items-center justify-center">
            <User className="w-5 h-5 text-primary" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-foreground font-semibold text-[15px] truncate">{profile?.contact_name || user.email?.split('@')[0]}</p>
            <p className="text-muted-foreground text-[12px] truncate">{user.email}</p>
          </div>
        </div>
      </div>

      {/* Settings groups */}
      <div className="px-5 space-y-3">
        {/* Profile section */}
        <div className="bg-card rounded-2xl border border-border overflow-hidden divide-y divide-border">
          <SettingsRow icon={User} label={t({ 0: '個人資料', 1: '个人资料', 2: 'Personal Info', 3: '個人情報' })} onClick={() => setEditingProfile(!editingProfile)} />
          {editingProfile && (
            <div className="px-4 py-3 space-y-3 bg-muted/30">
              <div>
                <Label className="text-[12px]">{t(ui.name)}</Label>
                <Input value={name} onChange={e => setName(e.target.value)} className="h-9 text-[14px]" />
              </div>
              <div>
                <Label className="text-[12px]">{t(ui.phone)}</Label>
                <Input value={mobile} onChange={e => setMobile(e.target.value)} className="h-9 text-[14px]" />
              </div>
              <Button onClick={() => updateProfile.mutate()} disabled={updateProfile.isPending} size="sm" className="w-full">
                {t({ 0: '儲存', 1: '保存', 2: 'Save', 3: '保存' })}
              </Button>
            </div>
          )}
          <SettingsRow icon={Lock} label={t({ 0: '更改密碼', 1: '更改密码', 2: 'Change Password', 3: 'パスワード変更' })} onClick={() => setEditingPassword(!editingPassword)} />
          {editingPassword && (
            <div className="px-4 py-3 space-y-3 bg-muted/30">
              <div>
                <Label className="text-[12px]">{t({ 0: '新密碼', 1: '新密码', 2: 'New Password', 3: '新しいパスワード' })}</Label>
                <Input type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)} minLength={6} className="h-9 text-[14px]" />
              </div>
              <Button onClick={() => updatePassword.mutate()} disabled={updatePassword.isPending || newPassword.length < 6} size="sm" className="w-full">
                {t({ 0: '更新', 1: '更新', 2: 'Update', 3: '更新' })}
              </Button>
            </div>
          )}
        </div>

        {/* Language */}
        <div className="bg-card rounded-2xl border border-border overflow-hidden">
          <div className="flex items-center gap-3 px-4 pt-3.5 pb-2">
            <Globe className="w-[18px] h-[18px] text-primary" />
            <span className="text-foreground text-[15px]">{t({ 0: '語言', 1: '语言', 2: 'Language', 3: '言語' })}</span>
          </div>
          <div className="px-4 pb-3.5 grid grid-cols-4 gap-2">
            {langOptions.map(opt => (
              <button
                key={opt.value}
                onClick={() => setLang(opt.value)}
                className={`py-2 rounded-lg text-[12px] font-medium border transition-colors ${
                  lang === opt.value
                    ? 'bg-primary text-primary-foreground border-primary'
                    : 'bg-background text-foreground border-border'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="bg-card rounded-2xl border border-border overflow-hidden divide-y divide-border">
          <SettingsRow icon={Mail} label={t(ui.contactUs)} onClick={() => navigate('/mobile/contact')} />
        </div>

        {/* Logout */}
        <div className="bg-card rounded-2xl border border-destructive/20 overflow-hidden">
          <SettingsRow icon={LogOut} label={t(ui.logout)} onClick={handleLogout} destructive />
        </div>
      </div>
    </div>
  );
}
