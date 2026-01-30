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

    // Click products link
    const productsLink = page.locator('a').filter({ hasText: 'Products' }).first();
    await productsLink.click();
    await expect(page).toHaveURL(/\/products/);
  });

  test('should work browser back button', async ({ page }) => {
    await page.goto('/products');
    await page.goto('/locations');
    await page.goBack();
    await expect(page).toHaveURL('/products');
  });
});
