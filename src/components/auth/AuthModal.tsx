import React, { useState } from 'react';
import { Logo } from '../common/Logo';
import { UserRole } from '../../types';
import {
  X,
  User,
  Building2,
  Lock,
  Mail,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccessLogin: (role: UserRole, email: string) => void;
  onStartOnboarding: (role: UserRole) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onSuccessLogin,
  onStartOnboarding,
}) => {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [selectedRole, setSelectedRole] = useState<UserRole>('talent');
  const [email, setEmail] = useState('rizky.pratama@smkn1jakarta.sch.id');
  const [password, setPassword] = useState('••••••••');
  const [fullName, setFullName] = useState('Rizky Pratama');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === 'register') {
      onStartOnboarding(selectedRole);
      onClose();
    } else {
      onSuccessLogin(selectedRole, email);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-slate-200 animate-in fade-in duration-150 relative">
        <button
          onClick={onClose}
          className="absolute right-5 top-5 p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Brand Logo Prominently Displayed (PRD Section 6) */}
        <div className="text-center mb-6 pt-2">
          <Logo variant="vertical" size="lg" showTagline={true} className="mx-auto" />
        </div>

        {/* Tab Switcher: Masuk vs Daftar */}
        <div className="grid grid-cols-2 p-1 bg-slate-100 rounded-2xl mb-6 text-xs font-bold">
          <button
            onClick={() => setMode('login')}
            className={`py-2 rounded-xl transition-all ${
              mode === 'login' ? 'bg-white text-[#0B1E36] shadow-xs' : 'text-slate-500'
            }`}
          >
            Masuk Akun
          </button>
          <button
            onClick={() => setMode('register')}
            className={`py-2 rounded-xl transition-all ${
              mode === 'register' ? 'bg-white text-[#0B1E36] shadow-xs' : 'text-slate-500'
            }`}
          >
            Daftar Baru
          </button>
        </div>

        {/* Role Selector (PRD Section 4 & 6) */}
        <div className="mb-4">
          <label className="block text-xs font-bold text-slate-700 mb-1.5 text-center">
            {mode === 'register' ? 'Gabung ke InternMatch sebagai:' : 'Masuk sebagai Peran:'}
          </label>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <button
              type="button"
              onClick={() => setSelectedRole('talent')}
              className={`p-3 rounded-2xl border flex flex-col items-center gap-1.5 transition-all ${
                selectedRole === 'talent'
                  ? 'border-[#059669] bg-emerald-50/60 text-[#065F46] font-bold shadow-xs'
                  : 'border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              <User className="w-5 h-5 text-[#059669]" />
              <span>Talenta Vokasi (SMK)</span>
            </button>

            <button
              type="button"
              onClick={() => setSelectedRole('company')}
              className={`p-3 rounded-2xl border flex flex-col items-center gap-1.5 transition-all ${
                selectedRole === 'company'
                  ? 'border-blue-600 bg-blue-50/60 text-blue-900 font-bold shadow-xs'
                  : 'border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              <Building2 className="w-5 h-5 text-blue-600" />
              <span>Perusahaan Mitra</span>
            </button>
          </div>
        </div>

        {/* Form Inputs */}
        <form onSubmit={handleSubmit} className="space-y-3 text-xs">
          {mode === 'register' && (
            <div>
              <label className="block font-bold text-slate-700 mb-1">Nama Lengkap</label>
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Nama Anda..."
                className="w-full p-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-1 focus:ring-[#059669]"
              />
            </div>
          )}

          <div>
            <label className="block font-bold text-slate-700 mb-1">Alamat Email</label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="nama@email.com"
                className="w-full pl-10 pr-3 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-1 focus:ring-[#059669]"
              />
            </div>
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Kata Sandi</label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-3 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-1 focus:ring-[#059669]"
              />
            </div>
          </div>

          {mode === 'login' && (
            <div className="flex justify-end">
              <button type="button" className="text-[11px] text-[#059669] font-semibold hover:underline">
                Lupa Kata Sandi?
              </button>
            </div>
          )}

          <button
            type="submit"
            className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-[#059669] to-[#10B981] hover:from-[#047857] hover:to-[#059669] text-white font-extrabold text-xs flex items-center justify-center gap-2 shadow-md shadow-emerald-800/10 transition-all mt-4"
          >
            <span>{mode === 'register' ? 'Lanjut ke Onboarding Profil' : 'Masuk Sekarang'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          {/* Google Sign-in Alternative (PRD Section 6) */}
          <div className="pt-2">
            <button
              type="button"
              onClick={() => {
                onSuccessLogin(selectedRole, 'user.google@vokasi.id');
                onClose();
              }}
              className="w-full py-3 rounded-2xl border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-xs flex items-center justify-center gap-2 transition-colors"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <span>Lanjutkan dengan Akun Google</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
