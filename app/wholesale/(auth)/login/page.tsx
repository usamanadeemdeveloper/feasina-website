import type { Metadata } from "next";
import { Suspense } from "react";
import { LoginForm } from "./LoginForm";

export const metadata: Metadata = {
  title: "Wholesale sign in — Feasina",
};

// LoginForm reads ?error= via useSearchParams(), which requires a Suspense
// boundary here or this route can't be statically prerendered -- same fix
// feasina-admin's app/(auth)/login/page.tsx needed.
export default function WholesaleLoginPage() {
  return (
    <div className="rounded-xl border bg-white p-8 shadow-sm">
      <h1 className="mb-1 text-center text-2xl font-bold text-gray-900">Wholesale client login</h1>
      <p className="mb-6 text-center text-sm text-gray-600">
        This login is only for approved wholesale clients. Not one yet?{" "}
        <a
          href="https://wa.me/923132929709?text=Hi!%20I%27m%20interested%20in%20wholesale%20pricing%20for%20Feasina%20drinks."
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-orange-600 underline underline-offset-2 hover:text-orange-700"
        >
          Contact us on WhatsApp
        </a>
        .
      </p>
      <Suspense fallback={null}>
        <LoginForm />
      </Suspense>
    </div>
  );
}
