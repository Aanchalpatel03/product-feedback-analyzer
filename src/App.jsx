import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import MetricsOverview from './components/MetricsOverview';
import SentimentVelocityChart from './components/SentimentVelocityChart';
import ChannelDonutChart from './components/ChannelDonutChart';
import PrioritizationMatrix from './components/PrioritizationMatrix';
import RiceCalculatorTable from './components/RiceCalculatorTable';
import KanoModelViewer from './components/KanoModelViewer';
import FeedbackFeed from './components/FeedbackFeed';
import RoadmapPlanner from './components/RoadmapPlanner';
import LiveFeedbackModal from './components/LiveFeedbackModal';
import AiCopilotModal from './components/AiCopilotModal';
import PrdExportModal from './components/PrdExportModal';

import { initialFeedbackData } from './data/feedbackData';
import { initialFeatureBacklog } from './data/featureBacklog';
import { Sparkles, Download, ArrowRight, Zap, ShieldAlert, CheckCircle2 } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('overview');
  const [darkMode, setDarkMode] = useState(true);
  const [feedbackList, setFeedbackList] = useState(initialFeedbackData);
  const [backlogList, setBacklogList] = useState(initialFeatureBacklog);

  // Modals
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);
  const [isCopilotModalOpen, setIsCopilotModalOpen] = useState(false);
  const [isPrdModalOpen, setIsPrdModalOpen] = useState(false);

  // Handle Dark Mode toggling
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Append new simulated customer feedback
  const handleFeedbackAdded = (newFeedback) => {
    setFeedbackList(prev => [newFeedback, ...prev]);
  };

  // Export full prioritized roadmap as JSON
  const handleExportJson = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(backlogList, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", "pulseflow_prioritized_roadmap.json");
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 transition-colors duration-200">
      
      {/* Top Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        onOpenNewFeedback={() => setIsFeedbackModalOpen(true)}
        onOpenCopilot={() => setIsCopilotModalOpen(true)}
        onOpenPrd={() => setIsPrdModalOpen(true)}
        totalFeedbackCount={feedbackList.length}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Render Active View Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-8 animate-in fade-in duration-300">
            
            {/* KPI Cards */}
            <MetricsOverview
              feedbackList={feedbackList}
              backlogList={backlogList}
            />

            {/* Interactive Data Visualizations Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <SentimentVelocityChart />
              <ChannelDonutChart />
            </div>

            {/* Quick Action Banner */}
            <div className="glass-panel p-6 bg-gradient-to-r from-brand-600/10 via-indigo-600/10 to-transparent border-brand-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center space-x-2">
                  <span className="p-1 rounded bg-brand-500 text-white">
                    <Zap className="h-4 w-4" />
                  </span>
                  <h3 className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-white">
                    AI Prioritization Recommendation for Upcoming Sprint
                  </h3>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 max-w-2xl">
                  Based on 1,248 feedback signals across Zendesk & Discord, prioritizing <b>FEAT-201 (SAML SSO)</b> will unblock <b>$142,000</b> in immediate enterprise contract renewals.
                </p>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setActiveTab('matrix')}
                  className="flex items-center space-x-1 px-4 py-2 rounded-lg bg-brand-600 hover:bg-brand-500 text-white font-bold text-xs transition shadow-sm whitespace-nowrap"
                >
                  <span>Explore 2x2 Matrix</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
                <button
                  onClick={handleExportJson}
                  className="flex items-center space-x-1 px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 text-xs font-semibold hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                  title="Export prioritized roadmap to JSON"
                >
                  <Download className="h-3.5 w-3.5" />
                  <span className="hidden sm:inline">Export</span>
                </button>
              </div>
            </div>

            {/* Quick Prioritization Snapshot */}
            <div className="glass-panel p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-extrabold text-sm text-slate-900 dark:text-white">
                  Top Priority Feature Candidates (Ranked by RICE)
                </h3>
                <button
                  onClick={() => setActiveTab('rice')}
                  className="text-xs font-semibold text-brand-500 hover:underline flex items-center space-x-1"
                >
                  <span>Open Full RICE Calculator</span>
                  <ArrowRight className="h-3 w-3" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {backlogList.slice(0, 3).map((feat, idx) => (
                  <div key={feat.id} className="p-4 rounded-xl bg-slate-100/70 dark:bg-slate-850/60 border border-slate-200 dark:border-slate-800 space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-mono font-bold text-slate-400">#{idx + 1} • {feat.id}</span>
                      <span className="font-extrabold px-2 py-0.5 rounded bg-brand-500/10 text-brand-500">
                        RICE {feat.riceScore}
                      </span>
                    </div>
                    <h4 className="font-bold text-sm text-slate-900 dark:text-white truncate">
                      {feat.title}
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2">
                      {feat.description}
                    </p>
                    <div className="pt-2 flex items-center justify-between text-[11px] text-slate-400 border-t border-slate-200 dark:border-slate-800">
                      <span>ARR: <b>${(feat.totalArrImpact / 1000).toFixed(0)}k</b></span>
                      <span className="font-medium text-emerald-500">{feat.quadrant}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {activeTab === 'matrix' && (
          <div className="animate-in fade-in duration-300">
            <PrioritizationMatrix
              backlogList={backlogList}
              onSelectFeature={(feat) => {}}
            />
          </div>
        )}

        {activeTab === 'rice' && (
          <div className="animate-in fade-in duration-300">
            <RiceCalculatorTable
              backlogList={backlogList}
              onUpdateFeature={() => {}}
            />
          </div>
        )}

        {activeTab === 'kano' && (
          <div className="animate-in fade-in duration-300">
            <KanoModelViewer
              backlogList={backlogList}
            />
          </div>
        )}

        {activeTab === 'feed' && (
          <div className="animate-in fade-in duration-300">
            <FeedbackFeed
              feedbackList={feedbackList}
            />
          </div>
        )}

        {activeTab === 'roadmap' && (
          <div className="animate-in fade-in duration-300">
            <RoadmapPlanner
              backlogList={backlogList}
            />
          </div>
        )}

      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 dark:border-slate-800/80 py-6 text-center text-xs text-slate-500 dark:text-slate-400">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p>
            <b>FeedbackPulse AI</b> — Built with React, Tailwind CSS, Python NLP & Prioritization Algorithms.
          </p>
          <div className="flex items-center space-x-4 text-[11px]">
            <span>Portfolio Demo by <b>Aanchal Patel</b></span>
            <span>•</span>
            <span className="text-brand-500">github.com/Aanchalpatel03</span>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <LiveFeedbackModal
        isOpen={isFeedbackModalOpen}
        onClose={() => setIsFeedbackModalOpen(false)}
        onFeedbackAdded={handleFeedbackAdded}
      />

      <AiCopilotModal
        isOpen={isCopilotModalOpen}
        onClose={() => setIsCopilotModalOpen(false)}
      />

      <PrdExportModal
        isOpen={isPrdModalOpen}
        onClose={() => setIsPrdModalOpen(false)}
        backlogList={backlogList}
      />

    </div>
  );
}
