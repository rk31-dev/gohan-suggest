'use client';

import { useState } from 'react';
import { genreCategories, genreEmoji } from '@/types/shop';

interface CategorySelectorProps {
  selected: string | null;
  onSelect: (genre: string | null) => void;
}

export function CategorySelector({ selected, onSelect }: CategorySelectorProps) {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  return (
    <div className="space-y-3">
      <h2 className="text-lg font-semibold text-gray-800">今日の気分は？</h2>
      <div className="space-y-2">
        {genreCategories.map((category) => (
          <div key={category.name} className="border rounded-xl overflow-hidden bg-white">
            <button
              onClick={() => setExpandedCategory(expandedCategory === category.name ? null : category.name)}
              className={`
                w-full flex items-center justify-between p-3 transition-colors
                ${expandedCategory === category.name ? 'bg-orange-50' : 'bg-white hover:bg-gray-50'}
              `}
            >
              <div className="flex items-center gap-2">
                <span className="text-xl">{category.emoji}</span>
                <span className="font-medium text-gray-700">{category.name}</span>
              </div>
              <svg
                className={`w-5 h-5 text-gray-400 transition-transform ${expandedCategory === category.name ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {expandedCategory === category.name && (
              <div className="grid grid-cols-3 gap-2 p-2 bg-gray-50 border-t">
                {category.genres.map((genre) => (
                  <button
                    key={genre}
                    onClick={() => onSelect(selected === genre ? null : genre)}
                    className={`
                      flex flex-col items-center justify-center p-2 rounded-lg
                      transition-all duration-200 border-2 text-sm
                      ${selected === genre
                        ? 'bg-orange-500 text-white border-orange-500 shadow-lg scale-105'
                        : 'bg-white text-gray-700 border-gray-200 hover:border-orange-300 hover:bg-orange-50'
                      }
                    `}
                  >
                    <span className="text-xl">{genreEmoji[genre] || '🍽️'}</span>
                    <span className="text-xs font-medium truncate w-full text-center">{genre}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
