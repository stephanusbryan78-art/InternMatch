import React, { useState } from 'react';
import {
  CompanyProfile,
  Opportunity,
  Application,
  TalentProfile,
  ApplicationStatus,
  OpportunityType,
  WorkArrangement,
} from '../../types';
import {
  Building2,
  Users,
  Briefcase,
  TrendingUp,
  Plus,
  ShieldCheck,
  CheckCircle2,
  Clock,
  ExternalLink,
  Star,
  Award,
  Filter,
  X,
  Send,
} from 'lucide-react';

interface CompanyDashboardProps {
  companyProfile: CompanyProfile;
  opportunities: Opportunity[];
  applications: Application[];
  talentProfile: TalentProfile;
  onAddNewOpportunity: (newOpp: Partial<Opportunity>) => void;
  onUpdateApplicationStatus: (appId: string, status: ApplicationStatus) => void;
  onAddEmployerFeedback: (feedback: {
    talentId: string;
    opportunityTitle: string;
    rating: number;
    comment: string;
    badges: string[];
  }) => void;
  onNavigateTab: (tab: string) => void;
}

export const CompanyDashboard: React.FC<CompanyDashboardProps> = ({
  companyProfile,
  opportunities,
  applications,
  talentProfile,
  onAddNewOpportunity,
  onUpdateApplicationStatus,
  onAddEmployerFeedback,
  onNavigateTab,
}) => {
  const [showPostModal, setShowPostModal] = useState(false);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [selectedAppForFeedback, setSelectedAppForFeedback] = useState<Application | null>(null);

  // New Opportunity Form
  const [newTitle, setNewTitle] = useState('');
  const [newType, setNewType] = useState<OpportunityType>('Internship');
  const [newIndustry, setNewIndustry] = useState('Teknologi Informasi');
  const [newCompensation, setNewCompensation] = useState('Rp 3.000.000 / bln');
  const [newLocation, setNewLocation] = useState('Jakarta Selatan');
  const [newArrangement, setNewArrangement] = useState<WorkArrangement>('Hybrid');
  const [newDuration, setNewDuration] = useState('3 - 6 Bulan');
  const [newSkillsString, setNewSkillsString] = useState('React, Tailwind CSS, TypeScript');
  const [newDescription, setNewDescription] = useState('');
  const [newAgeSafe, setNewAgeSafe] = useState(true);

  // Feedback Form
  const [feedbackRating, setFeedbackRating] = useState(5);
  const [feedbackComment, setFeedbackComment] = useState(
    'Rizky menunjukkan dedikasi dan keterampilan teknis yang luar biasa selama periode magang. Kode terstruktur rapi dan siap pakai dalam produksi.'
  );
  const [selectedBadges, setSelectedBadges] = useState<string[]>(['Disiplin Tinggi', 'Cepat Belajar', 'Kolaborasi Tim']);

  const availableBadges = [
    'Disiplin Tinggi',
    'Cepat Belajar',
    'Kolaborasi Tim',
    'Kode Rapi',
    'Tepat Waktu',
    'Problem Solver',
    'Keramahan 5-Bintang',
  ];

  const handlePostOpportunity = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newDescription.trim()) return;

    const skills = newSkillsString.split(',').map((s) => s.trim()).filter(Boolean);

    onAddNewOpportunity({
      title: newTitle,
      type: newType,
      industry: newIndustry,
      compensation: newCompensation,
      location: newLocation,
      workArrangement: newArrangement,
      duration: newDuration,
      requiredSkills: skills,
      description: newDescription,
      responsibilities: [
        'Membantu implementasi modul fitur web sesuai panduan lead engineer.',
        'Melakukan uji coba mandiri dan dokumentasi alur kerja.',
      ],
      requirements: [
        'Lulusan atau siswa SMK jurusan relevan.',
        'Memiliki dasar keahlian yang tercantum pada portofolio.',
      ],
      ageSafeBadge: newAgeSafe,
      companyId: companyProfile.id,
      companyName: companyProfile.name,
      companyLogo: companyProfile.logo,
      companyVerified: true,
      deadline: '30 November 2026',
    });

    setShowPostModal(false);
    setNewTitle('');
    setNewDescription('');
  };

  const handleToggleBadge = (badge: string) => {
    if (selectedBadges.includes(badge)) {
      setSelectedBadges(selectedBadges.filter((b) => b !== badge));
    } else {
      setSelectedBadges([...selectedBadges, badge]);
    }
  };

  const handleSaveFeedback = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedAppForFeedback) return;

    onAddEmployerFeedback({
      talentId: selectedAppForFeedback.talentId,
      opportunityTitle: selectedAppForFeedback.opportunity.title,
      rating: feedbackRating,
      comment: feedbackComment,
      badges: selectedBadges,
    });

    onUpdateApplicationStatus(selectedAppForFeedback.id, 'Completed');
    setShowFeedbackModal(false);
    setSelectedAppForFeedback(null);
  };

  const activeOppCount = opportunities.filter((o) => o.status === 'Open').length;
  const underReviewCount = applications.filter((a) => a.status === 'Under Review').length;
  const interviewCount = applications.filter((a) => a.status === 'Interview').length;
  const placedCount = applications.filter((a) => a.status === 'Accepted' || a.status === 'Completed').length;

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Company Header Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-5">
        <div className="flex items-center gap-4">
          <img
            src={companyProfile.logo}
            alt={companyProfile.name}
            className="w-16 h-16 rounded-2xl object-cover border border-slate-200 shadow-xs"
          />
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-extrabold text-[#0B1E36]">
                {companyProfile.name}
              </h1>
              {companyProfile.verified && (
                <span className="text-xs font-bold text-[#059669] bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Mitra Industri Resmi
                </span>
              )}
            </div>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              {companyProfile.industry} • {companyProfile.location}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigateTab('company-find-talent')}
            className="px-4 py-2.5 rounded-2xl border border-slate-300 hover:bg-slate-50 text-xs font-bold text-[#0B1E36] transition-colors"
          >
            Cari Talent Vokasi
          </button>
          <button
            onClick={() => setShowPostModal(true)}
            className="px-5 py-2.5 rounded-2xl bg-[#059669] hover:bg-[#047857] text-white text-xs font-bold flex items-center gap-2 shadow-xs transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Pasang Peluang Baru</span>
          </button>
        </div>
      </div>

      {/* Overview KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-xs">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
            Lowongan Aktif
          </span>
          <div className="text-2xl sm:text-3xl font-black text-[#0B1E36] mt-1">
            {activeOppCount}
          </div>
          <span className="text-[11px] text-[#059669] font-medium mt-1 block">
            Dipublikasikan di marketplace
          </span>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-xs">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
            Pelamar Baru
          </span>
          <div className="text-2xl sm:text-3xl font-black text-blue-600 mt-1">
            {applications.length}
          </div>
          <span className="text-[11px] text-slate-500 mt-1 block">
            {underReviewCount} butuh peninjauan
          </span>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-xs">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
            Tahap Interview
          </span>
          <div className="text-2xl sm:text-3xl font-black text-purple-600 mt-1">
            {interviewCount}
          </div>
          <span className="text-[11px] text-slate-500 mt-1 block">
            Jadwal temu teknis & HR
          </span>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-xs">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
            Penempatan Berhasil
          </span>
          <div className="text-2xl sm:text-3xl font-black text-[#059669] mt-1">
            {placedCount}
          </div>
          <span className="text-[11px] text-emerald-700 font-medium mt-1 block">
            Siklus WORK → PROVE selesai
          </span>
        </div>
      </div>

      {/* Applicant Management Table / Cards */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="font-extrabold text-lg text-[#0B1E36]">
              Daftar Pelamar & Evaluasi Kandidat
            </h3>
            <p className="text-xs text-slate-500">
              Evaluasi kandidat berdasarkan keahlian terverifikasi dan berikan umpan balik resmi (employer feedback)
            </p>
          </div>
        </div>

        <div className="divide-y divide-slate-100">
          {applications.map((app) => (
            <div key={app.id} className="py-4 first:pt-0 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <img
                  src={talentProfile.avatar}
                  alt={talentProfile.fullName}
                  className="w-12 h-12 rounded-2xl object-cover border border-slate-200"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold text-sm text-[#0B1E36]">{talentProfile.fullName}</h4>
                    <span className="text-xs font-bold text-[#059669] bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                      ★ Reputasi: {talentProfile.reputationScore}
                    </span>
                  </div>
                  <div className="text-xs text-slate-500 mt-0.5">
                    Melamar posisi: <strong className="text-slate-700">{app.opportunity.title}</strong>
                  </div>
                  <div className="text-[11px] text-slate-400 mt-0.5">
                    {talentProfile.education.school} • {talentProfile.education.major}
                  </div>
                </div>
              </div>

              {/* Status Selector & Feedback Trigger */}
              <div className="flex flex-wrap items-center gap-2 self-start sm:self-auto">
                <div className="flex items-center gap-1.5">
                  <span className="text-xs text-slate-500 font-medium">Status:</span>
                  <select
                    value={app.status}
                    onChange={(e) => onUpdateApplicationStatus(app.id, e.target.value as ApplicationStatus)}
                    className="p-2 rounded-xl bg-slate-50 border border-slate-300 text-xs font-bold text-slate-700 focus:outline-none"
                  >
                    <option value="Applied">Terkirim (Applied)</option>
                    <option value="Under Review">Sedang Ditinjau</option>
                    <option value="Interview">Jadwalkan Wawancara</option>
                    <option value="Accepted">Terima Kandidat</option>
                    <option value="Completed">Selesai Penugasan</option>
                    <option value="Rejected">Tolak</option>
                  </select>
                </div>

                {/* Provide Employer Feedback Button (The Core Loop Section 45) */}
                <button
                  onClick={() => {
                    setSelectedAppForFeedback(app);
                    setShowFeedbackModal(true);
                  }}
                  className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1 shadow-xs transition-colors"
                  title="Berikan rating dan ulasan resmi untuk menaikkan reputasi kandidat"
                >
                  <Star className="w-3.5 h-3.5 fill-current text-amber-300" />
                  <span>Beri Ulasan Perusahaan</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Active Posted Opportunities */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xs space-y-4">
        <h3 className="font-extrabold text-lg text-[#0B1E36]">
          Lowongan yang Sedang Ditayangkan ({opportunities.length})
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {opportunities.map((opp) => (
            <div key={opp.id} className="p-4 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-slate-200 text-slate-700">
                  {opp.type}
                </span>
                <span className="text-xs font-extrabold text-[#059669]">
                  {opp.totalApplicants} Pelamar Masuk
                </span>
              </div>
              <h4 className="font-bold text-sm text-[#0B1E36] line-clamp-1">{opp.title}</h4>
              <p className="text-xs text-slate-500 line-clamp-2">{opp.description}</p>
              <div className="pt-2 flex items-center justify-between text-[11px] text-slate-400">
                <span>{opp.location} ({opp.workArrangement})</span>
                <span className="font-semibold text-slate-700">{opp.compensation}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal: Post New Opportunity */}
      {showPostModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-xl w-full shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto animate-in fade-in">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-extrabold text-lg text-[#0B1E36]">Pasang Peluang Kerja / Magang Baru</h3>
              <button onClick={() => setShowPostModal(false)} className="text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handlePostOpportunity} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Judul Posisi</label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="Contoh: Junior Frontend Web Developer Intern"
                  className="w-full p-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-1 focus:ring-[#059669]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Tipe Peluang</label>
                  <select
                    value={newType}
                    onChange={(e) => setNewType(e.target.value as OpportunityType)}
                    className="w-full p-2.5 rounded-xl border border-slate-300"
                  >
                    <option value="Internship">Internship (Magang)</option>
                    <option value="Daily Work">Daily Work (Harian)</option>
                    <option value="Part-time">Part-time</option>
                    <option value="Freelance">Freelance</option>
                    <option value="Entry-level">Entry-level</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Sistem Kerja</label>
                  <select
                    value={newArrangement}
                    onChange={(e) => setNewArrangement(e.target.value as WorkArrangement)}
                    className="w-full p-2.5 rounded-xl border border-slate-300"
                  >
                    <option value="Hybrid">Hybrid</option>
                    <option value="Onsite">Onsite</option>
                    <option value="Remote">Remote</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Kompensasi / Uang Saku</label>
                  <input
                    type="text"
                    value={newCompensation}
                    onChange={(e) => setNewCompensation(e.target.value)}
                    placeholder="Rp 2.800.000 / bln atau Rp 200.000 / hari"
                    className="w-full p-2.5 rounded-xl border border-slate-300"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Lokasi Kerja</label>
                  <input
                    type="text"
                    value={newLocation}
                    onChange={(e) => setNewLocation(e.target.value)}
                    placeholder="Jakarta Selatan"
                    className="w-full p-2.5 rounded-xl border border-slate-300"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Keahlian Dibutuhkan (Pisahkan dengan koma)</label>
                <input
                  type="text"
                  value={newSkillsString}
                  onChange={(e) => setNewSkillsString(e.target.value)}
                  placeholder="React, Tailwind CSS, TypeScript, Git"
                  className="w-full p-2.5 rounded-xl border border-slate-300"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Deskripsi Singkat Tanggung Jawab</label>
                <textarea
                  rows={3}
                  required
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  placeholder="Jelaskan peran pekerjaan dan mentor yang akan mendampingi..."
                  className="w-full p-2.5 rounded-xl border border-slate-300"
                />
              </div>

              <div className="pt-1">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={newAgeSafe}
                    onChange={(e) => setNewAgeSafe(e.target.checked)}
                    className="accent-[#059669]"
                  />
                  <span className="font-semibold text-slate-700">
                    Peluang ini ramah dan aman untuk siswa SMK di bawah 18 tahun (PRD Safeguard)
                  </span>
                </label>
              </div>

              <div className="flex justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setShowPostModal(false)}
                  className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#059669] text-white font-bold hover:bg-[#047857]"
                >
                  Tayangkan Peluang
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Give Employer Feedback (PRD Section 45 & 9) */}
      {showFeedbackModal && selectedAppForFeedback && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl border border-slate-200 animate-in fade-in">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-extrabold text-lg text-[#0B1E36]">Beri Ulasan & Validasi Kinerja</h3>
                <p className="text-xs text-slate-500">
                  Ulasan ini akan memvalidasi reputasi profesional {talentProfile.fullName}
                </p>
              </div>
              <button onClick={() => setShowFeedbackModal(false)} className="text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveFeedback} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Rating Evaluasi Kinerja</label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      type="button"
                      key={star}
                      onClick={() => setFeedbackRating(star)}
                      className="p-1 hover:scale-110 transition-transform"
                    >
                      <Star
                        className={`w-7 h-7 ${
                          star <= feedbackRating
                            ? 'fill-amber-400 text-amber-400'
                            : 'text-slate-300'
                        }`}
                      />
                    </button>
                  ))}
                  <span className="font-bold text-sm text-slate-800 ml-2">
                    {feedbackRating}.0 / 5.0
                  </span>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Ulasan Resmi Pemberi Kerja (Tampil di Profil Publik)
                </label>
                <textarea
                  rows={4}
                  required
                  value={feedbackComment}
                  onChange={(e) => setFeedbackComment(e.target.value)}
                  className="w-full p-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-1 focus:ring-[#059669]"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Pilih Lencana Karakter / Kinerja:
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {availableBadges.map((badge) => {
                    const isSelected = selectedBadges.includes(badge);
                    return (
                      <button
                        type="button"
                        key={badge}
                        onClick={() => handleToggleBadge(badge)}
                        className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${
                          isSelected
                            ? 'bg-[#059669] text-white'
                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                        }`}
                      >
                        {isSelected ? '✓ ' : '+ '}
                        {badge}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setShowFeedbackModal(false)}
                  className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-[#059669] text-white font-bold hover:bg-[#047857] flex items-center gap-1.5"
                >
                  <Award className="w-4 h-4" />
                  <span>Terbitkan Ulasan & Naikkan Reputasi (+8 Poin)</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
