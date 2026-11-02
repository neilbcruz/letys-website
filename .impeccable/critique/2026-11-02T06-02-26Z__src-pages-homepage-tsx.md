---
target: /
total_score: 26
max_score: 36
na_heuristics: 7
p0_count: 0
p1_count: 2
target_identity: "file:/mnt/fast/github/letys-website/src/pages/HomePage.tsx"
target_fingerprint: "sha256:1a67a649d6056c36cd9263df9c3c9a08ab80ac6705f6b03d6d990975788d5343"
target_path: /mnt/fast/github/letys-website/src/pages/HomePage.tsx
timestamp: 2026-11-02T06-02-26Z
slug: src-pages-homepage-tsx
closed: true
---
# Design Critique — `/` (home), re-run

Method: dual-agent (A: CritiqueA-2 · B: CritiqueB-2). Static detector clean (exit 0, 0 findings, 738 lines). Browser overlay at 1365x768: 1 finding (line-length, timeline para 2, wide-viewport only); clean at 390. Parent re-verified all disputed measurements: header/H1 collision confirmed (94px @1024, 67px @1365, 54px @1280, 24px @390); subtitle light-mode contrast claim REJECTED (7.12/9.14 measured, 0 fails, both viewports); focus-ring 3:1 claim not reproduced (5.22:1); 5 a>button nestings confirmed; scroll-padding-top:auto confirmed; footer icon-only contact confirmed.

## Heuristic Scores (26/36, n/a: 7)
1. Visibility of System Status: 3 — open-now chip with closing time linked to /availability carries this
2. Match System / Real World: 3 — warm/plain; residual gloss ("Laguna's favorite", "famous")
3. User Control and Freedom: 2 — H1 hidden behind fixed header 1024-1400px; hash jumps land headings under header
4. Consistency and Standards: 3 — verbs unified; affordances 3-deep per intent; 5 invalid a>button nestings
5. Error Prevention: 3 — honest sell-out warning; only main-branch hours on home
6. Recognition vs Recall: 3 — footer contact icon-only, no text email
7. Flexibility and Efficiency: n/a (Persuade)
8. Aesthetic and Minimalist: 3 — stat band praised; 5 paths to /products edge redundant
9. Error Recovery: 3 — no error paths on surface; ErrorBoundary wraps
10. Help and Documentation: 2 — FAQ one click, task-focused; no contextual help

Note: previous run scored 22/32 (7 and 10 n/a). Like-for-like on 8 shared heuristics: 22 -> 24.

## Priority Issues
- [P1] Fixed header overlaps hero H1 at 1024-1400px (94px @1024x768, 67px @1365x768, 54px @1280x800, 24px @390x844; clean >=1440x900). 80vh hero centers content taller than hero-minus-header. Fix: reserve header height in hero content column; re-verify 1024-1400 both themes. -> layout
- [P1] Hash jumps land section headings 92px under fixed header (scroll-padding-top: auto verified; /#about-lety-heading lands H2 at y=0; also /products#anchors). Fix: global html { scroll-padding-top: calc(header + 12px) }. -> harden
- [P2] 5 buttons nested inside anchors (hero CTAs + 3 product cards): invalid HTML, double tab stops (verified stops 10-13 duplicated). Fix: Button anchor rendering (href/asChild), drop wrapper NavLinks; 35 -> 30 focusables. -> harden
- [P2] Trip-planning essentials at ~75% of 6,729px mobile scroll; only main-branch hours on home (Shell 16:00, Pansol 16:30). Fix: compact "4 branches - see hours & directions" text link sibling to hero chip. -> delight
- [P3] Footer contact = 3 icon-only circles (0 text links verified); email is unverified placeholder per PRODUCT.md. Blocked on owner-supplied real channels. -> parked

## Persona Red Flags
- Sam (tourist, 390x844): headline clipped 24px behind header at load; chip 30px tall (above 24px floor, below 44px thumb guidance); hours ~6 screens down.
- Riley (low-tech): footer 3 unlabeled icon circles, no readable email; theme toggle properly text-labeled.
- Jordan (first-timer): "buko" undefined until timeline beat 2 (~3,600px down); 3 affordances for "go to products".

## Minor Observations
Timeline para 2 line-length >=1365px (trim ~10 chars); eyebrows mix types (1976 / The early years / Today); "Laguna's favorite" + "famous specialty pie" soft borrowed claims; modal lacks role=dialog/aria-modal; title superlative "The Best Buko Pie in Laguna" (parked claim change); timeline dots ~1px off at 390px only; focus-ring and subtitle-contrast detector/agent claims rejected on re-measurement.

## Questions to Consider
Why does the page persuade for three screens before helping plan one visit? What fills the Why-Choose slot if deleted (today's bake from the feed)? How far does "steer the visit" extend toward guaranteeing the pie?
