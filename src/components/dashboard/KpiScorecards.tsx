import type { KpiTile } from '@/data/podDashboardMock'

interface KpiScorecardsProps {
  tiles: KpiTile[]
  onTileClick: (tileId: string) => void
}

const DELTA_ARROWS = {
  up:   '▲',
  down: '▼',
  flat: '—',
}

export function KpiScorecards({ tiles, onTileClick }: KpiScorecardsProps) {
  return (
    <div className="ms-pod-kpi">
      {tiles.map((tile) => (
        <div
          key={tile.id}
          className={`ms-pod-kpi__tile ms-pod-kpi__tile--${tile.deltaDirection}`}
          role="button"
          tabIndex={0}
          aria-label={`${tile.label}: ${tile.value}. ${tile.contextLabel}`}
          onClick={() => onTileClick(tile.id)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault()
              onTileClick(tile.id)
            }
          }}
        >
          <div className="ms-pod-kpi__label">{tile.label}</div>
          <div className="ms-pod-kpi__value">{tile.value}</div>
          <div className={`ms-pod-kpi__delta ms-pod-kpi__delta--${tile.deltaDirection}`}>
            {DELTA_ARROWS[tile.deltaDirection]}&nbsp;{tile.delta}
          </div>
        </div>
      ))}
    </div>
  )
}
