import React, { useState } from 'react';
import { 
  X, 
  Github, 
  Globe, 
  RefreshCw, 
  Sparkles, 
  Trash2, 
  CheckCircle2, 
  AlertCircle,
  ExternalLink,
  ArrowRight
} from 'lucide-react';
import { fetchLiveGitHubFeedback, POPULAR_LIVE_SOURCES } from '../utils/liveDataExtractor';
import confetti from 'canvas-confetti';

export default function LiveSourceModal({ 
  isOpen, 
  onClose, 
  onLoadLiveDataset, 
  onClearDataset,
  currentSourceName
}) {
  const [customRepo, setCustomRepo] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);

  if (!isOpen) return null;

  const handleFetch = async (repoName) => {
    const target = repoName || customRepo;
    if (!target.trim()) {
      setErrorMsg("Please select a popular source or enter a GitHub repo path (e.g. vercel/next.js)");
      return;
    }

    setLoading(true);
    setErrorMsg(null);
    setSuccessMsg(null);

    try {
      const data = await fetchLiveGitHubFeedback(target.trim(), 25);
      
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });

      setSuccessMsg(`Extracted ${data.feedbacks.length} real live issues & generated ${data.backlog.length} roadmap features!`);
      
      onLoadLiveDataset(data);
      setLoading(false);

      setTimeout(() => {
        onClose();
      }, 1400);

    } catch (err) {
      setLoading(false);
      setErrorMsg(err.message || "Failed to extract live data from GitHub.");
    }
  };

  const handleClear = () => {
    if (window.confirm("Are you sure you want to clear all feedback? The dashboard will start blank for testing fresh user submissions.")) {
      onClearDataset();
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="glass-panel-elevated max-w-xl w-full p-6 relative max-h-[90vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Header */}
        <div className="flex items-center space-x-2.5 mb-4">
          <div className="p-2.5 rounded-2xl bg-gradient-to-tr from-brand-600 to-indigo-500 text-white shadow-lg">
            <Globe className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-extrabold text-base text-slate-900 dark:text-white">
              Connect Real-Time External Feedback Sources
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Extract real issues from live developer communities or start with a clean blank slate.
            </p>
          </div>
        </div>

        {/* Popular Presets */}
        <div className="space-y-3 mb-5">
          <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block">
            Popular Live Open Source Repositories:
          </label>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {POPULAR_LIVE_SOURCES.map(source => (
              <button
                key={source.id}
                disabled={loading}
                onClick={() => handleFetch(source.id)}
                className="flex items-center justify-between p-3 rounded-xl bg-slate-100 hover:bg-brand-50 dark:bg-slate-850 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 hover:border-brand-500 text-left transition group"
              >
                <div>
                  <b className="text-xs text-slate-900 dark:text-white group-hover:text-brand-500 block">
                    {source.name}
                  </b>
                  <span className="text-[10px] text-slate-400">
                    {source.category}
                  </span>
                </div>
                <Github className="h-4 w-4 text-slate-400 group-hover:text-brand-500" />
              </button>
            ))}
          </div>
        </div>

        {/* Custom Repo Input */}
        <div className="p-4 rounded-xl bg-slate-100/70 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-2 mb-4">
          <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block">
            Or Enter Any Public GitHub Repository:
          </label>
          <div className="flex items-center space-x-2">
            <input
              type="text"
              placeholder="e.g. vercel/next.js or facebook/react"
              value={customRepo}
              onChange={(e) => setCustomRepo(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleFetch()}
              className="flex-1 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 text-xs focus:ring-1 focus:ring-brand-500 focus:outline-none"
            />
            <button
              onClick={() => handleFetch()}
              disabled={loading || !customRepo.trim()}
              className="px-4 py-2 rounded-lg bg-brand-600 hover:bg-brand-500 disabled:opacity-50 text-white font-bold text-xs shadow-sm transition flex items-center space-x-1"
            >
              <RefreshCw className={`h-3.5 w-3.5 ${loading ? 'animate-spin' : ''}`} />
              <span>{loading ? 'Extracting...' : 'Fetch Live'}</span>
            </button>
          </div>
        </div>

        {/* Status Alerts */}
        {errorMsg && (
          <div className="mb-4 p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-500 text-xs flex items-center space-x-2">
            <AlertCircle className="h-4 w-4 flex-shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {successMsg && (
          <div className="mb-4 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-xs flex items-center space-x-2 animate-in fade-in">
            <CheckCircle2 className="h-4 w-4 flex-shrink-0" />
            <span>{successMsg}</span>
          </div>
        )}

        {/* Blank Slate Option */}
        <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <button
            type="button"
            onClick={handleClear}
            className="flex items-center space-x-1.5 text-xs font-semibold text-rose-500 hover:text-rose-600 p-2 rounded-lg hover:bg-rose-500/10 transition"
            title="Clear all data to test adding real feedback from scratch"
          >
            <Trash2 className="h-4 w-4" />
            <span>Clear Dataset (Start Blank)</span>
          </button>

          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-700 text-xs font-medium hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
}
