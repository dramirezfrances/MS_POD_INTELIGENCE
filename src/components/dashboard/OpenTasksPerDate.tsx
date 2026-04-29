'use client'

import { useState } from 'react'
import { BarChart } from '@/components/charts'
import type { TasksByDatePoint } from '@/data/podDashboardMockV2'

interface OpenTasksPerDateProps {
  data: TasksByDatePoint[]
}

export function OpenTasksPerDate({ data }: OpenTasksPerDateProps) {
  const [byStatus, setByStatus] = useState(false)

  const chartData = data.map((d) => ({ label: d.day, value: d.count }))

  return (
    <div className="ms-tasks-date">
      <div className="ms-tasks-date__header">
        <span className="ms-tasks-date__title">
          Open Tasks Per Date
          <span className="ms-tasks-date__info" title="Count of open tasks per day">ⓘ</span>
        </span>
        <label className="ms-tasks-date__toggle form-check form-switch mb-0">
          <input
            className="form-check-input"
            type="checkbox"
            role="switch"
            id="by-status-toggle"
            checked={byStatus}
            onChange={(e) => setByStatus(e.target.checked)}
          />
          <span className="form-check-label ms-tasks-date__toggle-label">Task by status</span>
        </label>
      </div>
      <BarChart data={chartData} color="#001FA0" height={240} />
    </div>
  )
}
