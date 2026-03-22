'use client';

import { Shop, getMapUrl } from '@/types/shop';

interface ShopCardProps {
  shop: Shop;
  showActions?: boolean;
}

export function ShopCard({ shop, showActions = false }: ShopCardProps) {
  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
      <div className="p-5 space-y-4">
        <div className="flex items-start justify-between">
          <h3 className="text-xl font-bold text-gray-900">{shop.name}</h3>
        </div>
        
        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-gray-500">ジャンル:</span>
            {shop.genres.map((genre) => (
              <span key={genre} className="px-2 py-1 bg-orange-100 text-orange-700 rounded-full text-xs font-medium">
                {genre}
              </span>
            ))}
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-gray-500">場所:</span>
            {shop.areas.map((area) => (
              <span key={area} className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                {area}
              </span>
            ))}
          </div>
          {shop.budget && (
            <div className="flex items-center gap-2">
              <span className="text-gray-500">予算:</span>
              <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                {shop.budget}
              </span>
            </div>
          )}
          {shop.timeSlots.length > 0 && (
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-gray-500">時間帯:</span>
              {shop.timeSlots.map((t) => (
                <span key={t} className="px-2 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-medium">
                  {t}
                </span>
              ))}
            </div>
          )}
        </div>

        {shop.lunchSet && (
          <div className="pt-2 border-t border-gray-100">
            <p className="text-sm text-gray-600">📝 {shop.lunchSet}</p>
          </div>
        )}
      </div>

      {showActions && (
        <div className="flex border-t border-gray-100">
          <a
            href={getMapUrl(shop)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 py-3 text-blue-500 font-medium hover:bg-blue-50 transition-colors text-center"
          >
            🗺️ 地図
          </a>
          {shop.url && (
            <>
              <div className="w-px bg-gray-100" />
              <a
                href={shop.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-3 text-green-500 font-medium hover:bg-green-50 transition-colors text-center"
              >
                🌐 HP
              </a>
            </>
          )}
        </div>
      )}
    </div>
  );
}
