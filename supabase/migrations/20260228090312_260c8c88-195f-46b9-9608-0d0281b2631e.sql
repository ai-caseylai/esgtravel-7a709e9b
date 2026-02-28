
-- =============================================
-- ESG Travel App - Complete Database Schema
-- =============================================

-- 1. Create role enum
CREATE TYPE public.app_role AS ENUM ('user', 'agent', 'company_admin', 'admin');

-- 2. Country codes reference table
CREATE TABLE public.country_codes (
  id SERIAL PRIMARY KEY,
  dial_code VARCHAR(10) NOT NULL,
  country_name VARCHAR(100) NOT NULL,
  is_active BOOLEAN NOT NULL DEFAULT false
);

-- 3. Profiles table
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  contact_name VARCHAR(100),
  country_code VARCHAR(10) DEFAULT '852',
  mobile VARCHAR(20),
  avatar_url TEXT,
  lang INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 4. User roles table (separate from profiles for security)
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role app_role NOT NULL DEFAULT 'user',
  UNIQUE(user_id, role)
);

-- 5. Badges table (destinations/products)
CREATE TABLE public.badges (
  id SERIAL PRIMARY KEY,
  code VARCHAR(50),
  price INT NOT NULL DEFAULT 8,
  image_url TEXT,
  map_url TEXT,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 6. Badge translations (multilingual: 0=zh, 1=en, 2=ja)
CREATE TABLE public.badge_translations (
  id SERIAL PRIMARY KEY,
  badge_id INT NOT NULL REFERENCES public.badges(id) ON DELETE CASCADE,
  lang INT NOT NULL DEFAULT 0,
  home_header VARCHAR(100),
  title VARCHAR(200),
  show_more TEXT,
  content TEXT,
  details TEXT,
  summary TEXT,
  impact TEXT,
  UNIQUE(badge_id, lang)
);

-- 7. Orders table
CREATE TABLE public.orders (
  id SERIAL PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  badge_id INT NOT NULL REFERENCES public.badges(id),
  price INT NOT NULL DEFAULT 8,
  extra_help INT NOT NULL DEFAULT 0,
  payment_status VARCHAR(20) NOT NULL DEFAULT 'pending',
  payment_method VARCHAR(50),
  stripe_payment_id VARCHAR(255),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- =============================================
-- RLS Policies
-- =============================================

-- Enable RLS on all tables
ALTER TABLE public.country_codes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.badges ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.badge_translations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

-- Security definer function for role checking
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

-- Country codes: everyone can read
CREATE POLICY "Anyone can read country codes"
  ON public.country_codes FOR SELECT USING (true);

-- Profiles: users read/update own, admins read all
CREATE POLICY "Users can read own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id OR public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Users can insert own profile"
  ON public.profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

-- User roles: only admins can manage, users can read own
CREATE POLICY "Users can read own roles"
  ON public.user_roles FOR SELECT
  USING (auth.uid() = user_id OR public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Only admins can insert roles"
  ON public.user_roles FOR INSERT
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Only admins can update roles"
  ON public.user_roles FOR UPDATE
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Only admins can delete roles"
  ON public.user_roles FOR DELETE
  USING (public.has_role(auth.uid(), 'admin'));

-- Badges: everyone can read, admins can manage
CREATE POLICY "Anyone can read badges"
  ON public.badges FOR SELECT USING (true);

CREATE POLICY "Admins can manage badges"
  ON public.badges FOR ALL
  USING (public.has_role(auth.uid(), 'admin'));

-- Badge translations: everyone can read, admins can manage
CREATE POLICY "Anyone can read badge translations"
  ON public.badge_translations FOR SELECT USING (true);

CREATE POLICY "Admins can manage badge translations"
  ON public.badge_translations FOR ALL
  USING (public.has_role(auth.uid(), 'admin'));

-- Orders: users see own, admins see all
CREATE POLICY "Users can read own orders"
  ON public.orders FOR SELECT
  USING (auth.uid() = user_id OR public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Authenticated users can create orders"
  ON public.orders FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins can update orders"
  ON public.orders FOR UPDATE
  USING (public.has_role(auth.uid(), 'admin'));

-- =============================================
-- Triggers
-- =============================================

-- Auto-update updated_at
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Auto-create profile and default role on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, contact_name)
  VALUES (NEW.id, COALESCE(NEW.raw_user_meta_data->>'contact_name', ''));
  
  INSERT INTO public.user_roles (user_id, role)
  VALUES (NEW.id, 'user');
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- =============================================
-- Seed data: Country codes
-- =============================================
INSERT INTO public.country_codes (dial_code, country_name, is_active) VALUES
('852', 'Hong Kong', true),
('886', 'Taiwan', false),
('81', 'Japan', true),
('60', 'Malaysia', true),
('65', 'Singapore', false),
('86', 'China', false),
('1', 'United States', false),
('44', 'United Kingdom', false),
('61', 'Australia', false),
('82', 'South Korea', false);

-- =============================================
-- Seed data: Badges (ESG travel destinations)
-- =============================================
INSERT INTO public.badges (id, code, price, image_url, map_url) VALUES
(1, 'palau', 8, '/badges/palau.png', 'https://www.google.com/maps/@7.5149,134.5825,10z'),
(2, 'sabah-wetland', 8, '/badges/sabah-wetland.png', 'https://www.google.com/maps/@5.9749,116.0724,13z'),
(3, 'sabah-kinabalu', 8, '/badges/sabah-kinabalu.png', 'https://www.google.com/maps/@6.0753,116.5584,12z'),
(4, 'sabah-turtle', 8, '/badges/sabah-turtle.png', 'https://www.google.com/maps/@6.1838,118.0648,10z');

-- Badge translations: Chinese
INSERT INTO public.badge_translations (badge_id, lang, home_header, title, show_more, content, details, summary, impact) VALUES
(1, 0, '帛琉', '帛琉可持續旅遊大使', '帛琉（又稱：帕勞）是位於西太平洋的島國。全國有約340座島嶼，是一個擁有豐富海洋資源的國家。', '聯合國永續發展目標（SDGs）是2015年由193個國家共同通過的全球行動框架。STAR希望透過推廣「負責任使用者」的模式，引領更多的市民邁向更公平、韌性與永續的未來。', '旅客對地區的可持續性發展，有著深遠的影響。參與可持續旅客計劃，購買一個電子襟章，為地區的保育及可持續發展工作出一分力。', '透過購買電子襟章，費用中的70%會投放於當地的可持續發展旅遊工作中。', '全球暖化對島國的影響特別嚴重，水位上昇、珊瑚白化及生態被破壞等都會對島國居民造成嚴重影響。'),
(2, 0, '亞庇市濕地', '沙巴可持續旅遊大使', '沙巴位於婆羅洲島北部，三面環海，擁有豐富的雨林和生態資源。', '聯合國永續發展目標（SDGs）旨在2030年前消除貧窮、保護地球環境並促進人類繁榮。', '沙巴三面環海，擁有豐富的雨林，生態資源極奇豐富。', '亞庇市濕地佔地24公頃，在2016年被認證為濕地公約的註冊濕地。', '亞庇市濕地中能找到9種紅樹及數十種鳥與十多種甲殼類生物。'),
(3, 0, '京那巴魯公園', '沙巴可持續旅遊大使', '沙巴位於婆羅洲島北部，是可持續旅遊的熱門之地。', '聯合國永續發展目標（SDGs）為政府、企業與公民社會提供明確的行動藍圖。', '沙巴三面環海，擁有豐富的雨林和生態資源。', '京那巴魯公園以京那巴魯山(4,095m)為主，是東南亞植物多樣性中心。', '京那巴魯公園物種極其豐富，包括來自喜馬拉雅山、中國、澳洲、馬來西亞的植物群。'),
(4, 0, '海龜島', '沙巴可持續旅遊大使', '沙巴的海龜島是世界上最重要的海龜繁殖地之一。', '保護海龜是可持續發展的重要目標之一。', '海龜島保護區致力於保護瀕危的海龜物種。', '海龜島每年有大量海龜上岸產卵。', '海龜保育工作對維持海洋生態平衡至關重要。');

-- Badge translations: English
INSERT INTO public.badge_translations (badge_id, lang, home_header, title, show_more, content, details, summary, impact) VALUES
(1, 1, 'Palau', 'Become Palau Sustainable Travel Ambassador', 'Palau is an island country located in the Western Pacific with about 340 islands rich in marine resources.', 'The UN SDGs are a global action framework adopted in 2015 by 193 countries. STAR seeks to promote "responsible users" toward a fair, resilient future.', 'Travelers have a profound impact on sustainable development. Purchase an electronic badge to contribute to regional conservation.', 'Through badge purchases, 70% of the cost is invested in local sustainable development tourism.', 'Global warming has severe impacts on island countries including rising water levels and coral bleaching.'),
(2, 1, 'KK Wetland', 'Become Sabah Sustainable Travel Ambassador', 'Sabah is located in northern Borneo, surrounded by sea on three sides with rich rainforests.', 'The UN SDGs aim to eradicate poverty, protect the planet, and promote prosperity by 2030.', 'Sabah has rich ecological resources including mountains, rainforests, rivers, and coral reefs.', 'The Kota Kinabalu Wetland covers 24 hectares and was certified as a Ramsar wetland in 2016.', 'The wetland is home to 9 mangrove species, dozens of bird species, and over 10 crustacean species.'),
(3, 1, 'Kinabalu Park', 'Become Sabah Sustainable Travel Ambassador', 'Sabah has long been a popular place for sustainable tourism.', 'The SDGs provide a clear roadmap for governments, businesses, and civil society.', 'Sabah is surrounded by sea on three sides with rich ecological resources.', 'Kinabalu Park is dominated by Mount Kinabalu (4,095m), a Centre of Plant Diversity for Southeast Asia.', 'Kinabalu Park is exceptionally rich in species from the Himalayas, China, Australia, and Malaysia.'),
(4, 1, 'Turtle Island', 'Become Sabah Sustainable Travel Ambassador', 'Sabah''s Turtle Island is one of the world''s most important sea turtle breeding grounds.', 'Protecting sea turtles is a key sustainable development goal.', 'Turtle Island sanctuary is dedicated to protecting endangered sea turtle species.', 'Thousands of sea turtles come ashore to lay eggs annually at Turtle Island.', 'Sea turtle conservation is crucial for maintaining marine ecosystem balance.');

-- Badge translations: Japanese
INSERT INTO public.badge_translations (badge_id, lang, home_header, title, show_more, content, details, summary, impact) VALUES
(1, 2, 'パラオ', 'パラオ持続可能な観光大使', 'パラオは西太平洋に位置する島国です。国内には約340の島があり、海洋資源が豊富な国です。', '旅行者は地域の持続可能な発展に大きな影響を与えます。', '持続可能な訪問者プログラムに参加し、電子バッジを購入して貢献しましょう。', '電子機器の購入を通じて、費用の70%が地域の持続可能な開発観光に投資されます。', '地球温暖化は島嶼国に特に深刻な影響を及ぼします。'),
(2, 2, 'コタキナバル市湿地', 'サバ州持続可能な観光大使', 'サバ州はボルネオ島の北部に位置し、東マレーシアに属します。', '旅行者は地域の持続可能な発展に大きな影響を与えます。', 'サバ州は三方を海に囲まれ、豊かな熱帯雨林があります。', 'コタキナバル湿地はマレーシアにある24ヘクタールの湿地です。', 'コタキナバル湿地には9種のマングローブ、数十種の鳥類が生息しています。'),
(3, 2, 'キナバル公園', 'サバ州持続可能な観光大使', 'サバ州は持続可能な観光地としても古くから人気があります。', '旅行者は地域の持続可能な発展に大きな影響を与えます。', 'サバ州は生態資源が非常に豊富です。', 'キナバル公園はキナバル山(4,095m)がそびえる東南アジア植物多様性センターです。', 'キナバル公園は種が非常に豊富で、多様な植物相があります。'),
(4, 2, 'ウミガメの島', 'サバ州持続可能な観光大使', 'サバ州のウミガメの島は世界で最も重要なウミガメの繁殖地の一つです。', 'ウミガメの保護は持続可能な開発の重要な目標です。', 'ウミガメの島保護区は絶滅危惧種のウミガメの保護に取り組んでいます。', '毎年数千匹のウミガメが産卵のために上陸します。', 'ウミガメの保全は海洋生態系のバランスを維持するために不可欠です。');

-- Reset badge sequence
SELECT setval('badges_id_seq', (SELECT MAX(id) FROM badges));
