"use client";

import { useState } from "react";
import CouponCard from "@/components/home/CouponCard";
import { Heart, TicketCheck } from "lucide-react";

type CouponData = {
  id: number;
  title: string;
  is_exclusive: boolean;
  expires_at: string | null;
  uses: number;
  shares_count: number;
  active: boolean;
  photo_cover: string | null;
  type: "code" | "link";
  featured: boolean;
  created_at: string;
  vendor: string;
  coupon_code?: string;
  coupon_url?: string;
  redeemed_at?: string;
};

export default function StudentCouponsPage() {
  const [activeTab, setActiveTab] = useState<"favourites" | "redeemed">("favourites");
  const [loading, setLoading] = useState(false);

  // Simulated favourited coupons data
  const favouritedCoupons: CouponData[] = [
    {
      id: 1,
      title: "50% Off All Textbooks",
      is_exclusive: true,
      expires_at: "2025-12-31T23:59:59Z",
      uses: 1245,
      shares_count: 320,
      active: true,
      photo_cover: "/images/vendors/amazon.jpg",
      type: "code",
      featured: true,
      created_at: "2025-01-15T10:00:00Z",
      vendor: "Amazon",
      coupon_code: "STUDENT50",
    },
    {
      id: 2,
      title: "Free Delivery on All Orders",
      is_exclusive: false,
      expires_at: "2025-11-30T23:59:59Z",
      uses: 892,
      shares_count: 210,
      active: true,
      photo_cover: "/images/vendors/jumia.jpg",
      type: "code",
      featured: false,
      created_at: "2025-02-10T14:30:00Z",
      vendor: "Jumia",
      coupon_code: "FREEDEL",
    },
    {
      id: 3,
      title: "30% Off Premium Subscription",
      is_exclusive: true,
      expires_at: "2025-10-15T23:59:59Z",
      uses: 567,
      shares_count: 145,
      active: true,
      photo_cover: "/images/vendors/spotify.jpg",
      type: "link",
      featured: true,
      created_at: "2025-03-05T09:15:00Z",
      vendor: "Spotify",
      coupon_url: "https://spotify.com/student",
    },
    {
      id: 4,
      title: "Buy 2 Get 1 Free - All Fashion Items",
      is_exclusive: true,
      expires_at: null,
      uses: 2100,
      shares_count: 540,
      active: true,
      photo_cover: "/images/vendors/fashion.jpg",
      type: "code",
      featured: false,
      created_at: "2025-01-20T16:45:00Z",
      vendor: "Fashion Nova",
      coupon_code: "BUY2GET1",
    },
    {
      id: 5,
      title: "20% Off Laptops & Electronics",
      is_exclusive: false,
      expires_at: "2025-12-25T23:59:59Z",
      uses: 678,
      shares_count: 189,
      active: true,
      photo_cover: "/images/vendors/electronics.jpg",
      type: "code",
      featured: true,
      created_at: "2025-02-28T11:20:00Z",
      vendor: "Slot Nigeria",
      coupon_code: "TECH20",
    },
    {
      id: 6,
      title: "Free Month of Cloud Storage",
      is_exclusive: true,
      expires_at: "2025-11-01T23:59:59Z",
      uses: 445,
      shares_count: 98,
      active: true,
      photo_cover: "/images/vendors/cloud.jpg",
      type: "link",
      featured: false,
      created_at: "2025-03-12T13:00:00Z",
      vendor: "Google Drive",
      coupon_url: "https://google.com/drive/student",
    },
  ];

  // Simulated redeemed coupons data
  const redeemedCoupons: CouponData[] = [
    {
      id: 7,
      title: "40% Off First Food Order",
      is_exclusive: true,
      expires_at: "2025-10-20T23:59:59Z",
      uses: 3421,
      shares_count: 890,
      active: true,
      photo_cover: "/images/vendors/food.jpg",
      type: "code",
      featured: true,
      created_at: "2025-01-10T08:00:00Z",
      vendor: "Chowdeck",
      coupon_code: "FIRST40",
      redeemed_at: "2025-03-15T14:22:00Z",
    },
    {
      id: 8,
      title: "Free Premium Account for 3 Months",
      is_exclusive: false,
      expires_at: "2025-12-31T23:59:59Z",
      uses: 1567,
      shares_count: 423,
      active: true,
      photo_cover: "/images/vendors/canva.jpg",
      type: "link",
      featured: false,
      created_at: "2025-02-05T10:30:00Z",
      vendor: "Canva",
      coupon_url: "https://canva.com/education",
      redeemed_at: "2025-03-10T09:45:00Z",
    },
    {
      id: 9,
      title: "50% Off Annual Gym Membership",
      is_exclusive: true,
      expires_at: null,
      uses: 234,
      shares_count: 67,
      active: true,
      photo_cover: "/images/vendors/gym.jpg",
      type: "code",
      featured: true,
      created_at: "2025-01-25T15:00:00Z",
      vendor: "Fitness First",
      coupon_code: "FIT50",
      redeemed_at: "2025-02-28T16:30:00Z",
    },
    {
      id: 10,
      title: "15% Off All Stationery",
      is_exclusive: false,
      expires_at: "2025-11-15T23:59:59Z",
      uses: 789,
      shares_count: 201,
      active: true,
      photo_cover: "/images/vendors/stationery.jpg",
      type: "code",
      featured: false,
      created_at: "2025-02-20T12:15:00Z",
      vendor: "Essentials",
      coupon_code: "STAT15",
      redeemed_at: "2025-03-05T11:20:00Z",
    },
  ];

  const formatExpiry = (iso: string | null) => {
    if (!iso) return "No expiry";
    const d = new Date(iso);
    if (Number.isNaN(d.getTime())) return "No expiry";
    return d.toLocaleDateString(undefined, {
      day: "2-digit",
      month: "short",
      year: "2-digit",
    });
  };

  const formatRedeemDate = (iso: string) => {
    const d = new Date(iso);
    return d.toLocaleDateString(undefined, {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const currentCoupons = activeTab === "favourites" ? favouritedCoupons : redeemedCoupons;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">My Coupons</h1>
        <p className="mt-2 text-sm text-gray-600">
          Manage your favourited and redeemed coupons
        </p>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex gap-6">
          <button
            onClick={() => setActiveTab("favourites")}
            className={`group inline-flex items-center gap-2 border-b-2 px-1 py-3 text-sm font-medium transition-colors ${
              activeTab === "favourites"
                ? "border-accent-main text-accent-main"
                : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
            }`}
          >
            <Heart
              className={`size-5 ${
                activeTab === "favourites" ? "fill-accent-main" : ""
              }`}
            />
            Favourites
            <span
              className={`ml-2 rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                activeTab === "favourites"
                  ? "bg-accent-main/10 text-accent-main"
                  : "bg-gray-100 text-gray-600"
              }`}
            >
              {favouritedCoupons.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab("redeemed")}
            className={`group inline-flex items-center gap-2 border-b-2 px-1 py-3 text-sm font-medium transition-colors ${
              activeTab === "redeemed"
                ? "border-accent-main text-accent-main"
                : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
            }`}
          >
            <TicketCheck className="size-5" />
            Redeemed
            <span
              className={`ml-2 rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                activeTab === "redeemed"
                  ? "bg-accent-main/10 text-accent-main"
                  : "bg-gray-100 text-gray-600"
              }`}
            >
              {redeemedCoupons.length}
            </span>
          </button>
        </nav>
      </div>

      {/* Stats Banner */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-lg bg-gradient-to-br from-purple-50 to-purple-100 p-4">
          <div className="flex items-center gap-3">
            <div className="rounded-full bg-purple-200 p-3">
              <Heart className="size-5 text-purple-700" />
            </div>
            <div>
              <p className="text-2xl font-bold text-purple-900">{favouritedCoupons.length}</p>
              <p className="text-xs text-purple-700">Favourited</p>
            </div>
          </div>
        </div>

        <div className="rounded-lg bg-gradient-to-br from-green-50 to-green-100 p-4">
          <div className="flex items-center gap-3">
            <div className="rounded-full bg-green-200 p-3">
              <TicketCheck className="size-5 text-green-700" />
            </div>
            <div>
              <p className="text-2xl font-bold text-green-900">{redeemedCoupons.length}</p>
              <p className="text-xs text-green-700">Redeemed</p>
            </div>
          </div>
        </div>

        {/* <div className="rounded-lg bg-gradient-to-br from-orange-50 to-orange-100 p-4">
          <div className="flex items-center gap-3">
            <div className="rounded-full bg-orange-200 p-3">
              <span className="text-lg font-bold text-orange-700">₦</span>
            </div>
            <div>
              <p className="text-2xl font-bold text-orange-900">~₦45k</p>
              <p className="text-xs text-orange-700">Est. Savings</p>
            </div>
          </div>
        </div> */}
      </div>

      {/* Content */}
      {loading ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="h-96 animate-pulse rounded-3xl bg-gray-200"
            />
          ))}
        </div>
      ) : currentCoupons.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 py-16">
          {activeTab === "favourites" ? (
            <>
              <Heart className="size-12 text-gray-400" />
              <h3 className="mt-4 text-lg font-semibold text-gray-900">
                No favourites yet
              </h3>
              <p className="mt-2 text-sm text-gray-500">
                Start adding coupons to your favourites to see them here
              </p>
            </>
          ) : (
            <>
              <TicketCheck className="size-12 text-gray-400" />
              <h3 className="mt-4 text-lg font-semibold text-gray-900">
                No redeemed coupons
              </h3>
              <p className="mt-2 text-sm text-gray-500">
                Redeem coupons to track your savings history
              </p>
            </>
          )}
        </div>
      ) : (
        <>
          {/* Results count */}
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-600">
              Showing {currentCoupons.length} {activeTab === "favourites" ? "favourited" : "redeemed"} coupon{currentCoupons.length !== 1 ? "s" : ""}
            </p>
          </div>

          {/* Coupons Grid */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {currentCoupons.map((coupon) => (
              <div key={coupon.id} className="relative">
                <CouponCard
                  className="!h-32"
                  id={coupon.id}
                  imageSrc={coupon.photo_cover || "/images/placeholder.jpg"}
                  imageAlt={coupon.vendor}
                  imageBgClass="bg-[#F3F4F6]"
                  title={coupon.title}
                  isExclusive={coupon.is_exclusive}
                  expiryDateLabel={formatExpiry(coupon.expires_at)}
                  likes={coupon.uses}
                  shares={coupon.shares_count}
                  buttonLabel={coupon.type === "code" ? "Show Code" : "Get Deal"}
                  couponCode={coupon.coupon_code || "••••••"}
                  couponUrl={coupon.coupon_url}
                />
                
                {/* Redeemed badge */}
                {activeTab === "redeemed" && coupon.redeemed_at && (
                  <div className="absolute -top-2 -right-2 z-10">
                    <div className="rounded-full bg-green-500 px-3 py-1 text-xs font-semibold text-white shadow-lg">
                      ✓ Redeemed {formatRedeemDate(coupon.redeemed_at)}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

