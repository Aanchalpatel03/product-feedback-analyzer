"""
PulseFlow AI - NLP Sentiment and Intent Analysis Engine
Provides sentiment scoring, intent classification, topic extraction, and churn threat detection.
"""

import re
from typing import Dict, List, Any

# Lexicons and patterns for rule-based & semantic evaluation
NEGATIVE_WORDS = {
    "freeze", "freezes", "crash", "crashes", "fail", "fails", "broken", "terrible",
    "unusable", "slow", "lag", "horrible", "frustrating", "crashed", "blocking", "blocked",
    "disaster", "renewal", "cancel", "canceling", "churn", "lost", "waste", "poor", "pain"
}

POSITIVE_WORDS = {
    "love", "great", "excellent", "fast", "intuitive", "saved", "amazing", "smooth",
    "delighted", "superb", "brilliant", "fantastic", "clean", "magic", "best", "helpful"
}

INTENT_PATTERNS = {
    "Bug Report": [
        r"\b(bug|crash|error|exception|fail|failure|broken|freeze|memory leak|oom|429|500)\b",
        r"\b(doesn't work|not working|cannot open|timeout)\b"
    ],
    "Feature Request": [
        r"\b(would love|can we get|please add|need|feature|request|support for|wish there was)\b",
        r"\b(allow us to|ability to|sso|dark mode|export|webhook|audit log)\b"
    ],
    "Churn Threat": [
        r"\b(cancel|canceling|cancelling|renewal|re-evaluating|ciso won't sign|switch to|churn|alternative)\b"
    ],
    "Praise": [
        r"\b(love|awesome|amazing|great job|kudos|saved our team|best tool|10/10|delighted)\b"
    ],
    "Billing & Plans": [
        r"\b(invoice|billing|vat|tax|receipt|subscription|pricing|charge|credit card)\b"
    ],
    "Usability Complaint": [
        r"\b(confusing|hard to find|clunky|unintuitive|too many clicks|awkward)\b"
    ]
}

TOPIC_KEYWORDS = {
    "Auth & Security": ["sso", "saml", "okta", "scim", "security", "ciso", "audit", "rbac", "permission", "compliance"],
    "Performance & Speed": ["export", "csv", "parquet", "freeze", "memory", "slow", "latency", "search", "elasticsearch"],
    "API & Webhooks": ["api", "webhook", "rate limit", "429", "endpoints", "quota", "backoff", "retry", "rest"],
    "UI/UX & Mobile": ["dark mode", "mobile", "push", "notification", "pagerduty", "theme", "contrast", "ui", "ux"],
    "Collaboration & Export": ["multiplayer", "canvas", "presence", "cursor", "share", "team", "collaborative"],
    "Billing & Plans": ["invoice", "billing", "receipt", "vat", "tax", "ap", "payment"]
}

def clean_text(text: str) -> str:
    """Normalize text for analysis."""
    text = text.lower()
    text = re.sub(r"[^\w\s\-]", " ", text)
    return " ".join(text.split())

def calculate_sentiment(text: str) -> Dict[str, Any]:
    """Calculate sentiment score (-1.0 to 1.0) and descriptive label."""
    words = clean_text(text).split()
    if not words:
        return {"score": 0.0, "label": "Neutral"}
    
    pos_count = sum(1 for w in words if w in POSITIVE_WORDS)
    neg_count = sum(1 for w in words if w in NEGATIVE_WORDS)
    
    net = pos_count - neg_count
    total_matches = pos_count + neg_count
    
    if total_matches == 0:
        score = 0.0
    else:
        score = max(-1.0, min(1.0, net / max(total_matches, 3)))
    
    if score >= 0.5:
        label = "Delighted"
    elif score > 0.1:
        label = "Positive"
    elif score <= -0.5:
        label = "Negative"
    elif score < -0.1:
        label = "Frustrated"
    else:
        label = "Neutral"
        
    return {"score": round(score, 2), "label": label}

def detect_intent(text: str) -> str:
    """Classify primary customer intent."""
    normalized = text.lower()
    
    # Priority check: Churn threat is highest operational priority
    for pattern in INTENT_PATTERNS["Churn Threat"]:
        if re.search(pattern, normalized):
            return "Churn Threat"
            
    for intent, patterns in INTENT_PATTERNS.items():
        if intent == "Churn Threat":
            continue
        for p in patterns:
            if re.search(p, normalized):
                return intent
                
    return "Feedback / General"

def detect_topic(text: str) -> str:
    """Identify the primary product domain / topic."""
    normalized = text.lower()
    best_topic = "General Product"
    max_matches = 0
    
    for topic, keywords in TOPIC_KEYWORDS.items():
        matches = sum(1 for kw in keywords if re.search(rf"\b{kw}\b", normalized))
        if matches > max_matches:
            max_matches = matches
            best_topic = topic
            
    return best_topic

def detect_churn_risk(text: str, tier: str, sentiment_score: float) -> str:
    """Determine churn risk level based on sentiment and enterprise stakes."""
    norm = text.lower()
    has_churn_trigger = any(w in norm for w in ["cancel", "renewal", "ciso", "switch", "alternative", "unusable"])
    
    if (tier in ["Enterprise", "Strategic"]) and (has_churn_trigger or sentiment_score <= -0.4):
        return "Critical"
    elif tier == "Enterprise" or sentiment_score <= -0.5:
        return "High"
    elif sentiment_score < -0.1:
        return "Medium"
    else:
        return "Low"

def analyze_feedback_item(text: str, tier: str = "SMB") -> Dict[str, Any]:
    """Complete NLP analysis pipeline for a single feedback item."""
    sentiment = calculate_sentiment(text)
    intent = detect_intent(text)
    topic = detect_topic(text)
    churn = detect_churn_risk(text, tier, sentiment["score"])
    
    return {
        "cleaned_text": clean_text(text),
        "sentiment": sentiment,
        "intent": intent,
        "topic": topic,
        "churn_risk": churn
    }
