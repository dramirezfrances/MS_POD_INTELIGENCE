'use client'

import {
  LineChart as ReLineChart,
  Line,
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

interface LineConfig {
  key: string
  color?: string
  label?: string
}

interface LineChartProps {
  data: Array<Record<string, string | number>>
  lines: LineConfig[]
  title?: string
  height?: number
  xAxisKey?: string
}

export function LineChart({ data, lines, title, height = 260, xAxisKey = 'label' }: LineChartProps) {
  return (
    <div className="ms-chart">
      {title && <div className="ms-chart__title">{title}</div>}
      <div className="ms-chart__inner">
        <ResponsiveContainer width="100%" height={height}>
          <ReLineChart data={data} margin={{ top: 4, right: 8, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E7E7EA" vertical={false} />
            <XAxis
              dataKey={xAxisKey}
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
            {lines.map((l, i) => (
              <Line
                key={l.key}
                type="monotone"
                dataKey={l.key}
                name={l.label ?? l.key}
                stroke={l.color ?? MS_CHART_COLORS[i % MS_CHART_COLORS.length]}
                strokeWidth={2}
                dot={{ r: 3 }}
                activeDot={{ r: 5 }}
              />
            ))}
          </ReLineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
