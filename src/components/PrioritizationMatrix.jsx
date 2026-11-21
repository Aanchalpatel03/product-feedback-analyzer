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
  DollarSign,
  Ticket,
  Maximize2,
  Sparkles,
  Layers
} from 'lucide-react';

export default function PrioritizationMatrix({ backlogList, onSelectFeature, onOpenJiraTicket }) {
  const [activeQuadrant, setActiveQuadrant] = useState('ALL');
  const [hoveredFeature, setHoveredFeature] = useState(backlogList[0] || null);
  const [bubbleScaleMode, setBubbleScaleMode] = useState('arr'); // 'arr' or 'rice'

  const quadrants = [
    {
      id: 'Quick Win',
      title: 'Quick Wins',
      subtitle: 'High Value, Low Effort',
      icon: Zap,
      color: 'emerald',
      bgGradient: 'from-emerald-500/10 to-transparent',
      borderColor: 'border-emerald-500/30',
      badgeClass: 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30',
      action: 'Prioritize in immediate sprint'
    },
    {
      id: 'Major Strategic Bet',
      title: 'Major Strategic Bets',
      subtitle: 'High Value, High Effort',
      icon: Rocket,
      color: 'brand',
      bgGradient: 'from-brand-500/10 to-transparent',
      borderColor: 'border-brand-500/30',
      badgeClass: 'bg-brand-500/15 text-brand-600 dark:text-brand-400 border-brand-500/30',
      action: 'Deconstruct into MVP milestones'
    },
    {
      id: 'Fill-In',
      title: 'Fill-Ins / Low-Hanging',
      subtitle: 'Low Value, Low Effort',
      icon: Clock,
      color: 'amber',
      bgGradient: 'from-amber-500/10 to-transparent',
      borderColor: 'border-amber-500/30',
      badgeClass: 'bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/30',
      action: 'Slot into buffer sprints'
    },
    {
      id: 'Thankless Task',
      title: 'Thankless Tasks',
      subtitle: 'Low Value, High Effort',
      icon: Ban,
      color: 'rose',
      bgGradient: 'from-rose-500/10 to-transparent',
      borderColor: 'border-rose-500/30',
      badgeClass: 'bg-rose-500/15 text-rose-600 dark:text-rose-400 border-rose-500/30',
      action: 'Challenge assumptions & deprioritize'
    }
  ];

  const filteredFeatures = activeQuadrant === 'ALL'
    ? backlogList
    : backlogList.filter(f => f.quadrant === activeQuadrant);

  // Calculate dynamic bubble diameter based on ARR or RICE score
  const getBubbleSize = (feat) => {
    if (bubbleScaleMode === 'arr') {
      const maxArr = Math.max(...backlogList.map(f => f.totalArrImpact || 10000), 100000);
      const ratio = (feat.totalArrImpact || 20000) / maxArr;
      return Math.round(36 + ratio * 28); // 36px to 64px
    } else {
      const maxRice = Math.max(...backlogList.map(f => f.riceScore || 50), 100);
      const ratio = (feat.riceScore || 20) / maxRice;
      return Math.round(34 + ratio * 26);
    }
  };

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
                Interactive 2x2 Prioritization Matrix (Value vs. Effort)
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-3xl">
              Visualizes features as weighted bubble spheres where <b>bubble diameter reflects business value & ARR at stake</b>. Used by senior product executives to allocate engineering capital objectively.
            </p>
          </div>

          {/* Controls: Scale Toggle & Quadrant Filter */}
          <div className="flex flex-wrap items-center gap-2">
            
            {/* Bubble Sizing Mode */}
            <div className="flex items-center space-x-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl text-xs font-semibold">
              <span className="text-[10px] text-slate-400 px-1.5">Size by:</span>
              <button
                onClick={() => setBubbleScaleMode('arr')}
                className={`px-2.5 py-1 rounded-lg transition ${
                  bubbleScaleMode === 'arr' 
                    ? 'bg-white dark:bg-slate-700 text-brand-600 dark:text-brand-400 shadow-sm font-bold' 
                    : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                }`}
              >
                ARR Impact ($)
              </button>
              <button
                onClick={() => setBubbleScaleMode('rice')}
                className={`px-2.5 py-1 rounded-lg transition ${
                  bubbleScaleMode === 'rice' 
                    ? 'bg-white dark:bg-slate-700 text-brand-600 dark:text-brand-400 shadow-sm font-bold' 
                    : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                }`}
              >
                RICE Score
              </button>
            </div>

            {/* Quadrant Filter */}
            <div className="flex items-center space-x-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl text-xs">
              <button
                onClick={() => setActiveQuadrant('ALL')}
                className={`px-3 py-1 rounded-lg font-medium transition ${
                  activeQuadrant === 'ALL'
                    ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm font-bold'
                    : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                }`}
              >
                All ({backlogList.length})
              </button>
              {quadrants.map(q => (
                <button
                  key={q.id}
                  onClick={() => setActiveQuadrant(q.id)}
                  className={`px-2 py-1 rounded-lg font-medium transition ${
                    activeQuadrant === q.id
                      ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm font-bold'
                      : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                  }`}
                >
                  {q.title.split('/')[0]}
                </button>
              ))}
            </div>

          </div>
        </div>
      </div>

      {/* The 2x2 Grid Visualization Canvas */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Interactive 2x2 Visual Canvas (7 Cols) */}
        <div className="lg:col-span-7 glass-panel p-6 relative flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-1.5 text-xs font-bold text-slate-400 uppercase tracking-wider">
              <span>Value Score (Y-Axis) vs Effort Score (X-Axis)</span>
            </div>
            <span className="text-[11px] text-slate-400 font-medium">
              Bubble size represents {bubbleScaleMode === 'arr' ? 'ARR Impact ($)' : 'RICE Score'}
            </span>
          </div>

          {/* Canvas Box with Distinct 4-Quadrant Grids */}
          <div className="relative w-full h-[400px] bg-slate-950/90 rounded-2xl border border-slate-800 overflow-hidden shadow-inner">
            
            {/* Quadrant 1: Top-Left (Quick Wins) */}
            <div className="absolute top-0 left-0 w-1/2 h-1/2 bg-gradient-to-br from-emerald-950/30 to-transparent p-3.5 border-r border-b border-slate-800/80">
              <span className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-lg bg-emerald-500/15 border border-emerald-500/30 text-[10px] font-extrabold text-emerald-400 uppercase tracking-wide">
                <Zap className="h-3 w-3" />
                <span>Quick Wins (High Value / Low Effort)</span>
              </span>
            </div>

            {/* Quadrant 2: Top-Right (Major Strategic Bets) */}
            <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-bl from-brand-950/30 to-transparent p-3.5 border-b border-slate-800/80 text-right">
              <span className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-lg bg-brand-500/15 border border-brand-500/30 text-[10px] font-extrabold text-brand-400 uppercase tracking-wide">
                <Rocket className="h-3 w-3" />
                <span>Strategic Bets (High Value / High Effort)</span>
              </span>
            </div>

            {/* Quadrant 3: Bottom-Left (Fill-Ins) */}
            <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-tr from-amber-950/30 to-transparent p-3.5 border-r border-slate-800/80 flex items-end">
              <span className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-lg bg-amber-500/15 border border-amber-500/30 text-[10px] font-extrabold text-amber-400 uppercase tracking-wide">
                <Clock className="h-3 w-3" />
                <span>Fill-Ins (Low Value / Low Effort)</span>
              </span>
            </div>

            {/* Quadrant 4: Bottom-Right (Thankless Tasks) */}
            <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-gradient-to-tl from-rose-950/30 to-transparent p-3.5 flex items-end justify-end">
              <span className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-lg bg-rose-500/15 border border-rose-500/30 text-[10px] font-extrabold text-rose-400 uppercase tracking-wide">
                <Ban className="h-3 w-3" />
                <span>Thankless Tasks (Low Value / High Effort)</span>
              </span>
            </div>

            {/* Dashed Crosshair Gridlines */}
            <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-slate-700/80 border-dashed pointer-events-none" />
            <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-slate-700/80 border-dashed pointer-events-none" />

            {/* Feature Bubble Balls */}
            {backlogList.map((feat) => {
              const leftPercent = 10 + (feat.effortScore / 100) * 80;
              const bottomPercent = 10 + (feat.valueScore / 100) * 80;
              const size = getBubbleSize(feat);
              const isSelected = hoveredFeature?.id === feat.id;

              let bubbleBg = 'from-brand-600 via-indigo-600 to-sky-500 shadow-brand-500/50';
              let ringColor = 'ring-brand-400';
              if (feat.quadrant === 'Quick Win') {
                bubbleBg = 'from-emerald-600 via-teal-600 to-emerald-400 shadow-emerald-500/50';
                ringColor = 'ring-emerald-400';
              } else if (feat.quadrant === 'Fill-In') {
                bubbleBg = 'from-amber-600 via-orange-600 to-amber-400 shadow-amber-500/50';
                ringColor = 'ring-amber-400';
              } else if (feat.quadrant === 'Thankless Task') {
                bubbleBg = 'from-rose-600 via-red-600 to-rose-400 shadow-rose-500/50';
                ringColor = 'ring-rose-400';
              }

              return (
                <div
                  key={feat.id}
                  onClick={() => setHoveredFeature(feat)}
                  onMouseEnter={() => setHoveredFeature(feat)}
                  style={{
                    left: `${leftPercent}%`,
                    bottom: `${bottomPercent}%`,
                    width: `${size}px`,
                    height: `${size}px`
                  }}
                  className={`absolute transform -translate-x-1/2 translate-y-1/2 cursor-pointer transition-all duration-300 z-20 group ${
                    isSelected ? 'scale-125 z-40' : 'hover:scale-115'
                  }`}
                >
                  {/* Glowing Outer Halo */}
                  {isSelected && (
                    <div className="absolute inset-0 rounded-full animate-ping opacity-30 bg-white" />
                  )}

                  {/* 3D Glass Sphere Ball */}
                  <div 
                    className={`w-full h-full rounded-full bg-gradient-to-tr ${bubbleBg} flex flex-col items-center justify-center text-white shadow-xl ring-2 ${
                      isSelected ? 'ring-white scale-105' : `${ringColor} ring-opacity-60`
                    } relative overflow-hidden`}
                  >
                    {/* Glossy highlight accent */}
                    <div className="absolute top-1 left-2 w-3 h-2 bg-white/40 rounded-full blur-[1px] transform -rotate-45" />

                    <span className="text-[11px] font-black tracking-tight drop-shadow-sm">
                      {feat.id.split('-').pop()}
                    </span>
                    <span className="text-[9px] font-bold opacity-90 leading-none">
                      ${(feat.totalArrImpact / 1000).toFixed(0)}k
                    </span>
                  </div>

                  {/* Interactive Floating Tooltip */}
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block whitespace-nowrap bg-slate-900/95 text-white text-[11px] font-medium px-3 py-1.5 rounded-xl shadow-2xl pointer-events-none z-50 border border-slate-700 backdrop-blur-md">
                    <p className="font-extrabold text-white">{feat.title}</p>
                    <p className="text-slate-400 text-[10px]">
                      RICE: <b className="text-brand-400">{feat.riceScore}</b> | Value: {feat.valueScore} | Effort: {feat.effortScore} | ARR: <b className="text-emerald-400">${feat.totalArrImpact.toLocaleString()}</b>
                    </p>
                  </div>
                </div>
              );
            })}

          </div>

          <div className="flex items-center justify-between mt-3 text-[11px] text-slate-500 dark:text-slate-400 font-semibold">
            <span>← Lower Technical Effort (Fast to Ship)</span>
            <span>Higher Architectural Effort (Complex) →</span>
          </div>
        </div>

        {/* Feature Inspector Card (5 Cols) */}
        <div className="lg:col-span-5 glass-panel p-6 flex flex-col justify-between">
          {hoveredFeature ? (
            <div className="space-y-4">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <span className="text-xs font-mono font-bold text-brand-500">
                    {hoveredFeature.id} • {hoveredFeature.productArea}
                  </span>
                  <h3 className="text-base sm:text-lg font-extrabold text-slate-900 dark:text-white mt-1 leading-snug">
                    {hoveredFeature.title}
                  </h3>
                </div>
                <span className={`px-2.5 py-1 rounded-full text-xs font-bold border whitespace-nowrap ${
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
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 py-3 border-y border-slate-200 dark:border-slate-800">
                <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800/60 text-center">
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">RICE Score</span>
                  <p className="text-lg font-black text-brand-500">{hoveredFeature.riceScore}</p>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800/60 text-center">
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">Kano Model</span>
                  <p className="text-xs font-extrabold text-slate-900 dark:text-white mt-1">{hoveredFeature.kanoCategory}</p>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800/60 text-center">
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">Opportunity</span>
                  <p className="text-lg font-black text-emerald-500">{hoveredFeature.opportunityScore}</p>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800/60 text-center">
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">ARR Protected</span>
                  <p className="text-lg font-black text-slate-900 dark:text-white">
                    ${(hoveredFeature.totalArrImpact / 1000).toFixed(0)}k
                  </p>
                </div>
              </div>

              {/* Rationale & Recommendations */}
              <div className="space-y-2 text-xs">
                <div className="p-3.5 rounded-xl bg-brand-500/5 dark:bg-brand-950/30 border border-brand-500/20">
                  <b className="text-brand-600 dark:text-brand-400">Executive PM Rationale:</b>
                  <p className="text-slate-600 dark:text-slate-300 mt-1">{hoveredFeature.kanoRationale}</p>
                </div>

                <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 pt-1">
                  <span>Linked Signals: <b>{hoveredFeature.linkedFeedbackCount} verified quotes</b></span>
                  <span>Target: <b className="text-slate-800 dark:text-slate-200">{hoveredFeature.targetQuarter}</b></span>
                </div>
              </div>

              {/* Jira / Linear Ticket Trigger Button */}
              <div className="pt-2">
                <button
                  onClick={() => onOpenJiraTicket && onOpenJiraTicket(hoveredFeature)}
                  className="w-full flex items-center justify-center space-x-2 py-2.5 px-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs transition shadow-md"
                >
                  <Ticket className="h-4 w-4" />
                  <span>Generate Jira / Linear Sprint Ticket</span>
                </button>
              </div>

            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-slate-400 text-center py-12">
              <Info className="h-8 w-8 mb-2" />
              <p>Click any bubble sphere on the 2x2 matrix to inspect its full scoring breakdown and linked user feedback.</p>
            </div>
          )}

          <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs">
            <span className="text-slate-500">Ownership: <b>{hoveredFeature?.owner || 'Core Engineering'}</b></span>
            <span className="text-brand-500 font-bold">{hoveredFeature?.status}</span>
          </div>
        </div>

      </div>

    </div>
  );
}
