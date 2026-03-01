import { motion } from 'framer-motion';
import { useSiteContent } from '@/hooks/use-site-content';
import heroImgFallback from '@/assets/site-how-hero.jpg';
import stepExploreFallback from '@/assets/step-explore.jpg';
import stepPurchaseFallback from '@/assets/step-purchase.jpg';
import stepCertFallback from '@/assets/step-cert.jpg';
import stepImpactFallback from '@/assets/step-impact.jpg';

export default function SiteHowItWorks() {
  const { tc } = useSiteContent();

  const heroImg = tc('site_how_hero_img', '') || heroImgFallback;

  const steps = [
    {
      num: '01',
      image: tc('site_step1_img', '') || stepExploreFallback,
      title: tc('site_step1_title', 'Explore Badges'),
      desc: tc('site_step1_desc', ''),
    },
    {
      num: '02',
      image: tc('site_step2_img', '') || stepPurchaseFallback,
      title: tc('site_step2_title', 'Purchase a Badge'),
      desc: tc('site_step2_desc', ''),
    },
    {
      num: '03',
      image: tc('site_step3_img', '') || stepCertFallback,
      title: tc('site_step3_title', 'Receive Digital Certificate'),
      desc: tc('site_step3_desc', ''),
    },
    {
      num: '04',
      image: tc('site_step4_img', '') || stepImpactFallback,
      title: tc('site_step4_title', 'Track Your Impact'),
      desc: tc('site_step4_desc', ''),
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
            {tc('site_how_title', 'How to Get Badges')}
          </h1>
          <p className="text-foreground/80 text-lg drop-shadow">
            {tc('site_how_desc', '')}
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
                <h3 className="text-foreground font-bold text-2xl">{step.title}</h3>
              </div>
              <p className="text-muted-foreground leading-relaxed text-lg">{step.desc}</p>
            </div>
          </motion.div>
        ))}
      </section>
    </div>
  );
}
