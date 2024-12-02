import React from 'react';
import { DigitalClock } from './DigitalClock';
import { formatDate } from '../../utils/timeUtils';

export function TimeDisplay() {
  return (
    <div className="flex flex-col items-end">
      <DigitalClock />
      <div className="text-gray-600 mt-1 text-sm">
        {formatDate()}
      </div>
    </div>
  );
}