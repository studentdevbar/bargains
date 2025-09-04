"use client";

import { Button } from "@/components/ui/button";
import Lottie from "lottie-react";
import { useEffect, useState } from "react";

type Step3Props = {
  schoolEmail: string;
  onBack: () => void;
};

export default function Step3SentNotice({ schoolEmail, onBack }: Step3Props) {
  const [animationData, setAnimationData] = useState<Record<
    string,
    unknown
  > | null>(null);

  useEffect(() => {
    let mounted = true;
    if (!animationData) {
      fetch("/email-animation.json")
        .then((r) => r.json())
        .then((d: unknown) => {
          if (!mounted) return;
          setAnimationData(d as Record<string, unknown>);
        })
        .catch(() => {});
    }
    return () => {
      mounted = false;
    };
  }, [animationData]);

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2 flex flex-col items-center">
        <div>
          {animationData ? (
            <Lottie
              animationData={animationData}
              loop={false}
              style={{ width: 160, height: 160 }}
            />
          ) : (
            <div className="w-40 h-40" />
          )}
        </div>
        <p className="text-sm text-muted-foreground">
          We sent a verification link to{" "}
          <span className="font-medium text-foreground">{schoolEmail}</span>.
          Click the link in the email to verify your account.
        </p>
      </div>
      <div className="flex gap-3 justify-center">
        <Button
          type="button"
          variant="outline"
          className="h-11 rounded-full"
          onClick={onBack}
        >
          Back
        </Button>
        <Button type="button" className="h-11 rounded-full bg-accent-main">
          Resend email
        </Button>
      </div>
    </div>
  );
}
