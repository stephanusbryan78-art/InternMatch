import React from 'react';
import { Compass, CheckCircle2, Briefcase, Award, TrendingUp } from 'lucide-react';

interface TheCoreLoopBannerProps {
  currentStage?: number; // 1 to 5
  onStageClick?: (stage: string) => void;
}

export const TheCoreLoopBanner: React.FC<TheCoreLoopBannerProps> = ({
  currentStage = 3,
  onStageClick,
}) => {
  const stages = [
    {
      step: 1,
      title: 'DISCOVER',
      subtitle: 'Temukan Peluang',
      desc: 'Eksplorasi magang & daily work terverifikasi',
      icon: Compass,
      route: 'opportunities',
    },
    {
      step: 2,
      title: 'MATCH',
      subtitle: 'Kecocokan 87%+',
      desc: 'Pahami alasan skill & lokasi cocok',
      icon: CheckCircle2,
      route: 'opportunities',
    },
    {
      step: 3,
      title: 'WORK',
      subtitle: 'Pengalaman Nyata',
      desc: 'Kerjakan proyek magang / harian',
      icon: Briefcase,
      route: 'applications',
    },
    {
      step: 4,
      title: 'PROVE',
      subtitle: 'Ulasan Pemberi Kerja',
      desc: 'Dapatkan feedback bintang 5 & sertifikat',
      icon: Award,
      route: 'profile',
    },
    {
      step: 5,
      title: 'GROW',
      subtitle: 'Reputasi Melejit',
      desc: 'Buka peluang karier bernilai lebih tinggi',
      icon: TrendingUp,
      route: 'profile',
    },
  ];

  return (
    <div className="bg-gradient-to-r from-[#0B1E36] via-[#102A4C] to-[#0B1E36] text-white rounded-2xl p-4 sm:p-6 shadow-md border border-slate-700/50 mb-8 overflow-hidden relative">
      {/* Background visual subtle circuit / road glow */}
      <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-[#059669]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute left-1/4 -top-12 w-48 h-48 bg-[#10B981]/10 rounded-full blur-2xl pointer-events-none" />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5 relative z-10 border-b border-slate-700/60 pb-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-[#10B981] animate-pulse" />
            <span className="text-xs uppercase font-bold tracking-wider text-[#34D399]">
              Siklus Pengembangan Karier Vokasi
            </span>
          </div>
          <h2 className="text-lg sm:text-xl font-bold tracking-tight text-white mt-0.5">
            The InternMatch Loop: <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#34D399] to-[#10B981]">DISCOVER → MATCH → WORK → PROVE → GROW</span>
          </h2>
        </div>
        <p className="text-xs text-slate-300 max-w-sm hidden md:block">
          Bukan sekadar job board. Bangun reputasi profesional Anda dari keterampilan dan pengalaman kerja nyata.
        </p>
      </div>

      {/* Steps visualization */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 relative z-10">
        {stages.map((st) => {
          const Icon = st.icon;
          const isActive = st.step <= currentStage;
          const isCurrent = st.step === currentStage;

          return (
            <div
              key={st.step}
              onClick={() => onStageClick && onStageClick(st.route)}
              className={`p-3 rounded-xl border transition-all cursor-pointer ${
                isCurrent
                  ? 'bg-gradient-to-b from-[#059669]/30 to-[#047857]/40 border-[#10B981] shadow-lg shadow-emerald-950/40 ring-1 ring-[#10B981]/50'
                  : isActive
                  ? 'bg-slate-800/60 border-emerald-500/30 hover:border-emerald-400'
                  : 'bg-slate-800/30 border-slate-700/60 opacity-75 hover:opacity-100 hover:border-slate-600'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div
                  className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs ${
                    isCurrent
                      ? 'bg-[#10B981] text-white shadow-sm'
                      : isActive
                      ? 'bg-emerald-950 text-[#34D399] border border-emerald-600/40'
                      : 'bg-slate-700 text-slate-400'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                </div>
                <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${
                  isCurrent ? 'bg-emerald-400/20 text-emerald-300 font-bold' : 'text-slate-400'
                }`}>
                  Fase {st.step}
                </span>
              </div>
              <h3 className="font-extrabold text-xs sm:text-sm tracking-tight text-white flex items-center gap-1">
                {st.title}
                {isCurrent && <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#10B981]" />}
              </h3>
              <p className="text-[11px] font-medium text-emerald-300 mt-0.5 line-clamp-1">{st.subtitle}</p>
              <p className="text-[10px] text-slate-400 mt-1 line-clamp-2 leading-tight">{st.desc}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
