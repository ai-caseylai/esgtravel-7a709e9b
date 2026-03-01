import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useI18n } from '@/lib/i18n';
import { toast } from 'sonner';
import MobileHeader from '@/components/MobileHeader';
import { Leaf } from 'lucide-react';
import { useMobileContent } from '@/hooks/use-mobile-content';

export default function SignupPage() {
  const { t } = useI18n();
  const navigate = useNavigate();
  const { mc } = useMobileContent();
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
      toast.success(mc('signup', 'confirm_msg', 'Check your email to confirm'));
      navigate('/mobile/login');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <MobileHeader title={mc('signup', 'page_title', 'Sign Up')} showBack />

      <div className="px-6 pt-8">
        <div className="flex justify-center mb-6">
          <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center">
            <Leaf className="w-7 h-7 text-primary" />
          </div>
        </div>

        <h2 className="text-[20px] font-bold text-foreground text-center mb-6">
          {mc('signup', 'create_account', 'Create Account')}
        </h2>

        <form onSubmit={handleSignup} className="space-y-4">
          <div>
            <label className="text-[12px] text-muted-foreground font-medium block mb-1.5">{mc('signup', 'name_label', 'Name')}</label>
            <input
              value={name} onChange={e => setName(e.target.value)} required
              className="w-full h-11 px-3.5 rounded-xl border border-border bg-card text-foreground text-[15px] outline-none focus:ring-2 focus:ring-primary/30 transition"
            />
          </div>
          <div>
            <label className="text-[12px] text-muted-foreground font-medium block mb-1.5">{mc('signup', 'email_label', 'Email')}</label>
            <input
              type="email" value={email} onChange={e => setEmail(e.target.value)} required placeholder="you@example.com"
              className="w-full h-11 px-3.5 rounded-xl border border-border bg-card text-foreground text-[15px] outline-none focus:ring-2 focus:ring-primary/30 transition"
            />
          </div>
          <div>
            <label className="text-[12px] text-muted-foreground font-medium block mb-1.5">
              {mc('signup', 'password_label', 'Password')}
            </label>
            <input
              type="password" minLength={6} value={password} onChange={e => setPassword(e.target.value)} required placeholder="••••••"
              className="w-full h-11 px-3.5 rounded-xl border border-border bg-card text-foreground text-[15px] outline-none focus:ring-2 focus:ring-primary/30 transition"
            />
          </div>
          <button type="submit" disabled={loading}
            className="w-full h-12 rounded-xl bg-primary text-primary-foreground font-semibold text-[15px] border-none disabled:opacity-50"
          >
            {mc('signup', 'page_title', 'Sign Up')}
          </button>
        </form>

        <p className="mt-6 text-center text-[13px] text-muted-foreground">
          {mc('signup', 'have_account', 'Have an account?')}{' '}
          <Link to="/mobile/login" className="text-primary font-medium">{mc('login', 'page_title', 'Login')}</Link>
        </p>
      </div>
    </div>
  );
}
