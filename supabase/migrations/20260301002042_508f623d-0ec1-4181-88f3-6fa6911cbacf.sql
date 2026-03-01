
-- Mobile content management table
CREATE TABLE public.mobile_content (
  id SERIAL PRIMARY KEY,
  section TEXT NOT NULL,
  content_key TEXT NOT NULL,
  value_tw TEXT DEFAULT '',
  value_cn TEXT DEFAULT '',
  value_en TEXT DEFAULT '',
  value_ja TEXT DEFAULT '',
  content_type TEXT DEFAULT 'text',
  sort_order INTEGER DEFAULT 0,
  UNIQUE(section, content_key)
);

ALTER TABLE public.mobile_content ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read mobile content" ON public.mobile_content FOR SELECT USING (true);
CREATE POLICY "Admins can manage mobile content" ON public.mobile_content FOR ALL
  USING (has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- Seed: HOME section
INSERT INTO public.mobile_content (section, content_key, value_tw, value_cn, value_en, value_ja, content_type, sort_order) VALUES
('home', 'featured_label', '精選徽章', '精选徽章', 'Featured', 'おすすめ', 'text', 1),
('home', 'badge_desc_fallback', '支持當地可持續發展項目', '支持当地可持续发展项目', 'Support local sustainability projects', '地域の持続可能性プロジェクトを支援', 'text', 2),
('home', 'explore_button', '探索徽章', '探索徽章', 'Explore', '探索', 'text', 3),
('home', 'available_text', '個可用', '个可用', 'available', '利用可能', 'text', 4),
('home', 'passport_button', '我的護照', '我的护照', 'Passport', 'パスポート', 'text', 5),
('home', 'view_collection', '查看收藏', '查看收藏', 'View collection', 'コレクション', 'text', 6),
('home', 'all_badges_title', '所有徽章', '所有徽章', 'All Badges', 'すべてのバッジ', 'text', 7),
('home', 'see_all', '查看全部', '查看全部', 'See all', 'すべて見る', 'text', 8),
('home', 'sign_in_button', '登入帳號', '登录帐号', 'Sign In', 'ログイン', 'text', 9),

-- Seed: BADGES LIST section
('badges', 'page_title', '數碼徽章', '数码徽章', 'Digital Badges', 'デジタルバッジ', 'text', 1),

-- Seed: PASSPORT section
('passport', 'page_title', '我的護照', '我的护照', 'My Passport', 'マイパスポート', 'text', 1),
('passport', 'badges_collected', '已收集徽章', '已收集徽章', 'Badges collected', '収集済みバッジ', 'text', 2),
('passport', 'my_badges', '我的徽章', '我的徽章', 'My Badges', 'マイバッジ', 'text', 3),
('passport', 'view', '查看', '查看', 'View', '見る', 'text', 4),
('passport', 'no_badges', '還沒有收集任何徽章', '还没有收集任何徽章', 'No badges collected yet', 'まだバッジを収集していません', 'text', 5),
('passport', 'explore_badges', '探索徽章', '探索徽章', 'Explore Badges', 'バッジを探す', 'text', 6),
('passport', 'please_sign_in', '請先登入', '请先登录', 'Please sign in', 'ログインしてください', 'text', 7),

-- Seed: COUPONS section
('coupons', 'page_title', '優惠券', '优惠券', 'Coupons', 'クーポン', 'text', 1),
('coupons', 'please_sign_in', '請先登入', '请先登录', 'Please sign in', 'ログインしてください', 'text', 2),
('coupons', 'sign_in_button', '登入', '登录', 'Sign In', 'ログイン', 'text', 3),
('coupons', 'valid_until', '有效期至', '有效期至', 'Valid until', '有効期限', 'text', 4),
('coupons', 'coupon1_title', '餐飲折扣', '餐饮折扣', 'Dining Discount', '飲食割引', 'text', 5),
('coupons', 'coupon1_desc', '在合作餐廳享受優惠', '在合作餐厅享受优惠', 'Enjoy discounts at partner restaurants', '提携レストランで割引', 'text', 6),
('coupons', 'coupon1_discount', '10%', '10%', '10%', '10%', 'text', 7),
('coupons', 'coupon2_title', '住宿優惠', '住宿优惠', 'Accommodation', '宿泊割引', 'text', 8),
('coupons', 'coupon2_desc', '合作酒店住宿折扣', '合作酒店住宿折扣', 'Discount at partner hotels', '提携ホテルでの割引', 'text', 9),
('coupons', 'coupon2_discount', '15%', '15%', '15%', '15%', 'text', 10),
('coupons', 'coupon3_title', '體驗活動', '体验活动', 'Activities', '体験割引', 'text', 11),
('coupons', 'coupon3_desc', '生態旅遊體驗優惠', '生态旅游体验优惠', 'Eco-tourism activity discount', 'エコツーリズム割引', 'text', 12),
('coupons', 'coupon3_discount', '20%', '20%', '20%', '20%', 'text', 13),

-- Seed: SETTINGS section
('settings', 'page_title', '設定', '设置', 'Settings', '設定', 'text', 1),
('settings', 'personal_info', '個人資料', '个人资料', 'Personal Info', '個人情報', 'text', 2),
('settings', 'change_password', '更改密碼', '更改密码', 'Change Password', 'パスワード変更', 'text', 3),
('settings', 'save', '儲存', '保存', 'Save', '保存', 'text', 4),
('settings', 'new_password', '新密碼', '新密码', 'New Password', '新しいパスワード', 'text', 5),
('settings', 'update', '更新', '更新', 'Update', '更新', 'text', 6),
('settings', 'language', '語言', '语言', 'Language', '言語', 'text', 7),
('settings', 'updated_msg', '已更新', '已更新', 'Updated', '更新しました', 'text', 8),
('settings', 'password_updated', '密碼已更新', '密码已更新', 'Password updated', 'パスワード更新済み', 'text', 9),

-- Seed: RANKING section
('ranking', 'page_title', '排行榜', '排行榜', 'Leaderboard', 'ランキング', 'text', 1),
('ranking', 'badges_label', '徽章', '徽章', 'badges', 'バッジ', 'text', 2),
('ranking', 'no_data', '還沒有排名資料', '还没有排名数据', 'No data yet', 'データがありません', 'text', 3),

-- Seed: LOGIN section
('login', 'page_title', '登入', '登录', 'Login', 'ログイン', 'text', 1),
('login', 'welcome_back', '歡迎回來', '欢迎回来', 'Welcome Back', 'おかえりなさい', 'text', 2),
('login', 'email_label', '電郵地址', '邮箱地址', 'Email Address', 'メールアドレス', 'text', 3),
('login', 'password_label', '密碼', '密码', 'Password', 'パスワード', 'text', 4),
('login', 'no_account', '還沒有帳號？', '还没有帐号？', 'No account?', 'アカウントをお持ちでないですか？', 'text', 5),

-- Seed: SIGNUP section
('signup', 'page_title', '註冊', '注册', 'Sign Up', '新規登録', 'text', 1),
('signup', 'create_account', '創建帳號', '创建帐号', 'Create Account', 'アカウント作成', 'text', 2),
('signup', 'name_label', '姓名', '姓名', 'Name', '名前', 'text', 3),
('signup', 'email_label', '電郵地址', '邮箱地址', 'Email Address', 'メールアドレス', 'text', 4),
('signup', 'password_label', '密碼', '密码', 'Password', 'パスワード', 'text', 5),
('signup', 'confirm_msg', '請檢查郵箱確認帳號', '请检查邮箱确认帐号', 'Check your email to confirm', 'メールを確認してください', 'text', 6),
('signup', 'have_account', '已有帳號？', '已有帐号？', 'Have an account?', 'アカウントをお持ちですか？', 'text', 7),

-- Seed: PAYMENT SUCCESS section
('payment_success', 'badge_added', '徽章已加入護照', '徽章已加入护照', 'Badge added to passport', 'バッジがパスポートに追加されました', 'text', 1),

-- Seed: CONTACT section
('contact', 'page_title', '聯絡我們', '联系我们', 'Contact Us', 'お問い合わせ', 'text', 1),

-- Seed: BOTTOM NAV section
('nav', 'home', '首頁', '首页', 'Home', 'ホーム', 'text', 1),
('nav', 'badges', '徽章', '徽章', 'Badges', 'バッジ', 'text', 2),
('nav', 'passport', '護照', '护照', 'Passport', 'パスポート', 'text', 3),
('nav', 'coupons', '優惠', '优惠', 'Coupons', 'クーポン', 'text', 4),
('nav', 'settings', '設定', '设置', 'Settings', '設定', 'text', 5),

-- Seed: IMAGES section
('images', 'hero_fallback', '', '', '', '', 'image', 1);
