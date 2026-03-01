import '@/components/RichTextEditor.css';
import { useEffect, useState } from 'react';
import { useI18n } from '@/lib/i18n';
import { useSiteContent } from '@/hooks/use-site-content';
import { supabase } from '@/integrations/supabase/client';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import eventsHeroFallback from '@/assets/site-events-hero.jpg';

interface PostItem {
  id: number;
  slug: string;
  cover_image: string | null;
  event_date: string | null;
  created_at: string;
  category: string;
  title: string;
  summary: string;
  content: string;
}

export default function SiteEvents() {
  const { lang } = useI18n();
  const { tc } = useSiteContent();
  const [events, setEvents] = useState<PostItem[]>([]);
  const [blogs, setBlogs] = useState<PostItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<PostItem | null>(null);

  const heroImg = tc('site_events_hero_img', '') || eventsHeroFallback;

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      const { data } = await supabase
        .from('posts')
        .select('id, slug, cover_image, event_date, created_at, category')
        .eq('is_published', true)
        .in('category', ['event', 'blog'])
        .order('created_at', { ascending: false });

      if (!data || data.length === 0) { setEvents([]); setBlogs([]); setLoading(false); return; }

      const ids = data.map(p => p.id);
      const { data: translations } = await supabase
        .from('post_translations')
        .select('*')
        .in('post_id', ids)
        .eq('lang', lang);

      const tMap = new Map((translations ?? []).map((tr: any) => [tr.post_id, tr]));

      let fallbackMap = new Map();
      if (lang !== 0) {
        const missingIds = ids.filter(id => !tMap.has(id));
        if (missingIds.length > 0) {
          const { data: fb } = await supabase
            .from('post_translations')
            .select('*')
            .in('post_id', missingIds)
            .eq('lang', 0);
          (fb ?? []).forEach((tr: any) => fallbackMap.set(tr.post_id, tr));
        }
      }

      const mapped = data.map(p => {
        const tr = tMap.get(p.id) || fallbackMap.get(p.id) || {};
        return {
          ...p,
          title: tr.title || p.slug,
          summary: tr.summary || '',
          content: tr.content || '',
        };
      });

      setEvents(mapped.filter(p => p.category === 'event'));
      setBlogs(mapped.filter(p => p.category === 'blog'));
      setLoading(false);
    };
    fetchPosts();
  }, [lang]);

  const readMore = tc('site_readmore', 'Read more →');

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroImg} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/40 to-background" />
        </div>
        <div className="max-w-4xl mx-auto px-4 py-20 text-center relative">
          <h1 className="text-foreground text-4xl font-bold mb-4 drop-shadow-lg">
            {tc('site_events_title', 'Events & Activities')}
          </h1>
          <p className="text-foreground/80 text-lg drop-shadow">
            {tc('site_events_desc', '')}
          </p>
        </div>
      </section>

      {loading ? (
        <div className="max-w-4xl mx-auto px-4 py-12">
          <p className="text-center text-muted-foreground">{tc('site_loading', 'Loading...')}</p>
        </div>
      ) : (
        <>
          {/* Events section */}
          <section className="max-w-4xl mx-auto px-4 py-12">
            <h2 className="text-2xl font-bold text-foreground mb-6">
              {tc('site_events_label', 'Events')}
            </h2>
            {events.length === 0 ? (
              <p className="text-muted-foreground">
                {tc('site_no_events', 'No events yet')}
              </p>
            ) : (
              <div className="space-y-6">
                {events.map((event, i) => (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
                    onClick={() => setSelected(event)}
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
                        <span className="inline-block mt-3 text-primary text-sm font-medium">{readMore}</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </section>

          {/* Blog section */}
          <section className="max-w-4xl mx-auto px-4 pb-12">
            <h2 className="text-2xl font-bold text-foreground mb-6">
              {tc('site_articles_label', 'Latest Articles')}
            </h2>
            {blogs.length === 0 ? (
              <p className="text-muted-foreground">
                {tc('site_no_articles', 'No articles yet')}
              </p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {blogs.map(post => (
                  <motion.div
                    key={post.id}
                    className="bg-card rounded-xl overflow-hidden border border-border shadow-sm cursor-pointer hover:shadow-md transition-shadow"
                    whileHover={{ y: -4 }}
                    onClick={() => setSelected(post)}
                  >
                    {post.cover_image && (
                      <img src={post.cover_image} alt={post.title} className="w-full h-48 object-cover" />
                    )}
                    <div className="p-5">
                      <p className="text-xs text-muted-foreground mb-2">{new Date(post.created_at).toLocaleDateString()}</p>
                      <h3 className="text-lg font-semibold text-foreground mb-2">{post.title}</h3>
                      <p className="text-sm text-muted-foreground line-clamp-3">{post.summary}</p>
                      <p className="text-sm text-primary mt-3 font-medium">{readMore}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </section>
        </>
      )}

      {/* Article Modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-start justify-center overflow-y-auto p-4 pt-8 pb-8"
            onClick={() => setSelected(null)}
          >
            <motion.article
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 40 }}
              transition={{ duration: 0.3 }}
              className="bg-card rounded-2xl border border-border shadow-xl max-w-3xl w-full my-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {selected.cover_image && (
                <div className="relative h-64 md:h-80 overflow-hidden rounded-t-2xl">
                  <img src={selected.cover_image} alt="" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
                  <button
                    onClick={() => setSelected(null)}
                    className="absolute top-4 right-4 bg-background/70 backdrop-blur-sm rounded-full p-2 text-foreground hover:bg-background transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              )}
              <div className="p-6 md:p-8">
                {selected.event_date && (
                  <p className="text-primary text-sm font-medium mb-2">{selected.event_date}</p>
                )}
                {!selected.event_date && (
                  <p className="text-muted-foreground text-sm mb-2">{new Date(selected.created_at).toLocaleDateString()}</p>
                )}
                <h2 className="text-foreground text-2xl md:text-3xl font-bold mb-6">
                  {selected.title}
                </h2>
                <div
                  className="rich-content text-muted-foreground leading-relaxed text-base"
                  dangerouslySetInnerHTML={{ __html: selected.content }}
                />
              </div>
            </motion.article>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
