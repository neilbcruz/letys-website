# Lety's Buko Pie Website

Official website for Lety's Buko Pie - The Best Buko Pie in Laguna since 1997.

## Table of Contents

- [Overview](#overview)
- [Live Sites](#live-sites)
- [Design](#design)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Available Scripts](#available-scripts)
- [Environment Variables](#environment-variables)
- [API Integration](#api-integration)
- [Pages](#pages)
- [Accessibility](#accessibility)
- [Performance](#performance)
- [Deployment](#deployment)
- [Testing](#testing)
- [Contributing](#contributing)
- [Troubleshooting](#troubleshooting)
- [License](#license)
- [Contact](#contact)

## Overview

This is a modern, responsive e-commerce website for Lety's Buko Pie, featuring:
- Real-time product availability across multiple store locations
- SEO-optimized pages with structured data
- Full accessibility support (WCAG AA compliant)
- Interactive maps and store locations
- Contact form integration
- Mobile-first responsive design
- GraphQL API integration for inventory management
- Dynamic product catalog with categories

## Live Sites

- **Production**: [https://letysbukopie.com/](https://letysbukopie.com/)
- **Staging**: [https://letysbukopie.netlify.app/](https://letysbukopie.netlify.app/)

## Design

- **Figma Design**: [View on Figma](https://www.figma.com/file/9v0nX75E4sUQV925apt8bX/Lety's-Buko-Pie-Draft?node-id=0%3A1&t=nb6Yb6Izf9gsdJG1-0)

## Technology Stack

### Frontend Framework
- **React 19.2.0** - UI library
- **TypeScript 5.9.3** - Type safety
- **Vite 7.2.4** - Build tool and dev server

### Styling
- **Tailwind CSS 4.1.18** - Utility-first CSS framework
- **Sass 1.97.2** - CSS preprocessor
- **CSS Custom Properties** - Design tokens for theming

### Routing & Navigation
- **React Router DOM 7.11.0** - Client-side routing
- **React Router Hash Link 2.4.3** - Anchor link navigation

### UI Components
- **Radix UI** - Accessible component primitives
  - Dialog, Popover, Select, Scroll Area, Slot, Tooltip
- **Headless UI 2.2.9** - Unstyled accessible components
- **Lucide React 0.562.0** - Icon library
- **Hamburger React 2.5.2** - Animated menu icon

### Maps & Location
- **Leaflet 1.9.4** - Interactive maps
- **React Leaflet 5.0.0** - React integration for Leaflet
- **React Google Maps API 2.20.8** - Google Maps integration

### SEO & Analytics
- **React Helmet Async 2.0.5** - Document head management
- **Web Vitals 5.1.0** - Performance metrics

### Forms & Communication
- **EmailJS Com 3.2.0** - Email service integration

### Testing
- **Vitest 4.0.18** - Unit testing framework
- **React Testing Library 16.3.2** - Component testing utilities
- **Playwright 1.58.0** - End-to-end testing
- **Storybook 10.2.3** - Component documentation and testing

### Development Tools
- **ESLint 9.39.1** - Code linting
- **TypeScript ESLint 8.46.4** - TypeScript linting
- **Autoprefixer 10.4.23** - CSS vendor prefixes
- **PostCSS 8.5.6** - CSS transformation

## Project Structure

```
letys-website/
├── src/
│   ├── components/
│   │   ├── accessibility/    # Accessibility components
│   │   ├── layout/          # Layout components (Header, Footer)
│   │   ├── products/        # Product-related components
│   │   ├── seo/             # SEO components
│   │   ├── ui/              # Reusable UI components
│   │   └── home/            # Home page specific components
│   ├── data/                # Static data (products, locations)
│   ├── hooks/               # Custom React hooks
│   ├── lib/                 # Utility functions
│   ├── pages/               # Page components
│   ├── services/            # API and GraphQL services
│   ├── stories/             # Storybook stories
│   ├── test/                # Test utilities and mocks
│   ├── types/               # TypeScript type definitions
│   ├── App.tsx              # Root component
│   └── main.tsx             # Application entry point
├── public/                  # Static assets
├── docs/                    # Additional documentation
└── package.json
```

## Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** 18+ or 20+ (recommended: use [nvm](https://github.com/nvm-sh/nvm) for version management)
- **npm** (comes with Node.js) or **yarn** or **pnpm** (alternative package managers)
- **Git** for version control

Verify your installations:
```bash
node --version   # Should be v18.0.0 or higher
npm --version    # Should be 8.0.0 or higher
git --version    # Should be 2.0.0 or higher
```

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/neilbcruz/letys-website.git
   cd letys-website
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

   This will install all required packages including React, TypeScript, Vite, and other dependencies.

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```

   If `.env.example` doesn't exist, create a `.env` file in the root directory with the following content:
   ```env
   # Google Analytics 4
   VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX
   VITE_ENABLE_GA=true

   # EmailJS Configuration (for contact form)
   REACT_APP_SERVICE_ID=your_service_id
   REACT_APP_TEMPLATE_ID=your_template_id
   REACT_APP_USER_ID=your_user_id
   ```

4. **Configure environment variables**

   Edit the `.env` file and add your actual values:

   - **Google Analytics**: Create a GA4 property at [analytics.google.com](https://analytics.google.com) and get your Measurement ID
   - **EmailJS**: Sign up at [emailjs.com](https://www.emailjs.com) to get your Service ID, Template ID, and User ID

### Development

Start the development server with hot module replacement:
```bash
npm run dev
```

The development server will start at:
- **Local**: [http://localhost:5173](http://localhost:5173)
- **Network**: Use your local IP for testing on mobile devices

**Development Features:**
- Fast Refresh for React components
- TypeScript type checking
- ESLint for code quality
- Source maps for debugging
- Proxy support for API calls

### Build

Build for production with optimization:
```bash
npm run build
```

This command will:
1. Generate the sitemap.xml for SEO
2. Run TypeScript compiler to check types
3. Bundle and minify the code
4. Optimize assets and images
5. Generate the production bundle in `dist/`

**Build Output:**
```
dist/
├── index.html
├── assets/
│   ├── index-[hash].js
│   ├── index-[hash].css
│   └── images/
└── sitemap.xml
```

### Preview

Preview the production build locally before deploying:
```bash
npm run preview
```

This serves the `dist/` folder at [http://localhost:4173](http://localhost:4173) to test the production build locally.

## Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run lint` | Run ESLint |
| `npm run preview` | Preview production build |
| `npm run test` | Run unit tests (Vitest) |
| `npm run test:ui` | Run tests with UI |
| `npm run test:coverage` | Run tests with coverage |
| `npm run test:e2e` | Run E2E tests (Playwright) |
| `npm run test:e2e:ui` | Run E2E tests with UI |
| `npm run test:e2e:debug` | Debug E2E tests |
| `npm run test:e2e:report` | View E2E test report |
| `npm run storybook` | Start Storybook |
| `npm run build-storybook` | Build Storybook |
| `npm run generate-sitemap` | Generate sitemap.xml |

## Environment Variables

### Required Variables

| Variable | Description | Example | Required |
|----------|-------------|---------|----------|
| `VITE_GA_MEASUREMENT_ID` | Google Analytics 4 Measurement ID | `G-XXXXXXXXXX` | No |
| `VITE_ENABLE_GA` | Enable/disable Google Analytics | `true` | No |
| `REACT_APP_SERVICE_ID` | EmailJS Service ID for contact form | `your_service_id` | Yes* |
| `REACT_APP_TEMPLATE_ID` | EmailJS Template ID for contact form | `your_template_id` | Yes* |
| `REACT_APP_USER_ID` | EmailJS User/Pubic Key | `your_user_id` | Yes* |

*Required for contact form functionality

### Variable Details

#### Google Analytics (Optional)
```env
VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX
VITE_ENABLE_GA=true
```
- Get your Measurement ID from [Google Analytics](https://analytics.google.com)
- Set `VITE_ENABLE_GA` to `false` to disable tracking during development

#### EmailJS (Required for Contact Form)
```env
REACT_APP_SERVICE_ID=your_service_id
REACT_APP_TEMPLATE_ID=your_template_id
REACT_APP_USER_ID=your_user_id
```
- Sign up at [EmailJS](https://www.emailjs.com)
- Create an email service (Gmail, Outlook, etc.)
- Create an email template with variables: `{{name}}`, `{{email}}`, `{{message}}`

### Accessing Environment Variables in Code

```typescript
// Access Vite environment variables
const gaId = import.meta.env.VITE_GA_MEASUREMENT_ID;
const enableGa = import.meta.env.VITE_ENABLE_GA === 'true';

// Access React environment variables
const serviceId = process.env.REACT_APP_SERVICE_ID;
```

## API Integration

### GraphQL API

The website connects to a GraphQL API for real-time product availability across store locations.

**Base URL**: `https://graphql-server-hotfix-x3nt7antfq-de.a.run.app/`

**Features:**
- Real-time inventory tracking
- Category-based filtering
- Product search functionality
- Stock status management
- Price and discount information

### Available Queries

#### Get Store Items
```graphql
query GetStoreItems($storeName: String!, $pageNumber: Int!, $pageSize: Int!, $category: String, $itemName: String) {
  getStoreItems(
    storeName: $storeName
    pageNumber: $pageNumber
    pageSize: $pageSize
    category: $category
    itemName: $itemName
  ) {
    items {
      name
      category
      price
      originalPrice
      stockDetails {
        qty
        min
      }
      imagePath
    }
  }
}
```

### Service Usage

See `API_DOCUMENTATION.md` for detailed API documentation including:
- Complete query and mutation reference
- Data structures and TypeScript types
- Error handling patterns
- Rate limiting information
- Authentication details

## Pages

| Route | Page | Description |
|-------|------|-------------|
| `/` | Home | Hero section, products overview, video background |
| `/products` | Products | Product catalog with categories |
| `/availability` | Availability | Real-time stock checker by store |
| `/locations` | Locations | Store locations with interactive maps |
| `/faq` | FAQ | Frequently asked questions |
| `/contact` | Contact | Contact form and information |

## Accessibility

This website follows WCAG 2.1 AA guidelines:
- Semantic HTML structure
- ARIA labels and roles
- Keyboard navigation support
- Screen reader compatibility
- Focus management
- Skip links for main content
- Color contrast compliance (4.5:1 minimum)

## Performance

- Lazy loading for pages and images
- Code splitting by route
- Optimized images with responsive srcset
- Web Vitals monitoring
- Sitemap generation for SEO

## Deployment

### Netlify (Recommended)

The site is configured for Netlify with automatic deployments.

**Automatic Deployment:**
- Push to `main` branch triggers production build
- Pull requests trigger preview deployments
- Netlify handles SSL, CDN, and caching automatically

**Manual Deployment via Netlify CLI:**
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login to Netlify
netlify login

# Deploy
netlify deploy --prod
```

**Netlify Configuration:**
- Build command: `npm run build`
- Publish directory: `dist/`
- Node version: 20

### Vercel

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel --prod
```

### Manual Deployment

1. **Build the project:**
   ```bash
   npm run build
   ```

2. **Deploy the `dist/` directory:**
   - **FTP/SFTP**: Upload contents of `dist/` to your server
   - **cPanel/File Manager**: Upload and extract `dist/` to `public_html`
   - **AWS S3**: Use AWS CLI or sync to S3 bucket
   - **GitHub Pages**: Push `dist/` contents to `gh-pages` branch

### Environment Variables in Production

Set these in your hosting provider's dashboard:
- `VITE_GA_MEASUREMENT_ID`
- `VITE_ENABLE_GA`
- `REACT_APP_SERVICE_ID`
- `REACT_APP_TEMPLATE_ID`
- `REACT_APP_USER_ID`

## Testing

### Unit Tests
```bash
npm run test              # Run all tests
npm run test:ui           # Run with UI
npm run test:coverage     # Generate coverage report
```

### E2E Tests
```bash
npm run test:e2e          # Run Playwright tests
npm run test:e2e:ui       # Run with UI
npm run test:e2e:debug    # Debug mode
```

### Component Testing
```bash
npm run storybook         # View components
npm run build-storybook   # Build Storybook
```

## Contributing

Please see [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines on contributing to this project.

## License

This project is proprietary and confidential.

## Contact

- **Email**: hello@letysbukopie.com
- **Website**: https://letysbukopie.com

## Acknowledgments

- Built with React and Vite
- Design by Lety's Buko Pie team
- Icons by Lucide and Simple Icons

---

## Troubleshooting

### Common Issues

**Issue: Port 5173 already in use**
```bash
# Kill the process using the port
npx kill-port 5173
# Or use a different port
npm run dev -- --port 3000
```

**Issue: Module not found errors**
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

**Issue: TypeScript errors after updating**
```bash
# Clear TypeScript cache
rm -rf dist .vite
npm run build
```

**Issue: GraphQL API not responding**
- Check your network connection
- Verify the API endpoint is accessible
- Check browser console for CORS errors
- Contact backend team if the issue persists

**Issue: Images not loading**
- Check that image paths in `/src/lib/images.ts` are correct
- Verify images exist in `/public/assets/images/`
- Check browser console for 404 errors

### Getting Help

If you encounter issues not covered here:
1. Check the [Issues](https://github.com/neilbcruz/letys-website/issues) section
2. Create a new issue with:
   - Error messages or screenshots
   - Steps to reproduce
   - Your environment (OS, Node version, browser)
   - Expected vs actual behavior
