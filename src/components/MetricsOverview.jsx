import React from 'react';
import { 
  Users, 
  TrendingUp, 
  AlertTriangle, 
  ShieldCheck, 
  Flame, 
  ArrowUpRight, 
  CheckCircle2 
} from 'lucide-react';

export default function MetricsOverview({ feedbackList, backlogList }) {
  const totalCount = feedbackList.length;

  // Calculate Net Sentiment Score (NSS: % positive - % negative)
  let posCount = 0;
  let negCount = 0;
  let criticalChurnCount = 0;
  let enterpriseArrRisk = 0;

  feedbackList.forEach(item => {
    if (item.sentiment.score > 0.1) posCount++;
    if (item.sentiment.score < -0.1) negCount++;
    if (item.churnRisk === 'Critical' || item.churnRisk === 'High') {
      criticalChurnCount++;
      if (item.customer?.tier === 'Enterprise') {
        enterpriseArrRisk += (item.customer.mrr || 0) * 12;
      }
    }
  });

  const netSentimentScore = totalCount > 0 
    ? Math.round(((posCount - negCount) / totalCount) * 100) 
    : 0;

  // Top RICE feature
  const topRiceFeature = [...backlogList].sort((a, b) => b.riceScore - a.riceScore)[0];

  // Quick Wins count
  const quickWinsCount = backlogList.filter(f => f.quadrant === 'Quick Win').length;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      
      {/* Total Customer Feedback */}
      <div className="glass-panel p-5 relative overflow-hidden group hover:border-brand-500/50 transition">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
            Total Feedback Ingested
          </span>
          <div className="p-2 rounded-lg bg-brand-500/10 text-brand-500">
            <Users className="h-4 w-4" />
          </div>
        </div>
        <div className="mt-3 flex items-baseline space-x-2">
          <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            1,248
          </span>
          <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400 flex items-center">
            <ArrowUpRight className="h-3 w-3 mr-0.5" /> +24% MoM
          </span>
        </div>
        <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
          Across 6 connected voice channels
        </p>
      </div>

      {/* Net Sentiment Score */}
      <div className="glass-panel p-5 relative overflow-hidden group hover:border-emerald-500/50 transition">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
            Net Sentiment Score
          </span>
          <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-500">
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
        <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
          {posCount} Positive vs {negCount} Frustrated
        </p>
      </div>

      {/* Enterprise ARR at Risk */}
      <div className="glass-panel p-5 relative overflow-hidden group hover:border-rose-500/50 transition">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
            ARR at Churn Risk
          </span>
          <div className="p-2 rounded-lg bg-rose-500/10 text-rose-500">
            <AlertTriangle className="h-4 w-4" />
          </div>
        </div>
        <div className="mt-3 flex items-baseline space-x-2">
          <span className="text-2xl sm:text-3xl font-extrabold text-rose-500">
            ${(enterpriseArrRisk / 1000).toFixed(0)}k
          </span>
          <span className="text-xs font-medium text-rose-400">
            {criticalChurnCount} accounts
          </span>
        </div>
        <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
          Flagged with contract renewal blockers
        </p>
      </div>

      {/* Top Prioritized Feature */}
      <div className="glass-panel p-5 relative overflow-hidden group hover:border-indigo-500/50 transition">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
            Top Priority (RICE)
          </span>
          <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-500">
            <Flame className="h-4 w-4" />
          </div>
        </div>
        <div className="mt-2">
          <div className="text-sm font-bold text-slate-900 dark:text-white truncate" title={topRiceFeature?.title}>
            {topRiceFeature?.title || "SAML SSO"}
          </div>
          <div className="flex items-center space-x-2 mt-1">
            <span className="text-xs px-2 py-0.5 rounded-full bg-brand-500/10 text-brand-500 font-bold border border-brand-500/20">
              RICE: {topRiceFeature?.riceScore}
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400">
              {quickWinsCount} Quick Wins ready
            </span>
          </div>
        </div>
      </div>

    </div>
  );
}
