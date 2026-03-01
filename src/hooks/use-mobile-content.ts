import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useI18n } from '@/lib/i18n';

interface MobileContentRow {
  id: number;
  section: string;
  content_key: string;
  value_tw: string;
  value_cn: string;
  value_en: string;
  value_ja: string;
  content_type: string;
  sort_order: number;
}

type ContentMap = Record<string, Record<string, MobileContentRow>>;

async function fetchMobileContent(): Promise<ContentMap> {
  const { data } = await supabase
    .from('mobile_content')
    .select('*')
    .order('sort_order', { ascending: true });

  const map: ContentMap = {};
  (data ?? []).forEach((row: any) => {
    if (!map[row.section]) map[row.section] = {};
    map[row.section][row.content_key] = row;
  });
  return map;
}

export function useMobileContent() {
  const { lang } = useI18n();

  const { data: content } = useQuery({
    queryKey: ['mobile_content'],
    queryFn: fetchMobileContent,
    staleTime: 5 * 60 * 1000,
  });

  /** Get a mobile content value for current language */
  const mc = (section: string, key: string, fallback = ''): string => {
    if (!content) return fallback;
    const row = content[section]?.[key];
    if (!row) return fallback;
    switch (lang) {
      case 0: return row.value_tw || fallback;
      case 1: return row.value_cn || row.value_tw || fallback;
      case 2: return row.value_en || fallback;
      case 3: return row.value_ja || fallback;
      default: return row.value_tw || fallback;
    }
  };

  return { mc, content, isLoaded: !!content };
}
