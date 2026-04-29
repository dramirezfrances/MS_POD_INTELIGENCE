import type { TopWorkflowEntry } from '@/data/podDashboardMock'

interface TopWorkflowTypesProps {
  entries: TopWorkflowEntry[]
  dateRangeLabel?: string
}

export function TopWorkflowTypes({
  entries,
  dateRangeLabel = 'Last 7 days',
}: TopWorkflowTypesProps) {
  const max = Math.max(...entries.map((e) => e.newRequests), 1)

  return (
    <div className="ms-pod-top-workflows">
      <div className="ms-pod-top-workflows__header">
        <span className="ms-pod-top-workflows__title">Top Workflow Types</span>
        <span className="ms-pod-top-workflows__range">{dateRangeLabel}</span>
      </div>
      <div className="ms-pod-top-workflows__subtitle">By new requests</div>

      <ol className="ms-pod-top-workflows__list">
        {entries.map((entry) => {
          const barPct = Math.round((entry.newRequests / max) * 100)
          const isUp = entry.changeDirection === 'up'
          const isDown = entry.changeDirection === 'down'
          const sign = isUp ? '+' : isDown ? '' : ''
          const deltaClass = isUp
            ? 'ms-pod-top-workflows__delta--up'
            : isDown
            ? 'ms-pod-top-workflows__delta--down'
            : 'ms-pod-top-workflows__delta--flat'

          return (
            <li key={entry.rank} className="ms-pod-top-workflows__row">
              <span className="ms-pod-top-workflows__rank">#{entry.rank}</span>

              <div className="ms-pod-top-workflows__body">
                <div className="ms-pod-top-workflows__name-row">
                  <span className="ms-pod-top-workflows__name">{entry.workflowType}</span>
                  <span className="ms-pod-top-workflows__count">{entry.newRequests}</span>
                </div>

                <div className="ms-pod-top-workflows__bar-row">
                  <div className="ms-pod-top-workflows__bar-track">
                    <div
                      className="ms-pod-top-workflows__bar-fill"
                      style={{ width: `${barPct}%` }}
                      role="presentation"
                    />
                  </div>
                  <span className={`ms-pod-top-workflows__delta ${deltaClass}`}>
                    {isUp && '↑ '}
                    {isDown && '↓ '}
                    {sign}{entry.changePercent}% vs prior week
                  </span>
                </div>
              </div>
            </li>
          )
        })}
      </ol>
    </div>
  )
}
