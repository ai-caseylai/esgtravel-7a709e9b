
-- Allow authenticated users to list files in the media bucket
CREATE POLICY "Allow authenticated users to list media files"
ON storage.objects FOR SELECT
USING (bucket_id = 'media');

-- Allow authenticated users to upload files to the media bucket
CREATE POLICY "Allow authenticated users to upload media files"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'media' AND auth.role() = 'authenticated');

-- Allow authenticated users to delete files from the media bucket
CREATE POLICY "Allow authenticated users to delete media files"
ON storage.objects FOR DELETE
USING (bucket_id = 'media' AND auth.role() = 'authenticated');
