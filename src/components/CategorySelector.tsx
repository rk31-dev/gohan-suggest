'use client';

import { simpleCategories } from '@/types/shop';

interface CategorySelectorProps {
  selected: string[];
  onSelect: (categories: string[]) => void;
}

export function CategorySelector({ selected, onSelect }: CategorySelectorProps) {
  const toggleCategory = (categoryName: string) => {
    if (selected.includes(categoryName)) {
      onSelect(selected.filter((c) => c !== categoryName));
    } else {
      onSelect([...selected, categoryName]);
    }
  };

  return (
    <div className="space-y-3">
      <h2 className="text-lg font-semibold text-gray-800">
        カテゴリ
        {selected.length > 0 && (
          <span className="ml-2 text-sm font-normal text-gray-500">
            ({selected.length}件選択中)
          </span>
        )}
      </h2>
      <div className="grid grid-cols-4 gap-2">
        {simpleCategories.map((category) => (
          <button
            key={category.name}
            onClick={() => toggleCategory(category.name)}
            className={`
              flex flex-col items-center justify-center p-3 rounded-xl
              transition-all duration-200 border-2
              ${selected.includes(category.name)
                ? 'bg-orange-500 text-white border-orange-500 shadow-lg'
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
