import type { TopTaskTypeRow } from '@/data/podDashboardMockV2'

interface TopTaskTypeTableProps {
  rows: TopTaskTypeRow[]
  onViewAll?: () => void
}

function TrendCell({ pct, dir }: { pct: number; dir: 'up' | 'down' | 'flat' }) {
  const cls = dir === 'up' ? 'ms-top-task-table__trend--up' : dir === 'down' ? 'ms-top-task-table__trend--down' : ''
  const arrow = dir === 'up' ? '▲' : dir === 'down' ? '▼' : '—'
  return (
    <span className={`ms-top-task-table__trend ${cls}`}>
      {arrow} +{pct}% vs prior week
    </span>
  )
}

export function TopTaskTypeTable({ rows, onViewAll }: TopTaskTypeTableProps) {
  return (
    <div className="ms-top-task-table">
      <div className="ms-top-task-table__header">
        <span className="ms-top-task-table__title">
          Top Task Type by Volume
          <span className="ms-top-task-table__info" title="Ranked by total open tasks">ⓘ</span>
        </span>
        {onViewAll && (
          <button type="button" className="ms-top-task-table__view-all" onClick={onViewAll}>
            View all →
          </button>
        )}
      </div>

      <table className="ms-top-task-table__table">
        <thead>
          <tr>
            <th className="ms-top-task-table__th">#</th>
            <th className="ms-top-task-table__th">Task Type</th>
            <th className="ms-top-task-table__th ms-top-task-table__th--num"># of Tasks</th>
            <th className="ms-top-task-table__th">Trend</th>
            <th className="ms-top-task-table__th ms-top-task-table__th--num"># Overdue</th>
            <th className="ms-top-task-table__th">Overdue Trend</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.rank} className="ms-top-task-table__row">
              <td className="ms-top-task-table__rank">{row.rank}</td>
              <td className="ms-top-task-table__name">{row.taskType}</td>
              <td className="ms-top-task-table__count">{row.taskCount}</td>
              <td><TrendCell pct={row.trendPercent} dir={row.trendDirection} /></td>
              <td className="ms-top-task-table__overdue">
                {row.overdueCount === 0 ? '—' : row.overdueCount}
              </td>
              <td><TrendCell pct={row.overdueTrendPercent} dir={row.overdueTrendDirection} /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
