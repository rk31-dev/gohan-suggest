'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Shop } from '@/types/shop';
import { fetchShopsFromNotion } from '@/lib/notion';
import { genres, areas, budgets, timeSlots } from '@/types/shop';

export default function ShopsPage() {
  const [allShops, setAllShops] = useState<Shop[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedGenre, setSelectedGenre] = useState<string>('');
  const [selectedAreas, setSelectedAreas] = useState<string[]>([]);
  const [selectedBudget, setSelectedBudget] = useState<string>('');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>('');

  useEffect(() => {
    fetchShopsFromNotion().then((shops) => {
      setAllShops(shops);
      setLoading(false);
    });
  }, []);

  const toggleArea = (area: string) => {
    if (selectedAreas.includes(area)) {
      setSelectedAreas(selectedAreas.filter(a => a !== area));
    } else {
      setSelectedAreas([...selectedAreas, area]);
    }
  };

  const filteredShops = allShops.filter((shop) => {
    if (selectedGenre && !shop.genres.includes(selectedGenre)) return false;
    if (selectedAreas.length > 0 && !selectedAreas.some(area => shop.areas.includes(area))) return false;
    if (selectedBudget && shop.budget !== selectedBudget) return false;
    if (selectedTimeSlot && !shop.timeSlots.includes(selectedTimeSlot)) return false;
    return true;
  });

  return (
    <main className="flex-1 flex flex-col">
      <div className="px-4 py-4 max-w-md mx-auto w-full">
        <header className="flex items-center mb-4">
          <Link href="/" className="text-gray-600 hover:text-gray-900">
            ← 戻る
          </Link>
          <h1 className="flex-1 text-center font-bold text-gray-900">お店一覧</h1>
          <div className="w-12" />
        </header>

        {loading ? (
          <div className="text-center py-8">
            <div className="animate-spin text-5xl mb-4">🎲</div>
            <p className="text-gray-600">読み込み中...</p>
          </div>
        ) : (
          <>
            <div className="mb-4 text-sm text-gray-500">
              {filteredShops.length}件 / {allShops.length}件
            </div>

            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">時間帯</label>
                <select
                  value={selectedTimeSlot}
                  onChange={(e) => setSelectedTimeSlot(e.target.value)}
                  className="w-full p-2 rounded-lg border border-gray-200 text-sm"
                >
                  <option value="">すべて</option>
                  {timeSlots.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">ジャンル</label>
                <select
                  value={selectedGenre}
                  onChange={(e) => setSelectedGenre(e.target.value)}
                  className="w-full p-2 rounded-lg border border-gray-200 text-sm"
                >
                  <option value="">すべて</option>
                  {genres.map((g) => (
                    <option key={g} value={g}>{g}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">場所</label>
                <div className="flex flex-wrap gap-2">
                  {areas.map((area) => (
                    <button
                      key={area}
                      onClick={() => toggleArea(area)}
                      className={`px-3 py-1 rounded-full text-xs font-medium border transition-colors
                        ${selectedAreas.includes(area)
                          ? 'bg-orange-500 text-white border-orange-500'
                          : 'bg-white text-gray-600 border-gray-200 hover:border-orange-300'
                        }`}
                    >
                      {area}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">予算</label>
                <select
                  value={selectedBudget}
                  onChange={(e) => setSelectedBudget(e.target.value)}
                  className="w-full p-2 rounded-lg border border-gray-200 text-sm"
                >
                  <option value="">すべて</option>
                  {budgets.map((b) => (
                    <option key={b} value={b}>{b}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="space-y-3">
              {filteredShops.map((shop) => (
                <div
                  key={shop.id}
                  className="bg-white rounded-xl p-4 shadow-sm border border-gray-100"
                >
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-bold text-gray-900">{shop.name}</h3>
                  </div>
                  <div className="flex flex-wrap gap-2 text-xs mb-2">
                    {shop.genres.map((g) => (
                      <span key={g} className="px-2 py-1 bg-orange-100 text-orange-700 rounded-full">
                        {g}
                      </span>
                    ))}
                    {shop.areas.map((a) => (
                      <span key={a} className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full">
                        {a}
                      </span>
                    ))}
                    {shop.budget && (
                      <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full">
                        {shop.budget}
                      </span>
                    )}
                    {shop.timeSlots.map((t) => (
                      <span key={t} className="px-2 py-1 bg-purple-100 text-purple-700 rounded-full">
                        {t}
                      </span>
                    ))}
                  </div>
                  {shop.lunchSet && (
                    <p className="text-xs text-gray-500">📝 {shop.lunchSet}</p>
                  )}
                  {shop.url && (
                    <a
                      href={shop.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-blue-500 hover:underline mt-2 inline-block"
                    >
                      🗺️ 地図を見る
                    </a>
                  )}
                </div>
              ))}

              {filteredShops.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  条件に合うお店がありません
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </main>
  );
}
