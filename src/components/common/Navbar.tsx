import React, { useState } from 'react';
import { Logo } from './Logo';
import { UserRole, NotificationItem, TalentProfile, CompanyProfile } from '../../types';
import {
  Bell,
  User,
  Sparkles,
  Building2,
  Shield,
  Briefcase,
  Layers,
  GraduationCap,
  MessageSquare,
  ChevronDown,
  CheckCheck,
  ExternalLink,
  Menu,
  X,
  LogOut,
  Settings,
} from 'lucide-react';

interface NavbarProps {
  currentRole: UserRole;
  onRoleChange: (role: UserRole) => void;
  activeTab: string;
  onTabChange: (tab: string) => void;
  talentProfile: TalentProfile;
  companyProfile: CompanyProfile;
  notifications: NotificationItem[];
  onMarkNotificationAsRead: (id: string) => void;
  onOpenAIModal: () => void;
  onOpenAuthModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentRole,
  onRoleChange,
  activeTab,
  onTabChange,
  talentProfile,
  companyProfile,
  notifications,
  onMarkNotificationAsRead,
  onOpenAIModal,
  onOpenAuthModal,
}) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showRoleMenu, setShowRoleMenu] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const unreadNotificationsCount = notifications.filter((n) => !n.read).length;

  interface NavItem {
    id: string;
    label: string;
    icon: any;
    badge?: number;
  }

  const talentNavLinks: NavItem[] = [
    { id: 'dashboard', label: 'Beranda', icon: Layers },
    { id: 'opportunities', label: 'Peluang', icon: Briefcase },
    { id: 'applications', label: 'Lamaran Saya', icon: Layers, badge: 3 },
    { id: 'career-class', label: 'Kelas Karier', icon: GraduationCap },
    { id: 'community', label: 'Komunitas', icon: MessageSquare },
  ];

  const companyNavLinks: NavItem[] = [
    { id: 'company-dashboard', label: 'Dasbor Perusahaan', icon: Layers },
    { id: 'company-opportunities', label: 'Lowongan Aktif', icon: Briefcase },
    { id: 'company-applicants', label: 'Kelola Pelamar', icon: User, badge: 14 },
    { id: 'company-find-talent', label: 'Cari Talent Vokasi', icon: Sparkles },
    { id: 'company-profile', label: 'Profil Perusahaan', icon: Building2 },
  ];

  const adminNavLinks: NavItem[] = [
    { id: 'admin-overview', label: 'Ringkasan Platform', icon: Shield },
    { id: 'admin-moderation', label: 'Moderasi Komunitas', icon: MessageSquare },
    { id: 'admin-companies', label: 'Verifikasi Perusahaan', icon: Building2 },
  ];

  const navLinks = currentRole === 'talent'
    ? talentNavLinks
    : currentRole === 'company'
    ? companyNavLinks
    : adminNavLinks;

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 transition-all shadow-[0_1px_3px_rgba(0,0,0,0.03)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-18">
          {/* Left: Brand Logo */}
          <div className="flex items-center gap-6">
            <Logo
              variant="horizontal"
              size="md"
              onClick={() => onTabChange(currentRole === 'talent' ? 'dashboard' : currentRole === 'company' ? 'company-dashboard' : 'admin-overview')}
              className="cursor-pointer"
            />

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => {
                const isActive = activeTab === link.id;
                return (
                  <button
                    key={link.id}
                    onClick={() => onTabChange(link.id)}
                    className={`px-3.5 py-2 rounded-xl text-sm font-semibold transition-all relative flex items-center gap-2 ${
                      isActive
                        ? 'text-[#059669] bg-[#ECFDF5]'
                        : 'text-[#475569] hover:text-[#0B1E36] hover:bg-slate-100/80'
                    }`}
                  >
                    <span>{link.label}</span>
                    {link.badge && (
                      <span className="w-5 h-5 rounded-full bg-[#059669] text-white text-[11px] font-bold flex items-center justify-center">
                        {link.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            {/* AI Career Assistant Button (Talent only or universal) */}
            <button
              onClick={onOpenAIModal}
              className="hidden sm:inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold text-white bg-gradient-to-r from-[#059669] to-[#10B981] hover:from-[#047857] hover:to-[#059669] shadow-sm hover:shadow transition-all group"
            >
              <Sparkles className="w-3.5 h-3.5 animate-spin-slow text-emerald-100" />
              <span>Asisten AI</span>
              <span className="text-[10px] bg-white/20 px-1.5 py-0.2 rounded font-mono">Gemini</span>
            </button>

            {/* Role Switcher Pill / Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowRoleMenu(!showRoleMenu)}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 text-xs font-semibold text-[#0B1E36] transition-all"
                title="Beralih peran demo"
              >
                {currentRole === 'talent' && <User className="w-3.5 h-3.5 text-[#059669]" />}
                {currentRole === 'company' && <Building2 className="w-3.5 h-3.5 text-blue-600" />}
                {currentRole === 'admin' && <Shield className="w-3.5 h-3.5 text-amber-600" />}
                <span className="hidden md:inline capitalize">{currentRole} Mode</span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>

              {showRoleMenu && (
                <div
                  className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-slate-200 py-1.5 z-50 text-xs animate-in fade-in slide-in-from-top-2 duration-150"
                  onClick={() => setShowRoleMenu(false)}
                >
                  <div className="px-3 py-1.5 text-[11px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100">
                    Ganti Peran Pengguna
                  </div>
                  <button
                    onClick={() => {
                      onRoleChange('talent');
                      onTabChange('dashboard');
                    }}
                    className={`w-full px-3 py-2 text-left flex items-center gap-2 hover:bg-slate-50 transition-colors ${
                      currentRole === 'talent' ? 'text-[#059669] font-bold bg-emerald-50/50' : 'text-slate-700'
                    }`}
                  >
                    <User className="w-4 h-4 text-[#059669]" />
                    <div>
                      <div className="font-semibold">Talent Vokasi</div>
                      <div className="text-[11px] text-slate-500 font-normal">Rizky Pratama (SMK RPL)</div>
                    </div>
                  </button>

                  <button
                    onClick={() => {
                      onRoleChange('company');
                      onTabChange('company-dashboard');
                    }}
                    className={`w-full px-3 py-2 text-left flex items-center gap-2 hover:bg-slate-50 transition-colors ${
                      currentRole === 'company' ? 'text-blue-600 font-bold bg-blue-50/50' : 'text-slate-700'
                    }`}
                  >
                    <Building2 className="w-4 h-4 text-blue-600" />
                    <div>
                      <div className="font-semibold">Perusahaan / Mitra</div>
                      <div className="text-[11px] text-slate-500 font-normal">PT Digital Nusantara Solusindo</div>
                    </div>
                  </button>

                  <button
                    onClick={() => {
                      onRoleChange('admin');
                      onTabChange('admin-overview');
                    }}
                    className={`w-full px-3 py-2 text-left flex items-center gap-2 hover:bg-slate-50 transition-colors ${
                      currentRole === 'admin' ? 'text-amber-600 font-bold bg-amber-50/50' : 'text-slate-700'
                    }`}
                  >
                    <Shield className="w-4 h-4 text-amber-600" />
                    <div>
                      <div className="font-semibold">Admin InternMatch</div>
                      <div className="text-[11px] text-slate-500 font-normal">Superadmin & Moderasi</div>
                    </div>
                  </button>

                  <div className="border-t border-slate-100 mt-1 pt-1">
                    <button
                      onClick={onOpenAuthModal}
                      className="w-full px-3 py-2 text-left text-slate-600 hover:bg-slate-50 flex items-center gap-2 font-medium"
                    >
                      <LogOut className="w-3.5 h-3.5 text-slate-400" />
                      <span>Masuk / Daftar Akun Baru</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Notifications Bell */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="p-2 rounded-xl text-slate-600 hover:text-[#0B1E36] hover:bg-slate-100 transition-colors relative"
                title="Notifikasi"
              >
                <Bell className="w-5 h-5" />
                {unreadNotificationsCount > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 rounded-full bg-[#10B981] ring-2 ring-white animate-pulse" />
                )}
              </button>

              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-xl border border-slate-200 z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="p-3.5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-sm text-[#0B1E36]">Notifikasi</h4>
                      {unreadNotificationsCount > 0 && (
                        <span className="text-xs px-2 py-0.5 rounded-full bg-[#ECFDF5] text-[#059669] font-bold">
                          {unreadNotificationsCount} Baru
                        </span>
                      )}
                    </div>
                    <button
                      onClick={() => notifications.forEach((n) => onMarkNotificationAsRead(n.id))}
                      className="text-xs text-[#059669] hover:underline font-semibold flex items-center gap-1"
                    >
                      <CheckCheck className="w-3.5 h-3.5" />
                      Tandai sudah dibaca
                    </button>
                  </div>

                  <div className="max-h-80 overflow-y-auto divide-y divide-slate-100">
                    {notifications.length === 0 ? (
                      <div className="p-6 text-center text-xs text-slate-400">Belum ada notifikasi</div>
                    ) : (
                      notifications.map((notif) => (
                        <div
                          key={notif.id}
                          onClick={() => {
                            onMarkNotificationAsRead(notif.id);
                            if (notif.actionUrl) onTabChange(notif.actionUrl);
                            setShowNotifications(false);
                          }}
                          className={`p-3.5 transition-colors cursor-pointer hover:bg-slate-50 flex gap-3 ${
                            !notif.read ? 'bg-emerald-50/30' : ''
                          }`}
                        >
                          <div className={`w-2 h-2 mt-1.5 rounded-full shrink-0 ${
                            !notif.read ? 'bg-[#10B981]' : 'bg-transparent'
                          }`} />
                          <div className="flex-1">
                            <h5 className="font-bold text-xs text-[#0B1E36]">{notif.title}</h5>
                            <p className="text-xs text-slate-600 mt-0.5 line-clamp-2 leading-relaxed">
                              {notif.message}
                            </p>
                            <span className="text-[10px] text-slate-400 mt-1 block font-medium">
                              {notif.time}
                            </span>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Profile Avatar / Trigger */}
            <div className="relative">
              <button
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="flex items-center gap-2 p-1 pl-1 sm:pr-2.5 rounded-full border border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-all"
              >
                <img
                  src={currentRole === 'talent' ? talentProfile.avatar : currentRole === 'company' ? companyProfile.logo : 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'}
                  alt="Avatar"
                  className="w-8 h-8 rounded-full object-cover ring-2 ring-emerald-500/20"
                />
                <span className="hidden sm:inline text-xs font-bold text-[#0B1E36] max-w-[100px] truncate">
                  {currentRole === 'talent' ? talentProfile.fullName.split(' ')[0] : currentRole === 'company' ? 'PT Digital' : 'Admin'}
                </span>
                <ChevronDown className="w-3 h-3 text-slate-400 hidden sm:inline" />
              </button>

              {showProfileMenu && (
                <div
                  className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-slate-200 p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
                  onClick={() => setShowProfileMenu(false)}
                >
                  <div className="p-3 border-b border-slate-100 bg-slate-50/50 rounded-xl mb-1">
                    <div className="font-bold text-xs text-[#0B1E36]">
                      {currentRole === 'talent' ? talentProfile.fullName : companyProfile.name}
                    </div>
                    <div className="text-[11px] text-slate-500 mt-0.5">
                      {currentRole === 'talent' ? talentProfile.education.school : companyProfile.industry}
                    </div>
                    {currentRole === 'talent' && (
                      <div className="mt-2 pt-2 border-t border-slate-200/60 flex items-center justify-between text-[11px]">
                        <span className="text-slate-600 font-medium">Kelengkapan Profil:</span>
                        <span className="font-bold text-[#059669]">
                          {talentProfile.profileCompletionPercentage}%
                        </span>
                      </div>
                    )}
                  </div>

                  <button
                    onClick={() => onTabChange(currentRole === 'talent' ? 'profile' : 'company-profile')}
                    className="w-full px-3 py-2 text-left text-xs font-semibold text-slate-700 hover:bg-slate-50 rounded-lg flex items-center gap-2"
                  >
                    <User className="w-4 h-4 text-slate-400" />
                    <span>Lihat Profil Saya</span>
                  </button>

                  {currentRole === 'talent' && (
                    <button
                      onClick={() => onTabChange('applications')}
                      className="w-full px-3 py-2 text-left text-xs font-semibold text-slate-700 hover:bg-slate-50 rounded-lg flex items-center gap-2"
                    >
                      <Layers className="w-4 h-4 text-slate-400" />
                      <span>Status Lamaran</span>
                    </button>
                  )}

                  <button
                    onClick={onOpenAuthModal}
                    className="w-full px-3 py-2 text-left text-xs font-semibold text-red-600 hover:bg-red-50 rounded-lg flex items-center gap-2 mt-1 border-t border-slate-100"
                  >
                    <LogOut className="w-4 h-4 text-red-500" />
                    <span>Keluar Akun</span>
                  </button>
                </div>
              )}
            </div>

            {/* Mobile Hamburger menu */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-slate-600 hover:bg-slate-100"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-2 pb-4 space-y-1">
          {navLinks.map((link) => {
            const isActive = activeTab === link.id;
            return (
              <button
                key={link.id}
                onClick={() => {
                  onTabChange(link.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full px-3.5 py-2.5 rounded-xl text-sm font-semibold flex items-center justify-between ${
                  isActive
                    ? 'text-[#059669] bg-[#ECFDF5]'
                    : 'text-[#475569] hover:bg-slate-50'
                }`}
              >
                <span>{link.label}</span>
                {link.badge && (
                  <span className="w-5 h-5 rounded-full bg-[#059669] text-white text-[11px] font-bold flex items-center justify-center">
                    {link.badge}
                  </span>
                )}
              </button>
            );
          })}

          <div className="pt-2 border-t border-slate-100">
            <button
              onClick={() => {
                onOpenAIModal();
                setMobileMenuOpen(false);
              }}
              className="w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-[#059669] to-[#10B981] text-white text-xs font-bold flex items-center justify-center gap-2 shadow-sm"
            >
              <Sparkles className="w-4 h-4 text-emerald-100" />
              <span>Buka Asisten AI Karier Vokasi</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
