import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useI18n } from '@/lib/i18n';
import { toast } from 'sonner';
import MobileHeader from '@/components/MobileHeader';
import { Leaf } from 'lucide-react';

export default function LoginPage() {
  const { t } = useI18n();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [mode, setMode] = useState<'password' | 'otp'>('password');
  const [otpSent, setOtpSent] = useState(false);
  const [countdown, setCountdown] = useState(0);

  const handlePasswordLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!re.test(email)) { setError(t({ 0: '無效電郵', 1: '无效邮箱', 2: 'Invalid email', 3: '無効なメール' })); return; }
    if (password.length < 6) { setError(t({ 0: '密碼至少6位', 1: '密码至少6位', 2: 'Min 6 characters', 3: '6文字以上' })); return; }
    setError(''); setLoading(true);
    const { error: authError } = await supabase.auth.signInWithPassword({ email, password });
    if (authError) { setError(t({ 0: '電郵或密碼不正確', 1: '邮箱或密码不正确', 2: 'Incorrect email or password', 3: 'メールまたはパスワードが違います' })); }
    else { toast.success(t({ 0: '登入成功', 1: '登录成功', 2: 'Logged in', 3: 'ログイン成功' })); navigate('/mobile/passport'); }
    setLoading(false);
  };

  const handleOtpLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!re.test(email)) { setError(t({ 0: '無效電郵', 1: '无效邮箱', 2: 'Invalid email', 3: '無効なメール' })); return; }
    setError(''); setLoading(true);
    try {
      const { error: authError } = await supabase.auth.signInWithOtp({ email, options: { emailRedirectTo: window.location.origin } });
      if (authError) { toast.error(authError.message); }
      else {
        setOtpSent(true);
        toast.success(t({ 0: '請檢查郵箱', 1: '请检查邮箱', 2: 'Check your email', 3: 'メールを確認' }));
        setCountdown(29);
        const timer = setInterval(() => { setCountdown(prev => { if (prev <= 1) { clearInterval(timer); return 0; } return prev - 1; }); }, 1000);
      }
    } catch (err: any) { toast.error(err.message); }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <MobileHeader title={t({ 0: '登入', 1: '登录', 2: 'Sign In', 3: 'ログイン' })} showBack />

      <div className="px-6 pt-8">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center">
            <Leaf className="w-8 h-8 text-primary" />
          </div>
        </div>

        <h2 className="text-[22px] font-bold text-foreground text-center mb-1">
          {t({ 0: '歡迎回來', 1: '欢迎回来', 2: 'Welcome back', 3: 'おかえりなさい' })}
        </h2>
        <p className="text-muted-foreground text-[14px] text-center mb-6">
          {t({ 0: '登入你的影響力護照', 1: '登录你的影响力护照', 2: 'Sign in to your Impact Passport', 3: 'インパクトパスポートにログイン' })}
        </p>

        {/* Mode toggle */}
        <div className="flex bg-muted rounded-xl p-1 mb-6">
          <button
            onClick={() => { setMode('password'); setError(''); }}
            className={`flex-1 py-2 rounded-lg text-[13px] font-medium transition-all border-none ${
              mode === 'password' ? 'bg-card text-foreground shadow-sm' : 'text-muted-foreground'
            }`}
          >
            {t({ 0: '密碼', 1: '密码', 2: 'Password', 3: 'パスワード' })}
          </button>
          <button
            onClick={() => { setMode('otp'); setError(''); }}
            className={`flex-1 py-2 rounded-lg text-[13px] font-medium transition-all border-none ${
              mode === 'otp' ? 'bg-card text-foreground shadow-sm' : 'text-muted-foreground'
            }`}
          >
            Magic Link
          </button>
        </div>

        {/* Form */}
        <form onSubmit={mode === 'password' ? handlePasswordLogin : handleOtpLogin} className="space-y-4">
          <div>
            <label className="text-[12px] text-muted-foreground font-medium block mb-1.5">
              {t({ 0: '電郵地址', 1: '邮箱地址', 2: 'Email address', 3: 'メールアドレス' })}
            </label>
            <input
              type="email" required value={email} onChange={e => setEmail(e.target.value)}
              className="w-full h-11 px-3.5 rounded-xl border border-border bg-card text-foreground text-[15px] outline-none focus:ring-2 focus:ring-primary/30 transition"
              placeholder="you@example.com"
            />
          </div>

          {mode === 'password' && (
            <div>
              <label className="text-[12px] text-muted-foreground font-medium block mb-1.5">
                {t({ 0: '密碼', 1: '密码', 2: 'Password', 3: 'パスワード' })}
              </label>
              <input
                type="password" required minLength={6} value={password} onChange={e => setPassword(e.target.value)}
                className="w-full h-11 px-3.5 rounded-xl border border-border bg-card text-foreground text-[15px] outline-none focus:ring-2 focus:ring-primary/30 transition"
                placeholder="••••••"
              />
            </div>
          )}

          {error && <p className="text-destructive text-[13px]">{error}</p>}

          <button
            type="submit"
            disabled={loading || (mode === 'otp' && countdown > 0)}
            className="w-full h-12 rounded-xl bg-primary text-primary-foreground font-semibold text-[15px] border-none disabled:opacity-50 transition-opacity"
          >
            {loading ? '...' : mode === 'otp' && countdown > 0 ? `Resend in ${countdown}s` : t({ 0: '登入', 1: '登录', 2: 'Sign In', 3: 'ログイン' })}
          </button>
        </form>

        <p className="mt-6 text-center text-[13px] text-muted-foreground">
          {t({ 0: '還沒有帳號？', 1: '还没有帐号？', 2: "Don't have an account?", 3: 'アカウントをお持ちでないですか？' })}{' '}
          <Link to="/mobile/signup" className="text-primary font-medium">
            {t({ 0: '註冊', 1: '注册', 2: 'Sign up', 3: 'サインアップ' })}
          </Link>
        </p>
      </div>
    </div>
  );
}
