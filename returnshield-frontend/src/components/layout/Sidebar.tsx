import React from 'react'
import { CaretDown, Gear, SignOut } from '@phosphor-icons/react'

type NavItem = {
  label: string
  icon: React.ReactNode
  count?: string
  hint?: string
}

interface SidebarProps {
  activeNav: string
  navItems: NavItem[]
  onNavClick: (label: string) => void
  onSettings?: () => void
  onSignOut?: () => void
  workspace?: { name: string; avatar: string }
  user?: { name: string; role: string; avatar: string }
  orderCount?: number
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeNav,
  navItems,
  onNavClick,
  onSettings,
  onSignOut,
  workspace = { name: 'Northstar Retail', avatar: 'NS' },
  user = { name: 'Demo Analyst', role: 'Risk analyst', avatar: 'DA' },
  orderCount = 93,
}) => {
  const [userMenuOpen, setUserMenuOpen] = React.useState(false)

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

        <button
          type="button"
          className="workspace-switcher"
          title="Workspace switching is scoped to a single pilot tenant in this demo"
        >
          <span className="workspace-avatar">{workspace.avatar}</span>
          <span>
            <small>Workspace</small>
            <strong>{workspace.name}</strong>
          </span>
          <CaretDown size={14} weight="light" />
        </button>

        <nav className="nav-list">
          {navItems.map((item) => (
            <button
              key={item.label}
              className={`nav-item ${activeNav === item.label ? 'is-active' : ''}`.trim()}
              onClick={() => onNavClick(item.label)}
              type="button"
              title={item.hint}
              aria-current={activeNav === item.label ? 'page' : undefined}
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
        <button
          className="help-link"
          type="button"
          onClick={onSettings}
          title="Thresholds, playbooks, roles, and retention"
        >
          <Gear size={17} weight="light" aria-hidden="true" />
          Workspace settings
        </button>
        <div className="analyst-wrap">
          <button
            type="button"
            className="analyst-card"
            onClick={() => setUserMenuOpen((open) => !open)}
            aria-expanded={userMenuOpen}
            title="Account menu"
          >
            <span className="analyst-avatar">{user.avatar}</span>
            <span>
              <strong>{user.name}</strong>
              <small>{user.role}</small>
            </span>
            <CaretDown size={14} weight="light" aria-hidden="true" className={userMenuOpen ? 'caret-open' : ''} />
          </button>
          {userMenuOpen && (
            <div className="analyst-menu" role="menu">
              <button type="button" role="menuitem" onClick={() => { setUserMenuOpen(false); onSignOut?.() }}>
                <SignOut size={15} weight="light" /> Sign out
              </button>
            </div>
          )}
        </div>
      </div>
    </aside>
  )
}
