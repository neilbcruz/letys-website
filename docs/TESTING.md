# Testing Guide for Lety's Buko Pie Website

This guide covers the comprehensive test suite for the Lety's Buko Pie website, including unit tests, E2E tests, accessibility tests, and visual regression tests.

## Table of Contents

- [Overview](#overview)
- [Unit Testing](#unit-testing)
- [Component Testing](#component-testing)
- [E2E Testing](#e2e-testing)
- [Accessibility Testing](#accessibility-testing)
- [Visual Regression Testing](#visual-regression-testing)
- [Continuous Integration](#continuous-integration)
- [Best Practices](#best-practices)

## Overview

The test suite uses the following tools:

- **Vitest**: Unit testing framework
- **React Testing Library**: Component testing utilities
- **Playwright**: E2E testing framework
- **jest-axe**: Accessibility testing with axe-core
- **GitHub Actions**: CI/CD automation

### Test Coverage Goals

- Lines: ≥ 80%
- Functions: ≥ 80%
- Branches: ≥ 80%
- Statements: ≥ 80%

## Unit Testing

### Running Unit Tests

```bash
# Run all tests
npm run test

# Run tests in watch mode
npm run test -- --watch

# Run tests with coverage
npm run test:coverage

# Run tests with UI
npm run test:ui
```

### Test Structure

Unit tests are co-located with the files they test:

```
src/
  components/
    ui/
      Button.tsx
      Button.test.tsx
    products/
      ProductCardWithStock.tsx
      ProductCardWithStock.test.tsx
  hooks/
    useStoreItems.ts
    useStoreItems.test.ts
```

### Writing Unit Tests

Example test for a custom hook:

```typescript
// src/hooks/useStoreItems.test.ts
import { describe, it, expect, vi } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { useStoreItems } from './useStoreItems';

describe('useStoreItems Hook', () => {
  it('fetches items successfully', async () => {
    // Arrange
    const mockParams = {
      storeName: 'test-store',
      pageNumber: 1,
      pageSize: 10,
    };

    // Act
    const { result } = renderHook(() => useStoreItems(mockParams));

    // Assert
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
      expect(result.current.items).toBeDefined();
    });
  });
});
```

## Component Testing

### Testing Components

Components are tested using React Testing Library:

```typescript
// src/components/ui/Button.test.tsx
import { describe, it, expect, vi } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { render } from '@/test/utils';
import Button from './Button';

describe('Button Component', () => {
  it('renders button with text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button', { name: 'Click me' })).toBeInTheDocument();
  });

  it('handles click events', async () => {
    const handleClick = vi.fn();
    const user = userEvent.setup();

    render(<Button onClick={handleClick}>Click me</Button>);

    await user.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
```

### Testing Accessibility

Every component should include accessibility tests:

```typescript
import { testAccessibility } from '@/test/accessibility-helpers';

it('passes accessibility checks', async () => {
  const { container } = render(<Button>Accessible Button</Button>);
  await testAccessibility(container);
});
```

## E2E Testing

### Running E2E Tests

```bash
# Run all E2E tests
npm run test:e2e

# Run E2E tests with UI
npm run test:e2e:ui

# Debug E2E tests
npm run test:e2e:debug

# View test report
npm run test:e2e:report
```

### E2E Test Structure

E2E tests are organized by page/feature:

```
e2e/
  home-page.spec.ts
  products-page.spec.ts
  availability-page.spec.ts
  locations-page.spec.ts
  contact-page.spec.ts
  navigation.spec.ts
  accessibility.spec.ts
  responsive.spec.ts
  error-handling.spec.ts
```

### Writing E2E Tests

Example E2E test:

```typescript
import { test, expect } from '@playwright/test';

test.describe('Homepage', () => {
  test('should load successfully', async ({ page }) => {
    await page.goto('/');

    await expect(page).toHaveTitle(/Lety's Buko Pie/);
    await expect(page.locator('h1')).toBeVisible();
  });

  test('should navigate to products page', async ({ page }) => {
    await page.goto('/');

    const productsLink = page.locator('a').filter({ hasText: 'Products' });
    await productsLink.click();

    await expect(page).toHaveURL(/\/products/);
  });
});
```

## Accessibility Testing

### Accessibility Tools

- **jest-axe**: Automated accessibility testing in unit tests
- **Playwright axe**: E2E accessibility testing
- **Pa11y CI**: CI accessibility scanning

### Running Accessibility Tests

```bash
# Run accessibility unit tests
npm run test -- src/components/accessibility

# Run accessibility E2E tests
npx playwright test e2e/accessibility.spec.ts
```

### Accessibility Checklist

- [ ] All images have alt text
- [ ] Form inputs have labels
- [ ] Buttons have accessible names
- [ ] Headings follow proper hierarchy
- [ ] Color contrast meets WCAG AA standards
- [ ] Keyboard navigation works
- [ ] Focus indicators are visible
- [ ] ARIA attributes are correct
- [ ] Skip links are present
- [ ] Landmarks are properly used

### Writing Accessibility Tests

```typescript
import { testAccessibility, testWCAGLevel } from '@/test/accessibility-helpers';

describe('Component Accessibility', () => {
  it('passes WCAG AA checks', async () => {
    const { container } = render(<MyComponent />);
    await testWCAGLevel(container, 'AA');
  });

  it('has proper heading hierarchy', () => {
    const { container } = render(<MyComponent />);
    testHeadingHierarchy(container);
  });
});
```

## Visual Regression Testing

### Setting Up Visual Tests

Visual regression tests are built into Playwright:

```typescript
test.describe('Visual Regression', () => {
  test('should match screenshot', async ({ page }) => {
    await page.goto('/');

    await expect(page).toHaveScreenshot('homepage.png', {
      fullPage: true,
      animations: 'disabled',
    });
  });
});
```

### Updating Screenshots

```bash
# Update screenshots
npx playwright test --update-snapshots
```

### Visual Testing Checklist

- [ ] Homepage screenshots
- [ ] Product catalog screenshots
- [ ] Store locations screenshots
- [ ] Mobile viewports
- [ ] Tablet viewports
- [ ] Desktop viewports
- [ ] Dark mode (if applicable)
- [ ] Different states (loading, error, empty)

## Continuous Integration

### GitHub Actions Workflows

Test automation is handled by GitHub Actions:

1. **Test Suite** (`.github/workflows/test.yml`)
   - Runs unit tests with coverage
   - Runs accessibility tests
   - Runs E2E tests
   - Runs visual regression tests
   - Runs linting and type checking

2. **Accessibility CI** (`.github/workflows/a11y-ci.yml`)
   - Automated accessibility scans
   - WCAG compliance checks
   - Color contrast verification
   - Keyboard navigation tests

### CI Test Results

Test results are displayed as:
- GitHub Actions logs
- Test artifacts (uploaded for 30-90 days)
- PR comments (for accessibility violations)

### Coverage Thresholds

Coverage is enforced in CI:

```json
{
  "lines": 80,
  "functions": 80,
  "branches": 80,
  "statements": 80
}
```

## Test Utilities

### Custom Render Function

```typescript
import { render } from '@/test/utils';

// Renders with router
render(<MyComponent />);

// Renders with specific route
render(<MyComponent />, { route: '/products' });

// Renders with error boundary
render(<MyComponent />, { withErrorBoundary: true });
```

### Accessibility Helpers

```typescript
import {
  testAccessibility,
  testWCAGLevel,
  testHeadingHierarchy,
  testFormLabels,
  testImageAltText
} from '@/test/accessibility-helpers';

// Run full accessibility test suite
await testAccessibility(container);

// Test specific WCAG level
await testWCAGLevel(container, 'AA');

// Test specific patterns
testHeadingHierarchy(container);
testFormLabels(container);
testImageAltText(container);
```

### Mock Data

```typescript
import {
  createMockStoreItem,
  createMockStockDetails,
  mockStoreItems
} from '@/test/mockData';

// Create mock product
const mockProduct = createMockStoreItem({
  name: 'Buko Pie',
  price: 150,
});

// Create mock stock details
const mockStock = createMockStockDetails(10, 5);
```

## Best Practices

### Unit Testing

1. **Test behavior, not implementation**
   ```typescript
   // ✅ Good
   expect(screen.getByRole('button', { name: 'Submit' })).toBeInTheDocument();

   // ❌ Bad
   expect(container.querySelector('.btn-submit')).toBeTruthy();
   ```

2. **Use userEvent over fireEvent**
   ```typescript
   // ✅ Good
   await user.click(button);

   // ❌ Bad
   fireEvent.click(button);
   ```

3. **Test accessible queries**
   ```typescript
   // ✅ Good
   screen.getByRole('button')
   screen.getByLabelText('Username')
   screen.getByText('Submit')

   // ❌ Bad (use only when necessary)
   screen.getByClassName('submit-button')
   screen.getByTestId('submit-btn')
   ```

### E2E Testing

1. **Use data-testid selectors when necessary**
   ```typescript
   // In component
   <button data-testid="submit-button">Submit</button>

   // In test
   await page.click('[data-testid="submit-button"]');
   ```

2. **Wait for elements properly**
   ```typescript
   // ✅ Good
   await page.waitForLoadState('networkidle');
   await expect(page.locator('.result')).toBeVisible();

   // ❌ Bad
   await page.waitForTimeout(1000);
   ```

3. **Use page objects for complex interactions**
   ```typescript
   class ProductsPage {
     constructor(page) {
       this.page = page;
       this.searchInput = page.locator('[data-testid="search"]');
     }

     async search(query) {
       await this.searchInput.fill(query);
       await this.searchInput.press('Enter');
     }
   }
   ```

### Accessibility Testing

1. **Test accessibility in every component**
   ```typescript
   it('passes accessibility checks', async () => {
     const { container } = render(<Component />);
     const results = await axe(container);
     expect(results).toHaveNoViolations();
   });
   ```

2. **Test keyboard navigation**
   ```typescript
   it('is keyboard accessible', async () => {
     const user = userEvent.setup();
     render(<Component />);

     await user.tab();
     expect(getFocusableElement()).toHaveFocus();
   });
   ```

3. **Test with screen readers**
   - Use ARIA attributes correctly
   - Test with NVDA/JAWS in manual testing
   - Announce dynamic content changes

### Mocking

1. **Mock external dependencies**
   ```typescript
   vi.mock('@/services/graphql', () => ({
     getStoreItems: vi.fn(),
   }));
   ```

2. **Reset mocks between tests**
   ```typescript
   afterEach(() => {
     vi.clearAllMocks();
   });
   ```

3. **Use consistent mock data**
   ```typescript
   export const mockStoreItems = [
     { name: 'Buko Pie', price: 150 },
     { name: 'Ube Pie', price: 160 },
   ];
   ```

## Debugging Tests

### Vitest Debugging

```bash
# Run tests with inspector
npm run test -- --inspect-brk

# Run specific test file
npm run test -- Button.test.tsx

# Run tests matching pattern
npm run test -- --grep "Button"
```

### Playwright Debugging

```bash
# Run with debug mode
npm run test:e2e:debug

# Run with headed mode
npx playwright test --headed

# Run specific test file
npx playwright test home-page.spec.ts

# Run tests in specific browser
npx playwright test --project=chromium
```

### Common Issues

1. **Flaky tests**: Use proper waiting strategies
2. **Timeout errors**: Increase timeout or fix race conditions
3. **Mock failures**: Ensure mocks are properly configured
4. **Coverage gaps**: Identify and test edge cases

## Resources

- [Vitest Documentation](https://vitest.dev/)
- [React Testing Library](https://testing-library.com/react)
- [Playwright Documentation](https://playwright.dev/)
- [jest-axe](https://github.com/nickcolley/jest-axe)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/)
