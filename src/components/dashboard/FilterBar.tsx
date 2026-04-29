import type { DashboardFilters, DateRange } from '@/data/podDashboardMock'
import type { FILTER_OPTIONS } from '@/data/podDashboardMock'

interface FilterBarProps {
  filters: DashboardFilters
  onFiltersChange: (next: DashboardFilters) => void
  filterOptions: typeof FILTER_OPTIONS
}

const DATE_RANGES: { value: DateRange; label: string }[] = [
  { value: 'today',  label: 'Today' },
  { value: 'last7',  label: 'Last 7 Days' },
  { value: 'last30', label: 'Last 30 Days' },
  { value: 'custom', label: 'Custom' },
]

export function FilterBar({ filters, onFiltersChange, filterOptions }: FilterBarProps) {
  const set = (patch: Partial<DashboardFilters>) =>
    onFiltersChange({ ...filters, ...patch })

  const activeCount = [
    filters.workflowType,
    filters.taskCategory,
    filters.status,
    filters.owner,
    filters.requestChannel,
    filters.requesterRole,
    filters.region,
  ].filter(Boolean).length

  const clearSecondary = () =>
    onFiltersChange({
      ...filters,
      workflowType: '',
      taskCategory: '',
      status: '',
      owner: '',
      requestChannel: '',
      requesterRole: '',
      region: '',
    })

  return (
    <div className="ms-pod-filter">
      {/* Date range row */}
      <div className="ms-pod-filter__row ms-pod-filter__row--primary">
        <span className="ms-pod-filter__label">Period</span>
        {DATE_RANGES.map((dr) => (
          <button
            key={dr.value}
            type="button"
            className={`btn btn-sm ms-pod-filter__pill ${
              filters.dateRange === dr.value
                ? 'btn-primary'
                : 'btn-outline-secondary'
            }`}
            onClick={() => set({ dateRange: dr.value })}
          >
            {dr.label}
          </button>
        ))}
      </div>

      {/* Secondary filters row */}
      <div className="ms-pod-filter__row">
        <span className="ms-pod-filter__label">
          Filters
          {activeCount > 0 && (
            <span className="ms-pod-filter__active-count">{activeCount}</span>
          )}
        </span>

        <select
          className="form-select form-select-sm ms-pod-filter__select"
          value={filters.workflowType}
          onChange={(e) => set({ workflowType: e.target.value })}
          aria-label="Workflow type"
        >
          <option value="">Workflow Type</option>
          {filterOptions.workflowTypes.map((v) => (
            <option key={v} value={v}>{v}</option>
          ))}
        </select>

        <select
          className="form-select form-select-sm ms-pod-filter__select"
          value={filters.taskCategory}
          onChange={(e) => set({ taskCategory: e.target.value })}
          aria-label="Task category"
        >
          <option value="">Task Category</option>
          {filterOptions.taskCategories.map((v) => (
            <option key={v} value={v}>{v}</option>
          ))}
        </select>

        <select
          className="form-select form-select-sm ms-pod-filter__select"
          value={filters.status}
          onChange={(e) => set({ status: e.target.value })}
          aria-label="Status"
        >
          <option value="">Status</option>
          {filterOptions.statuses.map((v) => (
            <option key={v} value={v} style={{ textTransform: 'capitalize' }}>{v}</option>
          ))}
        </select>

        <select
          className="form-select form-select-sm ms-pod-filter__select"
          value={filters.owner}
          onChange={(e) => set({ owner: e.target.value })}
          aria-label="Owner"
        >
          <option value="">Owner</option>
          {filterOptions.owners.map((v) => (
            <option key={v} value={v}>{v}</option>
          ))}
        </select>

        <select
          className="form-select form-select-sm ms-pod-filter__select"
          value={filters.requestChannel}
          onChange={(e) => set({ requestChannel: e.target.value })}
          aria-label="Request channel"
        >
          <option value="">Channel</option>
          {filterOptions.requestChannels.map((v) => (
            <option key={v} value={v}>{v}</option>
          ))}
        </select>

        <select
          className="form-select form-select-sm ms-pod-filter__select"
          value={filters.region}
          onChange={(e) => set({ region: e.target.value })}
          aria-label="Region"
        >
          <option value="">Region</option>
          {filterOptions.regions.map((v) => (
            <option key={v} value={v}>{v}</option>
          ))}
        </select>

        {activeCount > 0 && (
          <button
            type="button"
            className="ms-pod-filter__clear"
            onClick={clearSecondary}
          >
            Clear filters
          </button>
        )}
      </div>
    </div>
  )
}
