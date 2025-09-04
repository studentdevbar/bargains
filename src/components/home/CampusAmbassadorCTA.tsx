import Image from "next/image";
import Link from "next/link";

export default function CampusAmbassadorCTA() {
  return (
    <section className="relative w-full overflow-hidden bg-[var(--color-accent-main)] py-16 text-white sm:py-20">
      {/* Illustration overlay (placeholder shapes) */}
      <div className="pointer-events-none absolute inset-0 select-none opacity-15">
        <div className="absolute right-24 top-4 hidden h-[420px] w-[260px] rounded-3xl bg-black/20 blur-xl lg:block" />
        <div className="absolute right-72 top-10 hidden h-[460px] w-[280px] rounded-3xl bg-black/20 blur-xl lg:block" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <h2 className="text-3xl font-extrabold leading-snug sm:text-4xl">
            Want to be a Campus Ambassador for Student Bargains?
          </h2>

          <div className="mt-8">
            <Link
              href="/register"
              className="inline-block rounded-full bg-[var(--color-secondary-main)] px-8 py-3 font-medium text-white hover:brightness-105"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 right-50">
        <Image
          src="/images/logo_mascott.png"
          alt="Campus Ambassador CTA"
          width={500}
          height={500}
        />
      </div>
    </section>
  );
}
