INSERT INTO public.badge_translations (badge_id, lang, title, home_header, summary, content, details, impact, show_more)
SELECT badge_id, 3, title, home_header, summary, content, details, impact, show_more
FROM public.badge_translations
WHERE lang = 0
ON CONFLICT DO NOTHING;