import type { Metadata } from "next";
import { LoginForm } from "./LoginForm";

export const metadata: Metadata = {
  title: "Wholesale sign in — Feasina",
};

export default function WholesaleLoginPage() {
  return (
    <div className="rounded-xl border bg-white p-8 shadow-sm">
      <h1 className="mb-1 text-center text-2xl font-bold text-gray-900">Wholesale sign in</h1>
      <p className="mb-6 text-center text-sm text-gray-600">
        For approved wholesale accounts. Contact us if you don&apos;t have access yet.
      </p>
      <LoginForm />
    </div>
  );
}
