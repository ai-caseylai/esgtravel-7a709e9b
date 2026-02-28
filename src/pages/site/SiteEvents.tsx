import { useEffect, useState } from 'react';
import { useI18n } from '@/lib/i18n';
import { supabase } from '@/integrations/supabase/client';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import eventsHero from '@/assets/site-events-hero.jpg';

interface EventPost {
  id: number;
  slug: string;
  cover_image: string | null;
  event_date: string | null;
  title: string;
  summary: string;
  content: string;
}

export default function SiteEvents() {
  const { lang, t } = useI18n();
  const [events, setEvents] = useState<EventPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState<EventPost | null>(null);

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      const { data } = await supabase
        .from('posts')
        .select('id, slug, cover_image, event_date')
        .eq('is_published', true)
        .eq('category', 'event')
        .order('event_date', { ascending: false });

      if (!data || data.length === 0) { setEvents([]); setLoading(false); return; }

      const ids = data.map(p => p.id);
      const { data: translations } = await supabase
        .from('post_translations')
        .select('*')
        .in('post_id', ids)
        .eq('lang', lang);

      const tMap = new Map((translations ?? []).map((t: any) => [t.post_id, t]));

      // Fallback to lang 0
      let fallbackMap = new Map();
      if (lang !== 0) {
        const missingIds = ids.filter(id => !tMap.has(id));
        if (missingIds.length > 0) {
          const { data: fb } = await supabase
            .from('post_translations')
            .select('*')
            .in('post_id', missingIds)
            .eq('lang', 0);
          (fb ?? []).forEach((t: any) => fallbackMap.set(t.post_id, t));
        }
      }

      setEvents(data.map(p => {
        const tr = tMap.get(p.id) || fallbackMap.get(p.id) || {};
        return {
          ...p,
          title: tr.title || p.slug,
          summary: tr.summary || '',
          content: tr.content || '',
        };
      }));
      setLoading(false);
    };
    fetchEvents();
  }, [lang]);

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img src={eventsHero} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/40 to-background" />
        </div>
        <div className="max-w-4xl mx-auto px-4 py-20 text-center relative">
          <h1 className="text-foreground text-4xl font-bold mb-4 drop-shadow-lg">
            {t({ 0: '活動與資訊', 1: '活动与资讯', 2: 'Events & Activities', 3: 'イベントと活動' })}
          </h1>
          <p className="text-foreground/80 text-lg drop-shadow">
            {t({ 0: '了解我們過去和即將舉辦的活動', 1: '了解我们过去和即将举办的活动', 2: 'Discover our past and upcoming events', 3: '過去および今後のイベントをご覧ください' })}
          </p>
        </div>
      </section>

      {/* Events list */}
      <section className="max-w-4xl mx-auto px-4 py-12 space-y-6">
        {loading ? (
          <p className="text-center text-muted-foreground">Loading...</p>
        ) : events.length === 0 ? (
          <p className="text-center text-muted-foreground">
            {t({ 0: '暫無活動', 1: '暂无活动', 2: 'No events yet', 3: 'イベントはまだありません' })}
          </p>
        ) : (
          events.map((event, i) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => setSelectedEvent(event)}
            >
              <div className="flex flex-col md:flex-row">
                {event.cover_image && (
                  <div className="w-full md:w-64 h-48 md:h-auto overflow-hidden shrink-0">
                    <img src={event.cover_image} alt="" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                  </div>
                )}
                <div className="p-5 flex-1">
                  {event.event_date && (
                    <p className="text-primary text-xs font-medium mb-1">{event.event_date}</p>
                  )}
                  <h3 className="text-foreground font-bold text-lg mb-2">{event.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{event.summary}</p>
                  <span className="inline-block mt-3 text-primary text-sm font-medium">
                    {t({ 0: '閱讀更多 →', 1: '阅读更多 →', 2: 'Read more →', 3: '続きを読む →' })}
                  </span>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </section>

      {/* Article Modal */}
      <AnimatePresence>
        {selectedEvent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-start justify-center overflow-y-auto p-4 pt-8 pb-8"
            onClick={() => setSelectedEvent(null)}
          >
            <motion.article
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 40 }}
              transition={{ duration: 0.3 }}
              className="bg-card rounded-2xl border border-border shadow-xl max-w-3xl w-full my-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {selectedEvent.cover_image && (
                <div className="relative h-64 md:h-80 overflow-hidden rounded-t-2xl">
                  <img src={selectedEvent.cover_image} alt="" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
                  <button
                    onClick={() => setSelectedEvent(null)}
                    className="absolute top-4 right-4 bg-background/70 backdrop-blur-sm rounded-full p-2 text-foreground hover:bg-background transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              )}
              <div className="p-6 md:p-8">
                {selectedEvent.event_date && (
                  <p className="text-primary text-sm font-medium mb-2">{selectedEvent.event_date}</p>
                )}
                <h2 className="text-foreground text-2xl md:text-3xl font-bold mb-6">
                  {selectedEvent.title}
                </h2>
                <div className="text-muted-foreground leading-relaxed whitespace-pre-line text-base">
                  {selectedEvent.content}
                </div>
              </div>
            </motion.article>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
