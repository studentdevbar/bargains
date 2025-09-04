import Image from "next/image";
import Link from "next/link";

type Crumb = {
  label: string;
  href?: string;
};

type PageBannerProps = {
  title: string;
  description?: string;
  breadcrumbs?: Crumb[];
};

export default function PageBanner({
  title,
  description,
  breadcrumbs = [],
}: PageBannerProps) {
  return (
    <section className="relative w-full overflow-hidden bg-[#F8EBDD]">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-8 px-4 py-10 sm:px-6 lg:grid-cols-12 lg:gap-12 lg:py-12 lg:px-8">
        <div className="lg:col-span-7">
          {breadcrumbs.length > 0 && (
            <nav className="mb-3 text-sm text-gray-600" aria-label="Breadcrumb">
              <ol className="flex flex-wrap items-center gap-2">
                {breadcrumbs.map((crumb, index) => (
                  <li key={`${crumb.label}-${index}`} className="inline-flex items-center gap-2">
                    {crumb.href ? (
                      <Link href={crumb.href} className="hover:underline">
                        {crumb.label}
                      </Link>
                    ) : (
                      <span className="text-gray-800">{crumb.label}</span>
                    )}
                    {index < breadcrumbs.length - 1 && <span className="text-gray-400">›</span>}
                  </li>
                ))}
              </ol>
            </nav>
          )}

          <h1 className="text-3xl font-extrabold tracking-tight text-accent-main sm:text-4xl lg:text-5xl">
            {title}
          </h1>
          {description && (
            <p className="mt-3 max-w-2xl text-base text-gray-700 sm:text-lg">{description}</p>
          )}
        </div>

        {/* <div className="hidden justify-end lg:col-span-5 lg:flex">
          <Image
            src={imageSrc}
            alt="Banner Illustration"
            width={420}
            height={240}
            className="h-auto w-[380px] object-contain opacity-90"
            priority
          />
        </div> */}
      </div>
    </section>
  );
}


