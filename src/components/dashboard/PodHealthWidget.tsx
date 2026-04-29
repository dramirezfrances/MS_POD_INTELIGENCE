import type { PodHealthData } from '@/data/podDashboardMock'

interface PodHealthWidgetProps {
  health: PodHealthData
}

const STATE_LABELS: Record<string, string> = {
  'normal':    'Normal',
  'monitor':   'Monitor',
  'elevated':  'Elevated Risk',
  'high-risk': 'High Risk',
}

export function PodHealthWidget({ health }: PodHealthWidgetProps) {
  return (
    <div className={`ms-pod-health ms-pod-health--${health.state}`}>
      <div className="ms-pod-health__state-row">
        <span className="ms-pod-health__state-label">Pod Health</span>
        <span className={`ms-pod-health__badge ms-pod-health__badge--${health.state}`}>
          {STATE_LABELS[health.state]}
        </span>
      </div>

      <div className="ms-pod-health__signals-title">Risk Signals</div>

      {health.signals.length === 0 ? (
        <p className="ms-pod-health__empty">
          No active risk signals for selected filters.
        </p>
      ) : (
        <ul className="ms-pod-health__signal-list">
          {health.signals.map((signal) => (
            <li key={signal.id} className="ms-pod-health__signal">
              {signal.text}
            </li>
          ))}
        </ul>
      )}

      {health.watchNext && (
        <div className="ms-pod-health__watch-next">
          <div className="ms-pod-health__watch-label">Watch Next</div>
          <p className="ms-pod-health__watch-text">{health.watchNext}</p>
        </div>
      )}
    </div>
  )
}
