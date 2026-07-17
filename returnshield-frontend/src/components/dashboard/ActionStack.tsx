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
  hint: string
  isPrimary?: boolean
  tone?: 'default' | 'amber' | 'blue'
}

const actions: Action[] = [
  {
    icon: <ShieldCheck size={20} weight="light" />,
    title: 'Verify 14 Gift Card orders',
    subtitle: 'Save an estimated INR 68,400',
    hint: 'Opens the risk queue filtered to Gift Card orders awaiting payment verification',
    isPrimary: true,
  },
  {
    icon: <Package size={20} weight="light" />,
    title: 'Inspect 8 fragile SKUs',
    subtitle: '12h warehouse cutoff',
    hint: 'Opens the queue filtered to fragile SKUs before the warehouse cutoff',
    tone: 'amber',
  },
  {
    icon: <Clock size={20} weight="light" />,
    title: 'Escalate 6 delivery delays',
    subtitle: 'INR 24,760 at risk',
    hint: 'Opens the queue filtered to orders with slipping delivery promises',
    tone: 'blue',
  },
]

export const ActionStack: React.FC<ActionStackProps> = ({ onViewAll, onActionClick }) => {
  return (
    <Card className="action-card">
      <CardContent>
        <CardHeader>
          <div>
            <CardKicker>Action center</CardKicker>
            <CardTitle>Best moves now</CardTitle>
          </div>
          <span className="live-label"><span></span> Live</span>
        </CardHeader>

        <div className="action-stack">
          {actions.map((action) => (
            <button
              key={action.title}
              type="button"
              title={action.hint}
              onClick={() => onActionClick?.(action.title)}
              className={`action-row ${action.isPrimary ? 'action-row-primary' : ''}`.trim()}
            >
              <span className={`action-icon ${action.tone ?? ''}`.trim()}>{action.icon}</span>
              <span>
                <strong>{action.title}</strong>
                <small>{action.subtitle}</small>
              </span>
              <span className="action-arrow">
                <ArrowUpRight size={16} weight="light" />
              </span>
            </button>
          ))}
        </div>

        <Button variant="text" size="sm" onClick={onViewAll} title="Open the full risk queue with all pending actions">
          View all 93 actions <ArrowUpRight size={15} weight="light" />
        </Button>
      </CardContent>
    </Card>
  )
}
