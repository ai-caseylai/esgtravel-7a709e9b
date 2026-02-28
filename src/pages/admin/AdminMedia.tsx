import { useEffect, useState, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Upload, Trash2, Copy, Image, Search } from 'lucide-react';
import { toast } from 'sonner';

const SUPABASE_URL = 'https://jbfybrxpdippdsettdgv.supabase.co';

interface MediaFile {
  id: string;
  name: string;
  created_at: string;
  metadata: { size?: number; mimetype?: string } | null;
}

export default function AdminMedia() {
  const [files, setFiles] = useState<MediaFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [search, setSearch] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const fetchFiles = async () => {
    setLoading(true);
    const { data, error } = await supabase.storage.from('media').list('', {
      limit: 500,
      sortBy: { column: 'created_at', order: 'desc' },
    });
    if (error) { toast.error(error.message); }
    setFiles((data as MediaFile[]) ?? []);
    setLoading(false);
  };

  useEffect(() => { fetchFiles(); }, []);

  const getPublicUrl = (name: string) =>
    `${SUPABASE_URL}/storage/v1/object/public/media/${name}`;

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;
    if (!fileList || fileList.length === 0) return;
    setUploading(true);
    try {
      for (const file of Array.from(fileList)) {
        const ext = file.name.split('.').pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
        const { error } = await supabase.storage.from('media').upload(fileName, file);
        if (error) throw error;
      }
      toast.success(`已上傳 ${fileList.length} 個檔案`);
      fetchFiles();
    } catch (err: any) {
      toast.error(err.message || '上傳失敗');
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = '';
    }
  };

  const handleDelete = async (name: string) => {
    if (!confirm(`確定刪除 ${name}？`)) return;
    const { error } = await supabase.storage.from('media').remove([name]);
    if (error) { toast.error(error.message); return; }
    toast.success('已刪除');
    fetchFiles();
  };

  const handleCopy = (name: string) => {
    navigator.clipboard.writeText(getPublicUrl(name));
    toast.success('已複製圖片網址');
  };

  const isImage = (name: string) =>
    /\.(jpg|jpeg|png|gif|webp|svg|ico)$/i.test(name);

  const filtered = files.filter(f =>
    f.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <h2 className="text-2xl font-bold text-foreground">媒體庫</h2>
        <div className="flex gap-2">
          <input
            ref={inputRef}
            type="file"
            multiple
            accept="image/*"
            className="hidden"
            onChange={handleUpload}
          />
          <Button onClick={() => inputRef.current?.click()} disabled={uploading}>
            <Upload className="h-4 w-4 mr-1" />
            {uploading ? '上傳中...' : '上傳圖片'}
          </Button>
        </div>
      </div>

      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="搜尋檔案名稱..."
          className="pl-9"
        />
      </div>

      {loading ? (
        <p className="text-muted-foreground">載入中...</p>
      ) : filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-muted-foreground">
          <Image className="h-12 w-12 mb-3 opacity-40" />
          <p>{search ? '沒有符合的檔案' : '尚無媒體檔案'}</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {filtered.map(file => (
            <Card key={file.id} className="group overflow-hidden">
              <div className="aspect-square bg-muted relative flex items-center justify-center">
                {isImage(file.name) ? (
                  <img
                    src={getPublicUrl(file.name)}
                    alt={file.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                ) : (
                  <Image className="h-10 w-10 text-muted-foreground" />
                )}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <Button size="icon" variant="secondary" className="h-8 w-8" onClick={() => handleCopy(file.name)}>
                    <Copy className="h-3.5 w-3.5" />
                  </Button>
                  <Button size="icon" variant="destructive" className="h-8 w-8" onClick={() => handleDelete(file.name)}>
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>
              <CardContent className="p-2">
                <p className="text-xs text-muted-foreground truncate" title={file.name}>{file.name}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <p className="text-xs text-muted-foreground mt-4">
        共 {filtered.length} 個檔案 {search && `(篩選自 ${files.length} 個)`}
      </p>
    </div>
  );
}
