
export enum ServiceCategory {
  SOCIAL_GROWTH = 'SOCIAL_GROWTH', // Followers, General Growth
  INTERACTIONS = 'INTERACTIONS', // Likes, Views, Comments
  ACCOUNTS = 'ACCOUNTS', // Aged accounts, Monetized channels
  ADS_MANAGEMENT = 'ADS_MANAGEMENT', // Ad Accounts, Campaign Setup
  WEB_DEV = 'WEB_DEV', // Landing pages, Stores
  CONTENT_STRATEGY = 'CONTENT_STRATEGY', // AI Plans
  GAMING = 'GAMING', // Pubg, Free Fire
  STREAMING = 'STREAMING', // Netflix, Spotify
  FACEBOOK_PAGES = 'FACEBOOK_PAGES', // Dedicated Facebook Pages
  FINANCIAL = 'FINANCIAL', // PayPal, Payment services
  SOFTWARE = 'SOFTWARE' // New: Canva, Adobe, CapCut
}

export type ServiceType = 'ASSET' | 'GROWTH' | 'TOPUP' | 'SUBSCRIPTION' | 'SERVICE';

export type InputField = 'LINK' | 'USERNAME' | 'EMAIL' | 'PLAYER_ID' | 'NONE';

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  price: number;
  category: ServiceCategory;
  serviceType: ServiceType; // Logic differentiator
  requiredInputs: InputField[]; // What user needs to provide
  image: string;
  platform?: 'Instagram' | 'TikTok' | 'YouTube' | 'Web' | 'Google' | 'Meta' | 'Facebook' | 'General' | 'Gaming' | 'Streaming' | 'PayPal' | 'X' | 'Snapchat' | 'Netflix' | 'Spotify' | 'Telegram' | 'LinkedIn' | 'FreeFire' | 'PUBG' | 'Fortnite' | 'Call of Duty' | 'Apex Legends' | 'Google Play' | 'Canva' | 'Adobe' | 'CapCut';
  features: string[];
  unitSize?: number; // e.g., 1000 for "1k Followers"
  unitType?: string; // e.g., "Followers", "Views"
  previewImage?: string; // URL for a sample result or demo
  maxQuantity?: number; // For unique assets, max is 1
  customData?: Record<string, string>; // Optional Default data
}

export interface CartItem extends ServiceItem {
  quantity: number;
  customData: Record<string, string>; // Stores dynamic inputs like { link: "...", playerId: "..." }
}

export interface AIRecommendation {
  analysis: string;
  recommendedServiceIds: string[];
  strategyTitle: string;
}

export interface TaskItem {
  id: string;
  title: string;
  type: 'FOLLOW' | 'LIKE' | 'COMMENT' | 'SHARE';
  points: number;
  platform: 'Instagram' | 'TikTok' | 'YouTube' | 'Twitter' | 'Facebook' | 'General';
  url: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  points: number;
  isVerified: boolean;
}