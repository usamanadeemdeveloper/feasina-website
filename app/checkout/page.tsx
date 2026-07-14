import type { Metadata } from "next";
import { CheckoutForm } from "./CheckoutForm";

export const metadata: Metadata = {
  title: "Checkout — Feasina",
};

export default function CheckoutPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-yellow-50 via-orange-50 to-red-50 px-4 py-24">
      <div className="container mx-auto max-w-4xl">
        <h1 className="mb-8 text-center text-3xl font-bold text-gray-900">Checkout</h1>
        <CheckoutForm />
      </div>
    </main>
  );
}
