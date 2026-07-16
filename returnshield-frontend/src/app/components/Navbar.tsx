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
    <div className="flex justify-center pt-4 sm:pt-6 px-3 sm:px-4 w-full select-none" style={{ fontFamily: 'Inter, sans-serif' }}>
      <div className="bg-white rounded-full shadow-sm border border-neutral-200 pl-4 pr-2 py-2 w-full max-w-[760px] relative flex items-center justify-between z-30">
        {/* Logo and Brand */}
        <div className="flex items-center gap-2">
          <Logo />
          <span className="font-semibold text-neutral-900 tracking-tight text-sm sm:text-base">Convix</span>
        </div>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-6 text-[14px] font-medium text-neutral-600">
          <a href="#home" className="hover:text-neutral-900 flex items-center gap-1.5 text-neutral-950 font-semibold">
            Home
            <span className="w-[4px] h-[4px] bg-black rounded-full"></span>
          </a>
          <a href="#features" className="hover:text-neutral-900">Features</a>
          <a href="#about" className="hover:text-neutral-900">About</a>
          <a href="#pages" className="hover:text-[#ef4d23] text-neutral-600 flex items-center gap-1">
            Pages
            <ChevronDown size={14} strokeWidth={3.5} className="text-[#ef4d23]" />
          </a>
        </div>

        {/* Right cluster */}
        <div className="flex items-center gap-3 sm:gap-4 ml-auto">
          {/* Shopping Cart (desktop only) */}
          <button 
            type="button" 
            className="hidden md:flex p-1.5 hover:bg-neutral-100 rounded-full text-neutral-600 hover:text-neutral-900 transition-colors"
            aria-label="Shopping Cart"
          >
            <ShoppingCart size={20} />
          </button>

          {/* Action button */}
          <button
            type="button"
            onClick={onLoginClick}
            className="bg-[#ef4d23] hover:bg-[#d83c16] text-white rounded-full pl-4 pr-1.5 py-1.5 flex items-center gap-2 text-[12px] sm:text-[14px] font-medium transition-colors cursor-pointer"
          >
            <span className="hidden sm:inline">Get early access</span>
            <span className="sm:hidden">Early access</span>
            <span className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0 text-white">
              <ChevronRight size={14} strokeWidth={3.5} />
            </span>
          </button>

          {/* Mobile hamburger menu */}
          <button
            type="button"
            onClick={toggleMenu}
            className="md:hidden p-1.5 hover:bg-neutral-100 rounded-full text-neutral-600 transition-colors"
            aria-expanded={isOpen}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Dropdown panel for mobile links */}
        {isOpen && (
          <div className="absolute top-full left-2 right-2 mt-2 bg-white rounded-2xl shadow-lg border border-neutral-200 p-3 z-20 md:hidden flex flex-col gap-1">
            <a
              href="#home"
              onClick={() => setIsOpen(false)}
              className="px-4 py-2.5 rounded-xl hover:bg-neutral-50 text-[14px] font-semibold text-neutral-900 flex items-center justify-between"
            >
              Home
              <span className="w-1.5 h-1.5 bg-black rounded-full"></span>
            </a>
            <a
              href="#features"
              onClick={() => setIsOpenOpen(false)}
              className="px-4 py-2.5 rounded-xl hover:bg-neutral-50 text-[14px] font-medium text-neutral-600 hover:text-neutral-900"
            >
              Features
            </a>
            <a
              href="#about"
              onClick={() => setIsOpen(false)}
              className="px-4 py-2.5 rounded-xl hover:bg-neutral-50 text-[14px] font-medium text-neutral-600 hover:text-neutral-900"
            >
              About
            </a>
            <a
              href="#pages"
              onClick={() => setIsOpen(false)}
              className="px-4 py-2.5 rounded-xl hover:bg-neutral-50 text-[14px] font-medium text-[#ef4d23] flex items-center justify-between"
            >
              Pages
              <ChevronDown size={14} strokeWidth={3.5} />
            </a>
          </div>
        )}
      </div>
    </div>
  );

  // Helper type fix
  function setIsOpenOpen(val: boolean) {
    setIsOpen(val);
  }
};
