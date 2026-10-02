import { TalentProfile } from '../types';

export interface AIChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  actionSuggestions?: string[];
}

export async function askAICareerAssistant(
  message: string,
  talent: TalentProfile,
  mode?: 'cv_review' | 'interview_prep' | 'skill_gap' | 'profile_boost' | 'general'
): Promise<string> {
  try {
    const response = await fetch('/api/ai/career-assistant', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message,
        context: {
          name: talent.fullName,
          major: talent.education.major,
          school: talent.education.school,
          skills: talent.skills,
          experienceCount: talent.experience.length,
          reputationScore: talent.reputationScore,
          profileCompletion: talent.profileCompletionPercentage,
          mode,
        },
        mode,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      if (data.reply) {
        return data.reply;
      }
    }
  } catch (err) {
    console.warn('Backend AI API unavailable, using built-in mentor engine', err);
  }

  // Built-in intelligent vocational career assistant engine (deterministic, rich, actionable)
  return generateVocationalMentorResponse(message, talent, mode);
}

function generateVocationalMentorResponse(
  message: string,
  talent: TalentProfile,
  mode?: string
): string {
  const lower = message.toLowerCase();

  if (mode === 'cv_review' || lower.includes('cv') || lower.includes('resume') || lower.includes('review')) {
    return `### 📋 Review Profil & CV Vokasi: **${talent.fullName}**

Berdasarkan analisis profil ${talent.education.major} di **InternMatch**:

#### ✅ **Kelebihan Profil Anda:**
1. **Sertifikasi BNSP:** Anda sudah memiliki sertifikasi resmi (*${talent.certifications[0]?.title || 'Sertifikasi Kompetensi'}*), ini menjadi pembeda kuat dibanding pelamar umum.
2. **Keterampilan Relevan:** Koleksi keahlian (*${talent.skills.slice(0, 4).join(', ')}*) tepat sasaran dengan tren industri saat ini.
3. **Pengalaman Nyata:** Memiliki riwayat magang di *${talent.experience[0]?.company || 'industri'}* membuktikan Anda paham budaya kerja.

#### 💡 **3 Rekomendasi Peningkatan untuk Tembus HRD:**
- **Kuantifikasi Hasil Proyek:** Di bagian portofolio, ubah deskripsi pasif menjadi aktif dengan angka. Contoh: *"Mengembangkan 12 endpoint API dan memangkas waktu muat halaman sebesar 25%"*.
- **Dokumentasikan Proses (Case Study):** HRD sangat menyukai cerita proses saat mengatasi error atau kendala teknis dalam tugas akhir SMK.
- **Tingkatkan Skor Profil ke 95%+:** Lengkapi deskripsi pencapaian di LKS untuk membuka peluang rekomendasi prioritas ke perusahaan mitra.

*Tips: Gunakan fitur simpan portofolio di InternMatch agar perusahaan dapat langsung menguji live demo karya Anda!*`;
  }

  if (mode === 'interview_prep' || lower.includes('interview') || lower.includes('wawancara') || lower.includes('tanya')) {
    return `### 🎯 Simulasi & Persiapan Interview untuk **${talent.fullName}**

Berikut adalah 4 pertanyaan krusial yang hampir pasti diajukan oleh HRD dan User Teknis untuk lulusan **${talent.education.major}**:

#### 1. "Ceritakan tentang proyek paling menantang yang pernah kamu kerjakan di SMK!"
- **Trik Menjawab:** Gunakan rumus **STAR (Situation, Task, Action, Result)**.
- **Rekomendasi Jawaban:** Ceritakan proyek *${talent.portfolio[0]?.title || 'tugas akhir'}*. Jelaskan apa masalah awalnya, teknologi yang kamu pilih, dan bagaimana hasil akhirnya digunakan oleh guru/sekolah/klien.

#### 2. "Bagaimana caramu membagi waktu dan mengatasi deadline yang ketat?"
- **Trik Menjawab:** Tunjukkan kedisiplinan dan komunikasi proaktif. Sebutkan bahwa kamu terbiasa membuat daftar prioritas (To-Do List) dan segera mengabari mentor jika ada kendala sebelum batas waktu.

#### 3. Pertanyaan Teknis: "Bagaimana alur kamu saat menemukan bug / kendala kerja?"
- **Trik Menjawab:** "Saya mengidentifikasi sumber masalah terlebih dahulu, membaca dokumentasi resmi, mencoba solusi terisolasi, dan berkonsultasi secara terstruktur kepada senior setelah mencoba opsi mandiri."

#### 4. Pertanyaan Etika: "Mengapa kamu memilih melamar magang/kerja di perusahaan kami?"
- **Trik Menjawab:** Sambungkan visi perusahaan dengan ambisi kariermu untuk terus berkembang dari level junior menjadi talenta andalan.

*Mau saya bantu latih jawaban untuk salah satu pertanyaan di atas? Ketik nomor pertanyaannya!*`;
  }

  if (mode === 'skill_gap' || lower.includes('skill') || lower.includes('keahlian') || lower.includes('belajar')) {
    return `### ⚡ Analisis Skill Gap & Roadmap Pengembangan

Sebagai talenta di bidang **${talent.education.major}**, berikut peta kompetensi Anda saat ini:

#### 🟢 **Keahlian Kuat yang Sudah Terverifikasi:**
- ${talent.skills.slice(0, 5).join(' • ')}

#### 🟡 **Keahlian Pelengkap yang Paling Dicari Perusahaan Saat Ini:**
1. **Next.js & Server-Side Rendering (SSR):** Untuk melengkapi keahlian React Anda agar siap menangani aplikasi web berskala korporat.
2. **Automated Testing Dasar (Jest / Vitest):** Perusahaan rintisan dan korporat sangat mengapresiasi talenta junior yang paham cara membuat unit test sederhana.
3. **Komunikasi & Agile Workflow:** Pemahaman kerja sprint menggunakan Jira/Trello dan etika stand-up meeting.

#### 🚀 **Langkah Praktis 7 Hari ke Depan:**
- Daftarkan diri ke Career Class gratis di InternMatch: *"Mastering Modern React & UI Design"*.
- Tambahkan 1 mini-proyek interaktif dengan integrasi database gratis ke portofolio.
- Tuntaskan kelas untuk mendapatkan lencana terverifikasi baru!`;
  }

  if (mode === 'profile_boost' || lower.includes('reputasi') || lower.includes('profil') || lower.includes('lengkap')) {
    return `### 🌟 Strategi Melejitkan Reputasi Karier di InternMatch

Filosofi InternMatch adalah: **DISCOVER → MATCH → WORK → PROVE → GROW**.

Skor reputasi Anda saat ini berada di angka **${talent.reputationScore} / 100** (Kategori: *Sangat Kompeten*).

#### 📈 **Cara Naik ke Skor 95+ (Top 5% Talent Vokasi):**
1. **Selesaikan 1 Peluang Kerja Tambahan:** Setiap menyelesaikan magang atau Daily Work dan menerima ulasan bintang 5 dari pemberi kerja, reputasi Anda bertambah **+6 hingga +10 poin**.
2. **Kumpulkan Endorsement Keterampilan:** Minta rekomendasi atau penilaian rekan tim proyek sekolah Anda di platform.
3. **Ikuti Career Class:** Setiap sertifikat kelas karier yang diselesaikan langsung menambah lencana terverifikasi di profil Anda.

*Profil dengan reputasi di atas 85 otomatis mendapat badge 'Paling Direkomendasikan' saat perusahaan mencari kandidat!*`;
  }

  // General helpful response
  return `### 👋 Halo ${talent.fullName}! Saya AI Career Assistant Anda

Saya siap mendampingi perjalanan karier vokasi Anda dengan filosofi **DISCOVER → MATCH → WORK → PROVE → GROW**.

Beberapa hal yang bisa kita diskusikan sekarang:
1. **Tinjau CV & Portofolio:** Kirimkan bagian profil yang ingin disempurnakan.
2. **Simulasi Interview:** Persiapan wawancara kerja teknis dan HRD.
3. **Analisis Match Peluang:** Mengapa peluang tertentu cocok atau belum cocok dengan profil Anda.
4. **Roadmap Skill Baru:** Keterampilan apa yang perlu dipelajari berikutnya agar gaji dan reputasi Anda meningkat.

Ketik pertanyaan Anda atau pilih salah satu tombol saran cepat di bawah!`;
}
