import React from 'react';
import { useApp } from '../../context/AppContext';
import { ScreenType } from '../../types';

export const BottomNav: React.FC = () => {
  const { activeScreen, setActiveScreen } = useApp();

  return (
    <nav className="w-full bg-[#fff8f7]/95 backdrop-blur-2xl border-t border-[#ffe1e1] shadow-[0_-8px_28px_rgba(223,32,64,0.08)]">
      <div className="flex justify-between items-center h-16 px-4 w-full relative">
        {/* Home */}
        <button
          onClick={() => setActiveScreen('home')}
          className={`flex flex-col items-center justify-center flex-1 min-w-[44px] h-full transition-colors group ${
            activeScreen === 'home' ? 'text-[#b7002d] font-bold' : 'text-[#5c3f3f] hover:text-[#40000a]'
          }`}
        >
          <span
            className="material-symbols-outlined text-[23px] mb-0.5 group-hover:scale-105 transition-transform"
            style={activeScreen === 'home' ? { fontVariationSettings: "'FILL' 1" } : {}}
          >
            storefront
          </span>
          <span className="text-[11px] tracking-tight">Home</span>
        </button>

        {/* Explore */}
        <button
          onClick={() => setActiveScreen('explore')}
          className={`flex flex-col items-center justify-center flex-1 min-w-[44px] h-full transition-colors group ${
            activeScreen === 'explore' ? 'text-[#b7002d] font-bold' : 'text-[#5c3f3f] hover:text-[#40000a]'
          }`}
        >
          <span
            className="material-symbols-outlined text-[23px] mb-0.5 group-hover:scale-105 transition-transform"
            style={activeScreen === 'explore' ? { fontVariationSettings: "'FILL' 1" } : {}}
          >
            explore
          </span>
          <span className="text-[11px] tracking-tight">Explore</span>
        </button>

        {/* Center Floating Pay Button */}
        <div className="flex flex-col items-center justify-center flex-1 min-w-[54px] -mt-5">
          <button
            onClick={() => setActiveScreen('pay')}
            aria-label="Takashimaya Member Pay"
            className={`w-14 h-14 rounded-full flex flex-col items-center justify-center text-white shadow-[0_8px_24px_rgba(223,32,64,0.4)] active:scale-95 transition-all ${
              activeScreen === 'pay'
                ? 'bg-gradient-to-tr from-[#920022] via-[#b7002d] to-[#df2040] ring-4 ring-[#ffdad9]'
                : 'bg-gradient-to-tr from-[#b7002d] to-[#df2040]'
            }`}
          >
            <span className="material-symbols-outlined text-[24px]">qr_code_2</span>
            <span className="text-[9px] font-black uppercase tracking-wider leading-none">PAY</span>
          </button>
          <span className="text-[10px] text-[#b7002d] font-bold mt-1 tracking-wide">
            Pay
          </span>
        </div>

        {/* Rewards */}
        <button
          onClick={() => setActiveScreen('rewards')}
          className={`flex flex-col items-center justify-center flex-1 min-w-[44px] h-full transition-colors group ${
            activeScreen === 'rewards' ? 'text-[#b7002d] font-bold' : 'text-[#5c3f3f] hover:text-[#40000a]'
          }`}
        >
          <span
            className="material-symbols-outlined text-[23px] mb-0.5 group-hover:scale-105 transition-transform"
            style={activeScreen === 'rewards' ? { fontVariationSettings: "'FILL' 1" } : {}}
          >
            featured_seasonal_and_gifts
          </span>
          <span className="text-[11px] tracking-tight">Rewards</span>
        </button>

        {/* Account */}
        <button
          onClick={() => setActiveScreen('account')}
          className={`flex flex-col items-center justify-center flex-1 min-w-[44px] h-full transition-colors group ${
            activeScreen === 'account' ? 'text-[#b7002d] font-bold' : 'text-[#5c3f3f] hover:text-[#40000a]'
          }`}
        >
          <span
            className="material-symbols-outlined text-[23px] mb-0.5 group-hover:scale-105 transition-transform"
            style={activeScreen === 'account' ? { fontVariationSettings: "'FILL' 1" } : {}}
          >
            person
          </span>
          <span className="text-[11px] tracking-tight">Account</span>
        </button>
      </div>
    </nav>
  );
};
