'use client'

import {
  ComposedChart,
  Area,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'

interface BurnUpDataPoint {
  label: string
  completed: number
  scope: number
}

interface BurnUpChartProps {
  data: BurnUpDataPoint[]
  title?: string
  height?: number
}

export function BurnUpChart({ data, title, height = 260 }: BurnUpChartProps) {
  return (
    <div className="ms-chart">
      {title && <div className="ms-chart__title">{title}</div>}
      <div className="ms-chart__inner">
        <ResponsiveContainer width="100%" height={height}>
          <ComposedChart data={data} margin={{ top: 4, right: 8, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E7E7EA" vertical={false} />
            <XAxis
              dataKey="label"
              tick={{ fontSize: 11, fill: '#757D8E' }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fontSize: 11, fill: '#757D8E' }}
              axisLine={false}
              tickLine={false}
              width={36}
            />
            <Tooltip
              contentStyle={{ fontSize: 12, border: '1px solid #E7E7EA', borderRadius: 2 }}
            />
            <Legend wrapperStyle={{ fontSize: 12 }} />
            <Area
              type="monotone"
              dataKey="completed"
              name="Completed"
              stroke="#001FA0"
              fill="#001FA0"
              fillOpacity={0.15}
              strokeWidth={2}
              dot={{ r: 3 }}
              activeDot={{ r: 5 }}
            />
            <Line
              type="monotone"
              dataKey="scope"
              name="Total Scope"
              stroke="#F8823A"
              strokeWidth={2}
              strokeDasharray="5 5"
              dot={{ r: 3 }}
              activeDot={{ r: 5 }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
