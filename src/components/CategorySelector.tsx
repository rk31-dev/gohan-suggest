'use client';

import { Category } from '@/types/shop';
import { categories } from '@/lib/mock-data';

interface CategorySelectorProps {
  selected: Category | null;
  onSelect: (category: Category | null) => void;
}

const categoryEmoji: Record<Category, string> = {
  '和食': '🍣',
  '洋食': '🍔',
  '中華': '🥟',
  'イタリアン': '🍝',
  '韓国': '🥘',
  'その他': '🍽️',
};

export function CategorySelector({ selected, onSelect }: CategorySelectorProps) {
  return (
    <div className="space-y-3">
      <h2 className="text-lg font-semibold text-gray-800">今日の気分は？</h2>
      <div className="grid grid-cols-3 gap-2">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => onSelect(selected === category ? null : category)}
            className={`
              flex flex-col items-center justify-center p-3 rounded-xl
              transition-all duration-200 border-2
              ${selected === category
                ? 'bg-orange-500 text-white border-orange-500 shadow-lg scale-105'
                : 'bg-white text-gray-700 border-gray-200 hover:border-orange-300 hover:bg-orange-50'
              }
            `}
          >
            <span className="text-2xl mb-1">{categoryEmoji[category]}</span>
            <span className="text-sm font-medium">{category}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
