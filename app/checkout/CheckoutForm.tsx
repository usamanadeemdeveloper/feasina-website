"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { useCartStore, cartSubtotal, type CartLine } from "@/lib/store/cart-store";
import { formatCurrency } from "@/lib/currency";
import { createClient } from "@/lib/supabase/client";
import { placeOrder } from "./actions";

const checkoutSchema = z.object({
  fullName: z.string().min(2, "Enter your full name"),
  email: z.string().email("Enter a valid email"),
  phone: z.string().optional(),
  line1: z.string().min(3, "Enter your street address"),
  line2: z.string().optional(),
  city: z.string().min(1, "City is required"),
  state: z.string().optional(),
  postalCode: z.string().optional(),
  country: z.string().min(1, "Country is required"),
  notes: z.string().optional(),
});

type CheckoutValues = z.infer<typeof checkoutSchema>;

function friendlyError(message: string, items: CartLine[]): string {
  const match = message.match(/product ([0-9a-f-]{36})/i);
  if (match) {
    const item = items.find((i) => i.productId === match[1]);
    if (item) {
      return `Sorry, "${item.flavourName} (${item.packLabel})" doesn't have enough stock for that quantity. Please adjust the quantity and try again.`;
    }
  }
  if (/not available/i.test(message)) {
    return "One of the items in your cart is no longer available. Please review your cart and try again.";
  }
  return message;
}

export function CheckoutForm() {
  const router = useRouter();
  const items = useCartStore((s) => s.items);
  const clear = useCartStore((s) => s.clear);
  const [confirmation, setConfirmation] = useState<{ orderNumber: string; total: number } | null>(
    null
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  // place_order() only discovers a stock shortfall when the RPC actually runs
  // (its decrement_stock_fefo trigger rejects the whole insert) -- that's the
  // authoritative check, but it only fires at submit time. This re-reads
  // current stock for whatever's already in the cart so a shortfall shows up
  // while reviewing the cart, not as a surprise after clicking "Place Order".
  const productIds = items.map((i) => i.productId).join(",");
  const [stockByProduct, setStockByProduct] = useState<Record<string, number> | null>(null);

  useEffect(() => {
    if (!productIds) {
      setStockByProduct(null);
      return;
    }
    const supabase = createClient();
    supabase
      .from("products_storefront")
      .select("product_id, quantity_on_hand")
      .in("product_id", productIds.split(","))
      .then(({ data }) => {
        const map: Record<string, number> = {};
        (data ?? []).forEach((row) => {
          map[row.product_id] = row.quantity_on_hand;
        });
        setStockByProduct(map);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productIds]);

  const stockShortfalls = new Map<string, number>();
  if (stockByProduct) {
    for (const item of items) {
      const available = stockByProduct[item.productId] ?? 0;
      if (available < item.quantity) {
        stockShortfalls.set(item.productId, available);
      }
    }
  }
  const hasStockIssues = stockShortfalls.size > 0;

  const form = useForm<CheckoutValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      line1: "",
      line2: "",
      city: "",
      state: "",
      postalCode: "",
      country: "",
      notes: "",
    },
  });

  async function onSubmit(values: CheckoutValues) {
    if (items.length === 0) {
      toast.error("Your cart is empty.");
      return;
    }
    if (hasStockIssues) {
      toast.error("Adjust the quantities flagged below before placing your order.");
      return;
    }

    setIsSubmitting(true);
    const result = await placeOrder({
      fullName: values.fullName,
      email: values.email,
      phone: values.phone,
      address: {
        line1: values.line1,
        line2: values.line2 || undefined,
        city: values.city,
        state: values.state || undefined,
        postal_code: values.postalCode || undefined,
        country: values.country,
      },
      notes: values.notes,
      items: items.map((i) => ({ productId: i.productId, quantity: i.quantity })),
    });
    setIsSubmitting(false);

    if (!result.ok) {
      toast.error(friendlyError(result.error, items));
      return;
    }

    setConfirmation({ orderNumber: result.orderNumber, total: result.total });
    clear();
  }

  // Confirmation is rendered inline rather than a separate route: orders/order_items
  // have no anon SELECT policy (by design, so strangers can't browse other
  // customers' orders by guessing IDs), so a route-based confirmation page would
  // need its own auth/token scheme for no real benefit over the RPC's own
  // return value.
  if (confirmation) {
    return (
      <div className="mx-auto max-w-md rounded-xl border bg-white p-8 text-center shadow-sm">
        <h2 className="mb-2 text-2xl font-bold text-gray-900">Order Confirmed!</h2>
        <p className="mb-4 text-gray-600">
          Thanks for your order. We&apos;ll be in touch shortly to arrange delivery.
        </p>
        <p className="mb-1 text-sm text-muted-foreground">Order number</p>
        <p className="mb-4 text-lg font-semibold">{confirmation.orderNumber}</p>
        <p className="mb-6 text-xl font-bold">{formatCurrency(confirmation.total)}</p>
        <Button
          className="cursor-pointer bg-orange-600 hover:bg-orange-700"
          onClick={() => router.push("/")}
        >
          Back to Home
        </Button>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-md rounded-xl border bg-white p-8 text-center shadow-sm">
        <p className="mb-4 text-gray-600">Your cart is empty.</p>
        <Button
          className="cursor-pointer bg-orange-600 hover:bg-orange-700"
          onClick={() => router.push("/#flavours")}
        >
          Browse Flavours
        </Button>
      </div>
    );
  }

  const subtotal = cartSubtotal(items);

  return (
    <div className="mx-auto grid max-w-4xl gap-8 md:grid-cols-2">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone</FormLabel>
                <FormControl>
                  <Input type="tel" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="line1"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Address line 1</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="line2"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Address line 2 (optional)</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>City</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="state"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>State / Province</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="postalCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Postal code</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="country"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Country</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="notes"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Order notes (optional)</FormLabel>
                <FormControl>
                  <Textarea {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            disabled={isSubmitting || hasStockIssues}
            className="w-full cursor-pointer bg-orange-600 hover:bg-orange-700"
          >
            {isSubmitting ? "Placing order..." : `Place Order — ${formatCurrency(subtotal)}`}
          </Button>
        </form>
      </Form>

      <div className="rounded-xl border bg-white p-6 shadow-sm">
        <h3 className="mb-4 text-lg font-semibold">Order Summary</h3>
        <div className="space-y-3">
          {items.map((item) => {
            const shortfall = stockShortfalls.get(item.productId);
            return (
              <div key={item.productId}>
                <div className="flex justify-between text-sm">
                  <span>
                    {item.flavourName} ({item.packLabel}) × {item.quantity}
                  </span>
                  <span className="font-medium">
                    {formatCurrency(item.unitPriceDisplay * item.quantity)}
                  </span>
                </div>
                {shortfall !== undefined && (
                  <p className="mt-0.5 text-xs font-medium text-red-600">
                    {shortfall === 0 ? "Out of stock" : `Only ${shortfall} left in stock`} -- reduce the
                    quantity in your cart to continue.
                  </p>
                )}
              </div>
            );
          })}
        </div>
        <div className="mt-4 flex justify-between border-t pt-4 font-semibold">
          <span>Subtotal</span>
          <span>{formatCurrency(subtotal)}</span>
        </div>
      </div>
    </div>
  );
}
