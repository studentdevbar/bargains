"use client";

import AuthWrapper from "@/components/auth/AuthWrapper";
import EmailStep from "@/components/auth/register/EmailStep";
import OtpStep from "@/components/auth/register/OtpStep";
import { useState } from "react";

export default function RegisterPage() {
  const [step, setStep] = useState<"email" | "otp">("email");
  const [email, setEmail] = useState<string>("");

  return (
    <AuthWrapper
      heading={step === "email" ? "Create your account" : "Verify your email"}
      subheading={step === "email" ? "Join Student Bargains in seconds." : "Enter the code we sent to your email."}
      bottomPrompt="Already have an account?"
      bottomLinkHref="/login"
      bottomLinkText="Login"
    >
      {step === "email" ? (
        <EmailStep
          defaultEmail={email}
          onNext={(val) => {
            setEmail(val);
            setStep("otp");
          }}
        />
      ) : (
        <OtpStep
          email={email}
          onBack={() => setStep("email")}
          onVerify={(otp) => {
            // For now just log; subsequent steps would follow here
            console.log("OTP submitted:", otp);
          }}
        />
      )}
    </AuthWrapper>
  );
}


