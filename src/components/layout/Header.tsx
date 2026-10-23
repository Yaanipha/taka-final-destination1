import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';

export const Header: React.FC = () => {
  const {
    activeScreen,
    setActiveScreen,
    setIsRoseChatOpen,
    toggleSidebar,
    deviceViewMode,
    setDeviceViewMode,
    user,
  } = useApp();

  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <header className="sticky top-0 inset-x-0 z-40 bg-[#fff8f7]/95 backdrop-blur-xl border-b border-[#ffe1e1] shadow-[0_4px_20px_rgba(223,32,64,0.04)]">
      <div className="h-14 px-3 flex items-center justify-between w-full">
        {/* Brand & Drawer Trigger */}
        <div className="flex items-center gap-2">
          <button
            onClick={toggleSidebar}
            aria-label="Toggle Sidebar Navigation"
            className="w-9 h-9 flex items-center justify-center rounded-full text-[#b7002d] hover:bg-[#ffe9e8] transition-colors"
          >
            <span className="material-symbols-outlined text-[22px]">menu</span>
          </button>

          <button
            onClick={() => setActiveScreen('home')}
            className="flex flex-col text-left group"
          >
            <div className="flex items-center gap-1.5">
              <span className="font-serif-luxury font-bold text-[18px] text-[#b7002d] tracking-tight group-hover:opacity-90 transition-opacity">
                Takashimaya
              </span>
              <span className="px-1.5 py-0.2 rounded-full bg-[#df2040] text-[#fff8f8] text-[9px] font-bold tracking-wider uppercase shadow-[0_2px_6px_rgba(223,32,64,0.2)]">
                SG
              </span>
            </div>
            <span className="text-[9px] text-[#906f6f] tracking-widest uppercase font-semibold -mt-0.5">
              Ngee Ann City • Orchard
            </span>
          </button>
        </div>

        {/* Right Action Icons */}
        <div className="flex items-center gap-0.5 relative">
          {/* Quick Pay QR */}
          <button
            onClick={() => setActiveScreen('pay')}
            aria-label="Quick Pay QR"
            title="Scan & Pay QR"
            className={`w-8.5 h-8.5 flex items-center justify-center rounded-full transition-colors ${
              activeScreen === 'pay'
                ? 'bg-[#b7002d] text-white shadow-[0_2px_8px_rgba(183,0,45,0.3)]'
                : 'text-[#b7002d] hover:bg-[#ffe9e8]'
            }`}
          >
            <span className="material-symbols-outlined text-[20px]">qr_code_scanner</span>
          </button>

          {/* Concierge Help Trigger */}
          <button
            onClick={() => setIsRoseChatOpen(true)}
            aria-label="Customer Concierge Help"
            title="Rose-chan Concierge"
            className="w-8.5 h-8.5 flex items-center justify-center rounded-full text-[#5c3f3f] hover:bg-[#ffe9e8] transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">help_outline</span>
          </button>

          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              aria-label="Notifications"
              title="Notifications"
              className="w-8.5 h-8.5 flex items-center justify-center rounded-full text-[#5c3f3f] hover:bg-[#ffe9e8] transition-colors"
            >
              <span className="material-symbols-outlined text-[20px]">notifications</span>
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#df2040] shadow-[0_0_8px_rgba(223,32,64,0.6)]"></span>
            </button>

            {/* Notification Dropdown */}
            {showNotifications && (
              <div className="absolute right-0 top-12 w-80 bg-white rounded-2xl shadow-xl border border-[#ffe1e1] p-3 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="flex items-center justify-between pb-2 border-b border-[#ffe9e8]">
                  <span className="font-serif-luxury font-bold text-sm text-[#40000a]">
                    Notifications
                  </span>
                  <span className="text-[11px] text-[#b7002d] font-semibold cursor-pointer">
                    Mark all read
                  </span>
                </div>
                <div className="divide-y divide-[#fff0f0] mt-1 max-h-72 overflow-y-auto no-scrollbar">
                  <div className="py-2.5 flex items-start gap-2.5">
                    <span className="text-base">🌸</span>
                    <div>
                      <p className="text-xs font-semibold text-[#40000a]">
                        Sakura Spring Stamp Rally is Live!
                      </p>
                      <p className="text-[11px] text-[#5c3f3f]">
                        Collect stamps across B2 to L4 to claim the Rose-chan pouch.
                      </p>
                      <span className="text-[10px] text-[#906f6f]">10m ago</span>
                    </div>
                  </div>
                  <div className="py-2.5 flex items-start gap-2.5">
                    <span className="text-base">🍰</span>
                    <div>
                      <p className="text-xs font-semibold text-[#40000a]">
                        Birthday Reward Ready
                      </p>
                      <p className="text-[11px] text-[#5c3f3f]">
                        15% Off B2 Food Hall dining voucher is active in your wallet.
                      </p>
                      <span className="text-[10px] text-[#906f6f]">2h ago</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Profile Avatar */}
          <div className="pl-1">
            <button
              onClick={() => setActiveScreen('account')}
              aria-label="View Account Profile"
              title={`${user.name} (${user.tier} Member)`}
              className="w-9 h-9 rounded-full bg-[#b7002d] p-0.5 flex items-center justify-center shadow-[0_2px_8px_rgba(183,0,45,0.25)] hover:ring-2 hover:ring-[#b7002d]/40 transition-all"
            >
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80"
                alt={user.name}
                referrerPolicy="no-referrer"
                className="w-full h-full rounded-full object-cover"
              />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
