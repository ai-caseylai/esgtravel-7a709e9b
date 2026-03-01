import { useNavigate } from 'react-router-dom';
import { useI18n, ui } from '@/lib/i18n';
import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import { useMobileContent } from '@/hooks/use-mobile-content';

export default function PaymentSuccessPage() {
  const { t } = useI18n();
  const navigate = useNavigate();
  const { mc } = useMobileContent();

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-8 gap-5">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      >
        <CheckCircle2 className="w-20 h-20 text-accent" />
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-center">
        <h1 className="text-foreground text-[22px] font-bold mb-1">{t(ui.thankYou)}</h1>
        <p className="text-muted-foreground text-[14px]">
          {mc('payment_success', 'badge_added', 'Badge added to passport')}
        </p>
      </motion.div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="flex gap-3 w-full max-w-xs">
        <button
          onClick={() => navigate('/mobile/passport')}
          className="flex-1 h-11 rounded-xl bg-primary text-primary-foreground font-medium text-[14px] border-none"
        >
          {t(ui.passport)}
        </button>
        <button
          onClick={() => navigate('/mobile')}
          className="flex-1 h-11 rounded-xl bg-card border border-border text-foreground font-medium text-[14px]"
        >
          {t(ui.backHome)}
        </button>
      </motion.div>
    </div>
  );
}
