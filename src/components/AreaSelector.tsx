'use client';

interface AreaSelectorProps {
  selected: string[];
  onSelect: (areas: string[]) => void;
  areas: readonly string[];
}

export function AreaSelector({ selected, onSelect, areas }: AreaSelectorProps) {
  const toggleArea = (area: string) => {
    if (selected.includes(area)) {
      onSelect(selected.filter(a => a !== area));
    } else {
      onSelect([...selected, area]);
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-800">場所</h2>
        {selected.length > 0 && (
          <button
            onClick={() => onSelect([])}
            className="text-sm text-gray-500 hover:text-gray-700"
          >
            クリア
          </button>
        )}
      </div>
      <div className="flex flex-wrap gap-2">
        {areas.map((area) => (
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
  );
}
