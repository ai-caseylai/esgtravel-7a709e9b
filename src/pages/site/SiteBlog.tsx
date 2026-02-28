import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useI18n } from '@/lib/i18n';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface Post {
  id: number;
  slug: string;
  cover_image: string | null;
  created_at: string;
  title: string;
  summary: string;
  content: string;
}

export default function SiteBlog() {
  const { lang } = useI18n();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Post | null>(null);

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      const { data } = await supabase
        .from('posts')
        .select('id, slug, cover_image, created_at')
        .eq('is_published', true)
        .order('created_at', { ascending: false });

      if (!data || data.length === 0) { setPosts([]); setLoading(false); return; }

      const ids = data.map(p => p.id);
      const { data: translations } = await supabase
        .from('post_translations')
        .select('*')
        .in('post_id', ids)
        .eq('lang', lang);

      const tMap = new Map((translations ?? []).map((t: any) => [t.post_id, t]));

      // Fallback to lang 0 if current lang not available
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

      setPosts(data.map(p => {
        const t = tMap.get(p.id) || fallbackMap.get(p.id) || {};
        return { ...p, title: t.title || p.slug, summary: t.summary || '', content: t.content || '' };
      }));
      setLoading(false);
    };
    fetch();
  }, [lang]);

  const labels = {
    0: { header: '最新文章', readMore: '閱讀更多 →' },
    1: { header: '最新文章', readMore: '阅读更多 →' },
    2: { header: 'Latest Articles', readMore: 'Read more →' },
    3: { header: '最新記事', readMore: '続きを読む →' },
  }[lang] ?? { header: 'Latest Articles', readMore: 'Read more →' };

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-foreground text-center mb-12">{labels.header}</h1>

        {loading ? (
          <p className="text-center text-muted-foreground">Loading...</p>
        ) : posts.length === 0 ? (
          <p className="text-center text-muted-foreground">暫無文章</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map(post => (
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
                  <p className="text-sm text-primary mt-3 font-medium">{labels.readMore}</p>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      <AnimatePresence>
        {selected && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
          >
            <motion.div
              className="bg-card rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
              initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
              onClick={e => e.stopPropagation()}
            >
              {selected.cover_image && (
                <img src={selected.cover_image} alt={selected.title} className="w-full h-64 object-cover rounded-t-2xl" />
              )}
              <div className="p-6 md:p-8">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h2 className="text-2xl font-bold text-foreground">{selected.title}</h2>
                    <p className="text-sm text-muted-foreground mt-1">{new Date(selected.created_at).toLocaleDateString()}</p>
                  </div>
                  <button onClick={() => setSelected(null)} className="p-2 rounded-full hover:bg-muted">
                    <X className="h-5 w-5 text-muted-foreground" />
                  </button>
                </div>
                <div className="prose prose-sm max-w-none text-foreground whitespace-pre-line">
                  {selected.content}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
