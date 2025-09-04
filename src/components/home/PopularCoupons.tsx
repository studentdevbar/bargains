import Link from "next/link";
import CouponCard from "./CouponCard";

type Coupon = {
  id: string;
  title: string;
  imageSrc: string;
  imageAlt: string;
  imageBgClass?: string;
  expiryDateLabel?: string;
  isExclusive?: boolean;
  likes?: number;
  shares?: number;
};

type PopularCouponsProps = {
  coupons?: Coupon[];
};

const defaultCoupons: Coupon[] = [
  {
    id: "jumia",
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
    id: "coldstone",
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
    id: "chicken-republic",
    title: "₦500 Off Any Student Combo Meal (Valid in-store only)",
    imageSrc: "/images/chickenrepublic.png",
    imageAlt: "Chicken Republic",
    imageBgClass: "bg-[#FF0000]",
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
          <Link href="#" className="text-sm font-medium text-orange-500 hover:text-orange-600">View All Coupons</Link>
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


