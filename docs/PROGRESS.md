# Progress (feasina-website)

Full schema/architecture context lives in `feasina-admin/docs/` -- this file just tracks what changed in this repo. Read `feasina-admin/docs/PROGRESS.md` first for the full-system status.

## 2026-07-13 -- Phase C: live catalog + cart + checkout

Wired the storefront to the same Supabase project feasina-admin uses. Full rationale: `feasina-admin/docs/DECISIONS.md` ADR-019.

- `lib/supabase/{client,types}.ts` -- new, trimmed to only what this repo touches (`products_storefront` view, `flavours`, `place_order`). No cookie/session client needed -- no login exists on this site, checkout is guest-only.
- `lib/data/catalog.ts` -- `getStorefrontCatalog()` fetches `flavours` and `products_storefront` separately and merges them, so a flavour with zero orderable products still shows up with an "Out of Stock" badge instead of silently disappearing.
- `lib/store/cart-store.ts` -- Zustand + `persist` (localStorage key `feasina-cart`). Cart prices are display-only; `place_order()` always re-derives the real price server-side.
- `lib/flavor-theme.ts` -- the old static `lib/flavorsData.ts` (emoji/gradient/badge, no id/price/stock at all) is gone; visual theme (purely cosmetic) is now a small lookup keyed by flavour slug, separate from the live DB data.
- `components/Feasina/Flavors.tsx` is now a Server Component; `FlavorCard.tsx` has a real "Add to Cart" action opening `PackPicker.tsx` (`Sheet` on desktop / `Drawer` on mobile, responsive via `hooks/use-mobile`).
- `components/Feasina/CartButton.tsx` -- new cart icon + count badge in the navbar, opens a cart `Sheet`/`Drawer` with qty adjust/remove/subtotal.
- `app/checkout/` -- `CheckoutForm.tsx` (RHF + Zod) + `actions.ts` (Server Action calling the `place_order` RPC) + `page.tsx`. Confirmation renders inline on success (no separate `/checkout/confirmation/[id]` route -- `orders` has no `anon` SELECT policy by design, so a route-based confirmation page would need its own auth/token scheme for no real benefit over the RPC's own return value).
- `app/layout.tsx` -- added `sonner` `<Toaster />` for cart/checkout notifications, and `export const revalidate = 60` (ISR) so stock/availability shown on the homepage doesn't go stale between deploys.
- Added `zustand` and `@supabase/supabase-js` to `package.json`. Existing `next.config.mjs` `ignoreBuildErrors`/`ignoreDuringBuilds` flags left as-is (pre-existing, out of scope here).

**Not yet verified live** -- migration `0016` (see feasina-admin) needs to be applied to the Supabase project before this repo's build/homepage will work; `npm run build` currently fails on `products_storefront` not existing until that's done. Once applied: re-run the build, then a full browser walkthrough (add to cart, checkout, confirm the order appears in feasina-admin's Orders view with correct stock decrement).
