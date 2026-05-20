# Design Improvement Audit

This audit checks which recommendations from the shared design improvement guide can be applied to the Lety's website repo.

## Summary

Several guide items are already reflected in the site: dark mode foundation, Lucide icons, real product imagery, button interaction states, hero sizing tokens, and tighter typography. The highest-value remaining work is token cleanup, fixing mismatched Tailwind token references, and polishing component semantics and interactions.

No code changes were made as part of this audit.

## Already Applied

- Dark mode foundation and theme toggle exist.
- FAQ decorative emoji icons have been replaced with Lucide icons.
- Button loading and active states are present.
- Hero height tokens exist.
- Heading typography has been tightened.
- Real product and store imagery is already used across the site.

## Best Remaining Candidates

### 1. Clean Up Token Aliases

`src/tokens.css` still contains legacy aliases such as:

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

The repo quality baseline says `tokens.css` should be the source of truth with no duplicate alias layers. The next token pass should consolidate these into the semantic token model already used elsewhere.

### 2. Fix Tailwind Token Mismatches

`src/components/ui/SelectPicker.tsx` references token classes such as:

- `focus:ring-primary-500/20`
- `focus:border-primary-500`
- `border-primary-500`
- `hover:bg-primary-50`
- `hover:text-primary-700`
- `bg-primary-100`
- `text-primary-700`

The local Tailwind token bridge appears to expose the primary scale as `primary-1`, `primary-2`, and `primary-3`, so these classes may not resolve correctly. This is the most concrete implementation bug found in the audit.

### 3. Refine Hero Treatment

`src/components/ui/HeroBanner.tsx` currently uses a heavy translucent panel over the hero image. The guide direction would fit better with an image-first treatment: a softer scrim or gradient overlay with direct text overlay, keeping the product or store image more visible.

### 4. Reduce Heavy Hover Scaling

Several home and product elements use larger scale effects such as `hover:scale-105` and `group-hover:scale-110`.

The guide favors subtler interaction patterns for commerce and operational UI. These could be changed to smaller motion, border emphasis, shadow changes, or color changes.

Relevant areas:

- `src/components/home/PageBody.tsx`
- `src/components/products/ProductCardWithStock.tsx`

### 5. Improve Card Semantics

`src/components/ui/Card.tsx` hardcodes accessibility roles and labels such as:

- `role="article"`
- `aria-label="Service card"`
- `role="heading"`
- `aria-level={2}`
- `role="region"`
- `aria-label="Service details"`

These labels are service-specific and may become misleading when the card is reused in other contexts. Prefer semantic markup from the consuming content, or make roles and labels optional props.

### 6. Clarify Product Card Actions

`src/pages/ProductsPage.tsx` wraps product cards in an element with `role="button"` and keyboard handlers mainly for click tracking.

If the card does not navigate, open a detail view, or trigger a clear action, it should probably not be announced as a button. Either make the card perform a real action or keep the card non-interactive and track impressions another way.

### 7. Standardize Filter Controls

The products page uses custom store tabs and a raw category `<select>`. These could be aligned with reusable design-system primitives:

- Segmented control for store switching.
- Shared select/picker for category filtering.
- Shared search input for product filtering.

### 8. Make Header Navigation Adaptive

The current brand direction would benefit from a nav that feels integrated with the page instead of relying on a permanent brand-color bar.

Recommended behavior:

- Transparent or lightly scrimmed nav over the homepage hero.
- Neutral surface nav after scroll and on non-hero pages.
- Solid elevated surface when the mobile menu is open.
- Brand green for active links and focus states.
- Avoid large yellow nav surfaces because they compete with the logo and product imagery.

### 9. Clarify CTA Hierarchy

Some pages use multiple card-like links and buttons with similar visual weight. The guide recommends making the primary action obvious and reducing competing affordances.

Apply this to:

- Homepage sections with multiple calls to action.
- Contact page email and Messenger cards.
- Product pages with refresh, filter, store tabs, and product cards.
- Location cards with map links, open status, hours, and inventory previews.

Recommended approach:

- One primary CTA per section.
- Secondary actions as quieter outline, ghost, or text-link treatments.
- Avoid making every card feel equally clickable unless every card has the same task priority.

### 10. Standardize Empty, Error, and Loading States

The repo already has loading, error, and empty-state components, but the design guide suggests treating feedback states as part of the system rather than page-specific decoration.

Recommended additions:

- Document a standard empty-state structure: icon, title, short explanation, optional action.
- Document a standard error-state structure: severity, message, retry action, support path.
- Document loading behavior for product grids, availability tables, and location inventory.
- Ensure loading states use `aria-busy`, `role="status"`, or `aria-live` consistently.

Relevant areas:

- `src/components/layout/EmptyState.tsx`
- `src/components/layout/ErrorState.tsx`
- `src/components/ui/LoadingStates.tsx`
- `src/pages/ProductsPage.tsx`
- `src/pages/ProductsAvailabilityPage.tsx`

### 11. Refine Contact Cards

`src/pages/ContactPage.tsx` uses large card links with `hover:scale-105`. The content is clear, but the interaction can be more restrained.

Recommended changes:

- Replace large scale hover with border, shadow, or icon-surface changes.
- Make the action affordance explicit, such as "Email us" and "Open Messenger".
- Keep the card layout compact on mobile so the contact methods scan quickly.

### 12. Revisit Footer Brand Treatment

`src/components/layout/PageFooter.tsx` uses a solid primary background. This may still work, but after adopting the green-led palette it should be checked against the logo and dark mode.

Recommended options:

- Deep green footer with warm off-white text.
- Neutral footer with green links and logo prominence.
- Avoid yellow footer backgrounds.
- Use Lucide or a small shared icon component for social/contact icons if the custom SVG paths become harder to maintain.

### 13. Improve Product Availability Density

`src/pages/ProductsAvailabilityPage.tsx` is closer to a dashboard/listing surface than a marketing page. The guide's dashboard advice partly applies here.

Recommended changes:

- Keep inventory comparison dense but grouped.
- Use status badges and small summaries instead of large repeated metric cards.
- Make unavailable, low-stock, and in-stock states visually distinct but not equally loud.
- Consider compact table/list variants for mobile inventory comparison.

### 14. Audit Contrast for Brand Yellow and Green

The logo palette includes saturated yellow and deep green. Before using these as UI tokens, test contrast in the real components.

Check:

- Green button background with white or warm-white text.
- Yellow badge background with dark green text.
- Yellow hover/focus surfaces behind green text.
- Dark-mode yellow accents, which can glow or feel too saturated.
- Product cards and hero overlays where text sits near bright image areas.

### 15. Document Motion Rules

The repo has reduced-motion handling in `src/index.css`, which is good. The remaining improvement is to define motion rules so new components do not reintroduce heavy scaling.

Recommended rules:

- Use color, border, and shadow changes before scale changes.
- Reserve scale for small tactile feedback, not large image zooms.
- Keep transitions short for controls.
- Avoid transform effects on dense product grids if they cause visual noise.

## Partially Applicable

### Dark Mode QA

Dark mode exists, but it still needs a systematic visual audit. Image overlays, translucent surfaces, and contrast-sensitive controls should be checked in both themes.

### Image Readability

The site already uses real imagery well. The main improvement opportunity is hero readability and avoiding overly heavy overlays that hide useful image detail.

### Navigation

The public header and mobile menu exist. Larger app-shell recommendations from the guide do not directly apply unless the site adds account, dashboard, or admin views.

### Forms and Submission Feedback

The guide's form recommendations are only partially applicable because the contact page currently routes users to email or Messenger instead of using a full contact form.

If a contact form is added later, it should include:

- Clear field labels.
- Inline validation.
- Disabled and loading submit states.
- Success confirmation.
- Error recovery path.
- Analytics that does not replace user-facing feedback.

### Product and Location Cards

The card guidance applies because products, locations, contact methods, and FAQ links are all presented as card-like surfaces.

The site should keep these patterns consistent:

- Same radius scale.
- Same shadow/elevation model.
- Same hover and focus treatment.
- Clear distinction between informational cards and clickable cards.

## Mostly Not Applicable

- Pricing page guidance.
- Dashboard analytics patterns.
- Account menu and app sidebar patterns.
- Creation-flow guidance.
- Complex app-shell navigation patterns.

## Brand Palette Recommendation

The current logo uses a very strong yellow field with deep green lettering and a light green fruit mark. That combination can work, but the UI should not give yellow and green equal visual weight.

The recommended direction is **green-led, yellow-accented, neutral-supported**:

- Use deep green as the primary UI color.
- Use yellow only for small accents, promotions, highlights, and selected brand moments.
- Keep page surfaces warm neutral rather than logo yellow.
- Let the logo carry the brightest yellow moment by itself.

### Suggested OKLCH Palette

```css
--brand-green-900: oklch(0.25 0.09 150);
--brand-green-800: oklch(0.31 0.10 150);
--brand-green-700: oklch(0.38 0.11 150);
--brand-green-600: oklch(0.45 0.12 150);
--brand-green-500: oklch(0.52 0.13 150);

--brand-yellow-500: oklch(0.86 0.17 88);
--brand-yellow-400: oklch(0.90 0.15 90);
--brand-yellow-100: oklch(0.97 0.045 92);

--lime-500: oklch(0.74 0.15 125);
--lime-100: oklch(0.95 0.055 125);

--surface-page: oklch(0.985 0.008 95);
--surface-base: oklch(1 0 0);
--surface-muted: oklch(0.96 0.01 100);

--text-strong: oklch(0.22 0.035 150);
--text-base: oklch(0.32 0.025 150);
--border-default: oklch(0.86 0.018 105);
```

### Usage Guidance

- Primary buttons should use deep green with high-contrast text.
- Links, active nav states, selected tabs, and focus rings should use green.
- Promo badges, limited offers, and small brand highlights can use yellow.
- Full-width yellow backgrounds should be rare because they can overpower product imagery and compete with the logo.
- The default page background should be warm off-white, not logo yellow.
- The header/nav should either blend over hero imagery or use a neutral surface on scroll and non-hero pages.
- Avoid placing the logo on a yellow navbar. Prefer white, warm off-white, transparent-over-image, or a subtle green-tinted surface.

## Suggested Implementation Order

1. Fix `SelectPicker.tsx` token class mismatches.
2. Consolidate legacy color aliases in `src/tokens.css`.
3. Adopt the green-led, yellow-accented brand palette in semantic tokens.
4. Make header navigation adaptive over hero imagery and neutral on scroll.
5. Improve `Card.tsx` semantics.
6. Refine `HeroBanner.tsx` overlay and text treatment.
7. Reduce large hover scale effects in home, contact, FAQ, location, and product cards.
8. Standardize product filters around shared controls.
9. Document empty, error, loading, and motion rules.
10. Run contrast checks for green, yellow, warning, error, and dark-mode accents.
11. Run a light and dark visual QA pass.
