"use client";

import * as React from "react";

export function useCountdown(targetIso: string) {
  const target = React.useMemo(() => new Date(targetIso).getTime(), [targetIso]);
  const [now, setNow] = React.useState<number>(() => Date.now());

  React.useEffect(() => {
    const interval = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(interval);
  }, []);

  const diffMs = Math.max(0, target - now);
  const seconds = Math.floor(diffMs / 1000) % 60;
  const minutes = Math.floor(diffMs / (1000 * 60)) % 60;
  const hours = Math.floor(diffMs / (1000 * 60 * 60)) % 24;
  const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const isDone = diffMs === 0;

  return { days, hours, minutes, seconds, isDone };
}

export function Countdown({
  days,
  hours,
  minutes,
  seconds,
}: {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}) {
  return (
    <div className="grid grid-cols-4 gap-2 text-center">
      <div className="rounded-lg bg-white p-3 shadow-xs">
        <div className="text-2xl font-bold text-gray-900">{String(days).padStart(2, "0")}</div>
        <div className="text-xs text-gray-500">Days</div>
      </div>
      <div className="rounded-lg bg-white p-3 shadow-xs">
        <div className="text-2xl font-bold text-gray-900">{String(hours).padStart(2, "0")}</div>
        <div className="text-xs text-gray-500">Hours</div>
      </div>
      <div className="rounded-lg bg-white p-3 shadow-xs">
        <div className="text-2xl font-bold text-gray-900">{String(minutes).padStart(2, "0")}</div>
        <div className="text-xs text-gray-500">Mins</div>
      </div>
      <div className="rounded-lg bg-white p-3 shadow-xs">
        <div className="text-2xl font-bold text-gray-900">{String(seconds).padStart(2, "0")}</div>
        <div className="text-xs text-gray-500">Secs</div>
      </div>
    </div>
  );
}


