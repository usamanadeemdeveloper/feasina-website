import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { WholesaleCatalogGrid } from "./WholesaleCatalogGrid";

export const metadata: Metadata = {
  title: "Wholesale catalog — Feasina",
};

export default async function WholesaleCatalogPage() {
  const supabase = await createClient();
  const { data, error } = await supabase.rpc("get_wholesale_catalog");

  if (error || !data) {
    return (
      <p className="rounded-xl border bg-white p-6 text-center text-sm text-red-600 shadow-sm">
        Couldn&apos;t load the catalog. Try refreshing the page.
      </p>
    );
  }

  const products = data
    .filter((p) => p.is_active && p.flavour_status !== "discontinued")
    .map((p) => ({
      productId: p.product_id,
      sku: p.sku,
      flavourName: p.flavour_name,
      packLabel: p.pack_label,
      sachetCount: p.sachet_count,
      price: p.price,
      inStock: p.quantity_on_hand > 0,
      badge: p.flavour_status === "coming_soon" ? "Coming Soon" : p.is_bestseller ? "Bestseller" : null,
    }));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Catalog</h1>
        <p className="mt-1 text-sm text-gray-600">Priced at your account&apos;s wholesale rate.</p>
      </div>
      <WholesaleCatalogGrid products={products} />
    </div>
  );
}
