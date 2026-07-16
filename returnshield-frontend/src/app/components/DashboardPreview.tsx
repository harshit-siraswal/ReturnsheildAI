import React, { useState } from 'react';
import { TrendingDown, TrendingUp, ChevronDown, X } from 'lucide-react';
import { Gauge } from './Gauge';

export const DashboardPreview: React.FC = () => {
  // State for toggles in Card 1 and Card 3
  const [card1Active, setCard1Active] = useState<'Impressions' | 'Clicks'>('Impressions');
  const [card3Active, setCard3Active] = useState<'Video Clicks' | 'Video Starts'>('Video Clicks');

  // State for Card 2 inputs
  const [monthTarget, setMonthTarget] = useState<number>(10);
  const [yearTarget, setYearTarget] = useState<number>(100);

  return (
    <div className="landing-tray-wrapper">
      <div className="landing-tray">
        <div className="landing-grid">
          
          {/* Card 1 — Clicks */}
          <div className="landing-card">
            <div>
              {/* Header */}
              <div className="landing-card-header">
                <span className="landing-card-title-orange">Clicks</span>
                <span className="landing-card-title-muted">This Month</span>
              </div>
              
              {/* Stat Row */}
              <div className="landing-stat-row">
                <span className="landing-stat-number">6,896</span>
                <span className="landing-stat-pill red">
                  <TrendingDown size={12} strokeWidth={2.5} />
                  -3,382 (33%)
                </span>
              </div>
              <div className="landing-stat-compare">Compared to yesterday</div>
              
              {/* Target Labels & Gauge */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <span className="landing-badge-achieved">
                  Month Target achieved
                </span>
                <Gauge value={92} color="#ef4d23" showLabels={true} min="389K" max="425K" />
              </div>
            </div>
            
            {/* Toggle bottom */}
            <div className="landing-toggle-tray">
              <button
                type="button"
                onClick={() => setCard1Active('Impressions')}
                className={`landing-toggle-btn ${card1Active === 'Impressions' ? 'active' : ''}`}
              >
                Impressions
              </button>
              <button
                type="button"
                onClick={() => setCard1Active('Clicks')}
                className={`landing-toggle-btn ${card1Active === 'Clicks' ? 'active' : ''}`}
              >
                Clicks
              </button>
            </div>
          </div>

          {/* Card 2 — Form */}
          <div className="landing-card" style={{ gap: '14px' }}>
            {/* Dropdown 1 */}
            <div className="landing-form-group">
              <label className="landing-form-label">Show figures for</label>
              <button className="landing-form-select-btn">
                This month
                <ChevronDown size={14} style={{ color: '#a3a3a3' }} />
              </button>
            </div>

            {/* Dropdown 2 */}
            <div className="landing-form-group">
              <label className="landing-form-label">Compare period by</label>
              <button className="landing-form-select-btn">
                Month-to-date (MTD)
                <ChevronDown size={14} style={{ color: '#a3a3a3' }} />
              </button>
            </div>

            {/* Input 1 */}
            <div className="landing-form-group">
              <label className="landing-form-label">Ste targets (This month)</label>
              <div className="landing-form-input-container">
                <span className="landing-form-prefix">#</span>
                <input
                  type="number"
                  value={monthTarget}
                  onChange={(e) => setMonthTarget(Number(e.target.value))}
                  className="landing-form-input"
                />
              </div>
            </div>

            {/* Input 2 */}
            <div className="landing-form-group">
              <label className="landing-form-label">Ste targets (This year)</label>
              <div className="landing-form-input-container">
                <span className="landing-form-prefix">#</span>
                <input
                  type="number"
                  value={yearTarget}
                  onChange={(e) => setYearTarget(Number(e.target.value))}
                  className="landing-form-input"
                />
              </div>
            </div>

            {/* Footer Actions */}
            <div className="landing-form-footer">
              <button className="landing-form-save">
                Save
              </button>
              <button className="landing-form-cancel">
                Cancel
              </button>
              <button className="landing-form-close">
                <X size={16} />
              </button>
            </div>
          </div>

          {/* Card 3 — Video Starts */}
          <div className="landing-card">
            <div>
              {/* Header */}
              <div className="landing-card-header">
                <span className="landing-card-title-orange">Video Starts</span>
                <span className="landing-card-title-muted">today</span>
              </div>
              
              {/* Stat Row */}
              <div className="landing-stat-row">
                <span className="landing-stat-number">0</span>
                <span className="landing-stat-pill neutral">
                  <TrendingUp size={12} strokeWidth={2.5} />
                  0
                </span>
              </div>
              <div className="landing-stat-compare">Compared to yesterday</div>
              
              {/* Gauge (no labels) */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Gauge value={68} color="#9ca3af" showLabels={false} />
              </div>
            </div>
            
            {/* Toggle bottom */}
            <div className="landing-toggle-tray">
              <button
                type="button"
                onClick={() => setCard3Active('Video Clicks')}
                className={`landing-toggle-btn ${card3Active === 'Video Clicks' ? 'active' : ''}`}
              >
                Video Clicks
              </button>
              <button
                type="button"
                onClick={() => setCard3Active('Video Starts')}
                className={`landing-toggle-btn ${card3Active === 'Video Starts' ? 'active' : ''}`}
              >
                Video Starts
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
