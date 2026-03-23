'use client';

import { areaGroups } from '@/types/shop';

interface AreaSelectorProps {
  selected: string[];
  onSelect: (areas: string[]) => void;
}

export function AreaSelector({ selected, onSelect }: AreaSelectorProps) {
  const toggleArea = (area: string) => {
    if (selected.includes(area)) {
      onSelect(selected.filter((a) => a !== area));
    } else {
      onSelect([...selected, area]);
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-800">
          エリア
          {selected.length > 0 && (
            <span className="ml-2 text-sm font-normal text-gray-500">
              ({selected.length}件選択中)
            </span>
          )}
        </h2>
        {selected.length > 0 && (
          <button
            onClick={() => onSelect([])}
            className="text-sm text-gray-500 hover:text-gray-700"
          >
            クリア
          </button>
        )}
      </div>
      <div className="space-y-3">
        {areaGroups.map((group) => (
          <div key={group.name}>
            <div className="flex items-center gap-1 mb-2">
              <span>{group.emoji}</span>
              <span className="text-sm font-medium text-gray-600">{group.name}</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {group.areas.map((area) => (
                <button
                  key={area}
                  onClick={() => toggleArea(area)}
                  className={`
                    px-4 py-2 rounded-full text-sm font-medium
                    transition-all duration-200 border-2
                    ${selected.includes(area)
                      ? 'bg-orange-500 text-white border-orange-500'
                      : 'bg-white text-gray-700 border-gray-200 hover:border-orange-300'
                    }
                  `}
                >
                  {area}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
