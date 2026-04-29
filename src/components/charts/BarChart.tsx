'use client'

import {
  BarChart as ReBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'

interface BarChartProps {
  data: Array<{ label: string; value: number }>
  color?: string
  title?: string
  height?: number
}

export function BarChart({
  data,
  color = '#001FA0',
  title,
  height = 260,
}: BarChartProps) {
  return (
    <div className="ms-chart">
      {title && <div className="ms-chart__title">{title}</div>}
      <div className="ms-chart__inner">
        <ResponsiveContainer width="100%" height={height}>
          <ReBarChart data={data} margin={{ top: 4, right: 8, left: 0, bottom: 0 }}>
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
              cursor={{ fill: '#F4F6F7' }}
              contentStyle={{ fontSize: 12, border: '1px solid #E7E7EA', borderRadius: 2 }}
            />
            <Bar dataKey="value" fill={color} radius={[2, 2, 0, 0]} maxBarSize={48} />
          </ReBarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
