# Quick Reference — ReturnShield Component API

## 🚀 Start Here

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # Production build
```

---

## 📦 Component Imports

```tsx
// All from one place
import {
  // Buttons
  Button,
  // Cards
  Card, CardContent, CardHeader, CardTitle, CardKicker,
  // Badges
  Badge,
  // Forms
  SearchField, TextField,
  // Tables
  Table,
  // Layouts
  Layout, Main, Sidebar, Topbar, PageHeading,
  // Dashboard
  MetricCard, ActionStack
} from './components'
```

---

## 🎨 Button Variants

| Variant | Use Case | Example |
|---------|----------|---------|
| `primary` | Main action | "Save", "Apply" |
| `secondary` | Secondary action | "Cancel", "Filter" |
| `text` | Low emphasis | "Learn more" |
| `icon` | Icon button | Gear, Bell |
| `quiet` | Subtle button | "Options", "More" |

**Sizes:** `sm`, `md`, `lg`

```tsx
<Button variant="primary" size="lg">Save</Button>
<Button variant="text" size="sm">Skip</Button>
```

---

## 🎯 Badge Variants

| Variant | Use Case | Example |
|---------|----------|---------|
| `priority` | P0/P1/P2 badges | `<Badge variant="priority" priority="p0">P0</Badge>` |
| `status` | Status indicators | "Active", "Pending" |
| `chip` | Category tags | "Home essentials" |
| `reason` | Light chips | "3 returns in 90 days" |
| `action` | Action chips | "Verify by OTP" |

```tsx
<Badge variant="priority" priority="p0">P0</Badge>
<Badge variant="action"><ShieldCheck size={14} /> Verify</Badge>
```

---

## 📋 Card Structure

```tsx
<Card>
  <CardContent>
    <CardKicker>Section label</CardKicker>
    <CardTitle>Main title</CardTitle>
    <p>Content goes here</p>
  </CardContent>
</Card>

// With Header
<Card>
  <CardContent>
    <CardHeader>
      <div>
        <CardKicker>Label</CardKicker>
        <CardTitle>Title</CardTitle>
      </div>
      <Button>Action</Button>
    </CardHeader>
  </CardContent>
</Card>
```

---

## 🔍 SearchField

```tsx
<SearchField
  icon={<MagnifyingGlass size={17} />}
  kbd="⌘ K"
  placeholder="Search..."
  onChange={(e) => handleSearch(e.target.value)}
/>
```

---

## 📝 TextField

```tsx
<TextField
  label="Your name"
  placeholder="Enter name..."
  helperText="First and last name"
  value={name}
  onChange={(e) => setName(e.target.value)}
/>

<TextField
  label="Email"
  type="email"
  error="Invalid email"
/>
```

---

## 📊 Table

```tsx
<Table
  columns={[
    { key: 'id', label: 'Order ID', width: '120px' },
    { key: 'customer', label: 'Customer' },
    { 
      key: 'priority',
      label: 'Priority',
      render: (p) => <Badge priority={p}>{p}</Badge>
    },
    { 
      key: 'risk',
      label: 'Risk',
      align: 'right',
      render: (r) => `${r}/100`
    },
  ]}
  data={orders}
  onRowClick={(order) => openOrder(order)}
/>
```

---

## 📊 MetricCard

```tsx
<MetricCard
  label="Revenue at risk"
  value="INR 12.84L"
  delta="12.6%"
  detail="vs. previous 30 days"
  type="risk"        // 'risk' | 'critical' | 'return' | 'success'
/>
```

---

## 🎬 ActionStack

```tsx
<ActionStack
  onActionClick={(action) => navigate('/queue')}
  onViewAll={() => navigate('/all-actions')}
/>
```

---

## 🏗️ Page Layout

```tsx
<Layout>
  <Sidebar
    activeNav="Overview"
    onNavClick={setActive}
    navItems={[
      { label: 'Overview', icon: <House /> },
      { label: 'Orders', icon: <Package />, count: '42' },
    ]}
  />
  <Main>
    <Topbar breadcrumbs={['Northstar', 'Overview']} />
    <PageHeading
      eyebrow={<>🎯 Section</>}
      title="Main title"
      description="Description text"
      actions={<Button>Export</Button>}
    />
    {/* Page content */}
  </Main>
</Layout>
```

---

## 🎨 Design Tokens

```css
/* Colors */
--ink: #f3f7fb              (Text)
--muted: #94a4b7            (Secondary text)
--teal: #69ded5             (Primary)
--amber: #f4b369            (Warning)
--red: #fb8073              (Critical)
--blue: #84adff             (Info)
--shell: #09111f            (Background)
--surface: #111d2d          (Cards)

/* Use in CSS */
background: var(--teal);
color: var(--ink);
```

---

## 🎯 Common Patterns

**Loading Button:**
```tsx
<Button isLoading={isLoading} variant="primary">
  Save changes
</Button>
```

**Disabled Button:**
```tsx
<Button disabled>Unavailable</Button>
```

**Full-Width Button:**
```tsx
<Button className="w-full">Click here</Button>
```

**Grid of Metrics:**
```tsx
<section className="grid grid-cols-4 gap-3">
  <MetricCard ... />
  <MetricCard ... />
  <MetricCard ... />
  <MetricCard ... />
</section>
```

**Conditional Badge:**
```tsx
{order.risk > 85 && (
  <Badge variant="priority" priority="p0">Critical</Badge>
)}
```

---

## 🔗 Documentation

| File | Purpose |
|------|---------|
| `COMPONENT_GUIDE.md` | Full API + examples |
| `ARCHITECTURE.md` | System design + roadmap |
| `COMPLETION_REPORT.md` | Phase 1 summary |
| `README.md` | Project overview |

---

## ⚡ Pro Tips

1. **Always use variants** — Don't style buttons manually
2. **Leverage CardHeader** — Keeps cards organized
3. **Badge for status** — More semantic than plain text
4. **Table.render** — Custom cells without prop drilling
5. **Topbar breadcrumbs** — Automatic from state
6. **className prop** — All components accept it for override

---

## 🐛 Troubleshooting

| Issue | Solution |
|-------|----------|
| Button not clickable | Check `disabled` prop |
| Table columns not aligned | Use `width` on column definition |
| Badge looks small | Increase icon size (14-16px) |
| Card content spilling | Use `CardContent` wrapper |
| SearchField not visible | Check parent flex/grid |

---

## 📱 Responsive Breakpoints

```css
/* Desktop (1120px and up) */
.grid-cols-4 { grid-template-columns: repeat(4, 1fr); }

/* Tablet (890px–1119px) */
@media (max-width: 1120px) { grid-template-columns: repeat(2, 1fr); }

/* Mobile (579px and under) */
@media (max-width: 890px) { grid-template-columns: 1fr; }
```

---

**Ready to build?** See `COMPONENT_GUIDE.md` for full examples. Happy coding! 🚀

