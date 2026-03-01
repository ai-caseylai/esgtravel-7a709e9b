import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useI18n, toDbLang } from '@/lib/i18n';

type ContentMap = Record<number, Record<string, string>>;

async function fetchSiteContent(): Promise<ContentMap> {
  const { data } = await supabase.from('site_content').select('*');
  const map: ContentMap = {};
  (data ?? []).forEach((row: any) => {
    map[row.lang] = row;
  });
  return map;
}

export function useSiteContent() {
  const { lang } = useI18n();
  const dbLang = toDbLang(lang);

  const { data: content } = useQuery({
    queryKey: ['site_content'],
    queryFn: fetchSiteContent,
    staleTime: 5 * 60 * 1000,
  });

  /**
   * Get a site_content field value for the current language.
   * Falls back to lang 0 (繁中), then returns the fallback string.
   */
  const tc = (key: string, fallback = ''): string => {
    if (!content) return fallback;
    return content[dbLang]?.[key] || content[0]?.[key] || fallback;
  };

  return { tc, content, isLoaded: !!content };
}
