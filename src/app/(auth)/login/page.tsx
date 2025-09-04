import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-muted/30 flex items-center justify-center py-10 px-4">
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 bg-card text-card-foreground rounded-xl shadow-xl overflow-hidden">
        {/* Left visual panel */}
        <div className="relative hidden md:block bg-blue-600">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.15),transparent_50%),radial-gradient(circle_at_80%_30%,rgba(255,255,255,0.12),transparent_45%),radial-gradient(circle_at_40%_80%,rgba(255,255,255,0.1),transparent_45%)]" />
          <div className="relative h-full w-full p-10 flex flex-col justify-end text-white">
            <div className="relative flex-1 flex items-center justify-center">
              <Image
                src="/images/hero_image.png"
                alt="Illustration"
                width={700}
                height={700}
                priority
                className="object-contain drop-shadow-xl"
              />
            </div>
            <div className="mt-6">
              <h3 className="text-2xl font-semibold">New Scheduling And Routing Options</h3>
              <p className="text-white/85 text-sm mt-2 max-w-md">
                We also updated the format of podcasts and rewards.
              </p>
            </div>
          </div>
        </div>

        {/* Right form panel */}
        <div className="p-6 sm:p-8 md:p-10 bg-card">
          <div className="mx-auto w-full max-w-md">
            <div className="text-center">
              <div className="mx-auto mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-blue-50">
                <Image src="/logo.png" alt="Logo" width={28} height={28} />
              </div>
              <h1 className="text-2xl sm:text-3xl font-semibold">Hello Again!</h1>
              <p className="text-muted-foreground text-sm mt-2">
                Aliquam consectetur et tincidunt praesent enim massa pellentesque velit odio neque
              </p>
            </div>

            <form className="mt-8 space-y-4" action="#" method="post">
              <div className="space-y-1.5">
                <label htmlFor="email" className="text-sm font-medium">Email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="h-11 w-full rounded-md border border-input bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring/50"
                  placeholder="you@example.com"
                />
              </div>

              <div className="space-y-1.5">
                <label htmlFor="password" className="text-sm font-medium">Password</label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="h-11 w-full rounded-md border border-input bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring/50"
                  placeholder="••••••••"
                />
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

              <Button type="submit" className="w-full h-11 text-[15px]">Login</Button>

              <Button type="button" variant="outline" className="w-full h-11">
                <svg aria-hidden="true" viewBox="0 0 24 24" className="size-5">
                  <path fill="#EA4335" d="M12 10.2v3.9h5.4c-.2 1.3-1.6 3.8-5.4 3.8-3.3 0-6-2.7-6-6s2.7-6 6-6c1.9 0 3.2.8 3.9 1.5l2.7-2.6C16.5 3.2 14.4 2.2 12 2.2 6.9 2.2 2.8 6.3 2.8 11.4S6.9 20.6 12 20.6c6.8 0 9.2-4.8 9.2-7.2 0-.5 0-.8-.1-1.2H12z"/>
                </svg>
                <span className="ml-1">Sign in with Google</span>
              </Button>
            </form>

            <p className="mt-8 text-center text-sm text-muted-foreground">
              Don&apos;t have an account yet?{" "}
              <Link href="/signup" className="text-primary hover:underline">
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}