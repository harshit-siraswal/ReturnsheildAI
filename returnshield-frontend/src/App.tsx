import { useMemo, useState } from 'react'
import {
  ArrowUpRight,
  Bell,
  CaretDown,
  ChartLineUp,
  Check,
  Clock,
  FadersHorizontal,
  FileArrowDown,
  Funnel,
  House,
  ListChecks,
  MapPin,
  Package,
  ShieldCheck,
  Sparkle,
  TrendDown,
  Warning,
  X,
} from '@phosphor-icons/react'

import './App.css'
import {
  Layout,
  Main,
  Sidebar,
  Topbar,
  PageHeading,
  Card,
  CardContent,
  CardHeader,
  CardKicker,
  CardTitle,
  Button,
  Badge,
} from './components'
import { MetricCard, ActionStack } from './components/dashboard'

type Order = {
  id: string
  customer: string
  product: string
  category: string
  risk: number
  loss: string
  driver: string
  action: string
  priority: 'P0' | 'P1' | 'P2'
  status: string
}

const orders: Order[] = [
  {
    id: '#RS-18492',
    customer: 'Aarav Mehta',
    product: 'Pulse air purifier',
    category: 'Home essentials',
    risk: 91,
    loss: 'INR 7,840',
    driver: '3 returns in 90 days',
    action: 'Verify by OTP',
    priority: 'P0',
    status: 'New',
  },
  {
    id: '#RS-18484',
    customer: 'Maya Srinivasan',
    product: 'Arc glass kettle',
    category: 'Kitchen',
    risk: 86,
    loss: 'INR 4,220',
    driver: 'Fragile SKU + carrier delay',
    action: 'Quality inspection',
    priority: 'P0',
    status: 'Assigned',
  },
  {
    id: '#RS-18475',
    customer: 'Rohan Kapoor',
    product: 'Trail runner v2',
    category: 'Footwear',
    risk: 79,
    loss: 'INR 3,990',
    driver: 'Size exchange pattern',
    action: 'Offer exchange first',
    priority: 'P1',
    status: 'New',
  },
  {
    id: '#RS-18451',
    customer: 'Isha Verma',
    product: 'Cove carry-on case',
    category: 'Travel',
    risk: 72,
    loss: 'INR 3,450',
    driver: 'COD + delivery change',
    action: 'Confirm delivery',
    priority: 'P1',
    status: 'New',
  },
]

const trendValues = [39, 35, 42, 37, 48, 54, 45, 61, 57, 70, 67, 81]

function chartPoints(values: number[]) {
  const max = Math.max(...values)
  const min = Math.min(...values)
  const range = max - min || 1
  return values
    .map((value, index) => {
      const x = 16 + (index * 640) / (values.length - 1)
      const y = 158 - ((value - min) / range) * 112
      return `${x},${y}`
    })
    .join(' ')
}

function App() {
  const [activeNav, setActiveNav] = useState('Overview')
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [isActioned, setIsActioned] = useState(false)
  const points = useMemo(() => chartPoints(trendValues), [])

  const openOrder = (order: Order) => {
    setSelectedOrder(order)
    setIsActioned(false)
    setIsDrawerOpen(true)
  }

  const goToQueue = () => {
    setActiveNav('Risk queue')
    document.getElementById('risk-queue')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <Layout>
      <Sidebar
        activeNav={activeNav}
        onNavClick={setActiveNav}
        navItems={[
          { label: 'Overview', icon: <House size={18} weight="light" />, action: () => setActiveNav('Overview') },
          { label: 'Risk queue', icon: <ListChecks size={18} weight="light" />, count: '93', action: () => setActiveNav('Risk queue') },
          { label: 'Orders', icon: <Package size={18} weight="light" />, action: () => setActiveNav('Orders') },
          { label: 'Analytics', icon: <ChartLineUp size={18} weight="light" />, action: () => setActiveNav('Analytics') },
          { label: 'Policies', icon: <FadersHorizontal size={18} weight="light" />, action: () => setActiveNav('Policies') },
          { label: 'Model health', icon: <ShieldCheck size={18} weight="light" />, action: () => setActiveNav('Model health') },
        ]}
      />

      <Main>
        <div className="mobile-bar">
          <a className="brand" href="#overview">
            <span className="brand-mark" aria-hidden="true"><span></span><span></span><span></span></span>
            <span>ReturnShield</span>
          </a>
          <button className="icon-button" type="button" aria-label="Notifications">
            <Bell size={19} weight="light" />
          </button>
        </div>

        <Topbar breadcrumbs={['Northstar Retail', activeNav]} />

        <PageHeading
          eyebrow={<><Sparkle size={13} weight="light" /> Decision intelligence</>}
          title="Revenue under protection."
          description="Live risk signals across your order flow. Focus the team where a small intervention can prevent the largest loss."
          actions={
            <div className="heading-actions">
              <Button variant="quiet" size="md">
                1 - 30 July 2026 <CaretDown size={15} weight="light" />
              </Button>
              <Button variant="secondary" size="md">
                <FileArrowDown size={17} weight="light" /> Export
              </Button>
            </div>
          }
        />

        <section className="metric-grid" aria-label="Portfolio risk metrics">
          <MetricCard label="Revenue at risk" value="INR 12.84L" delta="12.6%" detail="vs. previous 30 days" type="risk" />
          <MetricCard label="Critical orders" value="93" delta="18 today" detail="require action before dispatch" type="critical" />
          <MetricCard label="Return rate" value="14.8%" delta="2.4 pts" detail="above category baseline" type="return" />
          <MetricCard label="Loss prevented" value="INR 2.37L" delta="82 actions" detail="validated this month" type="success" />
        </section>

        <section className="dashboard-grid">
          <Card className="trend-card">
            <CardContent className="!p-[22px]">
              <CardHeader className="!mb-0">
                <div>
                  <CardKicker>Portfolio exposure</CardKicker>
                  <CardTitle>Loss at risk</CardTitle>
                </div>
                <Button variant="quiet" size="sm">Last 12 weeks <CaretDown size={14} weight="light" /></Button>
              </CardHeader>
              <div className="chart-summary">
                <strong>INR 12.84L</strong>
                <span><TrendDown size={16} weight="light" /> 12.6% more than last period</span>
              </div>
              <div className="risk-chart" role="img" aria-label="Weekly loss at risk has increased from INR 6.7 lakh to INR 12.84 lakh over twelve weeks">
                <div className="chart-gridline line-one"></div>
                <div className="chart-gridline line-two"></div>
                <div className="chart-gridline line-three"></div>
                <svg viewBox="0 0 672 188" preserveAspectRatio="none" aria-hidden="true">
                  <defs>
                    <linearGradient id="risk-fill" x1="0" x2="0" y1="0" y2="1">
                      <stop offset="0%" stopColor="#f3ad62" stopOpacity="0.28" />
                      <stop offset="100%" stopColor="#f3ad62" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <polygon points={`16,172 ${points} 656,172`} fill="url(#risk-fill)" />
                  <polyline points={points} fill="none" stroke="#f4b369" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
                  <circle cx="656" cy="46" r="4.5" fill="#101928" stroke="#f4b369" strokeWidth="2.4" />
                </svg>
                <div className="chart-annotation"><span>INR 12.84L</span><small>Current exposure</small></div>
              </div>
              <div className="chart-axis" aria-hidden="true"><span>06 May</span><span>20 May</span><span>03 Jun</span><span>17 Jun</span><span>01 Jul</span><span>15 Jul</span></div>
            </CardContent>
          </Card>

          <ActionStack onViewAll={goToQueue} onActionClick={goToQueue} />
        </section>

        <section className="queue-section" id="risk-queue">
          <div className="section-heading">
            <div>
              <div className="eyebrow"><Warning size={13} weight="light" /> Priority workbench</div>
              <h2>Orders that need a decision</h2>
              <p>Ranked by expected financial loss and the time remaining to intervene.</p>
            </div>
            <div className="queue-actions">
              <Button variant="secondary" size="md"><Funnel size={16} weight="light" /> Filters <span>3</span></Button>
              <Button variant="primary" size="md" onClick={() => openOrder(orders[0])}>
                Review highest risk <span><ArrowUpRight size={16} weight="light" /></span>
              </Button>
            </div>
          </div>

          <Card className="queue-bezel">
            <CardContent className="!p-0">
              <div className="queue-meta"><span>Showing 4 of 93 priority orders</span><button type="button">Sort: Expected loss <CaretDown size={14} weight="light" /></button></div>
              <div className="queue-table-wrap">
                <table>
                  <thead><tr><th>Priority</th><th>Order</th><th>Return risk</th><th>Potential loss</th><th>Why now</th><th>Recommended action</th><th></th></tr></thead>
                  <tbody>
                    {orders.map((order) => (
                      <tr key={order.id} onClick={() => openOrder(order)}>
                        <td><Badge variant="priority" priority={order.priority.toLowerCase() as any}>{order.priority}</Badge></td>
                        <td><strong>{order.id}</strong><small>{order.customer} · {order.category}</small></td>
                        <td><span className={`risk-score ${order.risk > 85 ? 'critical' : ''}`}>{order.risk}<small>/100</small></span></td>
                        <td><strong>{order.loss}</strong><small>{order.product}</small></td>
                        <td><Badge variant="reason">{order.driver}</Badge></td>
                        <td><Badge variant="action"><ShieldCheck size={14} weight="light" /> {order.action}</Badge></td>
                        <td><button className="row-open" type="button" onClick={(event) => { event.stopPropagation(); openOrder(order) }} aria-label={`Open ${order.id}`}><ArrowUpRight size={17} weight="light" /></button></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <button className="queue-footer" type="button" onClick={goToQueue}>Open full risk queue <ArrowUpRight size={16} weight="light" /></button>
            </CardContent>
          </Card>
        </section>

        <section className="insight-grid">
          <Card className="insights-card">
            <CardContent>
              <CardHeader className="!mb-0">
                <div>
                  <CardKicker>Primary drivers</CardKicker>
                  <CardTitle>Why returns are rising</CardTitle>
                </div>
                <Button variant="quiet" size="sm">High-risk cohort <CaretDown size={14} weight="light" /></Button>
              </CardHeader>
              <div className="driver-list">
                <Driver label="Previous customer returns" value="36%" width="86%" tone="teal" />
                <Driver label="Delivery delay over 2 days" value="28%" width="67%" tone="amber" />
                <Driver label="COD payment method" value="21%" width="51%" tone="blue" />
                <Driver label="Fragile product category" value="15%" width="36%" tone="slate" />
              </div>
              <p className="source-note">Based on local explanations across 1,248 high-risk orders.</p>
            </CardContent>
          </Card>

          <Card className="insights-card region-card">
            <CardContent>
              <CardHeader className="!mb-0 !gap-4"><div><CardKicker>Exposure map</CardKicker><CardTitle>Where loss is concentrated</CardTitle></div><MapPin size={21} weight="light" /></CardHeader>
              <div className="region-orbit" aria-hidden="true"><span className="orb orb-one"></span><span className="orb orb-two"></span><span className="orb orb-three"></span><span className="map-node node-one"></span><span className="map-node node-two"></span><span className="map-node node-three"></span><span className="map-node node-four"></span></div>
              <div className="region-list"><span><b>01</b> Maharashtra <strong>INR 3.21L</strong></span><span><b>02</b> Karnataka <strong>INR 2.84L</strong></span><span><b>03</b> Delhi NCR <strong>INR 2.11L</strong></span></div>
            </CardContent>
          </Card>
        </section>
      </Main>

      {isDrawerOpen && selectedOrder && (
        <div className="drawer-layer" role="presentation" onMouseDown={() => setIsDrawerOpen(false)}>
          <aside className="order-drawer" role="dialog" aria-modal="true" aria-labelledby="drawer-title" onMouseDown={(event) => event.stopPropagation()}>
            <div className="drawer-topline"><span className="drawer-handle"></span></div>
            <div className="drawer-heading">
              <div><Badge variant="priority" priority="p0">{selectedOrder.priority} intervention</Badge><h2 id="drawer-title">{selectedOrder.id}</h2><p>{selectedOrder.customer} · {selectedOrder.product}</p></div>
              <button className="icon-button" type="button" onClick={() => setIsDrawerOpen(false)} aria-label="Close order detail"><X size={19} weight="light" /></button>
            </div>
            <div className="drawer-metrics">
              <div><small>Return probability</small><strong>{selectedOrder.risk}%</strong><span>Critical risk</span></div>
              <div><small>Estimated loss</small><strong>{selectedOrder.loss}</strong><span>Before recovery</span></div>
            </div>
            <section className="drawer-section">
              <div className="drawer-section-title"><span>Why the model flagged this</span><button type="button">View model context</button></div>
              <div className="factor-card"><span className="factor-index">01</span><div><strong>{selectedOrder.driver}</strong><small>Strongest contributor to this order's return probability.</small></div><b>+24 pts</b></div>
              <div className="factor-card"><span className="factor-index">02</span><div><strong>Cash on Delivery</strong><small>High-risk payment pattern for this category.</small></div><b>+17 pts</b></div>
              <div className="factor-card"><span className="factor-index">03</span><div><strong>Delivery promise changed</strong><small>ETA has moved by more than 24 hours.</small></div><b>+12 pts</b></div>
            </section>
            <section className="recommended-panel">
              <div className="recommended-caption"><ShieldCheck size={17} weight="light" /> Recommended intervention</div>
              <h3>{selectedOrder.action}</h3>
              <p>{isActioned ? 'Action has been assigned to the delivery verification team.' : 'Expected to prevent INR 3,120 of loss while keeping the customer experience low-friction.'}</p>
              <Button variant="primary" className="w-full !justify-between !py-2" onClick={() => setIsActioned(true)} disabled={isActioned}>
                {isActioned ? <><Check size={18} weight="light" /> Action assigned</> : <>Apply intervention <span><ArrowUpRight size={16} weight="light" /></span></>}
              </Button>
              <button className="secondary-action" type="button">Choose an alternative</button>
            </section>
            <div className="audit-line"><Clock size={15} weight="light" /> Scored 4 minutes ago · Model v2.4</div>
          </aside>
        </div>
      )}
    </Layout>
  )
}

function Driver({ label, value, width, tone }: { label: string; value: string; width: string; tone: string }) {
  return <div className="driver-row"><div><span>{label}</span><strong>{value}</strong></div><div className="driver-track"><span className={tone} style={{ width }}></span></div></div>
}

export default App
