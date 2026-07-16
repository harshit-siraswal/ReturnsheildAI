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
              {isAuthenticated && userEmail ? `Convix Console (${userEmail})` : 'Convix Software'}
            </div>

            {/* Headline */}
            <h1 
              className="landing-title"
              style={{
                fontSize: 'clamp(36px, 8vw, 72px)',
                lineHeight: 1.05,
                fontWeight: 500,
                letterSpacing: '-0.02em',
              }}
            >
              Shaping{' '}
              <span style={{ fontFamily: "'Instrument Serif', serif", fontStyle: 'italic', fontWeight: 400 }}>
                Agencies
              </span>{' '}
              <br />
              of tomorrow
            </h1>

            {/* Subtitle */}
            <p 
              className="landing-subtitle"
              style={{
                fontSize: 'clamp(13px, 3.5vw, 16px)',
              }}
            >
              The All-In-One Software Powering the Future of PR Agencies
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

          {/* Dashboard Preview (Bleeding Bottom) */}
          <div className="landing-preview-pusher">
            <DashboardPreview />
          </div>
        </div>

      </div>

      {/* 2. Interactive Analytics Showcase (ReturnShield AI Integrations) */}
      <div className="landing-showcase-section">
        
        {/* Section Header */}
        <div className="showcase-header">
          <div className="showcase-tag">
            <span className="showcase-tag-dot" />
            ReturnShield AI Integration
          </div>
          <h2 className="showcase-title">
            Intelligent Return Risk & Revenue Protection
          </h2>
          <p className="showcase-desc">
            Equip your agency and clients with advanced decision intelligence. Prevent high-risk returns, flags fraud, and safeguards profit margins automatically.
          </p>
        </div>

        {/* Dashboard Showcase Grid */}
        <div className="showcase-grid">
          
          {/* Showcase Card 1 — Analytics */}
          <div className="showcase-card">
            <div className="showcase-card-meta">
              <span className="showcase-card-tag">Cohort Analysis</span>
              <h3 className="showcase-card-title">Where Returns Originate</h3>
              <p className="showcase-card-desc">
                Unlock geographic, product category, and user behavior return cohorts. Drill down into specific risk factors with real-time SHAP driver attributions.
              </p>
            </div>
            
            {/* Screenshot Container */}
            <div className="showcase-img-container">
              <img
                src="/screenshot-analytics.png"
                alt="ReturnShield Analytics Cohort Analysis Dashboard"
                className="showcase-img"
              />
              <div className="showcase-img-overlay">
                <span className="showcase-overlay-btn">
                  View Analytics Control Room
                </span>
              </div>
            </div>
          </div>

          {/* Showcase Card 2 — Overview */}
          <div className="showcase-card">
            <div className="showcase-card-meta">
              <span className="showcase-card-tag">Revenue Protection</span>
              <h3 className="showcase-card-title">Revenue Under Protection</h3>
              <p className="showcase-card-desc">
                Monitor live risk parameters, identify high-loss orders, and take automated preventive actions like size guide triggers or exchange campaigns before dispatch.
              </p>
            </div>

            {/* Screenshot Container */}
            <div className="showcase-img-container">
              <img
                src="/screenshot-overview.png"
                alt="ReturnShield Revenue Protection Overview Dashboard"
                className="showcase-img"
              />
              <div className="showcase-img-overlay">
                <span className="showcase-overlay-btn">
                  View Overview Dashboard
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* Feature Grid */}
        <div className="landing-feature-row">
          <div className="landing-feature-item">
            <div className="feature-num">01</div>
            <h4 className="feature-title">Real-Time Risk Scoring</h4>
            <p className="feature-desc">
              Every checkout order is evaluated dynamically against returns risk data points and user historical patterns.
            </p>
          </div>
          
          <div className="landing-feature-item">
            <div className="feature-num">02</div>
            <h4 className="feature-title">AI-Powered Co-Pilot</h4>
            <p className="feature-desc">
              Ask risk-related questions in plain English and receive instant dashboard insight answers via built-in Llama 3 models.
            </p>
          </div>

          <div className="landing-feature-item">
            <div className="feature-num">03</div>
            <h4 className="feature-title">Interactive Interventions</h4>
            <p className="feature-desc">
              Deploy sizing corrections, checkout flag warnings, and exchange discount popups automatically based on customer risk profiles.
            </p>
          </div>
        </div>

        {/* Call to action section */}
        <div className="landing-cta-banner">
          <div className="banner-content">
            <h3 className="banner-title">Ready to safeguard your store's margins?</h3>
            <p className="banner-desc">
              Join thousands of merchant brands using Convix and ReturnShield AI.
            </p>
          </div>
          <button
            type="button"
            onClick={onEnterWorkspace}
            className="banner-btn"
          >
            {isAuthenticated ? 'Enter Control Room' : 'Access Sandbox Console'}
            <ChevronRight size={14} strokeWidth={3} />
          </button>
        </div>

      </div>

    </div>
  );
};
