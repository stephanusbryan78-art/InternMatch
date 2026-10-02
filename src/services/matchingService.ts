import { TalentProfile, Opportunity, MatchBreakdown } from '../types';

export function calculateMatchScore(
  talent: TalentProfile,
  opportunity: Opportunity
): MatchBreakdown {
  const reasons: string[] = [];

  // 1. Skill Relevance (40%)
  const requiredSkills = opportunity.requiredSkills.map(s => s.toLowerCase().trim());
  const talentSkills = talent.skills.map(s => s.toLowerCase().trim());

  const matchedSkills: string[] = [];
  const unmatchedSkills: string[] = [];

  opportunity.requiredSkills.forEach(skill => {
    const isMatched = talentSkills.some(ts => 
      ts.includes(skill.toLowerCase()) || skill.toLowerCase().includes(ts)
    );
    if (isMatched) {
      matchedSkills.push(skill);
    } else {
      unmatchedSkills.push(skill);
    }
  });

  const skillMatchRatio = requiredSkills.length > 0
    ? matchedSkills.length / requiredSkills.length
    : 1;
  const skillRelevanceScore = Math.round(skillMatchRatio * 40);

  if (matchedSkills.length > 0) {
    reasons.push(`${matchedSkills.length} dari ${requiredSkills.length} keahlian yang dibutuhkan cocok (${matchedSkills.slice(0, 3).join(', ')})`);
  }

  // 2. Location Match (20%)
  let locationScore = 0;
  const oppLocation = opportunity.location.toLowerCase();
  const talentLocation = talent.location.toLowerCase();
  const prefLocations = talent.careerPreferences.preferredLocations.map(l => l.toLowerCase());

  const isLocationDirectMatch = prefLocations.some(pl => oppLocation.includes(pl) || pl.includes(oppLocation)) ||
    oppLocation.includes(talentLocation) || talentLocation.includes(oppLocation);

  if (opportunity.workArrangement === 'Remote') {
    locationScore = 20;
    reasons.push('Peluang Remote fleksibel dari lokasi mana saja');
  } else if (isLocationDirectMatch) {
    locationScore = 20;
    reasons.push(`Lokasi ${opportunity.location} sesuai preferensi domisili Anda`);
  } else {
    // Partial nearby city match
    locationScore = 12;
  }

  // 3. Availability Match (20%)
  let availabilityScore = 0;
  if (talent.careerPreferences.availability === 'Available Immediately') {
    availabilityScore = 20;
    reasons.push('Ketersediaan Anda "Siap Segera" sesuai jadwal perekrutan');
  } else if (talent.careerPreferences.availability === 'Available in 1 Month') {
    availabilityScore = 15;
    reasons.push('Ketersediaan Anda dalam 1 bulan memenuhi batas waktu');
  } else {
    availabilityScore = 10;
  }

  // 4. Experience Match (10%)
  let experienceScore = 0;
  const hasInternshipOrWork = talent.experience.length > 0;
  const hasRelatedProject = talent.portfolio.length > 0;

  if (hasInternshipOrWork && hasRelatedProject) {
    experienceScore = 10;
    reasons.push('Memiliki riwayat pengalaman kerja/magang nyata dan portofolio');
  } else if (hasInternshipOrWork || hasRelatedProject) {
    experienceScore = 7;
    reasons.push('Memiliki dasar proyek portofolio yang relevan');
  } else {
    experienceScore = 4;
  }

  // 5. Education Match (10%)
  let educationScore = 0;
  const oppText = (opportunity.title + ' ' + opportunity.description + ' ' + opportunity.requirements.join(' ')).toLowerCase();
  const talentMajor = talent.education.major.toLowerCase();

  // If title/requirements align with major keywords
  const isMajorAligned = 
    (talentMajor.includes('rekayasa perangkat lunak') && (oppText.includes('web') || oppText.includes('software') || oppText.includes('frontend') || oppText.includes('developer'))) ||
    (talentMajor.includes('dkv') && (oppText.includes('design') || oppText.includes('desain') || oppText.includes('grafis') || oppText.includes('motion'))) ||
    (talentMajor.includes('tata boga') && (oppText.includes('barista') || oppText.includes('kopi') || oppText.includes('makan') || oppText.includes('culinary'))) ||
    (talentMajor.includes('tkj') && (oppText.includes('network') || oppText.includes('jaringan') || oppText.includes('noc') || oppText.includes('mikrotik'))) ||
    (talentMajor.includes('perhotelan') && (oppText.includes('hotel') || oppText.includes('hospitality') || oppText.includes('front desk'))) ||
    (talentMajor.includes('farmasi') && oppText.includes('farmasi')) ||
    (talentMajor.includes('tkro') && oppText.includes('otomotif'));

  if (isMajorAligned) {
    educationScore = 10;
    reasons.push(`Jurusan pendidikan ${talent.education.major} sangat relevan`);
  } else {
    educationScore = 6;
  }

  const overallPercentage = Math.min(
    98,
    Math.max(45, skillRelevanceScore + locationScore + availabilityScore + experienceScore + educationScore)
  );

  return {
    overallPercentage,
    skillRelevanceScore,
    locationScore,
    availabilityScore,
    experienceScore,
    educationScore,
    matchedSkills,
    unmatchedSkills,
    reasons,
  };
}
