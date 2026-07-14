"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useWholesaleCartStore } from "@/lib/store/wholesale-cart-store";
import { formatCurrency } from "@/lib/currency";

// Matches the retail site's own BADGE_STYLE convention
// (components/Feasina/FlavorCard.tsx) rather than shadcn Badge's
// variant="secondary" -- see OrderList.tsx for why that renders wrong here.
const PRODUCT_BADGE_CLASS: Record<string, string> = {
  Bestseller: "bg-orange-100 text-orange-700",
  "Coming Soon": "bg-blue-100 text-blue-700",
};

export interface WholesaleProduct {
  productId: string;
  sku: string;
  flavourName: string;
  packLabel: string;
  sachetCount: number;
  price: number;
  inStock: boolean;
  badge: string | null;
}

function ProductCard({ product }: { product: WholesaleProduct }) {
  const [quantity, setQuantity] = useState(1);
  const addItem = useWholesaleCartStore((s) => s.addItem);

  function handleAdd() {
    addItem(
      {
        productId: product.productId,
        sku: product.sku,
        flavourName: product.flavourName,
        packLabel: product.packLabel,
        unitPriceDisplay: product.price,
      },
      quantity,
    );
    toast.success(`Added ${quantity} × ${product.flavourName} (${product.packLabel}) to cart`);
    setQuantity(1);
  }

  return (
    <div className="flex flex-col rounded-xl border bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-2">
        <div>
          <h3 className="font-semibold text-gray-900">{product.flavourName}</h3>
          <p className="text-sm text-gray-500">
            {product.packLabel} · {product.sachetCount} sachets
          </p>
        </div>
        {product.badge && (
          <span
            className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${
              PRODUCT_BADGE_CLASS[product.badge] ?? "bg-gray-100 text-gray-700"
            }`}
          >
            {product.badge}
          </span>
        )}
      </div>
      <p className="mt-3 text-xl font-bold text-gray-900">{formatCurrency(product.price)}</p>
      {/* No out-of-stock gating here, unlike the retail catalog -- wholesale
          orders aren't fulfilled from existing finished-goods stock, they
          trigger production, so quantity_on_hand never blocks ordering. */}
      {!product.inStock && (
        <p className="mt-3 text-xs font-medium text-gray-500">Made to order.</p>
      )}
      <div className="mt-auto flex items-center gap-2 pt-4">
        <div className="flex items-center rounded-lg border">
          <button
            type="button"
            aria-label="Decrease quantity"
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            className="flex size-9 items-center justify-center text-gray-600 active:bg-gray-100"
          >
            <Minus className="size-4" />
          </button>
          <span className="w-8 text-center text-sm font-medium tabular-nums">{quantity}</span>
          <button
            type="button"
            aria-label="Increase quantity"
            onClick={() => setQuantity((q) => q + 1)}
            className="flex size-9 items-center justify-center text-gray-600 active:bg-gray-100"
          >
            <Plus className="size-4" />
          </button>
        </div>
        <Button onClick={handleAdd} className="flex-1 cursor-pointer bg-orange-600 hover:bg-orange-700">
          Add to cart
        </Button>
      </div>
    </div>
  );
}

export function WholesaleCatalogGrid({ products }: { products: WholesaleProduct[] }) {
  if (products.length === 0) {
    return (
      <p className="rounded-xl border bg-white p-6 text-center text-sm text-gray-500 shadow-sm">
        Nothing available right now. Check back soon.
      </p>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => (
        <ProductCard key={product.productId} product={product} />
      ))}
    </div>
  );
}
