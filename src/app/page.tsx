import { DashboardShowcase } from '@/components/dashboard/DashboardShowcase'
import {
  BarChart,
  StackedBarChart,
  GroupedBarChart,
  LineChart,
  BurnUpChart,
  DonutChart,
  LollipopChart,
} from '@/components/charts'
import { MultiSelect } from '@/components/ui/MultiSelect'
import { Alert } from '@/components/ui/Alert'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Input } from '@/components/ui/Input'
import { Spinner } from '@/components/ui/Spinner'
import { SearchBox } from '@/components/molecules/FormGroup'
import { StatCard } from '@/components/molecules/StatCard'
import { HeroBanner } from '@/components/organisms/HeroBanner'
import { SiteNav } from '@/components/organisms/SiteNav'
import { StatsRow } from '@/components/organisms/StatsRow'
import { Logo } from '@/components/ui/Logo'
import { DSSidebar } from '@/components/DSSidebar'

// ─── Color token data ─────────────────────────────────────────────────────────

const PALETTE = {
  'Navy — Primary Surfaces': [
    { name: 'Navy 900', hex: '#00162C' },
    { name: 'Navy 800', hex: '#001E3C' },
    { name: 'Navy 700', hex: '#002A50' },
    { name: 'Navy 600', hex: '#002C5B' },
    { name: 'Navy 500', hex: '#002F5F' },
  ],
  'Blue — Interactive': [
    { name: 'Electric ★', hex: '#001FA0' },
    { name: 'MS Blue 600', hex: '#0074CF' },
    { name: 'Skyblue 80', hex: '#009FDF' },
  ],
  'Neutral — Grays': [
    { name: 'Gray 800', hex: '#465361' },
    { name: 'Gray 700', hex: '#535558' },
    { name: 'Gray 600', hex: '#757D8E' },
    { name: 'Gray 400', hex: '#AEB3BB' },
    { name: 'Gray 300', hex: '#D7DDE0' },
    { name: 'Gray 200', hex: '#E7E7EA' },
    { name: 'Gray 100', hex: '#EFEFF1' },
    { name: 'Gray 50',  hex: '#F4F6F7' },
  ],
  'Semantic — Data Viz': [
    { name: 'Green',      hex: '#21793B' },
    { name: 'Green Bright', hex: '#3CB65F' },
    { name: 'Red',        hex: '#C52034' },
    { name: 'Orange',     hex: '#F8823A' },
    { name: 'Purple',     hex: '#6330C9' },
    { name: 'Periwinkle', hex: '#235BE1' },
  ],
}

// ─── Type scale data ──────────────────────────────────────────────────────────

const TYPE_SCALE = [
  { tag: 'Display',  size: '3rem / 700',    sample: 'Display Heading' },
  { tag: 'H1',       size: '2.5rem / 700',  sample: 'Page Title' },
  { tag: 'H2',       size: '2rem / 700',    sample: 'Section Heading' },
  { tag: 'H3',       size: '1.5rem / 700',  sample: 'Subsection Title' },
  { tag: 'H4',       size: '1.25rem / 700', sample: 'Card Heading' },
  { tag: 'H5',       size: '1rem / 700',    sample: 'Label Heading' },
  { tag: 'Body',     size: '1rem / 400',    sample: 'The quick brown fox jumps over the lazy dog.' },
  { tag: 'Small',    size: '0.875rem / 400', sample: 'Secondary body text, captions, metadata.' },
  { tag: 'Caption',  size: '0.75rem / 400', sample: 'Footnotes, timestamps, legal copy.' },
]

export default function DesignSystemPage() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>

      {/* ── Page header (full width) ─────────────────────────────────────── */}
      <div style={{ background: '#001E3C', padding: '1.5rem 2rem', borderBottom: '3px solid #001FA0', flexShrink: 0 }}>
        <p className="ds-level-label" style={{ color: '#009FDF', marginBottom: '0.2rem' }}>Morgan Stanley</p>
        <h1 style={{ color: '#fff', fontSize: '1.375rem', fontWeight: 700, margin: 0 }}>Design System</h1>
        <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.8125rem', margin: '0.2rem 0 0' }}>
          Bootstrap 5 · Atomic Design · MS Brand Tokens
        </p>
      </div>

      {/* ── Two-column body ──────────────────────────────────────────────── */}
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>

        {/* Sidebar */}
        <div style={{ width: '220px', flexShrink: 0, background: '#F4F6F7', borderRight: '1px solid #D7DDE0' }}>
          <DSSidebar />
        </div>

        {/* Main content */}
        <main style={{ flex: 1, overflowY: 'auto', padding: '0 2rem 4rem' }}>

          {/* ══════════════════════════════════════════════════════════════
              ATOMS
          ══════════════════════════════════════════════════════════════ */}
          <section id="atoms" className="ds-section">
            <p className="ds-level-label">Level 1</p>
            <h2 className="ds-section-title">Atoms</h2>
            <p className="ds-section-desc">
              The smallest functional units — they cannot be broken down further without losing
              meaning. Colors, typography, buttons, badges, and form controls live here.
            </p>

            {/* Logo */}
            <div id="atoms-logo" className="ds-subsection">
              <h3>Logo</h3>
              <p style={{ fontSize: '0.8125rem', color: '#757D8E', marginBottom: '1.5rem' }}>
                The Morgan Stanley wordmark is always rendered in 100% black on light
                backgrounds, or reversed to 100% white on dark backgrounds. Never in color.
              </p>

              {/* Sizes — dark */}
              <p style={{ fontSize: '0.6875rem', fontWeight: 700, color: '#757D8E', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '1rem' }}>
                Wordmark — Dark
              </p>
              <div style={{ background: '#FFFFFF', border: '1px solid #D7DDE0', borderRadius: '2px', padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <Logo size="xl" variant="dark" />
                <Logo size="lg" variant="dark" />
                <Logo size="md" variant="dark" />
                <Logo size="sm" variant="dark" />
              </div>

              {/* Sizes — reversed */}
              <p style={{ fontSize: '0.6875rem', fontWeight: 700, color: '#757D8E', textTransform: 'uppercase', letterSpacing: '0.08em', margin: '1.5rem 0 1rem' }}>
                Wordmark — Reversed (on Navy)
              </p>
              <div style={{ background: '#001E3C', borderRadius: '2px', padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <Logo size="xl" variant="light" />
                <Logo size="lg" variant="light" />
                <Logo size="md" variant="light" />
                <Logo size="sm" variant="light" />
              </div>

              {/* With mark placeholder */}
              <p style={{ fontSize: '0.6875rem', fontWeight: 700, color: '#757D8E', textTransform: 'uppercase', letterSpacing: '0.08em', margin: '1.5rem 0 1rem' }}>
                With Mark Placeholder
              </p>
              <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
                <div style={{ background: '#FFFFFF', border: '1px solid #D7DDE0', borderRadius: '2px', padding: '1.5rem' }}>
                  <Logo size="lg" variant="dark" showMark />
                </div>
                <div style={{ background: '#001E3C', borderRadius: '2px', padding: '1.5rem' }}>
                  <Logo size="lg" variant="light" showMark />
                </div>
              </div>
            </div>

            {/* Color Palette */}
            <div id="atoms-colors" className="ds-subsection">
              <h3>Color Palette</h3>
              {Object.entries(PALETTE).map(([group, swatches]) => (
                <div key={group} className="mb-4">
                  <p style={{ fontSize: '0.75rem', fontWeight: 600, color: '#757D8E', marginBottom: '0.5rem' }}>{group}</p>
                  <div className="d-flex flex-wrap gap-2">
                    {swatches.map(({ name, hex }) => (
                      <div key={hex} className="ds-swatch" style={{ minWidth: '7rem' }}>
                        <div className="ds-swatch__block" style={{ background: hex }} />
                        <div className="ds-swatch__info">
                          <div className="ds-swatch__name">{name}</div>
                          <div className="ds-swatch__hex">{hex}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Typography */}
            <div id="atoms-typography" className="ds-subsection">
              <h3>Typography Scale — Morgan Stanley Sans / Arial</h3>
              <div>
                {TYPE_SCALE.map(({ tag, size, sample }) => (
                  <div key={tag} className="ds-type-row">
                    <span className="ds-type-row__meta">{tag}<br />{size}</span>
                    <span
                      className="ds-type-row__sample"
                      style={{
                        fontSize: size.split('/')[0].trim(),
                        fontWeight: parseInt(size.split('/')[1]) || 400,
                      }}
                    >
                      {sample}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Buttons */}
            <div id="atoms-buttons" className="ds-subsection">
              <h3>Buttons</h3>
              <div className="d-flex flex-wrap gap-2 mb-3">
                {(['primary','secondary','success','danger','warning','info','light','dark'] as const).map((v) => (
                  <Button key={v} variant={v}>{v.charAt(0).toUpperCase() + v.slice(1)}</Button>
                ))}
              </div>
              <div className="d-flex flex-wrap gap-2 mb-3">
                {(['outline-primary','outline-secondary','outline-danger','outline-dark'] as const).map((v) => (
                  <Button key={v} variant={v}>{v}</Button>
                ))}
              </div>
              <div className="d-flex flex-wrap align-items-center gap-2">
                <Button variant="primary" size="lg">Large</Button>
                <Button variant="primary">Default</Button>
                <Button variant="primary" size="sm">Small</Button>
                <Button variant="primary" loading>Loading</Button>
                <Button variant="primary" disabled>Disabled</Button>
              </div>
            </div>

            {/* Badges */}
            <div id="atoms-badges" className="ds-subsection">
              <h3>Badges</h3>
              <div className="d-flex flex-wrap gap-2 mb-2">
                {(['primary','secondary','success','danger','warning','info','light','dark'] as const).map((v) => (
                  <Badge key={v} variant={v}>{v}</Badge>
                ))}
              </div>
              <div className="d-flex flex-wrap gap-2">
                {(['primary','secondary','success','danger'] as const).map((v) => (
                  <Badge key={v} variant={v} pill>{v} pill</Badge>
                ))}
              </div>
            </div>

            {/* Alerts */}
            <div id="atoms-alerts" className="ds-subsection">
              <h3>Alerts</h3>
              <Alert variant="success" heading="Trade Executed">
                Your order for 50 shares of MSFT has been filled at $412.30.
              </Alert>
              <Alert variant="danger" dismissible>
                Unable to process your request. Please contact your advisor.
              </Alert>
              <Alert variant="warning">
                Market volatility is elevated. Review your portfolio exposure.
              </Alert>
              <Alert variant="info">
                Q4 earnings reports are available in your document center.
              </Alert>
            </div>

            {/* Form Controls */}
            <div id="atoms-forms" className="ds-subsection">
              <h3>Form Controls</h3>
              <div className="row g-3">
                <div className="col-md-4">
                  <Input label="Account Number" type="text" placeholder="e.g. 123-456789"
                    helpText="Your 9-digit Morgan Stanley account number." />
                </div>
                <div className="col-md-4">
                  <Input label="Email Address" type="email" placeholder="you@example.com"
                    error="Please enter a valid email address." />
                </div>
                <div className="col-md-4">
                  <Input label="Trade Amount" type="number" placeholder="0.00"
                    helpText="Minimum trade amount: $1,000" />
                </div>
              </div>
            </div>

            {/* Spinners */}
            <div id="atoms-spinners" className="ds-subsection">
              <h3>Spinners</h3>
              <div className="d-flex flex-wrap align-items-center gap-4">
                <Spinner color="primary" />
                <Spinner color="secondary" />
                <Spinner color="dark" />
                <Spinner variant="grow" color="primary" />
                <Spinner variant="grow" color="secondary" />
                <span className="text-muted" style={{ fontSize: '0.875rem' }}>
                  <Spinner color="primary" size="sm" /> &nbsp;Loading positions...
                </span>
              </div>
            </div>
          </section>


          {/* ══════════════════════════════════════════════════════════════
              MOLECULES
          ══════════════════════════════════════════════════════════════ */}
          <section id="molecules" className="ds-section">
            <p className="ds-level-label">Level 2</p>
            <h2 className="ds-section-title">Molecules</h2>
            <p className="ds-section-desc">
              Groups of atoms working together as a single unit — a search box, a stat card,
              or a fund card combining badges, text, and a button.
            </p>

            <div id="molecules-stat-cards" className="ds-subsection">
              <h3>Stat Cards</h3>
              <div className="row g-3">
                <div className="col-sm-6 col-lg-3">
                  <StatCard label="Portfolio Value" value="$1.24M" delta="4.2% MTD" deltaDirection="up" subtext="As of today, 4:00 PM ET" />
                </div>
                <div className="col-sm-6 col-lg-3">
                  <StatCard label="Unrealized Gain" value="$84,320" delta="7.3% total" deltaDirection="up" subtext="Since inception" />
                </div>
                <div className="col-sm-6 col-lg-3">
                  <StatCard label="Day Change" value="-$2,140" delta="0.17% today" deltaDirection="down" subtext="Market hours only" />
                </div>
                <div className="col-sm-6 col-lg-3">
                  <StatCard label="Dividend Yield" value="2.4%" delta="No change" deltaDirection="flat" subtext="Trailing 12 months" />
                </div>
              </div>
            </div>

            <div id="molecules-search" className="ds-subsection">
              <h3>Search Box</h3>
              <div className="row">
                <div className="col-md-6">
                  <SearchBox placeholder="Search securities, funds, or accounts..." buttonLabel="Search" />
                </div>
              </div>
            </div>

            {/* ── Multi-Select ── */}
            <div id="molecules-multiselect" className="ds-subsection">
              <h3>Multi-Select</h3>
              <p className="text-muted" style={{ fontSize: '0.875rem', maxWidth: 560 }}>
                Dropdown with checkboxes — selected items appear as removable chips inside the field.
                Includes search filtering, clear-all, and accessible keyboard navigation.
              </p>
              <div className="row g-4">
                <div className="col-md-5">
                  <MultiSelect
                    label="Asset Class"
                    placeholder="Select asset classes…"
                    options={[
                      { value: 'eq-us',    label: 'US Equity' },
                      { value: 'eq-intl',  label: 'International Equity' },
                      { value: 'fi-core',  label: 'Core Fixed Income' },
                      { value: 'fi-hi',    label: 'High Yield' },
                      { value: 'alts',     label: 'Alternatives' },
                      { value: 're',       label: 'Real Estate' },
                      { value: 'cash',     label: 'Cash & Equivalents' },
                    ]}
                    helpText="Filter your portfolio view by asset class."
                  />
                </div>
                <div className="col-md-4">
                  <MultiSelect
                    label="Workflow Type"
                    placeholder="All workflows"
                    options={[
                      { value: 'ach',    label: 'ACH Returns' },
                      { value: 'wire',   label: 'Wire Transfers' },
                      { value: 'fx',     label: 'FX Settlement' },
                      { value: 'corp',   label: 'Corporate Actions' },
                      { value: 'recon',  label: 'Reconciliation' },
                    ]}
                  />
                </div>
                <div className="col-md-3">
                  <MultiSelect
                    label="Region (disabled)"
                    placeholder="Select regions…"
                    disabled
                    options={[
                      { value: 'na', label: 'North America' },
                      { value: 'eu', label: 'Europe' },
                      { value: 'apac', label: 'APAC' },
                    ]}
                  />
                </div>
                <div className="col-md-5">
                  <MultiSelect
                    label="Priority (with error)"
                    placeholder="Select priority levels…"
                    error="At least one priority level is required."
                    options={[
                      { value: 'critical', label: 'Critical' },
                      { value: 'high',     label: 'High' },
                      { value: 'medium',   label: 'Medium' },
                      { value: 'low',      label: 'Low' },
                    ]}
                  />
                </div>
              </div>
            </div>

            <div id="molecules-cards" className="ds-subsection">
              <h3>Cards</h3>
              <div className="row g-4">
                {[
                  { title: 'US Large Cap Growth', sub: 'Equity · Actively Managed', badge: 'success' as const, ytd: '+12.4% YTD' },
                  { title: 'Fixed Income Blend',  sub: 'Bond · Multi-Sector',       badge: 'warning' as const, ytd: '+3.1% YTD' },
                  { title: 'Global Equity Fund',  sub: 'Equity · International',    badge: 'danger'  as const, ytd: '-1.8% YTD' },
                ].map((f) => (
                  <div key={f.title} className="col-md-4">
                    <Card title={f.title} subtitle={f.sub} footer={<small className="text-muted">Updated daily</small>}>
                      <p className="card-text text-muted" style={{ fontSize: '0.875rem' }}>
                        Diversified exposure aligned to your investment goals.
                      </p>
                      <div className="d-flex align-items-center justify-content-between">
                        <Badge variant={f.badge}>{f.ytd}</Badge>
                        <Button variant="outline-primary" size="sm">View Fund</Button>
                      </div>
                    </Card>
                  </div>
                ))}
              </div>
            </div>

            {/* ── Charts ── */}
            <div id="molecules-bar-chart" className="ds-subsection">
              <h3>Bar Chart</h3>
              <div className="row g-4">
                <div className="col-md-6">
                  <BarChart
                    title="Monthly Portfolio Returns (%)"
                    data={[
                      { label: 'Jan', value: 2.4 },
                      { label: 'Feb', value: 1.8 },
                      { label: 'Mar', value: -0.6 },
                      { label: 'Apr', value: 3.1 },
                      { label: 'May', value: 2.9 },
                      { label: 'Jun', value: 1.2 },
                    ]}
                  />
                </div>
                <div className="col-md-6">
                  <BarChart
                    title="Task Completion by Week"
                    color="#009FDF"
                    data={[
                      { label: 'Wk 1', value: 18 },
                      { label: 'Wk 2', value: 24 },
                      { label: 'Wk 3', value: 21 },
                      { label: 'Wk 4', value: 30 },
                      { label: 'Wk 5', value: 27 },
                      { label: 'Wk 6', value: 33 },
                    ]}
                  />
                </div>
              </div>
            </div>

            <div id="molecules-stacked-bar" className="ds-subsection">
              <h3>Stacked Bar Chart</h3>
              <div className="row g-4">
                <div className="col-md-8">
                  <StackedBarChart
                    title="Asset Allocation by Quarter"
                    keys={['Equity', 'Fixed Income', 'Alternatives']}
                    data={[
                      { label: 'Q1', Equity: 45, 'Fixed Income': 30, Alternatives: 25 },
                      { label: 'Q2', Equity: 48, 'Fixed Income': 28, Alternatives: 24 },
                      { label: 'Q3', Equity: 42, 'Fixed Income': 32, Alternatives: 26 },
                      { label: 'Q4', Equity: 50, 'Fixed Income': 26, Alternatives: 24 },
                    ]}
                  />
                </div>
              </div>
            </div>

            <div id="molecules-grouped-bar" className="ds-subsection">
              <h3>Grouped Bar Chart</h3>
              <div className="row g-4">
                <div className="col-md-8">
                  <GroupedBarChart
                    title="Revenue vs Expenses vs Profit by Quarter ($M)"
                    keys={['Revenue', 'Expenses', 'Profit']}
                    data={[
                      { label: 'Q1', Revenue: 42, Expenses: 31, Profit: 11 },
                      { label: 'Q2', Revenue: 47, Expenses: 33, Profit: 14 },
                      { label: 'Q3', Revenue: 45, Expenses: 30, Profit: 15 },
                      { label: 'Q4', Revenue: 53, Expenses: 35, Profit: 18 },
                    ]}
                  />
                </div>
              </div>
            </div>

            <div id="molecules-line-chart" className="ds-subsection">
              <h3>Line Chart</h3>
              <div className="row g-4">
                <div className="col-md-8">
                  <LineChart
                    title="Portfolio vs Benchmark Performance (%)"
                    lines={[
                      { key: 'Portfolio', label: 'Portfolio' },
                      { key: 'Benchmark', label: 'Benchmark', color: '#009FDF' },
                    ]}
                    data={[
                      { label: 'Jan', Portfolio: 2.4, Benchmark: 1.9 },
                      { label: 'Feb', Portfolio: 4.1, Benchmark: 3.5 },
                      { label: 'Mar', Portfolio: 3.6, Benchmark: 3.8 },
                      { label: 'Apr', Portfolio: 6.5, Benchmark: 5.2 },
                      { label: 'May', Portfolio: 9.2, Benchmark: 7.8 },
                      { label: 'Jun', Portfolio: 10.3, Benchmark: 9.1 },
                    ]}
                  />
                </div>
              </div>
            </div>

            <div id="molecules-burnup-chart" className="ds-subsection">
              <h3>Burn-up Chart</h3>
              <div className="row g-4">
                <div className="col-md-8">
                  <BurnUpChart
                    title="Sprint Delivery — Completed vs Total Scope"
                    data={[
                      { label: 'Sprint 1', completed: 8,  scope: 40 },
                      { label: 'Sprint 2', completed: 16, scope: 40 },
                      { label: 'Sprint 3', completed: 22, scope: 42 },
                      { label: 'Sprint 4', completed: 29, scope: 42 },
                      { label: 'Sprint 5', completed: 34, scope: 45 },
                      { label: 'Sprint 6', completed: 38, scope: 45 },
                      { label: 'Sprint 7', completed: 42, scope: 45 },
                      { label: 'Sprint 8', completed: 45, scope: 45 },
                    ]}
                  />
                </div>
              </div>
            </div>

            <div id="molecules-donut-chart" className="ds-subsection">
              <h3>Donut Chart</h3>
              <div className="row g-4">
                <div className="col-md-5">
                  <DonutChart
                    title="Asset Allocation"
                    data={[
                      { label: 'US Equity',    value: 45 },
                      { label: "Int'l Equity", value: 20 },
                      { label: 'Fixed Income', value: 25 },
                      { label: 'Alternatives', value: 7  },
                      { label: 'Cash',         value: 3  },
                    ]}
                  />
                </div>
              </div>
            </div>

            <div id="molecules-lollipop-chart" className="ds-subsection">
              <h3>Lollipop Chart</h3>
              <div className="row g-4">
                <div className="col-md-6">
                  <LollipopChart
                    title="Monthly Portfolio Returns (%)"
                    data={[
                      { label: 'Jan', value: 2.4 },
                      { label: 'Feb', value: 1.8 },
                      { label: 'Mar', value: 0.6 },
                      { label: 'Apr', value: 3.1 },
                      { label: 'May', value: 2.9 },
                      { label: 'Jun', value: 1.2 },
                    ]}
                  />
                </div>
                <div className="col-md-6">
                  <LollipopChart
                    title="Risk Score by Workflow"
                    color="#C52034"
                    data={[
                      { label: 'ACH',    value: 87 },
                      { label: 'Wire',   value: 72 },
                      { label: 'FX',     value: 68 },
                      { label: 'Acct',   value: 45 },
                      { label: 'Recon',  value: 23 },
                    ]}
                  />
                </div>
              </div>
            </div>

          </section>


          {/* ══════════════════════════════════════════════════════════════
              ORGANISMS
          ══════════════════════════════════════════════════════════════ */}
          <section id="organisms" className="ds-section">
            <p className="ds-level-label">Level 3</p>
            <h2 className="ds-section-title">Organisms</h2>
            <p className="ds-section-desc">
              Complex, self-contained sections composed of molecules and atoms — navbars,
              hero banners, and data dashboards.
            </p>

            <div id="organisms-nav" className="ds-subsection">
              <h3>Site Navigation</h3>
              <SiteNav />
            </div>

            <div id="organisms-metrics" className="ds-subsection">
              <h3>Key Metrics Row</h3>
              <StatsRow />
            </div>

            <div id="organisms-fund-grid" className="ds-subsection">
              <h3>Fund Grid</h3>
              <div className="row g-4">
                {[
                  { name: 'Institutional Core Equity', type: 'Equity',       ytd: '+14.2%', risk: 'Moderate', badge: 'success'  as const },
                  { name: 'Short Duration Bond',        type: 'Fixed Income', ytd: '+2.8%',  risk: 'Low',      badge: 'info'     as const },
                  { name: 'Emerging Markets Opp.',      type: 'Equity',       ytd: '-3.4%',  risk: 'High',     badge: 'danger'   as const },
                  { name: 'Real Assets Portfolio',      type: 'Alternatives', ytd: '+6.1%',  risk: 'Moderate', badge: 'warning'  as const },
                ].map((fund) => (
                  <div key={fund.name} className="col-sm-6 col-xl-3">
                    <Card title={fund.name} subtitle={fund.type}>
                      <div className="d-flex justify-content-between align-items-center mb-3">
                        <Badge variant={fund.badge}>{fund.ytd} YTD</Badge>
                        <span style={{ fontSize: '0.75rem', color: '#757D8E' }}>Risk: {fund.risk}</span>
                      </div>
                      <Button variant="primary" size="sm" className="w-100">Invest Now</Button>
                    </Card>
                  </div>
                ))}
              </div>
            </div>
          </section>


          {/* ══════════════════════════════════════════════════════════════
              TEMPLATES
          ══════════════════════════════════════════════════════════════ */}
          <section id="templates" className="ds-section">
            <p className="ds-level-label">Level 4</p>
            <h2 className="ds-section-title">Templates</h2>
            <p className="ds-section-desc">
              Page-level layout scaffolds that define where organisms, molecules, and atoms
              sit in relation to each other.
            </p>

            <div id="templates-dashboard" className="ds-subsection">
              <h3>Wealth Dashboard</h3>

              {/* Template preview — rendered at reduced scale inside a border */}
              <div style={{ border: '1px solid #D7DDE0', borderRadius: '2px', overflow: 'hidden' }}>
                <SiteNav links={[
                  { label: 'Overview',   href: '#', active: true },
                  { label: 'Portfolio',  href: '#' },
                  { label: 'Markets',    href: '#' },
                  { label: 'Documents',  href: '#' },
                ]} />

                <HeroBanner
                  eyebrow="Wealth Management"
                  title="Your Portfolio, Powered by Insight."
                  body="Real-time data, personalized guidance, and institutional-grade research — all in one place."
                  primaryCta="View Portfolio"
                  secondaryCta="Talk to an Advisor"
                />

                <div style={{ padding: '2.5rem 2rem', background: '#fff' }}>
                  <StatsRow />
                </div>

                <div style={{ background: '#F4F6F7', padding: '2rem' }}>
                  <div className="d-flex justify-content-between align-items-baseline mb-4">
                    <h2 style={{ fontSize: '1.125rem', fontWeight: 700, color: '#001E3C', margin: 0 }}>
                      Recommended Funds
                    </h2>
                    <a href="#" style={{ fontSize: '0.8125rem', color: '#001FA0', fontWeight: 600, textDecoration: 'none' }}>
                      View all →
                    </a>
                  </div>
                  <div className="row g-3">
                    {[
                      { name: 'US Large Cap Growth', type: 'Equity',       ytd: '+12.4%', badge: 'success' as const },
                      { name: 'Fixed Income Blend',  type: 'Fixed Income', ytd: '+3.1%',  badge: 'warning' as const },
                      { name: 'Global Equity Fund',  type: 'International',ytd: '-1.8%',  badge: 'danger'  as const },
                    ].map((fund) => (
                      <div key={fund.name} className="col-md-4">
                        <Card title={fund.name} subtitle={fund.type}>
                          <div className="d-flex justify-content-between align-items-center">
                            <Badge variant={fund.badge}>{fund.ytd} YTD</Badge>
                            <Button variant="outline-primary" size="sm">Details</Button>
                          </div>
                        </Card>
                      </div>
                    ))}
                  </div>
                </div>

                <footer style={{ background: '#001E3C', color: 'rgba(255,255,255,0.55)', padding: '1.5rem 2rem' }}>
                  <div className="d-flex flex-wrap justify-content-between align-items-center gap-2">
                    <span style={{ fontWeight: 700, color: '#fff', fontSize: '0.875rem' }}>Morgan Stanley</span>
                    <div>
                      {['Privacy', 'Terms', 'Disclosures', 'Accessibility'].map((link) => (
                        <a key={link} href="#" style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.75rem', marginLeft: '1.5rem', textDecoration: 'none' }}>
                          {link}
                        </a>
                      ))}
                    </div>
                  </div>
                </footer>
              </div>
            </div>
          </section>

          {/* ══════════════════════════════════════════════════════════════
              LEVEL 5 — Dashboard Pages
          ══════════════════════════════════════════════════════════════ */}
          <section id="dashboard-pages" className="ds-section">
            <p className="ds-level-label">Level 5</p>
            <h2 className="ds-section-title">Dashboard Pages</h2>
            <p className="ds-section-desc">
              Fully assembled operational dashboards composed from organisms, molecules, and atoms —
              delivering rule-based pod intelligence for operations managers.
            </p>

            {/* Dashboard version cards */}
            <div className="row g-4 mb-4">
              <div className="col-md-6">
                <div className="ds-dashboard-card">
                  <div className="ds-dashboard-card__badge">V1</div>
                  <h3 className="ds-dashboard-card__title">Pod Manager Dashboard V1</h3>
                  <p className="ds-dashboard-card__desc">
                    Operational command center for pod managers. Covers sticky header, filter bar,
                    KPI scorecards, pod summary, pod health, workflow risk, priority work queue,
                    and workload balance. Rule-based signals, read-only view.
                  </p>
                  <div className="ds-dashboard-card__meta">
                    <span>8 sections</span>
                    <span>·</span>
                    <span>18 mock work items</span>
                    <span>·</span>
                    <span>7 pod members</span>
                  </div>
                  <a
                    href="/frontend-design/POD_Manager_Dashboard_V1"
                    className="btn btn-primary btn-sm"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Open V1 ↗
                  </a>
                </div>
              </div>

              <div className="col-md-6">
                <div className="ds-dashboard-card ds-dashboard-card--v2">
                  <div className="ds-dashboard-card__badge ds-dashboard-card__badge--v2">V2</div>
                  <h3 className="ds-dashboard-card__title">Pod Manager Dashboard V2</h3>
                  <p className="ds-dashboard-card__desc">
                    Analytics-first redesign based on the Figma V2 spec. Adds tasks by duration
                    flag, category trend lines, open tasks per date, top task type table, pod
                    workload distribution, and top requestors — with region/pod multi-select filters.
                  </p>
                  <div className="ds-dashboard-card__meta">
                    <span>9 sections</span>
                    <span>·</span>
                    <span>7 new widgets</span>
                    <span>·</span>
                    <span>Multi-select filters</span>
                  </div>
                  <a
                    href="/frontend-design/POD_Manager_Dashboard_V2"
                    className="btn btn-primary btn-sm"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Open V2 ↗
                  </a>
                </div>
              </div>
            </div>

            <div id="dashboard-header" className="ds-subsection" style={{ display: 'none' }} />

            <DashboardShowcase />
          </section>

        </main>
      </div>
    </div>
  )
}
