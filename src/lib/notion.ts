import { Client } from '@notionhq/client';

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

let notionClient: Client | null = null;

function getNotionClient(): Client {
  if (notionClient) {
    return notionClient;
  }

  const apiKey = process.env.NOTION_API_KEY;
  const databaseId = process.env.NOTION_DATABASE_ID;

  if (!apiKey) {
    const error = new Error('[NOTION ERROR] NOTION_API_KEY is not set. Please configure it in Vercel Environment Variables.');
    console.error(error.message);
    throw error;
  }

  if (!databaseId) {
    const error = new Error('[NOTION ERROR] NOTION_DATABASE_ID is not set. Please configure it in Vercel Environment Variables.');
    console.error(error.message);
    throw error;
  }

  console.log('[NOTION] Initializing Notion client...');
  notionClient = new Client({ auth: apiKey });
  return notionClient;
}

let shopsCache: { data: Shop[]; timestamp: number } | null = null;
const CACHE_TTL = 5 * 60 * 1000;

export async function fetchShopsFromNotion(forceRefresh: boolean = false): Promise<Shop[]> {
  const now = Date.now();
  
  if (!forceRefresh && shopsCache && (now - shopsCache.timestamp) < CACHE_TTL) {
    console.log('[NOTION] Returning cached data');
    return shopsCache.data;
  }

  const notion = getNotionClient();
  const databaseId = process.env.NOTION_DATABASE_ID!;

  try {
    console.log('[NOTION] Fetching data from Notion database:', databaseId);
    
    const response = await notion.databases.query({
      database_id: databaseId,
    });

    const shops = response.results.map((page: any) => {
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

    console.log(`[NOTION] Successfully fetched ${shops.length} shops`);
    
    shopsCache = { data: shops, timestamp: now };
    
    return shops;
  } catch (error: any) {
    console.error('[NOTION ERROR] Failed to fetch from Notion:', {
      message: error.message,
      code: error.code,
      status: error.status,
    });
    throw error;
  }
}

export async function suggestShopsFromNotion(params: {
  genre?: string;
  areas?: string[];
  budget?: string;
  timeSlot?: string;
}, count: number = 3, forceRefresh: boolean = false): Promise<Shop[]> {
  const shops = await fetchShopsFromNotion(forceRefresh);
  
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

export async function getShopByIdFromNotion(id: string, forceRefresh: boolean = false): Promise<Shop | null> {
  const shops = await fetchShopsFromNotion(forceRefresh);
  return shops.find(shop => shop.id === id) || null;
}

export function clearCache(): void {
  shopsCache = null;
  console.log('[NOTION] Cache cleared');
}
