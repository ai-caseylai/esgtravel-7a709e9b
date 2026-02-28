
-- Create a public storage bucket for media uploads
INSERT INTO storage.buckets (id, name, public) VALUES ('media', 'media', true);

-- Anyone can view media files
CREATE POLICY "Anyone can view media" ON storage.objects FOR SELECT USING (bucket_id = 'media');

-- Admins and editors can upload media
CREATE POLICY "Admins and editors can upload media" ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'media' AND (
  public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'editor')
));

-- Admins and editors can update media
CREATE POLICY "Admins and editors can update media" ON storage.objects FOR UPDATE
USING (bucket_id = 'media' AND (
  public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'editor')
));

-- Admins and editors can delete media
CREATE POLICY "Admins and editors can delete media" ON storage.objects FOR DELETE
USING (bucket_id = 'media' AND (
  public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'editor')
));
