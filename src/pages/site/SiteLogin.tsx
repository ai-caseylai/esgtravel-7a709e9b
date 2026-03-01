import { useEffect, useState } from 'react';
import { useNavigate, Link, useSearchParams } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useI18n } from '@/lib/i18n';
import { toast } from 'sonner';
import { Leaf, Mail, Lock, ArrowRight } from 'lucide-react';

export default function SiteLogin() {
  const { t } = useI18n();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get('redirect') || '/site';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [mode, setMode] = useState<'password' | 'otp'>('password');
  const [otpSent, setOtpSent] = useState(false);
  const [countdown, setCountdown] = useState(0);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) navigate(redirectTo, { replace: true });
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if ((event === 'SIGNED_IN' || event === 'INITIAL_SESSION') && session?.user) {
        navigate(redirectTo, { replace: true });
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate, redirectTo]);

  const handlePasswordLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!re.test(email)) { setError(t({ 0: '無效電郵', 1: '无效邮箱', 2: 'Invalid email', 3: '無効なメール' })); return; }
    if (password.length < 6) { setError(t({ 0: '密碼至少6位', 1: '密码至少6位', 2: 'Min 6 characters', 3: '6文字以上' })); return; }
    setError(''); setLoading(true);
    const { error: authError } = await supabase.auth.signInWithPassword({ email, password });
    if (authError) { setError(t({ 0: '電郵或密碼不正確', 1: '邮箱或密码不正确', 2: 'Incorrect email or password', 3: 'メールまたはパスワードが違います' })); }
    else { toast.success(t({ 0: '登入成功', 1: '登录成功', 2: 'Logged in', 3: 'ログイン成功' })); navigate(redirectTo); }
    setLoading(false);
  };

  const handleOtpLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!re.test(email)) { setError(t({ 0: '無效電郵', 1: '无效邮箱', 2: 'Invalid email', 3: '無効なメール' })); return; }
    setError(''); setLoading(true);
    try {
      const { error: authError } = await supabase.auth.signInWithOtp({ email, options: { emailRedirectTo: `${window.location.origin}/site/login?redirect=${encodeURIComponent(redirectTo)}` } });
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
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md">
        {/* Logo & heading */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-5">
            <Leaf className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-2xl font-bold text-foreground">
            {t({ 0: '歡迎回來', 1: '欢迎回来', 2: 'Welcome Back', 3: 'おかえりなさい' })}
          </h1>
          <p className="text-muted-foreground text-sm mt-1.5">
            {t({ 0: '登入你的 STAR SDG 帳號', 1: '登录你的 STAR SDG 账号', 2: 'Sign in to your STAR SDG account', 3: 'STAR SDGアカウントにログイン' })}
          </p>
        </div>

        {/* Card */}
        <div className="bg-card border border-border rounded-2xl shadow-lg p-8">
          {/* Mode tabs */}
          <div className="flex bg-muted rounded-xl p-1 mb-6">
            <button
              onClick={() => { setMode('password'); setError(''); }}
              className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-all border-none cursor-pointer ${
                mode === 'password' ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {t({ 0: '密碼登入', 1: '密码登录', 2: 'Password', 3: 'パスワード' })}
            </button>
            <button
              onClick={() => { setMode('otp'); setError(''); }}
              className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-all border-none cursor-pointer ${
                mode === 'otp' ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {t({ 0: '電郵快速登入(OTP)', 1: '邮箱快速登录(OTP)', 2: 'Email OTP', 3: 'メールOTP' })}
            </button>
          </div>

          <form onSubmit={mode === 'password' ? handlePasswordLogin : handleOtpLogin} className="space-y-5">
            {/* Email */}
            <div>
              <label className="text-xs text-muted-foreground font-medium block mb-1.5">
                {t({ 0: '電郵地址', 1: '邮箱地址', 2: 'Email Address', 3: 'メールアドレス' })}
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="email" required value={email} onChange={e => setEmail(e.target.value)}
                  className="w-full h-11 pl-10 pr-4 rounded-xl border border-border bg-background text-foreground text-sm outline-none focus:ring-2 focus:ring-primary/30 transition"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            {/* Password */}
            {mode === 'password' && (
              <div>
                <label className="text-xs text-muted-foreground font-medium block mb-1.5">
                  {t({ 0: '密碼', 1: '密码', 2: 'Password', 3: 'パスワード' })}
                </label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    type="password" required minLength={6} value={password} onChange={e => setPassword(e.target.value)}
                    className="w-full h-11 pl-10 pr-4 rounded-xl border border-border bg-background text-foreground text-sm outline-none focus:ring-2 focus:ring-primary/30 transition"
                    placeholder="••••••"
                  />
                </div>
              </div>
            )}

            {/* OTP sent message */}
            {mode === 'otp' && otpSent && (
              <div className="bg-primary/5 border border-primary/20 rounded-xl p-4 text-sm text-primary">
                {t({ 0: '登入連結已發送至您的郵箱，請查收。', 1: '登录链接已发送至您的邮箱，请查收。', 2: 'A login link has been sent to your email.', 3: 'ログインリンクをメールに送信しました。' })}
              </div>
            )}

            {error && <p className="text-destructive text-sm">{error}</p>}

            <button
              type="submit"
              disabled={loading || (mode === 'otp' && countdown > 0)}
              className="w-full h-12 rounded-xl bg-primary text-primary-foreground font-semibold text-sm border-none disabled:opacity-50 transition-all hover:opacity-90 cursor-pointer flex items-center justify-center gap-2"
            >
              {loading ? '...' : mode === 'otp' && countdown > 0
                ? `${t({ 0: '重新發送', 1: '重新发送', 2: 'Resend in', 3: '再送信' })} ${countdown}s`
                : (
                  <>
                    {t({ 0: '登入', 1: '登录', 2: 'Sign In', 3: 'ログイン' })}
                    <ArrowRight className="w-4 h-4" />
                  </>
                )
              }
            </button>
          </form>
        </div>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          {t({ 0: '還沒有帳號？', 1: '还没有账号？', 2: "Don't have an account?", 3: 'アカウントをお持ちでないですか？' })}{' '}
          <Link to="/mobile/signup" className="text-primary font-medium hover:underline">
            {t({ 0: '立即註冊', 1: '立即注册', 2: 'Sign Up', 3: '新規登録' })}
          </Link>
        </p>
      </div>
    </div>
  );
}
