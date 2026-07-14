"use client";

import { useState } from "react";
import Link from "next/link";
import { ShoppingCart, Minus, Plus, X } from "lucide-react";
import { Button } from "../ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from "../ui/drawer";
import { useCartStore, cartCount, cartSubtotal } from "@/lib/store/cart-store";
import { formatCurrency } from "@/lib/currency";

export function CartButton() {
  const [open, setOpen] = useState(false);
  const isMobile = useIsMobile();
  const items = useCartStore((s) => s.items);
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const removeItem = useCartStore((s) => s.removeItem);
  const count = cartCount(items);
  const subtotal = cartSubtotal(items);

  const body = (
    <div className="flex flex-1 flex-col gap-3 overflow-y-auto px-4 pb-4">
      {items.length === 0 ? (
        <p className="text-sm text-muted-foreground">Your cart is empty.</p>
      ) : (
        items.map((item) => (
          <div
            key={item.productId}
            className="flex items-center justify-between gap-3 rounded-lg border p-3"
          >
            <div className="flex-1">
              <p className="font-medium">{item.flavourName}</p>
              <p className="text-sm text-muted-foreground">
                {item.packLabel} &middot; {formatCurrency(item.unitPriceDisplay)} each
              </p>
              <div className="mt-2 flex items-center gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                >
                  <Minus className="size-4" />
                </Button>
                <span className="w-6 text-center">{item.quantity}</span>
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                >
                  <Plus className="size-4" />
                </Button>
              </div>
            </div>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => removeItem(item.productId)}
            >
              <X className="size-4" />
            </Button>
          </div>
        ))
      )}
    </div>
  );

  const footer = items.length > 0 && (
    <div className="flex flex-col gap-3 border-t p-4">
      <div className="flex items-center justify-between font-semibold">
        <span>Subtotal</span>
        <span>{formatCurrency(subtotal)}</span>
      </div>
      <Button
        asChild
        className="w-full cursor-pointer bg-orange-600 hover:bg-orange-700"
        onClick={() => setOpen(false)}
      >
        <Link href="/checkout">Checkout</Link>
      </Button>
    </div>
  );

  return (
    <>
      <Button
        type="button"
        variant="outline"
        size="icon"
        className="relative cursor-pointer"
        onClick={() => setOpen(true)}
      >
        <ShoppingCart className="size-5" />
        {count > 0 && (
          <span className="absolute -top-1.5 -right-1.5 flex size-5 items-center justify-center rounded-full bg-orange-600 text-xs font-semibold text-white">
            {count}
          </span>
        )}
      </Button>
      {isMobile ? (
        <Drawer open={open} onOpenChange={setOpen}>
          <DrawerContent className="flex max-h-[85vh] flex-col">
            <DrawerHeader>
              <DrawerTitle>Your Cart</DrawerTitle>
            </DrawerHeader>
            {body}
            {footer}
          </DrawerContent>
        </Drawer>
      ) : (
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetContent className="flex flex-col">
            <SheetHeader>
              <SheetTitle>Your Cart</SheetTitle>
            </SheetHeader>
            {body}
            {footer}
          </SheetContent>
        </Sheet>
      )}
    </>
  );
}
