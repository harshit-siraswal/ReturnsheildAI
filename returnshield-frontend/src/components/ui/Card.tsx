import React, { type ReactNode } from 'react'

type CardVariant = 'default' | 'metric' | 'elevated'

interface CardProps {
  children: ReactNode
  variant?: CardVariant
  className?: string
}

const cardVariants = {
  default:
    'padding-[1px] overflow-hidden border border-[rgba(197,219,236,0.1)] rounded-[22px] bg-[rgba(158,186,211,0.08)] shadow-[0_18px_50px_rgba(2,13,25,0.16)]',
  metric:
    'padding-[1px] overflow-hidden border border-[rgba(197,219,236,0.1)] rounded-[22px] bg-[rgba(158,186,211,0.08)] shadow-[0_18px_50px_rgba(2,13,25,0.16)] hover:border-[rgba(140,236,226,0.28)] hover:transform hover:translate-y-[-3px] transition-all duration-360',
  elevated:
    'border border-[rgba(207,230,242,0.12)] rounded-[17px] bg-linear-gradient(145deg,rgba(75,193,182,0.14),rgba(31,91,97,0.1)) shadow-[inset_0_1px_0_rgba(207,255,249,0.09)]',
}

const cardCore = 'height-full rounded-[20px] bg-linear-gradient(145deg,rgba(22,35,53,0.94),rgba(14,27,43,0.96)) shadow-[inset_0_1px_0_rgba(255,255,255,0.045)]'

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ children, variant = 'default', className = '' }, ref) => {
    return (
      <div ref={ref} className={`${cardVariants[variant]} ${className}`}>
        <div className={cardCore}>{children}</div>
      </div>
    )
  },
)

Card.displayName = 'Card'

interface CardContentProps {
  children: ReactNode
  className?: string
}

export const CardContent = ({ children, className = '' }: CardContentProps) => (
  <div className={`p-[22px] ${className}`}>{children}</div>
)

export const CardHeader = ({ children, className = '' }: CardContentProps) => (
  <div className={`flex items-start justify-between gap-4 mb-4 ${className}`}>{children}</div>
)

export const CardTitle = ({ children, className = '' }: CardContentProps) => (
  <h2 className={`m-0 text-[#eaf2f8] text-[16px] font-[545] tracking-[-0.035em] ${className}`}>
    {children}
  </h2>
)

export const CardKicker = ({ children, className = '' }: CardContentProps) => (
  <span
    className={`block mb-[7px] text-[#8295aa] text-[9px] font-[540] tracking-[0.1em] uppercase ${className}`}
  >
    {children}
  </span>
)
