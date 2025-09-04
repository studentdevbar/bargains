"use client";

import { Button } from "@/components/ui/button";

type Step2Props = {
  school: string;
  defaultEmail?: string;
  onBack: () => void;
  onNext: (email: string) => void;
};

export default function Step2SchoolEmail({ school, defaultEmail, onBack, onNext }: Step2Props) {
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const email = String(data.get("schoolEmail") || "").trim();
    if (!email) return;
    onNext(email);
  }

  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
      <div className="space-y-2">
        <label className="text-sm font-medium">Selected school</label>
        <div className="rounded-md border border-input bg-accent/50 px-3 py-3 text-sm">
          {school}
        </div>
      </div>

      <div className="space-y-1.5">
        <label htmlFor="schoolEmail" className="text-sm font-medium">School email address</label>
        <input
          id="schoolEmail"
          name="schoolEmail"
          type="email"
          defaultValue={defaultEmail}
          autoComplete="email"
          required
          className="h-11 mt-2 w-full rounded-md border border-input bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring/50"
          placeholder="john.doe@school.edu"
        />
      </div>

      <div className="flex gap-3">
        <Button type="button" variant="outline" className="h-11 flex-1 rounded-full" onClick={onBack}>Back</Button>
        <Button type="submit" className="h-11 flex-1 text-[15px] rounded-full bg-accent-main">Continue</Button>
      </div>
    </form>
  );
}


