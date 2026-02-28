import { useQuery } from '@tanstack/react-query';
import { fetchBadges, BadgeWithTranslation } from '@/lib/api';
import { useI18n, ui } from '@/lib/i18n';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, Globe2, Heart, Leaf, Shield, TreePine } from 'lucide-react';
import { motion } from 'framer-motion';

const sdgIcons = [
  { icon: Globe2, label: { 0: '氣候行動', 1: 'Climate Action', 2: '気候変動' } },
  { icon: TreePine, label: { 0: '陸地生態', 1: 'Life on Land', 2: '陸上の生態系' } },
  { icon: Heart, label: { 0: '海洋保育', 1: 'Life Below Water', 2: '海洋保全' } },
  { icon: Shield, label: { 0: '負責任消費', 1: 'Responsible Consumption', 2: '責任ある消費' } },
];

function BadgeCard({ badge, index }: { badge: BadgeWithTranslation; index: number }) {
  const { t } = useI18n();
  const tr = badge.translation;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
    >
      <Card className="group overflow-hidden hover:shadow-lg transition-all duration-300 border-0 shadow-md">
        <div className="h-48 bg-gradient-to-br from-primary/20 to-ocean/20 flex items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-card/60 to-transparent" />
          <Leaf className="h-20 w-20 text-primary/30 group-hover:scale-110 transition-transform duration-500" />
          <div className="absolute bottom-4 left-4 right-4">
            <h3 className="font-bold text-lg text-foreground">{tr?.home_header || badge.code}</h3>
          </div>
        </div>
        <CardContent className="p-5">
          <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
            {tr?.show_more || ''}
          </p>
          <div className="flex items-center justify-between">
            <span className="text-primary font-bold text-lg">${badge.price} USD</span>
            <Link to={`/badge/${badge.id}`}>
              <Button size="sm" className="gap-1">
                {t(ui.learnMore)} <ArrowRight className="h-3 w-3" />
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export default function HomePage() {
  const { lang, t } = useI18n();
  const { data: badges, isLoading } = useQuery({
    queryKey: ['badges', lang],
    queryFn: () => fetchBadges(lang),
  });

  return (
    <div>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-ocean/5 py-20 md:py-32">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-ocean rounded-full blur-3xl" />
        </div>
        <div className="container relative">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl mx-auto text-center"
          >
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary rounded-full px-4 py-1.5 text-sm font-medium mb-6">
              <Leaf className="h-4 w-4" /> STAR Program
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              {t(ui.heroTitle)}
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              {t(ui.heroSubtitle)}
            </p>
            <a href="#badges">
              <Button size="lg" className="gap-2 text-base">
                {t(ui.exploreBadges)} <ArrowRight className="h-4 w-4" />
              </Button>
            </a>
          </motion.div>
        </div>
      </section>

      {/* SDG Section */}
      <section className="py-16 bg-card">
        <div className="container">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-3">{t(ui.sdgTitle)}</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">{t(ui.sdgDesc)}</p>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
            {sdgIcons.map((sdg, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="flex flex-col items-center gap-3 p-6 rounded-xl bg-background border hover:border-primary/30 transition-colors"
              >
                <sdg.icon className="h-10 w-10 text-primary" />
                <span className="text-sm font-medium text-center">{t(sdg.label)}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Badges Section */}
      <section id="badges" className="py-16">
        <div className="container">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">
            {t(ui.exploreBadges)}
          </h2>
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-80 bg-muted animate-pulse rounded-xl" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {badges?.map((badge, i) => (
                <BadgeCard key={badge.id} badge={badge} index={i} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
