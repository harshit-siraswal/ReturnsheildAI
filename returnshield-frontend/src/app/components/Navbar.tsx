import React, { useState } from 'react';
import { ShoppingCart, Menu, X, ChevronDown, ChevronRight } from 'lucide-react';

interface NavbarProps {
  onLoginClick?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onLoginClick }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  // Reusable logo SVG
  const Logo = () => (
    <svg viewBox="0 0 32 32" fill="#ef4d23" className="w-7 h-7 sm:w-8 sm:h-8 flex-shrink-0">
      {/* Center circle */}
      <circle cx="16" cy="16" r="3.5" />
      {/* 8 petals at radius 10 around center */}
      <circle cx="26" cy="16" r="3.5" />
      <circle cx="23.07" cy="23.07" r="3.5" />
      <circle cx="16" cy="26" r="3.5" />
      <circle cx="8.93" cy="23.07" r="3.5" />
      <circle cx="6" cy="16" r="3.5" />
      <circle cx="8.93" cy="8.93" r="3.5" />
      <circle cx="16" cy="6" r="3.5" />
      <circle cx="23.07" cy="8.93" r="3.5" />
    </svg>
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
          <a href="#about" className="landing-link">About</a>
          <a href="#pages" className="landing-link pages-link">
            Pages
            <ChevronDown size={12} strokeWidth={3.5} />
          </a>
        </div>

        {/* Right cluster */}
        <div className="landing-right-cluster">
          {/* Shopping Cart (desktop only) */}
          <button 
            type="button" 
            className="landing-cart-btn"
            aria-label="Shopping Cart"
          >
            <ShoppingCart size={20} />
          </button>

          {/* Action button */}
          <button
            type="button"
            onClick={onLoginClick}
            className="landing-access-btn"
          >
            <span className="hidden sm:inline">Get early access</span>
            <span className="sm:hidden">Early access</span>
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
            <a
              href="#home"
              onClick={() => setIsOpen(false)}
              className="landing-mobile-link active"
            >
              Home
              <span className="landing-link-dot"></span>
            </a>
            <a
              href="#features"
              onClick={() => setIsOpen(false)}
              className="landing-mobile-link"
            >
              Features
            </a>
            <a
              href="#about"
              onClick={() => setIsOpen(false)}
              className="landing-mobile-link"
            >
              About
            </a>
            <a
              href="#pages"
              onClick={() => setIsOpen(false)}
              className="landing-mobile-link"
              style={{ color: 'var(--convix-orange)', fontWeight: 600 }}
            >
              Pages
              <ChevronDown size={14} strokeWidth={3.5} />
            </a>
          </div>
        )}
      </div>
    </div>
  );
};
