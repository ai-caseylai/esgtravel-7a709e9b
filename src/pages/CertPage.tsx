import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchBadgeDetail } from '@/lib/api';
import { supabase } from '@/integrations/supabase/client';
import { useI18n, ui } from '@/lib/i18n';
import { useAuth } from '@/lib/auth';
import AppFooter from '@/components/AppFooter';

export default function CertPage() {
  const { id } = useParams<{ id: string }>();
  const { lang, t } = useI18n();
  const { user } = useAuth();
  const navigate = useNavigate();

  const { data: badge } = useQuery({
    queryKey: ['badge', id, lang],
    queryFn: () => fetchBadgeDetail(Number(id), lang),
    enabled: !!id,
  });

  const { data: profile } = useQuery({
    queryKey: ['profile', user?.id],
    queryFn: async () => {
      if (!user) return null;
      const { data } = await supabase.from('profiles').select('*').eq('id', user.id).single();
      return data;
    },
    enabled: !!user,
  });

  // Fetch SDG associations
  const { data: sdgIds } = useQuery({
    queryKey: ['sdg_badges', id],
    queryFn: async () => {
      const { data } = await supabase.from('sdg_badges').select('sdg_id').eq('badge_id', Number(id));
      return data?.map(s => s.sdg_id) || [];
    },
    enabled: !!id,
  });

  const tr = badge?.translation;
  const holderName = profile?.contact_name || user?.email?.split('@')[0] || t({ 0: '持有者', 1: 'Holder', 2: '所有者' });

  const sdgLabels: Record<number, string> = {
    1: 'No Poverty', 2: 'Zero Hunger', 3: 'Good Health', 4: 'Quality Education',
    5: 'Gender Equality', 6: 'Clean Water', 7: 'Clean Energy', 8: 'Decent Work',
    9: 'Innovation', 10: 'Reduced Inequalities', 11: 'Sustainable Cities',
    12: 'Responsible Consumption', 13: 'Climate Action', 14: 'Life Below Water',
    15: 'Life on Land', 16: 'Peace & Justice', 17: 'Partnerships',
  };

  const sdgColors: Record<number, string> = {
    1: '#E5243B', 2: '#DDA63A', 3: '#4C9F38', 4: '#C5192D', 5: '#FF3A21',
    6: '#26BDE2', 7: '#FCC30B', 8: '#A21942', 9: '#FD6925', 10: '#DD1367',
    11: '#FD9D24', 12: '#BF8B2E', 13: '#3F7E44', 14: '#0A97D9', 15: '#56C02B',
    16: '#00689D', 17: '#19486A',
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Back */}
      <div className="pt-4 px-4">
        <button onClick={() => navigate(-1)} className="text-primary text-2xl">←</button>
      </div>

      {/* Certificate card */}
      <div className="mx-4 mt-4 bg-card rounded-2xl border border-border shadow-lg p-6 text-center">
        <p className="text-muted-foreground text-xs uppercase tracking-widest mb-2">
          {t({ 0: '數碼認證', 1: 'Digital Certificate', 2: 'デジタル認証' })}
        </p>

        {/* Badge image */}
        <div className="w-32 h-32 mx-auto bg-muted rounded-full flex items-center justify-center mb-4">
          {badge?.image_url ? (
            <img src={badge.image_url} alt="" className="w-full h-full object-cover rounded-full" />
          ) : (
            <span className="text-5xl">🏅</span>
          )}
        </div>

        {/* Holder name */}
        <h2 className="text-foreground font-bold text-xl mb-1">{holderName}</h2>
        <p className="text-primary font-medium text-sm mb-1">
          {t({ 0: '可持續旅遊大使', 1: 'Sustainable Travel Ambassador', 2: '持続可能な観光大使' })}
        </p>

        <hr className="my-4 border-border" />

        {/* Badge title */}
        <h3 className="text-foreground font-semibold text-lg">{tr?.home_header || badge?.code}</h3>
        <p className="text-muted-foreground text-sm mt-1">{tr?.title}</p>

        {/* SDG icons */}
        {sdgIds && sdgIds.length > 0 && (
          <div className="mt-4">
            <p className="text-muted-foreground text-xs mb-2">
              {t({ 0: '相關永續發展目標', 1: 'Related SDGs', 2: '関連するSDGs' })}
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {sdgIds.map(sdgId => (
                <div
                  key={sdgId}
                  className="w-10 h-10 rounded-lg flex items-center justify-center text-white text-xs font-bold"
                  style={{ backgroundColor: sdgColors[sdgId] || '#888' }}
                  title={sdgLabels[sdgId]}
                >
                  {sdgId}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Event info */}
        {tr?.summary && (
          <div className="mt-4 text-left">
            <p className="text-muted-foreground text-xs uppercase tracking-wider mb-1">
              {t({ 0: '活動資訊', 1: 'Event Info', 2: 'イベント情報' })}
            </p>
            <p className="text-foreground text-sm leading-relaxed whitespace-pre-line">{tr.summary}</p>
          </div>
        )}
      </div>

      <AppFooter />
    </div>
  );
}
