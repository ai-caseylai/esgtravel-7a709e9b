
-- Create posts table
CREATE TABLE public.posts (
  id SERIAL PRIMARY KEY,
  slug TEXT NOT NULL UNIQUE,
  cover_image TEXT,
  is_published BOOLEAN NOT NULL DEFAULT false,
  author_id UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;

-- Create post_translations table (multi-language)
CREATE TABLE public.post_translations (
  id SERIAL PRIMARY KEY,
  post_id INTEGER NOT NULL REFERENCES public.posts(id) ON DELETE CASCADE,
  lang INTEGER NOT NULL DEFAULT 0,
  title TEXT NOT NULL DEFAULT '',
  summary TEXT NOT NULL DEFAULT '',
  content TEXT NOT NULL DEFAULT '',
  UNIQUE(post_id, lang)
);

ALTER TABLE public.post_translations ENABLE ROW LEVEL SECURITY;

-- RLS for posts: anyone can read published, editors/admins can manage
CREATE POLICY "Anyone can read published posts"
ON public.posts FOR SELECT
USING (is_published = true);

CREATE POLICY "Editors and admins can manage posts"
ON public.posts FOR ALL
TO authenticated
USING (has_role(auth.uid(), 'admin') OR has_role(auth.uid(), 'editor'))
WITH CHECK (has_role(auth.uid(), 'admin') OR has_role(auth.uid(), 'editor'));

-- RLS for post_translations: anyone can read, editors/admins can manage
CREATE POLICY "Anyone can read post translations"
ON public.post_translations FOR SELECT
USING (true);

CREATE POLICY "Editors and admins can manage post translations"
ON public.post_translations FOR ALL
TO authenticated
USING (has_role(auth.uid(), 'admin') OR has_role(auth.uid(), 'editor'))
WITH CHECK (has_role(auth.uid(), 'admin') OR has_role(auth.uid(), 'editor'));

-- Trigger for updated_at on posts
CREATE TRIGGER update_posts_updated_at
BEFORE UPDATE ON public.posts
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();
