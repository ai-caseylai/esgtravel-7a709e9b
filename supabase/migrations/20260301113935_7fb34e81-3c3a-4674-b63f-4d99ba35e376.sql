
ALTER TABLE public.site_content
  ADD COLUMN IF NOT EXISTS site_brand varchar NOT NULL DEFAULT '',
  ADD COLUMN IF NOT EXISTS site_copyright varchar NOT NULL DEFAULT '',
  ADD COLUMN IF NOT EXISTS site_appstore_label varchar NOT NULL DEFAULT '',
  ADD COLUMN IF NOT EXISTS site_appstore_url text NOT NULL DEFAULT '',
  ADD COLUMN IF NOT EXISTS site_googleplay_label varchar NOT NULL DEFAULT '',
  ADD COLUMN IF NOT EXISTS site_googleplay_url text NOT NULL DEFAULT '',
  ADD COLUMN IF NOT EXISTS site_loading varchar NOT NULL DEFAULT '';
