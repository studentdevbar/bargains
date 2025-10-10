"use client";

import { RefreshCcw } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { DatePicker } from "@/components/ui/date-picker";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import * as React from "react";

type CategoryFilter = {
  id: number;
  name: string;
  coupons_count: number;
};

type TagFilter = {
  id: number;
  name: string;
};

type VendorFilter = {
  id: number;
  name: string;
};

export default function FiltersSidebar({
  categories,
  tags,
  vendors,
  filters,
  onChange,
  onReset,
}: {
  categories: CategoryFilter[];
  tags: TagFilter[];
  vendors: VendorFilter[];
  filters: {
    vendor_id?: number;
    category_id?: number;
    tag_ids?: number[];
    search?: string;
    per_page?: number;
  };
  onChange: (next: {
    vendor_id?: number;
    category_id?: number;
    tag_ids?: number[];
    search?: string;
    per_page?: number;
  }) => void;
  onReset?: () => void;
}) {
  const selectedTagIds = new Set((filters.tag_ids ?? []).map((n) => String(n)));
  const [searchText, setSearchText] = React.useState(filters.search ?? "");

  const handleVendorChange = (value: string) => {
    onChange({ vendor_id: value === "__clear__" ? undefined : Number(value) });
  };

  const handleCategoryChange = (value: string) => {
    onChange({ category_id: value === "__clear__" ? undefined : Number(value) });
  };

  const handleToggleTag = (id: number) => {
    const curr = new Set(filters.tag_ids ?? []);
    if (curr.has(id)) curr.delete(id); else curr.add(id);
    onChange({ tag_ids: Array.from(curr) });
  };

  const handleCategoryCheckboxChange = (catId: number, checked: boolean) => {
    if (checked) {
      onChange({ category_id: catId });
    } else {
      onChange({ category_id: undefined });
    }
  };

  const handleSearchEnter: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === "Enter") {
      const value = (e.target as HTMLInputElement).value.trim();
      onChange({ search: value || undefined });
    }
  };

  const handlePerPageChange = (value: string) => {
    onChange({ per_page: Number(value) });
  };

  const resetFilters = () => {
    if (onReset) onReset();
    else onChange({ vendor_id: undefined, category_id: undefined, tag_ids: [], search: undefined, per_page: undefined });
  };

  return (
    <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-gray-200/60">
      <h3 className="mb-4 text-base font-semibold text-gray-900">Filter</h3>
      <div className="space-y-4 text-sm text-gray-700">
        <input
          className="w-full rounded-lg border border-gray-300 px-3 py-2"
          placeholder="Type keyword..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          onKeyDown={handleSearchEnter}
        />
        <Select value={filters.vendor_id ? String(filters.vendor_id) : ""} onValueChange={handleVendorChange}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="All Stores" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="__clear__">All Stores</SelectItem>
            {vendors.map((vendor) => (
              <SelectItem key={vendor.id} value={String(vendor.id)}>
                {vendor.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <hr className="my-5 border-gray-200/80" />

      <div>
        <h4 className="mb-3 text-base font-semibold text-gray-900">
          Suggested Categories
        </h4>
        <ul className="space-y-3 text-gray-800">
          {categories.map((cat, index) => {
            const id = `cat-${index}`;
            const isChecked = filters.category_id === cat.id;
            return (
              <li key={cat.id} className="flex items-center justify-between">
                <div className="inline-flex items-center gap-3 text-sm">
                  <Checkbox
                    id={id}
                    checked={isChecked}
                    onCheckedChange={(checked) => handleCategoryCheckboxChange(cat.id, checked === true)}
                    className="size-4 border-gray-300 data-[state=checked]:bg-[var(--color-accent-main)] data-[state=checked]:border-[var(--color-accent-main)]"
                  />
                  <label htmlFor={id} className="cursor-pointer">{cat.name}</label>
                </div>
                <span className="text-sm text-gray-500">{cat.coupons_count}</span>
              </li>
            );
          })}
        </ul>
        <button className="mt-4 text-[var(--color-accent-main)] hover:underline">
          See All →
        </button>
      </div>

      <hr className="my-5 border-gray-200/80" />

      <div>
        <h4 className="mb-3 text-base font-semibold text-gray-900">Popular Tags</h4>
        <div className="flex flex-wrap gap-3">
          {tags.map((tag) => {
            const isActive = selectedTagIds.has(String(tag.id));
            return (
              <button
                key={tag.id}
                onClick={() => handleToggleTag(tag.id)}
                className={`rounded-full px-4 py-1.5 text-sm transition-colors ${
                  isActive
                    ? "border-[var(--color-accent-main)] bg-[var(--color-accent-main)] text-white"
                    : "border border-gray-300 text-gray-700 hover:bg-gray-50"
                }`}
              >
                {tag.name}
              </button>
            );
          })}
        </div>
        <button className="mt-4 text-[var(--color-accent-main)] hover:underline">
          More Tag →
        </button>
      </div>

      <div className="mt-6 border-t border-gray-200/80 pt-5">
        <button onClick={resetFilters} className="flex w-full items-center justify-center gap-2 rounded-full border border-gray-300 px-5 py-3 text-[var(--color-accent-main)] hover:bg-gray-50">
          <RefreshCcw className="size-4" />
          <span>Reset Filters</span>
        </button>
      </div>
    </div>
  );
}


