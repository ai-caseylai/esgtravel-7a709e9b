import { useQuery } from '@tanstack/react-query';
import { fetchUserOrders, fetchBadges } from '@/lib/api';
import { useAuth } from '@/lib/auth';
import { useI18n, ui } from '@/lib/i18n';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Leaf, Award } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function PassportPage() {
  const { user } = useAuth();
  const { lang, t } = useI18n();

  const { data: orders } = useQuery({
    queryKey: ['orders', user?.id],
    queryFn: () => fetchUserOrders(user!.id),
    enabled: !!user,
  });

  const { data: badges } = useQuery({
    queryKey: ['badges', lang],
    queryFn: () => fetchBadges(lang),
  });

  if (!user) {
    return (
      <div className="container py-16 text-center">
        <p>{t({ 0: '請先登入', 1: 'Please login first', 2: 'ログインしてください' })}</p>
        <Link to="/login"><Button className="mt-4">{t(ui.login)}</Button></Link>
      </div>
    );
  }

  const userBadgeIds = [...new Set(orders?.map(o => o.badge_id) || [])];
  const collectedBadges = badges?.filter(b => userBadgeIds.includes(b.id)) || [];
  const totalDonated = orders?.reduce((sum, o) => sum + o.price + o.extra_help, 0) || 0;

  return (
    <div className="container py-8 md:py-16">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="text-center mb-10">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
              <Award className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-3xl font-bold">{t(ui.passport)}</h1>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4 mb-10">
            <Card className="border-0 shadow-md text-center">
              <CardContent className="pt-6">
                <p className="text-3xl font-bold text-primary">{collectedBadges.length}</p>
                <p className="text-sm text-muted-foreground">{t(ui.badgesCollected)}</p>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-md text-center">
              <CardContent className="pt-6">
                <p className="text-3xl font-bold text-earth">${totalDonated}</p>
                <p className="text-sm text-muted-foreground">{t(ui.totalDonation)}</p>
              </CardContent>
            </Card>
          </div>

          {/* Badges */}
          {collectedBadges.length === 0 ? (
            <div className="text-center py-16">
              <Leaf className="h-16 w-16 text-muted-foreground/30 mx-auto mb-4" />
              <p className="text-muted-foreground">{t(ui.noBadges)}</p>
              <Link to="/">
                <Button className="mt-4">{t(ui.exploreBadges)}</Button>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {collectedBadges.map((badge, i) => (
                <motion.div
                  key={badge.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link to={`/badge/${badge.id}`}>
                    <Card className="border-0 shadow-md hover:shadow-lg transition-all group cursor-pointer">
                      <div className="h-32 bg-gradient-to-br from-primary/20 to-ocean/20 rounded-t-xl flex items-center justify-center">
                        <Leaf className="h-12 w-12 text-primary/40 group-hover:scale-110 transition-transform" />
                      </div>
                      <CardContent className="p-4 text-center">
                        <p className="font-semibold text-sm">
                          {badge.translation?.home_header || badge.code}
                        </p>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
