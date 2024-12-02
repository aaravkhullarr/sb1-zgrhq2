import React, { useState, useEffect } from 'react';

export function AnalogClock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const secondDegrees = (time.getSeconds() / 60) * 360;
  const minuteDegrees = ((time.getMinutes() + time.getSeconds() / 60) / 60) * 360;
  const hourDegrees = ((time.getHours() + time.getMinutes() / 60) / 12) * 360;

  return (
    <div className="relative w-32 h-32">
      <div className="absolute inset-0 rounded-full border-4 border-[#040084] bg-white">
        {/* Hour markers */}
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-4 bg-[#040084]"
            style={{
              transform: `rotate(${i * 30}deg) translateY(4px)`,
              transformOrigin: '50% 100%',
              left: 'calc(50% - 2px)',
            }}
          />
        ))}
        
        {/* Clock hands */}
        <div
          className="absolute w-1 h-12 bg-[#040084] rounded-full origin-bottom"
          style={{
            left: 'calc(50% - 2px)',
            bottom: '50%',
            transform: `rotate(${hourDegrees}deg)`,
          }}
        />
        <div
          className="absolute w-1 h-14 bg-[#fd6600] rounded-full origin-bottom"
          style={{
            left: 'calc(50% - 1px)',
            bottom: '50%',
            transform: `rotate(${minuteDegrees}deg)`,
          }}
        />
        <div
          className="absolute w-0.5 h-14 bg-red-500 rounded-full origin-bottom"
          style={{
            left: 'calc(50% - 0.5px)',
            bottom: '50%',
            transform: `rotate(${secondDegrees}deg)`,
          }}
        />
        <div className="absolute w-3 h-3 bg-[#040084] rounded-full" style={{ left: 'calc(50% - 6px)', top: 'calc(50% - 6px)' }} />
      </div>
    </div>
  );
}