import React from 'react';
import { useApp } from '../../context/AppContext';

export const ReceiptModal: React.FC = () => {
  const { selectedReceipt, setSelectedReceipt, showToast } = useApp();

  if (!selectedReceipt) return null;

  const handleDownload = () => {
    showToast(`📄 Downloaded official GST Tax Invoice ${selectedReceipt.taxInvoiceNo}`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-[#fff8f7] w-full max-w-md rounded-3xl shadow-2xl border border-[#ffe1e1] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-4 bg-gradient-to-r from-[#b7002d] via-[#df2040] to-[#b7002d] text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[20px]">receipt_long</span>
            <div>
              <h3 className="font-serif-luxury font-bold text-base">GST Tax Invoice</h3>
              <p className="text-[11px] text-white/80">{selectedReceipt.taxInvoiceNo}</p>
            </div>
          </div>
          <button
            onClick={() => setSelectedReceipt(null)}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Paper Receipt Body */}
        <div className="p-6 bg-white flex-1 space-y-4 text-xs font-mono">
          <div className="text-center pb-3 border-b border-dashed border-[#e5bdbc]">
            <span className="font-serif-luxury font-bold text-base text-[#b7002d] block tracking-wide">
              TAKASHIMAYA SINGAPORE
            </span>
            <span className="text-[11px] text-[#5c3f3f] block">Ngee Ann City • 391 Orchard Road</span>
            <span className="text-[10px] text-[#906f6f] block">GST Reg No: M2-0048192-X</span>
          </div>

          <div className="space-y-1 text-[#5c3f3f]">
            <div className="flex justify-between">
              <span>STORE:</span>
              <span className="font-bold text-[#40000a]">{selectedReceipt.storeName}</span>
            </div>
            <div className="flex justify-between">
              <span>LOCATION:</span>
              <span>{selectedReceipt.floor}</span>
            </div>
            <div className="flex justify-between">
              <span>DATE/TIME:</span>
              <span>{selectedReceipt.dateTime}</span>
            </div>
            <div className="flex justify-between">
              <span>MEMBER:</span>
              <span>Olivia Tan (#TK-889210)</span>
            </div>
          </div>

          {/* Itemized Table */}
          <div className="border-t border-b border-dashed border-[#e5bdbc] py-2.5 space-y-1.5">
            {selectedReceipt.items.map((item, idx) => (
              <div key={idx} className="flex justify-between items-center text-[11px]">
                <div className="flex-1 pr-2 truncate">
                  <span>{item.qty}x </span>
                  <span className="text-[#40000a] font-medium">{item.name}</span>
                </div>
                <span className="font-bold text-[#40000a]">S${item.price.toFixed(2)}</span>
              </div>
            ))}
          </div>

          {/* Totals */}
          <div className="space-y-1 text-[#40000a]">
            <div className="flex justify-between">
              <span>Includes 9% GST:</span>
              <span>S${selectedReceipt.gstAmount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm font-bold text-[#b7002d]">
              <span>TOTAL PAID:</span>
              <span>S${selectedReceipt.amount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-[11px] text-emerald-700 font-bold pt-1">
              <span>🌸 Sakura Petals Earned:</span>
              <span>+{selectedReceipt.petalsEarned} Petals</span>
            </div>
          </div>

          <div className="pt-2 text-center text-[10px] text-[#906f6f] border-t border-dashed border-[#e5bdbc]">
            Valid for Tourist Tax Refund (eTRS) at Level 3 Customer Service Centre.
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-[#fff8f7] border-t border-[#ffe1e1] flex items-center gap-2">
          <button
            onClick={handleDownload}
            className="flex-1 py-2.5 rounded-full bg-[#b7002d] text-white font-bold text-xs hover:bg-[#920022] transition-colors flex items-center justify-center gap-1.5"
          >
            <span className="material-symbols-outlined text-[16px]">download</span>
            <span>Download PDF</span>
          </button>
          <button
            onClick={() => setSelectedReceipt(null)}
            className="px-4 py-2.5 rounded-full bg-white border border-[#e5bdbc] text-[#40000a] font-semibold text-xs hover:bg-[#ffe9e8] transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
