import React from 'react';
import { Headphones, MessageSquare, Star, Smartphone, PhoneCall, Radio } from 'lucide-react';

export default function ChannelDonutChart() {
  const channels = [
    { name: 'Zendesk Support', count: 420, percent: 34, color: '#0c87eb', icon: Headphones },
    { name: 'Discord Community', count: 310, percent: 25, color: '#6366f1', icon: MessageSquare },
    { name: 'G2 & Capterra', count: 215, percent: 17, color: '#f59e0b', icon: Star },
    { name: 'Gong Sales Calls', count: 145, percent: 12, color: '#10b981', icon: PhoneCall },
    { name: 'App Store / Play', count: 98, percent: 8, color: '#ec4899', icon: Smartphone },
    { name: 'In-App NPS Micro', count: 60, percent: 4, color: '#8b5cf6', icon: Radio },
  ];

  const radius = 55;
  const circumference = 2 * Math.PI * radius;

  // Pre-calculate pure SVG donut segments to avoid offset drift on re-render
  let cumulative = 0;
  const segments = channels.map((ch) => {
    const strokeDasharray = `${(ch.percent / 100) * circumference} ${circumference}`;
    const strokeDashoffset = -cumulative * circumference;
    cumulative += ch.percent / 100;
    return { ...ch, strokeDasharray, strokeDashoffset };
  });

  return (
    <div className="glass-panel p-6 flex flex-col justify-between">
      <div className="mb-4">
        <h3 className="font-bold text-sm text-slate-900 dark:text-white">
          Multi-Channel Source Distribution
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
          Breakdown of customer feedback volume across enterprise touchpoints
        </p>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-6 my-2">
        
        {/* SVG Donut */}
        <div className="relative w-36 h-36 flex items-center justify-center flex-shrink-0">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 140 140">
            {segments.map((seg, idx) => (
              <circle
                key={idx}
                cx="70"
                cy="70"
                r={radius}
                fill="transparent"
                stroke={seg.color}
                strokeWidth="18"
                strokeDasharray={seg.strokeDasharray}
                strokeDashoffset={seg.strokeDashoffset}
                className="transition-all duration-300 hover:opacity-80"
              />
            ))}
          </svg>
          <div className="absolute flex flex-col items-center justify-center text-center">
            <span className="text-lg font-extrabold text-slate-900 dark:text-white">1,248</span>
            <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Entries</span>
          </div>
        </div>

        {/* Legend list */}
        <div className="flex-1 grid grid-cols-1 gap-2 w-full">
          {channels.map((ch) => {
            const Icon = ch.icon;
            return (
              <div key={ch.name} className="flex items-center justify-between text-xs py-1 px-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800/60 transition">
                <div className="flex items-center space-x-2">
                  <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: ch.color }}></span>
                  <Icon className="h-3.5 w-3.5 text-slate-400" />
                  <span className="font-medium text-slate-700 dark:text-slate-300 truncate max-w-[130px]">
                    {ch.name}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="font-semibold text-slate-900 dark:text-white">{ch.count}</span>
                  <span className="text-[11px] text-slate-400 w-8 text-right">{ch.percent}%</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>

      <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
        <span>Zendesk + Discord account for <b>59%</b> of total signals</span>
        <span className="text-emerald-500 font-medium">99.8% Ingestion Uptime</span>
      </div>
    </div>
  );
}
