"use client";

import Image from "next/image";
import { useState } from "react";
import {
  CalendarDays,
  Heart,
  Upload,
  ThumbsUp,
  ThumbsDown,
  Share2,
  Copy,
  ExternalLink,
  Clock,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "../ui/dialog";
import { useCountdown } from "@/components/drops/Countdown";
import { Button } from "../ui/button";
import Link from "next/link";

export interface CouponCardProps {
  id: number;
  imageSrc: string;
  imageAlt: string;
  imageBgClass?: string;
  isExclusive?: boolean;
  expiryDateLabel?: string; // e.g. "25 Nov, 25"
  title: string;
  likes?: number;
  shares?: number;
  buttonLabel?: string;
  couponCode?: string;
  couponUrl?: string;
  className?: string;
  variant?: "coupon" | "drop";
  dropAt?: string; // ISO string, required when variant is "drop"
}

export default function CouponCard({
  id,
  imageSrc,
  imageAlt,
  imageBgClass = "bg-gray-100",
  isExclusive = true,
  expiryDateLabel = "25 Nov, 25",
  title,
  likes = 501,
  shares = 201,
  buttonLabel = "Show Coupon",
  couponCode = "SB-123-ABC",
  couponUrl,
  className,
  variant = "coupon",
  dropAt,
}: CouponCardProps) {
  const [feedback, setFeedback] = useState<"up" | "down" | null>(null);

  // Always call hook to respect rules-of-hooks; UI will only show when variant === "drop"
  const { days, hours, minutes, seconds } = useCountdown(
    dropAt ?? new Date(Date.now() + 60 * 60 * 1000).toISOString()
  );
  const isDrop = variant === "drop";
  const pad = (n: number) => String(n).padStart(2, "0");

  const copyText = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch (_) {
      // no-op
    }
  };

  const handleCopyCode = () => copyText(couponCode);
  const handleCopyLink = () => copyText(couponUrl || window.location.href);

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title,
          text: "Check out this student coupon",
          url: couponUrl || window.location.href,
        });
      } else {
        await copyText(couponUrl || window.location.href);
      }
    } catch (_) {
      // user cancelled or not supported
    }
  };
  return (
    <div className="flex h-full flex-col rounded-3xl bg-white p-4 shadow-sm ring-1 ring-gray-200/60">
      {/* Brand image */}
      <div
        className={`relative mb-5 flex h-64  w-full items-center justify-center overflow-hidden rounded-2xl ${imageBgClass} ${className}`}
      >
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          sizes="(max-width: 640px) 80vw, (max-width: 1024px) 40vw, 30vw"
          className="object-contain max-h-full max-w-full p-4"
        />
      </div>

      {/* Badges */}
      <div className="mb-3 flex items-center gap-3">
        {isExclusive && (
          <span className="rounded-full border border-cyan-300 bg-cyan-50 px-3 py-1 text-xs font-medium text-cyan-700">
            Exclusive
          </span>
        )}
        {isDrop ? (
          <span className="inline-flex items-center gap-1 rounded-full border border-violet-300 bg-violet-50 px-3 py-1 text-xs font-medium text-violet-700">
            <Clock className="size-4" />
            {pad(days)}:{pad(hours)}:{pad(minutes)}:{pad(seconds)}
          </span>
        ) : (
          <span className="inline-flex items-center gap-1 rounded-full border border-orange-300 bg-orange-50 px-3 py-1 text-xs font-medium text-orange-700">
            <CalendarDays className="size-4" />
            {expiryDateLabel}
          </span>
        )}
      </div>

      {/* Title */}
      <h3 className="mb-6 text-xl font-semibold leading-snug text-gray-900">
        {title}
      </h3>

      {/* Stats */}
      <div className="mt-auto flex items-center justify-between border-t border-gray-200/70 pt-4 text-sm text-gray-600">
        <div className="flex items-center gap-6">
          <span className="inline-flex items-center gap-1">
            <Heart className="size-4" />
            {likes}
          </span>
          <span className="inline-flex items-center gap-1">
            <Upload className="size-4" />
            {shares}
          </span>
        </div>
      </div>

      {/* Button */}
      {isDrop ? (
        <Link href={`/coupons/${id}`}>
          <button className="w-full mt-5 rounded-full bg-[var(--color-accent-main)] px-6 py-3 text-white hover:bg-[var(--color-accent-dark)]">
            View Drop
          </button>
        </Link>
      ) : (
        <div className="mt-5">
          <Dialog>
            <DialogTrigger asChild>
              <button className="w-full rounded-full bg-[var(--color-accent-main)] px-6 py-3 text-white hover:bg-[var(--color-accent-dark)]">
                {buttonLabel}
              </button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader className="pr-8">
                <DialogTitle>{title}</DialogTitle>
                <DialogDescription>
                  Use the coupon below and let us know if it worked.
                </DialogDescription>
              </DialogHeader>

              {/* Coupon code */}
              <div className="flex items-center justify-between rounded-lg border border-secondary-main bg-secondary-main/10 px-4 py-3">
                <code className="font-mono text-sm tracking-wide">
                  {couponCode}
                </code>
                <button
                  onClick={handleCopyCode}
                  className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-sm text-accent-main hover:bg-accent-main/10 cursor-pointer"
                >
                  <Copy className="size-4" /> Copy
                </button>
              </div>

              {/* Visit link */}
              {couponUrl && (
                <a
                  href={couponUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex items-center justify-center rounded-full bg-[var(--color-secondary-main)] px-4 py-2 text-sm font-medium text-white hover:brightness-105"
                >
                  <ExternalLink className="mr-2 size-4" /> Visit Offer
                </a>
              )}

              {/* Feedback: Did it work? */}
              <div className="mt-4">
                <p className="mb-2 text-sm text-gray-600">
                  Did this coupon work?
                </p>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setFeedback("up")}
                    className={`inline-flex items-center gap-2 rounded-full border px-3 py-2 text-sm ${
                      feedback === "up"
                        ? "border-green-600 text-green-700 bg-green-50"
                        : "border-gray-300 text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    <ThumbsUp className="size-4" /> Yes
                  </button>
                  <button
                    onClick={() => setFeedback("down")}
                    className={`inline-flex items-center gap-2 rounded-full border px-3 py-2 text-sm ${
                      feedback === "down"
                        ? "border-red-600 text-red-700 bg-red-50"
                        : "border-gray-300 text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    <ThumbsDown className="size-4" /> No
                  </button>
                </div>
              </div>

              {/* Share */}
              <div className="mt-4 flex items-center gap-3">
                <button
                  onClick={handleShare}
                  className="inline-flex items-center gap-2 rounded-full border border-gray-300 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
                >
                  <Share2 className="size-4" /> Share
                </button>
                <button
                  onClick={handleCopyLink}
                  className="inline-flex items-center gap-2 rounded-full border border-gray-300 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
                >
                  <Copy className="size-4" /> Copy link
                </button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      )}
    </div>
  );
}
