import type { Metadata } from "next";
import { WholesaleCheckoutForm } from "./WholesaleCheckoutForm";

export const metadata: Metadata = {
  title: "Checkout — Feasina Wholesale",
};

export default function WholesaleCheckoutPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Checkout</h1>
      <WholesaleCheckoutForm />
    </div>
  );
}
