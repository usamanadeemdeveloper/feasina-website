"use server";

import { createClient } from "@/lib/supabase/client";
import type { ClientAddress } from "@/lib/supabase/types";

export interface PlaceOrderInput {
  fullName: string;
  email: string;
  phone?: string;
  address: ClientAddress;
  notes?: string;
  items: { productId: string; quantity: number }[];
}

export type PlaceOrderResult =
  | { ok: true; orderNumber: string; total: number }
  | { ok: false; error: string };

export async function placeOrder(input: PlaceOrderInput): Promise<PlaceOrderResult> {
  if (input.items.length === 0) {
    return { ok: false, error: "Your cart is empty." };
  }

  const supabase = createClient();
  const { data, error } = await supabase.rpc("place_order", {
    p_full_name: input.fullName,
    p_email: input.email,
    p_phone: input.phone || null,
    p_address: input.address,
    p_items: input.items.map((i) => ({ product_id: i.productId, quantity: i.quantity })),
    p_notes: input.notes || null,
  });

  if (error) {
    return { ok: false, error: error.message };
  }

  return { ok: true, orderNumber: data.order_number, total: data.total };
}
