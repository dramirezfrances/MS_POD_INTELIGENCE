import type { WorkflowRiskRow, RiskLevel } from '@/data/podDashboardMock'

interface WorkflowRiskWidgetProps {
  rows: WorkflowRiskRow[]
  onRowClick: (workflowName: string) => void
}

function riskBadgeClass(level: RiskLevel): string {
  return `ms-pod-risk__badge ms-pod-risk__badge--${level}`
}

const RISK_LABELS: Record<RiskLevel, string> = {
  low:      'Low',
  moderate: 'Moderate',
  rising:   'Rising',
  high:     'High',
}

export function WorkflowRiskWidget({ rows, onRowClick }: WorkflowRiskWidgetProps) {
  return (
    <div className="ms-pod-risk">
      <div className="ms-pod-risk__title">Workflow Risk</div>
      <ul className="ms-pod-risk__list">
        {rows.map((row) => (
          <li
            key={row.id}
            className="ms-pod-risk__row"
            role="button"
            tabIndex={0}
            aria-label={`${row.workflowName} — ${RISK_LABELS[row.riskLevel]} risk. Click to filter queue.`}
            onClick={() => onRowClick(row.workflowName)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                onRowClick(row.workflowName)
              }
            }}
          >
            <div className="ms-pod-risk__row-header">
              <span className="ms-pod-risk__name">{row.workflowName}</span>
              <span className={riskBadgeClass(row.riskLevel)}>
                {RISK_LABELS[row.riskLevel]}
              </span>
            </div>
            <div className="ms-pod-risk__type">{row.taskType}</div>
            <ul className="ms-pod-risk__bullets">
              {row.bullets.filter(Boolean).map((bullet, i) => (
                <li key={i} className="ms-pod-risk__bullet">{bullet}</li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  )
}
