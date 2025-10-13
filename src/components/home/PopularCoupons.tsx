import Link from "next/link";
import CouponCard from "./CouponCard";
import { getFeaturedCoupons } from "@/actions/coupons/featured";
import { CouponType } from "../../../types";



type PopularCouponsProps = {
  coupons?: CouponType[];
};

function formatExpiry(iso: string | null): string {
  if (!iso) return "No expiry";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "No expiry";
  return d.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "short",
    year: "2-digit",
  });
}

export default async function PopularCoupons({ coupons }: PopularCouponsProps) {
  let items: CouponType[] = coupons ?? [];

  try {
    const response = await getFeaturedCoupons();
    if (response?.success && response.data) {
      items = response.data;
    }
  } catch (_) {
    // gracefully fall back to default coupons
  }

  if (items.length === 0) {
    return null;
  }

  return (
    <section className="w-full bg-white py-14 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-baseline justify-between">
          <h2 className="text-3xl font-extrabold">
            <span className="text-gray-900">Featured </span>
            <span className="text-[var(--color-accent-main)]">Coupons</span>
          </h2>
          <Link href="/coupons" className="text-base font-medium text-secondary-main hover:text-accent-dark">View All Coupons</Link>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:gap-8">
          {items.map((c) => (
            <CouponCard key={c.id} coupon={c} />
          ))}
        </div>
      </div>
    </section>
  );
}


