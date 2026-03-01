import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Pencil, Trash2, Calendar, FileText, Image as ImageIcon } from 'lucide-react';
import { toast } from 'sonner';

const SUPABASE_URL = 'https://jbfybrxpdippdsettdgv.supabase.co';

const LANGS = [
  { id: 0, label: '繁中' },
  { id: 1, label: '简中' },
  { id: 2, label: 'EN' },
  { id: 3, label: 'JP' },
];

const CATEGORIES = [
  { value: 'all', label: '全部' },
  { value: 'blog', label: '📝 資訊文章' },
  { value: 'event', label: '📅 活動' },
];

interface PostRow {
  id: number;
  slug: string;
  cover_image: string | null;
  is_published: boolean;
  created_at: string;
  category: string;
  event_date: string | null;
}

interface TranslationForm {
  title: string;
  summary: string;
  content: string;
}

const emptyTranslation = (): TranslationForm => ({ title: '', summary: '', content: '' });

function CoverImagePicker({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const [mediaList, setMediaList] = useState<{ name: string; url: string }[]>([]);
  const [showPicker, setShowPicker] = useState(false);

  const loadMedia = async () => {
    const { data } = await supabase.storage.from('media').list('', { limit: 200, sortBy: { column: 'created_at', order: 'desc' } });
    const items = (data ?? [])
      .filter(f => /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(f.name))
      .map(f => ({
        name: f.name,
        url: `${SUPABASE_URL}/storage/v1/object/public/media/${f.name}`,
      }));
    setMediaList(items);
    setShowPicker(true);
  };

  return (
    <div className="space-y-2">
      <div className="flex gap-2">
        <Input value={value} onChange={e => onChange(e.target.value)} placeholder="圖片 URL" className="text-sm flex-1" />
        <Button type="button" variant="outline" size="sm" onClick={loadMedia}>
          <ImageIcon className="h-4 w-4 mr-1" /> 選擇
        </Button>
      </div>
      {value && (
        <img src={value} alt="" className="w-24 h-16 object-cover rounded-lg border" />
      )}
      {showPicker && (
        <div className="grid grid-cols-4 gap-2 max-h-48 overflow-y-auto border rounded-lg p-2 bg-background">
          {mediaList.length === 0 ? (
            <p className="col-span-4 text-xs text-muted-foreground text-center py-4">媒體庫無圖片</p>
          ) : mediaList.map(item => (
            <img
              key={item.name}
              src={item.url}
              alt={item.name}
              title={item.name}
              className="w-full aspect-square object-cover rounded cursor-pointer hover:ring-2 ring-primary"
              onClick={() => { onChange(item.url); setShowPicker(false); }}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default function AdminPosts() {
  const [posts, setPosts] = useState<PostRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [slug, setSlug] = useState('');
  const [coverImage, setCoverImage] = useState('');
  const [isPublished, setIsPublished] = useState(false);
  const [category, setCategory] = useState('blog');
  const [eventDate, setEventDate] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [translations, setTranslations] = useState<Record<number, TranslationForm>>({
    0: emptyTranslation(), 1: emptyTranslation(),
    2: emptyTranslation(), 3: emptyTranslation(),
  });
  const [saving, setSaving] = useState(false);
  // Store first lang title for display
  const [titleMap, setTitleMap] = useState<Record<number, string>>({});

  const fetchPosts = async () => {
    setLoading(true);
    const { data } = await supabase
      .from('posts')
      .select('*')
      .order('created_at', { ascending: false });
    const rows = (data as PostRow[]) ?? [];
    setPosts(rows);

    // Fetch lang=0 titles for display
    if (rows.length > 0) {
      const { data: tData } = await supabase
        .from('post_translations')
        .select('post_id, title')
        .in('post_id', rows.map(r => r.id))
        .eq('lang', 0);
      const map: Record<number, string> = {};
      (tData ?? []).forEach((t: any) => { map[t.post_id] = t.title; });
      setTitleMap(map);
    }
    setLoading(false);
  };

  useEffect(() => { fetchPosts(); }, []);

  const resetForm = () => {
    setEditingId(null);
    setSlug('');
    setCoverImage('');
    setIsPublished(false);
    setCategory('blog');
    setEventDate('');
    setTranslations({
      0: emptyTranslation(), 1: emptyTranslation(),
      2: emptyTranslation(), 3: emptyTranslation(),
    });
  };

  const openCreate = () => { resetForm(); setDialogOpen(true); };

  const openEdit = async (post: PostRow) => {
    setEditingId(post.id);
    setSlug(post.slug);
    setCoverImage(post.cover_image ?? '');
    setIsPublished(post.is_published);
    setCategory(post.category || 'blog');
    setEventDate(post.event_date ?? '');
    const { data } = await supabase
      .from('post_translations')
      .select('*')
      .eq('post_id', post.id);
    const map: Record<number, TranslationForm> = {
      0: emptyTranslation(), 1: emptyTranslation(),
      2: emptyTranslation(), 3: emptyTranslation(),
    };
    (data ?? []).forEach((t: any) => {
      map[t.lang] = { title: t.title, summary: t.summary, content: t.content };
    });
    setTranslations(map);
    setDialogOpen(true);
  };

  const handleSave = async () => {
    if (!slug.trim()) { toast.error('請輸入 slug'); return; }
    setSaving(true);
    try {
      let postId = editingId;
      const postData = {
        slug,
        cover_image: coverImage || null,
        is_published: isPublished,
        category,
        event_date: category === 'event' && eventDate ? eventDate : null,
      };
      if (editingId) {
        await supabase.from('posts').update(postData).eq('id', editingId);
      } else {
        const { data, error } = await supabase.from('posts').insert(postData).select('id').single();
        if (error) throw error;
        postId = data.id;
      }

      for (const lang of LANGS) {
        const t = translations[lang.id];
        await supabase.from('post_translations').upsert({
          post_id: postId!,
          lang: lang.id,
          title: t.title,
          summary: t.summary,
          content: t.content,
        }, { onConflict: 'post_id,lang' });
      }

      toast.success(editingId ? '文章已更新' : '文章已建立');
      setDialogOpen(false);
      resetForm();
      fetchPosts();
    } catch (e: any) {
      toast.error(e.message || '儲存失敗');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('確定刪除此文章？')) return;
    await supabase.from('posts').delete().eq('id', id);
    toast.success('已刪除');
    fetchPosts();
  };

  const updateTranslation = (lang: number, field: keyof TranslationForm, value: string) => {
    setTranslations(prev => ({
      ...prev,
      [lang]: { ...prev[lang], [field]: value },
    }));
  };

  const filtered = filterCategory === 'all'
    ? posts
    : posts.filter(p => p.category === filterCategory);

  return (
    <div>
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <h2 className="text-2xl font-bold text-foreground">文章管理</h2>
        <div className="flex items-center gap-2">
          <Select value={filterCategory} onValueChange={setFilterCategory}>
            <SelectTrigger className="w-[140px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {CATEGORIES.map(c => (
                <SelectItem key={c.value} value={c.value}>{c.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button onClick={openCreate}><Plus className="h-4 w-4 mr-1" />新增</Button>
        </div>
      </div>

      {loading ? (
        <p className="text-muted-foreground">載入中...</p>
      ) : filtered.length === 0 ? (
        <p className="text-muted-foreground">暫無文章</p>
      ) : (
        <div className="space-y-3">
          {filtered.map(post => (
            <Card key={post.id}>
              <CardContent className="flex items-center justify-between py-4">
                <div className="flex items-center gap-3 min-w-0">
                  {post.cover_image && (
                    <img src={post.cover_image} alt="" className="w-12 h-12 rounded object-cover shrink-0" />
                  )}
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      {post.category === 'event' ? (
                        <Calendar className="h-3.5 w-3.5 text-primary shrink-0" />
                      ) : (
                        <FileText className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                      )}
                      <p className="font-medium text-foreground truncate">
                        {titleMap[post.id] || post.slug}
                      </p>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {post.is_published ? '✅ 已發佈' : '📝 草稿'}
                      {post.category === 'event' && post.event_date && ` · 📅 ${post.event_date}`}
                      {' · '}{new Date(post.created_at).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2 shrink-0">
                  <Button variant="outline" size="sm" onClick={() => openEdit(post)}>
                    <Pencil className="h-3.5 w-3.5" />
                  </Button>
                  <Button variant="destructive" size="sm" onClick={() => handleDelete(post.id)}>
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <p className="text-xs text-muted-foreground mt-4">
        共 {filtered.length} 篇 {filterCategory !== 'all' && `(全部 ${posts.length} 篇)`}
      </p>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingId ? '編輯文章' : '新增文章'}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>分類</Label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="blog">📝 資訊文章</SelectItem>
                    <SelectItem value="event">📅 活動</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Slug (網址路徑)</Label>
                <Input value={slug} onChange={e => setSlug(e.target.value)} placeholder="e.g. kochi-eco-tour" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>封面圖片</Label>
                <CoverImagePicker value={coverImage} onChange={setCoverImage} />
              </div>
              {category === 'event' && (
                <div>
                  <Label>活動日期</Label>
                  <Input type="date" value={eventDate} onChange={e => setEventDate(e.target.value)} />
                </div>
              )}
            </div>

            <div className="flex items-center gap-2">
              <Switch checked={isPublished} onCheckedChange={setIsPublished} />
              <Label>發佈</Label>
            </div>

            <Tabs defaultValue="0">
              <TabsList>
                {LANGS.map(l => <TabsTrigger key={l.id} value={String(l.id)}>{l.label}</TabsTrigger>)}
              </TabsList>
              {LANGS.map(l => (
                <TabsContent key={l.id} value={String(l.id)} className="space-y-3">
                  <div>
                    <Label>標題</Label>
                    <Input
                      value={translations[l.id].title}
                      onChange={e => updateTranslation(l.id, 'title', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label>摘要</Label>
                    <Textarea
                      value={translations[l.id].summary}
                      onChange={e => updateTranslation(l.id, 'summary', e.target.value)}
                      rows={2}
                    />
                  </div>
                  <div>
                    <Label>內容</Label>
                    <Textarea
                      value={translations[l.id].content}
                      onChange={e => updateTranslation(l.id, 'content', e.target.value)}
                      rows={10}
                    />
                  </div>
                </TabsContent>
              ))}
            </Tabs>

            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setDialogOpen(false)}>取消</Button>
              <Button onClick={handleSave} disabled={saving}>
                {saving ? '儲存中...' : '儲存'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
