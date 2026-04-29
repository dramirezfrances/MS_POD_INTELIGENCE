import { Logo } from '@/components/ui/Logo'
import type { Pod, PodId } from '@/data/podDashboardMock'

interface DashboardHeaderProps {
  productName: string
  pods: Pod[]
  selectedPodId: PodId
  onPodChange: (podId: PodId) => void
  lastRefresh: string
}

function formatRefresh(iso: string): string {
  const d = new Date(iso)
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(d)
}

export function DashboardHeader({
  productName,
  pods,
  selectedPodId,
  onPodChange,
  lastRefresh,
}: DashboardHeaderProps) {
  return (
    <header className="ms-pod-header">
      <div className="ms-pod-header__brand">
        <Logo variant="light" size="sm" />
        <div className="ms-pod-header__divider" />
        <span className="ms-pod-header__product">{productName}</span>
      </div>

      <select
        className="form-select form-select-sm ms-pod-header__pod-select"
        value={selectedPodId}
        onChange={(e) => onPodChange(e.target.value as PodId)}
        aria-label="Select pod"
      >
        {pods.map((pod) => (
          <option key={pod.id} value={pod.id}>
            {pod.label}
          </option>
        ))}
      </select>

      <div className="ms-pod-header__spacer" />

      <div className="ms-pod-header__refresh">
        Last refresh: <strong>{formatRefresh(lastRefresh)}</strong>
        &nbsp;&mdash;&nbsp;T+1 data
      </div>

      <div className="ms-pod-header__actions">
        <button className="ms-pod-header__icon-btn" aria-label="Notifications">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
            <path d="M13.73 21a2 2 0 0 1-3.46 0" />
          </svg>
        </button>
        <div className="ms-pod-header__avatar" role="button" aria-label="User menu" tabIndex={0}>
          PM
        </div>
      </div>
    </header>
  )
}
