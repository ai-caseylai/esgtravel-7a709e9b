import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import { Save, Search } from 'lucide-react';

const LANGS = [
  { id: 0, label: '繁中' },
  { id: 1, label: '简中' },
  { id: 2, label: 'EN' },
  { id: 3, label: 'JP' },
];

// Fields grouped by section for better UX
const FIELD_GROUPS: { title: string; fields: { key: string; label: string; multiline?: boolean }[] }[] = [
  {
    title: '首頁 / Home',
    fields: [
      { key: 'home', label: '首頁標籤' },
      { key: 'subheader', label: '副標題' },
      { key: 'description', label: '描述' },
      { key: 'getstarted', label: '開始使用按鈕' },
      { key: 'greeting', label: '問候語' },
    ],
  },
  {
    title: '徽章 / Badge',
    fields: [
      { key: 'badge', label: '徽章標籤' },
      { key: 'aboutheader', label: '關於標題' },
      { key: 'abouttitle', label: '關於副標題' },
      { key: 'showmore', label: '顯示更多' },
      { key: 'support', label: '支持按鈕' },
      { key: 'addextra', label: '額外支持' },
      { key: 'currency', label: '貨幣' },
      { key: 'sdg', label: 'SDG標籤' },
      { key: 'event', label: '活動標籤' },
      { key: 'summary', label: '摘要標籤' },
      { key: 'detail', label: '詳情標籤' },
    ],
  },
  {
    title: '護照 / Passport',
    fields: [
      { key: 'passport', label: '護照標籤' },
      { key: 'mypassport', label: '我的護照' },
      { key: 'impactheader', label: '影響標題' },
      { key: 'impacttitle', label: '影響副標題' },
      { key: 'impactrecord', label: '影響記錄' },
      { key: 'impact', label: '影響標籤' },
      { key: 'collected', label: '已收集文字' },
      { key: 'reaction', label: '反應文字' },
    ],
  },
  {
    title: '排行榜 / Board',
    fields: [
      { key: 'boardheader', label: '排行榜標題' },
      { key: 'boardtitle', label: '排行榜副標題' },
      { key: 'travelambassador', label: '旅遊大使' },
      { key: 'giveus', label: '購買文字' },
    ],
  },
  {
    title: '登入 / Auth',
    fields: [
      { key: 'loginemail', label: '郵箱登入' },
      { key: 'loginmobile', label: '手機登入' },
      { key: 'otpheader', label: 'OTP標題' },
      { key: 'otpdescemail', label: 'OTP郵箱描述', multiline: true },
      { key: 'otpdescsms', label: 'OTP短信描述', multiline: true },
      { key: 'verifyotp', label: '驗證OTP' },
      { key: 'resendotp', label: '重發OTP' },
      { key: 'tryother', label: '嘗試其他方式' },
      { key: 'otpinvalid', label: 'OTP無效' },
      { key: 'otpexpired', label: 'OTP過期' },
    ],
  },
  {
    title: '表單 / Form',
    fields: [
      { key: 'formheader', label: '表單標題' },
      { key: 'formdesc', label: '表單描述', multiline: true },
      { key: 'formname', label: '姓名標籤' },
      { key: 'formemail', label: '郵箱標籤' },
      { key: 'formconfirmemail', label: '確認郵箱' },
      { key: 'formmobile', label: '手機標籤' },
      { key: 'formterm', label: '條款標籤' },
      { key: 'formtnc', label: '條款內容', multiline: true },
      { key: 'formmarketing', label: '市場推廣', multiline: true },
      { key: 'submit', label: '提交按鈕' },
    ],
  },
  {
    title: '錯誤訊息 / Errors',
    fields: [
      { key: 'nameerror', label: '姓名錯誤' },
      { key: 'emailerror', label: '郵箱錯誤' },
      { key: 'mobileerror', label: '手機錯誤' },
      { key: 'termerror', label: '條款錯誤' },
      { key: 'duplicateerror', label: '重複錯誤' },
      { key: 'invildemail', label: '郵箱無效' },
    ],
  },
  {
    title: '付款 / Payment',
    fields: [
      { key: 'successtitle', label: '成功標題' },
      { key: 'sucessdesc', label: '成功描述' },
      { key: 'failedtitle', label: '失敗標題' },
      { key: 'faileddesc', label: '失敗描述' },
    ],
  },
  {
    title: '聯絡 / Contact',
    fields: [
      { key: 'contactus', label: '聯絡我們' },
      { key: 'contact', label: '聯絡方式' },
      { key: 'email', label: '電郵' },
      { key: 'website', label: '官網' },
      { key: 'needhelp', label: '需要幫助' },
    ],
  },
];

type ContentRow = Record<string, string>;

export default function AdminSiteContent() {
  const [data, setData] = useState<Record<number, ContentRow>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchAll = async () => {
      setLoading(true);
      const { data: rows } = await supabase.from('site_content').select('*');
      const map: Record<number, ContentRow> = {};
      (rows ?? []).forEach((r: any) => { map[r.lang] = r; });
      setData(map);
      setLoading(false);
    };
    fetchAll();
  }, []);

  const updateField = (lang: number, key: string, value: string) => {
    setData(prev => ({
      ...prev,
      [lang]: { ...prev[lang], [key]: value },
    }));
  };

  const handleSave = async (lang: number) => {
    setSaving(true);
    try {
      const row = data[lang];
      if (!row) return;
      const { id: rowId, lang: _lang, ...updateData } = row;
      const { error } = await supabase
        .from('site_content')
        .update(updateData as any)
        .eq('id', Number(rowId));
      if (error) throw error;
      toast.success(`已儲存 ${LANGS.find(l => l.id === lang)?.label} 內容`);
    } catch (e: any) {
      toast.error(e.message || '儲存失敗');
    } finally {
      setSaving(false);
    }
  };

  const filteredGroups = FIELD_GROUPS.map(group => ({
    ...group,
    fields: group.fields.filter(f =>
      !search || f.label.toLowerCase().includes(search.toLowerCase()) || f.key.toLowerCase().includes(search.toLowerCase())
    ),
  })).filter(g => g.fields.length > 0);

  return (
    <div>
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <h2 className="text-2xl font-bold text-foreground">網站內容管理</h2>
      </div>

      {loading ? (
        <p className="text-muted-foreground">載入中...</p>
      ) : (
        <>
          {/* Search */}
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input value={search} onChange={e => setSearch(e.target.value)} placeholder="搜尋欄位..." className="pl-9" />
          </div>

          <Tabs defaultValue="0">
            <TabsList className="mb-4">
              {LANGS.map(l => (
                <TabsTrigger key={l.id} value={String(l.id)}>{l.label}</TabsTrigger>
              ))}
            </TabsList>

            {LANGS.map(l => (
              <TabsContent key={l.id} value={String(l.id)}>
                {data[l.id] ? (
                  <div className="space-y-6">
                    {filteredGroups.map(group => (
                      <div key={group.title} className="bg-card rounded-xl border border-border p-5">
                        <h3 className="text-foreground font-semibold text-sm mb-4 border-b border-border pb-2">
                          {group.title}
                        </h3>
                        <div className="space-y-3">
                          {group.fields.map(field => (
                            <div key={field.key}>
                              <Label className="text-[12px] text-muted-foreground">
                                {field.label} <span className="text-[10px] opacity-50">({field.key})</span>
                              </Label>
                              {field.multiline ? (
                                <Textarea
                                  value={data[l.id]?.[field.key] ?? ''}
                                  onChange={e => updateField(l.id, field.key, e.target.value)}
                                  rows={3}
                                  className="text-sm"
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
                      </div>
                    ))}

                    <Button onClick={() => handleSave(l.id)} disabled={saving} className="w-full">
                      <Save className="h-4 w-4 mr-1" />
                      {saving ? '儲存中...' : `儲存 ${l.label}`}
                    </Button>
                  </div>
                ) : (
                  <p className="text-muted-foreground">此語言尚無內容記錄。</p>
                )}
              </TabsContent>
            ))}
          </Tabs>
        </>
      )}
    </div>
  );
}
