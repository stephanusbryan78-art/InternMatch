import React, { useState, useRef, useEffect } from 'react';
import { TalentProfile } from '../../types';
import { askAICareerAssistant, AIChatMessage } from '../../services/aiService';
import {
  Sparkles,
  Send,
  X,
  Bot,
  User,
  HelpCircle,
  FileCheck,
  TrendingUp,
  Award,
  Briefcase,
  ChevronRight,
  RotateCcw,
} from 'lucide-react';

interface AICareerAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
  talentProfile: TalentProfile;
}

export const AICareerAssistantModal: React.FC<AICareerAssistantModalProps> = ({
  isOpen,
  onClose,
  talentProfile,
}) => {
  const [messages, setMessages] = useState<AIChatMessage[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: `### 👋 Halo, ${talentProfile.fullName}!

Saya adalah **AI Career Assistant** InternMatch. Saya membaca profil Anda sebagai talenta jurusan **${talentProfile.education.major}** dari **${talentProfile.education.school}**.

Dengan filosofi **DISCOVER → MATCH → WORK → PROVE → GROW**, apa yang ingin Anda persiapkan hari ini?`,
      timestamp: 'Baru saja',
      actionSuggestions: [
        'Review Portofolio & CV Saya',
        'Simulasi Pertanyaan Interview Magang',
        'Analisis Keterampilan yang Harus Ditingkatkan',
        'Cara Menaikkan Skor Reputasi ke 95+',
      ],
    },
  ]);

  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const quickActions = [
    {
      label: 'Review CV & Portofolio',
      icon: FileCheck,
      prompt: 'Tolong review profil, portofolio, dan keahlian saya untuk posisi junior developer / magang. Apa yang perlu diperbaiki?',
      mode: 'cv_review' as const,
    },
    {
      label: 'Persiapan Interview',
      icon: HelpCircle,
      prompt: 'Saya ada panggilan interview magang. Berikan 4 pertanyaan interview teknis dan soft skills yang sering ditanyakan untuk anak SMK beserta tips jawabnya!',
      mode: 'interview_prep' as const,
    },
    {
      label: 'Analisis Gap Keahlian',
      icon: TrendingUp,
      prompt: 'Analisis keahlian saya saat ini. Keterampilan teknologi apa yang paling cepat membuat saya dilirik perusahaan dan mendapat uang saku tinggi?',
      mode: 'skill_gap' as const,
    },
    {
      label: 'Tingkatkan Reputasi',
      icon: Award,
      prompt: 'Bagaimana strategi tercepat menaikkan skor reputasi saya di InternMatch agar masuk radar prioritas HRD?',
      mode: 'profile_boost' as const,
    },
  ];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  if (!isOpen) return null;

  const handleSendMessage = async (textToSend?: string, mode?: any) => {
    const text = textToSend || inputMessage;
    if (!text.trim() || isLoading) return;

    const userMsg: AIChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: text,
      timestamp: 'Baru saja',
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const reply = await askAICareerAssistant(text, talentProfile, mode);

      const assistantMsg: AIChatMessage = {
        id: `ai-${Date.now()}`,
        role: 'assistant',
        content: reply,
        timestamp: 'Baru saja',
      };

      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          id: `ai-err-${Date.now()}`,
          role: 'assistant',
          content: 'Maaf, terjadi gangguan koneksi. Silakan coba kembali pertanyaan Anda.',
          timestamp: 'Baru saja',
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-0 sm:p-4">
      <div className="bg-white w-full sm:max-w-4xl h-full sm:h-[88vh] sm:rounded-3xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden animate-in fade-in duration-200">
        {/* Header */}
        <div className="px-6 py-4 bg-gradient-to-r from-[#0B1E36] via-[#102A4C] to-[#047857] text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/10 backdrop-blur flex items-center justify-center border border-white/20">
              <Sparkles className="w-5 h-5 text-[#34D399]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-extrabold text-base tracking-tight">AI Career Assistant</h3>
                <span className="px-2 py-0.5 rounded-full bg-[#10B981]/30 text-[#34D399] text-[10px] font-mono font-bold border border-[#10B981]/40">
                  Gemini Flash 3.8
                </span>
              </div>
              <p className="text-[11px] text-slate-300">
                Copilot Karier & Persiapan Kerja Terkurasi untuk Lulusan Vokasi
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setMessages([messages[0]]);
              }}
              className="p-2 rounded-xl text-slate-300 hover:text-white hover:bg-white/10 text-xs flex items-center gap-1 transition-colors"
              title="Reset Percakapan"
            >
              <RotateCcw className="w-4 h-4" />
              <span className="hidden sm:inline">Reset</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Quick Action Chips Bar */}
        <div className="bg-slate-50 border-b border-slate-200/80 px-6 py-2.5 overflow-x-auto flex items-center gap-2 shrink-0 no-scrollbar">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider whitespace-nowrap">
            Aksi Cepat:
          </span>
          {quickActions.map((qa, i) => {
            const Icon = qa.icon;
            return (
              <button
                key={i}
                onClick={() => handleSendMessage(qa.prompt, qa.mode)}
                disabled={isLoading}
                className="px-3 py-1.5 rounded-full bg-white hover:bg-emerald-50 border border-slate-200 hover:border-emerald-300 text-slate-700 hover:text-[#059669] text-xs font-semibold whitespace-nowrap flex items-center gap-1.5 transition-all shadow-2xs disabled:opacity-50"
              >
                <Icon className="w-3.5 h-3.5 text-[#059669]" />
                <span>{qa.label}</span>
              </button>
            );
          })}
        </div>

        {/* Chat Messages Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 bg-[#F8FAFC]">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-3 max-w-2xl ${
                msg.role === 'user' ? 'ml-auto flex-row-reverse' : 'mr-auto'
              }`}
            >
              <div
                className={`w-8 h-8 rounded-full shrink-0 flex items-center justify-center text-xs font-bold ${
                  msg.role === 'user'
                    ? 'bg-[#0B1E36] text-white'
                    : 'bg-gradient-to-tr from-[#059669] to-[#10B981] text-white shadow-xs'
                }`}
              >
                {msg.role === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>

              <div
                className={`p-4 rounded-3xl text-xs sm:text-sm leading-relaxed ${
                  msg.role === 'user'
                    ? 'bg-[#0B1E36] text-white rounded-tr-xs'
                    : 'bg-white text-slate-800 border border-slate-200/90 rounded-tl-xs shadow-xs'
                }`}
              >
                <div className="prose prose-sm max-w-none text-slate-800 font-sans space-y-2 whitespace-pre-wrap">
                  {msg.content}
                </div>

                {msg.actionSuggestions && (
                  <div className="mt-3 pt-3 border-t border-slate-100 flex flex-wrap gap-1.5">
                    {msg.actionSuggestions.map((sug, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSendMessage(sug)}
                        className="px-2.5 py-1 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-[#065F46] font-semibold text-[11px] transition-colors text-left"
                      >
                        👉 {sug}
                      </button>
                    ))}
                  </div>
                )}

                <span
                  className={`text-[10px] block mt-1.5 ${
                    msg.role === 'user' ? 'text-slate-400 text-right' : 'text-slate-400'
                  }`}
                >
                  {msg.timestamp}
                </span>
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex gap-3 max-w-md mr-auto">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#059669] to-[#10B981] text-white flex items-center justify-center shrink-0">
                <Bot className="w-4 h-4" />
              </div>
              <div className="p-4 rounded-3xl bg-white border border-slate-200 text-xs text-slate-500 rounded-tl-xs shadow-xs flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#059669] animate-spin" />
                <span>Asisten AI sedang menyusun analisis karier Anda...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Chat Input Bar */}
        <div className="p-4 bg-white border-t border-slate-200/90 shrink-0">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Tanyakan apa saja tentang persiapan karier, CV, wawancara, atau magang..."
              className="flex-1 text-xs sm:text-sm px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#059669] focus:bg-white text-slate-800 placeholder:text-slate-400 font-medium"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={!inputMessage.trim() || isLoading}
              className="px-5 py-3 rounded-2xl bg-[#059669] hover:bg-[#047857] disabled:opacity-40 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm transition-all shrink-0"
            >
              <span>Kirim</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
          <div className="mt-2 text-center text-[10px] text-slate-400">
            Asisten AI InternMatch memberikan rekomendasi karier berbasis data vokasi, bukan keputusan mutlak.
          </div>
        </div>
      </div>
    </div>
  );
};
