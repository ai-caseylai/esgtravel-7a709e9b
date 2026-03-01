
-- Insert two new badges
INSERT INTO public.badges (code, price, is_active) VALUES
  ('carbon-reduction', 8, true),
  ('wetland-conservation', 8, true);

-- Insert translations for carbon-reduction badge
INSERT INTO public.badge_translations (badge_id, lang, title, home_header, summary)
SELECT id, 0, '減碳排放', '減碳排放徽章', '支持減碳排放計畫，為地球降溫盡一份力。'
FROM public.badges WHERE code = 'carbon-reduction';

INSERT INTO public.badge_translations (badge_id, lang, title, home_header, summary)
SELECT id, 3, '减碳排放', '减碳排放徽章', '支持减碳排放计划，为地球降温尽一份力。'
FROM public.badges WHERE code = 'carbon-reduction';

INSERT INTO public.badge_translations (badge_id, lang, title, home_header, summary)
SELECT id, 1, 'Carbon Reduction', 'Carbon Reduction Badge', 'Support carbon reduction initiatives to help cool our planet.'
FROM public.badges WHERE code = 'carbon-reduction';

INSERT INTO public.badge_translations (badge_id, lang, title, home_header, summary)
SELECT id, 2, '炭素排出削減', '炭素排出削減バッジ', '炭素排出削減プロジェクトを支援し、地球の温暖化防止に貢献しましょう。'
FROM public.badges WHERE code = 'carbon-reduction';

-- Insert translations for wetland-conservation badge
INSERT INTO public.badge_translations (badge_id, lang, title, home_header, summary)
SELECT id, 0, '濕地保育', '濕地保育徽章', '守護珍貴濕地生態，保護生物多樣性。'
FROM public.badges WHERE code = 'wetland-conservation';

INSERT INTO public.badge_translations (badge_id, lang, title, home_header, summary)
SELECT id, 3, '湿地保育', '湿地保育徽章', '守护珍贵湿地生态，保护生物多样性。'
FROM public.badges WHERE code = 'wetland-conservation';

INSERT INTO public.badge_translations (badge_id, lang, title, home_header, summary)
SELECT id, 1, 'Wetland Conservation', 'Wetland Conservation Badge', 'Protect precious wetland ecosystems and preserve biodiversity.'
FROM public.badges WHERE code = 'wetland-conservation';

INSERT INTO public.badge_translations (badge_id, lang, title, home_header, summary)
SELECT id, 2, '湿地保全', '湿地保全バッジ', '貴重な湿地の生態系を守り、生物多様性を保護しましょう。'
FROM public.badges WHERE code = 'wetland-conservation';
