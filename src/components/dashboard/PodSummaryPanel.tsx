import type { SummaryObservation, RecommendedAction } from '@/data/podDashboardMock'

interface PodSummaryPanelProps {
  observations: SummaryObservation[]
  actions: RecommendedAction[]
}

export function PodSummaryPanel({ observations, actions }: PodSummaryPanelProps) {
  return (
    <div className="row g-3 ms-pod-summary">
      {/* Current Pod Conditions */}
      <div className="col-md-6">
        <div className="ms-pod-summary__col">
          <div className="ms-pod-summary__title">Current Pod Conditions</div>
          {observations.length === 0 ? (
            <p className="ms-pod-summary__empty">
              No conditions triggered for selected filters.
            </p>
          ) : (
            <ul className="ms-pod-summary__list">
              {observations.map((obs) => (
                <li key={obs.id} className="ms-pod-summary__item">
                  {obs.text}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Recommended Actions */}
      <div className="col-md-6">
        <div className="ms-pod-summary__col">
          <div className="ms-pod-summary__title">Recommended Actions</div>
          {actions.length === 0 ? (
            <p className="ms-pod-summary__empty">
              No rule-based actions triggered for selected filters.
            </p>
          ) : (
            <ul className="ms-pod-summary__list">
              {actions.map((action) => (
                <li
                  key={action.id}
                  className={`ms-pod-summary__item ms-pod-summary__item--${action.priority}`}
                >
                  <span
                    className={`ms-pod-summary__item-priority ms-pod-summary__item-priority--${action.priority}`}
                  >
                    {action.priority} priority
                  </span>
                  {action.text}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}
