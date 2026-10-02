import React, { useState } from 'react';
import { CareerClass, TalentProfile } from '../../types';
import {
  GraduationCap,
  Calendar,
  Clock,
  Video,
  CheckCircle2,
  Users,
  Award,
  Sparkles,
  ExternalLink,
  BookOpen,
} from 'lucide-react';

interface CareerClassViewProps {
  careerClasses: CareerClass[];
  talentProfile: TalentProfile;
  onRegister: (classId: string) => void;
  onCompleteClass: (classId: string, badgeName: string) => void;
}

export const CareerClassView: React.FC<CareerClassViewProps> = ({
  careerClasses,
  talentProfile,
  onRegister,
  onCompleteClass,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedClass, setSelectedClass] = useState<CareerClass | null>(null);

  const categories = ['All', 'CV & Portfolio', 'Skills & Tech', 'Workplace Etiquette', 'Hospitality & F&B'];

  const filteredClasses = careerClasses.filter((c) => {
    if (selectedCategory === 'All') return true;
    return c.category === selectedCategory;
  });

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-[#0B1E36] via-[#102A4C] to-[#047857] text-white rounded-3xl p-6 sm:p-10 shadow-xs relative overflow-hidden">
        <div className="max-w-2xl relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-[#34D399] text-xs font-bold mb-3 border border-emerald-500/30">
            <GraduationCap className="w-4 h-4" />
            <span>LEARN → PRACTICE → PROVE</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Kelas Karier Vokasi Bersama Praktisi Industri
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
            Tingkatkan kesiapan kerja dan raih sertifikasi resmi yang otomatis masuk ke profil reputasi Anda di InternMatch. Dimentori langsung oleh HRD dan engineer senior.
          </p>
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              selectedCategory === cat
                ? 'bg-[#059669] text-white shadow-xs'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            {cat === 'All' ? 'Semua Topik' : cat}
          </button>
        ))}
      </div>

      {/* Classes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredClasses.map((cls) => {
          const isRegistered = cls.isRegistered;
          const isCompleted = cls.isCompleted;

          return (
            <div
              key={cls.id}
              className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-xs hover:border-[#10B981]/50 hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700">
                    {cls.category}
                  </span>
                  <span className="text-xs font-extrabold text-[#059669] bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                    {cls.price}
                  </span>
                </div>

                <h3 className="font-extrabold text-base sm:text-lg text-[#0B1E36] leading-snug">
                  {cls.title}
                </h3>

                {/* Instructor Info */}
                <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200/70 text-xs">
                  <span className="text-slate-400 block text-[10px] uppercase font-bold tracking-wider">
                    Pemateri Kelas:
                  </span>
                  <div className="font-bold text-[#0B1E36] mt-0.5">{cls.instructor}</div>
                  <div className="text-slate-500 text-[11px]">
                    {cls.instructorRole} • <strong className="text-slate-700">{cls.instructorCompany}</strong>
                  </div>
                </div>

                {/* Schedule & Platform */}
                <div className="grid grid-cols-2 gap-2 text-xs text-slate-600">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    <span>{cls.date}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span>{cls.time}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Video className="w-3.5 h-3.5 text-[#059669]" />
                    <span className="font-semibold">{cls.platform} Live Interactive</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-slate-400" />
                    <span>{cls.registeredCount} / {cls.maxParticipants} Terdaftar</span>
                  </div>
                </div>

                {/* Syllabus Preview */}
                <div className="pt-2">
                  <span className="text-[11px] font-bold text-slate-700 block mb-1">Materi Utama:</span>
                  <ul className="text-xs text-slate-600 space-y-1">
                    {cls.syllabus.slice(0, 3).map((s, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#059669] mt-1.5 shrink-0" />
                        <span className="line-clamp-1">{s}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Action / Certificate footer */}
              <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                <div className="flex items-center gap-1 text-[11px] text-[#059669] font-bold">
                  <Award className="w-4 h-4 shrink-0" />
                  <span className="line-clamp-1">Lencana: {cls.badgeEarned}</span>
                </div>

                {isCompleted ? (
                  <span className="px-3.5 py-1.5 rounded-xl bg-slate-100 text-slate-600 font-bold text-xs flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#059669]" />
                    <span>Selesai (+Lencana)</span>
                  </span>
                ) : isRegistered ? (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onCompleteClass(cls.id, cls.badgeEarned)}
                      className="px-3 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-[#059669] text-xs font-bold transition-colors"
                      title="Simulasikan hadir & selesaikan kelas untuk mendapatkan sertifikat"
                    >
                      Klaim Sertifikat
                    </button>
                    <span className="px-3 py-1.5 rounded-xl bg-[#059669] text-white text-xs font-bold">
                      Terdaftar ✓
                    </span>
                  </div>
                ) : (
                  <button
                    onClick={() => onRegister(cls.id)}
                    className="px-4 py-2 rounded-xl bg-[#0B1E36] hover:bg-[#059669] text-white text-xs font-bold transition-colors shadow-xs"
                  >
                    Daftar Kelas Gratis
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
