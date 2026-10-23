import React from 'react';
import { useApp } from '../../context/AppContext';
import { ScreenType } from '../../types';

export const Sidebar: React.FC = () => {
  const {
    activeScreen,
    setActiveScreen,
    sidebarOpen,
    setSidebarOpen,
    user,
    setIsFloorMapModalOpen,
    setIsOmikujiModalOpen,
    setIsRoseChatOpen,
    setIsVoucherWalletOpen,
    setIsTriviaModalOpen,
    vouchers,
    language,
    setLanguage,
  } = useApp();

  const navItems: { id: ScreenType; label: string; icon: string; badge?: string }[] = [
    { id: 'home', label: 'Home Dashboard', icon: 'home' },
    { id: 'explore', label: 'Explore & Journal', icon: 'explore' },
    { id: 'pay', label: 'Member & Pay QR', icon: 'qr_code_2' },
    { id: 'rewards', label: 'Rewards & Passport', icon: 'featured_seasonal_and_gifts', badge: 'Sakura' },
    { id: 'account', label: 'Account & Prestige VIP', icon: 'person', badge: 'Gold' },
  ];

  const handleNavClick = (screen: ScreenType) => {
    setActiveScreen(screen);
    // On small screens, close sidebar
    if (window.innerWidth < 1024) {
      setSidebarOpen(false);
    }
  };

  const activeVoucherCount = vouchers.filter((v) => !v.isUsed).length;

  return (
    <>
      {/* Drawer Backdrop overlay */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black/50 backdrop-blur-xs z-50 transition-opacity"
        />
      )}

      {/* Sidebar Drawer container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-72 sm:w-80 max-w-[85%] bg-white border-r border-[#ffe1e1] shadow-2xl flex flex-col justify-between transition-transform duration-300 ease-in-out ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } overflow-y-auto no-scrollbar`}
      >
        {/* Top Section */}
        <div>
          {/* Header Brand */}
          <div className="p-5 border-b border-[#ffe9e8] flex items-center justify-between bg-gradient-to-br from-[#fff8f7] to-[#fff0f0]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#b7002d] text-white flex items-center justify-center font-bold text-sm shadow-md">
                <span>高</span>
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-serif-luxury font-bold text-[18px] text-[#b7002d] tracking-tight">
                    Takashimaya
                  </span>
                  <span className="px-1 py-0.2 rounded-full bg-[#df2040] text-white text-[9px] font-bold uppercase tracking-wider">
                    SG
                  </span>
                </div>
                <p className="text-[11px] text-[#906f6f] font-medium">Ngee Ann City • Orchard</p>
              </div>
            </div>

            <button
              onClick={() => setSidebarOpen(false)}
              className="w-8 h-8 rounded-full flex items-center justify-center text-[#906f6f] hover:bg-[#ffe1e1] lg:hidden transition-colors"
            >
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>
          </div>

          {/* Member Card Snapshot */}
          <div className="p-4 mx-4 my-3 rounded-2xl bg-gradient-to-br from-[#fff0f0] via-[#ffe9e8] to-[#ffdad9] border border-[#e5bdbc]/60 shadow-xs">
            <div className="flex items-center gap-3">
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80"
                  alt={user.name}
                  referrerPolicy="no-referrer"
                  className="w-11 h-11 rounded-full object-cover border-2 border-white shadow-xs"
                />
                <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-[#cca730] text-white flex items-center justify-center text-[9px] font-bold shadow-xs">
                  ★
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="font-semibold text-sm text-[#40000a] truncate">{user.name}</span>
                  <span className="px-1.5 py-0.5 rounded-full bg-[#cca730]/20 text-[#735c00] font-bold text-[10px]">
                    GOLD
                  </span>
                </div>
                <p className="text-[11px] text-[#5c3f3f] truncate">{user.memberId} · Valid 2026</p>
              </div>
            </div>

            {/* Quick Balances */}
            <div className="mt-3 pt-2.5 border-t border-[#e5bdbc]/50 flex items-center justify-between text-xs">
              <div className="flex items-center gap-1">
                <span className="text-sm">🌸</span>
                <span className="font-bold text-[#b7002d]">{user.petals} Petals</span>
                <span className="text-[10px] text-[#5c3f3f]">(S${(user.petals * 0.1).toFixed(2)})</span>
              </div>
              <button
                onClick={() => handleNavClick('rewards')}
                className="text-[11px] font-bold text-[#b7002d] hover:underline"
              >
                Redeem &rarr;
              </button>
            </div>
          </div>

          {/* Navigation Menu */}
          <div className="px-3 py-2">
            <p className="px-3 text-[10px] font-bold uppercase tracking-wider text-[#906f6f] mb-1.5">
              Main Navigation
            </p>
            <nav className="space-y-1">
              {navItems.map((item) => {
                const isActive = activeScreen === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl font-medium text-sm transition-all ${
                      isActive
                        ? 'bg-[#b7002d] text-white shadow-sm font-semibold'
                        : 'text-[#40000a] hover:bg-[#ffe9e8]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className="material-symbols-outlined text-[20px]"
                        style={isActive ? { fontVariationSettings: "'FILL' 1" } : {}}
                      >
                        {item.icon}
                      </span>
                      <span>{item.label}</span>
                    </div>
                    {item.badge && (
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          isActive
                            ? 'bg-white/20 text-white'
                            : 'bg-[#ffe1e1] text-[#b7002d]'
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Interactive Shortcuts / Tools */}
          <div className="px-3 py-2 border-t border-[#ffe9e8]">
            <p className="px-3 text-[10px] font-bold uppercase tracking-wider text-[#906f6f] mb-1.5">
              Quick In-Store Tools
            </p>
            <div className="grid grid-cols-2 gap-1.5">
              <button
                onClick={() => setIsFloorMapModalOpen(true)}
                className="p-2.5 rounded-xl bg-[#fff8f7] border border-[#ffe1e1] hover:bg-[#ffe9e8] text-left transition-all group"
              >
                <div className="w-7 h-7 rounded-lg bg-[#b7002d]/10 text-[#b7002d] flex items-center justify-center mb-1 group-hover:scale-105 transition-transform">
                  <span className="material-symbols-outlined text-[17px]">map</span>
                </div>
                <p className="text-xs font-bold text-[#40000a]">Floor Map</p>
                <p className="text-[10px] text-[#906f6f]">B2 to L4 Guide</p>
              </button>

              <button
                onClick={() => setIsOmikujiModalOpen(true)}
                className="p-2.5 rounded-xl bg-[#fff8f7] border border-[#ffe1e1] hover:bg-[#ffe9e8] text-left transition-all group"
              >
                <div className="w-7 h-7 rounded-lg bg-[#b7002d]/10 text-[#b7002d] flex items-center justify-center mb-1 group-hover:scale-105 transition-transform">
                  <span className="material-symbols-outlined text-[17px]">temple_buddhist</span>
                </div>
                <p className="text-xs font-bold text-[#40000a]">Omikuji</p>
                <p className="text-[10px] text-[#906f6f]">Draw Fortune</p>
              </button>

              <button
                onClick={() => setIsRoseChatOpen(true)}
                className="p-2.5 rounded-xl bg-[#fff8f7] border border-[#ffe1e1] hover:bg-[#ffe9e8] text-left transition-all group"
              >
                <div className="w-7 h-7 rounded-lg overflow-hidden mb-1 group-hover:scale-105 transition-transform border border-[#e5bdbc]">
                  <img
                    src="/src/assets/images/rose_chan_portrait_1792376401667.jpg"
                    alt="Rose-chan"
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <p className="text-xs font-bold text-[#40000a]">Rose-chan</p>
                <p className="text-[10px] text-[#906f6f]">Live Concierge</p>
              </button>

              <button
                onClick={() => setIsVoucherWalletOpen(true)}
                className="p-2.5 rounded-xl bg-[#fff8f7] border border-[#ffe1e1] hover:bg-[#ffe9e8] text-left transition-all group relative"
              >
                <div className="w-7 h-7 rounded-lg bg-[#b7002d]/10 text-[#b7002d] flex items-center justify-center mb-1 group-hover:scale-105 transition-transform">
                  <span className="material-symbols-outlined text-[17px]">confirmation_number</span>
                </div>
                <p className="text-xs font-bold text-[#40000a]">Vouchers</p>
                <p className="text-[10px] text-[#906f6f]">{activeVoucherCount} Active</p>
                {activeVoucherCount > 0 && (
                  <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#df2040]"></span>
                )}
              </button>

              <button
                onClick={() => setIsTriviaModalOpen(true)}
                className="col-span-2 p-2.5 rounded-xl bg-gradient-to-r from-[#ffe9e8] to-[#fff0f0] border border-[#e5bdbc] hover:opacity-95 text-left transition-all flex items-center justify-between"
              >
                <div className="flex items-center gap-2">
                  <span className="text-base">🌸</span>
                  <div>
                    <p className="text-xs font-bold text-[#40000a]">Daily Taka Trivia</p>
                    <p className="text-[10px] text-[#b7002d]">Win +10 Sakura Petals</p>
                  </div>
                </div>
                <span className="material-symbols-outlined text-[#b7002d] text-[18px]">play_circle</span>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="p-4 border-t border-[#ffe9e8] bg-[#fff8f7]">
          {/* Language Switcher */}
          <div className="flex items-center justify-between mb-3 text-xs">
            <span className="text-[11px] font-semibold text-[#5c3f3f]">Language / 言語</span>
            <div className="flex items-center gap-1 bg-[#ffe9e8] p-0.5 rounded-lg">
              {(['EN', '日本語', '中文'] as const).map((lang) => (
                <button
                  key={lang}
                  onClick={() => setLanguage(lang)}
                  className={`px-2 py-0.5 text-[10px] rounded font-semibold transition-colors ${
                    language === lang
                      ? 'bg-white text-[#b7002d] shadow-2xs'
                      : 'text-[#5c3f3f] hover:text-[#40000a]'
                  }`}
                >
                  {lang}
                </button>
              ))}
            </div>
          </div>

          {/* Operating hours & phone */}
          <div className="text-[11px] text-[#906f6f] space-y-1">
            <div className="flex items-center justify-between">
              <span>Store Hours:</span>
              <span className="font-semibold text-[#40000a]">10:00 AM – 9:30 PM</span>
            </div>
            <div className="flex items-center justify-between">
              <span>VIP Concierge:</span>
              <a href="tel:+6567381111" className="font-semibold text-[#b7002d] hover:underline">
                +65 6738 1111
              </a>
            </div>
          </div>

          <p className="text-[10px] text-center text-[#906f6f]/70 mt-3 uppercase tracking-wider font-semibold">
            Omotenashi Japanese Hospitality
          </p>
        </div>
      </aside>
    </>
  );
};
