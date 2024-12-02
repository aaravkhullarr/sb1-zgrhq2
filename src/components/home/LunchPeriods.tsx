import React from 'react';
import { Timer } from 'lucide-react';
import { getTimeUntilNextPeriod, formatTimeRemaining, isWeekend } from '../../utils/timeUtils';

export function LunchPeriods() {
  const periods = [4, 5, 6];

  if (isWeekend()) {
    return (
      <div className="bg-white p-4 rounded-lg shadow-md mb-6">
        <div className="flex items-center text-gray-600">
          <Timer className="w-5 h-5 mr-2 text-[#fd6600]" />
          <span className="font-medium">Orders will re-open on Monday</span>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-3 gap-4 mb-6">
      {periods.map(period => (
        <div key={period} className="bg-white p-4 rounded-lg shadow-md">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
              <Timer className="w-4 h-4 text-[#fd6600]" />
              <span className="font-medium">Period {period}</span>
            </div>
            <span className="text-sm font-bold text-[#fd6600]">
              {formatTimeRemaining(getTimeUntilNextPeriod(period))}
            </span>
          </div>
          <p className="text-xs text-gray-600">
            until pickup time
          </p>
        </div>
      ))}
    </div>
  );
}