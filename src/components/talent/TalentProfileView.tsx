import React, { useState } from 'react';
import { TalentProfile, PortfolioItem, ExperienceItem } from '../../types';
import {
  ShieldCheck,
  Star,
  Award,
  Briefcase,
  GraduationCap,
  ExternalLink,
  Plus,
  Edit3,
  MapPin,
  Clock,
  Sparkles,
  CheckCircle2,
  TrendingUp,
  FileText,
  BadgeCheck,
  Calendar,
  X,
} from 'lucide-react';

interface TalentProfileViewProps {
  profile: TalentProfile;
  onUpdateProfile: (updatedProfile: TalentProfile) => void;
  onOpenAIModal?: () => void;
  onExploreOpportunities?: () => void;
}

export const TalentProfileView: React.FC<TalentProfileViewProps> = ({
  profile,
  onUpdateProfile,
  onOpenAIModal,
  onExploreOpportunities,
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'reputation' | 'portfolio' | 'feedback'>('overview');
  const [showAddSkillModal, setShowAddSkillModal] = useState(false);
  const [newSkillName, setNewSkillName] = useState('');
  const [showAddPortfolioModal, setShowAddPortfolioModal] = useState(false);
  const [newPortfolio, setNewPortfolio] = useState<Partial<PortfolioItem>>({
    title: '',
    category: 'Web Development',
    description: '',
    link: '',
  });

  const handleAddSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSkillName.trim()) return;
    if (profile.skills.includes(newSkillName.trim())) return;

    const updatedSkills = [...profile.skills, newSkillName.trim()];
    const newCompletion = Math.min(100, profile.profileCompletionPercentage + 3);
    const newReputation = Math.min(100, profile.reputationScore + 2);

    onUpdateProfile({
      ...profile,
      skills: updatedSkills,
      profileCompletionPercentage: newCompletion,
      reputationScore: newReputation,
    });

    setNewSkillName('');
    setShowAddSkillModal(false);
  };

  const handleAddPortfolio = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPortfolio.title || !newPortfolio.description) return;

    const item: PortfolioItem = {
      id: `port-${Date.now()}`,
      title: newPortfolio.title,
      category: newPortfolio.category || 'General Project',
      description: newPortfolio.description,
      link: newPortfolio.link,
      date: 'Baru saja',
      imageUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&q=80',
    };

    const newCompletion = Math.min(100, profile.profileCompletionPercentage + 5);
    const newReputation = Math.min(100, profile.reputationScore + 3);

    onUpdateProfile({
      ...profile,
      portfolio: [item, ...profile.portfolio],
      profileCompletionPercentage: newCompletion,
      reputationScore: newReputation,
    });

    setShowAddPortfolioModal(false);
    setNewPortfolio({ title: '', category: 'Web Development', description: '', link: '' });
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Profile Header Hero Card */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-xs relative overflow-hidden">
        {/* Subtle decorative background banner */}
        <div className="h-32 -mx-6 -mt-6 sm:-mx-8 sm:-mt-8 bg-gradient-to-r from-[#0B1E36] via-[#13335A] to-[#059669] relative">
          <div className="absolute top-4 right-4 flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-bold border border-white/30">
              Profil Terverifikasi InternMatch
            </span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-5 -mt-16 sm:-mt-12 relative z-10">
          <div className="flex flex-col sm:flex-row items-start sm:items-end gap-4">
            <div className="relative">
              <img
                src={profile.avatar}
                alt={profile.fullName}
                className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl object-cover border-4 border-white shadow-md ring-2 ring-emerald-500/30"
              />
              <span className="absolute -bottom-1 -right-1 w-6 h-6 bg-[#059669] rounded-full border-2 border-white flex items-center justify-center text-white" title="Talenta Aktif">
                <CheckCircle2 className="w-4 h-4" />
              </span>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0B1E36]">
                  {profile.fullName}
                </h1>
                <span title="Akun Terverifikasi Sekolah & Industri" className="inline-flex items-center">
                  <BadgeCheck className="w-6 h-6 text-[#059669]" />
                </span>
              </div>
              <p className="text-xs sm:text-sm font-semibold text-slate-700 mt-0.5">
                {profile.tagline}
              </p>
              <div className="flex flex-wrap items-center gap-3 mt-2 text-xs text-slate-500">
                <span className="flex items-center gap-1 text-slate-700 font-medium">
                  <GraduationCap className="w-4 h-4 text-[#059669]" />
                  {profile.education.school} ({profile.education.major})
                </span>
                <span>•</span>
                <span className="flex items-center gap-1 text-slate-700">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  {profile.location}
                </span>
                <span>•</span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-[#059669] font-bold text-[11px] border border-emerald-200/60">
                  {profile.careerPreferences.availability}
                </span>
              </div>
            </div>
          </div>

          {/* Quick Action / Reputation Score Pill */}
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="bg-[#ECFDF5] border border-[#10B981]/40 rounded-2xl p-3 sm:px-4 text-center flex-1 sm:flex-initial">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#059669] block">
                Skor Reputasi Vokasi
              </span>
              <div className="text-2xl font-black text-[#047857] flex items-center justify-center gap-1">
                <Star className="w-5 h-5 fill-current text-amber-500" />
                <span>{profile.reputationScore}</span>
                <span className="text-xs font-normal text-slate-500">/100</span>
              </div>
            </div>

            <button
              onClick={() => setShowAddPortfolioModal(true)}
              className="px-4 py-3 rounded-2xl bg-[#059669] hover:bg-[#047857] text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>Tambah Karya</span>
            </button>
          </div>
        </div>

        {/* Profile Completion Bar (PRD Section 7 & 8) */}
        <div className="mt-6 pt-5 border-t border-slate-100 bg-slate-50/70 p-4 rounded-2xl border border-slate-200/60">
          <div className="flex items-center justify-between text-xs mb-1.5">
            <div className="flex items-center gap-2">
              <span className="font-bold text-slate-800">Tingkat Kelengkapan Profil Anda:</span>
              <span className="font-extrabold text-[#059669] bg-white px-2 py-0.5 rounded-md border border-emerald-200">
                {profile.profileCompletionPercentage}% Lengkap
              </span>
            </div>
            {profile.profileCompletionPercentage < 100 && (
              <span className="text-[11px] text-slate-500 hidden sm:inline">
                Lengkapi ke 100% untuk prioritas rekomendasi ke perusahaan
              </span>
            )}
          </div>

          <div className="w-full h-2.5 bg-slate-200 rounded-full overflow-hidden">
            <div
              style={{ width: `${profile.profileCompletionPercentage}%` }}
              className="h-full bg-gradient-to-r from-[#059669] to-[#10B981] rounded-full transition-all duration-500"
            />
          </div>

          {profile.profileCompletionPercentage < 100 && (
            <div className="mt-2.5 flex flex-wrap items-center gap-2 text-xs">
              <span className="text-slate-500">Saran cepat:</span>
              <button
                onClick={() => setShowAddSkillModal(true)}
                className="text-[#059669] hover:underline font-bold bg-white px-2.5 py-1 rounded-lg border border-slate-200 text-[11px]"
              >
                + Tambah Keahlian Baru (+3%)
              </button>
              <button
                onClick={() => setShowAddPortfolioModal(true)}
                className="text-[#059669] hover:underline font-bold bg-white px-2.5 py-1 rounded-lg border border-slate-200 text-[11px]"
              >
                + Unggah Portofolio Proyek (+5%)
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Tabs navigation */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-1 overflow-x-auto">
        {[
          { id: 'overview', label: 'Ringkasan & Keahlian' },
          { id: 'reputation', label: 'Reputasi & Prestasi Terverifikasi' },
          { id: 'portfolio', label: 'Portofolio Karya' },
          { id: 'feedback', label: 'Ulasan Pemberi Kerja' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap ${
              activeTab === tab.id
                ? 'bg-[#0B1E36] text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab 1: Overview */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column: About & Skills */}
          <div className="lg:col-span-2 space-y-6">
            {/* About Me */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs">
              <h3 className="font-extrabold text-base text-[#0B1E36] mb-3">Tentang Saya</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed whitespace-pre-line">
                {profile.about}
              </p>
            </div>

            {/* Skills & Competencies */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-extrabold text-base text-[#0B1E36]">Keahlian & Kompetensi Vokasi</h3>
                  <p className="text-xs text-slate-500">Keterampilan teknis yang diverifikasi melalui proyek dan sertifikasi</p>
                </div>
                <button
                  onClick={() => setShowAddSkillModal(true)}
                  className="px-3 py-1.5 rounded-xl border border-emerald-500/40 text-[#059669] hover:bg-emerald-50 text-xs font-bold flex items-center gap-1 transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Tambah</span>
                </button>
              </div>

              <div className="flex flex-wrap gap-2">
                {profile.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-800 flex items-center gap-1.5 hover:border-emerald-400 hover:bg-emerald-50/50 transition-colors"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#059669]" />
                    <span>{skill}</span>
                  </span>
                ))}
              </div>
            </div>

            {/* Work & Internship Experience */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs space-y-4">
              <h3 className="font-extrabold text-base text-[#0B1E36]">Pengalaman Magang & Proyek Kerja</h3>
              <div className="space-y-4 divide-y divide-slate-100">
                {profile.experience.map((exp) => (
                  <div key={exp.id} className="pt-4 first:pt-0">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-bold text-sm text-[#0B1E36]">{exp.title}</h4>
                        <div className="text-xs font-semibold text-[#059669] mt-0.5">{exp.company}</div>
                      </div>
                      <span className="text-[11px] font-medium text-slate-400">
                        {exp.startDate} - {exp.endDate || 'Sekarang'}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                      {exp.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Preferences & Career Classes */}
          <div className="space-y-6">
            {/* Career Preferences */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs space-y-3 text-xs">
              <h3 className="font-extrabold text-base text-[#0B1E36]">Preferensi Karier</h3>

              <div>
                <span className="text-slate-400 block font-semibold mb-1">Tipe Peluang yang Diminati:</span>
                <div className="flex flex-wrap gap-1.5">
                  {profile.careerPreferences.opportunityTypes.map((t) => (
                    <span key={t} className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-medium">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <span className="text-slate-400 block font-semibold mb-1">Sistem Kerja:</span>
                <span className="font-bold text-slate-800">
                  {profile.careerPreferences.workArrangement.join(', ')}
                </span>
              </div>

              <div>
                <span className="text-slate-400 block font-semibold mb-1">Ekspektasi Uang Saku:</span>
                <span className="font-bold text-[#059669]">
                  {profile.careerPreferences.expectedStipend || 'Sesuai Standar Industri'}
                </span>
              </div>
            </div>

            {/* Career Classes Completed */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs">
              <div className="flex items-center gap-2 mb-3">
                <Award className="w-5 h-5 text-[#059669]" />
                <h3 className="font-extrabold text-base text-[#0B1E36]">Sertifikat Kelas Karier</h3>
              </div>
              <p className="text-xs text-slate-500 mb-3">
                Sertifikasi internal InternMatch dari para praktisi industri:
              </p>
              <div className="space-y-2">
                {profile.careerClassAchievements.map((cls, idx) => (
                  <div key={idx} className="p-3 bg-emerald-50/60 rounded-xl border border-emerald-200/60 text-xs font-bold text-[#065F46] flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#059669] shrink-0" />
                    <span>{cls}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Reputation & Verified Achievements */}
      {activeTab === 'reputation' && (
        <div className="space-y-6">
          {/* Reputation Philosophy Callout (PRD Section 9) */}
          <div className="bg-gradient-to-r from-[#0B1E36] to-[#047857] text-white p-6 rounded-3xl shadow-sm">
            <div className="max-w-2xl">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-300">
                Filosofi Reputasi InternMatch
              </span>
              <h2 className="text-xl sm:text-2xl font-extrabold mt-1">
                EXPERIENCE → PROOF → REPUTATION → BETTER OPPORTUNITY
              </h2>
              <p className="text-xs sm:text-sm text-slate-200 mt-2 leading-relaxed">
                Reputasi di InternMatch bukan berasal dari follower atau popularitas medsos, melainkan dari bukti keahlian, sertifikasi kompetensi resmi (BNSP/LKS), penyelesaian magang, dan ulasan langsung dari mentor industri.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Verified Certifications */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs">
              <h3 className="font-extrabold text-base text-[#0B1E36] mb-4 flex items-center gap-2">
                <BadgeCheck className="w-5 h-5 text-[#059669]" />
                <span>Sertifikasi Kompetensi Resmi</span>
              </h3>

              <div className="space-y-3">
                {profile.certifications.map((cert) => (
                  <div key={cert.id} className="p-3.5 rounded-2xl border border-slate-200 bg-slate-50/50 hover:bg-slate-50 transition-colors">
                    <div className="flex items-start justify-between">
                      <h4 className="font-bold text-xs sm:text-sm text-[#0B1E36]">{cert.title}</h4>
                      {cert.verified && (
                        <span className="text-[10px] font-bold text-[#059669] bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 shrink-0 ml-2">
                          Terverifikasi BNSP
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-slate-500 mt-1 font-medium">{cert.issuer}</div>
                    {cert.credentialId && (
                      <div className="text-[10px] font-mono text-slate-400 mt-1">
                        No. Sertifikat: {cert.credentialId}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Verified Achievements (LKS / Competitions) */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs">
              <h3 className="font-extrabold text-base text-[#0B1E36] mb-4 flex items-center gap-2">
                <Award className="w-5 h-5 text-amber-500" />
                <span>Prestasi & Lomba Kompetensi Siswa (LKS)</span>
              </h3>

              <div className="space-y-3">
                {profile.verifiedAchievements.map((ach) => (
                  <div key={ach.id} className="p-3.5 rounded-2xl border border-amber-200/70 bg-amber-50/30">
                    <div className="flex items-start justify-between">
                      <h4 className="font-bold text-xs sm:text-sm text-[#0B1E36]">{ach.title}</h4>
                      <span className="text-[10px] font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded-full shrink-0 ml-2">
                        {ach.rank}
                      </span>
                    </div>
                    <div className="text-xs text-slate-600 mt-1">{ach.event} ({ach.year})</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Portfolio */}
      {activeTab === 'portfolio' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-extrabold text-xl text-[#0B1E36]">Portofolio & Bukti Karya</h3>
              <p className="text-xs text-slate-500">Tunjukkan hasil nyata proyek sekolah, aplikasi, atau desain yang telah Anda buat</p>
            </div>
            <button
              onClick={() => setShowAddPortfolioModal(true)}
              className="px-4 py-2.5 rounded-2xl bg-[#059669] hover:bg-[#047857] text-white text-xs font-bold flex items-center gap-2 shadow-xs transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Tambah Proyek Portofolio</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {profile.portfolio.map((item) => (
              <div key={item.id} className="bg-white rounded-3xl border border-slate-200/90 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between">
                {item.imageUrl && (
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-44 object-cover border-b border-slate-100"
                  />
                )}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#059669] bg-emerald-50 px-2 py-0.5 rounded">
                      {item.category}
                    </span>
                    <h4 className="font-extrabold text-base text-[#0B1E36] mt-2 line-clamp-1">{item.title}</h4>
                    <p className="text-xs text-slate-600 mt-2 line-clamp-3 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="text-slate-400 text-[11px]">{item.date}</span>
                    {item.link && (
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noreferrer"
                        className="text-[#059669] font-bold hover:underline flex items-center gap-1"
                      >
                        <span>Lihat Demo</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 4: Employer Feedback */}
      {activeTab === 'feedback' && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-extrabold text-lg text-[#0B1E36]">Ulasan & Validasi dari Pemberi Kerja</h3>
                <p className="text-xs text-slate-500">Testimoni otentik setelah menyelesaikan penugasan magang atau pekerjaan harian</p>
              </div>
              <div className="flex items-center gap-1.5 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200 text-xs font-bold text-[#059669]">
                <Star className="w-4 h-4 fill-current text-amber-500" />
                <span>Rata-rata 4.9 / 5.0</span>
              </div>
            </div>

            <div className="space-y-4">
              {profile.employerFeedback.map((fb) => (
                <div key={fb.id} className="p-5 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-center gap-3">
                      {fb.companyLogo ? (
                        <img src={fb.companyLogo} alt={fb.companyName} className="w-10 h-10 rounded-xl object-cover border" />
                      ) : (
                        <div className="w-10 h-10 rounded-xl bg-slate-200 flex items-center justify-center font-bold text-slate-700">
                          {fb.companyName[0]}
                        </div>
                      )}
                      <div>
                        <h4 className="font-bold text-sm text-[#0B1E36]">{fb.companyName}</h4>
                        <span className="text-xs text-slate-500">{fb.opportunityTitle}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1 text-amber-500">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-current" />
                      ))}
                      <span className="font-extrabold text-xs text-slate-800 ml-1">{fb.rating}</span>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-700 italic bg-white p-3.5 rounded-xl border border-slate-200/80 leading-relaxed">
                    "{fb.comment}"
                  </p>

                  <div className="flex flex-wrap items-center gap-1.5 pt-1">
                    <span className="text-[11px] text-slate-400 mr-1">Lencana Khusus:</span>
                    {fb.badges.map((b) => (
                      <span key={b} className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-[#065F46]">
                        ✓ {b}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Modal: Add Skill */}
      {showAddSkillModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl border border-slate-200 animate-in fade-in">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-bold text-base text-[#0B1E36]">Tambah Keahlian Baru</h4>
              <button onClick={() => setShowAddSkillModal(false)} className="text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleAddSkill} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Nama Keahlian / Tool (Contoh: Next.js, Docker, Adobe Premiere, Mikrotik)
                </label>
                <input
                  type="text"
                  value={newSkillName}
                  onChange={(e) => setNewSkillName(e.target.value)}
                  placeholder="Masukkan keahlian..."
                  className="w-full text-xs p-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#059669]"
                  autoFocus
                />
              </div>

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddSkillModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl text-xs font-bold text-white bg-[#059669] hover:bg-[#047857]"
                >
                  Simpan Keahlian (+3% Skor)
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Add Portfolio */}
      {showAddPortfolioModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-lg w-full shadow-2xl border border-slate-200 animate-in fade-in">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-bold text-base text-[#0B1E36]">Unggah Bukti Karya / Portofolio</h4>
              <button onClick={() => setShowAddPortfolioModal(false)} className="text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleAddPortfolio} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Judul Proyek</label>
                <input
                  type="text"
                  required
                  value={newPortfolio.title}
                  onChange={(e) => setNewPortfolio({ ...newPortfolio, title: e.target.value })}
                  placeholder="Contoh: Aplikasi Kasir Cafe Vokasi"
                  className="w-full text-xs p-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#059669]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Kategori</label>
                <input
                  type="text"
                  value={newPortfolio.category}
                  onChange={(e) => setNewPortfolio({ ...newPortfolio, category: e.target.value })}
                  placeholder="Web Development / Graphic Design / Tata Boga"
                  className="w-full text-xs p-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#059669]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Deskripsi Singkat Karya</label>
                <textarea
                  required
                  rows={3}
                  value={newPortfolio.description}
                  onChange={(e) => setNewPortfolio({ ...newPortfolio, description: e.target.value })}
                  placeholder="Jelaskan peran Anda, teknologi yang digunakan, dan hasil akhirnya..."
                  className="w-full text-xs p-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#059669]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Tautan Demo / GitHub / Behance (Opsional)</label>
                <input
                  type="url"
                  value={newPortfolio.link}
                  onChange={(e) => setNewPortfolio({ ...newPortfolio, link: e.target.value })}
                  placeholder="https://..."
                  className="w-full text-xs p-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#059669]"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddPortfolioModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl text-xs font-bold text-white bg-[#059669] hover:bg-[#047857]"
                >
                  Simpan Karya (+5% Skor)
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
