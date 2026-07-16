import React from 'react'
import {
  House,
  ListChecks,
  Package,
  ChartLineUp,
  FadersHorizontal,
  ShieldCheck,
  CaretDown,
  Gear,
} from '@phosphor-icons/react'

type NavItem = {
  label: string
  icon: React.ReactNode
  count?: string
  action: () => void
}

interface SidebarProps {
  activeNav: string
  navItems: NavItem[]
  onNavClick: (label: string) => void
  workspace?: {
    name: string
    avatar: string
  }
  user?: {
    name: string
    role: string
    avatar: string
  }
  orderCount?: number
}

const defaultNavItems: NavItem[] = [
  {
    label: 'Overview',
    icon: <House size={18} weight="light" />,
    action: () => {},
  },
  {
    label: 'Risk queue',
    icon: <ListChecks size={18} weight="light" />,
    count: '93',
    action: () => {},
  },
  {
    label: 'Orders',
    icon: <Package size={18} weight="light" />,
    action: () => {},
  },
  {
    label: 'Analytics',
    icon: <ChartLineUp size={18} weight="light" />,
    action: () => {},
  },
  {
    label: 'Policies',
    icon: <FadersHorizontal size={18} weight="light" />,
    action: () => {},
  },
  {
    label: 'Model health',
    icon: <ShieldCheck size={18} weight="light" />,
    action: () => {},
  },
]

export const Sidebar: React.FC<SidebarProps> = ({
  activeNav,
  navItems = defaultNavItems,
  onNavClick,
  workspace = { name: 'Northstar Retail', avatar: 'NS' },
  user = { name: 'Harsh Kapoor', role: 'Risk analyst', avatar: 'HK' },
  orderCount = 93,
}) => {
  return (
    <aside className="sidebar" aria-label="Primary navigation">
      <div>
        <a className="brand" href="#overview" aria-label="ReturnShield AI home">
          <span className="brand-mark" aria-hidden="true">
            <span></span>
            <span></span>
            <span></span>
          </span>
          <span>ReturnShield</span>
        </a>

        <div className="workspace-switcher">
          <span className="workspace-avatar">{workspace.avatar}</span>
          <span>
            <small>Workspace</small>
            <strong>{workspace.name}</strong>
          </span>
          <CaretDown size={14} weight="light" />
        </div>

        <nav className="nav-list">
          {navItems.map((item) => (
            <button
              key={item.label}
              className={`nav-item ${activeNav === item.label ? 'is-active' : ''}`}
              onClick={() => onNavClick(item.label)}
              type="button"
            >
              {item.icon}
              <span>{item.label}</span>
              {item.count && <em>{item.count}</em>}
            </button>
          ))}
        </nav>
      </div>

      <div className="sidebar-footer">
        <div className="portfolio-pulse">
          <span className="pulse-dot"></span>
          <span>{orderCount} orders need review</span>
        </div>
        <button className="help-link" type="button">
          <Gear size={17} weight="light" aria-hidden="true" />
          Workspace settings
        </button>
        <div className="analyst-card">
          <span className="analyst-avatar">{user.avatar}</span>
          <span>
            <strong>{user.name}</strong>
            <small>{user.role}</small>
          </span>
          <CaretDown size={14} weight="light" aria-hidden="true" />
        </div>
      </div>
    </aside>
  )
}
