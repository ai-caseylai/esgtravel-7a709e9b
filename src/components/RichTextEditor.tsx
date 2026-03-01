import { useEditor, EditorContent } from '@tiptap/react';
import { BubbleMenu } from '@tiptap/react/menus';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import Placeholder from '@tiptap/extension-placeholder';
import TextAlign from '@tiptap/extension-text-align';
import Underline from '@tiptap/extension-underline';
import { useEffect, useCallback, useRef } from 'react';
import {
  Bold, Italic, Underline as UnderlineIcon, Strikethrough,
  List, ListOrdered, AlignLeft, AlignCenter, AlignRight,
  Link as LinkIcon, ImageIcon, Undo, Redo, Heading1, Heading2, Heading3, Quote, Minus
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { cn } from '@/lib/utils';

interface RichTextEditorProps {
  value: string;
  onChange: (html: string) => void;
  placeholder?: string;
  className?: string;
}

function ToolbarButton({ active, onClick, children, title }: { active?: boolean; onClick: () => void; children: React.ReactNode; title?: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={title}
      className={cn(
        'p-1.5 rounded hover:bg-accent transition-colors',
        active && 'bg-accent text-accent-foreground'
      )}
    >
      {children}
    </button>
  );
}

export function RichTextEditor({ value, onChange, placeholder = '輸入內容...', className }: RichTextEditorProps) {
  const isInternalChange = useRef(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [1, 2, 3] },
        // Disable built-in extensions that we configure separately
        link: false,
        underline: false,
      }),
      Image.configure({ inline: false, allowBase64: true }),
      Link.configure({ openOnClick: false, HTMLAttributes: { class: 'text-primary underline' } }),
      Placeholder.configure({ placeholder }),
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      Underline,
    ],
    content: value || '',
    onUpdate: ({ editor }) => {
      isInternalChange.current = true;
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: 'prose prose-sm max-w-none focus:outline-none min-h-[120px] px-3 py-2',
      },
    },
  });

  // Sync external value changes
  useEffect(() => {
    if (!editor || isInternalChange.current) {
      isInternalChange.current = false;
      return;
    }
    if (editor.getHTML() !== value) {
      editor.commands.setContent(value || '');
    }
  }, [value, editor]);

  const addLink = useCallback(() => {
    if (!editor) return;
    const url = prompt('輸入連結 URL:');
    if (url) {
      editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
    }
  }, [editor]);

  const addImage = useCallback(async (file?: File) => {
    if (!editor) return;
    if (file) {
      const ext = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
      const { error } = await supabase.storage.from('media').upload(fileName, file);
      if (error) { console.error(error); return; }
      const url = `https://jbfybrxpdippdsettdgv.supabase.co/storage/v1/object/public/media/${fileName}`;
      editor.chain().focus().setImage({ src: url }).run();
    } else {
      const url = prompt('輸入圖片 URL:');
      if (url) editor.chain().focus().setImage({ src: url }).run();
    }
  }, [editor]);

  const handleFileUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) addImage(file);
    if (inputRef.current) inputRef.current.value = '';
  }, [addImage]);

  if (!editor) return null;

  const iconSize = 'h-4 w-4';

  return (
    <div className={cn('border border-input rounded-md bg-background overflow-hidden', className)}>
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-0.5 px-2 py-1.5 border-b border-input bg-muted/30">
        <ToolbarButton onClick={() => editor.chain().focus().toggleBold().run()} active={editor.isActive('bold')} title="粗體">
          <Bold className={iconSize} />
        </ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().toggleItalic().run()} active={editor.isActive('italic')} title="斜體">
          <Italic className={iconSize} />
        </ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().toggleUnderline().run()} active={editor.isActive('underline')} title="底線">
          <UnderlineIcon className={iconSize} />
        </ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().toggleStrike().run()} active={editor.isActive('strike')} title="刪除線">
          <Strikethrough className={iconSize} />
        </ToolbarButton>

        <span className="w-px h-5 bg-border mx-1" />

        <ToolbarButton onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} active={editor.isActive('heading', { level: 1 })} title="H1">
          <Heading1 className={iconSize} />
        </ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} active={editor.isActive('heading', { level: 2 })} title="H2">
          <Heading2 className={iconSize} />
        </ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} active={editor.isActive('heading', { level: 3 })} title="H3">
          <Heading3 className={iconSize} />
        </ToolbarButton>

        <span className="w-px h-5 bg-border mx-1" />

        <ToolbarButton onClick={() => editor.chain().focus().setTextAlign('left').run()} active={editor.isActive({ textAlign: 'left' })} title="靠左">
          <AlignLeft className={iconSize} />
        </ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().setTextAlign('center').run()} active={editor.isActive({ textAlign: 'center' })} title="置中">
          <AlignCenter className={iconSize} />
        </ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().setTextAlign('right').run()} active={editor.isActive({ textAlign: 'right' })} title="靠右">
          <AlignRight className={iconSize} />
        </ToolbarButton>

        <span className="w-px h-5 bg-border mx-1" />

        <ToolbarButton onClick={() => editor.chain().focus().toggleBulletList().run()} active={editor.isActive('bulletList')} title="無序清單">
          <List className={iconSize} />
        </ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().toggleOrderedList().run()} active={editor.isActive('orderedList')} title="有序清單">
          <ListOrdered className={iconSize} />
        </ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().toggleBlockquote().run()} active={editor.isActive('blockquote')} title="引用">
          <Quote className={iconSize} />
        </ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().setHorizontalRule().run()} title="分隔線">
          <Minus className={iconSize} />
        </ToolbarButton>

        <span className="w-px h-5 bg-border mx-1" />

        <ToolbarButton onClick={addLink} active={editor.isActive('link')} title="插入連結">
          <LinkIcon className={iconSize} />
        </ToolbarButton>
        <ToolbarButton onClick={() => inputRef.current?.click()} title="插入圖片">
          <ImageIcon className={iconSize} />
        </ToolbarButton>
        <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={handleFileUpload} />

        <span className="w-px h-5 bg-border mx-1" />

        <ToolbarButton onClick={() => editor.chain().focus().undo().run()} title="復原">
          <Undo className={iconSize} />
        </ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().redo().run()} title="重做">
          <Redo className={iconSize} />
        </ToolbarButton>
      </div>

      {/* Bubble Menu for inline formatting */}
      {editor && (
        <BubbleMenu editor={editor} className="bg-popover border border-border rounded-lg shadow-lg flex items-center gap-0.5 p-1">
          <ToolbarButton onClick={() => editor.chain().focus().toggleBold().run()} active={editor.isActive('bold')}>
            <Bold className="h-3.5 w-3.5" />
          </ToolbarButton>
          <ToolbarButton onClick={() => editor.chain().focus().toggleItalic().run()} active={editor.isActive('italic')}>
            <Italic className="h-3.5 w-3.5" />
          </ToolbarButton>
          <ToolbarButton onClick={() => editor.chain().focus().toggleUnderline().run()} active={editor.isActive('underline')}>
            <UnderlineIcon className="h-3.5 w-3.5" />
          </ToolbarButton>
          <ToolbarButton onClick={addLink} active={editor.isActive('link')}>
            <LinkIcon className="h-3.5 w-3.5" />
          </ToolbarButton>
        </BubbleMenu>
      )}

      {/* Editor content */}
      <EditorContent editor={editor} />
    </div>
  );
}
