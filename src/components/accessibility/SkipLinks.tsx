// src/components/accessibility/SkipLinks.tsx

/**
 * SkipLinks component for keyboard navigation accessibility
 *
 * Provides "skip to" links that allow keyboard users to bypass
 * repetitive navigation and jump directly to main content areas.
 * These links are hidden until focused, meeting WCAG 2.1 AA requirements.
 *
 * @component
 * @returns {JSX.Element} Skip links for main content, navigation, and footer
 *
 * @example
 * ```typescript
 * // Place at the top of your app
 * <SkipLinks />
 *
 * // Ensure corresponding IDs exist in your markup:
 * <main id="main-content">
 * <nav id="navigation">
 * <footer id="footer">
 * ```
 *
 * @accessibility
 * - Links are visually hidden until focused (sr-only pattern)
 * - Appears on focus when user tabs through the page
 * - Allows keyboard users to skip repetitive navigation
 * - Required for WCAG 2.1 AA compliance (2.4.1 Bypass Blocks)
 * - Each link corresponds to an element with matching ID
 *
 * @see https://www.w3.org/WAI/WCAG21/Understanding/bypass-blocks.html
 */
export function SkipLinks() {
  return (
    <>
      <a href="#main-content" className="skip-to-main">
        Skip to main content
      </a>
      <a href="#navigation" className="skip-to-main">
        Skip to navigation
      </a>
      <a href="#footer" className="skip-to-main">
        Skip to footer
      </a>
    </>
  );
}