import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Save, Search, Plus, Trash2, Image as ImageIcon } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface ContentRow {
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

const SECTION_LABELS: Record<string, string> = {
  home: '首頁 / Home',
  badges: '徽章列表 / Badges',
  passport: '護照 / Passport',
  coupons: '優惠券 / Coupons',
  settings: '設定 / Settings',
  ranking: '排行榜 / Ranking',
  login: '登入 / Login',
  payment: '付款 / Payment',
  payment_success: '付款成功 / Payment Success',
  contact: '聯絡 / Contact',
  nav: '底部導航 / Bottom Nav',
  images: '圖片 / Images',
};

const SECTION_ORDER = ['home', 'badges', 'passport', 'coupons', 'settings', 'ranking', 'login', 'signup', 'payment_success', 'contact', 'nav', 'images'];

const LANGS = [
  { id: 'tw', label: '繁中', field: 'value_tw' },
  { id: 'cn', label: '简中', field: 'value_cn' },
  { id: 'en', label: 'EN', field: 'value_en' },
  { id: 'ja', label: 'JP', field: 'value_ja' },
];

export default function AdminMobileContent() {
  const [data, setData] = useState<ContentRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [search, setSearch] = useState('');
  const [activeSection, setActiveSection] = useState('home');
  const [activeLang, setActiveLang] = useState('tw');
  const [addOpen, setAddOpen] = useState(false);
  const [newRow, setNewRow] = useState({ section: 'home', content_key: '', value_tw: '', value_cn: '', value_en: '', value_ja: '', content_type: 'text' });

  const fetchAll = async () => {
    setLoading(true);
    const { data: rows } = await supabase
      .from('mobile_content')
      .select('*')
      .order('sort_order', { ascending: true });
    setData((rows as any[]) ?? []);
    setLoading(false);
  };

  useEffect(() => { fetchAll(); }, []);

  const sections = SECTION_ORDER.filter(s => data.some(r => r.section === s));
  data.forEach(r => { if (!sections.includes(r.section)) sections.push(r.section); });

  const filteredSections = sections.filter(s =>
    !search || (SECTION_LABELS[s] || s).toLowerCase().includes(search.toLowerCase()) ||
    data.some(r => r.section === s && (r.content_key.includes(search) || r.value_tw.includes(search) || r.value_en.includes(search)))
  );

  const filteredRows = data.filter(r =>
    r.section === activeSection &&
    (!search || r.content_key.includes(search) || r.value_tw.includes(search) || r.value_en.includes(search))
  );

  const updateField = (id: number, field: string, value: string) => {
    setData(prev => prev.map(r => r.id === id ? { ...r, [field]: value } : r));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const sectionRows = data.filter(r => r.section === activeSection);
      for (const row of sectionRows) {
        const { id, ...rest } = row;
        const { error } = await supabase
          .from('mobile_content')
          .update(rest as any)
          .eq('id', id);
        if (error) throw error;
      }
      toast.success('已儲存');
    } catch (e: any) {
      toast.error(e.message || '儲存失敗');
    } finally {
      setSaving(false);
    }
  };

  const handleAdd = async () => {
    try {
      const maxSort = data.filter(r => r.section === newRow.section).reduce((m, r) => Math.max(m, r.sort_order), 0);
      const { error } = await supabase.from('mobile_content').insert({
        ...newRow,
        sort_order: maxSort + 1,
      } as any);
      if (error) throw error;
      toast.success('已新增');
      setAddOpen(false);
      setNewRow({ section: 'home', content_key: '', value_tw: '', value_cn: '', value_en: '', value_ja: '', content_type: 'text' });
      fetchAll();
    } catch (e: any) {
      toast.error(e.message);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('確定刪除？')) return;
    const { error } = await supabase.from('mobile_content').delete().eq('id', id);
    if (error) toast.error(error.message);
    else { toast.success('已刪除'); fetchAll(); }
  };

  const MediaInput = ({ value, onChange }: { value: string; onChange: (v: string) => void }) => {
    const [mediaList, setMediaList] = useState<string[]>([]);
    const [showPicker, setShowPicker] = useState(false);

    const loadMedia = async () => {
      const { data } = await supabase.storage.from('media').list('', { limit: 50 });
      const urls = (data ?? []).map(f => {
        const { data: urlData } = supabase.storage.from('media').getPublicUrl(f.name);
        return urlData.publicUrl;
      });
      setMediaList(urls);
      setShowPicker(true);
    };

    return (
      <div className="space-y-2">
        <div className="flex gap-2">
          <Input value={value} onChange={e => onChange(e.target.value)} placeholder="圖片 URL" className="text-sm flex-1" />
          <Button variant="outline" size="sm" onClick={loadMedia}>
            <ImageIcon className="h-4 w-4 mr-1" /> 選擇
          </Button>
        </div>
        {value && (
          <img src={value} alt="" className="w-20 h-20 object-cover rounded-lg border" />
        )}
        {showPicker && (
          <div className="grid grid-cols-4 gap-2 max-h-40 overflow-y-auto border rounded-lg p-2">
            {mediaList.map(url => (
              <img
                key={url}
                src={url}
                alt=""
                className="w-full aspect-square object-cover rounded cursor-pointer hover:ring-2 ring-primary"
                onClick={() => { onChange(url); setShowPicker(false); }}
              />
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <h2 className="text-2xl font-bold text-foreground">App 內容管理</h2>
        <Dialog open={addOpen} onOpenChange={setAddOpen}>
          <DialogTrigger asChild>
            <Button size="sm"><Plus className="h-4 w-4 mr-1" /> 新增內容</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>新增內容項目</DialogTitle></DialogHeader>
            <div className="space-y-3">
              <div>
                <Label>區段</Label>
                <Select value={newRow.section} onValueChange={v => setNewRow(p => ({ ...p, section: v }))}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {SECTION_ORDER.map(s => (
                      <SelectItem key={s} value={s}>{SECTION_LABELS[s] || s}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Key (英文識別碼)</Label>
                <Input value={newRow.content_key} onChange={e => setNewRow(p => ({ ...p, content_key: e.target.value }))} placeholder="e.g. page_title" />
              </div>
              <div>
                <Label>類型</Label>
                <Select value={newRow.content_type} onValueChange={v => setNewRow(p => ({ ...p, content_type: v }))}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="text">文字</SelectItem>
                    <SelectItem value="image">圖片</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>繁體中文</Label>
                <Input value={newRow.value_tw} onChange={e => setNewRow(p => ({ ...p, value_tw: e.target.value }))} />
              </div>
              <div>
                <Label>简体中文</Label>
                <Input value={newRow.value_cn} onChange={e => setNewRow(p => ({ ...p, value_cn: e.target.value }))} />
              </div>
              <div>
                <Label>English</Label>
                <Input value={newRow.value_en} onChange={e => setNewRow(p => ({ ...p, value_en: e.target.value }))} />
              </div>
              <div>
                <Label>日本語</Label>
                <Input value={newRow.value_ja} onChange={e => setNewRow(p => ({ ...p, value_ja: e.target.value }))} />
              </div>
              <Button onClick={handleAdd} className="w-full">新增</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {loading ? (
        <p className="text-muted-foreground">載入中...</p>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-6">
          {/* ── Left: section nav ── */}
          <div className="space-y-1">
            <div className="relative mb-3">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input value={search} onChange={e => setSearch(e.target.value)} placeholder="搜尋..." className="pl-9 text-sm" />
            </div>
            <nav className="flex lg:flex-col gap-1 overflow-x-auto lg:overflow-x-visible pb-2 lg:pb-0">
              {filteredSections.map(s => (
                <button
                  key={s}
                  onClick={() => setActiveSection(s)}
                  className={`text-left px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                    activeSection === s
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                  }`}
                >
                  {SECTION_LABELS[s] || s}
                </button>
              ))}
            </nav>
          </div>

          {/* ── Right: content editor ── */}
          <div>
            <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
              <h3 className="text-foreground font-semibold text-base">
                {SECTION_LABELS[activeSection] || activeSection}
              </h3>
              <Tabs value={activeLang} onValueChange={setActiveLang}>
                <TabsList>
                  {LANGS.map(l => (
                    <TabsTrigger key={l.id} value={l.id}>{l.label}</TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>
            </div>

            <div className="space-y-4">
              {filteredRows.map(row => {
                const currentLang = LANGS.find(l => l.id === activeLang)!;
                return (
                  <div key={row.id} className="bg-card rounded-xl border border-border p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        {row.content_type === 'image' && <ImageIcon className="h-4 w-4 text-primary" />}
                        <span className="text-sm font-mono text-muted-foreground">{row.content_key}</span>
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-muted text-muted-foreground">
                          {row.content_type}
                        </span>
                      </div>
                      <Button variant="ghost" size="sm" onClick={() => handleDelete(row.id)}>
                        <Trash2 className="h-3.5 w-3.5 text-destructive" />
                      </Button>
                    </div>

                    {row.content_type === 'image' ? (
                      <div className="space-y-2">
                        <Label className="text-[11px] text-muted-foreground">圖片 URL (所有語言共用)</Label>
                        <MediaInput value={row.value_tw} onChange={v => { updateField(row.id, 'value_tw', v); updateField(row.id, 'value_cn', v); updateField(row.id, 'value_en', v); updateField(row.id, 'value_ja', v); }} />
                      </div>
                    ) : (
                      <div>
                        <Label className="text-[11px] text-muted-foreground">{currentLang.label}</Label>
                        <Input
                          value={(row as any)[currentLang.field] || ''}
                          onChange={e => updateField(row.id, currentLang.field, e.target.value)}
                          className="text-sm"
                        />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {filteredRows.length > 0 && (
              <Button onClick={handleSave} disabled={saving} className="w-full mt-4">
                <Save className="h-4 w-4 mr-1" />
                {saving ? '儲存中...' : '儲存此區段'}
              </Button>
            )}

            {filteredRows.length === 0 && (
              <p className="text-muted-foreground text-center py-10">此區段尚無內容</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
