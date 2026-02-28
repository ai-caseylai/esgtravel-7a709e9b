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
  const { lang, t } = useI18n();

  const steps = [
    {
      num: '01',
      image: stepExplore,
      titleKey: { 0: '探索徽章', 1: 'Explore Badges', 2: 'バッジを探す' },
      descKey: { 0: '瀏覽各地區的可持續旅遊徽章，了解每個徽章背後的故事和影響。每個徽章代表一個地區的永續發展承諾。', 1: 'Browse sustainable tourism badges from different regions. Each badge represents a commitment to sustainable development in that area.', 2: '各地域の持続可能な観光バッジを閲覧し、各バッジの背景にあるストーリーと影響について学びましょう。' },
    },
    {
      num: '02',
      image: stepPurchase,
      titleKey: { 0: '購買徽章', 1: 'Purchase a Badge', 2: 'バッジを購入' },
      descKey: { 0: '選擇你喜歡的徽章並完成付款。你也可以額外捐助，為當地社區做出更大貢獻。付款安全有保障。', 1: 'Choose your favourite badge and complete the payment. You can also make an extra donation to contribute more. Payment is secure and protected.', 2: 'お気に入りのバッジを選んで支払いを完了しましょう。追加の寄付もできます。支払いは安全に保護されています。' },
    },
    {
      num: '03',
      image: stepCert,
      titleKey: { 0: '獲得數碼認證', 1: 'Receive Digital Certificate', 2: 'デジタル認証を受け取る' },
      descKey: { 0: '購買後你將獲得一個數碼認證徽章，記錄在你的旅遊護照中。認證包含你的姓名和相關的永續發展目標。', 1: 'After purchase, you receive a digital certificate badge recorded in your travel passport, including your name and related SDGs.', 2: '購入後、あなたの名前と関連するSDGsを含むデジタル認証バッジを受け取り、トラベルパスポートに記録されます。' },
    },
    {
      num: '04',
      image: stepImpact,
      titleKey: { 0: '追蹤你的影響', 1: 'Track Your Impact', 2: 'インパクトを追跡' },
      descKey: { 0: '在護照頁面查看你所有收集的徽章和累計的社會影響。你可以分享你的成就，鼓勵更多人加入。', 1: 'View all your collected badges and cumulative social impact in your passport. Share your achievements and inspire others to join.', 2: 'パスポートページで集めたバッジと累積的な社会的影響を確認しましょう。あなたの成果を共有して、他の人にも参加を促しましょう。' },
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
            {t({ 0: '如何獲得徽章', 1: 'How to Get Badges', 2: 'バッジの取得方法' })}
          </h1>
          <p className="text-foreground/80 text-lg drop-shadow">
            {t({ 0: '只需幾個簡單步驟，你就能成為可持續旅遊大使', 1: 'Just a few simple steps to become a sustainable travel ambassador', 2: 'いくつかの簡単なステップで持続可能な観光大使になれます' })}
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
          {t({ 0: '立即獲取徽章', 1: 'Get Your Badge Now', 2: '今すぐバッジを取得' })} <ArrowRight className="w-5 h-5" />
        </Link>
      </section>
    </div>
  );
}
