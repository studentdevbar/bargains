"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import AuthWrapper from "@/components/auth/AuthWrapper";
import { loginUser } from "@/actions/login/login";
import { CustomButton } from "@/components/ui/custom-button";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useAuthStore } from "@/stores/auth-store";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const setUser = useAuthStore((s) => s.setUser);

  const handleSubmit = async () => {
    setIsLoading(true);
    const result = await loginUser(email, password);

    if(result.success) {
      const data = result.data as {
        message: string;
        token: string;
        user: { id: number; name: string; email: string; account_confirmed: boolean };
      };

      setUser({
        id: data.user.id,
        name: data.user.name,
        email: data.user.email,
        account_confirmed: data.user.account_confirmed,
      });

      if (!data.user.account_confirmed) {
        router.replace("/verification");
      } else {
        router.replace("/student/dashboard");
      }
    }else{
      toast.error(result.error);
    }
    setIsLoading(false);
  };
  return (
    <AuthWrapper
      heading="Hello Again!"
      subheading="Welcome back to Student Bargains!"
      bottomPrompt="Don't have an account yet?"
      bottomLinkHref="/register"
      bottomLinkText="Sign Up"
    >
      <div className="space-y-4">
        <div className="space-y-1.5">
          <label htmlFor="email" className="text-sm font-medium">Email</label>
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

        <div className="space-y-1.5">
          <label htmlFor="password" className="text-sm font-medium">Password</label>
          <div className="relative">
            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              required
              className="h-11 w-full mt-2 rounded-md border border-input bg-background pr-10 px-3 text-sm outline-none focus:ring-2 focus:ring-ring/50"
              placeholder="••••••••"
            />
            <button
              type="button"
              aria-label={showPassword ? "Hide password" : "Show password"}
              onClick={() => setShowPassword((v) => !v)}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-muted-foreground hover:text-foreground"
            >
              {showPassword ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <label className="inline-flex items-center gap-2 text-sm text-muted-foreground">
            <input type="checkbox" className="size-4 rounded border-input" />
            Remember Me
          </label>
          <Link href="#" className="text-sm text-primary hover:underline">
            Recovery Password
          </Link>
        </div>

        <CustomButton  className="w-full h-11 text-[15px] rounded-full bg-accent-main" onClick={handleSubmit} disabled={isLoading} loading={isLoading}>Login</CustomButton>

        <Button type="button" variant="outline" className="w-full h-11 rounded-full">
          <FcGoogle className="w-5 h-5" />
          <span className="ml-1">Sign in with Google</span>
        </Button>
      </div>
    </AuthWrapper>
  );
}