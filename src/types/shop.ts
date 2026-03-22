export type Genre = 
  | 'デザート'
  | 'カフェ'
  | 'イタリアン'
  | 'フレンチ'
  | '中華'
  | 'パン'
  | '麺'
  | 'ご飯'
  | 'お肉'
  | '中南米'
  | 'お好み焼き'
  | 'ピザ'
  | '居酒屋'
  | '朝ラー'
  | '唐揚げ'
  | '寿司'
  | 'パスタ'
  | 'カレー';

export type Area = 
  | '伊勢崎'
  | '安中'
  | '前橋'
  | '高崎'
  | '東京'
  | '渋谷'
  | '吉岡'
  | '太田';

export type Budget = '1000円' | '2000円' | '4000円' | '10000円';

export type TimeSlot = 'ランチ' | 'ディナー';

export interface Shop {
  id: string;
  name: string;
  genres: string[];
  areas: string[];
  budget: string | null;
  url: string | null;
  lunchSet: string | null;
  timeSlots: string[];
}

export interface SuggestParams {
  genre?: string;
  areas?: string[];
  budget?: string;
  timeSlot?: string;
}

export const genres = ['デザート', 'カフェ', 'イタリアン', 'フレンチ', '中華', 'パン', '麺', 'ご飯', 'お肉', '中南米', 'お好み焼き', 'ピザ', '居酒屋', '朝ラー', '唐揚げ', '寿司', 'パスタ', 'カレー'] as const;
export const areas = ['伊勢崎', '安中', '前橋', '高崎', '東京', '渋谷', '吉岡', '太田'] as const;
export const budgets = ['1000円', '2000円', '4000円', '10000円'] as const;
export const timeSlots = ['ランチ', 'ディナー'] as const;
