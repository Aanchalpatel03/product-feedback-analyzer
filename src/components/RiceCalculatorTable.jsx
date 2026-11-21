import React, { useState } from 'react';
import { 
  Layers, 
  HelpCircle, 
  ArrowUpDown, 
  Sliders, 
  Sparkles, 
  Check, 
  RefreshCw 
} from 'lucide-react';
import { calculateRice } from '../utils/prioritization';

export default function RiceCalculatorTable({ backlogList, onUpdateFeature }) {
  const [sortField, setSortField] = useState('riceScore');
  const [sortAsc, setSortAsc] = useState(false);

  // Update feature value and re-calculate RICE score, propagating to global state
  const handleSliderChange = (id, field, value) => {
    const updated = backlogList.map(item => {
      if (item.id === id) {
        const val = parseFloat(value);
        const feat = { ...item, [field]: val };
        feat.riceScore = calculateRice(
          feat.reach,
          feat.impact,
          feat.confidence,
          feat.effort
        );
        return feat;
      }
      return item;
    });

    if (onUpdateFeature) {
      onUpdateFeature(updated);
    }
  };

  const sortedFeatures = [...backlogList].sort((a, b) => {
    if (sortAsc) {
      return a[sortField] > b[sortField] ? 1 : -1;
    }
    return a[sortField] < b[sortField] ? 1 : -1;
  });

  const handleSort = (field) => {
    if (sortField === field) {
      setSortAsc(!sortAsc);
    } else {
      setSortField(field);
      setSortAsc(false);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header and Explanation */}
      <div className="glass-panel p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="p-1.5 rounded-lg bg-indigo-500/10 text-indigo-500">
                <Layers className="h-4 w-4" />
              </span>
              <h2 className="text-lg font-extrabold text-slate-900 dark:text-white">
                RICE Prioritization Calculator & Dynamic Ranking
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-3xl">
              Formula: <code className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 font-mono text-brand-500 font-bold">(Reach × Impact × Confidence %) / Effort</code>. Drag the interactive sliders below to dynamically simulate sprint trade-offs in real time. Changes synchronize across the 2x2 Matrix, Executive Overview, and PRD.
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-xs text-slate-400">
              {backlogList.length} Features Evaluated
            </span>
          </div>
        </div>
      </div>

      {/* RICE Table */}
      <div className="glass-panel overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-slate-100/80 dark:bg-slate-900/80 text-slate-600 dark:text-slate-400 uppercase text-[11px] font-semibold border-b border-slate-200 dark:border-slate-800">
              <tr>
                <th className="py-3 px-4">Rank / Feature</th>
                <th 
                  className="py-3 px-4 cursor-pointer hover:text-slate-900 dark:hover:text-white"
                  onClick={() => handleSort('reach')}
                >
                  <div className="flex items-center space-x-1">
                    <span>Reach (0-100%)</span>
                    <ArrowUpDown className="h-3 w-3" />
                  </div>
                </th>
                <th 
                  className="py-3 px-4 cursor-pointer hover:text-slate-900 dark:hover:text-white"
                  onClick={() => handleSort('impact')}
                >
                  <div className="flex items-center space-x-1">
                    <span>Impact (0.5-3x)</span>
                    <ArrowUpDown className="h-3 w-3" />
                  </div>
                </th>
                <th 
                  className="py-3 px-4 cursor-pointer hover:text-slate-900 dark:hover:text-white"
                  onClick={() => handleSort('confidence')}
                >
                  <div className="flex items-center space-x-1">
                    <span>Confidence %</span>
                    <ArrowUpDown className="h-3 w-3" />
                  </div>
                </th>
                <th 
                  className="py-3 px-4 cursor-pointer hover:text-slate-900 dark:hover:text-white"
                  onClick={() => handleSort('effort')}
                >
                  <div className="flex items-center space-x-1">
                    <span>Effort (Months)</span>
                    <ArrowUpDown className="h-3 w-3" />
                  </div>
                </th>
                <th 
                  className="py-3 px-4 cursor-pointer text-brand-500 font-bold"
                  onClick={() => handleSort('riceScore')}
                >
                  <div className="flex items-center space-x-1">
                    <span>RICE Score</span>
                    <ArrowUpDown className="h-3 w-3" />
                  </div>
                </th>
                <th className="py-3 px-4 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 font-medium">
              {sortedFeatures.map((feat, index) => {
                const isTopRanked = index === 0;

                return (
                  <tr 
                    key={feat.id} 
                    className={`hover:bg-slate-50 dark:hover:bg-slate-800/50 transition ${
                      isTopRanked ? 'bg-brand-500/5 dark:bg-brand-950/20' : ''
                    }`}
                  >
                    {/* Rank & Title */}
                    <td className="py-3.5 px-4 max-w-xs">
                      <div className="flex items-start space-x-2.5">
                        <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-extrabold flex-shrink-0 mt-0.5 ${
                          isTopRanked 
                            ? 'bg-brand-500 text-white' 
                            : 'bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                        }`}>
                          {index + 1}
                        </span>
                        <div>
                          <p className="font-bold text-slate-900 dark:text-white text-xs sm:text-sm">
                            {feat.title}
                          </p>
                          <span className="text-[11px] text-slate-500 dark:text-slate-400">
                            {feat.id} • {feat.productArea}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Reach Slider */}
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        <input
                          type="range"
                          min="10"
                          max="100"
                          step="5"
                          value={feat.reach}
                          onChange={(e) => handleSliderChange(feat.id, 'reach', e.target.value)}
                          className="w-20 sm:w-24 accent-brand-500 cursor-pointer"
                        />
                        <span className="font-mono text-xs w-8">{feat.reach}%</span>
                      </div>
                    </td>

                    {/* Impact Selector */}
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <select
                        value={feat.impact}
                        onChange={(e) => handleSliderChange(feat.id, 'impact', e.target.value)}
                        className="bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded px-2 py-1 text-xs cursor-pointer focus:ring-1 focus:ring-brand-500"
                      >
                        <option value="0.5">0.5 (Minimal)</option>
                        <option value="1.0">1.0 (Medium)</option>
                        <option value="2.0">2.0 (High)</option>
                        <option value="3.0">3.0 (Massive)</option>
                      </select>
                    </td>

                    {/* Confidence Slider */}
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        <input
                          type="range"
                          min="50"
                          max="100"
                          step="5"
                          value={feat.confidence}
                          onChange={(e) => handleSliderChange(feat.id, 'confidence', e.target.value)}
                          className="w-16 sm:w-20 accent-indigo-500 cursor-pointer"
                        />
                        <span className="font-mono text-xs w-8">{feat.confidence}%</span>
                      </div>
                    </td>

                    {/* Effort Slider */}
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        <input
                          type="range"
                          min="0.5"
                          max="5.0"
                          step="0.5"
                          value={feat.effort}
                          onChange={(e) => handleSliderChange(feat.id, 'effort', e.target.value)}
                          className="w-16 sm:w-20 accent-rose-500 cursor-pointer"
                        />
                        <span className="font-mono text-xs w-10">{feat.effort} mo</span>
                      </div>
                    </td>

                    {/* RICE Score Display */}
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <span className={`text-base font-extrabold px-2.5 py-1 rounded-lg ${
                        isTopRanked 
                          ? 'bg-brand-500 text-white shadow-sm' 
                          : 'bg-brand-500/10 text-brand-600 dark:text-brand-400 border border-brand-500/20'
                      }`}>
                        {feat.riceScore}
                      </span>
                    </td>

                    {/* Status Badge */}
                    <td className="py-3.5 px-4 text-right whitespace-nowrap">
                      <span className={`px-2 py-0.5 rounded text-[11px] font-semibold ${
                        feat.status === 'Shipped' ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20' :
                        feat.status === 'In Progress' ? 'bg-brand-500/10 text-brand-500 border border-brand-500/20' :
                        feat.status === 'Sprint Ready' ? 'bg-purple-500/10 text-purple-500 border border-purple-500/20' :
                        'bg-slate-200 dark:bg-slate-800 text-slate-500'
                      }`}>
                        {feat.status}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
