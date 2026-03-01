
-- Pages table
CREATE TABLE public.pages (
  id serial PRIMARY KEY,
  slug text NOT NULL UNIQUE,
  title text NOT NULL DEFAULT '',
  is_published boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.pages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read published pages" ON public.pages FOR SELECT USING (is_published = true);
CREATE POLICY "Admins can manage pages" ON public.pages FOR ALL USING (has_role(auth.uid(), 'admin'::app_role)) WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE TRIGGER update_pages_updated_at BEFORE UPDATE ON public.pages FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Page blocks table
CREATE TABLE public.page_blocks (
  id serial PRIMARY KEY,
  page_id integer NOT NULL REFERENCES public.pages(id) ON DELETE CASCADE,
  block_type text NOT NULL DEFAULT 'text',
  content jsonb NOT NULL DEFAULT '{}',
  sort_order integer NOT NULL DEFAULT 0
);

ALTER TABLE public.page_blocks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read blocks of published pages" ON public.page_blocks FOR SELECT USING (EXISTS (SELECT 1 FROM public.pages WHERE pages.id = page_blocks.page_id AND pages.is_published = true));
CREATE POLICY "Admins can manage page blocks" ON public.page_blocks FOR ALL USING (has_role(auth.uid(), 'admin'::app_role)) WITH CHECK (has_role(auth.uid(), 'admin'::app_role));
