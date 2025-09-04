import { Quote, Star } from "lucide-react";
import Image from "next/image";

type Testimonial = {
  id: string;
  name: string;
  role: string;
  content: string;
  rating?: number; // 1-5
  avatarSrc?: string;
};

type TestimonialsProps = {
  title?: string;
  subtitle?: string;
  items?: Testimonial[];
};

const defaultItems: Testimonial[] = [
  {
    id: "t1",
    name: "Amaka E.",
    role: "UNILAG",
    content:
      "I’ve saved so much on food and data plans. The student verification was quick and easy!",
    rating: 5,
    avatarSrc: "/images/avatar_1.png",
  },
  {
    id: "t2",
    name: "Femi A.",
    role: "UNN",
    content:
      "The discounts are legit. I shared with my classmates and everyone uses it now.",
    rating: 5,
    avatarSrc: "/images/avatar_2.png",
  },
  {
    id: "t3",
    name: "Zainab B.",
    role: "ABU Zaria",
    content:
      "Love how simple it is. Found great deals on fashion and meals around campus.",
    rating: 4,
    avatarSrc: "/images/avatar_3.png",
  },
];

export default function Testimonials({
  title = "Customer Feedbacks",
  subtitle = "What students are saying",
  items = defaultItems,
}: TestimonialsProps) {
  return (
    <section className="w-full bg-white py-14 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <p className="text-sm font-medium text-purple-800">{subtitle}</p>
            <h2 className="mt-1 text-3xl font-extrabold text-gray-900">{title}</h2>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:gap-8">
          {items.map((t) => (
            <article
              key={t.id}
              className="relative rounded-3xl bg-white p-6 shadow-sm ring-1 ring-gray-200/60 sm:p-8"
            >
              <Quote className="absolute -top-3 right-6 size-8 text-purple-200" />

              <div className="mb-5 flex items-center gap-3">
                {t.avatarSrc ? (
                  <Image
                    src={t.avatarSrc}
                    alt={t.name}
                    width={48}
                    height={48}
                    className="rounded-full object-cover"
                  />
                ) : (
                  <div className="grid h-12 w-12 place-items-center rounded-full bg-purple-100 text-purple-700">
                    {t.name[0]}
                  </div>
                )}
                <div>
                  <p className="font-semibold text-gray-900">{t.name}</p>
                  <p className="text-sm text-gray-500">{t.role}</p>
                </div>
              </div>

              <p className="mb-5 text-gray-700">{t.content}</p>

              {/* Rating */}
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`size-5 ${i < (t.rating ?? 0) ? "text-yellow-500" : "text-gray-300"}`}
                    fill="currentColor"
                  />
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}


