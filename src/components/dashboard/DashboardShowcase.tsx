'use client'

import { PodHealthWidget } from './PodHealthWidget'
import { WorkflowRiskWidget } from './WorkflowRiskWidget'
import { WorkloadBalance } from './WorkloadBalance'
import { PriorityWorkQueue } from './PriorityWorkQueue'
import { PodSummaryPanel } from './PodSummaryPanel'
import { TopWorkflowTypes } from './TopWorkflowTypes'
import {
  POD_HEALTH,
  WORKFLOW_RISK_ROWS,
  POD_MEMBERS,
  POD_SUMMARY,
  WORK_ITEMS,
  TOP_WORKFLOW_TYPES,
} from '@/data/podDashboardMock'

const PREVIEW_ITEMS = WORK_ITEMS.slice(0, 5)

export function DashboardShowcase() {
  return (
    <>
      {/* Top Workflow Types */}
      <div id="dashboard-top-workflows" className="ds-subsection">
        <h3>Top Workflow Types</h3>
        <p className="text-muted" style={{ fontSize: '0.875rem', maxWidth: 480 }}>
          Ranks the top 3 workflow types by new request volume with a week-over-week delta.
        </p>
        <div style={{ maxWidth: '320px' }}>
          <TopWorkflowTypes entries={TOP_WORKFLOW_TYPES} dateRangeLabel="Last 7 days" />
        </div>
      </div>

      {/* Pod Summary */}
      <div id="dashboard-summary" className="ds-subsection">
        <h3>Pod Summary Panel</h3>
        <PodSummaryPanel
          observations={POD_SUMMARY.observations}
          actions={POD_SUMMARY.actions}
        />
      </div>

      {/* Pod Health */}
      <div id="dashboard-health" className="ds-subsection">
        <h3>Pod Health Widget</h3>
        <div style={{ maxWidth: '480px' }}>
          <PodHealthWidget health={POD_HEALTH} />
        </div>
      </div>

      {/* Workflow Risk */}
      <div id="dashboard-risk" className="ds-subsection">
        <h3>Workflow Risk Widget</h3>
        <div style={{ maxWidth: '640px' }}>
          <WorkflowRiskWidget rows={WORKFLOW_RISK_ROWS} onRowClick={() => {}} />
        </div>
      </div>

      {/* Priority Work Queue */}
      <div id="dashboard-queue" className="ds-subsection">
        <h3>Priority Work Queue</h3>
        <PriorityWorkQueue
          items={PREVIEW_ITEMS}
          totalCount={PREVIEW_ITEMS.length}
          hasMore={false}
          sortByRisk={false}
          showUnassignedOnly={false}
          onSortByRiskToggle={() => {}}
          onShowUnassignedToggle={() => {}}
          onLoadMore={() => {}}
          onOpenFullQueue={() => {}}
          onRowClick={() => {}}
        />
      </div>

      {/* Workload Balance */}
      <div id="dashboard-balance" className="ds-subsection">
        <h3>Workload Balance</h3>
        <WorkloadBalance members={POD_MEMBERS} onMemberClick={() => {}} />
      </div>
    </>
  )
}
