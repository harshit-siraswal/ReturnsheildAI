import React from 'react'

type BadgeVariant = 'priority' | 'status' | 'chip' | 'action' | 'reason'
type PriorityLevel = 'p0' | 'p1' | 'p2'

interface BadgeProps {
  variant?: BadgeVariant
  priority?: PriorityLevel
  tone?: 'teal' | 'amber' | 'red' | 'blue' | 'slate'
  children: React.ReactNode
  className?: string
}

const badgeVariants = {
  priority: {
    p0: 'inline-grid place-items-center min-w-[25px] px-1.5 py-0.5 rounded-[6px] font-mono text-[8px] font-[650] text-[#ffc6c0] bg-[rgba(251,128,115,0.12)]',
    p1: 'inline-grid place-items-center min-w-[25px] px-1.5 py-0.5 rounded-[6px] font-mono text-[8px] font-[650] text-[#ffe0b8] bg-[rgba(244,179,105,0.12)]',
    p2: 'inline-grid place-items-center min-w-[25px] px-1.5 py-0.5 rounded-[6px] font-mono text-[8px] font-[650] text-[#c5d7ec] bg-[rgba(132,173,255,0.1)]',
  },
  status: 'inline-flex items-center gap-2 px-3 py-1.5 rounded-[8px] text-[10px] bg-[rgba(221,238,249,0.047)]',
  chip: 'inline-flex items-center gap-2 max-w-[160px] px-1.75 py-1.25 rounded-[7px] text-[9px] text-[#a9b8c7] bg-[rgba(214,232,245,0.06)] overflow-hidden text-ellipsis whitespace-nowrap',
  action: 'inline-flex items-center gap-1 max-w-[160px] px-1.75 py-1.25 rounded-[7px] text-[9px] text-[#9cf1e8] bg-[rgba(105,222,213,0.09)] overflow-hidden text-ellipsis whitespace-nowrap',
  reason: 'inline-flex items-center gap-2 max-w-[160px] px-1.75 py-1.25 rounded-[7px] text-[9px] text-[#a9b8c7] bg-[rgba(214,232,245,0.06)] overflow-hidden text-ellipsis whitespace-nowrap',
}

export const Badge = ({
  variant = 'status',
  priority = 'p0',
  children,
  className = '',
}: BadgeProps) => {
  let baseClasses = badgeVariants[variant as keyof typeof badgeVariants]

  if (variant === 'priority' && priority) {
    baseClasses = badgeVariants.priority[priority]
  }

  return <span className={`${baseClasses} ${className}`}>{children}</span>
}

export default Badge
