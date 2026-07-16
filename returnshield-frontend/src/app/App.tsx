import React from 'react';
import { ChevronRight } from 'lucide-react';
import { Navbar } from './components/Navbar';
import { DashboardPreview } from './components/DashboardPreview';
import '../styles/fonts.css';

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
    <div className="min-h-screen w-full bg-[#ededed] p-3 sm:p-4 flex flex-col font-sans overflow-x-hidden" style={{ fontFamily: 'Inter, sans-serif' }}>
      
      {/* 1. Hero Container */}
      <div className="relative w-full h-[calc(100vh-24px)] sm:h-[calc(100vh-32px)] overflow-hidden bg-[#d9d9d9] rounded-2xl sm:rounded-3xl flex flex-col justify-between border border-neutral-300/30">
        
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
          className="absolute inset-0 w-full h-full object-cover pointer-events-none z-0"
        >
          <source
            src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260424_064411_9e9d7f84-9277-41f4-ab10-59172d89e6be.mp4"
            type="video/mp4"
          />
        </video>
        
        {/* Video Overlay */}
        <div className="absolute inset-0 bg-white/10 z-10 pointer-events-none" />

        {/* Foreground Content Wrapper */}
        <div className="relative z-20 flex flex-col h-full justify-between">
          
          {/* Floating Navbar */}
          <Navbar onLoginClick={onEnterWorkspace} />

          {/* Hero Content (Centered) */}
          <div className="flex flex-col items-center px-4 pt-8 sm:pt-12 text-center max-w-5xl mx-auto my-auto select-none">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white rounded-full px-4 py-1.5 shadow-sm text-[13px] font-medium text-neutral-800 border border-neutral-100">
              <span className="w-2 h-2 rounded-full bg-[#ef4d23]" />
              {isAuthenticated && userEmail ? `Convix Console (${userEmail})` : 'Convix Software'}
            </div>

            {/* Headline */}
            <h1 
              className="mt-5 sm:mt-6 max-w-4xl text-neutral-950"
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
              <br className="hidden sm:inline" />
              of tomorrow
            </h1>

            {/* Subtitle */}
            <p 
              className="mt-4 sm:mt-6 text-neutral-700 px-2 font-medium max-w-xl mx-auto"
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
              className="mt-6 sm:mt-8 inline-flex items-center gap-3 bg-[#0b0f1a] hover:bg-neutral-800 text-white rounded-full pl-6 sm:pl-7 pr-2 py-2 sm:py-2.5 text-[14px] font-semibold transition-all shadow-md hover:shadow-lg cursor-pointer"
            >
              {isAuthenticated ? 'Enter Control Room' : 'Get Started'}
              <span className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-white/15 flex items-center justify-center text-white">
                <ChevronRight size={14} strokeWidth={3} />
              </span>
            </button>
          </div>

          {/* Dashboard Preview (Bleeding Bottom) */}
          <div className="w-full mt-auto translate-y-12 sm:translate-y-20 select-none">
            <DashboardPreview />
          </div>
        </div>

      </div>

      {/* 2. Interactive Analytics Showcase (ReturnShield AI Integrations) */}
      <div className="mt-16 sm:mt-24 px-3 sm:px-4 max-w-[1200px] mx-auto w-full flex flex-col gap-12 sm:gap-16 pb-20 select-none">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto flex flex-col gap-3">
          <div className="inline-flex items-center gap-2 text-[#ef4d23] text-xs font-semibold uppercase tracking-wider justify-center">
            <span className="w-1.5 h-1.5 rounded-full bg-[#ef4d23]" />
            ReturnShield AI Integration
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-900">
            Intelligent Return Risk & Revenue Protection
          </h2>
          <p className="text-neutral-500 text-sm sm:text-base">
            Equip your agency and clients with advanced decision intelligence. Prevent high-risk returns, flags fraud, and safeguards profit margins automatically.
          </p>
        </div>

        {/* Dashboard Showcase Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          
          {/* Showcase Card 1 — Analytics */}
          <div className="bg-white rounded-3xl p-5 sm:p-6 border border-neutral-200/60 shadow-sm flex flex-col justify-between gap-6">
            <div className="flex flex-col gap-2">
              <span className="text-[#ef4d23] text-xs font-bold uppercase tracking-wider">Cohort Analysis</span>
              <h3 className="text-xl font-bold text-neutral-900">Where Returns Originate</h3>
              <p className="text-neutral-500 text-[13px] leading-relaxed">
                Unlock geographic, product category, and user behavior return cohorts. Drill down into specific risk factors with real-time SHAP driver attributions.
              </p>
            </div>
            
            {/* Screenshot Container */}
            <div className="relative rounded-2xl overflow-hidden border border-neutral-100 shadow-md aspect-[16/9] bg-neutral-900 group">
              <img
                src="/screenshot-analytics.png"
                alt="ReturnShield Analytics Cohort Analysis Dashboard"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
              />
              <div className="absolute inset-0 bg-neutral-950/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="bg-white/95 text-neutral-900 text-xs font-semibold px-4 py-2 rounded-full shadow-md">
                  View Analytics Control Room
                </span>
              </div>
            </div>
          </div>

          {/* Showcase Card 2 — Overview */}
          <div className="bg-white rounded-3xl p-5 sm:p-6 border border-neutral-200/60 shadow-sm flex flex-col justify-between gap-6">
            <div className="flex flex-col gap-2">
              <span className="text-[#ef4d23] text-xs font-bold uppercase tracking-wider">Revenue Protection</span>
              <h3 className="text-xl font-bold text-neutral-900">Revenue Under Protection</h3>
              <p className="text-neutral-500 text-[13px] leading-relaxed">
                Monitor live risk parameters, identify high-loss orders, and take automated preventive actions like size guide triggers or exchange campaigns before dispatch.
              </p>
            </div>

            {/* Screenshot Container */}
            <div className="relative rounded-2xl overflow-hidden border border-neutral-100 shadow-md aspect-[16/9] bg-neutral-900 group">
              <img
                src="/screenshot-overview.png"
                alt="ReturnShield Revenue Protection Overview Dashboard"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
              />
              <div className="absolute inset-0 bg-neutral-950/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="bg-white/95 text-neutral-900 text-xs font-semibold px-4 py-2 rounded-full shadow-md">
                  View Overview Dashboard
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
          <div className="flex flex-col gap-2 p-5 bg-white rounded-2xl border border-neutral-200/40">
            <div className="w-8 h-8 rounded-full bg-[#ef4d23]/10 flex items-center justify-center text-[#ef4d23] font-bold text-sm">01</div>
            <h4 className="font-semibold text-neutral-900 text-sm sm:text-base">Real-Time Risk Scoring</h4>
            <p className="text-neutral-500 text-xs sm:text-[13px] leading-relaxed">
              Every checkout order is evaluated dynamically against returns risk data points and user historical patterns.
            </p>
          </div>
          
          <div className="flex flex-col gap-2 p-5 bg-white rounded-2xl border border-neutral-200/40">
            <div className="w-8 h-8 rounded-full bg-[#ef4d23]/10 flex items-center justify-center text-[#ef4d23] font-bold text-sm">02</div>
            <h4 className="font-semibold text-neutral-900 text-sm sm:text-base">AI-Powered Co-Pilot</h4>
            <p className="text-neutral-500 text-xs sm:text-[13px] leading-relaxed">
              Ask risk-related questions in plain English and receive instant dashboard insight answers via built-in Llama 3 models.
            </p>
          </div>

          <div className="flex flex-col gap-2 p-5 bg-white rounded-2xl border border-neutral-200/40">
            <div className="w-8 h-8 rounded-full bg-[#ef4d23]/10 flex items-center justify-center text-[#ef4d23] font-bold text-sm">03</div>
            <h4 className="font-semibold text-neutral-900 text-sm sm:text-base">Interactive Interventions</h4>
            <p className="text-neutral-500 text-xs sm:text-[13px] leading-relaxed">
              Deploy sizing corrections, checkout flag warnings, and exchange discount popups automatically based on customer risk profiles.
            </p>
          </div>
        </div>

        {/* Call to action section */}
        <div className="bg-[#0b0f1a] text-white rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 border border-neutral-800 shadow-xl">
          <div className="flex flex-col gap-1.5 text-center sm:text-left">
            <h3 className="text-lg sm:text-xl font-bold tracking-tight">Ready to safeguard your store's margins?</h3>
            <p className="text-neutral-400 text-xs sm:text-sm">
              Join thousands of merchant brands using Convix and ReturnShield AI.
            </p>
          </div>
          <button
            type="button"
            onClick={onEnterWorkspace}
            className="bg-[#ef4d23] hover:bg-[#d83c16] text-white text-xs sm:text-sm font-semibold rounded-full px-6 py-3 transition-colors flex items-center gap-2 cursor-pointer flex-shrink-0"
          >
            {isAuthenticated ? 'Enter Control Room' : 'Access Sandbox Console'}
            <ChevronRight size={14} strokeWidth={3} />
          </button>
        </div>

      </div>

    </div>
  );
};
