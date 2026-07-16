import React from 'react'
import { Bell, MagnifyingGlass } from '@phosphor-icons/react'
import { SearchField } from '../ui'
import type { Notification } from '../../lib/data'

interface TopbarProps {
  breadcrumbs?: string[]
  searchPlaceholder?: string
  searchValue: string
  onSearch: (query: string) => void
  notifications: Notification[]
  onMarkAllRead: () => void
  onNotificationOpen: (notification: Notification) => void
}

export const Topbar: React.FC<TopbarProps> = ({
  breadcrumbs = ['Northstar Retail', 'Overview'],
  searchPlaceholder = 'Search orders or customers',
  searchValue,
  onSearch,
  notifications,
  onMarkAllRead,
  onNotificationOpen,
}) => {
  const [panelOpen, setPanelOpen] = React.useState(false)
  const panelRef = React.useRef<HTMLDivElement>(null)
  const searchRef = React.useRef<HTMLLabelElement>(null)
  const unreadCount = notifications.filter((n) => n.unread).length

  React.useEffect(() => {
    if (!panelOpen) return
    const onPointerDown = (event: PointerEvent) => {
      if (panelRef.current && !panelRef.current.contains(event.target as Node)) setPanelOpen(false)
    }
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setPanelOpen(false)
    }
    document.addEventListener('pointerdown', onPointerDown)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('pointerdown', onPointerDown)
      document.removeEventListener('keydown', onKey)
    }
  }, [panelOpen])

  // ⌘K / Ctrl+K focuses search
  React.useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault()
        searchRef.current?.querySelector('input')?.focus()
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [])

  return (
    <header className="topbar">
      <div className="crumbs">
        {breadcrumbs.map((crumb, idx) => (
          <React.Fragment key={idx}>
            {idx > 0 && <span className="slash">/</span>}
            {idx === breadcrumbs.length - 1 ? <strong>{crumb}</strong> : <span>{crumb}</span>}
          </React.Fragment>
        ))}
      </div>
      <div className="top-actions">
        <SearchField
          ref={searchRef}
          icon={<MagnifyingGlass size={17} weight="light" aria-hidden="true" />}
          kbd="Ctrl K"
          placeholder={searchPlaceholder}
          value={searchValue}
          onChange={(e) => onSearch(e.target.value)}
          aria-label="Search orders or customers"
        />
        <div className="notification-wrap" ref={panelRef}>
          <button
            className="icon-button notification"
            type="button"
            aria-label={unreadCount ? `Notifications, ${unreadCount} unread` : 'Notifications'}
            aria-expanded={panelOpen}
            title="Critical order alerts and model updates"
            onClick={() => setPanelOpen((open) => !open)}
          >
            <Bell size={19} weight="light" />
            {unreadCount > 0 && <span></span>}
          </button>
          {panelOpen && (
            <div className="notification-panel" role="dialog" aria-label="Notifications">
              <div className="notification-head">
                <strong>Notifications</strong>
                <button type="button" onClick={onMarkAllRead} disabled={unreadCount === 0}>
                  Mark all read
                </button>
              </div>
              {notifications.map((notification) => (
                <button
                  key={notification.id}
                  type="button"
                  className={`notification-row ${notification.unread ? 'is-unread' : ''}`.trim()}
                  onClick={() => {
                    onNotificationOpen(notification)
                    setPanelOpen(false)
                  }}
                >
                  <span className="notification-dot" aria-hidden="true"></span>
                  <span>
                    <strong>{notification.title}</strong>
                    <small>{notification.body}</small>
                    <em>{notification.time}</em>
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
