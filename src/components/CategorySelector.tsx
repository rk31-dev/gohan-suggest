'use client';

import { useState } from 'react';

interface CategorySelectorProps {
  selected: string | null;
  onSelect: (genre: string | null) => void;
  genres: readonly string[];
}

const genreEmoji: Record<string, string> = {
  'デザート': '🍰',
  'カフェ': '☕',
  'イタリアン': '🍝',
  'フレンチ': '🥐',
  '中華': '🥟',
  'パン': '🥖',
  '麺': '🍜',
  'ご飯': '🍚',
  'お肉': '🥩',
  '中南米': '🌮',
  'お好み焼き': '🫓',
  'ピザ': '🍕',
  '居酒屋': '🍺',
  '朝ラー': '🍜',
  '唐揚げ': '🍗',
  '寿司': '🍣',
  'パスタ': '🍝',
  'カレー': '🍛',
};

export function CategorySelector({ selected, onSelect, genres }: CategorySelectorProps) {
  return (
    <div className="space-y-3">
      <h2 className="text-lg font-semibold text-gray-800">今日の気分は？</h2>
      <div className="grid grid-cols-3 gap-2 max-h-64 overflow-y-auto">
        {genres.map((genre) => (
          <button
            key={genre}
            onClick={() => onSelect(selected === genre ? null : genre)}
            className={`
              flex flex-col items-center justify-center p-2 rounded-xl
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
    </div>
  );
}
