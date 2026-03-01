import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { ImageIcon } from 'lucide-react';

const SUPABASE_URL = "https://jbfybrxpdippdsettdgv.supabase.co";

interface MediaPickerButtonProps {
  onSelect: (url: string) => void;
  label?: string;
}

export function MediaPickerButton({ onSelect, label = '媒體庫' }: MediaPickerButtonProps) {
  const [mediaList, setMediaList] = useState<{ name: string; url: string }[]>([]);
  const [open, setOpen] = useState(false);

  const load = async () => {
    const { data } = await supabase.storage.from('media').list('', { limit: 200, sortBy: { column: 'created_at', order: 'desc' } });
    const items = (data ?? [])
      .filter(f => /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(f.name))
      .map(f => ({
        name: f.name,
        url: `${SUPABASE_URL}/storage/v1/object/public/media/${f.name}`,
      }));
    setMediaList(items);
    setOpen(true);
  };

  if (!open) {
    return (
      <Button type="button" variant="outline" size="sm" onClick={load}>
        <ImageIcon className="h-4 w-4 mr-1" /> {label}
      </Button>
    );
  }

  return (
    <div className="border rounded-lg p-2 bg-background">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs text-muted-foreground font-medium">選擇圖片</span>
        <Button variant="ghost" size="sm" className="h-6 text-xs" onClick={() => setOpen(false)}>關閉</Button>
      </div>
      <div className="grid grid-cols-4 gap-2 max-h-48 overflow-y-auto">
        {mediaList.length === 0 ? (
          <p className="col-span-4 text-xs text-muted-foreground text-center py-4">媒體庫無圖片</p>
        ) : mediaList.map(item => (
          <img
            key={item.name}
            src={item.url}
            alt={item.name}
            title={item.name}
            className="w-full aspect-square object-cover rounded cursor-pointer hover:ring-2 ring-primary"
            onClick={() => { onSelect(item.url); setOpen(false); }}
          />
        ))}
      </div>
    </div>
  );
}
