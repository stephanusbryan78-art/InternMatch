import React, { useState } from 'react';
import { TalentProfile, OpportunityType, WorkArrangement } from '../../types';
import { Logo } from '../common/Logo';
import {
  User,
  GraduationCap,
  Sparkles,
  Briefcase,
  Award,
  Compass,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  X,
  Plus,
} from 'lucide-react';

interface TalentOnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: (profile: TalentProfile) => void;
  initialProfile: TalentProfile;
}

export const TalentOnboardingModal: React.FC<TalentOnboardingModalProps> = ({
  isOpen,
  onClose,
  onComplete,
  initialProfile,
}) => {
  const [currentStep, setCurrentStep] = useState(1);

  // Form State
  const [fullName, setFullName] = useState(initialProfile.fullName);
  const [location, setLocation] = useState(initialProfile.location);
  const [school, setSchool] = useState(initialProfile.education.school);
  const [major, setMajor] = useState(initialProfile.education.major);
  const [gradYear, setGradYear] = useState(initialProfile.education.graduationYear);
  const [skills, setSkills] = useState<string[]>(initialProfile.skills);
  const [customSkillInput, setCustomSkillInput] = useState('');
  const [experienceTitle, setExperienceTitle] = useState('Intern Web Developer');
  const [experienceCompany, setExperienceCompany] = useState('PT Solusi Teknologi Kreatif');
  const [portfolioTitle, setPortfolioTitle] = useState('Katalog E-Commerce Warung Vokasi');
  const [portfolioLink, setPortfolioLink] = useState('https://github.com/rizkypratama/warung-vokasi');
  const [certTitle, setCertTitle] = useState('Sertifikasi Kompetensi Junior Web Developer (BNSP)');
  const [availability, setAvailability] = useState<'Available Immediately' | 'Available in 1 Month' | 'Open to Offers'>('Available Immediately');
  const [selectedArrangements, setSelectedArrangements] = useState<WorkArrangement[]>(['Hybrid', 'Onsite']);

  if (!isOpen) return null;

  const popularVocationalSkills = [
    'React',
    'Tailwind CSS',
    'TypeScript',
    'Figma UI Design',
    'Adobe Illustrator',
    'Adobe Photoshop',
    'Espresso Calibration',
    'Latte Art',
    'Mikrotik RouterOS',
    'Safety K3 Bengkel',
    'Hotel PMS System',
    'Data Entry Warehouse',
  ];

  const toggleSkill = (skill: string) => {
    if (skills.includes(skill)) {
      setSkills(skills.filter((s) => s !== skill));
    } else {
      setSkills([...skills, skill]);
    }
  };

  const handleAddCustomSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customSkillInput.trim()) return;
    if (!skills.includes(customSkillInput.trim())) {
      setSkills([...skills, customSkillInput.trim()]);
    }
    setCustomSkillInput('');
  };

  const handleFinish = () => {
    const updatedProfile: TalentProfile = {
      ...initialProfile,
      fullName,
      location,
      education: {
        ...initialProfile.education,
        school,
        major,
        graduationYear: gradYear,
      },
      skills,
      careerPreferences: {
        ...initialProfile.careerPreferences,
        availability,
        workArrangement: selectedArrangements,
      },
      profileCompletionPercentage: 88,
      reputationScore: 88,
    };

    onComplete(updatedProfile);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-2xl w-full shadow-2xl border border-slate-200 animate-in fade-in duration-150 relative">
        <button
          onClick={onClose}
          className="absolute right-5 top-5 p-2 rounded-xl text-slate-400 hover:text-slate-700"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header with Step Indicator */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <Logo variant="horizontal" size="sm" />
            <span className="text-xs font-bold text-[#059669] bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
              Langkah {currentStep} dari 7
            </span>
          </div>

          <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
            <div
              style={{ width: `${(currentStep / 7) * 100}%` }}
              className="h-full bg-gradient-to-r from-[#059669] to-[#10B981] transition-all duration-300"
            />
          </div>
        </div>

        {/* Step 1: Basic Information */}
        {currentStep === 1 && (
          <div className="space-y-4 text-xs">
            <div>
              <h3 className="font-extrabold text-lg text-[#0B1E36]">Langkah 1: Informasi Dasar</h3>
              <p className="text-slate-500">Mulai dengan nama lengkap dan lokasi domisili Anda.</p>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Nama Lengkap</label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full p-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-1 focus:ring-[#059669]"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Kota / Domisili Saat Ini</label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full p-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-1 focus:ring-[#059669]"
              />
            </div>
          </div>
        )}

        {/* Step 2: Education */}
        {currentStep === 2 && (
          <div className="space-y-4 text-xs">
            <div>
              <h3 className="font-extrabold text-lg text-[#0B1E36]">Langkah 2: Riwayat Pendidikan Vokasi</h3>
              <p className="text-slate-500">Sekolah SMK atau politeknik asal Anda.</p>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Nama Sekolah / SMK / Kampus</label>
              <input
                type="text"
                value={school}
                onChange={(e) => setSchool(e.target.value)}
                className="w-full p-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-1 focus:ring-[#059669]"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Jurusan / Konsentrasi</label>
                <input
                  type="text"
                  value={major}
                  onChange={(e) => setMajor(e.target.value)}
                  className="w-full p-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-1 focus:ring-[#059669]"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Tahun Kelulusan</label>
                <input
                  type="number"
                  value={gradYear}
                  onChange={(e) => setGradYear(Number(e.target.value))}
                  className="w-full p-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-1 focus:ring-[#059669]"
                />
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Skills */}
        {currentStep === 3 && (
          <div className="space-y-4 text-xs">
            <div>
              <h3 className="font-extrabold text-lg text-[#0B1E36]">Langkah 3: Pilih Keahlian Utama</h3>
              <p className="text-slate-500">Pilih keterampilan yang sudah Anda pelajari di sekolah atau praktik industri.</p>
            </div>

            <div className="flex flex-wrap gap-2">
              {popularVocationalSkills.map((sk) => {
                const isSelected = skills.includes(sk);
                return (
                  <button
                    key={sk}
                    type="button"
                    onClick={() => toggleSkill(sk)}
                    className={`px-3 py-1.5 rounded-full font-bold transition-all ${
                      isSelected
                        ? 'bg-[#059669] text-white shadow-xs'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {isSelected ? '✓ ' : '+ '}
                    {sk}
                  </button>
                );
              })}
            </div>

            <form onSubmit={handleAddCustomSkill} className="flex gap-2 pt-2">
              <input
                type="text"
                value={customSkillInput}
                onChange={(e) => setCustomSkillInput(e.target.value)}
                placeholder="Tambah keahlian lain..."
                className="flex-1 p-2.5 rounded-xl border border-slate-300"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-slate-800 text-white rounded-xl font-bold"
              >
                Tambah
              </button>
            </form>
          </div>
        )}

        {/* Step 4: Experience */}
        {currentStep === 4 && (
          <div className="space-y-4 text-xs">
            <div>
              <h3 className="font-extrabold text-lg text-[#0B1E36]">Langkah 4: Pengalaman Kerja & Magang</h3>
              <p className="text-slate-500">PKL (Praktik Kerja Lapangan), magang, atau tugas proyek sekolah.</p>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Posisi / Judul Pengalaman</label>
              <input
                type="text"
                value={experienceTitle}
                onChange={(e) => setExperienceTitle(e.target.value)}
                className="w-full p-3 rounded-xl border border-slate-300"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Nama Perusahaan / Tempat PKL</label>
              <input
                type="text"
                value={experienceCompany}
                onChange={(e) => setExperienceCompany(e.target.value)}
                className="w-full p-3 rounded-xl border border-slate-300"
              />
            </div>
          </div>
        )}

        {/* Step 5: Portfolio & Certification */}
        {currentStep === 5 && (
          <div className="space-y-4 text-xs">
            <div>
              <h3 className="font-extrabold text-lg text-[#0B1E36]">Langkah 5: Bukti Portofolio & Sertifikasi</h3>
              <p className="text-slate-500">Tunjukkan bukti nyata kemampuan Anda.</p>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Judul Portofolio / Karya</label>
              <input
                type="text"
                value={portfolioTitle}
                onChange={(e) => setPortfolioTitle(e.target.value)}
                className="w-full p-3 rounded-xl border border-slate-300"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Sertifikasi Resmi (BNSP / Kompetensi)</label>
              <input
                type="text"
                value={certTitle}
                onChange={(e) => setCertTitle(e.target.value)}
                className="w-full p-3 rounded-xl border border-slate-300"
              />
            </div>
          </div>
        )}

        {/* Step 6: Career Preferences */}
        {currentStep === 6 && (
          <div className="space-y-4 text-xs">
            <div>
              <h3 className="font-extrabold text-lg text-[#0B1E36]">Langkah 6: Preferensi Peluang Kerja</h3>
              <p className="text-slate-500">Ketersediaan dan sistem kerja yang Anda harapkan.</p>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Kesiapan Kerja / Ketersediaan</label>
              <select
                value={availability}
                onChange={(e) => setAvailability(e.target.value as any)}
                className="w-full p-3 rounded-xl border border-slate-300"
              >
                <option value="Available Immediately">Siap Bekerja Segera (Available Immediately)</option>
                <option value="Available in 1 Month">Tersedia dalam 1 Bulan</option>
                <option value="Open to Offers">Terbuka untuk Penawaran Menarik</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Sistem Kerja Pilihan</label>
              <div className="flex gap-2">
                {['Onsite', 'Hybrid', 'Remote'].map((arr) => {
                  const isChecked = selectedArrangements.includes(arr as WorkArrangement);
                  return (
                    <button
                      key={arr}
                      type="button"
                      onClick={() => {
                        if (isChecked) {
                          setSelectedArrangements(selectedArrangements.filter((a) => a !== arr));
                        } else {
                          setSelectedArrangements([...selectedArrangements, arr as WorkArrangement]);
                        }
                      }}
                      className={`px-3 py-1.5 rounded-xl border font-bold ${
                        isChecked ? 'bg-emerald-50 border-[#059669] text-[#059669]' : 'border-slate-200'
                      }`}
                    >
                      {isChecked ? '✓ ' : ''}{arr}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Step 7: Complete Profile Preview (PRD Section 7) */}
        {currentStep === 7 && (
          <div className="space-y-4 text-xs text-center py-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-[#059669] flex items-center justify-center mx-auto ring-4 ring-emerald-50">
              <Sparkles className="w-8 h-8" />
            </div>

            <div>
              <h3 className="font-extrabold text-xl text-[#0B1E36]">
                Profil Anda 88% Selesai!
              </h3>
              <p className="text-slate-600 mt-1 max-w-sm mx-auto">
                Luar biasa, {fullName}! Anda kini siap menemukan lowongan magang & daily work dengan kecocokan tinggi.
              </p>
            </div>

            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-left space-y-2">
              <span className="font-bold text-slate-700 block">Rekomendasi untuk mencapai 100%:</span>
              <div className="flex items-center gap-2 text-slate-600">
                <CheckCircle2 className="w-4 h-4 text-[#059669]" />
                <span>Keahlian & sertifikasi BNSP terdaftar</span>
              </div>
              <div className="flex items-center gap-2 text-slate-600">
                <CheckCircle2 className="w-4 h-4 text-[#059669]" />
                <span>Preferensi kerja tersimpan</span>
              </div>
              <div className="flex items-center gap-2 text-slate-400">
                <span className="w-4 h-4 rounded-full border border-slate-300 flex items-center justify-center text-[10px]">○</span>
                <span>Ikuti 1 Career Class untuk menambah lencana resmi</span>
              </div>
            </div>
          </div>
        )}

        {/* Footer Navigation Buttons */}
        <div className="mt-6 pt-4 border-t border-slate-200 flex items-center justify-between">
          {currentStep > 1 ? (
            <button
              type="button"
              onClick={() => setCurrentStep(currentStep - 1)}
              className="px-4 py-2.5 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 flex items-center gap-1.5"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Sebelumnya</span>
            </button>
          ) : <div />}

          {currentStep < 7 ? (
            <button
              type="button"
              onClick={() => setCurrentStep(currentStep + 1)}
              className="px-5 py-2.5 rounded-xl bg-[#059669] hover:bg-[#047857] text-white text-xs font-bold flex items-center gap-1.5 shadow-xs"
            >
              <span>Lanjut</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleFinish}
              className="px-6 py-2.5 rounded-xl bg-[#059669] hover:bg-[#047857] text-white text-xs font-extrabold flex items-center gap-1.5 shadow-sm"
            >
              <span>Masuk ke Dashboard Saya</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
