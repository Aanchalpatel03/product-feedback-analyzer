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
  Check 
} from 'lucide-react';

export default function FeedbackFeed({ feedbackList }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedChannel, setSelectedChannel] = useState('ALL');
  const [selectedSentiment, setSelectedSentiment] = useState('ALL');
  const [selectedTier, setSelectedTier] = useState('ALL');
  const [copiedId, setCopiedId] = useState(null);

  const channels = ['ALL', 'Zendesk', 'Discord', 'G2 Crowd', 'App Store', 'In-App NPS', 'Gong Transcript'];
  const sentiments = ['ALL', 'Delighted', 'Positive', 'Neutral', 'Frustrated', 'Negative'];
  const tiers = ['ALL', 'Enterprise', 'Mid-Market', 'Growth', 'SMB'];

  const filteredList = feedbackList.filter(item => {
    const matchesSearch = searchQuery === '' || 
      item.text.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.customer.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.topic.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesChannel = selectedChannel === 'ALL' || item.channel === selectedChannel;
    const matchesSentiment = selectedSentiment === 'ALL' || item.sentiment.label === selectedSentiment;
    const matchesTier = selectedTier === 'ALL' || item.customer.tier === selectedTier;

    return matchesSearch && matchesChannel && matchesSentiment && matchesTier;
  });

  const handleCopy = (id, text) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
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

          <div className="text-xs text-slate-500 dark:text-slate-400">
            Showing <b className="text-slate-900 dark:text-white">{filteredList.length}</b> of {feedbackList.length} signals
          </div>
        </div>

        {/* Filter Controls */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-2">
          
          {/* Search Box */}
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search quotes, company, topic..."
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
              {channels.map(ch => (
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

        </div>
      </div>

      {/* Feedback Cards List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredList.map((item) => {
          const isCriticalRisk = item.churnRisk === 'Critical' || item.churnRisk === 'High';

          let sentimentColor = 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300';
          if (item.sentiment.label === 'Delighted') sentimentColor = 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20';
          if (item.sentiment.label === 'Positive') sentimentColor = 'bg-teal-500/10 text-teal-600 dark:text-teal-400 border border-teal-500/20';
          if (item.sentiment.label === 'Frustrated') sentimentColor = 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20';
          if (item.sentiment.label === 'Negative') sentimentColor = 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20';

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
                      src={item.customer.avatar}
                      alt={item.customer.name}
                      className="w-9 h-9 rounded-full object-cover ring-1 ring-slate-300 dark:ring-slate-700"
                    />
                    <div>
                      <div className="flex items-center space-x-1.5">
                        <span className="font-bold text-sm text-slate-900 dark:text-white">
                          {item.customer.name}
                        </span>
                        <span className="text-[10px] px-1.5 py-0.2 rounded bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                          {item.customer.tier}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2 text-[11px] text-slate-400">
                        <span>{item.customer.company}</span>
                        <span>•</span>
                        <span>${item.customer.mrr?.toLocaleString()}/mo MRR</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-1.5">
                    <span className={`px-2 py-0.5 rounded text-[11px] font-bold ${sentimentColor}`}>
                      {item.sentiment.label} ({item.sentiment.score > 0 ? `+${item.sentiment.score}` : item.sentiment.score})
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
                <div className="flex items-center space-x-2">
                  <span className="px-2 py-0.5 rounded bg-brand-500/10 text-brand-500 font-medium">
                    {item.channel}
                  </span>
                  <span className="text-slate-400">{item.topic}</span>
                </div>

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
          );
        })}
      </div>

    </div>
  );
}
