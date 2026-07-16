import React from 'react';

export const DashboardPreview: React.FC = () => {
  return (
    <div className="landing-tray-wrapper">
      <div className="rs-preview-shell">
        {/* Top bar */}
        <div className="rs-preview-topbar">
          <div className="rs-preview-breadcrumb">
            <span className="rs-preview-breadcrumb-parent">Northstar Retail</span>
            <span className="rs-preview-breadcrumb-sep">/</span>
            <span className="rs-preview-breadcrumb-current">Overview</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginLeft: 'auto' }}>
            <div className="rs-preview-search">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
              Maharashtra
            </div>
            <div className="rs-preview-bell">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
            </div>
          </div>
        </div>

        {/* Metric cards row */}
        <div className="rs-preview-metrics">
          <div className="rs-preview-metric-card">
            <div className="rs-preview-metric-label">Revenue at risk</div>
            <div className="rs-preview-metric-icon orange">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>
            </div>
            <div className="rs-preview-metric-value">INR 12.84L</div>
            <div className="rs-preview-metric-delta red">↑ 12.6% vs. previous period</div>
          </div>
          <div className="rs-preview-metric-card">
            <div className="rs-preview-metric-label">Critical orders</div>
            <div className="rs-preview-metric-icon orange-light">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
            </div>
            <div className="rs-preview-metric-value">93</div>
            <div className="rs-preview-metric-delta orange">18 today require action before dispatch</div>
          </div>
          <div className="rs-preview-metric-card">
            <div className="rs-preview-metric-label">Return rate</div>
            <div className="rs-preview-metric-icon blue">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 .49-3.38"/></svg>
            </div>
            <div className="rs-preview-metric-value">14.8%</div>
            <div className="rs-preview-metric-delta red">↑ 2.4 pts above category baseline</div>
          </div>
          <div className="rs-preview-metric-card">
            <div className="rs-preview-metric-label">Loss prevented</div>
            <div className="rs-preview-metric-icon green">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
            </div>
            <div className="rs-preview-metric-value">INR 2.37L</div>
            <div className="rs-preview-metric-delta green">82 actions validated this period</div>
          </div>
        </div>

        {/* Bottom two panels */}
        <div className="rs-preview-panels">
          {/* Portfolio Exposure */}
          <div className="rs-preview-panel">
            <div className="rs-preview-panel-kicker">PORTFOLIO EXPOSURE</div>
            <div className="rs-preview-panel-title">Loss at risk</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '4px' }}>
              <span className="rs-preview-panel-value">INR 12.84L</span>
              <span className="rs-preview-panel-delta">↑ 12.6% more than last period</span>
            </div>
            <div className="rs-preview-chart-area">
              <svg viewBox="0 0 320 80" width="100%" height="80" preserveAspectRatio="none" fill="none">
                <defs>
                  <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#ef4d23" stopOpacity="0.3"/>
                    <stop offset="100%" stopColor="#ef4d23" stopOpacity="0"/>
                  </linearGradient>
                </defs>
                <polygon
                  points="0,75 30,70 60,65 90,60 120,55 150,50 180,45 210,38 240,30 270,22 290,16 320,10 320,80 0,80"
                  fill="url(#chartGrad)"
                />
                <polyline
                  points="0,75 30,70 60,65 90,60 120,55 150,50 180,45 210,38 240,30 270,22 290,16 320,10"
                  stroke="#ef4d23" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"
                />
                <circle cx="320" cy="10" r="4" fill="#ef4d23"/>
                <text x="295" y="7" fill="#ef4d23" fontSize="8" textAnchor="end" fontFamily="Inter, sans-serif" fontWeight="600">INR 12.84L</text>
                <text x="295" y="15" fill="#737373" fontSize="6" textAnchor="end" fontFamily="Inter, sans-serif">Current exposure</text>
              </svg>
            </div>
          </div>

          {/* Action Center */}
          <div className="rs-preview-panel">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div className="rs-preview-panel-kicker">ACTION CENTER</div>
              <div className="rs-preview-live-dot"><span></span>Live</div>
            </div>
            <div className="rs-preview-panel-title" style={{ marginBottom: '10px' }}>Best moves now</div>
            <div className="rs-preview-action-list">
              <div className="rs-preview-action-item">
                <div className="rs-preview-action-icon shield">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                </div>
                <div className="rs-preview-action-body">
                  <div className="rs-preview-action-title">Verify 14 COD orders</div>
                  <div className="rs-preview-action-sub">Save an estimated INR 65,400</div>
                </div>
                <div className="rs-preview-action-arrow">↗</div>
              </div>
              <div className="rs-preview-action-item">
                <div className="rs-preview-action-icon box">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg>
                </div>
                <div className="rs-preview-action-body">
                  <div className="rs-preview-action-title">Inspect 8 fragile SKUs</div>
                  <div className="rs-preview-action-sub">125 warehouse cubits</div>
                </div>
                <div className="rs-preview-action-arrow">↗</div>
              </div>
              <div className="rs-preview-action-item">
                <div className="rs-preview-action-icon clock">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                </div>
                <div className="rs-preview-action-body">
                  <div className="rs-preview-action-title">Escalate 6 delivery delays</div>
                  <div className="rs-preview-action-sub">INR 24,300 at risk</div>
                </div>
                <div className="rs-preview-action-arrow">↗</div>
              </div>
            </div>
            <div className="rs-preview-view-all">View all 93 actions ↗</div>
          </div>
        </div>

      </div>
    </div>
  );
};
