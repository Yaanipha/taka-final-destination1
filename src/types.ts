export type ScreenType = 'home' | 'explore' | 'pay' | 'rewards' | 'account';

export interface UserProfile {
  name: string;
  memberId: string;
  tier: 'Bronze' | 'Silver' | 'Gold' | 'Platinum' | 'Rose Gold';
  validThru: string;
  petals: number;
  spendCurrent: number;
  spendTargetNextTier: number;
  nextTierName: string;
  checkInStreak: number;
  streakClaimedToday: boolean;
  carIU: string;
  linkedCards: LinkedCard[];
}

export interface LinkedCard {
  id: string;
  type: 'AMEX' | 'VISA' | 'MASTERCARD';
  bank: string;
  cardName: string;
  last4: string;
  exp: string;
  isPrimary: boolean;
  pointsRate: string;
}

export interface Voucher {
  id: string;
  code: string;
  title: string;
  type: 'CASH VOUCHER' | 'BIRTHDAY SPECIAL' | 'DINING' | 'REWARD' | 'PARKING';
  discountText: string;
  description: string;
  validUntil: string;
  minSpend?: string;
  isApplied: boolean;
  isUsed: boolean;
  terms: string[];
}

export interface JournalStory {
  id: string;
  title: string;
  category: 'FOOD' | 'BEAUTY' | 'SHOPPING' | 'LIFESTYLE';
  author: string;
  authorAvatar: string;
  timeAgo: string;
  rating: number;
  description: string;
  location: string;
  petalsReward: number;
  imageUrl: string;
  likes: number;
  userLiked?: boolean;
}

export interface Stamp {
  id: number;
  name: string;
  category: string;
  floor: string;
  icon: string;
  isCollected: boolean;
  collectedAt?: string;
}

export interface PetalReward {
  id: string;
  title: string;
  tag: string;
  petalsCost: number;
  description: string;
  imageUrl: string;
  category: string;
  isAvailable: boolean;
  stockText?: string;
}

export interface Receipt {
  id: string;
  storeName: string;
  floor: string;
  category: string;
  dateTime: string;
  amount: number;
  petalsEarned: number;
  taxInvoiceNo: string;
  gstAmount: number;
  items: { name: string; qty: number; price: number }[];
}

export interface FloorDirectory {
  level: string;
  name: string;
  highlight: string;
  icon: string;
  categories: string[];
  featuredShops: { name: string; unit: string; tag: string }[];
}
