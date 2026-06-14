# Design System Guidelines

## Semantic Token Use

- Use `fg-*` tokens for text and icons.
- Use `surface-*` tokens for page, card, panel, and control backgrounds.
- Use `stroke-*` tokens for borders, dividers, and outlines.
- Use `status-*` tokens only for error, warning, success, and information states.
- Use `primary-*` and brand tokens for brand actions, active navigation, links, selected controls, and limited accents.
- Avoid raw color literals in components and pages. Raw color values belong in `src/tokens.css`.

## Color Roles — fill vs text (on-color rules)

Brand green is split into two roles because one value can't be both a readable fill and readable text in dark mode (a fill must be dark for white text; text on a surface must be light to read — they never overlap at AA):

| Context | Background | Text |
| --- | --- | --- |
| Brand button / tile | `bg-brand-fill` | `text-fg-on-brand` (always white) |
| Gold button / chip | `bg-accent` | `text-on-accent` (always dark) |
| Brand text / link / icon on a surface | surface | `text-brand` (flips per theme) |
| Gold text on a surface | surface | `text-accent-fg` (readable gold) |
| Gold accent on a dark hero / overlay | dark | `text-accent` (bright gold) |

- Colored **fill** → `on-*` text: `on-brand` (white) for green/status fills, `on-accent` (dark) for gold.
- Brand/gold as **text on a surface** → `brand` / `accent-fg`, never the raw fill color.
- Never put `text-fg-inverse` on a permanently-colored surface — it flips to dark in dark mode (black-on-green). `text-fg-inverse` is only for `surface-inverse` / `fg-inverse` pairings, which flip together.

## Display Type

- Hero display figures use `font-black` (Figtree 900) with `tabular-nums`; body text stays at `700` or lighter.

## Motion

- Prefer color, border, and shadow changes for hover feedback.
- Reserve scale for small pressed feedback on controls, not for cards, product grids, or large images.
- Keep control transitions short and predictable.
- Respect the existing reduced-motion media query for all animation and transition work.

## Feedback States

- Empty states use an icon, title, short explanation, and optional action.
- Error states use a severity-specific status token set, clear recovery copy, and an optional retry action.
- Loading states use skeletons or spinners with `role="status"`, `aria-live="polite"`, and `aria-busy="true"` where content is being replaced.
- Page-level data regions should expose loading state through `aria-busy` when practical.

## Brand Application

- Deep green is the primary UI color for actions, active states, and links.
- Yellow is an accent for selected brand moments, not a dominant surface.
- Neutral and warm off-white surfaces should carry most page structure.
- Hero text over imagery should use scrims or gradients that preserve image visibility while keeping text readable.
