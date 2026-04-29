import type { Requestor } from '@/data/podDashboardMockV2'

interface TopRequestorsProps {
  requestors: Requestor[]
  onViewAll?: () => void
}

export function TopRequestors({ requestors, onViewAll }: TopRequestorsProps) {
  return (
    <div className="ms-top-requestors">
      <div className="ms-top-requestors__header">
        <span className="ms-top-requestors__title">Top Requestors</span>
        {onViewAll && (
          <button type="button" className="ms-top-requestors__view-all" onClick={onViewAll}>
            View all →
          </button>
        )}
      </div>

      <table className="ms-top-requestors__table">
        <thead>
          <tr>
            <th className="ms-top-requestors__th">Position</th>
            <th className="ms-top-requestors__th">Requestor</th>
            <th className="ms-top-requestors__th ms-top-requestors__th--num"># of Tasks</th>
          </tr>
        </thead>
        <tbody>
          {requestors.map((r) => (
            <tr key={r.rank} className="ms-top-requestors__row">
              <td className="ms-top-requestors__rank">#{r.rank}</td>
              <td className="ms-top-requestors__name">{r.name}</td>
              <td className="ms-top-requestors__count">{r.taskCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
