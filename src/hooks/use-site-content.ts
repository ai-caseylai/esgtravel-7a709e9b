import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useI18n } from '@/lib/i18n';

type ContentMap = Record<number, Record<string, string>>;

async function fetchSiteContent(): Promise<ContentMap> {
  const { data } = await supabase.from('site_content').select('*');
  const map: ContentMap = {};
  (data ?? []).forEach((row: any) => {
    map[row.lang] = row;
  });
  return map;
}

const SITE_LANG_TO_DB_LANG: Record<number, number> = {
  0: 0, // 繁中
  1: 3, // 简中
  2: 1, // EN
  3: 2, // JP
};

export function useSiteContent() {
  const { lang } = useI18n();
  const dbLang = SITE_LANG_TO_DB_LANG[lang] ?? 0;

  const { data: content } = useQuery({
    queryKey: ['site_content'],
    queryFn: fetchSiteContent,
    staleTime: 5 * 60 * 1000,
  });

  const tc = (key: string, fallback = ''): string => {
    if (!content) return fallback;
    return content[dbLang]?.[key] || content[0]?.[key] || fallback;
  };

  return { tc, content, isLoaded: !!content };
}
