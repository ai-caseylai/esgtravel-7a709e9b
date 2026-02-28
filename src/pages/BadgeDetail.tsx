import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchBadgeDetail } from '@/lib/api';
import { useI18n, ui } from '@/lib/i18n';
import { useAuth } from '@/lib/auth';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, Leaf, MapPin, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function BadgeDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { lang, t } = useI18n();
  const { user } = useAuth();
  const navigate = useNavigate();

  const { data: badge, isLoading } = useQuery({
    queryKey: ['badge', id, lang],
    queryFn: () => fetchBadgeDetail(Number(id), lang),
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <div className="container py-16">
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="h-8 w-32 bg-muted animate-pulse rounded" />
          <div className="h-64 bg-muted animate-pulse rounded-xl" />
          <div className="h-40 bg-muted animate-pulse rounded-xl" />
        </div>
      </div>
    );
  }

  if (!badge) {
    return (
      <div className="container py-16 text-center">
        <p className="text-muted-foreground">Badge not found</p>
        <Link to="/">
          <Button variant="outline" className="mt-4">{t(ui.backHome)}</Button>
        </Link>
      </div>
    );
  }

  const tr = badge.translation;

  return (
    <div className="container py-8 md:py-16">
      <Button variant="ghost" className="mb-6 gap-2" onClick={() => navigate(-1)}>
        <ArrowLeft className="h-4 w-4" /> {t(ui.backHome)}
      </Button>

      <div className="max-w-3xl mx-auto space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {/* Badge Hero */}
          <div className="relative h-64 md:h-80 rounded-2xl bg-gradient-to-br from-primary/20 via-ocean/10 to-earth/10 flex items-center justify-center overflow-hidden mb-8">
            <Leaf className="h-32 w-32 text-primary/20" />
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-card/80">
              <h1 className="text-3xl md:text-4xl font-bold">{tr?.home_header || badge.code}</h1>
              <p className="text-primary font-semibold mt-1">{tr?.title}</p>
            </div>
          </div>

          {/* Content */}
          <Card className="border-0 shadow-md">
            <CardContent className="p-6 md:p-8 space-y-6">
              <div>
                <h2 className="text-xl font-bold mb-3 flex items-center gap-2">
                  <ShieldCheck className="h-5 w-5 text-primary" />
                  {t({ 0: '計劃介紹', 1: 'About the Program', 2: 'プログラムについて' })}
                </h2>
                <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                  {tr?.content}
                </p>
              </div>

              <div>
                <h2 className="text-xl font-bold mb-3">
                  {t({ 0: '詳細資訊', 1: 'Details', 2: '詳細情報' })}
                </h2>
                <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                  {tr?.details}
                </p>
              </div>

              {tr?.summary && (
                <div>
                  <h2 className="text-xl font-bold mb-3">
                    {t({ 0: '摘要', 1: 'Summary', 2: '概要' })}
                  </h2>
                  <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                    {tr.summary}
                  </p>
                </div>
              )}

              {tr?.impact && (
                <div className="bg-primary/5 rounded-xl p-6">
                  <h2 className="text-xl font-bold mb-3 text-primary">
                    {t({ 0: '影響領域', 1: 'Impact', 2: '影響' })}
                  </h2>
                  <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                    {tr.impact}
                  </p>
                </div>
              )}

              {badge.map_url && (
                <a
                  href={badge.map_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-primary hover:underline"
                >
                  <MapPin className="h-4 w-4" />
                  {t({ 0: '在地圖上查看', 1: 'View on Map', 2: '地図で見る' })}
                </a>
              )}
            </CardContent>
          </Card>

          {/* Buy Section */}
          <Card className="border-0 shadow-md bg-gradient-to-r from-primary/5 to-ocean/5">
            <CardContent className="p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-4">
              <div>
                <h3 className="text-xl font-bold">{t(ui.buyBadge)}</h3>
                <p className="text-muted-foreground">
                  {t({ 0: '支持可持續旅遊發展', 1: 'Support sustainable tourism development', 2: '持続可能な観光開発を支援' })}
                </p>
                <p className="text-2xl font-bold text-primary mt-2">${badge.price} USD</p>
              </div>
              {user ? (
                <Link to={`/payment/${badge.id}`}>
                  <Button size="lg" className="gap-2">
                    {t(ui.payNow)}
                  </Button>
                </Link>
              ) : (
                <Link to="/login">
                  <Button size="lg" variant="outline" className="gap-2">
                    {t({ 0: '登入後購買', 1: 'Login to Purchase', 2: 'ログインして購入' })}
                  </Button>
                </Link>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
