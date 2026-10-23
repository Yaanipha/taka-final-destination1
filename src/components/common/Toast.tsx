import React from 'react';
import { useApp } from '../../context/AppContext';

export const Toast: React.FC = () => {
  const { toastMessage } = useApp();

  if (!toastMessage) return null;

  return (
    <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-[#40000a] text-[#fff8f8] px-4 py-2.5 rounded-full shadow-2xl flex items-center gap-2.5 border border-[#e5bdbc]/40 animate-in fade-in slide-in-from-top-4 duration-200">
      <span className="text-base animate-bounce">🌸</span>
      <span className="text-xs font-semibold tracking-wide">{toastMessage}</span>
    </div>
  );
};
