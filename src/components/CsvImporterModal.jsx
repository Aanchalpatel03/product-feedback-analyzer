import React, { useState } from 'react';
import { X, UploadCloud, FileText, CheckCircle2, Download, AlertCircle, Sparkles } from 'lucide-react';
import { analyzeSentiment, detectIntent, detectTopic, detectChurnRisk } from '../utils/nlp';
import confetti from 'canvas-confetti';

export default function CsvImporterModal({ isOpen, onClose, onImportBatch }) {
  const [csvText, setCsvText] = useState('');
  const [parsing, setParsing] = useState(false);
  const [parseStats, setParseStats] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  if (!isOpen) return null;

  const sampleCsvContent = `Customer Name,Company,Tier,MRR,Channel,Feedback Text
Sarah Jenkins,Apex Capital,Enterprise,16000,Zendesk,Our security team requires SAML 2.0 and SCIM user provisioning before our annual contract renewal next month.
Liam O'Connor,HyperScale,Mid-Market,4500,Discord,When exporting more than 50k rows to CSV the browser tab runs out of memory and crashes. Need background export!
Elena Rostova,CloudScale,Enterprise,21000,Gong Transcript,We need custom role permissions so our marketing contractors cannot see financial forecasts.
Marco Rossi,DesignCraft,SMB,1200,G2 Crowd,The app is very fast and intuitive! Would love a native dark mode for late night sessions.
Tariq Mansoor,FinTech Direct,Enterprise,32000,Zendesk,Payment webhooks fail silently without retry backoff during network blips.`;

  const handleDownloadSample = () => {
    const blob = new Blob([sampleCsvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `sample_customer_feedback.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleFileDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setCsvText(event.target.result);
      };
      reader.readAsText(file);
    }
  };

  const handleProcessImport = () => {
    if (!csvText.trim()) {
      setErrorMsg("Please paste CSV data or upload a file first.");
      return;
    }

    setParsing(true);
    setErrorMsg(null);

    try {
      const lines = csvText.split(/\r?\n/).filter(line => line.trim().length > 0);
      if (lines.length < 2) {
        throw new Error("CSV must contain at least a header row and 1 data row.");
      }

      // Simple CSV parser supporting quotes
      const parseCsvLine = (line) => {
        const result = [];
        let cur = '';
        let inQuotes = false;
        for (let i = 0; i < line.length; i++) {
          const char = line[i];
          if (char === '"' && inQuotes && line[i + 1] === '"') {
            cur += '"';
            i++;
          } else if (char === '"') {
            inQuotes = !inQuotes;
          } else if (char === ',' && !inQuotes) {
            result.push(cur.trim());
            cur = '';
          } else {
            cur += char;
          }
        }
        result.push(cur.trim());
        return result;
      };

      const headers = parseCsvLine(lines[0]).map(h => h.toLowerCase());
      
      // Auto column index detect
      const nameIdx = headers.findIndex(h => /name|customer|user/i.test(h));
      const companyIdx = headers.findIndex(h => /company|org|account/i.test(h));
      const tierIdx = headers.findIndex(h => /tier|plan|segment/i.test(h));
      const mrrIdx = headers.findIndex(h => /mrr|revenue|arr|value/i.test(h));
      const channelIdx = headers.findIndex(h => /channel|source|platform/i.test(h));
      const textIdx = headers.findIndex(h => /feedback|text|quote|comment|message|verbatim|body/i.test(h));

      if (textIdx === -1) {
        throw new Error("Could not detect a 'Feedback Text' or 'Comment' column. Check headers.");
      }

      const importedItems = [];

      for (let i = 1; i < lines.length; i++) {
        const cols = parseCsvLine(lines[i]);
        if (!cols[textIdx]) continue;

        const text = cols[textIdx];
        const tier = (tierIdx !== -1 && cols[tierIdx]) ? cols[tierIdx] : 'Mid-Market';
        const sentiment = analyzeSentiment(text);
        const intent = detectIntent(text);
        const topic = detectTopic(text);
        const churnRisk = detectChurnRisk(text, tier, sentiment.score);

        importedItems.push({
          id: `IMP-${Math.floor(1000 + Math.random() * 9000)}`,
          customer: {
            name: (nameIdx !== -1 && cols[nameIdx]) ? cols[nameIdx] : 'Customer',
            company: (companyIdx !== -1 && cols[companyIdx]) ? cols[companyIdx] : 'Acme Org',
            tier: tier,
            mrr: (mrrIdx !== -1 && parseInt(cols[mrrIdx], 10)) || 5000,
            avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150"
          },
          channel: (channelIdx !== -1 && cols[channelIdx]) ? cols[channelIdx] : 'CSV Upload',
          date: new Date().toISOString(),
          text: text,
          sentiment,
          intent,
          topic,
          mappedFeature: topic,
          urgency: churnRisk === 'Critical' ? 'Critical' : 'Medium',
          churnRisk,
          verified: true
        });
      }

      setParseStats({
        count: importedItems.length,
        items: importedItems
      });

      // Confetti celebration
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 }
      });

      onImportBatch(importedItems);
      setParsing(false);
      setTimeout(() => {
        onClose();
      }, 1200);

    } catch (err) {
      setParsing(false);
      setErrorMsg(err.message || "Failed to parse CSV file.");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="glass-panel-elevated max-w-xl w-full p-6 relative max-h-[90vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Header */}
        <div className="flex items-center space-x-2.5 mb-4">
          <div className="p-2 rounded-xl bg-brand-500/10 text-brand-500">
            <UploadCloud className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
              Import Customer Feedback Dataset (CSV / Text)
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Auto-maps columns and executes client-side AI Sentiment & Topic analysis.
            </p>
          </div>
        </div>

        {/* Drop Zone */}
        <div 
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleFileDrop}
          className="border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-xl p-6 text-center hover:border-brand-500 transition cursor-pointer bg-slate-50/50 dark:bg-slate-900/50"
        >
          <input
            type="file"
            accept=".csv,text/csv"
            onChange={handleFileDrop}
            className="hidden"
            id="csv-file-input"
          />
          <label htmlFor="csv-file-input" className="cursor-pointer flex flex-col items-center">
            <UploadCloud className="h-8 w-8 text-slate-400 mb-2" />
            <span className="text-xs font-bold text-slate-700 dark:text-slate-200">
              Click to browse or drag & drop CSV file
            </span>
            <span className="text-[11px] text-slate-400 mt-0.5">
              Supports Zendesk, G2, Intercom, or custom feedback exports
            </span>
          </label>
        </div>

        {/* Or Paste Raw Text */}
        <div className="mt-4">
          <div className="flex items-center justify-between mb-1 text-xs">
            <label className="font-semibold text-slate-700 dark:text-slate-300">
              Or Paste CSV Data Directly:
            </label>
            <button
              type="button"
              onClick={handleDownloadSample}
              className="text-[11px] font-bold text-brand-500 hover:underline flex items-center space-x-1"
            >
              <Download className="h-3 w-3" />
              <span>Download Sample Template</span>
            </button>
          </div>
          <textarea
            rows={5}
            value={csvText}
            onChange={(e) => setCsvText(e.target.value)}
            placeholder="Customer Name,Company,Tier,MRR,Channel,Feedback Text..."
            className="w-full bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg p-2.5 font-mono text-xs focus:ring-1 focus:ring-brand-500 focus:outline-none"
          />
        </div>

        {/* Error Alert */}
        {errorMsg && (
          <div className="mt-3 p-2.5 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-500 text-xs flex items-center space-x-2">
            <AlertCircle className="h-4 w-4 flex-shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Success Alert */}
        {parseStats && (
          <div className="mt-3 p-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-xs flex items-center space-x-2 animate-in fade-in">
            <CheckCircle2 className="h-4 w-4 flex-shrink-0" />
            <span>Successfully parsed & classified <b>{parseStats.count}</b> customer feedback items!</span>
          </div>
        )}

        {/* Footer Actions */}
        <div className="mt-5 pt-3 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <button
            type="button"
            onClick={() => setCsvText(sampleCsvContent)}
            className="text-xs font-semibold text-slate-500 hover:text-brand-500"
          >
            Load Sample Data
          </button>

          <div className="flex items-center space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 text-xs font-medium hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleProcessImport}
              disabled={parsing || !csvText.trim()}
              className="px-4 py-1.5 rounded-lg bg-brand-600 hover:bg-brand-500 disabled:opacity-50 text-white font-bold text-xs shadow-sm transition flex items-center space-x-1.5"
            >
              <Sparkles className="h-3.5 w-3.5" />
              <span>{parsing ? 'Processing AI...' : 'Parse & Ingest CSV'}</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
