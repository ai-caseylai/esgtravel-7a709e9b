import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useI18n, ui } from '@/lib/i18n';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Leaf, ArrowRight } from 'lucide-react';
import { toast } from 'sonner';

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
      email,
      password,
      options: {
        emailRedirectTo: window.location.origin,
        data: { contact_name: name },
      },
    });

    if (error) {
      toast.error(error.message);
    } else {
      toast.success(t({ 0: '請檢查郵箱以確認帳號', 1: '请检查邮箱以确认帐号', 2: 'Check your email to confirm your account', 3: 'メールを確認してアカウントを認証してください' }));
      navigate('/mobile/login');
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
          <CardTitle className="text-2xl">{t(ui.signup)}</CardTitle>
          <CardDescription>
            {t({ 0: '創建你的 ESG Travel 帳號', 1: '创建你的 ESG Travel 帐号', 2: 'Create your ESG Travel account', 3: 'ESG Travel アカウントを作成' })}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSignup} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">{t(ui.name)}</Label>
              <Input
                id="name"
                value={name}
                onChange={e => setName(e.target.value)}
                required
              />
            </div>
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
                {t({ 0: '密碼', 1: '密码', 2: 'Password', 3: 'パスワード' })}
              </Label>
              <Input
                id="password"
                type="password"
                minLength={6}
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full gap-2" disabled={loading}>
              {t(ui.signup)} <ArrowRight className="h-4 w-4" />
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            {t({ 0: '已有帳號？', 1: '已有帐号？', 2: 'Already have an account?', 3: 'すでにアカウントをお持ちですか？' })}{' '}
            <Link to="/mobile/login" className="text-primary font-medium hover:underline">
              {t(ui.login)}
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
