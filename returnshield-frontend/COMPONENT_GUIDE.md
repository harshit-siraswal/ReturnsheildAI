# ReturnShield UI Component Library - Usage Guide

## Quick Start

All components are centrally exported from `src/components/index.ts`:

```tsx
import {
  // Layout
  Layout, Main, Sidebar, Topbar, PageHeading,
  // UI Components
  Button, Card, CardContent, CardHeader, CardTitle, CardKicker,
  Badge, SearchField, TextField, Table,
  // Dashboard
  MetricCard, ActionStack
} from './components'
```

---

## Component Examples

### Button Component

**Basic Usage**
```tsx
<Button>Click me</Button>
```

**With Variant & Size**
```tsx
<Button variant="primary" size="lg">Save Changes</Button>
<Button variant="secondary" size="md">Cancel</Button>
<Button variant="text" size="sm">Learn more</Button>
<Button variant="icon" size="md"><BellIcon /></Button>
```

**With Icon**
```tsx
<Button variant="primary">
  <ArrowUpRight size={16} /> Apply intervention
</Button>
```

**Disabled State**
```tsx
<Button disabled>Unavailable</Button>
<Button isLoading>Processing...</Button>
```

---

### Card Component

**Basic Card**
```tsx
<Card>
  <CardContent>
    <h3>Card Title</h3>
    <p>Card content goes here</p>
  </CardContent>
</Card>
```

**Card with Header**
```tsx
<Card>
  <CardContent>
    <CardHeader>
      <div>
        <CardKicker>Section label</CardKicker>
        <CardTitle>Loss at risk</CardTitle>
      </div>
      <Button variant="quiet">Filter options</Button>
    </CardHeader>
    {/* Content */}
  </CardContent>
</Card>
```

**Metric Card (special variant)**
```tsx
<Card variant="metric">
  <CardContent>
    <span className="text-sm">Revenue at risk</span>
    <strong className="text-3xl">INR 12.84L</strong>
    <div className="text-xs">+12.6% vs last period</div>
  </CardContent>
</Card>
```

**Elevated Card (for panels)**
```tsx
<Card variant="elevated">
  <CardContent>
    <h3>Recommended intervention</h3>
    <Button variant="primary" className="w-full mt-4">
      Apply action
    </Button>
  </CardContent>
</Card>
```

---

### Badge Component

**Priority Badge**
```tsx
<Badge variant="priority" priority="p0">P0</Badge>
<Badge variant="priority" priority="p1">P1</Badge>
<Badge variant="priority" priority="p2">P2</Badge>
```

**Status/Chip Badges**
```tsx
<Badge variant="status">Active</Badge>
<Badge variant="chip">Home essentials</Badge>
<Badge variant="reason">3 returns in 90 days</Badge>
<Badge variant="action"><ShieldCheck size={14} /> Verify by OTP</Badge>
```

---

### SearchField Component

**Basic Search**
```tsx
<SearchField
  placeholder="Search orders..."
  onChange={(e) => setQuery(e.target.value)}
/>
```

**With Icon & Keyboard Shortcut**
```tsx
<SearchField
  icon={<MagnifyingGlass size={17} aria-hidden />}
  kbd="⌘ K"
  placeholder="Search orders or customers"
  onChange={(e) => console.log(e.target.value)}
/>
```

---

### TextField Component

**Basic Input**
```tsx
<TextField
  type="text"
  placeholder="Enter order ID"
/>
```

**With Label & Helper Text**
```tsx
<TextField
  label="Return reason"
  placeholder="Describe the return..."
  helperText="Max 500 characters"
/>
```

**With Error State**
```tsx
<TextField
  label="Email"
  type="email"
  error="Invalid email format"
/>
```

---

### Table Component

**Basic Table**
```tsx
<Table
  columns={[
    { key: 'id', label: 'Order ID' },
    { key: 'customer', label: 'Customer' },
    { key: 'risk', label: 'Risk Score' },
  ]}
  data={orders}
  onRowClick={(order) => console.log(order)}
/>
```

**Table with Custom Renderers**
```tsx
<Table
  columns={[
    { key: 'id', label: 'Order', width: '120px' },
    { 
      key: 'priority', 
      label: 'Priority',
      render: (priority) => <Badge variant="priority" priority={priority}>{priority}</Badge>
    },
    { 
      key: 'risk', 
      label: 'Risk',
      align: 'right',
      render: (risk) => <strong>{risk}/100</strong>
    },
  ]}
  data={orders}
/>
```

---

### MetricCard Component

**Single Metric**
```tsx
<MetricCard
  label="Revenue at risk"
  value="INR 12.84L"
  delta="12.6%"
  detail="vs. previous 30 days"
  type="risk"
/>
```

**All Metric Types**
```tsx
<MetricCard type="risk" />      {/* Orange/amber */}
<MetricCard type="critical" />  {/* Red */}
<MetricCard type="return" />    {/* Amber */}
<MetricCard type="success" />   {/* Teal */}
```

---

### ActionStack Component

**Basic Action Stack**
```tsx
<ActionStack
  onActionClick={(action) => console.log(action)}
  onViewAll={() => navigateToQueue()}
/>
```

---

### Layout Components

**Full Page Layout**
```tsx
import { Layout, Main, Sidebar, Topbar, PageHeading } from './components'

<Layout>
  <Sidebar activeNav="Overview" onNavClick={setActiveNav} />
  <Main>
    <Topbar breadcrumbs={['Northstar Retail', 'Overview']} />
    <PageHeading
      eyebrow={<><Sparkle size={13} /> Decision intelligence</>}
      title="Revenue under protection"
      description="Live risk signals across your order flow..."
      actions={<Button>Export</Button>}
    />
    {/* Page content */}
  </Main>
</Layout>
```

**Custom Sidebar Items**
```tsx
<Sidebar
  activeNav="Analytics"
  onNavClick={setActiveNav}
  navItems={[
    { 
      label: 'Analytics', 
      icon: <ChartLineUp size={18} />, 
      action: () => navigate('/analytics') 
    },
    { 
      label: 'Orders', 
      icon: <Package size={18} />, 
      count: '42',
      action: () => navigate('/orders') 
    },
  ]}
  workspace={{ name: 'Acme Corp', avatar: 'AC' }}
  user={{ name: 'Jane Doe', role: 'Manager', avatar: 'JD' }}
/>
```

---

## Styling & Customization

### Using Utility Classes

All components accept a `className` prop for additional styling:

```tsx
<Button className="!w-full" variant="primary">Full width button</Button>
<Card className="min-h-[300px]">Content</Card>
```

### Tailwind Classes (via inline styles)

The project uses a mix of inline styles and CSS. Add custom styling:

```tsx
<CardContent className="!p-[30px]">
  Custom padding
</CardContent>
```

### Overriding Styles

Use CSS Modules or extend App.css for major customizations:

```css
/* App.css */
.custom-button {
  background: linear-gradient(90deg, var(--teal), var(--blue));
}
```

```tsx
<Button className="custom-button">Gradient button</Button>
```

---

## TypeScript Support

All components are fully typed:

```tsx
type ButtonVariant = 'primary' | 'secondary' | 'text' | 'icon' | 'quiet'
type BadgeVariant = 'priority' | 'status' | 'chip' | 'action' | 'reason'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  children: React.ReactNode
  isLoading?: boolean
}
```

Use TypeScript IntelliSense for autocompletion in your IDE.

---

## Accessibility

All components are built with accessibility in mind:

- ✅ Semantic HTML (`<button>`, `<label>`, `<table>`)
- ✅ ARIA labels for icon-only buttons
- ✅ Focus-visible outline styles (2px cyan)
- ✅ Keyboard navigation support
- ✅ Color contrast ratios (WCAG AA+)

**Best Practices:**
```tsx
{/* Good */}
<button aria-label="Close dialog">
  <X size={19} />
</button>

{/* Better - provide context */}
<button aria-label="Close order details drawer">
  <X size={19} />
</button>

{/* Semantic HTML */}
<label className="search-field">
  <MagnifyingGlass />
  <input placeholder="Search..." />
</label>
```

---

## Common Patterns

### Loading State
```tsx
const [isLoading, setIsLoading] = useState(false)

<Button isLoading={isLoading} onClick={async () => {
  setIsLoading(true)
  await saveOrder()
  setIsLoading(false)
}}>
  Save order
</Button>
```

### Form with Validation
```tsx
<form onSubmit={handleSubmit}>
  <TextField
    label="Email"
    type="email"
    error={errors.email}
    value={formData.email}
    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
  />
  <Button variant="primary" type="submit">Submit</Button>
</form>
```

### Conditional Rendering
```tsx
<Badge variant="priority" priority={order.priority}>
  {order.priority}
</Badge>
{order.risk > 85 && (
  <span className="text-red-500">Critical</span>
)}
```

### Responsive Grid
```tsx
<section className="grid grid-cols-4 gap-3 md:grid-cols-2 sm:grid-cols-1">
  <MetricCard ... />
  <MetricCard ... />
  <MetricCard ... />
  <MetricCard ... />
</section>
```

---

## Design Tokens Quick Reference

```css
/* Colors */
--ink: #f3f7fb            /* Primary text */
--muted: #94a4b7          /* Secondary text */
--teal: #69ded5           /* Primary accent */
--amber: #f4b369          /* Warning */
--red: #fb8073            /* Critical */
--blue: #84adff           /* Info */

/* Backgrounds */
--shell: #09111f          /* Page background */
--surface: #111d2d        /* Card surface */
--surface-raised: #142234 /* Elevated surface */

/* Typography */
font-family: 'Geist Variable'
font-family: 'Geist Mono Variable'

/* Border radius */
border-radius: 22px (cards)
border-radius: 12px (buttons)
border-radius: 8px (inputs)
```

---

## Troubleshooting

**Button not responding to onClick?**
- Check if `disabled` prop is true
- Ensure onClick handler is passed correctly

**Component styles not applying?**
- Verify className syntax (Tailwind uses `className`, not `class`)
- Check CSS specificity conflicts in App.css
- Use `!important` as last resort (bad practice)

**Table not rendering rows?**
- Ensure `data` prop is an array
- Check that column `key` values match object properties
- Use `render` function for complex cell content

**SearchField icon not showing?**
- Icon component needs `aria-hidden="true"`
- Check icon size (17-19px recommended)

---

## Contributing New Components

See `ARCHITECTURE.md` for folder structure. When adding a new component:

1. Create file in appropriate folder
2. Use React.forwardRef for interactive components
3. Export from folder's `index.ts`
4. Update `src/components/index.ts`
5. Add to this usage guide

Example template:
```tsx
// src/components/ui/NewComponent.tsx
import React from 'react'

interface NewComponentProps {
  label: string
  value?: string
  onChange?: (value: string) => void
}

export const NewComponent = React.forwardRef<
  HTMLDivElement,
  NewComponentProps
>(({ label, value, onChange }, ref) => {
  return (
    <div ref={ref} className="...">
      <label>{label}</label>
      {/* Component content */}
    </div>
  )
})

NewComponent.displayName = 'NewComponent'
```

---

## Resources

- **Design System:** See `ARCHITECTURE.md`
- **Geist Docs:** https://vercel.com/design
- **Phosphor Icons:** https://phosphoricons.com
- **TypeScript Handbook:** https://www.typescriptlang.org/docs

