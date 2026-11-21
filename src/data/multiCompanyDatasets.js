// Multi-Industry Enterprise Datasets for FeedbackPulse AI
// Allows switching between B2B SaaS, FinTech Developer API, and Consumer Mobile AI

import { initialFeedbackData } from './feedbackData';
import { initialFeatureBacklog } from './featureBacklog';

export const companiesData = {
  pulseflow: {
    id: 'pulseflow',
    name: 'PulseFlow Cloud',
    tagline: 'Enterprise Collaborative Workflow & Visual Automation',
    industry: 'B2B SaaS / Productivity',
    logoColor: 'from-brand-600 to-indigo-500',
    feedbacks: initialFeedbackData,
    backlog: initialFeatureBacklog,
    kpi: {
      totalFeedback: '1,248',
      netSentiment: '+24',
      arrAtRisk: '$142k',
      topPriority: 'SAML SSO & SCIM',
      topRiceScore: 127.5
    }
  },

  finstream: {
    id: 'finstream',
    name: 'FinStream Pay',
    tagline: 'Next-Gen Developer Payments & Multi-Currency Settlement API',
    industry: 'FinTech / Developer Platform',
    logoColor: 'from-emerald-600 to-teal-500',
    feedbacks: [
      {
        id: "FIN-3001",
        customer: {
          name: "David Vance",
          company: "Starlight Marketplace",
          tier: "Enterprise",
          mrr: 28000,
          avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150"
        },
        channel: "Zendesk",
        date: "2026-11-20T11:20:00Z",
        text: "During peak Black Friday load, our webhook receiving endpoint suffered a 5-second network blip. FinStream dropped payment confirmation events instead of applying exponential backoff. We had to reconcile 1,400 orders manually.",
        sentiment: { score: -0.75, label: "Negative" },
        intent: "Bug Report",
        topic: "API & Webhooks",
        mappedFeature: "Webhook Exponential Backoff & Dead-Letter Queue",
        urgency: "Critical",
        churnRisk: "Critical",
        verified: true
      },
      {
        id: "FIN-3002",
        customer: {
          name: "Siddharth Rao",
          company: "Nexus Global SaaS",
          tier: "Enterprise",
          mrr: 35000,
          avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150"
        },
        channel: "Gong Transcript",
        date: "2026-11-19T14:15:00Z",
        text: "We are expanding across Europe and the UK next quarter. We cannot launch without SEPA Instant Credit Transfer and automated EUR/GBP multi-currency IBAN virtual accounts. Without this, we will stay on Adyen.",
        sentiment: { score: -0.60, label: "Frustrated" },
        intent: "Feature Request",
        topic: "Billing & Plans",
        mappedFeature: "SEPA Instant & Multi-Currency Virtual IBAN Accounts",
        urgency: "Critical",
        churnRisk: "Critical",
        verified: true
      },
      {
        id: "FIN-3003",
        customer: {
          name: "Rachel Goldman",
          company: "PayFlow Apps",
          tier: "Mid-Market",
          mrr: 6800,
          avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150"
        },
        channel: "Discord",
        date: "2026-11-18T20:45:00Z",
        text: "The Python and Go SDKs are super clean! But please enforce Idempotency-Key headers on all POST /v1/charges endpoints by default. It prevents accidental double-charging when client networks time out.",
        sentiment: { score: 0.15, label: "Positive" },
        intent: "Feature Request",
        topic: "API & Webhooks",
        mappedFeature: "Mandatory Idempotency Key Guardrails & SDK Middleware",
        urgency: "High",
        churnRisk: "Low",
        verified: true
      },
      {
        id: "FIN-3004",
        customer: {
          name: "Antoine Dubois",
          company: "Luxor Retail Paris",
          tier: "Enterprise",
          mrr: 22000,
          avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150"
        },
        channel: "G2 Crowd",
        date: "2026-11-17T09:30:00Z",
        text: "Fraud detection engine stopped $45k in card testing attacks automatically this weekend. 3D Secure 2.0 dynamic step-up saved our conversion rate while keeping chargebacks under 0.1%. Brilliant work!",
        sentiment: { score: 0.95, label: "Delighted" },
        intent: "Praise",
        topic: "Auth & Security",
        mappedFeature: "Radar AI 3DS2 Dynamic Frictionless Flow",
        urgency: "Low",
        churnRisk: "Low",
        verified: true
      }
    ],
    backlog: [
      {
        id: "FIN-401",
        title: "Webhook Exponential Backoff & Dead-Letter Replay Queue",
        description: "Guarantee at-least-once webhook delivery with 72-hour automated retry backoff and admin UI replay.",
        category: "Developer Platform",
        productArea: "API & Webhooks",
        targetQuarter: "Q1 2027",
        status: "Sprint Ready",
        reach: 90,
        impact: 3.0,
        confidence: 100,
        effort: 1.5,
        riceScore: 180.0,
        kanoCategory: "Must-Be",
        kanoRationale: "Table stakes for fintech infrastructure; missing payment events causes direct order fulfillment failures.",
        valueScore: 96,
        effortScore: 32,
        quadrant: "Quick Win",
        importanceScore: 9.8,
        satisfactionScore: 2.1,
        opportunityScore: 17.5,
        linkedFeedbackCount: 28,
        totalArrImpact: 240000,
        churnRiskPrevented: "Critical ($240k ARR across 5 merchant partners)",
        moscow: "Must Have",
        owner: "Payments Platform Pod"
      },
      {
        id: "FIN-402",
        title: "SEPA Instant & Multi-Currency Virtual IBANs",
        description: "Automated pan-European SEPA instant settlement supporting localized EUR, GBP, and CHF IBAN routing.",
        category: "Treasury & FX",
        productArea: "Billing & Plans",
        targetQuarter: "Q1 2027",
        status: "In Progress",
        reach: 75,
        impact: 3.0,
        confidence: 90,
        effort: 3.0,
        riceScore: 67.5,
        kanoCategory: "Must-Be",
        kanoRationale: "Prerequisite for enterprise European merchants who refuse SWIFT wire turnaround delays.",
        valueScore: 92,
        effortScore: 65,
        quadrant: "Major Strategic Bet",
        importanceScore: 9.4,
        satisfactionScore: 3.0,
        opportunityScore: 15.8,
        linkedFeedbackCount: 19,
        totalArrImpact: 310000,
        churnRiskPrevented: "Critical",
        moscow: "Must Have",
        owner: "Treasury Engineering"
      },
      {
        id: "FIN-403",
        title: "Mandatory Idempotency Key Guardrails & SDK Middleware",
        description: "Enforce unique idempotency tokens on payment mutations with built-in client SDK automatic deduplication.",
        category: "Developer Experience",
        productArea: "API & Webhooks",
        targetQuarter: "Q4 2026",
        status: "Sprint Ready",
        reach: 85,
        impact: 2.0,
        confidence: 95,
        effort: 1.0,
        riceScore: 161.5,
        kanoCategory: "Performance",
        kanoRationale: "Directly prevents accidental customer double charges during mobile flaky network drops.",
        valueScore: 88,
        effortScore: 22,
        quadrant: "Quick Win",
        importanceScore: 8.9,
        satisfactionScore: 4.2,
        opportunityScore: 13.6,
        linkedFeedbackCount: 16,
        totalArrImpact: 120000,
        churnRiskPrevented: "High",
        moscow: "Must Have",
        owner: "Developer Experience"
      }
    ],
    kpi: {
      totalFeedback: '2,890',
      netSentiment: '+38',
      arrAtRisk: '$320k',
      topPriority: 'Webhook Dead-Letter Queue',
      topRiceScore: 180.0
    }
  },

  aura: {
    id: 'aura',
    name: 'Aura AI Health',
    tagline: 'Consumer Health Intelligence, Sleep Tracking & Biometrics App',
    industry: 'Consumer AI / Mobile Health',
    logoColor: 'from-purple-600 to-pink-500',
    feedbacks: [
      {
        id: "AUR-5001",
        customer: {
          name: "Jessica Miller",
          company: "iOS Beta Cohort",
          tier: "Growth",
          mrr: 240,
          avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150"
        },
        channel: "App Store",
        date: "2026-11-20T08:15:00Z",
        text: "Rating: 1/5 stars. The app drained 42% of my iPhone battery overnight while doing sleep tracking! I woke up with my phone burning hot and battery dead. Please fix the background sensor polling daemon.",
        sentiment: { score: -0.85, label: "Negative" },
        intent: "Bug Report",
        topic: "Performance & Speed",
        mappedFeature: "Low-Power Accelerometer & Battery Daemon Optimization",
        urgency: "Critical",
        churnRisk: "High",
        verified: true
      },
      {
        id: "AUR-5002",
        customer: {
          name: "Dr. Gregory House",
          company: "Stanford Sleep Clinic",
          tier: "Enterprise",
          mrr: 4500,
          avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150"
        },
        channel: "Zendesk",
        date: "2026-11-19T16:00:00Z",
        text: "Our clinical study participants need two-way Apple HealthKit and Whoop API synchronization. Right now, HRV measurements are only logged once every 4 hours instead of continuous sleep phase intervals.",
        sentiment: { score: -0.40, label: "Frustrated" },
        intent: "Feature Request",
        topic: "UI/UX & Mobile",
        mappedFeature: "Continuous HealthKit HRV & Biometric Sync Engine",
        urgency: "High",
        churnRisk: "Medium",
        verified: true
      },
      {
        id: "AUR-5003",
        customer: {
          name: "Maya Lin",
          company: "Consumer Premium",
          tier: "Growth",
          mrr: 180,
          avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150"
        },
        channel: "Discord",
        date: "2026-11-18T22:10:00Z",
        text: "The AI personalized morning sleep analysis feels like talking to a real neurologist. It correctly identified that my 9pm caffeine habit was wrecking my REM cycles. Worth every penny of the annual sub!",
        sentiment: { score: 0.98, label: "Delighted" },
        intent: "Praise",
        topic: "UI/UX & Mobile",
        mappedFeature: "Personalized LLM Chronotype & Recovery Coach",
        urgency: "Low",
        churnRisk: "Low",
        verified: true
      }
    ],
    backlog: [
      {
        id: "AUR-601",
        title: "Low-Power Accelerometer & Battery Optimization Daemon",
        description: "Re-architect CoreMotion background loop to batch sensor events, reducing overnight battery draw from 42% to <4%.",
        category: "Mobile Performance",
        productArea: "Performance & Speed",
        targetQuarter: "Q4 2026",
        status: "In Progress",
        reach: 95,
        impact: 3.0,
        confidence: 100,
        effort: 1.0,
        riceScore: 285.0,
        kanoCategory: "Must-Be",
        kanoRationale: "Direct cause of 1-star App Store reviews; apps that overheat phones get uninstalled within 24 hours.",
        valueScore: 98,
        effortScore: 24,
        quadrant: "Quick Win",
        importanceScore: 9.9,
        satisfactionScore: 1.8,
        opportunityScore: 18.0,
        linkedFeedbackCount: 84,
        totalArrImpact: 68000,
        churnRiskPrevented: "Critical (Preserves 4.6 App Store Rating)",
        moscow: "Must Have",
        owner: "iOS Core Runtime Team"
      },
      {
        id: "AUR-602",
        title: "Continuous HealthKit HRV & Biometric Sync Engine",
        description: "Stream high-frequency heart rate variability and circadian phase markers directly to Apple Health and Google Fit.",
        category: "Ecosystem Integrations",
        productArea: "UI/UX & Mobile",
        targetQuarter: "Q1 2027",
        status: "Sprint Ready",
        reach: 70,
        impact: 2.0,
        confidence: 90,
        effort: 1.5,
        riceScore: 84.0,
        kanoCategory: "Performance",
        kanoRationale: "Enables health-conscious power users to link existing wearable devices.",
        valueScore: 84,
        effortScore: 35,
        quadrant: "Quick Win",
        importanceScore: 8.6,
        satisfactionScore: 3.4,
        opportunityScore: 13.8,
        linkedFeedbackCount: 31,
        totalArrImpact: 42000,
        churnRiskPrevented: "Medium",
        moscow: "Should Have",
        owner: "Wearable Integrations"
      }
    ],
    kpi: {
      totalFeedback: '4,520',
      netSentiment: '+42',
      arrAtRisk: '$68k',
      topPriority: 'Low-Power Battery Daemon',
      topRiceScore: 285.0
    }
  }
};
