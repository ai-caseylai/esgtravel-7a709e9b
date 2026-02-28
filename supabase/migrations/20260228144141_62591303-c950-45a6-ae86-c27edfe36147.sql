
-- Fix posts RLS: drop restrictive SELECT policy and recreate as permissive
DROP POLICY IF EXISTS "Anyone can read published posts" ON public.posts;
DROP POLICY IF EXISTS "Editors and admins can manage posts" ON public.posts;

-- Permissive: admins/editors can do everything
CREATE POLICY "Editors and admins can manage posts"
  ON public.posts FOR ALL
  USING (has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'editor'::app_role))
  WITH CHECK (has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'editor'::app_role));

-- Permissive: anyone can read published posts
CREATE POLICY "Anyone can read published posts"
  ON public.posts FOR SELECT
  USING (is_published = true);

-- Fix post_translations RLS too
DROP POLICY IF EXISTS "Anyone can read post translations" ON public.post_translations;
DROP POLICY IF EXISTS "Editors and admins can manage post translations" ON public.post_translations;

CREATE POLICY "Editors and admins can manage post translations"
  ON public.post_translations FOR ALL
  USING (has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'editor'::app_role))
  WITH CHECK (has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'editor'::app_role));

CREATE POLICY "Anyone can read post translations"
  ON public.post_translations FOR SELECT
  USING (true);
