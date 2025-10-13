"use client";

import { useState } from "react";
import AuthWrapper from "@/components/auth/AuthWrapper";
import Step1ProfileSchool from "@/components/auth/verify/Step1ProfileSchool";
import Step2SchoolEmail from "@/components/auth/verify/Step2SchoolEmail";
import Step3SentNotice from "@/components/auth/verify/Step3SentNotice";
import { verifyAccount } from "@/actions/account/verify";
import { toast } from "sonner";

export type ProfileData = {
  firstName: string;
  lastName: string;
  gender: "male" | "female";
  dob: string;
  school: string;
  schoolId: number;
};

export default function VerifyAccountPage() {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [profile, setProfile] = useState<Partial<ProfileData>>({});
  const [schoolEmail, setSchoolEmail] = useState("");

  return (
    <AuthWrapper
      heading={
        step === 1
          ? "Verify your account"
          : step === 2
          ? "School email verification"
          : "Confirm your email"
      }
      subheading={
        step === 1
          ? "Tell us about you and choose your school."
          : step === 2
          ? "Enter your personal school email."
          : "We sent a link to your email."
      }
      bottomPrompt="Need help?"
      bottomLinkHref="#"
      bottomLinkText="Contact support"
    >
      {step === 1 && (
        <Step1ProfileSchool
          initial={{
            firstName: profile.firstName,
            lastName: profile.lastName,
            gender: profile.gender,
            dob: profile.dob,
            school: profile.school,
          }}
          onNext={(data) => {
            setProfile(data);
            setStep(2);
          }}
        />
      )}

      {step === 2 && profile.school && (
        <Step2SchoolEmail
          school={profile.school}
          profile={profile}
          defaultEmail={schoolEmail}
          onBack={() => setStep(1)}
          onNext={(email) => {
            setSchoolEmail(email);
            setStep(3);
          }}
        />
      )}

      {step === 3 && (
        <Step3SentNotice
          schoolEmail={schoolEmail}
          onBack={() => setStep(2)}
        />
      )}
    </AuthWrapper>
  );
}


