import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';

export const OmikujiModal: React.FC = () => {
  const { isOmikujiModalOpen, setIsOmikujiModalOpen, currentFortune, drawFortune } = useApp();
  const [isShaking, setIsShaking] = useState(false);
  const [hasDrawn, setHasDrawn] = useState(false);

  if (!isOmikujiModalOpen) return null;

  const handleShakeAndDraw = () => {
    setIsShaking(true);
    setHasDrawn(false);
    setTimeout(() => {
      setIsShaking(false);
      drawFortune();
      setHasDrawn(true);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-[#fff8f7] w-full max-w-md rounded-3xl shadow-2xl border border-[#ffe1e1] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-4 bg-gradient-to-r from-[#b7002d] via-[#df2040] to-[#b7002d] text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="text-xl">🎋</span>
            <div>
              <h3 className="font-serif-luxury font-bold text-base">
                Today&apos;s Omikuji (おみくじ)
              </h3>
              <p className="text-[11px] text-white/80">Traditional Japanese Shrine Fortune</p>
            </div>
          </div>
          <button
            onClick={() => setIsOmikujiModalOpen(false)}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Fortune Box & Animation */}
        <div className="p-6 flex flex-col items-center text-center">
          {/* Cylinder Box Graphic */}
          <div className="relative mb-5">
            <div
              className={`w-28 h-40 bg-gradient-to-b from-[#b7002d] to-[#782844] rounded-2xl border-4 border-[#cca730] shadow-xl flex flex-col items-center justify-between py-3 text-white transition-transform ${
                isShaking ? 'animate-cylinder-shake' : ''
              }`}
            >
              <div className="w-16 h-3 rounded-full bg-[#cca730]/60 border border-[#ffe088]" />
              <div className="flex flex-col items-center">
                <span className="text-[10px] tracking-widest uppercase font-bold text-[#ffe088]">
                  高島屋
                </span>
                <span className="font-serif-luxury font-bold text-2xl text-white mt-0.5">
                  御神籤
                </span>
                <span className="text-[9px] text-[#ffd9e1]">OMIKUJI</span>
              </div>
              <div className="w-4 h-4 rounded-full bg-[#cca730] border-2 border-white flex items-center justify-center text-[8px] font-black text-[#735c00]">
                8
              </div>
            </div>

            {/* Falling Sakura Petals */}
            <div className="absolute -top-3 -left-4 text-lg animate-sakura">🌸</div>
            <div className="absolute top-10 -right-4 text-sm animate-sakura delay-300">🌸</div>
          </div>

          {/* Fortune Result Display */}
          <div className="w-full bg-white rounded-2xl p-5 border border-[#ffe1e1] shadow-xs">
            <div className="flex items-center justify-between pb-3 border-b border-[#ffe9e8]">
              <div className="flex items-center gap-2">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#df2040] to-[#b7002d] text-white flex flex-col items-center justify-center shadow-xs">
                  <span className="font-serif-luxury font-black text-xl leading-none">
                    {currentFortune.kanji}
                  </span>
                  <span className="text-[8px] tracking-widest mt-0.5 uppercase">
                    {currentFortune.romaji}
                  </span>
                </div>
                <div className="text-left">
                  <span className="text-[10px] uppercase tracking-wider font-bold text-[#b7002d]">
                    {currentFortune.meaning}
                  </span>
                  <h4 className="text-sm font-bold text-[#40000a] leading-tight">
                    Blessed Season at Ngee Ann City
                  </h4>
                </div>
              </div>
              <div className="px-2.5 py-1 rounded-full bg-[#ffe9e8] text-[#b7002d] font-bold text-xs">
                +{currentFortune.bonusPetals} Petals
              </div>
            </div>

            <p className="text-xs text-[#5c3f3f] mt-3 leading-relaxed text-left">
              {currentFortune.description}
            </p>

            <div className="mt-3 pt-3 border-t border-[#fff0f0] grid grid-cols-2 gap-2 text-left text-[11px]">
              <div className="bg-[#fff8f7] p-2 rounded-xl border border-[#ffe9e8]">
                <span className="text-[#906f6f] block text-[10px]">Lucky Floor:</span>
                <span className="font-bold text-[#b7002d]">{currentFortune.luckyFloor}</span>
              </div>
              <div className="bg-[#fff8f7] p-2 rounded-xl border border-[#ffe9e8]">
                <span className="text-[#906f6f] block text-[10px]">Lucky Charm:</span>
                <span className="font-bold text-[#40000a]">{currentFortune.luckyItem}</span>
              </div>
            </div>
          </div>

          {/* Draw Button */}
          <button
            onClick={handleShakeAndDraw}
            disabled={isShaking}
            className="mt-5 w-full py-3 rounded-full bg-gradient-to-r from-[#b7002d] via-[#df2040] to-[#b7002d] text-white font-bold text-sm shadow-md hover:opacity-95 active:scale-95 disabled:opacity-50 transition-all flex items-center justify-center gap-2"
          >
            <span className="material-symbols-outlined text-[20px]">
              {isShaking ? 'cached' : 'temple_buddhist'}
            </span>
            <span>{isShaking ? 'Shaking Omikuji Cylinder...' : 'Shake Cylinder & Draw Fortune'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
