"use client";

import { useState } from "react";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "../ui/sheet";
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

const BADGE_STYLE: Record<NonNullable<StorefrontFlavour["badge"]>["tone"], string> = {
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
  const heightClass = flavour.isBestseller ? "h-80" : "";
  const canOrder = flavour.packs.some((p) => p.inStock);

  const card = (
    <Card
      className={`
        border-0
        shadow-xl hover:shadow-2xl transition-all duration-300
        hover:-translate-y-2
        ${theme.borderStyle ?? ""}
        ${theme.bgGradient.startsWith("from-") ? `bg-gradient-to-br ${theme.bgGradient}` : theme.bgGradient}
      `}
    >
      <CardContent
        className={`p-8 text-center ${theme.textColor} ${heightClass} flex flex-col justify-between`}
      >
        <div>
          <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6 backdrop-blur-sm">
            <span className="text-4xl">{theme.emoji}</span>
          </div>
          <h3 className="text-2xl font-bold mb-4">{flavour.name}</h3>
          <p className="leading-relaxed mb-4">{flavour.description}</p>
        </div>
        <div className="space-y-3">
          {flavour.badge && (
            <div
              className={`rounded-full px-4 py-2 text-sm font-semibold backdrop-blur-sm ${BADGE_STYLE[flavour.badge.tone]}`}
            >
              {flavour.badge.text}
            </div>
          )}
          <Button
            type="button"
            disabled={!canOrder}
            onClick={() => setOpen(true)}
            className="w-full cursor-pointer bg-white/20 hover:bg-white/30 backdrop-blur-sm disabled:cursor-not-allowed"
          >
            {canOrder ? "Add to Cart" : "Unavailable"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <>
      {card}
      {isMobile ? (
        <Drawer open={open} onOpenChange={setOpen}>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>{flavour.name}</DrawerTitle>
              <DrawerDescription>Choose a pack size and quantity</DrawerDescription>
            </DrawerHeader>
            <PackPicker flavour={flavour} onDone={() => setOpen(false)} />
          </DrawerContent>
        </Drawer>
      ) : (
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>{flavour.name}</SheetTitle>
              <SheetDescription>Choose a pack size and quantity</SheetDescription>
            </SheetHeader>
            <PackPicker flavour={flavour} onDone={() => setOpen(false)} />
          </SheetContent>
        </Sheet>
      )}
    </>
  );
}
