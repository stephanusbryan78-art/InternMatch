import React, { useState } from 'react';
import { Application, ApplicationStatus, TalentProfile } from '../../types';
import {
  Briefcase,
  Calendar,
  Clock,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  ChevronRight,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Building2,
  FileCheck,
  MessageSquare,
} from 'lucide-react';

interface ApplicationManagementProps {
  applications: Application[];
  talentProfile: TalentProfile;
  onUpdateStatus: (applicationId: string, newStatus: ApplicationStatus) => void;
  onNavigateOpportunities: () => void;
  onOpenAIModal: () => void;
}

export const ApplicationManagement: React.FC<ApplicationManagementProps> = ({
  applications,
  talentProfile,
  onUpdateStatus,
  onNavigateOpportunities,
  onOpenAIModal,
}) => {
  const [filterStatus, setFilterStatus] = useState<string>('All');
  const [selectedApp, setSelectedApp] = useState<Application | null>(null);

  const statuses: (ApplicationStatus | 'All')[] = [
    'All',
    'Applied',
    'Under Review',
    'Interview',
    'Accepted',
    'Completed',
  ];

  const filteredApplications = applications.filter((app) => {
    if (filterStatus === 'All') return true;
    return app.status === filterStatus;
  });

  const getStatusBadge = (status: ApplicationStatus) => {
    switch (status) {
      case 'Applied':
        return {
          bg: 'bg-blue-50 text-blue-700 border-blue-200',
          dot: 'bg-blue-500',
          label: 'Terkirim',
        };
      case 'Under Review':
        return {
          bg: 'bg-amber-50 text-amber-800 border-amber-200',
          dot: 'bg-amber-500',
          label: 'Sedang Ditinjau',
        };
      case 'Interview':
        return {
          bg: 'bg-purple-50 text-purple-700 border-purple-200',
          dot: 'bg-purple-500',
          label: 'Tahap Interview',
        };
      case 'Accepted':
        return {
          bg: 'bg-emerald-50 text-emerald-800 border-emerald-300 font-bold',
          dot: 'bg-[#10B981]',
          label: 'Diterima Bekerja',
        };
      case 'Completed':
        return {
          bg: 'bg-slate-100 text-slate-800 border-slate-300 font-bold',
          dot: 'bg-slate-600',
          label: 'Penugasan Selesai',
        };
      case 'Rejected':
        return {
          bg: 'bg-red-50 text-red-700 border-red-200',
          dot: 'bg-red-500',
          label: 'Belum Sesuai',
        };
      default:
        return {
          bg: 'bg-slate-100 text-slate-700 border-slate-200',
          dot: 'bg-slate-400',
          label: status,
        };
    }
  };

  const getNextActionAdvice = (app: Application) => {
    switch (app.status) {
      case 'Applied':
        return 'Perusahaan biasanya meninjau lamaran dalam 1-2 hari kerja. Pantau notifikasi secara berkala.';
      case 'Under Review':
        return 'Tim HRD sedang memverifikasi portofolio dan sertifikasi Anda. Siapkan ringkasan proyek tugas akhir.';
      case 'Interview':
        return `Sesi wawancara dijadwalkan pada ${app.interviewDate || 'minggu ini'}. Gunakan Asisten AI untuk latihan simulasi!`;
      case 'Accepted':
        return 'Selamat! Anda diterima. Koordinasikan tanggal mulai dan SOP perusahaan dengan kontak HRD.';
      case 'Completed':
        return 'Pekerjaan selesai! Ulasan bintang 5 dan lencana kompetensi telah ditambahkan ke skor reputasi profil Anda.';
      default:
        return 'Tetap semangat! Jelajahi peluang lainnya yang cocok dengan keterampilan Anda.';
    }
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-[#059669] text-xs font-bold mb-2 border border-emerald-200/60">
            <Briefcase className="w-3.5 h-3.5" />
            <span>Manajemen Lamaran Aktif</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0B1E36]">
            Lamaran Saya
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Pantau status seleksi, jadwal interview, dan penyelesaian penugasan magang / daily work Anda secara transparan.
          </p>
        </div>

        <button
          onClick={onNavigateOpportunities}
          className="px-5 py-3 rounded-2xl bg-[#059669] hover:bg-[#047857] text-white text-xs font-bold flex items-center justify-center gap-2 shadow-xs transition-colors shrink-0"
        >
          <span>Eksplorasi Peluang Baru</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Status Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
        {statuses.map((st) => (
          <button
            key={st}
            onClick={() => setFilterStatus(st)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              filterStatus === st
                ? 'bg-[#0B1E36] text-white shadow-xs'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            {st === 'All' ? `Semua Lamaran (${applications.length})` : st}
          </button>
        ))}
      </div>

      {/* Applications List */}
      {filteredApplications.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-slate-200/90 space-y-4">
          <div className="w-16 h-16 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
            <Briefcase className="w-8 h-8" />
          </div>
          <h3 className="font-bold text-lg text-[#0B1E36]">
            {filterStatus === 'All'
              ? 'Anda belum memiliki lamaran aktif saat ini.'
              : `Tidak ada lamaran dengan status "${filterStatus}".`}
          </h3>
          <p className="text-xs text-slate-500 max-w-md mx-auto">
            Temukan lowongan magang atau daily work yang memiliki kecocokan tinggi dengan keahlian Anda sekarang.
          </p>
          <button
            onClick={onNavigateOpportunities}
            className="px-5 py-2.5 rounded-xl bg-[#059669] text-white text-xs font-bold hover:bg-[#047857]"
          >
            Eksplorasi Peluang
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredApplications.map((app) => {
            const badge = getStatusBadge(app.status);
            const isInterview = app.status === 'Interview';
            const isAccepted = app.status === 'Accepted';
            const isCompleted = app.status === 'Completed';

            return (
              <div
                key={app.id}
                className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-xs hover:border-emerald-300 transition-all space-y-4"
              >
                {/* Header: Company, Role & Status Pill */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={app.opportunity.companyLogo}
                      alt={app.opportunity.companyName}
                      className="w-12 h-12 rounded-xl object-cover border border-slate-200"
                    />
                    <div>
                      <h3 className="font-extrabold text-base text-[#0B1E36]">
                        {app.opportunity.title}
                      </h3>
                      <div className="flex items-center gap-2 text-xs text-slate-500">
                        <span className="font-semibold text-slate-700">{app.opportunity.companyName}</span>
                        <span>•</span>
                        <span>{app.opportunity.type}</span>
                        <span>•</span>
                        <span>Diajukan {app.appliedDate}</span>
                      </div>
                    </div>
                  </div>

                  <div className={`px-3 py-1.5 rounded-full border text-xs flex items-center gap-1.5 self-start sm:self-auto ${badge.bg}`}>
                    <span className={`w-2 h-2 rounded-full ${badge.dot}`} />
                    <span>{badge.label}</span>
                  </div>
                </div>

                {/* Progress Timeline Indicator */}
                <div className="py-2">
                  <div className="grid grid-cols-4 gap-2 text-center text-[10px] font-bold text-slate-400">
                    <span className={app.status !== 'Rejected' ? 'text-[#059669]' : ''}>
                      1. Terkirim
                    </span>
                    <span className={app.status === 'Under Review' || app.status === 'Interview' || app.status === 'Accepted' || app.status === 'Completed' ? 'text-[#059669]' : ''}>
                      2. Peninjauan
                    </span>
                    <span className={app.status === 'Interview' || app.status === 'Accepted' || app.status === 'Completed' ? 'text-[#059669]' : ''}>
                      3. Wawancara
                    </span>
                    <span className={app.status === 'Accepted' || app.status === 'Completed' ? 'text-[#059669]' : ''}>
                      4. Penerimaan / Selesai
                    </span>
                  </div>
                  <div className="h-1.5 w-full bg-slate-100 rounded-full mt-1.5 overflow-hidden flex">
                    <div
                      className={`h-full ${
                        app.status === 'Applied'
                          ? 'w-1/4 bg-blue-500'
                          : app.status === 'Under Review'
                          ? 'w-2/4 bg-amber-500'
                          : app.status === 'Interview'
                          ? 'w-3/4 bg-purple-500'
                          : 'w-full bg-[#059669]'
                      }`}
                    />
                  </div>
                </div>

                {/* Next Action Box */}
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                  <div className="space-y-1">
                    <span className="font-bold text-[#0B1E36] block">Aksi & Informasi Selanjutnya:</span>
                    <p className="text-slate-600 leading-relaxed">
                      {getNextActionAdvice(app)}
                    </p>
                    {app.interviewLocationOrLink && isInterview && (
                      <div className="pt-1">
                        <a
                          href={app.interviewLocationOrLink}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#059669] hover:underline"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                          <span>Buka Tautan Google Meet Interview</span>
                        </a>
                      </div>
                    )}
                  </div>

                  {/* Contextual Action Button */}
                  <div className="flex items-center gap-2 shrink-0">
                    {isInterview && (
                      <button
                        onClick={onOpenAIModal}
                        className="px-3.5 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold flex items-center gap-1.5 shadow-xs"
                      >
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Latihan Interview AI</span>
                      </button>
                    )}

                    {/* Prototype Simulator Button: Allows testing moving through stages to demonstrate PRD Section 45 */}
                    <div className="relative group">
                      <select
                        value={app.status}
                        onChange={(e) => onUpdateStatus(app.id, e.target.value as ApplicationStatus)}
                        className="px-3 py-1.5 rounded-xl bg-white border border-slate-300 text-[11px] font-bold text-slate-700 hover:border-slate-400 focus:outline-none cursor-pointer"
                        title="Simulasi status alur rekrutmen untuk demo"
                      >
                        <option value="Applied">Status: Terkirim</option>
                        <option value="Under Review">Status: Ditinjau</option>
                        <option value="Interview">Status: Interview</option>
                        <option value="Accepted">Status: Diterima</option>
                        <option value="Completed">Status: Selesai (+Reputasi)</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
