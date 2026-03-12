/**
 * Design Tokens — Lety's Buko Pie
 *
 * TypeScript mirror of CSS custom properties in src/tokens.css
 * Use these values in JS/TSX contexts like:
 * - Inline styles (style={{ backgroundColor: tokens.colors.brandAccent }})
 * - Canvas drawing
 * - Leaflet map styling
 * - Dynamic class generation
 *
 * NOTE: Keep this file in sync with src/tokens.css
 */

// Brand Colors — raw color values
export const BRAND_COLORS = {
  gold:   '#C29600',
  forest: '#074621',
  olive:  '#6B8A28',
  fern:   '#476C2D',
  moss:   '#4D4A0E',
} as const;

// Semantic Brand Colors — what components should reference
export const BRAND_COLORS_SEMANTIC = {
  primary:  BRAND_COLORS.forest,   // main CTAs, headings
  accent:   BRAND_COLORS.gold,     // highlights, secondary buttons
  muted:    BRAND_COLORS.olive,    // hover states, tertiary
  dark:     BRAND_COLORS.fern,     // dark green variants
  darkest:  BRAND_COLORS.moss,     // brown-green variants
} as const;

// Surface Colors
export const SURFACE_COLORS = {
  cream:  '#FFF8E0',
  sage:   '#E6F0C3',
  base:   '#FAFAF8',
  white:  '#FFFFFF',
} as const;

// Text Colors
export const TEXT_COLORS = {
  default:  '#1F2937',
  muted:    '#4B5563',
  light:    '#6B7280',
  inverse:  '#FFFFFF',
} as const;

// Overlay Colors — rgba values for hero banners, modals
export const OVERLAY_COLORS = {
  light:  'rgba(0, 0, 0, 0.4)',
  medium: 'rgba(0, 0, 0, 0.5)',
  heavy:  'rgba(0, 0, 0, 0.6)',
  black:  'rgba(0, 0, 0, 0.7)',
} as const;

// Status Colors
export const STATUS_COLORS = {
  error:    '#DC2626',
  errorBg:  '#FEE2E2',
  success:  '#16A34A',
  successBg: '#DCFCE7',
  warning:  '#F59E0B',
  warningBg: '#FEF3C7',
  info:     '#3B82F6',
  infoBg:   '#DBEAFE',
} as const;

// Typography
export const TYPOGRAPHY = {
  fonts: {
    heading: "'Figtree', ui-sans-serif, system-ui, sans-serif",
    body:    "'Figtree', ui-sans-serif, system-ui, sans-serif",
    mono:    "ui-monospace, 'SF Mono', 'Roboto Mono', monospace",
  },
  sizes: {
    xs:   '0.75rem',    // 12px
    sm:   '0.875rem',   // 14px
    base: '1rem',       // 16px
    lg:   '1.125rem',   // 18px
    xl:   '1.25rem',    // 20px
    '2xl': '1.5rem',    // 24px
    '3xl': '1.875rem',  // 30px
    '4xl': '2.25rem',   // 36px
    '5xl': '3rem',      // 48px
    '6xl': '3.75rem',   // 60px
  },
  weights: {
    normal:   400,
    medium:   500,
    semibold: 600,
    bold:     700,
    extrabold: 800,
  },
  lineHeights: {
    none:    1,
    tight:   1.2,
    snug:    1.375,
    normal:  1.5,
    relaxed: 1.625,
    loose:   2,
  },
} as const;

// Spacing Scale (4px base unit)
export const SPACING = {
  0:   '0',
  px:  '1px',
  '0_5': '0.125rem',  // 2px
  1:   '0.25rem',   // 4px
  2:   '0.5rem',    // 8px
  3:   '0.75rem',   // 12px
  4:   '1rem',      // 16px
  5:   '1.25rem',   // 20px
  6:   '1.5rem',    // 24px
  8:   '2rem',      // 32px
  10:  '2.5rem',    // 40px
  12:  '3rem',      // 48px
  16:  '4rem',      // 64px
  20:  '5rem',      // 80px
  24:  '6rem',      // 96px
  32:  '8rem',      // 128px
} as const;

// Border Radius
export const RADIUS = {
  none:  '0',
  sm:    '0.25rem',  // 4px
  base:  '0.375rem', // 6px
  md:    '0.5rem',   // 8px
  lg:    '0.75rem',  // 12px
  xl:    '1rem',     // 16px
  '2xl': '1.5rem',   // 24px
  '3xl': '2rem',     // 32px
  full:  '9999px',
} as const;

// Shadows
export const SHADOWS = {
  sm:  '0 1px 2px 0 rgb(0 0 0 / 0.05)',
  base: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
  md:  '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
  lg:  '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
  xl:  '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
  '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
  inner: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',
} as const;

// Motion / Animation
export const MOTION = {
  duration: {
    instant: 50,
    fast:    150,
    normal:  200,
    slow:    300,
    slower:  500,
  },
  easing: {
    default: 'cubic-bezier(0.4, 0, 0.2, 1)',
    in:      'cubic-bezier(0.4, 0, 1, 1)',
    out:     'cubic-bezier(0, 0, 0.2, 1)',
    inOut:   'cubic-bezier(0.4, 0, 0.6, 1)',
    bounce:  'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
  },
} as const;

// Z-Index Scale
export const Z_INDEX = {
  base:     0,
  raised:   10,
  dropdown: 20,
  sticky:   40,
  overlay:  50,
  modal:    100,
  popover:  200,
  tooltip:  300,
  skip:     9999,
} as const;

// Layout
export const LAYOUT = {
  container: {
    sm:  '640px',
    md:  '768px',
    lg:  '1024px',
    xl:  '1280px',
    '2xl': '1536px',
  },
  breakpoints: {
    xs:  375,
    sm:  640,
    md:  768,
    lg:  1024,
    xl:  1280,
    '2xl': 1536,
  },
} as const;

// Interaction
export const INTERACTION = {
  touchTarget: 44, // WCAG 2.5.5 minimum
  focusRing: {
    width:  2,
    offset: 2,
    color:  BRAND_COLORS.gold,
  },
} as const;

// Consolidated tokens object for easy importing
export const tokens = {
  colors: {
    brand:      BRAND_COLORS_SEMANTIC,
    surface:    SURFACE_COLORS,
    text:       TEXT_COLORS,
    overlay:    OVERLAY_COLORS,
    status:     STATUS_COLORS,
  },
  typography: TYPOGRAPHY,
  spacing:    SPACING,
  radius:     RADIUS,
  shadows:    SHADOWS,
  motion:     MOTION,
  zIndex:     Z_INDEX,
  layout:     LAYOUT,
  interaction: INTERACTION,
} as const;

// Type exports for type safety
export type BrandColor = keyof typeof BRAND_COLORS_SEMANTIC;
export type SurfaceColor = keyof typeof SURFACE_COLORS;
export type TextColor = keyof typeof TEXT_COLORS;
export type OverlayColor = keyof typeof OVERLAY_COLORS;
export type StatusColor = keyof typeof STATUS_COLORS;
export type FontSize = keyof typeof TYPOGRAPHY.sizes;
export type FontWeight = keyof typeof TYPOGRAPHY.weights;
export type LineHeight = keyof typeof TYPOGRAPHY.lineHeights;
export type Space = keyof typeof SPACING;
export type Radius = keyof typeof RADIUS;
export type Shadow = keyof typeof SHADOWS;
export type Duration = keyof typeof MOTION.duration;
export type Easing = keyof typeof MOTION.easing;
export type ZIndex = keyof typeof Z_INDEX;

// Helper functions for common token operations

/**
 * Get a brand color by key
 */
export function getBrandColor(key: BrandColor): string {
  return BRAND_COLORS_SEMANTIC[key];
}

/**
 * Get a surface color by key
 */
export function getSurfaceColor(key: SurfaceColor): string {
  return SURFACE_COLORS[key];
}

/**
 * Get spacing value in rem
 */
export function space(value: Space): string {
  return SPACING[value];
}

/**
 * Get duration in ms
 */
export function duration(key: Duration = 'normal'): number {
  return MOTION.duration[key];
}

/**
 * Get easing function
 */
export function easing(key: Easing = 'default'): string {
  return MOTION.easing[key];
}

/**
 * Create a transition string
 */
export function transition(
  property: string,
  dur: Duration = 'normal',
  ease: Easing = 'default'
): string {
  return `${property} ${MOTION.duration[dur]}ms ${MOTION.easing[ease]}`;
}
