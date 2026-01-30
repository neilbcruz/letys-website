# Documentation Index

Welcome to the Lety's Buko Pie website documentation. This index provides a complete overview of all available documentation and how to use it effectively.

## Quick Start

New to the project? Start here:

1. **[README.md](README.md)** - Project overview, setup, and basic usage
2. **[DEVELOPMENT_GUIDE.md](DEVELOPMENT_GUIDE.md)** - Setting up your development environment
3. **[CONTRIBUTING.md](CONTRIBUTING.md)** - How to contribute to the project

---

## Documentation Files

### Core Documentation

#### [README.md](README.md)
**Purpose:** Project overview and quick start guide

**Contents:**
- Project description and features
- Live site links
- Technology stack
- Installation instructions
- Development workflow
- Build and deployment
- Environment variables
- Troubleshooting

**When to read:**
- First time visiting the project
- Setting up your local environment
- Understanding the project structure
- Deploying the application

---

#### [API_DOCUMENTATION.md](API_DOCUMENTATION.md)
**Purpose:** GraphQL API integration documentation

**Contents:**
- API endpoint configuration
- GraphQL queries and mutations
- TypeScript type definitions
- Service functions reference
- React hooks documentation
- Error handling patterns
- Integration examples
- Store identifiers

**When to read:**
- Working with product inventory
- Fetching store data
- Implementing search functionality
- Debugging API issues
- Adding new API integrations

---

#### [COMPONENTS.md](COMPONENTS.md)
**Purpose:** Complete component library documentation

**Contents:**
- UI components (StockBadge, SearchInput, SelectPicker, etc.)
- Accessibility components (SkipLinks, Announcement, FocusTrap)
- Layout components (PageHeader, PageFooter, ModalMenu)
- SEO components (SEOHead, GoogleAnalytics)
- Home page components
- Component guidelines and best practices
- Props and usage examples

**When to read:**
- Building new features
- Reusing existing components
- Understanding component APIs
- Ensuring accessibility compliance
- Creating new components

---

#### [DATA_STRUCTURES.md](DATA_STRUCTURES.md)
**Purpose:** Data models and helper functions documentation

**Contents:**
- Product data structure
- Location data structure
- Navigation data
- TypeScript type definitions
- Helper functions reference
- Data validation patterns
- Best practices for data management

**When to read:**
- Working with product data
- Managing location information
- Understanding data flow
- Adding new data structures
- Validating data integrity

---

#### [DEVELOPMENT_GUIDE.md](DEVELOPMENT_GUIDE.md)
**Purpose:** Comprehensive development workflow and best practices

**Contents:**
- Development environment setup
- Project configuration
- Development workflow
- Code style guidelines
- Testing strategies
- Debugging techniques
- Performance optimization
- Security best practices
- Tools and resources

**When to read:**
- Setting up your development machine
- Learning project conventions
- Writing code
- Testing your changes
- Optimizing performance
- Implementing security measures

---

#### [CONTRIBUTING.md](CONTRIBUTING.md)
**Purpose:** Contribution guidelines and standards

**Contents:**
- Code of conduct
- Development workflow
- Code style guidelines
- Component guidelines
- Testing guidelines
- Accessibility guidelines
- Documentation guidelines
- Pull request process
- PR review checklist

**When to read:**
- Planning to contribute
- Opening a pull request
- Reviewing code changes
- Ensuring quality standards

---

## Documentation by Topic

### For New Developers

**Start here:**
1. [README.md](README.md) - Understand the project
2. [DEVELOPMENT_GUIDE.md](DEVELOPMENT_GUIDE.md) - Set up your environment
3. [COMPONENTS.md](COMPONENTS.md) - Learn about components
4. [CONTRIBUTING.md](CONTRIBUTING.md) - Understand contribution process

### For Feature Development

**Reference these:**
1. [COMPONENTS.md](COMPONENTS.md) - Find reusable components
2. [DATA_STRUCTURES.md](DATA_STRUCTURES.md) - Understand data models
3. [API_DOCUMENTATION.md](API_DOCUMENTATION.md) - Work with APIs
4. [CONTRIBUTING.md](CONTRIBUTING.md) - Follow coding standards

### For Bug Fixes

**Check these:**
1. [API_DOCUMENTATION.md](API_DOCUMENTATION.md) - API integration issues
2. [DATA_STRUCTURES.md](DATA_STRUCTURES.md) - Data structure problems
3. [DEVELOPMENT_GUIDE.md](DEVELOPMENT_GUIDE.md) - Debugging techniques

### For API Integration

**Use these:**
1. [API_DOCUMENTATION.md](API_DOCUMENTATION.md) - Complete API reference
2. [DATA_STRUCTURES.md](DATA_STRUCTURES.md) - Type definitions
3. [COMPONENTS.md](COMPONENTS.md) - Related components

### For Accessibility

**Read these:**
1. [COMPONENTS.md](COMPONENTS.md) - Accessibility components
2. [CONTRIBUTING.md](CONTRIBUTING.md) - Accessibility guidelines
3. [DEVELOPMENT_GUIDE.md](DEVELOPMENT_GUIDE.md) - Testing accessibility

### For Performance

**Consult these:**
1. [DEVELOPMENT_GUIDE.md](DEVELOPMENT_GUIDE.md) - Performance optimization
2. [API_DOCUMENTATION.md](API_DOCUMENTATION.md) - Caching strategies
3. [README.md](README.md) - Performance features

### For Testing

**Reference these:**
1. [DEVELOPMENT_GUIDE.md](DEVELOPMENT_GUIDE.md) - Testing setup
2. [CONTRIBUTING.md](CONTRIBUTING.md) - Testing guidelines
3. [COMPONENTS.md](COMPONENTS.md) - Component testing

### For Deployment

**Follow these:**
1. [README.md](README.md) - Build and deployment instructions
2. [DEVELOPMENT_GUIDE.md](DEVELOPMENT_GUIDE.md) - Environment setup

---

## Code Documentation

### Inline Documentation

The codebase includes comprehensive inline documentation:

#### JSDoc Comments

All public functions and components include JSDoc comments:

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

#### Component Documentation

Components include usage examples and accessibility notes:

```tsx
/**
 * StockBadge component for displaying product stock status
 *
 * @component
 * @param {StockBadgeProps} props - Component props
 * @returns {JSX.Element} Styled badge with stock status
 *
 * @accessibility
 * - Uses role="status" for screen reader announcements
 * - Includes aria-label for context
 */
```

### Type Definitions

Comprehensive TypeScript types for all data structures:

```typescript
// Located in service files and /src/types/
interface StoreItem {
  name: string;
  category: string;
  price: number;
  stockDetails: StockDetails;
  // ... more properties
}
```

---

## Finding Information

### Search Tips

**Looking for a specific component?**
- Check [COMPONENTS.md](COMPONENTS.md) component index
- Search for component name in `/src/components/`

**Need to understand an API?**
- Read [API_DOCUMENTATION.md](API_DOCUMENTATION.md)
- Check service files in `/src/services/`

**Working with data structures?**
- See [DATA_STRUCTURES.md](DATA_STRUCTURES.md)
- Check data files in `/src/data/`

**Setting up development?**
- Follow [DEVELOPMENT_GUIDE.md](DEVELOPMENT_GUIDE.md)
- Reference [README.md](README.md) for quick start

**Contributing to the project?**
- Read [CONTRIBUTING.md](CONTRIBUTING.md)
- Follow guidelines in [DEVELOPMENT_GUIDE.md](DEVELOPMENT_GUIDE.md)

---

## File Structure Reference

```
letys-website/
├── README.md                      # Project overview and setup
├── API_DOCUMENTATION.md           # GraphQL API documentation
├── COMPONENTS.md                  # Component library reference
├── DATA_STRUCTURES.md             # Data models and helpers
├── DEVELOPMENT_GUIDE.md           # Development workflow
├── CONTRIBUTING.md                # Contribution guidelines
├── DOCUMENTATION_INDEX.md         # This file
├── .env                           # Environment variables
├── package.json                   # Dependencies and scripts
├── vite.config.ts                 # Vite configuration
├── tsconfig.json                  # TypeScript configuration
├── tailwind.config.js             # Tailwind CSS configuration
│
├── public/                        # Static assets
│   ├── assets/
│   │   └── images/               # Image assets
│   └── favicon.ico
│
└── src/
    ├── components/               # React components
    │   ├── accessibility/        # A11y components
    │   ├── layout/              # Layout components
    │   ├── seo/                 # SEO components
    │   ├── ui/                  # Reusable UI components
    │   └── home/                # Home page components
    ├── data/                    # Static data
    │   ├── products.ts          # Product catalog
    │   ├── locations.ts         # Store locations
    │   └── navItems.ts          # Navigation items
    ├── hooks/                   # Custom React hooks
    │   └── useStoreItems.ts     # Store inventory hook
    ├── lib/                     # Utility functions
    │   ├── utils.ts             # General utilities
    │   ├── images.ts            # Image management
    │   └── seo.ts               # SEO utilities
    ├── pages/                   # Page components
    ├── services/                # API services
    │   └── graphql.ts           # GraphQL client
    ├── types/                   # TypeScript types
    ├── App.tsx                  # Root component
    └── main.tsx                 # Entry point
```

---

## Common Tasks

### Adding a New Page

1. **Create page component** in `/src/pages/`
2. **Add route** in `/src/App.tsx`
3. **Add navigation item** in `/src/data/navItems.ts`
4. **Update SEO** in `/src/lib/seo.ts`
5. **Add documentation** if needed

### Adding a New Component

1. **Create component** in appropriate `/src/components/` subdirectory
2. **Add TypeScript types** for props
3. **Include JSDoc comments** with usage examples
4. **Add accessibility features**
5. **Write tests** in component directory
6. **Update COMPONENTS.md** with documentation

### Integrating with API

1. **Check API_DOCUMENTATION.md** for reference
2. **Use existing services** in `/src/services/graphql.ts`
3. **Create custom hook** in `/src/hooks/` if needed
4. **Handle errors** appropriately
5. **Update types** in service file

### Adding a New Store Location

1. **Add to LOCATIONS array** in `/src/data/locations.ts`
2. **Get coordinates** from Google Maps
3. **Set up API access** if needed
4. **Add location image** to `/public/assets/images/`
5. **Test on locations page**
6. **Update DATA_STRUCTURES.md** if structure changes

---

## Keeping Documentation Updated

### When to Update Documentation

**Update README.md when:**
- Adding new environment variables
- Changing deployment process
- Adding new scripts
- Updating technology stack

**Update API_DOCUMENTATION.md when:**
- Adding new API endpoints
- Changing data structures
- Modifying service functions
- Updating type definitions

**Update COMPONENTS.md when:**
- Creating new components
- Changing component APIs
- Adding new props
- Changing behavior

**Update DATA_STRUCTURES.md when:**
- Adding new data structures
- Modifying existing structures
- Adding helper functions
- Changing validation rules

**Update DEVELOPMENT_GUIDE.md when:**
- Changing development workflow
- Adding new tools
- Updating best practices
- Modifying testing setup

**Update CONTRIBUTING.md when:**
- Changing contribution process
- Updating code standards
- Modifying review process
- Adding guidelines

---

## Additional Resources

### External Documentation

- [React Documentation](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Vite Guide](https://vitejs.dev/guide/)
- [React Router](https://reactrouter.com/)
- [GraphQL](https://graphql.org/learn/)
- [WCAG Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)

### Project Tools

- **Vitest**: Unit testing (run `npm run test`)
- **Playwright**: E2E testing (run `npm run test:e2e`)
- **ESLint**: Code linting (run `npm run lint`)

---

## Support

### Getting Help

1. **Check documentation** - Your question may be answered here
2. **Search issues** - Check GitHub Issues
3. **Create an issue** - If you can't find an answer
4. **Contact team** - Reach out to project maintainers

### Reporting Issues

When reporting issues, include:
- Clear description of the problem
- Steps to reproduce
- Expected vs actual behavior
- Environment details (OS, browser, Node version)
- Relevant error messages or screenshots

### Contributing

We welcome contributions! See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

---

## Changelog

### Documentation Updates

- **2025-01**: Created comprehensive documentation suite
  - README.md updates
  - API_DOCUMENTATION.md
  - COMPONENTS.md
  - DATA_STRUCTURES.md
  - DEVELOPMENT_GUIDE.md
  - CONTRIBUTING.md
  - DOCUMENTATION_INDEX.md (this file)

---

**Last Updated:** 2025-01-30

**Documentation Version:** 1.0.0

**Maintained by:** Lety's Buko Pie Development Team

---

Thank you for using the Lety's Buko Pie website documentation!
