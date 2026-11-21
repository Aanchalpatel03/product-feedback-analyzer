import React, { useState } from 'react';
import { X, Sparkles, Send, CheckCircle2, ArrowRight } from 'lucide-react';
import { analyzeSentiment, detectIntent, detectTopic, detectChurnRisk } from '../utils/nlp';

export default function LiveFeedbackModal({ isOpen, onClose, onFeedbackAdded }) {
  const [customerName, setCustomerName] = useState('Alex Rivera');
  const [company, setCompany] = useState('CloudMatrix Systems');
  const [tier, setTier] = useState('Enterprise');
  const [mrr, setMrr] = useState(15000);
  const [channel, setChannel] = useState('Zendesk');
  const [feedbackText, setFeedbackText] = useState(
    'Our security team cannot approve the upcoming renewal unless you support SAML 2.0 SSO and SCIM directory sync.'
  );

  const [analyzing, setAnalyzing] = useState(false);
  const [previewResult, setPreviewResult] = useState(null);

  if (!isOpen) return null;

  const handleRunAiAnalysis = () => {
    if (!feedbackText.trim()) return;
    setAnalyzing(true);

    setTimeout(() => {
      const sentiment = analyzeSentiment(feedbackText);
      const intent = detectIntent(feedbackText);
      const topic = detectTopic(feedbackText);
      const churnRisk = detectChurnRisk(feedbackText, tier, sentiment.score);

      const result = {
        sentiment,
        intent,
        topic,
        churnRisk
      };

      setPreviewResult(result);
      setAnalyzing(false);
    }, 400);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const sentiment = analyzeSentiment(feedbackText);
    const intent = detectIntent(feedbackText);
    const topic = detectTopic(feedbackText);
    const churnRisk = detectChurnRisk(feedbackText, tier, sentiment.score);

    const newFeedback = {
      id: `FB-${Math.floor(1000 + Math.random() * 9000)}`,
      customer: {
        name: customerName,
        company,
        tier,
        mrr: parseInt(mrr, 10) || 5000,
        avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150"
      },
      channel,
      date: new Date().toISOString(),
      text: feedbackText,
      sentiment,
      intent,
      topic,
      mappedFeature: topic,
      urgency: churnRisk === 'Critical' ? 'Critical' : 'Medium',
      churnRisk,
      verified: true
    };

    onFeedbackAdded(newFeedback);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="glass-panel-elevated max-w-xl w-full p-6 relative max-h-[90vh] overflow-y-auto">
        
        {/* Modal Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center space-x-2.5 mb-4">
          <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-500">
            <Sparkles className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Simulate Live Customer Feedback & AI Analyzer
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Type or paste raw customer voice to test real-time NLP classification.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Customer Name</label>
              <input
                type="text"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                className="w-full bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg p-2 text-xs"
                required
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Company</label>
              <input
                type="text"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                className="w-full bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg p-2 text-xs"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Account Tier</label>
              <select
                value={tier}
                onChange={(e) => setTier(e.target.value)}
                className="w-full bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg p-2 text-xs"
              >
                <option value="Enterprise">Enterprise ($10k+)</option>
                <option value="Mid-Market">Mid-Market</option>
                <option value="Growth">Growth</option>
                <option value="SMB">SMB</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Monthly MRR ($)</label>
              <input
                type="number"
                value={mrr}
                onChange={(e) => setMrr(e.target.value)}
                className="w-full bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg p-2 text-xs"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Feedback Channel</label>
              <select
                value={channel}
                onChange={(e) => setChannel(e.target.value)}
                className="w-full bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg p-2 text-xs"
              >
                <option value="Zendesk">Zendesk</option>
                <option value="Discord">Discord</option>
                <option value="G2 Crowd">G2 Crowd</option>
                <option value="Gong Transcript">Gong Transcript</option>
                <option value="App Store">App Store</option>
                <option value="In-App NPS">In-App NPS</option>
              </select>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="font-semibold text-slate-700 dark:text-slate-300">
                Customer Feedback / Verbatim Quote
              </label>
              <button
                type="button"
                onClick={handleRunAiAnalysis}
                className="text-[11px] font-bold text-brand-500 hover:text-brand-600 flex items-center space-x-1"
              >
                <Sparkles className="h-3 w-3" />
                <span>Test NLP Live</span>
              </button>
            </div>
            <textarea
              rows={4}
              value={feedbackText}
              onChange={(e) => setFeedbackText(e.target.value)}
              placeholder="e.g. The analytics dashboard is freezing when pulling 10,000 records..."
              className="w-full bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg p-2.5 text-xs focus:ring-1 focus:ring-brand-500 focus:outline-none"
              required
            />
          </div>

          {/* AI NLP Instant Analysis Breakdown */}
          {previewResult && (
            <div className="p-3.5 rounded-xl bg-brand-500/5 dark:bg-brand-950/40 border border-brand-500/20 space-y-2 animate-in fade-in">
              <div className="flex items-center space-x-1.5 text-brand-500 font-bold text-[11px]">
                <Sparkles className="h-3.5 w-3.5" />
                <span>AI NLP Diagnostic Breakdown:</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px]">
                <div className="bg-white/60 dark:bg-slate-900/60 p-2 rounded-lg">
                  <span className="text-slate-400 block text-[10px]">Sentiment</span>
                  <span className="font-bold text-slate-800 dark:text-slate-200">
                    {previewResult.sentiment.label} ({previewResult.sentiment.score})
                  </span>
                </div>
                <div className="bg-white/60 dark:bg-slate-900/60 p-2 rounded-lg">
                  <span className="text-slate-400 block text-[10px]">Detected Intent</span>
                  <span className="font-bold text-slate-800 dark:text-slate-200">
                    {previewResult.intent}
                  </span>
                </div>
                <div className="bg-white/60 dark:bg-slate-900/60 p-2 rounded-lg">
                  <span className="text-slate-400 block text-[10px]">Topic Area</span>
                  <span className="font-bold text-slate-800 dark:text-slate-200">
                    {previewResult.topic}
                  </span>
                </div>
                <div className="bg-white/60 dark:bg-slate-900/60 p-2 rounded-lg">
                  <span className="text-slate-400 block text-[10px]">Churn Risk</span>
                  <span className={`font-bold ${
                    previewResult.churnRisk === 'Critical' ? 'text-rose-500' : 'text-emerald-500'
                  }`}>
                    {previewResult.churnRisk}
                  </span>
                </div>
              </div>
            </div>
          )}

          <div className="flex items-center justify-end space-x-2 pt-2 border-t border-slate-200 dark:border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-3.5 py-2 rounded-lg border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 font-medium transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex items-center space-x-1.5 px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold transition shadow-sm"
            >
              <CheckCircle2 className="h-4 w-4" />
              <span>Ingest & Recalculate Matrix</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}
