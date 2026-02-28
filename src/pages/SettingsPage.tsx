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
import AppFooter from '@/components/AppFooter';
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
      if (data) {
        setName(data.contact_name || '');
        setMobile(data.mobile || '');
      }
      return data;
    },
    enabled: !!user,
  });

  const updateProfile = useMutation({
    mutationFn: async () => {
      if (!user) return;
      const { error } = await supabase.from('profiles').update({
        contact_name: name,
        mobile: mobile,
      }).eq('id', user.id);
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success(t({ 0: '個人資料已更新', 1: 'Profile updated', 2: 'プロフィールを更新しました' }));
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
      toast.success(t({ 0: '密碼已更新', 1: 'Password updated', 2: 'パスワードを更新しました' }));
      setEditingPassword(false);
      setNewPassword('');
    },
    onError: (err: any) => toast.error(err.message),
  });

  const handleLogout = async () => {
    await signOut();
    navigate('/');
  };

  if (!user) {
    navigate('/login');
    return null;
  }

  const langOptions = [
    { value: 0 as const, label: '中文' },
    { value: 1 as const, label: 'English' },
    { value: 2 as const, label: '日本語' },
  ];

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="pt-6 pb-4 text-center">
        <h1 className="text-primary font-bold text-2xl">
          {t({ 0: '設定', 1: 'Settings', 2: '設定' })}
        </h1>
      </div>

      <div className="px-4 space-y-3">
        {/* Personal Info */}
        <div className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden">
          <button
            onClick={() => setEditingProfile(!editingProfile)}
            className="w-full flex items-center gap-3 p-4 text-left bg-transparent border-none cursor-pointer"
          >
            <User className="w-5 h-5 text-primary" />
            <span className="flex-1 text-foreground font-medium">
              {t({ 0: '個人資料', 1: 'Personal Info', 2: '個人情報' })}
            </span>
            <ChevronRight className={`w-4 h-4 text-muted-foreground transition-transform ${editingProfile ? 'rotate-90' : ''}`} />
          </button>
          {editingProfile && (
            <div className="px-4 pb-4 space-y-3">
              <div>
                <Label>{t(ui.name)}</Label>
                <Input value={name} onChange={e => setName(e.target.value)} />
              </div>
              <div>
                <Label>{t(ui.phone)}</Label>
                <Input value={mobile} onChange={e => setMobile(e.target.value)} />
              </div>
              <div>
                <Label>{t(ui.email)}</Label>
                <Input value={user.email || ''} disabled className="opacity-60" />
              </div>
              <Button onClick={() => updateProfile.mutate()} disabled={updateProfile.isPending} className="w-full">
                {t({ 0: '儲存', 1: 'Save', 2: '保存' })}
              </Button>
            </div>
          )}
        </div>

        {/* Language */}
        <div className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden">
          <div className="flex items-center gap-3 p-4">
            <Globe className="w-5 h-5 text-primary" />
            <span className="flex-1 text-foreground font-medium">
              {t({ 0: '語言', 1: 'Language', 2: '言語' })}
            </span>
          </div>
          <div className="px-4 pb-4 flex gap-2">
            {langOptions.map(opt => (
              <button
                key={opt.value}
                onClick={() => setLang(opt.value)}
                className={`flex-1 py-2 rounded-xl text-sm font-medium border transition-colors ${
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

        {/* Contact Us */}
        <button
          onClick={() => navigate('/contact')}
          className="w-full bg-card rounded-2xl border border-border shadow-sm flex items-center gap-3 p-4 text-left cursor-pointer"
        >
          <Mail className="w-5 h-5 text-primary" />
          <span className="flex-1 text-foreground font-medium">
            {t(ui.contactUs)}
          </span>
          <ChevronRight className="w-4 h-4 text-muted-foreground" />
        </button>

        {/* Change Password */}
        <div className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden">
          <button
            onClick={() => setEditingPassword(!editingPassword)}
            className="w-full flex items-center gap-3 p-4 text-left bg-transparent border-none cursor-pointer"
          >
            <Lock className="w-5 h-5 text-primary" />
            <span className="flex-1 text-foreground font-medium">
              {t({ 0: '更改密碼', 1: 'Change Password', 2: 'パスワード変更' })}
            </span>
            <ChevronRight className={`w-4 h-4 text-muted-foreground transition-transform ${editingPassword ? 'rotate-90' : ''}`} />
          </button>
          {editingPassword && (
            <div className="px-4 pb-4 space-y-3">
              <div>
                <Label>{t({ 0: '新密碼', 1: 'New Password', 2: '新しいパスワード' })}</Label>
                <Input type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)} minLength={6} />
              </div>
              <Button onClick={() => updatePassword.mutate()} disabled={updatePassword.isPending || newPassword.length < 6} className="w-full">
                {t({ 0: '更新密碼', 1: 'Update Password', 2: 'パスワードを更新' })}
              </Button>
            </div>
          )}
        </div>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="w-full bg-card rounded-2xl border border-destructive/30 shadow-sm flex items-center gap-3 p-4 text-left cursor-pointer"
        >
          <LogOut className="w-5 h-5 text-destructive" />
          <span className="flex-1 text-destructive font-medium">
            {t(ui.logout)}
          </span>
        </button>
      </div>

      <AppFooter />
    </div>
  );
}
