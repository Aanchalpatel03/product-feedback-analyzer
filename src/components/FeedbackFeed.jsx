import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  MessageSquare, 
  AlertTriangle, 
  CheckCircle2, 
  Tag, 
  DollarSign, 
  Building, 
  Copy, 
  Check,
  Clock,
  ExternalLink,
  Globe,
  PlusCircle,
  RotateCcw
} from 'lucide-react';

function formatTimestamp(isoOrDateString) {
  if (!isoOrDateString) return 'Just now';
  const date = new Date(isoOrDateString);
  if (isNaN(date.getTime())) return isoOrDateString;
  const now = new Date();
  const diffSec = Math.floor((now - date) / 1000);
  if (diffSec < 60) return 'Just now';
  if (diffSec < 3600) return `${Math.floor(diffSec / 60)}m ago`;
  if (diffSec < 86400) return `${Math.floor(diffSec / 3600)}h ago`;
  if (diffSec < 604800) return `${Math.floor(diffSec / 86400)}d ago`;
  return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });
}

export default function FeedbackFeed({ 
  feedbackList = [], 
  onOpenLiveConnect, 
  onOpenNewFeedback 
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedChannel, setSelectedChannel] = useState('ALL');
  const [selectedSentiment, setSelectedSentiment] = useState('ALL');
  const [selectedTier, setSelectedTier] = useState('ALL');
  const [selectedRisk, setSelectedRisk] = useState('ALL');
  const [copiedId, setCopiedId] = useState(null);

  // Derive dynamic channels from feedbackList so any new source appears automatically
  const availableChannels = ['ALL', ...Array.from(new Set(feedbackList.map(i => i.channel).filter(Boolean)))];
  const sentiments = ['ALL', 'Delighted', 'Positive', 'Neutral', 'Frustrated', 'Negative'];
  const tiers = ['ALL', 'Enterprise', 'Mid-Market', 'Growth', 'SMB'];
  const risks = ['ALL', 'Critical', 'High', 'Medium', 'Low'];

  const filteredList = feedbackList.filter(item => {
    const matchesSearch = searchQuery === '' || 
      item.text.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.customer?.company || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.customer?.name || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.topic || '').toLowerCase().includes(searchQuery.toLowerCase());

    const matchesChannel = selectedChannel === 'ALL' || item.channel === selectedChannel;
    const matchesSentiment = selectedSentiment === 'ALL' || item.sentiment?.label === selectedSentiment;
    const matchesTier = selectedTier === 'ALL' || item.customer?.tier === selectedTier;
    const matchesRisk = selectedRisk === 'ALL' || item.churnRisk === selectedRisk;

    return matchesSearch && matchesChannel && matchesSentiment && matchesTier && matchesRisk;
  });

  const handleCopy = (id, text) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedChannel('ALL');
    setSelectedSentiment('ALL');
    setSelectedTier('ALL');
    setSelectedRisk('ALL');
  };

  return (
    <div className="space-y-6">
      
      {/* Header and Multi-Dimensional Filter Bar */}
      <div className="glass-panel p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-500">
                <MessageSquare className="h-4 w-4" />
              </span>
              <h2 className="text-lg font-extrabold text-slate-900 dark:text-white">
                Voice of Customer (VoC) Multi-Channel Feed
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
              Real customer verbatim records processed through our AI Sentiment & Intent Engine.
            </p>
          </div>

          <div className="flex items-center space-x-3 text-xs text-slate-500 dark:text-slate-400">
            <span>
              Showing <b className="text-slate-900 dark:text-white">{filteredList.length}</b> of {feedbackList.length} signals
            </span>
            {(selectedChannel !== 'ALL' || selectedSentiment !== 'ALL' || selectedTier !== 'ALL' || selectedRisk !== 'ALL' || searchQuery !== '') && (
              <button
                onClick={handleResetFilters}
                className="flex items-center space-x-1 text-brand-500 hover:text-brand-600 font-semibold"
              >
                <RotateCcw className="h-3 w-3" />
                <span>Reset</span>
              </button>
            )}
          </div>
        </div>

        {/* Filter Controls (5-Column Grid) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 pt-2">
          
          {/* Search Box */}
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search quotes, company..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-100 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 rounded-lg pl-9 pr-3 py-2 text-xs focus:ring-1 focus:ring-brand-500 focus:outline-none"
            />
          </div>

          {/* Channel Filter */}
          <div>
            <select
              value={selectedChannel}
              onChange={(e) => setSelectedChannel(e.target.value)}
              className="w-full bg-slate-100 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 text-xs cursor-pointer focus:ring-1 focus:ring-brand-500 focus:outline-none"
            >
              {availableChannels.map(ch => (
                <option key={ch} value={ch}>Channel: {ch}</option>
              ))}
            </select>
          </div>

          {/* Sentiment Filter */}
          <div>
            <select
              value={selectedSentiment}
              onChange={(e) => setSelectedSentiment(e.target.value)}
              className="w-full bg-slate-100 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 text-xs cursor-pointer focus:ring-1 focus:ring-brand-500 focus:outline-none"
            >
              {sentiments.map(s => (
                <option key={s} value={s}>Sentiment: {s}</option>
              ))}
            </select>
          </div>

          {/* Customer Tier */}
          <div>
            <select
              value={selectedTier}
              onChange={(e) => setSelectedTier(e.target.value)}
              className="w-full bg-slate-100 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 text-xs cursor-pointer focus:ring-1 focus:ring-brand-500 focus:outline-none"
            >
              {tiers.map(t => (
                <option key={t} value={t}>Tier: {t}</option>
              ))}
            </select>
          </div>

          {/* Churn Risk */}
          <div>
            <select
              value={selectedRisk}
              onChange={(e) => setSelectedRisk(e.target.value)}
              className="w-full bg-slate-100 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 text-xs cursor-pointer focus:ring-1 focus:ring-brand-500 focus:outline-none"
            >
              {risks.map(r => (
                <option key={r} value={r}>Churn Risk: {r}</option>
              ))}
            </select>
          </div>

        </div>
      </div>

      {/* Empty State: Blank Dataset (When User Clears All Data) */}
      {feedbackList.length === 0 ? (
        <div className="glass-panel p-12 text-center flex flex-col items-center justify-center space-y-4">
          <div className="p-4 rounded-2xl bg-brand-500/10 text-brand-500">
            <Globe className="h-10 w-10 animate-pulse" />
          </div>
          <div className="max-w-md">
            <h3 className="font-extrabold text-lg text-slate-900 dark:text-white">
              Dataset Cleared — Blank Slate Ready
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
              You're currently viewing a fresh blank environment. You can extract real-time live data from public open-source repos, or submit new customer feedback directly.
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            {onOpenLiveConnect && (
              <button
                onClick={onOpenLiveConnect}
                className="flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-brand-600 to-indigo-600 text-white font-bold text-xs shadow-md hover:from-brand-500 hover:to-indigo-500 transition"
              >
                <Globe className="h-4 w-4" />
                <span>Extract Real Public Data (GitHub / Web)</span>
              </button>
            )}
            {onOpenNewFeedback && (
              <button
                onClick={onOpenNewFeedback}
                className="flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition"
              >
                <PlusCircle className="h-4 w-4" />
                <span>Submit New Feedback</span>
              </button>
            )}
          </div>
        </div>
      ) : filteredList.length === 0 ? (
        /* Empty State: No Matches for Active Filters */
        <div className="glass-panel p-10 text-center flex flex-col items-center justify-center space-y-3">
          <Filter className="h-8 w-8 text-slate-400" />
          <h4 className="font-bold text-sm text-slate-900 dark:text-white">
            No customer feedback matched your filters
          </h4>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Try adjusting your search query, channel, or sentiment filters.
          </p>
          <button
            onClick={handleResetFilters}
            className="mt-2 px-3 py-1.5 rounded-lg bg-slate-200 dark:bg-slate-800 text-xs font-semibold hover:bg-slate-300 dark:hover:bg-slate-700 transition"
          >
            Clear All Filters
          </button>
        </div>
      ) : (
        /* Feedback Cards List */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredList.map((item) => {
            const isCriticalRisk = item.churnRisk === 'Critical' || item.churnRisk === 'High';

            let sentimentColor = 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300';
            if (item.sentiment?.label === 'Delighted') sentimentColor = 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20';
            if (item.sentiment?.label === 'Positive') sentimentColor = 'bg-teal-500/10 text-teal-600 dark:text-teal-400 border border-teal-500/20';
            if (item.sentiment?.label === 'Frustrated') sentimentColor = 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20';
            if (item.sentiment?.label === 'Negative') sentimentColor = 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20';

            return (
              <div 
                key={item.id} 
                className={`glass-panel p-5 flex flex-col justify-between space-y-4 hover:border-brand-500/40 transition group ${
                  isCriticalRisk ? 'border-l-4 border-l-rose-500' : ''
                }`}
              >
                <div>
                  {/* Header: Customer Info + Sentiment Badge */}
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <img
                        src={item.customer?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150'}
                        alt={item.customer?.name || 'User'}
                        className="w-9 h-9 rounded-full object-cover ring-1 ring-slate-300 dark:ring-slate-700"
                        onError={(e) => {
                          e.target.src = 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150';
                        }}
                      />
                      <div>
                        <div className="flex items-center space-x-1.5">
                          <span className="font-bold text-sm text-slate-900 dark:text-white">
                            {item.customer?.name}
                          </span>
                          <span className="text-[10px] px-1.5 py-0.2 rounded bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                            {item.customer?.tier}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2 text-[11px] text-slate-400">
                          <span className="truncate max-w-[150px]">{item.customer?.company}</span>
                          <span>•</span>
                          <span>${item.customer?.mrr ? item.customer.mrr.toLocaleString() : '0'}/mo MRR</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-1.5">
                      <span className={`px-2 py-0.5 rounded text-[11px] font-bold ${sentimentColor}`}>
                        {item.sentiment?.label || 'Neutral'} ({item.sentiment?.score > 0 ? `+${item.sentiment.score}` : item.sentiment?.score})
                      </span>
                    </div>
                  </div>

                  {/* Verbatim Quote */}
                  <p className="mt-3 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed italic">
                    "{item.text}"
                  </p>

                  {/* Churn Alert Callout if Critical */}
                  {isCriticalRisk && (
                    <div className="mt-3 p-2 rounded-lg bg-rose-500/10 border border-rose-500/20 flex items-center space-x-2 text-[11px] text-rose-600 dark:text-rose-400 font-semibold">
                      <AlertTriangle className="h-3.5 w-3.5 flex-shrink-0" />
                      <span>Flagged Churn Threat ({item.churnRisk} Priority)</span>
                    </div>
                  )}
                </div>

                {/* Card Footer: Metadata and Mapped Feature */}
                <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-[11px]">
                  <div className="flex items-center space-x-2 flex-wrap gap-y-1">
                    <span className="px-2 py-0.5 rounded bg-brand-500/10 text-brand-500 font-medium">
                      {item.channel}
                    </span>
                    <span className="text-slate-400">{item.topic}</span>
                    <span className="text-slate-400 flex items-center space-x-1">
                      <Clock className="h-3 w-3 inline text-slate-400" />
                      <span>{formatTimestamp(item.date)}</span>
                    </span>
                  </div>

                  <div className="flex items-center space-x-2">
                    {item.sourceUrl && (
                      <a
                        href={item.sourceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-1 text-brand-500 hover:text-brand-600 transition"
                        title="View real original issue on live platform"
                      >
                        <ExternalLink className="h-3.5 w-3.5" />
                        <span className="hidden sm:inline">Source</span>
                      </a>
                    )}
                    <button
                      onClick={() => handleCopy(item.id, item.text)}
                      className="flex items-center space-x-1 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition"
                      title="Copy quote"
                    >
                      {copiedId === item.id ? (
                        <>
                          <Check className="h-3.5 w-3.5 text-emerald-500" />
                          <span className="text-emerald-500">Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="h-3.5 w-3.5" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      )}

    </div>
  );
}
