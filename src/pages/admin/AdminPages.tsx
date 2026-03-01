import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Trash2, GripVertical, ArrowUp, ArrowDown, Eye, FileText, Image as ImageIcon, Type, AlignLeft, LayoutList, Globe, ExternalLink } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { MediaPickerButton } from '@/components/MediaPickerButton';

const FIXED_PAGES = [
  { path: '/site', label: '首頁 Home' },
  { path: '/site/how-it-works', label: '如何獲得徽章' },
  { path: '/site/events', label: '活動與資訊' },
  { path: '/site/contact', label: '聯絡我們' },
];


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

  const selectPage = async (id: number) => {
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
    // Update page meta
    await supabase.from('pages').update({ slug: pageForm.slug, title: pageForm.title, is_published: pageForm.is_published } as any).eq('id', selectedId);
    // Delete old blocks & insert new
    await supabase.from('page_blocks').delete().eq('page_id', selectedId);
    if (blocks.length > 0) {
      const inserts = blocks.map((b, i) => ({ page_id: selectedId, block_type: b.block_type, content: b.content, sort_order: i } as any));
      await supabase.from('page_blocks').insert(inserts);
    }
    setSaving(false);
    await loadPages();
    toast({ title: '已儲存' });
  };

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
                <a
                  key={fp.path}
                  href={fp.path}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 no-underline bg-card text-muted-foreground hover:bg-muted"
                >
                  <Globe className="h-4 w-4 shrink-0" />
                  <span className="truncate">{fp.label}</span>
                  <ExternalLink className="h-3 w-3 ml-auto shrink-0 opacity-50" />
                </a>
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
        {selectedId ? (
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
