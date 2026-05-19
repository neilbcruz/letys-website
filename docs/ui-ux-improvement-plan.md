# UI/UX Improvement Plan — Lety's Buko Pie

**Created**: 2026-05-20
**Based on**: Design guide audit
**Overall Goal**: Raise design system maturity from 7.7/10 to 9/10+

---

## Phase 1: Quick Wins (1-2 hours)

### 1.1 Typography Tightening
**File**: `src/index.css`
**Effort**: 5 minutes

```diff
h3 {
  font-size: clamp(1.25rem, 2vw + 0.5rem, 2rem);
- line-height: 1.4;
+ line-height: 1.2;
}
```

Add letter-spacing to headings:
```css
h1, h2, h3, h4, h5, h6 {
  font-family: var(--font-heading);
+ letter-spacing: -0.025em;
}
```

### 1.2 Button Active States
**File**: `src/components/ui/Button.tsx`
**Effort**: 10 minutes

Add to each variant:
```tsx
primary: [
  'bg-primary-2',
  'text-fg-inverse',
  'hover:bg-primary-3',
+ 'active:scale-95',
+ 'active:bg-primary-4',
  'focus:ring-primary-1',
].join(' '),
```

### 1.3 Button Width:Height Ratio
**File**: `src/components/ui/Button.tsx`
**Effort**: 5 minutes

```diff
const sizes = {
- sm: 'text-sm px-4 py-2.5 min-h-[44px] min-w-[44px]',
+ sm: 'text-sm px-6 py-2 min-h-[44px] min-w-[44px]',
- md: 'text-base px-5 py-3 min-h-[48px] min-w-[48px]',
+ md: 'text-base px-8 py-3 min-h-[48px] min-w-[48px]',
- lg: 'text-lg px-7 py-4 min-h-[52px] min-w-[52px]',
+ lg: 'text-lg px-10 py-4 min-h-[52px] min-w-[52px]',
};
```

---

## Phase 2: Icon Consistency (30 minutes)

### 2.1 Replace Emoji Icons with Lucide
**Files**: `src/pages/FaqPage.tsx`, `src/pages/ProductsPage.tsx`
**Effort**: 30 minutes

**FaqPage.tsx**:
```diff
+ import { Coconut, MapPin, MessageCircle } from 'lucide-react';

// Replace emoji divs with icons:
- <div className="mb-4 text-4xl">🥥</div>
+ <Coconut className="w-12 h-12 mx-auto mb-4 text-primary-2" />

- <div className="mb-4 text-4xl">📍</div>
+ <MapPin className="w-12 h-12 mx-auto mb-4 text-primary-2" />

- <div className="mb-4 text-4xl">💬</div>
+ <MessageCircle className="w-12 h-12 mx-auto mb-4 text-primary-2" />
```

**ProductsPage.tsx** store icons:
- Keep store icons as emoji if they represent brand personality
- OR create custom icon components for each location
- Decision point: Brand consistency vs. playful personality

---

## Phase 3: Token Cleanup (30 minutes)

### 3.1 Remove Legacy Color Aliases
**File**: `src/tokens.css`
**Effort**: 20 minutes

1. Search codebase for usage of legacy tokens:
   - `--color-text-default`
   - `--color-text-muted`
   - `--color-text-light`
   - `--color-text-inverse`
   - `--color-error`
   - `--color-error-bg`
   - `--color-success`
   - `--color-success-bg`
   - `--color-warning`
   - `--color-warning-bg`
   - `--color-info`
   - `--color-info-bg`

2. Replace with semantic equivalents:
   - `--color-text-default` → `--color-fg-default`
   - `--color-text-muted` → `--color-fg-muted`
   - `--color-error` → `--color-status-error-fg`
   - etc.

3. Remove lines 90-110 from `tokens.css`

### 3.2 Define Semantic Height Tokens
**File**: `src/tokens.css`
**Effort**: 10 minutes

Add to spacing section:
```css
/* ─── Component Heights ───────────────────────────────────── */
--height-card-image:   12rem;  /* 192px - from Card.tsx */
--height-hero-narrow:  220px;
--height-hero-mobile:  60vh;
--height-hero-tablet:  70vh;
--height-hero-desktop: 80vh;
```

Update `HeroBanner.tsx` to use tokens:
```tsx
className="w-full h-[var(--height-hero-mobile)] sm:h-[var(--height-hero-tablet)] lg:h-[var(--height-hero-desktop)]"
```

---

## Phase 4: Spacing Consistency (1 hour)

### 4.1 Audit Hardcoded Spacing
**Files to check**:
- `src/components/ui/HeroBanner.tsx`
- `src/components/ui/Card.tsx`
- `src/components/layout/PageHeader.tsx`

**Action**: Replace arbitrary values with tokens

### 4.2 Standardize Responsive Padding
**Pattern to follow**:
```tsx
// Instead of: p-4 md:p-6 lg:p-8
// Use: p-[var(--space-4)] md:p-[var(--space-6)] lg:p-[var(--space-8)]
```

---

## Phase 5: Dark Mode Foundation (2-3 hours)

### 5.1 Create Dark Mode Tokens
**File**: `src/tokens.css` (new section)
**Effort**: 1 hour

Add dedicated dark mode palette:
```css
@media (prefers-color-scheme: dark) {
  :root {
    /* ─── Dark Surfaces ───────────────────────────────────── */
    --color-surface-base:    #1A1A18;
    --color-surface-subtle:  #242421;
    --color-surface-muted:   #2E2E2B;
    --color-surface-emphasis:#3A3A36;

    /* ─── Dark Foreground ─────────────────────────────────── */
    --color-fg-default:     #F5F5F0;
    --color-fg-strong:      #FFFFFF;
    --color-fg-base:        #DDDDD8;
    --color-fg-muted:       #C8C8C2;
    --color-fg-subtle:      #9A9A90;
    --color-fg-faint:       #70706B;

    /* ─── Adjust brand colors for dark mode ──────────────── */
    --color-brand-accent:   #D4A520;  /* Lighter gold */
  }
}
```

### 5.2 Add Dark Mode Toggle
**File**: `src/components/layout/PageHeader.tsx`
**Effort**: 1 hour

Add theme provider component with toggle button.

### 5.3 Test Components in Dark Mode
**Effort**: 1 hour

Verify all components work in dark mode.

---

## Phase 6: Component Polish (1 hour)

### 6.1 Add Pressed States Globally
**File**: `src/index.css`
**Effort**: 15 minutes

```css
@layer components {
  button, a, [role="button"] {
    @apply active:scale-95 transition-transform duration-75;
  }
}
```

### 6.2 Review Card Hover Effects
**File**: `src/components/ui/Card.tsx`
**Effort**: 15 minutes

Current: `hover:-translate-y-1`
Consider: Subtle shadow increase instead of lift

### 6.3 Standardize Icon Sizing
**Pattern**: Match icon size to text line-height
```tsx
// For text-base (16px, leading-relaxed ~26px)
<Icon className="w-6 h-6" />

// For text-lg (18px, leading-relaxed ~29px)
<Icon className="w-7 h-7" />
```

---

## Implementation Order

| Phase | Tasks | Time | Priority |
|-------|-------|------|----------|
| 1 | Typography, button states, ratios | 20 min | 🔴 High |
| 2 | Replace emoji icons | 30 min | 🔴 High |
| 3 | Token cleanup | 30 min | 🟡 Medium |
| 4 | Spacing consistency | 1 hour | 🟡 Medium |
| 5 | Dark mode | 3 hours | 🟢 Low |
| 6 | Component polish | 1 hour | 🟢 Low |

**Total**: ~6 hours for full implementation

**Quick Win Bundle** (Phases 1-2): 50 minutes → 8.5/10 score

---

## Testing Checklist

After each phase:
- [ ] Run `npm run lint` — no errors
- [ ] Run `npm run test` — all tests pass
- [ ] Manual visual check of changed components
- [ ] Verify WCAG contrast still passes
- [ ] Test keyboard navigation
- [ ] Test touch targets on mobile

---

## Rollback Plan

Each phase is independently reversible. Commit after each completed phase:

```bash
git commit -m "feat(ui): phase 1 - typography and button improvements"
```

If issues arise, revert specific phase commit without losing other work.
