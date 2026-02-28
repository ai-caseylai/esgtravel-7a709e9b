import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface BadgeItem {
  id: number;
  code: string | null;
  price: number;
  is_active: boolean;
  image_url: string | null;
  created_at: string;
}

interface BadgeTranslation {
  id: number;
  badge_id: number;
  lang: number;
  title: string | null;
  home_header: string | null;
  summary: string | null;
}

interface SdgBadge {
  id: number;
  badge_id: number;
  sdg_id: number;
}

export default function AdminBadges() {
  const [badges, setBadges] = useState<BadgeItem[]>([]);
  const [translations, setTranslations] = useState<BadgeTranslation[]>([]);
  const [sdgs, setSdgs] = useState<SdgBadge[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      const [b, t, s] = await Promise.all([
        supabase.from('badges').select('*').order('id'),
        supabase.from('badge_translations').select('id, badge_id, lang, title, home_header, summary').order('badge_id'),
        supabase.from('sdg_badges').select('*').order('badge_id'),
      ]);
      setBadges(b.data ?? []);
      setTranslations(t.data ?? []);
      setSdgs(s.data ?? []);
      setLoading(false);
    };
    fetch();
  }, []);

  const langMap: Record<number, string> = { 0: '中文', 1: 'EN', 2: '日本語' };

  return (
    <div>
      <h2 className="text-2xl font-bold text-foreground mb-6">徽章管理</h2>
      <Tabs defaultValue="badges">
        <TabsList>
          <TabsTrigger value="badges">徽章列表</TabsTrigger>
          <TabsTrigger value="translations">多語言內容</TabsTrigger>
          <TabsTrigger value="sdgs">SDG 關聯</TabsTrigger>
        </TabsList>

        <TabsContent value="badges">
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>代碼</TableHead>
                    <TableHead>價格</TableHead>
                    <TableHead>狀態</TableHead>
                    <TableHead>建立時間</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {loading ? (
                    <TableRow><TableCell colSpan={5} className="text-center py-8 text-muted-foreground">載入中...</TableCell></TableRow>
                  ) : badges.map(b => (
                    <TableRow key={b.id}>
                      <TableCell>{b.id}</TableCell>
                      <TableCell className="font-mono">{b.code || '-'}</TableCell>
                      <TableCell>US${b.price}</TableCell>
                      <TableCell><Badge variant={b.is_active ? 'default' : 'secondary'}>{b.is_active ? '啟用' : '停用'}</Badge></TableCell>
                      <TableCell className="text-muted-foreground text-sm">{new Date(b.created_at).toLocaleDateString()}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="translations">
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>徽章ID</TableHead>
                    <TableHead>語言</TableHead>
                    <TableHead>標題</TableHead>
                    <TableHead>首頁標題</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {translations.map(t => (
                    <TableRow key={t.id}>
                      <TableCell>{t.badge_id}</TableCell>
                      <TableCell><Badge variant="outline">{langMap[t.lang] || t.lang}</Badge></TableCell>
                      <TableCell className="max-w-xs truncate">{t.title || '-'}</TableCell>
                      <TableCell>{t.home_header || '-'}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sdgs">
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>徽章ID</TableHead>
                    <TableHead>SDG 目標</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sdgs.map(s => (
                    <TableRow key={s.id}>
                      <TableCell>{s.badge_id}</TableCell>
                      <TableCell><Badge variant="outline">SDG {s.sdg_id}</Badge></TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
