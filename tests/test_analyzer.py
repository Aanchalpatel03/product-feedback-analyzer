"""Unit tests for NLP Engine and Prioritization formulas."""
import unittest
from analyzer.nlp_engine import clean_text, calculate_sentiment, detect_intent, detect_churn_risk
from analyzer.prioritizer import calculate_rice_score, calculate_opportunity_score, determine_value_vs_effort_quadrant

class TestAnalyzer(unittest.TestCase):
    def test_clean_text(self):
        raw = "Hello World! This IS a TEST... 123"
        self.assertEqual(clean_text(raw), "hello world this is a test 123")
        
    def test_sentiment_calculation(self):
        pos = calculate_sentiment("This product is amazing, fast and intuitive!")
        self.assertIn(pos["label"], ["Positive", "Delighted"])
        self.assertGreater(pos["score"], 0.2)
        
        neg = calculate_sentiment("Total disaster. It crashes, freezes and is completely broken.")
        self.assertIn(neg["label"], ["Negative", "Frustrated"])
        self.assertLess(neg["score"], -0.2)

    def test_intent_detection(self):
        bug = detect_intent("The app crashed with an out of memory error.")
        self.assertEqual(bug, "Bug Report")
        
        churn = detect_intent("We are evaluating our renewal and will cancel next month.")
        self.assertEqual(churn, "Churn Threat")

    def test_rice_formula(self):
        # Reach: 100, Impact: 3.0, Confidence: 80%, Effort: 2
        # Score = (100 * 3.0 * 0.8) / 2 = 120.0
        score = calculate_rice_score(100, 3.0, 80, 2)
        self.assertEqual(score, 120.0)

    def test_opportunity_score(self):
        # Importance: 9.0, Satisfaction: 3.0 -> Opp = 9.0 + (9.0 - 3.0) = 15.0
        opp = calculate_opportunity_score(9.0, 3.0)
        self.assertEqual(opp, 15.0)

    def test_quadrant(self):
        quad = determine_value_vs_effort_quadrant(80, 30)
        self.assertEqual(quad["quadrant"], "Quick Win")

if __name__ == "__main__":
    unittest.main()
