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
  const max = Math.max(...bands.map((b) => b.count), 1)

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
        {/* Left: breakdown list */}
        <div className="ms-duration-widget__breakdown">
          {bands.map((band) => (
            <div key={band.label} className="ms-duration-widget__band">
              <div className="ms-duration-widget__band-header">
                <span className="ms-duration-widget__band-label" style={{ color: band.color }}>
                  {band.label}
                </span>
                <span className="ms-duration-widget__band-count">{band.count}</span>
              </div>
              <div className="ms-duration-widget__bar-wrap">
                <div
                  className="ms-duration-widget__bar-fill"
                  style={{ width: `${Math.round((band.count / max) * 100)}%`, background: band.color }}
                  role="presentation"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Right: donut chart */}
        <div className="ms-duration-widget__chart-col">
          <DonutChart
            data={donutData}
            height={200}
            innerRadius={55}
            outerRadius={85}
          />
        </div>
      </div>
    </div>
  )
}
