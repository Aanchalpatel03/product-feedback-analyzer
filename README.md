# 🚀 FeedbackPulse AI — Intelligent Product Feedback Analyzer & Prioritization Matrix

> **A human-crafted, SaaS-grade Product Management platform designed to ingest multi-channel customer voice, execute AI sentiment & intent clustering, and mathematically prioritize product roadmaps using RICE, Kano Model, and 2x2 Value vs. Effort matrices.**

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![React](https://img.shields.io/badge/React-18.3-61dafb.svg)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-38bdf8.svg)
![Python](https://img.shields.io/badge/Python-3.10%2B-yellow.svg)
![Build](https://img.shields.io/badge/build-passing-brightgreen.svg)

---

## 🌟 Executive Overview & Motivation

In high-growth B2B and consumer SaaS companies, product teams are flooded with fragmented customer feedback across Zendesk tickets, Discord community channels, G2/Capterra reviews, App Store feedback, in-app NPS surveys, and Gong sales call recordings.

Most teams suffer from two failure modes:
1. **The "Loudest Customer" Fallacy:** Building what the most aggressive client asks for rather than what protects recurring revenue.
2. **Analysis Paralysis:** Thousands of raw customer quotes sitting unorganized in spreadsheets without quantitative scoring or clear action plans.

**FeedbackPulse AI** solves this by unifying customer voice into a centralized intelligence engine:
- Ingests and normalizes multi-channel feedback in real time.
- Runs AI NLP sentiment scoring, intent detection (Bug, Feature Request, Churn Threat, Praise), and topic clustering.
- Flags critical ARR at churn risk from contract renewal blockers (e.g., CISO security compliance).
- Mathematically prioritizes features using industry-standard product frameworks:
  - **RICE Scoring** $(Reach \times Impact \times Confidence) / Effort$ with dynamic real-time sliders.
  - **Kano Model** (Must-Be table stakes vs. Linear Performance vs. Delighters).
  - **Interactive 2x2 Value vs. Effort Matrix** (Quick Wins, Strategic Bets, Fill-Ins, Thankless Tasks).
  - **Opportunity Scoring** ($Importance + \max(Importance - Satisfaction, 0)$).
- Features an **AI PM Copilot** that synthesizes customer pain points, drafts Jira user stories, and generates complete **Product Requirements Documents (PRDs)** in one click.

---

## 📸 Core Features & Capabilities

### 1. 📊 Executive KPI Dashboard & Longitudinal Trends
- **Total Feedback Ingested:** Tracks aggregate volume and month-over-month signal velocity.
- **Net Sentiment Score (NSS):** Normalized $-100$ to $+100$ index measuring customer satisfaction recovery.
- **Enterprise ARR at Risk:** Automatically calculates the exact dollar value at risk from accounts flagging churn threats.
- **Sentiment Velocity Chart:** Interactive 6-month time-series visualization tracking positive praise vs. negative complaints.
- **Channel Distribution Donut:** Real-time percentage breakdown across Zendesk, Discord, G2 Crowd, Gong, App Store, and In-App NPS.

### 2. 🎯 Interactive 2x2 Value vs. Effort Matrix
- Dynamic scatter canvas plotting features across **Value Score** (Y-Axis) and **Effort Score** (X-Axis).
- Real-time quadrant tagging:
  - 🟢 **Quick Wins (High Value, Low Effort):** Immediate sprint prioritization.
  - 🔵 **Major Strategic Bets (High Value, High Effort):** Deconstructed into phased MVPs.
  - 🟡 **Fill-Ins (Low Value, Low Effort):** Slotted into buffer sprints.
  - 🔴 **Thankless Tasks (Low Value, High Effort):** Deprioritized.
- Click any node to open the **Feature Inspector Card**, revealing linked customer verbatim quotes, RICE scores, and ARR protection impact.

### 3. ⚖️ Dynamic RICE Score Calculator
- Implements the canonical Intercom RICE formula:
  $$\text{RICE Score} = \frac{\text{Reach} \times \text{Impact} \times \text{Confidence} \%}{\text{Effort (person-months)}}$$
- Interactive sliders for Reach ($10\% - 100\%$), Impact ($0.5\times - 3.0\times$), Confidence ($50\% - 100\%$), and Effort ($0.5 - 5.0\text{ mo}$).
- Instant recalculation and re-sorting of the backlog in real time.

### 4. 🧭 Kano Model Emotional Framework
- Categorizes features based on customer psychological expectations:
  - **Must-Be (Table Stakes):** SSO/SCIM, SOC2 audit logs. Absence causes immediate churn.
  - **Performance (One-Dimensional):** Async background export speed, search latency. Satisfaction scales linearly.
  - **Attractive (Delighters):** Full system Dark Mode, multiplayer canvas presence. Sparks viral advocacy.

### 5. 🤖 AI PM Copilot & Automated PRD Generator
- **Conversational Assistant:** Provides instant answers to executive questions:
  - *"What are Enterprise customers complaining about most?"*
  - *"Generate Jira user stories for our top RICE feature"*
  - *"Estimate churn ARR risk and recommend sprint allocation"*
- **1-Click PRD Generator:** Exports comprehensive Product Requirement Documents formatted in Markdown, ready for engineering grooming.

### 6. 🧪 Live Feedback Simulator
- Test form enabling interviewers or stakeholders to enter custom customer feedback.
- Real-time NLP extracts sentiment score, customer intent, topic domain, and churn threat priority on the fly.

---

## 🏗️ System Architecture & Technology Stack

```
FeedbackPulse AI
├── Frontend (React 18 SPA)
│   ├── Vite 5 + Tailwind CSS 3.4 (Modern, dark/light theme, glassmorphic UI)
│   ├── Lucide React Icons & SVG Interactive Data Visualizations
│   ├── Client NLP Engine (src/utils/nlp.js)
│   ├── Prioritization Engine (src/utils/prioritization.js)
│   └── Multi-Channel Datasets (Zendesk, Discord, G2, Gong, App Store)
│
├── Backend & CLI Analytics (Python 3)
│   ├── analyzer/nlp_engine.py (Lexicon normalization, intent classification)
│   ├── analyzer/prioritizer.py (Mathematical RICE & Kano algorithms)
│   ├── analyzer/main.py (CLI Executive Markdown report generator)
│   └── tests/test_analyzer.py (Automated unit tests)
│
└── Production Artifacts
    ├── dist/ (Optimized, tree-shaken static production bundle)
    └── vercel.json (Instant cloud deployment configuration)
```

---

## ⚡ Quickstart & Installation

### Prerequisites
- Node.js 18+ or Bun 1.1+
- Python 3.9+ (optional for CLI analytics)

### 1. Clone & Install
```bash
git clone https://github.com/Aanchalpatel03/product-feedback-analyzer.git
cd product-feedback-analyzer

# Install frontend dependencies
npm install
# or with bun:
bun install
```

### 2. Run the Development Server
```bash
npm run dev
# or:
bun run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 3. Build for Production
```bash
npm run build
# Generates optimized static bundle in dist/
```

### 4. Run Python NLP Engine & Unit Tests
```bash
# Run automated test suite
python3 -m unittest discover tests

# Generate CLI executive report
python3 analyzer/main.py
```

---

## 🎯 PM Interview Talking Points

When presenting this project to an interviewer or executive panel, highlight these four product pillars:

1. **Revenue Protection over Feature Quantity:**
   *"We identified that $142k in Enterprise ARR was tied to a single compliance requirement: SAML 2.0 / Okta SSO. By prioritizing FEAT-201 first via RICE (127.5), we protected our core contract renewals before investing in speculative delighters."*

2. **The 70-20-10 Agile Allocation:**
   *"Our roadmap balances 70% core defensibility (SSO, RBAC), 20% platform reliability (async background exports to prevent browser crashes), and 10% delighters (dark mode) to maintain customer excitement."*

3. **Multi-Channel Triangulation:**
   *"A complaint heard on Zendesk might look isolated; when correlated with Discord community discussions and Gong sales objection transcripts, it proves systemic platform friction."*

4. **Kano Model Defensibility:**
   *"Delighters create viral growth, but Must-Be features prevent churn. Kano classification prevents teams from building delighters while basic table stakes are broken."*

---

## 👤 Author & Maintainer

**Aanchal Patel**
- GitHub: [@Aanchalpatel03](https://github.com/Aanchalpatel03)
- Specialization: AI / Data Analytics • Machine Learning • Product Development
