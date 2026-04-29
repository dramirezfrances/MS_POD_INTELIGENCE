import React from 'react'

type DeltaDirection = 'up' | 'down' | 'flat'

interface StatCardProps {
  label: string
  value: string
  delta?: string
  deltaDirection?: DeltaDirection
  subtext?: string
}

const DELTA_ARROWS: Record<DeltaDirection, string> = {
  up: '↑',
  down: '↓',
  flat: '→',
}

export function StatCard({
  label,
  value,
  delta,
  deltaDirection = 'flat',
  subtext,
}: StatCardProps) {
  return (
    <div className="ms-stat-card">
      <div className="ms-stat-card__label">{label}</div>
      <div className="ms-stat-card__value">{value}</div>
      {delta && (
        <div className={`ms-stat-card__delta ms-stat-card__delta--${deltaDirection}`}>
          {DELTA_ARROWS[deltaDirection]} {delta}
        </div>
      )}
      {subtext && <div className="ms-stat-card__sub">{subtext}</div>}
    </div>
  )
}
