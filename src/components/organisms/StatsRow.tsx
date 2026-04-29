import React from 'react'
import { StatCard } from '@/components/molecules/StatCard'

const DEFAULT_STATS = [
  {
    label: 'Assets Under Management',
    value: '$4.2T',
    delta: '8.3% YoY',
    deltaDirection: 'up' as const,
    subtext: 'As of Q4 2024',
  },
  {
    label: 'Net Revenue',
    value: '$61.8B',
    delta: '12.1% YoY',
    deltaDirection: 'up' as const,
    subtext: 'Full year 2024',
  },
  {
    label: 'Client Accounts',
    value: '18.1M',
    delta: '2.4% YoY',
    deltaDirection: 'up' as const,
    subtext: 'Active accounts',
  },
  {
    label: 'Avg. Portfolio Return',
    value: '9.7%',
    delta: '1.2% vs benchmark',
    deltaDirection: 'down' as const,
    subtext: 'Blended 3-yr avg',
  },
]

interface StatsRowProps {
  stats?: typeof DEFAULT_STATS
}

export function StatsRow({ stats = DEFAULT_STATS }: StatsRowProps) {
  return (
    <div className="row g-3">
      {stats.map((stat) => (
        <div key={stat.label} className="col-sm-6 col-xl-3">
          <StatCard {...stat} />
        </div>
      ))}
    </div>
  )
}
