---
target: /
total_score: 29
max_score: 36
na_heuristics: 7
p0_count: 0
p1_count: 1
target_identity: "file:/mnt/fast/github/letys-website/src/pages/HomePage.tsx"
target_fingerprint: "sha256:1a67a649d6056c36cd9263df9c3c9a08ab80ac6705f6b03d6d990975788d5343"
target_path: /mnt/fast/github/letys-website/src/pages/HomePage.tsx
timestamp: 2026-11-02T11-12-27Z
slug: src-pages-homepage-tsx
---
# Design Critique — `/` (home), post-fix-loop re-run

Method: dual-agent (A: CritiqueA3 · B: CritiqueB3). A's contrast claims: full-viewport CDP screenshots, text hidden, real compositing, oklch→sRGB via Ottosson matrices, validated against computed pairs (9.57 vs 9.55). B: CLI 0 findings (regex-mode caveat noted); overlay 0 findings at 1365x768 AND 390x844, with a synthetic positive-control probe proving the detector executed (1 low-contrast finding on probe, 0 on page). Parent correction on record: previous parent-run "focus ring 5.22:1" re-measurement was a canvas oklch artifact; A3's rendered-pixel 2.36:1 is the trusted figure.

## Heuristic Scores (29/36, n/a: 7)
1. Visibility of System Status: 4 — chip + active nav pill + labeled toggle
2. Match System / Real World: 4 — "buko" glossed inline; warm Filipino-English
3. User Control and Freedom: 3 — Esc/focus-restore work; no back-to-top on 5,169px page
4. Consistency and Standards: 3 — three text-link dialects coexist
5. Error Prevention: 3 — chip prevents wasted trips; 5 dead hash anchors
6. Recognition vs Recall: 4 — all visible, labeled
7. Flexibility and Efficiency: n/a (Persuade)
8. Aesthetic and Minimalist: 3 — why-choose + stat band restate same facts
9. Error Recovery: 3 — no user-facing errors on home
10. Help and Documentation: 2 — FAQ in nav; one contextual help link

Trend: 22/32 -> 26/36 -> 29/36 (first two runs different heuristic sets).

## Priority Issues
- [P1] Dark-theme transparent header nav fails AA on landing: white 14px bold links on surface-inverse/25 glass over bright sky measure median 3.70-4.47 glyph zones (need 4.5). Light theme passes (>=9.57). Fix: darken dark-mode transparent nav glass (bg-black/40 or scrim behind pill strip); verify per-pixel. -> refine/harden
- [P2] Five home links point at non-existent /products anchors (#specialty #bakedgoods #pasalubong absent from ProductsPage; verified live). Links land at page top. Fix: add ids to products section headings or repoint to filtered views. -> harden
- [P2] Focus ring 2.36:1 vs cream surfaces (WCAG 2.4.11 needs 3:1); passes over dark photo (4.93). Fix: dual-tone ring or darker light-theme --focus-ring-color. -> polish
- [P3] Timeline paragraphs 82-89 cpl at 1440 (855px in 862px container) — constrain to ~65ch. -> polish
- [P3] Two standalone links <24px tall (hero "4 branches..." 20px; "Come early..." 17px) — WCAG 2.5.8. -> polish

## Persona Red Flags
- Sam: dark-mode landing header fails 4.5:1; light-theme ring washed out on cream; sub-24px links.
- Riley: dead /products# anchors; duplicate main landmarks on non-home pages (App.tsx + page main); footer mailto is flagged placeholder; /products feed-down state shows "Failed to Load Inventory".
- Jordan: "View Baked Goods" dumps at top of full list — must re-find the promised section.

## Minor Observations
Outline "See Our Pies" precedes filled primary in reading order; title superlative (parked); why-choose/stat redundancy (user: decide later); product-card hover zoom lacks motion-reduce guard; stat band dt/dd semantically inverted; "flagship" compliant with no-original-branch correction.

## Questions to Consider
Should the hero lead with Find a Location (primary) over See Our Pies? Should the chip default to the nearest branch instead of Main? Is schedule-truth acceptable when the feed is down on a stock-truth site?
