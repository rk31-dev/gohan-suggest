import { NextRequest, NextResponse } from 'next/server';
import { getShopByIdFromNotion, clearCache } from '@/lib/notion';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const searchParams = request.nextUrl.searchParams;
    const forceRefresh = searchParams.get('refresh') === 'true';
    
    if (forceRefresh) {
      clearCache();
    }
    
    const shop = await getShopByIdFromNotion(id, forceRefresh);
    
    if (!shop) {
      return NextResponse.json({ 
        success: false, 
        error: 'Shop not found' 
      }, { status: 404 });
    }
    
    return NextResponse.json({ success: true, data: shop });
  } catch (error: any) {
    console.error('[API ERROR] /api/shop/[id]:', error);
    return NextResponse.json({ 
      success: false, 
      error: error.message || 'Failed to fetch shop',
      hint: 'Check /api/health for environment variable status'
    }, { status: 500 });
  }
}
