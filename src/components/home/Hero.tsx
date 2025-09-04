import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative w-full overflow-hidden bg-[#F8EBDD]">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center justify-between gap-12 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:py-24 lg:px-8">
        {/* Left: Copy + Search */}
        <div>
          <p className="mb-4 text-3xl font-extrabold leading-tight tracking-tight text-secondary-main sm:text-4xl lg:text-5xl">
            Stop Carrying Last!
          </p>
          <h1 className="mb-6 text-4xl font-extrabold leading-tight tracking-tight text-accent-main sm:text-5xl lg:text-6xl">
            Save Money as a Nigerian University Student
          </h1>
          <p className="mb-8 max-w-xl text-base leading-relaxed text-gray-700 sm:text-lg">
            Access exclusive discounts from top brands with verified student
            status
          </p>

          {/* Search bar */}
          <form className="flex w-full max-w-2xl items-center gap-2 rounded-full bg-white p-2 shadow-sm ring-1 ring-gray-200/70">
            <button
              type="button"
              className="inline-flex shrink-0 items-center gap-2 rounded-full bg-gray-100 px-4 py-3 text-sm text-gray-700 hover:bg-gray-200"
            >
              <span>Category</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-4"
              >
                <path d="M6.75 9l5.25 5.25L17.25 9h-10.5z" />
              </svg>
            </button>
            <input
              type="search"
              placeholder="Search here..."
              className="w-full rounded-full bg-transparent px-2 py-3 text-sm text-gray-800 placeholder-gray-400 outline-none"
            />
            <button
              type="submit"
              className="shrink-0 rounded-full bg-[var(--color-accent-main)] px-6 py-3 text-sm font-medium text-white hover:bg-[var(--color-accent-dark)]"
            >
              Search
            </button>
          </form>
        </div>

        {/* Right: Visuals (image placeholders) */}
        <div className="flex justify-end">
          {/* Big image placeholder */}
          <Image
            src="/images/hero_image.png"
            alt="Hero Image"
            width={600}
            height={600}
          />
        </div>
      </div>
    </section>
  );
}
