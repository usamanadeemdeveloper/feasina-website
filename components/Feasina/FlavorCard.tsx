"use client";

import { useState } from "react";
import { ShoppingCart } from "lucide-react";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "../ui/sheet";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
} from "../ui/drawer";
import { PackPicker } from "./PackPicker";
import type { StorefrontFlavour } from "@/lib/data/catalog";
import type { FlavourTheme } from "@/lib/flavor-theme";

const BADGE_STYLE: Record<
  NonNullable<StorefrontFlavour["badge"]>["tone"],
  string
> = {
  bestseller: "bg-white/20",
  "coming-soon": "bg-blue-100 text-blue-700",
  "out-of-stock": "bg-red-100 text-red-600",
};

export function FlavorCard({
  flavour,
  theme,
}: {
  flavour: StorefrontFlavour;
  theme: FlavourTheme;
}) {
  const [open, setOpen] = useState(false);
  const isMobile = useIsMobile();
  const canOrder = flavour.packs.some((p) => p.inStock);

  const card = (
    <Card
      className={`
    relative
    h-full
    cursor-pointer
    border-0
    shadow-xl transition-all duration-300
    hover:-translate-y-2 hover:shadow-2xl
    ${theme.borderStyle ?? ""}
    ${theme.bgGradient.startsWith("from-") ? `bg-linear-to-br ${theme.bgGradient}` : theme.bgGradient}
  `}
    >
      <Button
        type="button"
        variant="ghost"
        size="icon"
        disabled={!canOrder}
        aria-label={
          canOrder
            ? `Add ${flavour.name} to cart`
            : `${flavour.name} unavailable`
        }
        onClick={() => setOpen(true)}
        className={`absolute top-4 right-4 cursor-pointer rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm disabled:cursor-not-allowed disabled:opacity-50 ${theme.textColor}`}
      >
        <ShoppingCart className="size-5" />
      </Button>
      <CardContent
        className={`p-8 text-center ${theme.textColor} flex h-full flex-col justify-between`}
      >
        <div>
          <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6 backdrop-blur-sm">
            <span className="text-4xl">{theme.emoji}</span>
          </div>
          <h3 className="text-2xl font-bold mb-4">{flavour.name}</h3>
          <p className="line-clamp-2 leading-relaxed mb-4">
            {flavour.description}
          </p>
        </div>
        {flavour.badge && (
          <div
            className={`rounded-full px-4 py-2 text-sm font-semibold backdrop-blur-sm ${BADGE_STYLE[flavour.badge.tone]}`}
          >
            {flavour.badge.text}
          </div>
        )}
      </CardContent>
    </Card>
  );

  return (
    <>
      {card}
      {isMobile ? (
        <Drawer open={open} onOpenChange={setOpen}>
          <DrawerContent>
            <DrawerHeader className="text-center">
              <div
                className={`mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-linear-to-br ${
                  theme.bgGradient
                } shadow-lg`}
              >
                <span className="text-4xl">{theme.emoji}</span>
              </div>

              <DrawerTitle className="text-2xl">{flavour.name}</DrawerTitle>

              <DrawerDescription className="mx-auto max-w-sm text-base leading-relaxed">
                {flavour.description}
              </DrawerDescription>
            </DrawerHeader>
            <PackPicker flavour={flavour} onDone={() => setOpen(false)} />
          </DrawerContent>
        </Drawer>
      ) : (
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetContent>
            <SheetHeader className="text-center">
              <div
                className={`mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-linear-to-br ${
                  theme.bgGradient
                } shadow-lg`}
              >
                <span className="text-4xl">{theme.emoji}</span>
              </div>

              <SheetTitle className="text-2xl">{flavour.name}</SheetTitle>

              <SheetDescription className="mx-auto max-w-sm text-base leading-relaxed">
                {flavour.description}
              </SheetDescription>
            </SheetHeader>
            <PackPicker flavour={flavour} onDone={() => setOpen(false)} />
          </SheetContent>
        </Sheet>
      )}
    </>
  );
}
