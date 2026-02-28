import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useI18n, ui } from '@/lib/i18n';
import { toast } from 'sonner';
import MobileHeader from '@/components/MobileHeader';
import { Leaf } from 'lucide-react';

export default function SignupPage() {
  const { t } = useI18n();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email, password,
      options: { emailRedirectTo: window.location.origin, data: { contact_name: name } },
    });
    if (error) { toast.error(error.message); }
    else {
      toast.success(t({ 0: '請檢查郵箱確認帳號', 1: '请检查邮箱确认帐号', 2: 'Check your email to confirm', 3: 'メールを確認してください' }));
      navigate('/mobile/login');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <MobileHeader title={t(ui.signup)} showBack />

      <div className="px-6 pt-8">
        <div className="flex justify-center mb-6">
          <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center">
            <Leaf className="w-7 h-7 text-primary" />
          </div>
        </div>

        <h2 className="text-[20px] font-bold text-foreground text-center mb-6">
          {t({ 0: '創建帳號', 1: '创建帐号', 2: 'Create Account', 3: 'アカウント作成' })}
        </h2>

        <form onSubmit={handleSignup} className="space-y-4">
          <div>
            <label className="text-[12px] text-muted-foreground font-medium block mb-1.5">{t(ui.name)}</label>
            <input
              value={name} onChange={e => setName(e.target.value)} required
              className="w-full h-11 px-3.5 rounded-xl border border-border bg-card text-foreground text-[15px] outline-none focus:ring-2 focus:ring-primary/30 transition"
            />
          </div>
          <div>
            <label className="text-[12px] text-muted-foreground font-medium block mb-1.5">{t(ui.email)}</label>
            <input
              type="email" value={email} onChange={e => setEmail(e.target.value)} required placeholder="you@example.com"
              className="w-full h-11 px-3.5 rounded-xl border border-border bg-card text-foreground text-[15px] outline-none focus:ring-2 focus:ring-primary/30 transition"
            />
          </div>
          <div>
            <label className="text-[12px] text-muted-foreground font-medium block mb-1.5">
              {t({ 0: '密碼', 1: '密码', 2: 'Password', 3: 'パスワード' })}
            </label>
            <input
              type="password" minLength={6} value={password} onChange={e => setPassword(e.target.value)} required placeholder="••••••"
              className="w-full h-11 px-3.5 rounded-xl border border-border bg-card text-foreground text-[15px] outline-none focus:ring-2 focus:ring-primary/30 transition"
            />
          </div>
          <button type="submit" disabled={loading}
            className="w-full h-12 rounded-xl bg-primary text-primary-foreground font-semibold text-[15px] border-none disabled:opacity-50"
          >
            {t(ui.signup)}
          </button>
        </form>

        <p className="mt-6 text-center text-[13px] text-muted-foreground">
          {t({ 0: '已有帳號？', 1: '已有帐号？', 2: 'Have an account?', 3: 'アカウントをお持ちですか？' })}{' '}
          <Link to="/mobile/login" className="text-primary font-medium">{t(ui.login)}</Link>
        </p>
      </div>
    </div>
  );
}
