'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Shop, genres, areas, budgets, timeSlots, getMapUrl } from '@/types/shop';

export default function ShopsPage() {
  const [allShops, setAllShops] = useState<Shop[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedGenre, setSelectedGenre] = useState<string>('');
  const [selectedAreas, setSelectedAreas] = useState<string[]>([]);
  const [selectedBudget, setSelectedBudget] = useState<string>('');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>('');

  const fetchShops = async (forceRefresh: boolean = false) => {
    setLoading(true);
    setError(null);
    
    try {
      const url = forceRefresh ? '/api/shops?refresh=true' : '/api/shops';
      const res = await fetch(url);
      const data = await res.json();
      
      if (data.success) {
        setAllShops(data.data);
      } else {
        setError(data.error || 'データの取得に失敗しました');
      }
    } catch (e) {
      setError('ネットワークエラーが発生しました');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchShops();
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

        <button
          onClick={() => fetchShops(true)}
          disabled={loading}
          className="w-full mb-4 py-2 px-4 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <span className="animate-spin">⏳</span>
              読み込み中...
            </>
          ) : (
            <>
              🔄 最新データを取得
            </>
          )}
        </button>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
            ⚠️ {error}
            <button 
              onClick={() => fetchShops(true)}
              className="ml-2 underline hover:no-underline"
            >
              再試行
            </button>
          </div>
        )}

        {!loading && !error && (
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
                  <div className="flex gap-3 mt-2">
                    <a
                      href={getMapUrl(shop)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-blue-500 hover:underline"
                    >
                      🗺️ 地図
                    </a>
                    {shop.url && (
                      <a
                        href={shop.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-green-500 hover:underline"
                      >
                        🌐 HP
                      </a>
                    )}
                  </div>
                </div>
              ))}

              {filteredShops.length === 0 && allShops.length > 0 && (
                <div className="text-center py-8 text-gray-500">
                  条件に合うお店がありません
                </div>
              )}

              {allShops.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  お店データがありません。「最新データを取得」ボタンを押してください。
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </main>
  );
}
