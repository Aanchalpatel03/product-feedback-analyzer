"""
PulseFlow AI - CLI Runner and Executive Report Generator
Run with: python3 analyzer/main.py
"""

import sys
import os
import json
from typing import List, Dict, Any

# Ensure project root is in PYTHONPATH
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from analyzer.nlp_engine import analyze_feedback_item
from analyzer.prioritizer import calculate_rice_score, classify_kano, calculate_opportunity_score, determine_value_vs_effort_quadrant

def generate_executive_report(feedback_list: List[Dict[str, Any]]) -> str:
    total_items = len(feedback_list)
    if total_items == 0:
        return "No feedback records found."
        
    analyzed = []
    sentiment_counts = {"Delighted": 0, "Positive": 0, "Neutral": 0, "Frustrated": 0, "Negative": 0}
    intent_counts = {}
    topic_counts = {}
    churn_risks = {"Critical": 0, "High": 0, "Medium": 0, "Low": 0}
    
    for item in feedback_list:
        res = analyze_feedback_item(item.get("text", ""), item.get("tier", "SMB"))
        analyzed.append(res)
        
        lbl = res["sentiment"]["label"]
        sentiment_counts[lbl] = sentiment_counts.get(lbl, 0) + 1
        
        intent = res["intent"]
        intent_counts[intent] = intent_counts.get(intent, 0) + 1
        
        topic = res["topic"]
        topic_counts[topic] = topic_counts.get(topic, 0) + 1
        
        churn = res["churn_risk"]
        churn_risks[churn] = churn_risks.get(churn, 0) + 1

    report = []
    report.append("# 📊 PulseFlow AI — Executive Product Feedback Analysis Report")
    report.append(f"**Total Feedback Ingested:** {total_items} items across Zendesk, Discord, G2, App Store, and Gong.\n")
    
    report.append("## 1. Sentiment Health & Churn Risk")
    pos_ratio = (sentiment_counts["Delighted"] + sentiment_counts["Positive"]) / total_items * 100
    neg_ratio = (sentiment_counts["Frustrated"] + sentiment_counts["Negative"]) / total_items * 100
    report.append(f"- **Customer Positive Index:** {pos_ratio:.1f}%")
    report.append(f"- **Customer Dissatisfaction Index:** {neg_ratio:.1f}%")
    report.append(f"- **Critical Churn Threats:** {churn_risks['Critical']} accounts at immediate risk")
    report.append(f"- **High Churn Threats:** {churn_risks['High']} accounts\n")
    
    report.append("## 2. Topic Distribution & Hotspots")
    for topic, count in sorted(topic_counts.items(), key=lambda x: x[1], reverse=True):
        report.append(f"- **{topic}:** {count} reports ({count/total_items*100:.1f}%)")
        
    report.append("\n## 3. Recommended Sprint Action Plan")
    report.append("1. **SSO / SCIM Security Suite:** Resolve enterprise contract blockers.")
    report.append("2. **Background Async Export:** Stop browser OOM crashes on large dataset queries.")
    report.append("3. **Granular RBAC:** Unblock multi-department expansion in Enterprise accounts.")
    
    return "\n".join(report)

if __name__ == "__main__":
    sample_dataset = [
        {"text": "SSO with Okta is mandatory for our 300 employee renewal.", "tier": "Enterprise"},
        {"text": "CSV export crashes browser tab when pulling 50k rows.", "tier": "Enterprise"},
        {"text": "Dark mode would be amazing for evening triage!", "tier": "SMB"},
        {"text": "Webhook fails silently with no retry logic.", "tier": "Growth"},
        {"text": "Love the workflow canvas! Saved our team 10 hours.", "tier": "Mid-Market"}
    ]
    report = generate_executive_report(sample_dataset)
    print(report)
