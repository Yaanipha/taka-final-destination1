import React from 'react';
import { useApp } from '../../context/AppContext';

export const VoucherWalletModal: React.FC = () => {
  const { isVoucherWalletOpen, setIsVoucherWalletOpen, vouchers, toggleApplyVoucher } = useApp();

  if (!isVoucherWalletOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-[#fff8f7] w-full max-w-lg rounded-3xl shadow-2xl border border-[#ffe1e1] overflow-hidden flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="p-4 bg-gradient-to-r from-[#b7002d] via-[#df2040] to-[#b7002d] text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[22px]">confirmation_number</span>
            <div>
              <h3 className="font-serif-luxury font-bold text-base">In-Store Voucher Wallet</h3>
              <p className="text-[11px] text-white/80">{vouchers.length} Ready Vouchers</p>
            </div>
          </div>
          <button
            onClick={() => setIsVoucherWalletOpen(false)}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Voucher List */}
        <div className="p-4 overflow-y-auto space-y-3 no-scrollbar flex-1">
          {vouchers.map((voucher) => (
            <div
              key={voucher.id}
              className={`p-4 rounded-2xl border transition-all ${
                voucher.isApplied
                  ? 'bg-white border-[#b7002d] shadow-md ring-1 ring-[#b7002d]/30'
                  : 'bg-white border-[#ffe1e1] hover:border-[#b7002d]/40'
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-start gap-3">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg shrink-0 ${
                      voucher.type === 'BIRTHDAY SPECIAL'
                        ? 'bg-[#ffe088]/40 text-[#735c00]'
                        : 'bg-[#ffe9e8] text-[#b7002d]'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[22px]">
                      {voucher.type === 'BIRTHDAY SPECIAL' ? 'cake' : 'local_activity'}
                    </span>
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="px-2 py-0.5 rounded-full bg-[#ffe9e8] text-[#b7002d] text-[10px] font-bold">
                        {voucher.type}
                      </span>
                      <span className="text-[11px] text-[#906f6f]">Exp. {voucher.validUntil}</span>
                    </div>
                    <h4 className="font-bold text-sm text-[#40000a] mt-1">{voucher.title}</h4>
                    <p className="text-xs text-[#5c3f3f] mt-0.5">{voucher.description}</p>
                  </div>
                </div>

                <button
                  onClick={() => toggleApplyVoucher(voucher.id)}
                  className={`px-3 py-1.5 rounded-full font-bold text-xs shrink-0 transition-colors ${
                    voucher.isApplied
                      ? 'bg-[#ffe9e8] text-[#b7002d] border border-[#e5bdbc]'
                      : 'bg-[#b7002d] text-white hover:bg-[#920022]'
                  }`}
                >
                  {voucher.isApplied ? 'Applied ✓' : 'Apply'}
                </button>
              </div>

              {/* Barcode code */}
              <div className="mt-3 pt-2.5 border-t border-[#fff0f0] flex items-center justify-between text-[11px] text-[#906f6f]">
                <span>Code: <strong className="font-mono text-[#40000a]">{voucher.code}</strong></span>
                {voucher.minSpend && <span>Min. Spend: {voucher.minSpend}</span>}
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-4 bg-white border-t border-[#ffe9e8] flex justify-end">
          <button
            onClick={() => setIsVoucherWalletOpen(false)}
            className="px-5 py-2 rounded-full bg-[#b7002d] text-white font-bold text-xs hover:bg-[#920022] transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
