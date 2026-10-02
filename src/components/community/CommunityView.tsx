import React, { useState } from 'react';
import { CommunityPost, TalentProfile } from '../../types';
import {
  MessageSquare,
  Heart,
  Bookmark,
  Share2,
  Send,
  Plus,
  Filter,
  CheckCircle2,
  Sparkles,
  X,
  AlertTriangle,
} from 'lucide-react';

interface CommunityViewProps {
  posts: CommunityPost[];
  talentProfile: TalentProfile;
  onAddPost: (newPost: Partial<CommunityPost>) => void;
  onLikePost: (postId: string) => void;
  onAddComment: (postId: string, commentText: string) => void;
}

export const CommunityView: React.FC<CommunityViewProps> = ({
  posts,
  talentProfile,
  onAddPost,
  onLikePost,
  onAddComment,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [activeCommentPostId, setActiveCommentPostId] = useState<string | null>(null);
  const [commentInput, setCommentInput] = useState('');

  // Form states
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState<any>('Career');
  const [tagsString, setTagsString] = useState('TipsMagang, Vokasi');

  const categories = [
    'All',
    'Career',
    'Internship',
    'Daily Work',
    'CV & Portfolio',
    'Interview',
    'Industry',
    'Skills',
    'Company Experience',
  ];

  const filteredPosts = posts.filter((p) => {
    if (selectedCategory === 'All') return true;
    return p.category === selectedCategory;
  });

  const handleSubmitPost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    const tags = tagsString
      .split(',')
      .map((t) => t.trim().replace(/^#/, ''))
      .filter(Boolean);

    onAddPost({
      title,
      content,
      category,
      tags,
    });

    setTitle('');
    setContent('');
    setShowCreateModal(false);
  };

  const handleSendComment = (postId: string) => {
    if (!commentInput.trim()) return;
    onAddComment(postId, commentInput);
    setCommentInput('');
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Community Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-[#059669] text-xs font-bold mb-2 border border-emerald-200/60">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Ekosistem Berbagi Pengetahuan Vokasi</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0B1E36]">
            Komunitas Talenta Vokasi
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Tukar cerita seputar magang industri, review proses interview, dan tips portofolio nyata bersama sesama siswa dan alumni SMK se-Indonesia.
          </p>
        </div>

        <button
          onClick={() => setShowCreateModal(true)}
          className="px-5 py-3 rounded-2xl bg-[#059669] hover:bg-[#047857] text-white text-xs font-bold flex items-center justify-center gap-2 shadow-xs transition-colors shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Buat Diskusi Baru</span>
        </button>
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              selectedCategory === cat
                ? 'bg-[#0B1E36] text-white shadow-xs'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            {cat === 'All' ? 'Semua Topik' : cat}
          </button>
        ))}
      </div>

      {/* Posts List */}
      <div className="space-y-4">
        {filteredPosts.map((post) => (
          <div
            key={post.id}
            className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-xs hover:border-emerald-300 transition-all space-y-4"
          >
            {/* Post Header */}
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <img
                  src={post.authorAvatar}
                  alt={post.authorName}
                  className="w-10 h-10 rounded-full object-cover border border-slate-200 ring-2 ring-emerald-500/10"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-[#0B1E36]">{post.authorName}</span>
                    <span className="text-[11px] font-semibold text-[#059669] bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200/60">
                      {post.category}
                    </span>
                  </div>
                  <span className="text-xs text-slate-500">{post.authorRole} • {post.createdAt}</span>
                </div>
              </div>
            </div>

            {/* Post Title & Content */}
            <h3 className="font-extrabold text-base text-[#0B1E36] leading-snug">
              {post.title}
            </h3>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed whitespace-pre-line">
              {post.content}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-1.5 pt-1">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[11px] font-medium text-slate-600 bg-slate-100 px-2.5 py-0.5 rounded-md"
                >
                  #{tag}
                </span>
              ))}
            </div>

            {/* Actions Bar: Like, Comments, Save */}
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => onLikePost(post.id)}
                  className={`flex items-center gap-1.5 transition-colors font-semibold ${
                    post.isLiked ? 'text-red-500' : 'hover:text-red-500 text-slate-600'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${post.isLiked ? 'fill-current text-red-500' : ''}`} />
                  <span>{post.likes} Suka</span>
                </button>

                <button
                  onClick={() =>
                    setActiveCommentPostId(activeCommentPostId === post.id ? null : post.id)
                  }
                  className="flex items-center gap-1.5 hover:text-[#059669] transition-colors font-semibold text-slate-600"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>{post.comments.length} Tanggapan</span>
                </button>
              </div>

              <div className="text-[11px] text-slate-400">
                Diskusi Terverifikasi
              </div>
            </div>

            {/* Comments Drawer / Section */}
            {activeCommentPostId === post.id && (
              <div className="pt-4 border-t border-slate-100 space-y-3 animate-in fade-in">
                <h5 className="font-bold text-xs text-slate-700">Tanggapan Diskusi:</h5>

                {post.comments.length === 0 ? (
                  <p className="text-xs text-slate-400 italic">Belum ada tanggapan. Jadilah yang pertama berkomentar!</p>
                ) : (
                  <div className="space-y-2.5">
                    {post.comments.map((c) => (
                      <div key={c.id} className="p-3 bg-slate-50 rounded-2xl border border-slate-200/60 text-xs">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-bold text-[#0B1E36]">{c.authorName}</span>
                          <span className="text-[10px] text-slate-400">{c.createdAt}</span>
                        </div>
                        <p className="text-slate-700 leading-relaxed">{c.content}</p>
                      </div>
                    ))}
                  </div>
                )}

                {/* Comment Input */}
                <div className="flex items-center gap-2 pt-2">
                  <input
                    type="text"
                    value={commentInput}
                    onChange={(e) => setCommentInput(e.target.value)}
                    placeholder="Tuliskan tanggapan atau masukan profesional Anda..."
                    className="flex-1 text-xs px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-1 focus:ring-[#059669]"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') handleSendComment(post.id);
                    }}
                  />
                  <button
                    onClick={() => handleSendComment(post.id)}
                    className="px-4 py-2.5 rounded-xl bg-[#059669] text-white text-xs font-bold hover:bg-[#047857]"
                  >
                    Kirim
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Modal: Create Post */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl border border-slate-200 animate-in fade-in">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-extrabold text-lg text-[#0B1E36]">Mulai Diskusi Baru</h3>
              <button onClick={() => setShowCreateModal(false)} className="text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmitPost} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Kategori Diskusi</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as any)}
                  className="w-full p-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#059669]"
                >
                  {categories.filter((c) => c !== 'All').map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Judul Diskusi</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Contoh: Tips mempersiapkan tugas akhir SMK menjadi portofolio magang"
                  className="w-full p-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#059669]"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Isi Cerita / Pertanyaan</label>
                <textarea
                  required
                  rows={4}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Ceritakan pengalaman Anda, tantangan yang dihadapi, atau tips yang berguna untuk rekan vokasi lainnya..."
                  className="w-full p-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#059669]"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Tagar (pisahkan dengan koma)</label>
                <input
                  type="text"
                  value={tagsString}
                  onChange={(e) => setTagsString(e.target.value)}
                  placeholder="TipsMagang, RPL, Wawancara"
                  className="w-full p-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#059669]"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 rounded-xl font-semibold text-slate-600 hover:bg-slate-100"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl font-bold text-white bg-[#059669] hover:bg-[#047857]"
                >
                  Terbitkan Diskusi
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
