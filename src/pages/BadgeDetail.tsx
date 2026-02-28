import { useParams, useNavigate, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchBadgeDetail } from '@/lib/api';
import { useI18n, ui } from '@/lib/i18n';
import { useAuth } from '@/lib/auth';
import { useState } from 'react';
import MobileHeader from '@/components/MobileHeader';
import { motion, AnimatePresence } from 'framer-motion';

export default function BadgeDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { lang, t } = useI18n();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [tabIdx, setTabIdx] = useState(1);

  const { data: badge, isLoading } = useQuery({
    queryKey: ['badge', id, lang],
    queryFn: () => fetchBadgeDetail(Number(id), lang),
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!badge) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-3">
        <p className="text-muted-foreground">Badge not found</p>
        <button onClick={() => navigate('/mobile')} className="text-primary text-[14px] bg-transparent border-none">{t(ui.backHome)}</button>
      </div>
    );
  }

  const tr = badge.translation;
  const tabs = [
    { idx: 1, label: t({ 0: '徽章', 1: '徽章', 2: 'Badge', 3: 'バッジ' }) },
    { idx: 0, label: t({ 0: '影響', 1: '影响', 2: 'Impact', 3: '影響' }) },
    { idx: 2, label: t({ 0: '活動', 1: '活动', 2: 'Event', 3: 'イベント' }) },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <MobileHeader title={tr?.home_header || badge.code || ''} showBack />

      {/* Tabs */}
      <div className="flex border-b border-border">
        {tabs.map(tab => (
          <button
            key={tab.idx}
            onClick={() => setTabIdx(tab.idx)}
            className={`flex-1 py-3 text-[14px] font-medium border-b-2 transition-colors bg-transparent ${
              tabIdx === tab.idx
                ? 'border-primary text-primary'
                : 'border-transparent text-muted-foreground'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="flex-1 overflow-y-auto px-5 py-5">
        <AnimatePresence mode="wait">
          <motion.div
            key={tabIdx}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.2 }}
          >
            {tabIdx === 1 && (
              <div className="flex flex-col items-center">
                <div className="w-48 h-48 bg-muted rounded-2xl flex items-center justify-center mb-5">
                  {badge.image_url ? (
                    <img src={badge.image_url} alt="" className="w-full h-full object-cover rounded-2xl" />
                  ) : (
                    <span className="text-6xl">🏅</span>
                  )}
                </div>
                <h2 className="text-foreground font-bold text-lg mb-2 text-center">{tr?.title}</h2>
                <button
                  onClick={() => navigate(`/mobile/cert/${id}`)}
                  className="bg-card border border-border text-primary font-medium text-[14px] py-2.5 px-6 rounded-xl mb-5"
                >
                  {t({ 0: '查看認證', 1: '查看认证', 2: 'View Certificate', 3: '認証を見る' })}
                </button>
                {tr?.content && (
                  <div className="w-full text-foreground text-[14px] leading-relaxed whitespace-pre-line">
                    {tr.content}
                  </div>
                )}
              </div>
            )}

            {tabIdx === 0 && (
              <div className="text-foreground text-[14px] leading-relaxed whitespace-pre-line">
                {tr?.impact || <p className="text-muted-foreground text-center py-8">No impact data</p>}
              </div>
            )}

            {tabIdx === 2 && (
              <div>
                <h2 className="text-foreground font-bold text-lg mb-3">{tr?.title}</h2>
                {tr?.summary && (
                  <div className="mb-4">
                    <h4 className="text-[13px] font-semibold text-muted-foreground uppercase tracking-wide mb-2">
                      {t({ 0: '摘要', 1: '摘要', 2: 'Summary', 3: '概要' })}
                    </h4>
                    <p className="text-foreground text-[14px] leading-relaxed whitespace-pre-line">{tr.summary}</p>
                  </div>
                )}
                {tr?.details && (
                  <div>
                    <h4 className="text-[13px] font-semibold text-muted-foreground uppercase tracking-wide mb-2">
                      {t({ 0: '詳情', 1: '详情', 2: 'Details', 3: '詳細' })}
                    </h4>
                    <p className="text-foreground text-[14px] leading-relaxed whitespace-pre-line">{tr.details}</p>
                  </div>
                )}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Buy button */}
      {user && (
        <div className="px-5 py-4 bg-background border-t border-border">
          <button
            onClick={() => navigate(`/mobile/payment/${badge.id}`)}
            className="w-full h-12 rounded-xl font-semibold text-[15px] text-primary-foreground border-none"
            style={{ background: 'var(--gradient-ocean)' }}
          >
            ${badge.price} USD — {t(ui.buyBadge)}
          </button>
        </div>
      )}
    </div>
  );
}
