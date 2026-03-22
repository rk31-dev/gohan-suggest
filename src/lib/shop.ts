import { Shop, SuggestParams, Area } from '@/types/shop';
import { mockShops } from './mock-data';

export function suggestShops(params: SuggestParams = {}, count: number = 3): Shop[] {
  let candidates = [...mockShops];

  if (params.category) {
    candidates = candidates.filter(shop => shop.category === params.category);
  }

  if (params.areas && params.areas.length > 0) {
    candidates = candidates.filter(shop => params.areas!.includes(shop.area));
  }

  if (params.budget) {
    candidates = candidates.filter(shop => shop.budget === params.budget);
  }

  if (params.timeSlot) {
    candidates = candidates.filter(shop => shop.timeSlots.includes(params.timeSlot!));
  }

  if (candidates.length === 0) {
    return [];
  }

  const shuffled = candidates.sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(count, candidates.length));
}

export function getShopById(id: string): Shop | undefined {
  return mockShops.find(shop => shop.id === id);
}

export function getAllShops(): Shop[] {
  return mockShops;
}

export function formatRating(rating: number): string {
  return '⭐'.repeat(rating) + '☆'.repeat(5 - rating);
}

export function filterShops(params: {
  category?: string;
  areas?: Area[];
  budget?: string;
  timeSlot?: string;
}): Shop[] {
  let result = [...mockShops];

  if (params.category) {
    result = result.filter(shop => shop.category === params.category);
  }

  if (params.areas && params.areas.length > 0) {
    result = result.filter(shop => params.areas!.includes(shop.area));
  }

  if (params.budget) {
    result = result.filter(shop => shop.budget === params.budget);
  }

  if (params.timeSlot) {
    result = result.filter(shop => shop.timeSlots.includes(params.timeSlot as 'ランチ' | 'ディナー'));
  }

  return result;
}
