import React from 'react'
import { CaretDown, CaretLeft, CaretRight, Gear, SignOut, Sun, Moon } from '@phosphor-icons/react'

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
  onBackToLanding?: () => void
  workspace?: { name: string; avatar: string }
  user?: { name: string; role: string; avatar: string }
  orderCount?: number
  isCollapsed?: boolean
  onToggleCollapse?: () => void
  theme: 'dark' | 'light'
  onToggleTheme: () => void
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeNav,
  navItems,
  onNavClick,
  onSettings,
  onSignOut,
  onBackToLanding,
  workspace = { name: 'Northstar Retail', avatar: 'NS' },
  user = { name: 'Demo Analyst', role: 'Risk analyst', avatar: 'DA' },
  orderCount = 93,
  isCollapsed = false,
  onToggleCollapse,
  theme,
  onToggleTheme,
}) => {
  const [userMenuOpen, setUserMenuOpen] = React.useState(false)

  return (
    <aside className={`sidebar ${isCollapsed ? 'is-collapsed' : ''}`} aria-label="Primary navigation">
      <div>
        <div className="sidebar-header">
          <a className="brand" href="#overview" aria-label="ReturnShield AI home">
            <span className="brand-mark" aria-hidden="true">
              <span></span>
              <span></span>
              <span></span>
            </span>
            {!isCollapsed && <span>ReturnShield</span>}
          </a>
          <button
            type="button"
            className="collapse-toggle"
            onClick={onToggleCollapse}
            title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {isCollapsed ? <CaretRight size={14} weight="bold" /> : <CaretLeft size={14} weight="bold" />}
          </button>
        </div>

        <button
          type="button"
          className="workspace-switcher"
          title="Workspace switching is scoped to a single pilot tenant in this demo"
        >
          <span className="workspace-avatar">{workspace.avatar}</span>
          {!isCollapsed && (
            <span>
              <small>Workspace</small>
              <strong>{workspace.name}</strong>
            </span>
          )}
          {!isCollapsed && <CaretDown size={14} weight="light" />}
        </button>

        <nav className="nav-list">
          {navItems.map((item) => (
            <button
              key={item.label}
              className={`nav-item ${activeNav === item.label ? 'is-active' : ''}`.trim()}
              onClick={() => onNavClick(item.label)}
              type="button"
              title={item.hint ?? item.label}
              aria-current={activeNav === item.label ? 'page' : undefined}
            >
              {item.icon}
              {!isCollapsed && <span>{item.label}</span>}
              {!isCollapsed && item.count && <em>{item.count}</em>}
            </button>
          ))}
        </nav>
      </div>

      <div className="sidebar-footer">
        <div className="portfolio-pulse">
          <span className="pulse-dot"></span>
          {!isCollapsed && <span>{orderCount} orders need review</span>}
        </div>
        <button
          className="help-link theme-toggle-btn"
          type="button"
          onClick={onToggleTheme}
          title="Toggle light and dark mode"
        >
          {theme === 'dark' ? (
            <Sun size={17} weight="light" aria-hidden="true" />
          ) : (
            <Moon size={17} weight="light" aria-hidden="true" />
          )}
          {!isCollapsed && <span>{theme === 'dark' ? 'Light mode' : 'Dark mode'}</span>}
        </button>
        <button
          className="help-link"
          type="button"
          onClick={onSettings}
          title="Thresholds, playbooks, roles, and retention"
        >
          <Gear size={17} weight="light" aria-hidden="true" />
          {!isCollapsed && <span>Workspace settings</span>}
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
            {!isCollapsed && (
              <span>
                <strong>{user.name}</strong>
                <small>{user.role}</small>
              </span>
            )}
            {!isCollapsed && <CaretDown size={14} weight="light" aria-hidden="true" className={userMenuOpen ? 'caret-open' : ''} />}
          </button>
          {userMenuOpen && (
            <div className="analyst-menu" role="menu">
              <button type="button" role="menuitem" onClick={() => { setUserMenuOpen(false); onBackToLanding?.() }} style={{ whiteSpace: 'nowrap' }}>
                {!isCollapsed ? 'Exit to Landing' : 'Exit'}
              </button>
              <button type="button" role="menuitem" onClick={() => { setUserMenuOpen(false); onSignOut?.() }}>
                <SignOut size={15} weight="light" /> {!isCollapsed ? 'Sign out' : 'Out'}
              </button>
            </div>
          )}
        </div>
      </div>
    </aside>
  )
}
