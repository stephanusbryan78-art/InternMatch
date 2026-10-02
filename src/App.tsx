/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { UserRole, Opportunity, TalentProfile, Application, ApplicationStatus, CommunityPost, CareerClass } from './types';
import {
  initialTalentProfile,
  additionalTalents,
  currentCompanyProfile,
  initialOpportunities,
  initialApplications,
  initialCareerClasses,
  initialCommunityPosts,
  initialNotifications,
} from './data/mockData';
import { Navbar } from './components/common/Navbar';
import { BottomNav } from './components/common/BottomNav';
import { TalentDashboard } from './components/talent/TalentDashboard';
import { TalentProfileView } from './components/talent/TalentProfileView';
import { OpportunityMarketplace } from './components/opportunities/OpportunityMarketplace';
import { OpportunityDetailModal } from './components/opportunities/OpportunityDetailModal';
import { ApplicationManagement } from './components/applications/ApplicationManagement';
import { AICareerAssistantModal } from './components/ai/AICareerAssistantModal';
import { CareerClassView } from './components/careerclass/CareerClassView';
import { CommunityView } from './components/community/CommunityView';
import { CompanyDashboard } from './components/company/CompanyDashboard';
import { FindTalentView } from './components/company/FindTalentView';
import { AdminPanel } from './components/admin/AdminPanel';
import { AuthModal } from './components/auth/AuthModal';
import { TalentOnboardingModal } from './components/onboarding/TalentOnboardingModal';
import { Sparkles, CheckCircle2, Star, Shield, ArrowRight } from 'lucide-react';

export default function App() {
  // Primary States
  const [currentRole, setCurrentRole] = useState<UserRole>('talent');
  const [activeTab, setActiveTab] = useState<string>('dashboard');

  // Core Data Entities
  const [talentProfile, setTalentProfile] = useState<TalentProfile>(initialTalentProfile);
  const [companyProfile, setCompanyProfile] = useState(currentCompanyProfile);
  const [opportunities, setOpportunities] = useState<Opportunity[]>(initialOpportunities);
  const [applications, setApplications] = useState<Application[]>(initialApplications);
  const [careerClasses, setCareerClasses] = useState<CareerClass[]>(initialCareerClasses);
  const [communityPosts, setCommunityPosts] = useState<CommunityPost[]>(initialCommunityPosts);
  const [notifications, setNotifications] = useState(initialNotifications);
  const [savedOpportunityIds, setSavedOpportunityIds] = useState<string[]>(['opp-1']);

  // Modals
  const [selectedOpportunity, setSelectedOpportunity] = useState<Opportunity | null>(null);
  const [isAIModalOpen, setIsAIModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isOnboardingOpen, setIsOnboardingOpen] = useState(false);
  const [quickToast, setQuickToast] = useState<string | null>(null);

  const showToast = (message: string) => {
    setQuickToast(message);
    setTimeout(() => setQuickToast(null), 3500);
  };

  // Toggle Save Opportunity
  const handleToggleSaveOpportunity = (oppId: string) => {
    if (savedOpportunityIds.includes(oppId)) {
      setSavedOpportunityIds(savedOpportunityIds.filter((id) => id !== oppId));
      showToast('Peluang dihapus dari daftar simpanan');
    } else {
      setSavedOpportunityIds([...savedOpportunityIds, oppId]);
      showToast('Peluang berhasil disimpan ke daftar minat Anda');
    }
  };

  // Submit Application
  const handleApplyOpportunity = (opportunity: Opportunity, note: string) => {
    const isAlreadyApplied = applications.some((a) => a.opportunityId === opportunity.id);
    if (isAlreadyApplied) {
      showToast('Anda sudah pernah mengajukan lamaran untuk posisi ini');
      return;
    }

    const newApp: Application = {
      id: `app-${Date.now()}`,
      opportunityId: opportunity.id,
      talentId: talentProfile.id,
      opportunity,
      appliedDate: 'Hari ini',
      status: 'Applied',
      notes: note,
    };

    setApplications([newApp, ...applications]);

    // Add notification
    const newNotif = {
      id: `notif-${Date.now()}`,
      type: 'application' as const,
      title: 'Lamaran Berhasil Terkirim',
      message: `Lamaran Anda untuk posisi ${opportunity.title} di ${opportunity.companyName} telah diterima sistem.`,
      time: 'Baru saja',
      read: false,
      actionUrl: 'applications',
    };
    setNotifications([newNotif, ...notifications]);

    showToast(`Lamaran terkirim ke ${opportunity.companyName}!`);
  };

  // Update Application Status
  const handleUpdateApplicationStatus = (appId: string, newStatus: ApplicationStatus) => {
    setApplications(
      applications.map((app) => (app.id === appId ? { ...app, status: newStatus } : app))
    );
    showToast(`Status lamaran diperbarui ke "${newStatus}"`);
  };

  // Give Employer Feedback
  const handleAddEmployerFeedback = (feedback: {
    talentId: string;
    opportunityTitle: string;
    rating: number;
    comment: string;
    badges: string[];
  }) => {
    const newFeedbackItem = {
      id: `fb-${Date.now()}`,
      companyName: companyProfile.name,
      companyLogo: companyProfile.logo,
      opportunityTitle: feedback.opportunityTitle,
      rating: feedback.rating,
      comment: feedback.comment,
      date: 'Hari ini',
      verified: true,
      badges: feedback.badges,
    };

    const newReputation = Math.min(99, talentProfile.reputationScore + 8);

    setTalentProfile({
      ...talentProfile,
      employerFeedback: [newFeedbackItem, ...talentProfile.employerFeedback],
      completedOpportunitiesCount: talentProfile.completedOpportunitiesCount + 1,
      reputationScore: newReputation,
    });

    const notif = {
      id: `notif-fb-${Date.now()}`,
      type: 'reputation' as const,
      title: 'Skor Reputasi Naik (+8 Poin)!',
      message: `${companyProfile.name} telah memverifikasi kinerja Anda dengan ulasan bintang ${feedback.rating}.0.`,
      time: 'Baru saja',
      read: false,
      actionUrl: 'profile',
    };
    setNotifications([notif, ...notifications]);

    showToast('Ulasan resmi perusahaan berhasil diterbitkan ke reputasi talent!');
  };

  // Post New Opportunity
  const handleAddNewOpportunity = (newOppData: Partial<Opportunity>) => {
    const opp: Opportunity = {
      id: `opp-${Date.now()}`,
      companyId: companyProfile.id,
      companyName: companyProfile.name,
      companyLogo: companyProfile.logo,
      companyVerified: true,
      title: newOppData.title || 'Posisi Baru',
      type: newOppData.type || 'Internship',
      industry: newOppData.industry || companyProfile.industry,
      location: newOppData.location || companyProfile.location,
      workArrangement: newOppData.workArrangement || 'Hybrid',
      compensation: newOppData.compensation || 'Sesuai Standar',
      duration: newOppData.duration || '3 Bulan',
      description: newOppData.description || '',
      responsibilities: newOppData.responsibilities || ['Membantu proyek tim.'],
      requirements: newOppData.requirements || ['Siswa SMK / Vokasi.'],
      requiredSkills: newOppData.requiredSkills || ['Komunikasi', 'Keahlian Dasar'],
      postedDate: 'Baru saja',
      deadline: newOppData.deadline || '30 Hari ke depan',
      totalApplicants: 0,
      status: 'Open',
      ageSafeBadge: newOppData.ageSafeBadge ?? true,
    };

    setOpportunities([opp, ...opportunities]);
    showToast('Peluang baru berhasil dipublikasikan di marketplace!');
  };

  // Career Class Registration & Completion
  const handleRegisterClass = (classId: string) => {
    setCareerClasses(
      careerClasses.map((c) =>
        c.id === classId ? { ...c, isRegistered: true, registeredCount: c.registeredCount + 1 } : c
      )
    );
    showToast('Anda berhasil terdaftar di Kelas Karier Vokasi!');
  };

  const handleCompleteClass = (classId: string, badgeName: string) => {
    setCareerClasses(
      careerClasses.map((c) => (c.id === classId ? { ...c, isCompleted: true } : c))
    );

    if (!talentProfile.careerClassAchievements.includes(badgeName)) {
      setTalentProfile({
        ...talentProfile,
        careerClassAchievements: [badgeName, ...talentProfile.careerClassAchievements],
        reputationScore: Math.min(100, talentProfile.reputationScore + 4),
      });
    }

    showToast(`Sertifikat "${badgeName}" berhasil ditambahkan ke profil Anda! (+4 Skor)`);
  };

  // Community Interactions
  const handleAddCommunityPost = (postData: Partial<CommunityPost>) => {
    const newPost: CommunityPost = {
      id: `post-${Date.now()}`,
      authorId: talentProfile.id,
      authorName: talentProfile.fullName,
      authorRole: `${talentProfile.education.level} ${talentProfile.education.major}`,
      authorAvatar: talentProfile.avatar,
      category: postData.category || 'Career',
      title: postData.title || '',
      content: postData.content || '',
      tags: postData.tags || ['Vokasi'],
      likes: 1,
      isLiked: true,
      comments: [],
      createdAt: 'Baru saja',
    };

    setCommunityPosts([newPost, ...communityPosts]);
    showToast('Diskusi baru Anda berhasil diterbitkan di komunitas!');
  };

  const handleLikeCommunityPost = (postId: string) => {
    setCommunityPosts(
      communityPosts.map((p) => {
        if (p.id === postId) {
          return {
            ...p,
            likes: p.isLiked ? p.likes - 1 : p.likes + 1,
            isLiked: !p.isLiked,
          };
        }
        return p;
      })
    );
  };

  const handleAddCommunityComment = (postId: string, commentText: string) => {
    const newComment = {
      id: `c-${Date.now()}`,
      authorName: talentProfile.fullName,
      authorRole: `${talentProfile.education.major}`,
      authorAvatar: talentProfile.avatar,
      content: commentText,
      createdAt: 'Baru saja',
      likes: 0,
    };

    setCommunityPosts(
      communityPosts.map((p) => {
        if (p.id === postId) {
          return {
            ...p,
            comments: [...p.comments, newComment],
          };
        }
        return p;
      })
    );

    showToast('Tanggapan Anda berhasil dikirim');
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0B1E36] flex flex-col font-['Plus_Jakarta_Sans',sans-serif] selection:bg-[#059669]/20 selection:text-[#047857]">
      {/* Toast Notification Banner */}
      {quickToast && (
        <div className="fixed top-20 right-4 z-50 bg-[#0B1E36] text-white text-xs font-bold px-4 py-3 rounded-2xl shadow-xl border border-slate-700 flex items-center gap-2 animate-in fade-in slide-in-from-top-2">
          <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0" />
          <span>{quickToast}</span>
        </div>
      )}

      {/* Main Top Navigation */}
      <Navbar
        currentRole={currentRole}
        onRoleChange={(role) => setCurrentRole(role)}
        activeTab={activeTab}
        onTabChange={(tab) => setActiveTab(tab)}
        talentProfile={talentProfile}
        companyProfile={companyProfile}
        notifications={notifications}
        onMarkNotificationAsRead={(id) => {
          setNotifications(
            notifications.map((n) => (n.id === id ? { ...n, read: true } : n))
          );
        }}
        onOpenAIModal={() => setIsAIModalOpen(true)}
        onOpenAuthModal={() => setIsAuthModalOpen(true)}
      />

      {/* Main Container Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-24 lg:pb-12">
        {/* Talent Views */}
        {currentRole === 'talent' && (
          <>
            {activeTab === 'dashboard' && (
              <TalentDashboard
                talentProfile={talentProfile}
                opportunities={opportunities}
                applications={applications}
                careerClasses={careerClasses}
                communityPosts={communityPosts}
                onSelectOpportunity={(opp) => setSelectedOpportunity(opp)}
                onNavigateTab={(tab) => setActiveTab(tab)}
                onOpenAIModal={() => setIsAIModalOpen(true)}
                savedOpportunityIds={savedOpportunityIds}
                onToggleSave={handleToggleSaveOpportunity}
              />
            )}

            {activeTab === 'opportunities' && (
              <OpportunityMarketplace
                opportunities={opportunities}
                talentProfile={talentProfile}
                onSelectOpportunity={(opp) => setSelectedOpportunity(opp)}
                savedOpportunityIds={savedOpportunityIds}
                onToggleSave={handleToggleSaveOpportunity}
              />
            )}

            {activeTab === 'applications' && (
              <ApplicationManagement
                applications={applications}
                talentProfile={talentProfile}
                onUpdateStatus={handleUpdateApplicationStatus}
                onNavigateOpportunities={() => setActiveTab('opportunities')}
                onOpenAIModal={() => setIsAIModalOpen(true)}
              />
            )}

            {activeTab === 'profile' && (
              <TalentProfileView
                profile={talentProfile}
                onUpdateProfile={(updated) => {
                  setTalentProfile(updated);
                  showToast('Profil dan data reputasi berhasil diperbarui');
                }}
                onOpenAIModal={() => setIsAIModalOpen(true)}
                onExploreOpportunities={() => setActiveTab('opportunities')}
              />
            )}

            {activeTab === 'career-class' && (
              <CareerClassView
                careerClasses={careerClasses}
                talentProfile={talentProfile}
                onRegister={handleRegisterClass}
                onCompleteClass={handleCompleteClass}
              />
            )}

            {activeTab === 'community' && (
              <CommunityView
                posts={communityPosts}
                talentProfile={talentProfile}
                onAddPost={handleAddCommunityPost}
                onLikePost={handleLikeCommunityPost}
                onAddComment={handleAddCommunityComment}
              />
            )}
          </>
        )}

        {/* Company Views */}
        {currentRole === 'company' && (
          <>
            {(activeTab === 'company-dashboard' || activeTab === 'company-opportunities' || activeTab === 'company-applicants' || activeTab === 'company-profile') && (
              <CompanyDashboard
                companyProfile={companyProfile}
                opportunities={opportunities}
                applications={applications}
                talentProfile={talentProfile}
                onAddNewOpportunity={handleAddNewOpportunity}
                onUpdateApplicationStatus={handleUpdateApplicationStatus}
                onAddEmployerFeedback={handleAddEmployerFeedback}
                onNavigateTab={(tab) => setActiveTab(tab)}
              />
            )}

            {activeTab === 'company-find-talent' && (
              <FindTalentView
                talents={[talentProfile, ...additionalTalents]}
                onInviteTalent={(t) => showToast(`Undangan melamar berhasil dikirim ke ${t.fullName}`)}
                onViewTalentProfile={(t) => {
                  setTalentProfile(t);
                  setCurrentRole('talent');
                  setActiveTab('profile');
                  showToast(`Melihat profil reputasi ${t.fullName}`);
                }}
              />
            )}
          </>
        )}

        {/* Admin Views */}
        {currentRole === 'admin' && (
          <AdminPanel
            opportunities={opportunities}
            communityPosts={communityPosts}
            careerClasses={careerClasses}
            onToggleVerifyCompany={(comp) => showToast(`Status verifikasi ${comp} diperbarui`)}
            onRemoveOpportunity={(id) => {
              setOpportunities(opportunities.filter((o) => o.id !== id));
              showToast('Peluang kerja dihapus oleh admin');
            }}
            onRemovePost={(id) => {
              setCommunityPosts(communityPosts.filter((p) => p.id !== id));
              showToast('Postingan komunitas berhasil dimoderasi');
            }}
          />
        )}
      </main>

      {/* Mobile Bottom Navigation (PRD Section 32 & 34) */}
      <BottomNav
        activeTab={activeTab}
        onTabChange={(tab) => setActiveTab(tab)}
        onOpenAIModal={() => setIsAIModalOpen(true)}
        applicationsBadge={applications.filter((a) => a.status === 'Interview').length}
      />

      {/* Opportunity Detail Modal with Transparent Rule-Based Match (PRD Section 11 & 12) */}
      <OpportunityDetailModal
        opportunity={selectedOpportunity}
        talentProfile={talentProfile}
        onClose={() => setSelectedOpportunity(null)}
        onApply={(opp, note) => {
          handleApplyOpportunity(opp, note);
        }}
        isApplied={applications.some((a) => a.opportunityId === selectedOpportunity?.id)}
        isSaved={selectedOpportunity ? savedOpportunityIds.includes(selectedOpportunity.id) : false}
        onToggleSave={handleToggleSaveOpportunity}
      />

      {/* AI Career Assistant Modal (PRD Section 14 & 15) */}
      <AICareerAssistantModal
        isOpen={isAIModalOpen}
        onClose={() => setIsAIModalOpen(false)}
        talentProfile={talentProfile}
      />

      {/* Authentication Modal (PRD Section 6) */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onSuccessLogin={(role, email) => {
          setCurrentRole(role);
          setActiveTab(role === 'talent' ? 'dashboard' : 'company-dashboard');
          showToast(`Berhasil masuk sebagai ${role === 'talent' ? talentProfile.fullName : companyProfile.name}`);
        }}
        onStartOnboarding={(role) => {
          setCurrentRole(role);
          setIsOnboardingOpen(true);
        }}
      />

      {/* Talent Onboarding Multi-Step Wizard (PRD Section 7) */}
      <TalentOnboardingModal
        isOpen={isOnboardingOpen}
        onClose={() => setIsOnboardingOpen(false)}
        onComplete={(newProfile) => {
          setTalentProfile(newProfile);
          setActiveTab('dashboard');
          showToast('Selamat! Profil talenta vokasi Anda berhasil dibuat.');
        }}
        initialProfile={talentProfile}
      />

      {/* Subtle Footer */}
      <footer className="border-t border-slate-200 bg-white py-6 hidden lg:block text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-[#0B1E36]">Intern<span className="text-[#059669]">Match</span></span>
            <span>— Platform Karier Berbasis AI dan Community untuk Talent Vokasi Indonesia</span>
          </div>
          <div className="flex items-center gap-4">
            <span>DISCOVER → MATCH → WORK → PROVE → GROW</span>
            <span>•</span>
            <span className="text-slate-400">Kurikulum & Perlindungan Usia SMK Sesuai Standar</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
