// Live Real-World Data Extractor
// Fetches real, live user feedback & issues from public APIs (GitHub, Hacker News)
// Normalizes and runs AI NLP sentiment, intent, and priority scoring in real time.

import { analyzeSentiment, detectIntent, detectTopic, detectChurnRisk } from './nlp';
import { calculateRice, getQuadrant } from './prioritization';

export const POPULAR_LIVE_SOURCES = [
  { id: 'vercel/next.js', name: 'Next.js (Vercel)', category: 'Full-Stack Framework' },
  { id: 'facebook/react', name: 'React (Meta)', category: 'Frontend UI Library' },
  { id: 'tailwindlabs/tailwindcss', name: 'Tailwind CSS', category: 'Design Systems & CSS' },
  { id: 'shadcn-ui/ui', name: 'shadcn/ui', category: 'Modern UI Components' },
  { id: 'supabase/supabase', name: 'Supabase', category: 'Cloud Database & Auth' },
];

/**
 * Fetch real, live issues and user discussions from any public GitHub repository
 */
export async function fetchLiveGitHubFeedback(repoPath = 'vercel/next.js', limit = 20) {
  try {
    const cleanPath = repoPath.replace(/^https?:\/\/github\.com\//i, '').replace(/\/$/, '').trim();
    const url = `https://api.github.com/repos/${cleanPath}/issues?per_page=${limit}&state=all`;
    
    const response = await fetch(url, {
      headers: {
        'Accept': 'application/vnd.github.v3+json',
      }
    });

    if (!response.ok) {
      if (response.status === 403) {
        throw new Error('GitHub API rate limit reached for IP. Wait a minute or try another repo.');
      }
      throw new Error(`Failed to fetch from GitHub: ${response.statusText}`);
    }

    const issues = await response.json();
    if (!Array.isArray(issues)) {
      throw new Error('Unexpected response format from GitHub API');
    }

    const normalizedFeedbacks = [];
    const mappedFeaturesMap = new Map();

    issues.forEach((issue) => {
      // Exclude pull requests if any (GitHub issues API returns PRs too)
      if (issue.pull_request) return;

      const title = issue.title || 'User Issue';
      const body = (issue.body || '').replace(/<!--[\s\S]*?-->/g, '').trim();
      const fullText = `${title}. ${body.slice(0, 300)}`.trim();

      const sentiment = analyzeSentiment(fullText);
      const intent = detectIntent(fullText);
      const topic = detectTopic(fullText);

      // Estimate customer ARR and tier from user activity or labels
      const hasBugLabel = (issue.labels || []).some(l => /bug|crash|error|regression/i.test(l.name));
      const hasFeatureLabel = (issue.labels || []).some(l => /feature|enhancement|request/i.test(l.name));

      let tier = 'Mid-Market';
      let mrr = 4500;
      if (issue.comments > 5 || issue.reactions?.total_count > 10) {
        tier = 'Enterprise';
        mrr = 18000;
      } else if (issue.comments <= 1) {
        tier = 'SMB';
        mrr = 1200;
      }

      const churnRisk = detectChurnRisk(fullText, tier, sentiment.score);

      const feedbackItem = {
        id: `GH-${issue.number}`,
        sourceUrl: issue.html_url,
        customer: {
          name: issue.user?.login || 'Developer',
          company: `@${issue.user?.login} (GitHub Contributor)`,
          tier,
          mrr,
          avatar: issue.user?.avatar_url || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150'
        },
        channel: 'GitHub Issues',
        date: issue.created_at,
        text: title + (body ? `: ${body.slice(0, 220)}...` : ''),
        sentiment,
        intent: hasBugLabel ? 'Bug Report' : (hasFeatureLabel ? 'Feature Request' : intent),
        topic,
        mappedFeature: title.slice(0, 50),
        urgency: churnRisk === 'Critical' || hasBugLabel ? 'Critical' : 'Medium',
        churnRisk,
        verified: true
      };

      normalizedFeedbacks.push(feedbackItem);

      // Group into backlog features dynamically from live feedback
      const featureKey = topic;
      if (!mappedFeaturesMap.has(featureKey)) {
        const reachVal = Math.min(95, Math.max(30, 40 + normalizedFeedbacks.length * 4));
        const impactVal = hasBugLabel ? 3.0 : 2.0;
        const confidenceVal = 90;
        const effortVal = 1.5;
        const riceScore = calculateRice(reachVal, impactVal, confidenceVal, effortVal);
        const valueScore = Math.min(98, 50 + (sentiment.score < 0 ? 35 : 20));
        const effortScore = 35;
        const quad = getQuadrant(valueScore, effortScore);

        mappedFeaturesMap.set(featureKey, {
          id: `FEAT-LIVE-${mappedFeaturesMap.size + 1}`,
          title: `Resolve ${topic} Reliability & Performance`,
          description: `Consolidated engineering initiative addressing real issues reported by community developers: "${title}"`,
          category: 'Platform & Infrastructure',
          productArea: topic,
          targetQuarter: 'Active Sprint',
          status: 'Sprint Ready',
          reach: reachVal,
          impact: impactVal,
          confidence: confidenceVal,
          effort: effortVal,
          riceScore,
          kanoCategory: hasBugLabel ? 'Must-Be' : 'Performance',
          kanoRationale: `Identified from live ${cleanPath} issues. Directly impacts user retention and daily workflow stability.`,
          valueScore,
          effortScore,
          quadrant: quad.name,
          importanceScore: 9.0,
          satisfactionScore: sentiment.score < 0 ? 2.8 : 6.5,
          opportunityScore: 15.2,
          linkedFeedbackCount: 1,
          totalArrImpact: mrr * 12,
          churnRiskPrevented: `High (Unblocks ${tier} developer workflow)`,
          moscow: 'Must Have',
          owner: 'Core Framework Team'
        });
      } else {
        const existing = mappedFeaturesMap.get(featureKey);
        existing.linkedFeedbackCount += 1;
        existing.totalArrImpact += mrr * 12;
      }
    });

    const dynamicBacklog = Array.from(mappedFeaturesMap.values());

    return {
      sourceName: cleanPath,
      feedbacks: normalizedFeedbacks,
      backlog: dynamicBacklog.length > 0 ? dynamicBacklog : []
    };
  } catch (error) {
    console.error('Error fetching live GitHub feedback:', error);
    throw error;
  }
}
