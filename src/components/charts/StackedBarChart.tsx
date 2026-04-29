'use client'

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'

const MS_CHART_COLORS = [
  '#001FA0',
  '#009FDF',
  '#21793B',
  '#F8823A',
  '#C52034',
  '#6330C9',
  '#235BE1',
]

interface StackedBarChartProps {
  data: Array<Record<string, string | number>>
  keys: string[]
  colors?: string[]
  title?: string
  height?: number
}

export function StackedBarChart({
  data,
  keys,
  colors = MS_CHART_COLORS,
  title,
  height = 260,
}: StackedBarChartProps) {
  return (
    <div className="ms-chart">
      {title && <div className="ms-chart__title">{title}</div>}
      <div className="ms-chart__inner">
        <ResponsiveContainer width="100%" height={height}>
          <BarChart data={data} margin={{ top: 4, right: 8, left: 0, bottom: 0 }}>
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
            <Legend wrapperStyle={{ fontSize: 12 }} />
            {keys.map((key, i) => (
              <Bar
                key={key}
                dataKey={key}
                stackId="a"
                fill={colors[i % colors.length]}
                radius={i === keys.length - 1 ? [2, 2, 0, 0] : [0, 0, 0, 0]}
                maxBarSize={48}
              />
            ))}
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
