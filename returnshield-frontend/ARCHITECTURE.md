# ReturnShield Frontend - Component Library & Architecture

## Project Overview

**ReturnShield** is a modern SaaS dashboard for AI-powered return risk analysis. Built with React, TypeScript, and Geist Design System, it helps retail teams identify and prevent high-risk returns before they occur.

### Technology Stack
- **Framework:** React 19 with TypeScript
- **Styling:** CSS-in-JS with Tailwind/inline styles + custom CSS
- **UI Kit:** Geist Design System (fonts + design principles)
- **Icons:** Phosphor Icons React
- **Build Tool:** Vite 8.1
- **Dev Environment:** Node.js, TypeScript 6.0

---

## Architecture

### Folder Structure
```
src/
├── components/
│   ├── ui/                      # Reusable UI building blocks
│   │   ├── Button.tsx          # Button component (6 variants)
│   │   ├── Card.tsx            # Card container + subcomponents
│   │   ├── Badge.tsx           # Badge/chip component
│   │   ├── Input.tsx           # TextField + SearchField
│   │   ├── Table.tsx           # Sortable table component
│   │   └── index.ts            # UI exports
│   ├── layout/                  # Page-level layout components
│   │   ├── Layout.tsx          # App shell wrapper
│   │   ├── Sidebar.tsx         # Navigation sidebar
│   │   ├── Topbar.tsx          # Header with search
│   │   ├── PageHeading.tsx     # Page title + actions
│   │   └── index.ts            # Layout exports
│   ├── dashboard/               # Dashboard-specific components
│   │   ├── MetricCard.tsx      # KPI metric display
│   │   ├── ActionStack.tsx     # Call-to-action buttons
│   │   └── index.ts            # Dashboard exports
│   └── index.ts                # Main component exports
├── App.tsx                      # Main app component
├── App.css                      # Design tokens + responsive styles
├── index.css                    # Global styles
└── main.tsx                     # React entry point
```

### Component System

#### **UI Components (Reusable Building Blocks)**

**Button**
- Variants: `primary`, `secondary`, `text`, `icon`, `quiet`
- Sizes: `sm`, `md`, `lg`
- Props: `isLoading`, `disabled`, `onClick`
- Usage: Page headers, actions, inline buttons

```tsx
<Button variant="primary" size="md" onClick={handleClick}>
  Apply intervention <ArrowUpRight size={16} />
</Button>
```

**Card & CardContent**
- Container with gradient background + shadow
- Subcomponents: `CardContent`, `CardHeader`, `CardTitle`, `CardKicker`
- Variants: `default`, `metric`, `elevated`
- Usage: Dashboard sections, data cards, panels

```tsx
<Card variant="metric">
  <CardContent>
    <CardKicker>Portfolio exposure</CardKicker>
    <CardTitle>Loss at risk</CardTitle>
  </CardContent>
</Card>
```

**Badge**
- Variants: `priority`, `status`, `chip`, `action`, `reason`
- Priority levels: `p0` (critical), `p1` (warning), `p2` (info)
- Usage: Order priorities, status indicators, tags

```tsx
<Badge variant="priority" priority="p0">P0</Badge>
<Badge variant="action"><ShieldCheck size={14} /> Verify by OTP</Badge>
```

**SearchField**
- Icon + input + keyboard shortcut display
- Supports placeholder, onChange, value
- Usage: Search/filter in headers

```tsx
<SearchField
  icon={<MagnifyingGlass size={17} />}
  kbd="⌘ K"
  placeholder="Search orders..."
  onChange={(e) => setQuery(e.target.value)}
/>
```

**TextField**
- Form input with label, helper text, error display
- Accessible focus states
- Usage: Form fields, filters

**Table**
- Generic typed table component
- Column definitions with custom renderers
- Row click handler for interactions
- Usage: Order lists, data tables

#### **Layout Components**

**Layout**
- Root app shell wrapper
- Manages grid layout (sidebar + main content)

**Sidebar**
- Navigation with active state
- Workspace switcher + user profile
- Configurable nav items
- Status indicator badge

**Topbar**
- Breadcrumb navigation
- Search field + notifications
- Props: `breadcrumbs`, `onSearch`

**PageHeading**
- Hero section with eyebrow label
- Title + description
- Action buttons area
- Props: `eyebrow` (ReactNode), `title`, `description`, `actions`

#### **Dashboard Components**

**MetricCard**
- KPI display with icon, value, delta, detail
- Types: `risk`, `critical`, `return`, `success`
- Hover animation (lift-up)

**ActionStack**
- Stacked action buttons with primary highlight
- Live indicator badge
- "View all" link

---

## Color System

**Locked Design Tokens** (from App.css)
```
--ink: #f3f7fb              (text)
--muted: #94a4b7            (secondary text)
--shell: #09111f            (app background)
--surface: #111d2d          (card background)
--teal: #69ded5             (primary accent)
--amber: #f4b369            (warning accent)
--red: #fb8073              (critical accent)
--blue: #84adff             (info accent)
```

**Why This Works:**
- Teal + amber combination = fintech/healthcare lean
- High contrast on dark background = accessibility
- Amber warning + red critical distinguish severity clearly
- Geist typography makes it feel premium

---

## Typography

**Font Stack:**
- **Display:** Geist Variable, weight 560–590 (bold & commanding)
- **Body:** Geist Variable, weight 480–520 (readable & balanced)
- **Mono:** Geist Mono Variable (data + numbers)

**Scale:**
```
h1:  clamp(34px, 4vw, 54px)
h2:  16px
h3:  14px (drawer titles)
body: 11-13px
label: 10px
small: 8-9px
```

---

## Responsive Design

**Breakpoints:**
- **1120px:** Metric grid 4 → 2 columns
- **890px:** Hide sidebar, show mobile bar, full-width layout
- **580px:** Stack metric cards, compact tables

**Mobile-First Features:**
- Touch-friendly button sizes (min 34px × 34px)
- Drawer slides from bottom on mobile
- Table scrolls horizontally on small screens
- Navigation hides, replaced with mobile bar

---

## State Management Strategy

**Current:** React local state (useState)
**Next Steps:** Consider adding
- **React Query** for API calls + caching
- **Zustand** for global state (nav, filters, user session)
- **Context API** for theme/accessibility preferences

---

## Key Features Implemented

✅ **Dashboard Overview**
- KPI metric cards with delta indicators
- Risk exposure trend chart (SVG)
- Action center with call-to-action buttons
- Primary workbench (risk queue)

✅ **Order Details Drawer**
- Slide-out modal with order details
- Risk probability + estimated loss
- Factor breakdown (why flagged)
- Recommended action + alternative actions

✅ **Navigation**
- Sidebar with active state highlighting
- Workspace switcher
- User profile dropdown
- Mobile responsive menu

✅ **Data Table**
- Priority badges with color coding
- Interactive rows (click to open drawer)
- Risk score indicators
- Chip badges for drivers/actions

---

## Next Phase Roadmap

### Phase 2: Additional Pages (In Progress)
- [ ] **Analytics Page** — Detailed charts, trends, cohort analysis
- [ ] **Orders List** — Full order table with filters/sorting
- [ ] **Policies Page** — CRUD interface for return policies
- [ ] **Model Health** — Performance metrics, retraining status

### Phase 3: State & API (Planned)
- [ ] API service layer (mock first, then real endpoints)
- [ ] React Query setup for data fetching
- [ ] Zustand store for global state
- [ ] Error boundaries + loading states

### Phase 4: Refinements (Backlog)
- [ ] Dark/light mode toggle
- [ ] Accessibility audit (WCAG AA+)
- [ ] E2E tests (Cypress/Playwright)
- [ ] Storybook for component docs
- [ ] Animation library (Framer Motion) for transitions

---

## Design System Signature Elements

1. **Bezel cards** — Layered border + gradient background creates depth
2. **Teal accent** — Used for primary actions, live indicators, active states
3. **Geist typography** — Geometric sans-serif gives tech/modern feel
4. **Eyebrow labels** — Section categorization ("Decision intelligence", "Portfolio exposure")
5. **Live badges** — Pulsing dot indicator signals real-time data

---

## Deployment

**Build Command:**
```bash
npm run build
```

**Output:** 
- `dist/` folder with HTML, CSS, JS bundles
- Optimized: 277KB JS → 82KB gzip, 25KB CSS → 6.4KB gzip

**Development:**
```bash
npm run dev
```

Runs on http://localhost:5173 with HMR (hot module reloading).

---

## Contributing

When adding new components:
1. Create file in `src/components/{folder}/ComponentName.tsx`
2. Use TypeScript interfaces for props
3. Export from `src/components/{folder}/index.ts`
4. Import into `src/App.tsx` to use

Example:
```tsx
// src/components/ui/NewButton.tsx
import React from 'react'

export interface NewButtonProps {
  label: string
  onClick: () => void
}

export const NewButton: React.FC<NewButtonProps> = ({ label, onClick }) => (
  <button onClick={onClick}>{label}</button>
)
```

---

## Questions?

For design/component decisions, reference:
- `/design` folder for Geist Design System docs
- `App.css` for all design tokens
- Existing component patterns in `/components`

