'use client'

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts'

interface LollipopBarProps {
  x?: number
  y?: number
  width?: number
  height?: number
  fill?: string
}

function LollipopBar({ x = 0, y = 0, width = 0, height = 0, fill = '#001FA0' }: LollipopBarProps) {
  const cx = x + width / 2
  return (
    <g>
      <line
        x1={cx}
        y1={y}
        x2={cx}
        y2={y + height}
        stroke={fill}
        strokeWidth={2}
      />
      <circle cx={cx} cy={y} r={5} fill={fill} />
    </g>
  )
}

interface LollipopChartProps {
  data: Array<{ label: string; value: number }>
  color?: string
  title?: string
  height?: number
}

export function LollipopChart({
  data,
  color = '#001FA0',
  title,
  height = 260,
}: LollipopChartProps) {
  return (
    <div className="ms-chart">
      {title && <div className="ms-chart__title">{title}</div>}
      <div className="ms-chart__inner">
        <ResponsiveContainer width="100%" height={height}>
          <BarChart data={data} margin={{ top: 10, right: 8, left: 0, bottom: 0 }}>
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
            <Bar
              dataKey="value"
              shape={<LollipopBar fill={color} />}
              maxBarSize={48}
            >
              {data.map((_, i) => (
                <Cell key={i} fill={color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
