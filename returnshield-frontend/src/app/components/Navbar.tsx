import React, { useState } from 'react';
import { Menu, X, ChevronDown, ChevronRight } from 'lucide-react';

interface NavbarProps {
  onLoginClick?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onLoginClick }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  // ReturnShield logo — bar chart with shield accent
  const Logo = () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <svg viewBox="0 0 32 32" width="28" height="28" fill="none">
        {/* Shield */}
        <path d="M16 3L5 7.5V15c0 5.8 4.7 10.5 11 13 6.3-2.5 11-7.2 11-13V7.5L16 3z"
              fill="#ef4d23" opacity="0.15"/>
        <path d="M16 3L5 7.5V15c0 5.8 4.7 10.5 11 13 6.3-2.5 11-7.2 11-13V7.5L16 3z"
              stroke="#ef4d23" strokeWidth="1.5" fill="none"/>
        {/* Bar chart inside */}
        <rect x="10" y="17" width="3" height="5" rx="0.8" fill="#ef4d23"/>
        <rect x="14.5" y="13" width="3" height="9" rx="0.8" fill="#ef4d23"/>
        <rect x="19" y="15" width="3" height="7" rx="0.8" fill="#ef4d23" opacity="0.7"/>
      </svg>
      <span style={{ fontWeight: 700, fontSize: '15px', color: '#0b0f1a', letterSpacing: '-0.01em', fontFamily: 'Inter, sans-serif' }}>
        ReturnShield
      </span>
    </div>
  );

  return (
    <div className="landing-nav-wrapper">
      <div className="landing-nav-pill">
        {/* Logo */}
        <div className="landing-logo">
          <Logo />
        </div>

        {/* Desktop Nav Links */}
        <div className="landing-links">
          <a href="#home" className="landing-link active">
            <span className="landing-link-dot"></span>
            Home
          </a>
          <a href="#features" className="landing-link">Features</a>
          <a href="#about" className="landing-link">How it works</a>
          <a href="#pricing" className="landing-link pages-link">
            Pricing
            <ChevronDown size={12} strokeWidth={3.5} />
          </a>
        </div>

        {/* Right cluster */}
        <div className="landing-right-cluster">
          {/* Action button */}
          <button
            type="button"
            onClick={onLoginClick}
            className="landing-access-btn"
          >
            <span>Request Demo</span>
            <span className="landing-access-icon">
              <ChevronRight size={14} strokeWidth={3.5} />
            </span>
          </button>

          {/* Mobile hamburger menu */}
          <button
            type="button"
            onClick={toggleMenu}
            className="landing-hamburger-btn"
            aria-expanded={isOpen}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Dropdown panel for mobile links */}
        {isOpen && (
          <div className="landing-mobile-dropdown">
            <a href="#home" onClick={() => setIsOpen(false)} className="landing-mobile-link active">
              Home
              <span className="landing-link-dot"></span>
            </a>
            <a href="#features" onClick={() => setIsOpen(false)} className="landing-mobile-link">Features</a>
            <a href="#about" onClick={() => setIsOpen(false)} className="landing-mobile-link">How it works</a>
            <a href="#pricing" onClick={() => setIsOpen(false)} className="landing-mobile-link"
               style={{ color: 'var(--convix-orange)', fontWeight: 600 }}>
              Pricing
              <ChevronDown size={14} strokeWidth={3.5} />
            </a>
            <button
              type="button"
              onClick={() => { setIsOpen(false); onLoginClick?.(); }}
              className="landing-mobile-cta"
            >
              Request Demo
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
