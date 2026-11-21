import React, { useState } from 'react';
import { TrendingUp, Calendar, Info } from 'lucide-react';

export default function SentimentVelocityChart() {
  const [timeframe, setTimeframe] = useState('6M');

  // Synthetic trendline data representing multi-month customer sentiment velocity
  const trendData = [
    { month: 'Jun', positive: 64, neutral: 28, negative: 18, total: 110, avgScore: 0.42 },
    { month: 'Jul', positive: 72, neutral: 25, negative: 24, total: 121, avgScore: 0.38 },
    { month: 'Aug', positive: 85, neutral: 30, negative: 32, total: 147, avgScore: 0.35 },
    { month: 'Sep', positive: 96, neutral: 35, negative: 46, total: 177, avgScore: 0.28 }, // Incident spike
    { month: 'Oct', positive: 115, neutral: 42, negative: 38, total: 195, avgScore: 0.41 },
    { month: 'Nov', positive: 142, neutral: 38, negative: 26, total: 206, avgScore: 0.56 }, // Recovery after release
  ];

  const [hoveredMonth, setHoveredMonth] = useState(trendData[trendData.length - 1]);

  // SVG Chart parameters
  const height = 180;
  const width = 500;
  const padding = 35;

  const maxVal = Math.max(...trendData.map(d => d.total));
  const pointsPositive = trendData.map((d, i) => {
    const x = padding + (i / (trendData.length - 1)) * (width - 2 * padding);
    const y = height - padding - (d.positive / maxVal) * (height - 2 * padding);
    return `${x},${y}`;
  }).join(' ');

  const pointsNegative = trendData.map((d, i) => {
    const x = padding + (i / (trendData.length - 1)) * (width - 2 * padding);
    const y = height - padding - (d.negative / maxVal) * (height - 2 * padding);
    return `${x},${y}`;
  }).join(' ');

  return (
    <div className="glass-panel p-6 flex flex-col justify-between">
      <div className="flex items-center justify-between mb-4">
        <div>
          <div className="flex items-center space-x-2">
            <h3 className="font-bold text-sm text-slate-900 dark:text-white">
              Sentiment Velocity & Volume Trend
            </h3>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-medium">
              +18% Satisfaction Recovery
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            6-month longitudinal tracking of positive vs negative feedback volume
          </p>
        </div>

        <div className="flex items-center space-x-1 bg-slate-100 dark:bg-slate-800/80 p-1 rounded-lg text-xs">
          {['1M', '3M', '6M', '1Y'].map(t => (
            <button
              key={t}
              onClick={() => setTimeframe(t)}
              className={`px-2 py-0.5 rounded text-[11px] font-medium transition ${
                timeframe === t 
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm' 
                  : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Interactive SVG Chart */}
      <div className="relative w-full h-[200px] flex items-center justify-center">
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full overflow-visible">
          <defs>
            <linearGradient id="posGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#10b981" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#10b981" stopOpacity="0.0" />
            </linearGradient>
            <linearGradient id="negGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#f43f5e" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#f43f5e" stopOpacity="0.0" />
            </linearGradient>
          </defs>

          {/* Grid lines */}
          {[0.25, 0.5, 0.75, 1.0].map((ratio, idx) => {
            const y = height - padding - ratio * (height - 2 * padding);
            return (
              <line
                key={idx}
                x1={padding}
                y1={y}
                x2={width - padding}
                y2={y}
                stroke="currentColor"
                className="text-slate-200 dark:text-slate-800/60"
                strokeDasharray="4 4"
              />
            );
          })}

          {/* Lines */}
          <polyline
            fill="none"
            stroke="#10b981"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            points={pointsPositive}
          />
          <polyline
            fill="none"
            stroke="#f43f5e"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray="3 3"
            points={pointsNegative}
          />

          {/* Month Data Points */}
          {trendData.map((d, i) => {
            const x = padding + (i / (trendData.length - 1)) * (width - 2 * padding);
            const yPos = height - padding - (d.positive / maxVal) * (height - 2 * padding);
            const yNeg = height - padding - (d.negative / maxVal) * (height - 2 * padding);
            const isHovered = hoveredMonth.month === d.month;

            return (
              <g key={d.month} className="cursor-pointer" onMouseEnter={() => setHoveredMonth(d)}>
                {/* Positive circle */}
                <circle
                  cx={x}
                  cy={yPos}
                  r={isHovered ? 5 : 3.5}
                  className="fill-emerald-500 transition-all"
                />
                {/* Negative circle */}
                <circle
                  cx={x}
                  cy={yNeg}
                  r={isHovered ? 4.5 : 3}
                  className="fill-rose-500 transition-all"
                />
                {/* Month label */}
                <text
                  x={x}
                  y={height - 10}
                  textAnchor="middle"
                  className={`text-[11px] font-medium transition ${
                    isHovered ? 'fill-brand-500 font-bold' : 'fill-slate-400'
                  }`}
                >
                  {d.month}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Chart Footer / Hover Breakdown */}
      <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
            <span className="text-slate-600 dark:text-slate-400">Positive: <b className="text-slate-900 dark:text-white">{hoveredMonth.positive}</b></span>
          </div>
          <div className="flex items-center space-x-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span>
            <span className="text-slate-600 dark:text-slate-400">Frustrated: <b className="text-slate-900 dark:text-white">{hoveredMonth.negative}</b></span>
          </div>
        </div>
        <span className="text-slate-500 dark:text-slate-400 text-[11px]">
          Hovered: <span className="font-semibold text-slate-800 dark:text-slate-200">{hoveredMonth.month} 2026</span>
        </span>
      </div>
    </div>
  );
}
