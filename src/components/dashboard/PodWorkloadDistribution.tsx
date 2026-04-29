import { DonutChart } from '@/components/charts'
import type { WorkloadMember } from '@/data/podDashboardMockV2'

interface PodWorkloadDistributionProps {
  members: WorkloadMember[]
  totalTasks: number
  onViewAll?: () => void
}

export function PodWorkloadDistribution({ members, totalTasks, onViewAll }: PodWorkloadDistributionProps) {
  const donutData = members.map((m) => ({
    label: m.name,
    value: m.assignedTasks,
    color: m.color,
  }))

  return (
    <div className="ms-workload-dist">
      <div className="ms-workload-dist__header">
        <span className="ms-workload-dist__title">Pod Workload Distribution</span>
        {onViewAll && (
          <button type="button" className="ms-workload-dist__view-all" onClick={onViewAll}>
            View all →
          </button>
        )}
      </div>

      <div className="ms-workload-dist__body">
        {/* Donut chart */}
        <div className="ms-workload-dist__chart-col">
          <div className="ms-workload-dist__donut-wrap">
            <DonutChart
              data={donutData}
              height={220}
              innerRadius={65}
              outerRadius={95}
              hideLegend
            />
            <div className="ms-workload-dist__center-label" aria-hidden="true">
              <span className="ms-workload-dist__center-value">{totalTasks}</span>
              <span className="ms-workload-dist__center-sub">Total</span>
            </div>
          </div>
        </div>

        {/* Member table */}
        <div className="ms-workload-dist__table-col">
          <table className="ms-workload-dist__table">
            <thead>
              <tr>
                <th className="ms-workload-dist__th">Pod Member</th>
                <th className="ms-workload-dist__th ms-workload-dist__th--num">Assigned</th>
                <th className="ms-workload-dist__th ms-workload-dist__th--num">Share</th>
                <th className="ms-workload-dist__th ms-workload-dist__th--num">Overdue</th>
              </tr>
            </thead>
            <tbody>
              {members.map((m) => (
                <tr key={m.name} className="ms-workload-dist__member">
                  <td className="ms-workload-dist__member-name">
                    <span className="ms-workload-dist__swatch" style={{ background: m.color }} />
                    {m.name}
                  </td>
                  <td className="ms-workload-dist__num">{m.assignedTasks}</td>
                  <td className="ms-workload-dist__share">{m.sharePercent}%</td>
                  <td className="ms-workload-dist__overdue-count">{m.overdueCount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
