import { useEffect, useMemo, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Award, Globe, Plus, Save, Target } from 'lucide-react';
import { toast } from 'sonner';

const SUPABASE_URL = 'https://jbfybrxpdippdsettdgv.supabase.co';

type DbLang = 0 | 1 | 2 | 3;

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

interface TranslationDraft {
  title: string;
  home_header: string;
  summary: string;
}

const DB_LANGS: { id: DbLang; label: string; hint: string }[] = [
  { id: 0, label: '繁中', hint: 'App 繁體中文' },
  { id: 3, label: '简中', hint: 'App 简体中文' },
  { id: 1, label: '英文', hint: 'App EN' },
  { id: 2, label: '日文', hint: 'App 日本語' },
];

const emptyTranslation = (): TranslationDraft => ({ title: '', home_header: '', summary: '' });

const emptyTranslationMap = (): Record<DbLang, TranslationDraft> => ({
  0: emptyTranslation(),
  1: emptyTranslation(),
  2: emptyTranslation(),
  3: emptyTranslation(),
});

const SDG_OPTIONS = Array.from({ length: 17 }, (_, i) => i + 1);

function resolveBadgeImageUrl(imageUrl: string | null): string | null {
  if (!imageUrl) return null;
  if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) return imageUrl;
  if (imageUrl.startsWith('/')) return imageUrl;
  if (imageUrl.startsWith('badges/')) return `/${imageUrl}`;
  if (imageUrl.startsWith('media/')) return `${SUPABASE_URL}/storage/v1/object/public/${imageUrl}`;
  return `${SUPABASE_URL}/storage/v1/object/public/media/${imageUrl}`;
}

export default function AdminBadges() {
  const [badges, setBadges] = useState<BadgeItem[]>([]);
  const [translations, setTranslations] = useState<BadgeTranslation[]>([]);
  const [sdgs, setSdgs] = useState<SdgBadge[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [creating, setCreating] = useState(false);

  const [badgeForm, setBadgeForm] = useState({
    code: '',
    price: 8,
    is_active: true,
    image_url: '',
  });
  const [translationForm, setTranslationForm] = useState<Record<DbLang, TranslationDraft>>(emptyTranslationMap());
  const [sdgForm, setSdgForm] = useState<number[]>([]);

  const selectedBadge = useMemo(
    () => badges.find(b => b.id === selectedId) ?? null,
    [badges, selectedId]
  );

  const selectedTranslations = useMemo(
    () => translations.filter(t => t.badge_id === selectedId),
    [translations, selectedId]
  );

  const selectedSdgs = useMemo(
    () => sdgs.filter(s => s.badge_id === selectedId).map(s => s.sdg_id),
    [sdgs, selectedId]
  );

  const fetchAll = async (preferId?: number) => {
    setLoading(true);
    const [b, t, s] = await Promise.all([
      supabase.from('badges').select('*').order('id'),
      supabase.from('badge_translations').select('badge_id, lang, title, home_header, summary').order('badge_id'),
      supabase.from('sdg_badges').select('badge_id, sdg_id').order('badge_id'),
    ]);

    const bRows = (b.data ?? []) as BadgeItem[];
    setBadges(bRows);
    setTranslations((t.data ?? []) as BadgeTranslation[]);
    setSdgs((s.data ?? []) as SdgBadge[]);

    if (preferId) {
      setSelectedId(preferId);
    } else if (bRows.length === 0) {
      setSelectedId(null);
    } else if (!selectedId || !bRows.some(row => row.id === selectedId)) {
      setSelectedId(bRows[0].id);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchAll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (creating || !selectedBadge) return;

    setBadgeForm({
      code: selectedBadge.code || '',
      price: selectedBadge.price || 0,
      is_active: selectedBadge.is_active,
      image_url: selectedBadge.image_url || '',
    });

    const nextTranslations = emptyTranslationMap();
    selectedTranslations.forEach(t => {
      if (t.lang === 0 || t.lang === 1 || t.lang === 2 || t.lang === 3) {
        nextTranslations[t.lang] = {
          title: t.title || '',
          home_header: t.home_header || '',
          summary: t.summary || '',
        };
      }
    });
    setTranslationForm(nextTranslations);
    setSdgForm(selectedSdgs);
  }, [creating, selectedBadge, selectedTranslations, selectedSdgs]);

  const startCreate = () => {
    setCreating(true);
    setSelectedId(null);
    setBadgeForm({ code: '', price: 8, is_active: true, image_url: '' });
    setTranslationForm(emptyTranslationMap());
    setSdgForm([]);
  };

  const selectBadge = (id: number) => {
    setCreating(false);
    setSelectedId(id);
  };

  const updateTranslationField = (lang: DbLang, field: keyof TranslationDraft, value: string) => {
    setTranslationForm(prev => ({
      ...prev,
      [lang]: { ...prev[lang], [field]: value },
    }));
  };

  const toggleSdg = (value: number) => {
    setSdgForm(prev =>
      prev.includes(value)
        ? prev.filter(v => v !== value)
        : [...prev, value].sort((a, b) => a - b)
    );
  };

  const saveSdgRelations = async (badgeId: number) => {
    const { error: deleteErr } = await supabase.from('sdg_badges').delete().eq('badge_id', badgeId);
    if (deleteErr) throw deleteErr;

    if (sdgForm.length > 0) {
      const rows = sdgForm.map(sdg_id => ({ badge_id: badgeId, sdg_id }));
      const { error: insertErr } = await supabase.from('sdg_badges').insert(rows as any);
      if (insertErr) throw insertErr;
    }
  };

  const saveTranslations = async (badgeId: number) => {
    await Promise.all(
      DB_LANGS.map(async ({ id: lang }) => {
        const existing = translations.find(t => t.badge_id === badgeId && t.lang === lang);
        const payload = {
          badge_id: badgeId,
          lang,
          title: translationForm[lang].title,
          home_header: translationForm[lang].home_header,
          summary: translationForm[lang].summary,
        };

        if (existing) {
          const { error } = await supabase
            .from('badge_translations')
            .update(payload as any)
            .eq('badge_id', badgeId)
            .eq('lang', lang);
          if (error) throw error;
        } else {
          const { error } = await supabase.from('badge_translations').insert(payload as any);
          if (error) throw error;
        }
      })
    );
  };

  const handleSave = async () => {
    if (!badgeForm.code.trim()) {
      toast.error('請輸入徽章代碼');
      return;
    }

    setSaving(true);
    try {
      if (creating) {
        const { data: created, error: createErr } = await supabase
          .from('badges')
          .insert({
            code: badgeForm.code.trim(),
            price: Number(badgeForm.price) || 0,
            is_active: badgeForm.is_active,
            image_url: badgeForm.image_url.trim() || null,
          } as any)
          .select('*')
          .single();

        if (createErr || !created) throw createErr || new Error('新增徽章失敗');

        await saveTranslations(created.id);
        await saveSdgRelations(created.id);

        toast.success('徽章已新增');
        setCreating(false);
        await fetchAll(created.id);
      } else if (selectedBadge) {
        const { error: updateErr } = await supabase
          .from('badges')
          .update({
            code: badgeForm.code.trim(),
            price: Number(badgeForm.price) || 0,
            is_active: badgeForm.is_active,
            image_url: badgeForm.image_url.trim() || null,
          } as any)
          .eq('id', selectedBadge.id);

        if (updateErr) throw updateErr;

        await saveTranslations(selectedBadge.id);
        await saveSdgRelations(selectedBadge.id);

        toast.success('徽章已更新');
        await fetchAll(selectedBadge.id);
      }
    } catch (e: any) {
      toast.error(e.message || '儲存失敗');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6 gap-3 flex-wrap">
        <h2 className="text-2xl font-bold text-foreground">徽章管理</h2>
        <div className="flex gap-2">
          <Button type="button" variant="outline" onClick={startCreate}>
            <Plus className="h-4 w-4 mr-1" /> 新增徽章
          </Button>
          <Button type="button" onClick={handleSave} disabled={saving || (!creating && !selectedBadge)}>
            <Save className="h-4 w-4 mr-1" />
            {saving ? '儲存中...' : creating ? '建立徽章' : '儲存修改'}
          </Button>
        </div>
      </div>

      {loading ? (
        <p className="text-muted-foreground">載入中...</p>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6">
          <div className="space-y-2">
            {badges.map(b => {
              const title = translations.find(t => t.badge_id === b.id && t.lang === 0)?.title || b.code || `#${b.id}`;
              const imgUrl = resolveBadgeImageUrl(b.image_url);
              return (
                <button
                  key={b.id}
                  onClick={() => selectBadge(b.id)}
                  className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl text-left transition-colors border ${
                    !creating && selectedId === b.id
                      ? 'bg-primary/10 border-primary/30'
                      : 'hover:bg-muted border-transparent'
                  }`}
                >
                  {imgUrl ? (
                    <img src={imgUrl} alt={title} className="w-10 h-10 rounded-lg object-cover shrink-0" />
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

          <div className="space-y-5">
            <Card>
              <CardContent className="pt-5 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>徽章代碼</Label>
                    <Input
                      value={badgeForm.code}
                      onChange={e => setBadgeForm(prev => ({ ...prev, code: e.target.value }))}
                      placeholder="e.g. palau"
                    />
                  </div>
                  <div>
                    <Label>價格 (USD)</Label>
                    <Input
                      type="number"
                      value={badgeForm.price}
                      onChange={e => setBadgeForm(prev => ({ ...prev, price: Number(e.target.value) || 0 }))}
                    />
                  </div>
                </div>

                <div>
                  <Label>圖片路徑 / URL</Label>
                  <Input
                    value={badgeForm.image_url}
                    onChange={e => setBadgeForm(prev => ({ ...prev, image_url: e.target.value }))}
                    placeholder="/badges/palau.jpg 或 https://... 或 media-file.jpg"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    支援 /badges/*、完整 URL、或 media bucket 檔名
                  </p>
                </div>

                <div className="flex items-center justify-between rounded-lg border border-border px-3 py-2">
                  <Label>啟用狀態</Label>
                  <Switch
                    checked={badgeForm.is_active}
                    onCheckedChange={checked => setBadgeForm(prev => ({ ...prev, is_active: checked }))}
                  />
                </div>

                <div>
                  <Label className="mb-2 block">預覽</Label>
                  <div className="w-full h-40 rounded-xl border border-border bg-muted overflow-hidden flex items-center justify-center">
                    {resolveBadgeImageUrl(badgeForm.image_url) ? (
                      <img
                        src={resolveBadgeImageUrl(badgeForm.image_url)!}
                        alt="badge preview"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <Award className="h-10 w-10 text-muted-foreground" />
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-5">
                <div className="flex items-center gap-2 mb-3">
                  <Target className="h-4 w-4 text-primary" />
                  <h4 className="text-sm font-semibold text-foreground">SDG 關聯目標（可多選）</h4>
                </div>
                <div className="flex flex-wrap gap-2">
                  {SDG_OPTIONS.map(sdg => {
                    const active = sdgForm.includes(sdg);
                    return (
                      <button
                        key={sdg}
                        type="button"
                        onClick={() => toggleSdg(sdg)}
                        className={`px-3 py-1.5 rounded-full text-xs border transition-colors ${
                          active
                            ? 'bg-primary text-primary-foreground border-primary'
                            : 'bg-background text-muted-foreground border-border hover:bg-muted'
                        }`}
                      >
                        SDG {sdg}
                      </button>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-5 space-y-4">
                <div className="flex items-center gap-2">
                  <Globe className="h-4 w-4 text-primary" />
                  <h4 className="text-sm font-semibold text-foreground">多語言內容（含日文）</h4>
                </div>

                {DB_LANGS.map(lang => (
                  <div key={lang.id} className="rounded-lg border border-border p-4 space-y-3">
                    <div className="flex items-center justify-between gap-3">
                      <Badge variant="outline">{lang.label}</Badge>
                      <span className="text-xs text-muted-foreground">{lang.hint}</span>
                    </div>
                    <div>
                      <Label>標題</Label>
                      <Input
                        value={translationForm[lang.id].title}
                        onChange={e => updateTranslationField(lang.id, 'title', e.target.value)}
                      />
                    </div>
                    <div>
                      <Label>首頁標題</Label>
                      <Input
                        value={translationForm[lang.id].home_header}
                        onChange={e => updateTranslationField(lang.id, 'home_header', e.target.value)}
                      />
                    </div>
                    <div>
                      <Label>摘要</Label>
                      <Textarea
                        rows={3}
                        value={translationForm[lang.id].summary}
                        onChange={e => updateTranslationField(lang.id, 'summary', e.target.value)}
                      />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}

