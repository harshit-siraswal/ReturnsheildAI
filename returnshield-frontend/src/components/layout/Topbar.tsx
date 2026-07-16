import React from 'react'
import { Bell, MagnifyingGlass } from '@phosphor-icons/react'
import { SearchField } from '../ui'

interface TopbarProps {
  breadcrumbs?: string[]
  searchPlaceholder?: string
  onSearch?: (query: string) => void
}

export const Topbar: React.FC<TopbarProps> = ({
  breadcrumbs = ['Northstar Retail', 'Overview'],
  searchPlaceholder = 'Search orders or customers',
  onSearch,
}) => {
  const [searchValue, setSearchValue] = React.useState('')

  return (
    <header className="topbar">
      <div className="crumbs">
        {breadcrumbs.map((crumb, idx) => (
          <React.Fragment key={idx}>
            {idx > 0 && <span className="slash">/</span>}
            {idx === breadcrumbs.length - 1 ? (
              <strong>{crumb}</strong>
            ) : (
              <span>{crumb}</span>
            )}
          </React.Fragment>
        ))}
      </div>
      <div className="top-actions">
        <SearchField
          icon={<MagnifyingGlass size={17} weight="light" aria-hidden="true" />}
          kbd="⌘ K"
          placeholder={searchPlaceholder}
          value={searchValue}
          onChange={(e) => {
            setSearchValue(e.target.value)
            onSearch?.(e.target.value)
          }}
        />
        <button className="icon-button notification" type="button" aria-label="Notifications">
          <Bell size={19} weight="light" />
          <span></span>
        </button>
      </div>
    </header>
  )
}
