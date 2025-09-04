"use client";

import * as React from "react";
import { Countdown, useCountdown } from "@/components/drops/Countdown";
import { Clock } from "lucide-react";

export function CountdownPanel({ dropAt }: { dropAt: string }) {
  const { days, hours, minutes, seconds, isDone } = useCountdown(dropAt);

  return (
    <>
      <div className="mt-6 rounded-xl bg-[#F8FAFC] p-4">
        <div className="mb-2 inline-flex items-center gap-2 text-gray-700">
          <Clock className="size-4" />
          <span className="text-sm">Drop starts in</span>
        </div>
        <Countdown days={days} hours={hours} minutes={minutes} seconds={seconds} />
      </div>

      {!isDone && (
        <p className="mt-4 text-xs text-gray-500">
          Tip: Turn on notifications to get an alert when it drops.
        </p>
      )}
    </>
  );
}


