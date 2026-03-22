'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Shop } from '@/types/shop';
import { getShopById, formatRating } from '@/lib/shop';

export default function ShopDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [shop, setShop] = useState<Shop | null>(null);

  useEffect(() => {
    const result = getShopById(params.id as string);
    setShop(result || null);
  }, [params.id]);

  if (!shop) {
    return (
      <main className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">お店が見つかりません</p>
          <Link href="/" className="text-orange-500 hover:underline mt-4 inline-block">
            ホームに戻る
          </Link>
        </div>
      </main>
    );
  }

  const handleOpenMaps = () => {
    if (shop.googleMapsUrl) {
      window.open(shop.googleMapsUrl, '_blank');
    } else {
      const query = encodeURIComponent(`${shop.area} ${shop.name}`);
      window.open(`https://www.google.com/maps/search/?api=1&query=${query}`, '_blank');
    }
  };

  const handleVisited = () => {
    alert('「行った」を記録しました！（デモ版）');
    router.push('/');
  };

  return (
    <main className="flex-1 flex flex-col">
      <div className="px-4 py-4 max-w-md mx-auto w-full">
        <header className="flex items-center mb-6">
          <button
            onClick={() => router.back()}
            className="text-gray-600 hover:text-gray-900"
          >
            ← 戻る
          </button>
          <h1 className="flex-1 text-center font-bold text-gray-900">お店詳細</h1>
          <div className="w-12" />
        </header>

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="p-5 space-y-4">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">{shop.name}</h2>
              <div className="text-lg">{formatRating(shop.rating)}</div>
            </div>

            <div className="space-y-3 text-sm border-t border-gray-100 pt-4">
              <div className="flex items-center gap-3">
                <span className="w-20 text-gray-500">ジャンル</span>
                <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full font-medium">
                  {shop.category}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-20 text-gray-500">エリア</span>
                <span className="text-gray-800">{shop.area}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-20 text-gray-500">予算</span>
                <span className="text-gray-800">{shop.budget}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-20 text-gray-500">時間帯</span>
                <div className="flex gap-2">
                  {shop.timeSlots.map((t) => (
                    <span key={t} className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full font-medium">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="w-20 text-gray-500">住所</span>
                <span className="text-gray-800">{shop.address}</span>
              </div>
            </div>

            {shop.memo && (
              <div className="bg-gray-50 rounded-xl p-4">
                <p className="text-sm text-gray-600">
                  <span className="font-medium text-gray-700">メモ: </span>
                  {shop.memo}
                </p>
              </div>
            )}

            <div className="flex gap-4 text-sm text-gray-500">
              <span>行った回数: {shop.visitCount}回</span>
              {shop.lastVisitDate && (
                <span>最終訪問: {shop.lastVisitDate}</span>
              )}
            </div>
          </div>

          <div className="border-t border-gray-100 p-4 space-y-3">
            <button
              onClick={handleOpenMaps}
              className="w-full py-3 bg-blue-500 text-white rounded-xl font-medium hover:bg-blue-600 transition-colors flex items-center justify-center gap-2"
            >
              📍 Google Mapsで見る
            </button>
            <button
              onClick={handleVisited}
              className="w-full py-3 bg-orange-500 text-white rounded-xl font-medium hover:bg-orange-600 transition-colors flex items-center justify-center gap-2"
            >
              ✅ 行った！
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
