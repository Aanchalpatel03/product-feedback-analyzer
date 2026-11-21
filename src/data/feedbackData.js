// Realistic, multi-channel customer feedback dataset for PulseFlow Cloud (B2B SaaS)
export const initialFeedbackData = [
  {
    id: "FB-1001",
    customer: {
      name: "Sarah Chen",
      company: "DataVanguard Inc.",
      tier: "Enterprise",
      mrr: 14500,
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150"
    },
    channel: "Zendesk",
    date: "2026-11-18T14:32:00Z",
    text: "We are currently evaluating our enterprise renewal. Our security compliance team requires SAML 2.0 / Okta SSO with SCIM user provisioning before January 15th. Without this, our CISO cannot sign off on the 250-seat expansion.",
    sentiment: { score: -0.65, label: "Frustrated" },
    intent: "Feature Request",
    topic: "Auth & Security",
    mappedFeature: "SAML 2.0 / Okta SSO & SCIM Provisioning",
    urgency: "Critical",
    churnRisk: "High",
    verified: true
  },
  {
    id: "FB-1002",
    customer: {
      name: "Marcus Thorne",
      company: "HyperScale Tech",
      tier: "Enterprise",
      mrr: 18200,
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150"
    },
    channel: "Gong Transcript",
    date: "2026-11-17T09:15:00Z",
    text: "When our analysts try to export datasets larger than 50,000 rows to CSV, the entire browser tab freezes and eventually crashes with an Out of Memory error. We desperately need async background export that emails a secure download link.",
    sentiment: { score: -0.78, label: "Negative" },
    intent: "Bug Report",
    topic: "Performance & Speed",
    mappedFeature: "Async Background CSV & Parquet Export",
    urgency: "Critical",
    churnRisk: "High",
    verified: true
  },
  {
    id: "FB-1003",
    customer: {
      name: "Elena Rostova",
      company: "NovaWave Media",
      tier: "Mid-Market",
      mrr: 4200,
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150"
    },
    channel: "G2 Crowd",
    date: "2026-11-16T18:40:00Z",
    text: "PulseFlow is hands-down the most intuitive workflow platform we've adopted. The visual dependency graphs saved our product team at least 10 hours a week. Would love a native dark mode for late night triage sessions!",
    sentiment: { score: 0.92, label: "Delighted" },
    intent: "Praise",
    topic: "UI/UX & Mobile",
    mappedFeature: "Full System Dark Mode & Contrast Themes",
    urgency: "Low",
    churnRisk: "Low",
    verified: true
  },
  {
    id: "FB-1004",
    customer: {
      name: "Devon Miller",
      company: "Synthetix Labs",
      tier: "Enterprise",
      mrr: 12000,
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150"
    },
    channel: "Discord",
    date: "2026-11-15T21:10:00Z",
    text: "We hit the 60 req/min API rate limit during our hourly sync pipelines. The response headers don't return Retry-After or remaining quotas, so our background jobs fail abruptly with 429 errors.",
    sentiment: { score: -0.45, label: "Frustrated" },
    intent: "Usability Complaint",
    topic: "API & Webhooks",
    mappedFeature: "Public REST API v2 & Dynamic Rate Limit Tiering",
    urgency: "High",
    churnRisk: "Medium",
    verified: true
  },
  {
    id: "FB-1005",
    customer: {
      name: "Aisha Patel",
      company: "FinEdge Solutions",
      tier: "Enterprise",
      mrr: 21500,
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150"
    },
    channel: "Zendesk",
    date: "2026-11-14T11:05:00Z",
    text: "We need immutable audit logs for compliance review. Need to know exactly who changed access permissions, deleted projects, or edited pipeline configs with IP timestamps and exportable tamper-evident proofs.",
    sentiment: { score: -0.30, label: "Neutral" },
    intent: "Feature Request",
    topic: "Auth & Security",
    mappedFeature: "SOC2 Compliance Audit Trail & Event Logs",
    urgency: "High",
    churnRisk: "High",
    verified: true
  },
  {
    id: "FB-1006",
    customer: {
      name: "Liam O'Connor",
      company: "Apex Retailers",
      tier: "Mid-Market",
      mrr: 3800,
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150"
    },
    channel: "In-App NPS",
    date: "2026-11-13T16:22:00Z",
    text: "Score: 6/10. Great product overall, but our remote team members keep overriding each other's canvas edits because there are no presence indicators or collaborative cursor tracking like in Figma or Miro.",
    sentiment: { score: -0.20, label: "Neutral" },
    intent: "Feature Request",
    topic: "Collaboration & Export",
    mappedFeature: "Real-Time Multiplayer Canvas & Live Presence Cursors",
    urgency: "Medium",
    churnRisk: "Medium",
    verified: true
  },
  {
    id: "FB-1007",
    customer: {
      name: "Jessica Wu",
      company: "OmniChannel Direct",
      tier: "SMB",
      mrr: 1200,
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150"
    },
    channel: "App Store",
    date: "2026-11-12T08:44:00Z",
    text: "Rating: 2/5 stars. Critical pipeline failure notifications only arrive via email! In an incident response scenario, our on-call engineers don't check email at 3am. Need native iOS & Android push notifications or PagerDuty integration.",
    sentiment: { score: -0.72, label: "Negative" },
    intent: "Bug Report",
    topic: "UI/UX & Mobile",
    mappedFeature: "Mobile Native Push & PagerDuty / OpsGenie Integrations",
    urgency: "High",
    churnRisk: "Medium",
    verified: true
  },
  {
    id: "FB-1008",
    customer: {
      name: "Carlos Mendez",
      company: "Loomis Global Logistics",
      tier: "Enterprise",
      mrr: 16800,
      avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150"
    },
    channel: "Gong Transcript",
    date: "2026-11-11T15:00:00Z",
    text: "We have 4 different departments sharing a single organization account. We cannot allow marketing contractors to view finance models. We need granular role-based access control (RBAC) with custom role definitions.",
    sentiment: { score: -0.55, label: "Frustrated" },
    intent: "Feature Request",
    topic: "Auth & Security",
    mappedFeature: "Granular RBAC with Custom Role Definitions",
    urgency: "Critical",
    churnRisk: "High",
    verified: true
  },
  {
    id: "FB-1009",
    customer: {
      name: "Chloe Bourgeois",
      company: "Kreative Studio",
      tier: "Growth",
      mrr: 2400,
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150"
    },
    channel: "Discord",
    date: "2026-11-10T22:15:00Z",
    text: "Webhook delivery fails silently whenever our receiving endpoint has a 3-second blip. Can we get an exponential backoff retry policy (5 retries over 24h) plus a dead-letter replay UI in the developer settings?",
    sentiment: { score: -0.38, label: "Neutral" },
    intent: "Feature Request",
    topic: "API & Webhooks",
    mappedFeature: "Webhook Automatic Retry Engine & Dead-Letter Replay UI",
    urgency: "Medium",
    churnRisk: "Low",
    verified: true
  },
  {
    id: "FB-1010",
    customer: {
      name: "Zachary Taylor",
      company: "Acme Payments",
      tier: "Enterprise",
      mrr: 29000,
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150"
    },
    channel: "Zendesk",
    date: "2026-11-09T10:18:00Z",
    text: "Monthly automated invoices are sent to the account owner personal inbox rather than our centralized AP finance distribution list (ap-invoices@acmepayments.com). Also need VAT number and tax exemption field on PDF receipts.",
    sentiment: { score: -0.42, label: "Frustrated" },
    intent: "Usability Complaint",
    topic: "Billing & Plans",
    mappedFeature: "Multi-Recipient Billing Invoices & Custom Tax IDs",
    urgency: "High",
    churnRisk: "Low",
    verified: true
  },
  {
    id: "FB-1011",
    customer: {
      name: "Hannah Schmidt",
      company: "Bavaria BioTech",
      tier: "Mid-Market",
      mrr: 5600,
      avatar: "https://images.unsplash.com/photo-1554151228-14d9def656e4?w=150"
    },
    channel: "G2 Crowd",
    date: "2026-11-08T13:45:00Z",
    text: "The data filtering is lightning fast, but when our team searches for specific customer tags inside nested workflow nodes, it takes 8+ seconds or returns partial matches. Full-text indexed search across all entities would make this 10x better.",
    sentiment: { score: 0.10, label: "Neutral" },
    intent: "Feature Request",
    topic: "Performance & Speed",
    mappedFeature: "Global Elasticsearch Full-Text Workspace Query Engine",
    urgency: "Medium",
    churnRisk: "Low",
    verified: true
  },
  {
    id: "FB-1012",
    customer: {
      name: "Tariq Mansoor",
      company: "Oasis Cloud",
      tier: "Growth",
      mrr: 3100,
      avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150"
    },
    channel: "In-App NPS",
    date: "2026-11-07T17:30:00Z",
    text: "Score: 10/10. The AI auto-tagging alone justified our subscription cost this quarter. We were able to categorize 5,000 backlogged customer notes in under 15 minutes. Pure magic!",
    sentiment: { score: 0.98, label: "Delighted" },
    intent: "Praise",
    topic: "Performance & Speed",
    mappedFeature: "AI Semantic Tagging & Cluster Categorization",
    urgency: "Low",
    churnRisk: "Low",
    verified: true
  }
];
