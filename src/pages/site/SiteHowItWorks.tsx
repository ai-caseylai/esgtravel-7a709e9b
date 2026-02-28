import { Link } from 'react-router-dom';
import { useI18n } from '@/lib/i18n';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import heroImg from '@/assets/site-how-hero.jpg';
import stepExplore from '@/assets/step-explore.jpg';
import stepPurchase from '@/assets/step-purchase.jpg';
import stepCert from '@/assets/step-cert.jpg';
import stepImpact from '@/assets/step-impact.jpg';

export default function SiteHowItWorks() {
  const { t } = useI18n();

  const steps = [
    {
      num: '01',
      image: stepExplore,
      titleKey: { 0: '探索徽章', 1: '探索徽章', 2: 'Explore Badges', 3: 'バッジを探す' },
      descKey: { 0: '瀏覽各地區的可持續旅遊徽章，了解每個徽章背後的故事和影響。每個徽章代表一個地區的永續發展承諾。', 1: '浏览各地区的可持续旅游徽章，了解每个徽章背后的故事和影响。每个徽章代表一个地区的可持续发展承诺。', 2: 'Browse sustainable tourism badges from different regions. Each badge represents a commitment to sustainable development in that area.', 3: '各地域の持続可能な観光バッジを閲覧し、各バッジの背景にあるストーリーと影響について学びましょう。' },
    },
    {
      num: '02',
      image: stepPurchase,
      titleKey: { 0: '購買徽章', 1: '购买徽章', 2: 'Purchase a Badge', 3: 'バッジを購入' },
      descKey: { 0: '選擇你喜歡的徽章並完成付款。你也可以額外捐助，為當地社區做出更大貢獻。付款安全有保障。', 1: '选择你喜欢的徽章并完成付款。你也可以额外捐助，为当地社区做出更大贡献。付款安全有保障。', 2: 'Choose your favourite badge and complete the payment. You can also make an extra donation to contribute more. Payment is secure and protected.', 3: 'お気に入りのバッジを選んで支払いを完了しましょう。追加の寄付もできます。支払いは安全に保護されています。' },
    },
    {
      num: '03',
      image: stepCert,
      titleKey: { 0: '獲得數碼認證', 1: '获得数码认证', 2: 'Receive Digital Certificate', 3: 'デジタル認証を受け取る' },
      descKey: { 0: '購買後你將獲得一個數碼認證徽章，記錄在你的旅遊護照中。認證包含你的姓名和相關的永續發展目標。', 1: '购买后你将获得一个数码认证徽章，记录在你的旅游护照中。认证包含你的姓名和相关的可持续发展目标。', 2: 'After purchase, you receive a digital certificate badge recorded in your travel passport, including your name and related SDGs.', 3: '購入後、あなたの名前と関連するSDGsを含むデジタル認証バッジを受け取り、トラベルパスポートに記録されます。' },
    },
    {
      num: '04',
      image: stepImpact,
      titleKey: { 0: '追蹤你的影響', 1: '追踪你的影响', 2: 'Track Your Impact', 3: 'インパクトを追跡' },
      descKey: { 0: '在護照頁面查看你所有收集的徽章和累計的社會影響。你可以分享你的成就，鼓勵更多人加入。', 1: '在护照页面查看你所有收集的徽章和累计的社会影响。你可以分享你的成就，鼓励更多人加入。', 2: 'View all your collected badges and cumulative social impact in your passport. Share your achievements and inspire others to join.', 3: 'パスポートページで集めたバッジと累積的な社会的影響を確認しましょう。あなたの成果を共有して、他の人にも参加を促しましょう。' },
    },
  ];

  return (
    <div>
      {/* Hero with background */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroImg} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/40 to-background" />
        </div>
        <div className="max-w-4xl mx-auto px-4 py-20 text-center relative">
          <h1 className="text-foreground text-4xl font-bold mb-4 drop-shadow-lg">
            {t({ 0: '如何獲得徽章', 1: '如何获得徽章', 2: 'How to Get Badges', 3: 'バッジの取得方法' })}
          </h1>
          <p className="text-foreground/80 text-lg drop-shadow">
            {t({ 0: '只需幾個簡單步驟，你就能成為可持續旅遊大使', 1: '只需几个简单步骤，你就能成为可持续旅游大使', 2: 'Just a few simple steps to become a sustainable travel ambassador', 3: 'いくつかの簡単なステップで持続可能な観光大使になれます' })}
          </p>
        </div>
      </section>

      {/* Steps with images */}
      <section className="max-w-5xl mx-auto px-4 py-16 space-y-12">
        {steps.map((step, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className={`flex flex-col ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-8 items-center`}
          >
            <div className="w-full md:w-2/5 aspect-square rounded-2xl overflow-hidden shadow-lg">
              <img src={step.image} alt="" className="w-full h-full object-cover" />
            </div>
            <div className="w-full md:w-3/5">
              <div className="flex items-center gap-4 mb-3">
                <div className="w-14 h-14 rounded-2xl bg-primary flex items-center justify-center shrink-0">
                  <span className="text-primary-foreground font-bold text-xl">{step.num}</span>
                </div>
                <h3 className="text-foreground font-bold text-2xl">{t(step.titleKey)}</h3>
              </div>
              <p className="text-muted-foreground leading-relaxed text-lg">{t(step.descKey)}</p>
            </div>
          </motion.div>
        ))}
      </section>

      {/* CTA */}
      <section className="max-w-4xl mx-auto px-4 pb-16 text-center">
        <Link to="/" className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-3 rounded-xl text-lg font-medium no-underline hover:opacity-90 transition-opacity shadow-lg">
          {t({ 0: '立即獲取徽章', 1: '立即获取徽章', 2: 'Get Your Badge Now', 3: '今すぐバッジを取得' })} <ArrowRight className="w-5 h-5" />
        </Link>
      </section>
    </div>
  );
}
