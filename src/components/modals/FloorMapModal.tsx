import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { floorDirectories } from '../../data/mockData';

export const FloorMapModal: React.FC = () => {
  const {
    isFloorMapModalOpen,
    setIsFloorMapModalOpen,
    selectedFloor,
    setSelectedFloor,
    showToast,
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');

  if (!isFloorMapModalOpen) return null;

  const activeFloorData =
    floorDirectories.find((f) => f.level === selectedFloor) || floorDirectories[0];

  const filteredShops = activeFloorData.featuredShops.filter((shop) =>
    searchQuery === ''
      ? true
      : shop.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        shop.tag.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-[#fff8f7] w-full max-w-2xl rounded-3xl shadow-2xl border border-[#ffe1e1] overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-4 bg-gradient-to-r from-[#b7002d] via-[#df2040] to-[#b7002d] text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center">
              <span className="material-symbols-outlined text-[20px]">map</span>
            </div>
            <div>
              <h3 className="font-serif-luxury font-bold text-base">
                Interactive Floor Navigator
              </h3>
              <p className="text-[11px] text-white/80">Takashimaya Ngee Ann City • Orchard</p>
            </div>
          </div>
          <button
            onClick={() => setIsFloorMapModalOpen(false)}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Floor selector tabs */}
        <div className="px-4 py-3 bg-white border-b border-[#ffe9e8] flex items-center gap-2 overflow-x-auto no-scrollbar">
          {floorDirectories.map((floor) => {
            const isSelected = selectedFloor === floor.level;
            return (
              <button
                key={floor.level}
                onClick={() => setSelectedFloor(floor.level)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-[#b7002d] text-white shadow-sm'
                    : 'bg-[#fff0f0] text-[#5c3f3f] hover:bg-[#ffe1e1]'
                }`}
              >
                <span>{floor.level}</span>
                <span className="text-[10px] opacity-80 font-normal">
                  {floor.name.split(' ')[0]}
                </span>
              </button>
            );
          })}
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4 no-scrollbar">
          {/* Active Floor Banner */}
          <div className="p-4 rounded-2xl bg-gradient-to-br from-[#fff0f0] via-[#ffe9e8] to-[#ffdad9] border border-[#e5bdbc] flex flex-col md:flex-row md:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-[#b7002d] text-white text-xs font-bold">
                  {activeFloorData.level}
                </span>
                <h4 className="font-serif-luxury font-bold text-lg text-[#40000a]">
                  {activeFloorData.name}
                </h4>
              </div>
              <p className="text-xs text-[#5c3f3f] mt-1">{activeFloorData.highlight}</p>
            </div>

            {/* Amenity Badges */}
            <div className="flex items-center gap-2 shrink-0">
              <span className="px-2.5 py-1 rounded-full bg-white text-[#b7002d] text-[11px] font-semibold border border-[#e5bdbc] flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px]">wc</span>
                Restrooms
              </span>
              <span className="px-2.5 py-1 rounded-full bg-white text-[#b7002d] text-[11px] font-semibold border border-[#e5bdbc] flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px]">elevator</span>
                Lifts
              </span>
            </div>
          </div>

          {/* Search within floor */}
          <div className="relative">
            <span className="material-symbols-outlined absolute left-3.5 top-2.5 text-[#906f6f] text-[18px]">
              search
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={`Search boutiques, gourmet, services on ${activeFloorData.level}...`}
              className="w-full pl-10 pr-4 py-2 bg-white border border-[#e5bdbc] rounded-xl text-xs text-[#40000a] placeholder-[#906f6f] focus:outline-none focus:ring-2 focus:ring-[#b7002d]/40"
            />
          </div>

          {/* Categories on this floor */}
          <div>
            <h5 className="text-[11px] font-bold uppercase tracking-wider text-[#906f6f] mb-2">
              Departments &amp; Zones
            </h5>
            <div className="flex flex-wrap gap-1.5">
              {activeFloorData.categories.map((cat, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded-lg bg-white border border-[#ffe1e1] text-xs font-medium text-[#40000a]"
                >
                  {cat}
                </span>
              ))}
            </div>
          </div>

          {/* Featured Boutiques & Shops */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <h5 className="text-[11px] font-bold uppercase tracking-wider text-[#906f6f]">
                Directory Listings ({filteredShops.length})
              </h5>
              <span className="text-[10px] text-[#b7002d] font-semibold">
                Tap shop to bookmark
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {filteredShops.map((shop, i) => (
                <div
                  key={i}
                  onClick={() => showToast(`📍 Saved ${shop.name} (${shop.unit}) to your visit list!`)}
                  className="p-3 bg-white rounded-xl border border-[#ffe9e8] hover:border-[#b7002d]/40 hover:shadow-xs transition-all cursor-pointer flex items-center justify-between group"
                >
                  <div>
                    <h6 className="text-xs font-bold text-[#40000a] group-hover:text-[#b7002d] transition-colors">
                      {shop.name}
                    </h6>
                    <p className="text-[11px] text-[#906f6f]">{shop.tag}</p>
                  </div>
                  <div className="text-right">
                    <span className="px-2 py-0.5 rounded-md bg-[#fff0f0] text-[#b7002d] font-mono text-[11px] font-bold">
                      {shop.unit}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
