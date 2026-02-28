import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useI18n, ui } from '@/lib/i18n';
import { toast } from 'sonner';
import AppFooter from '@/components/AppFooter';

export default function LoginPage() {
  const { t, lang } = useI18n();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [countdown, setCountdown] = useState(0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;

    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!re.test(email)) {
      setError(true);
      return;
    }
    setError(false);
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
        toast.success(t({ 0: '請檢查你的郵箱', 1: 'Check your email for the login link', 2: 'ログインリンクをメールで確認してください' }));
        setCountdown(29);
        const timer = setInterval(() => {
          setCountdown(prev => {
            if (prev <= 1) {
              clearInterval(timer);
              return 0;
            }
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
        <button
          onClick={() => navigate(-1)}
          className="absolute left-5 top-6 text-primary text-2xl"
        >
          ←
        </button>
        <h1 className="text-primary font-normal text-2xl tracking-wide">
          {t({ 0: '影響力護照', 1: 'Impact Passport', 2: 'インパクトパスポート' })}
        </h1>
      </div>

      {/* Title */}
      <div className="mt-[8vh] px-[20%]">
        {lang === 1 ? (
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
        ) : (
          <>
            <span className="text-foreground font-bold text-[28px] leading-10">あなたの</span>
            <br />
            <span className="text-primary font-bold text-[28px] leading-10">インパクトに新しい意味を</span>
          </>
        )}
      </div>

      {/* Email form */}
      <div className="mt-[5vh] px-[10%]">
        <form onSubmit={handleSubmit}>
          <label className="text-primary text-lg block mb-2">
            {t({ 0: '登入你的護照：', 1: 'Log in to your passport:', 2: 'パスポートにログイン：' })}
          </label>
          <input
            type="email"
            required
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="w-full border-b-2 border-primary bg-transparent py-2 text-foreground text-lg outline-none"
            placeholder="you@example.com"
          />
          {error && (
            <p className="text-destructive text-sm mt-2">
              {t({ 0: '無效電郵：請嘗試另一個電郵地址', 1: 'Invalid email: Please try another email address', 2: '無効なメール：別のメールアドレスをお試しください' })}
            </p>
          )}

          <div className="flex justify-center mt-[5vh]">
            <button
              type="submit"
              disabled={loading || countdown > 0}
              className="bg-primary text-primary-foreground font-normal text-xl w-[180px] h-10 rounded-xl border-none disabled:opacity-50"
            >
              {countdown > 0
                ? `Resend OTP in ${countdown}`
                : t({ 0: '開始', 1: 'GET STARTED', 2: '始める' })
              }
            </button>
          </div>
        </form>
      </div>

      <div className="absolute bottom-0 w-full">
        <AppFooter />
      </div>
    </div>
  );
}
