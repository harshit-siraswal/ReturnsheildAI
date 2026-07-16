import React from 'react'
import { Card } from '../ui/Card'
import { TrendDown, TrendUp, Check, Warning, ArrowsCounterClockwise } from '@phosphor-icons/react'

type MetricType = 'risk' | 'critical' | 'return' | 'success'

interface MetricCardProps {
  label: string
  value: string
  delta: string
  detail: string
  type: MetricType
  hint?: string
  onClick?: () => void
}

const icons: Record<MetricType, React.ReactNode> = {
  risk: <TrendUp size={16} weight="light" />,
  critical: <Warning size={16} weight="light" />,
  return: <ArrowsCounterClockwise size={16} weight="light" />,
  success: <Check size={16} weight="light" />,
}

const fallbackHints: Record<MetricType, string> = {
  risk: 'Open the risk queue scoped to this period',
  critical: 'Open orders that must be actioned before dispatch',
  return: 'Compare return rate against the category baseline',
  success: 'Review validated interventions for this month',
}

export const MetricCard: React.FC<MetricCardProps> = ({ label, value, delta, detail, type, hint, onClick }) => {
  const body = (
    <>
      <div className="metric-label">
        <span>{label}</span>
        <span className={`metric-icon ${type}`}>{icons[type]}</span>
      </div>
      <strong className="metric-value">{value}</strong>
      <div className={`metric-foot ${type}`}>
        <b>{type === 'success' ? <TrendUp size={11} weight="light" /> : <TrendDown size={11} weight="light" />} {delta}</b>
        <span>{detail}</span>
      </div>
    </>
  )

  return (
    <Card variant="metric">
      {onClick ? (
        <button type="button" className="metric-body metric-clickable" onClick={onClick} title={hint ?? fallbackHints[type]}>
          {body}
        </button>
      ) : (
        <div className="metric-body">{body}</div>
      )}
    </Card>
  )
}
