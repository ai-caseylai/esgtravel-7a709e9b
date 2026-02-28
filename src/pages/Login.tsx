import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useI18n } from '@/lib/i18n';
import { toast } from 'sonner';
import AppFooter from '@/components/AppFooter';

export default function LoginPage() {
  const { t, lang } = useI18n();
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
    if (!re.test(email)) {
      setError(t({ 0: '無效電郵', 1: '无效邮箱', 2: 'Invalid email', 3: '無効なメール' }));
      return;
    }
    if (password.length < 6) {
      setError(t({ 0: '密碼至少6位', 1: '密码至少6位', 2: 'Password must be at least 6 characters', 3: 'パスワードは6文字以上' }));
      return;
    }
    setError('');
    setLoading(true);

    const { error: authError } = await supabase.auth.signInWithPassword({ email, password });

    if (authError) {
      setError(t({ 0: '電郵或密碼不正確', 1: '邮箱或密码不正确', 2: 'Incorrect email or password', 3: 'メールまたはパスワードが正しくありません' }));
    } else {
      toast.success(t({ 0: '登入成功', 1: '登录成功', 2: 'Login successful', 3: 'ログイン成功' }));
      navigate('/mobile/passport');
    }
    setLoading(false);
  };

  const handleOtpLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;

    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!re.test(email)) {
      setError(t({ 0: '無效電郵', 1: '无效邮箱', 2: 'Invalid email', 3: '無効なメール' }));
      return;
    }
    setError('');
    setLoading(true);

    try {
      const { error: authError } = await supabase.auth.signInWithOtp({
        email,
        options: { emailRedirectTo: window.location.origin },
      });

      if (authError) {
        toast.error(authError.message);
      } else {
        setOtpSent(true);
        toast.success(t({ 0: '請檢查你的郵箱', 1: '请检查你的邮箱', 2: 'Check your email for the login link', 3: 'ログインリンクをメールで確認してください' }));
        setCountdown(29);
        const timer = setInterval(() => {
          setCountdown(prev => {
            if (prev <= 1) { clearInterval(timer); return 0; }
            return prev - 1;
          });
        }, 1000);
      }
    } catch (err: any) {
      toast.error(err.message || 'Error');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="flex items-center justify-center pt-6 pb-2 relative">
        <button onClick={() => navigate(-1)} className="absolute left-5 top-6 text-primary text-2xl">←</button>
        <h1 className="text-primary font-normal text-2xl tracking-wide">
          {t({ 0: '影響力護照', 1: '影响力护照', 2: 'Impact Passport', 3: 'インパクトパスポート' })}
        </h1>
      </div>

      {/* Title */}
      <div className="mt-[8vh] px-[20%]">
        {lang === 2 ? (
          <>
            <span className="text-foreground font-bold text-[28px] leading-10">Give </span>
            <span className="text-primary font-bold text-[28px] leading-10">Your Impact!</span>
            <br />
            <span className="text-foreground font-bold text-[28px] leading-10">a </span>
            <span className="text-primary font-bold text-[28px] leading-10">New meaning</span>
          </>
        ) : lang === 0 ? (
          <>
            <span className="text-foreground font-bold text-[28px] leading-10">為你的</span>
            <br />
            <span className="text-primary font-bold text-[28px] leading-10">影響力賦予新意義</span>
          </>
        ) : lang === 1 ? (
          <>
            <span className="text-foreground font-bold text-[28px] leading-10">为你的</span>
            <br />
            <span className="text-primary font-bold text-[28px] leading-10">影响力赋予新意义</span>
          </>
        ) : (
          <>
            <span className="text-foreground font-bold text-[28px] leading-10">あなたの</span>
            <br />
            <span className="text-primary font-bold text-[28px] leading-10">インパクトに新しい意味を</span>
          </>
        )}
      </div>

      {/* Mode toggle */}
      <div className="mt-[3vh] px-[10%] flex gap-4 justify-center">
        <button
          onClick={() => { setMode('password'); setError(''); }}
          className={`text-sm pb-1 border-b-2 transition-colors ${mode === 'password' ? 'border-primary text-primary font-medium' : 'border-transparent text-muted-foreground'}`}
        >
          {t({ 0: '密碼登入', 1: '密码登录', 2: 'Password', 3: 'パスワード' })}
        </button>
        <button
          onClick={() => { setMode('otp'); setError(''); }}
          className={`text-sm pb-1 border-b-2 transition-colors ${mode === 'otp' ? 'border-primary text-primary font-medium' : 'border-transparent text-muted-foreground'}`}
        >
          {t({ 0: 'Magic Link', 1: 'Magic Link', 2: 'Magic Link', 3: 'Magic Link' })}
        </button>
      </div>

      {/* Form */}
      <div className="mt-[3vh] px-[10%]">
        <form onSubmit={mode === 'password' ? handlePasswordLogin : handleOtpLogin}>
          <label className="text-primary text-lg block mb-2">
            {t({ 0: '登入你的護照：', 1: '登录你的护照：', 2: 'Log in to your passport:', 3: 'パスポートにログイン：' })}
          </label>
          <input
            type="email"
            required
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="w-full border-b-2 border-primary bg-transparent py-2 text-foreground text-lg outline-none"
            placeholder="you@example.com"
          />

          {mode === 'password' && (
            <input
              type="password"
              required
              minLength={6}
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full border-b-2 border-primary bg-transparent py-2 text-foreground text-lg outline-none mt-4"
              placeholder={t({ 0: '密碼', 1: '密码', 2: 'Password', 3: 'パスワード' })}
            />
          )}

          {error && <p className="text-destructive text-sm mt-2">{error}</p>}

          <div className="flex justify-center mt-[5vh]">
            <button
              type="submit"
              disabled={loading || (mode === 'otp' && countdown > 0)}
              className="bg-primary text-primary-foreground font-normal text-xl w-[180px] h-10 rounded-xl border-none disabled:opacity-50"
            >
              {mode === 'otp' && countdown > 0
                ? `Resend in ${countdown}`
                : t({ 0: '開始', 1: '开始', 2: 'GET STARTED', 3: '始める' })}
            </button>
          </div>
        </form>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          {t({ 0: '還沒有帳號？', 1: '还没有帐号？', 2: "Don't have an account?", 3: 'アカウントをお持ちでない方' })}{' '}
          <Link to="/mobile/signup" className="text-primary font-medium hover:underline">
            {t({ 0: '註冊', 1: '注册', 2: 'Sign up', 3: 'サインアップ' })}
          </Link>
        </p>
      </div>

      <div className="absolute bottom-0 w-full">
        <AppFooter />
      </div>
    </div>
  );
}
