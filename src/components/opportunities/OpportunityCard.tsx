import React from 'react';
import { Opportunity, TalentProfile } from '../../types';
import { calculateMatchScore } from '../../services/matchingService';
import {
  MapPin,
  Clock,
  Banknote,
  CheckCircle2,
  Bookmark,
  Sparkles,
  ShieldCheck,
  ArrowRight,
} from 'lucide-react';

interface OpportunityCardProps {
  opportunity: Opportunity;
  talentProfile: TalentProfile;
  onSelect: (opportunity: Opportunity) => void;
  isSaved?: boolean;
  onToggleSave?: (opportunityId: string) => void;
}

export const OpportunityCard: React.FC<OpportunityCardProps> = ({
  opportunity,
  talentProfile,
  onSelect,
  isSaved = false,
  onToggleSave,
}) => {
  const match = calculateMatchScore(talentProfile, opportunity);

  // Badge styling based on opportunity type
  const getTypeBadgeColor = (type: string) => {
    switch (type) {
      case 'Internship':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'Daily Work':
        return 'bg-amber-50 text-amber-800 border-amber-200 font-bold';
      case 'Freelance':
        return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'Entry-level':
        return 'bg-emerald-50 text-emerald-800 border-emerald-200';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 hover:border-[#10B981]/50 hover:shadow-lg transition-all duration-200 p-5 flex flex-col justify-between group relative">
      <div>
        {/* Top Header: Logo, Company, Match % and Save */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-3">
            <img
              src={opportunity.companyLogo}
              alt={opportunity.companyName}
              className="w-11 h-11 rounded-xl object-cover border border-slate-100 shadow-xs"
            />
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-bold text-slate-700 group-hover:text-[#0B1E36] line-clamp-1">
                  {opportunity.companyName}
                </span>
                {opportunity.companyVerified && (
                  <span title="Perusahaan Terverifikasi" className="inline-flex items-center">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#059669] shrink-0" />
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2 mt-0.5">
                <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${getTypeBadgeColor(opportunity.type)}`}>
                  {opportunity.type}
                </span>
                {opportunity.ageSafeBadge && (
                  <span className="text-[10px] font-semibold text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded">
                    Ramah SMK &lt;18
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            {/* Match Percentage Pill */}
            <div
              className={`px-2.5 py-1 rounded-full text-xs font-extrabold flex items-center gap-1 shadow-xs ${
                match.overallPercentage >= 80
                  ? 'bg-[#ECFDF5] text-[#059669] border border-[#10B981]/30'
                  : 'bg-slate-100 text-slate-700'
              }`}
              title="Kecocokan profil Anda berdasarkan keahlian, lokasi, dan pendidikan"
            >
              <Sparkles className="w-3 h-3 text-[#059669]" />
              <span>{match.overallPercentage}% Match</span>
            </div>

            {/* Save Button */}
            {onToggleSave && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleSave(opportunity.id);
                }}
                className={`p-1.5 rounded-lg transition-colors ${
                  isSaved ? 'text-[#059669] bg-emerald-50' : 'text-slate-400 hover:text-slate-600 hover:bg-slate-100'
                }`}
                title={isSaved ? 'Hapus simpanan' : 'Simpan peluang'}
              >
                <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
              </button>
            )}
          </div>
        </div>

        {/* Title */}
        <h3
          onClick={() => onSelect(opportunity)}
          className="text-base font-bold text-[#0B1E36] group-hover:text-[#059669] transition-colors cursor-pointer line-clamp-2 leading-snug mb-3"
        >
          {opportunity.title}
        </h3>

        {/* Metadata Details */}
        <div className="space-y-1.5 mb-4 text-xs text-slate-600">
          <div className="flex items-center gap-2">
            <Banknote className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="font-semibold text-slate-800">{opportunity.compensation}</span>
          </div>

          <div className="flex items-center gap-2">
            <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="line-clamp-1">
              {opportunity.location} • <strong className="font-semibold text-slate-700">{opportunity.workArrangement}</strong>
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span>Durasi: {opportunity.duration}</span>
          </div>
        </div>

        {/* Required Skills Tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {opportunity.requiredSkills.slice(0, 4).map((skill) => {
            const isMatched = match.matchedSkills.includes(skill);
            return (
              <span
                key={skill}
                className={`text-[11px] px-2 py-0.5 rounded-md font-medium flex items-center gap-1 ${
                  isMatched
                    ? 'bg-emerald-50 text-[#059669] font-bold border border-emerald-200/60'
                    : 'bg-slate-100 text-slate-600'
                }`}
              >
                {isMatched && <CheckCircle2 className="w-2.5 h-2.5" />}
                {skill}
              </span>
            );
          })}
          {opportunity.requiredSkills.length > 4 && (
            <span className="text-[10px] text-slate-400 self-center">
              +{opportunity.requiredSkills.length - 4} lainnya
            </span>
          )}
        </div>
      </div>

      {/* Footer Card: CTA */}
      <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
        <span className="text-[11px] text-slate-400">
          Ditayangkan {opportunity.postedDate}
        </span>

        <button
          onClick={() => onSelect(opportunity)}
          className="text-xs font-bold text-[#059669] group-hover:text-[#047857] flex items-center gap-1 hover:underline"
        >
          <span>Detail & Lamar</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>
    </div>
  );
};
