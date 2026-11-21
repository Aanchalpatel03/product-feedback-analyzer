import React, { useState } from 'react';
import { X, Bot, Sparkles, Send, Copy, Check, MessageSquare, Terminal } from 'lucide-react';

export default function AiCopilotModal({ isOpen, onClose }) {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      text: "👋 Hi! I'm your AI Product Management Copilot. I analyze your multi-channel customer voice, RICE scores, and Kano trade-offs. Ask me anything, or pick one of the executive prompts below!"
    }
  ]);
  const [inputQuery, setInputQuery] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [copiedIdx, setCopiedIdx] = useState(null);

  if (!isOpen) return null;

  const cannedPrompts = [
    "What are Enterprise customers complaining about most?",
    "Generate Jira User Stories for the top RICE feature",
    "What is our total ARR churn exposure and how do we prevent it?",
    "Recommend a Q1 2027 Sprint Backlog allocation"
  ];

  const cannedAnswers = {
    "What are Enterprise customers complaining about most?": `### 🚨 Top Enterprise Pain Point Breakdown:
1. **SAML 2.0 / Okta SSO & SCIM Provisioning ($142k ARR at risk):**
   - Enterprise security teams (e.g. DataVanguard, FinEdge) are enforcing strict CISO sign-off deadlines. Absence of SSO is an immediate deal-breaker for seat expansion.
2. **Browser Crashes on Large CSV Exports (Performance OOM):**
   - Analysts attempting 50k+ row exports encounter frozen tabs. Solution: implement background queue with S3 presigned links.
3. **Granular Multi-Tenant RBAC:**
   - Multi-department customers require custom permissions to keep contractor views isolated from corporate financial reports.`,

    "Generate Jira User Stories for the top RICE feature": `### 📋 Generated Jira Epic: SAML 2.0 & Okta SCIM User Provisioning (RICE: 127.5)
- **Story 1 (Identity Provider Config):**
  *As an Enterprise IT Admin, I want to configure Okta/Azure AD via SAML 2.0 metadata XML so my team can authenticate via centralized SSO.*
  - **Acceptance Criteria:**
    - Support SP-initiated and IdP-initiated SSO.
    - Encrypted assertions using SHA-256.
- **Story 2 (Automated SCIM Directory Sync):**
  *As an IT Admin, I want deprovisioned employees in Okta to be automatically revoked in PulseFlow within 60 seconds.*
- **Story 3 (JIT User Provisioning):**
  *As a new user logging in via SSO, I want my account automatically provisioned with default viewer permissions.*`,

    "What is our total ARR churn exposure and how do we prevent it?": `### 💰 Churn Risk Analysis:
- **Total Flagged Enterprise ARR:** **$142,000** across 4 key accounts.
- **Primary Driver:** Security compliance (SAML SSO & Immutable SOC2 Audit Logs).
- **Executive Recommendation:**
  1. Commit SSO into Sprint 24 (starts next Monday).
  2. Issue formal CISO compliance roadmap letter to DataVanguard & FinEdge to secure pending renewals.
  3. Deploy quick-win memory streaming fix for CSV export before end of month.`,

    "Recommend a Q1 2027 Sprint Backlog allocation": `### 🎯 Balanced Q1 2027 Sprint Roadmap Recommendation:
Applying the **70-20-10 Product Rule** (Core Features / Tech Debt / Delighters):

1. **Defensive Core (70% Effort - Must-Be):**
   - SAML 2.0 / Okta SSO & SCIM Sync (FEAT-201) — *Unblocks $142k ARR*.
   - Granular RBAC Permissions (FEAT-203) — *Enables enterprise multi-department deployment*.
2. **Performance & Reliability (20% Effort):**
   - Async Background CSV & Parquet Export (FEAT-202) — *Eliminates client-side memory crashes*.
3. **Delighter / NPS Booster (10% Effort - Attractive):**
   - Full System Dark Mode (FEAT-204) — *Quick win, massive community goodwill on Discord & G2*!`
  };

  const handleSend = (textToSend) => {
    const query = textToSend || inputQuery;
    if (!query.trim()) return;

    setMessages(prev => [...prev, { role: 'user', text: query }]);
    setInputQuery('');
    setIsTyping(true);

    setTimeout(() => {
      let reply = cannedAnswers[query];
      if (!reply) {
        reply = `### 💡 AI PM Analysis for "${query}":\nBased on current multi-channel signals, this item correlates with our **Performance & Speed** cluster. Recommended action: run RICE impact validation with our top 5 Mid-Market accounts before committing to active sprint backlog.`;
      }
      setMessages(prev => [...prev, { role: 'assistant', text: reply }]);
      setIsTyping(false);
    }, 600);
  };

  const copyMessage = (idx, text) => {
    navigator.clipboard.writeText(text);
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="glass-panel-elevated max-w-2xl w-full h-[600px] flex flex-col relative overflow-hidden">
        
        {/* Header */}
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-white/50 dark:bg-slate-900/50">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 rounded-xl bg-gradient-to-tr from-brand-600 to-indigo-500 text-white shadow-md">
              <Bot className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="font-extrabold text-sm text-slate-900 dark:text-white">
                  PulseFlow AI Product Copilot
                </h3>
                <span className="text-[10px] px-1.5 py-0.2 rounded bg-emerald-500/10 text-emerald-500 font-bold border border-emerald-500/20">
                  Online
                </span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Trained on 1,200+ customer feedback records, RICE matrices, and SaaS churn models
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

        {/* Message Thread */}
        <div className="flex-1 p-4 overflow-y-auto space-y-4 text-xs sm:text-sm">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex items-start space-x-2.5 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.role === 'assistant' && (
                <div className="w-6 h-6 rounded-full bg-brand-500 text-white flex items-center justify-center flex-shrink-0 text-[10px] font-bold">
                  AI
                </div>
              )}
              
              <div
                className={`max-w-[85%] p-3.5 rounded-2xl relative group ${
                  msg.role === 'user'
                    ? 'bg-brand-600 text-white rounded-tr-none'
                    : 'bg-slate-100 dark:bg-slate-800/80 text-slate-800 dark:text-slate-200 rounded-tl-none border border-slate-200 dark:border-slate-700/60'
                }`}
              >
                <div className="whitespace-pre-wrap leading-relaxed">
                  {msg.text}
                </div>

                {msg.role === 'assistant' && (
                  <button
                    onClick={() => copyMessage(idx, msg.text)}
                    className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                    title="Copy response"
                  >
                    {copiedIdx === idx ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5" />}
                  </button>
                )}
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex items-center space-x-2 text-xs text-slate-400 animate-pulse">
              <Sparkles className="h-3.5 w-3.5 text-brand-500" />
              <span>AI is analyzing customer sentiment & RICE scores...</span>
            </div>
          )}
        </div>

        {/* Canned Prompts Bar */}
        <div className="px-4 py-2 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/40 flex items-center space-x-2 overflow-x-auto scrollbar-none">
          {cannedPrompts.map((p, i) => (
            <button
              key={i}
              onClick={() => handleSend(p)}
              className="text-[11px] whitespace-nowrap px-2.5 py-1 rounded-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-brand-500 hover:text-brand-500 transition"
            >
              {p}
            </button>
          ))}
        </div>

        {/* Input Form */}
        <div className="p-3 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-center space-x-2">
          <input
            type="text"
            value={inputQuery}
            onChange={(e) => setInputQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask AI Copilot to summarize feedback, draft user stories, or analyze churn..."
            className="flex-1 bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-xs focus:ring-1 focus:ring-brand-500 focus:outline-none"
          />
          <button
            onClick={() => handleSend()}
            disabled={!inputQuery.trim()}
            className="p-2.5 rounded-xl bg-brand-600 hover:bg-brand-500 disabled:opacity-50 text-white transition shadow-sm"
          >
            <Send className="h-4 w-4" />
          </button>
        </div>

      </div>
    </div>
  );
}
