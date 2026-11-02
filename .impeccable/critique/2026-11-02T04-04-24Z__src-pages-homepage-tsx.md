---
target: /
total_score: 22
max_score: 32
na_heuristics: 7,10
p0_count: 1
p1_count: 2
target_identity: "file:/mnt/fast/github/letys-website/src/pages/HomePage.tsx"
target_fingerprint: "sha256:1a67a649d6056c36cd9263df9c3c9a08ab80ac6705f6b03d6d990975788d5343"
target_path: /mnt/fast/github/letys-website/src/pages/HomePage.tsx
timestamp: 2026-11-02T04-04-24Z
slug: src-pages-homepage-tsx
closed: true
---
# Design Critique — `/` (home)

Method: dual-agent (A: CritiqueA · B: CritiqueB). Static detector clean (exit 0, sanity-verified). Browser overlay at 1365×768: 4 findings (2 straggler, 2 line-length — PageBody.tsx:58, :89, :94, :134).

## Heuristic Scores (22/32, n/a: 7, 10)
1. Visibility of System Status: 2 — sell-out line dead-text at page bottom; /availability invisible on home
2. Match System / Real World: 3 — "Shop" implies e-commerce on walk-in-only business
3. User Control and Freedom: 3 — no back-to-top on 5,923px mobile; dead skip-to-navigation target on mobile
4. Consistency and Standards: 3 — four link verbs (Shop/View/Learn more/Find), identical styling
5. Error Prevention: 3 — no error-prone interactions
6. Recognition Rather Than Recall: 3 — only main-branch hours; other branches just a count
7. Flexibility and Efficiency: n/a (Persuade)
8. Aesthetic and Minimalist Design: 2 — 12 near-identical secondary links; Why-Choose interlude; hero contrast failures
9. Error Recovery: 3 — no error states
10. Help and Documentation: n/a (Persuade)

## Design Specificity
Words authored (founder story, ingredient specificity, landmark directions); structure stock SMB template. No pie above the fold on any viewport; differentiator (/availability) buried; zero social proof.

## Priority Issues
- [P0] Hero text fails WCAG AA against its own photo (pixel-measured: nav Home fails over 91.9% of box, worst 1.78:1; h1 fails 3:1 over 16.4% desktop / 35.4% mobile; subtitle 68.3% mobile; gold span 1.29–1.61:1 unshadowed). Fix: left scrim + text-shadow on white text (HeroBanner.tsx:54) or darker overlays; re-verify by pixel sampling. → harden
- [P1] "Shop Our Products"/"Shop All Products" promise e-commerce that will never exist. Rename "See Our Pies"/"Browse All Products" (HeroBanner.tsx:65, PageBody.tsx:23,:128). → clarify
- [P1] Availability system invisible on home; "Come early, we sell out fast!" (PageBody.tsx:193) is dead text. Link it to /availability + availability chip under hero CTAs. → delight
- [P2] Zero social proof on 50-year institution. Stat row from owned facts (Since 1976 · 4 Branches · 3 Generations); no fabricated testimonials. → bolder
- [P2] Hero right two-thirds empty div (HeroBanner.tsx:78); no product visible above fold; first pie image 256px thumbnail. Pie close-up in right column or tighter crop. → layout

## Persona Red Flags
- Sam (time-pressured tourist, phone): taps Shop → no ordering; availability answer is last on page and unlinked.
- Riley (low-tech): nav contrast 92%-area below 4.5:1 at first paint; "Availability" vocabulary assumes familiarity.
- Jordan (buko-pie first-timer): taste answered only at 1,750px; price/size/shelf-life (2–3 days refrigerated) answered nowhere on home.

## Minor Observations
Timeline dots 2–3px off centerline; timeline nodes 2–3 lack years; "multiple locations" vs "4 Locations" inconsistency; straggler/line-length copy at PageBody:58,:89,:94,:134; Learn-more links route to generic pages; ShoppingBag icon on three different actions; bare category alts (alt="Pasalubong"); footer has no address/hours/phone/closing CTA (CallToAction component unused); title "Best in Laguna" superlative unbacked on-page.

## Questions to Consider
Why does no viewport show a pie above the fold? Is home selling the story or helping someone get a pie today? What is "Shop" doing on a walk-in-only site?
