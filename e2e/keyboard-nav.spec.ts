import { test, expect } from '@playwright/test';

/**
 * Keyboard Navigation Accessibility Tests
 *
 * Tests WCAG 2.1 requirements for keyboard accessibility:
 * - 2.1.1 Keyboard: All functionality is available via keyboard
 * - 2.1.2 No Keyboard Trap: Keyboard focus can move away from all components
 * - 2.4.3 Focus Order: Focus order preserves meaning and operability
 * - 2.4.7 Focus Visible: Focus indicator is visible
 */

test.describe('Keyboard Navigation', () => {
  test('should be keyboard navigable', async ({ page }) => {
    await page.goto('/');

    // Test tab order - check that focusable elements exist
    const focusableElements = page.locator('a[href], button, input, textarea, select, [tabindex]:not([tabindex="-1"])');

    const count = await focusableElements.count();
    expect(count).toBeGreaterThan(0);

    // Tab through elements and verify each focused element is visible
    // Note: On mobile, some elements may be in collapsed menus
    for (let i = 0; i < Math.min(count, 10); i++) {
      await page.keyboard.press('Tab');
      const focusedElement = page.locator(':focus');

      // Check if element exists in DOM (it may be hidden in collapsed menu on mobile)
      const elementCount = await focusedElement.count();
      expect(elementCount).toBeGreaterThan(0);

      // Only check visibility if the element is not in a hidden container
      // On mobile, navigation may be collapsed in hamburger menu
      const isVisible = await focusedElement.isVisible().catch(() => false);

      // Element should either be visible, or if hidden, it should be in a collapsed menu
      // (which is acceptable - keyboard users can open the menu to access these items)
      if (!isVisible) {
        // Verify the hidden element is in a menu or container that can be opened
        const isInHiddenContainer = await focusedElement.evaluate(el => {
          let parent = el.parentElement;
          while (parent) {
            const styles = window.getComputedStyle(parent);
            // Check if parent is hidden or has overflow hidden with small size
            if (styles.display === 'none' ||
                styles.visibility === 'hidden' ||
                (styles.overflow === 'hidden' && parent.offsetHeight < 50)) {
              return true;
            }
            parent = parent.parentElement;
          }
          return false;
        });
        // If element is hidden, it should be in a collapsible container
        expect(isInHiddenContainer).toBeTruthy();
      }
    }
  });

  test('should have visible focus indicators', async ({ page }) => {
    await page.goto('/');

    // Get a visible link (not skip links which are off-screen until focused)
    // Look for navigation links specifically which have ring-2 focus styles
    const navLink = page.locator('nav a[href]').first();
    const count = await navLink.count();

    if (count > 0) {
      await navLink.focus();

      // Check for focus styles - element should have some visual indication
      const focusOutline = await navLink.evaluate(el => {
        const styles = window.getComputedStyle(el);
        return {
          outline: styles.outline,
          boxShadow: styles.boxShadow,
          border: styles.border,
          outlineOffset: styles.outlineOffset
        };
      });

      // At least one focus indicator should be present
      const hasFocusIndicator =
        focusOutline.outline !== 'none' ||
        focusOutline.boxShadow !== 'none' ||
        (focusOutline.border !== 'none' && focusOutline.border !== '0px');

      expect(hasFocusIndicator).toBeTruthy();
    } else {
      // Fallback to any link if nav not found
      const firstLink = page.locator('a[href]:not(.skip-to-main)').first();
      await firstLink.focus();

      const isVisible = await firstLink.isVisible();
      expect(isVisible).toBeTruthy();
    }
  });

  test('should support skip links', async ({ page }) => {
    await page.goto('/');

    // Find skip links (links with href starting with #)
    const skipLink = page.locator('a[href^="#"]').first();
    const count = await skipLink.count();

    if (count > 0) {
      // Focus the skip link to make it visible
      await skipLink.focus();
      const isVisible = await skipLink.isVisible();
      expect(isVisible).toBeTruthy();

      // Press Enter to activate
      await skipLink.press('Enter');

      // Check that we jumped to the target (URL should have hash)
      const url = page.url();
      expect(url).toContain('#');
    }
  });
});
