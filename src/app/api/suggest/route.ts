import { NextRequest, NextResponse } from 'next/server';
import { suggestShopsFromNotion } from '@/lib/notion';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const genre = searchParams.get('genre') || undefined;
    const areasParam = searchParams.get('areas');
    const budget = searchParams.get('budget') || undefined;
    const timeSlot = searchParams.get('timeSlot') || undefined;
    const count = parseInt(searchParams.get('count') || '3', 10);

    const areas = areasParam ? areasParam.split(',') : [];

    const shops = await suggestShopsFromNotion({
      genre,
      areas,
      budget,
      timeSlot,
    }, count);

    return NextResponse.json(shops);
  } catch (error) {
    console.error('Error suggesting shops:', error);
    return NextResponse.json({ error: 'Failed to suggest shops' }, { status: 500 });
  }
}
