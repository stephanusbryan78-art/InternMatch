import React, { useState } from 'react';
import { TalentProfile } from '../../types';
import {
  Search,
  Filter,
  Star,
  MapPin,
  GraduationCap,
  Award,
  CheckCircle2,
  Send,
  Briefcase,
  Sparkles,
} from 'lucide-react';

interface FindTalentViewProps {
  talents: TalentProfile[];
  onInviteTalent?: (talent: TalentProfile) => void;
  onViewTalentProfile?: (talent: TalentProfile) => void;
}

export const FindTalentView: React.FC<FindTalentViewProps> = ({
  talents,
  onInviteTalent,
  onViewTalentProfile,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMajor, setSelectedMajor] = useState<string>('All');
  const [invitedTalentIds, setInvitedTalentIds] = useState<string[]>([]);

  const majors = [
    'All',
    'Rekayasa Perangkat Lunak',
    'Desain Komunikasi Visual',
    'Tata Boga',
    'Teknik Komputer',
  ];

  const filteredTalents = talents.filter((t) => {
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = t.fullName.toLowerCase().includes(q);
      const matchSkills = t.skills.some((s) => s.toLowerCase().includes(q));
      const matchSchool = t.education.school.toLowerCase().includes(q);
      if (!matchName && !matchSkills && !matchSchool) return false;
    }

    if (selectedMajor !== 'All') {
      if (!t.education.major.toLowerCase().includes(selectedMajor.toLowerCase())) {
        return false;
      }
    }

    return true;
  });

  const handleInvite = (talent: TalentProfile) => {
    setInvitedTalentIds((prev) => [...prev, talent.id]);
    if (onInviteTalent) onInviteTalent(talent);
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xs">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-[#059669] text-xs font-bold mb-2 border border-emerald-200/60">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Pencarian Bakat Vokasi Terverifikasi</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0B1E36]">
            Temukan Talenta Vokasi Siap Kerja
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Cari kandidat berdasarkan keterampilan teknis, portofolio nyata, medali LKS, dan riwayat ulasan performa kerja sebelumnya.
          </p>
        </div>

        {/* Search & Filter Bar */}
        <div className="mt-6 flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari keahlian (contoh: React, Barista, Figma, Mikrotik), sekolah, atau nama talent..."
              className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-[#059669] text-[#0B1E36]"
            />
          </div>

          <select
            value={selectedMajor}
            onChange={(e) => setSelectedMajor(e.target.value)}
            className="px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-bold text-slate-700 focus:outline-none"
          >
            {majors.map((m) => (
              <option key={m} value={m}>
                {m === 'All' ? 'Semua Bidang Keahlian' : m}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Talent Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredTalents.map((talent) => {
          const isInvited = invitedTalentIds.includes(talent.id);

          return (
            <div
              key={talent.id}
              className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-xs hover:border-[#10B981]/50 hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div className="space-y-4">
                {/* Header: Photo, Name, Reputation Score */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={talent.avatar}
                      alt={talent.fullName}
                      className="w-14 h-14 rounded-2xl object-cover border border-slate-200 ring-2 ring-emerald-500/20"
                    />
                    <div>
                      <h3 className="font-extrabold text-base text-[#0B1E36]">
                        {talent.fullName}
                      </h3>
                      <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-0.5">
                        <GraduationCap className="w-3.5 h-3.5 text-[#059669]" />
                        <span>{talent.education.school}</span>
                      </div>
                      <span className="text-[11px] font-semibold text-slate-600">
                        {talent.education.major} ({talent.education.graduationYear})
                      </span>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <span className="text-[10px] font-bold text-slate-400 block uppercase">
                      Skor Reputasi
                    </span>
                    <div className="text-lg font-black text-[#047857] flex items-center justify-end gap-1">
                      <Star className="w-4 h-4 fill-current text-amber-500" />
                      <span>{talent.reputationScore}</span>
                    </div>
                  </div>
                </div>

                {/* About snippet */}
                <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                  {talent.about}
                </p>

                {/* Verified Achievements Badge */}
                {talent.verifiedAchievements.length > 0 && (
                  <div className="p-2.5 bg-amber-50/60 rounded-xl border border-amber-200/60 flex items-center gap-2 text-xs">
                    <Award className="w-4 h-4 text-amber-600 shrink-0" />
                    <span className="font-bold text-amber-900 truncate">
                      {talent.verifiedAchievements[0].title}
                    </span>
                  </div>
                )}

                {/* Skills tags */}
                <div>
                  <span className="text-[11px] font-bold text-slate-400 block mb-1">
                    Kompetensi Utama:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {talent.skills.slice(0, 5).map((sk) => (
                      <span
                        key={sk}
                        className="text-[11px] font-semibold px-2 py-0.5 rounded-md bg-slate-100 text-slate-700"
                      >
                        {sk}
                      </span>
                    ))}
                    {talent.skills.length > 5 && (
                      <span className="text-[10px] text-slate-400 self-center">
                        +{talent.skills.length - 5}
                      </span>
                    )}
                  </div>
                </div>

                {/* Availability & Location */}
                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    <span>{talent.location}</span>
                  </span>
                  <span className="font-semibold text-[#059669]">
                    {talent.careerPreferences.availability}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between gap-2">
                <button
                  onClick={() => onViewTalentProfile && onViewTalentProfile(talent)}
                  className="text-xs font-bold text-slate-600 hover:text-[#0B1E36] hover:underline"
                >
                  Lihat Portofolio Lengkap
                </button>

                {isInvited ? (
                  <span className="px-4 py-2 rounded-xl bg-slate-100 text-slate-500 text-xs font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#059669]" />
                    <span>Undangan Terkirim</span>
                  </span>
                ) : (
                  <button
                    onClick={() => handleInvite(talent)}
                    className="px-4 py-2 rounded-xl bg-[#059669] hover:bg-[#047857] text-white text-xs font-bold flex items-center gap-1.5 shadow-xs transition-colors"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Undang Melamar</span>
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
