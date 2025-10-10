"use client";

import PageBanner from "@/components/layout/PageBanner";
import CouponCard from "@/components/home/CouponCard";
import { getCouponsFilters } from "@/actions/coupons/filters";
import FiltersSidebar from "@/components/coupons/FiltersSidebar";
import { getAllCoupons } from "@/actions/coupons/get-all";
import CouponsPagination from "@/components/coupons/CouponsPagination";
import { useEffect, useState, useMemo } from "react";

type FiltersType = {
  vendor_id?: number;
  category_id?: number;
  tag_ids?: number[];
  search?: string;
  per_page?: number;
  page?: number;
};

export default function CouponsPage() {
  const [filters, setFilters] = useState<FiltersType>({
    per_page: 15,
    page: 1,
    tag_ids: [],
  });
  const [loading, setLoading] = useState(false);
  const [loadingFilters, setLoadingFilters] = useState(true);
  const [filtersData, setFiltersData] = useState<{
    categories: { id: number; name: string; coupons_count: number }[];
    tags: { id: number; name: string }[];
    vendors: { id: number; name: string }[];
  }>({ categories: [], tags: [], vendors: [] });

  const [couponsData, setCouponsData] = useState<{
    current_page: number;
    data: Array<{
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
    }>;
    total: number;
    last_page: number;
  }>({
    current_page: 1,
    data: [],
    total: 0,
    last_page: 1,
  });

  // Fetch filters data on mount
  useEffect(() => {
    async function loadFilters() {
      try {
        const filtersResponse = await getCouponsFilters();
        const data =
          filtersResponse.success && filtersResponse.data
            ? (filtersResponse.data as {
                categories: { id: number; name: string; coupons_count: number }[];
                tags: { id: number; name: string }[];
                vendors: { id: number; name: string }[];
              })
            : { categories: [], tags: [], vendors: [] };
        setFiltersData(data);
      } finally {
        setLoadingFilters(false);
      }
    }
    loadFilters();
  }, []);

  // Build query params
  const queryParams = useMemo(() => {
    const params: Record<string, string> = {};
    if (filters.vendor_id) params.vendor_id = String(filters.vendor_id);
    if (filters.category_id) params.category_id = String(filters.category_id);
    if (filters.search) params.search = filters.search;
    if (filters.per_page) params.per_page = String(filters.per_page);
    if (filters.page) params.page = String(filters.page);
    if (filters.tag_ids && filters.tag_ids.length) params.tag_ids = filters.tag_ids.join(",");
    return params;
  }, [filters]);

  // Fetch coupons when filters change
  useEffect(() => {
    async function fetchCoupons() {
      setLoading(true);
      try {
        const couponsResponse = await getAllCoupons(queryParams);
        const data =
          couponsResponse.success && couponsResponse.data
            ? (couponsResponse.data as {
                current_page: number;
                data: Array<{
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
                }>;
                total: number;
                last_page: number;
              })
            : { current_page: 1, data: [], total: 0, last_page: 1 };
        setCouponsData(data);
      } finally {
        setLoading(false);
      }
    }
    fetchCoupons();
  }, [queryParams]);

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

  const handleFilterChange = (next: FiltersType) => {
    setFilters((prev) => ({ ...prev, ...next, page: 1 }));
  };

  const handleReset = () => {
    setFilters({ per_page: 15, page: 1, tag_ids: [] });
  };

  const handlePageChange = (page: number) => {
    setFilters((prev) => ({ ...prev, page }));
  };

  const handlePerPageChange = (perPage: number) => {
    setFilters((prev) => ({ ...prev, per_page: perPage, page: 1 }));
  };

  return (
    <main>
      <PageBanner
        title="All Coupons"
        description="Browse all our coupons here"
        breadcrumbs={[
          { label: "Browse Coupons", href: "/" },
          { label: "All Coupons" },
        ]}
      />

      <section className="bg-[#F5F7FB] py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
            <aside className="hidden lg:col-span-3 lg:block">
              {loadingFilters ? (
                <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-gray-200/60 animate-pulse">
                  <div className="h-6 bg-gray-200 rounded w-20 mb-4"></div>
                  <div className="space-y-4">
                    <div className="h-10 bg-gray-200 rounded"></div>
                    <div className="h-10 bg-gray-200 rounded"></div>
                    <div className="h-10 bg-gray-200 rounded"></div>
                  </div>
                </div>
              ) : (
                <FiltersSidebar
                  filters={filters}
                  categories={filtersData.categories}
                  tags={filtersData.tags}
                  vendors={filtersData.vendors}
                  onChange={handleFilterChange}
                  onReset={handleReset}
                />
              )}
            </aside>

            <div className="lg:col-span-9">
              <div className="mb-4 flex items-center justify-between text-sm text-gray-600">
                <p>
                  {loading
                    ? "Loading..."
                    : `Showing ${couponsData.data.length} of ${couponsData.total} results`}
                </p>
                <div className="inline-flex items-center gap-2">
                  <span>Sort by:</span>
                  <select className="rounded-lg border border-gray-300 px-3 py-1.5" disabled>
                    <option>Newest</option>
                    <option>Popular</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {couponsData.data.map((c) => (
                  <CouponCard
                    key={c.id}
                    className="!h-32"
                    id={c.id}
                    imageSrc={c.photo_cover || ""}
                    imageAlt={c.vendor}
                    imageBgClass="bg-[#F3F4F6]"
                    title={c.title}
                    isExclusive={c.is_exclusive}
                    expiryDateLabel={formatExpiry(c.expires_at)}
                    likes={c.uses}
                    shares={c.shares_count}
                    buttonLabel={c.type === "code" ? "Show Code" : "Get Deal"}
                    couponCode={c.type === "code" ? "••••••" : undefined}
                    couponUrl={c.type === "link" ? "/coupons/" + c.id : undefined}
                  />
                ))}
              </div>

              {couponsData.last_page > 1 && (
                <div className="mt-8">
                  <CouponsPagination
                    page={couponsData.current_page}
                    totalPages={couponsData.last_page}
                    perPage={filters.per_page || 15}
                    totalItems={couponsData.total}
                    currentPageLength={couponsData.data.length}
                    onPageChange={handlePageChange}
                    onPerPageChange={handlePerPageChange}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
