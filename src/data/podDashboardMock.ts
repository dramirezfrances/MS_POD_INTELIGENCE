// ─── Types ────────────────────────────────────────────────────────────────────

export type PodId = 'ach-ops' | 'wire-ops' | 'fx-settlements' | 'corp-actions'

export interface Pod {
  id: PodId
  label: string
}

export type DeltaDirection = 'up' | 'down' | 'flat' | 'neutral'

export interface KpiTile {
  id: string
  label: string
  value: string | number
  delta: string
  deltaDirection: DeltaDirection
  contextLabel: string
}

export interface SummaryObservation {
  id: string
  text: string
}

export interface RecommendedAction {
  id: string
  text: string
  priority: 'high' | 'medium' | 'low'
}

export type HealthState = 'normal' | 'monitor' | 'elevated' | 'high-risk'

export interface RiskSignal {
  id: string
  text: string
}

export interface PodHealthData {
  state: HealthState
  signals: RiskSignal[]
  watchNext: string
}

export type RiskLevel = 'low' | 'moderate' | 'rising' | 'high'

export interface WorkflowRiskRow {
  id: string
  workflowName: string
  taskType: string
  riskLevel: RiskLevel
  bullets: [string, string?]
}

export type WorkItemStatus = 'pending' | 'in-progress' | 'escalated' | 'blocked'
export type WorkItemRisk = 'low' | 'medium' | 'high'

export interface WorkItem {
  id: string
  priority: number
  workflowType: string
  taskCategory: string
  status: WorkItemStatus
  owner: string | null
  ageDays: number
  lastUpdated: string
  risk: WorkItemRisk
  requestChannel: string
  requesterRole: string
  region: string
}

export type LoadState = 'available' | 'balanced' | 'overloaded'

export interface PodMember {
  id: string
  name: string
  role: string
  activeTaskCount: number
  loadState: LoadState
}

export type DateRange = 'today' | 'last7' | 'last30' | 'custom'

export interface DashboardFilters {
  podId: PodId
  dateRange: DateRange
  workflowType: string
  taskCategory: string
  status: string
  owner: string
  requestChannel: string
  requesterRole: string
  region: string
}

// ─── Pods ─────────────────────────────────────────────────────────────────────

export const PODS: Pod[] = [
  { id: 'ach-ops',        label: 'ACH Operations' },
  { id: 'wire-ops',       label: 'Wire Transfers' },
  { id: 'fx-settlements', label: 'FX Settlements' },
  { id: 'corp-actions',   label: 'Corporate Actions' },
]

// ─── KPI Tiles ────────────────────────────────────────────────────────────────

export const KPI_TILES: KpiTile[] = [
  {
    id: 'workload-volume',
    label: 'Workload Volume',
    value: 148,
    delta: '+23 vs prior 7d',
    deltaDirection: 'up',
    contextLabel: 'Above expected pod volume',
  },
  {
    id: 'completion',
    label: 'Completion Rate',
    value: '61%',
    delta: '-8% vs prior 7d',
    deltaDirection: 'down',
    contextLabel: 'Below target threshold',
  },
  {
    id: 'active-load',
    label: 'Active Load',
    value: 42,
    delta: '+11 since yesterday',
    deltaDirection: 'up',
    contextLabel: 'Load building faster than closure',
  },
  {
    id: 'unassigned',
    label: 'Unassigned Work',
    value: 17,
    delta: '+6 new today',
    deltaDirection: 'up',
    contextLabel: 'Requires immediate triage',
  },
  {
    id: 'aging-work',
    label: 'Aging Work (>3d)',
    value: 9,
    delta: '+3 vs prior 7d',
    deltaDirection: 'up',
    contextLabel: 'Escalation risk increasing',
  },
]

// ─── Pod Summary ──────────────────────────────────────────────────────────────

export const POD_SUMMARY = {
  observations: [
    { id: 'obs-1', text: 'ACH backlog increased from 4 to 11 tasks since Monday' },
    { id: 'obs-2', text: '3 wire tasks are blocked pending client documentation' },
    { id: 'obs-3', text: 'FX settlement exceptions up 40% over prior 7 days' },
    { id: 'obs-4', text: 'R. Chen has had fewer than 2 active tasks for 2+ business days' },
  ] as SummaryObservation[],
  actions: [
    { id: 'act-1', text: 'Assign 6 unowned ACH tasks in the Priority Queue', priority: 'high' as const },
    { id: 'act-2', text: 'Escalate 3 blocked wire items to client services', priority: 'high' as const },
    { id: 'act-3', text: 'Review FX exception trend with team lead', priority: 'medium' as const },
    { id: 'act-4', text: 'Rebalance load from M. Torres (overloaded) to R. Chen', priority: 'medium' as const },
  ] as RecommendedAction[],
}

// ─── Pod Health ───────────────────────────────────────────────────────────────

export const POD_HEALTH: PodHealthData = {
  state: 'elevated',
  signals: [
    { id: 'sig-1', text: 'Unassigned task count exceeds 15 for 2+ consecutive days' },
    { id: 'sig-2', text: 'Completion rate below 65% threshold (currently 61%)' },
    { id: 'sig-3', text: '9 tasks aged >3 business days without status update' },
  ],
  watchNext:
    'FX settlement exceptions trending up — may breach "High Risk" threshold within 2 days if unresolved',
}

// ─── Workflow Risk ────────────────────────────────────────────────────────────

export const WORKFLOW_RISK_ROWS: WorkflowRiskRow[] = [
  {
    id: 'wfr-1',
    workflowName: 'ACH Returns Processing',
    taskType: 'Exception Handling',
    riskLevel: 'high',
    bullets: [
      '11 open return items, 4 approaching due-date threshold',
      'No owner assigned to 6 of 11 items',
    ],
  },
  {
    id: 'wfr-2',
    workflowName: 'Wire Transfer Review',
    taskType: 'Compliance Check',
    riskLevel: 'rising',
    bullets: [
      '3 items blocked >48h awaiting client documentation',
      'Pattern consistent with prior quarter spike',
    ],
  },
  {
    id: 'wfr-3',
    workflowName: 'FX Settlement Exceptions',
    taskType: 'Trade Settlement',
    riskLevel: 'rising',
    bullets: ['Exception rate 40% above 7-day average'],
  },
  {
    id: 'wfr-4',
    workflowName: 'Account Maintenance Requests',
    taskType: 'Client Service',
    riskLevel: 'moderate',
    bullets: [
      '14 tasks open, average age 1.8 days — within normal range',
      'Velocity normal for day-of-week',
    ],
  },
  {
    id: 'wfr-5',
    workflowName: 'Daily Reconciliation',
    taskType: 'Reconciliation',
    riskLevel: 'low',
    bullets: ['All items reconciled. No open breaks.'],
  },
]

// ─── Work Items ───────────────────────────────────────────────────────────────

export const WORK_ITEMS: WorkItem[] = [
  { id: 'wi-001', priority: 1,  workflowType: 'ACH Returns',          taskCategory: 'Exception Handling', status: 'escalated',   owner: null,        ageDays: 4, lastUpdated: '2026-04-26', risk: 'high',   requestChannel: 'SWIFT',    requesterRole: 'Operations Analyst',  region: 'NA'   },
  { id: 'wi-002', priority: 2,  workflowType: 'ACH Returns',          taskCategory: 'Exception Handling', status: 'escalated',   owner: null,        ageDays: 4, lastUpdated: '2026-04-25', risk: 'high',   requestChannel: 'SWIFT',    requesterRole: 'Operations Analyst',  region: 'NA'   },
  { id: 'wi-003', priority: 3,  workflowType: 'Wire Transfer',        taskCategory: 'Compliance Check',   status: 'blocked',     owner: 'M. Torres', ageDays: 3, lastUpdated: '2026-04-24', risk: 'high',   requestChannel: 'Email',    requesterRole: 'Compliance Officer',  region: 'NA'   },
  { id: 'wi-004', priority: 4,  workflowType: 'Wire Transfer',        taskCategory: 'Compliance Check',   status: 'blocked',     owner: 'M. Torres', ageDays: 3, lastUpdated: '2026-04-24', risk: 'high',   requestChannel: 'Email',    requesterRole: 'Compliance Officer',  region: 'EMEA' },
  { id: 'wi-005', priority: 5,  workflowType: 'FX Settlement',        taskCategory: 'Trade Settlement',   status: 'in-progress', owner: 'S. Patel',  ageDays: 2, lastUpdated: '2026-04-26', risk: 'medium', requestChannel: 'FIX',      requesterRole: 'Trader',              region: 'EMEA' },
  { id: 'wi-006', priority: 6,  workflowType: 'ACH Returns',          taskCategory: 'Exception Handling', status: 'pending',     owner: null,        ageDays: 2, lastUpdated: '2026-04-25', risk: 'medium', requestChannel: 'SWIFT',    requesterRole: 'Operations Analyst',  region: 'NA'   },
  { id: 'wi-007', priority: 7,  workflowType: 'FX Settlement',        taskCategory: 'Trade Settlement',   status: 'in-progress', owner: 'J. Lee',    ageDays: 1, lastUpdated: '2026-04-27', risk: 'medium', requestChannel: 'FIX',      requesterRole: 'Trader',              region: 'APAC' },
  { id: 'wi-008', priority: 8,  workflowType: 'Account Maintenance',  taskCategory: 'Client Service',     status: 'pending',     owner: null,        ageDays: 1, lastUpdated: '2026-04-27', risk: 'medium', requestChannel: 'Phone',    requesterRole: 'Client Services Rep', region: 'NA'   },
  { id: 'wi-009', priority: 9,  workflowType: 'Wire Transfer',        taskCategory: 'Compliance Check',   status: 'in-progress', owner: 'K. Brown',  ageDays: 1, lastUpdated: '2026-04-27', risk: 'medium', requestChannel: 'Email',    requesterRole: 'Compliance Officer',  region: 'NA'   },
  { id: 'wi-010', priority: 10, workflowType: 'Account Maintenance',  taskCategory: 'Client Service',     status: 'pending',     owner: null,        ageDays: 1, lastUpdated: '2026-04-26', risk: 'low',    requestChannel: 'Portal',   requesterRole: 'Client Services Rep', region: 'NA'   },
  { id: 'wi-011', priority: 11, workflowType: 'Account Maintenance',  taskCategory: 'Client Service',     status: 'in-progress', owner: 'R. Chen',   ageDays: 0, lastUpdated: '2026-04-27', risk: 'low',    requestChannel: 'Portal',   requesterRole: 'Client Services Rep', region: 'NA'   },
  { id: 'wi-012', priority: 12, workflowType: 'Reconciliation',       taskCategory: 'Reconciliation',     status: 'in-progress', owner: 'A. Nguyen', ageDays: 0, lastUpdated: '2026-04-27', risk: 'low',    requestChannel: 'Internal', requesterRole: 'Recon Analyst',       region: 'NA'   },
  { id: 'wi-013', priority: 13, workflowType: 'ACH Returns',          taskCategory: 'Exception Handling', status: 'pending',     owner: null,        ageDays: 2, lastUpdated: '2026-04-25', risk: 'medium', requestChannel: 'SWIFT',    requesterRole: 'Operations Analyst',  region: 'NA'   },
  { id: 'wi-014', priority: 14, workflowType: 'Account Maintenance',  taskCategory: 'Client Service',     status: 'pending',     owner: null,        ageDays: 1, lastUpdated: '2026-04-27', risk: 'low',    requestChannel: 'Phone',    requesterRole: 'Client Services Rep', region: 'EMEA' },
  { id: 'wi-015', priority: 15, workflowType: 'FX Settlement',        taskCategory: 'Trade Settlement',   status: 'in-progress', owner: 'S. Patel',  ageDays: 1, lastUpdated: '2026-04-27', risk: 'low',    requestChannel: 'FIX',      requesterRole: 'Trader',              region: 'APAC' },
  { id: 'wi-016', priority: 16, workflowType: 'Reconciliation',       taskCategory: 'Reconciliation',     status: 'in-progress', owner: 'T. Adams',  ageDays: 0, lastUpdated: '2026-04-27', risk: 'low',    requestChannel: 'Internal', requesterRole: 'Recon Analyst',       region: 'NA'   },
  { id: 'wi-017', priority: 17, workflowType: 'Wire Transfer',        taskCategory: 'Compliance Check',   status: 'pending',     owner: null,        ageDays: 0, lastUpdated: '2026-04-27', risk: 'low',    requestChannel: 'Email',    requesterRole: 'Compliance Officer',  region: 'NA'   },
  { id: 'wi-018', priority: 18, workflowType: 'ACH Returns',          taskCategory: 'Exception Handling', status: 'pending',     owner: null,        ageDays: 0, lastUpdated: '2026-04-27', risk: 'low',    requestChannel: 'SWIFT',    requesterRole: 'Operations Analyst',  region: 'NA'   },
]

// ─── Top Workflow Types ───────────────────────────────────────────────────────

export interface TopWorkflowEntry {
  rank: number
  workflowType: string
  newRequests: number
  changePercent: number
  changeDirection: 'up' | 'down' | 'flat'
}

export const TOP_WORKFLOW_TYPES: TopWorkflowEntry[] = [
  { rank: 1, workflowType: 'ACH Returns',          newRequests: 34, changePercent: 22, changeDirection: 'up'   },
  { rank: 2, workflowType: 'Beneficiary Changes',  newRequests: 27, changePercent: 8,  changeDirection: 'up'   },
  { rank: 3, workflowType: 'Wire Transfer',         newRequests: 19, changePercent: 5,  changeDirection: 'down' },
]

// ─── Pod Members ──────────────────────────────────────────────────────────────

export const POD_MEMBERS: PodMember[] = [
  { id: 'pm-1', name: 'M. Torres', role: 'Senior Analyst',     activeTaskCount: 9,  loadState: 'overloaded' },
  { id: 'pm-2', name: 'S. Patel',  role: 'Analyst',            activeTaskCount: 6,  loadState: 'balanced'   },
  { id: 'pm-3', name: 'J. Lee',    role: 'Analyst',            activeTaskCount: 5,  loadState: 'balanced'   },
  { id: 'pm-4', name: 'K. Brown',  role: 'Operations Analyst', activeTaskCount: 4,  loadState: 'balanced'   },
  { id: 'pm-5', name: 'R. Chen',   role: 'Junior Analyst',     activeTaskCount: 1,  loadState: 'available'  },
  { id: 'pm-6', name: 'A. Nguyen', role: 'Analyst',            activeTaskCount: 5,  loadState: 'balanced'   },
  { id: 'pm-7', name: 'T. Adams',  role: 'Operations Analyst', activeTaskCount: 6,  loadState: 'balanced'   },
]

// ─── Filter Options ───────────────────────────────────────────────────────────

export const FILTER_OPTIONS = {
  workflowTypes:   ['ACH Returns', 'Wire Transfer', 'FX Settlement', 'Account Maintenance', 'Reconciliation'],
  taskCategories:  ['Exception Handling', 'Compliance Check', 'Trade Settlement', 'Client Service', 'Reconciliation'],
  statuses:        ['pending', 'in-progress', 'escalated', 'blocked'],
  owners:          ['M. Torres', 'S. Patel', 'J. Lee', 'K. Brown', 'R. Chen', 'A. Nguyen', 'T. Adams'],
  requestChannels: ['SWIFT', 'Email', 'FIX', 'Phone', 'Portal', 'Internal'],
  requesterRoles:  ['Operations Analyst', 'Compliance Officer', 'Trader', 'Client Services Rep', 'Recon Analyst'],
  regions:         ['NA', 'EMEA', 'APAC'],
}

// ─── Default filter state ─────────────────────────────────────────────────────

export const DEFAULT_FILTERS: DashboardFilters = {
  podId:          'ach-ops',
  dateRange:      'last7',
  workflowType:   '',
  taskCategory:   '',
  status:         '',
  owner:          '',
  requestChannel: '',
  requesterRole:  '',
  region:         '',
}
