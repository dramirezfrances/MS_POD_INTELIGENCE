'use client'

import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts'

const MS_CHART_COLORS = [
  '#001FA0',
  '#009FDF',
  '#21793B',
  '#F8823A',
  '#C52034',
  '#6330C9',
  '#235BE1',
]

interface DonutSlice {
  label: string
  value: number
  color?: string
}

interface DonutChartProps {
  data: DonutSlice[]
  title?: string
  height?: number
  innerRadius?: number
  outerRadius?: number
  hideLegend?: boolean
}

export function DonutChart({
  data,
  title,
  height = 280,
  innerRadius = 60,
  outerRadius = 100,
  hideLegend = false,
}: DonutChartProps) {
  return (
    <div className="ms-chart">
      {title && <div className="ms-chart__title">{title}</div>}
      <div className="ms-chart__inner">
        <ResponsiveContainer width="100%" height={height}>
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="label"
              cx="50%"
              cy={hideLegend ? '50%' : '45%'}
              innerRadius={innerRadius}
              outerRadius={outerRadius}
              paddingAngle={2}
            >
              {data.map((entry, i) => (
                <Cell
                  key={entry.label}
                  fill={entry.color ?? MS_CHART_COLORS[i % MS_CHART_COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip
              formatter={(value) => `${value}`}
              contentStyle={{ fontSize: 12, border: '1px solid #E7E7EA', borderRadius: 2 }}
            />
            {!hideLegend && (
              <Legend
                iconType="circle"
                iconSize={8}
                wrapperStyle={{ fontSize: 12, paddingTop: 8 }}
              />
            )}
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
