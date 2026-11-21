import React, { useState } from 'react';
import { 
  Users, 
  TrendingUp, 
  AlertTriangle, 
  ShieldCheck, 
  Flame, 
  ArrowUpRight, 
  CheckCircle2,
  X,
  ExternalLink,
  ChevronRight,
  Sparkles,
  Ticket
} from 'lucide-react';

export default function MetricsOverview({ 
  feedbackList, 
  backlogList, 
  onNavigateTab,
  onOpenLiveConnect,
  onOpenJiraTicket
}) {
  const [activeModal, setActiveModal] = useState(null); // 'volume', 'sentiment', 'churn', 'topFeature'

  const totalCount = feedbackList.length;

  // Calculate Net Sentiment Score (NSS: % positive - % negative)
  let posCount = 0;
  let negCount = 0;
  let criticalChurnCount = 0;
  let enterpriseArrRisk = 0;
  const churnAccounts = [];

  feedbackList.forEach(item => {
    if (item.sentiment.score > 0.1) posCount++;
    if (item.sentiment.score < -0.1) negCount++;
    if (item.churnRisk === 'Critical' || item.churnRisk === 'High') {
      criticalChurnCount++;
      const arr = (item.customer.mrr || 4000) * 12;
      enterpriseArrRisk += arr;
      churnAccounts.push({
        ...item,
        annualArr: arr
      });
    }
  });

  const netSentimentScore = totalCount > 0 
    ? Math.round(((posCount - negCount) / totalCount) * 100) 
    : 0;

  // Top RICE feature
  const topRiceFeature = [...backlogList].sort((a, b) => b.riceScore - a.riceScore)[0];
  const quickWinsCount = backlogList.filter(f => f.quadrant === 'Quick Win').length;

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        
        {/* Total Customer Feedback (Clickable Card) */}
        <div 
          onClick={() => setActiveModal('volume')}
          className="glass-panel p-5 relative overflow-hidden group hover:border-brand-500 hover:shadow-lg transition cursor-pointer"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Total Signals Ingested
            </span>
            <div className="p-2 rounded-lg bg-brand-500/10 text-brand-500 group-hover:bg-brand-500 group-hover:text-white transition">
              <Users className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline space-x-2">
            <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              {totalCount.toLocaleString()}
            </span>
            <span className="text-xs font-semibold text-emerald-500 flex items-center">
              <ArrowUpRight className="h-3 w-3 mr-0.5" /> Live Sync
            </span>
          </div>
          <div className="mt-1 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
            <span>Click to inspect sources</span>
            <ChevronRight className="h-3.5 w-3.5 opacity-0 group-hover:opacity-100 transition text-brand-500" />
          </div>
        </div>

        {/* Net Sentiment Score (Clickable Card) */}
        <div 
          onClick={() => setActiveModal('sentiment')}
          className="glass-panel p-5 relative overflow-hidden group hover:border-emerald-500 hover:shadow-lg transition cursor-pointer"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Net Sentiment Score
            </span>
            <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-500 group-hover:bg-emerald-500 group-hover:text-white transition">
              <TrendingUp className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline space-x-2">
            <span className={`text-2xl sm:text-3xl font-extrabold ${netSentimentScore >= 0 ? 'text-emerald-500' : 'text-rose-500'}`}>
              {netSentimentScore > 0 ? `+${netSentimentScore}` : netSentimentScore}
            </span>
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
              / 100 Index
            </span>
          </div>
          <div className="mt-1 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
            <span>{posCount} Positive vs {negCount} Frustrated</span>
            <ChevronRight className="h-3.5 w-3.5 opacity-0 group-hover:opacity-100 transition text-emerald-500" />
          </div>
        </div>

        {/* Enterprise ARR at Risk (Clickable Card) */}
        <div 
          onClick={() => setActiveModal('churn')}
          className="glass-panel p-5 relative overflow-hidden group hover:border-rose-500 hover:shadow-lg transition cursor-pointer"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              ARR at Churn Risk
            </span>
            <div className="p-2 rounded-lg bg-rose-500/10 text-rose-500 group-hover:bg-rose-500 group-hover:text-white transition">
              <AlertTriangle className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline space-x-2">
            <span className="text-2xl sm:text-3xl font-extrabold text-rose-500">
              ${(enterpriseArrRisk / 1000).toFixed(0)}k
            </span>
            <span className="text-xs font-bold text-rose-400">
              {criticalChurnCount} accounts
            </span>
          </div>
          <div className="mt-1 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
            <span>Click to view at-risk contracts</span>
            <ChevronRight className="h-3.5 w-3.5 opacity-0 group-hover:opacity-100 transition text-rose-500" />
          </div>
        </div>

        {/* Top Prioritized Feature (Clickable Card) */}
        <div 
          onClick={() => setActiveModal('topFeature')}
          className="glass-panel p-5 relative overflow-hidden group hover:border-indigo-500 hover:shadow-lg transition cursor-pointer"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Top Priority (RICE)
            </span>
            <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-500 group-hover:bg-indigo-500 group-hover:text-white transition">
              <Flame className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-2">
            <div className="text-sm font-bold text-slate-900 dark:text-white truncate" title={topRiceFeature?.title}>
              {topRiceFeature?.title || "No backlog loaded"}
            </div>
            <div className="flex items-center justify-between mt-1">
              <span className="text-xs px-2 py-0.5 rounded-full bg-brand-500/10 text-brand-500 font-bold border border-brand-500/20">
                RICE: {topRiceFeature?.riceScore || 0}
              </span>
              <span className="text-xs text-slate-500 dark:text-slate-400">
                {quickWinsCount} Quick Wins
              </span>
            </div>
          </div>
        </div>

      </div>

      {/* --- DRILL-DOWN MODALS --- */}

      {/* Modal 1: Ingestion Volume Breakdown */}
      {activeModal === 'volume' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="glass-panel-elevated max-w-lg w-full p-6 relative max-h-[85vh] overflow-y-auto">
            <button
              onClick={() => setActiveModal(null)}
              className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="flex items-center space-x-2.5 mb-4">
              <div className="p-2 rounded-xl bg-brand-500/10 text-brand-500">
                <Users className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-extrabold text-base text-slate-900 dark:text-white">
                  Ingested Feedback Signal Audit
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {totalCount} total verbatim records actively mapped to roadmap items.
                </p>
              </div>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                <span className="text-[10px] text-slate-400 uppercase font-bold">Data Provenance</span>
                <p className="font-semibold text-slate-800 dark:text-slate-200 mt-1">
                  Connected touchpoints: Zendesk, Discord, G2 Crowd, App Store, Gong Calls & Live GitHub APIs.
                </p>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-brand-500/5 dark:bg-brand-950/30 border border-brand-500/20">
                <div>
                  <b className="text-brand-500 block">Want to ingest live issues from a real repo?</b>
                  <span className="text-slate-500 dark:text-slate-400">Connect React, Next.js, or your own GitHub project.</span>
                </div>
                <button
                  onClick={() => {
                    setActiveModal(null);
                    onOpenLiveConnect && onOpenLiveConnect();
                  }}
                  className="px-3 py-1.5 rounded-lg bg-brand-600 hover:bg-brand-500 text-white font-bold text-xs shadow-sm transition whitespace-nowrap"
                >
                  Connect Live
                </button>
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-slate-200 dark:border-slate-800 flex justify-end">
              <button
                onClick={() => {
                  setActiveModal(null);
                  onNavigateTab && onNavigateTab('feed');
                }}
                className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs"
              >
                View Full Feed
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal 2: Churn Threat Audit */}
      {activeModal === 'churn' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="glass-panel-elevated max-w-xl w-full p-6 relative max-h-[85vh] overflow-y-auto">
            <button
              onClick={() => setActiveModal(null)}
              className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="flex items-center space-x-2.5 mb-4">
              <div className="p-2 rounded-xl bg-rose-500/10 text-rose-500">
                <AlertTriangle className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-extrabold text-base text-slate-900 dark:text-white">
                  Accounts Flagged with Immediate Churn Risk
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Total ARR at Stake: <b className="text-rose-500">${enterpriseArrRisk.toLocaleString()}</b> across {churnAccounts.length} accounts.
                </p>
              </div>
            </div>

            <div className="space-y-3 max-h-[400px] overflow-y-auto text-xs">
              {churnAccounts.map(acc => (
                <div key={acc.id} className="p-3.5 rounded-xl bg-rose-500/5 dark:bg-rose-950/20 border border-rose-500/20 space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <b className="text-slate-900 dark:text-white text-sm">{acc.customer.company}</b>
                      <span className="text-[11px] text-slate-400 block">{acc.customer.name} ({acc.customer.tier})</span>
                    </div>
                    <span className="px-2 py-0.5 rounded bg-rose-500/10 text-rose-500 font-extrabold text-xs">
                      ${acc.annualArr.toLocaleString()} ARR
                    </span>
                  </div>
                  <p className="text-slate-600 dark:text-slate-300 italic text-xs">
                    "{acc.text}"
                  </p>
                  <div className="flex items-center justify-between text-[11px] pt-1 text-slate-400 border-t border-rose-500/10">
                    <span>Channel: <b>{acc.channel}</b></span>
                    <span className="text-rose-400 font-semibold">{acc.urgency} Urgency</span>
                  </div>
                </div>
              ))}

              {churnAccounts.length === 0 && (
                <div className="text-center py-8 text-slate-400 text-xs">
                  Zero critical churn threats detected in current cohort.
                </div>
              )}
            </div>

            <div className="mt-5 pt-3 border-t border-slate-200 dark:border-slate-800 flex justify-end">
              <button
                onClick={() => setActiveModal(null)}
                className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs"
              >
                Close Audit
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal 3: Top Feature Details & Quick Jira Ticket */}
      {activeModal === 'topFeature' && topRiceFeature && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="glass-panel-elevated max-w-lg w-full p-6 relative max-h-[85vh] overflow-y-auto">
            <button
              onClick={() => setActiveModal(null)}
              className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="flex items-center space-x-2.5 mb-4">
              <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-500">
                <Flame className="h-5 w-5" />
              </div>
              <div>
                <span className="text-xs font-mono font-bold text-brand-500">{topRiceFeature.id}</span>
                <h3 className="font-extrabold text-base text-slate-900 dark:text-white leading-snug">
                  {topRiceFeature.title}
                </h3>
              </div>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
              {topRiceFeature.description}
            </p>

            <div className="grid grid-cols-2 gap-3 text-xs mb-4">
              <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-center">
                <span className="text-[10px] text-slate-400 uppercase font-bold block">RICE Score</span>
                <span className="text-lg font-black text-brand-500">{topRiceFeature.riceScore}</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-center">
                <span className="text-[10px] text-slate-400 uppercase font-bold block">ARR Protection</span>
                <span className="text-lg font-black text-emerald-500">${(topRiceFeature.totalArrImpact / 1000).toFixed(0)}k</span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-slate-200 dark:border-slate-800">
              <button
                onClick={() => {
                  setActiveModal(null);
                  onOpenJiraTicket && onOpenJiraTicket(topRiceFeature);
                }}
                className="w-full flex items-center justify-center space-x-2 py-2 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-md transition"
              >
                <Ticket className="h-4 w-4" />
                <span>Generate Jira Sprint Ticket</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal 4: Sentiment Diagnostics */}
      {activeModal === 'sentiment' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="glass-panel-elevated max-w-lg w-full p-6 relative max-h-[85vh] overflow-y-auto">
            <button
              onClick={() => setActiveModal(null)}
              className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="flex items-center space-x-2.5 mb-4">
              <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-500">
                <TrendingUp className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-extrabold text-base text-slate-900 dark:text-white">
                  Customer Sentiment Health Diagnostic
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Overall NSS: <b className={netSentimentScore >= 0 ? "text-emerald-500" : "text-rose-500"}>{netSentimentScore > 0 ? `+${netSentimentScore}` : netSentimentScore}</b>
                </p>
              </div>
            </div>

            <div className="space-y-3 text-xs">
              <div className="flex items-center justify-between p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                <span className="font-bold text-emerald-600 dark:text-emerald-400">Positive Signals</span>
                <span className="font-extrabold text-emerald-600 dark:text-emerald-400">{posCount} ({totalCount > 0 ? ((posCount/totalCount)*100).toFixed(0) : 0}%)</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl bg-rose-500/10 border border-rose-500/20">
                <span className="font-bold text-rose-600 dark:text-rose-400">Frustrated / Complaints</span>
                <span className="font-extrabold text-rose-600 dark:text-rose-400">{negCount} ({totalCount > 0 ? ((negCount/totalCount)*100).toFixed(0) : 0}%)</span>
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-slate-200 dark:border-slate-800 flex justify-end">
              <button
                onClick={() => setActiveModal(null)}
                className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs"
              >
                Close Diagnostic
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
