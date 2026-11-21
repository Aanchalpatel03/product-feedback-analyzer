import React, { useState, useEffect, useRef } from 'react';
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
import CsvImporterModal from './components/CsvImporterModal';
import JiraTicketModal from './components/JiraTicketModal';

import { companiesData } from './data/multiCompanyDatasets';
import { Sparkles, Download, ArrowRight, Zap, Radio, BellRing } from 'lucide-react';
import confetti from 'canvas-confetti';

// Pool of streaming events for real-time live ingestion
const STREAMING_EVENTS_POOL = [
  {
    name: "Vikram Malhotra",
    company: "Zeta Networks",
    tier: "Enterprise",
    mrr: 19500,
    channel: "Zendesk",
    text: "Our security compliance audit is due next week. We cannot allow non-SSO logins across our 180 seats.",
    topic: "Auth & Security"
  },
  {
    name: "Chloe Bourgeois",
    company: "DesignCo Europe",
    tier: "Growth",
    mrr: 3200,
    channel: "Discord",
    text: "Can we get high contrast dark mode for OLED screens? The current theme is slightly too bright in pitch dark rooms.",
    topic: "UI/UX & Mobile"
  },
  {
    name: "Liam Foster",
    company: "Quantum Analytics",
    tier: "Mid-Market",
    mrr: 7500,
    channel: "G2 Crowd",
    text: "The export crashed when pulling 80,000 transaction rows. Please add asynchronous background S3 export!",
    topic: "Performance & Speed"
  },
  {
    name: "Samantha Reed",
    company: "Acuity Financial",
    tier: "Enterprise",
    mrr: 31000,
    channel: "Gong Transcript",
    text: "We need webhook exponential backoff retry. When our gateway experiences network lag, we drop critical transaction logs.",
    topic: "API & Webhooks"
  }
];

export default function App() {
  const [selectedCompanyId, setSelectedCompanyId] = useState('pulseflow');
  const selectedCompany = companiesData[selectedCompanyId];

  const [activeTab, setActiveTab] = useState('overview');
  const [darkMode, setDarkMode] = useState(true);
  
  // Datasets
  const [feedbackList, setFeedbackList] = useState(companiesData.pulseflow.feedbacks);
  const [backlogList, setBacklogList] = useState(companiesData.pulseflow.backlog);

  // Modals
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);
  const [isCopilotModalOpen, setIsCopilotModalOpen] = useState(false);
  const [isPrdModalOpen, setIsPrdModalOpen] = useState(false);
  const [isCsvModalOpen, setIsCsvModalOpen] = useState(false);
  const [selectedJiraFeature, setSelectedJiraFeature] = useState(null);

  // Live Streaming Simulator
  const [isStreaming, setIsStreaming] = useState(false);
  const [streamToast, setStreamToast] = useState(null);
  const streamIndexRef = useRef(0);

  // Switch Company
  const handleSelectCompany = (companyId) => {
    setSelectedCompanyId(companyId);
    const target = companiesData[companyId];
    if (target) {
      setFeedbackList(target.feedbacks);
      setBacklogList(target.backlog);
    }
  };

  // Handle Dark Mode toggling
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Live streaming simulator loop (runs every 7 seconds when active)
  useEffect(() => {
    let interval = null;
    if (isStreaming) {
      interval = setInterval(() => {
        const item = STREAMING_EVENTS_POOL[streamIndexRef.current % STREAMING_EVENTS_POOL.length];
        streamIndexRef.current++;

        const newFeedback = {
          id: `STR-${Math.floor(1000 + Math.random() * 9000)}`,
          customer: {
            name: item.name,
            company: item.company,
            tier: item.tier,
            mrr: item.mrr,
            avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150"
          },
          channel: item.channel,
          date: new Date().toISOString(),
          text: item.text,
          sentiment: { score: -0.6, label: "Frustrated" },
          intent: "Feature Request",
          topic: item.topic,
          mappedFeature: item.topic,
          urgency: "High",
          churnRisk: item.tier === 'Enterprise' ? 'Critical' : 'Medium',
          verified: true
        };

        setFeedbackList(prev => [newFeedback, ...prev]);
        setStreamToast(`Live Signal Ingested: ${item.company} (${item.channel})`);

        setTimeout(() => {
          setStreamToast(null);
        }, 3500);

      }, 7000);
    }
    return () => clearInterval(interval);
  }, [isStreaming]);

  // Append new simulated customer feedback
  const handleFeedbackAdded = (newFeedback) => {
    setFeedbackList(prev => [newFeedback, ...prev]);

    setBacklogList(prev => prev.map(feat => {
      if (feat.productArea.toLowerCase() === newFeedback.topic.toLowerCase() ||
          feat.title.toLowerCase().includes(newFeedback.topic.toLowerCase())) {
        return {
          ...feat,
          linkedFeedbackCount: feat.linkedFeedbackCount + 1,
          totalArrImpact: feat.totalArrImpact + ((newFeedback.customer?.mrr || 5000) * 12)
        };
      }
      return feat;
    }));
  };

  // Batch CSV imported feedbacks
  const handleBatchImport = (importedItems) => {
    setFeedbackList(prev => [...importedItems, ...prev]);
  };

  // Update feature status (e.g. from Roadmap Planner Kanban)
  const handleFeatureStatusChange = (featId, newStatus) => {
    if (newStatus === 'Shipped') {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
    setBacklogList(prev => prev.map(f => f.id === featId ? { ...f, status: newStatus } : f));
  };

  // Export full prioritized roadmap as JSON
  const handleExportJson = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(backlogList, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `${selectedCompany.id}_prioritized_roadmap.json`);
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
        onOpenCsvImport={() => setIsCsvModalOpen(true)}
        totalFeedbackCount={feedbackList.length}
        selectedCompany={selectedCompany}
        onSelectCompany={handleSelectCompany}
        companies={companiesData}
        isStreaming={isStreaming}
        onToggleStreaming={() => setIsStreaming(!isStreaming)}
      />

      {/* Live Stream Notification Toast */}
      {streamToast && (
        <div className="fixed bottom-6 right-6 z-50 p-3.5 rounded-xl bg-slate-900/95 dark:bg-slate-800/95 text-white text-xs font-semibold shadow-2xl border border-brand-500/40 flex items-center space-x-2.5 animate-in slide-in-from-bottom-5">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
          <span>{streamToast}</span>
        </div>
      )}

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
                    AI Prioritization Recommendation for {selectedCompany.name}
                  </h3>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 max-w-2xl">
                  Based on live customer voice signals, prioritizing <b>{backlogList[0]?.title}</b> will protect <b>${(backlogList[0]?.totalArrImpact / 1000).toFixed(0)}k</b> in recurring contract renewals.
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
                {[...backlogList].sort((a, b) => b.riceScore - a.riceScore).slice(0, 3).map((feat, idx) => (
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
              onOpenJiraTicket={(feat) => setSelectedJiraFeature(feat)}
            />
          </div>
        )}

        {activeTab === 'rice' && (
          <div className="animate-in fade-in duration-300">
            <RiceCalculatorTable
              backlogList={backlogList}
              onUpdateFeature={(updatedList) => setBacklogList(updatedList)}
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
              onStatusChange={handleFeatureStatusChange}
            />
          </div>
        )}

      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 dark:border-slate-800/80 py-6 text-center text-xs text-slate-500 dark:text-slate-400">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p>
            <b>FeedbackPulse AI</b> — Multi-Tenant Customer Voice & Prioritization Engine.
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

      <CsvImporterModal
        isOpen={isCsvModalOpen}
        onClose={() => setIsCsvModalOpen(false)}
        onImportBatch={handleBatchImport}
      />

      <JiraTicketModal
        isOpen={!!selectedJiraFeature}
        onClose={() => setSelectedJiraFeature(null)}
        feature={selectedJiraFeature}
      />

    </div>
  );
}
