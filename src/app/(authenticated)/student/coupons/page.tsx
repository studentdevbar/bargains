"use client";

import { useState, useEffect } from "react";
import CouponCard from "@/components/home/CouponCard";
import { Heart, TicketCheck } from "lucide-react";
import { getRedeemedCoupons } from "@/actions/coupons/get-redeemed";
import { getFavourites } from "@/actions/coupons/get-favourites";
import DataTablePagination from "@/lib/DataTablePagination";

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
  is_favorited?: boolean;
};

export default function StudentCouponsPage() {
  const [activeTab, setActiveTab] = useState<"favourites" | "redeemed">("favourites");
  const [loading, setLoading] = useState(false);
  const [loadingRedeemed, setLoadingRedeemed] = useState(true);
  const [loadingFavourites, setLoadingFavourites] = useState(true);
  const [redeemedCoupons, setRedeemedCoupons] = useState<CouponData[]>([]);
  const [favouritedCoupons, setFavouritedCoupons] = useState<CouponData[]>([]);
  const [mounted, setMounted] = useState(false);
  
  // Pagination state for redeemed coupons
  const [redeemedPage, setRedeemedPage] = useState(1);
  const [redeemedPerPage, setRedeemedPerPage] = useState(15);
  const [redeemedTotalPages, setRedeemedTotalPages] = useState(1);
  const [redeemedTotal, setRedeemedTotal] = useState(0);

  // Pagination state for favourited coupons
  const [favouritesPage, setFavouritesPage] = useState(1);
  const [favouritesPerPage, setFavouritesPerPage] = useState(15);
  const [favouritesTotalPages, setFavouritesTotalPages] = useState(1);
  const [favouritesTotal, setFavouritesTotal] = useState(0);

  // Handle client-side mounting
  useEffect(() => {
    setMounted(true);
  }, []);

  // Fetch favourited coupons from API
  useEffect(() => {
    async function fetchFavouritedCoupons() {
      setLoadingFavourites(true);
      try {
        const response = await getFavourites(favouritesPage, favouritesPerPage);
        if (response.success && response.data) {
          const paginatedData = response.data as {
            current_page: number;
            data: CouponData[];
            last_page: number;
            per_page: number;
            total: number;
          };
          setFavouritedCoupons(response.data.data);
          setFavouritesPage(paginatedData.current_page);
          setFavouritesTotalPages(paginatedData.last_page);
          setFavouritesTotal(paginatedData.total);
          setFavouritesPerPage(paginatedData.per_page);
        }
      } catch (error) {
        console.error("Failed to fetch favourited coupons:", error);
      } finally {
        setLoadingFavourites(false);
      }
    }

    fetchFavouritedCoupons();
  }, [favouritesPage, favouritesPerPage]);

  // Fetch redeemed coupons from API
  useEffect(() => {
    async function fetchRedeemedCoupons() {
      setLoadingRedeemed(true);
      try {
        const response = await getRedeemedCoupons(redeemedPage, redeemedPerPage);
        if (response.success && response.data) {
          const paginatedData = response.data as {
            current_page: number;
            data: CouponData[];
            last_page: number;
            per_page: number;
            total: number;
          };
          setRedeemedCoupons(response.data.data);
          setRedeemedPage(paginatedData.current_page);
          setRedeemedTotalPages(paginatedData.last_page);
          setRedeemedTotal(paginatedData.total);
          setRedeemedPerPage(paginatedData.per_page);
        }
      } catch (error) {
        console.error("Failed to fetch redeemed coupons:", error);
      } finally {
        setLoadingRedeemed(false);
      }
    }

    fetchRedeemedCoupons();
  }, [redeemedPage, redeemedPerPage]);

  const formatExpiry = (iso: string | null) => {
    if (!mounted) return "Loading...";
    if (!iso) return "No expiry";
    const d = new Date(iso);
    if (Number.isNaN(d.getTime())) return "No expiry";
    return d.toLocaleDateString("en-US", {
      day: "2-digit",
      month: "short",
      year: "2-digit",
    });
  };

  const formatRedeemDate = (iso: string) => {
    if (!mounted) return "";
    const d = new Date(iso);
    return d.toLocaleDateString("en-US", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const handleRedeemedPageChange = (page: number) => {
    setRedeemedPage(page);
  };

  const handleRedeemedPerPageChange = (perPage: number) => {
    setRedeemedPerPage(perPage);
    setRedeemedPage(1); // Reset to first page when changing per page
  };

  const handleFavouritesPageChange = (page: number) => {
    setFavouritesPage(page);
  };

  const handleFavouritesPerPageChange = (perPage: number) => {
    setFavouritesPerPage(perPage);
    setFavouritesPage(1); // Reset to first page when changing per page
  };

  const currentCoupons = activeTab === "favourites" ? favouritedCoupons : redeemedCoupons;

  // Prevent hydration mismatch by not rendering until mounted
  if (!mounted) {
    return (
      <div className="space-y-6">
        <div className="h-20 animate-pulse rounded-lg bg-gray-200"></div>
        <div className="h-12 animate-pulse rounded-lg bg-gray-200"></div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="h-96 animate-pulse rounded-3xl bg-gray-200" />
          ))}
        </div>
      </div>
    );
  }

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
              {favouritesTotal}
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
              {redeemedTotal}
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
              <p className="text-2xl font-bold text-purple-900">{favouritesTotal}</p>
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
              <p className="text-2xl font-bold text-green-900">{redeemedTotal}</p>
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
      {(loading || (activeTab === "redeemed" && loadingRedeemed) || (activeTab === "favourites" && loadingFavourites)) ? (
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
                  isFavorited={activeTab === "favourites" ? true : (coupon.is_favorited ?? false)}
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

          {/* Pagination for favourites coupons */}
          {activeTab === "favourites" && favouritesTotalPages > 1 && (
            <div className="mt-8">
              <DataTablePagination
                page={favouritesPage}
                totalPages={favouritesTotalPages}
                perPage={favouritesPerPage}
                totalItems={favouritesTotal}
                currentPageLength={favouritedCoupons.length}
                onPageChange={handleFavouritesPageChange}
                onPerPageChange={handleFavouritesPerPageChange}
              />
            </div>
          )}

          {/* Pagination for redeemed coupons */}
          {activeTab === "redeemed" && redeemedTotalPages > 1 && (
            <div className="mt-8">
              <DataTablePagination
                page={redeemedPage}
                totalPages={redeemedTotalPages}
                perPage={redeemedPerPage}
                totalItems={redeemedTotal}
                currentPageLength={redeemedCoupons.length}
                onPageChange={handleRedeemedPageChange}
                onPerPageChange={handleRedeemedPerPageChange}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
}

