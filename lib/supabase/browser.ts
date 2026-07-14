import { createBrowserClient } from "@supabase/ssr";
import type { Database } from "./types";

// Cookie-aware browser client for app/wholesale/* (login, accept-invite) --
// kept separate from lib/supabase/client.ts, which the retail guest cart/
// checkout flow uses and which deliberately has no session/cookie plumbing.
export function createClient() {
  return createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
  );
}
