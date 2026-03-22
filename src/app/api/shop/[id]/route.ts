import { NextResponse } from 'next/server';
import { getShopByIdFromNotion } from '@/lib/notion';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const shop = await getShopByIdFromNotion(id);
    
    if (!shop) {
      return NextResponse.json({ error: 'Shop not found' }, { status: 404 });
    }
    
    return NextResponse.json(shop);
  } catch (error) {
    console.error('Error fetching shop:', error);
    return NextResponse.json({ error: 'Failed to fetch shop' }, { status: 500 });
  }
}
