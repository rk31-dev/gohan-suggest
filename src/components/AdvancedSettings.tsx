'use client';

import { useState } from 'react';
import { budgets, timeSlots, genres, genreEmoji, areas } from '@/types/shop';

interface AdvancedSettingsProps {
  selectedBudget: string | null;
  selectedTimeSlot: string | null;
  excludeGenres: string[];
  excludeAreas: string[];
  onBudgetChange: (budget: string | null) => void;
  onTimeSlotChange: (timeSlot: string | null) => void;
  onExcludeGenreChange: (genres: string[]) => void;
  onExcludeAreaChange: (areas: string[]) => void;
}

export function AdvancedSettings({
  selectedBudget,
  selectedTimeSlot,
  excludeGenres,
  excludeAreas,
  onBudgetChange,
  onTimeSlotChange,
  onExcludeGenreChange,
  onExcludeAreaChange,
}: AdvancedSettingsProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleExcludeGenre = (genre: string) => {
    if (excludeGenres.includes(genre)) {
      onExcludeGenreChange(excludeGenres.filter((g) => g !== genre));
    } else {
      onExcludeGenreChange([...excludeGenres, genre]);
    }
  };

  const toggleExcludeArea = (area: string) => {
    if (excludeAreas.includes(area)) {
      onExcludeAreaChange(excludeAreas.filter((a) => a !== area));
    } else {
      onExcludeAreaChange([...excludeAreas, area]);
    }
  };

  const hasSettings = selectedBudget || selectedTimeSlot || 
                      excludeGenres.length > 0 || excludeAreas.length > 0;

  return (
    <div className="space-y-3">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`
          w-full flex items-center justify-between p-3 rounded-xl border-2 transition-colors
          ${hasSettings
            ? 'bg-blue-50 border-blue-200 text-blue-700'
            : 'bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100'
          }
        `}
      >
        <div className="flex items-center gap-2">
          <span>⚙️</span>
          <span className="font-medium text-sm">詳細設定</span>
          {hasSettings && (
            <span className="bg-blue-500 text-white text-xs px-2 py-0.5 rounded-full">
              設定中
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
        <div className="space-y-4 p-4 bg-gray-50 rounded-xl border">
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-2">🕐 時間帯</h3>
            <div className="flex gap-2">
              {timeSlots.map((slot) => (
                <button
                  key={slot}
                  onClick={() => onTimeSlotChange(selectedTimeSlot === slot ? null : slot)}
                  className={`
                    px-4 py-2 rounded-lg text-sm font-medium transition-all border-2
                    ${selectedTimeSlot === slot
                      ? 'bg-orange-500 text-white border-orange-500'
                      : 'bg-white text-gray-700 border-gray-200 hover:border-orange-300'
                    }
                  `}
                >
                  {slot}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-2">💰 予算</h3>
            <div className="flex flex-wrap gap-2">
              {budgets.map((budget) => (
                <button
                  key={budget}
                  onClick={() => onBudgetChange(selectedBudget === budget ? null : budget)}
                  className={`
                    px-3 py-1.5 rounded-lg text-sm font-medium transition-all border-2
                    ${selectedBudget === budget
                      ? 'bg-orange-500 text-white border-orange-500'
                      : 'bg-white text-gray-700 border-gray-200 hover:border-orange-300'
                    }
                  `}
                >
                  {budget}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-2">🚫 ジャンルを除外</h3>
            <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto">
              {genres.map((genre) => (
                <button
                  key={genre}
                  onClick={() => toggleExcludeGenre(genre)}
                  className={`
                    px-2 py-1 rounded-lg text-xs font-medium transition-all border
                    ${excludeGenres.includes(genre)
                      ? 'bg-red-500 text-white border-red-500'
                      : 'bg-white text-gray-600 border-gray-200 hover:border-red-300'
                    }
                  `}
                >
                  {genreEmoji[genre]} {genre}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-2">🚫 エリアを除外</h3>
            <div className="flex flex-wrap gap-2">
              {areas.map((area) => (
                <button
                  key={area}
                  onClick={() => toggleExcludeArea(area)}
                  className={`
                    px-3 py-1.5 rounded-lg text-sm font-medium transition-all border-2
                    ${excludeAreas.includes(area)
                      ? 'bg-red-500 text-white border-red-500'
                      : 'bg-white text-gray-700 border-gray-200 hover:border-red-300'
                    }
                  `}
                >
                  {area}
                </button>
              ))}
            </div>
          </div>

          {hasSettings && (
            <button
              onClick={() => {
                onBudgetChange(null);
                onTimeSlotChange(null);
                onExcludeGenreChange([]);
                onExcludeAreaChange([]);
              }}
              className="w-full py-2 text-sm text-gray-500 hover:text-gray-700"
            >
              すべてクリア
            </button>
          )}
        </div>
      )}
    </div>
  );
}
