import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useI18n, ui } from '@/lib/i18n';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Leaf, Mail, ArrowRight } from 'lucide-react';
import { toast } from 'sonner';

export default function LoginPage() {
  const { t } = useI18n();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      toast.error(error.message);
    } else {
      navigate('/');
    }
    setLoading(false);
  };

  const handleMagicLink = async () => {
    if (!email) {
      toast.error('Please enter your email');
      return;
    }
    setLoading(true);
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: window.location.origin },
    });

    if (error) {
      toast.error(error.message);
    } else {
      toast.success(t({ 0: '請檢查你的郵箱', 1: 'Check your email for the login link', 2: 'ログインリンクをメールで確認してください' }));
    }
    setLoading(false);
  };

  return (
    <div className="flex min-h-[80vh] items-center justify-center px-4">
      <Card className="w-full max-w-md border-0 shadow-lg">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
            <Leaf className="h-6 w-6 text-primary" />
          </div>
          <CardTitle className="text-2xl">{t(ui.login)}</CardTitle>
          <CardDescription>
            {t({ 0: '登入你的 ESG Travel 帳號', 1: 'Sign in to your ESG Travel account', 2: 'ESG Travel アカウントにログイン' })}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">{t(ui.email)}</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">
                {t({ 0: '密碼', 1: 'Password', 2: 'パスワード' })}
              </Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
            </div>
            <Button type="submit" className="w-full gap-2" disabled={loading}>
              {t(ui.login)} <ArrowRight className="h-4 w-4" />
            </Button>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-2 text-muted-foreground">
                {t({ 0: '或', 1: 'or', 2: 'または' })}
              </span>
            </div>
          </div>

          <Button
            variant="outline"
            className="w-full gap-2"
            onClick={handleMagicLink}
            disabled={loading}
          >
            <Mail className="h-4 w-4" />
            {t({ 0: '使用魔術連結登入', 1: 'Sign in with Magic Link', 2: 'マジックリンクでログイン' })}
          </Button>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            {t({ 0: '還沒有帳號？', 1: "Don't have an account?", 2: 'アカウントをお持ちでない方' })}{' '}
            <Link to="/signup" className="text-primary font-medium hover:underline">
              {t(ui.signup)}
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
