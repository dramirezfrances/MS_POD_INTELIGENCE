'use client'

import type { V2DashboardFilters, V2Period } from '@/data/podDashboardMockV2'
import { MultiSelect } from '@/components/ui/MultiSelect'

interface V2FilterBarProps {
  filters: V2DashboardFilters
  onFiltersChange: (next: Partial<V2DashboardFilters>) => void
  filterOptions: { regions: string[]; pods: string[] }
}

const PERIODS: { value: V2Period; label: string }[] = [
  { value: 'today',       label: 'Today' },
  { value: 'last7',       label: 'Last 7 Days' },
  { value: 'last30',      label: 'Last 30 Days' },
  { value: 'past6months', label: 'Past 6 Months' },
  { value: 'custom',      label: 'Custom Range' },
]

export function V2FilterBar({ filters, onFiltersChange, filterOptions }: V2FilterBarProps) {
  const regionOptions  = filterOptions.regions.map((r) => ({ value: r, label: r }))
  const podOptions     = filterOptions.pods.map((p) => ({ value: p, label: p }))

  return (
    <div className="ms-v2-filter">
      {/* Row 1: Region + Pod multi-selects */}
      <div className="ms-v2-filter__row ms-v2-filter__row--selects">
        <div className="ms-v2-filter__group">
          <span className="ms-v2-filter__label">REGION</span>
          <MultiSelect
            options={regionOptions}
            value={filters.regions}
            onChange={(vals) => onFiltersChange({ regions: vals })}
            placeholder="All regions"
          />
        </div>
        <div className="ms-v2-filter__group">
          <span className="ms-v2-filter__label">POD(s)</span>
          <MultiSelect
            options={podOptions}
            value={filters.pods}
            onChange={(vals) => onFiltersChange({ pods: vals })}
            placeholder="All pods"
          />
        </div>
      </div>

      {/* Row 2: Period pills + Comparison Mode */}
      <div className="ms-v2-filter__row ms-v2-filter__row--period">
        <div className="ms-v2-filter__period-pills">
          {PERIODS.map((p) => (
            <button
              key={p.value}
              type="button"
              className={`ms-v2-filter__pill${filters.period === p.value ? ' ms-v2-filter__pill--active' : ''}`}
              onClick={() => onFiltersChange({ period: p.value })}
            >
              {p.label}
            </button>
          ))}
        </div>
        <button
          type="button"
          className={`ms-v2-filter__comparison-btn${filters.comparisonMode ? ' ms-v2-filter__comparison-btn--active' : ''}`}
          onClick={() => onFiltersChange({ comparisonMode: !filters.comparisonMode })}
        >
          Comparison Mode
        </button>
      </div>
    </div>
  )
}
