# Development Guide

This comprehensive guide covers the development setup, workflow, and best practices for contributing to the Lety's Buko Pie website.

## Table of Contents

- [Development Environment](#development-environment)
- [Project Setup](#project-setup)
- [Development Workflow](#development-workflow)
- [Code Style](#code-style)
- [Testing](#testing)
- [Debugging](#debugging)
- [Performance](#performance)
- [Security](#security)
- [Tools & Resources](#tools--resources)

---

## Development Environment

### Prerequisites

Ensure you have the following installed:

- **Node.js**: Version 18+ or 20+ ([Download](https://nodejs.org/))
- **npm**: Comes with Node.js
- **Git**: Latest version ([Download](https://git-scm.com/))
- **Code Editor**: VS Code recommended ([Download](https://code.visualstudio.com/))

### Recommended VS Code Extensions

```json
{
  "recommendations": [
    "dbaeumer.vscode-eslint",
    "esbenp.prettier-vscode",
    "bradlc.vscode-tailwindcss",
    "ms-vscode.vscode-typescript-next",
    "usernamehw.errorlens",
    "streetsidesoftware.code-spell-checker",
    "graphql.vscode-graphql"
  ]
}
```

### VS Code Settings

Create `.vscode/settings.json`:

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "typescript.tsdk": "node_modules/typescript/lib",
  "tailwindCSS.experimental.classRegex": [
    ["cn\\(([^)]*)\\)", "[\"'`]([^\"'`]*).*?[\"'`]"]
  ]
}
```

---

## Project Setup

### Initial Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/neilbcruz/letys-website.git
   cd letys-website
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   ```bash
   cp .env.example .env
   # Edit .env with your values
   ```

4. **Start development server:**
   ```bash
   npm run dev
   ```

5. **Open in browser:**
   ```
   http://localhost:5173
   ```

### Environment Variables

Create a `.env` file in the root:

```env
# Google Analytics 4
VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX
VITE_ENABLE_GA=true

# EmailJS Configuration
REACT_APP_SERVICE_ID=your_service_id
REACT_APP_TEMPLATE_ID=your_template_id
REACT_APP_USER_ID=your_user_id
```

---

## Development Workflow

### Branch Strategy

```
main (production)
  ↑
  develop (staging)
    ↑
    feature/* (new features)
    fix/* (bug fixes)
    refactor/* (code refactoring)
    docs/* (documentation)
    chore/* (maintenance)
```

### Creating a Feature Branch

```bash
# Update main branch
git checkout main
git pull origin main

# Create feature branch
git checkout -b feature/your-feature-name

# Make changes and commit
git add .
git commit -m "feat: add your feature"

# Push to remote
git push origin feature/your-feature-name
```

### Commit Message Format

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting)
- `refactor`: Code refactoring
- `perf`: Performance improvements
- `test`: Adding/updating tests
- `chore`: Maintenance tasks

**Examples:**
```bash
feat(products): add advanced filter options

Add category and price range filters to improve product discovery.
Includes loading states and error handling.

Closes #123
```

```bash
fix(accessibility): improve keyboard navigation

Add proper tab order and focus indicators for menu items.
Ensures WCAG 2.1 AA compliance.
```

### Development Process

1. **Start development server:**
   ```bash
   npm run dev
   ```

2. **Make changes** following style guidelines

3. **Test changes:**
   ```bash
   npm run test           # Unit tests
   npm run test:e2e       # E2E tests
   npm run lint           # Linting
   ```

4. **Build to verify:**
   ```bash
   npm run build
   ```

5. **Commit changes:**
   ```bash
   git add .
   git commit -m "type(scope): description"
   ```

6. **Push and create PR:**
   ```bash
   git push origin feature/your-feature
   # Create PR on GitHub
   ```

---

## Code Style

### TypeScript Guidelines

#### Type Definitions

```typescript
// Good - Use interfaces for object shapes
interface User {
  id: string;
  name: string;
  email: string;
}

// Good - Use type aliases for unions/complex types
type Status = 'pending' | 'active' | 'inactive';
type ID = string | number;

// Bad - Avoid any
interface User {
  id: any;
  name: any;
}
```

#### Function Signatures

```typescript
// Good - Explicit types and return type
function calculateTotal(price: number, quantity: number): number {
  return price * quantity;
}

// Good - Optional parameters with defaults
function formatPrice(
  price: number,
  currency: string = '₱'
): string {
  return `${currency}${price.toFixed(2)}`;
}

// Bad - Implicit any
function calculateTotal(price, quantity) {
  return price * quantity;
}
```

#### Generic Types

```typescript
// Good - Use generics for reusable components
interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
}

function fetchData<T>(url: string): Promise<ApiResponse<T>> {
  return fetch(url).then(res => res.json());
}
```

### React Component Guidelines

#### Component Structure

```typescript
// 1. Imports (external first, then internal)
import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { cn } from '@/lib/utils';
import type { Product } from '@/types';

// 2. Types/Interfaces
interface ProductCardProps {
  product: Product;
  onAddToCart?: (id: string) => void;
}

// 3. Component definition with JSDoc
/**
 * Product card component for displaying products
 *
 * @component
 * @param props - Component props
 * @returns Rendered product card
 */
export function ProductCard({ product, onAddToCart }: ProductCardProps) {
  // 4. Hooks (state, refs, effects)
  const [isInCart, setIsInCart] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Side effect logic
  }, []);

  // 5. Event handlers
  const handleAddToCart = () => {
    setIsInCart(true);
    onAddToCart?.(product.id);
  };

  // 6. Derived values/helpers
  const className = cn(
    'product-card',
    isInCart && 'in-cart'
  );

  // 7. Render
  return (
    <div ref={cardRef} className={className}>
      {/* JSX */}
    </div>
  );
}
```

#### Hooks Best Practices

```typescript
// Good - Custom hook for reusable logic
function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(() => {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : initialValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue] as const;
}

// Good - Follow Rules of Hooks
function MyComponent() {
  // 1. Only call hooks at top level
  const [count, setCount] = useState(0);

  // 2. Only call hooks from React functions
  useEffect(() => {
    document.title = `Count: ${count}`;
  }, [count]);

  // Bad - Conditional hook call
  if (count > 0) {
    useEffect(() => {  // ❌ Don't do this
      console.log('Count is positive');
    }, [count]);
  }

  return <div>{count}</div>;
}
```

#### Performance Optimization

```typescript
// Good - Use React.memo for expensive components
export const ExpensiveComponent = React.memo(function ExpensiveComponent({
  data,
}: {
  data: ComplexData;
}) {
  return <div>{/* Complex rendering */}</div>;
});

// Good - Use useCallback for event handlers
function ParentComponent() {
  const handleClick = useCallback((id: string) => {
    console.log('Clicked:', id);
  }, []);

  return <ChildComponent onClick={handleClick} />;
}

// Good - Use useMemo for expensive computations
function DataList({ items }: { items: Item[] }) {
  const sorted = useMemo(() => {
    return items.sort((a, b) => a.value - b.value);
  }, [items]);

  return <ul>{sorted.map(item => <li key={item.id}>{item.name}</li>)}</ul>;
}
```

### CSS/Tailwind Guidelines

#### Tailwind Class Order

```tsx
// Good - Organized by category
<div className="
  flex items-center justify-center         // Layout
  w-full h-screen                          // Sizing
  p-4 m-2                                  // Spacing
  text-lg font-bold                        // Typography
  bg-white text-gray-900                   // Colors
  rounded-lg shadow-md                     // Effects
  hover:bg-gray-100                       // States
  transition-colors duration-200           // Transitions
">
```

#### Custom Components

```tsx
// Good - Create reusable components with cn utility
import { cn } from '@/lib/utils';

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  children: React.ReactNode;
}

export function Button({
  variant = 'primary',
  size = 'md',
  className,
  children,
}: ButtonProps) {
  return (
    <button
      className={cn(
        'rounded font-semibold transition-colors',
        {
          'bg-blue-600 text-white hover:bg-blue-700': variant === 'primary',
          'bg-gray-200 text-gray-900 hover:bg-gray-300': variant === 'secondary',
          'bg-red-600 text-white hover:bg-red-700': variant === 'danger',
        },
        {
          'px-2 py-1 text-sm': size === 'sm',
          'px-4 py-2 text-base': size === 'md',
          'px-6 py-3 text-lg': size === 'lg',
        },
        className
      )}
    >
      {children}
    </button>
  );
}
```

---

## Testing

### Unit Testing (Vitest)

```typescript
// Component.test.tsx
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from './Button';

describe('Button', () => {
  it('renders children correctly', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click me</Button>);

    fireEvent.click(screen.getByText('Click me'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('applies variant classes correctly', () => {
    render(<Button variant="danger">Delete</Button>);
    const button = screen.getByText('Delete');
    expect(button).toHaveClass('bg-red-600');
  });
});
```

### E2E Testing (Playwright)

```typescript
// tests/example.spec.ts
import { test, expect } from '@playwright/test';

test('user can navigate to products page', async ({ page }) => {
  await page.goto('/');

  await page.click('text=Products');
  await expect(page).toHaveURL(/.*products/);
  await expect(page.locator('h1')).toContainText('Our Products');
});

test('search functionality works', async ({ page }) => {
  await page.goto('/products');

  await page.fill('input[placeholder="Search..."]', 'Buko Pie');
  await page.press('input[placeholder="Search..."]', 'Enter');

  await expect(page.locator('.product-card')).toHaveCount(1);
});
```

### Accessibility Testing

```typescript
// Accessibility test
import { axe, toHaveNoViolations } from 'jest-axe';

expect.extend(toHaveNoViolations);

it('should not have accessibility violations', async () => {
  const { container } = render(<MainNavigation />);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
```

### Running Tests

```bash
# Unit tests
npm run test              # Run all tests
npm run test:ui           # Run with UI
npm run test:coverage     # Generate coverage report

# E2E tests
npm run test:e2e          # Run Playwright tests
npm run test:e2e:ui       # Run with UI
npm run test:e2e:debug    # Debug mode

# Accessibility tests
npm run test:a11y         # Run a11y tests
```

---

## Debugging

### Browser DevTools

#### React DevTools

1. Install [React DevTools](https://react.dev/learn/react-developer-tools)
2. Inspect component props and state
3. View component hierarchy
4. Profile performance

#### Console Debugging

```typescript
// Good - Structured logging
console.log('User clicked:', { productId, quantity });
console.table(products);
console.group('API Request');
console.log('URL:', url);
console.log('Options:', options);
console.groupEnd();

// Good - Error tracking
try {
  await fetchData();
} catch (error) {
  console.error('Failed to fetch data:', {
    error,
    url,
    timestamp: new Date().toISOString()
  });
}
```

### VS Code Debugging

Create `.vscode/launch.json`:

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "chrome",
      "request": "launch",
      "name": "Launch Chrome against localhost",
      "url": "http://localhost:5173",
      "webRoot": "${workspaceFolder}/src"
    }
  ]
}
```

### Common Issues

#### Port Already in Use

```bash
# Kill process on port 5173
npx kill-port 5173

# Or use different port
npm run dev -- --port 3000
```

#### Module Not Found

```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

#### TypeScript Errors

```bash
# Clear TypeScript cache
rm -rf dist .vite
npm run build
```

---

## Performance

### Code Splitting

```typescript
// Good - Lazy load routes
const HomePage = lazy(() => import('./pages/HomePage'));
const ProductsPage = lazy(() => import('./pages/ProductsPage'));

function App() {
  return (
    <Suspense fallback={<PageSkeleton />}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<ProductsPage />} />
      </Routes>
    </Suspense>
  );
}
```

### Image Optimization

```typescript
// Use responsive images
<img
  src={imageData.default}
  srcSet={imageData.srcSet}
  sizes="(max-width: 768px) 100vw, 50vw"
  loading="lazy"
  alt="Product description"
/>
```

### Bundle Size Analysis

```bash
# Analyze bundle size
npm run build

# View bundle analysis
npx vite-bundle-visualizer
```

### Performance Monitoring

```typescript
// Web Vitals tracking
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';

getCLS(console.log);
getFID(console.log);
getFCP(console.log);
getLCP(console.log);
getTTFB(console.log);
```

---

## Security

### Environment Variables

```typescript
// Good - Use environment variables
const apiKey = import.meta.env.VITE_API_KEY;

// Bad - Never commit secrets
const apiKey = 'hardcoded-api-key';
```

### Input Validation

```typescript
// Good - Validate user input
function sanitizeInput(input: string): string {
  return input.trim().replace(/[<>]/g, '');
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
```

### XSS Prevention

```typescript
// Good - React escapes by default
<div>{userInput}</div>  // Safe

// Good - Explicitly set HTML
<div dangerouslySetInnerHTML={{
  __html: sanitizeHTML(userInput)
}} />

// Bad - Never insert untrusted HTML
div.innerHTML = userInput;  // Vulnerable to XSS
```

---

## Tools & Resources

### Development Tools

- **Vite**: Build tool and dev server
- **TypeScript**: Type safety
- **ESLint**: Code linting
- **Prettier**: Code formatting
- **Vitest**: Unit testing
- **Playwright**: E2E testing

### Useful Commands

```bash
# Development
npm run dev              # Start dev server
npm run build            # Build for production
npm run preview          # Preview production build

# Code Quality
npm run lint             # Run ESLint
npm run format           # Format code

# Testing
npm run test             # Run unit tests
npm run test:e2e         # Run E2E tests
npm run test:coverage    # Generate coverage

# Documentation
npm run generate-sitemap # Generate sitemap
```

### Learning Resources

- [React Documentation](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Vite Guide](https://vitejs.dev/guide/)
- [Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- [WCAG Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)

---

## Getting Help

### Common Issues

1. **Installation problems**: Delete `node_modules` and reinstall
2. **Build failures**: Check TypeScript errors
3. **Test failures**: Look at error messages
4. **Performance issues**: Use React DevTools profiler

### Support Channels

- GitHub Issues: Report bugs and feature requests
- Documentation: Check existing docs
- Code Review: Ask team members

### Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md) for detailed contribution guidelines.

---

Happy coding! 🚀
