"use client";

import Image from "next/image";
import Link from "next/link";
import { Bell, Dot, Menu, Search } from "lucide-react";
import { useCallback } from "react";

export default function DashboardTopbar() {
  const toggleSidebar = useCallback(() => {
    window.dispatchEvent(new Event("sb:toggle-sidebar"));
  }, []);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-[var(--border)] bg-white">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        {/* Left: menu + brand + search */}
        <div className="flex min-w-0 flex-1 items-center gap-3">
          <button
            type="button"
            aria-label="Open sidebar"
            className="-ml-1 rounded-md p-2 text-muted-foreground hover:bg-muted md:hidden"
            onClick={toggleSidebar}
          >
            <Menu className="size-5" />
          </button>
          <Link href="/" className="flex shrink-0 items-center gap-2 md:gap-3">
            <Image src="/logo.png" alt="Student Bargains" width={96} height={96} />
          </Link>

          <form className="ml-2 hidden min-w-0 max-w-2xl mx-auto flex-1 items-center rounded-full bg-neutral-100 pl-4 pr-1 ring-1 ring-neutral-200 focus-within:ring-neutral-300 md:flex">
            <input
              className="w-full bg-transparent py-2.5 text-sm text-neutral-700 placeholder:text-neutral-400 outline-none"
              placeholder="Search..."
              type="search"
            />
            <button
              type="submit"
              aria-label="Search"
              className="grid size-9 place-items-center rounded-full bg-black text-white"
            >
              <Search className="size-4" />
            </button>
          </form>
        </div>

        {/* Middle: location + nav */}
        <div className="hidden items-center gap-8 md:flex">
          <nav className="hidden items-center gap-6 text-sm text-neutral-700 md:flex">
            <Link href="#" className="hover:text-black">Help & Center</Link>
          </nav>
        </div>

        {/* Right: actions */}
        <div className="flex shrink-0 items-center gap-3">
          <button
            type="button"
            aria-label="Notifications"
            className="rounded-full p-2 text-neutral-600 hover:bg-neutral-100"
          >
            <Bell className="size-5" />
          </button>
          <div className="flex items-center gap-2">
            <Image
              src="/images/avatar_1.png"
              alt="User avatar"
              width={32}
              height={32}
              className="rounded-full"
            />
          </div>
        </div>
      </div>
    </header>
  );
}


