# Quality Baseline — Lety's Buko Pie Website

Project-specific quality rules. Read before implementing any task.

---

## Stack

- React 19 + TypeScript (strict) + Vite
- Tailwind CSS v4 with `@theme inline` in `tokens.css`
- Netlify deployment (SPA mode)
- npm only. No pnpm/yarn.
- TanStack Query for server state (Kahero GraphQL API).

## Architecture

- `tokens.css` is the single source of truth for all design tokens (`:root` values + `@theme inline` bridge).
- `index.css` is pure base styles, components, utilities — no `@theme` block.
- No duplicate alias layers. No circular `var()` self-references.
- Product metadata in `src/data/products.ts`. Inventory comes from Kahero API only.
- Locations in `src/data/locations.ts` with `isStoreOpen()` pure function.
- Image pipeline: `scripts/optimize-images.mjs`. Source JPGs in `src/assets/images/{products,banners,locations}/`. Output webp in `webp/` subdirs.
- Images: products are square-cropped (400/800/1200). Banners/locations preserve ratio (640/1024/1920).

## Code Standards

- No `any`. No `as any`.
- Semantic design tokens over hardcoded Tailwind colors. No `text-gray-700`, `bg-red-500`, etc.
- Use `??` not `||`.
- `lucide-react` for icons.
- `clsx` + `tailwind-merge` via `cn()` for conditional classes.
- `@/` path alias for imports from `src/`.

## UI / Design

- WCAG AA minimum. All color pairs verified 4.5:1+ contrast.
- `focus-visible` ring with brand accent gold (`--color-brand-accent`).
- Skip-to-main link. VisuallyHidden for screen-reader-only content.
- Semantic HTML: `<nav>`, `<main>`, `<header>`, `<footer>`, `<section>`.
- Print stylesheet hides nav/footer, shows link URLs.

## Process

- No Docker, no dev servers, no background processes in AI sessions.
- Run `npm run lint` and `npx tsc --noEmit` before committing.
- Run `npm run build` to verify production build succeeds.
- Run `npm test` (vitest) to verify unit tests pass.

## Pre-Completion Checklist

1. `npm install` if `package.json` changed
2. Lint pass — `npm run lint` (fix all errors, warnings acceptable if pre-existing)
3. Type check — `npx tsc --noEmit`
4. Build — `npm run build`
5. Tests — `npm test`
6. No `any` types introduced
7. No hardcoded color classes (use design tokens)
8. No circular CSS `var()` references

---

*Last updated: 2026-05-15*
