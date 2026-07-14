import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface CartLine {
  productId: string;
  sku: string;
  flavourName: string;
  packLabel: string;
  quantity: number;
  // Display-only. place_order() always re-derives the authoritative price
  // server-side -- this value is never sent or trusted as the real charge.
  unitPriceDisplay: number;
}

interface CartState {
  items: CartLine[];
  addItem: (line: Omit<CartLine, "quantity">, quantity: number) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  removeItem: (productId: string) => void;
  clear: () => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      addItem: (line, quantity) =>
        set((state) => {
          const existing = state.items.find((i) => i.productId === line.productId);
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.productId === line.productId ? { ...i, quantity: i.quantity + quantity } : i
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
    { name: "feasina-cart" }
  )
);

export function cartSubtotal(items: CartLine[]): number {
  return items.reduce((sum, item) => sum + item.unitPriceDisplay * item.quantity, 0);
}

export function cartCount(items: CartLine[]): number {
  return items.reduce((sum, item) => sum + item.quantity, 0);
}
