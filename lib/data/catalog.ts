import { createClient } from "@/lib/supabase/client";
import type { FlavourStatus } from "@/lib/supabase/types";

export interface StorefrontPack {
  productId: string;
  sku: string;
  label: string;
  sachetCount: number;
  retailPrice: number;
  inStock: boolean;
}

export type FlavourBadge = {
  text: string;
  tone: "bestseller" | "coming-soon" | "out-of-stock";
} | null;

export interface StorefrontFlavour {
  id: string;
  slug: string;
  name: string;
  description: string | null;
  isBestseller: boolean;
  badge: FlavourBadge;
  packs: StorefrontPack[];
}

function deriveBadge(
  status: FlavourStatus,
  isBestseller: boolean,
  packs: StorefrontPack[]
): FlavourBadge {
  if (status === "coming_soon") {
    return { text: "Coming Soon", tone: "coming-soon" };
  }

  // Catches both an explicit admin flag and the case where every pack sold
  // under this flavour has simply run out, even if nobody flipped the flag.
  const allOutOfStock = packs.length === 0 || packs.every((p) => !p.inStock);
  if (status === "out_of_stock" || allOutOfStock) {
    return { text: "Temporarily Out of Stock", tone: "out-of-stock" };
  }

  if (isBestseller) {
    return { text: "Bestseller", tone: "bestseller" };
  }

  return null;
}

// Queries flavours and products_storefront separately (rather than only the
// view) so a flavour with zero orderable products still appears on the site
// with an "Out of Stock" badge instead of silently vanishing.
export async function getStorefrontCatalog(): Promise<StorefrontFlavour[]> {
  const supabase = createClient();

  const [{ data: flavours, error: flavoursError }, { data: products, error: productsError }] =
    await Promise.all([
      supabase
        .from("flavours")
        .select("id, name, slug, description, status, is_bestseller")
        .neq("status", "discontinued")
        .order("name"),
      supabase.from("products_storefront").select("*"),
    ]);

  if (flavoursError) throw flavoursError;
  if (productsError) throw productsError;

  return (flavours ?? []).map((flavour) => {
    const packs: StorefrontPack[] = (products ?? [])
      .filter((p) => p.flavour_id === flavour.id)
      .map((p) => ({
        productId: p.product_id,
        sku: p.sku,
        label: p.pack_label,
        sachetCount: p.sachet_count,
        retailPrice: p.retail_price,
        inStock: p.quantity_on_hand > 0,
      }));

    return {
      id: flavour.id,
      slug: flavour.slug,
      name: flavour.name,
      description: flavour.description,
      isBestseller: flavour.is_bestseller,
      badge: deriveBadge(flavour.status, flavour.is_bestseller, packs),
      packs,
    };
  });
}
