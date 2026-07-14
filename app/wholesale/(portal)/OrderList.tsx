import { formatCurrency } from "@/lib/currency";

const dateFormatter = new Intl.DateTimeFormat("en-US", { dateStyle: "medium" });

const ORDER_STATUS_LABEL: Record<string, string> = {
  pending: "Pending",
  confirmed: "Confirmed",
  packed: "Packed",
  shipped: "Shipped",
  delivered: "Delivered",
  cancelled: "Cancelled",
};

// Matches feasina-admin's real order-status colors -- the richer STATUS_CLASS
// scheme in app/(app)/orders/OrdersTable.tsx and orders/[id]/page.tsx
// (pending=amber, confirmed=orange/primary, packed=amber, shipped=blue,
// delivered=green, cancelled=red), NOT the plainer gray/orange-only scheme
// admin's own clients/[id]/page.tsx order-history table happens to use --
// that one is the odd one out and got fixed to match this same scheme too.
const ORDER_STATUS_CLASS: Record<string, string> = {
  pending: "border border-amber-400 text-amber-600",
  confirmed: "bg-orange-600 text-white",
  packed: "bg-amber-500 text-white",
  shipped: "bg-blue-500 text-white",
  delivered: "bg-green-600 text-white",
  cancelled: "bg-red-50 text-red-600",
};

export function StatusBadge({ status }: { status: string }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${
        ORDER_STATUS_CLASS[status] ?? "border border-gray-300 text-gray-600"
      }`}
    >
      {ORDER_STATUS_LABEL[status] ?? status}
    </span>
  );
}

export interface OrderListItem {
  id: string;
  order_number: string;
  status: string;
  total: number;
  created_at: string;
}

// Cards, not a table -- a wide table forces horizontal scrolling on a phone
// screen, which is exactly what reads as "a website squeezed onto mobile"
// rather than a native app. Same call feasina-admin's AGENTS.md makes for
// its own ResponsiveList/DataCard pattern.
export function OrderList({ orders }: { orders: OrderListItem[] }) {
  if (orders.length === 0) {
    return (
      <p className="rounded-xl border bg-white p-6 text-center text-sm text-gray-500 shadow-sm">
        No orders yet.
      </p>
    );
  }

  return (
    <div className="space-y-2.5">
      {orders.map((order) => (
        <div
          key={order.id}
          className="flex items-center justify-between gap-3 rounded-xl border bg-white p-4 shadow-sm"
        >
          <div>
            <p className="font-semibold text-gray-900">{order.order_number}</p>
            <p className="text-xs text-gray-500">{dateFormatter.format(new Date(order.created_at))}</p>
          </div>
          <div className="flex flex-col items-end gap-1">
            <p className="font-semibold text-gray-900">{formatCurrency(order.total)}</p>
            <StatusBadge status={order.status} />
          </div>
        </div>
      ))}
    </div>
  );
}
