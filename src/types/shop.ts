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

export function getMapUrl(shop: Shop): string {
  const query = shop.areas.length > 0 
    ? `${shop.name} ${shop.areas[0]}`
    : shop.name;
  return `https://www.google.com/maps?q=${encodeURIComponent(query)}`;
}

export interface SuggestParams {
  genres?: string[];
  areas?: string[];
  budget?: string;
  timeSlot?: string;
  excludeGenres?: string[];
  excludeAreas?: string[];
}

export const genres = ['デザート', 'カフェ', 'イタリアン', 'フレンチ', '中華', 'パン', '麺', 'ご飯', 'お肉', '中南米', 'お好み焼き', 'ピザ', '居酒屋', '朝ラー', '唐揚げ', '寿司', 'パスタ', 'カレー'] as const;
export const areas = ['伊勢崎', '安中', '前橋', '高崎', '東京', '渋谷', '吉岡', '太田'] as const;
export const budgets = ['1000円', '2000円', '4000円', '10000円'] as const;
export const timeSlots = ['ランチ', 'ディナー'] as const;

export interface GenreCategory {
  name: string;
  emoji: string;
  genres: string[];
}

export const genreCategories: GenreCategory[] = [
  {
    name: '和食',
    emoji: '🇯🇵',
    genres: ['寿司', 'ご飯', '麺', 'お好み焼き', '朝ラー'],
  },
  {
    name: '洋食',
    emoji: '🇪🇺',
    genres: ['イタリアン', 'フレンチ', 'パスタ', 'ピザ'],
  },
  {
    name: '中華',
    emoji: '🥢',
    genres: ['中華', 'カレー', '中南米'],
  },
  {
    name: '肉',
    emoji: '🍖',
    genres: ['お肉', '唐揚げ'],
  },
  {
    name: 'カフェ',
    emoji: '☕',
    genres: ['カフェ', 'パン', 'デザート'],
  },
  {
    name: 'その他',
    emoji: '🍻',
    genres: ['居酒屋'],
  },
];

export type SimpleCategory = '和食' | '洋食' | '中華' | '麺' | 'ご飯' | 'パン' | 'カフェ' | 'お肉';

export const simpleCategories: { name: SimpleCategory; emoji: string; genres: string[] }[] = [
  { name: '和食', emoji: '🇯🇵', genres: ['寿司', 'ご飯', 'お好み焼き'] },
  { name: '洋食', emoji: '🇪🇺', genres: ['イタリアン', 'フレンチ', 'パスタ', 'ピザ'] },
  { name: '中華', emoji: '🥢', genres: ['中華', 'カレー'] },
  { name: '麺', emoji: '🍜', genres: ['麺', '朝ラー'] },
  { name: 'ご飯', emoji: '🍚', genres: ['ご飯', '唐揚げ'] },
  { name: 'パン', emoji: '🥖', genres: ['パン', 'デザート'] },
  { name: 'カフェ', emoji: '☕', genres: ['カフェ', 'デザート'] },
  { name: 'お肉', emoji: '🥩', genres: ['お肉', '唐揚げ'] },
];

export const genreEmoji: Record<string, string> = {
  'デザート': '🍰',
  'カフェ': '☕',
  'イタリアン': '🍝',
  'フレンチ': '🥐',
  '中華': '🥟',
  'パン': '🥖',
  '麺': '🍜',
  'ご飯': '🍚',
  'お肉': '🥩',
  '中南米': '🌮',
  'お好み焼き': '🫓',
  'ピザ': '🍕',
  '居酒屋': '🍺',
  '朝ラー': '🍜',
  '唐揚げ': '🍗',
  '寿司': '🍣',
  'パスタ': '🍝',
  'カレー': '🍛',
};
