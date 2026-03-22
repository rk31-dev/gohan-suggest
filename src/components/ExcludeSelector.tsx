'use client';

import { useState } from 'react';
import { genres, areas, genreEmoji } from '@/types/shop';

interface ExcludeSelectorProps {
  excludeGenres: string[];
  excludeAreas: string[];
  onExcludeGenreChange: (genres: string[]) => void;
  onExcludeAreaChange: (areas: string[]) => void;
}

export function ExcludeSelector({
  excludeGenres,
  excludeAreas,
  onExcludeGenreChange,
  onExcludeAreaChange,
}: ExcludeSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'genre' | 'area'>('genre');

  const toggleGenre = (genre: string) => {
    if (excludeGenres.includes(genre)) {
      onExcludeGenreChange(excludeGenres.filter((g) => g !== genre));
    } else {
      onExcludeGenreChange([...excludeGenres, genre]);
    }
  };

  const toggleArea = (area: string) => {
    if (excludeAreas.includes(area)) {
      onExcludeAreaChange(excludeAreas.filter((a) => a !== area));
    } else {
      onExcludeAreaChange([...excludeAreas, area]);
    }
  };

  const hasExclusions = excludeGenres.length > 0 || excludeAreas.length > 0;

  return (
    <div className="space-y-3">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`
          w-full flex items-center justify-between p-3 rounded-xl border-2 transition-colors
          ${hasExclusions
            ? 'bg-red-50 border-red-200 text-red-700'
            : 'bg-white border-gray-200 text-gray-700 hover:border-orange-300 hover:bg-orange-50'
          }
        `}
      >
        <div className="flex items-center gap-2">
          <span className="text-lg">🚫</span>
          <span className="font-medium">除外設定</span>
          {hasExclusions && (
            <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
              {excludeGenres.length + excludeAreas.length}
            </span>
          )}
        </div>
        <svg
          className={`w-5 h-5 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="border rounded-xl overflow-hidden bg-white shadow-lg">
          <div className="flex border-b">
            <button
              onClick={() => setActiveTab('genre')}
              className={`flex-1 py-2 px-4 text-sm font-medium transition-colors ${
                activeTab === 'genre'
                  ? 'bg-orange-50 text-orange-600 border-b-2 border-orange-500'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              ジャンルを除外
            </button>
            <button
              onClick={() => setActiveTab('area')}
              className={`flex-1 py-2 px-4 text-sm font-medium transition-colors ${
                activeTab === 'area'
                  ? 'bg-orange-50 text-orange-600 border-b-2 border-orange-500'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              エリアを除外
            </button>
          </div>

          <div className="p-3 max-h-48 overflow-y-auto">
            {activeTab === 'genre' ? (
              <div className="grid grid-cols-3 gap-2">
                {genres.map((genre) => (
                  <button
                    key={genre}
                    onClick={() => toggleGenre(genre)}
                    className={`
                      flex flex-col items-center justify-center p-2 rounded-lg
                      transition-all duration-200 border-2 text-sm
                      ${excludeGenres.includes(genre)
                        ? 'bg-red-500 text-white border-red-500'
                        : 'bg-white text-gray-700 border-gray-200 hover:border-red-300 hover:bg-red-50'
                      }
                    `}
                  >
                    <span className="text-lg">{genreEmoji[genre] || '🍽️'}</span>
                    <span className="text-xs font-medium truncate w-full text-center">{genre}</span>
                  </button>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-3 gap-2">
                {areas.map((area) => (
                  <button
                    key={area}
                    onClick={() => toggleArea(area)}
                    className={`
                      flex items-center justify-center p-2 rounded-lg
                      transition-all duration-200 border-2 text-sm
                      ${excludeAreas.includes(area)
                        ? 'bg-red-500 text-white border-red-500'
                        : 'bg-white text-gray-700 border-gray-200 hover:border-red-300 hover:bg-red-50'
                      }
                    `}
                  >
                    <span className="font-medium">{area}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {hasExclusions && (
            <div className="p-2 border-t bg-gray-50">
              <button
                onClick={() => {
                  onExcludeGenreChange([]);
                  onExcludeAreaChange([]);
                }}
                className="w-full py-2 text-sm text-red-600 hover:text-red-700 font-medium"
              >
                すべてクリア
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
