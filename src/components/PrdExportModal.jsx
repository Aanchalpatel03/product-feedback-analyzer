import React, { useState } from 'react';
import { X, FileText, Download, Copy, Check, Sparkles } from 'lucide-react';

export default function PrdExportModal({ isOpen, onClose, backlogList }) {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const topFeatures = [...backlogList].sort((a, b) => b.riceScore - a.riceScore).slice(0, 5);

  const prdContent = `# 🚀 Product Requirements Document (PRD) — PulseFlow Q1 2027
**Target Release:** Q1 2027 | **Author:** Senior Product Manager | **Status:** In Review

---

## 1. Executive Summary & Problem Statement
PulseFlow Cloud has observed a **24% MoM acceleration in feedback volume**, surfacing critical blockers among Enterprise accounts ($142,000 ARR currently at churn risk). Primary vulnerabilities include missing enterprise authentication (SAML 2.0 / Okta SSO), browser OOM crashes on large dataset exports, and lack of granular RBAC permissions.

---

## 2. Quantitative Prioritization Matrix (RICE & Kano)
${topFeatures.map((f, i) => `### ${i+1}. ${f.title} (${f.id})
- **RICE Score:** ${f.riceScore} (Reach: ${f.reach}%, Impact: ${f.impact}x, Confidence: ${f.confidence}%, Effort: ${f.effort} mo)
- **Kano Classification:** ${f.kanoCategory} (${f.kanoRationale})
- **Opportunity Score:** ${f.opportunityScore} / 20.0
- **Arr Protection:** $${f.totalArrImpact.toLocaleString()}
`).join('\n')}

---

## 3. Key Performance Indicators (KPIs)
- **Primary Metric:** Net Sentiment Score (NSS) improvement from +24 to +45 within 90 days of release.
- **Enterprise Retention:** 100% renewal rate on accounts flagging SSO compliance.
- **Reliability:** 0 client-side Out Of Memory crashes on exports up to 1,000,000 rows.

---

## 4. Release Milestones
- **Sprint 24:** Complete Okta SAML 2.0 metadata parser & SCIM provisioning endpoint.
- **Sprint 25:** Roll out asynchronous Redis/S3 worker export queue.
- **Sprint 26:** Launch Granular RBAC custom roles to beta cohort.
`;

  const handleCopy = () => {
    navigator.clipboard.writeText(prdContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([prdContent], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `PulseFlow-PRD-Q1-2027.md`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="glass-panel-elevated max-w-2xl w-full h-[600px] flex flex-col relative overflow-hidden">
        
        {/* Header */}
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-white/50 dark:bg-slate-900/50">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 rounded-xl bg-brand-500/10 text-brand-500">
              <FileText className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-sm text-slate-900 dark:text-white">
                1-Click Automated Product Requirement Document (PRD)
              </h3>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Generated from real-time customer voice signals and RICE priority rankings
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* PRD Markdown Content Viewer */}
        <div className="flex-1 p-5 overflow-y-auto font-mono text-xs text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-950 whitespace-pre-wrap leading-relaxed select-text">
          {prdContent}
        </div>

        {/* Action Footer */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-center justify-between">
          <span className="text-[11px] text-slate-400">
            Ready for engineering backlog grooming & Jira sync
          </span>
          <div className="flex items-center space-x-2">
            <button
              onClick={handleCopy}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 text-xs font-semibold hover:bg-slate-100 dark:hover:bg-slate-800 transition"
            >
              {copied ? <Check className="h-4 w-4 text-emerald-500" /> : <Copy className="h-4 w-4" />}
              <span>{copied ? 'Copied' : 'Copy Markdown'}</span>
            </button>
            <button
              onClick={handleDownload}
              className="flex items-center space-x-1.5 px-3.5 py-1.5 rounded-lg bg-brand-600 hover:bg-brand-500 text-white text-xs font-bold transition shadow-sm"
            >
              <Download className="h-4 w-4" />
              <span>Download .md</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
