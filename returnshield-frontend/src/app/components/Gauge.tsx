import React from 'react';

interface GaugeProps {
  value: number;
  color?: string;
  showLabels?: boolean;
  min?: string;
  max?: string;
}

export const Gauge: React.FC<GaugeProps> = ({
  value,
  color = '#ef4d23',
  showLabels = false,
  min = '0',
  max = '100',
}) => {
  const totalTicks = 40;
  const activeCount = Math.round((value / 100) * totalTicks);
  
  const ticks = Array.from({ length: totalTicks }).map((_, i) => {
    const angle = Math.PI + (i / (totalTicks - 1)) * Math.PI;
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);
    
    // Line from inner radius (r=70) to outer radius (r=80)
    const x1 = 100 + 70 * cos;
    const y1 = 100 + 70 * sin;
    const x2 = 100 + 80 * cos;
    const y2 = 100 + 80 * sin;
    
    const isActive = i < activeCount;
    return { x1, y1, x2, y2, isActive };
  });

  return (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', userSelect: 'none', maxWidth: '260px', margin: '0 auto' }}>
      <svg viewBox="0 0 200 120" className="w-full h-auto">
        {ticks.map((tick, index) => (
          <line
            key={index}
            x1={tick.x1}
            y1={tick.y1}
            x2={tick.x2}
            y2={tick.y2}
            stroke={tick.isActive ? color : '#d4d4d8'}
            strokeWidth={2.5}
            strokeLinecap="round"
          />
        ))}
        <text
          x={100}
          y={105}
          textAnchor="middle"
          fontSize={22}
          fontWeight={600}
          fill="#0b0f1a"
          style={{ fontFamily: 'Inter, sans-serif' }}
        >
          {value}%
        </text>
      </svg>
      {showLabels && (
        <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', padding: '0 12px', marginTop: '-8px', fontSize: '11px', color: '#737373', fontWeight: 500, fontFamily: 'Inter, sans-serif' }}>
          <span>{min}</span>
          <span>{max}</span>
        </div>
      )}
    </div>
  );
};
