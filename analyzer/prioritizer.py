"""
PulseFlow AI - Product Prioritization Engine
Implements RICE, Kano Model, Value vs Effort, and Opportunity Scoring formulas.
"""

from typing import Dict, Any

def calculate_rice_score(reach: float, impact: float, confidence: float, effort: float) -> float:
    """
    RICE Scoring Formula:
    (Reach * Impact * (Confidence / 100)) / Effort
    
    - Reach: Number of users/accounts affected per time period (0 - 100)
    - Impact: 3 = massive, 2 = high, 1 = medium, 0.5 = low
    - Confidence: 100% = high confidence, 80% = medium, 50% = low
    - Effort: Person-months / sprints (minimum 0.1 to avoid div by zero)
    """
    if effort <= 0:
        effort = 0.1
    confidence_decimal = confidence / 100.0 if confidence > 1.0 else confidence
    score = (reach * impact * confidence_decimal) / effort
    return round(score, 1)

def classify_kano(importance: float, satisfaction: float, delight_factor: float = 1.0) -> Dict[str, str]:
    """
    Kano Model Classification:
    - Must-Be (Basic): High importance, absence causes intense dissatisfaction.
    - Performance (One-Dimensional): Linear satisfaction curve (more is better).
    - Attractive (Delighter): Not expected, but causes high delight and positive word of mouth.
    - Indifferent: Low importance and low satisfaction delta.
    """
    if importance >= 8.5 and satisfaction <= 4.0:
        category = "Must-Be"
        rationale = "Table stakes feature; absence triggers high churn risk."
    elif delight_factor > 1.5 or (importance < 7.5 and satisfaction >= 7.0):
        category = "Attractive"
        rationale = "Delighter feature; boosts viral NPS without being mandatory."
    elif importance >= 7.0:
        category = "Performance"
        rationale = "Linear satisfier; customer happiness scales directly with implementation quality."
    else:
        category = "Indifferent"
        rationale = "Low perceived priority; minimal impact on user retention."
        
    return {"category": category, "rationale": rationale}

def calculate_opportunity_score(importance: float, satisfaction: float) -> float:
    """
    Dan Olsen / Anthony Ulwick Outcome-Driven Innovation Opportunity Formula:
    Opportunity = Importance + Max(Importance - Satisfaction, 0)
    
    Identifies high-value underserved product market opportunities.
    Scores > 15 = Extreme Opportunity (underserved)
    Scores 12-15 = Strong Opportunity
    Scores < 10 = Overserved or Low Priority
    """
    gap = max(importance - satisfaction, 0.0)
    score = importance + gap
    return round(score, 1)

def determine_value_vs_effort_quadrant(value_score: float, effort_score: float) -> Dict[str, str]:
    """
    2x2 Matrix Quadrant Mapping:
    - High Value (>= 50), Low Effort (< 50) -> Quick Win
    - High Value (>= 50), High Effort (>= 50) -> Major Strategic Bet
    - Low Value (< 50), Low Effort (< 50) -> Fill-in / Low Hanging Fruit
    - Low Value (< 50), High Effort (>= 50) -> Thankless Task / Re-evaluate
    """
    if value_score >= 50 and effort_score < 50:
        quadrant = "Quick Win"
        recommendation = "Prioritize immediately in next sprint cycle."
    elif value_score >= 50 and effort_score >= 50:
        quadrant = "Major Strategic Bet"
        recommendation = "Break down into phased MVPs and assign dedicated pod."
    elif value_score < 50 and effort_score < 50:
        quadrant = "Fill-In"
        recommendation = "Bundle into buffer sprints or developer hack days."
    else:
        quadrant = "Thankless Task"
        recommendation = "Deprioritize or challenge fundamental assumptions."
        
    return {"quadrant": quadrant, "recommendation": recommendation}
