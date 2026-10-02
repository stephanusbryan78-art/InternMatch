export type UserRole = 'talent' | 'company' | 'admin';

export type OpportunityType = 
  | 'Internship' 
  | 'Daily Work' 
  | 'Part-time' 
  | 'Freelance' 
  | 'Micro-project' 
  | 'Entry-level';

export type WorkArrangement = 'Onsite' | 'Hybrid' | 'Remote';

export type ApplicationStatus = 
  | 'Applied' 
  | 'Under Review' 
  | 'Interview' 
  | 'Accepted' 
  | 'Rejected' 
  | 'Completed';

export interface EducationInfo {
  level: string; // e.g., 'SMK', 'D3 Vokasi', 'D4 / Sarjana Terapan', 'S1'
  school: string;
  major: string;
  graduationYear: number;
}

export interface ExperienceItem {
  id: string;
  title: string;
  company: string;
  type: 'Internship' | 'Work' | 'Organization' | 'Project';
  startDate: string;
  endDate?: string;
  isCurrent: boolean;
  description: string;
}

export interface PortfolioItem {
  id: string;
  title: string;
  category: string;
  description: string;
  link?: string;
  imageUrl?: string;
  date: string;
}

export interface CertificationItem {
  id: string;
  title: string;
  issuer: string;
  issueDate: string;
  credentialId?: string;
  verified: boolean;
}

export interface AchievementItem {
  id: string;
  title: string;
  event: string;
  rank: string; // e.g. "Juara 1 LKS Tingkat Provinsi"
  year: number;
  verified: boolean;
}

export interface EmployerFeedbackItem {
  id: string;
  companyName: string;
  companyLogo?: string;
  opportunityTitle: string;
  rating: number; // 1 to 5
  comment: string;
  date: string;
  verified: boolean;
  badges: string[]; // e.g., ['Disiplin Tinggi', 'Cepat Belajar', 'Kolaborasi Tim']
}

export interface TalentProfile {
  id: string;
  userId: string;
  fullName: string;
  avatar: string;
  tagline: string;
  location: string;
  about: string;
  education: EducationInfo;
  skills: string[];
  experience: ExperienceItem[];
  portfolio: PortfolioItem[];
  certifications: CertificationItem[];
  completedOpportunitiesCount: number;
  careerClassAchievements: string[];
  verifiedAchievements: AchievementItem[];
  employerFeedback: EmployerFeedbackItem[];
  careerPreferences: {
    interests: string[];
    opportunityTypes: OpportunityType[];
    preferredLocations: string[];
    availability: 'Available Immediately' | 'Available in 1 Month' | 'Open to Offers';
    workArrangement: WorkArrangement[];
    expectedStipend?: string;
  };
  reputationScore: number; // e.g. 88 (derived from skills, experience, verified achievements, and employer feedback)
  profileCompletionPercentage: number;
}

export interface CompanyProfile {
  id: string;
  userId: string;
  name: string;
  logo: string;
  verified: boolean;
  industry: string;
  location: string;
  description: string;
  website: string;
  employeeCount: string;
  activeOpportunitiesCount: number;
  rating: number;
  joinedYear: number;
}

export interface Opportunity {
  id: string;
  companyId: string;
  companyName: string;
  companyLogo: string;
  companyVerified: boolean;
  title: string;
  type: OpportunityType;
  industry: string;
  location: string;
  workArrangement: WorkArrangement;
  compensation: string; // e.g. "Rp 2.500.000 - Rp 3.500.000 / bln" or "Rp 200.000 / hari"
  duration: string; // e.g. "3 - 6 Bulan" or "2 Hari (Event Weekend)"
  description: string;
  responsibilities: string[];
  requirements: string[];
  requiredSkills: string[];
  postedDate: string;
  deadline: string;
  totalApplicants: number;
  status: 'Open' | 'Closed';
  ageSafeBadge?: boolean; // Safeguard for SMK students (under 18 friendly)
}

export interface Application {
  id: string;
  opportunityId: string;
  talentId: string;
  opportunity: Opportunity;
  appliedDate: string;
  status: ApplicationStatus;
  notes?: string;
  interviewDate?: string;
  interviewLocationOrLink?: string;
  employerFeedbackGiven?: boolean;
}

export interface MatchBreakdown {
  overallPercentage: number;
  skillRelevanceScore: number; // weight 40%
  locationScore: number; // weight 20%
  availabilityScore: number; // weight 20%
  experienceScore: number; // weight 10%
  educationScore: number; // weight 10%
  matchedSkills: string[];
  unmatchedSkills: string[];
  reasons: string[];
}

export interface CareerClass {
  id: string;
  title: string;
  instructor: string;
  instructorRole: string;
  instructorCompany: string;
  date: string;
  time: string;
  platform: 'Zoom' | 'Discord' | 'Google Meet';
  category: string;
  description: string;
  syllabus: string[];
  badgeEarned: string;
  registeredCount: number;
  maxParticipants: number;
  isRegistered?: boolean;
  isCompleted?: boolean;
  price: 'Gratis' | 'Beasiswa Vokasi';
}

export interface CommunityComment {
  id: string;
  authorName: string;
  authorRole: string;
  authorAvatar: string;
  content: string;
  createdAt: string;
  likes: number;
}

export interface CommunityPost {
  id: string;
  authorId: string;
  authorName: string;
  authorRole: string; // e.g. "Siswa SMK RPL | Depok"
  authorAvatar: string;
  category: 
    | 'Career' 
    | 'Internship' 
    | 'Daily Work' 
    | 'CV & Portfolio' 
    | 'Interview' 
    | 'Industry' 
    | 'Skills' 
    | 'Company Experience';
  title: string;
  content: string;
  tags: string[];
  likes: number;
  isLiked?: boolean;
  isSaved?: boolean;
  comments: CommunityComment[];
  createdAt: string;
}

export interface NotificationItem {
  id: string;
  type: 'application' | 'interview' | 'recommendation' | 'career_class' | 'reputation' | 'system';
  title: string;
  message: string;
  time: string;
  read: boolean;
  actionUrl?: string;
}
