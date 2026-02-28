import { Link } from 'react-router-dom';
import { useI18n, ui } from '@/lib/i18n';
import { Button } from '@/components/ui/button';
import { CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

export default function PaymentSuccessPage() {
  const { t } = useI18n();

  return (
    <div className="flex min-h-[70vh] items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center max-w-md px-4"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10"
        >
          <CheckCircle2 className="h-10 w-10 text-primary" />
        </motion.div>
        <h1 className="text-3xl font-bold mb-3">{t(ui.thankYou)}</h1>
        <p className="text-muted-foreground mb-8">
          {t({ 0: '你的徽章已加入護照中', 1: 'Your badge has been added to your passport', 2: 'バッジがパスポートに追加されました' })}
        </p>
        <div className="flex gap-3 justify-center">
          <Link to="/passport">
            <Button>{t(ui.passport)}</Button>
          </Link>
          <Link to="/">
            <Button variant="outline">{t(ui.backHome)}</Button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
