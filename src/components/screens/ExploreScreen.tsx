import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { JournalStory } from '../../types';

export const ExploreScreen: React.FC = () => {
  const {
    journalStories,
    likeStory,
    setIsFloorMapModalOpen,
    setSelectedFloor,
    showToast,
  } = useApp();

  const [activeTab, setActiveTab] = useState<'ALL' | 'FOOD' | 'BEAUTY' | 'SHOPPING' | 'LIFESTYLE'>('ALL');
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [newReviewTitle, setNewReviewTitle] = useState('');
  const [newReviewText, setNewReviewText] = useState('');
  const [newReviewLocation, setNewReviewLocation] = useState('B2 Food Hall');

  const filterTabs = [
    { id: 'ALL', label: 'All Feed' },
    { id: 'FOOD', label: 'Food & Dining' },
    { id: 'BEAUTY', label: 'Beauty & Cosmetics' },
    { id: 'SHOPPING', label: 'Luxury Fashion' },
    { id: 'LIFESTYLE', label: 'Home & Living' },
  ] as const;

  const filteredStories =
    activeTab === 'ALL'
      ? journalStories
      : journalStories.filter((s) => s.category === activeTab);

  const handleShortcutClick = (floor: string, name: string) => {
    setSelectedFloor(floor);
    setIsFloorMapModalOpen(true);
    showToast(`📍 Opening ${name} on ${floor}`);
  };

  const handleCreateReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReviewTitle.trim() || !newReviewText.trim()) return;
    setShowReviewModal(false);
    setNewReviewTitle('');
    setNewReviewText('');
    showToast('🌸 Review published to TakaLife Journal! +20 Petals earned.');
  };

  return (
    <div className="space-y-4 md:space-y-6 pb-20">
      {/* Feed Filter Pill Bar */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
        {filterTabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                isActive
                  ? 'bg-[#b7002d] text-white shadow-sm'
                  : 'bg-white text-[#5c3f3f] border border-[#e5bdbc] hover:border-[#b7002d]/40'
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Interactive Floor Navigator Hero Card */}
      <div className="p-4 md:p-5 rounded-3xl bg-white border border-[#ffe1e1] shadow-xs">
        <div className="flex items-center justify-between mb-3.5">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#df2040] to-[#b7002d] text-white flex items-center justify-center shadow-xs">
              <span className="material-symbols-outlined text-[20px]">map</span>
            </div>
            <div>
              <h3 className="font-serif-luxury font-bold text-base text-[#40000a] leading-tight">
                Interactive Floor Navigator
              </h3>
              <p className="text-[11px] text-[#906f6f]">B2 Food Hall to Level 4 Living &amp; Sports</p>
            </div>
          </div>

          <button
            onClick={() => {
              setSelectedFloor('B2');
              setIsFloorMapModalOpen(true);
            }}
            className="text-xs font-bold text-[#b7002d] hover:underline flex items-center gap-0.5"
          >
            <span>View Map</span>
            <span className="material-symbols-outlined text-[15px]">chevron_right</span>
          </button>
        </div>

        {/* 4 Floor Shortcut Cards */}
        <div className="grid grid-cols-4 gap-2">
          <button
            onClick={() => handleShortcutClick('B2', 'B2 Gourmet Food Village')}
            className="p-2.5 rounded-2xl bg-[#fff8f7] border border-[#ffe1e1] hover:bg-[#ffe9e8] text-center transition-all active:scale-95 group"
          >
            <span className="text-xl block mb-1 group-hover:scale-110 transition-transform">🥐</span>
            <span className="text-[11px] font-bold text-[#40000a] block leading-tight">
              B2 Gourmet
            </span>
          </button>

          <button
            onClick={() => handleShortcutClick('L1', 'L1 Cosmetics Hall')}
            className="p-2.5 rounded-2xl bg-[#fff8f7] border border-[#ffe1e1] hover:bg-[#ffe9e8] text-center transition-all active:scale-95 group"
          >
            <span className="text-xl block mb-1 group-hover:scale-110 transition-transform">💄</span>
            <span className="text-[11px] font-bold text-[#40000a] block leading-tight">
              L1 Cosmetics
            </span>
          </button>

          <button
            onClick={() => handleShortcutClick('L3', 'Level 3 Customer Service & Tax Refund')}
            className="p-2.5 rounded-2xl bg-[#fff8f7] border border-[#ffe1e1] hover:bg-[#ffe9e8] text-center transition-all active:scale-95 group"
          >
            <span className="text-xl block mb-1 group-hover:scale-110 transition-transform">🏷️</span>
            <span className="text-[11px] font-bold text-[#40000a] block leading-tight">
              Tax Refund
            </span>
          </button>

          <button
            onClick={() => handleShortcutClick('L1', 'Restrooms & Baby Care')}
            className="p-2.5 rounded-2xl bg-[#fff8f7] border border-[#ffe1e1] hover:bg-[#ffe9e8] text-center transition-all active:scale-95 group"
          >
            <span className="text-xl block mb-1 group-hover:scale-110 transition-transform">🚻</span>
            <span className="text-[11px] font-bold text-[#40000a] block leading-tight">
              Restrooms
            </span>
          </button>
        </div>
      </div>

      {/* TakaLife Journal Header */}
      <div className="flex items-center justify-between pt-2">
        <div>
          <div className="flex items-center gap-1.5">
            <h2 className="font-serif-luxury font-bold text-xl text-[#b7002d]">
              TakaLife Journal
            </h2>
            <span className="text-base animate-pulse">🌸</span>
          </div>
          <p className="text-[11px] text-[#906f6f]">
            Stories, insider tips &amp; authentic reviews by shoppers
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-2.5 py-1 rounded-full bg-[#ffe9e8] text-[#b7002d] text-[10px] font-bold">
            Trending
          </span>
          <button
            onClick={() => setShowReviewModal(true)}
            className="px-3 py-1 rounded-full bg-[#b7002d] text-white text-xs font-bold shadow-xs hover:bg-[#920022] transition-colors flex items-center gap-1"
          >
            <span className="material-symbols-outlined text-[14px]">edit</span>
            <span>Write</span>
          </button>
        </div>
      </div>

      {/* TakaLife Journal Cards Feed */}
      {/* TakaLife Journal Cards Feed */}
      <div className="space-y-3.5">
        {filteredStories.map((story) => (
          <div
            key={story.id}
            className="p-3 sm:p-3.5 rounded-2xl sm:rounded-3xl bg-white border border-[#ffe1e1] shadow-xs hover:border-[#b7002d]/30 transition-all flex items-start gap-3 w-full overflow-hidden"
          >
            {/* Story Thumbnail */}
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-xl sm:rounded-2xl overflow-hidden bg-[#ffe1e1] shrink-0 relative">
              <img
                src={story.imageUrl}
                alt={story.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
              <span className="absolute top-1.5 left-1.5 px-2 py-0.5 rounded-full bg-white/95 backdrop-blur-xs text-[#b7002d] text-[9px] font-bold uppercase tracking-wider shadow-2xs">
                {story.category}
              </span>
            </div>

            {/* Story Content */}
            <div className="flex-1 min-w-0 flex flex-col justify-between self-stretch overflow-hidden">
              <div className="min-w-0">
                {/* Author row */}
                <div className="flex items-center justify-between gap-1 text-xs mb-1">
                  <div className="flex items-center gap-1.5 min-w-0 truncate">
                    <img
                      src={story.authorAvatar}
                      alt={story.author}
                      referrerPolicy="no-referrer"
                      className="w-5 h-5 rounded-full object-cover shrink-0"
                    />
                    <span className="font-bold text-xs text-[#40000a] truncate">{story.author}</span>
                    <span className="text-[#906f6f] text-[10px] shrink-0">· {story.timeAgo}</span>
                  </div>

                  <button
                    onClick={() => likeStory(story.id)}
                    className={`flex items-center gap-0.5 text-xs font-semibold shrink-0 transition-colors ${
                      story.userLiked ? 'text-[#b7002d]' : 'text-[#906f6f] hover:text-[#b7002d]'
                    }`}
                  >
                    <span
                      className="material-symbols-outlined text-[15px]"
                      style={story.userLiked ? { fontVariationSettings: "'FILL' 1" } : {}}
                    >
                      favorite
                    </span>
                    <span className="text-[11px]">{story.likes}</span>
                  </button>
                </div>

                {/* Title */}
                <h3 className="font-serif-luxury font-bold text-sm sm:text-base text-[#40000a] truncate leading-tight">
                  {story.title}
                </h3>

                {/* Rating Stars */}
                <div className="flex items-center gap-0.5 my-0.5 text-[#cca730]">
                  {Array.from({ length: story.rating }).map((_, i) => (
                    <span
                      key={i}
                      className="material-symbols-outlined text-[14px]"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      star
                    </span>
                  ))}
                </div>

                {/* Description */}
                <p className="text-[11px] sm:text-xs text-[#5c3f3f] leading-snug line-clamp-2 break-words overflow-hidden">
                  {story.description}
                </p>
              </div>

              {/* Location & Petals Reward Tag */}
              <div className="mt-2 pt-2 border-t border-[#fff0f0] flex items-center justify-between gap-1 w-full overflow-hidden">
                <div className="flex items-center gap-1 text-[10px] sm:text-[11px] text-[#906f6f] min-w-0 truncate flex-1">
                  <span className="material-symbols-outlined text-[13px] text-[#b7002d] shrink-0">
                    location_on
                  </span>
                  <span className="truncate">{story.location}</span>
                </div>

                <div className="px-2 py-0.5 rounded-full bg-[#ffe9e8] text-[#b7002d] text-[10px] font-bold flex items-center gap-1 shrink-0 whitespace-nowrap">
                  <span className="text-[11px]">🌸</span>
                  <span>+{story.petalsReward} Petals</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Review Creation Modal */}
      {showReviewModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-[#fff8f7] w-full max-w-md rounded-3xl shadow-2xl border border-[#ffe1e1] p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-serif-luxury font-bold text-base text-[#40000a]">
                Share Your Takashimaya Story
              </h3>
              <button
                onClick={() => setShowReviewModal(false)}
                className="w-7 h-7 rounded-full bg-[#ffe9e8] text-[#906f6f] flex items-center justify-center"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateReview} className="space-y-3">
              <div>
                <label className="text-xs font-semibold text-[#5c3f3f] block mb-1">
                  Title / Subject
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Delicious Strawberry Daifuku at B2"
                  value={newReviewTitle}
                  onChange={(e) => setNewReviewTitle(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-[#e5bdbc] rounded-xl text-xs text-[#40000a] focus:ring-2 focus:ring-[#b7002d]/40 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-[#5c3f3f] block mb-1">Location</label>
                <select
                  value={newReviewLocation}
                  onChange={(e) => setNewReviewLocation(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-[#e5bdbc] rounded-xl text-xs text-[#40000a] focus:outline-none"
                >
                  <option>Takashimaya Food Hall, B2</option>
                  <option>Beauty Hall, L1</option>
                  <option>Level 2 Luxury &amp; Fashion</option>
                  <option>Level 3 Living &amp; Kids</option>
                  <option>Level 4 Prestige Lounge</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-[#5c3f3f] block mb-1">
                  Review &amp; Insider Tips
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder="What made this visit special? Share recommendations..."
                  value={newReviewText}
                  onChange={(e) => setNewReviewText(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-[#e5bdbc] rounded-xl text-xs text-[#40000a] focus:ring-2 focus:ring-[#b7002d]/40 focus:outline-none"
                />
              </div>

              <div className="p-2.5 rounded-xl bg-[#ffe9e8] text-[11px] text-[#b7002d] font-semibold flex items-center gap-1.5">
                <span>🌸</span>
                <span>Earn +20 Sakura Petals immediately upon publishing!</span>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowReviewModal(false)}
                  className="px-4 py-2 rounded-full border border-[#e5bdbc] text-xs font-semibold text-[#5c3f3f]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-full bg-[#b7002d] text-white text-xs font-bold hover:bg-[#920022] shadow-xs"
                >
                  Publish Story
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
