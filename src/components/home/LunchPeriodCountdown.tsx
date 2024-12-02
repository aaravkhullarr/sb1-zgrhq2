import React, { useState, useEffect } from 'react';
import { Timer } from 'lucide-react';
import { getTimeUntilNextPeriod, formatTimeRemaining, isWeekend } from '../../utils/timeUtils';

interface LunchPeriodCountdownProps {
  targetPeriod: number;
}

export function LunchPeriodCountdown({ targetPeriod }: LunchPeriodCountdownProps) {
  const [timeRemaining, setTimeRemaining] = useState(() => getTimeUntilNextPeriod(targetPeriod));

  useEffect(() => {
    setTimeRemaining(getTimeUntilNextPeriod(targetPeriod));

    const timer = setInterval(() => {
      setTimeRemaining(getTimeUntilNextPeriod(targetPeriod));
    }, 60000);
    
    return () => clearInterval(timer);
  }, [targetPeriod]);

  if (isWeekend()) {
    return (
      <div className="bg-white p-3 rounded-lg shadow-sm">
        <div className="flex items-center text-gray-600">
          <Timer className="w-4 h-4 mr-2 text-[#fd6600]" />
          <span className="text-sm">Orders will re-open on Monday</span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-3 rounded-lg shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Timer className="w-4 h-4 text-[#fd6600]" />
          <span className="text-sm">Time Remaining</span>
        </div>
        <span className="text-sm font-bold text-[#fd6600]">
          {formatTimeRemaining(timeRemaining)}
        </span>
      </div>
      <p className="mt-1 text-xs text-gray-600">
        to pick up your food during period {targetPeriod}
      </p>
    </div>
  );
}