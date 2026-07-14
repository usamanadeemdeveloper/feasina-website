import { create } from "zustand";
import { persist } from "zustand/middleware";

// Mirrors lib/store/cart-store.ts exactly, but kept as a fully separate
// store/localStorage key -- the retail guest cart and a signed-in wholesale
// client's cart are unrelated carts with different pricing, and mixing them
// would let a wholesale price leak into the anonymous retail flow (or vice
// versa) if someone had both tabs open.
export interface WholesaleCartLine {
  productId: string;
  sku: string;
  flavourName: string;
  packLabel: string;
  quantity: number;
  // Display-only. place_wholesale_order() always re-derives the
  // authoritative price server-side from client_product_prices/
  // products.wholesale_price -- this value is never sent or trusted as the
  // real charge.
  unitPriceDisplay: number;
}

interface WholesaleCartState {
  items: WholesaleCartLine[];
  addItem: (line: Omit<WholesaleCartLine, "quantity">, quantity: number) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  removeItem: (productId: string) => void;
  clear: () => void;
}

export const useWholesaleCartStore = create<WholesaleCartState>()(
  persist(
    (set) => ({
      items: [],
      addItem: (line, quantity) =>
        set((state) => {
          const existing = state.items.find((i) => i.productId === line.productId);
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.productId === line.productId ? { ...i, quantity: i.quantity + quantity } : i,
              ),
            };
          }
          return { items: [...state.items, { ...line, quantity }] };
        }),
      updateQuantity: (productId, quantity) =>
        set((state) => ({
          items:
            quantity <= 0
              ? state.items.filter((i) => i.productId !== productId)
              : state.items.map((i) => (i.productId === productId ? { ...i, quantity } : i)),
        })),
      removeItem: (productId) =>
        set((state) => ({ items: state.items.filter((i) => i.productId !== productId) })),
      clear: () => set({ items: [] }),
    }),
    { name: "feasina-wholesale-cart" },
  ),
);

export function wholesaleCartSubtotal(items: WholesaleCartLine[]): number {
  return items.reduce((sum, item) => sum + item.unitPriceDisplay * item.quantity, 0);
}

export function wholesaleCartCount(items: WholesaleCartLine[]): number {
  return items.reduce((sum, item) => sum + item.quantity, 0);
}
