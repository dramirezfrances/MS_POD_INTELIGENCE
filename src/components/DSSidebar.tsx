const NAV = [
  {
    level: 'Level 1',
    section: 'Atoms',
    href: '#atoms',
    items: [
      { label: 'Logo', href: '#atoms-logo' },
      { label: 'Color Palette', href: '#atoms-colors' },
      { label: 'Typography', href: '#atoms-typography' },
      { label: 'Buttons', href: '#atoms-buttons' },
      { label: 'Badges', href: '#atoms-badges' },
      { label: 'Alerts', href: '#atoms-alerts' },
      { label: 'Form Controls', href: '#atoms-forms' },
      { label: 'Spinners', href: '#atoms-spinners' },
    ],
  },
  {
    level: 'Level 2',
    section: 'Molecules',
    href: '#molecules',
    items: [
      { label: 'Stat Cards', href: '#molecules-stat-cards' },
      { label: 'Search Box', href: '#molecules-search' },
      { label: 'Multi-Select', href: '#molecules-multiselect' },
      { label: 'Cards', href: '#molecules-cards' },
      { label: 'Bar Chart',         href: '#molecules-bar-chart' },
      { label: 'Stacked Bar Chart', href: '#molecules-stacked-bar' },
      { label: 'Grouped Bar Chart', href: '#molecules-grouped-bar' },
      { label: 'Line Chart',        href: '#molecules-line-chart' },
      { label: 'Burn-up Chart',     href: '#molecules-burnup-chart' },
      { label: 'Donut Chart',       href: '#molecules-donut-chart' },
      { label: 'Lollipop Chart',    href: '#molecules-lollipop-chart' },
    ],
  },
  {
    level: 'Level 3',
    section: 'Organisms',
    href: '#organisms',
    items: [
      { label: 'Site Navigation', href: '#organisms-nav' },
      { label: 'Key Metrics Row', href: '#organisms-metrics' },
      { label: 'Fund Grid', href: '#organisms-fund-grid' },
    ],
  },
  {
    level: 'Level 4',
    section: 'Templates',
    href: '#templates',
    items: [
      { label: 'Wealth Dashboard', href: '#templates-dashboard' },
    ],
  },
  {
    level: 'Level 5',
    section: 'Dashboard Pages',
    href: '#dashboard-pages',
    items: [
      { label: 'Top Workflow Types',    href: '#dashboard-top-workflows' },
      { label: 'Pod Summary Panel',    href: '#dashboard-summary' },
      { label: 'Pod Health Widget',    href: '#dashboard-health' },
      { label: 'Workflow Risk Widget', href: '#dashboard-risk' },
      { label: 'Priority Work Queue',  href: '#dashboard-queue' },
      { label: 'Workload Balance',     href: '#dashboard-balance' },
      { label: 'Full Dashboard V1 ↗',  href: '/frontend-design/POD_Manager_Dashboard_V1' },
      { label: 'Full Dashboard V2 ↗',  href: '/frontend-design/POD_Manager_Dashboard_V2' },
    ],
  },
]

export function DSSidebar() {
  return (
    <aside className="ds-sidebar">
      {NAV.map(({ level, section, href, items }) => (
        <div key={section} className="ds-sidebar__section">
          <a className="ds-sidebar__group-label" href={href}>
            <span style={{ color: '#757D8E', fontWeight: 400, letterSpacing: 0 }}>
              {level} ·{' '}
            </span>
            {section}
          </a>
          {items.map((item) => (
            <a key={item.href} className="ds-sidebar__link ds-sidebar__link--sub" href={item.href}>
              {item.label}
            </a>
          ))}
        </div>
      ))}
    </aside>
  )
}
