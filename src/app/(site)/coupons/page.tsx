"use client";

import PageBanner from "@/components/layout/PageBanner";
import CouponCard from "@/components/home/CouponCard";
import { getCouponsFilters } from "@/actions/coupons/filters";
import FiltersSidebar from "@/components/coupons/FiltersSidebar";
import { getAllCoupons } from "@/actions/coupons/get-all";
import CouponsPagination from "@/components/coupons/CouponsPagination";
import { useEffect, useState, useMemo } from "react";
import { CouponType } from "../../../../types";

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
  const [pagination, setPagination] = useState({
    current_page: 1,
    total: 0,
    last_page: 1,
  });

  const [coupons, setCoupons] = useState<CouponType[]>([]);
  

  // Fetch filters data on mount
  useEffect(() => {
    async function loadFilters() {
      try {
        const filtersResponse = await getCouponsFilters();
        const data =
          filtersResponse.success && filtersResponse.data
            ? (filtersResponse.data as {
                categories: {
                  id: number;
                  name: string;
                  coupons_count: number;
                }[];
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
    if (filters.tag_ids && filters.tag_ids.length)
      params.tag_ids = filters.tag_ids.join(",");
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
            ? couponsResponse.data
            : {};
        if (data) {
          setCoupons(data.data);
          setPagination({
            current_page: data.current_page,
            total: data.total,
            last_page: data.last_page,
          });
        }
      } finally {
        setLoading(false);
      }
    }
    fetchCoupons();
  }, [queryParams]);

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
                    : `Showing ${coupons.length} of ${pagination.total} results`}
                </p>
                <div className="inline-flex items-center gap-2">
                  <span>Sort by:</span>
                  <select
                    className="rounded-lg border border-gray-300 px-3 py-1.5"
                    disabled
                  >
                    <option>Newest</option>
                    <option>Popular</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {coupons.map((c) => (
                  <CouponCard
                    key={c.id}
                    className="!h-32"
                    imageBgClass="bg-[#F3F4F6]"
                    coupon={c}
                  />
                ))}
              </div>

              {pagination.last_page > 1 && (
                <div className="mt-8">
                  <CouponsPagination
                    page={pagination.current_page}
                    totalPages={pagination.last_page}
                    perPage={filters.per_page || 15}
                    totalItems={pagination.total}
                    currentPageLength={coupons.length}
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
