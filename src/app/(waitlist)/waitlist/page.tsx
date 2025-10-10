import Image from "next/image";
import WaitlistForm from "./WaitlistForm";

export default function Page() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-slate-50 px-6 py-20">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-70 [background:radial-gradient(60%_60%_at_75%_85%,rgba(139,92,246,0.35)_0%,rgba(139,92,246,0.15)_30%,transparent_60%)]"
      />

      <div className="relative z-10 mx-auto flex max-w-5xl flex-col items-center text-center">
        <Image
          src="/logo.png"
          alt="Student Bargains"
          width={150}
          height={150}
        />
        <h1 className="mx-auto max-w-3xl text-balance text-4xl font-extrabold leading-tight text-slate-900 sm:text-5xl md:text-6xl">
          Don't miss out, join the queue
          <br className="hidden sm:block" />
          and get to know first
        </h1>

        <div className="mt-12 w-full max-w-2xl rounded-3xl border border-white/60 bg-white/70 p-8 shadow-xl backdrop-blur-md ring-1 ring-black/5">
          <h2 className="text-lg font-semibold text-slate-900">
            Join the waiting list
          </h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            Launch a waiting list for your new product and grow your mailing
            list whilst preparing for launch day
          </p>

          <WaitlistForm />
        </div>
      </div>
    </main>
  );
}
