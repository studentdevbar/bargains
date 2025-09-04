"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { useRouter } from "next/navigation";

type OtpStepProps = {
  email: string;
  onBack: () => void;
  onVerify: (otp: string) => void;
};

export default function OtpStep({ email, onBack, onVerify }: OtpStepProps) {
  const [otp, setOtp] = useState("");
  const router = useRouter();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (otp.length === 6) onVerify(otp);
    router.push("/verify-account");
  }

  return (
    <form className="space-y-4 " onSubmit={handleSubmit}>
      <p className="text-sm text-muted-foreground text-center">We sent a 6‑digit code to <span className="font-medium text-foreground">{email}</span></p>
      <div className="space-y-1.5 flex items-center flex-col">
        <label className="text-sm font-medium text-center">Enter OTP</label>
        <InputOTP
          maxLength={6}
          value={otp}
          onChange={setOtp}
          containerClassName="mt-2 justify-center gap-3 sm:gap-4"
          className="mx-auto"
          onComplete={(val) => setOtp(val)}
        >
          <InputOTPGroup>
            {Array.from({ length: 6 }).map((_, i) => (
              <InputOTPSlot key={i} index={i} className="h-12 w-12 text-base sm:h-14 sm:w-14 sm:text-lg" />
            ))}
          </InputOTPGroup>
        </InputOTP>
      </div>

      <div className="flex gap-3 mt-12">
        <Button type="button" variant="outline" className="h-11 flex-1 rounded-full" onClick={onBack}>Back</Button>
        <Button type="submit" disabled={otp.length !== 6} className="h-11 flex-1 text-[15px] rounded-full bg-accent-main">Verify</Button>
      </div>
    </form>
  );
}


