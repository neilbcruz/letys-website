# Lety's Buko Pie Website

> The Best Buko Pie in Laguna since 1976

## Quick Start

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build
```

## Tech Stack

- **React 19** + **TypeScript** + **Vite**
- **Tailwind CSS 4** for styling
- **React Router** for navigation
- **Playwright** for E2E testing

## Environment Variables

Create `.env`:
```env
# Google Analytics (optional)
VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX
VITE_ENABLE_GA=true

# EmailJS for contact form
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server (localhost:5173) |
| `npm run build` | Build for production |
| `npm run lint` | Run ESLint |
| `npm run test` | Run E2E tests |

## Project Structure

```
src/
├── components/     # Reusable components
│   ├── accessibility/  # A11y components
│   ├── layout/        # Header, Footer, Sections
│   ├── products/      # Product components
│   ├── seo/           # SEO & Analytics
│   └── ui/            # Button, Card, etc.
├── data/           # Static data (products, locations)
├── hooks/          # Custom hooks
├── lib/            # Utilities
├── pages/          # Page components
└── types/          # TypeScript types
```

## Pages

| Route | Page |
|-------|------|
| `/` | Home |
| `/products` | Product catalog |
| `/availability` | Stock checker |
| `/locations` | Store locations |
| `/faq` | FAQ |
| `/contact` | Contact form |

## Features

- Real-time inventory via GraphQL API
- Store location availability checker
- Interactive maps (Leaflet)
- SEO optimized (JSON-LD, OG tags)
- WCAG 2.1/2.2 Level AA compliant
- Mobile-first responsive design

## Deployment

```bash
# Build and deploy to Netlify
npm run build
# Deploy dist/ folder
```

## Troubleshooting

```bash
# Port already in use
npx kill-port 5173

# Reset dependencies
rm -rf node_modules package-lock.json
npm install
```

## License

Proprietary - All rights reserved
