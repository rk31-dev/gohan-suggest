'use client';

import { Budget } from '@/types/shop';
import { budgets } from '@/lib/mock-data';

interface BudgetSelectorProps {
  selected: Budget | null;
  onSelect: (budget: Budget | null) => void;
}

export function BudgetSelector({ selected, onSelect }: BudgetSelectorProps) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-800">予算</h2>
        {selected && (
          <button
            onClick={() => onSelect(null)}
            className="text-sm text-gray-500 hover:text-gray-700"
          >
            クリア
          </button>
        )}
      </div>
      <div className="flex flex-wrap gap-2">
        {budgets.map((budget) => (
          <button
            key={budget}
            onClick={() => onSelect(selected === budget ? null : budget)}
            className={`
              px-4 py-2 rounded-full text-sm font-medium
              transition-all duration-200 border-2
              ${selected === budget
                ? 'bg-green-500 text-white border-green-500'
                : 'bg-white text-gray-700 border-gray-200 hover:border-green-300'
              }
            `}
          >
            {budget}
          </button>
        ))}
      </div>
    </div>
  );
}
