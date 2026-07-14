import Link from "next/link";
import { BrandBackground } from "../BrandBackground";
import { SignOutButton } from "./SignOutButton";
import { BottomNav } from "./BottomNav";

const DESKTOP_NAV_LINKS = [
  { href: "/wholesale", label: "Dashboard" },
  { href: "/wholesale/catalog", label: "Catalog" },
  { href: "/wholesale/checkout", label: "Cart" },
  { href: "/wholesale/statement", label: "Statement" },
];

export default function WholesaleLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen">
      {/* Solid bg-white on header/BottomNav (not translucent) so the fruit
          background only shows through the main content area -- same intent
          as feasina-admin's AppShell comment on BrandBackground/DesktopSidebar. */}
      <BrandBackground fixed />
      <div className="relative z-10">
        <header
          className="sticky top-0 z-40 border-b bg-white"
          style={{ paddingTop: "env(safe-area-inset-top)" }}
        >
          <div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-3.5">
            <Link href="/wholesale" className="text-lg font-bold text-gray-900">
              Feasina <span className="text-orange-600">Wholesale</span>
            </Link>
            {/* Desktop only -- mobile navigates via the fixed BottomNav tab bar
                instead, same split as feasina-admin's DesktopSidebar/BottomNav. */}
            <nav className="hidden items-center gap-5 text-sm font-medium md:flex">
              {DESKTOP_NAV_LINKS.map((link) => (
                <Link key={link.href} href={link.href} className="text-gray-700 hover:text-orange-600">
                  {link.label}
                </Link>
              ))}
              <SignOutButton />
            </nav>
            <div className="md:hidden">
              <SignOutButton />
            </div>
          </div>
        </header>
        <main className="mx-auto max-w-4xl px-4 py-6 pb-[calc(5rem_+_env(safe-area-inset-bottom))] md:py-10 md:pb-10">
          {children}
        </main>
        <BottomNav />
      </div>
    </div>
  );
}
