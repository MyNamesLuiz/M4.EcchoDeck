import React from 'react';

interface MasteryCircleProps {
  percentage: number;
  size?: number;
}

const MasteryCircle: React.FC<MasteryCircleProps> = ({ percentage, size = 100 }) => {
  const strokeWidth = 7;
  const radius = (size - strokeWidth * 2) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;
  const center = size / 2;

  return (
    // width/height are dynamic from the `size` prop — inline style is necessary here
    <div
      className="relative inline-flex items-center justify-center"
      style={{ width: size, height: size }}
    >
      {/* SVG attributes (stopColor, strokeDashoffset transition) are SVG-specific and cannot use Tailwind */}
      <svg
        width={size}
        height={size}
        className="absolute inset-0 -rotate-90"
      >
        <defs>
          <linearGradient id="masteryGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#6366F1" />
            <stop offset="100%" stopColor="#8B5CF6" />
          </linearGradient>
        </defs>
        <circle
          cx={center}
          cy={center}
          r={radius}
          stroke="#E2E8F0"
          strokeWidth={strokeWidth}
          fill="none"
        />
        <circle
          cx={center}
          cy={center}
          r={radius}
          stroke="url(#masteryGrad)"
          strokeWidth={strokeWidth}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{ transition: 'stroke-dashoffset 0.7s ease' }}
        />
      </svg>
      <div className="relative flex flex-col items-center">
        <span
          className={`font-bold text-slate-800 leading-none ${size < 80 ? 'text-[11px]' : 'text-sm'}`}
        >
          {percentage.toFixed(1)}%
        </span>
        <span className="text-[10px] text-slate-500 mt-0.5">Domínio</span>
      </div>
    </div>
  );
};

export default MasteryCircle;
