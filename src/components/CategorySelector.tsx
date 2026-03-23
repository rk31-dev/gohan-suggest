'use client';

import { simpleCategories } from '@/types/shop';

interface CategorySelectorProps {
  selected: string | null;
  onSelect: (category: string | null) => void;
}

export function CategorySelector({ selected, onSelect }: CategorySelectorProps) {
  return (
    <div className="space-y-3">
      <h2 className="text-lg font-semibold text-gray-800">今日の気分は？</h2>
      <div className="grid grid-cols-4 gap-2">
        {simpleCategories.map((category) => (
          <button
            key={category.name}
            onClick={() => onSelect(selected === category.name ? null : category.name)}
            className={`
              flex flex-col items-center justify-center p-3 rounded-xl
              transition-all duration-200 border-2
              ${selected === category.name
                ? 'bg-orange-500 text-white border-orange-500 shadow-lg scale-105'
                : 'bg-white text-gray-700 border-gray-200 hover:border-orange-300 hover:bg-orange-50'
              }
            `}
          >
            <span className="text-2xl">{category.emoji}</span>
            <span className="text-xs font-medium mt-1">{category.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
