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

    // Debug: log page URL and title
    const url = page.url();
    const title = await page.title();
    console.log(`Page loaded: URL=${url}, Title=${title}`);

    // Wait for the page to be fully loaded
    await page.waitForLoadState('domcontentloaded');

    // Debug: check if body exists
    const bodyExists = await page.locator('body').count();
    console.log(`Body elements found: ${bodyExists}`);

    // Debug: get all text content
    const allText = await page.locator('body').allTextContents();
    console.log(`Page text content length: ${allText.join('').length}`);

    // Try clicking by text content - works for both <a> and <button> elements
    // "View Our Products" is a prominent CTA on the home page
    await page.getByText('View Our Products').first().click();

    await expect(page).toHaveURL(/\/products/);
  });

  test('should work browser back button', async ({ page }) => {
    await page.goto('/products');
    await page.goto('/locations');
    await page.goBack();
    await expect(page).toHaveURL('/products');
  });
});
