import { useState } from 'react';
import { useI18n, ui } from '@/lib/i18n';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, Send } from 'lucide-react';
import { toast } from 'sonner';

export default function ContactPage() {
  const { t } = useI18n();
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      toast.success(t({ 0: '訊息已發送！', 1: 'Message sent!', 2: 'メッセージが送信されました！' }));
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="container py-8 md:py-16">
      <div className="max-w-lg mx-auto">
        <Card className="border-0 shadow-lg">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <Mail className="h-6 w-6 text-primary" />
            </div>
            <CardTitle>{t(ui.contactUs)}</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label>{t(ui.name)}</Label>
                <Input required />
              </div>
              <div className="space-y-2">
                <Label>{t(ui.email)}</Label>
                <Input type="email" required />
              </div>
              <div className="space-y-2">
                <Label>{t({ 0: '訊息', 1: 'Message', 2: 'メッセージ' })}</Label>
                <Textarea rows={5} required />
              </div>
              <Button type="submit" className="w-full gap-2" disabled={loading}>
                <Send className="h-4 w-4" />
                {t({ 0: '發送', 1: 'Send', 2: '送信' })}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
