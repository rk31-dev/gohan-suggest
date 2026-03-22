'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Shop, Category, Area, Budget, TimeSlot } from '@/types/shop';
import { suggestShops, formatRating } from '@/lib/shop';

function ResultContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [shops, setShops] = useState<Shop[]>([]);
  const [loading, setLoading] = useState(true);

  const category = searchParams.get('category') as Category | null;
  const areasParam = searchParams.get('areas');
  const budget = searchParams.get('budget') as Budget | null;
  const timeSlot = searchParams.get('timeSlot') as TimeSlot | null;

  useEffect(() => {
    const areas = areasParam ? (areasParam.split(',') as Area[]) : [];
    const results = suggestShops({
      category: category || undefined,
      areas,
      budget: budget || undefined,
      timeSlot: timeSlot || undefined,
    }, 3);
    setShops(results);
    setLoading(false);
  }, [searchParams]);

  const handleRetry = () => {
    const areas = areasParam ? (areasParam.split(',') as Area[]) : [];
    setLoading(true);
    setTimeout(() => {
      const results = suggestShops({
        category: category || undefined,
        areas,
        budget: budget || undefined,
        timeSlot: timeSlot || undefined,
      }, 3);
      setShops(results);
      setLoading(false);
    }, 500);
  };

  if (loading) {
    return (
      <main className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin text-5xl mb-4">🎲</div>
          <p className="text-gray-600">お店を探しています...</p>
        </div>
      </main>
    );
  }

  if (shops.length === 0) {
    return (
      <main className="flex-1 flex items-center justify-center px-4">
        <div className="text-center">
          <div className="text-5xl mb-4">😢</div>
          <p className="text-gray-800 font-medium mb-2">条件に合うお店が見つかりませんでした</p>
          <p className="text-gray-500 text-sm mb-6">条件を変えてみてください</p>
          <div className="flex gap-3 justify-center">
            <Link
              href="/"
              className="px-6 py-3 bg-gray-200 text-gray-700 rounded-xl font-medium hover:bg-gray-300 transition-colors"
            >
              条件を変更
            </Link>
            <Link
              href="/shops"
              className="px-6 py-3 bg-orange-500 text-white rounded-xl font-medium hover:bg-orange-600 transition-colors"
            >
              全てのお店を見る
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="flex-1 flex flex-col">
      <div className="px-4 py-4 max-w-md mx-auto w-full">
        <header className="flex items-center mb-4">
          <Link href="/" className="text-gray-600 hover:text-gray-900">
            ← 戻る
          </Link>
          <h1 className="flex-1 text-center font-bold text-gray-900">提案結果</h1>
          <div className="w-12" />
        </header>

        <div className="text-center text-sm text-gray-500 mb-4">
          ✨ 今日のおすすめ {shops.length}件 ✨
        </div>

        <div className="space-y-4">
          {shops.map((shop, index) => (
            <div key={shop.id} className="relative">
              <div className="absolute -left-2 -top-2 w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold text-sm z-10 shadow-lg">
                {index + 1}
              </div>
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
                  </div>

                  {shop.memo && (
                    <div className="pt-2 border-t border-gray-100">
                      <p className="text-sm text-gray-600">📝 {shop.memo}</p>
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
            </div>
          ))}
        </div>

        <div className="mt-6 space-y-3">
          <button
            onClick={handleRetry}
            className="w-full py-3 rounded-xl font-medium
                       bg-gradient-to-r from-orange-500 to-red-500 text-white
                       hover:shadow-lg transition-all"
          >
            🔄 もう一度提案
          </button>
          <Link
            href="/shops"
            className="block w-full py-3 rounded-xl font-medium text-center
                       bg-white text-gray-700 border-2 border-gray-200
                       hover:border-orange-300 transition-colors"
          >
            📋 お店一覧を見る
          </Link>
        </div>
      </div>
    </main>
  );
}

export default function ResultPage() {
  return (
    <Suspense fallback={
      <main className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin text-5xl mb-4">🎲</div>
          <p className="text-gray-600">読み込み中...</p>
        </div>
      </main>
    }>
      <ResultContent />
    </Suspense>
  );
}
