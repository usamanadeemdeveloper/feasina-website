"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export interface PlaceWholesaleOrderInput {
  items: { productId: string; quantity: number }[];
  notes?: string;
}

export type PlaceWholesaleOrderResult =
  | { ok: true; orderNumber: string; total: number }
  | { ok: false; error: string };

// Uses the cookie-aware server client (lib/supabase/server.ts), not the
// bare anon client the retail checkout action uses -- place_wholesale_order()
// resolves the caller via auth.uid(), which only exists on a request that
// carries the signed-in session's cookies.
export async function placeWholesaleOrder(
  input: PlaceWholesaleOrderInput,
): Promise<PlaceWholesaleOrderResult> {
  if (input.items.length === 0) {
    return { ok: false, error: "Your cart is empty." };
  }

  const supabase = await createClient();
  const { data, error } = await supabase.rpc("place_wholesale_order", {
    p_items: input.items.map((i) => ({ product_id: i.productId, quantity: i.quantity })),
    p_notes: input.notes || null,
  });

  if (error) {
    return { ok: false, error: error.message };
  }

  // The dashboard's "Recent orders" list (app/wholesale/(portal)/page.tsx)
  // is server-fetched and cached by the router -- without this, navigating
  // back there via router.push (or the bottom nav, or browser back) would
  // show stale data missing the order just placed.
  revalidatePath("/wholesale");

  return { ok: true, orderNumber: data.order_number, total: data.total };
}
