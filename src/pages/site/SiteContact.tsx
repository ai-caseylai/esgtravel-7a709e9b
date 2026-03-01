import { useSiteContent } from '@/hooks/use-site-content';
import { HtmlContent } from '@/components/HtmlContent';
import { Phone, Mail, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function SiteContact() {
  const { tc } = useSiteContent();

  const contactItems = [
    {
      icon: Phone,
      label: tc('site_contact_phone_label', 'Phone'),
      value: tc('site_contact_phone', '+852 1234-5678'),
    },
    {
      icon: Mail,
      label: tc('site_contact_email_label', 'Email'),
      value: tc('site_contact_email_val', 'info@starsdg.com'),
    },
    {
      icon: MapPin,
      label: tc('site_contact_addr_label', 'Address'),
      value: tc('site_contact_addr', '123 Canton Road, Tsim Sha Tsui, Kowloon, Hong Kong'),
    },
  ];

  return (
    <div>
      <section className="bg-gradient-to-b from-primary/10 to-transparent py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-foreground text-4xl font-bold mb-4">
            {tc('site_contact_title', 'Contact Us')}
          </h1>
          <HtmlContent html={tc('site_contact_desc', 'Feel free to reach out with any questions')} className="text-muted-foreground text-lg" />
        </div>
      </section>

      <section className="max-w-2xl mx-auto px-4 py-12 space-y-4">
        {contactItems.map((item, i) => (
          <div key={i} className="bg-card rounded-2xl border border-border shadow-sm p-5 flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
              <item.icon className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-muted-foreground text-xs mb-1">{item.label}</p>
              <p className="text-foreground font-medium">{item.value}</p>
            </div>
          </div>
        ))}

        <div className="text-center pt-6">
          <Link to="/site" className="text-primary font-medium no-underline hover:underline">
            ← {tc('home', 'Home')}
          </Link>
        </div>
      </section>
    </div>
  );
}
