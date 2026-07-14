import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import type { Database } from "./types";

// Cookie-aware, unlike the existing lib/supabase/client.ts (bare anon key, no
// session) -- needed only under app/wholesale/*, where a logged-in client's
// auth.uid() has to be present for RLS-scoped reads and for
// get_wholesale_catalog()/place_wholesale_order() to resolve who's calling.
// The retail guest flow (app/checkout/*, lib/data/catalog.ts) never needs
// this and keeps using the existing client.ts untouched.
export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options),
            );
          } catch {
            // Called from a Server Component -- safe to ignore since
            // middleware.ts refreshes the session on every request.
          }
        },
      },
    },
  );
}
