
-- Add category and event_date columns to posts
ALTER TABLE public.posts ADD COLUMN category text NOT NULL DEFAULT 'blog';
ALTER TABLE public.posts ADD COLUMN event_date date NULL;

-- Create index for category filtering
CREATE INDEX idx_posts_category ON public.posts (category);
