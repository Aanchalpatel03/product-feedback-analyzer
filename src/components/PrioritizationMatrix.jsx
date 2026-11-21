import React, { useState } from 'react';
import { 
  Zap, 
  Rocket, 
  Clock, 
  Ban, 
  Info, 
  ArrowUpRight, 
  CheckCircle2, 
  Users,
  DollarSign
} from 'lucide-react';

export default function PrioritizationMatrix({ backlogList, onSelectFeature }) {
  const [activeQuadrant, setActiveQuadrant] = useState('ALL');
  const [hoveredFeature, setHoveredFeature] = useState(backlogList[0]);

  const quadrants = [
    {
      id: 'Quick Win',
      title: 'Quick Wins',
      subtitle: 'High Value, Low Effort',
      icon: Zap,
      color: 'emerald',
      bgClass: 'bg-emerald-500/5 dark:bg-emerald-950/20 border-emerald-500/20',
      tagClass: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30',
      action: 'Prioritize in immediate sprint'
    },
    {
      id: 'Major Strategic Bet',
      title: 'Major Strategic Bets',
      subtitle: 'High Value, High Effort',
      icon: Rocket,
      color: 'brand',
      bgClass: 'bg-brand-500/5 dark:bg-brand-950/20 border-brand-500/20',
      tagClass: 'bg-brand-500/10 text-brand-600 dark:text-brand-400 border-brand-500/30',
      action: 'Deconstruct into MVP milestones'
    },
    {
      id: 'Fill-In',
      title: 'Fill-Ins / Low-Hanging Fruit',
      subtitle: 'Low Value, Low Effort',
      icon: Clock,
      color: 'amber',
      bgClass: 'bg-amber-500/5 dark:bg-amber-950/20 border-amber-500/20',
      tagClass: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30',
      action: 'Slot into buffer sprints'
    },
    {
      id: 'Thankless Task',
      title: 'Thankless Tasks / Money Pits',
      subtitle: 'Low Value, High Effort',
      icon: Ban,
      color: 'rose',
      bgClass: 'bg-rose-500/5 dark:bg-rose-950/20 border-rose-500/20',
      tagClass: 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/30',
      action: 'Challenge assumptions & deprioritize'
    }
  ];

  const filteredFeatures = activeQuadrant === 'ALL'
    ? backlogList
    : backlogList.filter(f => f.quadrant === activeQuadrant);

  return (
    <div className="space-y-6">
      
      {/* Header & Framework Description */}
      <div className="glass-panel p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="p-1.5 rounded-lg bg-brand-500/10 text-brand-500">
                <Rocket className="h-4 w-4" />
              </span>
              <h2 className="text-lg font-extrabold text-slate-900 dark:text-white">
                Interactive 2x2 Value vs. Effort Matrix
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-3xl">
              Mathematically maps customer feedback impact against architectural implementation complexity. Used by senior product leaders to allocate engineering resources objectively.
            </p>
          </div>

          {/* Quadrant Quick Filter */}
          <div className="flex flex-wrap gap-1.5 bg-slate-100 dark:bg-slate-800/80 p-1 rounded-xl text-xs">
            <button
              onClick={() => setActiveQuadrant('ALL')}
              className={`px-3 py-1.5 rounded-lg font-medium transition ${
                activeQuadrant === 'ALL'
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm'
                  : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              All Quadrants ({backlogList.length})
            </button>
            {quadrants.map(q => {
              const count = backlogList.filter(f => f.quadrant === q.id).length;
              return (
                <button
                  key={q.id}
                  onClick={() => setActiveQuadrant(q.id)}
                  className={`px-3 py-1.5 rounded-lg font-medium transition ${
                    activeQuadrant === q.id
                      ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm'
                      : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                  }`}
                >
                  {q.title.split('/')[0]} ({count})
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* The 2x2 Grid Visualization Canvas */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Interactive 2x2 Visual Canvas */}
        <div className="glass-panel p-6 relative flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-1.5 text-xs font-bold text-slate-400 uppercase tracking-wider">
              <span>Value Score (Y-Axis) vs Effort Score (X-Axis)</span>
            </div>
            <span className="text-[11px] text-slate-400">Click any feature to inspect details</span>
          </div>

          <div className="relative w-full h-[360px] bg-slate-100/60 dark:bg-slate-950/60 rounded-xl border border-slate-200 dark:border-slate-800 p-4 overflow-hidden">
            
            {/* Axis Lines */}
            <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-slate-300 dark:bg-slate-700/80 border-dashed" />
            <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-slate-300 dark:bg-slate-700/80 border-dashed" />

            {/* Quadrant Background Watermarks */}
            <div className="absolute top-3 left-4 text-[11px] font-bold text-emerald-600/70 dark:text-emerald-400/60 uppercase tracking-wider flex items-center space-x-1">
              <Zap className="h-3.5 w-3.5" />
              <span>Quick Wins (High Value / Low Effort)</span>
            </div>
            <div className="absolute top-3 right-4 text-[11px] font-bold text-brand-600/70 dark:text-brand-400/60 uppercase tracking-wider flex items-center space-x-1">
              <Rocket className="h-3.5 w-3.5" />
              <span>Strategic Bets (High Value / High Effort)</span>
            </div>
            <div className="absolute bottom-3 left-4 text-[11px] font-bold text-amber-600/70 dark:text-amber-400/60 uppercase tracking-wider flex items-center space-x-1">
              <Clock className="h-3.5 w-3.5" />
              <span>Fill-Ins (Low Value / Low Effort)</span>
            </div>
            <div className="absolute bottom-3 right-4 text-[11px] font-bold text-rose-600/70 dark:text-rose-400/60 uppercase tracking-wider flex items-center space-x-1">
              <Ban className="h-3.5 w-3.5" />
              <span>Thankless Tasks (Low Value / High Effort)</span>
            </div>

            {/* Feature Plot Nodes */}
            {backlogList.map((feat) => {
              // Map effort 0-100 to left (10% to 90%)
              const leftPercent = 8 + (feat.effortScore / 100) * 84;
              // Map value 0-100 to bottom (10% to 90%)
              const bottomPercent = 8 + (feat.valueScore / 100) * 84;

              const isSelected = hoveredFeature?.id === feat.id;

              let nodeColorClass = 'bg-brand-500 shadow-brand-500/50';
              if (feat.quadrant === 'Quick Win') nodeColorClass = 'bg-emerald-500 shadow-emerald-500/50';
              if (feat.quadrant === 'Fill-In') nodeColorClass = 'bg-amber-500 shadow-amber-500/50';
              if (feat.quadrant === 'Thankless Task') nodeColorClass = 'bg-rose-500 shadow-rose-500/50';

              return (
                <div
                  key={feat.id}
                  onClick={() => setHoveredFeature(feat)}
                  onMouseEnter={() => setHoveredFeature(feat)}
                  style={{ left: `${leftPercent}%`, bottom: `${bottomPercent}%` }}
                  className={`absolute transform -translate-x-1/2 translate-y-1/2 cursor-pointer transition-all duration-200 z-20 group ${
                    isSelected ? 'scale-125 z-30' : 'hover:scale-110'
                  }`}
                >
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold text-white shadow-md ring-2 ${
                    isSelected ? 'ring-white dark:ring-slate-200 scale-110' : 'ring-transparent'
                  } ${nodeColorClass}`}>
                    {feat.id.split('-')[1]}
                  </div>

                  {/* Node Hover Tooltip */}
                  <div className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden group-hover:block whitespace-nowrap bg-slate-900 dark:bg-slate-800 text-white text-[11px] font-medium px-2.5 py-1 rounded-md shadow-lg pointer-events-none z-40 border border-slate-700">
                    <p className="font-bold">{feat.title}</p>
                    <p className="text-slate-400">RICE: {feat.riceScore} | Value: {feat.valueScore} | Effort: {feat.effortScore}</p>
                  </div>
                </div>
              );
            })}

          </div>

          <div className="flex items-center justify-between mt-3 text-[11px] text-slate-500 dark:text-slate-400">
            <span>← Lower Effort (Faster)</span>
            <span>Higher Effort (More Complex) →</span>
          </div>
        </div>

        {/* Feature Inspector Card */}
        <div className="glass-panel p-6 flex flex-col justify-between">
          {hoveredFeature ? (
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-xs font-mono font-bold text-brand-500">
                    {hoveredFeature.id} • {hoveredFeature.productArea}
                  </span>
                  <h3 className="text-base sm:text-lg font-extrabold text-slate-900 dark:text-white mt-1">
                    {hoveredFeature.title}
                  </h3>
                </div>
                <span className={`px-2.5 py-1 rounded-full text-xs font-bold border ${
                  hoveredFeature.quadrant === 'Quick Win' ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/30' :
                  hoveredFeature.quadrant === 'Major Strategic Bet' ? 'bg-brand-500/10 text-brand-500 border-brand-500/30' :
                  hoveredFeature.quadrant === 'Fill-In' ? 'bg-amber-500/10 text-amber-500 border-amber-500/30' :
                  'bg-rose-500/10 text-rose-500 border-rose-500/30'
                }`}>
                  {hoveredFeature.quadrant}
                </span>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {hoveredFeature.description}
              </p>

              {/* Quantitative Metrics Bar */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-3 border-y border-slate-200 dark:border-slate-800">
                <div className="p-2.5 rounded-lg bg-slate-100 dark:bg-slate-800/60">
                  <span className="text-[10px] text-slate-500 uppercase font-semibold">RICE Score</span>
                  <p className="text-lg font-extrabold text-brand-500">{hoveredFeature.riceScore}</p>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-100 dark:bg-slate-800/60">
                  <span className="text-[10px] text-slate-500 uppercase font-semibold">Kano Model</span>
                  <p className="text-xs font-bold text-slate-900 dark:text-white mt-1">{hoveredFeature.kanoCategory}</p>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-100 dark:bg-slate-800/60">
                  <span className="text-[10px] text-slate-500 uppercase font-semibold">Opportunity</span>
                  <p className="text-lg font-extrabold text-emerald-500">{hoveredFeature.opportunityScore}</p>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-100 dark:bg-slate-800/60">
                  <span className="text-[10px] text-slate-500 uppercase font-semibold">ARR at Stake</span>
                  <p className="text-lg font-extrabold text-slate-900 dark:text-white">
                    ${(hoveredFeature.totalArrImpact / 1000).toFixed(0)}k
                  </p>
                </div>
              </div>

              {/* Rationale & Recommendations */}
              <div className="space-y-2 text-xs">
                <div className="p-3 rounded-lg bg-brand-500/5 dark:bg-brand-950/30 border border-brand-500/20">
                  <b className="text-brand-600 dark:text-brand-400">PM Prioritization Rationale:</b>
                  <p className="text-slate-600 dark:text-slate-300 mt-1">{hoveredFeature.kanoRationale}</p>
                </div>

                <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 pt-1">
                  <span>Linked Customer Feedback Signals: <b>{hoveredFeature.linkedFeedbackCount} verified quotes</b></span>
                  <span>Target: <b className="text-slate-800 dark:text-slate-200">{hoveredFeature.targetQuarter}</b></span>
                </div>
              </div>

            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-slate-400 text-center py-12">
              <Info className="h-8 w-8 mb-2" />
              <p>Select any node on the matrix canvas to inspect its multi-dimensional scoring breakdown.</p>
            </div>
          )}

          <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs">
            <span className="text-slate-500">Ownership: <b>{hoveredFeature?.owner || 'Core Engineering'}</b></span>
            <span className="text-brand-500 font-semibold">{hoveredFeature?.status}</span>
          </div>
        </div>

      </div>

    </div>
  );
}
