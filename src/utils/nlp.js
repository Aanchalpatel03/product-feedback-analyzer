// Client-side AI NLP Analysis Engine
// Analyzes sentiment, detects intent, extracts topics, and flags churn risk in real-time

const NEGATIVE_WORDS = [
  "freeze", "freezes", "crash", "crashes", "fail", "fails", "broken", "terrible",
  "unusable", "slow", "lag", "horrible", "frustrating", "crashed", "blocking", "blocked",
  "disaster", "renewal", "cancel", "canceling", "churn", "lost", "waste", "poor", "pain",
  "annoying", "hate", "impossible", "bad", "buggy", "stuck"
];

const POSITIVE_WORDS = [
  "love", "great", "excellent", "fast", "intuitive", "saved", "amazing", "smooth",
  "delighted", "superb", "brilliant", "fantastic", "clean", "magic", "best", "helpful",
  "game-changer", "wonderful", "easy", "speedy", "efficient", "perfect"
];

export function cleanText(text) {
  if (!text) return "";
  return text.toLowerCase().replace(/[^\w\s\-]/g, " ").replace(/\s+/g, " ").trim();
}

export function analyzeSentiment(text) {
  const words = cleanText(text).split(" ");
  if (!words.length || words[0] === "") {
    return { score: 0.0, label: "Neutral" };
  }

  let pos = 0;
  let neg = 0;

  words.forEach(w => {
    if (POSITIVE_WORDS.includes(w)) pos++;
    if (NEGATIVE_WORDS.includes(w)) neg++;
  });

  const total = pos + neg;
  let score = 0;
  if (total > 0) {
    score = Math.max(-1.0, Math.min(1.0, (pos - neg) / Math.max(total, 2)));
  }

  score = Math.round(score * 100) / 100;

  let label = "Neutral";
  if (score >= 0.45) label = "Delighted";
  else if (score > 0.1) label = "Positive";
  else if (score <= -0.45) label = "Negative";
  else if (score < -0.1) label = "Frustrated";

  return { score, label };
}

export function detectIntent(text) {
  const t = text.toLowerCase();
  if (/cancel|renewal|re-evaluat|ciso|churn|switch to|alternative/i.test(t)) {
    return "Churn Threat";
  }
  if (/bug|crash|error|freeze|fail|exception|oom|429|500|broken/i.test(t)) {
    return "Bug Report";
  }
  if (/love|awesome|amazing|great job|kudos|saved our|delighted|10\/10/i.test(t)) {
    return "Praise";
  }
  if (/invoice|billing|vat|tax|receipt|subscription|pricing|charge/i.test(t)) {
    return "Billing & Plans";
  }
  if (/confusing|hard to find|clunky|unintuitive|too many clicks/i.test(t)) {
    return "Usability Complaint";
  }
  if (/would love|please add|need|feature|request|support for|wish there/i.test(t)) {
    return "Feature Request";
  }
  return "Feature Request";
}

export function detectTopic(text) {
  const t = text.toLowerCase();
  if (/sso|saml|okta|scim|security|ciso|audit|rbac|permission|compliance/i.test(t)) {
    return "Auth & Security";
  }
  if (/export|csv|parquet|freeze|memory|slow|latency|search|speed|performance/i.test(t)) {
    return "Performance & Speed";
  }
  if (/api|webhook|rate limit|429|endpoint|quota|retry|payload|rest/i.test(t)) {
    return "API & Webhooks";
  }
  if (/dark mode|mobile|push|notification|pagerduty|theme|contrast|ui|ux/i.test(t)) {
    return "UI/UX & Mobile";
  }
  if (/multiplayer|canvas|presence|cursor|share|collaborative|team/i.test(t)) {
    return "Collaboration & Export";
  }
  if (/invoice|billing|receipt|vat|tax|ap|payment|finance/i.test(t)) {
    return "Billing & Plans";
  }
  return "UI/UX & Mobile";
}

export function detectChurnRisk(text, tier, sentimentScore) {
  const t = text.toLowerCase();
  const trigger = /cancel|renewal|ciso|switch|alternative|unusable|churn/i.test(t);

  if ((tier === "Enterprise" || tier === "Strategic") && (trigger || sentimentScore <= -0.4)) {
    return "Critical";
  }
  if (tier === "Enterprise" || sentimentScore <= -0.5) {
    return "High";
  }
  if (sentimentScore < -0.1) {
    return "Medium";
  }
  return "Low";
}
