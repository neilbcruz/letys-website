# Contributing to Lety's Buko Pie Website

Thank you for your interest in contributing to the Lety's Buko Pie website! This document provides guidelines and instructions for contributing.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Code Style Guidelines](#code-style-guidelines)
- [Component Guidelines](#component-guidelines)
- [Testing Guidelines](#testing-guidelines)
- [Accessibility Guidelines](#accessibility-guidelines)
- [Documentation Guidelines](#documentation-guidelines)
- [Pull Request Process](#pull-request-process)
- [PR Review Checklist](#pr-review-checklist)

## Code of Conduct

- Be respectful and constructive
- Welcome newcomers and help them learn
- Focus on what is best for the community
- Show empathy towards other community members

## Getting Started

### Prerequisites

- Node.js 18+ or 20+
- Git
- Familiarity with React, TypeScript, and Tailwind CSS

### Initial Setup

1. Fork the repository
2. Clone your fork:
   ```bash
   git clone https://github.com/your-username/letys-website.git
   cd letys-website
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Create a feature branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```

## Development Workflow

### Branch Naming Convention

Use descriptive branch names with prefixes:

- `feature/` - New features
- `fix/` - Bug fixes
- `refactor/` - Code refactoring
- `docs/` - Documentation changes
- `test/` - Test additions or changes
- `chore/` - Maintenance tasks

Examples:
- `feature/add-product-filters`
- `fix/navigation-mobile-bug`
- `refactor/optimize-image-loading`

### Commit Message Convention

Follow conventional commits:

```
<type>(<scope>): <subject>

<body>

<footer>
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `perf`: Performance improvements
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

**Examples:**

```
feat(products): add advanced filter options

Add category and price range filters to the products page.
Includes loading states and error handling.

Closes #123
```

```
fix(accessibility): improve keyboard navigation

Add proper tab order and focus indicators for menu items.
Ensures WCAG 2.1 AA compliance.
```

### Development Process

1. **Start development server:**
   ```bash
   npm run dev
   ```

2. **Make your changes** following the style guidelines

3. **Test your changes:**
   ```bash
   npm run test           # Unit tests
   npm run test:e2e       # E2E tests
   npm run lint           # Linting
   ```

4. **Build to verify:**
   ```bash
   npm run build
   ```

5. **Commit your changes** with a clear message

6. **Push to your fork:**
   ```bash
   git push origin feature/your-feature-name
   ```

7. **Create a Pull Request** (see PR Process below)

## Code Style Guidelines

### TypeScript

- Use strict TypeScript settings
- Avoid `any` types
- Use interfaces for object shapes
- Use type aliases for unions and primitives
- Export types that are used externally

```typescript
// Good
interface ProductCardProps {
  product: Product;
  onAddToCart?: (id: string) => void;
}

// Bad
interface ProductCardProps {
  product: any;
  onAddToCart: any;
}
```

### React Components

- Use functional components with hooks
- Follow the Rules of Hooks
- Use TypeScript for props typing
- Extract complex logic into custom hooks
- Use memoization (`useMemo`, `useCallback`) where appropriate

```typescript
// Good
interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
}

export const Button = ({ children, onClick, variant = 'primary' }: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`btn btn-${variant}`}
      type="button"
    >
      {children}
    </button>
  );
};
```

### File Organization

- Group related files in folders
- Use index files for clean imports
- Keep components under 300 lines
- Extract complex logic into utilities/hooks

```
components/
├── ui/
│   ├── Button/
│   │   ├── Button.tsx
│   │   ├── Button.test.tsx
│   │   └── index.ts
│   └── index.ts
```

### Naming Conventions

- **Components**: PascalCase (`ProductCard.tsx`)
- **Files**: camelCase for utilities (`formatPrice.ts`)
- **Constants**: UPPER_SNAKE_CASE (`API_ENDPOINT`)
- **Hooks**: camelCase with "use" prefix (`useStoreItems.ts`)
- **CSS/Tailwind**: kebab-case for custom classes

## Component Guidelines

### Component Structure

```typescript
// 1. Imports (external first, then internal)
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

// 2. Types/Interfaces
interface MyComponentProps {
  title: string;
  onClick?: () => void;
}

// 3. Component definition
export function MyComponent({ title, onClick }: MyComponentProps) {
  // 4. Hooks (in order: state, refs, effects)
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Effect logic
  }, []);

  // 5. Event handlers
  const handleClick = () => {
    setIsOpen(true);
    onClick?.();
  };

  // 6. Derived values/render helpers
  const className = cn(
    'base-class',
    isOpen && 'open-class'
  );

  // 7. Render
  return (
    <div className={className}>
      {title}
    </div>
  );
}
```

### Props Design

- Use TypeScript interfaces for props
- Provide sensible defaults
- Make optional props clear with `?`
- Use `children` for composition
- Use render props for complex customization

```typescript
// Good
interface CardProps {
  children: React.ReactNode;
  variant?: 'default' | 'elevated' | 'outlined';
  onClick?: () => void;
  className?: string;
}

export function Card({
  children,
  variant = 'default',
  onClick,
  className
}: CardProps) {
  // ...
}
```

### Accessibility

Every component must be accessible:

- Use semantic HTML elements
- Add proper ARIA attributes
- Support keyboard navigation
- Include focus indicators
- Provide text alternatives

```typescript
// Good
<button
  onClick={handleAction}
  aria-label="Close dialog"
  aria-pressed={isPressed}
>
  <XIcon aria-hidden="true" />
</button>
```

## Testing Guidelines

### Unit Tests

- Test behavior, not implementation
- Use descriptive test names
- Follow AAA pattern (Arrange, Act, Assert)
- Mock external dependencies
- Test edge cases

```typescript
describe('Button', () => {
  it('should call onClick handler when clicked', () => {
    // Arrange
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click me</Button>);

    // Act
    fireEvent.click(screen.getByText('Click me'));

    // Assert
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('should be disabled when isLoading is true', () => {
    render(<Button isLoading>Submit</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
  });
});
```

### E2E Tests

- Test critical user flows
- Use page object pattern for complex pages
- Wait for elements explicitly
- Test across viewports

```typescript
test('user can add product to cart', async ({ page }) => {
  await page.goto('/products');
  await page.click('text=Buko Pie');
  await page.click('button:has-text("Add to Cart")');
  await expect(page.locator('[data-testid="cart-count"]')).toHaveText('1');
});
```

### Coverage Goals

- Aim for >80% code coverage
- Focus on critical paths
- Test error conditions
- Don't test trivial code

## Accessibility Guidelines

### WCAG 2.1 AA Compliance

All features must meet WCAG 2.1 AA standards:

1. **Perceivable**
   - Text alternatives for images
   - Captions for videos
   - Color contrast >4.5:1
   - Resizable text (200%)

2. **Operable**
   - Keyboard accessible
   - No keyboard traps
   - Enough time to read content
   - No seizures (max 3 flashes/second)

3. **Understandable**
   - Readable content
   - Predictable functionality
   - Input assistance

4. **Robust**
   - Compatible with assistive tech
   - Valid HTML
   - ARIA attributes correct

### Testing Accessibility

```bash
# Run accessibility tests
npm run test

# Manual testing checklist
- [ ] Navigate with keyboard only
- [ ] Test with screen reader (NVDA/JAWS)
- [ ] Check color contrast
- [ ] Verify focus indicators
- [ ] Test with browser zoom (200%)
```

### Common Patterns

**Skip Links:**
```typescript
<a href="#main-content" className="sr-only focus:not-sr-only">
  Skip to main content
</a>
```

**Announce Changes:**
```typescript
<LiveRegion aria-live="polite">
  {statusMessage}
</LiveRegion>
```

**Focus Management:**
```typescript
useEffect(() => {
  if (isOpen) {
    modalRef.current?.focus();
  }
}, [isOpen]);
```

## Documentation Guidelines

### JSDoc Comments

Document public APIs and complex functions:

```typescript
/**
 * Formats a price value in Philippine Pesos
 * @param price - The price value to format
 * @returns Formatted price string (e.g., "₱150.00")
 * @example
 * formatPrice(150)
 * // Returns "₱150.00"
 */
export function formatPrice(price: number): string {
  return `₱${price.toFixed(2)}`;
}
```

### Component Documentation

Add Storybook stories for all UI components:

```typescript
export default {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
} satisfies Meta<typeof Button>;
```

### README Updates

- Update README for new features
- Document new environment variables
- Update screenshots/gifs
- Keep deployment instructions current

## Pull Request Process

### Before Creating a PR

1. **Update documentation** if needed
2. **Add/update tests** for your changes
3. **Run tests locally** and ensure they pass
4. **Update CHANGELOG** if applicable
5. **Rebase** your branch on latest main

### Creating the PR

1. Use a clear title following commit conventions
2. Fill out the PR template completely
3. Link related issues
4. Add screenshots for UI changes
5. Request appropriate reviewers

### PR Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] Unit tests added/updated
- [ ] E2E tests added/updated
- [ ] Manual testing completed

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Documentation updated
- [ ] No new warnings generated
- [ ] Accessibility tested
- [ ] Tests pass locally

## Issues
Closes #123
Related to #456
```

## PR Review Checklist

### Code Quality

- [ ] Code follows project style guidelines
- [ ] No console.log or debug statements
- [ ] Proper error handling
- [ ] No hardcoded values (use constants)
- [ ] Efficient algorithms and data structures

### Functionality

- [ ] Feature works as expected
- [ ] Edge cases handled
- [ ] Loading states implemented
- [ ] Error states implemented
- [ ] Backward compatible

### Testing

- [ ] Tests added for new code
- [ ] All tests pass
- [ ] Coverage not decreased
- [ ] E2E tests for critical flows

### Accessibility

- [ ] Keyboard navigation works
- [ ] Screen reader compatible
- [ ] Focus management correct
- [ ] Color contrast sufficient
- [ ] ARIA attributes appropriate

### Performance

- [ ] No unnecessary re-renders
- [ ] Images optimized
- [ ] Lazy loading implemented
- [ ] No memory leaks

### Documentation

- [ ] JSDoc comments added
- [ ] README updated if needed
- [ ] Storybook stories added
- [ ] Changes documented in CHANGELOG

### Security

- [ ] No sensitive data in code
- [ ] Inputs validated
- [ ] XSS prevention
- [ ] Dependencies up to date

## Getting Help

- Open an issue for bugs or feature requests
- Start a discussion for questions
- Check existing documentation
- Reach out to maintainers

## Recognition

Contributors will be acknowledged in the project documentation.

Thank you for contributing to Lety's Buko Pie website!
