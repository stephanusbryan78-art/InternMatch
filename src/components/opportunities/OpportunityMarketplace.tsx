import React, { useState, useMemo } from 'react';
import { Opportunity, TalentProfile, OpportunityType } from '../../types';
import { OpportunityCard } from './OpportunityCard';
import { calculateMatchScore } from '../../services/matchingService';
import {
  Search,
  Filter,
  SlidersHorizontal,
  Sparkles,
  MapPin,
  Briefcase,
  Layers,
  X,
  RotateCcw,
} from 'lucide-react';

interface OpportunityMarketplaceProps {
  opportunities: Opportunity[];
  talentProfile: TalentProfile;
  onSelectOpportunity: (opportunity: Opportunity) => void;
  savedOpportunityIds: string[];
  onToggleSave: (opportunityId: string) => void;
  initialQuery?: string;
  initialType?: string;
}

export const OpportunityMarketplace: React.FC<OpportunityMarketplaceProps> = ({
  opportunities,
  talentProfile,
  onSelectOpportunity,
  savedOpportunityIds,
  onToggleSave,
  initialQuery = '',
  initialType = 'All',
}) => {
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [selectedType, setSelectedType] = useState<string>(initialType);
  const [selectedWorkArrangement, setSelectedWorkArrangement] = useState<string>('All');
  const [selectedLocation, setSelectedLocation] = useState<string>('All');
  const [selectedIndustry, setSelectedIndustry] = useState<string>('All');
  const [ageSafeOnly, setAgeSafeOnly] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<'match' | 'newest'>('match');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Available Filter Options
  const opportunityTypes: (OpportunityType | 'All')[] = [
    'All',
    'Internship',
    'Daily Work',
    'Part-time',
    'Freelance',
    'Entry-level',
  ];

  const arrangements = ['All', 'Onsite', 'Hybrid', 'Remote'];
  const locations = ['All', 'Jakarta Selatan', 'Jakarta Pusat', 'Jakarta Barat', 'Tangerang', 'Bandung', 'Bali', 'Surabaya'];
  const industries = ['All', 'Teknologi Informasi', 'Food & Beverage', 'Creative & Digital Agency', 'Automotive', 'Hospitality', 'Logistics', 'Healthcare'];

  // Filter & Sort Logic
  const filteredOpportunities = useMemo(() => {
    return opportunities
      .filter((opp) => {
        // Query search
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchTitle = opp.title.toLowerCase().includes(q);
          const matchCompany = opp.companyName.toLowerCase().includes(q);
          const matchSkills = opp.requiredSkills.some((s) => s.toLowerCase().includes(q));
          const matchLoc = opp.location.toLowerCase().includes(q);
          if (!matchTitle && !matchCompany && !matchSkills && !matchLoc) {
            return false;
          }
        }

        // Type filter
        if (selectedType !== 'All' && opp.type !== selectedType) {
          return false;
        }

        // Arrangement filter
        if (selectedWorkArrangement !== 'All' && opp.workArrangement !== selectedWorkArrangement) {
          return false;
        }

        // Location filter
        if (selectedLocation !== 'All' && !opp.location.toLowerCase().includes(selectedLocation.toLowerCase())) {
          return false;
        }

        // Industry filter
        if (selectedIndustry !== 'All' && !opp.industry.toLowerCase().includes(selectedIndustry.toLowerCase())) {
          return false;
        }

        // Age safeguard filter
        if (ageSafeOnly && !opp.ageSafeBadge) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'match') {
          const matchA = calculateMatchScore(talentProfile, a).overallPercentage;
          const matchB = calculateMatchScore(talentProfile, b).overallPercentage;
          return matchB - matchA;
        }
        return 0;
      });
  }, [
    opportunities,
    searchQuery,
    selectedType,
    selectedWorkArrangement,
    selectedLocation,
    selectedIndustry,
    ageSafeOnly,
    sortBy,
    talentProfile,
  ]);

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedType('All');
    setSelectedWorkArrangement('All');
    setSelectedLocation('All');
    setSelectedIndustry('All');
    setAgeSafeOnly(false);
    setSortBy('match');
  };

  const hasActiveFilters =
    searchQuery !== '' ||
    selectedType !== 'All' ||
    selectedWorkArrangement !== 'All' ||
    selectedLocation !== 'All' ||
    selectedIndustry !== 'All' ||
    ageSafeOnly;

  return (
    <div className="space-y-6">
      {/* Header & Search Bar */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xs">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-[#059669] text-xs font-bold mb-3 border border-emerald-200/60">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Peluang Karier Vokasi Terkurasi</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0B1E36] tracking-tight">
            Eksplorasi Peluang Kerja & Magang Vokasi
          </h1>
          <p className="text-sm text-slate-600 mt-1.5 leading-relaxed">
            Temukan magang industri, daily work berbayar harian, freelance, dan lowongan fresh graduate dengan indikator kecocokan transparan.
          </p>
        </div>

        {/* Large Search Input */}
        <div className="mt-6 flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari peluang magang, daily work, perusahaan, atau keahlian (contoh: React, Barista, DKV)..."
              className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-[#059669] focus:bg-white transition-all text-[#0B1E36] placeholder:text-slate-400"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <button
            onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
            className="sm:hidden px-4 py-3.5 bg-slate-100 rounded-2xl font-bold text-xs text-slate-700 flex items-center justify-center gap-2"
          >
            <Filter className="w-4 h-4 text-[#059669]" />
            <span>Filter Tambahan</span>
            {hasActiveFilters && (
              <span className="w-2 h-2 rounded-full bg-[#059669]" />
            )}
          </button>
        </div>

        {/* Quick Type Filter Pills */}
        <div className="flex items-center gap-2 mt-4 overflow-x-auto pb-1 pt-1 no-scrollbar">
          <span className="text-xs font-bold text-slate-500 whitespace-nowrap mr-1">Tipe:</span>
          {opportunityTypes.map((type) => {
            const isSelected = selectedType === type;
            return (
              <button
                key={type}
                onClick={() => setSelectedType(type)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                  isSelected
                    ? 'bg-[#059669] text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200/80'
                }`}
              >
                {type === 'All' ? 'Semua Tipe' : type}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Content Layout: Sidebar Filters (Desktop) + Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
        {/* Desktop Sidebar Filters */}
        <div className="hidden lg:block bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs space-y-6 sticky top-24">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2 font-bold text-sm text-[#0B1E36]">
              <SlidersHorizontal className="w-4 h-4 text-[#059669]" />
              <span>Filter Peluang</span>
            </div>
            {hasActiveFilters && (
              <button
                onClick={resetFilters}
                className="text-xs font-semibold text-[#059669] hover:underline flex items-center gap-1"
              >
                <RotateCcw className="w-3 h-3" />
                Reset
              </button>
            )}
          </div>

          {/* Sistem Kerja (Arrangement) */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Sistem Kerja
            </label>
            <div className="space-y-1.5">
              {arrangements.map((arr) => (
                <label key={arr} className="flex items-center gap-2.5 text-xs text-slate-600 cursor-pointer hover:text-slate-900">
                  <input
                    type="radio"
                    name="arrangement"
                    checked={selectedWorkArrangement === arr}
                    onChange={() => setSelectedWorkArrangement(arr)}
                    className="accent-[#059669]"
                  />
                  <span>{arr === 'All' ? 'Semua Sistem' : arr}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Lokasi */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Lokasi / Kota
            </label>
            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="w-full text-xs p-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#059669]"
            >
              {locations.map((loc) => (
                <option key={loc} value={loc}>
                  {loc === 'All' ? 'Semua Lokasi' : loc}
                </option>
              ))}
            </select>
          </div>

          {/* Industri */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Bidang Industri
            </label>
            <select
              value={selectedIndustry}
              onChange={(e) => setSelectedIndustry(e.target.value)}
              className="w-full text-xs p-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#059669]"
            >
              {industries.map((ind) => (
                <option key={ind} value={ind}>
                  {ind === 'All' ? 'Semua Industri' : ind}
                </option>
              ))}
            </select>
          </div>

          {/* Age Safeguard Toggle */}
          <div className="pt-2 border-t border-slate-100">
            <label className="flex items-start gap-2.5 cursor-pointer">
              <input
                type="checkbox"
                checked={ageSafeOnly}
                onChange={(e) => setAgeSafeOnly(e.target.checked)}
                className="mt-0.5 accent-[#059669] rounded"
              />
              <span className="text-xs text-slate-700 leading-snug">
                <strong>Ramah Siswa SMK (&lt;18 Tahun)</strong>
                <span className="block text-[11px] text-slate-500 mt-0.5">
                  Hanya tampilkan peluang dengan perlindungan usia kerja sekolah
                </span>
              </span>
            </label>
          </div>
        </div>

        {/* Right Opportunities Grid */}
        <div className="lg:col-span-3 space-y-4">
          {/* Results Bar */}
          <div className="flex items-center justify-between bg-white px-5 py-3 rounded-2xl border border-slate-200/90 text-xs">
            <div className="font-bold text-slate-700">
              Menampilkan <span className="text-[#059669] font-extrabold">{filteredOpportunities.length}</span> Peluang Tersedia
            </div>

            <div className="flex items-center gap-2">
              <span className="text-slate-500 hidden sm:inline">Urutkan:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'match' | 'newest')}
                className="bg-slate-50 border border-slate-200 rounded-lg p-1.5 font-bold text-slate-700 focus:outline-none"
              >
                <option value="match">Kecocokan Tertinggi (Match %)</option>
                <option value="newest">Paling Baru Ditayangkan</option>
              </select>
            </div>
          </div>

          {/* Grid Cards (Responsive: 1 col on mobile, 2 col on tablet, 2-3 on wide) */}
          {filteredOpportunities.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 text-center border border-slate-200/80 space-y-4">
              <div className="w-16 h-16 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
                <Search className="w-8 h-8" />
              </div>
              <h3 className="font-bold text-lg text-[#0B1E36]">Tidak ada peluang yang cocok</h3>
              <p className="text-xs text-slate-500 max-w-md mx-auto">
                Coba ubah kata kunci pencarian Anda atau reset filter untuk melihat semua lowongan magang dan daily work lainnya.
              </p>
              <button
                onClick={resetFilters}
                className="px-5 py-2.5 rounded-xl bg-[#059669] text-white text-xs font-bold hover:bg-[#047857] transition-colors"
              >
                Reset Semua Filter
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredOpportunities.map((opp) => (
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
          )}
        </div>
      </div>
    </div>
  );
};
