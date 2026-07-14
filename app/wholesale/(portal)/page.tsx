import Link from "next/link";
import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/server";
import { OrderList } from "./OrderList";
import { formatCurrency } from "@/lib/currency";

export const metadata: Metadata = {
  title: "Wholesale dashboard — Feasina",
};

export default async function WholesaleDashboardPage() {
  const supabase = await createClient();

  // RLS (clients_self_select/orders_self_select, 0006_rls.sql) already
  // scopes both queries to the signed-in client's own rows -- no client_id
  // filter needed here.
  const [{ data: client }, { data: orders }] = await Promise.all([
    supabase.from("clients").select("full_name, balance").single(),
    supabase
      .from("orders")
      .select("id, order_number, status, total, created_at")
      .order("created_at", { ascending: false })
      .limit(10),
  ]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Welcome{client ? `, ${client.full_name}` : ""}</h1>
        <p className="mt-1 text-sm text-gray-600">Your wholesale account overview.</p>
      </div>

      <div className="rounded-xl border bg-white p-6 shadow-sm">
        <p className="text-sm font-medium text-gray-500">Outstanding balance</p>
        <p className="mt-1 text-3xl font-bold text-gray-900">{formatCurrency(client?.balance ?? 0)}</p>
        <p className="mt-2 text-sm text-gray-500">
          Charged when we confirm your orders.{" "}
          <Link href="/wholesale/statement" className="font-medium text-orange-600 hover:underline">
            View statement
          </Link>
        </p>
      </div>

      <Button
        asChild
        className="w-full cursor-pointer bg-orange-600 hover:bg-orange-700 sm:w-auto"
      >
        <Link href="/wholesale/catalog">Place a new order</Link>
      </Button>

      <div className="space-y-3">
        <h2 className="text-lg font-semibold text-gray-900">Recent orders</h2>
        <OrderList orders={orders ?? []} />
      </div>
    </div>
  );
}
