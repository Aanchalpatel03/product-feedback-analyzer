import React from 'react';
import { Compass, Smile, Meh, Frown, Sparkles, CheckCircle2 } from 'lucide-react';

export default function KanoModelViewer({ backlogList }) {
  const kanoCategories = [
    {
      type: "Must-Be",
      label: "Must-Be (Basic Expectations)",
      tagClass: "bg-rose-500/10 text-rose-500 border-rose-500/30",
      description: "Fundamental features customers take for granted. Their presence does not increase satisfaction beyond baseline, but their absence triggers immediate fury and churn.",
      icon: Frown,
      items: backlogList.filter(f => f.kanoCategory === 'Must-Be')
    },
    {
      type: "Performance",
      label: "Performance (One-Dimensional)",
      tagClass: "bg-brand-500/10 text-brand-500 border-brand-500/30",
      description: "Linear satisfiers: the more or faster we deliver them, the higher the customer happiness. Directly tied to competitive benchmarking.",
      icon: Meh,
      items: backlogList.filter(f => f.kanoCategory === 'Performance')
    },
    {
      type: "Attractive",
      label: "Attractive (Delighters)",
      tagClass: "bg-emerald-500/10 text-emerald-500 border-emerald-500/30",
      description: "Unexpected innovation features. Customers do not demand them upfront, but fall in love with the product and become vocal evangelists when released.",
      icon: Smile,
      items: backlogList.filter(f => f.kanoCategory === 'Attractive')
    }
  ];

  return (
    <div className="space-y-6">
      
      {/* Header and Kano Philosophy */}
      <div className="glass-panel p-6">
        <div className="flex items-center space-x-2">
          <span className="p-1.5 rounded-lg bg-amber-500/10 text-amber-500">
            <Compass className="h-4 w-4" />
          </span>
          <h2 className="text-lg font-extrabold text-slate-900 dark:text-white">
            Kano Model Customer Satisfaction Framework
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-3xl">
          Categorizes backlog features based on emotional customer psychology rather than just raw votes. Ensures engineering balance between defensive table stakes (Must-Be), competitive parity (Performance), and viral differentiators (Delighters).
        </p>
      </div>

      {/* 3 Column Kano Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {kanoCategories.map((cat) => {
          const Icon = cat.icon;

          return (
            <div key={cat.type} className="glass-panel p-6 flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-center justify-between">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-bold border ${cat.tagClass}`}>
                    {cat.type}
                  </span>
                  <Icon className="h-5 w-5 text-slate-400" />
                </div>

                <h3 className="font-extrabold text-sm text-slate-900 dark:text-white mt-3">
                  {cat.label}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                  {cat.description}
                </p>

                {/* Features in this category */}
                <div className="mt-4 space-y-2.5">
                  {cat.items.map((feat) => (
                    <div 
                      key={feat.id} 
                      className="p-3 rounded-lg bg-slate-100/80 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-800 hover:border-brand-500/40 transition"
                    >
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold text-slate-900 dark:text-white truncate max-w-[170px]">
                          {feat.title}
                        </span>
                        <span className="text-[10px] font-mono font-bold text-brand-500">
                          RICE {feat.riceScore}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                        {feat.kanoRationale}
                      </p>
                      <div className="mt-2 flex items-center justify-between text-[10px] text-slate-400">
                        <span>Arr Risk: <b>${(feat.totalArrImpact / 1000).toFixed(0)}k</b></span>
                        <span className="text-emerald-500 font-semibold">{feat.status}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 text-[11px] text-slate-400 flex items-center justify-between">
                <span>{cat.items.length} backlog items mapped</span>
                <span className="font-semibold text-slate-600 dark:text-slate-300">Target: 2026/2027</span>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}
