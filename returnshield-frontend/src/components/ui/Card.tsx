import React, { type ReactNode } from 'react'

type CardVariant = 'default' | 'metric' | 'elevated'

interface CardProps {
  children: ReactNode
  variant?: CardVariant
  className?: string
}

// Double-bezel card: outer shell (.bezel) + inner core (.card-core), both
// defined in App.css. Variants only add modifier classes.
const variantClass: Record<CardVariant, string> = {
  default: 'bezel',
  metric: 'bezel metric-card',
  elevated: 'bezel bezel-elevated',
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ children, variant = 'default', className = '' }, ref) => (
    <div ref={ref} className={`${variantClass[variant]} ${className}`.trim()}>
      <div className="card-core">{children}</div>
    </div>
  ),
)

Card.displayName = 'Card'

interface CardContentProps {
  children: ReactNode
  className?: string
}

export const CardContent = ({ children, className = '' }: CardContentProps) => (
  <div className={`card-content ${className}`.trim()}>{children}</div>
)

export const CardHeader = ({ children, className = '' }: CardContentProps) => (
  <div className={`card-header ${className}`.trim()}>{children}</div>
)

export const CardTitle = ({ children, className = '' }: CardContentProps) => (
  <h2 className={`card-title ${className}`.trim()}>{children}</h2>
)

export const CardKicker = ({ children, className = '' }: CardContentProps) => (
  <span className={`section-kicker ${className}`.trim()}>{children}</span>
)
