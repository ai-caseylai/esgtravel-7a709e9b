
-- SiteHome images
ALTER TABLE public.site_content ADD COLUMN IF NOT EXISTS site_hero_img text NOT NULL DEFAULT '';
ALTER TABLE public.site_content ADD COLUMN IF NOT EXISTS site_feature1_img text NOT NULL DEFAULT '';
ALTER TABLE public.site_content ADD COLUMN IF NOT EXISTS site_feature2_img text NOT NULL DEFAULT '';
ALTER TABLE public.site_content ADD COLUMN IF NOT EXISTS site_feature3_img text NOT NULL DEFAULT '';
ALTER TABLE public.site_content ADD COLUMN IF NOT EXISTS site_feature4_img text NOT NULL DEFAULT '';
ALTER TABLE public.site_content ADD COLUMN IF NOT EXISTS site_cta_img text NOT NULL DEFAULT '';

-- SiteHowItWorks
ALTER TABLE public.site_content ADD COLUMN IF NOT EXISTS site_how_title varchar NOT NULL DEFAULT '';
ALTER TABLE public.site_content ADD COLUMN IF NOT EXISTS site_how_desc text NOT NULL DEFAULT '';
ALTER TABLE public.site_content ADD COLUMN IF NOT EXISTS site_how_hero_img text NOT NULL DEFAULT '';
ALTER TABLE public.site_content ADD COLUMN IF NOT EXISTS site_step1_title varchar NOT NULL DEFAULT '';
ALTER TABLE public.site_content ADD COLUMN IF NOT EXISTS site_step1_desc text NOT NULL DEFAULT '';
ALTER TABLE public.site_content ADD COLUMN IF NOT EXISTS site_step1_img text NOT NULL DEFAULT '';
ALTER TABLE public.site_content ADD COLUMN IF NOT EXISTS site_step2_title varchar NOT NULL DEFAULT '';
ALTER TABLE public.site_content ADD COLUMN IF NOT EXISTS site_step2_desc text NOT NULL DEFAULT '';
ALTER TABLE public.site_content ADD COLUMN IF NOT EXISTS site_step2_img text NOT NULL DEFAULT '';
ALTER TABLE public.site_content ADD COLUMN IF NOT EXISTS site_step3_title varchar NOT NULL DEFAULT '';
ALTER TABLE public.site_content ADD COLUMN IF NOT EXISTS site_step3_desc text NOT NULL DEFAULT '';
ALTER TABLE public.site_content ADD COLUMN IF NOT EXISTS site_step3_img text NOT NULL DEFAULT '';
ALTER TABLE public.site_content ADD COLUMN IF NOT EXISTS site_step4_title varchar NOT NULL DEFAULT '';
ALTER TABLE public.site_content ADD COLUMN IF NOT EXISTS site_step4_desc text NOT NULL DEFAULT '';
ALTER TABLE public.site_content ADD COLUMN IF NOT EXISTS site_step4_img text NOT NULL DEFAULT '';

-- SiteEvents
ALTER TABLE public.site_content ADD COLUMN IF NOT EXISTS site_events_title varchar NOT NULL DEFAULT '';
ALTER TABLE public.site_content ADD COLUMN IF NOT EXISTS site_events_desc text NOT NULL DEFAULT '';
ALTER TABLE public.site_content ADD COLUMN IF NOT EXISTS site_events_hero_img text NOT NULL DEFAULT '';
ALTER TABLE public.site_content ADD COLUMN IF NOT EXISTS site_events_label varchar NOT NULL DEFAULT '';
ALTER TABLE public.site_content ADD COLUMN IF NOT EXISTS site_articles_label varchar NOT NULL DEFAULT '';
ALTER TABLE public.site_content ADD COLUMN IF NOT EXISTS site_no_events varchar NOT NULL DEFAULT '';
ALTER TABLE public.site_content ADD COLUMN IF NOT EXISTS site_no_articles varchar NOT NULL DEFAULT '';
ALTER TABLE public.site_content ADD COLUMN IF NOT EXISTS site_readmore varchar NOT NULL DEFAULT '';

-- SiteContact
ALTER TABLE public.site_content ADD COLUMN IF NOT EXISTS site_contact_title varchar NOT NULL DEFAULT '';
ALTER TABLE public.site_content ADD COLUMN IF NOT EXISTS site_contact_desc text NOT NULL DEFAULT '';
ALTER TABLE public.site_content ADD COLUMN IF NOT EXISTS site_contact_phone_label varchar NOT NULL DEFAULT '';
ALTER TABLE public.site_content ADD COLUMN IF NOT EXISTS site_contact_phone varchar NOT NULL DEFAULT '';
ALTER TABLE public.site_content ADD COLUMN IF NOT EXISTS site_contact_email_label varchar NOT NULL DEFAULT '';
ALTER TABLE public.site_content ADD COLUMN IF NOT EXISTS site_contact_email_val varchar NOT NULL DEFAULT '';
ALTER TABLE public.site_content ADD COLUMN IF NOT EXISTS site_contact_addr_label varchar NOT NULL DEFAULT '';
ALTER TABLE public.site_content ADD COLUMN IF NOT EXISTS site_contact_addr text NOT NULL DEFAULT '';

-- SiteLayout footer
ALTER TABLE public.site_content ADD COLUMN IF NOT EXISTS site_footer_desc text NOT NULL DEFAULT '';
ALTER TABLE public.site_content ADD COLUMN IF NOT EXISTS site_footer_links varchar NOT NULL DEFAULT '';
ALTER TABLE public.site_content ADD COLUMN IF NOT EXISTS site_footer_contact varchar NOT NULL DEFAULT '';
ALTER TABLE public.site_content ADD COLUMN IF NOT EXISTS site_nav_how varchar NOT NULL DEFAULT '';
