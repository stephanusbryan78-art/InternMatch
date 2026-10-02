import React, { useState } from 'react';
import { Opportunity, CommunityPost, CareerClass } from '../../types';
import {
  Shield,
  Building2,
  Users,
  Briefcase,
  TrendingUp,
  CheckCircle2,
  AlertTriangle,
  Trash2,
  Check,
  Eye,
  FileCheck,
} from 'lucide-react';

interface AdminPanelProps {
  opportunities: Opportunity[];
  communityPosts: CommunityPost[];
  careerClasses: CareerClass[];
  onToggleVerifyCompany?: (companyName: string) => void;
  onRemoveOpportunity?: (oppId: string) => void;
  onRemovePost?: (postId: string) => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({
  opportunities,
  communityPosts,
  careerClasses,
  onToggleVerifyCompany,
  onRemoveOpportunity,
  onRemovePost,
}) => {
  const [activeAdminTab, setActiveAdminTab] = useState<'stats' | 'companies' | 'moderation'>('stats');

  const [partnerCompanies, setPartnerCompanies] = useState([
    { id: 'c1', name: 'PT Digital Nusantara Solusindo', verified: true, industry: 'Software House', studentHired: 12 },
    { id: 'c2', name: 'Toko Kopi Senja Abadi', verified: true, industry: 'Food & Beverage', studentHired: 8 },
    { id: 'c3', name: 'Batavia Creative Motion Studio', verified: true, industry: 'Creative Agency', studentHired: 5 },
    { id: 'c4', name: 'Bengkel Cepat Motor Mandiri', verified: false, industry: 'Automotive', studentHired: 0 },
    { id: 'c5', name: 'Nusa Paradise Hotel & Resort', verified: true, industry: 'Hospitality', studentHired: 14 },
  ]);

  const toggleVerify = (id: string) => {
    setPartnerCompanies((prev) =>
      prev.map((c) => (c.id === id ? { ...c, verified: !c.verified } : c))
    );
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#0B1E36] to-[#1E3A8A] text-white rounded-3xl p-6 sm:p-8 shadow-xs">
        <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 uppercase tracking-wider mb-2">
          <Shield className="w-4 h-4" />
          <span>Panel Kontrol & Moderasi InternMatch</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
          Admin & Moderasi Ekosistem Vokasi
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 mt-1">
          Pantau kesehatan platform, verifikasi kelayakan izin mitra industri, dan amankan interaksi komunitas vokasi.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-1">
        {[
          { id: 'stats', label: 'Ringkasan Platform' },
          { id: 'companies', label: 'Verifikasi Perusahaan Mitra' },
          { id: 'moderation', label: 'Moderasi Konten Komunitas' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveAdminTab(tab.id as any)}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeAdminTab === tab.id
                ? 'bg-[#0B1E36] text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab 1: Stats Overview (PRD Section 23) */}
      {activeAdminTab === 'stats' && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs">
              <span className="text-xs font-bold text-slate-400 block uppercase">Total Talent Vokasi</span>
              <div className="text-2xl font-black text-[#0B1E36] mt-1">2,840</div>
              <span className="text-[11px] text-[#059669] font-medium">+142 minggu ini</span>
            </div>

            <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs">
              <span className="text-xs font-bold text-slate-400 block uppercase">Perusahaan Mitra</span>
              <div className="text-2xl font-black text-blue-600 mt-1">118</div>
              <span className="text-[11px] text-slate-500 font-medium">96 Terverifikasi</span>
            </div>

            <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs">
              <span className="text-xs font-bold text-slate-400 block uppercase">Peluang Aktif</span>
              <div className="text-2xl font-black text-[#059669] mt-1">{opportunities.length}</div>
              <span className="text-[11px] text-slate-500 font-medium">Magang & Daily Work</span>
            </div>

            <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs">
              <span className="text-xs font-bold text-slate-400 block uppercase">Penempatan Berhasil</span>
              <div className="text-2xl font-black text-purple-600 mt-1">540+</div>
              <span className="text-[11px] text-purple-700 font-medium">Rating rata-rata 4.85 ★</span>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-3">
            <h3 className="font-extrabold text-base text-[#0B1E36]">Keamanan & Perlindungan Siswa SMK (&lt;18 Tahun)</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Sesuai PRD Section 37, semua lowongan magang industri dipindai secara otomatis untuk memastikan kesesuaian jam kerja, tidak adanya shift malam yang membahayakan anak sekolah, serta adanya mentor terverifikasi di lokasi kerja.
            </p>
            <div className="flex items-center gap-2 pt-2">
              <span className="px-3 py-1 bg-emerald-50 text-[#059669] text-xs font-bold rounded-lg border border-emerald-200">
                ✓ Filter Safeguard Aktif
              </span>
              <span className="px-3 py-1 bg-blue-50 text-blue-700 text-xs font-bold rounded-lg border border-blue-200">
                ✓ Standar K3 Vokasi Berlaku
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Companies Verification */}
      {activeAdminTab === 'companies' && (
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
          <h3 className="font-extrabold text-base text-[#0B1E36]">Daftar Perusahaan Mitra</h3>
          <div className="divide-y divide-slate-100">
            {partnerCompanies.map((c) => (
              <div key={c.id} className="py-3 flex items-center justify-between text-xs">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900 text-sm">{c.name}</span>
                    {c.verified ? (
                      <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-[#059669] text-[10px] font-bold border border-emerald-200">
                        Terverifikasi
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded-full bg-amber-50 text-amber-800 text-[10px] font-bold border border-amber-200">
                        Menunggu Tinjauan Dokumen
                      </span>
                    )}
                  </div>
                  <span className="text-slate-500 text-[11px]">{c.industry} • {c.studentHired} Siswa Ditempatkan</span>
                </div>

                <button
                  onClick={() => toggleVerify(c.id)}
                  className={`px-3 py-1.5 rounded-xl font-bold transition-colors ${
                    c.verified
                      ? 'bg-slate-100 text-slate-600 hover:bg-red-50 hover:text-red-600'
                      : 'bg-[#059669] text-white hover:bg-[#047857]'
                  }`}
                >
                  {c.verified ? 'Cabut Verifikasi' : 'Verifikasi Sekarang'}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Moderation */}
      {activeAdminTab === 'moderation' && (
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
          <h3 className="font-extrabold text-base text-[#0B1E36]">Moderasi Diskusi Komunitas</h3>
          <p className="text-xs text-slate-500">
            Pastikan komunitas berfokus pada diskusi profesional, pengembangan keterampilan, dan etika kerja vokasi.
          </p>

          <div className="space-y-3">
            {communityPosts.map((p) => (
              <div key={p.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-start justify-between gap-3 text-xs">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900">{p.authorName}</span>
                    <span className="text-slate-400">•</span>
                    <span className="text-slate-500">{p.category}</span>
                  </div>
                  <h4 className="font-bold text-slate-800">{p.title}</h4>
                  <p className="text-slate-600 line-clamp-1">{p.content}</p>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  <span className="px-2.5 py-1 rounded-lg bg-emerald-50 text-[#059669] text-[11px] font-bold">
                    Aman (Lolos Filter)
                  </span>
                  {onRemovePost && (
                    <button
                      onClick={() => onRemovePost(p.id)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-white"
                      title="Hapus postingan"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
