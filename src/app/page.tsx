'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Category, Area, Budget, TimeSlot } from '@/types/shop';
import { CategorySelector } from '@/components/CategorySelector';
import { AreaSelector } from '@/components/AreaSelector';
import { BudgetSelector } from '@/components/BudgetSelector';
import { TimeSlotSelector } from '@/components/TimeSlotSelector';

export default function Home() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [selectedAreas, setSelectedAreas] = useState<Area[]>([]);
  const [selectedBudget, setSelectedBudget] = useState<Budget | null>(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<TimeSlot | null>(null);

  const handleSuggest = () => {
    const params = new URLSearchParams();
    if (selectedCategory) params.set('category', selectedCategory);
    if (selectedAreas.length > 0) params.set('areas', selectedAreas.join(','));
    if (selectedBudget) params.set('budget', selectedBudget);
    if (selectedTimeSlot) params.set('timeSlot', selectedTimeSlot);
    router.push(`/result?${params.toString()}`);
  };

  return (
    <main className="flex-1 flex flex-col">
      <div className="flex-1 px-4 py-6 max-w-md mx-auto w-full">
        <header className="text-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            🍽️ ごはんサジェスト
          </h1>
          <p className="text-gray-600 text-sm">
            今日の食事、どこに行く？
          </p>
        </header>

        <div className="space-y-5">
          <TimeSlotSelector
            selected={selectedTimeSlot}
            onSelect={setSelectedTimeSlot}
          />

          <CategorySelector
            selected={selectedCategory}
            onSelect={setSelectedCategory}
          />

          <AreaSelector
            selected={selectedAreas}
            onSelect={setSelectedAreas}
          />

          <BudgetSelector
            selected={selectedBudget}
            onSelect={setSelectedBudget}
          />

          <div className="pt-2 space-y-3">
            <button
              onClick={handleSuggest}
              className="w-full py-4 rounded-2xl font-bold text-lg
                         bg-gradient-to-r from-orange-500 to-red-500 text-white 
                         hover:scale-105 hover:shadow-xl active:scale-95
                         transition-all duration-300 transform"
            >
              🎲 提案して！
            </button>

            <Link
              href="/shops"
              className="block w-full py-3 rounded-2xl font-medium text-center
                         bg-white text-gray-700 border-2 border-gray-200
                         hover:border-orange-300 hover:bg-orange-50 transition-colors"
            >
              📋 お店一覧を見る
            </Link>
          </div>
        </div>

        <footer className="mt-8 text-center text-xs text-gray-400">
          <p>Powered by Notion API</p>
        </footer>
      </div>
    </main>
  );
}
