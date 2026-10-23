import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';

export const HomeScreen: React.FC = () => {
  const {
    user,
    setActiveScreen,
    setIsRoseChatOpen,
    setIsOmikujiModalOpen,
    handleCheckInDaily,
    currentFortune,
    rewards,
    redeemReward,
    showToast,
  } = useApp();

  const [chatPrompt, setChatPrompt] = useState('');

  const handleAskRoseChan = (e: React.FormEvent) => {
    e.preventDefault();
    if (chatPrompt.trim()) {
      setIsRoseChatOpen(true);
    }
  };

  const handleQuickChip = (text: string) => {
    setIsRoseChatOpen(true);
  };

  const featuredRewards = rewards.slice(1, 3); // Rose-chan charm & S$10 voucher

  return (
    <div className="space-y-4 md:space-y-6 pb-20">
      {/* Hello Greeting Header */}
      <div className="p-4 md:p-5 rounded-3xl bg-gradient-to-br from-[#fff0f0] via-[#ffe9e8] to-[#ffdad9] border border-[#e5bdbc]/70 shadow-xs relative overflow-hidden">
        {/* Subtle floral background glow */}
        <div className="absolute -right-8 -top-8 w-36 h-36 rounded-full bg-[#fd94b1]/20 blur-xl pointer-events-none" />

        <div className="flex items-center justify-between mb-3">
          <div>
            <div className="flex items-center gap-1.5 flex-wrap">
              <h1 className="font-serif-luxury font-bold text-xl md:text-2xl text-[#b7002d] tracking-tight">
                Hello, {user.name}
              </h1>
              <span className="text-sm font-japanese text-[#5c3f3f]">ようこそ</span>
            </div>
            <p className="text-[10px] md:text-[11px] uppercase tracking-wider font-semibold text-[#906f6f] mt-0.5">
              TAKASHIMAYA REWARDS MEMBER
            </p>
          </div>

          <div className="px-3 py-1 rounded-full bg-gradient-to-r from-[#cca730] to-[#e9c349] text-[#241a00] font-black text-xs tracking-wide shadow-xs flex items-center gap-1">
            <span className="material-symbols-outlined text-[15px]">military_tech</span>
            <span>GOLD VIP</span>
          </div>
        </div>

        {/* Rose-chan Concierge Hero Card */}
        <div className="bg-white/95 backdrop-blur-md rounded-2xl p-4 border border-[#e5bdbc]/60 shadow-xs">
          <div className="flex items-start gap-3.5">
            <div className="relative shrink-0">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#ffd9e1] to-[#ffb1c4] p-0.5 shadow-sm border-2 border-white flex items-center justify-center overflow-hidden">
                <img
                  src="/src/assets/images/rose_chan_portrait_1792376401667.jpg"
                  alt="Rose-chan Concierge"
                  className="w-full h-full object-cover object-top hover:scale-110 transition-transform"
                />
              </div>
              <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-[#df2040] border-2 border-white"></span>
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1 text-[#b7002d] font-bold text-xs uppercase tracking-wide">
                <span>✨</span>
                <span>ROSE-CHAN CONCIERGE</span>
              </div>
              <p className="text-xs text-[#40000a] mt-1 leading-relaxed">
                How can I help you today? Ask me about curated luxury gifts, B2 Food Village, or
                spring promotions!
              </p>
            </div>
          </div>

          {/* Concierge Search Input */}
          <form onSubmit={handleAskRoseChan} className="mt-3 relative flex items-center">
            <span className="material-symbols-outlined absolute left-3 text-[#906f6f] text-[18px]">
              chat
            </span>
            <input
              type="text"
              value={chatPrompt}
              onChange={(e) => setChatPrompt(e.target.value)}
              placeholder="Ask Rose-chan anything..."
              className="w-full pl-9 pr-20 py-2.5 bg-[#fff8f7] border border-[#e5bdbc] rounded-full text-xs text-[#40000a] placeholder-[#906f6f] focus:outline-none focus:ring-2 focus:ring-[#b7002d]/40"
            />
            <div className="absolute right-1.5 flex items-center gap-1">
              <button
                type="button"
                onClick={() => setIsRoseChatOpen(true)}
                className="w-7 h-7 rounded-full flex items-center justify-center text-[#906f6f] hover:text-[#b7002d]"
              >
                <span className="material-symbols-outlined text-[17px]">mic</span>
              </button>
              <button
                type="submit"
                className="w-7 h-7 rounded-full bg-[#b7002d] text-white flex items-center justify-center hover:bg-[#920022] shadow-xs"
              >
                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </button>
            </div>
          </form>

          {/* Quick Prompts */}
          <div className="mt-2.5 flex items-center gap-1.5 overflow-x-auto no-scrollbar pt-1">
            <button
              onClick={() => handleQuickChip('Find a gift')}
              className="px-3 py-1 rounded-full bg-[#ffe9e8] text-[#b7002d] text-[11px] font-semibold hover:bg-[#ffd9e1] whitespace-nowrap transition-colors flex items-center gap-1"
            >
              <span>🎁</span>
              <span>Find a gift</span>
            </button>
            <button
              onClick={() => handleQuickChip('What is trending')}
              className="px-3 py-1 rounded-full bg-[#ffe9e8] text-[#b7002d] text-[11px] font-semibold hover:bg-[#ffd9e1] whitespace-nowrap transition-colors flex items-center gap-1"
            >
              <span>✨</span>
              <span>What&apos;s trending?</span>
            </button>
            <button
              onClick={() => handleQuickChip('Food')}
              className="px-3 py-1 rounded-full bg-[#ffe9e8] text-[#b7002d] text-[11px] font-semibold hover:bg-[#ffd9e1] whitespace-nowrap transition-colors flex items-center gap-1"
            >
              <span>🍣</span>
              <span>Food</span>
            </button>
          </div>
        </div>
      </div>

      {/* Your Check-in Streak Card */}
      <div className="p-4 md:p-5 rounded-3xl bg-white border border-[#ffe1e1] shadow-xs">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#ffe9e8] text-[#b7002d] flex items-center justify-center">
              <span className="material-symbols-outlined text-[18px]">local_fire_department</span>
            </div>
            <div>
              <h3 className="font-serif-luxury font-bold text-base text-[#40000a]">
                Your Check-in Streak
              </h3>
              <p className="text-[11px] text-[#906f6f]">Check in daily to earn bonus Petals!</p>
            </div>
          </div>

          <span className="px-3 py-1 rounded-full bg-[#ffe9e8] text-[#b7002d] font-bold text-xs">
            {user.checkInStreak} days in a row!
          </span>
        </div>

        {/* Petals Target Bar */}
        <div className="p-3 rounded-2xl bg-[#fff8f7] border border-[#ffe9e8] mb-4">
          <div className="flex items-center justify-between text-xs font-semibold mb-1.5">
            <span className="text-[#b7002d] flex items-center gap-1">
              <span>🌸</span>
              <span>{user.petals} Petals collected</span>
            </span>
            <span className="text-[#906f6f]">
              {user.spendTargetNextTier - user.petals} Petals to Platinum
            </span>
          </div>

          {/* Progress track */}
          <div className="w-full h-2 rounded-full bg-[#ffe1e1] overflow-hidden relative">
            <div
              className="h-full bg-gradient-to-r from-[#df2040] to-[#b7002d] rounded-full transition-all duration-500"
              style={{ width: `${Math.min(100, (user.petals / 300) * 100)}%` }}
            />
          </div>

          <div className="flex items-center justify-between text-[10px] text-[#906f6f] mt-1">
            <span>Gold Member</span>
            <span className="flex items-center gap-0.5">
              <span>Target: 300</span>
              <span>🌸</span>
            </span>
          </div>
        </div>

        {/* 5-Day Streak Row */}
        <div className="grid grid-cols-5 gap-1.5 sm:gap-2">
          {[
            { day: 'Day 1', petals: '+1', icon: '🌸', done: true },
            { day: 'Day 2', petals: '+2', icon: '🌸', done: true },
            { day: 'Day 3', petals: '+3', icon: '🌸', done: true },
            { day: 'Day 4', petals: '+5', icon: '🌸', done: true },
            { day: 'Day 5', petals: '+10', icon: '💮', done: true, highlight: true },
          ].map((item, idx) => (
            <div
              key={idx}
              onClick={handleCheckInDaily}
              className={`p-1.5 sm:p-2.5 rounded-xl sm:rounded-2xl flex flex-col items-center justify-between text-center cursor-pointer transition-all active:scale-95 ${
                item.highlight
                  ? 'bg-gradient-to-b from-[#ffe088]/40 to-[#ffd9e1]/50 border border-[#cca730] shadow-xs'
                  : 'bg-[#fff8f7] border border-[#ffe1e1]'
              }`}
            >
              <span className="text-[10px] font-bold text-[#5c3f3f]">{item.day}</span>
              <span className="text-xl my-1">{item.icon}</span>
              <span className="text-[11px] font-black text-[#b7002d]">{item.petals}</span>
              <div className="w-4 h-4 rounded-full bg-[#b7002d] text-white flex items-center justify-center mt-1 text-[9px] font-bold shadow-xs">
                ✓
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Today's Omikuji Card */}
      <div className="p-4 md:p-5 rounded-3xl bg-white border border-[#ffe1e1] shadow-xs">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#df2040] text-white flex items-center justify-center">
              <span className="material-symbols-outlined text-[18px]">temple_buddhist</span>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="font-serif-luxury font-bold text-base text-[#40000a]">
                  Today&apos;s Omikuji
                </h3>
                <span className="px-1.5 py-0.2 rounded-full bg-[#ffe9e8] text-[#b7002d] text-[10px] font-bold">
                  おみくじ
                </span>
              </div>
              <p className="text-[11px] text-[#906f6f]">
                Draw once daily for blessings &amp; seasonal rewards
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsOmikujiModalOpen(true)}
            className="w-8 h-8 rounded-full bg-[#fff0f0] text-[#b7002d] flex items-center justify-center hover:bg-[#ffe1e1] transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">redeem</span>
          </button>
        </div>

        {/* Current blessing snippet */}
        <div className="p-3.5 rounded-2xl bg-[#fff8f7] border border-[#ffe9e8] flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-[#df2040] text-white flex flex-col items-center justify-center shrink-0 shadow-xs">
            <span className="font-serif-luxury font-black text-sm">{currentFortune.kanji}</span>
            <span className="text-[7px] tracking-wider uppercase font-bold">
              {currentFortune.romaji}
            </span>
          </div>

          <div className="min-w-0 flex-1">
            <span className="text-[10px] uppercase font-bold tracking-wider text-[#735c00] flex items-center gap-1">
              <span>✪</span>
              <span>{currentFortune.meaning}</span>
            </span>
            <p className="text-xs text-[#5c3f3f] mt-0.5 line-clamp-1">{currentFortune.description}</p>
          </div>
        </div>

        {/* Shake & Draw Button */}
        <button
          onClick={() => setIsOmikujiModalOpen(true)}
          className="mt-3 w-full py-2.5 rounded-full bg-[#b7002d] text-white font-bold text-xs shadow-md hover:bg-[#920022] active:scale-95 transition-all flex items-center justify-center gap-1.5"
        >
          <span className="material-symbols-outlined text-[16px]">temple_buddhist</span>
          <span>Shake Cylinder &amp; Draw Fortune &rarr;</span>
        </button>
      </div>

      {/* Featured Petal Rewards Section */}
      <div className="p-4 md:p-5 rounded-3xl bg-white border border-[#ffe1e1] shadow-xs">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="text-base">🌸</span>
            <h3 className="font-serif-luxury font-bold text-base text-[#40000a]">
              Featured Petal Rewards
            </h3>
          </div>
          <button
            onClick={() => setActiveScreen('rewards')}
            className="text-xs font-bold text-[#b7002d] hover:underline flex items-center gap-0.5"
          >
            <span>View All</span>
            <span className="material-symbols-outlined text-[15px]">arrow_forward</span>
          </button>
        </div>

        {/* 2 Featured Reward Cards */}
        <div className="grid grid-cols-2 gap-3">
          {featuredRewards.map((reward) => (
            <div
              key={reward.id}
              className="p-3 rounded-2xl bg-[#fff8f7] border border-[#ffe9e8] flex flex-col justify-between"
            >
              <div>
                <div className="relative aspect-4/3 rounded-xl overflow-hidden bg-[#ffe1e1] mb-2">
                  <img
                    src={reward.imageUrl}
                    alt={reward.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute top-1.5 left-1.5 px-2 py-0.5 rounded-full bg-white/90 backdrop-blur-xs text-[#b7002d] text-[9px] font-bold uppercase tracking-wider">
                    {reward.tag}
                  </span>
                </div>
                <span className="text-[10px] uppercase font-bold text-[#906f6f] block">
                  {reward.category}
                </span>
                <h4 className="font-bold text-xs text-[#40000a] mt-0.5 line-clamp-1">
                  {reward.title}
                </h4>
              </div>

              <div className="mt-2.5 pt-2 border-t border-[#ffe1e1] flex items-center justify-between">
                <span className="text-xs font-bold text-[#b7002d] flex items-center gap-0.5">
                  <span>🌸</span>
                  <span>{reward.petalsCost}</span>
                </span>
                <button
                  onClick={() => redeemReward(reward)}
                  className="w-7 h-7 rounded-full bg-[#b7002d] text-white flex items-center justify-center hover:bg-[#920022] shadow-xs active:scale-90 transition-transform"
                >
                  <span className="material-symbols-outlined text-[14px]">redeem</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Store Location Info & Floating Concierge Button */}
      <div className="p-4 rounded-3xl bg-[#fff8f7] border border-[#ffe9e8] text-center space-y-2">
        <div className="flex items-center justify-center gap-1.5 text-xs font-bold text-[#b7002d]">
          <span className="material-symbols-outlined text-[16px]">location_on</span>
          <span>Takashimaya Singapore</span>
        </div>
        <p className="text-[11px] text-[#5c3f3f]">
          391 Orchard Road, Ngee Ann City, Singapore 238873
        </p>
        <p className="text-[11px] text-[#906f6f]">
          Store Hours: 10:00 AM – 9:30 PM • Concierge: +65 6738 1111
        </p>

        {/* Omotenashi Concierge Action Banner */}
        <div className="pt-2">
          <button
            onClick={() => setIsRoseChatOpen(true)}
            className="w-full py-2.5 px-4 rounded-full bg-gradient-to-r from-[#df2040] to-[#b7002d] text-white font-bold text-xs shadow-md hover:opacity-95 active:scale-98 transition-all flex items-center justify-center gap-2.5 group"
          >
            <img
              src="/src/assets/images/rose_chan_portrait_1792376401667.jpg"
              alt="Rose-chan"
              className="w-6 h-6 rounded-full object-cover border border-white group-hover:scale-110 transition-transform"
            />
            <span>Ask Rose-chan Live Concierge</span>
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
          </button>
        </div>
      </div>
    </div>
  );
};
