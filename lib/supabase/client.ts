import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import type { Database } from "./types";

// No cookie/session plumbing needed here (unlike feasina-admin's @supabase/ssr
// split) -- the storefront has no login/session concept, checkout is guest-only.
// Safe to reuse the same publishable (anon) key client-side or server-side.
export function createClient() {
  return createSupabaseClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
  );
}
