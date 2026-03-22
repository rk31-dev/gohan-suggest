'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Shop, Category, Area, Budget, TimeSlot } from '@/types/shop';
import { filterShops, formatRating } from '@/lib/shop';
import { categories, areas, budgets, timeSlots } from '@/lib/mock-data';

export default function ShopsPage() {
  const [selectedCategory, setSelectedCategory] = useState<Category | ''>('');
  const [selectedAreas, setSelectedAreas] = useState<Area[]>([]);
  const [selectedBudget, setSelectedBudget] = useState<Budget | ''>('');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<TimeSlot | ''>('');

  const toggleArea = (area: Area) => {
    if (selectedAreas.includes(area)) {
      setSelectedAreas(selectedAreas.filter(a => a !== area));
    } else {
      setSelectedAreas([...selectedAreas, area]);
    }
  };

  const filteredShops = filterShops({
    category: selectedCategory || undefined,
    areas: selectedAreas.length > 0 ? selectedAreas : undefined,
    budget: selectedBudget || undefined,
    timeSlot: selectedTimeSlot || undefined,
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

        <div className="mb-4 text-sm text-gray-500">
          {filteredShops.length}件のお店
        </div>

        <div className="space-y-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">時間帯</label>
            <select
              value={selectedTimeSlot}
              onChange={(e) => setSelectedTimeSlot(e.target.value as TimeSlot | '')}
              className="w-full p-2 rounded-lg border border-gray-200 text-sm"
            >
              <option value="">すべて</option>
              {timeSlots.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">カテゴリ</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value as Category | '')}
              className="w-full p-2 rounded-lg border border-gray-200 text-sm"
            >
              <option value="">すべて</option>
              {categories.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">エリア</label>
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
              onChange={(e) => setSelectedBudget(e.target.value as Budget | '')}
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
            <Link
              key={shop.id}
              href={`/shop/${shop.id}`}
              className="block bg-white rounded-xl p-4 shadow-sm border border-gray-100
                         hover:shadow-md hover:border-orange-200 transition-all"
            >
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-bold text-gray-900">{shop.name}</h3>
                <span className="text-sm">{formatRating(shop.rating)}</span>
              </div>
              <div className="flex flex-wrap gap-2 text-xs">
                <span className="px-2 py-1 bg-orange-100 text-orange-700 rounded-full">
                  {shop.category}
                </span>
                <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full">
                  {shop.area}
                </span>
                <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full">
                  {shop.budget}
                </span>
                {shop.timeSlots.map((t) => (
                  <span key={t} className="px-2 py-1 bg-purple-100 text-purple-700 rounded-full">
                    {t}
                  </span>
                ))}
              </div>
              {shop.memo && (
                <p className="mt-2 text-xs text-gray-500 line-clamp-1">📝 {shop.memo}</p>
              )}
            </Link>
          ))}

          {filteredShops.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              条件に合うお店がありません
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
