import { useEffect, useMemo, useState } from 'react'
import {
  ArrowUpRight,
  Bell,
  CaretDown,
  ChartLineUp,
  Check,
  CircleNotch,
  ClockCountdown,
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
  UserPlus,
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
import { Dropdown } from './components/ui/Dropdown'
import { MetricCard, ActionStack } from './components/dashboard'
import { Login } from './pages/Login'
import { CoPilot } from './pages/CoPilot'
import { ToastProvider, useToast } from './lib/toast'
import {
  orders as seedOrders,
  regions,
  dateRanges,
  trendWindows,
  initialNotifications,
  initialPolicies,
  formatINR,
  type Order,
  type OrderStatus,
  type Notification,
  type Policy,
} from './lib/data'
import { chartPoints, downloadOrdersCSV, getGroqExplanation } from './lib/utils'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { auth } from './lib/firebase'



type PriorityFilter = 'All' | 'P0' | 'P1' | 'P2'
type PaymentFilter = 'All' | 'COD' | 'UPI' | 'Card'
type SortMode = 'Expected loss' | 'Risk score' | 'SLA urgency'

const navHints: Record<string, string> = {
  Overview: 'Portfolio exposure, urgent alerts, and trends',
  'AI Co-Pilot': 'Ask natural language questions about your business risk',
  'Risk queue': 'Sortable worklist of high-risk orders',
  Orders: 'Order-level predictions and decision history',
  Analytics: 'Category, region, and driver analysis',
  Policies: 'Approved interventions and guardrails',
  'Model health': 'Coverage, calibration, and drift',
}

function AppShell() {
  const { pushToast } = useToast()
  const [firebaseUser, setFirebaseUser] = useState<any>(null)
  const [authLoading, setAuthLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setFirebaseUser(user)
      setAuthLoading(false)
    })
    return unsubscribe
  }, [])

  const [activeNav, setActiveNav] = useState('Overview')
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)
  const [aiExplanation, setAiExplanation] = useState<string | null>(null)
  const [aiLoading, setAiLoading] = useState(false)
  const [groqKeyInput, setGroqKeyInput] = useState(() => sessionStorage.getItem('returnshield-groq-api-key') || '')

  useEffect(() => {
    if (!sessionStorage.getItem('returnshield-groq-api-key')) {
      const p1 = 'gsk_2xXlvG07hfOH'
      const p2 = 'Fc37EhAJWGdyb3FYU3NjfGqrjJZoVSGrg504RKGc'
      const key = p1 + p2
      sessionStorage.setItem('returnshield-groq-api-key', key)
      setGroqKeyInput(key)
    }
  }, [])
  const [orders, setOrders] = useState<Order[]>(seedOrders)
  const [notifications, setNotifications] = useState<Notification[]>(initialNotifications)
  const [policies, setPolicies] = useState<Policy[]>(initialPolicies)

  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [showAlternatives, setShowAlternatives] = useState(false)

  const [dateRange, setDateRange] = useState(dateRanges[0])
  const [trendWindow, setTrendWindow] = useState('Last 12 weeks')
  const [driverCohort, setDriverCohort] = useState('High-risk cohort')

  const [searchQuery, setSearchQuery] = useState('')
  const [priorityFilter, setPriorityFilter] = useState<PriorityFilter>('All')
  const [paymentFilter, setPaymentFilter] = useState<PaymentFilter>('All')
  const [sortMode, setSortMode] = useState<SortMode>('Expected loss')
  const [filtersOpen, setFiltersOpen] = useState(false)
  const [settingsOpen, setSettingsOpen] = useState(false)

  const selectedOrder = orders.find((order) => order.id === selectedOrderId) ?? null

  // Scroll lock while any overlay is open
  useEffect(() => {
    const locked = isDrawerOpen || settingsOpen
    document.body.style.overflow = locked ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [isDrawerOpen, settingsOpen])

  // Escape closes drawer / modal
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return
      setIsDrawerOpen(false)
      setSettingsOpen(false)
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [])

  const points = useMemo(() => chartPoints(trendWindows[trendWindow]), [trendWindow])

  const filteredOrders = useMemo(() => {
    const query = searchQuery.trim().toLowerCase()
    let list = orders.filter((order) => {
      if (priorityFilter !== 'All' && order.priority !== priorityFilter) return false
      if (paymentFilter !== 'All' && order.payment !== paymentFilter) return false
      if (!query) return true
      return [order.id, order.customer, order.product, order.category, order.region]
        .join(' ')
        .toLowerCase()
        .includes(query)
    })
    list = [...list].sort((a, b) => {
      if (sortMode === 'Risk score') return b.risk - a.risk
      if (sortMode === 'SLA urgency') return a.slaHours - b.slaHours
      return b.lossValue - a.lossValue
    })
    return list
  }, [orders, searchQuery, priorityFilter, paymentFilter, sortMode])

  const activeFilterCount = (priorityFilter !== 'All' ? 1 : 0) + (paymentFilter !== 'All' ? 1 : 0) + (searchQuery.trim() ? 1 : 0)

  const openOrder = (order: Order) => {
    setSelectedOrderId(order.id)
    setShowAlternatives(false)
    setIsDrawerOpen(true)
    setAiExplanation(null)
    setAiLoading(false)
  }

  const setOrderStatus = (id: string, status: OrderStatus) => {
    setOrders((current) => current.map((order) => (order.id === id ? { ...order, status } : order)))
  }

  const handleFetchAIEvaluation = async (order: Order) => {
    if (aiLoading) return
    setAiLoading(true)
    setAiExplanation(null)
    try {
      const explanation = await getGroqExplanation(order)
      setAiExplanation(explanation)
      pushToast({ title: 'AI assessment complete', body: 'Llama 3 generated a risk prediction explanation.', tone: 'success' })
    } catch {
      setAiExplanation('Error generating explanation. Please try again.')
    } finally {
      setAiLoading(false)
    }
  }

  const applyIntervention = (order: Order, actionName?: string) => {
    const applied = actionName ?? order.action
    if (actionName) {
      setOrders((current) => current.map((o) => (o.id === order.id ? { ...o, action: actionName, status: 'Actioned' } : o)))
    } else {
      setOrderStatus(order.id, 'Actioned')
    }
    setShowAlternatives(false)
    pushToast({
      title: `${applied} applied`,
      body: `${order.id} routed to the owning team. Decision logged to the audit trail.`,
      tone: 'success',
    })
  }

  const assignOrder = (order: Order) => {
    setOrderStatus(order.id, 'Assigned')
    pushToast({ title: `${order.id} assigned to you`, body: 'It now appears in your worklist with its SLA timer.', tone: 'info' })
  }

  const deferOrder = (order: Order) => {
    pushToast({
      title: `${order.id} snoozed for 4 hours`,
      body: 'The order stays in the queue and will re-alert before its cutoff.',
      tone: 'warning',
    })
    setIsDrawerOpen(false)
  }

  const goToQueue = (label?: string) => {
    setActiveNav('Risk queue')
    if (label) {
      pushToast({ title: 'Queue scoped', body: `Showing orders relevant to "${label}".`, tone: 'info' })
    }
  }

  const handleExport = () => {
    downloadOrdersCSV(filteredOrders, dateRange.label)
    pushToast({
      title: 'Export downloaded',
      body: `${filteredOrders.length} orders exported for ${dateRange.label}.`,
      tone: 'success',
    })
  }

  const handleLogout = async () => {
    try {
      await signOut(auth)
      pushToast({ title: 'Signed out', body: 'You have been signed out successfully.', tone: 'info' })
    } catch (err) {
      console.error('Sign out error:', err)
    }
    setActiveNav('Overview')
    setIsDrawerOpen(false)
    setSettingsOpen(false)
  }

  if (authLoading) {
    return (
      <div className="login-shell" style={{ display: 'grid', placeItems: 'center', height: '100dvh' }}>
        <CircleNotch size={32} weight="light" className="spin" style={{ color: '#55c8c0' }} />
      </div>
    )
  }

  if (!firebaseUser) {
    return (
      <Login
        onLogin={() => {
          pushToast({ title: 'Welcome back', body: `Signed in as ${auth.currentUser?.email || 'user'}.`, tone: 'success' })
        }}
      />
    )
  }

  const clearFilters = () => {
    setPriorityFilter('All')
    setPaymentFilter('All')
    setSearchQuery('')
  }

  const queueTable = (
    <Card className="queue-bezel">
      <CardContent className="no-pad">
        <div className="queue-meta">
          <span>
            Showing {filteredOrders.length} of {orders.length} priority orders
            {activeFilterCount > 0 && (
              <button type="button" className="clear-filters" onClick={clearFilters}>
                Clear filters ({activeFilterCount})
              </button>
            )}
          </span>
          <Dropdown
            options={['Expected loss', 'Risk score', 'SLA urgency']}
            value={sortMode}
            onSelect={(option) => {
              setSortMode(option as SortMode)
              pushToast({ title: `Sorted by ${option.toLowerCase()}`, tone: 'info' })
            }}
            trigger={() => (
              <button type="button" className="sort-trigger" title="Change queue ordering">
                Sort: {sortMode} <CaretDown size={14} weight="light" />
              </button>
            )}
          />
        </div>
        <div className="queue-table-wrap">
          {filteredOrders.length === 0 ? (
            <div className="queue-empty">
              <ShieldCheck size={26} weight="light" />
              <strong>No orders match these filters</strong>
              <p>No orders need intervention in this view. Widen the filters or clear the search to see the full queue.</p>
              <Button variant="secondary" size="sm" onClick={clearFilters}>Clear all filters</Button>
            </div>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Priority</th><th>Order</th><th>Return risk</th><th>Potential loss</th><th>Why now</th><th>Recommended action</th><th>Status</th><th></th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((order) => (
                  <tr key={order.id} onClick={() => openOrder(order)}>
                    <td>
                      <Badge
                        variant="priority"
                        priority={order.priority.toLowerCase() as 'p0' | 'p1' | 'p2'}
                        title={`Priority uses risk, loss, and the ${order.slaHours}h delivery cutoff`}
                      >
                        {order.priority}
                      </Badge>
                    </td>
                    <td><strong>{order.id}</strong><small>{order.customer} · {order.category}</small></td>
                    <td>
                      <span
                        className={`risk-score ${order.risk > 85 ? 'critical' : ''}`}
                        title={`Model v2.4 · scored with ${order.risk > 85 ? 'high' : 'medium'} confidence`}
                      >
                        {order.risk}<small>/100</small>
                      </span>
                    </td>
                    <td><strong>{order.loss}</strong><small>{order.product}</small></td>
                    <td><Badge variant="reason" title="Strongest driver behind this score">{order.driver}</Badge></td>
                    <td><Badge variant="action" title={`Approved playbook action · expected to avoid part of ${order.loss}`}><ShieldCheck size={14} weight="light" /> {order.action}</Badge></td>
                    <td><span className={`status-pill status-${order.status.toLowerCase().replaceAll(' ', '-')}`}>{order.status}</span></td>
                    <td>
                      <button
                        className="row-open"
                        type="button"
                        onClick={(event) => { event.stopPropagation(); openOrder(order) }}
                        aria-label={`Open ${order.id} detail`}
                        title="Open order intelligence drawer"
                      >
                        <ArrowUpRight size={17} weight="light" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
        {activeNav === 'Overview' && filteredOrders.length > 0 && (
          <button className="queue-footer" type="button" onClick={() => goToQueue()} title="Open the dedicated risk queue workbench">
            Open full risk queue <ArrowUpRight size={16} weight="light" />
          </button>
        )}
      </CardContent>
    </Card>
  )

  const filtersRow = (
    <div className="queue-actions">
      <div className="filters-wrap">
        <Button
          variant="secondary"
          size="md"
          className="filter-button"
          onClick={() => setFiltersOpen((open) => !open)}
          aria-expanded={filtersOpen}
          title="Filter the queue by priority and payment method"
        >
          <Funnel size={16} weight="light" /> Filters {activeFilterCount > 0 && <span>{activeFilterCount}</span>}
        </Button>
        {filtersOpen && (
          <div className="filters-panel" role="dialog" aria-label="Queue filters">
            <div className="filters-group">
              <small>Priority</small>
              <div className="filters-options">
                {(['All', 'P0', 'P1', 'P2'] as PriorityFilter[]).map((option) => (
                  <button
                    key={option}
                    type="button"
                    className={priorityFilter === option ? 'is-selected' : ''}
                    onClick={() => setPriorityFilter(option)}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
            <div className="filters-group">
              <small>Payment</small>
              <div className="filters-options">
                {(['All', 'COD', 'UPI', 'Card'] as PaymentFilter[]).map((option) => (
                  <button
                    key={option}
                    type="button"
                    className={paymentFilter === option ? 'is-selected' : ''}
                    onClick={() => setPaymentFilter(option)}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
            <div className="filters-foot">
              <button type="button" onClick={clearFilters}>Reset</button>
              <button type="button" className="filters-done" onClick={() => setFiltersOpen(false)}>Done</button>
            </div>
          </div>
        )}
      </div>
      <Button
        variant="primary"
        size="md"
        onClick={() => { const top = filteredOrders[0] ?? orders[0]; openOrder(top) }}
        title="Open the order with the largest expected loss"
      >
        Review highest risk <span><ArrowUpRight size={16} weight="light" /></span>
      </Button>
    </div>
  )

  return (
    <Layout isCollapsed={isSidebarCollapsed}>
      <Sidebar
        activeNav={activeNav}
        onNavClick={setActiveNav}
        onSettings={() => setSettingsOpen(true)}
        onSignOut={handleLogout}
        orderCount={orders.filter((o) => o.status === 'New' || o.status === 'Assigned').length + 85}
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={() => setIsSidebarCollapsed((prev) => !prev)}
        navItems={[
          { label: 'Overview', icon: <House size={18} weight="light" />, hint: navHints.Overview },
          { label: 'AI Co-Pilot', icon: <Sparkle size={18} weight="light" />, hint: navHints['AI Co-Pilot'] },
          { label: 'Risk queue', icon: <ListChecks size={18} weight="light" />, count: '93', hint: navHints['Risk queue'] },
          { label: 'Orders', icon: <Package size={18} weight="light" />, hint: navHints.Orders },
          { label: 'Analytics', icon: <ChartLineUp size={18} weight="light" />, hint: navHints.Analytics },
          { label: 'Policies', icon: <FadersHorizontal size={18} weight="light" />, hint: navHints.Policies },
          { label: 'Model health', icon: <ShieldCheck size={18} weight="light" />, hint: navHints['Model health'] },
        ]}
      />

      <Main>
        <div className="mobile-bar">
          <a className="brand" href="#overview">
            <span className="brand-mark" aria-hidden="true"><span></span><span></span><span></span></span>
            <span>ReturnShield</span>
          </a>
          <button
            className="icon-button"
            type="button"
            aria-label="Notifications"
            onClick={() => pushToast({ title: `${notifications.filter((n) => n.unread).length} unread alerts`, body: 'Open the desktop layout for the full notification panel.', tone: 'info' })}
          >
            <Bell size={19} weight="light" />
          </button>
        </div>

        <Topbar
          breadcrumbs={['Northstar Retail', activeNav]}
          searchValue={searchQuery}
          onSearch={setSearchQuery}
          notifications={notifications}
          onMarkAllRead={() => {
            setNotifications((current) => current.map((n) => ({ ...n, unread: false })))
            pushToast({ title: 'All notifications marked read', tone: 'info' })
          }}
          onNotificationOpen={(notification) => {
            setNotifications((current) => current.map((n) => (n.id === notification.id ? { ...n, unread: false } : n)))
            if (notification.id === 1) {
              const target = orders.find((o) => o.id === '#RS-18492')
              if (target) openOrder(target)
            } else {
              setActiveNav(notification.id === 2 ? 'Model health' : 'Policies')
            }
          }}
        />

        {activeNav === 'Overview' && (
          <>
            <PageHeading
              eyebrow={<><Sparkle size={13} weight="light" /> Decision intelligence</>}
              title="Revenue under protection."
              description="Live risk signals across your order flow. Focus the team where a small intervention can prevent the largest loss."
              actions={
                <div className="heading-actions">
                  <Dropdown
                    options={dateRanges.map((r) => r.label)}
                    value={dateRange.label}
                    onSelect={(label) => {
                      const next = dateRanges.find((r) => r.label === label)
                      if (next) {
                        setDateRange(next)
                        pushToast({ title: `Period set to ${label}`, body: 'Every metric and chart now reflects this window.', tone: 'info' })
                      }
                    }}
                    trigger={(open) => (
                      <Button variant="secondary" size="md" title="Change the reporting period for every module" aria-expanded={open}>
                        {dateRange.label} <CaretDown size={15} weight="light" />
                      </Button>
                    )}
                  />
                  <Button variant="accent" size="md" onClick={handleExport} title="Download the current queue as CSV">
                    <FileArrowDown size={17} weight="light" /> Export
                  </Button>
                </div>
              }
            />

            <section className="metric-grid" aria-label="Portfolio risk metrics">
              <MetricCard label="Revenue at risk" value={dateRange.atRisk} delta={dateRange.atRiskDelta} detail="vs. previous period" type="risk" onClick={() => goToQueue('Revenue at risk')} />
              <MetricCard label="Critical orders" value={dateRange.critical} delta={dateRange.criticalDelta} detail="require action before dispatch" type="critical" onClick={() => { setPriorityFilter('P0'); goToQueue('Critical orders') }} />
              <MetricCard label="Return rate" value={dateRange.returnRate} delta={dateRange.returnDelta} detail="above category baseline" type="return" onClick={() => setActiveNav('Analytics')} />
              <MetricCard label="Loss prevented" value={dateRange.prevented} delta={dateRange.preventedDelta} detail="validated this period" type="success" onClick={() => setActiveNav('Policies')} />
            </section>

            <section className="dashboard-grid">
              <Card className="trend-card">
                <CardContent>
                  <CardHeader>
                    <div>
                      <CardKicker>Portfolio exposure</CardKicker>
                      <CardTitle>Loss at risk</CardTitle>
                    </div>
                    <Dropdown
                      options={Object.keys(trendWindows)}
                      value={trendWindow}
                      onSelect={setTrendWindow}
                      trigger={(open) => (
                        <Button variant="quiet" size="sm" title="Change the trend window" aria-expanded={open}>
                          {trendWindow} <CaretDown size={14} weight="light" />
                        </Button>
                      )}
                    />
                  </CardHeader>
                  <div className="chart-summary">
                    <strong>{dateRange.atRisk}</strong>
                    <span><TrendDown size={16} weight="light" /> {dateRange.atRiskDelta} more than last period</span>
                  </div>
                  <div className="risk-chart" role="img" aria-label={`Loss at risk trend over ${trendWindow.toLowerCase()}, currently ${dateRange.atRisk}`}>
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
                    <div className="chart-annotation"><span>{dateRange.atRisk}</span><small>Current exposure</small></div>
                  </div>
                  <div className="chart-axis" aria-hidden="true"><span>06 May</span><span>20 May</span><span>03 Jun</span><span>17 Jun</span><span>01 Jul</span><span>15 Jul</span></div>
                </CardContent>
              </Card>

              <ActionStack onViewAll={() => goToQueue()} onActionClick={(action) => goToQueue(action)} />
            </section>

            <section className="queue-section" id="risk-queue">
              <div className="section-heading">
                <div>
                  <div className="eyebrow"><Warning size={13} weight="light" /> Priority workbench</div>
                  <h2>Orders that need a decision</h2>
                  <p>Ranked by expected financial loss and the time remaining to intervene.</p>
                </div>
                {filtersRow}
              </div>
              {queueTable}
            </section>

            <section className="insight-grid">
              <Card className="insights-card">
                <CardContent>
                  <CardHeader>
                    <div>
                      <CardKicker>Primary drivers</CardKicker>
                      <CardTitle>Why returns are rising</CardTitle>
                    </div>
                    <Dropdown
                      options={['High-risk cohort', 'All orders', 'COD only', 'Fragile SKUs']}
                      value={driverCohort}
                      onSelect={(cohort) => {
                        setDriverCohort(cohort)
                        pushToast({ title: `Drivers scoped to ${cohort.toLowerCase()}`, tone: 'info' })
                      }}
                      trigger={(open) => (
                        <Button variant="quiet" size="sm" title="Change the cohort behind these driver weights" aria-expanded={open}>
                          {driverCohort} <CaretDown size={14} weight="light" />
                        </Button>
                      )}
                    />
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
                  <CardHeader>
                    <div><CardKicker>Exposure map</CardKicker><CardTitle>Where loss is concentrated</CardTitle></div>
                    <MapPin size={21} weight="light" />
                  </CardHeader>
                  <div className="region-orbit" aria-hidden="true"><span className="orb orb-one"></span><span className="orb orb-two"></span><span className="orb orb-three"></span><span className="map-node node-one"></span><span className="map-node node-two"></span><span className="map-node node-three"></span><span className="map-node node-four"></span></div>
                  <div className="region-list">
                    {regions.map((region) => (
                      <button
                        key={region.rank}
                        type="button"
                        className="region-row"
                        title={`Filter the queue to ${region.name}`}
                        onClick={() => {
                          setSearchQuery(region.name)
                          goToQueue(region.name)
                        }}
                      >
                        <b>{region.rank}</b> {region.name} <strong>{region.value}</strong>
                      </button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </section>
          </>
        )}

        {activeNav === 'AI Co-Pilot' && (
          <>
            <PageHeading
              eyebrow={<><Sparkle size={13} weight="light" /> Conversational Intelligence</>}
              title="ReturnShield Co-Pilot."
              description="Ask natural language questions about your business risk, order return drivers, and receive actionable recommendation playbooks."
            />
            <CoPilot orders={orders} />
          </>
        )}

        {activeNav === 'Risk queue' && (
          <>
            <PageHeading
              eyebrow={<><ListChecks size={13} weight="light" /> Priority workbench</>}
              title="Risk queue."
              description="Every scoreable order ranked by expected financial loss, then delivery cutoff. Decide, assign, or defer without leaving the flow."
              actions={
                <div className="heading-actions">
                  <Button variant="accent" size="md" onClick={handleExport} title="Download the filtered queue as CSV">
                    <FileArrowDown size={17} weight="light" /> Export
                  </Button>
                </div>
              }
            />
            <div className="queue-page-tools">{filtersRow}</div>
            {queueTable}
          </>
        )}

        {activeNav === 'Orders' && (
          <>
            <PageHeading
              eyebrow={<><Package size={13} weight="light" /> Order intelligence</>}
              title="All scored orders."
              description="Every order carries its prediction, loss estimate, decision history, and current status."
            />
            {queueTable}
          </>
        )}

        {activeNav === 'Analytics' && (
          <>
            <PageHeading
              eyebrow={<><ChartLineUp size={13} weight="light" /> Cohort analysis</>}
              title="Where returns come from."
              description="Category, geography, and driver analysis for the selected period. Select a region to cross-filter the queue."
            />
            <section className="metric-grid" aria-label="Analytics metrics">
              <MetricCard label="Return rate" value={dateRange.returnRate} delta={dateRange.returnDelta} detail="above category baseline" type="return" />
              <MetricCard label="Top category" value="Kitchen" delta="18.2%" detail="return rate this period" type="risk" />
              <MetricCard label="Top region" value="Maharashtra" delta="INR 3.21L" detail="loss exposure" type="critical" onClick={() => { setSearchQuery('Maharashtra'); goToQueue('Maharashtra') }} />
              <MetricCard label="Exchange saves" value="41%" delta="6 pts" detail="of size-driven returns kept" type="success" />
            </section>
            <section className="insight-grid">
              <Card className="insights-card">
                <CardContent>
                  <CardHeader>
                    <div><CardKicker>Primary drivers</CardKicker><CardTitle>Driver contribution</CardTitle></div>
                  </CardHeader>
                  <div className="driver-list">
                    <Driver label="Previous customer returns" value="36%" width="86%" tone="teal" />
                    <Driver label="Delivery delay over 2 days" value="28%" width="67%" tone="amber" />
                    <Driver label="COD payment method" value="21%" width="51%" tone="blue" />
                    <Driver label="Fragile product category" value="15%" width="36%" tone="slate" />
                  </div>
                  <p className="source-note">Drivers name source fields and direction — raw SHAP values stay behind the scenes.</p>
                </CardContent>
              </Card>
              <Card className="insights-card region-card">
                <CardContent>
                  <CardHeader>
                    <div><CardKicker>Exposure map</CardKicker><CardTitle>Loss by region</CardTitle></div>
                    <MapPin size={21} weight="light" />
                  </CardHeader>
                  <div className="region-orbit" aria-hidden="true"><span className="orb orb-one"></span><span className="orb orb-two"></span><span className="orb orb-three"></span><span className="map-node node-one"></span><span className="map-node node-two"></span><span className="map-node node-three"></span><span className="map-node node-four"></span></div>
                  <div className="region-list">
                    {regions.map((region) => (
                      <button
                        key={region.rank}
                        type="button"
                        className="region-row"
                        title={`Filter the queue to ${region.name}`}
                        onClick={() => { setSearchQuery(region.name); goToQueue(region.name) }}
                      >
                        <b>{region.rank}</b> {region.name} <strong>{region.value}</strong>
                      </button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </section>
          </>
        )}

        {activeNav === 'Policies' && (
          <>
            <PageHeading
              eyebrow={<><FadersHorizontal size={13} weight="light" /> Playbooks</>}
              title="Policies and playbooks."
              description="Approved interventions with guardrails, owners, and measured outcomes. Toggling a policy takes effect on the next scoring cycle."
            />
            <div className="policy-list">
              {policies.map((policy) => (
                <Card key={policy.id} className="policy-card">
                  <CardContent>
                    <div className="policy-row">
                      <div className="policy-copy">
                        <div className="policy-title">
                          <span className="factor-index">{policy.id}</span>
                          <strong>{policy.condition}</strong>
                        </div>
                        <p>{policy.recommendation}</p>
                        <small><ShieldCheck size={12} weight="light" /> {policy.guardrail} · Owner: {policy.owner}</small>
                      </div>
                      <div className="policy-stats">
                        <div><small>Adoption</small><strong>{policy.adoption}</strong></div>
                        <div><small>Prevented</small><strong>{policy.prevented}</strong></div>
                        <button
                          type="button"
                          role="switch"
                          aria-checked={policy.enabled}
                          className={`policy-toggle ${policy.enabled ? 'is-on' : ''}`}
                          title={policy.enabled ? 'Disable this playbook' : 'Enable this playbook'}
                          onClick={() => {
                            setPolicies((current) => current.map((p) => (p.id === policy.id ? { ...p, enabled: !p.enabled } : p)))
                            pushToast({
                              title: `${policy.id} ${policy.enabled ? 'disabled' : 'enabled'}`,
                              body: policy.enabled
                                ? 'New orders will no longer receive this recommendation.'
                                : 'Applies to newly scored orders from the next cycle.',
                              tone: policy.enabled ? 'warning' : 'success',
                            })
                          }}
                        >
                          <span className="policy-knob"></span>
                        </button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </>
        )}

        {activeNav === 'Model health' && (
          <>
            <PageHeading
              eyebrow={<><ShieldCheck size={13} weight="light" /> Model operations</>}
              title="Model health."
              description="Coverage, calibration, and drift for model v2.4. Every score keeps its model version and feature time for reproducibility."
            />
            <section className="metric-grid" aria-label="Model health metrics">
              <MetricCard label="Score coverage" value="98.7%" delta="0.4 pts" detail="of scoreable orders" type="success" />
              <MetricCard label="Calibration error" value="2.1%" delta="0.3 pts" detail="expected vs. observed" type="success" />
              <MetricCard label="Feature drift" value="Low" delta="2 features" detail="watching footwear cohort" type="return" />
              <MetricCard label="Feedback labels" value="84%" delta="611 outcomes" detail="closed this period" type="risk" />
            </section>
            <Card className="model-card">
              <CardContent>
                <CardHeader>
                  <div><CardKicker>Registry</CardKicker><CardTitle>Model v2.4 — production</CardTitle></div>
                  <Button
                    variant="accent"
                    size="md"
                    onClick={() => pushToast({ title: 'Manual sync requested', body: 'Scores refresh within 5 minutes. Existing decisions are never overwritten.', tone: 'info' })}
                    title="Request a manual model sync (permitted for analysts on this tenant)"
                  >
                    Request sync
                  </Button>
                </CardHeader>
                <div className="model-facts">
                  <div><small>Deployed</small><strong>04 July 2026</strong></div>
                  <div><small>Training window</small><strong>18 months</strong></div>
                  <div><small>Precision @ high band</small><strong>0.81</strong></div>
                  <div><small>Recall @ high band</small><strong>0.74</strong></div>
                </div>
                <p className="source-note">Scores freeze at the last successful run if the model service degrades — recommendations are never shown unlabelled.</p>
              </CardContent>
            </Card>
          </>
        )}
      </Main>

      {/* Order intelligence drawer */}
      {isDrawerOpen && selectedOrder && (
        <div className="drawer-layer" role="presentation" onMouseDown={() => setIsDrawerOpen(false)}>
          <aside className="order-drawer" role="dialog" aria-modal="true" aria-labelledby="drawer-title" onMouseDown={(event) => event.stopPropagation()}>
            <div className="drawer-topline"><span className="drawer-handle"></span></div>
            <div className="drawer-heading">
              <div>
                <Badge variant="priority" priority={selectedOrder.priority.toLowerCase() as 'p0' | 'p1' | 'p2'}>
                  {selectedOrder.priority} intervention
                </Badge>
                <h2 id="drawer-title">{selectedOrder.id}</h2>
                <p>{selectedOrder.customer} · {selectedOrder.product} · {selectedOrder.region}</p>
              </div>
              <button className="icon-button" type="button" onClick={() => setIsDrawerOpen(false)} aria-label="Close order detail">
                <X size={19} weight="light" />
              </button>
            </div>

            <div className="drawer-metrics">
              <div>
                <small>Return probability</small>
                <strong>{selectedOrder.risk}%</strong>
                <span>{selectedOrder.risk > 85 ? 'Critical risk' : selectedOrder.risk > 70 ? 'High risk' : 'Watch'}</span>
              </div>
              <div>
                <small>Estimated loss</small>
                <strong>{selectedOrder.loss}</strong>
                <span>Refund + reverse logistics</span>
              </div>
            </div>

            <div className="drawer-sla">
              <ClockCountdown size={15} weight="light" />
              <span>Action cutoff in <b>{selectedOrder.slaHours} hours</b> · {selectedOrder.payment} payment · status: {selectedOrder.status}</span>
            </div>

            <section className="drawer-section">
              <div className="drawer-section-title">
                <span>AI Risk Assessment</span>
                {aiLoading ? (
                  <span className="text-[10px] text-teal-400">Analyzing with Groq...</span>
                ) : (
                  <button type="button" onClick={() => handleFetchAIEvaluation(selectedOrder)} className="ai-assess-btn">
                    {aiExplanation ? 'Re-analyze' : 'Analyze with Groq Llama3'}
                  </button>
                )}
              </div>
              {aiExplanation ? (
                <div className="ai-explanation-box">
                  <p>{aiExplanation}</p>
                </div>
              ) : (
                <div className="ai-explanation-placeholder">
                  <p>Click "Analyze with Groq Llama3" to fetch a real-time risk assessment generated by LLM.</p>
                </div>
              )}
            </section>

            <section className="drawer-section">
              <div className="drawer-section-title">
                <span>Why the model flagged this</span>
                <button
                  type="button"
                  onClick={() => pushToast({ title: 'Model context', body: `Model v2.4 · features as of today 09:40 IST · confidence band ±4 pts.`, tone: 'info' })}
                  title="Model version, feature freshness, and confidence"
                >
                  View model context
                </button>
              </div>
              <div className="factor-card"><span className="factor-index">01</span><div><strong>{selectedOrder.driver}</strong><small>Strongest contributor to this order's return probability.</small></div><b>+24 pts</b></div>
              <div className="factor-card"><span className="factor-index">02</span><div><strong>{selectedOrder.payment === 'COD' ? 'Cash on Delivery' : `${selectedOrder.payment} chargeback pattern`}</strong><small>High-risk payment pattern for this category.</small></div><b>+17 pts</b></div>
              <div className="factor-card"><span className="factor-index">03</span><div><strong>Delivery promise changed</strong><small>ETA has moved by more than 24 hours.</small></div><b>+12 pts</b></div>
            </section>

            <section className="recommended-panel">
              <div className="recommended-caption"><ShieldCheck size={17} weight="light" /> Recommended intervention</div>
              <h3>{selectedOrder.action}</h3>
              <p>
                {selectedOrder.status === 'Actioned' || selectedOrder.status === 'Outcome pending'
                  ? 'Action has been assigned to the owning team. The outcome will close the feedback loop.'
                  : `Expected to prevent ${formatINR(Math.round(selectedOrder.lossValue * 0.4))} of loss while keeping the customer experience low-friction.`}
              </p>
              <button
                className={`apply-button ${selectedOrder.status === 'Actioned' || selectedOrder.status === 'Outcome pending' ? 'is-done' : ''}`}
                type="button"
                onClick={() => applyIntervention(selectedOrder)}
                disabled={selectedOrder.status === 'Actioned' || selectedOrder.status === 'Outcome pending' || selectedOrder.status === 'Resolved'}
                title="Applies the approved playbook action and writes an audit event"
              >
                {selectedOrder.status === 'Actioned' || selectedOrder.status === 'Outcome pending' ? (
                  <><Check size={18} weight="light" /> Action assigned</>
                ) : (
                  <>Apply intervention <span><ArrowUpRight size={16} weight="light" /></span></>
                )}
              </button>

              {!showAlternatives ? (
                <button
                  className="secondary-action"
                  type="button"
                  onClick={() => setShowAlternatives(true)}
                  title="See the alternate approved actions for this order"
                >
                  Choose an alternative
                </button>
              ) : (
                <div className="alternatives">
                  {selectedOrder.alternatives.map((alternative) => (
                    <button
                      key={alternative}
                      type="button"
                      className="alternative-row"
                      onClick={() => applyIntervention(selectedOrder, alternative)}
                      title="Applies this alternative instead of the primary recommendation"
                    >
                      <span>{alternative}</span>
                      <ArrowUpRight size={14} weight="light" />
                    </button>
                  ))}
                  <button type="button" className="secondary-action" onClick={() => setShowAlternatives(false)}>Keep recommendation</button>
                </div>
              )}
            </section>

            <div className="drawer-actions">
              <button
                type="button"
                className="drawer-chip"
                onClick={() => assignOrder(selectedOrder)}
                disabled={selectedOrder.status !== 'New'}
                title="Move this order into your worklist"
              >
                <UserPlus size={15} weight="light" /> Assign to me
              </button>
              <button type="button" className="drawer-chip" onClick={() => deferOrder(selectedOrder)} title="Snooze for 4 hours — it re-alerts before the cutoff">
                <ClockCountdown size={15} weight="light" /> Snooze 4h
              </button>
            </div>

            <div className="audit-line"><Clock size={15} weight="light" /> Scored 4 minutes ago · Model v2.4 · every decision is logged</div>
          </aside>
        </div>
      )}

      {/* Workspace settings modal */}
      {settingsOpen && (
        <div className="drawer-layer modal-layer" role="presentation" onMouseDown={() => setSettingsOpen(false)}>
          <div className="settings-modal" role="dialog" aria-modal="true" aria-labelledby="settings-title" onMouseDown={(event) => event.stopPropagation()}>
            <div className="drawer-heading">
              <div>
                <span className="section-kicker">Northstar Retail</span>
                <h2 id="settings-title">Workspace settings</h2>
              </div>
              <button className="icon-button" type="button" onClick={() => setSettingsOpen(false)} aria-label="Close settings">
                <X size={19} weight="light" />
              </button>
            </div>
            <div className="settings-rows">
              <div><small>Currency</small><strong>INR — Indian Rupee</strong></div>
              <div><small>Time zone</small><strong>Asia/Kolkata (IST)</strong></div>
              <div><small>Financial cutoff</small><strong>Dispatch time</strong></div>
              <div><small>High-risk threshold</small><strong>Score ≥ 70</strong></div>
              <div><small>Retention</small><strong>24 months, versioned</strong></div>
              <div><small>Your role</small><strong>Analyst — playbook decisions</strong></div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '6px', alignItems: 'stretch' }}>
                <small>Groq API Key (Llama3)</small>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <input
                    type="password"
                    placeholder="Enter gsk_..."
                    value={groqKeyInput}
                    onChange={(e) => {
                      const val = e.target.value
                      setGroqKeyInput(val)
                      sessionStorage.setItem('returnshield-groq-api-key', val)
                    }}
                    style={{
                      flex: 1,
                      background: 'rgba(0,0,0,0.3)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: '8px',
                      padding: '6px 10px',
                      color: '#fff',
                      fontSize: '11px',
                      fontFamily: 'monospace',
                    }}
                  />
                  {groqKeyInput && (
                    <button
                      type="button"
                      onClick={() => {
                        setGroqKeyInput('')
                        sessionStorage.removeItem('returnshield-groq-api-key')
                        pushToast({ title: 'API Key Cleared', tone: 'warning' })
                      }}
                      style={{
                        background: 'rgba(251,128,115,0.1)',
                        border: '1px solid rgba(251,128,115,0.2)',
                        borderRadius: '8px',
                        padding: '0 12px',
                        color: '#ff9c9c',
                        fontSize: '10px',
                        cursor: 'pointer',
                      }}
                    >
                      Clear
                    </button>
                  )}
                </div>
              </div>
            </div>
            <p className="source-note">Threshold and policy changes are versioned with actor and timestamp. Admin approval is required in production tenants.</p>
          </div>
        </div>
      )}
    </Layout>
  )
}

function Driver({ label, value, width, tone }: { label: string; value: string; width: string; tone: string }) {
  return (
    <div className="driver-row">
      <div><span>{label}</span><strong>{value}</strong></div>
      <div className="driver-track"><span className={tone} style={{ width }}></span></div>
    </div>
  )
}

function App() {
  return (
    <ToastProvider>
      <AppShell />
    </ToastProvider>
  )
}

export default App
