"use client";

import { Button } from "@/components/ui/button";

type EmailStepProps = {
  onNext: (email: string) => void;
  defaultEmail?: string;
};

export default function EmailStep({ onNext, defaultEmail }: EmailStepProps) {
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const email = String(data.get("email") || "").trim();
    if (!email) return;
    onNext(email);
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div className="space-y-1.5">
        <label htmlFor="email" className="text-sm font-medium">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          defaultValue={defaultEmail}
          autoComplete="email"
          required
          className="h-11 mt-2 w-full rounded-md border border-input bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring/50"
          placeholder="you@example.com"
        />
      </div>

      <Button type="submit" className="w-full h-11 text-[15px] rounded-full bg-accent-main">Continue</Button>
    </form>
  );
}


