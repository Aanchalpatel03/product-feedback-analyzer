import React from 'react';
import { Sparkles, Calendar, CheckCircle2, Clock, ArrowRight, ShieldCheck, Zap, ChevronRight } from 'lucide-react';

export default function RoadmapPlanner({ backlogList, onStatusChange }) {
  const lanes = [
    {
      id: 'now',
      statusTarget: 'In Progress',
      title: 'Now (Active Sprint / Q4 2026)',
      subtitle: 'Currently committed to engineering pods',
      borderClass: 'border-brand-500',
      badgeClass: 'bg-brand-500/10 text-brand-500 border-brand-500/30',
      features: backlogList.filter(f => f.status === 'In Progress' || f.status === 'Sprint Ready')
    },
    {
      id: 'next',
      statusTarget: 'Under Review',
      title: 'Next (Q1 2027)',
      subtitle: 'Refined specs & scheduled for execution',
      borderClass: 'border-purple-500',
      badgeClass: 'bg-purple-500/10 text-purple-500 border-purple-500/30',
      features: backlogList.filter(f => f.status === 'Under Review' || (f.quadrant === 'Quick Win' && f.status !== 'Shipped' && f.status !== 'In Progress' && f.status !== 'Sprint Ready'))
    },
    {
      id: 'later',
      statusTarget: 'Backlog',
      title: 'Later (Q2+ 2027)',
      subtitle: 'Exploratory discovery & architectural design',
      borderClass: 'border-slate-500',
      badgeClass: 'bg-slate-500/10 text-slate-500 border-slate-500/30',
      features: backlogList.filter(f => f.status === 'Backlog')
    }
  ];

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="glass-panel p-6">
        <div className="flex items-center space-x-2">
          <span className="p-1.5 rounded-lg bg-brand-500/10 text-brand-500">
            <Calendar className="h-4 w-4" />
          </span>
          <h2 className="text-lg font-extrabold text-slate-900 dark:text-white">
            Quarterly Roadmap & Sprint Milestone Allocations
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-3xl">
          Outcome-driven Now-Next-Later agile roadmap reflecting prioritized customer signals, RICE velocity, and enterprise contract protection. Click any status button to simulate live sprint milestone changes.
        </p>
      </div>

      {/* 3 Column Roadmap Lanes */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {lanes.map((lane) => (
          <div key={lane.id} className="space-y-4">
            
            {/* Lane Header */}
            <div className={`p-4 rounded-xl bg-slate-100/80 dark:bg-slate-900/80 border-t-4 ${lane.borderClass} border border-slate-200 dark:border-slate-800 shadow-sm`}>
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                  {lane.title}
                </h3>
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${lane.badgeClass}`}>
                  {lane.features.length} Items
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                {lane.subtitle}
              </p>
            </div>

            {/* Feature Cards in Lane */}
            <div className="space-y-3">
              {lane.features.map((feat) => (
                <div 
                  key={feat.id} 
                  className="glass-panel p-4 hover:border-brand-500/50 transition space-y-3 group"
                >
                  <div className="flex items-start justify-between">
                    <span className="text-[10px] font-mono font-bold text-slate-400">
                      {feat.id} • {feat.productArea}
                    </span>
                    <span className={`px-2 py-0.2 rounded text-[10px] font-bold ${
                      feat.quadrant === 'Quick Win' ? 'bg-emerald-500/10 text-emerald-500' :
                      feat.quadrant === 'Major Strategic Bet' ? 'bg-brand-500/10 text-brand-500' :
                      'bg-slate-200 dark:bg-slate-800 text-slate-500'
                    }`}>
                      {feat.quadrant}
                    </span>
                  </div>

                  <div>
                    <h4 className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-brand-500 transition">
                      {feat.title}
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                      {feat.description}
                    </p>
                  </div>

                  <div className="flex items-center justify-between text-[11px] pt-2 border-t border-slate-100 dark:border-slate-800/80">
                    <span className="font-mono font-bold text-brand-500">
                      RICE: {feat.riceScore}
                    </span>
                    
                    {/* Quick Move / Status Toggle */}
                    <div className="flex items-center space-x-1.5">
                      {lane.id === 'now' && (
                        <button
                          onClick={() => onStatusChange && onStatusChange(feat.id, 'Shipped')}
                          className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500 hover:text-white text-[10px] font-semibold transition flex items-center space-x-0.5"
                          title="Mark feature as shipped"
                        >
                          <CheckCircle2 className="h-3 w-3 mr-0.5" />
                          <span>Ship</span>
                        </button>
                      )}

                      {lane.id === 'next' && (
                        <button
                          onClick={() => onStatusChange && onStatusChange(feat.id, 'In Progress')}
                          className="px-2 py-0.5 rounded bg-brand-500/10 text-brand-600 dark:text-brand-400 hover:bg-brand-500 hover:text-white text-[10px] font-semibold transition flex items-center space-x-0.5"
                          title="Promote to active sprint"
                        >
                          <span>Start Sprint</span>
                          <ChevronRight className="h-3 w-3" />
                        </button>
                      )}

                      {lane.id === 'later' && (
                        <button
                          onClick={() => onStatusChange && onStatusChange(feat.id, 'Under Review')}
                          className="px-2 py-0.5 rounded bg-purple-500/10 text-purple-600 dark:text-purple-400 hover:bg-purple-500 hover:text-white text-[10px] font-semibold transition flex items-center space-x-0.5"
                          title="Promote to Next queue"
                        >
                          <span>Move to Next</span>
                          <ChevronRight className="h-3 w-3" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}

              {lane.features.length === 0 && (
                <div className="p-6 text-center text-xs text-slate-400 rounded-xl border border-dashed border-slate-300 dark:border-slate-800">
                  No items in this sprint lane.
                </div>
              )}
            </div>

          </div>
        ))}
      </div>

    </div>
  );
}
