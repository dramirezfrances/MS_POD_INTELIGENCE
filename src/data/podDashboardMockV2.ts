// ─── Types ────────────────────────────────────────────────────────────────────

export type V2Period = 'today' | 'last7' | 'last30' | 'past6months' | 'custom'

export interface V2DashboardFilters {
  regions: string[]
  pods: string[]
  period: V2Period
  comparisonMode: boolean
  showCompleted: boolean
}

export interface DurationBand {
  label: string
  count: number
  color: string
}

export interface CategoryTrendPoint {
  day: string
  'Account Maintenance': number
  'Account Opening': number
  'Trading': number
  'Money Movement': number
}

export interface TasksByDatePoint {
  day: string
  count: number
}

export interface TopTaskTypeRow {
  rank: number
  taskType: string
  taskCount: number
  trendPercent: number
  trendDirection: 'up' | 'down' | 'flat'
  overdueCount: number
  overdueTrendPercent: number
  overdueTrendDirection: 'up' | 'down' | 'flat'
}

export interface WorkloadMember {
  name: string
  assignedTasks: number
  sharePercent: number
  overdueCount: number
  color: string
}

export interface Requestor {
  rank: number
  name: string
  taskCount: number
}

export interface V2WorkItem {
  id: string
  eventId: string
  risk: 'high' | 'medium' | 'low'
  taskType: string
  status: 'unassigned' | 'in-progress' | 'blocked' | 'escalated' | 'completed'
  owner: string | null
  ageDays: number
  lastUpdated: string
}

// ─── KPI Tiles ────────────────────────────────────────────────────────────────

export const V2_KPI_TILES = [
  { id: 'open',       label: 'Open Tasks',        value: 90,  delta: '8 vs prior 7d',   deltaDirection: 'neutral' as const, contextLabel: 'Above expected pod volume'         },
  { id: 'completed',  label: 'Completed Tasks',   value: 64,  delta: '+5% vs prior 7d',  deltaDirection: 'up'   as const, contextLabel: 'Above target completion rate'      },
  { id: 'unassigned', label: 'Unassigned Tasks',  value: 17,  delta: '−6 vs prior 7d',   deltaDirection: 'down' as const, contextLabel: 'Requires immediate triage'         },
  { id: 'overdue',    label: 'Overdue Tasks',     value: 5,   delta: '−1 vs prior 7d',   deltaDirection: 'down' as const, contextLabel: 'Within acceptable threshold'       },
  { id: 'aging',      label: 'Aging Tasks (>3d)', value: 9,   delta: '+3 vs prior 7d',   deltaDirection: 'up'   as const, contextLabel: 'Escalation risk increasing'        },
]

// ─── Duration Bands ───────────────────────────────────────────────────────────

export const DURATION_BANDS: DurationBand[] = [
  { label: '0–2 days',  count: 142, color: '#001FA0' },
  { label: '3–7 days',  count: 87,  color: '#009FDF' },
  { label: '8–14 days', count: 34,  color: '#F8823A' },
  { label: '14+ days',  count: 34,  color: '#C52034' },
]

// ─── Category Trend Points ────────────────────────────────────────────────────

export const CATEGORY_TREND_POINTS: CategoryTrendPoint[] = [
  { day: 'Mon', 'Account Maintenance': 4,  'Account Opening': 3,  'Trading': 2,  'Money Movement': 1  },
  { day: 'Tue', 'Account Maintenance': 6,  'Account Opening': 4,  'Trading': 5,  'Money Movement': 3  },
  { day: 'Wed', 'Account Maintenance': 5,  'Account Opening': 6,  'Trading': 4,  'Money Movement': 5  },
  { day: 'Thu', 'Account Maintenance': 8,  'Account Opening': 5,  'Trading': 7,  'Money Movement': 6  },
  { day: 'Fri', 'Account Maintenance': 10, 'Account Opening': 8,  'Trading': 9,  'Money Movement': 8  },
  { day: 'Sat', 'Account Maintenance': 7,  'Account Opening': 9,  'Trading': 11, 'Money Movement': 9  },
  { day: 'Sun', 'Account Maintenance': 11, 'Account Opening': 11, 'Trading': 12, 'Money Movement': 10 },
]

// ─── Tasks By Date ────────────────────────────────────────────────────────────

export const TASKS_BY_DATE: TasksByDatePoint[] = [
  { day: 'Mon', count: 22 },
  { day: 'Tue', count: 35 },
  { day: 'Wed', count: 28 },
  { day: 'Thu', count: 42 },
  { day: 'Fri', count: 55 },
  { day: 'Sat', count: 38 },
  { day: 'Sun', count: 47 },
]

// ─── Top Task Types ───────────────────────────────────────────────────────────

export const TOP_TASK_TYPES: TopTaskTypeRow[] = [
  { rank: 1, taskType: 'ACH Returns',          taskCount: 30, trendPercent: 10,  trendDirection: 'up',   overdueCount: 3, overdueTrendPercent: 8,  overdueTrendDirection: 'down' },
  { rank: 2, taskType: 'Beneficiary Changes',  taskCount: 22, trendPercent: 7,   trendDirection: 'up',   overdueCount: 1, overdueTrendPercent: 1,  overdueTrendDirection: 'down' },
  { rank: 3, taskType: 'Wire Transfer',        taskCount: 15, trendPercent: 35,  trendDirection: 'down', overdueCount: 1, overdueTrendPercent: 1,  overdueTrendDirection: 'down' },
  { rank: 4, taskType: 'eSign',                taskCount: 7,  trendPercent: 90,  trendDirection: 'up',   overdueCount: 0, overdueTrendPercent: 3,  overdueTrendDirection: 'down' },
  { rank: 5, taskType: 'New Account Onboarding', taskCount: 5, trendPercent: 95, trendDirection: 'up',   overdueCount: 3, overdueTrendPercent: 3,  overdueTrendDirection: 'down' },
]

// ─── Workload Members ─────────────────────────────────────────────────────────

export const WORKLOAD_MEMBERS: WorkloadMember[] = [
  { name: 'Maya Torres',    assignedTasks: 22, sharePercent: 15, overdueCount: 4, color: '#001FA0' },
  { name: 'Samantha Lee',   assignedTasks: 20, sharePercent: 13, overdueCount: 1, color: '#009FDF' },
  { name: 'Olivia Brooks',  assignedTasks: 20, sharePercent: 13, overdueCount: 1, color: '#21793B' },
  { name: 'Emily Chen',     assignedTasks: 17, sharePercent: 10, overdueCount: 2, color: '#F8823A' },
  { name: 'Kevin Morales',  assignedTasks: 15, sharePercent: 8,  overdueCount: 3, color: '#C52034' },
]

export const TOTAL_ASSIGNED_TASKS = 148

// ─── Top Requestors ───────────────────────────────────────────────────────────

export const TOP_REQUESTORS: Requestor[] = [
  { rank: 1, name: 'R. Chen',    taskCount: 30 },
  { rank: 2, name: 'T. Adams',   taskCount: 26 },
  { rank: 3, name: 'A. Nguyen',  taskCount: 22 },
  { rank: 4, name: 'K. Brown',   taskCount: 19 },
  { rank: 5, name: 'J. Lee',     taskCount: 16 },
]

// ─── V2 Work Items ────────────────────────────────────────────────────────────

export const V2_WORK_ITEMS: V2WorkItem[] = [
  { id: 'v2-001', eventId: '138492761', risk: 'high',   taskType: 'ACH Returns',           status: 'unassigned',  owner: null,             ageDays: 4, lastUpdated: 'Apr 26, 3:12 PM' },
  { id: 'v2-002', eventId: '138807234', risk: 'high',   taskType: 'Wire Transfer',         status: 'in-progress', owner: 'M. Torres',      ageDays: 3, lastUpdated: 'Apr 26, 2:45 PM' },
  { id: 'v2-003', eventId: '138615908', risk: 'medium', taskType: 'ACH Returns',           status: 'in-progress', owner: 'S. Patel',       ageDays: 2, lastUpdated: 'Apr 26, 1:30 PM' },
  { id: 'v2-004', eventId: '138274583', risk: 'high',   taskType: 'FX Settlement',         status: 'unassigned',  owner: null,             ageDays: 1, lastUpdated: 'Apr 26, 11:00 AM'},
  { id: 'v2-005', eventId: '138930146', risk: 'medium', taskType: 'Wire Transfer',         status: 'blocked',     owner: 'J. Lee',         ageDays: 2, lastUpdated: 'Apr 25, 4:20 PM' },
  { id: 'v2-006', eventId: '138358729', risk: 'medium', taskType: 'ACH Returns',           status: 'in-progress', owner: null,             ageDays: 1, lastUpdated: 'Apr 26, 9:00 AM' },
  { id: 'v2-007', eventId: '138841395', risk: 'low',    taskType: 'Account Maintenance',   status: 'in-progress', owner: 'K. Brown',       ageDays: 1, lastUpdated: 'Apr 26, 10:15 AM'},
  { id: 'v2-008', eventId: '138786052', risk: 'high',   taskType: 'FX Settlement',         status: 'escalated',   owner: 'A. Nguyen',      ageDays: 3, lastUpdated: 'Apr 25, 2:00 PM' },
  { id: 'v2-009', eventId: '138019864', risk: 'low',    taskType: 'Reconciliation',        status: 'in-progress', owner: 'T. Adams',       ageDays: 0, lastUpdated: 'Apr 26, 8:30 AM' },
  { id: 'v2-010', eventId: '138523670', risk: 'medium', taskType: 'Wire Transfer',         status: 'in-progress', owner: null,             ageDays: 2, lastUpdated: 'Apr 25, 5:00 PM' },
  { id: 'v2-011', eventId: '138644112', risk: 'high',   taskType: 'Beneficiary Changes',   status: 'unassigned',  owner: null,             ageDays: 3, lastUpdated: 'Apr 25, 1:15 PM' },
  { id: 'v2-012', eventId: '138712490', risk: 'medium', taskType: 'New Account Onboarding',status: 'in-progress', owner: 'S. Patel',       ageDays: 1, lastUpdated: 'Apr 26, 10:45 AM'},
  { id: 'v2-013', eventId: '138899034', risk: 'low',    taskType: 'eSign',                 status: 'in-progress', owner: 'O. Brooks',      ageDays: 0, lastUpdated: 'Apr 26, 9:55 AM' },
  { id: 'v2-014', eventId: '138445820', risk: 'medium', taskType: 'ACH Returns',           status: 'unassigned',  owner: null,             ageDays: 2, lastUpdated: 'Apr 25, 3:30 PM' },
  { id: 'v2-015', eventId: '138560177', risk: 'low',    taskType: 'Account Maintenance',   status: 'completed',   owner: 'E. Chen',        ageDays: 1, lastUpdated: 'Apr 26, 11:30 AM'},
  { id: 'v2-016', eventId: '138301654', risk: 'high',   taskType: 'Wire Transfer',         status: 'blocked',     owner: 'M. Torres',      ageDays: 4, lastUpdated: 'Apr 25, 12:00 PM'},
  { id: 'v2-017', eventId: '138775293', risk: 'medium', taskType: 'Beneficiary Changes',   status: 'in-progress', owner: 'K. Morales',     ageDays: 1, lastUpdated: 'Apr 26, 2:00 PM' },
  { id: 'v2-018', eventId: '138088461', risk: 'low',    taskType: 'New Account Onboarding',status: 'completed',   owner: 'A. Nguyen',      ageDays: 0, lastUpdated: 'Apr 26, 8:00 AM' },
]

// ─── Filter Options ───────────────────────────────────────────────────────────

export const V2_FILTER_OPTIONS = {
  regions: ['East Region', 'West Region', 'Central', 'International'],
  pods:    ['Mid-America East', 'ACH Operations', 'Wire Transfers', 'FX Settlements', 'Corporate Actions'],
}

// ─── Default Filters ──────────────────────────────────────────────────────────

export const V2_DEFAULT_FILTERS: V2DashboardFilters = {
  regions:        ['East Region'],
  pods:           ['Mid-America East'],
  period:         'last7',
  comparisonMode: false,
  showCompleted:  false,
}
