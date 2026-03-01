UPDATE public.site_content
SET
  site_how_title = COALESCE(NULLIF(site_how_title, ''), CASE lang
    WHEN 0 THEN '如何獲得徽章'
    WHEN 1 THEN 'How to Get Badges'
    WHEN 2 THEN 'バッジの取得方法'
    WHEN 3 THEN '如何获得徽章'
  END),
  site_how_desc = COALESCE(NULLIF(site_how_desc, ''), CASE lang
    WHEN 0 THEN '只需四個步驟，開始你的可持續旅遊旅程。'
    WHEN 1 THEN 'Four simple steps to start your sustainable travel journey.'
    WHEN 2 THEN '4つのステップで、持続可能な旅を始めましょう。'
    WHEN 3 THEN '只需四个步骤，开启你的可持续旅行之旅。'
  END),
  site_step1_title = COALESCE(NULLIF(site_step1_title, ''), CASE lang
    WHEN 0 THEN '探索徽章'
    WHEN 1 THEN 'Explore Badges'
    WHEN 2 THEN 'バッジを探す'
    WHEN 3 THEN '探索徽章'
  END),
  site_step1_desc = COALESCE(NULLIF(site_step1_desc, ''), CASE lang
    WHEN 0 THEN '瀏覽不同目的地的可持續旅遊徽章，選擇你想支持的項目。'
    WHEN 1 THEN 'Browse sustainable tourism badges from different destinations and choose the project you want to support.'
    WHEN 2 THEN 'さまざまな地域のサステナブル観光バッジを閲覧し、支援したいプロジェクトを選びます。'
    WHEN 3 THEN '浏览不同目的地的可持续旅游徽章，选择你想支持的项目。'
  END),
  site_step2_title = COALESCE(NULLIF(site_step2_title, ''), CASE lang
    WHEN 0 THEN '購買徽章'
    WHEN 1 THEN 'Purchase a Badge'
    WHEN 2 THEN 'バッジを購入'
    WHEN 3 THEN '购买徽章'
  END),
  site_step2_desc = COALESCE(NULLIF(site_step2_desc, ''), CASE lang
    WHEN 0 THEN '完成付款後，你的支持將直接投入當地可持續發展行動。'
    WHEN 1 THEN 'Complete checkout and your support goes directly to local sustainability actions.'
    WHEN 2 THEN '購入を完了すると、支援金は地域の持続可能な取り組みに直接活用されます。'
    WHEN 3 THEN '完成支付后，你的支持将直接投入当地可持续发展行动。'
  END),
  site_step3_title = COALESCE(NULLIF(site_step3_title, ''), CASE lang
    WHEN 0 THEN '取得數位證書'
    WHEN 1 THEN 'Receive Digital Certificate'
    WHEN 2 THEN 'デジタル証明書を受け取る'
    WHEN 3 THEN '获取数字证书'
  END),
  site_step3_desc = COALESCE(NULLIF(site_step3_desc, ''), CASE lang
    WHEN 0 THEN '你會收到專屬的數位證書，記錄你的可持續旅遊貢獻。'
    WHEN 1 THEN 'You will receive a digital certificate that records your sustainability contribution.'
    WHEN 2 THEN 'あなたの貢献を記録するデジタル証明書を受け取れます。'
    WHEN 3 THEN '你将收到专属数字证书，记录你的可持续旅行贡献。'
  END),
  site_step4_title = COALESCE(NULLIF(site_step4_title, ''), CASE lang
    WHEN 0 THEN '追蹤你的影響力'
    WHEN 1 THEN 'Track Your Impact'
    WHEN 2 THEN 'あなたのインパクトを追跡'
    WHEN 3 THEN '追踪你的影响力'
  END),
  site_step4_desc = COALESCE(NULLIF(site_step4_desc, ''), CASE lang
    WHEN 0 THEN '在你的徽章護照中持續追蹤已支持的項目與影響成果。'
    WHEN 1 THEN 'Track the projects you supported and your cumulative impact in your badge passport.'
    WHEN 2 THEN 'バッジパスポートで支援プロジェクトと累積インパクトを確認できます。'
    WHEN 3 THEN '在徽章护照中持续追踪你支持的项目与影响成果。'
  END),
  site_events_title = COALESCE(NULLIF(site_events_title, ''), CASE lang
    WHEN 0 THEN '活動與資訊'
    WHEN 1 THEN 'Events & Insights'
    WHEN 2 THEN 'イベントと記事'
    WHEN 3 THEN '活动与资讯'
  END),
  site_events_desc = COALESCE(NULLIF(site_events_desc, ''), CASE lang
    WHEN 0 THEN '探索最新活動與可持續旅遊資訊。'
    WHEN 1 THEN 'Explore the latest events and sustainable travel insights.'
    WHEN 2 THEN '最新のイベントとサステナブル観光情報をご覧ください。'
    WHEN 3 THEN '探索最新活动与可持续旅行资讯。'
  END),
  site_events_label = COALESCE(NULLIF(site_events_label, ''), CASE lang
    WHEN 0 THEN '最新活動'
    WHEN 1 THEN 'Events'
    WHEN 2 THEN 'イベント'
    WHEN 3 THEN '最新活动'
  END),
  site_articles_label = COALESCE(NULLIF(site_articles_label, ''), CASE lang
    WHEN 0 THEN '最新文章'
    WHEN 1 THEN 'Articles'
    WHEN 2 THEN '記事'
    WHEN 3 THEN '最新文章'
  END),
  site_no_events = COALESCE(NULLIF(site_no_events, ''), CASE lang
    WHEN 0 THEN '暫無活動'
    WHEN 1 THEN 'No events yet'
    WHEN 2 THEN 'まだイベントはありません'
    WHEN 3 THEN '暂无活动'
  END),
  site_no_articles = COALESCE(NULLIF(site_no_articles, ''), CASE lang
    WHEN 0 THEN '暫無文章'
    WHEN 1 THEN 'No articles yet'
    WHEN 2 THEN 'まだ記事はありません'
    WHEN 3 THEN '暂无文章'
  END),
  site_readmore = COALESCE(NULLIF(site_readmore, ''), CASE lang
    WHEN 0 THEN '閱讀更多 →'
    WHEN 1 THEN 'Read more →'
    WHEN 2 THEN '続きを読む →'
    WHEN 3 THEN '阅读更多 →'
  END),
  site_contact_title = COALESCE(NULLIF(site_contact_title, ''), CASE lang
    WHEN 0 THEN '聯絡我們'
    WHEN 1 THEN 'Contact Us'
    WHEN 2 THEN 'お問い合わせ'
    WHEN 3 THEN '联系我们'
  END),
  site_contact_desc = COALESCE(NULLIF(site_contact_desc, ''), CASE lang
    WHEN 0 THEN '如有任何問題，歡迎隨時與我們聯絡。'
    WHEN 1 THEN 'Feel free to reach out if you have any questions.'
    WHEN 2 THEN 'ご質問があればお気軽にお問い合わせください。'
    WHEN 3 THEN '如有任何问题，欢迎随时联系我们。'
  END),
  site_contact_phone_label = COALESCE(NULLIF(site_contact_phone_label, ''), CASE lang
    WHEN 0 THEN '電話'
    WHEN 1 THEN 'Phone'
    WHEN 2 THEN '電話'
    WHEN 3 THEN '电话'
  END),
  site_contact_phone = COALESCE(NULLIF(site_contact_phone, ''), '+852 1234-5678'),
  site_contact_email_label = COALESCE(NULLIF(site_contact_email_label, ''), CASE lang
    WHEN 0 THEN '電郵'
    WHEN 1 THEN 'Email'
    WHEN 2 THEN 'メール'
    WHEN 3 THEN '邮箱'
  END),
  site_contact_email_val = COALESCE(NULLIF(site_contact_email_val, ''), 'info@starsdg.com'),
  site_contact_addr_label = COALESCE(NULLIF(site_contact_addr_label, ''), CASE lang
    WHEN 0 THEN '地址'
    WHEN 1 THEN 'Address'
    WHEN 2 THEN '住所'
    WHEN 3 THEN '地址'
  END),
  site_contact_addr = COALESCE(NULLIF(site_contact_addr, ''), CASE lang
    WHEN 0 THEN '香港九龍尖沙咀廣東道 123 號'
    WHEN 1 THEN '123 Canton Road, Tsim Sha Tsui, Kowloon, Hong Kong'
    WHEN 2 THEN '香港 九龍 尖沙咀 廣東道123'
    WHEN 3 THEN '香港九龙尖沙咀广东道123号'
  END),
  site_footer_desc = COALESCE(NULLIF(site_footer_desc, ''), CASE lang
    WHEN 0 THEN '推動可持續旅遊，為地球的未來出一分力。'
    WHEN 1 THEN 'Promoting sustainable tourism for a better future.'
    WHEN 2 THEN '持続可能な観光を推進し、より良い未来へ。'
    WHEN 3 THEN '推动可持续旅游，为地球未来贡献一份力量。'
  END),
  site_footer_links = COALESCE(NULLIF(site_footer_links, ''), CASE lang
    WHEN 0 THEN '快速連結'
    WHEN 1 THEN 'Quick Links'
    WHEN 2 THEN 'クイックリンク'
    WHEN 3 THEN '快速链接'
  END),
  site_footer_contact = COALESCE(NULLIF(site_footer_contact, ''), CASE lang
    WHEN 0 THEN '聯絡方式'
    WHEN 1 THEN 'Contact'
    WHEN 2 THEN '連絡先'
    WHEN 3 THEN '联系方式'
  END),
  site_nav_how = COALESCE(NULLIF(site_nav_how, ''), CASE lang
    WHEN 0 THEN '如何獲得徽章'
    WHEN 1 THEN 'How to Get Badges'
    WHEN 2 THEN 'バッジの取得方法'
    WHEN 3 THEN '如何获得徽章'
  END),
  site_brand = COALESCE(NULLIF(site_brand, ''), 'STAR SDG'),
  site_copyright = COALESCE(NULLIF(site_copyright, ''), CASE lang
    WHEN 0 THEN '© 2026 STAR SDG. 版權所有。'
    WHEN 1 THEN '© 2026 STAR SDG. All rights reserved.'
    WHEN 2 THEN '© 2026 STAR SDG. All rights reserved.'
    WHEN 3 THEN '© 2026 STAR SDG. 版权所有。'
  END),
  site_appstore_label = COALESCE(NULLIF(site_appstore_label, ''), 'App Store'),
  site_appstore_url = COALESCE(NULLIF(site_appstore_url, ''), 'https://apps.apple.com'),
  site_googleplay_label = COALESCE(NULLIF(site_googleplay_label, ''), 'Google Play'),
  site_googleplay_url = COALESCE(NULLIF(site_googleplay_url, ''), 'https://play.google.com'),
  site_loading = COALESCE(NULLIF(site_loading, ''), CASE lang
    WHEN 0 THEN '載入中...'
    WHEN 1 THEN 'Loading...'
    WHEN 2 THEN '読み込み中...'
    WHEN 3 THEN '加载中...'
  END)
WHERE lang IN (0, 1, 2, 3);