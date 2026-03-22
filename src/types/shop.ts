export type Category = 
  | '和食'
  | '洋食'
  | '中華'
  | 'イタリアン'
  | '韓国'
  | 'その他';

export type Area = 
  | '渋谷'
  | '新宿'
  | '池袋'
  | '銀座'
  | '六本木'
  | '表参道'
  | 'その他';

export type Budget = 
  | '~¥1,000'
  | '¥1,000-3,000'
  | '¥3,000-5,000'
  | '¥5,000-10,000'
  | '¥10,000~';

export type TimeSlot = 'ランチ' | 'ディナー';

export type Rating = 1 | 2 | 3 | 4 | 5;

export interface Shop {
  id: string;
  name: string;
  category: Category;
  area: Area;
  address: string;
  budget: Budget;
  rating: Rating;
  memo: string;
  visitCount: number;
  lastVisitDate: string | null;
  googleMapsUrl: string | null;
  timeSlots: TimeSlot[];
}

export interface SuggestParams {
  category?: Category;
  areas?: Area[];
  budget?: Budget;
  timeSlot?: TimeSlot;
}
