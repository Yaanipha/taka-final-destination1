import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ROSE_CHAN_PORTRAIT } from '../../assets';

export const RewardsScreen: React.FC = () => {
  const {
    user,
    stamps,
    stampTrailCheckpoint,
    rewards,
    redeemReward,
    setIsTriviaModalOpen,
    setIsFloorMapModalOpen,
    setSelectedFloor,
    showToast,
  } = useApp();

  const [activeSeason, setActiveSeason] = useState<'spring' | 'summer' | 'autumn' | 'festive'>('spring');

  const collectedCount = stamps.filter((s) => s.isCollected).length;

  const handleNextStop = () => {
    setSelectedFloor('L2');
    setIsFloorMapModalOpen(true);
    showToast('📍 Level 2 Fashion: Show your member QR at any boutique to collect Stamp #7!');
  };

  const handleBrandMission = () => {
    setSelectedFloor('L1');
    setIsFloorMapModalOpen(true);
    showToast('🌸 Checked in at L1 Shiseido Sakura Beauty Studio! +20 Petals awarded.');
  };

  const handlePetalsPill = () => {
    showToast(`✨ Balance: ${user.petals} Petals (Worth S$${(user.petals * 0.1).toFixed(2)})! 30 more to Rose-chan Collectible.`);
  };

  return (
    <div className="space-y-4 md:space-y-6 pb-20">
      {/* Top Banner / Summary Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-1.5">
            <h1 className="font-serif-luxury font-bold text-xl md:text-2xl text-[#b7002d]">
              Rewards &amp; Passport
            </h1>
            <span className="text-base animate-pulse">🌸</span>
          </div>
          <p className="text-[11px] text-[#906f6f]">Takashimaya Seasonal Discovery</p>
        </div>

        {/* Petals Capsule Pill */}
        <button
          onClick={handlePetalsPill}
          id="petalsPill"
          className="flex items-center gap-1.5 bg-[#ffe9e8] px-3.5 py-1.5 rounded-full shadow-2xs hover:bg-[#ffd9e1] active:scale-95 transition-all"
        >
          <span className="text-sm">🌸</span>
          <span className="font-bold text-xs text-[#b7002d]">{user.petals} Petals</span>
          <span className="material-symbols-outlined text-[15px] text-[#b7002d]">chevron_right</span>
        </button>
      </div>

      {/* Seasonal Passport Hero Card */}
      <div className="rounded-3xl bg-white border border-[#ffe1e1] p-4 md:p-6 shadow-sm relative overflow-hidden">
        {/* Glow Effects */}
        <div className="absolute -top-12 -right-12 w-44 h-44 rounded-full bg-[#fd94b1]/15 blur-2xl pointer-events-none" />
        <div className="absolute -bottom-8 -left-8 w-36 h-36 rounded-full bg-[#ffdad9]/30 blur-xl pointer-events-none" />

        {/* Season Switcher Pills */}
        <div className="flex items-center gap-1.5 pb-3 overflow-x-auto no-scrollbar">
          <button
            onClick={() => setActiveSeason('spring')}
            className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold transition-all ${
              activeSeason === 'spring'
                ? 'bg-[#b7002d] text-white shadow-xs'
                : 'bg-[#fff0f0] text-[#5c3f3f] hover:text-[#40000a]'
            }`}
          >
            <span>🌸</span>
            <span>Sakura Spring</span>
          </button>
          <button
            onClick={() => {
              setActiveSeason('summer');
              showToast('🌊 Summer Odyssey preview coming soon in June 2026!');
            }}
            className="flex items-center gap-1 bg-[#fff0f0] text-[#906f6f] px-3 py-1 rounded-full text-xs font-semibold hover:text-[#40000a]"
          >
            <span>🌊</span>
            <span>Summer</span>
          </button>
          <button
            onClick={() => {
              setActiveSeason('autumn');
              showToast('🍁 Autumn Harvest trail opens September 2026.');
            }}
            className="flex items-center gap-1 bg-[#fff0f0] text-[#906f6f] px-3 py-1 rounded-full text-xs font-semibold hover:text-[#40000a]"
          >
            <span>🍁</span>
            <span>Autumn</span>
          </button>
          <button
            onClick={() => {
              setActiveSeason('festive');
              showToast('🎁 Festive Winter Fair begins November 2026.');
            }}
            className="flex items-center gap-1 bg-[#fff0f0] text-[#906f6f] px-3 py-1 rounded-full text-xs font-semibold hover:text-[#40000a]"
          >
            <span>🎁</span>
            <span>Festive</span>
          </button>
        </div>

        {/* Passport Card Header */}
        <div className="flex items-start justify-between gap-2 mt-1">
          <div className="min-w-0">
            <div className="inline-flex items-center gap-1 bg-[#ffe9e8] text-[#b7002d] px-2 py-0.5 rounded-full text-[10px] uppercase font-bold tracking-wider mb-1">
              <span className="material-symbols-outlined text-[13px]">military_tech</span>
              <span>Seasonal Passport</span>
            </div>
            <h2 className="font-serif-luxury font-bold text-lg md:text-xl text-[#40000a]">
              Sakura Spring Trail
            </h2>
            <p className="text-xs text-[#5c3f3f] mt-0.5">
              Collect cherry blossom stamps across Takashimaya to unlock exclusive collectibles!
            </p>
          </div>

          <div className="flex flex-col items-end shrink-0 pl-2">
            <span className="text-[10px] text-[#906f6f]">Trail Progress</span>
            <span className="font-serif-luxury font-bold text-lg text-[#b7002d]">
              {collectedCount} <span className="text-xs font-normal text-[#906f6f]">/ 10</span>
            </span>
          </div>
        </div>

        {/* 10 Stamp Rally Grid */}
        <div className="mt-4 grid grid-cols-5 gap-2 md:gap-3">
          {stamps.map((st) => (
            <div
              key={st.id}
              onClick={() => stampTrailCheckpoint(st.id)}
              className="flex flex-col items-center cursor-pointer group"
            >
              <div
                className={`relative w-12 h-12 md:w-14 md:h-14 rounded-2xl flex items-center justify-center transition-all active:scale-95 ${
                  st.isCollected
                    ? st.id === 6
                      ? 'bg-gradient-to-tr from-[#b7002d] to-[#df2040] text-white shadow-xs'
                      : 'bg-[#ffe9e8] text-[#b7002d] shadow-2xs'
                    : 'bg-[#fff0f0] text-[#906f6f]/50 hover:bg-[#ffe1e1]'
                }`}
              >
                {st.id === 6 && st.isCollected ? (
                  <img
                    src={ROSE_CHAN_PORTRAIT}
                    alt="Rose-chan Stamp"
                    className="w-8 h-8 rounded-full object-cover object-top border border-white"
                  />
                ) : (
                  <span
                    className="material-symbols-outlined text-[22px]"
                    style={st.isCollected ? { fontVariationSettings: "'FILL' 1" } : {}}
                  >
                    {st.icon}
                  </span>
                )}

                {/* Collected Badge */}
                {st.isCollected && (
                  <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#b7002d] text-white flex items-center justify-center shadow-xs">
                    <span className="material-symbols-outlined text-[10px]">check</span>
                  </div>
                )}

                {/* Locked number */}
                {!st.isCollected && (
                  <span className="absolute bottom-1 text-[9px] font-bold text-[#906f6f]/70">
                    {st.id}
                  </span>
                )}
              </div>

              <span
                className={`text-[10px] mt-1 font-semibold truncate ${
                  st.isCollected ? 'text-[#b7002d]' : 'text-[#5c3f3f]'
                }`}
              >
                {st.name}
              </span>
              <span className="text-[9px] text-[#906f6f] truncate">{st.floor}</span>
            </div>
          ))}
        </div>

        {/* Next Checkpoint Quick Navigator Bar */}
        <div className="mt-4 p-3 rounded-2xl bg-[#fff8f7] border border-[#ffe9e8] flex items-center justify-between">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-full bg-[#df2040] text-white flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[16px]">pin_drop</span>
            </div>
            <div className="min-w-0">
              <p className="font-bold text-xs text-[#b7002d] leading-tight">
                Next Stop: Level 2 Fashion
              </p>
              <p className="text-[11px] text-[#906f6f] truncate">
                Show barcode or scan QR at cashier counter
              </p>
            </div>
          </div>

          <button
            onClick={handleNextStop}
            className="bg-[#b7002d] text-white text-xs font-bold px-3 py-1.5 rounded-full shrink-0 shadow-xs hover:bg-[#920022] active:scale-95 transition-all flex items-center gap-1"
          >
            <span>Trail Map</span>
            <span className="material-symbols-outlined text-[14px]">map</span>
          </button>
        </div>

        {/* Completion Prize Teaser Banner */}
        <div className="mt-3 p-3 rounded-2xl bg-[#fff0f0] border border-[#ffe1e1] flex items-center gap-3">
          <div className="w-13 h-13 rounded-xl bg-white overflow-hidden shrink-0 shadow-xs border border-[#e5bdbc]">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDIZBirUt79T8iOaWkLvC0_yGXVgoxe7Rqg0CgcI7VK-xdlO9nETzAGSNr9eigczAzg63QZ2SPWosPc6DctuMePD0RZJ1mMJ_PuGAUxG0EB5wSC5ognzNYdIJnHUnqlsJgp9zEbq4xI_9EnqnJ0NgC1HuVmDKKP2J55wCP_jFtYW_j2b8YeTXI_xrKZim9Q0OYGySVv0xAJO-cQXhJXYXNHxel57AfuyBRgXwahg-Tt8dW7MR6_-hRL"
              alt="Sakura Pouch Gift"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="min-w-0 flex-1">
            <span className="text-[9px] uppercase font-bold tracking-wider text-[#b7002d]">
              Completion Gift
            </span>
            <h4 className="font-bold text-xs text-[#40000a] leading-tight truncate">
              Limited Edition Sakura Pouch &amp; Keychain
            </h4>
            <p className="text-[11px] text-[#906f6f]">
              Collect {10 - collectedCount} more stamps to claim at Customer Service L3.
            </p>
          </div>
          <span className="material-symbols-outlined text-[#b7002d] text-[20px] shrink-0">
            featured_seasonal_and_gifts
          </span>
        </div>
      </div>

      {/* Today's Challenges */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[#b7002d] text-[18px]">assignment</span>
            <h3 className="font-serif-luxury font-bold text-base text-[#40000a]">
              Today&apos;s Challenges
            </h3>
            <span className="text-sm">🌸</span>
          </div>
          <span className="text-xs font-semibold text-[#b7002d]">Refreshes 00:00</span>
        </div>

        {/* Horizontal challenges scroller */}
        <div className="flex gap-3 overflow-x-auto no-scrollbar pb-1">
          {/* Challenge 1: Trivia Quiz */}
          <div className="min-w-[240px] max-w-[260px] flex-1 rounded-2xl bg-white border border-[#ffe1e1] p-4 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] uppercase font-bold tracking-wider text-[#906f6f]">
                  Daily Quiz
                </span>
                <span className="px-2 py-0.5 rounded-full bg-[#ffe9e8] text-[#b7002d] text-[10px] font-bold">
                  +10 Petals
                </span>
              </div>
              <div className="flex items-start gap-2.5">
                <div className="w-8 h-8 rounded-full bg-[#ffe9e8] text-[#b7002d] flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-[17px]">quiz</span>
                </div>
                <div>
                  <h4 className="font-bold text-xs text-[#40000a] leading-snug">Takashimaya Trivia</h4>
                  <p className="text-[11px] text-[#906f6f] mt-0.5">
                    Test your spring knowledge in 3 quick questions.
                  </p>
                </div>
              </div>
            </div>
            <button
              onClick={() => setIsTriviaModalOpen(true)}
              className="mt-3 w-full py-1.5 rounded-full bg-[#b7002d] text-white text-xs font-bold hover:bg-[#920022] active:scale-95 transition-all shadow-xs"
            >
              Start now
            </button>
          </div>

          {/* Challenge 2: Brand Mission */}
          <div className="min-w-[240px] max-w-[260px] flex-1 rounded-2xl bg-white border border-[#ffe1e1] p-4 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] uppercase font-bold tracking-wider text-[#906f6f]">
                  Brand Mission
                </span>
                <span className="px-2 py-0.5 rounded-full bg-[#ffe9e8] text-[#b7002d] text-[10px] font-bold">
                  +20 Petals
                </span>
              </div>
              <div className="flex items-start gap-2.5">
                <div className="w-8 h-8 rounded-full bg-[#ffe9e8] text-[#b7002d] flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-[17px]">storefront</span>
                </div>
                <div>
                  <h4 className="font-bold text-xs text-[#40000a] leading-snug">Explore Shiseido</h4>
                  <p className="text-[11px] text-[#906f6f] mt-0.5">
                    Check-in at L1 Sakura Beauty Studio popup.
                  </p>
                </div>
              </div>
            </div>
            <button
              onClick={handleBrandMission}
              className="mt-3 w-full py-1.5 rounded-full bg-[#fff0f0] text-[#b7002d] border border-[#e5bdbc] text-xs font-bold hover:bg-[#ffe1e1] active:scale-95 transition-all"
            >
              View mission
            </button>
          </div>

          {/* Challenge 3: Purchase Mission */}
          <div className="min-w-[240px] max-w-[260px] flex-1 rounded-2xl bg-white border border-[#ffe1e1] p-4 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] uppercase font-bold tracking-wider text-[#906f6f]">
                  Shopping Quest
                </span>
                <span className="px-2 py-0.5 rounded-full bg-[#ffe9e8] text-[#b7002d] text-[10px] font-bold">
                  +50 Petals
                </span>
              </div>
              <div className="flex items-start gap-2.5">
                <div className="w-8 h-8 rounded-full bg-[#ffe9e8] text-[#b7002d] flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-[17px]">receipt_long</span>
                </div>
                <div>
                  <h4 className="font-bold text-xs text-[#40000a] leading-snug">Spend Min. S$50</h4>
                  <p className="text-[11px] text-[#906f6f] mt-0.5">
                    In a single same-day in-store receipt.
                  </p>
                </div>
              </div>
            </div>
            <button
              onClick={() => {
                setSelectedFloor('B2');
                setIsFloorMapModalOpen(true);
              }}
              className="mt-3 w-full py-1.5 rounded-full bg-[#fff0f0] text-[#b7002d] border border-[#e5bdbc] text-xs font-bold hover:bg-[#ffe1e1] active:scale-95 transition-all"
            >
              Shop now
            </button>
          </div>
        </div>
      </div>

      {/* Milestone Tier Tracker Card */}
      <div className="p-4 md:p-5 rounded-3xl bg-white border border-[#ffe1e1] shadow-xs">
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[#b7002d] text-[18px]">crown</span>
            <h4 className="font-serif-luxury font-bold text-sm md:text-base text-[#40000a]">
              Milestone Progress
            </h4>
          </div>
          <span className="text-xs text-[#5c3f3f]">
            Tier: <strong className="text-[#b7002d]">Silver Explorer</strong>
          </span>
        </div>
        <p className="text-xs text-[#906f6f] mb-4">
          Earn 180 more Petals to unlock Gold Member perks &amp; double multipliers.
        </p>

        {/* Stepper Progress Bar */}
        <div className="relative pt-2 pb-6 px-3">
          <div className="w-full h-2 rounded-full bg-[#ffe1e1]" />
          <div className="absolute top-2 left-3 w-[40%] h-2 rounded-full bg-gradient-to-r from-[#b7002d] to-[#df2040]" />
          <div className="absolute inset-x-3 top-0 flex justify-between pointer-events-none">
            <div className="flex flex-col items-center">
              <div className="w-6 h-6 rounded-full bg-[#b7002d] text-white flex items-center justify-center text-[10px] shadow-xs">
                ★
              </div>
              <span className="text-[10px] text-[#b7002d] font-bold mt-1">Silver</span>
              <span className="text-[9px] text-[#906f6f]">0</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-6 h-6 rounded-full bg-[#ffe9e8] text-[#cca730] border border-[#cca730] flex items-center justify-center text-[10px] shadow-xs">
                ✪
              </div>
              <span className="text-[10px] text-[#40000a] font-semibold mt-1">Gold</span>
              <span className="text-[9px] text-[#906f6f]">300</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-6 h-6 rounded-full bg-[#fff0f0] text-[#906f6f] flex items-center justify-center text-[10px]">
                ◆
              </div>
              <span className="text-[10px] text-[#906f6f] mt-1">Platinum</span>
              <span className="text-[9px] text-[#906f6f]">600</span>
            </div>
          </div>
        </div>
      </div>

      {/* Petal Rewards Catalog (All 6 Items) */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <div>
            <h3 className="font-serif-luxury font-bold text-lg text-[#40000a]">Petal Rewards</h3>
            <p className="text-[11px] text-[#906f6f]">Redeem using your collected sakura blooms</p>
          </div>
          <span className="text-xs font-bold text-[#b7002d]">6 Available</span>
        </div>

        {/* 2-Column Grid */}
        <div className="grid grid-cols-2 gap-3">
          {rewards.map((item) => {
            const canAfford = user.petals >= item.petalsCost;
            return (
              <div
                key={item.id}
                className="rounded-2xl bg-white border border-[#ffe1e1] p-3 shadow-xs flex flex-col justify-between overflow-hidden"
              >
                <div>
                  <div className="relative aspect-square rounded-xl overflow-hidden bg-[#fff0f0] mb-2">
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-1.5 left-1.5 bg-white/90 backdrop-blur-xs px-2 py-0.5 rounded-full">
                      <span className="text-[9px] font-bold text-[#b7002d] tracking-wide uppercase">
                        {item.tag}
                      </span>
                    </div>
                  </div>
                  <h4 className="font-bold text-xs text-[#40000a] line-clamp-2 leading-snug">
                    {item.title}
                  </h4>
                  <p className="text-[10px] text-[#906f6f] mt-1 line-clamp-2">{item.description}</p>
                </div>

                <div className="pt-2 mt-2 border-t border-[#fff0f0]">
                  <div className="flex items-center gap-1 mb-2">
                    <span className="text-xs">🌸</span>
                    <span className="font-bold text-xs text-[#b7002d]">
                      {item.petalsCost} Petals
                    </span>
                    {!canAfford && (
                      <span className="text-[10px] text-[#906f6f] ml-auto">
                        Need {item.petalsCost - user.petals}
                      </span>
                    )}
                  </div>

                  <button
                    onClick={() => redeemReward(item)}
                    disabled={!canAfford}
                    className={`w-full py-1.5 rounded-full text-xs font-bold transition-all ${
                      canAfford
                        ? 'bg-[#b7002d] text-white hover:bg-[#920022] active:scale-95 shadow-xs'
                        : 'bg-[#ffe9e8] text-[#906f6f] cursor-not-allowed opacity-80'
                    }`}
                  >
                    {canAfford ? 'Redeem' : 'Collect more'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
