"use server";

import PageBanner from "@/components/layout/PageBanner";
import {
  BadgeCheck,
  Gift,
} from "lucide-react";
import { DropClient } from "@/components/drops/DropClient";
import { CountdownPanel } from "@/components/drops/CountdownPanel";
import { RewardReveal } from "@/components/drops/RewardReveal";
import type { DropReward } from "@/components/drops/RewardReveal";

// DropReward type is imported from client component

type Drop = {
  id: string;
  brandName: string;
  title: string;
  description: string;
  dropAt: string; // ISO string
  videoUrl?: string; // mp4 or external embed URL
  reward: DropReward;
  coverImageUrl?: string;
};

// Simulated drops database
const DROPS: Record<string, Drop> = {
  mtn: {
    id: "mtn",
    brandName: "MTN Nigeria",
    title: "MTN Mega Billion PROMO",
    description:
      "Get an exclusive digital sticker pack when the timer hits zero. Stay tuned while our video runs!",
    // 5 minutes from now
    dropAt: new Date(Date.now() + 100 * 40 * 1000).toISOString(),
    videoUrl:
      "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
    reward: { type: "text", text: "COLD-STUDENT-25" },

    coverImageUrl:
      "https://www.mtn.ng/wp-content/uploads/2025/06/MTN-MEGA-BILLIO-web-new.jpg",
  },
  linkdemo: {
    id: "linkdemo",
    brandName: "Ticki",
    title: "Free Ride Code Reveal",
    description:
      "A special link will unlock with instructions once the countdown completes.",
    dropAt: new Date(Date.now() + 2 * 60 * 1000).toISOString(),
    videoUrl:
      "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
    reward: {
      type: "link",
      url: "https://example.com/redeem",
      label: "Redeem now",
    },
    coverImageUrl: "/images/ticki_logo.png",
  },
  textdemo: {
    id: "textdemo",
    brandName: "Coldstone",
    title: "Secret Phrase Reveal",
    description:
      "We’ll reveal a one-time phrase you can use at checkout when the timer ends.",
    dropAt: new Date(Date.now() + 30 * 1000).toISOString(),
    reward: {
      type: "image",
      url: "/images/brandmanny.png",
      alt: "Sticker Pack",
    },
    coverImageUrl: "/images/coldstone.png",
  },
};

// RewardReveal moved to a client component

type Params = Promise<{ id: string }>;

export default async function Page(props: { params: Params }) {
  const params = await props.params;
  const { id } = params;
  console.log(id);
  const drop: Drop | undefined = DROPS[id] ?? DROPS["mtn"];

  return (
    <main>
      <PageBanner
        title={drop.title}
        description={drop.description}
        breadcrumbs={[
          { label: "Browse Coupons", href: "/" },
          { label: "Drop Details" },
        ]}
      />

      <section className="bg-[#F5F7FB] py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
            <aside className="lg:col-span-4">
              <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-200/60">
                {drop.coverImageUrl && (
                  <div className="mb-4 overflow-hidden rounded-xl">
                    <img
                      src={drop.coverImageUrl}
                      alt={`${drop.brandName} cover`}
                      className="h-40 w-full object-cover"
                    />
                  </div>
                )}
                <div className="mb-4 inline-flex items-center gap-2 text-sm text-gray-600">
                  <BadgeCheck className="size-4 text-[var(--color-accent-main)]" />
                  <span>Verified brand</span>
                </div>
                <h2 className="text-xl font-semibold text-gray-900">
                  {drop.brandName}
                </h2>
                <p className="mt-2 text-sm text-gray-700">
                  Stay on this page. The reward unlocks automatically when the
                  timer ends.
                </p>

                <CountdownPanel dropAt={drop.dropAt} />
              </div>
            </aside>

            <div className="lg:col-span-8">
              <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-200/60">
                <DropClient
                  dropAt={drop.dropAt}
                  pre={
                    <div>
                      <div className="aspect-video w-full overflow-hidden rounded-xl bg-black">
                        {drop.videoUrl ? (
                          <video
                            className="h-full w-full"
                            src={drop.videoUrl}
                            controls
                            autoPlay
                            muted
                            playsInline
                            poster="/images/hero_image.png"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center text-white">
                            <span>Brand video plays here…</span>
                          </div>
                        )}
                      </div>
                      <p className="mt-4 text-sm text-gray-700">
                        While you wait, enjoy this short video from{" "}
                        {drop.brandName}. The reward will unlock automatically
                        when the timer finishes.
                      </p>
                    </div>
                  }
                  post={
                    <div className="space-y-5">
                      <div className="inline-flex items-center gap-2 rounded-full bg-green-50 px-3 py-1 text-green-700">
                        <Gift className="size-4" />
                        <span className="text-sm font-medium">
                          Drop is live! Claim your reward below.
                        </span>
                      </div>
                      <RewardReveal reward={drop.reward} />
                    </div>
                  }
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
