# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Primary: walk-in pasalubong customers — locals, UPLB students, and Laguna tourists deciding **what to buy, from which branch, and when to go**, before heading out. They arrive on phones, often en route, and want stock answers in seconds.

Secondary: bulk and catering buyers (parties, events, corporate gifting) arranging advance orders via direct contact or an in-person visit.

## Product Purpose

The official website of Lety's Buko Pie, a family bakery in Los Baños, Laguna (founded 1976). It persuades first-time visitors of the brand's worth and gives regulars live, per-branch product availability so a trip never ends in a sold-out pie. Success = a confident walk-in visit that ends with the pie the customer came for.

## Positioning

Heritage plus daily freshness: the same family recipe, three generations, baked fresh every morning since 1976. (User-confirmed as the durable claim; competitor-copyable superlatives and stock-tech features are supporting cast, not the banner.)

## Operating Context

- **4 branches** (user-confirmed; the site's "5 Locations" home copy is stale):
  - Main Store — Barangay Anos, Los Baños (National Rd, front of Heaven's Memorial Garden); daily 6:00–18:00
  - Anos Shell Branch — beside Shell station, National Hwy, Los Baños; daily 7:00–16:00
  - Agapita Branch — Agapita Plaza, Barangay Umali, Los Baños (near UPLB); daily 6:00–18:00
  - Pansol Branch — Pansol, Calamba City (near Cuyab Resort); daily 7:30–16:30; **no Frozen Buko Pie**
- Walk-in purchase model; customers may arrange their own courier/pasabuy.
- Buko pies keep 2–3 days refrigerated; customers buy same-day fresh or frozen.
- Catering and bulk orders: yes — arranged in advance in person or by direct contact.

## Capabilities and Constraints

- **Live inventory**: per-store product stock from the letys-ops public availability feed (`VITE_LETYS_OPS_API_URL`); store-level live open/closed (`isOpen`) lands when the backend ships it. Wired today: main, shell, pansol; agapita has no feed yet (`hasInventoryAPI: false`).
- Customer-visibility rules in code: globally hidden products (Oatmeal Cookies, Revel Bars — temporary), per-store exclusions (Frozen Buko Pie at Pansol), supply-only categories hidden (`Miscellaneous`).
- **Durable business constraints** (user-confirmed): no delivery, no online ordering/reservations, no franchising, no official resellers or distributors. The site steers visits; it does not transact.
- Contact channels: Facebook page, Messenger, email (footer links).
- Analytics: GA4 in production only.

## Brand Commitments

- Name: **Lety's Buko Pie**. Founding: **1976**, Los Baños, Laguna (three generations).
- Voice: warm Filipino-English, inviting and unhurried ("Come visit us!", "spread the love of Lety's pies") — evidenced across live FAQ and home copy.
- Real product and store photography is the brand's visual evidence base (see Evidence on Hand).

**Correction (owner, 2026-11):** the current Main Branch is **not** the original 1976 site. No branch may be described as "the original Lety's location"; the 1976 founding belongs to the brand story (About Lety section), not to any branch address.

## Evidence on Hand
- Real photography of pies and stores (responsive WebP sets in `src/assets/images/webp/products/`).
- Verified addresses, coordinates, hours, and Google Maps links in `src/data/locations.ts`.
- Business-answer FAQ content in `src/data/faqs.tsx` (delivery, franchise, reselling, hours, catering, freshness, bulk).
- Live inventory feed via letys-ops.

**Absences future work must not fabricate:** no testimonials, awards, press mentions, or certifications on hand. Known data bugs to fix (not product truth): `SEOConstants.ts` says `foundingDate: '1997'` (truth: 1976); home "5 Locations" card (truth: 4); SEO phone `+63-917-123-4567` / `hello@letysbukopie.com` / Instagram/Twitter socials are unverified placeholders.

## Product Principles

1. **Steer the visit, don't simulate the transaction.** Walk-in-only is durable; every surface funnels toward a branch visit.
2. **Stock truth beats marketing gloss.** Availability data is shown as the feed reports it; never dress up a sold-out pie.
3. **Heritage is told, never invented.** 1976, the family, the daily bake — no fabricated claims, testimonials, or awards.
4. **Answer trip-planning questions instantly**: what's available, where, when — on a phone, in seconds.
5. **Accessibility is table stakes**, not a feature (WCAG 2.1/2.2 AA baseline already in code).

## Accessibility & Inclusion

WCAG 2.1/2.2 Level AA is the confirmed baseline (tokens carry verified contrast ratios; skip links, focus management, reduced-motion support in code). Audience is predominantly mobile, often mid-trip — large targets and fast answers are product requirements.
