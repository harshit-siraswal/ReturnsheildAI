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
    <div className="px-3 sm:px-4 w-full select-none" style={{ fontFamily: 'Inter, sans-serif' }}>
      <div className="bg-[#f5f2ee] rounded-t-3xl p-4 sm:p-6 w-full max-w-[880px] mx-auto border-t border-x border-neutral-200/40">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          
          {/* Card 1 — Clicks */}
          <div className="bg-white rounded-2xl p-5 border border-neutral-100 shadow-sm flex flex-col justify-between min-h-[360px]">
            <div>
              {/* Header */}
              <div className="flex justify-between items-center text-[13px] mb-4">
                <span className="font-semibold text-[#ef4d23]">Clicks</span>
                <span className="text-neutral-400 font-medium">This Month</span>
              </div>
              
              {/* Stat Row */}
              <div className="flex items-baseline gap-2 mb-1">
                <span className="text-[28px] font-semibold text-neutral-900 tracking-tight">6,896</span>
                <span className="inline-flex items-center gap-0.5 bg-red-50 text-red-600 rounded-full px-2 py-0.5 text-[11px] font-medium">
                  <TrendingDown size={12} strokeWidth={2.5} />
                  -3,382 (33%)
                </span>
              </div>
              <div className="text-[11px] text-neutral-400 mb-6">Compared to yesterday</div>
              
              {/* Target Labels & Gauge */}
              <div className="flex flex-col items-center">
                <span className="text-[11px] font-medium text-neutral-500 bg-neutral-50 px-2.5 py-1 rounded-full mb-3 border border-neutral-100">
                  Month Target achieved
                </span>
                <Gauge value={92} color="#ef4d23" showLabels={true} min="389K" max="425K" />
              </div>
            </div>
            
            {/* Toggle bottom */}
            <div className="bg-neutral-100 rounded-full p-1 flex mt-6 text-[12px] font-medium text-neutral-500">
              <button
                type="button"
                onClick={() => setCard1Active('Impressions')}
                className={`flex-1 py-1.5 rounded-full transition-all text-center ${
                  card1Active === 'Impressions' ? 'bg-white text-neutral-900 shadow-sm' : 'hover:text-neutral-800'
                }`}
              >
                Impressions
              </button>
              <button
                type="button"
                onClick={() => setCard1Active('Clicks')}
                className={`flex-1 py-1.5 rounded-full transition-all text-center ${
                  card1Active === 'Clicks' ? 'bg-white text-neutral-900 shadow-sm' : 'hover:text-neutral-800'
                }`}
              >
                Clicks
              </button>
            </div>
          </div>

          {/* Card 2 — Form */}
          <div className="bg-white rounded-2xl p-5 border border-neutral-100 shadow-sm flex flex-col gap-3.5 min-h-[360px]">
            {/* Dropdown 1 */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[12px] font-medium text-neutral-500">Show figures for</label>
              <button className="flex items-center justify-between border border-neutral-200 rounded-lg px-3 py-2 text-left text-[13px] font-medium text-neutral-700 bg-white hover:bg-neutral-50 transition-colors">
                This month
                <ChevronDown size={14} className="text-neutral-400" />
              </button>
            </div>

            {/* Dropdown 2 */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[12px] font-medium text-neutral-500">Compare period by</label>
              <button className="flex items-center justify-between border border-neutral-200 rounded-lg px-3 py-2 text-left text-[13px] font-medium text-neutral-700 bg-white hover:bg-neutral-50 transition-colors">
                Month-to-date (MTD)
                <ChevronDown size={14} className="text-neutral-400" />
              </button>
            </div>

            {/* Input 1 */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[12px] font-medium text-neutral-500">Ste targets (This month)</label>
              <div className="flex items-center border border-neutral-200 rounded-lg px-3 py-2 bg-neutral-50 focus-within:border-neutral-400 focus-within:bg-white transition-all">
                <span className="text-neutral-400 text-[13px] font-medium mr-1.5">#</span>
                <input
                  type="number"
                  value={monthTarget}
                  onChange={(e) => setMonthTarget(Number(e.target.value))}
                  className="bg-transparent border-0 outline-0 text-[13px] font-semibold text-neutral-800 w-full p-0 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                />
              </div>
            </div>

            {/* Input 2 */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[12px] font-medium text-neutral-500">Ste targets (This year)</label>
              <div className="flex items-center border border-neutral-200 rounded-lg px-3 py-2 bg-neutral-50 focus-within:border-neutral-400 focus-within:bg-white transition-all">
                <span className="text-neutral-400 text-[13px] font-medium mr-1.5">#</span>
                <input
                  type="number"
                  value={yearTarget}
                  onChange={(e) => setYearTarget(Number(e.target.value))}
                  className="bg-transparent border-0 outline-0 text-[13px] font-semibold text-neutral-800 w-full p-0 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                />
              </div>
            </div>

            {/* Footer Actions */}
            <div className="flex items-center mt-auto pt-2 gap-3.5 border-t border-neutral-100">
              <button className="bg-[#ef4d23] hover:bg-[#d83c16] text-white text-[12px] font-semibold rounded-lg px-5 py-2 transition-colors cursor-pointer">
                Save
              </button>
              <button className="text-[12px] font-semibold text-neutral-500 hover:text-neutral-900 underline underline-offset-4 transition-colors">
                Cancel
              </button>
              <button className="ml-auto text-neutral-400 hover:text-neutral-600 p-1 hover:bg-neutral-100 rounded-md transition-all">
                <X size={16} />
              </button>
            </div>
          </div>

          {/* Card 3 — Video Starts */}
          <div className="bg-white rounded-2xl p-5 border border-neutral-100 shadow-sm flex flex-col justify-between min-h-[360px]">
            <div>
              {/* Header */}
              <div className="flex justify-between items-center text-[13px] mb-4">
                <span className="font-semibold text-[#ef4d23]">Video Starts</span>
                <span className="text-neutral-400 font-medium">today</span>
              </div>
              
              {/* Stat Row */}
              <div className="flex items-baseline gap-2 mb-1">
                <span className="text-[28px] font-semibold text-neutral-900 tracking-tight">0</span>
                <span className="inline-flex items-center gap-0.5 bg-neutral-50 text-neutral-500 rounded-full px-2 py-0.5 text-[11px] font-medium border border-neutral-100">
                  <TrendingUp size={12} strokeWidth={2.5} />
                  0
                </span>
              </div>
              <div className="text-[11px] text-neutral-400 mb-6">Compared to yesterday</div>
              
              {/* Gauge (no labels) */}
              <div className="flex flex-col items-center">
                <Gauge value={68} color="#9ca3af" showLabels={false} />
              </div>
            </div>
            
            {/* Toggle bottom */}
            <div className="bg-neutral-100 rounded-full p-1 flex mt-6 text-[12px] font-medium text-neutral-500">
              <button
                type="button"
                onClick={() => setCard3Active('Video Clicks')}
                className={`flex-1 py-1.5 rounded-full transition-all text-center ${
                  card3Active === 'Video Clicks' ? 'bg-white text-neutral-900 shadow-sm' : 'hover:text-neutral-800'
                }`}
              >
                Video Clicks
              </button>
              <button
                type="button"
                onClick={() => setCard3Active('Video Starts')}
                className={`flex-1 py-1.5 rounded-full transition-all text-center ${
                  card3Active === 'Video Starts' ? 'bg-white text-neutral-900 shadow-sm' : 'hover:text-neutral-800'
                }`}
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
