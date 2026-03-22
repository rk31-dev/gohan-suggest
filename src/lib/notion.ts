import { Client } from '@notionhq/client';

const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});

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

export async function fetchShopsFromNotion(): Promise<Shop[]> {
  const databaseId = process.env.NOTION_DATABASE_ID;
  
  if (!databaseId) {
    console.error('NOTION_DATABASE_ID is not set');
    return [];
  }

  try {
    // @ts-expect-error - Notion SDK types
    const response = await notion.databases.query({
      database_id: databaseId,
    });

    return response.results.map((page: any) => {
      const properties = page.properties;
      
      return {
        id: page.id,
        name: properties['名前']?.title?.[0]?.plain_text || '',
        genres: properties['ジャンル']?.multi_select?.map((g: any) => g.name) || [],
        areas: properties['場所']?.multi_select?.map((a: any) => a.name) || [],
        budget: properties['予算']?.select?.name || null,
        url: properties['URL']?.url || null,
        lunchSet: properties['ランチセット']?.rich_text?.[0]?.plain_text || null,
        timeSlots: properties['時間帯']?.multi_select?.map((t: any) => t.name) || [],
      };
    });
  } catch (error) {
    console.error('Error fetching from Notion:', error);
    return [];
  }
}

export async function suggestShopsFromNotion(params: {
  genre?: string;
  areas?: string[];
  budget?: string;
  timeSlot?: string;
}, count: number = 3): Promise<Shop[]> {
  const shops = await fetchShopsFromNotion();
  
  let candidates = [...shops];

  if (params.genre) {
    candidates = candidates.filter(shop => shop.genres.includes(params.genre!));
  }

  if (params.areas && params.areas.length > 0) {
    candidates = candidates.filter(shop => 
      params.areas!.some(area => shop.areas.includes(area))
    );
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

export async function getShopByIdFromNotion(id: string): Promise<Shop | null> {
  const shops = await fetchShopsFromNotion();
  return shops.find(shop => shop.id === id) || null;
}
