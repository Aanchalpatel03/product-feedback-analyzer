import React, { useState } from 'react';
import { X, Copy, Check, Ticket, CheckCircle2, ExternalLink } from 'lucide-react';

export default function JiraTicketModal({ isOpen, onClose, feature }) {
  const [copied, setCopied] = useState(false);

  if (!isOpen || !feature) return null;

  const ticketMarkdown = `h1. [${feature.id}] ${feature.title}

*Product Area:* ${feature.productArea} | *Target Quarter:* ${feature.targetQuarter}
*RICE Score:* ${feature.riceScore} (Reach: ${feature.reach}%, Impact: ${feature.impact}x, Confidence: ${feature.confidence}%, Effort: ${feature.effort} mo)
*Kano Category:* ${feature.kanoCategory}
*ARR Protection:* $${feature.totalArrImpact.toLocaleString()}

----
h2. User Story
*As an* enterprise administrator,
*I want to* ${feature.description.toLowerCase()}
*So that* our organization can eliminate friction and scale securely without risking account churn.

----
h2. Acceptance Criteria
# Verify ${feature.productArea} integration passes end-to-end regression tests.
# Validate user permissions and tamper-evident audit logging for SOC2 compliance.
# Ensure zero memory leaks or client browser freezes under heavy concurrent usage.
# Error states must return standardized status codes with helpful developer guidance.

----
h2. Prioritization & Business Rationale
- *Kano Rationale:* ${feature.kanoRationale}
- *Quadrant:* ${feature.quadrant} (Opportunity Score: ${feature.opportunityScore}/20)
- *Linked Customer Quotes:* ${feature.linkedFeedbackCount} verified signals
`;

  const handleCopy = () => {
    navigator.clipboard.writeText(ticketMarkdown);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
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
          <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-500">
            <Ticket className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
                Export to Jira / Linear Ticket
              </h3>
              <span className="text-[10px] px-1.5 py-0.2 rounded bg-brand-500/10 text-brand-500 font-mono font-bold">
                {feature.id}
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Formatted with User Story, Acceptance Criteria, and RICE justification.
            </p>
          </div>
        </div>

        {/* Formatted Preview */}
        <div className="p-4 rounded-xl bg-slate-100 dark:bg-slate-950 font-mono text-xs text-slate-700 dark:text-slate-300 whitespace-pre-wrap leading-relaxed select-text border border-slate-200 dark:border-slate-800 max-h-[380px] overflow-y-auto">
          {ticketMarkdown}
        </div>

        {/* Action Footer */}
        <div className="mt-5 pt-3 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <span className="text-[11px] text-slate-400">
            Compatible with Jira Cloud, Linear, and GitHub Issues
          </span>

          <button
            onClick={handleCopy}
            className="flex items-center space-x-1.5 px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs transition shadow-sm"
          >
            {copied ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
            <span>{copied ? 'Copied to Clipboard!' : 'Copy for Jira / Linear'}</span>
          </button>
        </div>

      </div>
    </div>
  );
}
