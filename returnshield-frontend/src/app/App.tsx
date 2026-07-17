import React from 'react';
import { ChevronRight } from 'lucide-react';
import { Navbar } from './components/Navbar';
import { DashboardPreview } from './components/DashboardPreview';
import '../styles/fonts.css';
import './landing.css';

interface AppProps {
  onEnterWorkspace: () => void;
  isAuthenticated: boolean;
  userEmail?: string;
}

export const ConvixLandingPage: React.FC<AppProps> = ({
  onEnterWorkspace,
  isAuthenticated,
  userEmail,
}) => {
  return (
    <div className="landing-page">

      {/* 1. Hero Container */}
      <div className="landing-hero-container">

        {/* Background Video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          disableRemotePlayback
          webkit-playsinline="true"
          x5-playsinline="true"
          poster="https://images.unsplash.com/photo-1557683316-973673baf926?w=1600&q=60"
          className="landing-video"
        >
          <source
            src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260424_064411_9e9d7f84-9277-41f4-ab10-59172d89e6be.mp4"
            type="video/mp4"
          />
        </video>

        {/* Video Overlay */}
        <div className="landing-overlay" />

        {/* Foreground Content Wrapper */}
        <div className="landing-content-wrapper">

          {/* Floating Navbar */}
          <Navbar onLoginClick={onEnterWorkspace} />

          {/* Hero Content (Centered) */}
          <div className="landing-hero-content">
            {/* Badge */}
            <div className="landing-badge">
              <span className="landing-badge-dot" />
              {isAuthenticated && userEmail
                ? `Signed in as ${userEmail}`
                : 'Decision Intelligence · ReturnShield AI'}
            </div>

            {/* Headline */}
            <h1
              className="landing-title"
              style={{
                fontSize: 'clamp(38px, 8vw, 76px)',
                lineHeight: 1.04,
                fontWeight: 500,
                letterSpacing: '-0.025em',
              }}
            >
              Revenue under{' '}
              <span style={{ fontFamily: "'Instrument Serif', serif", fontStyle: 'italic', fontWeight: 400 }}>
                protection.
              </span>
            </h1>

            {/* Subtitle */}
            <p
              className="landing-subtitle"
              style={{ fontSize: 'clamp(13px, 3.5vw, 16px)' }}
            >
              Live risk signals across your order flow. Focus your team where a small intervention prevents the largest loss.
            </p>

            {/* CTA Button */}
            <button
              type="button"
              onClick={onEnterWorkspace}
              className="landing-cta-btn"
            >
              {isAuthenticated ? 'Enter Control Room' : 'Get Started'}
              <span className="landing-cta-icon">
                <ChevronRight size={14} strokeWidth={3} />
              </span>
            </button>
          </div>

        </div>

        {/* Dashboard Preview — absolutely pinned to bottom, bleeds out */}
        <div className="landing-preview-abs">
          <DashboardPreview />
        </div>

      </div>

      {/* 2. Features Section */}
      <div className="landing-showcase-section">

        {/* Section Header */}
        <div className="showcase-header">
          <div className="showcase-tag">
            <span className="showcase-tag-dot" />
            How ReturnShield AI works
          </div>
          <h2 className="showcase-title">
            Stop returns before they happen
          </h2>
          <p className="showcase-desc">
            Every order is scored in real time. High-risk shipments are flagged before dispatch — giving your team a window to intervene with size guides, verification calls, or exchange offers.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="landing-feature-row">
          <div className="landing-feature-item">
            <div className="feature-num">01</div>
            <h4 className="feature-title">Real-Time Risk Scoring</h4>
            <p className="feature-desc">
              Every checkout order is scored against 40+ return risk signals — product type, region, payment method, buyer history, and more.
            </p>
          </div>
          <div className="landing-feature-item">
            <div className="feature-num">02</div>
            <h4 className="feature-title">AI Co-Pilot</h4>
            <p className="feature-desc">
              Ask "which SKUs are driving returns in Maharashtra?" in plain English and get instant answers grounded in your live order data.
            </p>
          </div>
          <div className="landing-feature-item">
            <div className="feature-num">03</div>
            <h4 className="feature-title">Automated Interventions</h4>
            <p className="feature-desc">
              Deploy size guide nudges, COD verification flows, and exchange discount popups automatically based on each customer's risk profile.
            </p>
          </div>
          <div className="landing-feature-item">
            <div className="feature-num">04</div>
            <h4 className="feature-title">Loss Prevention Ledger</h4>
            <p className="feature-desc">
              Every prevented return is logged with its estimated saved revenue, giving finance teams a clear ROI report every month.
            </p>
          </div>
          <div className="landing-feature-item">
            <div className="feature-num">05</div>
            <h4 className="feature-title">Cohort & Trend Analysis</h4>
            <p className="feature-desc">
              Drill into return cohorts by category, region, channel, or courier — with SHAP driver attributions explaining exactly why each order is flagged.
            </p>
          </div>
          <div className="landing-feature-item">
            <div className="feature-num">06</div>
            <h4 className="feature-title">Policy Guardrails</h4>
            <p className="feature-desc">
              Define intervention rules once and let ReturnShield enforce them consistently across your entire catalogue — no manual approvals needed.
            </p>
          </div>
        </div>

        {/* Showcase Cards */}
        <div className="showcase-grid showcase-grid--spaced">
          <div className="showcase-card">
            <div className="showcase-card-meta">
              <span className="showcase-card-tag">Cohort Analysis</span>
              <h3 className="showcase-card-title">Where returns originate</h3>
              <p className="showcase-card-desc">
                Unlock geographic, product, and buyer-behavior return cohorts. Drill into specific risk factors with real-time SHAP driver attributions explaining every flag.
              </p>
            </div>
            <div className="showcase-img-container">
              <img
                src="/showcase-analytics.svg"
                alt="ReturnShield Analytics Cohort Analysis Dashboard"
                className="showcase-img"
              />
              <div className="showcase-img-overlay">
                <span className="showcase-overlay-btn">View Analytics Control Room</span>
              </div>
            </div>
          </div>

          <div className="showcase-card">
            <div className="showcase-card-meta">
              <span className="showcase-card-tag">Revenue Protection</span>
              <h3 className="showcase-card-title">Revenue under protection</h3>
              <p className="showcase-card-desc">
                Monitor live risk parameters, identify high-loss orders, and take automated preventive actions — size guide triggers, exchange campaigns — before dispatch.
              </p>
            </div>
            <div className="showcase-img-container">
              <img
                src="/showcase-overview.svg"
                alt="ReturnShield Revenue Protection Overview Dashboard"
                className="showcase-img"
              />
              <div className="showcase-img-overlay">
                <span className="showcase-overlay-btn">View Overview Dashboard</span>
              </div>
            </div>
          </div>
        </div>

        {/* Final CTA Banner */}
        <div className="landing-cta-banner">
          <div className="banner-content">
            <h3 className="banner-title">Ready to protect your margins?</h3>
            <p className="banner-desc">
              Join D2C brands using ReturnShield AI to cut return rates and recover lost revenue automatically.
            </p>
          </div>
          <button
            type="button"
            onClick={onEnterWorkspace}
            className="banner-btn"
          >
            {isAuthenticated ? 'Enter Control Room' : 'Start Free Trial'}
            <ChevronRight size={14} strokeWidth={3} />
          </button>
        </div>

      </div>

    </div>
  );
};
