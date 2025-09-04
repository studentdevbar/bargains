"use client";

import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Gift, Image as ImageIcon, Link as LinkIcon } from "lucide-react";

export type DropReward =
  | { type: "image"; url: string; alt?: string }
  | { type: "link"; url: string; label?: string }
  | { type: "text"; text: string };

export function RewardReveal({ reward }: { reward: DropReward }) {
  switch (reward.type) {
    case "image":
      return (
        <div className="flex flex-col items-center justify-center gap-4">
          <div className="inline-flex items-center gap-2 text-sm text-gray-600">
            <ImageIcon className="size-4" />
            <span>Download your image</span>
          </div>
          <img
            src={reward.url}
            alt={reward.alt ?? "Reward image"}
            className="h-auto max-h-[360px] max-w-full rounded-xl border"
          />
          <a
            href={reward.url}
            download
            className="rounded-md bg-[var(--color-accent-main)] px-4 py-2 text-white hover:opacity-90"
          >
            Download
          </a>
        </div>
      );
    case "link":
      return (
        <div className="flex flex-col items-center justify-center gap-4">
          <div className="inline-flex items-center gap-2 text-sm text-gray-600">
            <LinkIcon className="size-4" />
            <span>Your reward link</span>
          </div>
          <Link
            href={reward.url}
            target="_blank"
            className="rounded-md bg-[var(--color-accent-main)] px-4 py-2 text-white hover:opacity-90"
          >
            {reward.label ?? "Open link"}
          </Link>
        </div>
      );
    case "text":
      return (
        <div className="flex flex-col items-center justify-center gap-4">
          <div className="inline-flex items-center gap-2 text-sm text-gray-600">
            <Gift className="size-4" />
            <span>Your code</span>
          </div>
          <div className="rounded-xl border bg-gray-50 px-6 py-4 text-2xl font-semibold tracking-widest">
            {reward.text}
          </div>
          <Button onClick={() => navigator.clipboard.writeText(reward.text)} className="w-fit">
            Copy
          </Button>
        </div>
      );
  }
}


