import React from 'react'

type BadgeVariant = 'priority' | 'status' | 'chip' | 'action' | 'reason'
type PriorityLevel = 'p0' | 'p1' | 'p2'

interface BadgeProps {
  variant?: BadgeVariant
  priority?: PriorityLevel
  children: React.ReactNode
  className?: string
  title?: string
}

// Classes come from App.css — no Tailwind in this project.
const variantClass: Record<Exclude<BadgeVariant, 'priority'>, string> = {
  status: 'status-chip',
  chip: 'reason-chip',
  action: 'action-chip',
  reason: 'reason-chip',
}

export const Badge = ({ variant = 'status', priority = 'p0', children, className = '', title }: BadgeProps) => {
  const base = variant === 'priority' ? `priority ${priority}` : variantClass[variant]
  return (
    <span className={`${base} ${className}`.trim()} title={title}>
      {children}
    </span>
  )
}

export default Badge
