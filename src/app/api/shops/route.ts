import { NextResponse } from 'next/server';
import { fetchShopsFromNotion } from '@/lib/notion';

export async function GET() {
  try {
    const shops = await fetchShopsFromNotion();
    return NextResponse.json(shops);
  } catch (error) {
    console.error('Error fetching shops:', error);
    return NextResponse.json({ error: 'Failed to fetch shops' }, { status: 500 });
  }
}
