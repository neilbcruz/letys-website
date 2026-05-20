# Design System Guidelines

## Semantic Token Use

- Use `fg-*` tokens for text and icons.
- Use `surface-*` tokens for page, card, panel, and control backgrounds.
- Use `stroke-*` tokens for borders, dividers, and outlines.
- Use `status-*` tokens only for error, warning, success, and information states.
- Use `primary-*` and brand tokens for brand actions, active navigation, links, selected controls, and limited accents.
- Avoid raw color literals in components and pages. Raw color values belong in `src/tokens.css`.

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
