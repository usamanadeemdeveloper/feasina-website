"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Minus, Plus } from "lucide-react";
import { Button } from "../ui/button";
import { useCartStore } from "@/lib/store/cart-store";
import { formatCurrency } from "@/lib/currency";
import type { StorefrontFlavour } from "@/lib/data/catalog";

export function PackPicker({
  flavour,
  onDone,
}: {
  flavour: StorefrontFlavour;
  onDone: () => void;
}) {
  const addItem = useCartStore((s) => s.addItem);
  const [quantities, setQuantities] = useState<Record<string, number>>({});

  if (flavour.packs.length === 0) {
    return (
      <p className="px-4 pb-4 text-sm text-muted-foreground">
        No pack sizes available right now.
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-4 px-4 pb-4">
      {flavour.packs.map((pack) => {
        const qty = quantities[pack.productId] ?? 1;
        return (
          <div key={pack.productId} className="flex flex-col gap-3 rounded-lg border p-4">
            <div className="flex items-start justify-between gap-2">
              <div>
                <p className="font-medium">{pack.label}</p>
                <p className="text-sm text-muted-foreground">
                  {pack.sachetCount} sachet{pack.sachetCount > 1 ? "s" : ""} &middot;{" "}
                  {formatCurrency(pack.retailPrice)}
                </p>
              </div>
              {!pack.inStock && (
                <span className="shrink-0 text-xs font-medium text-red-600">Out of stock</span>
              )}
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  disabled={!pack.inStock || qty <= 1}
                  onClick={() =>
                    setQuantities((q) => ({ ...q, [pack.productId]: Math.max(1, qty - 1) }))
                  }
                >
                  <Minus className="size-4" />
                </Button>
                <span className="w-6 text-center">{qty}</span>
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  disabled={!pack.inStock}
                  onClick={() => setQuantities((q) => ({ ...q, [pack.productId]: qty + 1 }))}
                >
                  <Plus className="size-4" />
                </Button>
              </div>
              <Button
                type="button"
                className="flex-1 cursor-pointer"
                disabled={!pack.inStock}
                onClick={() => {
                  addItem(
                    {
                      productId: pack.productId,
                      sku: pack.sku,
                      flavourName: flavour.name,
                      packLabel: pack.label,
                      unitPriceDisplay: pack.retailPrice,
                    },
                    qty
                  );
                  toast.success(`Added ${qty} × ${flavour.name} (${pack.label}) to cart`);
                  onDone();
                }}
              >
                Add to Cart
              </Button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
