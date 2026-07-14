import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

// Scoped to /wholesale/* only via the matcher below -- the public site
// (retail catalog/cart/checkout) never runs through this middleware at all,
// so guest checkout stays exactly as unauthenticated as it is today.
//
// /wholesale/accept-invite must stay public: the invite email's link carries
// the session token in the URL fragment (#access_token=...), which the
// server never sees -- this middleware would otherwise see "no user" and
// bounce the invite link to /wholesale/login before the browser gets a
// chance to read the hash and establish a session client-side. Mirrors
// feasina-admin's lib/supabase/middleware.ts.
const PUBLIC_WHOLESALE_PATHS = ["/wholesale/login", "/wholesale/accept-invite"];

export async function middleware(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
          supabaseResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options),
          );
        },
      },
    },
  );

  const { data } = await supabase.auth.getClaims();
  const user = data?.claims;

  const isPublicWholesalePath = PUBLIC_WHOLESALE_PATHS.some((path) =>
    request.nextUrl.pathname.startsWith(path),
  );

  if (!user && !isPublicWholesalePath) {
    const url = request.nextUrl.clone();
    url.pathname = "/wholesale/login";
    return NextResponse.redirect(url);
  }

  if (user && request.nextUrl.pathname.startsWith("/wholesale/login")) {
    const url = request.nextUrl.clone();
    url.pathname = "/wholesale";
    return NextResponse.redirect(url);
  }

  return supabaseResponse;
}

export const config = {
  matcher: ["/wholesale/:path*"],
};
