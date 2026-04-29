'use client'

import { useState, useMemo } from 'react'
import {
  DashboardHeader,
  FilterBar,
  KpiScorecards,
  PodSummaryPanel,
  PodHealthWidget,
  WorkflowRiskWidget,
  PriorityWorkQueue,
  WorkloadBalance,
  TopWorkflowTypes,
} from '@/components/dashboard'
import {
  PODS,
  KPI_TILES,
  POD_SUMMARY,
  POD_HEALTH,
  WORKFLOW_RISK_ROWS,
  WORK_ITEMS,
  POD_MEMBERS,
  TOP_WORKFLOW_TYPES,
  FILTER_OPTIONS,
  DEFAULT_FILTERS,
  type PodId,
  type DashboardFilters,
} from '@/data/podDashboardMock'

const PAGE_SIZE = 10

export default function PodManagerDashboard() {
  const [filters, setFilters] = useState<DashboardFilters>(DEFAULT_FILTERS)
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE)
  const [sortByRisk, setSortByRisk] = useState(false)
  const [showUnassignedOnly, setShowUnassignedOnly] = useState(false)

  const filteredItems = useMemo(() => {
    const riskOrder = { high: 0, medium: 1, low: 2 }

    return WORK_ITEMS.filter((item) => {
      if (filters.workflowType   && item.workflowType   !== filters.workflowType)   return false
      if (filters.taskCategory   && item.taskCategory   !== filters.taskCategory)   return false
      if (filters.status         && item.status         !== filters.status)         return false
      if (filters.owner          && item.owner          !== filters.owner)          return false
      if (filters.requestChannel && item.requestChannel !== filters.requestChannel) return false
      if (filters.requesterRole  && item.requesterRole  !== filters.requesterRole)  return false
      if (filters.region         && item.region         !== filters.region)         return false
      if (showUnassignedOnly && item.owner !== null) return false
      return true
    }).sort((a, b) =>
      sortByRisk
        ? riskOrder[a.risk] - riskOrder[b.risk]
        : a.priority - b.priority
    )
  }, [filters, sortByRisk, showUnassignedOnly])

  const visibleItems = filteredItems.slice(0, visibleCount)
  const hasMore = visibleCount < filteredItems.length

  const handleFiltersChange = (next: DashboardFilters) => {
    setFilters(next)
    setVisibleCount(PAGE_SIZE)
  }

  const handlePodChange = (podId: PodId) => {
    setFilters((prev) => ({ ...prev, podId }))
    setVisibleCount(PAGE_SIZE)
  }

  const handleWorkflowRiskClick = (workflowName: string) => {
    // Map WorkflowRiskWidget names to WORK_ITEMS workflowType values
    const nameMap: Record<string, string> = {
      'ACH Returns Processing':       'ACH Returns',
      'Wire Transfer Review':         'Wire Transfer',
      'FX Settlement Exceptions':     'FX Settlement',
      'Account Maintenance Requests': 'Account Maintenance',
      'Daily Reconciliation':         'Reconciliation',
    }
    const mapped = nameMap[workflowName] ?? workflowName
    setFilters((prev) => ({ ...prev, workflowType: mapped }))
    setVisibleCount(PAGE_SIZE)
  }

  const handleMemberClick = (memberId: string) => {
    const member = POD_MEMBERS.find((m) => m.id === memberId)
    if (member) {
      setFilters((prev) => ({ ...prev, owner: member.name }))
      setVisibleCount(PAGE_SIZE)
    }
  }

  const handleTileClick = (tileId: string) => {
    window.open(
      `https://workflow-dash.ms.internal/pod/${filters.podId}/kpi/${tileId}`,
      '_blank',
      'noopener,noreferrer'
    )
  }

  const handleRowClick = (itemId: string) => {
    window.open(
      `https://workflow-dash.ms.internal/tasks/${itemId}`,
      '_blank',
      'noopener,noreferrer'
    )
  }

  return (
    <div className="ms-pod-dashboard">
      <DashboardHeader
        productName="Pod Intelligence"
        pods={PODS}
        selectedPodId={filters.podId}
        onPodChange={handlePodChange}
        lastRefresh="2026-04-26T18:00:00Z"
      />

      <main className="ms-pod-dashboard__main container-fluid px-4">
        <FilterBar
          filters={filters}
          onFiltersChange={handleFiltersChange}
          filterOptions={FILTER_OPTIONS}
        />

        {/* KPI Scorecards */}
        <section className="ms-pod-section" id="pod-kpis" aria-label="KPI Scorecards">
          <div className="ms-pod-section__heading">KPI Scorecards</div>
          <KpiScorecards tiles={KPI_TILES} onTileClick={handleTileClick} />
        </section>

        {/* Pod Summary */}
        <section className="ms-pod-section" id="pod-summary" aria-label="Pod Summary">
          <div className="ms-pod-section__heading">Pod Summary</div>
          <PodSummaryPanel
            observations={POD_SUMMARY.observations}
            actions={POD_SUMMARY.actions}
          />
        </section>

        {/* Pod Health + Workflow Risk + Top Workflow Types */}
        <div className="row g-4 ms-pod-section" id="pod-health-risk">
          <div className="col-lg-4">
            <PodHealthWidget health={POD_HEALTH} />
          </div>
          <div className="col-lg-5">
            <WorkflowRiskWidget
              rows={WORKFLOW_RISK_ROWS}
              onRowClick={handleWorkflowRiskClick}
            />
          </div>
          <div className="col-lg-3">
            <TopWorkflowTypes
              entries={TOP_WORKFLOW_TYPES}
              dateRangeLabel="Last 7 days"
            />
          </div>
        </div>

        {/* Priority Work Queue */}
        <section className="ms-pod-section" id="pod-queue" aria-label="Priority Work Queue">
          <PriorityWorkQueue
            items={visibleItems}
            totalCount={filteredItems.length}
            hasMore={hasMore}
            sortByRisk={sortByRisk}
            showUnassignedOnly={showUnassignedOnly}
            onSortByRiskToggle={() => setSortByRisk((v) => !v)}
            onShowUnassignedToggle={() => {
              setShowUnassignedOnly((v) => !v)
              setVisibleCount(PAGE_SIZE)
            }}
            onLoadMore={() => setVisibleCount((v) => v + PAGE_SIZE)}
            onOpenFullQueue={() =>
              window.open(
                `https://workflow-dash.ms.internal/pod/${filters.podId}/queue`,
                '_blank',
                'noopener,noreferrer'
              )
            }
            onRowClick={handleRowClick}
          />
        </section>

        {/* Workload Balance */}
        <section className="ms-pod-section" id="pod-balance" aria-label="Workload Balance">
          <WorkloadBalance
            members={POD_MEMBERS}
            onMemberClick={handleMemberClick}
          />
        </section>
      </main>
    </div>
  )
}
