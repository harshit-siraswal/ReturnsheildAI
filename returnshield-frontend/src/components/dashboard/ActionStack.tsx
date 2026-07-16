import React from 'react'
import { Card, CardContent, CardHeader, CardKicker, CardTitle } from '../ui/Card'
import { ArrowUpRight, ShieldCheck, Package, Clock } from '@phosphor-icons/react'
import { Button } from '../ui/Button'

interface ActionStackProps {
  onViewAll?: () => void
  onActionClick?: (action: string) => void
}

interface Action {
  icon: React.ReactNode
  title: string
  subtitle: string
  isPrimary?: boolean
  tone?: 'default' | 'amber' | 'blue'
}

const actions: Action[] = [
  {
    icon: <ShieldCheck size={20} weight="light" />,
    title: 'Verify 14 COD orders',
    subtitle: 'Save an estimated INR 68,400',
    isPrimary: true,
  },
  {
    icon: <Package size={20} weight="light" />,
    title: 'Inspect 8 fragile SKUs',
    subtitle: '12h warehouse cutoff',
    tone: 'amber',
  },
  {
    icon: <Clock size={20} weight="light" />,
    title: 'Escalate 6 delivery delays',
    subtitle: 'INR 24,760 at risk',
    tone: 'blue',
  },
]

const getActionIconStyles = (tone?: string) => {
  const baseClass =
    'w-[34px] h-[34px] inline-grid place-items-center rounded-[10px] text-[var(--teal)] bg-[rgba(105,222,213,0.1)]'
  if (tone === 'amber')
    return `${baseClass} text-[#f4b369] bg-[rgba(244,179,105,0.1)]`
  if (tone === 'blue')
    return `${baseClass} text-[#84adff] bg-[rgba(132,173,255,0.1)]`
  return baseClass
}

export const ActionStack: React.FC<ActionStackProps> = ({
  onViewAll,
  onActionClick,
}) => {
  return (
    <Card>
      <CardContent className="!p-[22px]">
        <CardHeader className="!mb-0 !gap-4">
          <div>
            <CardKicker>Action center</CardKicker>
            <CardTitle>Best moves now</CardTitle>
          </div>
          <span className="inline-flex items-center gap-1.25 text-[#8da0b1] text-[9px]">
            <span className="w-1.25 h-1.25 rounded-full bg-[#57d9c8] shadow-[0_0_0_4px_rgba(87,217,200,0.08)]" />
            Live
          </span>
        </CardHeader>

        <div className="grid gap-2 mt-5.5">
          {actions.map((action, idx) => (
            <button
              key={idx}
              onClick={() => onActionClick?.(action.title)}
              className={`w-full grid grid-cols-[34px_1fr_18px] items-center gap-2.5 p-2.25 border-0 rounded-[13px] text-left transition-all duration-260 ${
                action.isPrimary
                  ? 'bg-linear-gradient(100deg, rgba(78, 209, 196, 0.16), rgba(78, 209, 196, 0.04)) shadow-[inset_0_1px_0_rgba(174,255,247,0.08)] hover:bg-linear-gradient(100deg, rgba(78, 209, 196, 0.25), rgba(78, 209, 196, 0.1))'
                  : 'bg-[rgba(231,244,252,0.035)] hover:bg-[rgba(231,244,252,0.085)] hover:translate-x-0.75'
              }`}
            >
              <span className={getActionIconStyles(action.tone)}>{action.icon}</span>
              <span>
                <strong className="block text-[#dfeaf3] text-[10px] font-[545]">
                  {action.title}
                </strong>
                <small className="block mt-0.75 text-[#7f92a7] text-[9px]">
                  {action.subtitle}
                </small>
              </span>
              <span className="w-[23px] h-[23px] inline-grid place-items-center rounded-full text-[#c7fffa] bg-[rgba(105,222,213,0.13)] transition-all duration-260 group-hover:bg-[rgba(105,222,213,0.22)] group-hover:scale-105">
                <ArrowUpRight size={16} weight="light" />
              </span>
            </button>
          ))}
        </div>

        <Button variant="text" size="sm" className="!mt-3.75" onClick={onViewAll}>
          View all 93 actions <ArrowUpRight size={15} weight="light" />
        </Button>
      </CardContent>
    </Card>
  )
}
