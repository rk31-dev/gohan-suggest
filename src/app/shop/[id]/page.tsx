'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Shop, getMapUrl } from '@/types/shop';

export default function ShopDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [shop, setShop] = useState<Shop | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(`/api/shop/${params.id}`)
      .then(res => res.json())
      .then((result) => {
        if (result.success) {
          setShop(result.data);
        } else {
          setError(result.error || 'お店が見つかりません');
        }
        setLoading(false);
      })
      .catch(() => {
        setError('ネットワークエラーが発生しました');
        setLoading(false);
      });
  }, [params.id]);

  if (loading) {
    return (
      <main className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin text-5xl mb-4">🎲</div>
          <p className="text-gray-600">読み込み中...</p>
        </div>
      </main>
    );
  }

  if (error || !shop) {
    return (
      <main className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <div className="text-5xl mb-4">⚠️</div>
          <p className="text-gray-600 mb-4">{error || 'お店が見つかりません'}</p>
          <Link href="/" className="text-orange-500 hover:underline">
            ホームに戻る
          </Link>
        </div>
      </main>
    );
  }

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
            </div>

            <div className="space-y-3 text-sm border-t border-gray-100 pt-4">
              <div className="flex items-start gap-3">
                <span className="w-20 text-gray-500 shrink-0">ジャンル</span>
                <div className="flex flex-wrap gap-2">
                  {shop.genres.map((g) => (
                    <span key={g} className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full font-medium">
                      {g}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="w-20 text-gray-500 shrink-0">場所</span>
                <div className="flex flex-wrap gap-2">
                  {shop.areas.map((a) => (
                    <span key={a} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full font-medium">
                      {a}
                    </span>
                  ))}
                </div>
              </div>
              {shop.budget && (
                <div className="flex items-center gap-3">
                  <span className="w-20 text-gray-500">予算</span>
                  <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full font-medium">
                    {shop.budget}
                  </span>
                </div>
              )}
              {shop.timeSlots.length > 0 && (
                <div className="flex items-start gap-3">
                  <span className="w-20 text-gray-500 shrink-0">時間帯</span>
                  <div className="flex gap-2">
                    {shop.timeSlots.map((t) => (
                      <span key={t} className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full font-medium">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {shop.lunchSet && (
              <div className="bg-gray-50 rounded-xl p-4">
                <p className="text-sm text-gray-600">
                  <span className="font-medium text-gray-700">メモ: </span>
                  {shop.lunchSet}
                </p>
              </div>
            )}
          </div>

          <div className="border-t border-gray-100 p-4 space-y-3">
            <a
              href={getMapUrl(shop)}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 bg-blue-500 text-white rounded-xl font-medium hover:bg-blue-600 transition-colors flex items-center justify-center gap-2"
            >
              🗺️ Google Mapsで探す
            </a>
            {shop.url && (
              <a
                href={shop.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 bg-green-500 text-white rounded-xl font-medium hover:bg-green-600 transition-colors flex items-center justify-center gap-2"
              >
                🌐 HPを見る
              </a>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
