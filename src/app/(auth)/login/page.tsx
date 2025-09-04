"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import AuthWrapper from "@/components/auth/AuthWrapper";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <AuthWrapper
      heading="Hello Again!"
      subheading="Welcome back to Student Bargains!"
      bottomPrompt="Don't have an account yet?"
      bottomLinkHref="/register"
      bottomLinkText="Sign Up"
    >
      <form className="space-y-4" action="#" method="post">
        <div className="space-y-1.5">
          <label htmlFor="email" className="text-sm font-medium">Email</label>
          <input
            id="email"
            name="email"
            type="email"
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

        <Button type="submit" className="w-full h-11 text-[15px] rounded-full bg-accent-main">Login</Button>

        <Button type="button" variant="outline" className="w-full h-11 rounded-full">
          <FcGoogle className="w-5 h-5" />
          <span className="ml-1">Sign in with Google</span>
        </Button>
      </form>
    </AuthWrapper>
  );
}