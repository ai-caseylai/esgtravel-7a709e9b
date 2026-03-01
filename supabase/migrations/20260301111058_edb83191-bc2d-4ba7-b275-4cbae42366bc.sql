
-- Add columns for SiteHome CMS content
ALTER TABLE public.site_content
  ADD COLUMN IF NOT EXISTS site_hero_title character varying NOT NULL DEFAULT '',
  ADD COLUMN IF NOT EXISTS site_hero_desc text NOT NULL DEFAULT '',
  ADD COLUMN IF NOT EXISTS site_programme_title character varying NOT NULL DEFAULT '',
  ADD COLUMN IF NOT EXISTS site_programme_desc text NOT NULL DEFAULT '',
  ADD COLUMN IF NOT EXISTS site_feature1_title character varying NOT NULL DEFAULT '',
  ADD COLUMN IF NOT EXISTS site_feature1_desc text NOT NULL DEFAULT '',
  ADD COLUMN IF NOT EXISTS site_feature2_title character varying NOT NULL DEFAULT '',
  ADD COLUMN IF NOT EXISTS site_feature2_desc text NOT NULL DEFAULT '',
  ADD COLUMN IF NOT EXISTS site_feature3_title character varying NOT NULL DEFAULT '',
  ADD COLUMN IF NOT EXISTS site_feature3_desc text NOT NULL DEFAULT '',
  ADD COLUMN IF NOT EXISTS site_feature4_title character varying NOT NULL DEFAULT '',
  ADD COLUMN IF NOT EXISTS site_feature4_desc text NOT NULL DEFAULT '',
  ADD COLUMN IF NOT EXISTS site_sdg_title character varying NOT NULL DEFAULT '',
  ADD COLUMN IF NOT EXISTS site_sdg_desc character varying NOT NULL DEFAULT '',
  ADD COLUMN IF NOT EXISTS site_cta_title character varying NOT NULL DEFAULT '',
  ADD COLUMN IF NOT EXISTS site_cta_desc text NOT NULL DEFAULT '',
  ADD COLUMN IF NOT EXISTS site_learnmore character varying NOT NULL DEFAULT '';

-- Seed default values for lang=0 (繁中)
UPDATE public.site_content SET
  site_hero_title = '用旅遊改變世界',
  site_hero_desc = 'STAR SDG 計劃透過數碼徽章，將旅遊與聯合國永續發展目標結合，讓每一次旅行都成為對地球的貢獻。',
  site_programme_title = '計劃介紹',
  site_programme_desc = 'STAR SDG 是一個結合旅遊與可持續發展的創新計劃，透過購買數碼徽章，旅客可以直接支持當地的環保及社區發展項目。',
  site_feature1_title = '可持續旅遊',
  site_feature1_desc = '通過數碼徽章推動負責任的旅遊方式，保護我們的地球。',
  site_feature2_title = '數碼徽章',
  site_feature2_desc = '收集各地的可持續旅遊徽章，記錄你的影響力。',
  site_feature3_title = '社會影響',
  site_feature3_desc = '70% 的費用投放於當地可持續發展項目。',
  site_feature4_title = '全球社群',
  site_feature4_desc = '加入全球可持續旅遊大使社群。',
  site_sdg_title = '聯合國 17 項永續發展目標',
  site_sdg_desc = '我們的計劃涵蓋以下聯合國永續發展目標',
  site_cta_title = '準備好成為可持續旅遊大使了嗎？',
  site_cta_desc = '加入我們，一起為地球的可持續未來出一分力。',
  site_learnmore = '了解更多'
WHERE lang = 0;

-- Seed for lang=1 (EN)
UPDATE public.site_content SET
  site_hero_title = 'Change the World Through Travel',
  site_hero_desc = 'The STAR SDG programme connects tourism with UN Sustainable Development Goals through digital badges, making every trip a contribution to the planet.',
  site_programme_title = 'About the Programme',
  site_programme_desc = 'STAR SDG is an innovative programme combining tourism and sustainability. By purchasing digital badges, travellers directly support local environmental and community projects.',
  site_feature1_title = 'Sustainable Tourism',
  site_feature1_desc = 'Promote responsible tourism through digital badges to protect our planet.',
  site_feature2_title = 'Digital Badges',
  site_feature2_desc = 'Collect sustainable tourism badges from around the world.',
  site_feature3_title = 'Social Impact',
  site_feature3_desc = '70% of proceeds go to local sustainable development projects.',
  site_feature4_title = 'Global Community',
  site_feature4_desc = 'Join a global community of sustainable travel ambassadors.',
  site_sdg_title = 'UN 17 Sustainable Development Goals',
  site_sdg_desc = 'Our programme covers the following UN SDGs',
  site_cta_title = 'Ready to become a Sustainable Travel Ambassador?',
  site_cta_desc = 'Join us and contribute to a sustainable future for our planet.',
  site_learnmore = 'Learn More'
WHERE lang = 1;

-- Seed for lang=2 (JP)
UPDATE public.site_content SET
  site_hero_title = '旅行で世界を変えよう',
  site_hero_desc = 'STAR SDGプログラムはデジタルバッジを通じて観光と国連の持続可能な開発目標を結びつけ、すべての旅を地球への貢献にします。',
  site_programme_title = 'プログラム紹介',
  site_programme_desc = 'STAR SDGは観光と持続可能性を組み合わせた革新的なプログラムです。デジタルバッジを購入することで、旅行者は地域の環境およびコミュニティプロジェクトを直接支援します。',
  site_feature1_title = '持続可能な観光',
  site_feature1_desc = 'デジタルバッジを通じて責任ある観光を推進し、地球を守ります。',
  site_feature2_title = 'デジタルバッジ',
  site_feature2_desc = '世界中の持続可能な観光バッジを集めましょう。',
  site_feature3_title = '社会的影響',
  site_feature3_desc = '収益の70%は地域の持続可能な開発プロジェクトに使われます。',
  site_feature4_title = 'グローバルコミュニティ',
  site_feature4_desc = '持続可能な旅行大使のグローバルコミュニティに参加しましょう。',
  site_sdg_title = '国連17の持続可能な開発目標',
  site_sdg_desc = '私たちのプログラムは以下の国連SDGsをカバーしています',
  site_cta_title = '持続可能な観光大使になる準備はできましたか？',
  site_cta_desc = '私たちと一緒に、地球の持続可能な未来に貢献しましょう。',
  site_learnmore = '詳しく見る'
WHERE lang = 2;

-- Seed for lang=3 (简中)
UPDATE public.site_content SET
  site_hero_title = '用旅游改变世界',
  site_hero_desc = 'STAR SDG 计划通过数码徽章，将旅游与联合国可持续发展目标结合，让每一次旅行都成为对地球的贡献。',
  site_programme_title = '计划介绍',
  site_programme_desc = 'STAR SDG 是一个结合旅游与可持续发展的创新计划，通过购买数码徽章，旅客可以直接支持当地的环保及社区发展项目。',
  site_feature1_title = '可持续旅游',
  site_feature1_desc = '通过数码徽章推动负责任的旅游方式，保护我们的地球。',
  site_feature2_title = '数码徽章',
  site_feature2_desc = '收集各地的可持续旅游徽章，记录你的影响力。',
  site_feature3_title = '社会影响',
  site_feature3_desc = '70% 的费用投放于当地可持续发展项目。',
  site_feature4_title = '全球社群',
  site_feature4_desc = '加入全球可持续旅游大使社群。',
  site_sdg_title = '联合国 17 项可持续发展目标',
  site_sdg_desc = '我们的计划涵盖以下联合国可持续发展目标',
  site_cta_title = '准备好成为可持续旅游大使了吗？',
  site_cta_desc = '加入我们，一起为地球的可持续未来出一分力。',
  site_learnmore = '了解更多'
WHERE lang = 3;
