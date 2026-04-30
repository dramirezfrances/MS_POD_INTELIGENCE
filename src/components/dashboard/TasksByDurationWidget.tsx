'use client'

import { useState } from 'react'
import { DonutChart } from '@/components/charts'
import type { DurationBand } from '@/data/podDashboardMockV2'

interface TasksByDurationWidgetProps {
  bands: DurationBand[]
  workflowOptions?: string[]
}

export function TasksByDurationWidget({ bands, workflowOptions = [] }: TasksByDurationWidgetProps) {
  const [workflow, setWorkflow] = useState('all')

  const donutData = bands.map((b) => ({ label: b.label, value: b.count, color: b.color }))

  return (
    <div className="ms-duration-widget">
      <div className="ms-duration-widget__header">
        <span className="ms-duration-widget__title">
          Tasks by Duration Flag
          <span className="ms-duration-widget__info" title="Task age from creation date">ⓘ</span>
        </span>
        <select
          className="ms-duration-widget__dropdown"
          value={workflow}
          onChange={(e) => setWorkflow(e.target.value)}
          aria-label="Filter by workflow"
        >
          <option value="all">All Workflows</option>
          {workflowOptions.map((w) => (
            <option key={w} value={w}>{w}</option>
          ))}
        </select>
      </div>

      <div className="ms-duration-widget__body">
        {/* Left: mini KPI tiles — act as chart legend */}
        <div className="ms-duration-widget__breakdown">
          {bands.map((band) => (
            <div
              key={band.label}
              className="ms-duration-widget__tile"
              style={{ borderTopColor: band.color }}
            >
              <span className="ms-duration-widget__tile-label">{band.label}</span>
              <span className="ms-duration-widget__tile-count">{band.count}</span>
            </div>
          ))}
        </div>

        {/* Right: donut chart (legend suppressed — left tiles serve as legend) */}
        <div className="ms-duration-widget__chart-col">
          <DonutChart
            data={donutData}
            height={260}
            innerRadius={70}
            outerRadius={110}
            hideLegend
          />
        </div>
      </div>
    </div>
  )
}
