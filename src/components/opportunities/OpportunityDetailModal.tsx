import React, { useState } from 'react';
import { Opportunity, TalentProfile } from '../../types';
import { calculateMatchScore } from '../../services/matchingService';
import {
  X,
  ShieldCheck,
  MapPin,
  Clock,
  Banknote,
  CheckCircle2,
  Bookmark,
  Share2,
  Calendar,
  Sparkles,
  AlertCircle,
  Briefcase,
  GraduationCap,
  ArrowRight,
  Send,
} from 'lucide-react';

interface OpportunityDetailModalProps {
  opportunity: Opportunity | null;
  talentProfile: TalentProfile;
  onClose: () => void;
  onApply: (opportunity: Opportunity, note: string) => void;
  isApplied?: boolean;
  isSaved?: boolean;
  onToggleSave?: (opportunityId: string) => void;
}

export const OpportunityDetailModal: React.FC<OpportunityDetailModalProps> = ({
  opportunity,
  talentProfile,
  onClose,
  onApply,
  isApplied = false,
  isSaved = false,
  onToggleSave,
}) => {
  const [showApplyForm, setShowApplyForm] = useState(false);
  const [applicationNote, setApplicationNote] = useState(
    `Halo tim rekrutmen ${opportunity?.companyName || ''},\n\nSaya ${talentProfile.fullName}, lulusan ${talentProfile.education.school} jurusan ${talentProfile.education.major}. Saya sangat tertarik melamar untuk posisi ${opportunity?.title} ini karena keahlian saya di bidang ${talentProfile.skills.slice(0, 3).join(', ')} sangat relevan dengan kebutuhan tim Anda.`
  );
  const [appliedSuccess, setAppliedSuccess] = useState(false);

  if (!opportunity) return null;

  const match = calculateMatchScore(talentProfile, opportunity);

  const handleConfirmApply = (e: React.FormEvent) => {
    e.preventDefault();
    onApply(opportunity, applicationNote);
    setAppliedSuccess(true);
    setTimeout(() => {
      setShowApplyForm(false);
      setAppliedSuccess(false);
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-3xl rounded-3xl shadow-2xl border border-slate-200 overflow-hidden max-h-[92vh] flex flex-col relative">
        {/* Sticky Header Bar */}
        <div className="px-6 py-4 border-b border-slate-200/80 flex items-center justify-between bg-white/95 backdrop-blur sticky top-0 z-20">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700">
              {opportunity.type}
            </span>
            {opportunity.ageSafeBadge && (
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-50 text-[#059669] border border-emerald-200/60">
                Ramah Siswa SMK &lt;18 Thn
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            {onToggleSave && (
              <button
                onClick={() => onToggleSave(opportunity.id)}
                className={`p-2 rounded-xl transition-colors ${
                  isSaved ? 'text-[#059669] bg-emerald-50' : 'text-slate-400 hover:text-slate-600 hover:bg-slate-100'
                }`}
                title={isSaved ? 'Hapus Simpanan' : 'Simpan Peluang'}
              >
                <Bookmark className={`w-5 h-5 ${isSaved ? 'fill-current' : ''}`} />
              </button>
            )}
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Body Content */}
        <div className="overflow-y-auto p-6 space-y-6">
          {/* Company & Role Header */}
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
            <div className="flex items-start gap-4">
              <img
                src={opportunity.companyLogo}
                alt={opportunity.companyName}
                className="w-16 h-16 rounded-2xl object-cover border border-slate-200 shadow-sm shrink-0"
              />
              <div>
                <h1 className="text-xl sm:text-2xl font-extrabold text-[#0B1E36] leading-tight">
                  {opportunity.title}
                </h1>
                <div className="flex flex-wrap items-center gap-2 mt-1.5 text-sm">
                  <span className="font-bold text-slate-800">{opportunity.companyName}</span>
                  {opportunity.companyVerified && (
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#059669] bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200/60">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      Perusahaan Terverifikasi
                    </span>
                  )}
                  <span className="text-slate-400">•</span>
                  <span className="text-slate-600">{opportunity.industry}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Key Opportunity Highlights Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 bg-slate-50/80 rounded-2xl border border-slate-200/80 text-xs">
            <div>
              <span className="text-slate-500 block mb-0.5">Kompensasi / Uang Saku</span>
              <div className="font-extrabold text-[#0B1E36] flex items-center gap-1.5 text-sm">
                <Banknote className="w-4 h-4 text-[#059669]" />
                <span>{opportunity.compensation}</span>
              </div>
            </div>

            <div>
              <span className="text-slate-500 block mb-0.5">Lokasi & Sistem Kerja</span>
              <div className="font-bold text-slate-800 flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-slate-400" />
                <span className="truncate">{opportunity.location} ({opportunity.workArrangement})</span>
              </div>
            </div>

            <div>
              <span className="text-slate-500 block mb-0.5">Durasi Penugasan</span>
              <div className="font-bold text-slate-800 flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-slate-400" />
                <span>{opportunity.duration}</span>
              </div>
            </div>

            <div>
              <span className="text-slate-500 block mb-0.5">Batas Pendaftaran</span>
              <div className="font-bold text-slate-800 flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-slate-400" />
                <span>{opportunity.deadline}</span>
              </div>
            </div>
          </div>

          {/* Section: "Why this matches you" (Transparent Rule-Based Matching System) */}
          <div className="bg-gradient-to-br from-[#ECFDF5] via-white to-[#F0FDF4] p-5 rounded-2xl border border-[#10B981]/40 shadow-xs relative overflow-hidden">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
              <div>
                <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#059669]">
                  <Sparkles className="w-4 h-4" />
                  <span>Transparansi Kecocokan Sistem InternMatch</span>
                </div>
                <h3 className="text-lg font-extrabold text-[#0B1E36] mt-0.5">
                  Mengapa Peluang Ini Cocok untuk Anda
                </h3>
              </div>

              {/* Big Match Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#059669] text-white shadow-sm font-extrabold text-sm self-start sm:self-auto">
                <Sparkles className="w-4 h-4 text-emerald-200" />
                <span>{match.overallPercentage}% Match</span>
              </div>
            </div>

            {/* Match factor breakdown progress bar */}
            <div className="space-y-1.5 mb-4">
              <div className="h-2.5 w-full bg-slate-200 rounded-full overflow-hidden flex">
                <div
                  style={{ width: `${(match.skillRelevanceScore / 40) * 40}%` }}
                  className="bg-[#059669] h-full"
                  title="Skill Relevance (40%)"
                />
                <div
                  style={{ width: `${(match.locationScore / 20) * 20}%` }}
                  className="bg-[#10B981] h-full"
                  title="Location Match (20%)"
                />
                <div
                  style={{ width: `${(match.availabilityScore / 20) * 20}%` }}
                  className="bg-[#34D399] h-full"
                  title="Availability Match (20%)"
                />
                <div
                  style={{ width: `${(match.experienceScore / 10) * 10}%` }}
                  className="bg-emerald-300 h-full"
                  title="Experience (10%)"
                />
                <div
                  style={{ width: `${(match.educationScore / 10) * 10}%` }}
                  className="bg-emerald-200 h-full"
                  title="Education (10%)"
                />
              </div>

              <div className="flex items-center justify-between text-[11px] text-slate-500 font-medium">
                <span>Skor Bobot: Keahlian (40%) • Lokasi (20%) • Ketersediaan (20%) • Pengalaman (10%) • Pendidikan (10%)</span>
                <span className="font-bold text-[#059669]">{match.overallPercentage} / 100 Poin</span>
              </div>
            </div>

            {/* Transparent match reasons list */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {match.reasons.map((reason, idx) => (
                <div key={idx} className="flex items-start gap-2 bg-white/80 p-2.5 rounded-xl border border-emerald-100">
                  <CheckCircle2 className="w-4 h-4 text-[#059669] shrink-0 mt-0.5" />
                  <span className="text-slate-700 font-medium">{reason}</span>
                </div>
              ))}
            </div>

            {/* Matched vs Unmatched Skills display */}
            <div className="mt-3 pt-3 border-t border-emerald-200/60 flex flex-wrap items-center gap-1.5 text-xs">
              <span className="text-slate-500 font-semibold mr-1">Keahlian Dibutuhkan:</span>
              {opportunity.requiredSkills.map((sk) => {
                const isMatched = match.matchedSkills.includes(sk);
                return (
                  <span
                    key={sk}
                    className={`px-2 py-0.5 rounded-md font-semibold text-[11px] flex items-center gap-1 ${
                      isMatched
                        ? 'bg-[#ECFDF5] text-[#059669] border border-[#10B981]/40'
                        : 'bg-slate-100 text-slate-500'
                    }`}
                  >
                    {isMatched ? <CheckCircle2 className="w-3 h-3 text-[#059669]" /> : '○'}
                    {sk}
                  </span>
                );
              })}
            </div>
          </div>

          {/* Description */}
          <div>
            <h4 className="font-bold text-sm text-[#0B1E36] mb-2">Tentang Posisi Ini</h4>
            <p className="text-slate-600 text-sm leading-relaxed whitespace-pre-line">
              {opportunity.description}
            </p>
          </div>

          {/* Responsibilities */}
          <div>
            <h4 className="font-bold text-sm text-[#0B1E36] mb-2">Tanggung Jawab Utama</h4>
            <ul className="space-y-2">
              {opportunity.responsibilities.map((resp, index) => (
                <li key={index} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#059669] mt-2 shrink-0" />
                  <span>{resp}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Requirements */}
          <div>
            <h4 className="font-bold text-sm text-[#0B1E36] mb-2">Persyaratan & Kualifikasi</h4>
            <ul className="space-y-2">
              {opportunity.requirements.map((req, index) => (
                <li key={index} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] mt-2 shrink-0" />
                  <span>{req}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Application Form Drawer / Popup */}
          {showApplyForm && (
            <div className="bg-slate-50 border-2 border-[#10B981] p-5 rounded-2xl animate-in fade-in duration-150">
              <h4 className="font-bold text-base text-[#0B1E36] mb-2 flex items-center gap-2">
                <Send className="w-4 h-4 text-[#059669]" />
                <span>Kirim Lamaran ke {opportunity.companyName}</span>
              </h4>
              <p className="text-xs text-slate-500 mb-3">
                Profil lengkap InternMatch Anda, portofolio terverifikasi, dan sertifikasi BNSP akan otomatis dilampirkan.
              </p>

              <form onSubmit={handleConfirmApply} className="space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Catatan Perkenalan Singkat (Cover Note):
                  </label>
                  <textarea
                    rows={4}
                    value={applicationNote}
                    onChange={(e) => setApplicationNote(e.target.value)}
                    className="w-full text-xs p-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#059669] bg-white font-sans"
                    placeholder="Tuliskan alasan ketertarikan Anda pada posisi ini..."
                  />
                </div>

                <div className="p-3 bg-white rounded-xl border border-slate-200 text-xs text-slate-600 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#059669]" />
                    <span>Lampiran: Profil & Portofolio ({talentProfile.fullName})</span>
                  </div>
                  <span className="text-[11px] text-slate-400 font-mono">Status: Terverifikasi</span>
                </div>

                <div className="flex items-center justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowApplyForm(false)}
                    className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-200 transition-colors"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl text-xs font-bold text-white bg-[#059669] hover:bg-[#047857] shadow-sm flex items-center gap-1.5 transition-colors"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Kirim Lamaran Sekarang</span>
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Success Banner */}
          {appliedSuccess && (
            <div className="bg-[#ECFDF5] border border-[#10B981] p-4 rounded-2xl flex items-center gap-3 text-xs text-[#065F46] font-bold animate-in fade-in">
              <CheckCircle2 className="w-5 h-5 text-[#059669] shrink-0" />
              <span>Lamaran Anda berhasil dikirim! Perusahaan akan meninjau profil dan portofolio Anda.</span>
            </div>
          )}
        </div>

        {/* Sticky Action Footer */}
        <div className="p-4 sm:p-5 border-t border-slate-200 bg-white/95 backdrop-blur flex flex-col sm:flex-row items-center justify-between gap-3 sticky bottom-0 z-20">
          <div className="text-xs text-slate-500 hidden sm:block">
            <span>Pemberi kerja merespons dalam rata-rata </span>
            <strong className="text-slate-800">1-2 hari kerja</strong>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            {onToggleSave && (
              <button
                type="button"
                onClick={() => onToggleSave(opportunity.id)}
                className={`w-1/3 sm:w-auto px-4 py-2.5 rounded-xl border text-xs font-bold transition-colors flex items-center justify-center gap-1.5 ${
                  isSaved
                    ? 'border-[#059669] text-[#059669] bg-emerald-50'
                    : 'border-slate-300 text-slate-700 hover:bg-slate-50'
                }`}
              >
                <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
                <span>{isSaved ? 'Tersimpan' : 'Simpan'}</span>
              </button>
            )}

            {isApplied ? (
              <button
                disabled
                className="flex-1 sm:flex-none px-6 py-2.5 rounded-xl text-xs font-bold bg-slate-100 text-slate-500 cursor-not-allowed flex items-center justify-center gap-2"
              >
                <CheckCircle2 className="w-4 h-4 text-[#059669]" />
                <span>Sudah Dilamar</span>
              </button>
            ) : (
              <button
                onClick={() => setShowApplyForm(true)}
                className="flex-1 sm:flex-none px-6 py-2.5 rounded-xl text-xs font-extrabold text-white bg-gradient-to-r from-[#059669] to-[#10B981] hover:from-[#047857] hover:to-[#059669] shadow-md shadow-emerald-900/10 flex items-center justify-center gap-2 transition-all active:scale-98"
              >
                <span>Lamar Sekarang</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
