import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { ScreenType, UserProfile, Voucher, JournalStory, Stamp, PetalReward, Receipt } from '../types';
import {
  initialUserProfile,
  initialVouchers,
  journalStories as initialStories,
  initialStamps,
  petalRewardsCatalog,
  mockReceipts,
  omikujiFortunes,
} from '../data/mockData';

interface AppContextType {
  activeScreen: ScreenType;
  setActiveScreen: (screen: ScreenType) => void;
  deviceViewMode: 'responsive' | 'mobile_frame';
  setDeviceViewMode: (mode: 'responsive' | 'mobile_frame') => void;
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  toggleSidebar: () => void;
  
  user: UserProfile;
  vouchers: Voucher[];
  journalStories: JournalStory[];
  stamps: Stamp[];
  rewards: PetalReward[];
  receipts: Receipt[];
  
  selectedReceipt: Receipt | null;
  setSelectedReceipt: (receipt: Receipt | null) => void;
  
  isOmikujiModalOpen: boolean;
  setIsOmikujiModalOpen: (open: boolean) => void;
  currentFortune: typeof omikujiFortunes[0];
  drawFortune: () => void;
  
  isRoseChatOpen: boolean;
  setIsRoseChatOpen: (open: boolean) => void;
  
  isFloorMapModalOpen: boolean;
  setIsFloorMapModalOpen: (open: boolean) => void;
  selectedFloor: string;
  setSelectedFloor: (floor: string) => void;
  
  isTriviaModalOpen: boolean;
  setIsTriviaModalOpen: (open: boolean) => void;
  
  isVoucherWalletOpen: boolean;
  setIsVoucherWalletOpen: (open: boolean) => void;
  
  toastMessage: string | null;
  showToast: (msg: string) => void;
  
  handleCheckInDaily: () => void;
  redeemReward: (reward: PetalReward) => boolean;
  toggleApplyVoucher: (id: string) => void;
  stampTrailCheckpoint: (stampId: number) => void;
  likeStory: (storyId: string) => void;
  
  autoApplyDiscount: boolean;
  setAutoApplyDiscount: (val: boolean) => void;
  
  activeCardIndex: number;
  setActiveCardIndex: (idx: number) => void;
  
  language: 'EN' | '日本語' | '中文';
  setLanguage: (lang: 'EN' | '日本語' | '中文') => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [activeScreen, setActiveScreen] = useState<ScreenType>('home');
  const [deviceViewMode, setDeviceViewMode] = useState<'responsive' | 'mobile_frame'>('responsive');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  const [user, setUser] = useState<UserProfile>(initialUserProfile);
  const [vouchers, setVouchers] = useState<Voucher[]>(initialVouchers);
  const [journalStories, setJournalStories] = useState<JournalStory[]>(initialStories);
  const [stamps, setStamps] = useState<Stamp[]>(initialStamps);
  const [rewards] = useState<PetalReward[]>(petalRewardsCatalog);
  const [receipts] = useState<Receipt[]>(mockReceipts);
  
  const [selectedReceipt, setSelectedReceipt] = useState<Receipt | null>(null);
  const [isOmikujiModalOpen, setIsOmikujiModalOpen] = useState(false);
  const [currentFortune, setCurrentFortune] = useState(omikujiFortunes[0]);
  
  const [isRoseChatOpen, setIsRoseChatOpen] = useState(false);
  const [isFloorMapModalOpen, setIsFloorMapModalOpen] = useState(false);
  const [selectedFloor, setSelectedFloor] = useState('B2');
  const [isTriviaModalOpen, setIsTriviaModalOpen] = useState(false);
  const [isVoucherWalletOpen, setIsVoucherWalletOpen] = useState(false);
  
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [autoApplyDiscount, setAutoApplyDiscount] = useState(true);
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const [language, setLanguage] = useState<'EN' | '日本語' | '中文'>('EN');

  const toggleSidebar = () => setSidebarOpen((prev) => !prev);

  const showToast = (msg: string) => {
    setToastMessage(msg);
  };

  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => {
        setToastMessage(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [toastMessage]);

  const handleCheckInDaily = () => {
    if (user.streakClaimedToday) {
      showToast('🌸 Already checked in today! Come back tomorrow for Day 6 (+15 Petals).');
      return;
    }
    const bonus = 15;
    setUser((prev) => ({
      ...prev,
      petals: prev.petals + bonus,
      checkInStreak: prev.checkInStreak + 1,
      streakClaimedToday: true,
    }));
    showToast(`🌸 Day ${user.checkInStreak + 1} checked in! +${bonus} Petals added.`);
  };

  const drawFortune = () => {
    const randomIndex = Math.floor(Math.random() * omikujiFortunes.length);
    const fortune = omikujiFortunes[randomIndex];
    setCurrentFortune(fortune);
    setUser((prev) => ({
      ...prev,
      petals: prev.petals + fortune.bonusPetals,
    }));
    showToast(`🎋 ${fortune.kanji} (${fortune.romaji}) drawn! +${fortune.bonusPetals} Petals received.`);
  };

  const redeemReward = (reward: PetalReward): boolean => {
    if (user.petals < reward.petalsCost) {
      showToast(`⚠️ Need ${reward.petalsCost - user.petals} more Petals to redeem this item.`);
      return false;
    }

    setUser((prev) => ({
      ...prev,
      petals: prev.petals - reward.petalsCost,
    }));

    // Add corresponding voucher to wallet if it's a voucher or gift
    const newVoucher: Voucher = {
      id: `redeemed-${Date.now()}`,
      code: `REDEEM-${Math.floor(1000 + Math.random() * 9000)}`,
      title: reward.title,
      type: 'REWARD',
      discountText: `${reward.petalsCost} Petals`,
      description: reward.description,
      validUntil: '31 Dec 2026',
      isApplied: false,
      isUsed: false,
      terms: ['Present QR code at Customer Service L3 or cashier to claim.'],
    };

    setVouchers((prev) => [newVoucher, ...prev]);
    showToast(`🌸 Successfully redeemed "${reward.title}"! Added to your Voucher Wallet.`);
    return true;
  };

  const toggleApplyVoucher = (id: string) => {
    setVouchers((prev) =>
      prev.map((v) => {
        if (v.id === id) {
          const nextState = !v.isApplied;
          showToast(nextState ? `🎟️ Applied: ${v.title} to upcoming scan!` : `Voucher removed from active scan.`);
          return { ...v, isApplied: nextState };
        }
        return v;
      })
    );
  };

  const stampTrailCheckpoint = (stampId: number) => {
    setStamps((prev) =>
      prev.map((st) => {
        if (st.id === stampId) {
          if (st.isCollected) {
            showToast(`✨ Checkpoint "${st.name}" already collected!`);
            return st;
          }
          setUser((u) => ({ ...u, petals: u.petals + 20 }));
          showToast(`🌸 Stamp Collected: ${st.name} (${st.floor})! +20 Petals awarded.`);
          return { ...st, isCollected: true, collectedAt: 'Just now' };
        }
        return st;
      })
    );
  };

  const likeStory = (storyId: string) => {
    setJournalStories((prev) =>
      prev.map((story) => {
        if (story.id === storyId) {
          const nextLiked = !story.userLiked;
          return {
            ...story,
            userLiked: nextLiked,
            likes: nextLiked ? story.likes + 1 : story.likes - 1,
          };
        }
        return story;
      })
    );
  };

  return (
    <AppContext.Provider
      value={{
        activeScreen,
        setActiveScreen,
        deviceViewMode,
        setDeviceViewMode,
        sidebarOpen,
        setSidebarOpen,
        toggleSidebar,
        user,
        vouchers,
        journalStories,
        stamps,
        rewards,
        receipts,
        selectedReceipt,
        setSelectedReceipt,
        isOmikujiModalOpen,
        setIsOmikujiModalOpen,
        currentFortune,
        drawFortune,
        isRoseChatOpen,
        setIsRoseChatOpen,
        isFloorMapModalOpen,
        setIsFloorMapModalOpen,
        selectedFloor,
        setSelectedFloor,
        isTriviaModalOpen,
        setIsTriviaModalOpen,
        isVoucherWalletOpen,
        setIsVoucherWalletOpen,
        toastMessage,
        showToast,
        handleCheckInDaily,
        redeemReward,
        toggleApplyVoucher,
        stampTrailCheckpoint,
        likeStory,
        autoApplyDiscount,
        setAutoApplyDiscount,
        activeCardIndex,
        setActiveCardIndex,
        language,
        setLanguage,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
