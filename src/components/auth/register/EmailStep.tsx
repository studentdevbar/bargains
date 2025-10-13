"use client";

import { registerUser } from "@/actions/register/register";
import { CustomButton } from "@/components/ui/custom-button";
import { useState } from "react";
import { toast } from "sonner";

type EmailStepProps = {
  onNext: (email: string) => void;
  defaultEmail?: string;
};

export default function EmailStep({ onNext, defaultEmail }: EmailStepProps) {
  const [email, setEmail] = useState<string>(defaultEmail || "");

  const [loading, setLoading] = useState(false);

  async function handleSubmit() {
    if (!email.trim()) return;
    if (loading) return;
    setLoading(true);
    const result = await registerUser(email);

    if (result.success) {
      onNext(email);
    } else {
      toast.error(result.error);
    }
    setLoading(false);
  }

  return (
    <div className="space-y-4">
      <div className="space-y-1.5">
        <label htmlFor="email" className="text-sm font-medium">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
          required
          className="h-11 mt-2 w-full rounded-md border border-input bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring/50"
          placeholder="you@example.com"
        />
      </div>

      <CustomButton
        onClick={handleSubmit}
        loading={loading}
        loadingText="Sending..."
        className="w-full h-11 text-[15px] rounded-full bg-accent-main"
      >
        Continue
      </CustomButton>
    </div>
  );
}
