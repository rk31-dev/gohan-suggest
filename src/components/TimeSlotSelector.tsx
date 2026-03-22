'use client';

interface TimeSlotSelectorProps {
  selected: string | null;
  onSelect: (timeSlot: string | null) => void;
  timeSlots: readonly string[];
}

const timeSlotEmoji: Record<string, string> = {
  'ランチ': '☀️',
  'ディナー': '🌙',
};

export function TimeSlotSelector({ selected, onSelect, timeSlots }: TimeSlotSelectorProps) {
  return (
    <div className="space-y-3">
      <h2 className="text-lg font-semibold text-gray-800">時間帯</h2>
      <div className="flex gap-3">
        {timeSlots.map((timeSlot) => (
          <button
            key={timeSlot}
            onClick={() => onSelect(selected === timeSlot ? null : timeSlot)}
            className={`
              flex-1 flex items-center justify-center gap-2 py-3 rounded-xl
              transition-all duration-200 border-2 font-medium
              ${selected === timeSlot
                ? 'bg-purple-500 text-white border-purple-500 shadow-lg'
                : 'bg-white text-gray-700 border-gray-200 hover:border-purple-300'
              }
            `}
          >
            <span className="text-xl">{timeSlotEmoji[timeSlot]}</span>
            <span>{timeSlot}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
