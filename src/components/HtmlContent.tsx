import '@/components/RichTextEditor.css';
import { cn } from '@/lib/utils';

interface HtmlContentProps {
  html: string;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
}

/**
 * Renders HTML string content from the CMS (tc() values).
 * Applies prose-like styling for headings, lists, links, etc.
 * Falls back to plain text display if content has no HTML tags.
 */
export function HtmlContent({ html, className, as: Tag = 'div' }: HtmlContentProps) {
  if (!html) return null;

  // If content contains HTML tags, render as HTML
  if (/<[a-z][\s\S]*>/i.test(html)) {
    return (
      <Tag
        className={cn('rich-content', className)}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    );
  }

  // Plain text fallback
  return <Tag className={className}>{html}</Tag>;
}
