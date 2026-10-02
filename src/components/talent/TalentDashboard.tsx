import React, { useState } from 'react';
import { TalentProfile, Opportunity, Application, CareerClass, CommunityPost } from '../../types';
import { TheCoreLoopBanner } from '../common/TheCoreLoopBanner';
import { OpportunityCard } from '../opportunities/OpportunityCard';
import {
  Search,
  Sparkles,
  ArrowRight,
  TrendingUp,
  CheckCircle2,
  Calendar,
  Briefcase,
  Users,
  Compass,
  Star,
  GraduationCap,
  MessageSquare,
  Clock,
  ShieldCheck,
} from 'lucide-react';

interface TalentDashboardProps {
  talentProfile: TalentProfile;
  opportunities: Opportunity[];
  applications: Application[];
  careerClasses: CareerClass[];
  communityPosts: CommunityPost[];
  onSelectOpportunity: (opportunity: Opportunity) => void;
  onNavigateTab: (tab: string) => void;
  onOpenAIModal: () => void;
  savedOpportunityIds: string[];
  onToggleSave: (id: string) => void;
}

export const TalentDashboard: React.FC<TalentDashboardProps> = ({
  talentProfile,
  opportunities,
  applications,
  careerClasses,
  communityPosts,
  onSelectOpportunity,
  onNavigateTab,
  onOpenAIModal,
  savedOpportunityIds,
  onToggleSave,
}) => {
  const [quickSearch, setQuickSearch] = useState('');

  // Top recommended opportunities (matching score > 80%)
  const recommendedOpportunities = opportunities.slice(0, 4);

  // Active / in-progress application
  const activeApplication = applications.find(
    (app) => app.status === 'Interview' || app.status === 'Under Review' || app.status === 'Applied'
  );

  const upcomingClass = careerClasses.find((c) => !c.isCompleted);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNavigateTab('opportunities');
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* 1. Greeting & Hero Search Bar (PRD Section 18) */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-xs relative overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-emerald-100/60 to-transparent rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-[#059669] text-xs font-bold mb-3 border border-emerald-200/60">
            <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
            <span>Platform Karier & Reputasi Talent Vokasi</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-[#0B1E36] tracking-tight leading-tight">
            Selamat Pagi, <span className="text-[#059669]">{talentProfile.fullName}</span>!
          </h1>
          <p className="text-sm sm:text-base text-slate-600 mt-2 font-medium">
            Siap menemukan peluang magang, daily work, atau membuktikan keahlianmu hari ini?
          </p>

          {/* Action-Oriented Hero Search Form */}
          <form onSubmit={handleSearchSubmit} className="mt-6 flex flex-col sm:flex-row gap-2.5">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                value={quickSearch}
                onChange={(e) => setQuickSearch(e.target.value)}
                placeholder="Cari magang, daily work, freelance, keahlian (React, Barista, DKV)..."
                className="w-full pl-12 pr-4 py-4 rounded-2xl bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#059669] focus:bg-white text-[#0B1E36] placeholder:text-slate-400 font-medium transition-all shadow-xs"
              />
            </div>
            <button
              type="submit"
              className="px-6 py-4 rounded-2xl bg-gradient-to-r from-[#059669] to-[#10B981] hover:from-[#047857] hover:to-[#059669] text-white text-sm font-extrabold flex items-center justify-center gap-2 shadow-md shadow-emerald-800/10 transition-all shrink-0 active:scale-98"
            >
              <span>Temukan Peluang</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Popular Search Tags */}
          <div className="flex flex-wrap items-center gap-2 mt-4 text-xs text-slate-500">
            <span className="font-semibold text-slate-600">Populer untuk SMK:</span>
            {['Magang Web Developer', 'Daily Work Barista', 'Motion Graphic DKV', 'Admin Gudang', 'Magang TKRO'].map((tag) => (
              <button
                key={tag}
                onClick={() => onNavigateTab('opportunities')}
                className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200/80 text-slate-700 font-medium transition-colors"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 2. The Core Product Loop Interactive Banner (PRD Section 1 & 45) */}
      <TheCoreLoopBanner
        currentStage={activeApplication ? 3 : 2}
        onStageClick={(route) => onNavigateTab(route)}
      />

      {/* 3. Main Dashboard Grid: Left Content (2 Cols) + Right Sidebar (1 Col) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column (2 Cols) */}
        <div className="lg:col-span-2 space-y-8">
          {/* Section: Recommended Opportunities for Talent */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-xl font-extrabold text-[#0B1E36] flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-[#059669]" />
                  <span>Peluang Paling Cocok untuk Anda</span>
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Dipilih berdasarkan keahlian {talentProfile.skills.slice(0, 3).join(', ')} dan domisili Anda
                </p>
              </div>

              <button
                onClick={() => onNavigateTab('opportunities')}
                className="text-xs font-bold text-[#059669] hover:underline flex items-center gap-1"
              >
                <span>Lihat Semua</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {recommendedOpportunities.map((opp) => (
                <OpportunityCard
                  key={opp.id}
                  opportunity={opp}
                  talentProfile={talentProfile}
                  onSelect={onSelectOpportunity}
                  isSaved={savedOpportunityIds.includes(opp.id)}
                  onToggleSave={onToggleSave}
                />
              ))}
            </div>
          </div>

          {/* Section: AI Career Copilot Interactive Banner */}
          <div className="bg-gradient-to-br from-[#0B1E36] to-[#0D2D4D] rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden shadow-md">
            <div className="max-w-xl relative z-10">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-[#34D399] text-xs font-bold mb-3 border border-emerald-500/30">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Asisten AI Karier Vokasi (Powered by Gemini)</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-white leading-snug">
                Bingung Menghadapi Interview atau Mau Tinjau Portofolio SMK?
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
                Asisten AI InternMatch dilatih khusus dengan kurikulum vokasi dan kebutuhan industri Indonesia untuk memberikan panduan karier praktis.
              </p>

              <div className="flex flex-wrap gap-2 mt-4">
                {[
                  'Tinjau Portofolio & CV Saya',
                  'Simulasi Pertanyaan Interview Magang',
                  'Keahlian yang Perlu Ditingkatkan',
                ].map((prompt, i) => (
                  <button
                    key={i}
                    onClick={onOpenAIModal}
                    className="text-[11px] px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-medium border border-white/20 transition-all text-left"
                  >
                    💬 {prompt}
                  </button>
                ))}
              </div>

              <div className="mt-5">
                <button
                  onClick={onOpenAIModal}
                  className="px-5 py-2.5 rounded-xl bg-[#10B981] hover:bg-[#059669] text-white text-xs font-extrabold flex items-center gap-2 shadow-sm transition-all"
                >
                  <Sparkles className="w-4 h-4 text-emerald-100" />
                  <span>Mulai Konsultasi AI Gratis</span>
                </button>
              </div>
            </div>
          </div>

          {/* Section: Community Highlights */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-extrabold text-lg text-[#0B1E36] flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-[#059669]" />
                  <span>Diskusi Hangat Komunitas Vokasi</span>
                </h3>
                <p className="text-xs text-slate-500">Berbagi pengalaman magang dan tips dunia kerja nyata</p>
              </div>
              <button
                onClick={() => onNavigateTab('community')}
                className="text-xs font-bold text-[#059669] hover:underline"
              >
                Buka Komunitas
              </button>
            </div>

            <div className="space-y-3 divide-y divide-slate-100">
              {communityPosts.slice(0, 2).map((post) => (
                <div
                  key={post.id}
                  onClick={() => onNavigateTab('community')}
                  className="pt-3 first:pt-0 cursor-pointer hover:bg-slate-50/80 p-2.5 rounded-xl transition-colors"
                >
                  <div className="flex items-center gap-2 mb-1.5 text-xs text-slate-500">
                    <span className="font-bold text-[#0B1E36]">{post.authorName}</span>
                    <span>•</span>
                    <span className="text-[11px] bg-slate-100 px-2 py-0.5 rounded text-slate-600 font-medium">
                      {post.category}
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-slate-800 line-clamp-1 hover:text-[#059669]">
                    {post.title}
                  </h4>
                  <p className="text-xs text-slate-600 line-clamp-2 mt-1">
                    {post.content}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Sidebar (1 Col): Status & Action Widgets */}
        <div className="space-y-6">
          {/* Widget 1: Profile Completion & Reputation Score */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-extrabold text-sm text-[#0B1E36]">Reputasi & Profil Anda</h3>
              <span className="text-xs font-extrabold text-[#059669] bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                {talentProfile.reputationScore} / 100
              </span>
            </div>

            <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200/70">
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="text-slate-600 font-medium">Kelengkapan Profil:</span>
                <span className="font-bold text-slate-900">{talentProfile.profileCompletionPercentage}%</span>
              </div>
              <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
                <div
                  style={{ width: `${talentProfile.profileCompletionPercentage}%` }}
                  className="h-full bg-[#059669] rounded-full"
                />
              </div>
            </div>

            <div className="text-xs space-y-2">
              <div className="flex items-center gap-2 text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-[#059669] shrink-0" />
                <span>1 Pengalaman Magang Industri Selesai</span>
              </div>
              <div className="flex items-center gap-2 text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-[#059669] shrink-0" />
                <span>Sertifikasi BNSP Junior Web Dev</span>
              </div>
              <div className="flex items-center gap-2 text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-[#059669] shrink-0" />
                <span>Ulasan Pemberi Kerja 4.9 ★</span>
              </div>
            </div>

            <button
              onClick={() => onNavigateTab('profile')}
              className="w-full py-2.5 rounded-xl border border-slate-200 hover:border-[#059669] text-xs font-bold text-[#0B1E36] hover:text-[#059669] transition-colors"
            >
              Lihat Rincian Reputasi
            </button>
          </div>

          {/* Widget 2: Application Progress Tracker */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-extrabold text-sm text-[#0B1E36] flex items-center gap-1.5">
                <Briefcase className="w-4 h-4 text-[#059669]" />
                <span>Lamaran Terkini</span>
              </h3>
              <button
                onClick={() => onNavigateTab('applications')}
                className="text-xs font-bold text-[#059669] hover:underline"
              >
                Semua ({applications.length})
              </button>
            </div>

            {activeApplication ? (
              <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-200/70 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-[#059669] text-white">
                    {activeApplication.status}
                  </span>
                  <span className="text-[10px] text-slate-500">{activeApplication.appliedDate}</span>
                </div>

                <h4 className="font-bold text-xs text-[#0B1E36] line-clamp-1">
                  {activeApplication.opportunity.title}
                </h4>
                <div className="text-[11px] text-slate-600 font-medium">
                  {activeApplication.opportunity.companyName}
                </div>

                {activeApplication.interviewDate && (
                  <div className="text-[11px] p-2 bg-white rounded-lg border border-emerald-200 text-[#065F46] font-semibold flex items-center gap-1.5 mt-2">
                    <Calendar className="w-3.5 h-3.5 text-[#059669] shrink-0" />
                    <span>Jadwal: {activeApplication.interviewDate}</span>
                  </div>
                )}
              </div>
            ) : (
              <p className="text-xs text-slate-500">Belum ada lamaran aktif saat ini.</p>
            )}
          </div>

          {/* Widget 3: Upcoming Career Class */}
          {upcomingClass && (
            <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs space-y-3">
              <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#059669]">
                <GraduationCap className="w-4 h-4" />
                <span>Kelas Karier Terdekat</span>
              </div>

              <h4 className="font-bold text-xs text-[#0B1E36] line-clamp-2">
                {upcomingClass.title}
              </h4>

              <div className="text-xs text-slate-500 space-y-1">
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
                  <span>{upcomingClass.date} ({upcomingClass.time})</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  <span>Platform: {upcomingClass.platform}</span>
                </div>
              </div>

              <button
                onClick={() => onNavigateTab('career-class')}
                className="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-800 transition-colors"
              >
                Buka Kelas Karier
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
