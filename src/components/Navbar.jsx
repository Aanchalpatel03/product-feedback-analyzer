import React from 'react';
import { 
  Sparkles, 
  Layers, 
  BarChart3, 
  Grid2X2, 
  Compass, 
  MessageSquare, 
  PlusCircle, 
  Bot, 
  Sun, 
  Moon, 
  FileText,
  UploadCloud,
  Radio,
  Building2,
  ChevronDown
} from 'lucide-react';

export default function Navbar({ 
  activeTab, 
  setActiveTab, 
  darkMode, 
  setDarkMode, 
  onOpenNewFeedback, 
  onOpenCopilot, 
  onOpenPrd,
  onOpenCsvImport,
  totalFeedbackCount,
  selectedCompany,
  onSelectCompany,
  companies,
  isStreaming,
  onToggleStreaming
}) {
  const navItems = [
    { id: 'overview', label: 'Executive Overview', icon: BarChart3 },
    { id: 'matrix', label: '2x2 Prioritization Matrix', icon: Grid2X2 },
    { id: 'rice', label: 'RICE Dynamic Scoring', icon: Layers },
    { id: 'kano', label: 'Kano Framework', icon: Compass },
    { id: 'feed', label: 'Voice of Customer Feed', icon: MessageSquare, badge: totalFeedbackCount },
    { id: 'roadmap', label: 'Roadmap & Sprints', icon: Sparkles }
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Row */}
        <div className="flex items-center justify-between h-16 gap-2">
          
          {/* Logo & Product Name */}
          <div className="flex items-center space-x-3">
            <div className={`h-10 w-10 rounded-xl bg-gradient-to-tr ${selectedCompany.logoColor} flex items-center justify-center text-white shadow-lg`}>
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-slate-900 via-brand-600 to-indigo-600 dark:from-white dark:via-brand-400 dark:to-indigo-300 bg-clip-text text-transparent">
                  FeedbackPulse
                </span>
                
                {/* Company Switcher Dropdown */}
                <div className="relative group">
                  <select
                    value={selectedCompany.id}
                    onChange={(e) => onSelectCompany(e.target.value)}
                    className="appearance-none bg-slate-100 dark:bg-slate-800 text-[11px] font-bold text-slate-700 dark:text-slate-300 pl-2 pr-6 py-0.5 rounded-lg border border-slate-300 dark:border-slate-700 cursor-pointer focus:outline-none focus:ring-1 focus:ring-brand-500"
                  >
                    <option value="pulseflow">PulseFlow (B2B SaaS)</option>
                    <option value="finstream">FinStream (Fintech API)</option>
                    <option value="aura">Aura AI (Consumer Mobile)</option>
                  </select>
                  <ChevronDown className="h-3 w-3 text-slate-400 absolute right-1.5 top-1.5 pointer-events-none" />
                </div>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 hidden sm:block">
                {selectedCompany.tagline}
              </p>
            </div>
          </div>

          {/* Action Tools */}
          <div className="flex items-center space-x-1.5 sm:space-x-2.5">
            
            {/* Live Real-Time Stream Toggle */}
            <button
              onClick={onToggleStreaming}
              className={`flex items-center space-x-1.5 px-2.5 py-1.5 rounded-lg text-xs font-bold transition border ${
                isStreaming
                  ? 'bg-rose-500/10 text-rose-500 border-rose-500/30 shadow-sm'
                  : 'border-slate-200 dark:border-slate-800 text-slate-500 hover:text-slate-700 dark:hover:text-slate-200'
              }`}
              title={isStreaming ? "Click to pause real-time feedback ingestion stream" : "Click to simulate live streaming customer feedback"}
            >
              <span className={`w-2 h-2 rounded-full ${isStreaming ? 'bg-rose-500 animate-ping' : 'bg-slate-400'}`} />
              <span className="hidden md:inline">{isStreaming ? 'Streaming Live' : 'Live Stream'}</span>
            </button>

            {/* Import CSV */}
            <button
              onClick={onOpenCsvImport}
              className="flex items-center space-x-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 transition"
              title="Upload your own CSV feedback dataset"
            >
              <UploadCloud className="h-3.5 w-3.5 text-brand-500" />
              <span className="hidden sm:inline">Import CSV</span>
            </button>

            {/* AI PM Copilot */}
            <button
              onClick={onOpenCopilot}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-gradient-to-r from-indigo-500 to-brand-600 text-white shadow-sm hover:from-indigo-600 hover:to-brand-700 transition"
              title="Open AI Product Manager Copilot"
            >
              <Bot className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Ask AI</span>
            </button>

            {/* Generate PRD */}
            <button
              onClick={onOpenPrd}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 transition"
              title="Generate 1-Click Product Requirement Document (PRD)"
            >
              <FileText className="h-3.5 w-3.5 text-brand-500" />
              <span className="hidden md:inline">PRD</span>
            </button>

            {/* Simulate Feedback */}
            <button
              onClick={onOpenNewFeedback}
              className="flex items-center space-x-1 px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white shadow-sm transition"
              title="Test Live AI NLP Classifier"
            >
              <PlusCircle className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Add Signal</span>
            </button>

            {/* Dark / Light Toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
              aria-label="Toggle theme"
            >
              {darkMode ? <Sun className="h-4 w-4 text-amber-400" /> : <Moon className="h-4 w-4 text-slate-600" />}
            </button>
          </div>

        </div>

        {/* Tab Navigation */}
        <nav className="flex space-x-1 sm:space-x-2 overflow-x-auto py-2 scrollbar-none border-t border-slate-100 dark:border-slate-900">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition ${
                  isActive
                    ? 'bg-brand-500/10 text-brand-600 dark:text-brand-400 border border-brand-500/30 font-semibold'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800/60'
                }`}
              >
                <Icon className={`h-4 w-4 ${isActive ? 'text-brand-500' : 'text-slate-400 dark:text-slate-500'}`} />
                <span>{item.label}</span>
                {item.badge !== undefined && (
                  <span className="ml-1 px-1.5 py-0.2 text-[10px] rounded-full bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
