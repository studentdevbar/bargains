import PageBanner from "@/components/layout/PageBanner";
import CouponCard, { CouponCardProps } from "@/components/home/CouponCard";
import { RefreshCcw } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DatePicker } from "@/components/ui/date-picker";

export default async function CouponsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const tag = (await searchParams).tag;
  const activeTag = tag
    ? decodeURIComponent(tag as string)
    : undefined;
  const categories = [
    { label: "Accessories", count: 3215, checked: true },
    { label: "Beauty", count: 1522, checked: false },
    { label: "Clothing", count: 545, checked: true },
    { label: "Electronics", count: 526, checked: false },
    { label: "Financial", count: 1563, checked: true },
    { label: "Food", count: 154, checked: true },
    { label: "Furniture", count: 234, checked: false },
    { label: "Home & Garden", count: 1425, checked: false },
    { label: "Jewelry", count: 475, checked: false },
    { label: "Medical", count: 465, checked: false },
    { label: "Spurting", count: 564, checked: false },
    { label: "Travel", count: 241, checked: false },
  ];

  const tags = [
    "Coupons",
    "Flash Sale",
    "Exclusive",
    "Best offer",
    "Trending",
    "New",
    "Discount",
    "2025",
    "Hot Deal",
  ];

  const stores = [
    "All Stores",
    "Brandmanny",
    "Coldstone",
    "Jumia",
    "Sealed Empire",
    "Ticki",
    "Chicken Republic",
  ];

  const items: CouponCardProps[] = [
    {
      id: 1,
      imageSrc: "/images/brandmanny.png",
      imageAlt: "Brandmanny",
      imageBgClass: "bg-[#F3F4F6]",
      title: "15% Off All Lighting Fixtures By Design",
      variant: "coupon",
      dropAt: "2025-09-04T12:00:00Z",
    },
    {
      id: 2,
      imageSrc: "/images/mtn-logo.svg",
      imageAlt: "Mtn Nigeria",
      imageBgClass: "bg-[#FFCB03]",
      title: "20% Off On Apple Music - Limited Time Offer",
      variant: "drop",
      dropAt: "2025-10-04T12:00:00Z",
    },
    {
      id: 3,
      imageSrc: "/images/jumia.png",
      imageAlt: "Jumia",
      imageBgClass: "bg-[#FF9800]",
      title: "Save 15% On Your First Online Purchase Today",
      variant: "coupon",
      dropAt: "2025-09-04T12:00:00Z",
    },
    {
      id: 4,
      imageSrc: "/images/sealed-empire.png",
      imageAlt: "Sealed Empire",
      imageBgClass: "bg-[#ffffff]",
      title: "Buy One, Get One Free on Select Shoes",
      variant: "coupon",
      dropAt: "2025-09-04T12:00:00Z",
    },
    {
      id: 5,
      imageSrc: "/images/ticki_logo.png",
      imageAlt: "Ticki",
      imageBgClass: "bg-[#000000]",
      title: "Free Shipping on Orders Over $50 - Shop Today",
      variant: "coupon",
      dropAt: "2025-09-04T12:00:00Z",
    },
    {
      id: 6,
      imageSrc: "/images/chickenrepublic.png",
      imageAlt: "Chicken Republic",
      imageBgClass: "bg-[#C8102E]",
      title: "20% Off Any Purchase Over $100 - Online Only",
      variant: "coupon",
      dropAt: "2025-09-04T12:00:00Z",
    },
    {
      id: 7,
      imageSrc: "/images/brandmanny.png",
      imageAlt: "Brandmanny",
      imageBgClass: "bg-[#F3F4F6]",
      title: "Save 35% On Your First Online Purchase Today",
      variant: "coupon",
      dropAt: "2025-09-04T12:00:00Z",
    },
    {
      id: 8,
      imageSrc: "/images/coldstone.png",
      imageAlt: "Coldstone",
      imageBgClass: "bg-[#C8102E]",
      title: "55% On Your First Online Purchase Today",
      variant: "coupon",
      dropAt: "2025-09-04T12:00:00Z",
    },
    {
      id: 9,
      imageSrc: "/images/jumia.png",
      imageAlt: "Jumia",
      imageBgClass: "bg-[#FF9800]",
      title: "Buy One, Get One Free on Select Shoes",
      variant: "coupon",
      dropAt: "2025-09-04T12:00:00Z",
    },
  ];

  return (
    <main>
      <PageBanner
        title="All Coupons"
        description="Browse all our coupons here"
        breadcrumbs={[
          { label: "Browse Coupons", href: "/" },
          { label: "All Coupons" },
        ]}
      />

      <section className="bg-[#F5F7FB] py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
            <aside className="hidden lg:col-span-3 lg:block">
              <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-gray-200/60">
                <h3 className="mb-4 text-base font-semibold text-gray-900">
                  Filter
                </h3>
                <div className="space-y-4 text-sm text-gray-700">
                  <input
                    className="w-full rounded-lg border border-gray-300 px-3 py-2"
                    placeholder="Type keyword..."
                  />
                  <Select defaultValue="All Stores">
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="All Stores" />
                    </SelectTrigger>
                    <SelectContent>
                      {stores.map((store) => (
                        <SelectItem key={store} value={store}>
                          {store}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="All Categories" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="All Categories">
                        All Categories
                      </SelectItem>
                      {categories.map((cat) => (
                        <SelectItem key={cat.label} value={cat.label}>
                          {cat.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <DatePicker />
                </div>

                <hr className="my-5 border-gray-200/80" />

                <div>
                  <h4 className="mb-3 text-base font-semibold text-gray-900">
                    Suggested Categories
                  </h4>
                  <ul className="space-y-3 text-gray-800">
                    {categories.map((cat, index) => {
                      const id = `cat-${index}`;
                      return (
                        <li
                          key={cat.label}
                          className="flex items-center justify-between"
                        >
                          <div className="inline-flex items-center gap-3 text-sm">
                            <Checkbox
                              id={id}
                              defaultChecked={cat.checked}
                              className="size-4 border-gray-300 data-[state=checked]:bg-[var(--color-accent-main)] data-[state=checked]:border-[var(--color-accent-main)]"
                            />
                            <label htmlFor={id}>{cat.label}</label>
                          </div>
                          <span className="text-sm text-gray-500">
                            {cat.count}
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                  <button className="mt-4 text-[var(--color-accent-main)] hover:underline">
                    See All →
                  </button>
                </div>

                <hr className="my-5 border-gray-200/80" />

                <div>
                  <h4 className="mb-3 text-base font-semibold text-gray-900">
                    Popular Tags
                  </h4>
                  <div className="flex flex-wrap gap-3">
                    {tags.map((tag) => {
                      const isActive = activeTag === tag;
                      return (
                        <Link
                          key={tag}
                          href={`/coupons?tag=${encodeURIComponent(tag)}`}
                          className={`rounded-full px-4 py-1.5 text-sm transition-colors ${
                            isActive
                              ? "border-[var(--color-accent-main)] bg-[var(--color-accent-main)] text-white"
                              : "border border-gray-300 text-gray-700 hover:bg-gray-50"
                          }`}
                        >
                          {tag}
                        </Link>
                      );
                    })}
                  </div>
                  <button className="mt-4 text-[var(--color-accent-main)] hover:underline">
                    More Tag →
                  </button>
                </div>

                <div className="mt-6 border-t border-gray-200/80 pt-5">
                  <button className="flex w-full items-center justify-center gap-2 rounded-full border border-gray-300 px-5 py-3 text-[var(--color-accent-main)] hover:bg-gray-50">
                    <RefreshCcw className="size-4" />
                    <span>Reset Filters</span>
                  </button>
                </div>
              </div>
            </aside>

            <div className="lg:col-span-9">
              <div className="mb-4 flex items-center justify-between text-sm text-gray-600">
                <p>Showing {items.length} results</p>
                <div className="inline-flex items-center gap-2">
                  <span>Sort by:</span>
                  <select className="rounded-lg border border-gray-300 px-3 py-1.5">
                    <option>Newest</option>
                    <option>Popular</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {items.map((item, index) => (
                  <CouponCard
                    key={index}
                    className="!h-32"
                    id={item.id}
                    imageSrc={item.imageSrc}
                    imageAlt={item.imageAlt}
                    imageBgClass={item.imageBgClass}
                    title={item.title}
                    variant={item.variant}
                    dropAt={item.dropAt}
                  />
                ))}
              </div>

              <div className="mt-8 flex items-center justify-center gap-2">
                <button className="rounded-full border border-gray-300 px-3 py-1.5 text-sm">
                  1
                </button>
                <button className="rounded-full border border-gray-300 px-3 py-1.5 text-sm">
                  2
                </button>
                <button className="rounded-full border border-gray-300 px-3 py-1.5 text-sm">
                  3
                </button>
                <button className="rounded-full border border-gray-300 px-3 py-1.5 text-sm">
                  ›
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
