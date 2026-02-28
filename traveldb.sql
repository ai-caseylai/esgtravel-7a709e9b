-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Feb 10, 2026 at 11:23 AM
-- Server version: 10.2.38-MariaDB
-- PHP Version: 7.2.34

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `traveldb`
--

-- --------------------------------------------------------

--
-- Table structure for table `agentmaster`
--

CREATE TABLE `agentmaster` (
  `uid` int(10) NOT NULL,
  `agent_id` varchar(256) COLLATE utf8mb4_unicode_ci NOT NULL,
  `company_id` varchar(256) COLLATE utf8mb4_unicode_ci NOT NULL,
  `contactname` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `countrycode` varchar(3) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '0',
  `mobile` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `usertype` int(1) NOT NULL DEFAULT 0 COMMENT '0=agent, 1=company, 2=admin',
  `status` int(1) NOT NULL DEFAULT 1 COMMENT '0=inactive, 1=active',
  `hashcode` varchar(256) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `otpcode` varchar(6) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `otpcounter` int(1) NOT NULL DEFAULT 0,
  `otptime` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '0',
  `recordtime` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `agentmaster`
--

INSERT INTO `agentmaster` (`uid`, `agent_id`, `company_id`, `contactname`, `countrycode`, `mobile`, `email`, `usertype`, `status`, `hashcode`, `otpcode`, `otpcounter`, `otptime`, `recordtime`) VALUES
(1, '55599c46-2963-11ef-ac37-0a186f7be03d', 'ff50dbc5-247f-11ef-ac37-0a186f7be03d', 'Devil23', '852', '97338198', 'deviltse34@gmail.com', 1, 1, '-4015674399130795583', '', 0, '1720085598', '2024-06-28 11:03:07'),
(2, '55599c46-2963-11ef-ac37-0a186f7be031', 'ff50dbc5-247f-11ef-ac37-0a186f7be03d', 'May', '852', '97338194', 'deviltse1@gmail.com', 2, 1, '', '', 0, '', '2024-06-28 11:03:07'),
(4, '55599c46-2963-11ef-ac37-0a186f7be032', 'ff50dbc5-247f-11ef-ac37-0a186f7be03d', 'Peter', '852', '97338193', 'deviltse2@gmail.com', 2, 1, '', '', 0, '', '2024-06-28 11:03:07'),
(5, '4397cfe6-3446-11ef-ac37-0a186f7be03d', 'ff50dbc5-247f-11ef-ac37-0a186f7be03d', 'devildevil', '852', '98769876', 'devil@devil222.com', 0, 0, NULL, NULL, 0, '0', '2024-06-28 11:03:07'),
(7, 'cd99a0ff-3501-11ef-ac37-0a186f7be03d', 'ff50dbc5-247f-11ef-ac37-0a186f7be03d', 'test', '852', '97338192', 'deviltse33@gmail.com', 0, 0, NULL, NULL, 0, '0', '2024-06-28 11:52:13'),
(8, 'e0d7d507-3501-11ef-ac37-0a186f7be03d', 'ff50dbc5-247f-11ef-ac37-0a186f7be03d', 'test2', '852', '97338191', 'deviltse44@gmail.com', 0, 0, NULL, NULL, 0, '0', '2024-06-28 11:52:45'),
(14, '0f2dde79-38e5-11ef-ac37-0a186f7be03d', 'ff50dbc5-247f-11ef-ac37-0a186f7be03d', 'abc', '852', '97979797', 'devil22@gmail.com', 0, 1, NULL, NULL, 0, '0', '2024-07-03 10:36:32');

-- --------------------------------------------------------

--
-- Table structure for table `badgeinfo`
--

CREATE TABLE `badgeinfo` (
  `badgeinfo_id` int(11) NOT NULL,
  `showmore` varchar(1000) NOT NULL,
  `homeheader` varchar(50) NOT NULL,
  `badge_id` int(10) NOT NULL,
  `header` varchar(100) DEFAULT NULL,
  `title` varchar(100) DEFAULT NULL,
  `content` text DEFAULT NULL,
  `details` text DEFAULT NULL,
  `mapinfo` text DEFAULT NULL,
  `summary` text DEFAULT NULL,
  `impact` text DEFAULT NULL,
  `impactrecord` varchar(10240) DEFAULT NULL,
  `lang` int(10) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `badgeinfo`
--

INSERT INTO `badgeinfo` (`badgeinfo_id`, `showmore`, `homeheader`, `badge_id`, `header`, `title`, `content`, `details`, `mapinfo`, `summary`, `impact`, `impactrecord`, `lang`) VALUES
(1, '帛琉（又稱：帕勞）是位於西太平洋的島國。全國有約340座島嶼，是一個擁有豐富海洋資源的國家。', '帛琉', 1, 'Minted on Polygon view on polygonscan', '帛琉可持續旅遊大使', '聯合國永續發展目標（Sustainable Development Goals, SDGs）是2015年由193個國家共同通過的全球行動框架，涵蓋17項核心目標與169項具體指標，旨在2030年前消除貧窮、保護地球環境並促進人類繁榮。SDGs以「不遺落任何人」為核心精神，整合「環境、社會、經濟」三大永續支柱，涵蓋氣候行動、消除飢餓、教育平權、性別平等、責任消費等跨領域議題，為政府、企業與公民社會提供明確的行動藍圖。\nSDGs突破傳統發展思維，強調「全球問題需在地解決」，STAR ( Sustainable Travel Ambassador Reward) 希望透過推廣「負責任使用者」的模式，以引領更多的市民邁向更公平、韌性與永續的未來。', '<table>\n<tr>\n<td>\n <br>\n<text style=\"font-family: Arial, Verdana, Helvetica, sans-serif;\">\n旅客對地區的可持續性發展，有著深遠的影響。隨著世界對可持續發展的認識越深，在旅遊的同時為地區的保育工作上發揮一定的作用。參與可持續旅客計劃，購買一個電子襟章，為地區的保育、及可持續發展工作出一分力。\n</text>\n<br>\n</td>\n</tr>\n<tr>\n<td>\n\n\n</td>\n</tr>\n\n</table>', 'https://www.google.com/maps/@22.3657153,114.1313663,17z?entry=ttu', '\n<table>\n<tr>\n<td>\n <br>\n<text style=\"font-family: Arial, Verdana, Helvetica, sans-serif;\">\n透過購買電子，費用中的70%會投放於當地的可持續發展旅遊工作中，推動全面且對環境有善的旅遊，在環境保育工作上提供支援，減少地區政府在保育工作的壓力，同時旅客可以參與日漸流行的研學之旅，體驗公民科學家的工作，實現在旅遊同時可輕鬆地為可持續發展出一分力！\n</text>\n<br>\n</td>\n</tr>\n<tr>\n<td>\n\n\n</td>\n</tr>\n\n</table>', '\n<table>\n<tr>\n<td>\n<h1>影響領域</h1>\n</td>\n</tr>\n<tr>\n<td>\n <br>\n<text style=\"font-family: Arial, Verdana, Helvetica, sans-serif;\">\n全球暖化對島國的影響特別嚴重，水位上昇、酸雨、淡水資源被鹽化、珊瑚白化及生態被破壞等都會在島國中出現，這些情況都會對島國居民的健康及生命安全做成嚴重的影響。</text>\n<br>\n</td>\n</tr>\n</table>', '<table>\n<tr><td>\n	<br>記錄編號\n	<br>{0}\n</td></tr>\n<tr><td>\n	<br>這份表揚證書已頒發給\n	<br>{1}\n</td></tr>\n<tr><td>\n	<br>授權者\n	<br>帛琉旅遊局\n	<br>頒發日期：{2}\n</td></tr>\n\n</table>', 0),
(9, 'Palau is an island country located in the Western Pacific. There are about 340 islands and very rich in marine resources.', 'Palau', 1, 'Minted on Polygon view on polygonscan', 'Become Palau Sustainable Travel Ambassador', 'The United Nations Sustainable Development Goals (SDGs) are a global action framework adopted in 2015 by 193 countries. They encompass 17 core goals and 169 specific targets, aiming to eradicate poverty, protect the planet, and promote human prosperity by 2030. At the core value of the SDGs is the principle of “leaving no one behind,” integrating the three pillars of sustainability—environmental, social, and economic. The goals cover cross-cutting issues such as climate action, zero hunger, inclusive education, gender equality, and responsible consumption, providing a clear roadmap for governments, businesses, and civil society.\nThe SDGs break away from traditional development thinking by emphasizing that “global challenges require local solutions.” STAR (Sustainable Travel Ambassador) seeks to promote the concept of “responsible users,” inspiring more citizens to move toward a future that is fair, resilient, and sustainable.', '<table>\r\n<tr>\r\n<td>\r\n <br>\r\n<text style=\"font-family: Arial, Verdana, Helvetica, sans-serif;\">\r\nTravelers have a profound impact on the sustainable development of a region. As the world becomes more aware of sustainable development, it plays a certain role in regional conservation while traveling. Participate in the Sustainable Travelers Program and purchase an electronic badge to contribute to regional conservation and sustainable development.\r\n</text>\r\n<br>\r\n</td>\r\n</tr>\r\n<tr>\r\n<td>\r\n\r\n\r\n</td>\r\n</tr>\r\n\r\n</table>', 'https://www.google.com/maps/@22.3657153,114.1313663,17z?entry=ttu', '<table>\r\n<tr>\r\n<td>\r\n <br>\r\n<text style=\"font-family: Arial, Verdana, Helvetica, sans-serif;\">\r\nThrough the purchase of electronics, 70% of the cost will be invested in local sustainable development tourism, promoting comprehensive and environmentally friendly tourism, providing support in environmental conservation work, reducing the pressure on regional governments in conservation work, and at the same time Passengers can participate in the increasingly popular research tours and experience the work of citizen scientists, making it easy to contribute to sustainable development while traveling!\r\n</text>\r\n<br>\r\n</td>\r\n</tr>\r\n<tr>\r\n<td>\r\n\r\n\r\n</td>\r\n</tr>\r\n\r\n</table>', '<table>\r\n<tr>\r\n<td>\r\n<h1>Impact</h1>\r\n</td>\r\n</tr>\r\n<tr>\r\n<td>\r\n <br>\r\n<text style=\"font-family: Arial, Verdana, Helvetica, sans-serif;\">\r\nGlobal warming has a particularly serious impact on island countries. Rising water levels, acid rain, salinization of freshwater resources, coral bleaching and ecological destruction will all occur in island countries. These conditions will have a serious impact on the health and life safety of island country residents.</text>\r\n<br>\r\n</td>\r\n</tr>\r\n</table>', '<table>\r\n<tr><td>\r\n	<br>Impact Record\r\n	<br>{0}\r\n</td></tr>\r\n<tr><td>\r\n	<br>This appreciotion cerlificate has beenorwardedl to\r\n	<br>{1}\r\n</td></tr>\r\n<tr><td>\r\n	<br>Authorizer\r\n	<br>Palau Tourism Board\r\n	<br>Delivered on：{2}\r\n</td></tr>\r\n\r\n</table>', 1),
(10, 'パラオは西太平洋に位置する島国です。国内には約340の島があり、海洋資源が豊富な国です。', '帛琉', 1, 'Minted on Polygon view on polygonscan', 'パラオ持続可能な観光大使', '旅行者は地域の持続可能な発展に大きな影響を与えます。世界が持続可能な開発への意識を高めるにつれ、旅行中の地域保全において一定の役割を果たしています。持続可能な訪問者プログラムに参加し、電子バッジを購入して、地域の保全と持続可能な開発に貢献しましょう。', '<table>\r\n<tr>\r\n<td>\r\n <br>\r\n<text style=\"font-family: Arial, Verdana, Helvetica, sans-serif;\">\r\n旅行者は地域の持続可能な発展に大きな影響を与えます。世界が持続可能な開発への意識を高めるにつれ、旅行中の地域保全において一定の役割を果たしています。持続可能な訪問者プログラムに参加し、電子バッジを購入して、地域の保全と持続可能な開発に貢献しましょう。\r\n</text>\r\n<br>\r\n</td>\r\n</tr>\r\n<tr>\r\n<td>\r\n\r\n\r\n</td>\r\n</tr>\r\n\r\n</table>', 'https://www.google.com/maps/@22.3657153,114.1313663,17z?entry=ttu', '<table>\r\n<tr>\r\n<td>\r\n <br>\r\n<text style=\"font-family: Arial, Verdana, Helvetica, sans-serif;\">\r\n電子機器の購入を通じて、費用の70％が地域の持続可能な開発観光に投資され、包括的で環境に優しい観光を促進し、環境保全活動への支援を提供し、保全活動における地方政府へのプレッシャーを軽減し、同時に乗客の負担を軽減します。人気が高まっている調査ツアーに参加し、市民科学者の活動を体験することで、旅行中に簡単に持続可能な開発に貢献できます。\r\n</text>\r\n<br>\r\n</td>\r\n</tr>\r\n<tr>\r\n<td>\r\n\r\n\r\n</td>\r\n</tr>\r\n\r\n</table>', '<table>\n<tr>\n<td>\n<h1>影響力のある地域</h1>\n</td>\n</tr>\n<tr>\n<td>\n <br>\n<text style=\"font-family: Arial, Verdana, Helvetica, sans-serif;\">\n地球温暖化は島嶼国に特に深刻な影響を及ぼし、水位の上昇、酸性雨、淡水資源の塩類化、サンゴの白化、生態系の破壊はすべて島嶼国の健康と生命の安全に深刻な影響を及ぼします。田舎の住民。</text>\n<br>\n</td>\n</tr>\n</table>', '<table>\r\n<tr><td>\r\n	<br>記録番号\r\n	<br>{0}\r\n</td></tr>\r\n<tr><td>\r\n	<br>この感謝状は\r\n	<br>{1}\r\n</td></tr>\r\n<tr><td>\r\n	<br>認証者\r\n	<br>帛琉旅遊局\r\n	<br>授与日：{2}\r\n</td></tr>\r\n\r\n</table>', 2),
(11, '沙巴，位於婆羅洲島北部，屬東馬來西亞，是馬來西亞境內的第二大州，而婆羅洲又是世界第三大島。沙巴享有風下之鄉之美譽（Land Below The Wind），皆因是沙巴的位置在颱風形成區域以南，因而沒有颱風會路經此地。\n\n沙巴洲三面環海，並擁有豐富的雨林，生態資源極奇豐富，無論是高山、雨林、河流、濕地及珊瑚礁等都可一一在這片土地中發現。隨此以外，豐富的人民文化亦在沙巴中衍生，所以長久以來，都是可持續旅遊的熱門之地。\n', '亞庇市濕地', 2, 'Minted on Polygon view on polygonscan', '沙巴可持續旅遊大使', '聯合國永續發展目標（Sustainable Development Goals, SDGs）是2015年由193個國家共同通過的全球行動框架，涵蓋17項核心目標與169項具體指標，旨在2030年前消除貧窮、保護地球環境並促進人類繁榮。SDGs以「不遺落任何人」為核心精神，整合「環境、社會、經濟」三大永續支柱，涵蓋氣候行動、消除飢餓、教育平權、性別平等、責任消費等跨領域議題，為政府、企業與公民社會提供明確的行動藍圖。\nSDGs突破傳統發展思維，強調「全球問題需在地解決」，STAR ( Sustainable Travel Ambassador Reward) 希望透過推廣「負責任使用者」的模式，以引領更多的市民邁向更公平、韌性與永續的未來。', '<table>\n<tr>\n<td>\n <br>\n<text style=\"font-family: Arial, Verdana, Helvetica, sans-serif;\">\n沙巴，位於婆羅洲島北部，屬東馬來西亞，是馬來西亞境內的第二大州，而婆羅洲又是世界第三大島。沙巴享有風下之鄉之美譽（Land Below The Wind），皆因是沙巴的位置在颱風形成區域以南，因而沒有颱風會路經此地。\n\n沙巴洲三面環海，並擁有豐富的雨林，生態資源極奇豐富，無論是高山、雨林、河流、濕地及珊瑚礁等都可一一在這片土地中發現。隨此以外，豐富的人民文化亦在沙巴中衍生，所以長久以來，都是可持續旅遊的熱門之地。\n\n</text>\n<br>\n</td>\n</tr>\n<tr>\n<td>\n\n\n</td>\n</tr>\n\n</table>', 'https://www.google.com/maps/@22.3657153,114.1313663,17z?entry=ttu', '<table>\n<tr>\n<td>\n <br>\n<text style=\"font-family: Arial, Verdana, Helvetica, sans-serif;\">\n亞庇市濕地是一處位於馬來西亞的濕地，佔地24公頃，在2016年12月，哥打京那巴魯濕地被認證為濕地公約的註冊濕地。在這濕地保護區中，能找到9種紅樹及數十種鳥與十多種甲殼類生物。\n</text>\n<br>\n</td>\n</tr>\n<tr>\n<td>\n\n\n</td>\n</tr>\n\n</table>\n', '<table>\r\n<tr>\r\n<td>\r\n<h1>影響領域</h1>\r\n</td>\r\n</tr>\r\n<tr>\r\n<td>\r\n <br>\r\n<text style=\"font-family: Arial, Verdana, Helvetica, sans-serif;\">\r\n亞庇市濕地是一處位於馬來西亞的濕地，佔地24公頃，在2016年12月，哥打京那巴魯濕地被認證為濕地公約的註冊濕地。在這濕地保護區中，能找到9種紅樹及數十種鳥與十多種甲殼類生物。</text>\r\n<br>\r\n</td>\r\n</tr>\r\n</table>', '<table>\r\n<tr><td>\r\n	<br>記錄編號\r\n	<br>{0}\r\n</td></tr>\r\n<tr><td>\r\n	<br>這份表揚證書已頒發給\r\n	<br>{1}\r\n</td></tr>\r\n<tr><td>\r\n	<br>授權者\r\n	<br>沙巴旅遊局\r\n	<br>頒發日期：{2}\r\n</td></tr>\r\n\r\n</table>', 0),
(12, '\nSabah, located in the northern part of Borneo Island, belongs to East Malaysia. It is the second largest state in Malaysia, and Borneo is the third largest island in the world. Sabah is known as the Land Below The Wind because Sabah is located south of the typhoon formation area, so no typhoons will pass through it.\n\nSabah is surrounded by the sea on three sides and has rich rainforests. It is extremely rich in ecological resources. Whether it is mountains, rainforests, rivers, wetlands, coral reefs, etc., they can all be found in this land. In addition, the rich culture of the people is also derived from Sabah, so it has long been a popular place for sustainable tourism.', 'Badge (Wetland)', 2, 'Minted on Polygon view on polygonscan', 'Become Sabah Sustainable Travel Ambassador', 'The United Nations Sustainable Development Goals (SDGs) are a global action framework adopted in 2015 by 193 countries. They encompass 17 core goals and 169 specific targets, aiming to eradicate poverty, protect the planet, and promote human prosperity by 2030. At the core value of the SDGs is the principle of “leaving no one behind,” integrating the three pillars of sustainability—environmental, social, and economic. The goals cover cross-cutting issues such as climate action, zero hunger, inclusive education, gender equality, and responsible consumption, providing a clear roadmap for governments, businesses, and civil society.\nThe SDGs break away from traditional development thinking by emphasizing that “global challenges require local solutions.” STAR (Sustainable Travel Ambassador) seeks to promote the concept of “responsible users,” inspiring more citizens to move toward a future that is fair, resilient, and sustainable.', '<table>\n<tr>\n<td>\n <br>\n<text style=\"font-family: Arial, Verdana, Helvetica, sans-serif;\">\nSabah, located in the northern part of Borneo Island, belongs to East Malaysia. It is the second largest state in Malaysia, and Borneo is the third largest island in the world. Sabah is known as the Land Below The Wind because Sabah is located south of the typhoon formation area, so no typhoons will pass through it.\n\nSabah is surrounded by the sea on three sides and has rich rainforests. It is extremely rich in ecological resources. Whether it is mountains, rainforests, rivers, wetlands, coral reefs, etc., they can all be found in this land. In addition, the rich culture of the people is also derived from Sabah, so it has long been a popular place for sustainable tourism.\n</text>\n<br>\n</td>\n</tr>\n<tr>\n<td>\n\n\n</td>\n</tr>\n\n</table>', 'https://www.google.com/maps/@22.3657153,114.1313663,17z?entry=ttu', '<table>\n<tr>\n<td>\n <br>\n<text style=\"font-family: Arial, Verdana, Helvetica, sans-serif;\">\nAbout Kota Kinabalu Wetland\nThe Kota Kinabalu Wetland is a wetland located in Malaysia, covering an area of ​​24 hectares. In December 2016, the Kota Kinabalu Wetland was certified as a registered wetland under the Ramsar Convention. In this wetland reserve, you can find 9 species of mangroves, more than 50 of bird species, and more than 10 species of crustaceans.\n\n</text>\n<br>\n</td>\n</tr>\n<tr>\n<td>\n\n\n</td>\n</tr>\n\n</table>', '<table>\n<tr>\n<td>\n<h1>Impact</h1>\n</td>\n</tr>\n<tr>\n<td>\n <br>\n<text style=\"font-family: Arial, Verdana, Helvetica, sans-serif;\">\nAbout Kota Kinabalu Wetland\nThe Kota Kinabalu Wetland is a wetland located in Malaysia, covering an area of 24 hectares. In December 2016, the Kota Kinabalu Wetland was certified as a registered wetland under the Ramsar Convention. In this wetland reserve, you can find 9 species of mangroves, more than 50 of bird species, and more than 10 species of crustaceans.\n</text>\n<br>\n</td>\n</tr>\n</table>', '<table>\n<tr><td>\n	<br>Impact Record\n	<br>{0}\n</td></tr>\n<tr><td>\n	<br>This appreciotion cerlificate has beenorwardedl to\n	<br>{1}\n</td></tr>\n<tr><td>\n	<br>Authorizer\n	<br>Palau Tourism Board\n	<br>Delivered on：{2}\n</td></tr>\n\n</table>', 1),
(13, 'サバ州はボルネオ島の北部に位置し、東マレーシアに属し、マレーシアで2番目に大きな州であり、ボルネオ島は世界で3番目に大きい島です。サバ州は台風発生地域の南に位置するため、台風が通過しないため、「風の下の国」として知られています。\r\n\r\nサバ州は三方を海に囲まれ、豊かな熱帯雨林があり、山、熱帯雨林、川、湿地、サンゴ礁などの生態資源が非常に豊富です。また、サバ州には豊かな人々の文化も根付いており、持続可能な観光地としても古くから人気があります。', 'コタキナバル市湿地', 2, 'Minted on Polygon view on polygonscan', 'サバ州持続可能な観光大使', '旅行者は地域の持続可能な発展に大きな影響を与えます。世界が持続可能な開発への意識を高めるにつれ、旅行中の地域保全において一定の役割を果たしています。持続可能な訪問者プログラムに参加し、電子バッジを購入して、地域の保全と持続可能な開発に貢献しましょう。', '<table>\n<tr>\n<td>\n <br>\n<text style=\"font-family: Arial, Verdana, Helvetica, sans-serif;\">\nサバ州はボルネオ島の北部に位置し、東マレーシアに属し、マレーシアで2番目に大きな州であり、ボルネオ島は世界で3番目に大きい島です。サバ州は台風発生地域の南に位置するため、台風が通過しないため、「風の下の国」として知られています。\n\nサバ州は三方を海に囲まれ、豊かな熱帯雨林があり、山、熱帯雨林、川、湿地、サンゴ礁などの生態資源が非常に豊富です。また、サバ州には豊かな人々の文化も根付いており、持続可能な観光地としても古くから人気があります。\n<br>\n</td>\n</tr>\n<tr>\n<td>\n\n\n</td>\n</tr>\n\n</table>\n\n', 'https://www.google.com/maps/@22.3657153,114.1313663,17z?entry=ttu', '<table>\n<tr>\n<td>\n <br>\n<text style=\"font-family: Arial, Verdana, Helvetica, sans-serif;\">\n湿地センターについて\nコタキナバル湿地はマレーシアにある24ヘクタールの湿地で、2016年12月にラムサール条約の登録湿地に認定されました。この湿地保護区では、9 種のマングローブ、数十種の鳥類、10 種以上の甲殻類が生息しています。\n</text>\n<br>\n</td>\n</tr>\n<tr>\n<td>\n\n\n</td>\n</tr>\n\n</table>', '<table>\n<tr>\n<td>\n<h1>影響力のある地域</h1>\n</td>\n</tr>\n<tr>\n<td>\n <br>\n<text style=\"font-family: Arial, Verdana, Helvetica, sans-serif;\">\nコタキナバル湿地はマレーシアにある24ヘクタールの湿地で、2016年12月にラムサール条約の登録湿地に認定されました。この湿地保護区では、9 種のマングローブ、数十種の鳥類、10 種以上の甲殻類が生息しています。</text>\n<br>\n</td>\n</tr>\n</table>', '<table>\r\n<tr><td>\r\n	<br>記録番号\r\n	<br>{0}\r\n</td></tr>\r\n<tr><td>\r\n	<br>この感謝状は\r\n	<br>{1}\r\n</td></tr>\r\n<tr><td>\r\n	<br>認証者\r\n	<br>サバ州旅遊局\r\n	<br>授与日：{2}\r\n</td></tr>\r\n\r\n</table>', 2),
(14, '沙巴，位於婆羅洲島北部，屬東馬來西亞，是馬來西亞境內的第二大州，而婆羅洲又是世界第三大島。沙巴享有風下之鄉之美譽（Land Below The Wind），皆因是沙巴的位置在颱風形成區域以南，因而沒有颱風會路經此地。\r\n\r\n沙巴洲三面環海，並擁有豐富的雨林，生態資源極奇豐富，無論是高山、雨林、河流、濕地及珊瑚礁等都可一一在這片土地中發現。隨此以外，豐富的人民文化亦在沙巴中衍生，所以長久以來，都是可持續旅遊的熱門之地。\r\n', '京那巴魯公園', 3, 'Minted on Polygon view on polygonscan', '沙巴可持續旅遊大使', '聯合國永續發展目標（Sustainable Development Goals, SDGs）是2015年由193個國家共同通過的全球行動框架，涵蓋17項核心目標與169項具體指標，旨在2030年前消除貧窮、保護地球環境並促進人類繁榮。SDGs以「不遺落任何人」為核心精神，整合「環境、社會、經濟」三大永續支柱，涵蓋氣候行動、消除飢餓、教育平權、性別平等、責任消費等跨領域議題，為政府、企業與公民社會提供明確的行動藍圖。\nSDGs突破傳統發展思維，強調「全球問題需在地解決」，STAR ( Sustainable Travel Ambassador Reward) 希望透過推廣「負責任使用者」的模式，以引領更多的市民邁向更公平、韌性與永續的未來。', '<table>\n<tr>\n<td>\n <br>\n<text style=\"font-family: Arial, Verdana, Helvetica, sans-serif;\">\n沙巴，位於婆羅洲島北部，屬東馬來西亞，是馬來西亞境內的第二大州，而婆羅洲又是世界第三大島。沙巴享有風下之鄉之美譽（Land Below The Wind），皆因是沙巴的位置在颱風形成區域以南，因而沒有颱風會路經此地。\n\n沙巴洲三面環海，並擁有豐富的雨林，生態資源極奇豐富，無論是高山、雨林、河流、濕地及珊瑚礁等都可一一在這片土地中發現。隨此以外，豐富的人民文化亦在沙巴中衍生，所以長久以來，都是可持續旅遊的熱門之地。\n\n</text>\n<br>\n</td>\n</tr>\n<tr>\n<td>\n\n\n</td>\n</tr>\n\n</table>', 'https://www.google.com/maps/@22.3657153,114.1313663,17z?entry=ttu', '<table>\n<tr>\n<td>\n <br>\n<text style=\"font-family: Arial, Verdana, Helvetica, sans-serif;\">\n關於京那巴魯公園\n京那巴魯公園 (Kinabalu Park) 位於婆羅洲島北端的沙巴州，以京那巴魯山 (4,095 m) 為主，它是喜馬拉雅山和新幾內亞之間的最高山峰。它的棲息地範圍非常廣泛，從茂密的熱帶低地和山地雨林到熱帶山地森林、亞高山森林和較高海拔的灌木叢。它被指定為東南亞植物多樣性中心，物種極其豐富，包括來自喜馬拉雅山、中國、澳洲、馬來西亞的植物群以及泛熱帶植物。\n\n\n</text>\n<br>\n</td>\n</tr>\n<tr>\n<td>\n\n\n</td>\n</tr>\n\n</table>', '<table>\r\n<tr>\r\n<td>\r\n<h1>影響領域</h1>\r\n</td>\r\n</tr>\r\n<tr>\r\n<td>\r\n <br>\r\n<text style=\"font-family: Arial, Verdana, Helvetica, sans-serif;\">\r\n京那巴魯公園 (Kinabalu Park) 位於婆羅洲島北端的沙巴州，以京那巴魯山 (4,095 m) 為主，它是喜馬拉雅山和新幾內亞之間的最高山峰。它的棲息地範圍非常廣泛，從茂密的熱帶低地和山地雨林到熱帶山地森林、亞高山森林和較高海拔的灌木叢。它被指定為東南亞植物多樣性中心，物種極其豐富，包括來自喜馬拉雅山、中國、澳洲、馬來西亞的植物群以及泛熱帶植物。</text>\r\n<br>\r\n</td>\r\n</tr>\r\n</table>', '<table>\r\n<tr><td>\r\n	<br>記錄編號\r\n	<br>{0}\r\n</td></tr>\r\n<tr><td>\r\n	<br>這份表揚證書已頒發給\r\n	<br>{1}\r\n</td></tr>\r\n<tr><td>\r\n	<br>授權者\r\n	<br>沙巴旅遊局\r\n	<br>頒發日期：{2}\r\n</td></tr>\r\n\r\n</table>', 0),
(15, 'Sabah, located in the northern part of Borneo Island, belongs to East Malaysia. It is the second largest state in Malaysia, and Borneo is the third largest island in the world. Sabah is known as the Land Below The Wind because Sabah is located south of the typhoon formation area, so no typhoons will pass through it.\r\n\r\nSabah is surrounded by the sea on three sides and has rich rainforests. It is extremely rich in ecological resources. Whether it is mountains, rainforests, rivers, wetlands, coral reefs, etc., they can all be found in this land. In addition, the rich culture of the people is also derived from Sabah, so it has long been a popular place for sustainable tourism.', 'Kinabalu Park', 3, 'Minted on Polygon view on polygonscan', 'Become Sabah Sustainable Travel Ambassador', 'The United Nations Sustainable Development Goals (SDGs) are a global action framework adopted in 2015 by 193 countries. They encompass 17 core goals and 169 specific targets, aiming to eradicate poverty, protect the planet, and promote human prosperity by 2030. At the core value of the SDGs is the principle of “leaving no one behind,” integrating the three pillars of sustainability—environmental, social, and economic. The goals cover cross-cutting issues such as climate action, zero hunger, inclusive education, gender equality, and responsible consumption, providing a clear roadmap for governments, businesses, and civil society.\nThe SDGs break away from traditional development thinking by emphasizing that “global challenges require local solutions.” STAR (Sustainable Travel Ambassador) seeks to promote the concept of “responsible users,” inspiring more citizens to move toward a future that is fair, resilient, and sustainable.', '<table>\n<tr>\n<td>\n <br>\n<text style=\"font-family: Arial, Verdana, Helvetica, sans-serif;\">\nSabah, located in the northern part of Borneo Island, belongs to East Malaysia. It is the second largest state in Malaysia, and Borneo is the third largest island in the world. Sabah is known as the Land Below The Wind because Sabah is located south of the typhoon formation area, so no typhoons will pass through it.\n\nSabah is surrounded by the sea on three sides and has rich rainforests. It is extremely rich in ecological resources. Whether it is mountains, rainforests, rivers, wetlands, coral reefs, etc., they can all be found in this land. In addition, the rich culture of the people is also derived from Sabah, so it has long been a popular place for sustainable tourism.\n</text>\n<br>\n</td>\n</tr>\n<tr>\n<td>\n\n\n</td>\n</tr>\n\n</table>', 'https://www.google.com/maps/@22.3657153,114.1313663,17z?entry=ttu', '<table>\n<tr>\n<td>\n <br>\n<text style=\"font-family: Arial, Verdana, Helvetica, sans-serif;\">\nAbout Kinabalu Park\nKinabalu Park, in the State of Sabah on the northern end of the island of Borneo, is dominated by Mount Kinabalu (4,095 m), the highest mountain between the Himalayas and New Guinea. It has a very wide range of habitats, from rich tropical lowland and hill rainforest to tropical mountain forest, sub-alpine forest and scrub on the higher elevations. It has been designated as a Centre of Plant Diversity for Southeast Asia and is exceptionally rich in species with examples of flora from the Himalayas, China, Australia, Malaysia, as well as pan-tropical flora.\n\n</text>\n<br>\n</td>\n</tr>\n<tr>\n<td>\n\n\n</td>\n</tr>\n\n</table>\n\n', '<table>\r\n<tr>\r\n<td>\r\n<h1>Impact</h1>\r\n</td>\r\n</tr>\r\n<tr>\r\n<td>\r\n <br>\r\n<text style=\"font-family: Arial, Verdana, Helvetica, sans-serif;\">\r\nKinabalu Park, in the State of Sabah on the northern end of the island of Borneo, is dominated by Mount Kinabalu (4,095 m), the highest mountain between the Himalayas and New Guinea. It has a very wide range of habitats, from rich tropical lowland and hill rainforest to tropical mountain forest, sub-alpine forest and scrub on the higher elevations. It has been designated as a Centre of Plant Diversity for Southeast Asia and is exceptionally rich in species with examples of flora from the Himalayas, China, Australia, Malaysia, as well as pan-tropical flora.\r\n</text>\r\n<br>\r\n</td>\r\n</tr>\r\n</table>', '<table>\r\n<tr><td>\r\n	<br>Impact Record\r\n	<br>{0}\r\n</td></tr>\r\n<tr><td>\r\n	<br>This appreciotion cerlificate has beenorwardedl to\r\n	<br>{1}\r\n</td></tr>\r\n<tr><td>\r\n	<br>Authorizer\r\n	<br>Palau Tourism Board\r\n	<br>Delivered on：{2}\r\n</td></tr>\r\n\r\n</table>', 1),
(16, 'サバ州はボルネオ島の北部に位置し、東マレーシアに属し、マレーシアで2番目に大きな州であり、ボルネオ島は世界で3番目に大きい島です。サバ州は台風発生地域の南に位置するため、台風が通過しないため、「風の下の国」として知られています。\r\n\r\nサバ州は三方を海に囲まれ、豊かな熱帯雨林があり、山、熱帯雨林、川、湿地、サンゴ礁などの生態資源が非常に豊富です。また、サバ州には豊かな人々の文化も根付いており、持続可能な観光地としても古くから人気があります。', 'キナバル公園', 3, 'Minted on Polygon view on polygonscan', 'サバ州持続可能な観光大使', '旅行者は地域の持続可能な発展に大きな影響を与えます。世界が持続可能な開発への意識を高めるにつれ、旅行中の地域保全において一定の役割を果たしています。持続可能な訪問者プログラムに参加し、電子バッジを購入して、地域の保全と持続可能な開発に貢献しましょう。', '<table>\n<tr>\n<td>\n <br>\n<text style=\"font-family: Arial, Verdana, Helvetica, sans-serif;\">\nサバ州はボルネオ島の北部に位置し、東マレーシアに属し、マレーシアで2番目に大きな州であり、ボルネオ島は世界で3番目に大きい島です。サバ州は台風発生地域の南に位置するため、台風が通過しないため、「風の下の国」として知られています。\n\nサバ州は三方を海に囲まれ、豊かな熱帯雨林があり、山、熱帯雨林、川、湿地、サンゴ礁などの生態資源が非常に豊富です。また、サバ州には豊かな人々の文化も根付いており、持続可能な観光地としても古くから人気があります。\n<br>\n</td>\n</tr>\n<tr>\n<td>\n\n\n</td>\n</tr>\n\n</table>\n\n', 'https://www.google.com/maps/@22.3657153,114.1313663,17z?entry=ttu', '<table>\n<tr>\n<td>\n <br>\n<text style=\"font-family: Arial, Verdana, Helvetica, sans-serif;\">\nキナバル公園について\nキナバル公園は、ボルネオ島北端のサバ州に位置し、ヒマラヤとニューギニアの間の最高峰であるキナバル山 (4,095 m) がそびえています。その生息地は、密集した熱帯低地や山地熱帯雨林から、熱帯山地林、亜高山林、標高の高い低木地帯まで多岐にわたります。東南アジア植物多様性センターとして指定されており、ヒマラヤ、中国、オーストラリア、マレーシアの植物相、汎熱帯植物など、種が非常に豊富です。\n</text>\n<br>\n</td>\n</tr>\n<tr>\n<td>\n\n\n</td>\n</tr>\n\n</table>\n\n', '<table>\n<tr>\n<td>\n<h1>影響力のある地域</h1>\n</td>\n</tr>\n<tr>\n<td>\n <br>\n<text style=\"font-family: Arial, Verdana, Helvetica, sans-serif;\">\nキナバル公園は、ボルネオ島北端のサバ州に位置し、ヒマラヤとニューギニアの間の最高峰であるキナバル山 (4,095 m) がそびえています。その生息地は、密集した熱帯低地や山地熱帯雨林から、熱帯山地林、亜高山林、標高の高い低木地帯まで多岐にわたります。東南アジア植物多様性センターとして指定されており、ヒマラヤ、中国、オーストラリア、マレーシアの植物相、汎熱帯植物など、種が非常に豊富です。</text>\n<br>\n</td>\n</tr>\n</table>', '<table>\r\n<tr><td>\r\n	<br>記録番号\r\n	<br>{0}\r\n</td></tr>\r\n<tr><td>\r\n	<br>この感謝状は\r\n	<br>{1}\r\n</td></tr>\r\n<tr><td>\r\n	<br>認証者\r\n	<br>サバ州旅遊局\r\n	<br>授与日：{2}\r\n</td></tr>\r\n\r\n</table>', 2),
(17, '沙巴，位於婆羅洲島北部，屬東馬來西亞，是馬來西亞境內的第二大州，而婆羅洲又是世界第三大島。沙巴享有風下之鄉之美譽（Land Below The Wind），皆因是沙巴的位置在颱風形成區域以南，因而沒有颱風會路經此地。\n\n沙巴洲三面環海，並擁有豐富的雨林，生態資源極奇豐富，無論是高山、雨林、河流、濕地及珊瑚礁等都可一一在這片土地中發現。隨此以外，豐富的人民文化亦在沙巴中衍生，所以長久以來，都是可持續旅遊的熱門之地。\n', '東姑阿都拉曼公園', 4, 'Minted on Polygon view on polygonscan', '沙巴可持續旅遊大使', '聯合國永續發展目標（Sustainable Development Goals, SDGs）是2015年由193個國家共同通過的全球行動框架，涵蓋17項核心目標與169項具體指標，旨在2030年前消除貧窮、保護地球環境並促進人類繁榮。SDGs以「不遺落任何人」為核心精神，整合「環境、社會、經濟」三大永續支柱，涵蓋氣候行動、消除飢餓、教育平權、性別平等、責任消費等跨領域議題，為政府、企業與公民社會提供明確的行動藍圖。\nSDGs突破傳統發展思維，強調「全球問題需在地解決」，STAR ( Sustainable Travel Ambassador Reward) 希望透過推廣「負責任使用者」的模式，以引領更多的市民邁向更公平、韌性與永續的未來。', '<table>\n<tr>\n<td>\n <br>\n<text style=\"font-family: Arial, Verdana, Helvetica, sans-serif;\">\n沙巴，位於婆羅洲島北部，屬東馬來西亞，是馬來西亞境內的第二大州，而婆羅洲又是世界第三大島。沙巴享有風下之鄉之美譽（Land Below The Wind），皆因是沙巴的位置在颱風形成區域以南，因而沒有颱風會路經此地。\n\n沙巴洲三面環海，並擁有豐富的雨林，生態資源極奇豐富，無論是高山、雨林、河流、濕地及珊瑚礁等都可一一在這片土地中發現。隨此以外，豐富的人民文化亦在沙巴中衍生，所以長久以來，都是可持續旅遊的熱門之地。\n\n</text>\n<br>\n</td>\n</tr>\n<tr>\n<td>\n\n\n</td>\n</tr>\n\n</table>', 'https://www.google.com/maps/@22.3657153,114.1313663,17z?entry=ttu', '<table>\n<tr>\n<td>\n <br>\n<text style=\"font-family: Arial, Verdana, Helvetica, sans-serif;\">\n關於東姑阿都拉曼公園\n東姑阿都拉曼公園是馬來西亞第一座海洋國家公園。座落於南中國海上，距離亞庇市只有3公里，由5個島嶼所組成，由於水質清澈，海洋生物豐富，因此在1974年正式被列為海洋生態國家公園，以保護這片海域內的海洋生態。\n</text>\n<br>\n</td>\n</tr>\n<tr>\n<td>\n\n\n</td>\n</tr>\n\n</table>\n', '<table>\r\n<tr>\r\n<td>\r\n<h1>影響領域</h1>\r\n</td>\r\n</tr>\r\n<tr>\r\n<td>\r\n <br>\r\n<text style=\"font-family: Arial, Verdana, Helvetica, sans-serif;\">\r\n東姑阿都拉曼公園是馬來西亞第一座海洋國家公園。座落於南中國海上，距離亞庇市只有3公里，由5個島嶼所組成，由於水質清澈，海洋生物豐富，因此在1974年正式被列為海洋生態國家公園，以保護這片海域內的海洋生態。</text>\r\n<br>\r\n</td>\r\n</tr>\r\n</table>', '<table>\r\n<tr><td>\r\n	<br>記錄編號\r\n	<br>{0}\r\n</td></tr>\r\n<tr><td>\r\n	<br>這份表揚證書已頒發給\r\n	<br>{1}\r\n</td></tr>\r\n<tr><td>\r\n	<br>授權者\r\n	<br>沙巴旅遊局\r\n	<br>頒發日期：{2}\r\n</td></tr>\r\n\r\n</table>', 0),
(18, 'Sabah, located in the northern part of Borneo Island, belongs to East Malaysia. It is the second largest state in Malaysia, and Borneo is the third largest island in the world. Sabah is known as the Land Below The Wind because Sabah is located south of the typhoon formation area, so no typhoons will pass through it.\r\n\r\nSabah is surrounded by the sea on three sides and has rich rainforests. It is extremely rich in ecological resources. Whether it is mountains, rainforests, rivers, wetlands, coral reefs, etc., they can all be found in this land. In addition, the rich culture of the people is also derived from Sabah, so it has long been a popular place for sustainable tourism.', 'Tunku Abdul Rahman Park', 4, 'Minted on Polygon view on polygonscan', 'Become Sabah Sustainable Travel Ambassador', 'The United Nations Sustainable Development Goals (SDGs) are a global action framework adopted in 2015 by 193 countries. They encompass 17 core goals and 169 specific targets, aiming to eradicate poverty, protect the planet, and promote human prosperity by 2030. At the core value of the SDGs is the principle of “leaving no one behind,” integrating the three pillars of sustainability—environmental, social, and economic. The goals cover cross-cutting issues such as climate action, zero hunger, inclusive education, gender equality, and responsible consumption, providing a clear roadmap for governments, businesses, and civil society.\nThe SDGs break away from traditional development thinking by emphasizing that “global challenges require local solutions.” STAR (Sustainable Travel Ambassador) seeks to promote the concept of “responsible users,” inspiring more citizens to move toward a future that is fair, resilient, and sustainable.', '<table>\n<tr>\n<td>\n <br>\n<text style=\"font-family: Arial, Verdana, Helvetica, sans-serif;\">\nSabah, located in the northern part of Borneo Island, belongs to East Malaysia. It is the second largest state in Malaysia, and Borneo is the third largest island in the world. Sabah is known as the Land Below The Wind because Sabah is located south of the typhoon formation area, so no typhoons will pass through it.\n\nSabah is surrounded by the sea on three sides and has rich rainforests. It is extremely rich in ecological resources. Whether it is mountains, rainforests, rivers, wetlands, coral reefs, etc., they can all be found in this land. In addition, the rich culture of the people is also derived from Sabah, so it has long been a popular place for sustainable tourism.\n</text>\n<br>\n</td>\n</tr>\n<tr>\n<td>\n\n\n</td>\n</tr>\n\n</table>', 'https://www.google.com/maps/@22.3657153,114.1313663,17z?entry=ttu', '<table>\n<tr>\n<td>\n <br>\n<text style=\"font-family: Arial, Verdana, Helvetica, sans-serif;\">\nAbout Tunku Abdul Rahman Park\nTunku Abdul Rahman Park is the first marine national park in Malaysia. Located on the South China Sea, only 3 kilometers away from Kota Kinabalu City, it consists of 5 islands. Due to its clear water quality and rich marine life, it was officially listed as a Marine Ecological National Park in 1974 to protect the marine environment in this area. marine ecology.\n\n</text>\n<br>\n</td>\n</tr>\n<tr>\n<td>\n\n\n</td>\n</tr>\n\n</table>', '<table>\r\n<tr>\r\n<td>\r\n<h1>Impact</h1>\r\n</td>\r\n</tr>\r\n<tr>\r\n<td>\r\n <br>\r\n<text style=\"font-family: Arial, Verdana, Helvetica, sans-serif;\">\r\nTunku Abdul Rahman Park is the first marine national park in Malaysia. Located on the South China Sea, only 3 kilometers away from Kota Kinabalu City, it consists of 5 islands. Due to its clear water quality and rich marine life, it was officially listed as a Marine Ecological National Park in 1974 to protect the marine environment in this area. marine ecology.\r\n</text>\r\n<br>\r\n</td>\r\n</tr>\r\n</table>', '<table>\r\n<tr><td>\r\n	<br>Impact Record\r\n	<br>{0}\r\n</td></tr>\r\n<tr><td>\r\n	<br>This appreciotion cerlificate has beenorwardedl to\r\n	<br>{1}\r\n</td></tr>\r\n<tr><td>\r\n	<br>Authorizer\r\n	<br>Palau Tourism Board\r\n	<br>Delivered on：{2}\r\n</td></tr>\r\n\r\n</table>', 1),
(19, 'サバ州はボルネオ島の北部に位置し、東マレーシアに属し、マレーシアで2番目に大きな州であり、ボルネオ島は世界で3番目に大きい島です。サバ州は台風発生地域の南に位置するため、台風が通過しないため、「風の下の国」として知られています。\n\nサバ州は三方を海に囲まれ、豊かな熱帯雨林があり、山、熱帯雨林、川、湿地、サンゴ礁などの生態資源が非常に豊富です。また、サバ州には豊かな人々の文化も根付いており、持続可能な観光地としても古くから人気があります。', 'トゥンク アブドゥル ラーマン公園', 4, 'Minted on Polygon view on polygonscan', 'サバ州持続可能な観光大使', '旅行者は地域の持続可能な発展に大きな影響を与えます。世界が持続可能な開発への意識を高めるにつれ、旅行中の地域保全において一定の役割を果たしています。持続可能な訪問者プログラムに参加し、電子バッジを購入して、地域の保全と持続可能な開発に貢献しましょう。', '<table>\n<tr>\n<td>\n <br>\n<text style=\"font-family: Arial, Verdana, Helvetica, sans-serif;\">\nサバ州はボルネオ島の北部に位置し、東マレーシアに属し、マレーシアで2番目に大きな州であり、ボルネオ島は世界で3番目に大きい島です。サバ州は台風発生地域の南に位置するため、台風が通過しないため、「風の下の国」として知られています。\n\nサバ州は三方を海に囲まれ、豊かな熱帯雨林があり、山、熱帯雨林、川、湿地、サンゴ礁などの生態資源が非常に豊富です。また、サバ州には豊かな人々の文化も根付いており、持続可能な観光地としても古くから人気があります。\n<br>\n</td>\n</tr>\n<tr>\n<td>\n\n\n</td>\n</tr>\n\n</table>\n\n', 'https://www.google.com/maps/@22.3657153,114.1313663,17z?entry=ttu', '<table>\n<tr>\n<td>\n <br>\n<text style=\"font-family: Arial, Verdana, Helvetica, sans-serif;\">\nトゥンク アブドゥル ラーマン公園について\nトゥンク アブドゥル ラーマン公園は、マレーシア初の海洋国立公園です。コタキナバル市からわずか 3 キロメートル離れた南シナ海に位置し、5 つの島から構成されています。その透明な水質と豊かな海洋生物のため、海洋環境を保護するために 1974 年に海洋生態国立公園として正式に登録されました。この分野では海洋生態学。\n</text>\n<br>\n</td>\n</tr>\n<tr>\n<td>\n\n\n</td>\n</tr>\n\n</table>\n', '<table>\r\n<tr>\r\n<td>\r\n<h1>影響力のある地域</h1>\r\n</td>\r\n</tr>\r\n<tr>\r\n<td>\r\n <br>\r\n<text style=\"font-family: Arial, Verdana, Helvetica, sans-serif;\">\r\nトゥンク アブドゥル ラーマン公園は、マレーシア初の海洋国立公園です。コタキナバル市からわずか 3 キロメートル離れた南シナ海に位置し、5 つの島から構成されています。その透明な水質と豊かな海洋生物のため、海洋環境を保護するために 1974 年に海洋生態国立公園として正式に登録されました。この分野では海洋生態学。</text>\r\n<br>\r\n</td>\r\n</tr>\r\n</table>', '<table>\r\n<tr><td>\r\n	<br>記録番号\r\n	<br>{0}\r\n</td></tr>\r\n<tr><td>\r\n	<br>この感謝状は\r\n	<br>{1}\r\n</td></tr>\r\n<tr><td>\r\n	<br>認証者\r\n	<br>サバ州旅遊局\r\n	<br>授与日：{2}\r\n</td></tr>\r\n\r\n</table>', 2);

-- --------------------------------------------------------

--
-- Table structure for table `badgemaster`
--

CREATE TABLE `badgemaster` (
  `badge_id` int(8) NOT NULL,
  `badge_name` varchar(100) NOT NULL,
  `badge_image` varchar(100) NOT NULL,
  `description` varchar(1000) NOT NULL,
  `event` varchar(1000) NOT NULL,
  `qrcode` varchar(1024) NOT NULL,
  `website` varchar(50) NOT NULL,
  `lat` varchar(20) NOT NULL,
  `lon` varchar(20) NOT NULL,
  `status` int(1) NOT NULL DEFAULT 1 COMMENT '1=active, 0=inactive',
  `createdate` date NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf16;

--
-- Dumping data for table `badgemaster`
--

INSERT INTO `badgemaster` (`badge_id`, `badge_name`, `badge_image`, `description`, `event`, `qrcode`, `website`, `lat`, `lon`, `status`, `createdate`) VALUES
(1, 'Palau', 'badge_image_001.img', 'badge description 001', 'badge event 001', 'badge 001 qrcode', 'http://www.starsdg.com', '38.88333', '-77', 1, '2024-03-26'),
(2, 'Badge (Wetland)', 'badge_image_002.img', 'badge description 002', 'badge 002 event', 'badge 002 qrcode', 'http://www.starsdg.com', '38.88333', '-77', 1, '2024-03-26'),
(3, 'Kinabalu Park', 'badge_image_003.img', 'badge description 003', 'badge 003 event', 'badge 003 qrcode', 'tarsdg.com', '38.88333', '38.88333', 1, '2024-03-26'),
(4, 'Tunku Abdul Rahman Park', 'badge_image_004.img', 'badge description 004', 'badge 004 event', 'badge 004 qrcode', 'tarsdg.com', '38.88333', '38.88333', 1, '2024-03-26'),
(5, 'Badge 005', 'badge_image_005.img', 'badge description 005', 'badge 005 event', 'badge 005 qrcode', 'tarsdg.com', '38.88333', '38.88333', 1, '2024-03-26'),
(6, 'Badge 006', 'badge_image_006.img', 'badge description 006', 'badge 006 event', 'badge 006 qrcode', 'tarsdg.com', '38.88333', '38.88333', 1, '2024-03-26'),
(7, 'Badge 007', 'badge_image_007.img', 'badge description 007', 'badge 007 event', 'badge 007 qrcode', 'tarsdg.com', '38.88333', '38.88333', 1, '2024-03-26');

-- --------------------------------------------------------

--
-- Table structure for table `companymaster`
--

CREATE TABLE `companymaster` (
  `uid` int(10) NOT NULL,
  `company_id` varchar(256) COLLATE utf8mb4_unicode_ci NOT NULL,
  `companyname` varchar(256) COLLATE utf8mb4_unicode_ci NOT NULL,
  `contactname` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `countrycode` varchar(3) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '000',
  `tel` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `mobile` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `country` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `address_1` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `address_2` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `address_3` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` int(1) NOT NULL DEFAULT 1 COMMENT '0=inactive, 1=active'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `companymaster`
--

INSERT INTO `companymaster` (`uid`, `company_id`, `companyname`, `contactname`, `countrycode`, `tel`, `mobile`, `email`, `country`, `address_1`, `address_2`, `address_3`, `status`) VALUES
(1, 'ff50dbc5-247f-11ef-ac37-0a186f7be03d', 'Market Trend 11', 'Devil Tse', '852', '98765430', '12345699', 'info11@market-trend.com.hk', 'china', 'Address 1', 'Address 2', 'Address 3', 1),
(2, 'ff50dbc5-247f-11ef-ac37-0a186f7be033', 'Market Trend 2', 'Devil 2', '852', '98765432', '12345671', 'info1@market-trend.com.hk', 'China', 'Address 1', 'Address 2', 'Address 3', 1),
(3, 'ff50dbc5-247f-11ef-ac37-0a186f7be044', 'Market Trend 3', 'Devil 2', '852', '98765433', '12345672', 'info2@market-trend.com.hk', 'China', 'Address 1', 'Address 2', 'Address 3', 1),
(4, 'ff50dbc5-247f-11ef-ac37-0a186f7be055', 'Market Trend 4', 'Devil 4', '852', '98765433', '12345673', 'info3@market-trend.com.hk', 'China', 'Address 1', 'Address 2', 'Address 3', 1),
(5, 'ff50dbc5-247f-11ef-ac37-0a186f7be066', 'Market Trend 5', 'Devil 5', '852', '98765434', '12345674', 'info4@market-trend.com.hk', 'China', 'Address 1', 'Address 2', 'Address 3', 1),
(6, 'ff50dbc5-247f-11ef-ac37-0a186f7be077', 'Market Trend 7', 'Devil 7', '852', '98765435', '12345675', 'info1@market-trend.com.hk', 'China', 'Address 1', 'Address 2', 'Address 3', 1),
(7, 'ff50dbc5-247f-11ef-ac37-0a186f7be088', 'Market Trend 6', 'Devil 6', '852', '98765436', '12345676', 'info5@market-trend.com.hk', 'China', 'Address 1', 'Address 2', 'Address 3', 1),
(19, 'a6a5b11e-38e6-11ef-ac37-0a186f7be03d', 'abc', 'abc', '852', '97979799', '97979799', 'dev22@mail.com', 'China', '', '', '', 1);

-- --------------------------------------------------------

--
-- Table structure for table `countrycodemaster`
--

CREATE TABLE `countrycodemaster` (
  `id` int(11) NOT NULL,
  `country_code` varchar(10) NOT NULL,
  `country_name` varchar(100) NOT NULL,
  `status` int(1) NOT NULL DEFAULT 0 COMMENT '0=inactive, 1=active'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `countrycodemaster`
--

INSERT INTO `countrycodemaster` (`id`, `country_code`, `country_name`, `status`) VALUES
(1, '355', 'Albania', 0),
(2, '213', 'Algeria', 0),
(3, '1-684', 'American Samoa', 0),
(4, '376', 'Andorra', 0),
(5, '244', 'Angola', 0),
(6, '1-264', 'Anguilla', 0),
(7, '672', 'Antarctica', 0),
(8, '1-268', 'Antigua and Barbuda', 0),
(9, '54', 'Argentina', 0),
(10, '374', 'Armenia', 0),
(11, '297', 'Aruba', 0),
(12, '61', 'Australia', 0),
(13, '43', 'Austria', 0),
(14, '994', 'Azerbaijan', 0),
(15, '1-242', 'Bahamas', 0),
(16, '973', 'Bahrain', 0),
(17, '880', 'Bangladesh', 0),
(18, '1-246', 'Barbados', 0),
(19, '375', 'Belarus', 0),
(20, '32', 'Belgium', 0),
(21, '501', 'Belize', 0),
(22, '229', 'Benin', 0),
(23, '1-441', 'Bermuda', 0),
(24, '975', 'Bhutan', 0),
(25, '591', 'Bolivia', 0),
(26, '387', 'Bosnia and Herzegovina', 0),
(27, '267', 'Botswana', 0),
(28, '55', 'Brazil', 0),
(29, '246', 'British Indian Ocean Territory', 0),
(30, '1-284', 'British Virgin Islands', 0),
(31, '673', 'Brunei', 0),
(32, '359', 'Bulgaria', 0),
(33, '226', 'Burkina Faso', 0),
(34, '257', 'Burundi', 0),
(35, '855', 'Cambodia', 0),
(36, '237', 'Cameroon', 0),
(37, '1', 'Canada', 0),
(38, '238', 'Cape Verde', 0),
(39, '1-345', 'Cayman Islands', 0),
(40, '236', 'Central African Republic', 0),
(41, '235', 'Chad', 0),
(42, '56', 'Chile', 0),
(43, '86', 'China', 1),
(44, '61', 'Christmas Island', 0),
(45, '61', 'Cocos Islands', 0),
(46, '57', 'Colombia', 0),
(47, '269', 'Comoros', 0),
(48, '682', 'Cook Islands', 0),
(49, '506', 'Costa Rica', 0),
(50, '385', 'Croatia', 0),
(51, '53', 'Cuba', 0),
(52, '599', 'Curacao', 0),
(53, '357', 'Cyprus', 0),
(54, '420', 'Czech Republic', 0),
(55, '243', 'Democratic Republic of the Congo', 0),
(56, '45', 'Denmark', 0),
(57, '253', 'Djibouti', 0),
(58, '1-767', 'Dominica', 0),
(59, '1-809', 'Dominican Republic', 0),
(60, '670', 'East Timor', 0),
(61, '593', 'Ecuador', 0),
(62, '20', 'Egypt', 0),
(63, '503', 'El Salvador', 0),
(64, '240', 'Equatorial Guinea', 0),
(65, '291', 'Eritrea', 0),
(66, '372', 'Estonia', 0),
(67, '251', 'Ethiopia', 0),
(68, '500', 'Falkland Islands', 0),
(69, '298', 'Faroe Islands', 0),
(70, '679', 'Fiji', 0),
(71, '358', 'Finland', 0),
(72, '33', 'France', 0),
(73, '689', 'French Polynesia', 0),
(74, '241', 'Gabon', 0),
(75, '220', 'Gambia', 0),
(76, '995', 'Georgia', 0),
(77, '49', 'Germany', 0),
(78, '233', 'Ghana', 0),
(79, '350', 'Gibraltar', 0),
(80, '30', 'Greece', 0),
(81, '299', 'Greenland', 0),
(82, '1-473', 'Grenada', 0),
(83, '1-671', 'Guam', 0),
(84, '502', 'Guatemala', 0),
(85, '44-1481', 'Guernsey', 0),
(86, '224', 'Guinea', 0),
(87, '245', 'Guinea-Bissau', 0),
(88, '592', 'Guyana', 0),
(89, '509', 'Haiti', 0),
(90, '504', 'Honduras', 0),
(91, '852', 'Hong Kong', 1),
(92, '36', 'Hungary', 0),
(93, '354', 'Iceland', 0),
(94, '91', 'India', 0),
(95, '62', 'Indonesia', 0),
(96, '98', 'Iran', 0),
(97, '964', 'Iraq', 0),
(98, '353', 'Ireland', 0),
(99, '44-1624', 'Isle of Man', 0),
(100, '972', 'Israel', 0),
(101, '39', 'Italy', 0),
(102, '225', 'Ivory Coast', 0),
(103, '1-876', 'Jamaica', 0),
(104, '81', 'Japan', 1),
(105, '44-1534', 'Jersey', 0),
(106, '962', 'Jordan', 0),
(107, '7', 'Kazakhstan', 0),
(108, '254', 'Kenya', 0),
(109, '686', 'Kiribati', 0),
(110, '383', 'Kosovo', 0),
(111, '965', 'Kuwait', 0),
(112, '996', 'Kyrgyzstan', 0),
(113, '856', 'Laos', 0),
(114, '371', 'Latvia', 0),
(115, '961', 'Lebanon', 0),
(116, '266', 'Lesotho', 0),
(117, '231', 'Liberia', 0),
(118, '218', 'Libya', 0),
(119, '423', 'Liechtenstein', 0),
(120, '370', 'Lithuania', 0),
(121, '352', 'Luxembourg', 0),
(122, '853', 'Macau', 1),
(123, '389', 'Macedonia', 0),
(124, '261', 'Madagascar', 0),
(125, '265', 'Malawi', 0),
(126, '60', 'Malaysia', 1),
(127, '960', 'Maldives', 0),
(128, '223', 'Mali', 0),
(129, '356', 'Malta', 0),
(130, '692', 'Marshall Islands', 0),
(131, '222', 'Mauritania', 0),
(132, '230', 'Mauritius', 0),
(133, '262', 'Mayotte', 0),
(134, '52', 'Mexico', 0),
(135, '691', 'Micronesia', 0),
(136, '373', 'Moldova', 0),
(137, '377', 'Monaco', 0),
(138, '976', 'Mongolia', 0),
(139, '382', 'Montenegro', 0),
(140, '1-664', 'Montserrat', 0),
(141, '212', 'Morocco', 0),
(142, '258', 'Mozambique', 0),
(143, '95', 'Myanmar', 0),
(144, '264', 'Namibia', 0),
(145, '674', 'Nauru', 0),
(146, '977', 'Nepal', 0),
(147, '31', 'Netherlands', 0),
(148, '599', 'Netherlands Antilles', 0),
(149, '687', 'New Caledonia', 0),
(150, '64', 'New Zealand', 0),
(151, '505', 'Nicaragua', 0),
(152, '227', 'Niger', 0),
(153, '234', 'Nigeria', 0),
(154, '683', 'Niue', 0),
(155, '850', 'North Korea', 0),
(156, '1-670', 'Northern Mariana Islands', 0),
(157, '47', 'Norway', 0),
(158, '968', 'Oman', 0),
(159, '92', 'Pakistan', 0),
(160, '680', 'Palau', 0),
(161, '970', 'Palestine', 0),
(162, '507', 'Panama', 0),
(163, '675', 'Papua New Guinea', 0),
(164, '595', 'Paraguay', 0),
(165, '51', 'Peru', 0),
(166, '63', 'Philippines', 0),
(167, '64', 'Pitcairn', 0),
(168, '48', 'Poland', 0),
(169, '351', 'Portugal', 0),
(170, '1-787', 'Puerto Rico', 0),
(171, '974', 'Qatar', 0),
(172, '242', 'Republic of the Congo', 0),
(173, '262', 'Reunion', 0),
(174, '40', 'Romania', 0),
(175, '7', 'Russia', 0),
(176, '250', 'Rwanda', 0),
(177, '590', 'Saint Barthelemy', 0),
(178, '290', 'Saint Helena', 0),
(179, '1-869', 'Saint Kitts and Nevis', 0),
(180, '1-758', 'Saint Lucia', 0),
(181, '590', 'Saint Martin', 0),
(182, '508', 'Saint Pierre and Miquelon', 0),
(183, '1-784', 'Saint Vincent and the Grenadines', 0),
(184, '685', 'Samoa', 0),
(185, '378', 'San Marino', 0),
(186, '239', 'Sao Tome and Principe', 0),
(187, '966', 'Saudi Arabia', 0),
(188, '221', 'Senegal', 0),
(189, '381', 'Serbia', 0),
(190, '248', 'Seychelles', 0),
(191, '232', 'Sierra Leone', 0),
(192, '65', 'Singapore', 0),
(193, '1-721', 'Sint Maarten', 0),
(194, '421', 'Slovakia', 0),
(195, '386', 'Slovenia', 0),
(196, '677', 'Solomon Islands', 0),
(197, '252', 'Somalia', 0),
(198, '27', 'South Africa', 0),
(199, '82', 'South Korea', 0),
(200, '211', 'South Sudan', 0),
(201, '34', 'Spain', 0),
(202, '94', 'Sri Lanka', 0),
(203, '249', 'Sudan', 0),
(204, '597', 'Suriname', 0),
(205, '47', 'Svalbard and Jan Mayen', 0),
(206, '268', 'Swaziland', 0),
(207, '46', 'Sweden', 0),
(208, '41', 'Switzerland', 0),
(209, '963', 'Syria', 0),
(210, '886', 'Taiwan', 0),
(211, '992', 'Tajikistan', 0),
(212, '255', 'Tanzania', 0),
(213, '66', 'Thailand', 0),
(214, '228', 'Togo', 0),
(215, '690', 'Tokelau', 0),
(216, '676', 'Tonga', 0),
(217, '1-868', 'Trinidad and Tobago', 0),
(218, '216', 'Tunisia', 0),
(219, '90', 'Turkey', 0),
(220, '993', 'Turkmenistan', 0),
(221, '1-649', 'Turks and Caicos Islands', 0),
(222, '688', 'Tuvalu', 0),
(223, '1-340', 'U.S. Virgin Islands', 0),
(224, '256', 'Uganda', 0),
(225, '380', 'Ukraine', 0),
(226, '971', 'United Arab Emirates', 0),
(227, '44', 'United Kingdom', 0),
(228, '1', 'United States', 0),
(229, '598', 'Uruguay', 0),
(230, '998', 'Uzbekistan', 0),
(231, '678', 'Vanuatu', 0),
(232, '379', 'Vatican', 0),
(233, '58', 'Venezuela', 0),
(234, '84', 'Vietnam', 0),
(235, '681', 'Wallis and Futuna', 0),
(236, '212', 'Western Sahara', 0),
(237, '967', 'Yemen', 0),
(238, '260', 'Zambia', 0),
(239, '263', 'Zimbabwe', 0),
(241, '93', 'Afghanistan', 0);

-- --------------------------------------------------------

--
-- Table structure for table `ordermaster`
--

CREATE TABLE `ordermaster` (
  `order_id` int(8) NOT NULL,
  `badge_id` int(8) NOT NULL,
  `user_id` int(8) NOT NULL,
  `price` int(8) NOT NULL,
  `extra_help` int(5) NOT NULL DEFAULT 0,
  `mark` int(11) NOT NULL DEFAULT 0,
  `orderdate` datetime NOT NULL DEFAULT current_timestamp(),
  `company_id` varchar(256) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `agent_id` varchar(256) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `payment_method` varchar(50) DEFAULT NULL,
  `payment_status` varchar(50) NOT NULL DEFAULT '0' COMMENT '0=pending, 1=paid, 2=rejected',
  `hashcode` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf16;

--
-- Dumping data for table `ordermaster`
--

INSERT INTO `ordermaster` (`order_id`, `badge_id`, `user_id`, `price`, `extra_help`, `mark`, `orderdate`, `company_id`, `agent_id`, `payment_method`, `payment_status`, `hashcode`) VALUES
(19, 1, 1, 8, 0, 0, '2024-05-21 00:00:00', '\0f\0f\05\00\0d\0b\0c\05\0-\02\04\07\0f\0-\01\01\0e\0f\0-\0a\0c\03\07\0-\00\0a\01\08\06\0f\07\0b\0e\00\03\0d', '\05\05\05\09\09\0c\04\06\0-\02\09\06\03\0-\01\01\0e\0f\0-\0a\0c\03\07\0-\00\0a\01\08\06\0f\07\0b\0e\00\03\0d', NULL, '1', ''),
(20, 1, 24, 8, 0, 0, '2024-05-20 00:00:00', '\0f\0f\05\00\0d\0b\0c\05\0-\02\04\07\0f\0-\01\01\0e\0f\0-\0a\0c\03\07\0-\00\0a\01\08\06\0f\07\0b\0e\00\03\0d', '\05\05\05\09\09\0c\04\06\0-\02\09\06\03\0-\01\01\0e\0f\0-\0a\0c\03\07\0-\00\0a\01\08\06\0f\07\0b\0e\00\03\0d', NULL, '0', ''),
(21, 1, 25, 8, 0, 0, '2024-05-20 00:00:00', '\0f\0f\05\00\0d\0b\0c\05\0-\02\04\07\0f\0-\01\01\0e\0f\0-\0a\0c\03\07\0-\00\0a\01\08\06\0f\07\0b\0e\00\03\0d', '\05\05\05\09\09\0c\04\06\0-\02\09\06\03\0-\01\01\0e\0f\0-\0a\0c\03\07\0-\00\0a\01\08\06\0f\07\0b\0e\00\03\0d', NULL, '0', ''),
(22, 1, 28, 8, 0, 0, '2024-05-20 00:00:00', '\0f\0f\05\00\0d\0b\0c\05\0-\02\04\07\0f\0-\01\01\0e\0f\0-\0a\0c\03\07\0-\00\0a\01\08\06\0f\07\0b\0e\00\03\0d', '\05\05\05\09\09\0c\04\06\0-\02\09\06\03\0-\01\01\0e\0f\0-\0a\0c\03\07\0-\00\0a\01\08\06\0f\07\0b\0e\00\03\0d', NULL, '0', ''),
(23, 1, 30, 8, 0, 0, '2024-05-20 00:00:00', '\0f\0f\05\00\0d\0b\0c\05\0-\02\04\07\0f\0-\01\01\0e\0f\0-\0a\0c\03\07\0-\00\0a\01\08\06\0f\07\0b\0e\00\03\0d', '\05\05\05\09\09\0c\04\06\0-\02\09\06\03\0-\01\01\0e\0f\0-\0a\0c\03\07\0-\00\0a\01\08\06\0f\07\0b\0e\00\03\0d', NULL, '0', ''),
(24, 1, 31, 8, 0, 0, '2024-05-20 00:00:00', '\0f\0f\05\00\0d\0b\0c\05\0-\02\04\07\0f\0-\01\01\0e\0f\0-\0a\0c\03\07\0-\00\0a\01\08\06\0f\07\0b\0e\00\03\0d', '\05\05\05\09\09\0c\04\06\0-\02\09\06\03\0-\01\01\0e\0f\0-\0a\0c\03\07\0-\00\0a\01\08\06\0f\07\0b\0e\00\03\0d', NULL, '0', ''),
(25, 1, 32, 8, 0, 0, '2024-05-20 00:00:00', '\0f\0f\05\00\0d\0b\0c\05\0-\02\04\07\0f\0-\01\01\0e\0f\0-\0a\0c\03\07\0-\00\0a\01\08\06\0f\07\0b\0e\00\03\0d', '\05\05\05\09\09\0c\04\06\0-\02\09\06\03\0-\01\01\0e\0f\0-\0a\0c\03\07\0-\00\0a\01\08\06\0f\07\0b\0e\00\03\0d', NULL, '0', ''),
(26, 1, 33, 8, 0, 0, '2024-05-20 00:00:00', '\0f\0f\05\00\0d\0b\0c\05\0-\02\04\07\0f\0-\01\01\0e\0f\0-\0a\0c\03\07\0-\00\0a\01\08\06\0f\07\0b\0e\00\03\0d', '\05\05\05\09\09\0c\04\06\0-\02\09\06\03\0-\01\01\0e\0f\0-\0a\0c\03\07\0-\00\0a\01\08\06\0f\07\0b\0e\00\03\0d', NULL, '0', ''),
(27, 2, 33, 8, 0, 0, '2024-05-20 00:00:00', '\0f\0f\05\00\0d\0b\0c\05\0-\02\04\07\0f\0-\01\01\0e\0f\0-\0a\0c\03\07\0-\00\0a\01\08\06\0f\07\0b\0e\00\03\0d', '\05\05\05\09\09\0c\04\06\0-\02\09\06\03\0-\01\01\0e\0f\0-\0a\0c\03\07\0-\00\0a\01\08\06\0f\07\0b\0e\00\03\0d', NULL, '0', ''),
(28, 1, 34, 8, 0, 0, '2024-05-20 00:00:00', '\0f\0f\05\00\0d\0b\0c\05\0-\02\04\07\0f\0-\01\01\0e\0f\0-\0a\0c\03\07\0-\00\0a\01\08\06\0f\07\0b\0e\00\03\0d', '\05\05\05\09\09\0c\04\06\0-\02\09\06\03\0-\01\01\0e\0f\0-\0a\0c\03\07\0-\00\0a\01\08\06\0f\07\0b\0e\00\03\0d', NULL, '0', ''),
(29, 1, 35, 8, 0, 0, '2024-05-20 00:00:00', '\0f\0f\05\00\0d\0b\0c\05\0-\02\04\07\0f\0-\01\01\0e\0f\0-\0a\0c\03\07\0-\00\0a\01\08\06\0f\07\0b\0e\00\03\0d', '\05\05\05\09\09\0c\04\06\0-\02\09\06\03\0-\01\01\0e\0f\0-\0a\0c\03\07\0-\00\0a\01\08\06\0f\07\0b\0e\00\03\0d', NULL, '0', ''),
(30, 1, 37, 8, 0, 0, '2024-05-20 00:00:00', '\0f\0f\05\00\0d\0b\0c\05\0-\02\04\07\0f\0-\01\01\0e\0f\0-\0a\0c\03\07\0-\00\0a\01\08\06\0f\07\0b\0e\00\03\0d', '\05\05\05\09\09\0c\04\06\0-\02\09\06\03\0-\01\01\0e\0f\0-\0a\0c\03\07\0-\00\0a\01\08\06\0f\07\0b\0e\00\03\0d', NULL, '0', ''),
(31, 1, 38, 8, 0, 0, '2024-05-20 00:00:00', '\0f\0f\05\00\0d\0b\0c\05\0-\02\04\07\0f\0-\01\01\0e\0f\0-\0a\0c\03\07\0-\00\0a\01\08\06\0f\07\0b\0e\00\03\0d', '\05\05\05\09\09\0c\04\06\0-\02\09\06\03\0-\01\01\0e\0f\0-\0a\0c\03\07\0-\00\0a\01\08\06\0f\07\0b\0e\00\03\0d', NULL, '0', ''),
(32, 1, 39, 8, 0, 0, '2024-05-20 00:00:00', '\0f\0f\05\00\0d\0b\0c\05\0-\02\04\07\0f\0-\01\01\0e\0f\0-\0a\0c\03\07\0-\00\0a\01\08\06\0f\07\0b\0e\00\03\0d', '\05\05\05\09\09\0c\04\06\0-\02\09\06\03\0-\01\01\0e\0f\0-\0a\0c\03\07\0-\00\0a\01\08\06\0f\07\0b\0e\00\03\0d', NULL, '0', ''),
(33, 1, 42, 8, 0, 0, '2024-05-20 00:00:00', '\0f\0f\05\00\0d\0b\0c\05\0-\02\04\07\0f\0-\01\01\0e\0f\0-\0a\0c\03\07\0-\00\0a\01\08\06\0f\07\0b\0e\00\03\0d', '\05\05\05\09\09\0c\04\06\0-\02\09\06\03\0-\01\01\0e\0f\0-\0a\0c\03\07\0-\00\0a\01\08\06\0f\07\0b\0e\00\03\0d', NULL, '0', ''),
(34, 1, 46, 8, 0, 0, '2024-05-20 00:00:00', '\0f\0f\05\00\0d\0b\0c\05\0-\02\04\07\0f\0-\01\01\0e\0f\0-\0a\0c\03\07\0-\00\0a\01\08\06\0f\07\0b\0e\00\03\0d', '\05\05\05\09\09\0c\04\06\0-\02\09\06\03\0-\01\01\0e\0f\0-\0a\0c\03\07\0-\00\0a\01\08\06\0f\07\0b\0e\00\03\0d', NULL, '0', ''),
(35, 1, 47, 8, 0, 0, '2024-05-20 00:00:00', '\0f\0f\05\00\0d\0b\0c\05\0-\02\04\07\0f\0-\01\01\0e\0f\0-\0a\0c\03\07\0-\00\0a\01\08\06\0f\07\0b\0e\00\03\0d', '\05\05\05\09\09\0c\04\06\0-\02\09\06\03\0-\01\01\0e\0f\0-\0a\0c\03\07\0-\00\0a\01\08\06\0f\07\0b\0e\00\03\0d', NULL, '0', ''),
(36, 1, 48, 8, 0, 0, '2024-05-20 00:00:00', '\0f\0f\05\00\0d\0b\0c\05\0-\02\04\07\0f\0-\01\01\0e\0f\0-\0a\0c\03\07\0-\00\0a\01\08\06\0f\07\0b\0e\00\03\0d', '\05\05\05\09\09\0c\04\06\0-\02\09\06\03\0-\01\01\0e\0f\0-\0a\0c\03\07\0-\00\0a\01\08\06\0f\07\0b\0e\00\03\0d', NULL, '0', ''),
(37, 1, 49, 8, 0, 0, '2024-05-20 00:00:00', '\0f\0f\05\00\0d\0b\0c\05\0-\02\04\07\0f\0-\01\01\0e\0f\0-\0a\0c\03\07\0-\00\0a\01\08\06\0f\07\0b\0e\00\03\0d', '\05\05\05\09\09\0c\04\06\0-\02\09\06\03\0-\01\01\0e\0f\0-\0a\0c\03\07\0-\00\0a\01\08\06\0f\07\0b\0e\00\03\0d', NULL, '0', ''),
(38, 1, 49, 8, 0, 0, '2024-05-20 00:00:00', '\0f\0f\05\00\0d\0b\0c\05\0-\02\04\07\0f\0-\01\01\0e\0f\0-\0a\0c\03\07\0-\00\0a\01\08\06\0f\07\0b\0e\00\03\0d', '\05\05\05\09\09\0c\04\06\0-\02\09\06\03\0-\01\01\0e\0f\0-\0a\0c\03\07\0-\00\0a\01\08\06\0f\07\0b\0e\00\03\0d', NULL, '0', ''),
(39, 1, 50, 8, 0, 0, '2024-05-21 00:00:00', '\0f\0f\05\00\0d\0b\0c\05\0-\02\04\07\0f\0-\01\01\0e\0f\0-\0a\0c\03\07\0-\00\0a\01\08\06\0f\07\0b\0e\00\03\0d', '\05\05\05\09\09\0c\04\06\0-\02\09\06\03\0-\01\01\0e\0f\0-\0a\0c\03\07\0-\00\0a\01\08\06\0f\07\0b\0e\00\03\0d', NULL, '0', ''),
(40, 1, 52, 8, 0, 0, '2024-05-21 00:00:00', '\0f\0f\05\00\0d\0b\0c\05\0-\02\04\07\0f\0-\01\01\0e\0f\0-\0a\0c\03\07\0-\00\0a\01\08\06\0f\07\0b\0e\00\03\0d', '\05\05\05\09\09\0c\04\06\0-\02\09\06\03\0-\01\01\0e\0f\0-\0a\0c\03\07\0-\00\0a\01\08\06\0f\07\0b\0e\00\03\0d', NULL, '0', ''),
(41, 1, 54, 8, 0, 0, '2024-05-21 00:00:00', '\0f\0f\05\00\0d\0b\0c\05\0-\02\04\07\0f\0-\01\01\0e\0f\0-\0a\0c\03\07\0-\00\0a\01\08\06\0f\07\0b\0e\00\03\0d', '\05\05\05\09\09\0c\04\06\0-\02\09\06\03\0-\01\01\0e\0f\0-\0a\0c\03\07\0-\00\0a\01\08\06\0f\07\0b\0e\00\03\0d', NULL, '0', ''),
(73, 1, 55, 8, 0, 0, '2024-05-23 00:00:00', '\0f\0f\05\00\0d\0b\0c\05\0-\02\04\07\0f\0-\01\01\0e\0f\0-\0a\0c\03\07\0-\00\0a\01\08\06\0f\07\0b\0e\00\03\0d', '\05\05\05\09\09\0c\04\06\0-\02\09\06\03\0-\01\01\0e\0f\0-\0a\0c\03\07\0-\00\0a\01\08\06\0f\07\0b\0e\00\03\0d', NULL, '0', ''),
(74, 1, 56, 8, 0, 0, '2024-05-23 00:00:00', '\0f\0f\05\00\0d\0b\0c\05\0-\02\04\07\0f\0-\01\01\0e\0f\0-\0a\0c\03\07\0-\00\0a\01\08\06\0f\07\0b\0e\00\03\0d', '\05\05\05\09\09\0c\04\06\0-\02\09\06\03\0-\01\01\0e\0f\0-\0a\0c\03\07\0-\00\0a\01\08\06\0f\07\0b\0e\00\03\0d', NULL, '0', ''),
(75, 1, 57, 8, 0, 0, '2024-05-23 00:00:00', '\0f\0f\05\00\0d\0b\0c\05\0-\02\04\07\0f\0-\01\01\0e\0f\0-\0a\0c\03\07\0-\00\0a\01\08\06\0f\07\0b\0e\00\03\0d', '\05\05\05\09\09\0c\04\06\0-\02\09\06\03\0-\01\01\0e\0f\0-\0a\0c\03\07\0-\00\0a\01\08\06\0f\07\0b\0e\00\03\0d', NULL, '0', ''),
(77, 1, 65, 8, 0, 0, '2024-05-27 00:00:00', '\0f\0f\05\00\0d\0b\0c\05\0-\02\04\07\0f\0-\01\01\0e\0f\0-\0a\0c\03\07\0-\00\0a\01\08\06\0f\07\0b\0e\00\03\0d', '\05\05\05\09\09\0c\04\06\0-\02\09\06\03\0-\01\01\0e\0f\0-\0a\0c\03\07\0-\00\0a\01\08\06\0f\07\0b\0e\00\03\0d', NULL, '0', ''),
(78, 1, 50, 8, 0, 0, '2024-05-27 00:00:00', '\0f\0f\05\00\0d\0b\0c\05\0-\02\04\07\0f\0-\01\01\0e\0f\0-\0a\0c\03\07\0-\00\0a\01\08\06\0f\07\0b\0e\00\03\0d', '\05\05\05\09\09\0c\04\06\0-\02\09\06\03\0-\01\01\0e\0f\0-\0a\0c\03\07\0-\00\0a\01\08\06\0f\07\0b\0e\00\03\0d', NULL, '0', ''),
(79, 1, 67, 8, 0, 0, '2024-05-27 00:00:00', '\0f\0f\05\00\0d\0b\0c\05\0-\02\04\07\0f\0-\01\01\0e\0f\0-\0a\0c\03\07\0-\00\0a\01\08\06\0f\07\0b\0e\00\03\0d', '\05\05\05\09\09\0c\04\06\0-\02\09\06\03\0-\01\01\0e\0f\0-\0a\0c\03\07\0-\00\0a\01\08\06\0f\07\0b\0e\00\03\0d', NULL, '0', ''),
(104, 1, 76, 8, 0, 0, '2024-05-29 00:00:00', '\0f\0f\05\00\0d\0b\0c\05\0-\02\04\07\0f\0-\01\01\0e\0f\0-\0a\0c\03\07\0-\00\0a\01\08\06\0f\07\0b\0e\00\03\0d', '\05\05\05\09\09\0c\04\06\0-\02\09\06\03\0-\01\01\0e\0f\0-\0a\0c\03\07\0-\00\0a\01\08\06\0f\07\0b\0e\00\03\0d', NULL, '0', ''),
(114, 1, 50, 8, 0, 0, '2024-05-30 00:00:00', '\0f\0f\05\00\0d\0b\0c\05\0-\02\04\07\0f\0-\01\01\0e\0f\0-\0a\0c\03\07\0-\00\0a\01\08\06\0f\07\0b\0e\00\03\0d', '\05\05\05\09\09\0c\04\06\0-\02\09\06\03\0-\01\01\0e\0f\0-\0a\0c\03\07\0-\00\0a\01\08\06\0f\07\0b\0e\00\03\0d', NULL, '0', ''),
(115, 1, 50, 8, 0, 0, '2024-05-30 00:00:00', '\0f\0f\05\00\0d\0b\0c\05\0-\02\04\07\0f\0-\01\01\0e\0f\0-\0a\0c\03\07\0-\00\0a\01\08\06\0f\07\0b\0e\00\03\0d', '\05\05\05\09\09\0c\04\06\0-\02\09\06\03\0-\01\01\0e\0f\0-\0a\0c\03\07\0-\00\0a\01\08\06\0f\07\0b\0e\00\03\0d', NULL, '0', ''),
(122, 1, 79, 8, 0, 0, '2024-05-30 00:00:00', '\0f\0f\05\00\0d\0b\0c\05\0-\02\04\07\0f\0-\01\01\0e\0f\0-\0a\0c\03\07\0-\00\0a\01\08\06\0f\07\0b\0e\00\03\0d', '\05\05\05\09\09\0c\04\06\0-\02\09\06\03\0-\01\01\0e\0f\0-\0a\0c\03\07\0-\00\0a\01\08\06\0f\07\0b\0e\00\03\0d', NULL, '0', ''),
(124, 1, 79, 8, 0, 0, '2024-05-30 00:00:00', '\0f\0f\05\00\0d\0b\0c\05\0-\02\04\07\0f\0-\01\01\0e\0f\0-\0a\0c\03\07\0-\00\0a\01\08\06\0f\07\0b\0e\00\03\0d', '\05\05\05\09\09\0c\04\06\0-\02\09\06\03\0-\01\01\0e\0f\0-\0a\0c\03\07\0-\00\0a\01\08\06\0f\07\0b\0e\00\03\0d', NULL, '0', ''),
(129, 1, 80, 8, 0, 0, '2024-05-30 00:00:00', '\0f\0f\05\00\0d\0b\0c\05\0-\02\04\07\0f\0-\01\01\0e\0f\0-\0a\0c\03\07\0-\00\0a\01\08\06\0f\07\0b\0e\00\03\0d', '\05\05\05\09\09\0c\04\06\0-\02\09\06\03\0-\01\01\0e\0f\0-\0a\0c\03\07\0-\00\0a\01\08\06\0f\07\0b\0e\00\03\0d', NULL, '0', ''),
(131, 1, 49, 8, 0, 0, '2024-05-31 00:00:00', '\0f\0f\05\00\0d\0b\0c\05\0-\02\04\07\0f\0-\01\01\0e\0f\0-\0a\0c\03\07\0-\00\0a\01\08\06\0f\07\0b\0e\00\03\0d', '\05\05\05\09\09\0c\04\06\0-\02\09\06\03\0-\01\01\0e\0f\0-\0a\0c\03\07\0-\00\0a\01\08\06\0f\07\0b\0e\00\03\0d', NULL, '0', ''),
(133, 1, 1, 8, 0, 0, '2024-05-31 00:00:00', '\0f\0f\05\00\0d\0b\0c\05\0-\02\04\07\0f\0-\01\01\0e\0f\0-\0a\0c\03\07\0-\00\0a\01\08\06\0f\07\0b\0e\00\03\0d', '\05\05\05\09\09\0c\04\06\0-\02\09\06\03\0-\01\01\0e\0f\0-\0a\0c\03\07\0-\00\0a\01\08\06\0f\07\0b\0e\00\03\0d', NULL, '0', ''),
(134, 1, 1, 8, 0, 0, '2024-05-31 00:00:00', '\0f\0f\05\00\0d\0b\0c\05\0-\02\04\07\0f\0-\01\01\0e\0f\0-\0a\0c\03\07\0-\00\0a\01\08\06\0f\07\0b\0e\00\03\0d', '\05\05\05\09\09\0c\04\06\0-\02\09\06\03\0-\01\01\0e\0f\0-\0a\0c\03\07\0-\00\0a\01\08\06\0f\07\0b\0e\00\03\0d', NULL, '0', ''),
(135, 1, 1, 8, 0, 0, '2024-05-31 00:00:00', '\0f\0f\05\00\0d\0b\0c\05\0-\02\04\07\0f\0-\01\01\0e\0f\0-\0a\0c\03\07\0-\00\0a\01\08\06\0f\07\0b\0e\00\03\0d', '\05\05\05\09\09\0c\04\06\0-\02\09\06\03\0-\01\01\0e\0f\0-\0a\0c\03\07\0-\00\0a\01\08\06\0f\07\0b\0e\00\03\0d', NULL, '0', ''),
(136, 1, 1, 8, 0, 0, '2024-05-31 00:00:00', '\0f\0f\05\00\0d\0b\0c\05\0-\02\04\07\0f\0-\01\01\0e\0f\0-\0a\0c\03\07\0-\00\0a\01\08\06\0f\07\0b\0e\00\03\0d', '\05\05\05\09\09\0c\04\06\0-\02\09\06\03\0-\01\01\0e\0f\0-\0a\0c\03\07\0-\00\0a\01\08\06\0f\07\0b\0e\00\03\0d', NULL, '0', ''),
(137, 1, 1, 8, 0, 0, '2024-05-31 00:00:00', '\0f\0f\05\00\0d\0b\0c\05\0-\02\04\07\0f\0-\01\01\0e\0f\0-\0a\0c\03\07\0-\00\0a\01\08\06\0f\07\0b\0e\00\03\0d', '\05\05\05\09\09\0c\04\06\0-\02\09\06\03\0-\01\01\0e\0f\0-\0a\0c\03\07\0-\00\0a\01\08\06\0f\07\0b\0e\00\03\0d', NULL, '0', ''),
(138, 1, 1, 8, 0, 0, '2024-05-31 00:00:00', '\0f\0f\05\00\0d\0b\0c\05\0-\02\04\07\0f\0-\01\01\0e\0f\0-\0a\0c\03\07\0-\00\0a\01\08\06\0f\07\0b\0e\00\03\0d', '\05\05\05\09\09\0c\04\06\0-\02\09\06\03\0-\01\01\0e\0f\0-\0a\0c\03\07\0-\00\0a\01\08\06\0f\07\0b\0e\00\03\0d', NULL, '0', ''),
(139, 1, 1, 8, 0, 0, '2024-05-31 00:00:00', '\0f\0f\05\00\0d\0b\0c\05\0-\02\04\07\0f\0-\01\01\0e\0f\0-\0a\0c\03\07\0-\00\0a\01\08\06\0f\07\0b\0e\00\03\0d', '\05\05\05\09\09\0c\04\06\0-\02\09\06\03\0-\01\01\0e\0f\0-\0a\0c\03\07\0-\00\0a\01\08\06\0f\07\0b\0e\00\03\0d', NULL, '0', ''),
(140, 1, 1, 8, 0, 0, '2024-05-31 00:00:00', '\0f\0f\05\00\0d\0b\0c\05\0-\02\04\07\0f\0-\01\01\0e\0f\0-\0a\0c\03\07\0-\00\0a\01\08\06\0f\07\0b\0e\00\03\0d', '\05\05\05\09\09\0c\04\06\0-\02\09\06\03\0-\01\01\0e\0f\0-\0a\0c\03\07\0-\00\0a\01\08\06\0f\07\0b\0e\00\03\0d', NULL, '0', ''),
(141, 1, 1, 8, 0, 0, '2024-05-31 00:00:00', '\0f\0f\05\00\0d\0b\0c\05\0-\02\04\07\0f\0-\01\01\0e\0f\0-\0a\0c\03\07\0-\00\0a\01\08\06\0f\07\0b\0e\00\03\0d', '\05\05\05\09\09\0c\04\06\0-\02\09\06\03\0-\01\01\0e\0f\0-\0a\0c\03\07\0-\00\0a\01\08\06\0f\07\0b\0e\00\03\0d', NULL, '0', ''),
(142, 4, 1, 8, 0, 0, '2024-05-31 00:00:00', '\0f\0f\05\00\0d\0b\0c\05\0-\02\04\07\0f\0-\01\01\0e\0f\0-\0a\0c\03\07\0-\00\0a\01\08\06\0f\07\0b\0e\00\03\0d', '\05\05\05\09\09\0c\04\06\0-\02\09\06\03\0-\01\01\0e\0f\0-\0a\0c\03\07\0-\00\0a\01\08\06\0f\07\0b\0e\00\03\0d', NULL, '0', ''),
(143, 3, 1, 8, 0, 0, '2024-05-31 00:00:00', '\0f\0f\05\00\0d\0b\0c\05\0-\02\04\07\0f\0-\01\01\0e\0f\0-\0a\0c\03\07\0-\00\0a\01\08\06\0f\07\0b\0e\00\03\0d', '\05\05\05\09\09\0c\04\06\0-\02\09\06\03\0-\01\01\0e\0f\0-\0a\0c\03\07\0-\00\0a\01\08\06\0f\07\0b\0e\00\03\0d', NULL, '0', ''),
(144, 1, 79, 8, 0, 0, '2024-05-31 00:00:00', '\0f\0f\05\00\0d\0b\0c\05\0-\02\04\07\0f\0-\01\01\0e\0f\0-\0a\0c\03\07\0-\00\0a\01\08\06\0f\07\0b\0e\00\03\0d', '\05\05\05\09\09\0c\04\06\0-\02\09\06\03\0-\01\01\0e\0f\0-\0a\0c\03\07\0-\00\0a\01\08\06\0f\07\0b\0e\00\03\0d', NULL, '0', ''),
(145, 1, 80, 8, 0, 0, '2024-06-03 00:00:00', '\0f\0f\05\00\0d\0b\0c\05\0-\02\04\07\0f\0-\01\01\0e\0f\0-\0a\0c\03\07\0-\00\0a\01\08\06\0f\07\0b\0e\00\03\0d', '\05\05\05\09\09\0c\04\06\0-\02\09\06\03\0-\01\01\0e\0f\0-\0a\0c\03\07\0-\00\0a\01\08\06\0f\07\0b\0e\00\03\0d', NULL, '0', ''),
(146, 1, 81, 8, 0, 0, '2024-06-03 00:00:00', '\0f\0f\05\00\0d\0b\0c\05\0-\02\04\07\0f\0-\01\01\0e\0f\0-\0a\0c\03\07\0-\00\0a\01\08\06\0f\07\0b\0e\00\03\0d', '\05\05\05\09\09\0c\04\06\0-\02\09\06\03\0-\01\01\0e\0f\0-\0a\0c\03\07\0-\00\0a\01\08\06\0f\07\0b\0e\00\03\0d', NULL, '0', ''),
(147, 1, 1, 0, 0, 0, '2024-06-04 00:00:00', '\0f\0f\05\00\0d\0b\0c\05\0-\02\04\07\0f\0-\01\01\0e\0f\0-\0a\0c\03\07\0-\00\0a\01\08\06\0f\07\0b\0e\00\03\0d', '\05\05\05\09\09\0c\04\06\0-\02\09\06\03\0-\01\01\0e\0f\0-\0a\0c\03\07\0-\00\0a\01\08\06\0f\07\0b\0e\00\03\0d', NULL, '0', ''),
(148, 2, 1, 8, 0, 0, '2024-06-04 00:00:00', '\0f\0f\05\00\0d\0b\0c\05\0-\02\04\07\0f\0-\01\01\0e\0f\0-\0a\0c\03\07\0-\00\0a\01\08\06\0f\07\0b\0e\00\03\0d', '\05\05\05\09\09\0c\04\06\0-\02\09\06\03\0-\01\01\0e\0f\0-\0a\0c\03\07\0-\00\0a\01\08\06\0f\07\0b\0e\00\03\0d', NULL, '0', ''),
(149, 4, 1, 8, 0, 0, '2024-06-04 00:00:00', '\0f\0f\05\00\0d\0b\0c\05\0-\02\04\07\0f\0-\01\01\0e\0f\0-\0a\0c\03\07\0-\00\0a\01\08\06\0f\07\0b\0e\00\03\0d', '\05\05\05\09\09\0c\04\06\0-\02\09\06\03\0-\01\01\0e\0f\0-\0a\0c\03\07\0-\00\0a\01\08\06\0f\07\0b\0e\00\03\0d', NULL, '0', ''),
(150, 4, 1, 8, 0, 0, '2024-06-04 00:00:00', '\0f\0f\05\00\0d\0b\0c\05\0-\02\04\07\0f\0-\01\01\0e\0f\0-\0a\0c\03\07\0-\00\0a\01\08\06\0f\07\0b\0e\00\03\0d', '\05\05\05\09\09\0c\04\06\0-\02\09\06\03\0-\01\01\0e\0f\0-\0a\0c\03\07\0-\00\0a\01\08\06\0f\07\0b\0e\00\03\0d', NULL, '0', ''),
(151, 3, 1, 8, 0, 0, '2024-06-05 00:00:00', '\0f\0f\05\00\0d\0b\0c\05\0-\02\04\07\0f\0-\01\01\0e\0f\0-\0a\0c\03\07\0-\00\0a\01\08\06\0f\07\0b\0e\00\03\0d', '\05\05\05\09\09\0c\04\06\0-\02\09\06\03\0-\01\01\0e\0f\0-\0a\0c\03\07\0-\00\0a\01\08\06\0f\07\0b\0e\00\03\0d', NULL, '0', ''),
(152, 4, 1, 8, 0, 0, '2024-06-05 00:00:00', '\0f\0f\05\00\0d\0b\0c\05\0-\02\04\07\0f\0-\01\01\0e\0f\0-\0a\0c\03\07\0-\00\0a\01\08\06\0f\07\0b\0e\00\03\0d', '\05\05\05\09\09\0c\04\06\0-\02\09\06\03\0-\01\01\0e\0f\0-\0a\0c\03\07\0-\00\0a\01\08\06\0f\07\0b\0e\00\03\0d', NULL, '0', ''),
(153, 4, 1, 8, 0, 0, '2024-06-05 00:00:00', '\0f\0f\05\00\0d\0b\0c\05\0-\02\04\07\0f\0-\01\01\0e\0f\0-\0a\0c\03\07\0-\00\0a\01\08\06\0f\07\0b\0e\00\03\0d', '\05\05\05\09\09\0c\04\06\0-\02\09\06\03\0-\01\01\0e\0f\0-\0a\0c\03\07\0-\00\0a\01\08\06\0f\07\0b\0e\00\03\0d', NULL, '0', ''),
(154, 4, 1, 8, 0, 0, '2024-06-05 00:00:00', '\0f\0f\05\00\0d\0b\0c\05\0-\02\04\07\0f\0-\01\01\0e\0f\0-\0a\0c\03\07\0-\00\0a\01\08\06\0f\07\0b\0e\00\03\0d', '\05\05\05\09\09\0c\04\06\0-\02\09\06\03\0-\01\01\0e\0f\0-\0a\0c\03\07\0-\00\0a\01\08\06\0f\07\0b\0e\00\03\0d', NULL, '0', ''),
(155, 4, 1, 8, 0, 0, '2024-06-05 00:00:00', '\0f\0f\05\00\0d\0b\0c\05\0-\02\04\07\0f\0-\01\01\0e\0f\0-\0a\0c\03\07\0-\00\0a\01\08\06\0f\07\0b\0e\00\03\0d', '\05\05\05\09\09\0c\04\06\0-\02\09\06\03\0-\01\01\0e\0f\0-\0a\0c\03\07\0-\00\0a\01\08\06\0f\07\0b\0e\00\03\0d', NULL, '0', ''),
(156, 3, 1, 8, 10, 0, '2024-06-05 00:00:00', '\0f\0f\05\00\0d\0b\0c\05\0-\02\04\07\0f\0-\01\01\0e\0f\0-\0a\0c\03\07\0-\00\0a\01\08\06\0f\07\0b\0e\00\03\0d', '\05\05\05\09\09\0c\04\06\0-\02\09\06\03\0-\01\01\0e\0f\0-\0a\0c\03\07\0-\00\0a\01\08\06\0f\07\0b\0e\00\03\0d', NULL, '0', ''),
(157, 3, 1, 8, 10, 0, '2024-06-05 00:00:00', '\0f\0f\05\00\0d\0b\0c\05\0-\02\04\07\0f\0-\01\01\0e\0f\0-\0a\0c\03\07\0-\00\0a\01\08\06\0f\07\0b\0e\00\03\0d', '\05\05\05\09\09\0c\04\06\0-\02\09\06\03\0-\01\01\0e\0f\0-\0a\0c\03\07\0-\00\0a\01\08\06\0f\07\0b\0e\00\03\0d', NULL, '0', ''),
(158, 3, 1, 8, 5, 0, '2024-06-05 00:00:00', '\0f\0f\05\00\0d\0b\0c\05\0-\02\04\07\0f\0-\01\01\0e\0f\0-\0a\0c\03\07\0-\00\0a\01\08\06\0f\07\0b\0e\00\03\0d', '\05\05\05\09\09\0c\04\06\0-\02\09\06\03\0-\01\01\0e\0f\0-\0a\0c\03\07\0-\00\0a\01\08\06\0f\07\0b\0e\00\03\0d', NULL, '0', ''),
(159, 4, 82, 8, 1, 0, '2024-06-05 00:00:00', '\0f\0f\05\00\0d\0b\0c\05\0-\02\04\07\0f\0-\01\01\0e\0f\0-\0a\0c\03\07\0-\00\0a\01\08\06\0f\07\0b\0e\00\03\0d', '\05\05\05\09\09\0c\04\06\0-\02\09\06\03\0-\01\01\0e\0f\0-\0a\0c\03\07\0-\00\0a\01\08\06\0f\07\0b\0e\00\03\0d', NULL, '1', ''),
(160, 3, 82, 8, 1, 0, '2024-06-05 00:00:00', '\0f\0f\05\00\0d\0b\0c\05\0-\02\04\07\0f\0-\01\01\0e\0f\0-\0a\0c\03\07\0-\00\0a\01\08\06\0f\07\0b\0e\00\03\0d', '\05\05\05\09\09\0c\04\06\0-\02\09\06\03\0-\01\01\0e\0f\0-\0a\0c\03\07\0-\00\0a\01\08\06\0f\07\0b\0e\00\03\0d', NULL, '1', ''),
(161, 3, 82, 8, 1, 0, '2024-06-05 00:00:00', '\0f\0f\05\00\0d\0b\0c\05\0-\02\04\07\0f\0-\01\01\0e\0f\0-\0a\0c\03\07\0-\00\0a\01\08\06\0f\07\0b\0e\00\03\0d', '\05\05\05\09\09\0c\04\06\0-\02\09\06\03\0-\01\01\0e\0f\0-\0a\0c\03\07\0-\00\0a\01\08\06\0f\07\0b\0e\00\03\0d', NULL, '0', ''),
(162, 2, 82, 8, 5, 0, '2024-06-05 00:00:00', '\0f\0f\05\00\0d\0b\0c\05\0-\02\04\07\0f\0-\01\01\0e\0f\0-\0a\0c\03\07\0-\00\0a\01\08\06\0f\07\0b\0e\00\03\0d', '\05\05\05\09\09\0c\04\06\0-\02\09\06\03\0-\01\01\0e\0f\0-\0a\0c\03\07\0-\00\0a\01\08\06\0f\07\0b\0e\00\03\0d', NULL, '1', ''),
(163, 1, 82, 8, 10, 0, '2024-06-05 00:00:00', '\0f\0f\05\00\0d\0b\0c\05\0-\02\04\07\0f\0-\01\01\0e\0f\0-\0a\0c\03\07\0-\00\0a\01\08\06\0f\07\0b\0e\00\03\0d', '\05\05\05\09\09\0c\04\06\0-\02\09\06\03\0-\01\01\0e\0f\0-\0a\0c\03\07\0-\00\0a\01\08\06\0f\07\0b\0e\00\03\0d', NULL, '1', ''),
(164, 1, 82, 8, 10, 0, '2024-06-05 00:00:00', '\0f\0f\05\00\0d\0b\0c\05\0-\02\04\07\0f\0-\01\01\0e\0f\0-\0a\0c\03\07\0-\00\0a\01\08\06\0f\07\0b\0e\00\03\0d', '\05\05\05\09\09\0c\04\06\0-\02\09\06\03\0-\01\01\0e\0f\0-\0a\0c\03\07\0-\00\0a\01\08\06\0f\07\0b\0e\00\03\0d', NULL, '0', ''),
(165, 2, 1, 8, 5, 0, '2024-06-06 00:00:00', '\0f\0f\05\00\0d\0b\0c\05\0-\02\04\07\0f\0-\01\01\0e\0f\0-\0a\0c\03\07\0-\00\0a\01\08\06\0f\07\0b\0e\00\03\0d', '\05\05\05\09\09\0c\04\06\0-\02\09\06\03\0-\01\01\0e\0f\0-\0a\0c\03\07\0-\00\0a\01\08\06\0f\07\0b\0e\00\03\0d', NULL, '0', '0'),
(166, 2, 1, 8, 5, 0, '2024-06-06 00:00:00', '\0f\0f\05\00\0d\0b\0c\05\0-\02\04\07\0f\0-\01\01\0e\0f\0-\0a\0c\03\07\0-\00\0a\01\08\06\0f\07\0b\0e\00\03\0d', '\05\05\05\09\09\0c\04\06\0-\02\09\06\03\0-\01\01\0e\0f\0-\0a\0c\03\07\0-\00\0a\01\08\06\0f\07\0b\0e\00\03\0d', NULL, '0', '0'),
(167, 2, 1, 8, 5, 0, '2024-06-06 00:00:00', '\0f\0f\05\00\0d\0b\0c\05\0-\02\04\07\0f\0-\01\01\0e\0f\0-\0a\0c\03\07\0-\00\0a\01\08\06\0f\07\0b\0e\00\03\0d', '\05\05\05\09\09\0c\04\06\0-\02\09\06\03\0-\01\01\0e\0f\0-\0a\0c\03\07\0-\00\0a\01\08\06\0f\07\0b\0e\00\03\0d', NULL, '0', '0'),
(168, 2, 1, 8, 5, 0, '2024-06-06 00:00:00', '\0f\0f\05\00\0d\0b\0c\05\0-\02\04\07\0f\0-\01\01\0e\0f\0-\0a\0c\03\07\0-\00\0a\01\08\06\0f\07\0b\0e\00\03\0d', '\05\05\05\09\09\0c\04\06\0-\02\09\06\03\0-\01\01\0e\0f\0-\0a\0c\03\07\0-\00\0a\01\08\06\0f\07\0b\0e\00\03\0d', NULL, '0', '0'),
(169, 2, 1, 8, 5, 0, '2024-06-06 00:00:00', '\0f\0f\05\00\0d\0b\0c\05\0-\02\04\07\0f\0-\01\01\0e\0f\0-\0a\0c\03\07\0-\00\0a\01\08\06\0f\07\0b\0e\00\03\0d', '\05\05\05\09\09\0c\04\06\0-\02\09\06\03\0-\01\01\0e\0f\0-\0a\0c\03\07\0-\00\0a\01\08\06\0f\07\0b\0e\00\03\0d', NULL, '0', '0'),
(170, 2, 1, 8, 5, 0, '2024-06-06 00:00:00', '\0f\0f\05\00\0d\0b\0c\05\0-\02\04\07\0f\0-\01\01\0e\0f\0-\0a\0c\03\07\0-\00\0a\01\08\06\0f\07\0b\0e\00\03\0d', '\05\05\05\09\09\0c\04\06\0-\02\09\06\03\0-\01\01\0e\0f\0-\0a\0c\03\07\0-\00\0a\01\08\06\0f\07\0b\0e\00\03\0d', NULL, '0', '0'),
(171, 2, 1, 8, 5, 0, '2024-06-06 00:00:00', '\0f\0f\05\00\0d\0b\0c\05\0-\02\04\07\0f\0-\01\01\0e\0f\0-\0a\0c\03\07\0-\00\0a\01\08\06\0f\07\0b\0e\00\03\0d', '\05\05\05\09\09\0c\04\06\0-\02\09\06\03\0-\01\01\0e\0f\0-\0a\0c\03\07\0-\00\0a\01\08\06\0f\07\0b\0e\00\03\0d', NULL, '0', '0'),
(172, 2, 1, 8, 5, 0, '2024-06-06 00:00:00', '\0f\0f\05\00\0d\0b\0c\05\0-\02\04\07\0f\0-\01\01\0e\0f\0-\0a\0c\03\07\0-\00\0a\01\08\06\0f\07\0b\0e\00\03\0d', '\05\05\05\09\09\0c\04\06\0-\02\09\06\03\0-\01\01\0e\0f\0-\0a\0c\03\07\0-\00\0a\01\08\06\0f\07\0b\0e\00\03\0d', NULL, '0', '0'),
(173, 2, 1, 8, 5, 0, '2024-06-06 00:00:00', '\0f\0f\05\00\0d\0b\0c\05\0-\02\04\07\0f\0-\01\01\0e\0f\0-\0a\0c\03\07\0-\00\0a\01\08\06\0f\07\0b\0e\00\03\0d', '\05\05\05\09\09\0c\04\06\0-\02\09\06\03\0-\01\01\0e\0f\0-\0a\0c\03\07\0-\00\0a\01\08\06\0f\07\0b\0e\00\03\0d', NULL, '0', '0'),
(174, 2, 1, 8, 5, 0, '2024-06-06 00:00:00', '\0f\0f\05\00\0d\0b\0c\05\0-\02\04\07\0f\0-\01\01\0e\0f\0-\0a\0c\03\07\0-\00\0a\01\08\06\0f\07\0b\0e\00\03\0d', '\05\05\05\09\09\0c\04\06\0-\02\09\06\03\0-\01\01\0e\0f\0-\0a\0c\03\07\0-\00\0a\01\08\06\0f\07\0b\0e\00\03\0d', NULL, '0', '-6795067940635158488'),
(175, 2, 1, 8, 5, 0, '2024-06-06 00:00:00', '\0f\0f\05\00\0d\0b\0c\05\0-\02\04\07\0f\0-\01\01\0e\0f\0-\0a\0c\03\07\0-\00\0a\01\08\06\0f\07\0b\0e\00\03\0d', '\05\05\05\09\09\0c\04\06\0-\02\09\06\03\0-\01\01\0e\0f\0-\0a\0c\03\07\0-\00\0a\01\08\06\0f\07\0b\0e\00\03\0d', NULL, '0', '-4396221257976817462'),
(176, 3, 1, 8, 10, 0, '2024-06-06 00:00:00', '\0f\0f\05\00\0d\0b\0c\05\0-\02\04\07\0f\0-\01\01\0e\0f\0-\0a\0c\03\07\0-\00\0a\01\08\06\0f\07\0b\0e\00\03\0d', '\05\05\05\09\09\0c\04\06\0-\02\09\06\03\0-\01\01\0e\0f\0-\0a\0c\03\07\0-\00\0a\01\08\06\0f\07\0b\0e\00\03\0d', NULL, '0', '-1153158703401703257'),
(177, 3, 1, 8, 1, 0, '2024-06-06 00:00:00', '\0f\0f\05\00\0d\0b\0c\05\0-\02\04\07\0f\0-\01\01\0e\0f\0-\0a\0c\03\07\0-\00\0a\01\08\06\0f\07\0b\0e\00\03\0d', '\05\05\05\09\09\0c\04\06\0-\02\09\06\03\0-\01\01\0e\0f\0-\0a\0c\03\07\0-\00\0a\01\08\06\0f\07\0b\0e\00\03\0d', NULL, '0', '5788138001948299144'),
(178, 3, 1, 8, 1, 0, '2024-06-06 00:00:00', '\0f\0f\05\00\0d\0b\0c\05\0-\02\04\07\0f\0-\01\01\0e\0f\0-\0a\0c\03\07\0-\00\0a\01\08\06\0f\07\0b\0e\00\03\0d', '\05\05\05\09\09\0c\04\06\0-\02\09\06\03\0-\01\01\0e\0f\0-\0a\0c\03\07\0-\00\0a\01\08\06\0f\07\0b\0e\00\03\0d', NULL, '0', '-1657404881681269079'),
(179, 2, 1, 8, 5, 0, '2024-06-06 00:00:00', '\0f\0f\05\00\0d\0b\0c\05\0-\02\04\07\0f\0-\01\01\0e\0f\0-\0a\0c\03\07\0-\00\0a\01\08\06\0f\07\0b\0e\00\03\0d', '\05\05\05\09\09\0c\04\06\0-\02\09\06\03\0-\01\01\0e\0f\0-\0a\0c\03\07\0-\00\0a\01\08\06\0f\07\0b\0e\00\03\0d', NULL, '0', '-8296557955577117958'),
(180, 2, 1, 8, 5, 0, '2024-06-06 00:00:00', '\0f\0f\05\00\0d\0b\0c\05\0-\02\04\07\0f\0-\01\01\0e\0f\0-\0a\0c\03\07\0-\00\0a\01\08\06\0f\07\0b\0e\00\03\0d', '\05\05\05\09\09\0c\04\06\0-\02\09\06\03\0-\01\01\0e\0f\0-\0a\0c\03\07\0-\00\0a\01\08\06\0f\07\0b\0e\00\03\0d', NULL, '0', '5738455110190630536'),
(181, 2, 1, 8, 5, 0, '2024-06-06 00:00:00', '\0f\0f\05\00\0d\0b\0c\05\0-\02\04\07\0f\0-\01\01\0e\0f\0-\0a\0c\03\07\0-\00\0a\01\08\06\0f\07\0b\0e\00\03\0d', '\05\05\05\09\09\0c\04\06\0-\02\09\06\03\0-\01\01\0e\0f\0-\0a\0c\03\07\0-\00\0a\01\08\06\0f\07\0b\0e\00\03\0d', NULL, '0', '-3264039503159356107'),
(182, 2, 1, 8, 5, 0, '2024-06-06 00:00:00', '\0f\0f\05\00\0d\0b\0c\05\0-\02\04\07\0f\0-\01\01\0e\0f\0-\0a\0c\03\07\0-\00\0a\01\08\06\0f\07\0b\0e\00\03\0d', '\05\05\05\09\09\0c\04\06\0-\02\09\06\03\0-\01\01\0e\0f\0-\0a\0c\03\07\0-\00\0a\01\08\06\0f\07\0b\0e\00\03\0d', NULL, '0', '4515675667602683260'),
(183, 2, 1, 8, 5, 0, '2024-06-06 00:00:00', '\0f\0f\05\00\0d\0b\0c\05\0-\02\04\07\0f\0-\01\01\0e\0f\0-\0a\0c\03\07\0-\00\0a\01\08\06\0f\07\0b\0e\00\03\0d', '\05\05\05\09\09\0c\04\06\0-\02\09\06\03\0-\01\01\0e\0f\0-\0a\0c\03\07\0-\00\0a\01\08\06\0f\07\0b\0e\00\03\0d', NULL, '0', '8743310957090318680'),
(184, 3, 1, 8, 1, 0, '2024-06-06 00:00:00', '\0f\0f\05\00\0d\0b\0c\05\0-\02\04\07\0f\0-\01\01\0e\0f\0-\0a\0c\03\07\0-\00\0a\01\08\06\0f\07\0b\0e\00\03\0d', '\05\05\05\09\09\0c\04\06\0-\02\09\06\03\0-\01\01\0e\0f\0-\0a\0c\03\07\0-\00\0a\01\08\06\0f\07\0b\0e\00\03\0d', NULL, '1', '-440452143734585349'),
(185, 2, 81, 8, 0, 0, '2024-06-07 00:00:00', '\0f\0f\05\00\0d\0b\0c\05\0-\02\04\07\0f\0-\01\01\0e\0f\0-\0a\0c\03\07\0-\00\0a\01\08\06\0f\07\0b\0e\00\03\0d', '\05\05\05\09\09\0c\04\06\0-\02\09\06\03\0-\01\01\0e\0f\0-\0a\0c\03\07\0-\00\0a\01\08\06\0f\07\0b\0e\00\03\0d', NULL, '0', '3151584515975557985'),
(186, 1, 81, 8, 0, 0, '2024-06-07 00:00:00', '\0f\0f\05\00\0d\0b\0c\05\0-\02\04\07\0f\0-\01\01\0e\0f\0-\0a\0c\03\07\0-\00\0a\01\08\06\0f\07\0b\0e\00\03\0d', '\05\05\05\09\09\0c\04\06\0-\02\09\06\03\0-\01\01\0e\0f\0-\0a\0c\03\07\0-\00\0a\01\08\06\0f\07\0b\0e\00\03\0d', NULL, '1', '-6550178551167118109'),
(187, 4, 83, 8, 0, 0, '2024-06-07 00:00:00', '\0f\0f\05\00\0d\0b\0c\05\0-\02\04\07\0f\0-\01\01\0e\0f\0-\0a\0c\03\07\0-\00\0a\01\08\06\0f\07\0b\0e\00\03\0d', '\05\05\05\09\09\0c\04\06\0-\02\09\06\03\0-\01\01\0e\0f\0-\0a\0c\03\07\0-\00\0a\01\08\06\0f\07\0b\0e\00\03\0d', NULL, '1', '6660214478574785021'),
(188, 3, 84, 8, 0, 0, '2024-06-07 00:00:00', '\0f\0f\05\00\0d\0b\0c\05\0-\02\04\07\0f\0-\01\01\0e\0f\0-\0a\0c\03\07\0-\00\0a\01\08\06\0f\07\0b\0e\00\03\0d', '\05\05\05\09\09\0c\04\06\0-\02\09\06\03\0-\01\01\0e\0f\0-\0a\0c\03\07\0-\00\0a\01\08\06\0f\07\0b\0e\00\03\0d', NULL, '0', '5908997293237845558'),
(189, 3, 84, 8, 0, 0, '2024-06-07 00:00:00', '\0f\0f\05\00\0d\0b\0c\05\0-\02\04\07\0f\0-\01\01\0e\0f\0-\0a\0c\03\07\0-\00\0a\01\08\06\0f\07\0b\0e\00\03\0d', '\05\05\05\09\09\0c\04\06\0-\02\09\06\03\0-\01\01\0e\0f\0-\0a\0c\03\07\0-\00\0a\01\08\06\0f\07\0b\0e\00\03\0d', NULL, '0', '-8434226141881350783'),
(190, 3, 84, 8, 0, 0, '2024-06-07 00:00:00', '\0f\0f\05\00\0d\0b\0c\05\0-\02\04\07\0f\0-\01\01\0e\0f\0-\0a\0c\03\07\0-\00\0a\01\08\06\0f\07\0b\0e\00\03\0d', '\05\05\05\09\09\0c\04\06\0-\02\09\06\03\0-\01\01\0e\0f\0-\0a\0c\03\07\0-\00\0a\01\08\06\0f\07\0b\0e\00\03\0d', NULL, '0', '-3336171879849784851'),
(191, 3, 84, 8, 0, 0, '2024-06-07 00:00:00', '\0f\0f\05\00\0d\0b\0c\05\0-\02\04\07\0f\0-\01\01\0e\0f\0-\0a\0c\03\07\0-\00\0a\01\08\06\0f\07\0b\0e\00\03\0d', '\05\05\05\09\09\0c\04\06\0-\02\09\06\03\0-\01\01\0e\0f\0-\0a\0c\03\07\0-\00\0a\01\08\06\0f\07\0b\0e\00\03\0d', NULL, '0', '8017800010472746800'),
(192, 3, 84, 8, 0, 0, '2024-06-07 00:00:00', '\0f\0f\05\00\0d\0b\0c\05\0-\02\04\07\0f\0-\01\01\0e\0f\0-\0a\0c\03\07\0-\00\0a\01\08\06\0f\07\0b\0e\00\03\0d', '\05\05\05\09\09\0c\04\06\0-\02\09\06\03\0-\01\01\0e\0f\0-\0a\0c\03\07\0-\00\0a\01\08\06\0f\07\0b\0e\00\03\0d', NULL, '0', '7623276522575352445'),
(193, 3, 84, 8, 0, 0, '2024-06-07 00:00:00', '\0f\0f\05\00\0d\0b\0c\05\0-\02\04\07\0f\0-\01\01\0e\0f\0-\0a\0c\03\07\0-\00\0a\01\08\06\0f\07\0b\0e\00\03\0d', '\05\05\05\09\09\0c\04\06\0-\02\09\06\03\0-\01\01\0e\0f\0-\0a\0c\03\07\0-\00\0a\01\08\06\0f\07\0b\0e\00\03\0d', NULL, '0', '-3917928132594275845'),
(194, 3, 84, 8, 0, 0, '2024-06-07 00:00:00', '\0f\0f\05\00\0d\0b\0c\05\0-\02\04\07\0f\0-\01\01\0e\0f\0-\0a\0c\03\07\0-\00\0a\01\08\06\0f\07\0b\0e\00\03\0d', '\05\05\05\09\09\0c\04\06\0-\02\09\06\03\0-\01\01\0e\0f\0-\0a\0c\03\07\0-\00\0a\01\08\06\0f\07\0b\0e\00\03\0d', NULL, '0', '-3917928132594275845'),
(195, 3, 84, 8, 0, 0, '2024-06-07 00:00:00', '\0f\0f\05\00\0d\0b\0c\05\0-\02\04\07\0f\0-\01\01\0e\0f\0-\0a\0c\03\07\0-\00\0a\01\08\06\0f\07\0b\0e\00\03\0d', '\05\05\05\09\09\0c\04\06\0-\02\09\06\03\0-\01\01\0e\0f\0-\0a\0c\03\07\0-\00\0a\01\08\06\0f\07\0b\0e\00\03\0d', NULL, '0', '-3917928132594275845'),
(196, 3, 84, 8, 0, 0, '2024-06-07 00:00:00', '\0f\0f\05\00\0d\0b\0c\05\0-\02\04\07\0f\0-\01\01\0e\0f\0-\0a\0c\03\07\0-\00\0a\01\08\06\0f\07\0b\0e\00\03\0d', '\05\05\05\09\09\0c\04\06\0-\02\09\06\03\0-\01\01\0e\0f\0-\0a\0c\03\07\0-\00\0a\01\08\06\0f\07\0b\0e\00\03\0d', NULL, '1', '-754771474441220086'),
(197, 3, 84, 8, 0, 0, '2024-06-07 00:00:00', '\0f\0f\05\00\0d\0b\0c\05\0-\02\04\07\0f\0-\01\01\0e\0f\0-\0a\0c\03\07\0-\00\0a\01\08\06\0f\07\0b\0e\00\03\0d', '\05\05\05\09\09\0c\04\06\0-\02\09\06\03\0-\01\01\0e\0f\0-\0a\0c\03\07\0-\00\0a\01\08\06\0f\07\0b\0e\00\03\0d', NULL, '0', '-6059259812185167979'),
(198, 3, 84, 8, 0, 0, '2024-06-07 00:00:00', '\0f\0f\05\00\0d\0b\0c\05\0-\02\04\07\0f\0-\01\01\0e\0f\0-\0a\0c\03\07\0-\00\0a\01\08\06\0f\07\0b\0e\00\03\0d', '\05\05\05\09\09\0c\04\06\0-\02\09\06\03\0-\01\01\0e\0f\0-\0a\0c\03\07\0-\00\0a\01\08\06\0f\07\0b\0e\00\03\0d', NULL, '0', '-3854517145536883239'),
(199, 3, 83, 8, 0, 0, '2024-06-07 00:00:00', '\0f\0f\05\00\0d\0b\0c\05\0-\02\04\07\0f\0-\01\01\0e\0f\0-\0a\0c\03\07\0-\00\0a\01\08\06\0f\07\0b\0e\00\03\0d', '\05\05\05\09\09\0c\04\06\0-\02\09\06\03\0-\01\01\0e\0f\0-\0a\0c\03\07\0-\00\0a\01\08\06\0f\07\0b\0e\00\03\0d', NULL, '0', '7838303624107287217'),
(200, 3, 83, 8, 0, 0, '2024-06-07 00:00:00', '\0f\0f\05\00\0d\0b\0c\05\0-\02\04\07\0f\0-\01\01\0e\0f\0-\0a\0c\03\07\0-\00\0a\01\08\06\0f\07\0b\0e\00\03\0d', '\05\05\05\09\09\0c\04\06\0-\02\09\06\03\0-\01\01\0e\0f\0-\0a\0c\03\07\0-\00\0a\01\08\06\0f\07\0b\0e\00\03\0d', NULL, '0', '-5955822979920505312'),
(201, 3, 83, 8, 0, 0, '2024-06-07 00:00:00', '\0f\0f\05\00\0d\0b\0c\05\0-\02\04\07\0f\0-\01\01\0e\0f\0-\0a\0c\03\07\0-\00\0a\01\08\06\0f\07\0b\0e\00\03\0d', '\05\05\05\09\09\0c\04\06\0-\02\09\06\03\0-\01\01\0e\0f\0-\0a\0c\03\07\0-\00\0a\01\08\06\0f\07\0b\0e\00\03\0d', NULL, '0', '-5955822979920505312'),
(202, 3, 83, 8, 0, 0, '2024-06-07 00:00:00', '\0f\0f\05\00\0d\0b\0c\05\0-\02\04\07\0f\0-\01\01\0e\0f\0-\0a\0c\03\07\0-\00\0a\01\08\06\0f\07\0b\0e\00\03\0d', '\05\05\05\09\09\0c\04\06\0-\02\09\06\03\0-\01\01\0e\0f\0-\0a\0c\03\07\0-\00\0a\01\08\06\0f\07\0b\0e\00\03\0d', NULL, '0', '-5955822979920505312'),
(203, 3, 83, 8, 0, 0, '2024-06-07 00:00:00', '\0f\0f\05\00\0d\0b\0c\05\0-\02\04\07\0f\0-\01\01\0e\0f\0-\0a\0c\03\07\0-\00\0a\01\08\06\0f\07\0b\0e\00\03\0d', '\05\05\05\09\09\0c\04\06\0-\02\09\06\03\0-\01\01\0e\0f\0-\0a\0c\03\07\0-\00\0a\01\08\06\0f\07\0b\0e\00\03\0d', NULL, '0', '-5955822979920505312'),
(204, 3, 83, 8, 0, 0, '2024-06-07 00:00:00', '\0f\0f\05\00\0d\0b\0c\05\0-\02\04\07\0f\0-\01\01\0e\0f\0-\0a\0c\03\07\0-\00\0a\01\08\06\0f\07\0b\0e\00\03\0d', '\05\05\05\09\09\0c\04\06\0-\02\09\06\03\0-\01\01\0e\0f\0-\0a\0c\03\07\0-\00\0a\01\08\06\0f\07\0b\0e\00\03\0d', NULL, '1', '2131671529782816061'),
(205, 2, 81, 8, 0, 0, '2024-06-07 00:00:00', '\0f\0f\05\00\0d\0b\0c\05\0-\02\04\07\0f\0-\01\01\0e\0f\0-\0a\0c\03\07\0-\00\0a\01\08\06\0f\07\0b\0e\00\03\0d', '\05\05\05\09\09\0c\04\06\0-\02\09\06\03\0-\01\01\0e\0f\0-\0a\0c\03\07\0-\00\0a\01\08\06\0f\07\0b\0e\00\03\0d', NULL, '1', '6799411828227833622'),
(206, 1, 134, 8, 0, 0, '2024-06-07 00:00:00', '\0f\0f\05\00\0d\0b\0c\05\0-\02\04\07\0f\0-\01\01\0e\0f\0-\0a\0c\03\07\0-\00\0a\01\08\06\0f\07\0b\0e\00\03\0d', '\05\05\05\09\09\0c\04\06\0-\02\09\06\03\0-\01\01\0e\0f\0-\0a\0c\03\07\0-\00\0a\01\08\06\0f\07\0b\0e\00\03\0d', NULL, '1', '-7504080737826409680'),
(207, 1, 135, 8, 5, 0, '2024-06-07 00:00:00', '\0f\0f\05\00\0d\0b\0c\05\0-\02\04\07\0f\0-\01\01\0e\0f\0-\0a\0c\03\07\0-\00\0a\01\08\06\0f\07\0b\0e\00\03\0d', '\05\05\05\09\09\0c\04\06\0-\02\09\06\03\0-\01\01\0e\0f\0-\0a\0c\03\07\0-\00\0a\01\08\06\0f\07\0b\0e\00\03\0d', NULL, '1', '-2614567410968641616'),
(208, 4, 81, 8, 0, 0, '2024-06-07 00:00:00', '\0f\0f\05\00\0d\0b\0c\05\0-\02\04\07\0f\0-\01\01\0e\0f\0-\0a\0c\03\07\0-\00\0a\01\08\06\0f\07\0b\0e\00\03\0d', '\05\05\05\09\09\0c\04\06\0-\02\09\06\03\0-\01\01\0e\0f\0-\0a\0c\03\07\0-\00\0a\01\08\06\0f\07\0b\0e\00\03\0d', NULL, '1', '-2672245399466402808'),
(209, 3, 81, 8, 0, 0, '2024-06-07 00:00:00', '\0f\0f\05\00\0d\0b\0c\05\0-\02\04\07\0f\0-\01\01\0e\0f\0-\0a\0c\03\07\0-\00\0a\01\08\06\0f\07\0b\0e\00\03\0d', '\05\05\05\09\09\0c\04\06\0-\02\09\06\03\0-\01\01\0e\0f\0-\0a\0c\03\07\0-\00\0a\01\08\06\0f\07\0b\0e\00\03\0d', NULL, '1', '4406842490465264889'),
(210, 2, 137, 8, 0, 0, '2024-06-07 00:00:00', '\0f\0f\05\00\0d\0b\0c\05\0-\02\04\07\0f\0-\01\01\0e\0f\0-\0a\0c\03\07\0-\00\0a\01\08\06\0f\07\0b\0e\00\03\0d', '\05\05\05\09\09\0c\04\06\0-\02\09\06\03\0-\01\01\0e\0f\0-\0a\0c\03\07\0-\00\0a\01\08\06\0f\07\0b\0e\00\03\0d', NULL, '1', '-8144318206756806090'),
(211, 2, 138, 8, 0, 0, '2024-06-08 00:00:00', '\0f\0f\05\00\0d\0b\0c\05\0-\02\04\07\0f\0-\01\01\0e\0f\0-\0a\0c\03\07\0-\00\0a\01\08\06\0f\07\0b\0e\00\03\0d', '\05\05\05\09\09\0c\04\06\0-\02\09\06\03\0-\01\01\0e\0f\0-\0a\0c\03\07\0-\00\0a\01\08\06\0f\07\0b\0e\00\03\0d', NULL, '1', '8182557227772387185'),
(212, 2, 139, 8, 0, 0, '2024-06-08 00:00:00', '\0f\0f\05\00\0d\0b\0c\05\0-\02\04\07\0f\0-\01\01\0e\0f\0-\0a\0c\03\07\0-\00\0a\01\08\06\0f\07\0b\0e\00\03\0d', '\05\05\05\09\09\0c\04\06\0-\02\09\06\03\0-\01\01\0e\0f\0-\0a\0c\03\07\0-\00\0a\01\08\06\0f\07\0b\0e\00\03\0d', NULL, '1', '-500821623016904612'),
(213, 2, 141, 8, 0, 0, '2024-06-08 00:00:00', '\0f\0f\05\00\0d\0b\0c\05\0-\02\04\07\0f\0-\01\01\0e\0f\0-\0a\0c\03\07\0-\00\0a\01\08\06\0f\07\0b\0e\00\03\0d', '\05\05\05\09\09\0c\04\06\0-\02\09\06\03\0-\01\01\0e\0f\0-\0a\0c\03\07\0-\00\0a\01\08\06\0f\07\0b\0e\00\03\0d', NULL, '1', '5970455683413126706'),
(214, 2, 142, 8, 0, 0, '2024-06-08 00:00:00', '\0f\0f\05\00\0d\0b\0c\05\0-\02\04\07\0f\0-\01\01\0e\0f\0-\0a\0c\03\07\0-\00\0a\01\08\06\0f\07\0b\0e\00\03\0d', '\05\05\05\09\09\0c\04\06\0-\02\09\06\03\0-\01\01\0e\0f\0-\0a\0c\03\07\0-\00\0a\01\08\06\0f\07\0b\0e\00\03\0d', NULL, '1', '-3058722259108646961'),
(215, 2, 144, 8, 10, 0, '2024-06-08 00:00:00', '\0f\0f\05\00\0d\0b\0c\05\0-\02\04\07\0f\0-\01\01\0e\0f\0-\0a\0c\03\07\0-\00\0a\01\08\06\0f\07\0b\0e\00\03\0d', '\05\05\05\09\09\0c\04\06\0-\02\09\06\03\0-\01\01\0e\0f\0-\0a\0c\03\07\0-\00\0a\01\08\06\0f\07\0b\0e\00\03\0d', NULL, '1', '-1043661733053428678'),
(216, 2, 145, 8, 0, 0, '2024-06-08 00:00:00', '\0f\0f\05\00\0d\0b\0c\05\0-\02\04\07\0f\0-\01\01\0e\0f\0-\0a\0c\03\07\0-\00\0a\01\08\06\0f\07\0b\0e\00\03\0d', '\05\05\05\09\09\0c\04\06\0-\02\09\06\03\0-\01\01\0e\0f\0-\0a\0c\03\07\0-\00\0a\01\08\06\0f\07\0b\0e\00\03\0d', NULL, '1', '-1043661733053428678'),
(217, 2, 147, 8, 0, 0, '2024-06-08 00:00:00', '\0f\0f\05\00\0d\0b\0c\05\0-\02\04\07\0f\0-\01\01\0e\0f\0-\0a\0c\03\07\0-\00\0a\01\08\06\0f\07\0b\0e\00\03\0d', '\05\05\05\09\09\0c\04\06\0-\02\09\06\03\0-\01\01\0e\0f\0-\0a\0c\03\07\0-\00\0a\01\08\06\0f\07\0b\0e\00\03\0d', NULL, '1', '-3068467235809057389'),
(218, 2, 154, 8, 0, 0, '2024-06-08 00:00:00', '\0f\0f\05\00\0d\0b\0c\05\0-\02\04\07\0f\0-\01\01\0e\0f\0-\0a\0c\03\07\0-\00\0a\01\08\06\0f\07\0b\0e\00\03\0d', '\05\05\05\09\09\0c\04\06\0-\02\09\06\03\0-\01\01\0e\0f\0-\0a\0c\03\07\0-\00\0a\01\08\06\0f\07\0b\0e\00\03\0d', NULL, '1', '5327658139146694315'),
(219, 2, 155, 8, 0, 0, '2024-06-08 00:00:00', '\0f\0f\05\00\0d\0b\0c\05\0-\02\04\07\0f\0-\01\01\0e\0f\0-\0a\0c\03\07\0-\00\0a\01\08\06\0f\07\0b\0e\00\03\0d', '\05\05\05\09\09\0c\04\06\0-\02\09\06\03\0-\01\01\0e\0f\0-\0a\0c\03\07\0-\00\0a\01\08\06\0f\07\0b\0e\00\03\0d', NULL, '1', '-2519964768518277378'),
(220, 2, 156, 8, 0, 0, '2024-06-08 00:00:00', '\0f\0f\05\00\0d\0b\0c\05\0-\02\04\07\0f\0-\01\01\0e\0f\0-\0a\0c\03\07\0-\00\0a\01\08\06\0f\07\0b\0e\00\03\0d', '\05\05\05\09\09\0c\04\06\0-\02\09\06\03\0-\01\01\0e\0f\0-\0a\0c\03\07\0-\00\0a\01\08\06\0f\07\0b\0e\00\03\0d', NULL, '1', '-2519964768518277378'),
(221, 2, 159, 8, 0, 0, '2024-06-08 00:00:00', '\0f\0f\05\00\0d\0b\0c\05\0-\02\04\07\0f\0-\01\01\0e\0f\0-\0a\0c\03\07\0-\00\0a\01\08\06\0f\07\0b\0e\00\03\0d', '\05\05\05\09\09\0c\04\06\0-\02\09\06\03\0-\01\01\0e\0f\0-\0a\0c\03\07\0-\00\0a\01\08\06\0f\07\0b\0e\00\03\0d', NULL, '1', '1294518466584838437'),
(222, 2, 162, 8, 0, 0, '2024-06-08 00:00:00', '\0f\0f\05\00\0d\0b\0c\05\0-\02\04\07\0f\0-\01\01\0e\0f\0-\0a\0c\03\07\0-\00\0a\01\08\06\0f\07\0b\0e\00\03\0d', '\05\05\05\09\09\0c\04\06\0-\02\09\06\03\0-\01\01\0e\0f\0-\0a\0c\03\07\0-\00\0a\01\08\06\0f\07\0b\0e\00\03\0d', NULL, '1', '-4667303929201778564'),
(223, 2, 165, 8, 0, 0, '2024-06-08 00:00:00', '\0f\0f\05\00\0d\0b\0c\05\0-\02\04\07\0f\0-\01\01\0e\0f\0-\0a\0c\03\07\0-\00\0a\01\08\06\0f\07\0b\0e\00\03\0d', '\05\05\05\09\09\0c\04\06\0-\02\09\06\03\0-\01\01\0e\0f\0-\0a\0c\03\07\0-\00\0a\01\08\06\0f\07\0b\0e\00\03\0d', NULL, '1', '-867513169704649713'),
(224, 2, 166, 8, 0, 0, '2024-06-08 00:00:00', '\0f\0f\05\00\0d\0b\0c\05\0-\02\04\07\0f\0-\01\01\0e\0f\0-\0a\0c\03\07\0-\00\0a\01\08\06\0f\07\0b\0e\00\03\0d', '\05\05\05\09\09\0c\04\06\0-\02\09\06\03\0-\01\01\0e\0f\0-\0a\0c\03\07\0-\00\0a\01\08\06\0f\07\0b\0e\00\03\0d', NULL, '1', '-1149286881504605353'),
(225, 2, 168, 8, 0, 0, '2024-06-08 00:00:00', '\0f\0f\05\00\0d\0b\0c\05\0-\02\04\07\0f\0-\01\01\0e\0f\0-\0a\0c\03\07\0-\00\0a\01\08\06\0f\07\0b\0e\00\03\0d', '\05\05\05\09\09\0c\04\06\0-\02\09\06\03\0-\01\01\0e\0f\0-\0a\0c\03\07\0-\00\0a\01\08\06\0f\07\0b\0e\00\03\0d', NULL, '1', '-2966220860794855948'),
(226, 2, 171, 8, 0, 0, '2024-06-08 00:00:00', '\0f\0f\05\00\0d\0b\0c\05\0-\02\04\07\0f\0-\01\01\0e\0f\0-\0a\0c\03\07\0-\00\0a\01\08\06\0f\07\0b\0e\00\03\0d', '\05\05\05\09\09\0c\04\06\0-\02\09\06\03\0-\01\01\0e\0f\0-\0a\0c\03\07\0-\00\0a\01\08\06\0f\07\0b\0e\00\03\0d', NULL, '1', '-4894041410982401292'),
(227, 2, 173, 8, 0, 0, '2024-06-08 00:00:00', '\0f\0f\05\00\0d\0b\0c\05\0-\02\04\07\0f\0-\01\01\0e\0f\0-\0a\0c\03\07\0-\00\0a\01\08\06\0f\07\0b\0e\00\03\0d', '\05\05\05\09\09\0c\04\06\0-\02\09\06\03\0-\01\01\0e\0f\0-\0a\0c\03\07\0-\00\0a\01\08\06\0f\07\0b\0e\00\03\0d', NULL, '1', '-1283133215813565367'),
(228, 2, 179, 8, 0, 0, '2024-06-08 00:00:00', '\0f\0f\05\00\0d\0b\0c\05\0-\02\04\07\0f\0-\01\01\0e\0f\0-\0a\0c\03\07\0-\00\0a\01\08\06\0f\07\0b\0e\00\03\0d', '\05\05\05\09\09\0c\04\06\0-\02\09\06\03\0-\01\01\0e\0f\0-\0a\0c\03\07\0-\00\0a\01\08\06\0f\07\0b\0e\00\03\0d', NULL, '1', '6879091082286825076'),
(229, 2, 180, 8, 1, 0, '2024-06-08 00:00:00', '\0f\0f\05\00\0d\0b\0c\05\0-\02\04\07\0f\0-\01\01\0e\0f\0-\0a\0c\03\07\0-\00\0a\01\08\06\0f\07\0b\0e\00\03\0d', '\05\05\05\09\09\0c\04\06\0-\02\09\06\03\0-\01\01\0e\0f\0-\0a\0c\03\07\0-\00\0a\01\08\06\0f\07\0b\0e\00\03\0d', NULL, '1', '-1456841819973562441'),
(230, 2, 182, 8, 10, 0, '2024-06-08 00:00:00', '\0f\0f\05\00\0d\0b\0c\05\0-\02\04\07\0f\0-\01\01\0e\0f\0-\0a\0c\03\07\0-\00\0a\01\08\06\0f\07\0b\0e\00\03\0d', '\05\05\05\09\09\0c\04\06\0-\02\09\06\03\0-\01\01\0e\0f\0-\0a\0c\03\07\0-\00\0a\01\08\06\0f\07\0b\0e\00\03\0d', NULL, '1', '-855630027805185856'),
(231, 2, 187, 8, 0, 0, '2024-06-08 00:00:00', '\0f\0f\05\00\0d\0b\0c\05\0-\02\04\07\0f\0-\01\01\0e\0f\0-\0a\0c\03\07\0-\00\0a\01\08\06\0f\07\0b\0e\00\03\0d', '\05\05\05\09\09\0c\04\06\0-\02\09\06\03\0-\01\01\0e\0f\0-\0a\0c\03\07\0-\00\0a\01\08\06\0f\07\0b\0e\00\03\0d', NULL, '1', '-5868840679786973492'),
(232, 2, 190, 8, 1, 0, '2024-06-08 00:00:00', '\0f\0f\05\00\0d\0b\0c\05\0-\02\04\07\0f\0-\01\01\0e\0f\0-\0a\0c\03\07\0-\00\0a\01\08\06\0f\07\0b\0e\00\03\0d', '\05\05\05\09\09\0c\04\06\0-\02\09\06\03\0-\01\01\0e\0f\0-\0a\0c\03\07\0-\00\0a\01\08\06\0f\07\0b\0e\00\03\0d', NULL, '1', '-207589908364992863'),
(233, 2, 191, 8, 10, 0, '2024-06-08 00:00:00', '\0f\0f\05\00\0d\0b\0c\05\0-\02\04\07\0f\0-\01\01\0e\0f\0-\0a\0c\03\07\0-\00\0a\01\08\06\0f\07\0b\0e\00\03\0d', '\05\05\05\09\09\0c\04\06\0-\02\09\06\03\0-\01\01\0e\0f\0-\0a\0c\03\07\0-\00\0a\01\08\06\0f\07\0b\0e\00\03\0d', NULL, '1', '8711653818528615001'),
(234, 4, 144, 8, 10, 0, '2024-06-08 00:00:00', '\0f\0f\05\00\0d\0b\0c\05\0-\02\04\07\0f\0-\01\01\0e\0f\0-\0a\0c\03\07\0-\00\0a\01\08\06\0f\07\0b\0e\00\03\0d', '\05\05\05\09\09\0c\04\06\0-\02\09\06\03\0-\01\01\0e\0f\0-\0a\0c\03\07\0-\00\0a\01\08\06\0f\07\0b\0e\00\03\0d', NULL, '1', '8153684594923626976'),
(235, 4, 173, 8, 0, 0, '2024-06-08 00:00:00', '\0f\0f\05\00\0d\0b\0c\05\0-\02\04\07\0f\0-\01\01\0e\0f\0-\0a\0c\03\07\0-\00\0a\01\08\06\0f\07\0b\0e\00\03\0d', '\05\05\05\09\09\0c\04\06\0-\02\09\06\03\0-\01\01\0e\0f\0-\0a\0c\03\07\0-\00\0a\01\08\06\0f\07\0b\0e\00\03\0d', NULL, '1', '-5661350302619322520'),
(236, 4, 187, 8, 0, 0, '2024-06-08 00:00:00', '\0f\0f\05\00\0d\0b\0c\05\0-\02\04\07\0f\0-\01\01\0e\0f\0-\0a\0c\03\07\0-\00\0a\01\08\06\0f\07\0b\0e\00\03\0d', '\05\05\05\09\09\0c\04\06\0-\02\09\06\03\0-\01\01\0e\0f\0-\0a\0c\03\07\0-\00\0a\01\08\06\0f\07\0b\0e\00\03\0d', NULL, '1', '8375778693760035046'),
(237, 2, 222, 8, 0, 0, '2024-06-08 00:00:00', '\0f\0f\05\00\0d\0b\0c\05\0-\02\04\07\0f\0-\01\01\0e\0f\0-\0a\0c\03\07\0-\00\0a\01\08\06\0f\07\0b\0e\00\03\0d', '\05\05\05\09\09\0c\04\06\0-\02\09\06\03\0-\01\01\0e\0f\0-\0a\0c\03\07\0-\00\0a\01\08\06\0f\07\0b\0e\00\03\0d', NULL, '0', '-5440785712876170716'),
(238, 2, 223, 8, 0, 0, '2024-06-08 00:00:00', '\0f\0f\05\00\0d\0b\0c\05\0-\02\04\07\0f\0-\01\01\0e\0f\0-\0a\0c\03\07\0-\00\0a\01\08\06\0f\07\0b\0e\00\03\0d', '\05\05\05\09\09\0c\04\06\0-\02\09\06\03\0-\01\01\0e\0f\0-\0a\0c\03\07\0-\00\0a\01\08\06\0f\07\0b\0e\00\03\0d', NULL, '0', '2983218590512014422'),
(239, 4, 138, 8, 0, 0, '2024-06-08 00:00:00', '\0f\0f\05\00\0d\0b\0c\05\0-\02\04\07\0f\0-\01\01\0e\0f\0-\0a\0c\03\07\0-\00\0a\01\08\06\0f\07\0b\0e\00\03\0d', '\05\05\05\09\09\0c\04\06\0-\02\09\06\03\0-\01\01\0e\0f\0-\0a\0c\03\07\0-\00\0a\01\08\06\0f\07\0b\0e\00\03\0d', NULL, '0', '-8932257121746386378'),
(240, 4, 138, 8, 0, 0, '2024-06-08 00:00:00', '\0f\0f\05\00\0d\0b\0c\05\0-\02\04\07\0f\0-\01\01\0e\0f\0-\0a\0c\03\07\0-\00\0a\01\08\06\0f\07\0b\0e\00\03\0d', '\05\05\05\09\09\0c\04\06\0-\02\09\06\03\0-\01\01\0e\0f\0-\0a\0c\03\07\0-\00\0a\01\08\06\0f\07\0b\0e\00\03\0d', NULL, '1', '3737252146464524039'),
(241, 4, 138, 8, 0, 0, '2024-06-08 00:00:00', '\0f\0f\05\00\0d\0b\0c\05\0-\02\04\07\0f\0-\01\01\0e\0f\0-\0a\0c\03\07\0-\00\0a\01\08\06\0f\07\0b\0e\00\03\0d', '\05\05\05\09\09\0c\04\06\0-\02\09\06\03\0-\01\01\0e\0f\0-\0a\0c\03\07\0-\00\0a\01\08\06\0f\07\0b\0e\00\03\0d', NULL, '0', '-8409791127881679245'),
(242, 2, 226, 8, 5, 0, '2024-06-08 00:00:00', '\0f\0f\05\00\0d\0b\0c\05\0-\02\04\07\0f\0-\01\01\0e\0f\0-\0a\0c\03\07\0-\00\0a\01\08\06\0f\07\0b\0e\00\03\0d', '\05\05\05\09\09\0c\04\06\0-\02\09\06\03\0-\01\01\0e\0f\0-\0a\0c\03\07\0-\00\0a\01\08\06\0f\07\0b\0e\00\03\0d', NULL, '1', '-18894310046463626'),
(243, 2, 231, 8, 5, 0, '2024-06-13 00:00:00', '\0f\0f\05\00\0d\0b\0c\05\0-\02\04\07\0f\0-\01\01\0e\0f\0-\0a\0c\03\07\0-\00\0a\01\08\06\0f\07\0b\0e\00\03\0d', '\05\05\05\09\09\0c\04\06\0-\02\09\06\03\0-\01\01\0e\0f\0-\0a\0c\03\07\0-\00\0a\01\08\06\0f\07\0b\0e\00\03\0d', NULL, '1', '7056414557963400141'),
(244, 4, 234, 8, 5, 0, '2024-06-13 00:00:00', '\0f\0f\05\00\0d\0b\0c\05\0-\02\04\07\0f\0-\01\01\0e\0f\0-\0a\0c\03\07\0-\00\0a\01\08\06\0f\07\0b\0e\00\03\0d', '\05\05\05\09\09\0c\04\06\0-\02\09\06\03\0-\01\01\0e\0f\0-\0a\0c\03\07\0-\00\0a\01\08\06\0f\07\0b\0e\00\03\0d', NULL, '1', '4908202650958241810'),
(245, 3, 234, 8, 5, 0, '2024-06-13 00:00:00', '\0f\0f\05\00\0d\0b\0c\05\0-\02\04\07\0f\0-\01\01\0e\0f\0-\0a\0c\03\07\0-\00\0a\01\08\06\0f\07\0b\0e\00\03\0d', '\05\05\05\09\09\0c\04\06\0-\02\09\06\03\0-\01\01\0e\0f\0-\0a\0c\03\07\0-\00\0a\01\08\06\0f\07\0b\0e\00\03\0d', NULL, '1', '1025245548534784039'),
(246, 2, 234, 8, 5, 0, '2024-06-13 00:00:00', '\0f\0f\05\00\0d\0b\0c\05\0-\02\04\07\0f\0-\01\01\0e\0f\0-\0a\0c\03\07\0-\00\0a\01\08\06\0f\07\0b\0e\00\03\0d', '\05\05\05\09\09\0c\04\06\0-\02\09\06\03\0-\01\01\0e\0f\0-\0a\0c\03\07\0-\00\0a\01\08\06\0f\07\0b\0e\00\03\0d', NULL, '1', '-3611341676494489301'),
(247, 4, 237, 8, 5, 0, '2024-06-13 00:00:00', '\0f\0f\05\00\0d\0b\0c\05\0-\02\04\07\0f\0-\01\01\0e\0f\0-\0a\0c\03\07\0-\00\0a\01\08\06\0f\07\0b\0e\00\03\0d', '\05\05\05\09\09\0c\04\06\0-\02\09\06\03\0-\01\01\0e\0f\0-\0a\0c\03\07\0-\00\0a\01\08\06\0f\07\0b\0e\00\03\0d', NULL, '1', '7558088062779581917'),
(248, 3, 237, 8, 1, 0, '2024-06-13 00:00:00', '\0f\0f\05\00\0d\0b\0c\05\0-\02\04\07\0f\0-\01\01\0e\0f\0-\0a\0c\03\07\0-\00\0a\01\08\06\0f\07\0b\0e\00\03\0d', '\05\05\05\09\09\0c\04\06\0-\02\09\06\03\0-\01\01\0e\0f\0-\0a\0c\03\07\0-\00\0a\01\08\06\0f\07\0b\0e\00\03\0d', NULL, '1', '-5676161293273455288'),
(249, 3, 237, 8, 1, 0, '2024-06-13 00:00:00', '\0f\0f\05\00\0d\0b\0c\05\0-\02\04\07\0f\0-\01\01\0e\0f\0-\0a\0c\03\07\0-\00\0a\01\08\06\0f\07\0b\0e\00\03\0d', '\05\05\05\09\09\0c\04\06\0-\02\09\06\03\0-\01\01\0e\0f\0-\0a\0c\03\07\0-\00\0a\01\08\06\0f\07\0b\0e\00\03\0d', NULL, '0', '-5676161293273455288'),
(250, 2, 237, 8, 1, 0, '2024-06-13 00:00:00', '\0f\0f\05\00\0d\0b\0c\05\0-\02\04\07\0f\0-\01\01\0e\0f\0-\0a\0c\03\07\0-\00\0a\01\08\06\0f\07\0b\0e\00\03\0d', '55599c46-2963-11ef-ac37-0a186f7be031', NULL, '1', '4248327365756152742'),
(251, 2, 237, 8, 1, 0, '2024-06-13 00:00:00', '\0f\0f\05\00\0d\0b\0c\05\0-\02\04\07\0f\0-\01\01\0e\0f\0-\0a\0c\03\07\0-\00\0a\01\08\06\0f\07\0b\0e\00\03\0d', '\05\05\05\09\09\0c\04\06\0-\02\09\06\03\0-\01\01\0e\0f\0-\0a\0c\03\07\0-\00\0a\01\08\06\0f\07\0b\0e\00\03\0d', NULL, '0', '-3548629719098593731'),
(252, 3, 279, 8, 5, 0, '2024-06-20 00:00:00', '12345', '12345', NULL, '0', '1293617335305057223'),
(253, 3, 280, 8, 5, 0, '2024-06-20 00:00:00', '12345', '12345', NULL, '0', '1746428115771312290'),
(254, 3, 281, 8, 5, 0, '2024-06-20 00:00:00', '12345', '12345', NULL, '1', '3733262393097409078'),
(255, 2, 285, 8, 5, 0, '2024-06-20 00:00:00', '0', '0', NULL, '0', '6893407642883800550'),
(256, 2, 286, 8, 5, 0, '2024-06-20 00:00:00', '0', '0', NULL, '0', '8190933382575421106'),
(257, 2, 289, 8, 5, 0, '2024-06-20 00:00:00', '0', '0', NULL, '0', '-448266363892230137'),
(258, 2, 290, 8, 5, 0, '2024-06-20 00:00:00', '0', '0', NULL, '1', '82918536118830560'),
(259, 2, 291, 8, 5, 0, '2024-06-20 00:00:00', '0', '0', NULL, '1', '-1810430170442389647'),
(260, 2, 292, 8, 10, 0, '2024-06-21 00:00:00', 'ff50dbc5-247f-11ef-ac37-0a186f7be03d', '55599c46-2963-11ef-ac37-0a186f7be03d', NULL, '1', '-9017497600411856723'),
(261, 2, 293, 8, 5, 0, '2024-06-21 00:00:00', 'ff50dbc5-247f-11ef-ac37-0a186f7be03d', '55599c46-2963-11ef-ac37-0a186f7be03d', NULL, '1', '-8722980005028537507'),
(262, 3, 80, 8, 0, 0, '2024-07-08 15:00:43', 'ff50dbc5-247f-11ef-ac37-0a186f7be03d', '55599c46-2963-11ef-ac37-0a186f7be03d', NULL, '0', '-4705497456633829189'),
(263, 3, 80, 8, 0, 0, '2024-07-08 15:02:05', 'ff50dbc5-247f-11ef-ac37-0a186f7be03d', '55599c46-2963-11ef-ac37-0a186f7be03d', NULL, '1', '6989827116217767746'),
(264, 4, 80, 8, 5, 0, '2024-07-08 15:11:45', 'ff50dbc5-247f-11ef-ac37-0a186f7be03d', '55599c46-2963-11ef-ac37-0a186f7be03d', NULL, '1', '-4021311003902594531'),
(265, 4, 80, 8, 1, 0, '2024-07-08 15:22:05', 'ff50dbc5-247f-11ef-ac37-0a186f7be03d', '55599c46-2963-11ef-ac37-0a186f7be03d', NULL, '1', '761630204573070726'),
(266, 3, 80, 8, 0, 0, '2024-07-08 15:29:49', 'ff50dbc5-247f-11ef-ac37-0a186f7be03d', '55599c46-2963-11ef-ac37-0a186f7be03d', NULL, '1', '767314197577420023'),
(267, 2, 1, 8, 1, 0, '2024-07-16 21:38:41', 'undefined', 'undefined', NULL, '1', '2878486548955782840'),
(268, 4, 294, 8, 0, 0, '2024-08-05 17:57:38', 'ff50dbc5-247f-11ef-ac37-0a186f7be03d', '55599c46-2963-11ef-ac37-0a186f7be03d', NULL, '1', '-7554821568334420944'),
(269, 2, 52, 8, 1, 0, '2024-08-05 18:09:58', '0', '0', NULL, '0', '-516376941927298104'),
(270, 2, 52, 8, 0, 0, '2024-08-06 11:07:28', 'undefined', 'undefined', NULL, '0', '3997833822954377720'),
(271, 2, 52, 8, 0, 0, '2024-08-06 11:07:29', 'undefined', 'undefined', NULL, '0', '-4273972777020374269'),
(272, 4, 231, 8, 0, 0, '2024-08-19 07:15:36', 'ff50dbc5-247f-11ef-ac37-0a186f7be03d', '55599c46-2963-11ef-ac37-0a186f7be03d', NULL, '0', '8271074015879800738'),
(273, 4, 231, 8, 0, 0, '2024-08-19 07:15:37', 'ff50dbc5-247f-11ef-ac37-0a186f7be03d', '55599c46-2963-11ef-ac37-0a186f7be03d', NULL, '0', '-6491500406604121660'),
(274, 4, 231, 8, 0, 0, '2024-08-19 07:15:44', 'ff50dbc5-247f-11ef-ac37-0a186f7be03d', '55599c46-2963-11ef-ac37-0a186f7be03d', NULL, '0', '-3859039750351124129'),
(275, 4, 231, 8, 0, 0, '2024-08-19 07:16:41', 'ff50dbc5-247f-11ef-ac37-0a186f7be03d', '55599c46-2963-11ef-ac37-0a186f7be03d', NULL, '0', '-3032977342138455815'),
(276, 4, 295, 8, 0, 0, '2024-09-20 15:20:53', 'ff50dbc5-247f-11ef-ac37-0a186f7be03d', '55599c46-2963-11ef-ac37-0a186f7be03d', NULL, '0', '-8675000602343084903'),
(277, 1, 297, 8, 0, 0, '2025-12-04 11:31:04', 'undefined', 'undefined', NULL, '0', '-7171915199443109805'),
(278, 2, 1, 8, 0, 0, '2025-12-12 12:12:55', 'undefined', 'undefined', NULL, '0', '5091952925902108588'),
(279, 1, 1, 8, 0, 0, '2025-12-12 12:24:54', 'undefined', 'undefined', NULL, '0', '6732033119249230434'),
(280, 1, 1, 8, 0, 0, '2025-12-12 12:26:12', 'undefined', 'undefined', NULL, '1', '5865162574107006936'),
(281, 2, 1, 8, 0, 0, '2025-12-12 12:33:48', 'undefined', 'undefined', NULL, '1', '-2482995825695227394'),
(282, 1, 1, 8, 0, 0, '2025-12-12 13:07:43', 'undefined', 'undefined', NULL, '0', '1709025508057873079'),
(283, 1, 1, 8, 0, 0, '2025-12-12 13:45:56', 'undefined', 'undefined', NULL, '0', '3412940381012570282'),
(284, 1, 1, 8, 0, 0, '2025-12-14 00:41:33', 'undefined', 'undefined', NULL, '0', '4652079970629989190'),
(285, 1, 1, 8, 0, 0, '2025-12-15 10:07:44', 'ff50dbc5-247f-11ef-ac37-0a186f7be03d', '55599c46-2963-11ef-ac37-0a186f7be03d', NULL, '0', '760572130079027212'),
(286, 1, 1, 8, 0, 0, '2025-12-15 10:09:51', 'undefined', 'undefined', NULL, '0', '925151451353685476'),
(287, 1, 1, 8, 0, 0, '2025-12-15 10:10:50', 'undefined', 'undefined', NULL, '0', '5420638106078216770');
INSERT INTO `ordermaster` (`order_id`, `badge_id`, `user_id`, `price`, `extra_help`, `mark`, `orderdate`, `company_id`, `agent_id`, `payment_method`, `payment_status`, `hashcode`) VALUES
(288, 2, 1, 8, 0, 0, '2025-12-15 10:19:37', 'ff50dbc5-247f-11ef-ac37-0a186f7be03d', '55599c46-2963-11ef-ac37-0a186f7be03d', NULL, '1', '6518911190575859391'),
(289, 1, 1, 8, 0, 0, '2025-12-15 10:24:24', 'undefined', 'undefined', NULL, '0', '-1456370109759657223'),
(290, 1, 1, 8, 0, 0, '2025-12-15 10:38:57', 'undefined', 'undefined', NULL, '0', '3825664569587346266'),
(291, 1, 1, 8, 0, 0, '2025-12-15 18:14:16', 'undefined', 'undefined', NULL, '1', '-4098777746288570636'),
(292, 1, 1, 8, 0, 0, '2025-12-15 18:17:32', 'undefined', 'undefined', NULL, '1', '-9149791208578802735'),
(293, 1, 1, 8, 0, 0, '2025-12-15 18:32:08', 'undefined', 'undefined', NULL, '1', '-6696766357025599562'),
(294, 2, 297, 8, 0, 0, '2025-12-16 10:31:41', 'undefined', 'undefined', NULL, '0', '-2190037556497674449'),
(295, 2, 297, 8, 0, 0, '2025-12-16 10:31:43', 'undefined', 'undefined', NULL, '1', '4786777646083662922'),
(296, 2, 297, 8, 0, 0, '2025-12-16 10:31:43', 'undefined', 'undefined', NULL, '0', '4786777646083662922'),
(297, 2, 297, 8, 0, 0, '2025-12-16 10:31:45', 'undefined', 'undefined', NULL, '0', '1466251555363723082'),
(298, 3, 297, 8, 0, 0, '2025-12-16 10:37:19', 'undefined', 'undefined', NULL, '1', '-3935583453515739890'),
(299, 3, 297, 8, 0, 0, '2025-12-16 10:37:21', 'undefined', 'undefined', NULL, '0', '-770844633552941864'),
(300, 1, 83, 8, 0, 0, '2025-12-16 11:28:39', 'undefined', 'undefined', NULL, '1', '6151383065008495544'),
(301, 1, 297, 8, 0, 0, '2025-12-16 11:29:56', 'undefined', 'undefined', NULL, '1', '9214121364030361428'),
(302, 1, 297, 8, 0, 0, '2025-12-16 11:29:56', 'undefined', 'undefined', NULL, '0', '9214121364030361428'),
(303, 1, 297, 8, 0, 0, '2025-12-16 11:29:57', 'undefined', 'undefined', NULL, '0', '-3002066659741246706'),
(304, 1, 297, 8, 0, 0, '2025-12-16 11:29:59', 'undefined', 'undefined', NULL, '0', '2879033891928188194'),
(305, 2, 83, 8, 0, 0, '2025-12-16 11:57:20', 'undefined', 'undefined', NULL, '1', '732943785728935859'),
(306, 1, 300, 8, 0, 0, '2025-12-16 12:05:02', 'undefined', 'undefined', NULL, '1', '-7063645287607088668'),
(307, 3, 83, 8, 0, 0, '2025-12-16 12:05:54', 'undefined', 'undefined', NULL, '1', '7552612297613306432'),
(308, 3, 134, 8, 0, 0, '2025-12-16 12:08:06', 'undefined', 'undefined', NULL, '1', '-8197379910839451665'),
(309, 2, 1, 8, 0, 0, '2026-01-30 11:30:14', 'undefined', 'undefined', NULL, '2', '4264650756635422304');

-- --------------------------------------------------------

--
-- Table structure for table `rankmaster`
--

CREATE TABLE `rankmaster` (
  `rank_id` int(11) NOT NULL,
  `badge_id` int(10) NOT NULL,
  `user_id` int(10) NOT NULL,
  `mark_id` int(2) NOT NULL,
  `recordtime` timestamp(6) NOT NULL DEFAULT current_timestamp(6)
) ENGINE=InnoDB DEFAULT CHARSET=utf16;

--
-- Dumping data for table `rankmaster`
--

INSERT INTO `rankmaster` (`rank_id`, `badge_id`, `user_id`, `mark_id`, `recordtime`) VALUES
(1, 0, 0, 0, '2024-04-26 06:58:03.081364'),
(2, 0, 1, 2, '2024-04-26 06:58:03.092838'),
(3, 0, 2, 3, '2024-04-26 06:58:03.101507'),
(4, 0, 3, 4, '2024-04-26 06:58:03.108127'),
(5, 0, 4, 0, '2024-04-26 06:58:03.114996'),
(6, 0, 5, 0, '2024-04-26 06:58:03.121524'),
(7, 0, 6, 2, '2024-04-26 06:58:03.128019'),
(8, 0, 7, 2, '2024-04-26 06:58:03.134651'),
(9, 0, 8, 3, '2024-04-26 06:58:03.140955'),
(10, 0, 9, 3, '2024-04-26 06:58:03.148152'),
(11, 1, 0, 0, '2024-04-26 08:22:24.136375'),
(14, 1, 1, 0, '2024-04-26 08:23:24.196978'),
(15, 1, 50, 0, '2024-05-27 04:50:17.007070'),
(16, 4, 1, 2, '2024-06-04 10:30:42.820153'),
(17, 3, 1, 1, '2024-06-05 06:49:01.327090'),
(18, 4, 82, 0, '2024-06-05 14:58:00.055737'),
(19, 3, 82, 0, '2024-06-05 15:06:50.855599'),
(20, 2, 82, 0, '2024-06-05 15:14:39.952325'),
(21, 1, 82, 0, '2024-06-05 15:18:31.754279'),
(22, 2, 1, 1, '2024-06-06 04:20:17.896143'),
(23, 3, 84, 2, '2024-06-07 11:58:44.725095'),
(24, 1, 134, 0, '2024-06-07 12:01:28.313191'),
(25, 1, 135, 0, '2024-06-07 12:04:49.540039'),
(26, 2, 154, 0, '2024-06-08 12:13:50.792415'),
(27, 2, 179, 0, '2024-06-08 12:14:29.435218'),
(28, 2, 190, 0, '2024-06-08 12:15:01.812657'),
(29, 2, 191, 0, '2024-06-08 12:15:42.282193'),
(30, 3, 80, 3, '2024-07-08 07:00:43.037476'),
(31, 4, 80, 3, '2024-07-08 07:11:45.936157'),
(32, 2, 52, 2, '2024-08-05 10:09:58.453275'),
(33, 4, 295, 3, '2024-09-20 07:20:53.349212');

-- --------------------------------------------------------

--
-- Table structure for table `sdgmaster`
--

CREATE TABLE `sdgmaster` (
  `id` int(11) NOT NULL,
  `badge_id` int(11) NOT NULL,
  `sdg_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `sdgmaster`
--

INSERT INTO `sdgmaster` (`id`, `badge_id`, `sdg_id`) VALUES
(1, 2, 4),
(2, 2, 11),
(3, 2, 13),
(4, 2, 14),
(5, 2, 15),
(6, 3, 3),
(7, 3, 4),
(8, 3, 8),
(9, 3, 11),
(10, 3, 13),
(11, 3, 14),
(12, 3, 15),
(13, 4, 3),
(14, 4, 4),
(15, 4, 8),
(16, 4, 11),
(17, 4, 13),
(18, 4, 14),
(19, 4, 15),
(20, 1, 4),
(21, 1, 11),
(22, 1, 14);

-- --------------------------------------------------------

--
-- Table structure for table `sitecontent`
--

CREATE TABLE `sitecontent` (
  `id` int(5) NOT NULL,
  `subheader` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `boardheader` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `boardtitle` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `support` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `passport` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `website` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `aboutheader` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `abouttitle` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `showmore` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `addextra` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `giveus` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `currency` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `formheader` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `formdesc` varchar(200) COLLATE utf8mb4_unicode_ci NOT NULL,
  `reaction` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `formname` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `formemail` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `formconfirmemail` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `formmobile` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `formterm` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `formtnc` varchar(500) COLLATE utf8mb4_unicode_ci NOT NULL,
  `formmarketing` varchar(500) COLLATE utf8mb4_unicode_ci NOT NULL,
  `failedtitle` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `faileddesc` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `successtitle` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `sucessdesc` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `impactheader` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `impacttitle` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `loginemail` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `loginmobile` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `getstarted` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `otpheader` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `otpdescsms` varchar(200) COLLATE utf8mb4_unicode_ci NOT NULL,
  `otpdescemail` varchar(500) COLLATE utf8mb4_unicode_ci NOT NULL,
  `verifyotp` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `resendotp` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tryother` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `needhelp` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `lang` int(11) NOT NULL COMMENT '0=chi, 1,eng, 2=jp\r\n',
  `mypassport` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `badge` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `event` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `impact` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `travelambassador` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `impactrecord` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `summary` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `detail` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `sdg` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `submit` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `nameerror` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `mobileerror` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `termerror` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `duplicateerror` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `emailerror` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `home` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `invildemail` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `otpinvalid` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `otpexpired` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `contactus` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `contact` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `collected` varchar(200) COLLATE utf8mb4_unicode_ci NOT NULL,
  `greeting` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `sitecontent`
--

INSERT INTO `sitecontent` (`id`, `subheader`, `description`, `boardheader`, `boardtitle`, `support`, `passport`, `website`, `aboutheader`, `abouttitle`, `showmore`, `addextra`, `giveus`, `currency`, `formheader`, `formdesc`, `reaction`, `formname`, `formemail`, `formconfirmemail`, `formmobile`, `formterm`, `formtnc`, `formmarketing`, `failedtitle`, `faileddesc`, `successtitle`, `sucessdesc`, `impactheader`, `impacttitle`, `loginemail`, `loginmobile`, `getstarted`, `otpheader`, `otpdescsms`, `otpdescemail`, `verifyotp`, `resendotp`, `tryother`, `needhelp`, `lang`, `mypassport`, `badge`, `event`, `impact`, `travelambassador`, `impactrecord`, `summary`, `detail`, `sdg`, `submit`, `nameerror`, `mobileerror`, `termerror`, `duplicateerror`, `emailerror`, `home`, `invildemail`, `otpinvalid`, `otpexpired`, `contactus`, `contact`, `email`, `collected`, `greeting`) VALUES
(1, 'The blessings of nature', 'Verified Impact Authorizer', 'Become', 'Sustainable Travel Ambassador', 'SUPPORT & GET A BADGE', 'BADGE PASSPORT', 'OFFICIAL WEBSITE', 'Select your contribution to get this badge', 'About this cause', 'Show More', 'Add extra to help with fees', 'Give Us', 'US$', 'I hereby committed', 'to support the sustainable development of Kochis city and be a committed ambassador for their sustainability mission.', 'Choose your reaction', 'Name:', 'Email:', 'Confirm Email:', 'Mobile:', 'Term and Conditions:', '*I confirm that I have read, understood and agreed to the <a href=\"https://www.example.com\" target=\"_blank\"> Event\\\'s Terms and Conditions</a>, and <a href=\"https://www.example.com\" target=\"_blank\">Japan Tourism Board\\\'s Privacy Policy</a>.', 'I agree to the use and transfer of personal data for Japan Tourism Board\\\'s direct marketing.', 'Minting Failed', 'Your booking could not be processed at this time. Please try again later.', 'You collected', 'You can checkit out anytime in your mirai impact passport.', 'Impact Passport', 'Give your impact a New meaning', 'Log in with your email', 'Log in with your mobile phone', 'Get Started', 'OTP verification', 'A One Time Password (OTP) has been generated and sent to your SMS. You should receive it within(30 seconds). In case you have not received it, please use the resend link below to send the OTP again.', 'A One Time Password (OTP) has been generated and sent to your email. You should receive it within(30 seconds). In case you have not received it, please use the resend link below to send the OTP again.', 'VERIFY OTP', 'Resend OTP', 'Try other verification', 'Need help? Contact us', 1, 'My Passport', 'Badge', 'Intro.', 'Impact', 'Travel Ambassador', 'Impact Record', 'Summary', 'Detail', 'Related SDG', 'Submit', 'Invalid Name', 'Invalid Mobile Phone No.', 'Please accept the terms and conditions', 'Email or Mobile already exist', 'Email must be the same', 'HOME', 'invalid email: Please try another email address', 'OTP is invalid. Please try again.', 'OTP expired.', 'Contact Us', 'Contact: + 852 1234-5678', 'Email: info@starsdg.com', 'You collected total <text style=\"font-family: Arial, Verdana, Helvetica, sans-serif;color: #1b78b5; font-weight:normal; font-size: 18px; \"> {0} </text> badges', 'Hi'),
(2, 'The blessings of nature', '已驗證影響授權者', '成為', '可持續旅遊大使', '支持並獲取徽章', '徽章護照', '官方網站', '選擇您的捐獻以獲得此徽章', '關於此事業', '顯示更多', '支付額外小費以支持', '一共購買', '美元$', '我在此承諾', '支持高知市的可持續發展，並作為其可持續性使命的積極大使。', '選擇您的反應', '姓名:', '電子郵件:', '確認電子郵件:', '手機號碼:', '條款和條件:', '*我確認我已閱讀、理解並同意活動的條款和條件，以及日本旅遊局的隱私政策。', '我同意使用及轉移個人資料用於日本旅遊局的直接市場推廣。', '鑄造失敗', '您的付款目前無法處理。請稍後再試。', '太好了！您已獲得您的徽章', '您可以隨時在您的徽章護照中查看。', '徽章護照', '為您的  影響賦予新的意義', '使用您的電子郵件登錄', '使用您的手機登錄', '開始使用', 'OTP 驗證', '一次性密碼（OTP）已生成並發送到您的SMS。您應該在（30秒內）收到它。如果您沒有收到，請使用下面的重新發送鏈接再次發送 OTP。', '一次性密碼（OTP）已生成並發送到您的電子郵件。您應該在（30秒內）收到它。如果您沒有收到，請使用下面的重新發送鏈接再次發送 OTP。', '驗證 OTP', '重新發送 OTP', '嘗試其他驗證方式', '需要幫助？ 請聯繫我們', 0, '我的護照', '徽章 ', '簡介', '影響', '旅遊大使', '影響記錄', '摘要', '詳情', '相關的可持續發展目標（SDG）', '提交', '名字無效', '電話號碼無效', '需要接受條款', '電郵或電話號碼已登記', '電郵不正確', '主頁', '電郵無效:請再次輸入', 'OTP無效, 請再次輸入', 'OTP已經過期', '聯絡我們', '聯絡電話: + 852 1234-5678', '電子郵件: info@starsdg.com', '您共收集了&nbsp;&nbsp;<text style=\"font-family: Arial, Verdana, Helvetica, sans-serif;color: #1b78b5; font-weight:normal; font-size: 18px; \">{0}</text>&nbsp;&nbsp;個徽章', '你好'),
(3, 'The blessings of nature', '認定インパクト認証者', '', 'サステナブルトラベルアンバサダーになる', 'サポートしてバッジを取得する', 'バッジパスポート', '公式ウェブサイト', 'バッジを取得するための寄付を選択してください', 'この原因について', 'もっと見る', '手数料を助けるために追加を加える', '合計ドルの購入', 'ドル$', 'ここに私は誓約します', '持続可能な発展を支援し、その持続可能性ミッションの熱心な大使であること。', 'あなたの反応を選んでください', '名前：', 'メールアドレス：', 'メールアドレスの確認：', '携帯電話番号：', '利用規約：', '*私は、イベントの利用規約および日本観光局のプライバシーポリシーを読み、理解し、同意しました。\r\n', '私は、個人データの使用および日本観光局のダイレクトマーケティングのための転送に同意します。\r\n', 'ミント失敗', 'お支払いは現在処理できません。後ほど再試行してください。', '素晴らしい！バッジを受け取りました', 'いつでもバッジパスポートで確認できます。', 'バッジパスポート', 'なたの  影響に新しい意味を', 'メールでログイン', '携帯電話でログイン', 'スタート', 'OTP 認証', 'ワンタイムパスワード（OTP）が生成され、あなたの携帯電話に送信されました。30秒以内に受信するはずです。受信していない場合は、以下のリンクからOTPを再送信してください。', 'ワンタイムパスワード（OTP）が生成され、あなたの Eメールに送信されました。30秒以内に受信するはずです。受信していない場合は、以下のリンクからOTPを再送信してください。', 'OTPを確認', 'OTPを再送信（30秒）', '他の認証方法を試す', 'サポートが必要ですか？お問い合わせください', 2, '私のパスポート', 'バッジ', '導入', '影響', 'トラベルアンバサダー', 'インパクト記録', '概要', '詳細', '関連する (SDG)', '提交', '無効な名前', '無効な電話番号', '規約に同意する必要があります', 'メールアドレスまたは電話番号が登録されています', '電郵不正確', 'ホームページ', 'メールが間違っています', 'OTP が無効です。もう一度入力してください', 'OTP の有効期限が切れています', 'お問い合わせ', '連絡先番号: + 852 1234-5678', ' Eメール: info@starsdg.com', 'バッジを合計 <text style=\"font-family: Arial, Verdana, Helvetica, sans-serif;color: #1b78b5; font-weight:normal; font-size: 18px; \"> {0} </text> つ集めました', ' こんにちは');

-- --------------------------------------------------------

--
-- Table structure for table `userlink`
--

CREATE TABLE `userlink` (
  `link_id` int(8) NOT NULL,
  `master_id` int(8) NOT NULL,
  `child_id` int(8) NOT NULL,
  `status` int(11) NOT NULL DEFAULT 1 COMMENT '0=inactive, 1=active'
) ENGINE=InnoDB DEFAULT CHARSET=utf16;

-- --------------------------------------------------------

--
-- Table structure for table `usermaster`
--

CREATE TABLE `usermaster` (
  `user_id` int(8) NOT NULL,
  `user_role` varchar(50) NOT NULL DEFAULT 'user' COMMENT 'user, partner, shop, admin',
  `user_name` varchar(50) NOT NULL,
  `displayname` varchar(50) NOT NULL,
  `countrycode` varchar(3) NOT NULL,
  `mobile` varchar(12) NOT NULL,
  `email` varchar(50) NOT NULL,
  `language` varchar(50) NOT NULL DEFAULT 'eng' COMMENT '0=chi, 1=eng, 2=jp',
  `tc` int(11) NOT NULL DEFAULT 0 COMMENT '1 = true; 0=false',
  `marketing` int(11) NOT NULL DEFAULT 0 COMMENT '1 = true; 0=false',
  `otpcode` varchar(6) DEFAULT NULL,
  `otpcounter` int(1) NOT NULL DEFAULT 0,
  `otptime` varchar(100) DEFAULT NULL,
  `hashcode` varchar(256) DEFAULT NULL,
  `createdate` date NOT NULL DEFAULT current_timestamp(),
  `status` int(11) NOT NULL DEFAULT 1 COMMENT '1=active, 0=inactive'
) ENGINE=InnoDB DEFAULT CHARSET=utf16;

--
-- Dumping data for table `usermaster`
--

INSERT INTO `usermaster` (`user_id`, `user_role`, `user_name`, `displayname`, `countrycode`, `mobile`, `email`, `language`, `tc`, `marketing`, `otpcode`, `otpcounter`, `otptime`, `hashcode`, `createdate`, `status`) VALUES
(1, 'admin', 'devil', 'Devil', '852', '97338195', 'deviltse@gmail.com', '0', 1, 1, '', 0, '1769744008', '-4579535308421921807', '2024-03-26', 1),
(49, 'user', 'deviltse11@gmail.com', 'test', '852', '12345678', 'deviltse11@gmail.com', '1', 1, 1, NULL, 0, NULL, NULL, '2024-05-20', 1),
(52, 'user', 'devil@devil.com', 'Devil', '852', '22345678', 'devil@devil.com', '1', 1, 1, '', 0, '1716257999', '2522980313409361115', '2024-05-21', 1),
(54, 'user', 'deviltse23@gmail.com', 'abcd', '852', '97338191', 'deviltse23@gmail.com', '1', 1, 1, NULL, 0, NULL, NULL, '2024-05-21', 1),
(55, 'user', 'devil99@gmail.com', 'Devil', '376', '12355321', 'devil99@gmail.com', '0', 1, 1, NULL, 0, NULL, NULL, '2024-05-23', 1),
(56, 'user', 'devil998@gmail.com', 'Devil', '376', '55556666', 'devil998@gmail.com', '0', 1, 1, NULL, 0, NULL, NULL, '2024-05-23', 1),
(57, 'user', 'devil111@gmail.com', 'devil', '376', '980098', 'devil111@gmail.com', '0', 1, 1, NULL, 0, NULL, NULL, '2024-05-23', 1),
(76, 'user', 'test@gmail.com', 'test', '852', '65465465', 'test@gmail.com', '0', 1, 0, NULL, 0, NULL, NULL, '2024-05-29', 1),
(79, 'user', 'kikideng83@gmail.com', 'kiki', '852', '91453823', 'kikideng83@gmail.com', '1', 1, 0, '', 0, '1717054267', '6509476880862396466', '2024-05-30', 1),
(80, 'user', 'kenshching@gmail.com', 'Ken Ching', '852', '91317663', 'kenshching@gmail.com', '0', 1, 1, '', 0, '1769744819', '-6488510888848746176', '2024-05-30', 1),
(81, 'user', 'andy20011610@gmail.com', 'Andy CHOW', '852', '62254300', 'andy20011610@gmail.com', '0', 1, 1, NULL, 0, NULL, NULL, '2024-06-03', 1),
(82, 'user', 'kiubooching@gmail.com', 'kiu ching', '852', '91318480', 'kiubooching@gmail.com', '0', 1, 1, '', 0, '1717684899', '-6608860144021878905', '2024-06-05', 1),
(83, 'user', 'sherrycyluk@gmail.com', 'Sherry Luk', '852', '62230691', 'sherrycyluk@gmail.com', '1', 1, 1, '', 0, '1770104391', '-2104126487603805832', '2024-06-07', 1),
(84, 'user', 'alyssayip1209@gmail.com', 'Alyssa', '852', '54225125', 'alyssayip1209@gmail.com', '1', 1, 1, '', 0, '1717761797', '-8964538148424514573', '2024-06-07', 1),
(134, 'user', 'vendors-pulses0h@icloud.com', 'Fontaine', '852', '61004608', 'vendors-pulses0h@icloud.com', '1', 1, 1, NULL, 0, NULL, NULL, '2024-06-07', 1),
(135, 'user', 'chunwaim7@gmail.com', 'David Man', '852', '65576089', 'chunwaim7@gmail.com', '0', 1, 1, '839557', 0, '1717762094', '', '2024-06-07', 1),
(137, 'user', 'thibodeau.benoit@gmail.com', 'Benoit Thibodeau', '852', '52996396', 'thibodeau.benoit@gmail.com', '1', 1, 1, '597529', 0, '1717762084', '', '2024-06-07', 1),
(138, 'user', 'chanhoklaileon@gmail.com', 'Chan Hok Lai', '852', '69957947', 'chanhoklaileon@gmail.com', '0', 1, 0, '651769', 0, '1717848890', '', '2024-06-08', 1),
(139, 'user', 'chrissiefu1015@gmail.com', 'Fu Ka Yee', '852', '61517106', 'chrissiefu1015@gmail.com', '0', 1, 1, '874286', 0, '1717848927', '', '2024-06-08', 1),
(141, 'user', 'carsonho213@gmail.com', 'Carson', '852', '67699970', 'carsonho213@gmail.com', '1', 1, 1, '889092', 0, '1717848892', '', '2024-06-08', 1),
(142, 'user', 'hosum121@gmail.com', 'Tang Ho Sum', '852', '92746312', 'hosum121@gmail.com', '0', 1, 1, '929731', 0, '1717848929', '', '2024-06-08', 1),
(144, 'user', 'ablelong777@gmail.com', 'LUI YAT LONG', '852', '53464006', 'ablelong777@gmail.com', '0', 1, 1, '', 0, '1717849059', '-3580187189985769040', '2024-06-08', 1),
(145, 'user', 'kayng2323@gmail.com', 'Ng Wing Sze', '852', '92012511', 'kayng2323@gmail.com', '0', 1, 1, '788270', 0, '1717848932', '', '2024-06-08', 1),
(147, 'user', 'manhoi1215@gmail.com', 'Man Hoi Yam', '852', '95165637', 'manhoi1215@gmail.com', '0', 1, 1, '', 0, '1717848930', '-7907191783470307781', '2024-06-08', 1),
(154, 'user', 'scarletblaze626@gmail.com', 'Ho Sze Ching', '852', '56228221', 'scarletblaze626@gmail.com', '1', 1, 1, '', 0, '1717848945', '-798686503856885182', '2024-06-08', 1),
(155, 'user', 'owenchanghw@gmail.com', 'Owen', '852', '95279832', 'owenchanghw@gmail.com', '0', 1, 1, NULL, 0, NULL, NULL, '2024-06-08', 1),
(156, 'user', 'taipak0301@gmail.com', 'Owen', '852', '65530484', 'taipak0301@gmail.com', '0', 1, 0, NULL, 0, NULL, NULL, '2024-06-08', 1),
(159, 'user', 'nmpmabel3434@gmail.com', 'Ng Mei Po', '852', '92963424', 'nmpmabel3434@gmail.com', '1', 1, 0, NULL, 0, NULL, NULL, '2024-06-08', 1),
(162, 'user', 'chugo207@gmail.com', 'Hoi Him Hugo Chan', '852', '91662848', 'chugo207@gmail.com', '1', 1, 1, NULL, 0, NULL, NULL, '2024-06-08', 1),
(165, 'user', 'kennyyeung642@gmail.com', 'Yeung Cheuk Wing Kenny', '852', '96195601', 'kennyyeung642@gmail.com', '1', 1, 0, '758338', 0, '1717848934', '', '2024-06-08', 1),
(166, 'user', 'sftbhewbaite@gmail.com', 'Ng Wai Nam', '852', '64932848', 'sftbhewbaite@gmail.com', '1', 1, 1, '', 0, '1717849543', '-8149903465802301771', '2024-06-08', 1),
(168, 'user', 'audreyfan0215@gmail.com', 'Fan Audrey', '852', '96035588', 'audreyfan0215@gmail.com', '0', 1, 0, NULL, 0, NULL, NULL, '2024-06-08', 1),
(171, 'user', 'thomasformal122@gmail.com', 'Chow King Hei', '852', '56164081', 'thomasformal122@gmail.com', '0', 1, 0, '335796', 0, '1717848970', '', '2024-06-08', 1),
(173, 'user', 'jeremylam0303@gmail.com', 'Lam Chun Kit', '852', '56351195', 'jeremylam0303@gmail.com', '1', 1, 1, '', 0, '1718198043', '-9048630025804065989', '2024-06-08', 1),
(179, 'user', 'ivanlam4020@gmail.com', 'Lam Chun Hung', '852', '96370931', 'ivanlam4020@gmail.com', '1', 1, 1, NULL, 0, NULL, NULL, '2024-06-08', 1),
(180, 'user', 'sukichan0112@gmail.com', 'Chan Ho Ying', '852', '93382251', 'sukichan0112@gmail.com', '1', 1, 1, '405683', 0, '1717849004', '', '2024-06-08', 1),
(182, 'user', 'janicexcheung@gmail.com', 'Cheung Tsz Ching', '852', '67354438', 'janicexcheung@gmail.com', '0', 1, 1, '583355', 0, '1717848996', '', '2024-06-08', 1),
(187, 'user', 'michaelho111@yahoo.com.hk', 'Michael', '852', '91460323', 'michaelho111@yahoo.com.hk', '0', 1, 1, '', 0, '1717849067', '2476324441476667079', '2024-06-08', 1),
(190, 'user', 'homah1008@gmail.com', 'Jeff Ho', '852', '68562510', 'homah1008@gmail.com', '0', 1, 0, '993717', 0, '1717848968', '', '2024-06-08', 1),
(191, 'user', 'km181513@gmail.com', 'Chan Wai Man', '852', '55076019', 'km181513@gmail.com', '0', 1, 1, NULL, 0, NULL, NULL, '2024-06-08', 1),
(222, 'user', 'williamtan0306@yahoo.com.hk', 'Tam Kin Chung', '852', '65774299', 'williamtan0306@yahoo.com.hk', '0', 1, 0, NULL, 0, NULL, NULL, '2024-06-08', 1),
(223, 'user', 'allenchin1994@gmail.com', 'Allen Chin', '852', '23322222', 'allenchin1994@gmail.com', '1', 1, 1, NULL, 0, NULL, NULL, '2024-06-08', 1),
(226, 'user', 'thomasboon058@gmail.com', 'Foo Meng Boon', '852', '33333333', 'thomasboon058@gmail.com', '1', 1, 1, NULL, 0, NULL, NULL, '2024-06-08', 1),
(231, 'user', 'jensenchv@gmail.com', 'Jensen Chong', '86', '168189598', 'jensenchv@gmail.com', '1', 1, 1, '531179', 0, '1718253123', '', '2024-06-13', 1),
(234, 'user', 'lo.ronald620@gmail.com', 'Ronald Lo', '86', '143500715', 'lo.ronald620@gmail.com', '1', 1, 1, '365145', 0, '1718290252', '', '2024-06-13', 1),
(237, 'user', 'Salihah.saidin@gmail.com', 'Siti Salihahfarhain binti Saidin', '86', '149200715', 'Salihah.saidin@gmail.com', '1', 1, 1, NULL, 0, NULL, NULL, '2024-06-13', 1),
(238, 'user', 'chinchinchan.ccc@gmail.com', 'Cchin Chan', '852', '98894341', 'chinchinchan.ccc@gmail.com', '0', 1, 1, NULL, 0, NULL, NULL, '2024-06-19', 1),
(290, 'user', 'devil11@gmail.com', 'test11', '852', '11115555', 'devil11@gmail.com', '0', 1, 1, '', 0, '1718860420', '1224719965541946788', '2024-06-20', 1),
(291, 'user', 'devil12@gmail.com', 'test12', '852', '11113344', 'devil12@gmail.com', '0', 1, 1, NULL, 0, NULL, NULL, '2024-06-20', 1),
(292, 'user', 'devil1112@gmail.com', 'test', '852', '99887766', 'devil1112@gmail.com', '1', 1, 1, '', 0, '1718944501', '-1149320187136526804', '2024-06-21', 1),
(293, 'user', 'devil999@gmail.com', 'devil', '852', '77788899', 'devil999@gmail.com', '2', 1, 1, NULL, 0, NULL, NULL, '2024-06-21', 1),
(294, 'user', 'khchong28@gmail.com', 'K H Chong', '60', '1132283883', 'khchong28@gmail.com', '1', 1, 1, '', 0, '1722927419', '8167285617013673783', '2024-08-05', 1),
(295, 'user', 'jamesfung201877@gmail.com', 'James', '852', '96206941', 'jamesfung201877@gmail.com', '1', 1, 1, NULL, 0, NULL, NULL, '2024-09-20', 1),
(297, 'user', 'cathy020308@gmail.com', 'Yip Hiu Ping', '852', '97147046', 'cathy020308@gmail.com', '1', 1, 1, '', 0, '1769743424', '-2018754979779776255', '2025-12-04', 1),
(300, 'user', 'jackco.li@jiffiastudio.com', 'Jackco', '852', '68281563', 'jackco.li@jiffiastudio.com', '1', 1, 1, '', 0, '1765866458', '5886246271906136576', '2025-12-16', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `agentmaster`
--
ALTER TABLE `agentmaster`
  ADD PRIMARY KEY (`uid`),
  ADD UNIQUE KEY `countrycode` (`countrycode`,`mobile`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `company_id` (`company_id`,`agent_id`);

--
-- Indexes for table `badgeinfo`
--
ALTER TABLE `badgeinfo`
  ADD PRIMARY KEY (`badgeinfo_id`);

--
-- Indexes for table `badgemaster`
--
ALTER TABLE `badgemaster`
  ADD PRIMARY KEY (`badge_id`);

--
-- Indexes for table `companymaster`
--
ALTER TABLE `companymaster`
  ADD PRIMARY KEY (`uid`);

--
-- Indexes for table `countrycodemaster`
--
ALTER TABLE `countrycodemaster`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `ordermaster`
--
ALTER TABLE `ordermaster`
  ADD PRIMARY KEY (`order_id`);

--
-- Indexes for table `rankmaster`
--
ALTER TABLE `rankmaster`
  ADD PRIMARY KEY (`rank_id`),
  ADD UNIQUE KEY `unique_rank` (`badge_id`,`user_id`);

--
-- Indexes for table `sdgmaster`
--
ALTER TABLE `sdgmaster`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `sitecontent`
--
ALTER TABLE `sitecontent`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `userlink`
--
ALTER TABLE `userlink`
  ADD PRIMARY KEY (`link_id`);

--
-- Indexes for table `usermaster`
--
ALTER TABLE `usermaster`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `unique_user` (`user_name`),
  ADD UNIQUE KEY `unique_mobile` (`countrycode`,`mobile`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `agentmaster`
--
ALTER TABLE `agentmaster`
  MODIFY `uid` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `badgeinfo`
--
ALTER TABLE `badgeinfo`
  MODIFY `badgeinfo_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `badgemaster`
--
ALTER TABLE `badgemaster`
  MODIFY `badge_id` int(8) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `companymaster`
--
ALTER TABLE `companymaster`
  MODIFY `uid` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `countrycodemaster`
--
ALTER TABLE `countrycodemaster`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=242;

--
-- AUTO_INCREMENT for table `ordermaster`
--
ALTER TABLE `ordermaster`
  MODIFY `order_id` int(8) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=310;

--
-- AUTO_INCREMENT for table `rankmaster`
--
ALTER TABLE `rankmaster`
  MODIFY `rank_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;

--
-- AUTO_INCREMENT for table `sdgmaster`
--
ALTER TABLE `sdgmaster`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT for table `sitecontent`
--
ALTER TABLE `sitecontent`
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `userlink`
--
ALTER TABLE `userlink`
  MODIFY `link_id` int(8) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `usermaster`
--
ALTER TABLE `usermaster`
  MODIFY `user_id` int(8) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=306;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
