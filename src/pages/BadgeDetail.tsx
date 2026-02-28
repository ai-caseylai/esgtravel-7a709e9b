import { useParams, useNavigate, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchBadgeDetail } from '@/lib/api';
import { useI18n, ui } from '@/lib/i18n';
import { useAuth } from '@/lib/auth';
import { useState } from 'react';
import AppFooter from '@/components/AppFooter';

export default function BadgeDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { lang, t } = useI18n();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [tabIdx, setTabIdx] = useState(1); // 0=impact, 1=badge, 2=event
  const [eventTabIdx, setEventTabIdx] = useState(0); // 0=summary, 1=detail

  const { data: badge, isLoading } = useQuery({
    queryKey: ['badge', id, lang],
    queryFn: () => fetchBadgeDetail(Number(id), lang),
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Loading...</div>
      </div>
    );
  }

  if (!badge) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center">
        <p className="text-muted-foreground">Badge not found</p>
        <Link to="/">
          <button className="mt-4 text-primary underline">{t(ui.backHome)}</button>
        </Link>
      </div>
    );
  }

  const tr = badge.translation;

  const tabs = [
    { idx: 1, label: t({ 0: '徽章', 1: 'Badge', 2: 'バッジ' }) },
    { idx: 0, label: t({ 0: '影響', 1: 'Impact', 2: '影響' }) },
    { idx: 2, label: t({ 0: '活動', 1: 'Event', 2: 'イベント' }) },
  ];

  return (
    <div className="min-h-screen bg-background text-center">
      {/* Back button */}
      <div className="pt-4 px-4 flex items-center">
        <button onClick={() => navigate(-1)} className="text-primary text-2xl">
          ←
        </button>
      </div>

      {/* Tabs */}
      <div className="flex justify-center gap-6 py-4">
        {tabs.map(tab => (
          <button
            key={tab.idx}
            onClick={() => setTabIdx(tab.idx)}
            className={`text-lg cursor-pointer bg-transparent border-none pb-1 ${
              tabIdx === tab.idx
                ? 'text-accent font-bold underline underline-offset-4 decoration-4'
                : 'text-primary font-normal'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="px-4 overflow-y-auto" style={{ height: '70vh' }}>
        {/* Impact tab */}
        {tabIdx === 0 && (
          <div className="py-4">
            {tr?.impact ? (
              <div className="text-left px-4 text-foreground text-sm leading-6 whitespace-pre-line">
                {tr.impact}
              </div>
            ) : (
              <p className="text-muted-foreground">No impact data</p>
            )}
          </div>
        )}

        {/* Badge tab */}
        {tabIdx === 1 && (
          <div className="py-4 flex flex-col items-center">
            {/* Badge image placeholder */}
            <div className="w-[215px] h-[215px] bg-muted rounded-lg flex items-center justify-center mb-6">
              <span className="text-6xl">🏅</span>
            </div>

            <h2 className="text-accent font-bold text-xl mb-4">{tr?.title}</h2>

            <button
              onClick={() => navigate(`/cert/${id}`)}
              className="bg-primary text-primary-foreground font-medium text-lg py-2 rounded-[20px] w-[70%] border-none mb-6"
            >
              {t({ 0: '查看認證', 1: 'View Certificate', 2: '認証を見る' })}
            </button>

            <div className="w-1/2 text-center">
              <h3 className="text-foreground font-medium text-base">
                {t({ 0: '影響力記錄', 1: 'Impact Record', 2: 'インパクト記録' })}
              </h3>
              <hr className="w-full h-1 bg-primary/60 border-none my-2" />
            </div>

            {tr?.content && (
              <div className="mt-4 text-left px-4 text-foreground text-sm leading-6 whitespace-pre-line">
                {tr.content}
              </div>
            )}
          </div>
        )}

        {/* Event tab */}
        {tabIdx === 2 && (
          <div className="py-4">
            {/* Event background image placeholder */}
            <div className="w-full h-40 bg-muted rounded-lg mb-4 flex items-center justify-center">
              <span className="text-muted-foreground text-sm">Event Image</span>
            </div>

            <h2 className="text-accent font-bold text-xl mb-4">{tr?.title}</h2>

            {/* Event sub-tabs */}
            <div className="flex justify-center gap-4 mb-4">
              <button
                onClick={() => setEventTabIdx(0)}
                className={`px-5 py-1 rounded text-lg border-none ${
                  eventTabIdx === 0
                    ? 'bg-accent/20 text-accent font-bold'
                    : 'bg-muted text-muted-foreground'
                }`}
              >
                {t({ 0: '摘要', 1: 'Summary', 2: '概要' })}
              </button>
              <button
                onClick={() => setEventTabIdx(1)}
                className={`px-5 py-1 rounded text-lg border-none ${
                  eventTabIdx === 1
                    ? 'bg-accent/20 text-accent font-bold'
                    : 'bg-muted text-muted-foreground'
                }`}
              >
                {t({ 0: '詳情', 1: 'Detail', 2: '詳細' })}
              </button>
            </div>

            <div className="text-left px-4 text-foreground text-sm leading-6 whitespace-pre-line">
              {eventTabIdx === 0 ? tr?.summary : tr?.details}
            </div>
          </div>
        )}
      </div>

      {/* Buy button */}
      {user && (
        <div className="px-[15%] py-4">
          <Link to={`/payment/${badge.id}`}>
            <button className="w-full py-3 bg-primary text-primary-foreground font-medium text-lg rounded-[20px] border-none">
              ${badge.price} USD - {t(ui.buyBadge)}
            </button>
          </Link>
        </div>
      )}

      <AppFooter />
    </div>
  );
}
