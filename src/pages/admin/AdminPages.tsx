import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { Plus, Trash2, GripVertical, ArrowUp, ArrowDown, Eye, FileText, Image as ImageIcon, Type, AlignLeft, LayoutList, Globe, ExternalLink, Save } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { MediaPickerButton } from '@/components/MediaPickerButton';

/* ── Fixed page definitions with mapped site_content fields ── */
const FIXED_PAGES: { path: string; label: string; fields: { key: string; label: string; multiline?: boolean; image?: boolean }[] }[] = [
  {
    path: '/site', label: '首頁 Home',
    fields: [
      { key: 'site_hero_title', label: 'Hero 標題' },
      { key: 'site_hero_desc', label: 'Hero 描述', multiline: true },
      { key: 'site_hero_img', label: 'Hero 背景圖片', image: true },
      { key: 'site_learnmore', label: '了解更多按鈕' },
      { key: 'site_programme_title', label: '計劃介紹標題' },
      { key: 'site_programme_desc', label: '計劃介紹描述', multiline: true },
      { key: 'site_feature1_title', label: '特色1 標題' },
      { key: 'site_feature1_desc', label: '特色1 描述', multiline: true },
      { key: 'site_feature1_img', label: '特色1 圖片', image: true },
      { key: 'site_feature2_title', label: '特色2 標題' },
      { key: 'site_feature2_desc', label: '特色2 描述', multiline: true },
      { key: 'site_feature2_img', label: '特色2 圖片', image: true },
      { key: 'site_feature3_title', label: '特色3 標題' },
      { key: 'site_feature3_desc', label: '特色3 描述', multiline: true },
      { key: 'site_feature3_img', label: '特色3 圖片', image: true },
      { key: 'site_feature4_title', label: '特色4 標題' },
      { key: 'site_feature4_desc', label: '特色4 描述', multiline: true },
      { key: 'site_feature4_img', label: '特色4 圖片', image: true },
      { key: 'site_sdg_title', label: 'SDG 區段標題' },
      { key: 'site_sdg_desc', label: 'SDG 區段描述' },
      { key: 'site_cta_title', label: 'CTA 標題' },
      { key: 'site_cta_desc', label: 'CTA 描述', multiline: true },
      { key: 'site_cta_img', label: 'CTA 背景圖片', image: true },
    ],
  },
  {
    path: '/site/how-it-works', label: '如何獲得徽章',
    fields: [
      { key: 'site_how_title', label: 'Hero 標題' },
      { key: 'site_how_desc', label: 'Hero 描述', multiline: true },
      { key: 'site_how_hero_img', label: 'Hero 背景圖片', image: true },
      { key: 'site_step1_title', label: '步驟1 標題' },
      { key: 'site_step1_desc', label: '步驟1 描述', multiline: true },
      { key: 'site_step1_img', label: '步驟1 圖片', image: true },
      { key: 'site_step2_title', label: '步驟2 標題' },
      { key: 'site_step2_desc', label: '步驟2 描述', multiline: true },
      { key: 'site_step2_img', label: '步驟2 圖片', image: true },
      { key: 'site_step3_title', label: '步驟3 標題' },
      { key: 'site_step3_desc', label: '步驟3 描述', multiline: true },
      { key: 'site_step3_img', label: '步驟3 圖片', image: true },
      { key: 'site_step4_title', label: '步驟4 標題' },
      { key: 'site_step4_desc', label: '步驟4 描述', multiline: true },
      { key: 'site_step4_img', label: '步驟4 圖片', image: true },
    ],
  },
  {
    path: '/site/events', label: '活動與資訊',
    fields: [
      { key: 'site_events_title', label: 'Hero 標題' },
      { key: 'site_events_desc', label: 'Hero 描述', multiline: true },
      { key: 'site_events_hero_img', label: 'Hero 背景圖片', image: true },
      { key: 'site_events_label', label: '活動區段標題' },
      { key: 'site_articles_label', label: '文章區段標題' },
      { key: 'site_no_events', label: '無活動提示' },
      { key: 'site_no_articles', label: '無文章提示' },
      { key: 'site_readmore', label: '閱讀更多按鈕' },
    ],
  },
  {
    path: '/site/contact', label: '聯絡我們',
    fields: [
      { key: 'site_contact_title', label: '頁面標題' },
      { key: 'site_contact_desc', label: '頁面描述', multiline: true },
      { key: 'site_contact_phone_label', label: '電話標籤' },
      { key: 'site_contact_phone', label: '電話號碼' },
      { key: 'site_contact_email_label', label: '電郵標籤' },
      { key: 'site_contact_email_val', label: '電郵地址' },
      { key: 'site_contact_addr_label', label: '地址標籤' },
      { key: 'site_contact_addr', label: '地址', multiline: true },
    ],
  },
  {
    path: '_layout', label: '導覽列與頁尾',
    fields: [
      { key: 'home', label: '首頁導覽標籤' },
      { key: 'site_nav_how', label: '如何獲得徽章導覽標籤' },
      { key: 'event', label: '活動導覽標籤' },
      { key: 'contactus', label: '聯絡我們導覽標籤' },
      { key: 'site_footer_desc', label: '頁尾描述', multiline: true },
      { key: 'site_footer_links', label: '頁尾快速連結標題' },
      { key: 'site_footer_contact', label: '頁尾聯絡標題' },
      { key: 'email', label: '頁尾電郵' },
      { key: 'contact', label: '頁尾電話' },
    ],
  },
];

const LANGS = [
  { id: 0, label: '繁中' },
  { id: 1, label: '简中' },
  { id: 2, label: 'EN' },
  { id: 3, label: 'JP' },
];

/* ── Fixed page editor (site_content fields) ── */
function FixedPageEditor({ page }: { page: typeof FIXED_PAGES[0] }) {
  const { toast } = useToast();
  const [data, setData] = useState<Record<number, Record<string, string>>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [viewMode, setViewMode] = useState<'edit' | 'preview'>('edit');
  const [previewKey, setPreviewKey] = useState(0);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const { data: rows } = await supabase.from('site_content').select('*');
      const map: Record<number, Record<string, string>> = {};
      (rows ?? []).forEach((r: any) => { map[r.lang] = r; });
      setData(map);
      setLoading(false);
    })();
  }, []);

  const updateField = (lang: number, key: string, value: string) => {
    setData(prev => ({ ...prev, [lang]: { ...prev[lang], [key]: value } }));
  };

  const handleSave = async (lang: number) => {
    setSaving(true);
    try {
      const row = data[lang];
      if (!row) return;
      const updates: Record<string, string> = {};
      page.fields.forEach(f => { updates[f.key] = row[f.key] ?? ''; });
      const { error } = await supabase.from('site_content').update(updates as any).eq('id', Number(row.id));
      if (error) throw error;
      toast({ title: `已儲存 ${LANGS.find(l => l.id === lang)?.label} 內容` });
      // Refresh preview after save
      setPreviewKey(k => k + 1);
    } catch (e: any) {
      toast({ title: '儲存失敗', description: e.message, variant: 'destructive' });
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p className="text-muted-foreground py-8 text-center">載入中...</p>;

  return (
    <div className="space-y-4">
      <Card>
        <CardContent className="p-4 flex items-center justify-between">
          <h3 className="font-semibold text-foreground">{page.label}</h3>
          <div className="flex items-center gap-2">
            <div className="flex bg-muted rounded-lg p-0.5">
              <button
                onClick={() => setViewMode('edit')}
                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors border-none cursor-pointer ${
                  viewMode === 'edit' ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <FileText className="h-3.5 w-3.5 inline mr-1" />編輯
              </button>
              <button
                onClick={() => { setViewMode('preview'); setPreviewKey(k => k + 1); }}
                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors border-none cursor-pointer ${
                  viewMode === 'preview' ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <Eye className="h-3.5 w-3.5 inline mr-1" />預覽
              </button>
            </div>
            <Button variant="outline" size="sm" asChild>
              <a href={page.path} target="_blank" rel="noreferrer"><ExternalLink className="h-3.5 w-3.5 mr-1" /> 開新頁</a>
            </Button>
          </div>
        </CardContent>
      </Card>

      {viewMode === 'preview' ? (
        <div className="border border-border rounded-xl overflow-hidden bg-background">
          <div className="bg-muted/50 px-3 py-2 flex items-center gap-2 border-b border-border">
            <div className="flex gap-1.5">
              <span className="w-3 h-3 rounded-full bg-destructive/40" />
              <span className="w-3 h-3 rounded-full bg-yellow-400/40" />
              <span className="w-3 h-3 rounded-full bg-green-500/40" />
            </div>
            <span className="text-xs text-muted-foreground font-mono ml-2 truncate">{window.location.origin}{page.path}</span>
          </div>
          <iframe
            key={previewKey}
            src={page.path}
            className="w-full border-0"
            style={{ height: '70vh' }}
            title={`Preview: ${page.label}`}
          />
        </div>
      ) : (
        <Tabs defaultValue="0">
          <TabsList>
            {LANGS.map(l => <TabsTrigger key={l.id} value={String(l.id)}>{l.label}</TabsTrigger>)}
          </TabsList>
          {LANGS.map(l => (
            <TabsContent key={l.id} value={String(l.id)}>
              {data[l.id] ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {page.fields.map(field => (
                      <div key={field.key} className={(field.multiline || field.image) ? 'md:col-span-2' : ''}>
                        <Label className="text-xs text-muted-foreground mb-1.5 block">
                          {field.label}
                          <span className="text-[10px] ml-1.5 opacity-40 font-mono">({field.key})</span>
                        </Label>
                        {field.image ? (
                          <div className="space-y-2">
                            <div className="flex gap-2 items-center">
                              <div className="flex-1">
                                <Input
                                  placeholder="圖片 URL（留空則使用預設圖片）"
                                  value={data[l.id]?.[field.key] ?? ''}
                                  onChange={e => updateField(l.id, field.key, e.target.value)}
                                  className="text-sm"
                                />
                              </div>
                              <MediaPickerButton onSelect={(url) => updateField(l.id, field.key, url)} />
                            </div>
                            {data[l.id]?.[field.key] && (
                              <img src={data[l.id][field.key]} alt="" className="max-h-32 rounded border border-border object-cover" />
                            )}
                          </div>
                        ) : field.multiline ? (
                          <Textarea
                            value={data[l.id]?.[field.key] ?? ''}
                            onChange={e => updateField(l.id, field.key, e.target.value)}
                            rows={3} className="text-sm"
                          />
                        ) : (
                          <Input
                            value={data[l.id]?.[field.key] ?? ''}
                            onChange={e => updateField(l.id, field.key, e.target.value)}
                            className="text-sm"
                          />
                        )}
                      </div>
                    ))}
                  </div>
                  <Button onClick={() => handleSave(l.id)} disabled={saving} className="w-full">
                    <Save className="h-4 w-4 mr-1" />
                    {saving ? '儲存中...' : `儲存 ${l.label}`}
                  </Button>
                </div>
              ) : (
                <p className="text-muted-foreground py-4">此語言尚無內容記錄。</p>
              )}
            </TabsContent>
          ))}
        </Tabs>
      )}
    </div>
  );
}

/* ── Block types ── */
type Block = {
  id?: number;
  block_type: string;
  content: Record<string, any>;
  sort_order: number;
};

type Page = {
  id: number;
  slug: string;
  title: string;
  is_published: boolean;
  created_at: string;
};

const BLOCK_TYPES = [
  { value: 'heading', label: '標題 Heading', icon: Type },
  { value: 'text', label: '文字 Text', icon: AlignLeft },
  { value: 'image', label: '圖片 Image', icon: ImageIcon },
  { value: 'blog_feed', label: '部落格列表 Blog Feed', icon: LayoutList },
  { value: 'hero', label: '橫幅 Hero Banner', icon: FileText },
];

function BlockEditor({ block, onChange, onRemove, onMoveUp, onMoveDown, isFirst, isLast }: {
  block: Block;
  onChange: (b: Block) => void;
  onRemove: () => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
  isFirst: boolean;
  isLast: boolean;
}) {
  const update = (content: Record<string, any>) => onChange({ ...block, content: { ...block.content, ...content } });
  const typeMeta = BLOCK_TYPES.find(t => t.value === block.block_type);
  const Icon = typeMeta?.icon ?? FileText;

  return (
    <Card className="relative group">
      <CardContent className="p-4">
        <div className="flex items-center gap-2 mb-3">
          <GripVertical className="h-4 w-4 text-muted-foreground" />
          <Icon className="h-4 w-4 text-muted-foreground" />
          <span className="text-xs font-medium text-muted-foreground uppercase">{typeMeta?.label ?? block.block_type}</span>
          <div className="ml-auto flex items-center gap-1">
            <Button variant="ghost" size="icon" className="h-7 w-7" disabled={isFirst} onClick={onMoveUp}><ArrowUp className="h-3 w-3" /></Button>
            <Button variant="ghost" size="icon" className="h-7 w-7" disabled={isLast} onClick={onMoveDown}><ArrowDown className="h-3 w-3" /></Button>
            <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive" onClick={onRemove}><Trash2 className="h-3 w-3" /></Button>
          </div>
        </div>

        {block.block_type === 'heading' && (
          <div className="space-y-2">
            <Input placeholder="標題文字" value={block.content.text ?? ''} onChange={e => update({ text: e.target.value })} />
            <Select value={block.content.level ?? 'h2'} onValueChange={v => update({ level: v })}>
              <SelectTrigger className="w-32"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="h1">H1</SelectItem>
                <SelectItem value="h2">H2</SelectItem>
                <SelectItem value="h3">H3</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}

        {block.block_type === 'text' && (
          <Textarea placeholder="輸入內容（支援多行）" rows={4} value={block.content.text ?? ''} onChange={e => update({ text: e.target.value })} />
        )}

        {block.block_type === 'image' && (
          <div className="space-y-2">
            <div className="flex gap-2 items-center">
              <div className="flex-1">
                <Input placeholder="圖片 URL" value={block.content.url ?? ''} onChange={e => update({ url: e.target.value })} />
              </div>
              <MediaPickerButton onSelect={(url) => update({ url })} />
            </div>
            <Input placeholder="圖片說明 (alt)" value={block.content.alt ?? ''} onChange={e => update({ alt: e.target.value })} />
            {block.content.url && (
              <img src={block.content.url} alt={block.content.alt ?? ''} className="max-h-40 rounded border object-cover" />
            )}
          </div>
        )}

        {block.block_type === 'hero' && (
          <div className="space-y-2">
            <Input placeholder="標題" value={block.content.title ?? ''} onChange={e => update({ title: e.target.value })} />
            <Input placeholder="副標題" value={block.content.subtitle ?? ''} onChange={e => update({ subtitle: e.target.value })} />
            <div className="flex gap-2 items-center">
              <div className="flex-1">
                <Input placeholder="背景圖片 URL" value={block.content.bg ?? ''} onChange={e => update({ bg: e.target.value })} />
              </div>
              <MediaPickerButton onSelect={(url) => update({ bg: url })} />
            </div>
            {block.content.bg && (
              <img src={block.content.bg} alt="bg preview" className="max-h-32 rounded border object-cover w-full" />
            )}
          </div>
        )}

        {block.block_type === 'blog_feed' && (
          <div className="space-y-2">
            <Select value={block.content.category ?? 'all'} onValueChange={v => update({ category: v })}>
              <SelectTrigger><SelectValue placeholder="分類" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">全部</SelectItem>
                <SelectItem value="blog">部落格</SelectItem>
                <SelectItem value="event">活動</SelectItem>
              </SelectContent>
            </Select>
            <Input type="number" placeholder="顯示數量" value={block.content.limit ?? 6} onChange={e => update({ limit: parseInt(e.target.value) || 6 })} />
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default function AdminPages() {
  const { toast } = useToast();
  const [pages, setPages] = useState<Page[]>([]);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [selectedFixed, setSelectedFixed] = useState<string | null>(null);
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [pageForm, setPageForm] = useState({ slug: '', title: '', is_published: false });
  const [saving, setSaving] = useState(false);
  const [createOpen, setCreateOpen] = useState(false);
  const [newSlug, setNewSlug] = useState('');
  const [newTitle, setNewTitle] = useState('');

  const loadPages = useCallback(async () => {
    const { data } = await supabase.from('pages').select('*').order('created_at', { ascending: false });
    setPages((data as any[]) ?? []);
  }, []);

  useEffect(() => { loadPages(); }, [loadPages]);

  const selectFixed = (path: string) => {
    setSelectedFixed(path);
    setSelectedId(null);
  };

  const selectPage = async (id: number) => {
    setSelectedFixed(null);
    setSelectedId(id);
    const page = pages.find(p => p.id === id);
    if (page) setPageForm({ slug: page.slug, title: page.title, is_published: page.is_published });
    const { data } = await supabase.from('page_blocks').select('*').eq('page_id', id).order('sort_order');
    setBlocks((data as any[]) ?? []);
  };

  const createPage = async () => {
    if (!newSlug.trim()) return;
    const { error } = await supabase.from('pages').insert({ slug: newSlug.trim(), title: newTitle.trim() } as any);
    if (error) { toast({ title: '錯誤', description: error.message, variant: 'destructive' }); return; }
    setCreateOpen(false);
    setNewSlug('');
    setNewTitle('');
    await loadPages();
    toast({ title: '已建立頁面' });
  };

  const deletePage = async () => {
    if (!selectedId) return;
    await supabase.from('pages').delete().eq('id', selectedId);
    setSelectedId(null);
    setBlocks([]);
    await loadPages();
    toast({ title: '已刪除頁面' });
  };

  const addBlock = (type: string) => {
    setBlocks(prev => [...prev, { block_type: type, content: {}, sort_order: prev.length }]);
  };

  const updateBlock = (idx: number, block: Block) => {
    setBlocks(prev => prev.map((b, i) => i === idx ? block : b));
  };

  const removeBlock = (idx: number) => {
    setBlocks(prev => prev.filter((_, i) => i !== idx));
  };

  const moveBlock = (idx: number, dir: -1 | 1) => {
    setBlocks(prev => {
      const next = [...prev];
      const target = idx + dir;
      if (target < 0 || target >= next.length) return next;
      [next[idx], next[target]] = [next[target], next[idx]];
      return next;
    });
  };

  const savePage = async () => {
    if (!selectedId) return;
    setSaving(true);
    await supabase.from('pages').update({ slug: pageForm.slug, title: pageForm.title, is_published: pageForm.is_published } as any).eq('id', selectedId);
    await supabase.from('page_blocks').delete().eq('page_id', selectedId);
    if (blocks.length > 0) {
      const inserts = blocks.map((b, i) => ({ page_id: selectedId, block_type: b.block_type, content: b.content, sort_order: i } as any));
      await supabase.from('page_blocks').insert(inserts);
    }
    setSaving(false);
    await loadPages();
    toast({ title: '已儲存' });
  };

  const fixedPage = FIXED_PAGES.find(fp => fp.path === selectedFixed);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-foreground">頁面管理 Page Builder</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[260px_1fr] gap-6">
        {/* Left: page list */}
        <div className="space-y-4">
          {/* Fixed site pages */}
          <div>
            <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 px-1">現有頁面</h4>
            <div className="space-y-1">
              {FIXED_PAGES.map(fp => (
                <button
                  key={fp.path}
                  onClick={() => selectFixed(fp.path)}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 border-none cursor-pointer ${
                    selectedFixed === fp.path ? 'bg-primary text-primary-foreground' : 'bg-card text-muted-foreground hover:bg-muted'
                  }`}
                >
                  <Globe className="h-4 w-4 shrink-0" />
                  <span className="truncate">{fp.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Dynamic pages */}
          <div>
            <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 px-1">自訂頁面</h4>
            <Dialog open={createOpen} onOpenChange={setCreateOpen}>
              <DialogTrigger asChild>
                <Button size="sm" className="w-full mb-2"><Plus className="h-4 w-4 mr-1" /> 新增頁面</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader><DialogTitle>新增頁面</DialogTitle></DialogHeader>
                <div className="space-y-3 pt-2">
                  <Input placeholder="Slug (如 about-us)" value={newSlug} onChange={e => setNewSlug(e.target.value)} />
                  <Input placeholder="標題" value={newTitle} onChange={e => setNewTitle(e.target.value)} />
                  <Button onClick={createPage} className="w-full">建立</Button>
                </div>
              </DialogContent>
            </Dialog>

            <div className="space-y-1">
              {pages.map(p => (
                <button
                  key={p.id}
                  onClick={() => selectPage(p.id)}
                  className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-colors border-none cursor-pointer ${
                    selectedId === p.id ? 'bg-primary text-primary-foreground' : 'bg-card text-muted-foreground hover:bg-muted'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4 shrink-0" />
                    <span className="truncate">{p.title || p.slug}</span>
                    {p.is_published && <span className="ml-auto text-[10px] bg-primary/20 text-primary px-1.5 py-0.5 rounded">已發佈</span>}
                  </div>
                </button>
              ))}
              {pages.length === 0 && <p className="text-xs text-muted-foreground text-center py-3">尚無自訂頁面</p>}
            </div>
          </div>
        </div>

        {/* Right: editor */}
        {fixedPage ? (
          <FixedPageEditor key={fixedPage.path} page={fixedPage} />
        ) : selectedId ? (
          <div className="space-y-4">
            {/* Page meta */}
            <Card>
              <CardContent className="p-4 space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs text-muted-foreground">Slug</label>
                    <Input value={pageForm.slug} onChange={e => setPageForm(f => ({ ...f, slug: e.target.value }))} />
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground">標題</label>
                    <Input value={pageForm.title} onChange={e => setPageForm(f => ({ ...f, title: e.target.value }))} />
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Switch checked={pageForm.is_published} onCheckedChange={v => setPageForm(f => ({ ...f, is_published: v }))} />
                    <span className="text-sm text-muted-foreground">{pageForm.is_published ? '已發佈' : '草稿'}</span>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" asChild>
                      <a href={`/site/p/${pageForm.slug}`} target="_blank" rel="noreferrer"><Eye className="h-3.5 w-3.5 mr-1" /> 預覽</a>
                    </Button>
                    <Button variant="destructive" size="sm" onClick={deletePage}>刪除頁面</Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Blocks */}
            <div className="space-y-3">
              {blocks.map((block, idx) => (
                <BlockEditor
                  key={idx}
                  block={block}
                  onChange={b => updateBlock(idx, b)}
                  onRemove={() => removeBlock(idx)}
                  onMoveUp={() => moveBlock(idx, -1)}
                  onMoveDown={() => moveBlock(idx, 1)}
                  isFirst={idx === 0}
                  isLast={idx === blocks.length - 1}
                />
              ))}
            </div>

            {/* Add block */}
            <div className="flex flex-wrap gap-2">
              {BLOCK_TYPES.map(t => (
                <Button key={t.value} variant="outline" size="sm" onClick={() => addBlock(t.value)}>
                  <t.icon className="h-3.5 w-3.5 mr-1" /> {t.label}
                </Button>
              ))}
            </div>

            {/* Save */}
            <Button onClick={savePage} disabled={saving} className="w-full">
              {saving ? '儲存中...' : '儲存頁面'}
            </Button>

            {/* Live preview */}
            <div>
              <h4 className="text-sm font-medium text-muted-foreground mb-2">即時預覽</h4>
              <div className="border rounded-lg p-6 bg-background min-h-[200px]">
                <PagePreview blocks={blocks} />
              </div>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center text-muted-foreground h-64">
            ← 選擇或新增一個頁面
          </div>
        )}
      </div>
    </div>
  );
}

/* ── Inline preview renderer (also used in public page) ── */
export function PagePreview({ blocks }: { blocks: Block[] }) {
  return (
    <div className="space-y-6">
      {blocks.map((block, idx) => (
        <PageBlockRenderer key={idx} block={block} />
      ))}
      {blocks.length === 0 && <p className="text-muted-foreground text-center py-8">尚無內容</p>}
    </div>
  );
}

function PageBlockRenderer({ block }: { block: Block }) {
  switch (block.block_type) {
    case 'heading': {
      const Tag = (block.content.level ?? 'h2') as 'h1' | 'h2' | 'h3';
      const cls = Tag === 'h1' ? 'text-3xl font-bold' : Tag === 'h2' ? 'text-2xl font-semibold' : 'text-xl font-semibold';
      return <Tag className={`${cls} text-foreground`}>{block.content.text || '(標題)'}</Tag>;
    }
    case 'text':
      return <div className="text-foreground leading-relaxed whitespace-pre-wrap">{block.content.text || ''}</div>;
    case 'image':
      return block.content.url ? (
        <img src={block.content.url} alt={block.content.alt ?? ''} className="rounded-lg w-full max-h-[500px] object-cover" />
      ) : <div className="bg-muted rounded-lg h-40 flex items-center justify-center text-muted-foreground">無圖片</div>;
    case 'hero':
      return (
        <div className="relative rounded-lg overflow-hidden min-h-[240px] flex items-center justify-center text-center" style={{ backgroundImage: block.content.bg ? `url(${block.content.bg})` : undefined, backgroundSize: 'cover', backgroundPosition: 'center' }}>
          <div className="absolute inset-0 bg-black/40" />
          <div className="relative z-10 p-8 text-white">
            <h2 className="text-3xl font-bold mb-2">{block.content.title || '(標題)'}</h2>
            {block.content.subtitle && <p className="text-lg opacity-90">{block.content.subtitle}</p>}
          </div>
        </div>
      );
    case 'blog_feed':
      return <BlogFeedBlock category={block.content.category} limit={block.content.limit ?? 6} />;
    default:
      return <div className="text-muted-foreground text-sm">未知區塊類型: {block.block_type}</div>;
  }
}

function BlogFeedBlock({ category, limit }: { category?: string; limit: number }) {
  const [posts, setPosts] = useState<any[]>([]);
  useEffect(() => {
    (async () => {
      let q = supabase.from('posts').select('*, post_translations(*)').eq('is_published', true).order('created_at', { ascending: false }).limit(limit);
      if (category && category !== 'all') q = q.eq('category', category);
      const { data } = await q;
      setPosts(data ?? []);
    })();
  }, [category, limit]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {posts.map(post => {
        const t = (post.post_translations as any[])?.[0];
        return (
          <div key={post.id} className="rounded-lg border bg-card overflow-hidden">
            {post.cover_image && <img src={post.cover_image} alt="" className="w-full h-36 object-cover" />}
            <div className="p-3">
              <h4 className="font-semibold text-sm text-foreground">{t?.title || post.slug}</h4>
              <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{t?.summary}</p>
            </div>
          </div>
        );
      })}
      {posts.length === 0 && <p className="text-muted-foreground col-span-full text-center py-4">沒有文章</p>}
    </div>
  );
}
