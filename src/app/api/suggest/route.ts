import { NextRequest, NextResponse } from 'next/server';
import { suggestShopsFromNotion, clearCache } from '@/lib/notion';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const genre = searchParams.get('genre') || undefined;
    const areasParam = searchParams.get('areas');
    const budget = searchParams.get('budget') || undefined;
    const timeSlot = searchParams.get('timeSlot') || undefined;
    const count = parseInt(searchParams.get('count') || '3', 10);
    const forceRefresh = searchParams.get('refresh') === 'true';
    const excludeGenresParam = searchParams.get('excludeGenres');
    const excludeAreasParam = searchParams.get('excludeAreas');

    if (forceRefresh) {
      clearCache();
    }

    const areas = areasParam ? areasParam.split(',') : [];
    const excludeGenres = excludeGenresParam ? excludeGenresParam.split(',') : [];
    const excludeAreas = excludeAreasParam ? excludeAreasParam.split(',') : [];

    const shops = await suggestShopsFromNotion({
      genre,
      areas,
      budget,
      timeSlot,
      excludeGenres,
      excludeAreas,
    }, count, forceRefresh);

    return NextResponse.json({ success: true, count: shops.length, data: shops });
  } catch (error: any) {
    console.error('[API ERROR] /api/suggest:', error);
    return NextResponse.json({ 
      success: false, 
      error: error.message || 'Failed to suggest shops',
      hint: 'Check /api/health for environment variable status'
    }, { status: 500 });
  }
}
