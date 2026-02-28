import { useI18n } from '@/lib/i18n';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { X } from 'lucide-react';
import eventsHero from '@/assets/site-events-hero.jpg';
import eventKochi from '@/assets/event-kochi-eco.jpg';
import eventForum from '@/assets/event-forum.jpg';
import eventTree from '@/assets/event-tree-planting.jpg';
import eventMarine from '@/assets/event-marine.jpg';

type LangMap = { 0: string; 1: string; 2: string; 3: string };

interface EventItem {
  titleKey: LangMap;
  descKey: LangMap;
  articleKey: LangMap;
  date: string;
  image: string;
}

export default function SiteEvents() {
  const { t } = useI18n();
  const [selectedEvent, setSelectedEvent] = useState<number | null>(null);

  const events: EventItem[] = [
    {
      titleKey: { 0: '高知縣生態旅遊體驗', 1: '高知县生态旅游体验', 2: 'Kochi Eco-Tourism Experience', 3: '高知県エコツーリズム体験' },
      descKey: { 0: '與當地社區合作，體驗高知縣的自然生態之美。參加者深入了解當地的可持續發展項目，並親身參與海岸清潔活動。', 1: '与当地社区合作，体验高知县的自然生态之美。参加者深入了解当地的可持续发展项目，并亲身参与海岸清洁活动。', 2: 'Partner with local communities to experience the natural beauty of Kochi Prefecture. Participants explore sustainable development projects and join coastal cleanup activities.', 3: '地域コミュニティと協力して高知県の自然の美しさを体験。参加者は持続可能な開発プロジェクトを探索し、海岸清掃活動に参加します。' },
      articleKey: {
        0: `高知縣位於日本四國島的南部，以其壯麗的自然風光和深厚的文化底蘊聞名。作為 STAR SDG 的旗艦合作地區之一，高知縣致力於將旅遊業與環境保護緊密結合。

本次生態旅遊體驗活動為期三天，參加者將有機會：

🌿 深入四萬十川流域——日本最後的清流，了解當地社區如何在保護河流生態的同時發展可持續漁業。

🏔️ 探訪山間有機農場，親手體驗傳統農耕技術，品嚐由當地食材製作的料理。

🌊 參與海岸清潔行動，與當地志願者一起清理沿海垃圾，學習海洋塑膠污染的現況與應對方案。

📜 獲得高知縣限定的可持續旅遊徽章，記錄你的環保貢獻。每枚徽章的收入將直接投入當地的環境教育項目。

活動結束後，參加者將獲頒數碼認證，記錄在個人旅遊護照中。我們相信，每一次負責任的旅行，都是為地球未來的一份投資。`,
        1: `高知县位于日本四国岛的南部，以其壮丽的自然风光和深厚的文化底蕴闻名。作为 STAR SDG 的旗舰合作地区之一，高知县致力于将旅游业与环境保护紧密结合。

本次生态旅游体验活动为期三天，参加者将有机会：

🌿 深入四万十川流域——日本最后的清流，了解当地社区如何在保护河流生态的同时发展可持续渔业。

🏔️ 探访山间有机农场，亲手体验传统农耕技术，品尝由当地食材制作的料理。

🌊 参与海岸清洁行动，与当地志愿者一起清理沿海垃圾，学习海洋塑料污染的现状与应对方案。

📜 获得高知县限定的可持续旅游徽章，记录你的环保贡献。每枚徽章的收入将直接投入当地的环境教育项目。

活动结束后，参加者将获颁数码认证，记录在个人旅游护照中。我们相信，每一次负责任的旅行，都是为地球未来的一份投资。`,
        2: `Kochi Prefecture, located on the southern coast of Shikoku Island, Japan, is renowned for its stunning natural landscapes and rich cultural heritage. As one of STAR SDG's flagship partner regions, Kochi is committed to integrating tourism with environmental conservation.

This three-day eco-tourism experience offers participants the opportunity to:

🌿 Explore the Shimanto River Basin — Japan's last pristine river — and learn how local communities balance sustainable fishing with river ecosystem preservation.

🏔️ Visit mountain organic farms, experience traditional farming techniques firsthand, and enjoy cuisine prepared with locally sourced ingredients.

🌊 Join coastal cleanup efforts alongside local volunteers, clearing shoreline debris and learning about the current state of marine plastic pollution and solutions.

📜 Earn a Kochi Prefecture exclusive sustainable tourism badge, recording your environmental contribution. Revenue from each badge is directly invested in local environmental education programs.

After the event, participants receive a digital certificate recorded in their personal travel passport. We believe every responsible journey is an investment in our planet's future.`,
        3: `高知県は日本の四国島南部に位置し、壮大な自然景観と豊かな文化遺産で知られています。STAR SDGの旗艦パートナー地域の一つとして、高知県は観光と環境保護の融合に取り組んでいます。

この3日間のエコツーリズム体験では、参加者に以下の機会が提供されます：

🌿 四万十川流域の探索——日本最後の清流で、地域コミュニティが持続可能な漁業と河川生態系の保護をどのように両立させているかを学びます。

🏔️ 山間の有機農場を訪問し、伝統的な農業技術を体験し、地元食材で作られた料理を味わいます。

🌊 地元のボランティアと共に海岸清掃活動に参加し、海洋プラスチック汚染の現状と対策について学びます。

📜 高知県限定の持続可能な観光バッジを獲得し、あなたの環境貢献を記録します。各バッジの収益は地元の環境教育プログラムに直接投資されます。

イベント終了後、参加者にはデジタル認証が授与され、個人のトラベルパスポートに記録されます。`
      },
      date: '2025-11-15',
      image: eventKochi,
    },
    {
      titleKey: { 0: '永續旅遊論壇 2025', 1: '可持续旅游论坛 2025', 2: 'Sustainable Tourism Forum 2025', 3: '持続可能な観光フォーラム2025' },
      descKey: { 0: '匯集全球旅遊業領袖、環保專家及社區代表，探討如何通過創新科技和數碼工具推動旅遊業的永續發展。', 1: '汇集全球旅游业领袖、环保专家及社区代表，探讨如何通过创新科技和数码工具推动旅游业的可持续发展。', 2: 'Bringing together global tourism leaders, environmental experts and community representatives to explore how innovation and digital tools can drive sustainable tourism.', 3: '世界の観光リーダー、環境専門家、コミュニティ代表が集まり、イノベーションとデジタルツールが持続可能な観光をどう推進できるか探ります。' },
      articleKey: {
        0: `「永續旅遊論壇 2025」是 STAR SDG 年度最重要的旗艦活動，今年將在香港會議展覽中心舉行。論壇邀請了來自超過 30 個國家和地區的演講嘉賓，涵蓋政府官員、旅遊業巨頭、環保組織代表和科技創業者。

論壇主要議題包括：

🎯 數碼轉型與永續旅遊：如何利用區塊鏈、AI 和物聯網技術追蹤旅遊業的碳足跡，並為旅客提供透明的環保數據。

🌍 社區參與模式：成功案例分享——從日本高知縣到印尼巴厘島，當地社區如何從旅遊業中受益同時保護文化和自然資源。

💡 綠色認證標準：探討建立全球統一的可持續旅遊認證體系，讓旅客更容易辨識真正負責任的旅遊產品。

🤝 公私營合作：政府和企業如何攜手推動永續旅遊政策，創造經濟價值的同時保護環境。

論壇期間還將發佈最新的「亞太區可持續旅遊指數報告」，為業界提供數據驅動的決策參考。所有與會者將獲得論壇限定版徽章。`,
        1: `「可持续旅游论坛 2025」是 STAR SDG 年度最重要的旗舰活动，今年将在香港会议展览中心举行。论坛邀请了来自超过 30 个国家和地区的演讲嘉宾，涵盖政府官员、旅游业巨头、环保组织代表和科技创业者。

论坛主要议题包括：

🎯 数码转型与可持续旅游：如何利用区块链、AI 和物联网技术追踪旅游业的碳足迹，并为旅客提供透明的环保数据。

🌍 社区参与模式：成功案例分享——从日本高知县到印尼巴厘岛，当地社区如何从旅游业中受益同时保护文化和自然资源。

💡 绿色认证标准：探讨建立全球统一的可持续旅游认证体系，让旅客更容易辨识真正负责任的旅游产品。

🤝 公私营合作：政府和企业如何携手推动可持续旅游政策，创造经济价值的同时保护环境。

论坛期间还将发布最新的「亚太区可持续旅游指数报告」，为业界提供数据驱动的决策参考。所有与会者将获得论坛限定版徽章。`,
        2: `The "Sustainable Tourism Forum 2025" is STAR SDG's most important annual flagship event, to be held this year at the Hong Kong Convention and Exhibition Centre. The forum has invited speakers from over 30 countries and regions, including government officials, tourism industry leaders, environmental organization representatives, and tech entrepreneurs.

Key topics include:

🎯 Digital Transformation & Sustainable Tourism: How blockchain, AI, and IoT technologies can track the tourism industry's carbon footprint and provide travelers with transparent environmental data.

🌍 Community Engagement Models: Success story sharing — from Kochi, Japan to Bali, Indonesia — how local communities benefit from tourism while protecting cultural and natural resources.

💡 Green Certification Standards: Exploring the establishment of a globally unified sustainable tourism certification system, making it easier for travelers to identify truly responsible tourism products.

🤝 Public-Private Partnerships: How governments and businesses can work together to promote sustainable tourism policies, creating economic value while protecting the environment.

During the forum, the latest "Asia-Pacific Sustainable Tourism Index Report" will be released, providing data-driven decision-making references for the industry. All attendees will receive a forum exclusive limited edition badge.`,
        3: `「持続可能な観光フォーラム2025」は、STAR SDGの年間最重要フラッグシップイベントで、今年は香港コンベンション＆エキシビションセンターで開催されます。30以上の国と地域からスピーカーを招き、政府関係者、観光業界のリーダー、環境団体代表、テック起業家が参加します。

主要議題：

🎯 デジタルトランスフォーメーションと持続可能な観光：ブロックチェーン、AI、IoT技術で観光業のカーボンフットプリントを追跡し、旅行者に透明な環境データを提供する方法。

🌍 コミュニティ参加モデル：日本の高知県からインドネシアのバリ島まで、地域コミュニティが文化と自然資源を保護しながら観光業から利益を得る成功事例の共有。

💡 グリーン認証基準：グローバルに統一された持続可能な観光認証システムの確立を探り、旅行者が真に責任ある観光商品を識別しやすくする。

🤝 官民連携：政府と企業が連携して持続可能な観光政策を推進し、環境を保護しながら経済的価値を創出する方法。

フォーラム期間中、最新の「アジア太平洋持続可能な観光指数レポート」が発表されます。すべての参加者にフォーラム限定版バッジが贈呈されます。`
      },
      date: '2025-09-20',
      image: eventForum,
    },
    {
      titleKey: { 0: '社區植樹活動', 1: '社区植树活动', 2: 'Community Tree Planting', 3: 'コミュニティ植樹活動' },
      descKey: { 0: '在當地社區舉辦植樹活動，與居民一起為環境保護出一分力。活動同時教育參加者關於碳中和和氣候變化的知識。', 1: '在当地社区举办植树活动，与居民一起为环境保护出一分力。活动同时教育参加者关于碳中和和气候变化的知识。', 2: 'Organizing tree planting events in local communities, working with residents to contribute to environmental protection while educating participants about carbon neutrality and climate change.', 3: '地域コミュニティで植樹イベントを開催し、住民と共に環境保護に貢献。カーボンニュートラルと気候変動について参加者を教育します。' },
      articleKey: {
        0: `STAR SDG 的社區植樹活動已連續舉辦三年，足跡遍及亞洲多個城市和鄉村地區。今年的活動將在世界環境日（6月5日）當天同步於五個地點展開。

活動亮點：

🌱 每位參加者將種植 3-5 棵本地原生樹種，由專業園藝師現場指導正確的種植技巧和後續護理方法。

📊 透過 STAR SDG 的碳計算工具，每位參加者可以即時查看自己種植的樹木預計在未來 20 年內能吸收多少二氧化碳。

🎓 活動現場設有互動教育工作坊，由氣候科學家講解全球暖化的最新數據，以及個人行動如何產生正面影響。

👨‍👩‍👧‍👦 特設親子區域，讓兒童通過遊戲和手工藝了解植物生態和環境保護的重要性。

🏅 所有參加者完成植樹後將獲得「綠色守護者」數碼徽章，記錄在個人旅遊護照中。累計參與三次以上活動的參加者還將獲得特別版限定徽章。

截至目前，STAR SDG 社區植樹活動已累計種植超過 15,000 棵樹木，參與人數超過 8,000 人次。`,
        1: `STAR SDG 的社区植树活动已连续举办三年，足迹遍及亚洲多个城市和乡村地区。今年的活动将在世界环境日（6月5日）当天同步于五个地点展开。

活动亮点：

🌱 每位参加者将种植 3-5 棵本地原生树种，由专业园艺师现场指导正确的种植技巧和后续护理方法。

📊 透过 STAR SDG 的碳计算工具，每位参加者可以即时查看自己种植的树木预计在未来 20 年内能吸收多少二氧化碳。

🎓 活动现场设有互动教育工作坊，由气候科学家讲解全球暖化的最新数据，以及个人行动如何产生正面影响。

👨‍👩‍👧‍👦 特设亲子区域，让儿童通过游戏和手工艺了解植物生态和环境保护的重要性。

🏅 所有参加者完成植树后将获得「绿色守护者」数码徽章，记录在个人旅游护照中。累计参与三次以上活动的参加者还将获得特别版限定徽章。

截至目前，STAR SDG 社区植树活动已累计种植超过 15,000 棵树木，参与人数超过 8,000 人次。`,
        2: `STAR SDG's Community Tree Planting event has been held for three consecutive years, with activities spanning multiple cities and rural areas across Asia. This year's event will launch simultaneously at five locations on World Environment Day (June 5th).

Event highlights:

🌱 Each participant will plant 3-5 native tree species, with professional horticulturists providing on-site guidance on proper planting techniques and ongoing care.

📊 Using STAR SDG's carbon calculation tool, each participant can instantly see how much CO₂ their planted trees are expected to absorb over the next 20 years.

🎓 Interactive educational workshops on-site feature climate scientists explaining the latest global warming data and how individual actions can make a positive impact.

👨‍👩‍👧‍👦 A dedicated family zone allows children to learn about plant ecology and the importance of environmental protection through games and crafts.

🏅 All participants who complete tree planting will receive a "Green Guardian" digital badge, recorded in their personal travel passport. Those who participate in three or more events will receive a special limited-edition badge.

To date, STAR SDG's community tree planting events have planted over 15,000 trees, with more than 8,000 participants.`,
        3: `STAR SDGのコミュニティ植樹活動は3年連続で開催され、アジア各地の都市や農村地域に活動の足跡を残しています。今年は世界環境デー（6月5日）に5つの会場で同時開催されます。

イベントのハイライト：

🌱 各参加者は3〜5本の在来樹種を植樹し、プロの園芸家が正しい植樹技術とアフターケアを現場で指導します。

📊 STAR SDGのカーボン計算ツールにより、参加者は自分が植えた木が今後20年間で吸収するCO₂量をリアルタイムで確認できます。

🎓 気候科学者による最新の地球温暖化データと個人の行動がいかにポジティブな影響を与えるかを説明するインタラクティブな教育ワークショップを現場で開催。

👨‍👩‍👧‍👦 ファミリーゾーンでは、ゲームや工芸を通じて子どもたちが植物の生態系と環境保護の重要性を学びます。

🏅 植樹を完了した全参加者に「グリーンガーディアン」デジタルバッジが授与され、個人のトラベルパスポートに記録されます。3回以上参加した方には特別限定版バッジが贈呈されます。

これまでにSTAR SDGのコミュニティ植樹活動は15,000本以上の木を植え、8,000人以上が参加しています。`
      },
      date: '2025-06-05',
      image: eventTree,
    },
    {
      titleKey: { 0: '海洋保育徽章發佈', 1: '海洋保育徽章发布', 2: 'Marine Conservation Badge Launch', 3: '海洋保全バッジ発表' },
      descKey: { 0: '正式發佈海洋保育主題徽章，與多個海洋保護組織合作，將徽章收入的 70% 用於支持珊瑚礁修復和海洋清潔項目。', 1: '正式发布海洋保育主题徽章，与多个海洋保护组织合作，将徽章收入的 70% 用于支持珊瑚礁修复和海洋清洁项目。', 2: 'Official launch of marine conservation themed badges, partnering with ocean protection organisations. 70% of badge proceeds support coral reef restoration and ocean cleanup projects.', 3: '海洋保全テーマのバッジを正式に発表。海洋保護団体と提携し、バッジ収益の70%をサンゴ礁修復と海洋清掃プロジェクトに充てます。' },
      articleKey: {
        0: `在世界水日（3月22日），STAR SDG 正式發佈全新的海洋保育主題徽章系列。這是我們與三個國際海洋保護組織——海洋守護者協會、珊瑚三角倡議組織和太平洋清潔聯盟——共同合作的成果。

徽章系列詳情：

🐠 「珊瑚守護者」徽章：收入的 70% 將用於東南亞地區的珊瑚礁修復項目，包括人工珊瑚苗床建設和海水質量監測。

🐋 「海洋使者」徽章：支持鯨魚和海豚的保護研究，資助衛星追蹤設備和海洋噪音污染研究。

🦀 「海岸衛士」徽章：資助定期海岸清潔活動和海洋垃圾數據庫建設，幫助科學家追蹤海洋塑膠污染的源頭。

每枚徽章都附有獨特的追蹤編號，持有者可以在 STAR SDG 平台上實時查看自己的捐款如何被使用，以及所支持項目的最新進展。

發佈活動當天，我們在香港、東京、曼谷和雅加達四個城市同步舉行了海灘清潔活動，共有超過 2,000 名志願者參與，清理了超過 5 噸海洋垃圾。`,
        1: `在世界水日（3月22日），STAR SDG 正式发布全新的海洋保育主题徽章系列。这是我们与三个国际海洋保护组织——海洋守护者协会、珊瑚三角倡议组织和太平洋清洁联盟——共同合作的成果。

徽章系列详情：

🐠 「珊瑚守护者」徽章：收入的 70% 将用于东南亚地区的珊瑚礁修复项目，包括人工珊瑚苗床建设和海水质量监测。

🐋 「海洋使者」徽章：支持鲸鱼和海豚的保护研究，资助卫星追踪设备和海洋噪音污染研究。

🦀 「海岸卫士」徽章：资助定期海岸清洁活动和海洋垃圾数据库建设，帮助科学家追踪海洋塑料污染的源头。

每枚徽章都附有独特的追踪编号，持有者可以在 STAR SDG 平台上实时查看自己的捐款如何被使用，以及所支持项目的最新进展。

发布活动当天，我们在香港、东京、曼谷和雅加达四个城市同步举行了海滩清洁活动，共有超过 2,000 名志愿者参与，清理了超过 5 吨海洋垃圾。`,
        2: `On World Water Day (March 22nd), STAR SDG officially launched a brand new marine conservation themed badge series. This is the result of our collaboration with three international ocean protection organizations — the Ocean Guardians Association, the Coral Triangle Initiative, and the Pacific Cleanup Alliance.

Badge series details:

🐠 "Coral Guardian" Badge: 70% of proceeds fund coral reef restoration projects in Southeast Asia, including artificial coral nursery construction and seawater quality monitoring.

🐋 "Ocean Ambassador" Badge: Supports whale and dolphin conservation research, funding satellite tracking equipment and ocean noise pollution studies.

🦀 "Coast Defender" Badge: Funds regular coastal cleanup activities and marine debris database development, helping scientists trace the sources of marine plastic pollution.

Each badge comes with a unique tracking number, allowing holders to view in real-time on the STAR SDG platform how their donations are being used and the latest progress of supported projects.

On the launch day, we held simultaneous beach cleanup events in four cities — Hong Kong, Tokyo, Bangkok, and Jakarta — with over 2,000 volunteers participating and clearing more than 5 tonnes of marine debris.`,
        3: `世界水の日（3月22日）に、STAR SDGは海洋保全テーマの新しいバッジシリーズを正式に発表しました。これは3つの国際海洋保護団体——オーシャンガーディアンズ協会、コーラルトライアングルイニシアチブ、パシフィッククリーンアップアライアンス——との共同成果です。

バッジシリーズの詳細：

🐠 「コーラルガーディアン」バッジ：収益の70%が東南アジアのサンゴ礁修復プロジェクトに充てられ、人工サンゴ苗床の建設と海水品質モニタリングを含みます。

🐋 「オーシャンアンバサダー」バッジ：クジラとイルカの保護研究を支援し、衛星追跡機器と海洋騒音汚染の研究に資金を提供します。

🦀 「コーストディフェンダー」バッジ：定期的な海岸清掃活動と海洋ゴミデータベースの構築に資金を提供し、科学者が海洋プラスチック汚染の発生源を追跡するのを支援します。

各バッジには固有の追跡番号が付いており、所有者はSTAR SDGプラットフォーム上で寄付金の使途と支援プロジェクトの最新の進捗状況をリアルタイムで確認できます。

発表当日、香港、東京、バンコク、ジャカルタの4都市で同時にビーチクリーンアップイベントが開催され、2,000人以上のボランティアが参加し、5トン以上の海洋ゴミを回収しました。`
      },
      date: '2025-03-22',
      image: eventMarine,
    },
  ];

  return (
    <div>
      {/* Hero with background */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img src={eventsHero} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/40 to-background" />
        </div>
        <div className="max-w-4xl mx-auto px-4 py-20 text-center relative">
          <h1 className="text-foreground text-4xl font-bold mb-4 drop-shadow-lg">
            {t({ 0: '活動與資訊', 1: '活动与资讯', 2: 'Events & Activities', 3: 'イベントと活動' })}
          </h1>
          <p className="text-foreground/80 text-lg drop-shadow">
            {t({ 0: '了解我們過去和即將舉辦的活動', 1: '了解我们过去和即将举办的活动', 2: 'Discover our past and upcoming events', 3: '過去および今後のイベントをご覧ください' })}
          </p>
        </div>
      </section>

      {/* Events list */}
      <section className="max-w-4xl mx-auto px-4 py-12 space-y-6">
        {events.map((event, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => setSelectedEvent(i)}
          >
            <div className="flex flex-col md:flex-row">
              <div className="w-full md:w-64 h-48 md:h-auto overflow-hidden shrink-0">
                <img src={event.image} alt="" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-5 flex-1">
                <p className="text-primary text-xs font-medium mb-1">{event.date}</p>
                <h3 className="text-foreground font-bold text-lg mb-2">{t(event.titleKey)}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{t(event.descKey)}</p>
                <span className="inline-block mt-3 text-primary text-sm font-medium">
                  {t({ 0: '閱讀更多 →', 1: '阅读更多 →', 2: 'Read more →', 3: '続きを読む →' })}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </section>

      {/* Article Modal */}
      <AnimatePresence>
        {selectedEvent !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-start justify-center overflow-y-auto p-4 pt-8 pb-8"
            onClick={() => setSelectedEvent(null)}
          >
            <motion.article
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 40 }}
              transition={{ duration: 0.3 }}
              className="bg-card rounded-2xl border border-border shadow-xl max-w-3xl w-full my-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative h-64 md:h-80 overflow-hidden rounded-t-2xl">
                <img src={events[selectedEvent].image} alt="" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
                <button
                  onClick={() => setSelectedEvent(null)}
                  className="absolute top-4 right-4 bg-background/70 backdrop-blur-sm rounded-full p-2 text-foreground hover:bg-background transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="p-6 md:p-8">
                <p className="text-primary text-sm font-medium mb-2">{events[selectedEvent].date}</p>
                <h2 className="text-foreground text-2xl md:text-3xl font-bold mb-6">
                  {t(events[selectedEvent].titleKey)}
                </h2>
                <div className="text-muted-foreground leading-relaxed whitespace-pre-line text-base">
                  {t(events[selectedEvent].articleKey)}
                </div>
              </div>
            </motion.article>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
