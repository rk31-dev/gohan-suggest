import { NextRequest, NextResponse } from 'next/server';
import { fetchShopsFromNotion, clearCache } from '@/lib/notion';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const forceRefresh = searchParams.get('refresh') === 'true';
    
    if (forceRefresh) {
      clearCache();
    }
    
    const shops = await fetchShopsFromNotion(forceRefresh);
    return NextResponse.json({ success: true, count: shops.length, data: shops });
  } catch (error: any) {
    console.error('[API ERROR] /api/shops:', error);
    return NextResponse.json({ 
      success: false, 
      error: error.message || 'Failed to fetch shops',
      hint: 'Check /api/health for environment variable status'
    }, { status: 500 });
  }
}
