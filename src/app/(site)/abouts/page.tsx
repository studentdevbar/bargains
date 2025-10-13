import PageBanner from "@/components/layout/PageBanner";
import Image from "next/image";
import Link from "next/link";

export default function AboutPage() {
  return (
    <main className="min-h-screen w-full">
      <PageBanner
        title="About Us"
        description="Building Nigeria's most trusted student affinity network."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "About" },
        ]}
      />



      {/* Story + media */}
      <section className="mx-auto max-w-6xl px-4 pb-6 py-10 sm:px-6 lg:px-8">
        <div className="grid items-center gap-10 md:grid-cols-2">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">The Student Bargains Nigeria Story</h2>
            <div className="mt-4 space-y-4 text-gray-700">
              <p>
                Founded in 2025, Student Bargains Nigeria was born from a simple truth: Nigerian students are brilliant,
                ambitious, and resourceful — but the larger environment wasn&apos;t designed to support them financially.
              </p>
              <p>
                While global student discount platforms exist, Nigeria&apos;s 2+ million higher education students remained largely
                underserved. Payment barriers, verification challenges, and lack of local partnerships created a massive gap
                between students&apos; needs and available solutions.
              </p>
              <p>
                We see this as an opportunity to build something transformative and a way for us to contribute our quota to
                supporting the vibrant and budding Nigerian University ecosystems.
              </p>
            </div>
          </div>
          <div>
            <div className="relative overflow-hidden rounded-2xl border border-gray-200 shadow-sm">
              <Image src="/images/background_students.jpg" alt="Students collaborating" width={900} height={900} className="h-auto w-full object-cover" />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <h3 className="text-2xl font-bold text-gray-900 sm:text-3xl">Our Values</h3>
        <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="text-2xl">🎓</div>
            <h4 className="mt-3 font-semibold text-gray-900">Student-First, Always</h4>
            <p className="mt-2 text-sm text-gray-700">Every decision starts with what genuinely helps Nigerian students.</p>
          </div>
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="text-2xl">💚</div>
            <h4 className="mt-3 font-semibold text-gray-900">Trust Through Transparency</h4>
            <p className="mt-2 text-sm text-gray-700">Honest partnerships, protected data, and real value over hype.</p>
          </div>
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="text-2xl">🇳🇬</div>
            <h4 className="mt-3 font-semibold text-gray-900">Proudly Nigerian</h4>
            <p className="mt-2 text-sm text-gray-700">Built for local realities and the culture of Nigerian campuses.</p>
          </div>
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="text-2xl">🚀</div>
            <h4 className="mt-3 font-semibold text-gray-900">Innovation With Purpose</h4>
            <p className="mt-2 text-sm text-gray-700">Technology that solves real problems without needless complexity.</p>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="mx-auto max-w-6xl px-4 pb-4 sm:px-6 lg:px-8">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <h3 className="text-xl font-semibold text-gray-900">Vision Statement</h3>
            <p className="mt-3 text-gray-700">
              To become Nigeria&apos;s most trusted student affinity network, enabling every verified student across the nation to
              save, learn, and earn — building lifelong financial habits that transform their futures and strengthen Nigeria&apos;s
              economy.
            </p>
          </div>
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <h3 className="text-xl font-semibold text-gray-900">Mission Statement</h3>
            <p className="mt-3 text-gray-700">
              To empower Nigerian students to thrive academically and financially by connecting them with verified discounts,
              essential services, and financial opportunities that reduce the cost of education and transform every naira into
              greater value.
            </p>
            <div className="mt-4">
              <p className="font-medium text-gray-900">We envision a Nigeria where:</p>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-gray-700">
                <li>Every student ID unlocks immediate value across essential services</li>
                <li>Financial inclusion starts in university, not after graduation</li>
                <li>Student spending power drives innovation in Nigerian brands</li>
                <li>Young Nigerians develop smart money habits that last a lifetime</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Audiences */}
      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <h3 className="text-xl font-semibold text-gray-900">For Students</h3>
            <p className="mt-3 text-gray-700">
              Free, instant access to verified discounts across the brands and services Nigerian students actually use. Our
              platform combines:
            </p>
            <ul className="mt-3 list-disc space-y-1 pl-5 text-gray-700">
              <li>Zero-fee verification using methods that work with Nigerian structures</li>
              <li>Naira-first partnerships with payment integration</li>
              <li>Campus-relevant content</li>
              <li>Community building via campus ambassadors and authentic student stories</li>
            </ul>
          </div>
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <h3 className="text-xl font-semibold text-gray-900">For Brands</h3>
            <p className="mt-3 text-gray-700">
              Verified access to Nigeria&apos;s most valuable consumer demographic. Our partners gain:
            </p>
            <ul className="mt-3 list-disc space-y-1 pl-5 text-gray-700">
              <li>Verification technology that prevents discount abuse while staying accessible</li>
              <li>First-mover advantage in an underserved market</li>
              <li>Authentic Gen Z engagement via content and campus partnerships</li>
              <li>Performance-based pricing with aligned commission structures</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Beliefs */}
      <section className="mx-auto max-w-6xl px-4 pb-12 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <h3 className="text-2xl font-bold text-gray-900 sm:text-3xl">What We Believe</h3>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-gray-700">
            <li>
              Every student deserves financial dignity. Being broke shouldn&apos;t mean paying full price for essentials while
              navigating the challenges of Nigerian university life — from ASUU strikes to hostel struggles.
            </li>
            <li>
              Local context matters. Global platforms fail Nigerian students because they don&apos;t understand OPay, mobile money,
              campus Wi‑Fi verification, or the reality that many universities don&apos;t issue .edu.ng email addresses.
            </li>
            <li>
              Youth spending power drives economic growth. When students save money, they invest it into education,
              entrepreneurship, and their futures — creating ripple effects across Nigeria&apos;s economy.
            </li>
            <li>
              Technology should reduce barriers, not create them. Our mobile‑first, low‑data platform works for the student in
              Nsukka with limited connectivity, not just the one in Lekki with unlimited data.
            </li>
          </ul>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl border border-gray-200 bg-gradient-to-r from-accent-main/10 via-white to-accent-main/10 p-8 shadow-sm sm:p-10">
          <div className="grid items-center gap-6 md:grid-cols-3">
            <div className="md:col-span-2">
              <h3 className="text-2xl font-bold text-gray-900">Ready to partner with a team that delivers real value?</h3>
              <p className="mt-2 text-gray-700">Let&apos;s collaborate to serve Nigerian students and grow your brand.</p>
            </div>
            <div className="md:justify-self-end">
              <Link href="/waitlist" className="inline-flex items-center rounded-full bg-accent-main px-5 py-3 font-medium text-white shadow hover:opacity-95">
                Contact Us Today
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}


