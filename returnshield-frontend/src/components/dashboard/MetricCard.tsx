import React from 'react'
import { Card, CardContent } from '../ui/Card'
import { TrendDown, Check, Warning } from '@phosphor-icons/react'

type MetricType = 'risk' | 'critical' | 'return' | 'success'

interface MetricCardProps {
  label: string
  value: string
  delta: string
  detail: string
  type: MetricType
}

const getIcon = (type: MetricType) => {
  switch (type) {
    case 'success':
      return <Check size={16} weight="light" />
    case 'critical':
      return <Warning size={16} weight="light" />
    default:
      return <TrendDown size={16} weight="light" />
  }
}

const getIconStyles = (type: MetricType): string => {
  const baseClass =
    'w-[27px] h-[27px] inline-grid place-items-center rounded-[9px] text-[#a9b8c8] bg-[rgba(195,214,230,0.07)]'
  switch (type) {
    case 'critical':
      return `${baseClass} text-[#fb8073] bg-[rgba(251,128,115,0.1)]`
    case 'success':
      return `${baseClass} text-[#69ded5] bg-[rgba(105,222,213,0.1)]`
    case 'risk':
      return `${baseClass} text-[#f4b369] bg-[rgba(244,179,105,0.1)]`
    default:
      return baseClass
  }
}

const getDeltaStyles = (type: MetricType): string => {
  const baseClass = 'text-[9px] font-[580]'
  switch (type) {
    case 'success':
      return `${baseClass} text-[#69ded5]`
    case 'critical':
      return `${baseClass} text-[#fb8073]`
    default:
      return `${baseClass} text-[#f4b369]`
  }
}

export const MetricCard: React.FC<MetricCardProps> = ({
  label,
  value,
  delta,
  detail,
  type,
}) => {
  return (
    <Card variant="metric">
      <CardContent className="!p-4.5">
        <div className="flex items-center justify-between mb-3">
          <span className="text-[10px] text-[#97a8ba]">{label}</span>
          <span className={getIconStyles(type)}>{getIcon(type)}</span>
        </div>
        <strong className="block text-[26px] font-[560] tracking-[-0.055em] text-[#f3f8fc] my-4.75">
          {value}
        </strong>
        <div className={`flex flex-wrap gap-1.25 text-[9px] text-[#7e90a5]`}>
          <b className={getDeltaStyles(type)}>{delta}</b>
          <span>{detail}</span>
        </div>
      </CardContent>
    </Card>
  )
}
