"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createClient } from "@/lib/supabase/browser";

// Ported from feasina-admin's app/(auth)/accept-invite/page.tsx -- same
// hash-token handoff (the invite/reset link's session lives in
// #access_token=..., which the server never sees), just redirecting to
// /wholesale instead of /dashboard on success.
export default function WholesaleAcceptInvitePage() {
  const router = useRouter();
  const [checking, setChecking] = useState(true);
  const [hasSession, setHasSession] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const supabase = createClient();

    async function processInvite() {
      const hash = new URLSearchParams(window.location.hash.substring(1));
      const accessToken = hash.get("access_token");
      const refreshToken = hash.get("refresh_token");

      if (accessToken && refreshToken) {
        await supabase.auth.signOut({ scope: "local" });
        const { error: sessionError } = await supabase.auth.setSession({
          access_token: accessToken,
          refresh_token: refreshToken,
        });
        if (sessionError) {
          setHasSession(false);
          setChecking(false);
          return;
        }
      }

      const { data } = await supabase.auth.getUser();
      setHasSession(!!data.user);
      setChecking(false);
    }

    processInvite();
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords don't match.");
      return;
    }

    setIsSubmitting(true);
    const supabase = createClient();
    const { error: updateError } = await supabase.auth.updateUser({ password });
    setIsSubmitting(false);

    if (updateError) {
      setError("Couldn't set your password. Try again or ask us to resend the invite.");
      return;
    }

    router.push("/wholesale");
    router.refresh();
  }

  return (
    <div className="rounded-xl border bg-white p-8 shadow-sm">
      <h1 className="mb-1 text-center text-2xl font-bold text-gray-900">Set your password</h1>
      <p className="mb-6 text-center text-sm text-gray-600">Finish setting up your wholesale account.</p>

      {checking ? (
        <p className="py-6 text-center text-sm text-gray-500">Checking your invite...</p>
      ) : !hasSession ? (
        <p className="text-sm text-red-600">
          This invite link is invalid or has expired. Ask us to send you a new one.
        </p>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label htmlFor="password" className="text-sm font-medium text-gray-900">
              Password
            </label>
            <Input
              id="password"
              type="password"
              autoComplete="new-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <p className="text-xs text-gray-500">At least 8 characters.</p>
          </div>
          <div className="space-y-1.5">
            <label htmlFor="confirm-password" className="text-sm font-medium text-gray-900">
              Confirm password
            </label>
            <Input
              id="confirm-password"
              type="password"
              autoComplete="new-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          {error && <p className="text-sm text-red-600">{error}</p>}
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full cursor-pointer bg-orange-600 hover:bg-orange-700"
          >
            {isSubmitting ? "Saving..." : "Set password & continue"}
          </Button>
        </form>
      )}
    </div>
  );
}
