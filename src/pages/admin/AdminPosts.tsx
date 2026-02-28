import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

const LANGS = [
  { id: 0, label: '繁中' },
  { id: 1, label: '简中' },
  { id: 2, label: 'EN' },
  { id: 3, label: 'JP' },
];

interface PostRow {
  id: number;
  slug: string;
  cover_image: string | null;
  is_published: boolean;
  created_at: string;
}

interface TranslationForm {
  title: string;
  summary: string;
  content: string;
}

const emptyTranslation = (): TranslationForm => ({ title: '', summary: '', content: '' });

export default function AdminPosts() {
  const [posts, setPosts] = useState<PostRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [slug, setSlug] = useState('');
  const [coverImage, setCoverImage] = useState('');
  const [isPublished, setIsPublished] = useState(false);
  const [translations, setTranslations] = useState<Record<number, TranslationForm>>({
    0: emptyTranslation(),
    1: emptyTranslation(),
    2: emptyTranslation(),
    3: emptyTranslation(),
  });
  const [saving, setSaving] = useState(false);

  const fetchPosts = async () => {
    setLoading(true);
    const { data } = await supabase
      .from('posts')
      .select('*')
      .order('created_at', { ascending: false });
    setPosts((data as PostRow[]) ?? []);
    setLoading(false);
  };

  useEffect(() => { fetchPosts(); }, []);

  const resetForm = () => {
    setEditingId(null);
    setSlug('');
    setCoverImage('');
    setIsPublished(false);
    setTranslations({
      0: emptyTranslation(), 1: emptyTranslation(),
      2: emptyTranslation(), 3: emptyTranslation(),
    });
  };

  const openCreate = () => {
    resetForm();
    setDialogOpen(true);
  };

  const openEdit = async (post: PostRow) => {
    setEditingId(post.id);
    setSlug(post.slug);
    setCoverImage(post.cover_image ?? '');
    setIsPublished(post.is_published);
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
      if (editingId) {
        await supabase.from('posts').update({
          slug, cover_image: coverImage || null, is_published: isPublished,
        }).eq('id', editingId);
      } else {
        const { data, error } = await supabase.from('posts').insert({
          slug, cover_image: coverImage || null, is_published: isPublished,
        }).select('id').single();
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

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-foreground">文章管理</h2>
        <Button onClick={openCreate}><Plus className="h-4 w-4 mr-1" />新增文章</Button>
      </div>

      {loading ? (
        <p className="text-muted-foreground">載入中...</p>
      ) : posts.length === 0 ? (
        <p className="text-muted-foreground">暫無文章</p>
      ) : (
        <div className="space-y-3">
          {posts.map(post => (
            <Card key={post.id}>
              <CardContent className="flex items-center justify-between py-4">
                <div className="flex items-center gap-3">
                  {post.cover_image && (
                    <img src={post.cover_image} alt="" className="w-12 h-12 rounded object-cover shrink-0" />
                  )}
                  <div>
                    <p className="font-medium text-foreground">{post.slug}</p>
                    <p className="text-xs text-muted-foreground">
                      {post.is_published ? '✅ 已發佈' : '📝 草稿'} · {new Date(post.created_at).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
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

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingId ? '編輯文章' : '新增文章'}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Slug (網址路徑)</Label>
                <Input value={slug} onChange={e => setSlug(e.target.value)} placeholder="e.g. kochi-eco-tour" />
              </div>
              <div>
                <Label>封面圖片 URL</Label>
                <Input value={coverImage} onChange={e => setCoverImage(e.target.value)} placeholder="https://..." />
              </div>
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
