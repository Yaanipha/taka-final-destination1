import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/layout/Header';
import { Sidebar } from './components/layout/Sidebar';
import { BottomNav } from './components/layout/BottomNav';
import { HomeScreen } from './components/screens/HomeScreen';
import { ExploreScreen } from './components/screens/ExploreScreen';
import { PayScreen } from './components/screens/PayScreen';
import { RewardsScreen } from './components/screens/RewardsScreen';
import { AccountScreen } from './components/screens/AccountScreen';
import { RoseChanChatModal } from './components/modals/RoseChanChatModal';
import { OmikujiModal } from './components/modals/OmikujiModal';
import { FloorMapModal } from './components/modals/FloorMapModal';
import { TriviaQuizModal } from './components/modals/TriviaQuizModal';
import { ReceiptModal } from './components/modals/ReceiptModal';
import { VoucherWalletModal } from './components/modals/VoucherWalletModal';
import { Toast } from './components/common/Toast';

const DashboardContent: React.FC = () => {
  const { activeScreen } = useApp();

  const renderScreen = () => {
    switch (activeScreen) {
      case 'home':
        return <HomeScreen />;
      case 'explore':
        return <ExploreScreen />;
      case 'pay':
        return <PayScreen />;
      case 'rewards':
        return <RewardsScreen />;
      case 'account':
        return <AccountScreen />;
      default:
        return <HomeScreen />;
    }
  };

  return (
    <div className="min-h-screen bg-[#2c151a] flex items-center justify-center sm:py-6 sm:px-4 antialiased selection:bg-[#ffd9e1] selection:text-[#782844]">
      {/* iPhone Outer Device Enclosure */}
      <div className="w-full sm:max-w-[430px] min-h-screen sm:min-h-[890px] sm:h-[92vh] sm:max-h-[930px] bg-[#fff8f7] sm:rounded-[52px] shadow-[0_25px_70px_rgba(0,0,0,0.5),0_0_0_12px_#1f0d11,0_0_0_14px_#471f28] flex flex-col relative overflow-hidden">
        
        {/* iOS Dynamic Island & Status Bar */}
        <div className="pt-3 pb-1 px-7 bg-[#fff8f7]/95 backdrop-blur-md flex items-center justify-between text-xs font-bold text-[#40000a] shrink-0 z-40 select-none">
          <span className="text-[13px] font-semibold tracking-tight">9:41</span>
          
          {/* Dynamic Island Pill */}
          <div className="w-24 h-5 bg-black rounded-full mx-auto flex items-center justify-end px-2">
            <div className="w-2.5 h-2.5 rounded-full bg-[#1a1a2e] border border-[#2a2a40]" />
          </div>

          <div className="flex items-center gap-1.5 text-[#40000a]">
            <span className="material-symbols-outlined text-[15px]">signal_cellular_alt</span>
            <span className="material-symbols-outlined text-[15px]">wifi</span>
            <span className="material-symbols-outlined text-[18px]">battery_full</span>
          </div>
        </div>

        {/* Takashimaya Top In-App Header */}
        <Header />

        {/* Scrollable Screen Content */}
        <main className="flex-1 overflow-y-auto px-4 pt-3 pb-24 no-scrollbar bg-[#fff8f7] relative">
          {renderScreen()}
        </main>

        {/* Pinned Bottom Navigation */}
        <div className="sticky bottom-0 inset-x-0 z-40 shrink-0">
          <BottomNav />
          {/* iOS Home Indicator Bar */}
          <div className="bg-[#fff8f7] pt-0.5 pb-2 flex justify-center">
            <div className="w-32 h-1 bg-[#40000a]/20 rounded-full" />
          </div>
        </div>

        {/* Navigation Sidebar Drawer */}
        <Sidebar />

        {/* Interactive Modals */}
        <RoseChanChatModal />
        <OmikujiModal />
        <FloorMapModal />
        <TriviaQuizModal />
        <ReceiptModal />
        <VoucherWalletModal />
        <Toast />
      </div>
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <DashboardContent />
    </AppProvider>
  );
}
