import Link from "next/link";
import CouponCard, { CouponCardProps } from "./CouponCard";



type PopularCouponsProps = {
  coupons?: CouponCardProps[];
};

const defaultCoupons: CouponCardProps[] = [
  {
    id: 1,
    title: "15% Off All Lighting Fixtures By Design",
    imageSrc: "/images/jumia.png",
    imageAlt: "Jumia",
    imageBgClass: "bg-[#FF9800]",
    expiryDateLabel: "25 Nov, 25",
    isExclusive: true,
    likes: 501,
    shares: 201,
  },
  {
    id: 2,
    title: "Buy 1 Medium Cup, Get 1 Free",
    imageSrc: "/images/coldstone.png",
    imageAlt: "Cold Stone",
    imageBgClass: "bg-[#C8102E]",
    expiryDateLabel: "25 Nov, 25",
    isExclusive: true,
    likes: 501,
    shares: 201,
  },
  {
    id: 3,
    title: "₦500 Off On Apple Music Subscription",
    imageSrc: "/images/mtn-logo.svg",
    imageAlt: "Mtn Nigeria",
    imageBgClass: "bg-[#FFCB03]",
    expiryDateLabel: "25 Nov, 25",
    isExclusive: true,
    likes: 501,
    shares: 201,
  },
];

export default function PopularCoupons({ coupons = defaultCoupons }: PopularCouponsProps) {
  return (
    <section className="w-full bg-white py-14 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-baseline justify-between">
          <h2 className="text-3xl font-extrabold">
            <span className="text-gray-900">Popular </span>
            <span className="text-[var(--color-accent-main)]">Coupons</span>
          </h2>
          <Link href="/coupons" className="text-base font-medium text-secondary-main hover:text-accent-dark">View All Coupons</Link>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:gap-8">
          {coupons.map((c) => (
            <CouponCard key={c.id} {...c} />
          ))}
        </div>
      </div>
    </section>
  );
}


