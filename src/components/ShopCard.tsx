'use client';

import { Shop } from '@/types/shop';
import { formatRating } from '@/lib/shop';
import Link from 'next/link';

interface ShopCardProps {
  shop: Shop;
}

export function ShopCard({ shop }: ShopCardProps) {
  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
      <div className="p-5 space-y-4">
        <div className="flex items-start justify-between">
          <h3 className="text-xl font-bold text-gray-900">{shop.name}</h3>
          <span className="text-lg">{formatRating(shop.rating)}</span>
        </div>
        
        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2">
            <span className="text-gray-500">ジャンル:</span>
            <span className="px-2 py-1 bg-orange-100 text-orange-700 rounded-full text-xs font-medium">
              {shop.category}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-gray-500">エリア:</span>
            <span className="text-gray-800">{shop.area}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-gray-500">予算:</span>
            <span className="text-gray-800">{shop.budget}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-gray-500">時間帯:</span>
            <div className="flex gap-1">
              {shop.timeSlots.map((t) => (
                <span key={t} className="px-2 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-medium">
                  {t}
                </span>
              ))}
            </div>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-gray-500">📍</span>
            <span className="text-gray-800">{shop.address}</span>
          </div>
        </div>

        {shop.memo && (
          <div className="pt-2 border-t border-gray-100">
            <p className="text-sm text-gray-600">📝 {shop.memo}</p>
          </div>
        )}

        {shop.visitCount > 0 && (
          <div className="text-xs text-gray-400">
            行った回数: {shop.visitCount}回
            {shop.lastVisitDate && ` / 最終: ${shop.lastVisitDate}`}
          </div>
        )}
      </div>

      <div className="flex border-t border-gray-100">
        <Link
          href={`/shop/${shop.id}`}
          className="flex-1 py-3 text-orange-500 font-medium hover:bg-orange-50 transition-colors text-center"
        >
          詳細を見る
        </Link>
      </div>
    </div>
  );
}
