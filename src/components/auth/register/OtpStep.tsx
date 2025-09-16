"use client";

import { useState } from "react";
import { CustomButton } from "@/components/ui/custom-button";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { useRouter } from "next/navigation";
import { verifyOtp } from "@/actions/register/verify-otp";
import { toast } from "sonner";
import { createSession, setVerifiedCookie } from "@/actions/helpers/session";

type OtpStepProps = {
  email: string;
  onBack: () => void;
};

export default function OtpStep({ email, onBack }: OtpStepProps) {
  const [otp, setOtp] = useState("");
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleVerify() {
    if (otp.length !== 6) return;
    if (loading) return;
    setLoading(true);
    const result = await verifyOtp(email, otp);
    if (result.success && result.data) {
      await createSession(result.data.token);
      await setVerifiedCookie(Boolean(result.data.user?.verified));
      router.push("/verify-account");
    } else {
      toast.error(result.error || "Failed to verify OTP");
    }
    setLoading(false);
    
  }

  return (
    <div className="space-y-4 ">
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
        <CustomButton type="button" variant="outline" className="h-11 flex-1 rounded-full" onClick={onBack} disabled={loading}>Back</CustomButton>
        <CustomButton type="button" onClick={handleVerify} loading={loading} loadingText="Verifying..." disabled={otp.length !== 6 || loading} className="h-11 flex-1 text-[15px] rounded-full bg-accent-main">Verify</CustomButton>
      </div>
    </div>
  );
}


