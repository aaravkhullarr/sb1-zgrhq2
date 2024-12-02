import React, { useState, useEffect } from 'react';

export function DigitalClock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formattedTime = time.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
    timeZone: 'America/Chicago'
  });

  return (
    <div className="bg-black text-red-500 font-mono text-lg p-2 rounded-lg shadow-inner border-2 border-gray-700">
      {formattedTime}
      <span className="text-xs ml-1">CST</span>
    </div>
  );
}