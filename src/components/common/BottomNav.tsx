import React from 'react';
import { Home, Compass, MessageSquare, Briefcase, User, Sparkles } from 'lucide-react';

interface BottomNavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  onOpenAIModal: () => void;
  applicationsBadge?: number;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  activeTab,
  onTabChange,
  onOpenAIModal,
  applicationsBadge = 0,
}) => {
  const navItems = [
    { id: 'dashboard', label: 'Home', icon: Home },
    { id: 'opportunities', label: 'Explore', icon: Compass },
    { id: 'applications', label: 'Lamaran', icon: Briefcase, badge: applicationsBadge },
    { id: 'community', label: 'Komunitas', icon: MessageSquare },
    { id: 'profile', label: 'Profil', icon: User },
  ];

  return (
    <>
      {/* Floating Action Button for AI Assistant on mobile */}
      <div className="fixed bottom-20 right-4 z-40 lg:hidden">
        <button
          onClick={onOpenAIModal}
          className="w-13 h-13 rounded-full bg-gradient-to-tr from-[#059669] to-[#10B981] text-white shadow-xl shadow-emerald-700/40 flex items-center justify-center border-2 border-white ring-2 ring-emerald-500/20 active:scale-95 transition-transform"
          aria-label="Tanya Asisten AI"
        >
          <Sparkles className="w-6 h-6 animate-pulse" />
        </button>
      </div>

      {/* Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200/80 px-2 py-1.5 lg:hidden safe-area-bottom shadow-lg">
        <div className="flex items-center justify-around">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all relative ${
                  isActive ? 'text-[#059669] font-bold' : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                <div className="relative">
                  <Icon className={`w-5 h-5 transition-transform ${isActive ? 'scale-110 text-[#059669]' : ''}`} />
                  {item.badge && item.badge > 0 ? (
                    <span className="absolute -top-1.5 -right-2.5 min-w-[16px] h-4 px-1 rounded-full bg-[#059669] text-white text-[10px] font-extrabold flex items-center justify-center">
                      {item.badge}
                    </span>
                  ) : null}
                </div>
                <span className="text-[10px] mt-0.5 tracking-tight">{item.label}</span>
                {isActive && (
                  <span className="w-1 h-1 rounded-full bg-[#059669] mt-0.5" />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
};
