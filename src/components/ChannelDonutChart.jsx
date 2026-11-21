import React from 'react';
import { Headphones, MessageSquare, Star, Smartphone, PhoneCall, Radio, Github, UploadCloud, Globe } from 'lucide-react';

const CHANNEL_ICONS = {
  'Zendesk': Headphones,
  'Discord': MessageSquare,
  'G2 Crowd': Star,
  'Gong Transcript': PhoneCall,
  'App Store': Smartphone,
  'In-App NPS': Radio,
  'GitHub Issues': Github,
  'CSV Upload': UploadCloud,
  'Live Web': Globe
};

const CHANNEL_COLORS = {
  'Zendesk': '#0c87eb',
  'Discord': '#6366f1',
  'G2 Crowd': '#f59e0b',
  'Gong Transcript': '#10b981',
  'App Store': '#ec4899',
  'In-App NPS': '#8b5cf6',
  'GitHub Issues': '#10b981',
  'CSV Upload': '#3b82f6',
  'Live Web': '#06b6d4'
};

export default function ChannelDonutChart({ feedbackList = [], onSelectChannel }) {
  const total = feedbackList.length;

  // Group by channel dynamically from the real feedback list
  const channelCounts = {};
  feedbackList.forEach(item => {
    const ch = item.channel || 'Direct Voice';
    channelCounts[ch] = (channelCounts[ch] || 0) + 1;
  });

  const channels = Object.entries(channelCounts).map(([name, count], idx) => {
    const percent = total > 0 ? Math.round((count / total) * 100) : 0;
    const Icon = CHANNEL_ICONS[name] || Globe;
    const color = CHANNEL_COLORS[name] || ['#0c87eb', '#6366f1', '#10b981', '#f59e0b', '#ec4899', '#8b5cf6'][idx % 6];
    return {
      name,
      count,
      percent,
      color,
      icon: Icon
    };
  }).sort((a, b) => b.count - a.count);

  const radius = 55;
  const circumference = 2 * Math.PI * radius;

  // Pre-calculate pure SVG donut segments to avoid offset drift
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
          Real-time breakdown of ingested customer signals across verified channels
        </p>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-6 my-2">
        
        {/* SVG Donut */}
        <div className="relative w-36 h-36 flex items-center justify-center flex-shrink-0">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 140 140">
            {total === 0 ? (
              <circle
                cx="70"
                cy="70"
                r={radius}
                fill="transparent"
                stroke="#334155"
                strokeWidth="18"
                strokeDasharray="4 4"
              />
            ) : (
              segments.map((seg, idx) => (
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
              ))
            )}
          </svg>
          <div className="absolute flex flex-col items-center justify-center text-center">
            <span className="text-lg font-extrabold text-slate-900 dark:text-white">
              {total.toLocaleString()}
            </span>
            <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
              {total === 1 ? 'Signal' : 'Signals'}
            </span>
          </div>
        </div>

        {/* Legend list */}
        <div className="flex-1 grid grid-cols-1 gap-2 w-full">
          {total === 0 ? (
            <div className="p-4 text-center text-xs text-slate-400 border border-dashed border-slate-300 dark:border-slate-800 rounded-xl">
              No channel data yet. Ingest live signals from GitHub or add simulated feedback above.
            </div>
          ) : (
            channels.map((ch) => {
              const Icon = ch.icon;
              return (
                <div 
                  key={ch.name} 
                  onClick={() => onSelectChannel && onSelectChannel(ch.name)}
                  className="flex items-center justify-between text-xs py-1 px-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800/60 transition cursor-pointer group"
                >
                  <div className="flex items-center space-x-2">
                    <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: ch.color }}></span>
                    <Icon className="h-3.5 w-3.5 text-slate-400 group-hover:text-brand-500" />
                    <span className="font-medium text-slate-700 dark:text-slate-300 truncate max-w-[130px] group-hover:text-brand-500">
                      {ch.name}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="font-semibold text-slate-900 dark:text-white">{ch.count}</span>
                    <span className="text-[11px] text-slate-400 w-8 text-right">{ch.percent}%</span>
                  </div>
                </div>
              );
            })
          )}
        </div>

      </div>

      <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
        <span>
          {channels[0] ? `${channels[0].name} leads with ${channels[0].percent}% of signals` : 'Ready for live ingestion'}
        </span>
        <span className="text-emerald-500 font-medium">99.8% Pipeline Uptime</span>
      </div>
    </div>
  );
}
