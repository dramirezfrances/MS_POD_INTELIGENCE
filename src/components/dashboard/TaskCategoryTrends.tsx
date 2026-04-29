'use client'

import { useState } from 'react'
import { LineChart } from '@/components/charts'
import type { CategoryTrendPoint } from '@/data/podDashboardMockV2'

const CATEGORY_COLORS: Record<string, string> = {
  'Account Maintenance': '#001FA0',
  'Account Opening':     '#009FDF',
  'Trading':             '#21793B',
  'Money Movement':      '#F8823A',
}

interface TaskCategoryTrendsProps {
  data: CategoryTrendPoint[]
}

export function TaskCategoryTrends({ data }: TaskCategoryTrendsProps) {
  const [showOverdue, setShowOverdue] = useState(false)

  const lines = (Object.keys(CATEGORY_COLORS) as Array<keyof typeof CATEGORY_COLORS>).map((key) => ({
    key,
    color: CATEGORY_COLORS[key],
    label: key,
  }))

  return (
    <div className="ms-task-trend">
      <div className="ms-task-trend__header">
        <span className="ms-task-trend__title">
          Task Category Trends
          <span className="ms-task-trend__info" title="Daily task counts by category">ⓘ</span>
        </span>
        <label className="ms-task-trend__toggle form-check form-switch mb-0">
          <input
            className="form-check-input"
            type="checkbox"
            role="switch"
            id="show-overdue-toggle"
            checked={showOverdue}
            onChange={(e) => setShowOverdue(e.target.checked)}
          />
          <span className="form-check-label ms-task-trend__toggle-label">Show Overdue</span>
        </label>
      </div>
      <LineChart
        data={data as unknown as Record<string, string | number>[]}
        lines={lines}
        height={240}
        xAxisKey="day"
      />
    </div>
  )
}
