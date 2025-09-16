"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import AuthWrapper from "@/components/auth/AuthWrapper";
import { CustomButton } from "@/components/ui/custom-button";
import { confirmAccount } from "@/actions/account/confirm";
import { toast } from "sonner";
import Lottie from "lottie-react";
import Link from "next/link";
import { setVerifiedCookie } from "@/actions/helpers/session";

type Params = Promise<{ token: string }>;

export default async function Page(props: { params: Params }) {
  const params = await props.params;
  const { token } = params;

  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [animationData, setAnimationData] = useState<Record<
    string,
    unknown
  > | null>(null);

  async function handleConfirm() {
    if (!token) {
      toast.error("Missing confirmation token");
      setStatus("error");
      return;
    }
    try {
      setLoading(true);
      const res = await confirmAccount(token);
      if (res.success) {
        await setVerifiedCookie(true);
        setStatus("success");
        toast.success("Account confirmed successfully");
      } else {
        setStatus("error");
        toast.error(res.error || "Confirmation failed");
      }
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    handleConfirm();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

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
    <AuthWrapper
      heading={
        status === "success"
          ? "Account confirmed"
          : status === "error"
          ? "Confirmation failed"
          : "Confirming your account"
      }
      subheading={
        status === "success"
          ? "Your email has been verified. Please proceed to login."
          : status === "error"
          ? "This confirmation link is invalid or has expired."
          : "Please wait while we confirm your account."
      }
      bottomPrompt="Didn't receive an email?"
      bottomLinkHref="/verify-account"
      bottomLinkText="Request a new link"
    >
      <div className="space-y-6">
        {loading && (
          <div className="flex items-center justify-center py-8">
            <svg
              className="animate-spin h-6 w-6 text-foreground"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          </div>
        )}

        {!loading && status === "success" && (
          <div className="space-y-4 flex flex-col items-center">
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
            <CustomButton
              className="w-full h-11 rounded-full bg-accent-main"
              onClick={() => router.push("/login")}
            >
              Go to login
            </CustomButton>
          </div>
        )}

        {!loading && status === "error" && (
          <div className="space-y-4">
            <div className="rounded-md border border-destructive/30 bg-destructive/10 p-4 text-sm">
              The confirmation link is invalid or has expired. Please request a
              new link.
            </div>
            <div className="flex gap-3">
              <CustomButton
                className="h-11 flex-1 rounded-full"
                onClick={() => router.push("/verify-account")}
              >
                Request new link
              </CustomButton>
              <CustomButton
                className="h-11 flex-1 rounded-full bg-accent-main"
                onClick={() => router.push("/login")}
              >
                Go to login
              </CustomButton>
            </div>
          </div>
        )}
      </div>
    </AuthWrapper>
  );
}
