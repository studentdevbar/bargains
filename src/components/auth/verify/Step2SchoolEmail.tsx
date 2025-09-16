"use client";

import { verifyAccount } from "@/actions/account/verify";
import { ProfileData } from "@/app/(auth)/verify-account/page";
import { Button } from "@/components/ui/button";
import { CustomButton } from "@/components/ui/custom-button";
import { useState } from "react";
import { toast } from "sonner";

type Step2Props = {
  school: string;
  profile: Partial<ProfileData>;
  defaultEmail?: string;
  onBack: () => void;
  onNext: (email: string) => void;
};

export default function Step2SchoolEmail({
  school,
  defaultEmail,
  onBack,
  onNext,
  profile,
}: Step2Props) {
  const [email, setEmail] = useState(defaultEmail || "");

  async function handleSubmit() {
    if (!email.trim()) return;
    if (!profile.firstName || !profile.lastName || !profile.schoolId || !profile.gender || !profile.dob) return;
    const data = {
      first_name: profile.firstName,
      last_name: profile.lastName,
      school_id: profile.schoolId,
      student_email: email,
      gender: profile.gender,
      dob: profile.dob,
    };
    const result = await verifyAccount(data);
    if (result.success) {
      onNext(email);
    } else {
      toast.error(result.error);
    }
    onNext(email);
  }

  return (
    <div className="space-y-5">
      <div className="space-y-2">
        <label className="text-sm font-medium">Selected school</label>
        <div className="rounded-md border border-input bg-accent/50 px-3 py-3 text-sm">
          {school}
        </div>
      </div>

      <div className="space-y-1.5">
        <label htmlFor="schoolEmail" className="text-sm font-medium">
          School email address
        </label>
        <input
          id="schoolEmail"
          name="schoolEmail"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
          required
          className="h-11 mt-2 w-full rounded-md border border-input bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring/50"
          placeholder="john.doe@school.edu"
        />
      </div>

      <div className="flex gap-3">
        <Button
          type="button"
          variant="outline"
          className="h-11 flex-1 rounded-full"
          onClick={onBack}
        >
          Back
        </Button>
        <CustomButton type="button"
          onClick={handleSubmit}
          className="h-11 flex-1 text-[15px] rounded-full bg-accent-main"
        >
          Continue
        </CustomButton>
      </div>
    </div>
  );
}
