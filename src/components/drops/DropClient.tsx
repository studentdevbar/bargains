"use client";

import * as React from "react";
import { useCountdown } from "@/components/drops/Countdown";

export function DropClient({
  dropAt,
  pre,
  post,
}: {
  dropAt: string;
  pre: React.ReactNode;
  post: React.ReactNode;
}) {
  const { days, hours, minutes, seconds, isDone } = useCountdown(dropAt);

  return <>{isDone ? post : pre}</>;
}


