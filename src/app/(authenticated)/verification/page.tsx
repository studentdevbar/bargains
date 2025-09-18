import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { deleteSession, setVerifiedCookie } from "@/actions/helpers/session";

export const metadata: Metadata = {
  title: "Account Under Review",
  description:
    "Your account is under review. You will receive full access once approved.",
};

async function logout() {
  "use server";
  await deleteSession();
  redirect("/login");
}

export default function VerificationPage() {
  return (
    <main role="main" className="min-h-dvh flex items-center justify-center px-6 bg-white">
      <section
        aria-labelledby="under-review-title"
        className="w-full max-w-xl bg-white border border-slate-200 rounded-xl p-6 text-slate-700 shadow-sm"
      >
        <h1 id="under-review-title" className="m-0 text-2xl font-bold leading-tight text-slate-900">
          Account Under Review
        </h1>
        <p className="mt-3 text-base leading-7 text-slate-700">
          Thanks for signing up! Your account is currently under review. You will
          receive an email notification once it’s approved, and you’ll get full
          access to your dashboard and all features.
        </p>
        <p className="mt-2 text-sm leading-6 text-slate-600">
          If you believe this is taking longer than expected, please contact support.
        </p>
        <div className="mt-6">
          <form action={logout}>
            <button
              type="submit"
              className="inline-flex items-center justify-center rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 active:bg-slate-100"
            >
              Log out
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}


