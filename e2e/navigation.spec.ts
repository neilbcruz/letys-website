import { test, expect } from '@playwright/test';

/**
 * Critical Navigation Smoke Tests
 * Only tests essential navigation functionality
 */

test.describe('Navigation Smoke Tests', () => {
  test('should navigate between all main pages', async ({ page }) => {
    const routes = ['/', '/products', '/locations', '/contact'];

    for (const route of routes) {
      await page.goto(route);
      await expect(page).toHaveURL(route);
    }
  });

  test('should have working navigation links', async ({ page }) => {
    await page.goto('/');

    // On mobile, navigation is inside a hamburger menu - open it first
    const menuToggle = page.getByRole('button', { name: 'Toggle menu' });
    const isMobile = await menuToggle.isVisible().catch(() => false);

    if (isMobile) {
      await menuToggle.click();
      // Use the mobile navigation link
      await page.getByRole('navigation', { name: 'Mobile navigation' })
        .getByRole('link', { name: 'Navigate to Products' })
        .click();
    } else {
      // Desktop: click Products link in main navigation
      await page.getByRole('link', { name: 'Products' }).first().click();
    }

    await expect(page).toHaveURL(/\/products/);
  });

  test('should work browser back button', async ({ page }) => {
    await page.goto('/products');
    await page.goto('/locations');
    await page.goBack();
    await expect(page).toHaveURL('/products');
  });
});
