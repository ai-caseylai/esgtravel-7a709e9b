import MobileHeader from '@/components/MobileHeader';
import { Mail, Phone } from 'lucide-react';
import { useMobileContent } from '@/hooks/use-mobile-content';

export default function ContactPage() {
  const { mc } = useMobileContent();

  return (
    <div className="min-h-screen bg-background">
      <MobileHeader title={mc('contact', 'page_title', 'Contact Us')} showBack />

      <div className="px-5 py-8 space-y-4">
        <div className="bg-card rounded-2xl border border-border p-5 flex items-center gap-4">
          <div className="w-11 h-11 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
            <Phone className="w-5 h-5 text-primary" />
          </div>
          <div>
            <p className="text-muted-foreground text-[12px]">Phone</p>
            <p className="text-foreground font-medium text-[15px]">+852 1234-5678</p>
          </div>
        </div>

        <div className="bg-card rounded-2xl border border-border p-5 flex items-center gap-4">
          <div className="w-11 h-11 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
            <Mail className="w-5 h-5 text-primary" />
          </div>
          <div>
            <p className="text-muted-foreground text-[12px]">Email</p>
            <p className="text-foreground font-medium text-[15px]">info@starsdg.com</p>
          </div>
        </div>
      </div>
    </div>
  );
}
