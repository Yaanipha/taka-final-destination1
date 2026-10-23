import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';

export const PayScreen: React.FC = () => {
  const {
    user,
    vouchers,
    toggleApplyVoucher,
    receipts,
    setSelectedReceipt,
    setIsVoucherWalletOpen,
    autoApplyDiscount,
    setAutoApplyDiscount,
    activeCardIndex,
    setActiveCardIndex,
    showToast,
  } = useApp();

  const [payMode, setPayMode] = useState<'pay_and_earn' | 'earn_only'>('pay_and_earn');
  const [secondsLeft, setSecondsLeft] = useState(44);
  const [copied, setCopied] = useState(false);
  const [showCardModal, setShowCardModal] = useState(false);

  // Live timer countdown
  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsLeft((prev) => (prev <= 1 ? 60 : prev - 1));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleRefreshQR = () => {
    setSecondsLeft(60);
    showToast('🔄 Dynamic QR code and security token refreshed!');
  };

  const handleCopyCode = () => {
    navigator.clipboard?.writeText('8888 4001 0063 7299');
    setCopied(true);
    showToast('📋 Member barcode copied to clipboard!');
    setTimeout(() => setCopied(false), 2000);
  };

  const activeCard = user.linkedCards[activeCardIndex] || user.linkedCards[0];

  const handleExportETRS = () => {
    showToast('✈️ Exporting 3 tax invoices to eTRS Singapore Tourist Refund system...');
  };

  return (
    <div className="space-y-4 md:space-y-6 pb-20">
      {/* 256-Bit Encrypted Security Pill */}
      <div className="flex items-center justify-between px-3 py-1.5 rounded-full bg-white border border-[#ffe1e1] shadow-2xs text-[11px]">
        <div className="flex items-center gap-1.5 text-[#5c3f3f]">
          <span className="material-symbols-outlined text-[15px] text-[#b7002d]">security</span>
          <span>Ngee Ann City • 256-Bit Encrypted</span>
        </div>
        <div className="flex items-center gap-1 text-[#b7002d] font-bold">
          <span className="w-2 h-2 rounded-full bg-[#df2040] animate-ping" />
          <span>Ready to Scan</span>
        </div>
      </div>

      {/* Main Pay & Member QR Card */}
      <div className="rounded-3xl bg-gradient-to-br from-[#920022] via-[#b7002d] to-[#df2040] p-4 md:p-5 text-white shadow-xl overflow-hidden relative">
        {/* Subtle decorative emblem */}
        <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-white/5 blur-2xl pointer-events-none" />

        {/* Card Header */}
        <div className="flex items-center justify-between mb-3.5">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[20px]">qr_code_2</span>
            <div>
              <span className="text-[10px] tracking-widest uppercase font-bold text-white/80 block">
                TAKASHIMAYA SINGAPORE
              </span>
              <h2 className="font-serif-luxury font-bold text-base md:text-lg text-white">
                Member &amp; Pay QR
              </h2>
            </div>
          </div>

          <span className="px-2.5 py-0.5 rounded-full bg-[#cca730] text-[#241a00] text-[10px] font-black uppercase tracking-wider flex items-center gap-1 shadow-xs">
            <span>✪</span>
            <span>{user.tier}</span>
          </span>
        </div>

        {/* Mode Selector Tabs */}
        <div className="bg-black/20 p-1 rounded-2xl flex items-center mb-4">
          <button
            onClick={() => setPayMode('pay_and_earn')}
            className={`flex-1 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
              payMode === 'pay_and_earn'
                ? 'bg-white text-[#b7002d] shadow-sm'
                : 'text-white/80 hover:text-white'
            }`}
          >
            <span className="material-symbols-outlined text-[14px]">credit_card</span>
            <span>Pay &amp; Earn Petals</span>
          </button>
          <button
            onClick={() => setPayMode('earn_only')}
            className={`flex-1 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
              payMode === 'earn_only'
                ? 'bg-white text-[#b7002d] shadow-sm'
                : 'text-white/80 hover:text-white'
            }`}
          >
            <span className="material-symbols-outlined text-[14px]">loyalty</span>
            <span>Earn Petals Only</span>
          </button>
        </div>

        {/* White Ticket QR Container */}
        <div className="bg-[#fffdfa] rounded-2xl p-5 text-[#40000a] shadow-lg flex flex-col items-center text-center relative overflow-hidden">
          {/* Decorative jagged / perforated top edge styling */}
          <div className="w-full border-b border-dashed border-[#e5bdbc] pb-4 mb-4 flex flex-col items-center">
            {/* Animated QR Code Container */}
            <div className="relative p-3 bg-white rounded-2xl shadow-sm border border-[#e5bdbc]/60 group">
              {/* Center Rose Logo in QR */}
              <div className="w-52 h-52 bg-white flex items-center justify-center relative">
                {/* SVG QR Code Pattern */}
                <svg
                  className="w-full h-full text-[#40000a]"
                  viewBox="0 0 100 100"
                  fill="currentColor"
                >
                  {/* Outer corner anchors */}
                  <rect x="0" y="0" width="28" height="28" rx="4" />
                  <rect x="4" y="4" width="20" height="20" fill="white" rx="2" />
                  <rect x="8" y="8" width="12" height="12" fill="#b7002d" rx="2" />

                  <rect x="72" y="0" width="28" height="28" rx="4" />
                  <rect x="76" y="4" width="20" height="20" fill="white" rx="2" />
                  <rect x="80" y="8" width="12" height="12" fill="#b7002d" rx="2" />

                  <rect x="0" y="72" width="28" height="28" rx="4" />
                  <rect x="4" y="76" width="20" height="20" fill="white" rx="2" />
                  <rect x="8" y="80" width="12" height="12" fill="#b7002d" rx="2" />

                  {/* Matrix dots simulating real high density QR */}
                  <rect x="36" y="6" width="6" height="6" />
                  <rect x="48" y="6" width="6" height="6" />
                  <rect x="58" y="14" width="6" height="6" />
                  <rect x="36" y="18" width="6" height="6" />
                  <rect x="48" y="24" width="6" height="6" />

                  <rect x="14" y="36" width="6" height="6" />
                  <rect x="24" y="46" width="6" height="6" />
                  <rect x="36" y="38" width="6" height="6" />
                  <rect x="58" y="40" width="6" height="6" />
                  <rect x="68" y="36" width="6" height="6" />
                  <rect x="80" y="46" width="6" height="6" />

                  <rect x="36" y="58" width="6" height="6" />
                  <rect x="46" y="68" width="6" height="6" />
                  <rect x="58" y="60" width="6" height="6" />
                  <rect x="68" y="72" width="6" height="6" />
                  <rect x="80" y="84" width="6" height="6" />
                  <rect x="40" y="84" width="6" height="6" />
                  <rect x="52" y="84" width="6" height="6" />

                  {/* Center Rose Stamp Badge */}
                  <circle cx="50" cy="50" r="14" fill="white" />
                  <circle cx="50" cy="50" r="11" fill="#b7002d" />
                  <circle cx="50" cy="50" r="4" fill="white" />
                </svg>

                {/* Laser scan line overlay */}
                <div className="absolute inset-x-2 h-1 bg-gradient-to-r from-transparent via-[#df2040] to-transparent shadow-[0_0_8px_#df2040] animate-scan pointer-events-none" />
              </div>
            </div>

            {/* Linear Barcode for Casher Scanners */}
            <div className="mt-4 w-64 h-12 bg-white rounded-lg p-1.5 flex flex-col items-center justify-between border border-[#e5bdbc]/60">
              <div className="w-full h-8 flex items-stretch justify-between px-1">
                {/* Generated authentic barcode bars */}
                {[2, 1, 3, 1, 2, 4, 1, 3, 2, 1, 4, 1, 2, 3, 1, 2, 4, 2, 1, 3, 1, 2, 3, 1, 4, 2, 1, 3, 2, 1].map(
                  (w, i) => (
                    <div
                      key={i}
                      className="bg-[#111] h-full"
                      style={{ width: `${w * 1.5}px` }}
                    />
                  )
                )}
              </div>
              <span className="font-mono text-[9px] tracking-widest text-[#5c3f3f]">
                8888 4001 0063 7299
              </span>
            </div>
          </div>

          {/* Member Card ID with 1-Click Copy */}
          <button
            onClick={handleCopyCode}
            className="px-4 py-2 rounded-full bg-[#fff0f0] border border-[#e5bdbc] flex items-center gap-2 hover:bg-[#ffe1e1] active:scale-95 transition-all"
          >
            <span className="material-symbols-outlined text-[16px] text-[#b7002d]">badge</span>
            <span className="font-mono font-bold text-xs text-[#40000a]">
              8888 4001 0063 7299
            </span>
            <span className="material-symbols-outlined text-[15px] text-[#906f6f]">
              {copied ? 'check' : 'content_copy'}
            </span>
          </button>

          {/* Dynamic timer & refresh */}
          <div className="mt-3 flex items-center justify-between w-full text-xs text-[#5c3f3f] px-2">
            <div className="flex items-center gap-1">
              <span className="material-symbols-outlined text-[16px] text-[#906f6f]">schedule</span>
              <span>Refreshes in <strong className="text-[#b7002d]">{secondsLeft}s</strong></span>
            </div>

            <button
              onClick={handleRefreshQR}
              className="font-bold text-[#b7002d] hover:underline flex items-center gap-0.5"
            >
              <span className="material-symbols-outlined text-[15px]">refresh</span>
              <span>Refresh Now</span>
            </button>
          </div>

          <p className="text-[11px] text-[#906f6f] mt-3 leading-relaxed">
            Scan at Takashimaya cashier counters or specialty boutiques (B2 to L4) in Ngee Ann City.
          </p>

          {/* Active Payment Card Chip */}
          <div className="mt-4 w-full p-3 rounded-2xl bg-[#fff0f0] border border-[#e5bdbc] flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span className="px-2 py-0.5 rounded bg-[#40000a] text-white font-mono text-[10px] font-bold">
                {activeCard.bank}
              </span>
              <div className="text-left">
                <p className="font-bold text-xs text-[#40000a]">{activeCard.cardName}</p>
                <p className="text-[10px] text-[#5c3f3f]">
                  •••• {activeCard.last4} · {activeCard.pointsRate}
                </p>
              </div>
            </div>

            <button
              onClick={() => setShowCardModal(true)}
              className="text-xs font-bold text-[#b7002d] hover:underline"
            >
              Change
            </button>
          </div>
        </div>
      </div>

      {/* Sakura Loyalty Balance Card */}
      <div className="p-4 md:p-5 rounded-3xl bg-white border border-[#ffe1e1] shadow-xs">
        <div className="flex items-center justify-between pb-3 border-b border-[#ffe9e8]">
          <div>
            <span className="text-[10px] uppercase font-bold tracking-wider text-[#906f6f] block">
              SAKURA LOYALTY BALANCE
            </span>
            <div className="flex items-baseline gap-2 mt-0.5">
              <span className="font-serif-luxury font-black text-xl text-[#b7002d]">
                {user.petals} Petals
              </span>
              <span className="text-xs text-[#5c3f3f]">
                (Worth S${(user.petals * 0.1).toFixed(2)})
              </span>
            </div>
          </div>
          <span className="text-2xl animate-sakura">🌸</span>
        </div>

        {/* Auto-apply toggle */}
        <div className="pt-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#b7002d] text-[20px]">redeem</span>
            <span className="text-xs font-semibold text-[#40000a]">
              Auto-apply S${(user.petals * 0.1).toFixed(2)} off at register
            </span>
          </div>

          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={autoApplyDiscount}
              onChange={(e) => setAutoApplyDiscount(e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-[#ffe1e1] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#b7002d]"></div>
          </label>
        </div>
      </div>

      {/* Ready In-Store Vouchers */}
      <div className="p-4 md:p-5 rounded-3xl bg-white border border-[#ffe1e1] shadow-xs">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <h3 className="font-serif-luxury font-bold text-base text-[#40000a]">
              Ready In-Store Vouchers
            </h3>
            <span className="px-2 py-0.5 rounded-full bg-[#ffe9e8] text-[#b7002d] font-bold text-[10px]">
              {vouchers.length} Active
            </span>
          </div>

          <button
            onClick={() => setIsVoucherWalletOpen(true)}
            className="text-xs font-bold text-[#b7002d] hover:underline flex items-center gap-0.5"
          >
            <span>Wallet</span>
            <span className="material-symbols-outlined text-[15px]">chevron_right</span>
          </button>
        </div>

        {/* Voucher Cards */}
        <div className="space-y-2.5">
          {vouchers.slice(0, 2).map((voucher) => (
            <div
              key={voucher.id}
              className={`p-3.5 rounded-2xl border transition-all flex items-center justify-between ${
                voucher.isApplied
                  ? 'bg-gradient-to-r from-white to-[#fff0f0] border-[#b7002d] ring-1 ring-[#b7002d]/20'
                  : 'bg-[#fff8f7] border-[#ffe9e8]'
              }`}
            >
              <div className="flex items-start gap-3 min-w-0 flex-1">
                <div className="w-10 h-10 rounded-xl bg-[#ffe9e8] text-[#b7002d] flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-[20px]">
                    {voucher.type === 'BIRTHDAY SPECIAL' ? 'cake' : 'confirmation_number'}
                  </span>
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="px-2 py-0.2 rounded-full bg-[#ffe9e8] text-[#b7002d] font-bold text-[9px]">
                      {voucher.type}
                    </span>
                    <span className="text-[10px] text-[#906f6f]">Exp. {voucher.validUntil}</span>
                  </div>
                  <h4 className="font-bold text-xs text-[#40000a] mt-0.5 truncate">{voucher.title}</h4>
                  <p className="text-[11px] text-[#5c3f3f] line-clamp-1">{voucher.description}</p>
                </div>
              </div>

              <button
                onClick={() => toggleApplyVoucher(voucher.id)}
                className={`px-3 py-1.5 rounded-full text-xs font-bold shrink-0 transition-colors ${
                  voucher.isApplied
                    ? 'bg-[#ffe9e8] text-[#b7002d] border border-[#e5bdbc]'
                    : 'bg-[#b7002d] text-white hover:bg-[#920022]'
                }`}
              >
                {voucher.isApplied ? 'Applied' : 'Apply'}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Recent In-Store Receipts */}
      <div className="p-4 md:p-5 rounded-3xl bg-white border border-[#ffe1e1] shadow-xs">
        <div className="flex items-center justify-between mb-1">
          <h3 className="font-serif-luxury font-bold text-base text-[#40000a]">
            Recent In-Store Receipts
          </h3>
          <span className="text-xs font-bold text-[#b7002d] cursor-pointer hover:underline">
            All
          </span>
        </div>
        <p className="text-[11px] text-[#906f6f] mb-3">
          Official GST Tax Invoices for tourist tax refund &amp; claims
        </p>

        {/* Receipt list */}
        <div className="divide-y divide-[#fff0f0]">
          {receipts.map((rec) => (
            <div key={rec.id} className="py-3 flex items-center justify-between gap-2 overflow-hidden">
              <div className="flex items-center gap-2.5 min-w-0 flex-1">
                <div className="w-9 h-9 rounded-full bg-[#fff0f0] text-[#b7002d] flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-[18px]">
                    {rec.floor.includes('B2')
                      ? 'restaurant'
                      : rec.floor.includes('L1')
                      ? 'spa'
                      : 'book_2'}
                  </span>
                </div>
                <div className="min-w-0 flex-1">
                  <h4 className="font-bold text-xs text-[#40000a] truncate">{rec.storeName}</h4>
                  <p className="text-[10px] text-[#906f6f] truncate">
                    {rec.dateTime} · <span className="text-[#b7002d] font-semibold">+{rec.petalsEarned} Petals</span>
                  </p>
                </div>
              </div>

              <div className="text-right shrink-0">
                <p className="font-bold text-xs text-[#40000a]">S${rec.amount.toFixed(2)}</p>
                <button
                  onClick={() => setSelectedReceipt(rec)}
                  className="text-[11px] font-semibold text-[#b7002d] hover:underline flex items-center justify-end gap-0.5"
                >
                  <span>Tax Invoice</span>
                  <span className="material-symbols-outlined text-[13px]">open_in_new</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* eTRS Export Button */}
        <button
          onClick={handleExportETRS}
          className="mt-3 w-full py-2.5 rounded-full bg-[#fff8f7] border border-[#e5bdbc] hover:bg-[#ffe9e8] text-[#b7002d] font-bold text-xs transition-colors flex items-center justify-center gap-1.5"
        >
          <span className="material-symbols-outlined text-[16px]">file_download</span>
          <span>Export Tax Invoices for Tourist Refund (eTRS)</span>
        </button>
      </div>

      {/* Card Privileges Strip (2 Columns) */}
      <div className="grid grid-cols-2 gap-3">
        <div className="p-4 rounded-3xl bg-white border border-[#ffe1e1] shadow-xs">
          <div className="flex items-center gap-1.5 text-[#b7002d] text-xs font-bold uppercase tracking-wider mb-1">
            <span className="material-symbols-outlined text-[15px]">stars</span>
            <span>TAKASHIMAYA CARD</span>
          </div>
          <h4 className="font-bold text-xs text-[#40000a]">Double Bonus Points</h4>
          <p className="text-[11px] text-[#5c3f3f] mt-1">
            Every S$10 spent = 2 Bonus Points at Dept Store
          </p>
        </div>

        <div className="p-4 rounded-3xl bg-white border border-[#ffe1e1] shadow-xs">
          <div className="flex items-center gap-1.5 text-[#cca730] text-xs font-bold uppercase tracking-wider mb-1">
            <span className="material-symbols-outlined text-[15px]">local_parking</span>
            <span>NGEE ANN CITY</span>
          </div>
          <h4 className="font-bold text-xs text-[#40000a]">Complimentary Parking</h4>
          <p className="text-[11px] text-[#5c3f3f] mt-1">
            First 2 hours with min S$250 in-store spend
          </p>
        </div>
      </div>

      {/* Change Card Modal */}
      {showCardModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-[#fff8f7] w-full max-w-sm rounded-3xl p-5 border border-[#ffe1e1]">
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-serif-luxury font-bold text-base text-[#40000a]">
                Select Payment Card
              </h3>
              <button onClick={() => setShowCardModal(false)} className="text-[#906f6f]">
                ✕
              </button>
            </div>
            <div className="space-y-2">
              {user.linkedCards.map((card, idx) => (
                <button
                  key={card.id}
                  onClick={() => {
                    setActiveCardIndex(idx);
                    setShowCardModal(false);
                    showToast(`💳 Switched to ${card.cardName}`);
                  }}
                  className={`w-full p-3 rounded-2xl border text-left flex items-center justify-between ${
                    idx === activeCardIndex
                      ? 'bg-white border-[#b7002d] ring-1 ring-[#b7002d]'
                      : 'bg-[#fff0f0] border-[#ffe9e8]'
                  }`}
                >
                  <div>
                    <span className="font-bold text-xs text-[#40000a] block">{card.cardName}</span>
                    <span className="text-[11px] text-[#906f6f]">•••• {card.last4} · {card.bank}</span>
                  </div>
                  {idx === activeCardIndex && (
                    <span className="material-symbols-outlined text-[#b7002d] text-[20px]">
                      check_circle
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
