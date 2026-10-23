import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';

export const AccountScreen: React.FC = () => {
  const {
    user,
    setActiveScreen,
    setIsFloorMapModalOpen,
    setSelectedFloor,
    showToast,
    language,
    setLanguage,
  } = useApp();

  const [bookingModal, setBookingModal] = useState<string | null>(null);

  const goldPrivileges = [
    {
      title: 'Dedicated VIP Ambassador & Counter',
      desc: 'Direct lane concierge at Level 3 Customer Service Centre.',
      icon: 'support_agent',
    },
    {
      title: 'Prestige Lounge Access (Level 4)',
      desc: 'Unlimited entry with 1 guest, complimentary artisanal matcha & wagashi.',
      icon: 'local_cafe',
    },
    {
      title: 'Complimentary Home Delivery & Wet Weather Care',
      desc: 'Same-day islandwide dispatch & protective rain packaging.',
      icon: 'local_shipping',
    },
    {
      title: 'Power Bank Loan & Shopping Bag Deposit',
      desc: 'Hands-free shopping deposit at all concierge points.',
      icon: 'shopping_bag',
    },
    {
      title: 'Japan Takashimaya Premium Shopper\'s Card',
      desc: 'Extra 10% tourist discount at Nihombashi, Shinjuku & Kyoto stores.',
      icon: 'flight_takeoff',
    },
    {
      title: 'Birthday Gift Hamper & Double Petals',
      desc: 'Complimentary Fauchon confectionery during your birthday month.',
      icon: 'featured_seasonal_and_gifts',
    },
  ];

  const handleServiceClick = (service: string, floorTarget?: string) => {
    if (floorTarget) {
      setSelectedFloor(floorTarget);
      setIsFloorMapModalOpen(true);
    }
    setBookingModal(service);
  };

  return (
    <div className="space-y-4 md:space-y-6 pb-20">
      {/* Olivia Tan Gold Member Card */}
      <div className="p-4 md:p-6 rounded-3xl bg-gradient-to-br from-[#fff0f0] via-[#ffe9e8] to-[#ffdad9] border border-[#e5bdbc] shadow-sm">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3.5">
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
                alt={user.name}
                referrerPolicy="no-referrer"
                className="w-14 h-14 rounded-full object-cover border-2 border-white shadow-xs"
              />
              <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-[#cca730] text-white flex items-center justify-center text-[10px] font-bold shadow-xs">
                ★
              </span>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-serif-luxury font-bold text-lg md:text-xl text-[#40000a]">
                  {user.name}
                </h2>
                <span className="px-2 py-0.5 rounded-full bg-[#cca730] text-[#241a00] font-black text-[10px] tracking-wide shadow-xs">
                  GOLD
                </span>
              </div>
              <p className="text-xs text-[#5c3f3f] mt-0.5">
                Member ID: {user.memberId} • Valid thru {user.validThru}
              </p>
            </div>
          </div>

          <div className="flex flex-col items-center">
            <div className="w-10 h-10 rounded-full bg-[#cca730]/20 text-[#735c00] flex items-center justify-center shadow-xs">
              <span className="material-symbols-outlined text-[24px]">workspace_premium</span>
            </div>
            <span className="text-[10px] font-bold text-[#735c00] mt-0.5">Prestige</span>
          </div>
        </div>

        {/* Petals Balance Ribbon */}
        <div className="mt-4 p-3 rounded-2xl bg-white/80 backdrop-blur-xs border border-[#e5bdbc]/60 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-base">🌸</span>
            <span className="font-bold text-xs text-[#b7002d]">{user.petals} Petals</span>
            <span className="text-[11px] text-[#5c3f3f]">Available Balance</span>
          </div>
          <button
            onClick={() => setActiveScreen('rewards')}
            className="text-xs font-bold text-[#b7002d] hover:underline flex items-center gap-0.5"
          >
            <span>Redeem</span>
            <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
          </button>
        </div>

        {/* Spend towards Next Tier Bar */}
        <div className="mt-4 space-y-1.5">
          <div className="flex justify-between text-xs font-semibold">
            <span className="text-[#40000a]">
              S${user.spendCurrent.toLocaleString()} spent towards {user.nextTierName}
            </span>
            <span className="text-[#b7002d] font-bold">
              S${(user.spendTargetNextTier - user.spendCurrent).toLocaleString()} more
            </span>
          </div>
          <div className="w-full h-2 rounded-full bg-white overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#cca730] to-[#b7002d] rounded-full transition-all duration-500"
              style={{ width: `${(user.spendCurrent / user.spendTargetNextTier) * 100}%` }}
            />
          </div>
          <div className="flex justify-between text-[10px] text-[#906f6f]">
            <span>Gold Tier ($100k)</span>
            <span>Platinum Tier ($300k)</span>
          </div>
        </div>
      </div>

      {/* 2026 Prestige Tiers */}
      <div>
        <div className="flex items-center justify-between mb-2.5">
          <div>
            <h3 className="font-serif-luxury font-bold text-base text-[#40000a]">
              2026 Prestige Tiers
            </h3>
            <p className="text-[11px] text-[#906f6f]">
              Takashimaya annual member recognition program
            </p>
          </div>
          <span className="px-2.5 py-0.5 rounded-full bg-[#ffe9e8] text-[#b7002d] font-bold text-[10px]">
            5 Tiers
          </span>
        </div>

        {/* Tier Cards Scroll */}
        <div className="flex gap-3 overflow-x-auto no-scrollbar pb-1">
          <div className="min-w-[200px] p-3.5 rounded-2xl bg-white border border-[#ffe1e1] shadow-2xs">
            <div className="flex justify-between text-[10px] font-bold text-[#906f6f] mb-1">
              <span>PRESTIGE BRONZE</span>
              <span>2026</span>
            </div>
            <h4 className="font-bold text-sm text-[#40000a]">Bronze Member</h4>
            <p className="text-[11px] text-[#5c3f3f]">Annual spend above $10K</p>
            <div className="mt-3 pt-2 border-t border-[#fff0f0] flex items-center gap-1 text-[11px] text-[#5c3f3f]">
              <span className="material-symbols-outlined text-[14px] text-emerald-600">check</span>
              <span>7 Exclusive Privileges</span>
            </div>
          </div>

          <div className="min-w-[200px] p-3.5 rounded-2xl bg-white border border-[#ffe1e1] shadow-2xs">
            <div className="flex justify-between text-[10px] font-bold text-[#906f6f] mb-1">
              <span>PRESTIGE SILVER</span>
              <span>2026</span>
            </div>
            <h4 className="font-bold text-sm text-[#40000a]">Silver Member</h4>
            <p className="text-[11px] text-[#5c3f3f]">Annual spend above $20K</p>
            <div className="mt-3 pt-2 border-t border-[#fff0f0] flex items-center gap-1 text-[11px] text-[#5c3f3f]">
              <span className="material-symbols-outlined text-[14px] text-emerald-600">check</span>
              <span>13 Member Privileges</span>
            </div>
          </div>

          <div className="min-w-[200px] p-3.5 rounded-2xl bg-gradient-to-br from-white to-[#fff0f0] border-2 border-[#cca730] shadow-sm">
            <div className="flex justify-between text-[10px] font-bold text-[#735c00] mb-1">
              <span>PRESTIGE GOLD (CURRENT)</span>
              <span>2026</span>
            </div>
            <h4 className="font-bold text-sm text-[#40000a]">Gold Member</h4>
            <p className="text-[11px] text-[#5c3f3f]">Annual spend above $100K</p>
            <div className="mt-3 pt-2 border-t border-[#ffe088]/40 flex items-center gap-1 text-[11px] text-[#735c00] font-semibold">
              <span className="material-symbols-outlined text-[14px] text-[#cca730]">verified</span>
              <span>18 Exclusive Privileges</span>
            </div>
          </div>
        </div>
      </div>

      {/* Your Gold Privileges (6 Active) */}
      <div className="p-4 md:p-5 rounded-3xl bg-white border border-[#ffe1e1] shadow-xs">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[#cca730] text-[18px]">verified</span>
            <h3 className="font-serif-luxury font-bold text-base text-[#40000a]">
              Your Gold Privileges
            </h3>
          </div>
          <span className="text-xs font-bold text-[#b7002d]">6 Active</span>
        </div>

        <div className="space-y-2.5">
          {goldPrivileges.map((priv, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded-2xl bg-[#fff8f7] border border-[#ffe9e8] flex items-start gap-3 hover:border-[#b7002d]/40 transition-colors"
            >
              <div className="w-8 h-8 rounded-full bg-[#ffe9e8] text-[#b7002d] flex items-center justify-center shrink-0 mt-0.5">
                <span className="material-symbols-outlined text-[17px]">{priv.icon}</span>
              </div>
              <div>
                <h4 className="font-bold text-xs text-[#40000a]">{priv.title}</h4>
                <p className="text-[11px] text-[#5c3f3f] mt-0.5 leading-snug">{priv.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Linked Payment Cards */}
      <div className="p-4 md:p-5 rounded-3xl bg-white border border-[#ffe1e1] shadow-xs">
        <div className="flex items-center justify-between mb-1">
          <h3 className="font-serif-luxury font-bold text-base text-[#40000a]">
            Linked Payment Cards
          </h3>
          <button
            onClick={() => showToast('💳 Card link portal opened')}
            className="text-xs font-bold text-[#b7002d] hover:underline flex items-center gap-0.5"
          >
            <span>+ Link Card</span>
          </button>
        </div>
        <p className="text-[11px] text-[#906f6f] mb-3">Earning 2 Bonus Points per S$10 spend</p>

        {/* Card 1: Amex */}
        <div className="space-y-2">
          {user.linkedCards.map((c) => (
            <div
              key={c.id}
              className="p-3.5 rounded-2xl bg-[#fff8f7] border border-[#ffe9e8] flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <span className="px-2.5 py-1 rounded bg-[#40000a] text-white font-mono text-[10px] font-bold">
                  {c.type}
                </span>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h4 className="font-bold text-xs text-[#40000a]">{c.cardName}</h4>
                    {c.isPrimary && (
                      <span className="px-1.5 py-0.2 rounded-full bg-[#b7002d] text-white text-[9px] font-bold uppercase">
                        PRIMARY
                      </span>
                    )}
                  </div>
                  <p className="text-[10px] text-[#906f6f]">
                    •••• {c.last4} · Exp {c.exp}
                  </p>
                </div>
              </div>

              <span className="text-[11px] font-bold text-[#b7002d]">{c.pointsRate}</span>
            </div>
          ))}
        </div>

        {/* Voucher Conversion Banner */}
        <div className="mt-3 p-3 rounded-2xl bg-[#fff0f0] border border-[#ffe1e1] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#b7002d] text-[18px]">redeem</span>
            <span className="text-xs font-semibold text-[#40000a]">
              Every 100 Points = $30 Takashimaya Voucher
            </span>
          </div>
          <span
            onClick={() => showToast('✨ Points conversion auto-calculates at checkout counters!')}
            className="text-xs font-bold text-[#b7002d] hover:underline cursor-pointer"
          >
            Details
          </span>
        </div>
      </div>

      {/* VIP Concierge & Services */}
      <div className="p-4 md:p-5 rounded-3xl bg-white border border-[#ffe1e1] shadow-xs">
        <h3 className="font-serif-luxury font-bold text-base text-[#40000a]">
          VIP Concierge &amp; Services
        </h3>
        <p className="text-[11px] text-[#906f6f] mb-3">
          Exclusive department store privileges for Gold members
        </p>

        <div className="space-y-1.5">
          {[
            {
              title: 'Personal Shopper & Styling',
              sub: 'Book private salon appointments at Level 2 Luxury',
              icon: 'checkroom',
              floor: 'L2',
            },
            {
              title: 'Level 4 Prestige Lounge Booking',
              sub: 'Reserve table & private tea corner for high tea',
              icon: 'wine_bar',
              floor: 'L4',
            },
            {
              title: 'Gift Wrapping & Japanese Furoshiki',
              sub: 'Seasonal rose-pattern packaging & silk cloth wrap',
              icon: 'featured_seasonal_and_gifts',
              floor: 'B2',
            },
            {
              title: 'Tourist Tax Refund (e-Tax Free PRS)',
              sub: 'Express GST clearance and foreign currency desk',
              icon: 'currency_exchange',
              floor: 'L3',
            },
            {
              title: 'Valet Parking & Car IU Auto-Clearance',
              sub: 'Car IU #SG-58912 registered for free 3hr parking',
              icon: 'directions_car',
              floor: 'B2',
            },
          ].map((item, idx) => (
            <div
              key={idx}
              onClick={() => handleServiceClick(item.title, item.floor)}
              className="p-3 rounded-2xl bg-[#fff8f7] border border-[#ffe9e8] hover:border-[#b7002d]/40 transition-all flex items-center justify-between cursor-pointer group"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#ffe9e8] text-[#b7002d] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  <span className="material-symbols-outlined text-[17px]">{item.icon}</span>
                </div>
                <div>
                  <h4 className="font-bold text-xs text-[#40000a] group-hover:text-[#b7002d] transition-colors">
                    {item.title}
                  </h4>
                  <p className="text-[11px] text-[#906f6f]">{item.sub}</p>
                </div>
              </div>
              <span className="material-symbols-outlined text-[#906f6f] text-[18px]">
                chevron_right
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Preferences & Support */}
      <div className="p-4 md:p-5 rounded-3xl bg-white border border-[#ffe1e1] shadow-xs space-y-3">
        <h3 className="font-serif-luxury font-bold text-base text-[#40000a]">
          Preferences &amp; Support
        </h3>

        {/* Language switch */}
        <div className="p-3 rounded-2xl bg-[#fff8f7] border border-[#ffe9e8] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#b7002d] text-[18px]">translate</span>
            <span className="text-xs font-bold text-[#40000a]">Language / 言語</span>
          </div>
          <div className="flex items-center gap-1 bg-[#ffe9e8] p-1 rounded-full">
            {(['EN', '日本語', '中文'] as const).map((l) => (
              <button
                key={l}
                onClick={() => {
                  setLanguage(l);
                  showToast(`Language set to ${l}`);
                }}
                className={`px-3 py-1 rounded-full text-xs font-semibold transition-colors ${
                  language === l
                    ? 'bg-white text-[#b7002d] shadow-2xs font-bold'
                    : 'text-[#5c3f3f] hover:text-[#40000a]'
                }`}
              >
                {l}
              </button>
            ))}
          </div>
        </div>

        {/* Family sharing */}
        <div
          onClick={() => showToast('👨‍👩‍👧 Takashimaya Kids Club linked (2 active members)')}
          className="p-3 rounded-2xl bg-[#fff8f7] border border-[#ffe9e8] flex items-center justify-between cursor-pointer hover:border-[#b7002d]/40 transition-colors"
        >
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#b7002d] text-[18px]">group</span>
            <div>
              <h4 className="font-bold text-xs text-[#40000a]">Family Sharing</h4>
              <p className="text-[11px] text-[#906f6f]">Takashimaya Kids Club linked (2 members)</p>
            </div>
          </div>
          <span className="material-symbols-outlined text-[#906f6f] text-[18px]">
            chevron_right
          </span>
        </div>

        {/* Prestige VIP Hotline */}
        <a
          href="tel:+6567381111"
          className="p-3 rounded-2xl bg-gradient-to-r from-[#ffe9e8] to-[#fff0f0] border border-[#e5bdbc] flex items-center justify-between text-xs"
        >
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#b7002d] text-[18px]">call</span>
            <div>
              <h4 className="font-bold text-xs text-[#b7002d]">Prestige VIP Direct Concierge</h4>
              <p className="text-[10px] text-[#5c3f3f]">+65 6738 1111 • 10:00 – 21:30 Daily</p>
            </div>
          </div>
          <span className="material-symbols-outlined text-[#b7002d] text-[18px]">open_in_new</span>
        </a>
      </div>

      {/* Takashimaya Traditional Heritage Stamp */}
      <div className="p-5 rounded-3xl bg-gradient-to-br from-[#ffe9e8] to-[#ffd9e1]/50 border border-[#e5bdbc] text-center space-y-1">
        <span className="font-serif-luxury font-black text-xl text-[#b7002d] tracking-widest block">
          髙島屋 Takashimaya
        </span>
        <p className="text-xs text-[#5c3f3f]">
          Takashimaya Singapore • Ngee Ann City • Since 1993
        </p>
        <p className="text-[10px] text-[#906f6f] uppercase tracking-widest font-bold pt-1">
          OMOTENASHI JAPANESE HOSPITALITY
        </p>
      </div>

      {/* Booking confirmation modal */}
      {bookingModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-[#fff8f7] w-full max-w-sm rounded-3xl p-5 border border-[#ffe1e1]">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-serif-luxury font-bold text-base text-[#40000a]">
                Reserve Service
              </h3>
              <button onClick={() => setBookingModal(null)} className="text-[#906f6f]">
                ✕
              </button>
            </div>
            <p className="text-xs text-[#5c3f3f] mb-4">
              Your appointment request for <strong>{bookingModal}</strong> has been routed to
              our Level 3 VIP Ambassadors. A confirmation SMS will be sent shortly.
            </p>
            <button
              onClick={() => {
                setBookingModal(null);
                showToast(`✓ Reserved ${bookingModal}! VIP Concierge will welcome you.`);
              }}
              className="w-full py-2 rounded-full bg-[#b7002d] text-white text-xs font-bold hover:bg-[#920022]"
            >
              Confirm Reservation
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
