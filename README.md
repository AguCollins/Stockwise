# Stockwise

Stockwise is a React-based inventory and sales management dashboard built for Nigerian SMEs. It covers inventory tracking, sales, expenses, vendors, and customer relationships in a single, mobile-first interface.

## Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Features](#features)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Available Scripts](#available-scripts)
- [Architecture Notes](#architecture-notes)
- [Design System](#design-system)
- [Shared UI Primitives](#shared-ui-primitives)
- [Code Conventions](#code-conventions)
- [Development Roadmap](#development-roadmap)
- [Contributing](#contributing)

## Overview

Stockwise gives small and mid-sized businesses a single place to:

- Track inventory levels, cost and selling prices, and low-stock thresholds
- Record sales and manage order status and payment methods
- Manage customer relationships, order history, and outstanding balances
- Manage vendor relationships, place purchase orders, and track payments
- Log and categorize business expenses
- Review sales, inventory, customer, and expense performance in a unified reports view

The application currently runs against local mock data (`src/data/mockData.js`) and a simulated authentication flow, with the codebase structured so that a real backend can be integrated without significant rearchitecting.

## Tech Stack

| Layer            | Technology                        |
|-------------------|------------------------------------|
| Framework          | React 19                          |
| Build tool         | Vite 8                            |
| Routing            | React Router 7                    |
| Styling            | Tailwind CSS 3 (with CSS custom property tokens, shadcn/ui conventions) |
| Icons              | Lucide React (exclusive icon library) |
| Charts             | Recharts 3                        |
| Linting            | ESLint 9, eslint-plugin-react-hooks, eslint-plugin-react-refresh |

## Features

### Dashboard
Real-time snapshot of business health: gross sales, net profit, inventory value, low-stock alerts, revenue trends, stock status breakdown, top sellers, low-stock alerts, recent sales, and pending orders.

### Inventory
Full CRUD for inventory items with category and status filtering, sortable table and card views, bulk selection, margin calculation, and low-stock/out-of-stock indicators.

### Sales
Point-of-sale style order creation (item search, cart, customer capture, payment method), order history with status and payment filters, and a detailed order receipt view.

### Customers
Customer directory with type and status filtering, grid and list views, lifetime value and order history, and a detail drawer for quick reference.

### Vendors
Supplier directory with category and status filtering, purchase order placement, payment tracking (including outstanding balances), and a detail drawer with order history.

### Expenses
Expense logging by category and payment method, monthly trend chart, category breakdown, and full CRUD with search and filtering.

### Reports
Tabbed reporting across Sales, Inventory, Customers, and Expenses, with a business health overview banner (revenue, profit, margin, expenses, average order value, average customer lifetime value).

## Project Structure

```
src/
├── components/
│   ├── auth/           # Login and signup forms
│   ├── customers/       # Customer modal, drawer, delete confirmation
│   ├── dashboard/        # Dashboard widgets (stat cards, charts, tables)
│   ├── expenses/         # Expense modal, breakdown, trend chart, delete confirmation
│   ├── inventory/        # Item modal, delete confirmation
│   ├── layout/           # Sidebar, TopBar, MobileNav
│   ├── sales/             # New sale modal, order view modal
│   ├── ui/                # Shared primitives: ModalShell, ConfirmDeleteModal, ResponsiveTable
│   └── vendors/            # Vendor modal, drawer, place-order modal, delete confirmation
├── context/              # AuthContext (provider) and authContextValue (context object)
├── data/                 # Mock data source (inventory, sales, customers, vendors, expenses, reports)
├── hooks/                # useAuth
├── pages/
│   ├── auth/              # LoginPage, SignupPage
│   ├── DashboardPage.jsx
│   ├── InventoryPage.jsx
│   ├── SalesPage.jsx
│   ├── CustomersPage.jsx
│   ├── VendorsPage.jsx
│   ├── ExpensesPage.jsx
│   └── ReportsPage.jsx
├── utils/                 # iconMap, inventoryIcons
├── App.jsx                # Route tree, layout shell, route guards
├── index.css               # Global styles, design tokens, animations
└── main.jsx                 # Application entry point
```

## Getting Started

### Prerequisites

- Node.js (a recent LTS release)
- npm

### Installation

```bash
git clone <repository-url>
cd stockwise
npm install
```

### Running the app

```bash
npm run dev
```

The app will be available at the local address printed in the terminal (typically `http://localhost:5173`).

### Building for production

```bash
npm run build
npm run preview
```

## Available Scripts

| Command           | Description                                  |
|--------------------|-----------------------------------------------|
| `npm run dev`        | Starts the Vite development server            |
| `npm run build`       | Builds the app for production                 |
| `npm run lint`         | Runs ESLint across the codebase                |
| `npm run preview`       | Serves the production build locally            |

## Architecture Notes

- **Authentication**: `AuthContext` and `useAuth` provide a simulated login/signup flow (`src/context/AuthContext.jsx`, `src/hooks/useAuth.js`). Route access is controlled by `ProtectedRoute` and `AuthRoute` in `App.jsx`. Replacing the mock `login`/`signup` implementations with real API calls is the primary integration point for a backend.
- **Data source**: All application data currently lives in `src/data/mockData.js`. Pages initialize local component state from these exports and mutate state directly (no persistence layer yet).
- **Routing**: Lazy-loaded page components via `React.lazy` and `Suspense`, with a shared `AppLayout` (sidebar + mobile nav) wrapping protected routes.
- **Responsive strategy**: Mobile-first, with a bottom tab bar (`MobileNav`) below the `md` breakpoint and a collapsible sidebar (`Sidebar`) at `md` and above. The `ResponsiveTable` primitive renders a card list on mobile and a table on desktop from a single data/column definition.
- **Form state**: Modals use lazy `useState` initializers (`buildInitialForm(editX)`) combined with a `key` prop on the parent's modal invocation to force a remount when switching between "add" and "edit" targets, rather than syncing form state via `useEffect`.
- **ID generation**: Any `Math.random()`-based ID generation (e.g. order IDs, purchase order IDs) is defined as a module-level pure function and only invoked from event handlers, never during render, to satisfy `react-hooks` purity rules.

## Design System

Design tokens are defined as HSL CSS custom properties in `src/index.css` and mapped into Tailwind's color palette in `tailwind.config.js`, following shadcn/ui conventions:

```css
--background, --foreground
--card, --card-foreground
--muted, --muted-foreground
--border, --input, --ring
```

Adoption is currently scoped to the shared UI primitives (`ModalShell`, `ConfirmDeleteModal`, `ResponsiveTable`); most legacy page and component markup still uses direct Tailwind gray/green utility classes. Extending token usage across the full component tree is tracked as future work.

Typography uses Syne (display) and DM Sans (body), loaded via Google Fonts in `index.html` and `src/index.css`.

## Shared UI Primitives

Located in `src/components/ui/`:

- **`ModalShell`** — Responsive modal container: bottom sheet on mobile, centered card on desktop. Handles backdrop, drag handle, and max-height/scroll behavior.
- **`ConfirmDeleteModal`** — Standardized delete confirmation built on `ModalShell`, with an icon, title, optional warning text, and optional custom body content.
- **`ResponsiveTable`** — Renders a card list on mobile and a table on desktop from a shared `columns` definition and `renderMobileCard` function, avoiding duplicated markup between breakpoints.

All interactive touch targets are enforced at a 44px minimum (`src/index.css`).

## Code Conventions

- **Icons**: Lucide React exclusively — no emoji in interactive UI elements.
- **Styling**: Tailwind CSS utility classes; semantic tokens (`bg-card`, `text-muted-foreground`, `border-border`, etc.) preferred for new shared components.
- **Linting**: `no-unused-vars` (with `varsIgnorePattern: '^[A-Z_]'` for component-style exports), `react-hooks` rules (including the `purity` rule for render-time side effects), and `react-refresh/only-export-components` for Fast Refresh compatibility. Files that need to export both a context object and a component (e.g. auth context) are split into separate files to satisfy this rule.
- **Component files**: Full-file rewrites are expected for any modified component — no partial diffs.

## Development Roadmap

Stockwise is being brought to production readiness through a five-phase plan, following a production readiness audit across six pillars: Architecture & Backend Integration Readiness, UI/UX & Design System Discipline, Mobile-First & Responsive Architecture, Accessibility, Animations & Micro-interactions, and SEO/OpenGraph.

- **Phase 1 — Stabilization & Dead Code Removal** *(complete)*
  Removed dead files and orphaned components, fixed functional bugs, eliminated emoji from interactive UI, stripped redundant inline style overrides.

- **Phase 2 — Component Consistency Consolidation** *(complete)*
  Introduced `ModalShell`, `ConfirmDeleteModal`, and `ResponsiveTable`; migrated delete modals, key modals, and top-level tables to these primitives; raised global touch targets to 44px; established the semantic design token system; resolved lint violations across hooks, exports, and render-time side effects.

- **Phase 3 — Backend Integration Readiness** *(next)*
  Concludes with a Backend Integration Readiness Gate — a checkpoint before further phases proceed.

- **Phases 4 and 5** — Planned; expected to address the remaining audit pillars (Accessibility, Animations & Micro-interactions, SEO/OpenGraph).

Work is organized into named, versioned branches per phase (e.g. `phase-2/component-consistency-consolidation`), with each phase gated by review before merge.

## Contributing

1. Create a branch off the current phase branch (or `main`, if starting a new phase).
2. Run `npm run lint` before opening a pull request — lint violations are treated as blocking, not advisory.
3. Follow existing conventions: Lucide icons only, no emoji, semantic tokens for new shared components, full-file changes for modified components.
4. Reference the relevant phase and audit pillar in the pull request description where applicable.