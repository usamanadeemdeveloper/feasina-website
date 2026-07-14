import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { formatCurrency } from "@/lib/currency";

export const metadata: Metadata = {
  title: "Statement — Feasina Wholesale",
};

const dateFormatter = new Intl.DateTimeFormat("en-US", { dateStyle: "medium" });

const ENTRY_LABEL: Record<string, string> = {
  charge: "Charge",
  payment: "Payment",
  adjustment: "Adjustment",
};

// Explicit classes, not shadcn Badge variants -- see the comment in
// ../OrderList.tsx on why this site's variant="default"/"secondary" tokens
// don't match feasina-admin's actual orange/gray look. Mirrors admin's own
// LEDGER_ENTRY_VARIANT mapping (charge=outline, payment=orange, adjustment=gray).
const ENTRY_CLASS: Record<string, string> = {
  charge: "border border-gray-300 text-gray-600",
  payment: "bg-orange-600 text-white",
  adjustment: "bg-gray-100 text-gray-700",
};

export default async function WholesaleStatementPage() {
  const supabase = await createClient();

  // RLS (ledger_self_select, feasina-admin/supabase/migrations/0021) scopes
  // this to the signed-in client's own entries -- the same rows the admin's
  // client detail page shows staff, just read-only and self-scoped here.
  const [{ data: client }, { data: entries }] = await Promise.all([
    supabase.from("clients").select("balance").single(),
    supabase
      .from("client_ledger_entries")
      .select("id, entry_type, amount, notes, created_at")
      .order("created_at", { ascending: false }),
  ]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Statement</h1>
        <p className="mt-1 text-sm text-gray-600">Every charge and payment that makes up your balance.</p>
      </div>

      <div className="rounded-xl border bg-white p-6 shadow-sm">
        <p className="text-sm font-medium text-gray-500">Current balance</p>
        <p className="mt-1 text-3xl font-bold text-gray-900">{formatCurrency(client?.balance ?? 0)}</p>
      </div>

      {!entries || entries.length === 0 ? (
        <p className="rounded-xl border bg-white p-6 text-center text-sm text-gray-500 shadow-sm">
          No activity yet. Charges appear automatically once we confirm your orders.
        </p>
      ) : (
        <div className="space-y-2.5">
          {entries.map((entry) => (
            <div
              key={entry.id}
              className="flex items-center justify-between gap-3 rounded-xl border bg-white p-4 shadow-sm"
            >
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span
                    className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${
                      ENTRY_CLASS[entry.entry_type] ?? "border border-gray-300 text-gray-600"
                    }`}
                  >
                    {ENTRY_LABEL[entry.entry_type] ?? entry.entry_type}
                  </span>
                  <span className="text-xs text-gray-500">
                    {dateFormatter.format(new Date(entry.created_at))}
                  </span>
                </div>
                {entry.notes && <p className="mt-1 truncate text-sm text-gray-600">{entry.notes}</p>}
              </div>
              <p
                className={`shrink-0 font-semibold ${
                  entry.entry_type === "payment" ? "text-emerald-600" : "text-gray-900"
                }`}
              >
                {entry.entry_type === "payment" ? "-" : "+"}
                {formatCurrency(entry.amount)}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
