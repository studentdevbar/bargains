import type { LucideIcon } from "lucide-react";
import { UserPlus2, Percent, QrCode } from "lucide-react";

type FeatureItem = {
  title: string;
  description: string;
  Icon: LucideIcon;
  circleBgClass: string; // e.g. "bg-orange-100"
  circleTextClass: string; // e.g. "text-orange-600"
};

type FeaturesProps = {
  items?: FeatureItem[];
  className?: string;
};

const defaultItems: FeatureItem[] = [
  {
    title: "Verify Your Student Status",
    description: "Create your free Student Bargains account in just minutes.",
    Icon: UserPlus2,
    circleBgClass: "bg-orange-100",
    circleTextClass: "text-orange-600",
  },
  {
    title: "See Exclusive Discounts",
    description: "Browse the marketplace to find deals tailored for students",
    Icon: Percent,
    circleBgClass: "bg-cyan-100",
    circleTextClass: "text-cyan-600",
  },
  {
    title: "Redeem Easily",
    description:
      "Redeem to reveal your unique discount code or direct link.",
    Icon: QrCode,
    circleBgClass: "bg-purple-100",
    circleTextClass: "text-purple-600",
  },
];

export default function Features({
  items = defaultItems,
  className,
}: FeaturesProps) {
  return (
    <section
      className={`w-full bg-white py-14 sm:py-16 lg:py-20 ${className ?? ""}`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:gap-8">
          {items.map(
            (
              { title, description, Icon, circleBgClass, circleTextClass },
              index
            ) => (
              <div
                key={index}
                className="rounded-lg bg-white p-8 shadow-sm ring-1 ring-gray-200/60 flex items-center gap-3"
              >
                <div>
                  <div
                    className={`mb-5 h-12 w-12 flex items-center justify-center rounded-full ${circleBgClass} ${circleTextClass}`}
                  >
                    <Icon className="size-5" />
                  </div>
                </div>

                <div>
                  <h3 className="mb-2 text-xl font-semibold text-gray-900">
                    {title}
                  </h3>
                  <p className="text-gray-600">{description}</p>
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </section>
  );
}
