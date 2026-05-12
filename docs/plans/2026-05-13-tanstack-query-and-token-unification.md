# TanStack Query Migration & Token Unification

> **For Hermes:** Use subagent-driven-development skill to implement this plan task-by-task.

**Goal:** Replace manual `useState`+`useEffect` data fetching with TanStack Query, and eliminate the dead `lib/tokens.ts` file to establish a single source of truth for design tokens.

**Architecture:** TanStack Query wraps the existing `getStoreItems` GraphQL service call with caching, deduplication, and stale-while-revalidate. The hook API surface changes minimally — consumers swap `loading`→`isLoading`, `items`→`data`, and `refetch` stays the same. Token unification is a pure deletion — `lib/tokens.ts` has zero imports.

**Tech Stack:** `@tanstack/react-query` v5, existing `src/services/graphql.ts`

---

## Existing vs New

### Already done (no work needed)
- GraphQL service layer (`src/services/graphql.ts`) — keeps working as-is
- `src/data/products.ts` static data — untouched
- `tokens.css` + `index.css` @theme mapping — single source of truth, stays

### New work
| # | Feature | Files Changed | Depends On |
|---|---------|---------------|------------|
| 1 | Install TanStack Query | `package.json` | — |
| 2 | QueryClient provider | `src/main.tsx` | 1 |
| 3 | Query keys factory | `src/hooks/query-keys.ts` (new) | 1 |
| 4 | Rewrite `useStoreItems` hook | `src/hooks/useStoreItems.ts` | 2, 3 |
| 5 | Migrate `ProductsPage` | `src/pages/ProductsPage.tsx` | 4 |
| 6 | Migrate `LocationsPage` | `src/pages/LocationsPage.tsx` | 4 |
| 7 | Migrate `ProductsAvailabilityPage` | `src/pages/ProductsAvailabilityPage.tsx` | 4 |
| 8 | Delete `QuickStartInventory` example | `src/examples/QuickStartInventory.tsx` | 4 |
| 9 | Delete `lib/tokens.ts` | `src/lib/tokens.ts` | — |
| 10 | Delete `examples/` barrel if empty | `src/examples/` | 8 |

---

## Phase 1: TanStack Query Infrastructure

### Task 1: Install TanStack Query

**Objective:** Add `@tanstack/react-query` dependency.

**Files:**
- Modify: `package.json`

**Step 1: Install**

```bash
cd /workspace/github/letys-website && npm install @tanstack/react-query
```

**Step 2: Verify install**

Run: `grep '"@tanstack/react-query"' package.json`
Expected: version string present

**Step 3: Commit**

```bash
git add package.json package-lock.json
git commit -m "chore: install @tanstack/react-query"
```

---

### Task 2: Add QueryClientProvider to App

**Objective:** Wrap the app with `QueryClientProvider` so all hooks have access to the query client.

**Files:**
- Modify: `src/main.tsx`

**Step 1: Update main.tsx**

```tsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import './index.css'
import App from './App'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 2, // 2 min — inventory doesn't change every second
      retry: 1,
      refetchOnWindowFocus: true,
    },
  },
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <HelmetProvider>
        <App />
      </HelmetProvider>
    </QueryClientProvider>
  </StrictMode>,
)
```

**Step 2: Verify build**

Run: `npx tsc --noEmit`
Expected: 0 errors

**Step 3: Commit**

```bash
git add src/main.tsx
git commit -m "feat: add QueryClientProvider to app root"
```

---

### Task 3: Create Query Keys Factory

**Objective:** Centralize all query keys in one file for invalidation and cache control.

**Files:**
- Create: `src/hooks/query-keys.ts`

**Step 1: Create query keys**

```typescript
// src/hooks/query-keys.ts
export const queryKeys = {
  storeItems: (storeName: string, params?: { category?: string; itemName?: string; pageNumber?: number; pageSize?: number }) =>
    ['storeItems', storeName, params] as const,
} as const
```

**Step 2: Verify build**

Run: `npx tsc --noEmit`
Expected: 0 errors

**Step 3: Commit**

```bash
git add src/hooks/query-keys.ts
git commit -m "feat: add query keys factory"
```

---

### Task 4: Rewrite `useStoreItems` Hook

**Objective:** Replace `useState`+`useEffect` with `useQuery`. Maintain the same external API shape where possible, but use TanStack Query's standard return (`data`, `isLoading`, `error`, `refetch`).

**Files:**
- Modify: `src/hooks/useStoreItems.ts`

**Step 1: Rewrite the hook**

```typescript
// src/hooks/useStoreItems.ts
import { useQuery } from '@tanstack/react-query';
import { getStoreItems, type StoreItem, type QueryParams } from '@/services/graphql';
import { isAvailableInStore } from '@/data/products';
import { queryKeys } from './query-keys';

export interface UseStoreItemsResult {
  items: StoreItem[];
  loading: boolean;
  error: Error | null;
  refetch: () => void;
}

export function useStoreItems(params: QueryParams): UseStoreItemsResult {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: queryKeys.storeItems(params.storeName, {
      category: params.category,
      itemName: params.itemName,
      pageNumber: params.pageNumber,
      pageSize: params.pageSize,
    }),
    queryFn: async () => {
      const items = await getStoreItems(params);
      return items.filter(item => isAvailableInStore(params.storeName, item.name));
    },
  });

  return {
    items: data ?? [],
    loading: isLoading,
    error: error,
    refetch: () => refetch(),
  };
}
```

**Why this shape?** Returning `{ items, loading, error, refetch }` instead of the raw `useQuery` result means the 3 consuming pages + 1 example need minimal changes. The adapter is 5 lines. We can flatten to raw `useQuery` later in a separate cleanup if desired.

**Step 2: Verify build**

Run: `npx tsc --noEmit`
Expected: 0 errors

**Step 3: Commit**

```bash
git add src/hooks/useStoreItems.ts
git commit -m "refactor: rewrite useStoreItems with TanStack Query"
```

---

## Phase 2: Migrate Consumers (No Behavioral Changes)

The adapter return shape in Task 4 means consumers don't need changes for the hook API — `items`, `loading`, `error`, `refetch` all still work. But we should verify each page still builds cleanly.

### Task 5: Verify `ProductsPage`

**Objective:** Confirm ProductsPage works with the rewritten hook unchanged.

**Files:**
- Read-only: `src/pages/ProductsPage.tsx`

**Step 1: Typecheck**

Run: `npx tsc --noEmit`
Expected: 0 errors (the adapter preserves the old interface)

No code changes needed. The page already destructures `{ items, loading, error, refetch }`.

---

### Task 6: Verify `LocationsPage`

**Objective:** Confirm LocationsPage works with the rewritten hook unchanged.

**Files:**
- Read-only: `src/pages/LocationsPage.tsx`

**Step 1: Typecheck**

Run: `npx tsc --noEmit`
Expected: 0 errors

No code changes needed. The `LocationInventoryPreview` subcomponent destructures `{ items, loading }`.

---

### Task 7: Verify `ProductsAvailabilityPage`

**Objective:** Confirm ProductsAvailabilityPage works with the rewritten hook unchanged.

**Files:**
- Read-only: `src/pages/ProductsAvailabilityPage.tsx`

**Step 1: Typecheck**

Run: `npx tsc --noEmit`
Expected: 0 errors

No code changes needed. The page calls `useStoreItems` 3 times and destructures `{ items, loading, error }`.

---

### Task 8: Delete `QuickStartInventory` Example

**Objective:** Remove dead example code that shouldn't ship in production.

**Files:**
- Delete: `src/examples/QuickStartInventory.tsx`
- Possibly delete: `src/examples/` directory if empty

**Step 1: Check for other imports**

Run: `grep -rn "QuickStartInventory\|examples/" src/ --include="*.tsx" --include="*.ts"`
Expected: only the file itself and maybe its own import

**Step 2: Delete**

```bash
rm src/examples/QuickStartInventory.tsx
rmdir src/examples/ 2>/dev/null || true
```

**Step 3: Verify build**

Run: `npx tsc --noEmit`
Expected: 0 errors

**Step 4: Commit**

```bash
git add -A
git commit -m "chore: remove QuickStartInventory example"
```

---

## Phase 3: Token Unification

### Task 9: Delete `lib/tokens.ts`

**Objective:** Remove the dead TypeScript mirror of CSS tokens. It has zero imports and is already out of sync with `tokens.css` (olive: `#5E7E22` vs `#6B8A28`).

**Files:**
- Delete: `src/lib/tokens.ts`

**Step 1: Confirm zero imports**

Run: `grep -rn "lib/tokens" src/ --include="*.ts" --include="*.tsx"`
Expected: only self-references in `tokens.ts` itself

**Step 2: Delete**

```bash
rm src/lib/tokens.ts
```

**Step 3: Verify build**

Run: `npx tsc --noEmit`
Expected: 0 errors

**Step 4: Commit**

```bash
git add -A
git commit -m "chore: delete dead lib/tokens.ts (zero imports, drifted from tokens.css)"
```

---

## Phase 4: Final Verification

### Task 10: Full Build + Lint

**Objective:** Confirm everything compiles and lints clean.

**Step 1: Typecheck**

Run: `npx tsc --noEmit`
Expected: 0 errors

**Step 2: Lint**

Run: `npm run lint`
Expected: 0 errors, 0 warnings

**Step 3: Build**

Run: `npm run build`
Expected: clean build, no warnings

**Step 4: Verify no legacy patterns remain**

Run: `grep -rn "useState.*useEffect.*getStoreItems\|useEffect.*fetchItems" src/`
Expected: 0 results

**Step 5: Final commit**

```bash
git add -A
git commit -m "feat: TanStack Query migration + token unification complete"
```

---

## Summary

| Phase | Tasks | Net Lines Changed |
|-------|-------|-------------------|
| Phase 1: Infrastructure | 4 | +30, +1 dep |
| Phase 2: Verify consumers | 4 | 0 (adapter preserves API) |
| Phase 3: Token cleanup | 1 | -210 (delete tokens.ts) |
| Phase 4: Verification | 1 | 0 |

**Total: 10 tasks, ~2 hours of work.** Pages need zero code changes because the hook adapter preserves the old `{ items, loading, error, refetch }` interface.
