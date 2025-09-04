import Link from "next/link";
import { Facebook, Instagram, Twitter } from "lucide-react";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="w-full border-t border-gray-200/60 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-4">
          {/* Brand */}
          <div>
            <Link href="/" className="shrink-0">
              <Image
                src="/logo.png"
                alt="Student Bargains"
                width={100}
                height={100}
              />
            </Link>
            <p className="mt-3 max-w-xs text-sm text-gray-600">
              Save money with verified student-only discounts across top brands.
            </p>
          </div>

          {/* Navigation groups */}
          <div>
            <h4 className="text-sm font-semibold text-gray-900">Company</h4>
            <ul className="mt-3 space-y-2 text-sm text-gray-600">
              <li>
                <Link href="/about" className="hover:text-gray-900">
                  About
                </Link>
              </li>
              <li>
                <Link href="/brands" className="hover:text-gray-900">
                  Brands
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-gray-900">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-gray-900">Resources</h4>
            <ul className="mt-3 space-y-2 text-sm text-gray-600">
              <li>
                <Link href="#" className="hover:text-gray-900">
                  How it works
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-gray-900">
                  FAQs
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-gray-900">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-gray-900">Follow</h4>
            <div className="mt-3 flex items-center gap-3 text-gray-600">
              <Link
                aria-label="Twitter"
                href="#"
                className="rounded-full p-2 hover:bg-gray-100"
              >
                <Twitter className="size-5" />
              </Link>
              <Link
                aria-label="Instagram"
                href="#"
                className="rounded-full p-2 hover:bg-gray-100"
              >
                <Instagram className="size-5" />
              </Link>
              <Link
                aria-label="Facebook"
                href="#"
                className="rounded-full p-2 hover:bg-gray-100"
              >
                <Facebook className="size-5" />
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-gray-200/60 pt-6 text-sm text-gray-600">
          <p>
            © {new Date().getFullYear()} Student Bargains. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
