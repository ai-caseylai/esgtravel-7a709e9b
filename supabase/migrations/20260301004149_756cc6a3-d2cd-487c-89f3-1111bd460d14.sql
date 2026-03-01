
-- Drop and recreate with proper TO clause
DROP POLICY IF EXISTS "Allow authenticated users to list media files" ON storage.objects;
DROP POLICY IF EXISTS "Allow authenticated users to upload media files" ON storage.objects;
DROP POLICY IF EXISTS "Allow authenticated users to delete media files" ON storage.objects;

-- SELECT: allow anyone (public bucket)
CREATE POLICY "Media files are publicly accessible"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'media');

-- INSERT: authenticated only
CREATE POLICY "Authenticated users can upload to media"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'media');

-- UPDATE: authenticated only
CREATE POLICY "Authenticated users can update media"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'media');

-- DELETE: authenticated only
CREATE POLICY "Authenticated users can delete media"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'media');
