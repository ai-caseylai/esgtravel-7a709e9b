import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Award, Globe, Target, ChevronRight } from 'lucide-react';

const SUPABASE_URL = 'https://jbfybrxpdippdsettdgv.supabase.co';

interface BadgeItem {
  id: number;
  code: string | null;
  price: number;
  is_active: boolean;
  image_url: string | null;
  created_at: string;
}

interface BadgeTranslation {
  badge_id: number;
  lang: number;
  title: string | null;
  home_header: string | null;
  summary: string | null;
}

interface SdgBadge {
  badge_id: number;
  sdg_id: number;
}

const LANG_LABELS: Record<number, string> = { 0: '繁中', 1: '简中', 2: 'EN', 3: 'JP' };

export default function AdminBadges() {
  const [badges, setBadges] = useState<BadgeItem[]>([]);
  const [translations, setTranslations] = useState<BadgeTranslation[]>([]);
  const [sdgs, setSdgs] = useState<SdgBadge[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  useEffect(() => {
    const fetch = async () => {
      const [b, t, s] = await Promise.all([
        supabase.from('badges').select('*').order('id'),
        supabase.from('badge_translations').select('badge_id, lang, title, home_header, summary').order('badge_id'),
        supabase.from('sdg_badges').select('badge_id, sdg_id').order('badge_id'),
      ]);
      setBadges(b.data ?? []);
      setTranslations(t.data ?? []);
      setSdgs(s.data ?? []);
      setLoading(false);
      if (b.data && b.data.length > 0) setSelectedId(b.data[0].id);
    };
    fetch();
  }, []);

  const selected = badges.find(b => b.id === selectedId);
  const selectedTranslations = translations.filter(t => t.badge_id === selectedId);
  const selectedSdgs = sdgs.filter(s => s.badge_id === selectedId);

  const getImageUrl = (badge: BadgeItem) => {
    if (badge.image_url?.startsWith('http')) return badge.image_url;
    if (badge.image_url) return `${SUPABASE_URL}/storage/v1/object/public/media/${badge.image_url}`;
    return null;
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-foreground mb-6">徽章管理</h2>

      {loading ? (
        <p className="text-muted-foreground">載入中...</p>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6">
          {/* ── Left: badge list ── */}
          <div className="space-y-2">
            {badges.map(b => {
              const title = translations.find(t => t.badge_id === b.id && t.lang === 0)?.title || b.code || `#${b.id}`;
              const imgUrl = getImageUrl(b);
              return (
                <button
                  key={b.id}
                  onClick={() => setSelectedId(b.id)}
                  className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl text-left transition-colors ${
                    selectedId === b.id
                      ? 'bg-primary/10 border border-primary/30'
                      : 'hover:bg-muted border border-transparent'
                  }`}
                >
                  {imgUrl ? (
                    <img src={imgUrl} alt="" className="w-10 h-10 rounded-lg object-cover shrink-0" />
                  ) : (
                    <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center shrink-0">
                      <Award className="h-5 w-5 text-muted-foreground" />
                    </div>
                  )}
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-foreground truncate">{title}</p>
                    <p className="text-xs text-muted-foreground">US${b.price} · {b.code || '-'}</p>
                  </div>
                  <Badge variant={b.is_active ? 'default' : 'secondary'} className="text-[10px] shrink-0">
                    {b.is_active ? '啟用' : '停用'}
                  </Badge>
                </button>
              );
            })}
          </div>

          {/* ── Right: detail ── */}
          {selected ? (
            <div className="space-y-6">
              {/* Header card */}
              <Card>
                <CardContent className="pt-5">
                  <div className="flex gap-5 items-start">
                    {getImageUrl(selected) ? (
                      <img src={getImageUrl(selected)!} alt="" className="w-24 h-24 rounded-xl object-cover shrink-0" />
                    ) : (
                      <div className="w-24 h-24 rounded-xl bg-muted flex items-center justify-center shrink-0">
                        <Award className="h-10 w-10 text-muted-foreground" />
                      </div>
                    )}
                    <div className="min-w-0 flex-1">
                      <h3 className="text-lg font-semibold text-foreground">
                        {selectedTranslations.find(t => t.lang === 0)?.title || selected.code || `徽章 #${selected.id}`}
                      </h3>
                      <div className="flex flex-wrap gap-2 mt-2">
                        <span className="text-xs px-2 py-1 rounded-md bg-muted text-muted-foreground font-mono">
                          ID: {selected.id}
                        </span>
                        <span className="text-xs px-2 py-1 rounded-md bg-muted text-muted-foreground font-mono">
                          {selected.code || 'no code'}
                        </span>
                        <span className="text-xs px-2 py-1 rounded-md bg-muted text-muted-foreground">
                          US${selected.price}
                        </span>
                        <Badge variant={selected.is_active ? 'default' : 'secondary'}>
                          {selected.is_active ? '啟用' : '停用'}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground mt-2">
                        建立於 {new Date(selected.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* SDG Goals */}
              {selectedSdgs.length > 0 && (
                <Card>
                  <CardContent className="pt-5">
                    <div className="flex items-center gap-2 mb-3">
                      <Target className="h-4 w-4 text-primary" />
                      <h4 className="text-sm font-semibold text-foreground">SDG 關聯目標</h4>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {selectedSdgs.map(s => (
                        <span key={s.sdg_id} className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
                          <Target className="h-3 w-3" />
                          SDG {s.sdg_id}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Translations */}
              <Card>
                <CardContent className="pt-5">
                  <div className="flex items-center gap-2 mb-4">
                    <Globe className="h-4 w-4 text-primary" />
                    <h4 className="text-sm font-semibold text-foreground">多語言內容</h4>
                  </div>
                  {selectedTranslations.length === 0 ? (
                    <p className="text-sm text-muted-foreground">尚無翻譯內容</p>
                  ) : (
                    <div className="space-y-4">
                      {selectedTranslations.map(t => (
                        <div key={t.lang} className="border border-border rounded-lg p-4">
                          <div className="flex items-center gap-2 mb-2">
                            <Badge variant="outline" className="text-[10px]">{LANG_LABELS[t.lang] || `Lang ${t.lang}`}</Badge>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                            <div>
                              <p className="text-[11px] text-muted-foreground uppercase tracking-wide mb-0.5">標題</p>
                              <p className="text-foreground">{t.title || <span className="text-muted-foreground italic">—</span>}</p>
                            </div>
                            <div>
                              <p className="text-[11px] text-muted-foreground uppercase tracking-wide mb-0.5">首頁標題</p>
                              <p className="text-foreground">{t.home_header || <span className="text-muted-foreground italic">—</span>}</p>
                            </div>
                            {t.summary && (
                              <div className="md:col-span-2">
                                <p className="text-[11px] text-muted-foreground uppercase tracking-wide mb-0.5">摘要</p>
                                <p className="text-foreground line-clamp-3">{t.summary}</p>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          ) : (
            <div className="flex items-center justify-center py-20 text-muted-foreground">
              <p>請選擇一個徽章查看詳情</p>
            </div>
          )}
        </div>
      )}

      <p className="text-xs text-muted-foreground mt-4">
        共 {badges.length} 個徽章
      </p>
    </div>
  );
}
