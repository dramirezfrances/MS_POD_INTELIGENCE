import type { WorkItem, WorkItemStatus, WorkItemRisk } from '@/data/podDashboardMock'

interface PriorityWorkQueueProps {
  items: WorkItem[]
  totalCount: number
  hasMore: boolean
  sortByRisk: boolean
  showUnassignedOnly: boolean
  onSortByRiskToggle: () => void
  onShowUnassignedToggle: () => void
  onLoadMore: () => void
  onOpenFullQueue: () => void
  onRowClick: (itemId: string) => void
}

const STATUS_VARIANTS: Record<WorkItemStatus, string> = {
  'pending':     'secondary',
  'in-progress': 'info',
  'escalated':   'danger',
  'blocked':     'warning',
}

const STATUS_LABELS: Record<WorkItemStatus, string> = {
  'pending':     'Pending',
  'in-progress': 'In Progress',
  'escalated':   'Escalated',
  'blocked':     'Blocked',
}

const RISK_LABELS: Record<WorkItemRisk, string> = {
  low:    'Low',
  medium: 'Medium',
  high:   'High',
}

function formatDate(iso: string): string {
  return new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric' }).format(new Date(iso))
}

export function PriorityWorkQueue({
  items,
  totalCount,
  hasMore,
  sortByRisk,
  showUnassignedOnly,
  onSortByRiskToggle,
  onShowUnassignedToggle,
  onLoadMore,
  onOpenFullQueue,
  onRowClick,
}: PriorityWorkQueueProps) {
  return (
    <div className="ms-pod-queue">
      <div className="ms-pod-queue__toolbar">
        <div className="ms-pod-queue__toolbar-left">
          <span className="ms-pod-queue__toolbar-title">Priority Work Queue</span>
          <span className="ms-pod-queue__count">
            Showing {items.length} of {totalCount} items
          </span>
        </div>
        <div className="ms-pod-queue__toolbar-right">
          {/* Show Unassigned toggle */}
          <div className="form-check form-switch mb-0 d-flex align-items-center gap-2">
            <input
              className="form-check-input"
              type="checkbox"
              role="switch"
              id="show-unassigned"
              checked={showUnassignedOnly}
              onChange={onShowUnassignedToggle}
            />
            <label className="form-check-label" htmlFor="show-unassigned" style={{ fontSize: '0.8125rem', whiteSpace: 'nowrap' }}>
              Show Unassigned
            </label>
          </div>

          {/* Sort by Risk button */}
          <button
            type="button"
            className={`btn btn-sm ${sortByRisk ? 'btn-primary' : 'btn-outline-secondary'}`}
            onClick={onSortByRiskToggle}
          >
            Sort by Risk
          </button>

          {/* Open Full Queue */}
          <button
            type="button"
            className="btn btn-sm btn-outline-primary"
            onClick={onOpenFullQueue}
          >
            Open Full Queue ↗
          </button>
        </div>
      </div>

      {items.length === 0 ? (
        <div className="ms-pod-queue__empty">
          No tasks match the current filters.
        </div>
      ) : (
        <div className="ms-pod-queue__table-wrap">
          <table className="table table-hover table-sm ms-pod-queue__table">
            <thead>
              <tr>
                <th className="ms-pod-queue__th">#</th>
                <th className="ms-pod-queue__th">Workflow Type</th>
                <th className="ms-pod-queue__th">Category</th>
                <th className="ms-pod-queue__th">Status</th>
                <th className="ms-pod-queue__th">Owner</th>
                <th className="ms-pod-queue__th">Age</th>
                <th className="ms-pod-queue__th">Last Updated</th>
                <th className="ms-pod-queue__th">Risk</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr
                  key={item.id}
                  onClick={() => onRowClick(item.id)}
                  aria-label={`Task ${item.id} — ${item.workflowType}. Click to open in Workflow Dash.`}
                >
                  <td>
                    <span className="ms-pod-queue__priority">{item.priority}</span>
                  </td>
                  <td className="fw-semibold">{item.workflowType}</td>
                  <td>{item.taskCategory}</td>
                  <td>
                    <span className={`badge text-bg-${STATUS_VARIANTS[item.status]}`}>
                      {STATUS_LABELS[item.status]}
                    </span>
                  </td>
                  <td>
                    {item.owner ?? (
                      <span className="ms-pod-queue__unassigned">Unassigned</span>
                    )}
                  </td>
                  <td>
                    {item.ageDays === 0 ? 'Today' : `${item.ageDays}d`}
                  </td>
                  <td>{formatDate(item.lastUpdated)}</td>
                  <td>
                    <span className={`ms-pod-queue__risk-dot ms-pod-queue__risk-dot--${item.risk}`} />
                    {RISK_LABELS[item.risk]}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {hasMore && (
        <div className="ms-pod-queue__load-more">
          <button
            type="button"
            className="btn btn-outline-secondary w-100"
            onClick={onLoadMore}
          >
            Load More
          </button>
        </div>
      )}
    </div>
  )
}
