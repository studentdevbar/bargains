import Image from "next/image";
import { CalendarDays, Heart, Upload } from "lucide-react";

type CouponCardProps = {
  imageSrc: string;
  imageAlt: string;
  imageBgClass?: string;
  isExclusive?: boolean;
  expiryDateLabel?: string; // e.g. "25 Nov, 25"
  title: string;
  likes?: number;
  shares?: number;
  buttonLabel?: string;
};

export default function CouponCard({
  imageSrc,
  imageAlt,
  imageBgClass = "bg-gray-100",
  isExclusive = true,
  expiryDateLabel = "25 Nov, 25",
  title,
  likes = 501,
  shares = 201,
  buttonLabel = "Show Coupon",
}: CouponCardProps) {
  return (
    <div className="flex h-full flex-col rounded-3xl bg-white p-4 shadow-sm ring-1 ring-gray-200/60">
      {/* Brand image */}
      <div className={`mb-5 flex h-64 w-full items-center justify-center rounded-2xl ${imageBgClass}`}>
        <Image src={imageSrc} alt={imageAlt} width={560} height={200} className="h-auto w-4/5 object-contain" />
      </div>

      {/* Badges */}
      <div className="mb-3 flex items-center gap-3">
        {isExclusive && (
          <span className="rounded-full border border-cyan-300 bg-cyan-50 px-3 py-1 text-xs font-medium text-cyan-700">Exclusive</span>
        )}
        <span className="inline-flex items-center gap-1 rounded-full border border-orange-300 bg-orange-50 px-3 py-1 text-xs font-medium text-orange-700">
          <CalendarDays className="size-4" />
          {expiryDateLabel}
        </span>
      </div>

      {/* Title */}
      <h3 className="mb-6 text-xl font-semibold leading-snug text-gray-900">{title}</h3>

      {/* Stats */}
      <div className="mt-auto flex items-center justify-between border-t border-gray-200/70 pt-4 text-sm text-gray-600">
        <div className="flex items-center gap-6">
          <span className="inline-flex items-center gap-1"><Heart className="size-4" />{likes}</span>
          <span className="inline-flex items-center gap-1"><Upload className="size-4" />{shares}</span>
        </div>
      </div>

      {/* Button */}
      <div className="mt-5">
        <button className="w-full rounded-full bg-[var(--color-accent-main)] px-6 py-3 text-white hover:bg-[var(--color-accent-dark)]">
          {buttonLabel}
        </button>
      </div>
    </div>
  );
}


