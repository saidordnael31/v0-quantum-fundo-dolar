# Project Dependencies

This document maps the dependencies between components in the Akin Quantum Hedge Fund project.

## Core Dependencies

- **Next.js**: The framework used for server-side rendering and routing
- **React**: The library used for building user interfaces
- **Tailwind CSS**: The utility-first CSS framework used for styling
- **shadcn/ui**: The UI component library used for building the interface

## Component Dependencies

### Marketing Pages
- `app/(marketing)/page.tsx`: Home page
  - Dependencies: Button, Card components from shadcn/ui
  - No external API calls

- `app/(marketing)/about/page.tsx`: About page
  - Dependencies: Card components from shadcn/ui
  - No external API calls

- `app/(marketing)/how-it-works/page.tsx`: How it works page
  - Dependencies: Card components from shadcn/ui
  - No external API calls

- `app/(marketing)/faq/page.tsx`: FAQ page
  - Dependencies: Accordion components from shadcn/ui
  - No external API calls

- `app/(marketing)/contact/page.tsx`: Contact page
  - Dependencies: Form components from shadcn/ui
  - No external API calls

### Authentication
- `app/auth/login/page.tsx`: Login page
  - Dependencies: Form components from shadcn/ui
  - No external API calls (static implementation)

- `app/auth/register/page.tsx`: Registration page
  - Dependencies: Form components from shadcn/ui
  - No external API calls (static implementation)

### Dashboard
- `app/dashboard/page.tsx`: Dashboard page
  - Dependencies: Card components from shadcn/ui
  - No external API calls (static implementation)

### Admin
- `app/admin/page.tsx`: Admin dashboard page
  - Dependencies: None (static HTML/CSS)
  - No external API calls (static implementation)

### Payment
- `app/checkout/page.tsx`: Checkout page
  - Dependencies: Form components from shadcn/ui
  - API calls: `/api/payment` (simplified mock implementation)

## API Routes

- `/api/payment/route.ts`: Payment processing API
  - Implementation: Mock implementation that always returns success
  - No external dependencies

## Removed Dependencies

The following dependencies have been removed to simplify the project:

- **Internationalization**: All i18n functionality has been removed
  - Replaced with static text
  - Simplified `t` function that just returns the key

- **Stripe Integration**: Removed in favor of mock payment processing
  - No actual payment processing
  - No Stripe API calls

- **Database Integration**: No actual database connections
  - All data is static or mocked

## Future Enhancements

When adding new features, consider the following guidelines:

1. Add one feature at a time
2. Test thoroughly after each addition
3. Document new dependencies in this file
4. Avoid complex integrations until the base is stable
\`\`\`

## Simplificar Outros Componentes Críticos

Vamos simplificar o componente de investimento que pode estar causando problemas:
