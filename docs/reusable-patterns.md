# Reusable Patterns from letys-website

Reference of lessons, good practices, templates, standards, and architecture worth reusing in future projects.

## 1. Design Tokens System (`src/lib/tokens.ts`)

TypeScript design token system that mirrors CSS custom properties.

**Key ideas:**
- **Dual-source of truth** — raw values (`BRAND_COLORS`) + semantic aliases (`BRAND_COLORS_SEMANTIC`)
- **`as const` everywhere** — gives literal types and autocomplete
- **Every category covered** — colors, typography, spacing, radius, shadows, motion, z-index, layout, interaction
- **Helper functions** — `transition()`, `space()`, `duration()` for computed values
- **Type exports** — `BrandColor`, `FontSize`, `ZIndex` etc. for type-safe references

**Copy this file** and swap the values. The structure is framework-agnostic.

## 2. Barrel Export Pattern (`index.ts` per domain)

Every component domain has a barrel file:

```
src/components/accessibility/index.ts
src/components/ui/index.ts
src/components/layout/index.ts
src/components/seo/index.ts
src/types/index.ts
```

Gives clean imports like `import { Button, Card } from '@/components/ui'` instead of relative file paths. The `types/index.ts` re-exports from domain modules so consumers import from one place.

## 3. Centralized Type Definitions (`src/types/index.ts`)

Generic utility types ready to copy-paste:

| Type | Use |
|------|-----|
| `DeepPartial<T>` | Recursive optional properties |
| `RequireFields<T, K>` | Make specific keys required |
| `MaybePromise<T>` | Sync or async return |
| `BaseComponentProps` | Standard `className + children` props |
| `LoadableProps` | `isLoading + loadingText` |
| `LoadingStatus` | `'idle' \| 'loading' \| 'success' \| 'error'` |
| `FormState<T>` | Generic form state with touched/errors |
| `PaginatedResponse<T>` | Generic pagination wrapper |

## 4. SEO Architecture (3-layer separation)

Well-structured across three layers:

- **`src/lib/seo.ts`** — Pure data: `PAGE_META` record, `generateMetaTags()`, `getPageMeta()`, env-aware `SITE_URL`
- **`src/components/seo/SEOHead.tsx`** — React component consuming the data via `react-helmet-async`
- **`src/components/seo/StructuredData.tsx`** — JSON-LD schema generators (LocalBusiness, Product, FAQ, Location)
- **`src/components/seo/SEOConstants.ts`** — All config in one place (analytics IDs, image presets, sitemap config, robots config)

**Key pattern**: Each page gets a key (`'home'`, `'products'`, etc.), and `PAGE_META[key]` returns the full metadata. No duplication.

## 5. CI/CD Pipeline with Parallel Jobs + Summary

The `.github/workflows/test.yml` pattern:

```
e2e-tests ──┐
lint ────────┤
type-check ──┼── test-summary (aggregates results, fails if any job fails)
unit-tests ──┘
```

Key details:
- `needs: [e2e-tests, lint, type-check, unit-tests]` with `if: always()` so summary always runs
- `$GITHUB_STEP_SUMMARY` for visible results
- Artifact uploads with `retention-days` and `if: always()` / `if: failure()`

## 6. Accessibility CI Pipeline (`a11y-ci.yml`)

Two-job accessibility setup:
- **Pa11y CI** — automated WCAG 2A/AA violation scanning
- **axe-core** — per-page CSV/JSON reports with jq-based aggregation
- **PR comments** — auto-comments results on pull requests
- **Scheduled runs** — daily `cron` for ongoing monitoring

## 7. Playwright Configuration (multi-device)

Covers 6 projects in one config: Chromium, Firefox, WebKit, Mobile Chrome, Mobile Safari, Tablet. Smart defaults:
- `trace: 'retain-on-failure'` — only saves traces on fail (saves storage)
- `retries: process.env.CI ? 2 : 0` — flake-resistant in CI
- `forbidOnly: !!process.env.CI` — prevents committed `.only` tests

## 8. Component Design Patterns

### Button component (`src/components/ui/Button.tsx`)

Template for all interactive components:
- `variant` / `size` maps with Tailwind class composition
- `isLoading` with built-in spinner + `aria-busy`
- `leftIcon` / `rightIcon` with `aria-hidden="true"`
- WCAG 2.5.5 minimum 44px touch targets
- `cn()` (clsx + tailwind-merge) for safe class overriding

### ErrorBoundary (`src/components/ErrorBoundary.tsx`)

- Dev-only error details with `import.meta.env.DEV`
- Graceful fallback with retry + home navigation
- Custom `fallback` prop support

## 9. Custom Hook Pattern (`useStoreItems`)

Standard data-fetching hook template:
```typescript
function useApiData(params): { data, loading, error, refetch } {
  const [data, setData] = useState(initial)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  // fetch on param change, return state + refetch
}
```

Clean separation: hook handles state, service layer (`graphql.ts`) handles API calls, data layer (`products.ts`) handles filtering logic.

## 10. App Shell Pattern (`App.tsx`)

Minimal but complete app shell:
```
ErrorBoundary
  └── Router
       ├── ScrollToTop
       ├── GoogleAnalytics
       ├── SEOHead
       ├── StructuredData (JSON-LD)
       ├── SkipLinks
       ├── PageHeader
       ├── <main> + Suspense(lazy routes)
       └── PageFooter
```

Every concern is a single component at the top level — easy to add/remove.

## 11. Vite Config Best Practices

```typescript
resolve: {
  alias: { '@': path.resolve(__dirname, 'src') },
  react: path.resolve(__dirname, 'node_modules/react'),  // deduplicate
}
```

Plus `vite-imagetools` plugin and dev proxy setup — clean starting point.

## Starter Template Checklist

When bootstrapping a new React project from this codebase, copy:

1. `src/lib/tokens.ts` (swap values)
2. `src/lib/utils.ts` (the `cn()` function)
3. `src/types/index.ts` (generic types)
4. `src/components/accessibility/` (SkipLinks, VisuallyHidden)
5. `src/components/ErrorBoundary.tsx`
6. `src/components/ui/Button.tsx` (as component template)
7. `.github/workflows/test.yml` and `a11y-ci.yml`
8. `vitest.config.ts` + `playwright.config.ts`
9. The SEO 3-layer architecture (`lib/seo.ts` + `components/seo/`)
