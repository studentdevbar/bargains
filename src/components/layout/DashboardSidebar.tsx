"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  TicketPercent,
  ShoppingBag,
  Settings,
  HelpCircle,
  LogOut,
  X,
} from "lucide-react";
import { useAuthStore } from "@/stores/auth-store";
import { deleteSession } from "@/actions/helpers/session";

type NavItem = {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
};

export default function DashboardSidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const { user } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    const onToggle = () => setOpen((v) => !v);
    window.addEventListener("sb:toggle-sidebar", onToggle);
    return () => window.removeEventListener("sb:toggle-sidebar", onToggle);
  }, []);

  // Close mobile drawer on route change
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const items: NavItem[] = useMemo(
    () => [
      { label: "Profile", href: "/student/dashboard", icon: LayoutDashboard },
      { label: "Coupons", href: "/student/coupons", icon: TicketPercent },
      { label: "Settings", href: "/student/settings", icon: Settings },
    ],
    []
  );

  const logoutHandler = () => {
    deleteSession();
    router.push("/login");
  };

  const renderNav = (onNavigate?: () => void) => (
    <nav className="mt-8 flex flex-1 flex-col gap-1">
      {items.map((item) => {
        const isActive = pathname?.startsWith(item.href);
        const Icon = item.icon;
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onNavigate}
            className={`group flex items-center gap-3 rounded-md px-4 py-2.5 text-sm transition-colors ${
              isActive
                ? "bg-white text-black ring-1 ring-neutral-200"
                : "text-neutral-900 hover:bg-white/80"
            }`}
          >
            <Icon className="size-4 shrink-0" />
            <span className="truncate">{item.label}</span>
          </Link>
        );
      })}
      <div className="mt-auto pt-2">
        <button
          onClick={logoutHandler}
          className="flex w-full items-center gap-3 rounded-md px-4 py-2.5 text-left text-sm text-neutral-900 hover:bg-white/80"
          type="button"
        >
          <LogOut className="size-4" />
          <span>Logout</span>
        </button>
      </div>
    </nav>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="sticky top-16 hidden h-[calc(100dvh-4rem)] p-6 w-72 shrink-0 rounded-lg bg-[#F4E7D8] md:flex md:flex-col">
        <div className="flex flex-col items-center gap-3 px-6 pt-8">
          <div className="grid size-20 place-items-center overflow-hidden rounded-full bg-white ring-1 ring-neutral-200">
            <Image src="/images/avatar_1.png" alt="User" width={80} height={80} />
          </div>
          <div className="text-center">
            <p className="text-base font-semibold text-neutral-900">{user?.name}</p>
            <p className="text-xs text-neutral-600">{user?.email}</p>
          </div>
        </div>
        {renderNav()}
      </aside>

      {/* Mobile overlay drawer */}
      {open && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setOpen(false)}
          />
          <div className="absolute inset-y-0 left-0 flex w-72 flex-col border-r border-neutral-200 bg-[#F4E7D8] p-3">
            <div className="flex items-center justify-between px-1 py-2">
              <div className="flex items-center gap-2">
                <Image src="/logo.png" alt="Student Bargains" width={24} height={24} />
              </div>
              <button
                aria-label="Close sidebar"
                className="rounded-md p-2 text-neutral-900 hover:bg-white/60"
                onClick={() => setOpen(false)}
              >
                <X className="size-5" />
              </button>
            </div>
            {renderNav(() => setOpen(false))}
          </div>
        </div>
      )}
    </>
  );
}


