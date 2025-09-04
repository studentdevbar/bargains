import { Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header className="w-full border-b border-purple-200/40">
      {/* Top bar */}
      <div className="bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <Link href="/" className="shrink-0">
            <Image
              src="/logo.png"
              alt="Student Bargains"
              width={150}
              height={150}
            />
          </Link>

          {/* Search */}
          <form className="hidden w-full max-w-2xl items-center rounded-full bg-gray-100 pl-5 pr-1 ring-1 ring-gray-200/70 focus-within:ring-accent-main sm:flex">
            <input
              type="search"
              placeholder="Search anything here..."
              className="w-full bg-transparent py-3 text-sm text-gray-700 placeholder-gray-400 outline-none"
            />
            <div>
              <button
                type="submit"
                aria-label="Search"
                className="grid size-10 place-items-center rounded-full bg-secondary-main text-white hover:bg-accent-dark"
              >
                {/* Search icon */}
                <Search />
              </button>
            </div>
          </form>

          {/* Auth actions */}
          <div className="flex items-center gap-4">
            <Link href="/login" className="text-accent-main hover:underline">
              Sign In
            </Link>
            <Link
              href="/signup"
              className="rounded-full bg-accent-main px-5 py-2.5 text-white hover:bg-accent-dark"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>

      {/* Navigation bar */}
      <nav className="bg-accent-dark text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ul className="flex items-center gap-8 py-4 text-sm">
            <li>
              <Link href="/" className="hover:underline">
                Home
              </Link>
            </li>
            <li>
              <button className="inline-flex items-center gap-1 hover:underline">
                <span>Categories</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="size-4"
                >
                  <path d="M6.75 9l5.25 5.25L17.25 9h-10.5z" />
                </svg>
              </button>
            </li>
            <li>
              <Link href="/about" className="hover:underline">
                About us
              </Link>
            </li>
            <li>
              <Link href="/brands" className="hover:underline">
                Brands
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:underline">
                Contact Us
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}
