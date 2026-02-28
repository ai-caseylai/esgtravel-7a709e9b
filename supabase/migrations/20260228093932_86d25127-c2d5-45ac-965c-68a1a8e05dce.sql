
-- Update badge_translations with full content from MySQL
-- Badge 1, lang 0 (Chinese)
UPDATE public.badge_translations SET 
  show_more = '帛琉（又稱：帕勞）是位於西太平洋的島國。全國有約340座島嶼，是一個擁有豐富海洋資源的國家。',
  home_header = '帛琉',
  content = '聯合國永續發展目標（Sustainable Development Goals, SDGs）是2015年由193個國家共同通過的全球行動框架，涵蓋17項核心目標與169項具體指標，旨在2030年前消除貧窮、保護地球環境並促進人類繁榮。SDGs以「不遺落任何人」為核心精神，整合「環境、社會、經濟」三大永續支柱，涵蓋氣候行動、消除飢餓、教育平權、性別平等、責任消費等跨領域議題，為政府、企業與公民社會提供明確的行動藍圖。',
  details = '旅客對地區的可持續性發展，有著深遠的影響。隨著世界對可持續發展的認識越深，在旅遊的同時為地區的保育工作上發揮一定的作用。參與可持續旅客計劃，購買一個電子襟章，為地區的保育、及可持續發展工作出一分力。',
  summary = '透過購買電子，費用中的70%會投放於當地的可持續發展旅遊工作中，推動全面且對環境有善的旅遊，在環境保育工作上提供支援，減少地區政府在保育工作的壓力，同時旅客可以參與日漸流行的研學之旅，體驗公民科學家的工作，實現在旅遊同時可輕鬆地為可持續發展出一分力！',
  impact = '全球暖化對島國的影響特別嚴重，水位上昇、酸雨、淡水資源被鹽化、珊瑚白化及生態被破壞等都會在島國中出現，這些情況都會對島國居民的健康及生命安全做成嚴重的影響。'
WHERE badge_id = 1 AND lang = 0;

-- Badge 1, lang 1 (English)
UPDATE public.badge_translations SET 
  show_more = 'Palau is an island country located in the Western Pacific. There are about 340 islands and very rich in marine resources.',
  home_header = 'Palau',
  content = 'The United Nations Sustainable Development Goals (SDGs) are a global action framework adopted in 2015 by 193 countries. They encompass 17 core goals and 169 specific targets, aiming to eradicate poverty, protect the planet, and promote human prosperity by 2030.',
  details = 'Travelers have a profound impact on the sustainable development of a region. As the world becomes more aware of sustainable development, it plays a certain role in regional conservation while traveling. Participate in the Sustainable Travelers Program and purchase an electronic badge to contribute to regional conservation and sustainable development.',
  summary = 'Through the purchase of electronics, 70% of the cost will be invested in local sustainable development tourism, promoting comprehensive and environmentally friendly tourism, providing support in environmental conservation work, reducing the pressure on regional governments in conservation work.',
  impact = 'Global warming has a particularly serious impact on island countries. Rising water levels, acid rain, salinization of freshwater resources, coral bleaching and ecological destruction will all occur in island countries.'
WHERE badge_id = 1 AND lang = 1;

-- Badge 1, lang 2 (Japanese)
UPDATE public.badge_translations SET 
  show_more = 'パラオは西太平洋に位置する島国です。国内には約340の島があり、海洋資源が豊富な国です。',
  home_header = '帛琉',
  content = '旅行者は地域の持続可能な発展に大きな影響を与えます。世界が持続可能な開発への意識を高めるにつれ、旅行中の地域保全において一定の役割を果たしています。',
  details = '旅行者は地域の持続可能な発展に大きな影響を与えます。',
  summary = '電子機器の購入を通じて、費用の70％が地域の持続可能な開発観光に投資され、包括的で環境に優しい観光を促進し、環境保全活動への支援を提供します。',
  impact = '地球温暖化は島嶼国に特に深刻な影響を及ぼし、水位の上昇、酸性雨、淡水資源の塩類化、サンゴの白化、生態系の破壊はすべて島嶼国の健康と生命の安全に深刻な影響を及ぼします。'
WHERE badge_id = 1 AND lang = 2;

-- Badge 2, lang 0 (Chinese)
UPDATE public.badge_translations SET 
  show_more = '沙巴，位於婆羅洲島北部，屬東馬來西亞，是馬來西亞境內的第二大州，而婆羅洲又是世界第三大島。',
  home_header = '亞庇市濕地',
  content = '聯合國永續發展目標（Sustainable Development Goals, SDGs）是2015年由193個國家共同通過的全球行動框架，涵蓋17項核心目標與169項具體指標，旨在2030年前消除貧窮、保護地球環境並促進人類繁榮。',
  details = '沙巴，位於婆羅洲島北部，屬東馬來西亞，是馬來西亞境內的第二大州，而婆羅洲又是世界第三大島。沙巴享有風下之鄉之美譽（Land Below The Wind）。',
  summary = '亞庇市濕地是一處位於馬來西亞的濕地，佔地24公頃，在2016年12月，哥打京那巴魯濕地被認證為濕地公約的註冊濕地。在這濕地保護區中，能找到9種紅樹及數十種鳥與十多種甲殼類生物。',
  impact = '亞庇市濕地是一處位於馬來西亞的濕地，佔地24公頃，在2016年12月，哥打京那巴魯濕地被認證為濕地公約的註冊濕地。'
WHERE badge_id = 2 AND lang = 0;

-- Badge 2, lang 1 (English)
UPDATE public.badge_translations SET 
  show_more = 'Sabah, located in the northern part of Borneo Island, belongs to East Malaysia. It is the second largest state in Malaysia, and Borneo is the third largest island in the world.',
  home_header = 'Badge (Wetland)',
  content = 'The United Nations Sustainable Development Goals (SDGs) are a global action framework adopted in 2015 by 193 countries.',
  details = 'Sabah, located in the northern part of Borneo Island, belongs to East Malaysia. Sabah is known as the Land Below The Wind.',
  summary = 'About Kota Kinabalu Wetland. The Kota Kinabalu Wetland is a wetland located in Malaysia, covering an area of 24 hectares. In December 2016, it was certified as a registered wetland under the Ramsar Convention.',
  impact = 'About Kota Kinabalu Wetland. The Kota Kinabalu Wetland is a wetland located in Malaysia, covering an area of 24 hectares.'
WHERE badge_id = 2 AND lang = 1;

-- Badge 2, lang 2 (Japanese)
UPDATE public.badge_translations SET 
  show_more = 'サバ州はボルネオ島の北部に位置し、東マレーシアに属し、マレーシアで2番目に大きな州です。',
  home_header = 'コタキナバル市湿地',
  content = '旅行者は地域の持続可能な発展に大きな影響を与えます。',
  details = 'サバ州はボルネオ島の北部に位置し、東マレーシアに属します。「風の下の国」として知られています。',
  summary = 'コタキナバル湿地はマレーシアにある24ヘクタールの湿地で、2016年12月にラムサール条約の登録湿地に認定されました。',
  impact = 'コタキナバル湿地はマレーシアにある24ヘクタールの湿地です。'
WHERE badge_id = 2 AND lang = 2;

-- Badge 3, lang 0 (Chinese)
UPDATE public.badge_translations SET 
  show_more = '沙巴，位於婆羅洲島北部，屬東馬來西亞，是馬來西亞境內的第二大州，而婆羅洲又是世界第三大島。',
  home_header = '京那巴魯公園',
  content = '聯合國永續發展目標（Sustainable Development Goals, SDGs）是2015年由193個國家共同通過的全球行動框架。',
  details = '沙巴，位於婆羅洲島北部，屬東馬來西亞，是馬來西亞境內的第二大州。',
  summary = '京那巴魯公園 (Kinabalu Park) 位於婆羅洲島北端的沙巴州，以京那巴魯山 (4,095 m) 為主，它是喜馬拉雅山和新幾內亞之間的最高山峰。',
  impact = '京那巴魯公園 (Kinabalu Park) 位於婆羅洲島北端的沙巴州，以京那巴魯山 (4,095 m) 為主。'
WHERE badge_id = 3 AND lang = 0;

-- Badge 3, lang 1 (English)
UPDATE public.badge_translations SET 
  show_more = 'Sabah, located in the northern part of Borneo Island, belongs to East Malaysia.',
  home_header = 'Kinabalu Park',
  content = 'The United Nations Sustainable Development Goals (SDGs) are a global action framework adopted in 2015 by 193 countries.',
  details = 'Sabah is surrounded by the sea on three sides and has rich rainforests.',
  summary = 'Kinabalu Park, in the State of Sabah on the northern end of the island of Borneo, is dominated by Mount Kinabalu (4,095 m), the highest mountain between the Himalayas and New Guinea.',
  impact = 'Kinabalu Park, in the State of Sabah, is dominated by Mount Kinabalu (4,095 m).'
WHERE badge_id = 3 AND lang = 1;

-- Badge 3, lang 2 (Japanese)
UPDATE public.badge_translations SET 
  show_more = 'サバ州はボルネオ島の北部に位置し、東マレーシアに属します。',
  home_header = 'キナバル公園',
  content = '旅行者は地域の持続可能な発展に大きな影響を与えます。',
  details = 'サバ州は三方を海に囲まれ、豊かな熱帯雨林があります。',
  summary = 'キナバル公園は、ボルネオ島北端のサバ州に位置し、ヒマラヤとニューギニアの間の最高峰であるキナバル山 (4,095 m) がそびえています。',
  impact = 'キナバル公園は、ボルネオ島北端のサバ州に位置しています。'
WHERE badge_id = 3 AND lang = 2;

-- Badge 4, lang 0 (Chinese)
UPDATE public.badge_translations SET 
  show_more = '沙巴，位於婆羅洲島北部，屬東馬來西亞，是馬來西亞境內的第二大州。',
  home_header = '海龜島公園',
  content = '聯合國永續發展目標（Sustainable Development Goals, SDGs）是2015年由193個國家共同通過的全球行動框架。',
  details = '沙巴，位於婆羅洲島北部。',
  summary = '海龜島公園由三個小島組成，分別是Selingaan島、Bakkungan Kechil島和Gulisaan島。',
  impact = '海龜島公園由三個小島組成。'
WHERE badge_id = 4 AND lang = 0;

-- Badge 4, lang 1 (English)
UPDATE public.badge_translations SET 
  show_more = 'Sabah, located in the northern part of Borneo Island, belongs to East Malaysia.',
  home_header = 'Turtle Island Park',
  content = 'The United Nations Sustainable Development Goals (SDGs) are a global action framework adopted in 2015.',
  details = 'Sabah is surrounded by the sea on three sides.',
  summary = 'Turtle Islands Park consists of three small islands: Selingaan Island, Bakkungan Kechil Island, and Gulisaan Island.',
  impact = 'Turtle Islands Park consists of three small islands.'
WHERE badge_id = 4 AND lang = 1;

-- Badge 4, lang 2 (Japanese)
UPDATE public.badge_translations SET 
  show_more = 'サバ州はボルネオ島の北部に位置し、東マレーシアに属します。',
  home_header = 'タートルアイランドパーク',
  content = '旅行者は地域の持続可能な発展に大きな影響を与えます。',
  details = 'サバ州は三方を海に囲まれています。',
  summary = 'タートルアイランドパークは3つの小さな島で構成されています。',
  impact = 'タートルアイランドパークは3つの小さな島で構成されています。'
WHERE badge_id = 4 AND lang = 2;

-- Insert SDG-Badge relationships
INSERT INTO public.sdg_badges (badge_id, sdg_id) VALUES
(1, 4), (1, 11), (1, 14),
(2, 4), (2, 11), (2, 13), (2, 14), (2, 15),
(3, 3), (3, 4), (3, 8), (3, 11), (3, 13), (3, 14), (3, 15),
(4, 3), (4, 4), (4, 8), (4, 11), (4, 13), (4, 14), (4, 15);

-- Insert site_content (i18n strings)
INSERT INTO public.site_content (id, lang, subheader, description, boardheader, boardtitle, support, passport, website, aboutheader, abouttitle, showmore, addextra, giveus, currency, formheader, formdesc, reaction, formname, formemail, formconfirmemail, formmobile, formterm, formtnc, formmarketing, failedtitle, faileddesc, successtitle, sucessdesc, impactheader, impacttitle, loginemail, loginmobile, getstarted, otpheader, otpdescsms, otpdescemail, verifyotp, resendotp, tryother, needhelp, mypassport, badge, event, impact, travelambassador, impactrecord, summary, detail, sdg, submit, nameerror, mobileerror, termerror, duplicateerror, emailerror, home, invildemail, otpinvalid, otpexpired, contactus, contact, email, collected, greeting) VALUES
(1, 1, 'The blessings of nature', 'Verified Impact Authorizer', 'Become', 'Sustainable Travel Ambassador', 'SUPPORT & GET A BADGE', 'BADGE PASSPORT', 'OFFICIAL WEBSITE', 'Select your contribution to get this badge', 'About this cause', 'Show More', 'Add extra to help with fees', 'Give Us', 'US$', 'I hereby committed', 'to support the sustainable development of Kochis city and be a committed ambassador for their sustainability mission.', 'Choose your reaction', 'Name:', 'Email:', 'Confirm Email:', 'Mobile:', 'Term and Conditions:', '*I confirm that I have read, understood and agreed to the Terms and Conditions and Privacy Policy.', 'I agree to the use and transfer of personal data for direct marketing.', 'Minting Failed', 'Your booking could not be processed at this time. Please try again later.', 'You collected', 'You can check it out anytime in your mirai impact passport.', 'Impact Passport', 'Give your impact a New meaning', 'Log in with your email', 'Log in with your mobile phone', 'Get Started', 'OTP verification', 'A One Time Password (OTP) has been generated and sent to your SMS.', 'A One Time Password (OTP) has been generated and sent to your email.', 'VERIFY OTP', 'Resend OTP', 'Try other verification', 'Need help? Contact us', 'My Passport', 'Badge', 'Intro.', 'Impact', 'Travel Ambassador', 'Impact Record', 'Summary', 'Detail', 'Related SDG', 'Submit', 'Invalid Name', 'Invalid Mobile Phone No.', 'Please accept the terms and conditions', 'Email or Mobile already exist', 'Email must be the same', 'HOME', 'invalid email: Please try another email address', 'OTP is invalid. Please try again.', 'OTP expired.', 'Contact Us', 'Contact: + 852 1234-5678', 'Email: info@starsdg.com', 'You collected total {0} badges', 'Hi'),
(2, 0, 'The blessings of nature', '已驗證影響授權者', '成為', '可持續旅遊大使', '支持並獲取徽章', '徽章護照', '官方網站', '選擇您的捐獻以獲得此徽章', '關於此事業', '顯示更多', '支付額外小費以支持', '一共購買', '美元$', '我在此承諾', '支持高知市的可持續發展，並作為其可持續性使命的積極大使。', '選擇您的反應', '姓名:', '電子郵件:', '確認電子郵件:', '手機號碼:', '條款和條件:', '*我確認我已閱讀、理解並同意活動的條款和條件，以及隱私政策。', '我同意使用及轉移個人資料用於直接市場推廣。', '鑄造失敗', '您的付款目前無法處理。請稍後再試。', '太好了！您已獲得您的徽章', '您可以隨時在您的徽章護照中查看。', '徽章護照', '為您的影響賦予新的意義', '使用您的電子郵件登錄', '使用您的手機登錄', '開始使用', 'OTP 驗證', '一次性密碼（OTP）已生成並發送到您的SMS。', '一次性密碼（OTP）已生成並發送到您的電子郵件。', '驗證 OTP', '重新發送 OTP', '嘗試其他驗證方式', '需要幫助？ 請聯繫我們', '我的護照', '徽章', '簡介', '影響', '旅遊大使', '影響記錄', '摘要', '詳情', '相關的可持續發展目標（SDG）', '提交', '名字無效', '電話號碼無效', '需要接受條款', '電郵或電話號碼已登記', '電郵不正確', '主頁', '電郵無效:請再次輸入', 'OTP無效, 請再次輸入', 'OTP已經過期', '聯絡我們', '聯絡電話: + 852 1234-5678', '電子郵件: info@starsdg.com', '您共收集了 {0} 個徽章', '你好'),
(3, 2, 'The blessings of nature', '認定インパクト認証者', '', 'サステナブルトラベルアンバサダーになる', 'サポートしてバッジを取得する', 'バッジパスポート', '公式ウェブサイト', 'バッジを取得するための寄付を選択してください', 'この原因について', 'もっと見る', '手数料を助けるために追加を加える', '合計ドルの購入', 'ドル$', 'ここに私は誓約します', '持続可能な発展を支援し、その持続可能性ミッションの熱心な大使であること。', 'あなたの反応を選んでください', '名前：', 'メールアドレス：', 'メールアドレスの確認：', '携帯電話番号：', '利用規約：', '*私は、イベントの利用規約およびプライバシーポリシーを読み、理解し、同意しました。', '私は、個人データの使用およびダイレクトマーケティングのための転送に同意します。', 'ミント失敗', 'お支払いは現在処理できません。後ほど再試行してください。', '素晴らしい！バッジを受け取りました', 'いつでもバッジパスポートで確認できます。', 'バッジパスポート', 'あなたの影響に新しい意味を', 'メールでログイン', '携帯電話でログイン', 'スタート', 'OTP 認証', 'ワンタイムパスワード（OTP）が生成され、あなたの携帯電話に送信されました。', 'ワンタイムパスワード（OTP）が生成され、あなたのEメールに送信されました。', 'OTPを確認', 'OTPを再送信（30秒）', '他の認証方法を試す', 'サポートが必要ですか？お問い合わせください', '私のパスポート', 'バッジ', '導入', '影響', 'トラベルアンバサダー', 'インパクト記録', '概要', '詳細', '関連する (SDG)', '提交', '無効な名前', '無効な電話番号', '規約に同意する必要があります', 'メールアドレスまたは電話番号が登録されています', '電郵不正確', 'ホームページ', 'メールが間違っています', 'OTP が無効です。もう一度入力してください', 'OTP の有効期限が切れています', 'お問い合わせ', '連絡先番号: + 852 1234-5678', 'Eメール: info@starsdg.com', 'バッジを合計 {0} つ集めました', 'こんにちは');

-- Insert full country codes from MySQL (delete existing first, then re-insert all)
DELETE FROM public.country_codes;

INSERT INTO public.country_codes (id, dial_code, country_name, is_active) VALUES
(1, '93', 'Afghanistan', false),
(2, '355', 'Albania', false),
(3, '213', 'Algeria', false),
(4, '1-684', 'American Samoa', false),
(5, '376', 'Andorra', false),
(6, '244', 'Angola', false),
(7, '1-264', 'Anguilla', false),
(8, '672', 'Antarctica', false),
(9, '1-268', 'Antigua and Barbuda', false),
(10, '54', 'Argentina', false),
(11, '374', 'Armenia', false),
(12, '297', 'Aruba', false),
(13, '61', 'Australia', false),
(14, '43', 'Austria', false),
(15, '994', 'Azerbaijan', false),
(16, '1-242', 'Bahamas', false),
(17, '973', 'Bahrain', false),
(18, '880', 'Bangladesh', false),
(19, '1-246', 'Barbados', false),
(20, '375', 'Belarus', false),
(21, '32', 'Belgium', false),
(22, '501', 'Belize', false),
(23, '229', 'Benin', false),
(24, '1-441', 'Bermuda', false),
(25, '975', 'Bhutan', false),
(26, '591', 'Bolivia', false),
(27, '387', 'Bosnia and Herzegovina', false),
(28, '267', 'Botswana', false),
(29, '55', 'Brazil', false),
(30, '246', 'British Indian Ocean Territory', false),
(31, '1-284', 'British Virgin Islands', false),
(32, '673', 'Brunei', false),
(33, '359', 'Bulgaria', false),
(34, '226', 'Burkina Faso', false),
(35, '257', 'Burundi', false),
(36, '855', 'Cambodia', false),
(37, '237', 'Cameroon', false),
(38, '1', 'Canada', false),
(39, '238', 'Cape Verde', false),
(40, '1-345', 'Cayman Islands', false),
(41, '236', 'Central African Republic', false),
(42, '235', 'Chad', false),
(43, '56', 'Chile', false),
(44, '86', 'China', true),
(45, '61', 'Christmas Island', false),
(46, '61', 'Cocos Islands', false),
(47, '57', 'Colombia', false),
(48, '269', 'Comoros', false),
(49, '682', 'Cook Islands', false),
(50, '506', 'Costa Rica', false),
(51, '385', 'Croatia', false),
(52, '53', 'Cuba', false),
(53, '599', 'Curacao', false),
(54, '357', 'Cyprus', false),
(55, '420', 'Czech Republic', false),
(56, '243', 'Democratic Republic of the Congo', false),
(57, '45', 'Denmark', false),
(58, '253', 'Djibouti', false),
(59, '1-767', 'Dominica', false),
(60, '1-809', 'Dominican Republic', false),
(61, '670', 'East Timor', false),
(62, '593', 'Ecuador', false),
(63, '20', 'Egypt', false),
(64, '503', 'El Salvador', false),
(65, '240', 'Equatorial Guinea', false),
(66, '291', 'Eritrea', false),
(67, '372', 'Estonia', false),
(68, '251', 'Ethiopia', false),
(69, '500', 'Falkland Islands', false),
(70, '298', 'Faroe Islands', false),
(71, '679', 'Fiji', false),
(72, '358', 'Finland', false),
(73, '33', 'France', false),
(74, '689', 'French Polynesia', false),
(75, '241', 'Gabon', false),
(76, '220', 'Gambia', false),
(77, '995', 'Georgia', false),
(78, '49', 'Germany', false),
(79, '233', 'Ghana', false),
(80, '350', 'Gibraltar', false),
(81, '30', 'Greece', false),
(82, '299', 'Greenland', false),
(83, '1-473', 'Grenada', false),
(84, '1-671', 'Guam', false),
(85, '502', 'Guatemala', false),
(86, '44-1481', 'Guernsey', false),
(87, '224', 'Guinea', false),
(88, '245', 'Guinea-Bissau', false),
(89, '592', 'Guyana', false),
(90, '509', 'Haiti', false),
(91, '504', 'Honduras', false),
(92, '852', 'Hong Kong', true),
(93, '36', 'Hungary', false),
(94, '354', 'Iceland', false),
(95, '91', 'India', false),
(96, '62', 'Indonesia', false),
(97, '98', 'Iran', false),
(98, '964', 'Iraq', false),
(99, '353', 'Ireland', false),
(100, '44-1624', 'Isle of Man', false),
(101, '972', 'Israel', false),
(102, '39', 'Italy', false),
(103, '225', 'Ivory Coast', false),
(104, '1-876', 'Jamaica', false),
(105, '81', 'Japan', true),
(106, '44-1534', 'Jersey', false),
(107, '962', 'Jordan', false),
(108, '7', 'Kazakhstan', false),
(109, '254', 'Kenya', false),
(110, '686', 'Kiribati', false),
(111, '383', 'Kosovo', false),
(112, '965', 'Kuwait', false),
(113, '996', 'Kyrgyzstan', false),
(114, '856', 'Laos', false),
(115, '371', 'Latvia', false),
(116, '961', 'Lebanon', false),
(117, '266', 'Lesotho', false),
(118, '231', 'Liberia', false),
(119, '218', 'Libya', false),
(120, '423', 'Liechtenstein', false),
(121, '370', 'Lithuania', false),
(122, '352', 'Luxembourg', false),
(123, '853', 'Macau', true),
(124, '389', 'Macedonia', false),
(125, '261', 'Madagascar', false),
(126, '265', 'Malawi', false),
(127, '60', 'Malaysia', true),
(128, '960', 'Maldives', false),
(129, '223', 'Mali', false),
(130, '356', 'Malta', false),
(131, '692', 'Marshall Islands', false),
(132, '222', 'Mauritania', false),
(133, '230', 'Mauritius', false),
(134, '262', 'Mayotte', false),
(135, '52', 'Mexico', false),
(136, '691', 'Micronesia', false),
(137, '373', 'Moldova', false),
(138, '377', 'Monaco', false),
(139, '976', 'Mongolia', false),
(140, '382', 'Montenegro', false),
(141, '1-664', 'Montserrat', false),
(142, '212', 'Morocco', false),
(143, '258', 'Mozambique', false),
(144, '95', 'Myanmar', false),
(145, '264', 'Namibia', false),
(146, '674', 'Nauru', false),
(147, '977', 'Nepal', false),
(148, '31', 'Netherlands', false),
(149, '599', 'Netherlands Antilles', false),
(150, '687', 'New Caledonia', false),
(151, '64', 'New Zealand', false),
(152, '505', 'Nicaragua', false),
(153, '227', 'Niger', false),
(154, '234', 'Nigeria', false),
(155, '683', 'Niue', false),
(156, '850', 'North Korea', false),
(157, '1-670', 'Northern Mariana Islands', false),
(158, '47', 'Norway', false),
(159, '968', 'Oman', false),
(160, '92', 'Pakistan', false),
(161, '680', 'Palau', false),
(162, '970', 'Palestine', false),
(163, '507', 'Panama', false),
(164, '675', 'Papua New Guinea', false),
(165, '595', 'Paraguay', false),
(166, '51', 'Peru', false),
(167, '63', 'Philippines', false),
(168, '64', 'Pitcairn', false),
(169, '48', 'Poland', false),
(170, '351', 'Portugal', false),
(171, '1-787', 'Puerto Rico', false),
(172, '974', 'Qatar', false),
(173, '242', 'Republic of the Congo', false),
(174, '262', 'Reunion', false),
(175, '40', 'Romania', false),
(176, '7', 'Russia', false),
(177, '250', 'Rwanda', false),
(178, '590', 'Saint Barthelemy', false),
(179, '290', 'Saint Helena', false),
(180, '1-869', 'Saint Kitts and Nevis', false),
(181, '1-758', 'Saint Lucia', false),
(182, '590', 'Saint Martin', false),
(183, '508', 'Saint Pierre and Miquelon', false),
(184, '1-784', 'Saint Vincent and the Grenadines', false),
(185, '685', 'Samoa', false),
(186, '378', 'San Marino', false),
(187, '239', 'Sao Tome and Principe', false),
(188, '966', 'Saudi Arabia', false),
(189, '221', 'Senegal', false),
(190, '381', 'Serbia', false),
(191, '248', 'Seychelles', false),
(192, '232', 'Sierra Leone', false),
(193, '65', 'Singapore', false),
(194, '1-721', 'Sint Maarten', false),
(195, '421', 'Slovakia', false),
(196, '386', 'Slovenia', false),
(197, '677', 'Solomon Islands', false),
(198, '252', 'Somalia', false),
(199, '27', 'South Africa', false),
(200, '82', 'South Korea', false),
(201, '211', 'South Sudan', false),
(202, '34', 'Spain', false),
(203, '94', 'Sri Lanka', false),
(204, '249', 'Sudan', false),
(205, '597', 'Suriname', false),
(206, '47', 'Svalbard and Jan Mayen', false),
(207, '268', 'Swaziland', false),
(208, '46', 'Sweden', false),
(209, '41', 'Switzerland', false),
(210, '963', 'Syria', false),
(211, '886', 'Taiwan', false),
(212, '992', 'Tajikistan', false),
(213, '255', 'Tanzania', false),
(214, '66', 'Thailand', false),
(215, '228', 'Togo', false),
(216, '690', 'Tokelau', false),
(217, '676', 'Tonga', false),
(218, '1-868', 'Trinidad and Tobago', false),
(219, '216', 'Tunisia', false),
(220, '90', 'Turkey', false),
(221, '993', 'Turkmenistan', false),
(222, '1-649', 'Turks and Caicos Islands', false),
(223, '688', 'Tuvalu', false),
(224, '1-340', 'U.S. Virgin Islands', false),
(225, '256', 'Uganda', false),
(226, '380', 'Ukraine', false),
(227, '971', 'United Arab Emirates', false),
(228, '44', 'United Kingdom', false),
(229, '1', 'United States', false),
(230, '598', 'Uruguay', false),
(231, '998', 'Uzbekistan', false),
(232, '678', 'Vanuatu', false),
(233, '379', 'Vatican', false),
(234, '58', 'Venezuela', false),
(235, '84', 'Vietnam', false),
(236, '681', 'Wallis and Futuna', false),
(237, '212', 'Western Sahara', false),
(238, '967', 'Yemen', false),
(239, '260', 'Zambia', false),
(240, '263', 'Zimbabwe', false);
