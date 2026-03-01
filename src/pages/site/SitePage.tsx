import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { PagePreview } from '@/pages/admin/AdminPages';

export default function SitePage() {
  const { slug } = useParams<{ slug: string }>();

  const { data: blocks, isLoading } = useQuery({
    queryKey: ['page', slug],
    queryFn: async () => {
      // First get page
      const { data: page } = await supabase.from('pages').select('id').eq('slug', slug!).single();
      if (!page) return null;
      const { data } = await supabase.from('page_blocks').select('*').eq('page_id', (page as any).id).order('sort_order');
      return data as any[];
    },
    enabled: !!slug,
  });

  if (isLoading) return <div className="max-w-4xl mx-auto px-4 py-16 text-center text-muted-foreground">載入中...</div>;
  if (!blocks) return <div className="max-w-4xl mx-auto px-4 py-16 text-center text-muted-foreground">頁面不存在</div>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <PagePreview blocks={blocks} />
    </div>
  );
}
