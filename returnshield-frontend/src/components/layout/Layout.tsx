import React, { type ReactNode } from 'react'

interface LayoutProps {
  children: ReactNode
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return <div className="app-shell">{children}</div>
}

interface MainProps {
  children: ReactNode
}

export const Main: React.FC<MainProps> = ({ children }) => (
  <main className="workspace">{children}</main>
)

interface SectionProps {
  children: ReactNode
  className?: string
  id?: string
}

export const Section: React.FC<SectionProps> = ({ children, className = '', id }) => (
  <section className={className} id={id}>
    {children}
  </section>
)

interface PageHeadingProps {
  eyebrow?: ReactNode
  title: string
  description?: string
  actions?: ReactNode
}

export const PageHeading: React.FC<PageHeadingProps> = ({ eyebrow, title, description, actions }) => (
  <section className="page-heading" aria-labelledby="page-title">
    <div>
      {eyebrow && <div className="eyebrow">{eyebrow}</div>}
      <h1 id="page-title">{title}</h1>
      {description && <p>{description}</p>}
    </div>
    {actions && <div className="heading-actions">{actions}</div>}
  </section>
)
