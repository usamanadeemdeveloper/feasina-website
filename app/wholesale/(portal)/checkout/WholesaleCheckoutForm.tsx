"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Minus, Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  useWholesaleCartStore,
  wholesaleCartSubtotal,
  type WholesaleCartLine,
} from "@/lib/store/wholesale-cart-store";
import { placeWholesaleOrder } from "./actions";
import { formatCurrency } from "@/lib/currency";

function friendlyError(message: string, items: WholesaleCartLine[]): string {
  const match = message.match(/product ([0-9a-f-]{36})/i);
  if (match) {
    const item = items.find((i) => i.productId === match[1]);
    if (item) {
      return `"${item.flavourName} (${item.packLabel})" doesn't have enough stock for that quantity. Adjust the quantity and try again.`;
    }
  }
  if (/not available/i.test(message)) {
    return "One of the items in your cart is no longer available. Review your cart and try again.";
  }
  if (/not a wholesale account/i.test(message)) {
    return "Your account isn't set up for wholesale ordering. Contact us for help.";
  }
  return message;
}

export function WholesaleCheckoutForm() {
  const router = useRouter();
  const items = useWholesaleCartStore((s) => s.items);
  const updateQuantity = useWholesaleCartStore((s) => s.updateQuantity);
  const removeItem = useWholesaleCartStore((s) => s.removeItem);
  const clear = useWholesaleCartStore((s) => s.clear);
  const [notes, setNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmation, setConfirmation] = useState<{ orderNumber: string; total: number } | null>(null);

  async function handleSubmit() {
    setIsSubmitting(true);
    const result = await placeWholesaleOrder({
      items: items.map((i) => ({ productId: i.productId, quantity: i.quantity })),
      notes,
    });
    setIsSubmitting(false);

    if (!result.ok) {
      toast.error(friendlyError(result.error, items));
      return;
    }

    setConfirmation({ orderNumber: result.orderNumber, total: result.total });
    clear();
  }

  if (confirmation) {
    return (
      <div className="mx-auto max-w-md rounded-xl border bg-white p-8 text-center shadow-sm">
        <h2 className="mb-2 text-2xl font-bold text-gray-900">Order placed</h2>
        <p className="mb-4 text-gray-600">
          We&apos;ll confirm this order and charge it to your account shortly.
        </p>
        <p className="mb-1 text-sm text-muted-foreground">Order number</p>
        <p className="mb-4 text-lg font-semibold">{confirmation.orderNumber}</p>
        <p className="mb-6 text-xl font-bold">{formatCurrency(confirmation.total)}</p>
        <Button
          className="cursor-pointer bg-orange-600 hover:bg-orange-700"
          onClick={() => router.push("/wholesale")}
        >
          Back to dashboard
        </Button>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-md rounded-xl border bg-white p-8 text-center shadow-sm">
        <p className="mb-4 text-gray-600">Your cart is empty.</p>
        <Button asChild className="cursor-pointer bg-orange-600 hover:bg-orange-700">
          <Link href="/wholesale/catalog">Browse catalog</Link>
        </Button>
      </div>
    );
  }

  const subtotal = wholesaleCartSubtotal(items);

  return (
    <div className="grid gap-8 md:grid-cols-2">
      <div className="rounded-xl border bg-white p-6 shadow-sm">
        <h3 className="mb-4 text-lg font-semibold">Order summary</h3>
        <div className="space-y-2.5">
          {items.map((item) => (
            <div key={item.productId} className="rounded-lg border p-3">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="text-sm font-medium">
                    {item.flavourName} ({item.packLabel})
                  </p>
                  <p className="text-xs text-gray-500">{formatCurrency(item.unitPriceDisplay)} each</p>
                </div>
                <button
                  type="button"
                  onClick={() => removeItem(item.productId)}
                  className="shrink-0 p-1 text-gray-400 hover:text-red-600"
                  aria-label={`Remove ${item.flavourName}`}
                >
                  <X className="size-4" />
                </button>
              </div>
              <div className="mt-2.5 flex items-center justify-between">
                <div className="flex items-center rounded-lg border">
                  <button
                    type="button"
                    aria-label="Decrease quantity"
                    onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                    className="flex size-8 items-center justify-center text-gray-600 active:bg-gray-100"
                  >
                    <Minus className="size-3.5" />
                  </button>
                  <span className="w-7 text-center text-sm font-medium tabular-nums">{item.quantity}</span>
                  <button
                    type="button"
                    aria-label="Increase quantity"
                    onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                    className="flex size-8 items-center justify-center text-gray-600 active:bg-gray-100"
                  >
                    <Plus className="size-3.5" />
                  </button>
                </div>
                <span className="font-semibold">
                  {formatCurrency(item.unitPriceDisplay * item.quantity)}
                </span>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 flex justify-between border-t pt-4 font-semibold">
          <span>Subtotal</span>
          <span>{formatCurrency(subtotal)}</span>
        </div>
      </div>

      <div className="space-y-4">
        <div className="rounded-xl border bg-white p-6 shadow-sm">
          <label htmlFor="notes" className="mb-2 block text-sm font-medium text-gray-900">
            Order notes (optional)
          </label>
          <Textarea
            id="notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Delivery instructions, PO number, etc."
          />
        </div>
        <Button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="w-full cursor-pointer bg-orange-600 hover:bg-orange-700"
        >
          {isSubmitting ? "Placing order..." : `Place order — ${formatCurrency(subtotal)}`}
        </Button>
      </div>
    </div>
  );
}
