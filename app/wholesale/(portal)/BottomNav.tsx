"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Package, ShoppingCart, Receipt } from "lucide-react";
import { cn } from "@/lib/utils";
import { useWholesaleCartStore } from "@/lib/store/wholesale-cart-store";

const NAV_ITEMS = [
  { href: "/wholesale", label: "Home", icon: Home, exact: true },
  { href: "/wholesale/catalog", label: "Catalog", icon: Package, exact: false },
  { href: "/wholesale/checkout", label: "Cart", icon: ShoppingCart, exact: true, showCartBadge: true },
  { href: "/wholesale/statement", label: "Statement", icon: Receipt, exact: false },
];

// Fixed bottom tab bar, mobile-only (md:hidden) -- mirrors
// feasina-admin's components/admin/BottomNav.tsx, which is exactly the
// pattern that makes that app read as a native app instead of a shrunk
// website: icon + label per tab, active-state color, safe-area padding for
// the iPhone home indicator.
export function BottomNav() {
  const pathname = usePathname();
  const itemCount = useWholesaleCartStore((s) => s.items.reduce((sum, i) => sum + i.quantity, 0));

  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-50 flex border-t bg-white md:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      {NAV_ITEMS.map((item) => {
        const isActive = item.exact ? pathname === item.href : pathname.startsWith(item.href);
        const Icon = item.icon;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "relative flex flex-1 flex-col items-center gap-1 py-2 text-xs font-medium transition-colors",
              isActive ? "text-orange-600" : "text-gray-500",
            )}
          >
            <span className="relative">
              <Icon className="size-5" />
              {item.showCartBadge && itemCount > 0 && (
                <span className="absolute -right-2 -top-2 flex size-4 items-center justify-center rounded-full bg-orange-600 text-[10px] font-semibold text-white">
                  {itemCount > 9 ? "9+" : itemCount}
                </span>
              )}
            </span>
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
