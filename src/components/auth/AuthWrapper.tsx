"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

type AuthWrapperProps = {
  heading: string;
  subheading?: string;
  bottomPrompt?: string;
  bottomLinkHref?: string;
  bottomLinkText?: string;
  children: React.ReactNode;
};

export default function AuthWrapper({
  heading,
  subheading,
  bottomPrompt,
  bottomLinkHref,
  bottomLinkText,
  children,
}: AuthWrapperProps) {
  const slides = [
    {
      id: 0,
      image: "/images/hero_image.png",
      title: "New Scheduling And Routing Options",
      subtitle: "We also updated the format of podcasts and rewards.",
      bg: "bg-blue-600",
    },
    {
      id: 1,
      image: "/images/hero_image.png",
      title: "Smarter Insights And Recommendations",
      subtitle: "Personalized tips to help you make the most of your deals.",
      bg: "bg-violet-600",
    },
    {
      id: 2,
      image: "/images/hero_image.png",
      title: "Track Rewards Effortlessly",
      subtitle: "All your rewards in one place with real‑time updates.",
      bg: "bg-emerald-600",
    },
  ];

  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % slides.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <div className="min-h-screen w-full grid grid-cols-1 md:grid-cols-2">
      {/* Left slider */}
      <div className={`relative hidden md:flex overflow-hidden transition-colors duration-700 ${slides[active].bg}`}>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.15),transparent_50%),radial-gradient(circle_at_80%_30%,rgba(255,255,255,0.12),transparent_45%),radial-gradient(circle_at_40%_80%,rgba(255,255,255,0.1),transparent_45%)]" />
        <div className="relative h-full w-full p-10 flex flex-col justify-end text-white">
          <div className="relative flex-1 overflow-hidden">
            <div
              className="flex h-full w-full transition-transform duration-700 ease-out"
              style={{ transform: `translateX(-${active * 100}%)` }}
            >
              {slides.map((s) => (
                <div key={s.id} className="w-full flex-shrink-0 h-full flex items-center justify-center">
                  <Image
                    src={s.image}
                    alt="Illustration"
                    width={700}
                    height={700}
                    priority
                    className="object-contain drop-shadow-xl"
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="mt-6 text-center">
            <h3 className="text-2xl font-semibold">{slides[active].title}</h3>
            <p className="text-white/85 text-sm mt-2 max-w-md mx-auto">{slides[active].subtitle}</p>
            <div className="mt-4 flex items-center justify-center gap-2">
              {slides.map((s, i) => (
                <button
                  key={s.id}
                  aria-label={`Go to slide ${i + 1}`}
                  onClick={() => setActive(i)}
                  className={`size-2.5 rounded-full transition-all ${i === active ? "bg-white scale-110" : "bg-white/60 hover:bg-white/80"}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Right content area */}
      <div className="bg-card flex items-center justify-center p-6 sm:p-8 md:p-10">
        <div className="mx-auto w-full max-w-md">
          <Link href="/" className="mx-auto mb-6 flex items-center justify-center">
            <Image src="/logo.png" alt="Logo" width={98} height={98} />
          </Link>
          <div className="text-center">
            <h1 className="text-2xl sm:text-3xl font-semibold">{heading}</h1>
            {subheading ? (
              <p className="text-muted-foreground text-sm mt-2">{subheading}</p>
            ) : null}
          </div>

          <div className="mt-8">
            {children}
          </div>

          {(bottomPrompt || bottomLinkHref) && (
            <p className="mt-8 text-center text-sm text-muted-foreground">
              {bottomPrompt}
              {bottomLinkHref && bottomLinkText ? (
                <Link href={bottomLinkHref} className="text-primary hover:underline ml-1">
                  {bottomLinkText}
                </Link>
              ) : null}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}


