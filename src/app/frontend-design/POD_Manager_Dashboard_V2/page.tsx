'use client'

import { useState, useMemo } from 'react'
import {
  DashboardHeader,
  KpiScorecards,
  V2FilterBar,
  TasksByDurationWidget,
  TaskCategoryTrends,
  OpenTasksPerDate,
  TopTaskTypeTable,
  PodWorkloadDistribution,
  TopRequestors,
} from '@/components/dashboard'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import {
  V2_KPI_TILES,
  DURATION_BANDS,
  CATEGORY_TREND_POINTS,
  TASKS_BY_DATE,
  TOP_TASK_TYPES,
  WORKLOAD_MEMBERS,
  TOTAL_ASSIGNED_TASKS,
  TOP_REQUESTORS,
  V2_WORK_ITEMS,
  V2_FILTER_OPTIONS,
  V2_DEFAULT_FILTERS,
  type V2DashboardFilters,
  type V2WorkItem,
} from '@/data/podDashboardMockV2'
import { PODS } from '@/data/podDashboardMock'

const PAGE_SIZE = 10

// ─── Status badge helper ──────────────────────────────────────────────────────
function statusBadge(status: V2WorkItem['status']) {
  const map: Record<V2WorkItem['status'], 'secondary' | 'info' | 'danger' | 'warning' | 'success'> = {
    unassigned:  'secondary',
    'in-progress': 'info',
    blocked:     'warning',
    escalated:   'danger',
    completed:   'success',
  }
  const label: Record<V2WorkItem['status'], string> = {
    unassigned:  'Unassigned',
    'in-progress': 'In progress',
    blocked:     'Blocked',
    escalated:   'Escalated',
    completed:   'Completed',
  }
  return <Badge variant={map[status]} pill>{label[status]}</Badge>
}

// ─── V2 Work Queue ────────────────────────────────────────────────────────────
interface V2WorkQueueProps {
  items: V2WorkItem[]
  totalCount: number
  hasMore: boolean
  sortByRisk: boolean
  showCompleted: boolean
  onSortByRiskToggle: () => void
  onShowCompletedToggle: () => void
  onLoadMore: () => void
  onRowClick: (id: string) => void
}

function V2WorkQueue({
  items, totalCount, hasMore, sortByRisk, showCompleted,
  onSortByRiskToggle, onShowCompletedToggle, onLoadMore, onRowClick,
}: V2WorkQueueProps) {
  return (
    <div className="ms-v2-queue">
      <div className="ms-v2-queue__toolbar">
        <div className="ms-v2-queue__toolbar-left">
          Priority Work Queue
          <span className="ms-v2-queue__count">{totalCount} Items</span>
        </div>
        <div className="ms-v2-queue__toolbar-right">
          <label className="form-check form-switch mb-0 d-flex align-items-center gap-2">
            <input
              className="form-check-input"
              type="checkbox"
              role="switch"
              checked={showCompleted}
              onChange={onShowCompletedToggle}
            />
            <span className="form-check-label" style={{ fontSize: '0.8125rem' }}>Show Completed</span>
          </label>
          <Button
            variant={sortByRisk ? 'primary' : 'outline-secondary'}
            size="sm"
            onClick={onSortByRiskToggle}
          >
            Sort by Risk
          </Button>
          <Button
            variant="outline-primary"
            size="sm"
            onClick={() => window.open('https://workflow-dash.ms.internal/queue', '_blank', 'noopener,noreferrer')}
          >
            Open Full Queue ↗
          </Button>
        </div>
      </div>

      <div className="ms-v2-queue__table-wrap">
        <table className="ms-v2-queue__table">
          <thead>
            <tr>
              <th className="ms-v2-queue__th">Risk</th>
              <th className="ms-v2-queue__th">Event ID</th>
              <th className="ms-v2-queue__th">Task Type</th>
              <th className="ms-v2-queue__th">Status</th>
              <th className="ms-v2-queue__th">Owner</th>
              <th className="ms-v2-queue__th">Age</th>
              <th className="ms-v2-queue__th">Last Updated</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr
                key={item.id}
                className="ms-v2-queue__row"
                onClick={() => onRowClick(item.id)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onRowClick(item.id) } }}
              >
                <td>
                  <span className={`ms-v2-queue__risk-badge ms-v2-queue__risk-badge--${item.risk}`}>
                    {item.risk.charAt(0).toUpperCase() + item.risk.slice(1)}
                  </span>
                </td>
                <td className="ms-v2-queue__event-id">{item.eventId}</td>
                <td className="ms-v2-queue__task-type">{item.taskType}</td>
                <td>{statusBadge(item.status)}</td>
                <td>{item.owner ?? <span className="ms-v2-queue__owner-null">—</span>}</td>
                <td className="ms-v2-queue__age">{item.ageDays === 0 ? '<1d' : `${item.ageDays}d`}</td>
                <td className="ms-v2-queue__date">{item.lastUpdated}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {hasMore && (
        <button type="button" className="ms-v2-queue__load-more" onClick={onLoadMore}>
          Load More ({totalCount - items.length} remaining)
        </button>
      )}
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function PodManagerDashboardV2() {
  const [filters, setFilters] = useState<V2DashboardFilters>(V2_DEFAULT_FILTERS)
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE)
  const [sortByRisk, setSortByRisk] = useState(false)

  const handleFiltersChange = (next: Partial<V2DashboardFilters>) => {
    setFilters((prev) => ({ ...prev, ...next }))
    setVisibleCount(PAGE_SIZE)
  }

  const filteredItems = useMemo(() => {
    const riskOrder: Record<V2WorkItem['risk'], number> = { high: 0, medium: 1, low: 2 }

    return V2_WORK_ITEMS
      .filter((item) => {
        if (!filters.showCompleted && item.status === 'completed') return false
        return true
      })
      .sort((a, b) =>
        sortByRisk
          ? riskOrder[a.risk] - riskOrder[b.risk]
          : 0
      )
  }, [filters.showCompleted, sortByRisk])

  const visibleItems = filteredItems.slice(0, visibleCount)
  const hasMore = visibleCount < filteredItems.length

  return (
    <div className="ms-pod-dashboard">
      <DashboardHeader
        productName="Pod Intelligence"
        pods={PODS}
        selectedPodId="ach-ops"
        onPodChange={() => {}}
        lastRefresh={new Date('2026-04-26T12:00:00').toISOString()}
      />

      <main className="ms-pod-dashboard__main container-fluid px-4">
        {/* Filter bar */}
        <V2FilterBar
          filters={filters}
          onFiltersChange={handleFiltersChange}
          filterOptions={V2_FILTER_OPTIONS}
        />

        {/* KPI row */}
        <section className="ms-pod-section" id="v2-kpis" aria-label="KPI Scorecards" style={{ marginTop: '1.5rem' }}>
          <KpiScorecards
            tiles={V2_KPI_TILES}
            onTileClick={(id) =>
              window.open(`https://workflow-dash.ms.internal/kpi/${id}`, '_blank', 'noopener,noreferrer')
            }
          />
        </section>

        {/* Duration + Trends */}
        <div className="row g-4 ms-pod-section" id="v2-duration-trends">
          <div className="col-lg-6">
            <TasksByDurationWidget
              bands={DURATION_BANDS}
              workflowOptions={['ACH Returns', 'Wire Transfer', 'FX Settlement', 'Beneficiary Changes']}
            />
          </div>
          <div className="col-lg-6">
            <TaskCategoryTrends data={CATEGORY_TREND_POINTS} />
          </div>
        </div>

        {/* Open tasks per date + Top task types */}
        <div className="row g-4 ms-pod-section" id="v2-tasks-date-top">
          <div className="col-lg-7">
            <OpenTasksPerDate data={TASKS_BY_DATE} />
          </div>
          <div className="col-lg-5">
            <TopTaskTypeTable rows={TOP_TASK_TYPES} />
          </div>
        </div>

        {/* Priority work queue */}
        <section className="ms-pod-section" id="v2-queue" aria-label="Priority Work Queue">
          <V2WorkQueue
            items={visibleItems}
            totalCount={filteredItems.length}
            hasMore={hasMore}
            sortByRisk={sortByRisk}
            showCompleted={filters.showCompleted}
            onSortByRiskToggle={() => setSortByRisk((v) => !v)}
            onShowCompletedToggle={() => handleFiltersChange({ showCompleted: !filters.showCompleted })}
            onLoadMore={() => setVisibleCount((v) => v + PAGE_SIZE)}
            onRowClick={(id) =>
              window.open(`https://workflow-dash.ms.internal/tasks/${id}`, '_blank', 'noopener,noreferrer')
            }
          />
        </section>

        {/* Workload distribution + Top requestors */}
        <div className="row g-4 ms-pod-section" id="v2-workload-requestors">
          <div className="col-lg-7">
            <PodWorkloadDistribution
              members={WORKLOAD_MEMBERS}
              totalTasks={TOTAL_ASSIGNED_TASKS}
            />
          </div>
          <div className="col-lg-5">
            <TopRequestors requestors={TOP_REQUESTORS} />
          </div>
        </div>
      </main>
    </div>
  )
}
