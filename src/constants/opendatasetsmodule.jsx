import React, { useState, useMemo } from 'react';
import { FileSpreadsheet, Download, Search, Database, ExternalLink, CheckCircle2, ShieldCheck, Filter, FileText } from 'lucide-react';
import { SPENDING_BREAKDOWN_2025_26, BENEFIT_RATES_2026_2027, CONTRIBUTORY_DEBUNK_DATA } from '../constants/spendingData';
import { MYTH_VAULT } from '../constants/feedAndVaultData';
import { CHARITIES_AZ } from '../constants/supportAndCharitiesData';
import { MACROECONOMIC_METRICS } from '../constants/economicImpact';

export default function OpenDatasetsModule({ onSelectDeepDive }) {
  const [datasetSearch, setDatasetSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');

  // Aggregate all available open datasets into a unified index
  const availableDatasets = useMemo(() => [
    {
      id: 'spending_2025_26',
      title: 'HM Treasury & OBR Social Protection Expenditure (2025/26)',
      category: 'Public Expenditure',
      description: 'Official budget allocations across state pensions, universal credit, disability benefits, and housing support.',
      recordCount: Object.keys(SPENDING_BREAKDOWN_2025_26 || {}).length,
      data: SPENDING_BREAKDOWN_2025_26,
      source: 'HM Treasury PESA / OBR Economic and Fiscal Outlook'
    },
    {
      id: 'benefit_rates_2026_27',
      title: 'DWP Schedule of Statutory Benefit & Pension Rates (2026/27)',
      category: 'Statutory Rates',
      description: 'Complete statutory payment schedules for PIP, Universal Credit, State Pension, Carer’s Allowance, and ESA.',
      recordCount: Object.keys(BENEFIT_RATES_2026_27 || {}).length,
      data: BENEFIT_RATES_2026_27,
      source: 'Department for Work and Pensions (DWP)'
    },
    {
      id: 'contributory_myths',
      title: 'Contributory Principles & National Insurance Fact Audit',
      category: 'Fiscal Policy',
      description: 'Debunking misconceptions regarding National Insurance personal savings pots versus pay-as-you-go welfare architecture.',
      recordCount: Object.keys(CONTRIBUTORY_DEBUNK_DATA || {}).length,
      data: CONTRIBUTORY_DEBUNK_DATA,
      source: 'Institute for Fiscal Studies (IFS) / HMT'
    },
    {
      id: 'myth_vault',
      title: 'Disability & Welfare Misconception Vault',
      category: 'Myth Correction',
      description: 'Structured repository of recurring media tropes, fraud rate misconceptions, and verified DWP/ONS statistical corrections.',
      recordCount: (MYTH_VAULT || []).length,
      data: MYTH_VAULT,
      source: 'UK Welfare Truth Index Research Team'
    },
    {
      id: 'charities_directory',
      title: 'UK Disability Charity & Advocacy Directory A-Z',
      category: 'Support Network',
      description: 'Comprehensive index of registered disability charities, legal support groups, and pro-bono welfare advocates.',
      recordCount: (CHARITIES_AZ || []).length,
      data: CHARITIES_AZ,
      source: 'UK Charity Commission Index'
    },
    {
      id: 'macro_economics',
      title: 'Macroeconomic Impact & Regional Multiplier Datasets',
      category: 'Macroeconomics',
      description: 'Empirical research data evaluating high-street velocity, spending multipliers, and NHS acute care expenditure savings.',
      recordCount: Object.keys(MACROECONOMIC_METRICS || {}).length,
      data: MACROECONOMIC_METRICS,
      source: 'OBR / IFS / DWP Economic Research'
    }
  ], []);

  const categories = ['ALL', 'Public Expenditure', 'Statutory Rates', 'Fiscal Policy', 'Myth Correction', 'Support Network', 'Macroeconomics'];

  const filteredDatasets = useMemo(() => {
    return availableDatasets.filter(ds => {
      const matchesSearch = ds.title.toLowerCase().includes(datasetSearch.toLowerCase()) ||
        ds.description.toLowerCase().includes(datasetSearch.toLowerCase()) ||
        ds.source.toLowerCase().includes(datasetSearch.toLowerCase());
      const matchesCat = selectedCategory === 'ALL' || ds.category === selectedCategory;
      return matchesSearch && matchesCat;
    });
  }, [availableDatasets, datasetSearch, selectedCategory]);

  const handleDownloadJSON = (dataset) => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(dataset.data, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `${dataset.id}_opendataset_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleDownloadCSV = (dataset) => {
    let rows = [];
    if (Array.isArray(dataset.data)) {
      rows = dataset.data;
    } else if (typeof dataset.data === 'object' && dataset.data !== null) {
      rows = Object.entries(dataset.data).map(([key, val]) => ({
        Metric_Or_Category: key,
        Details: typeof val === 'object' ? JSON.stringify(val) : val
      }));
    }

    if (rows.length === 0) return;

    const keys = Object.keys(rows[0]);
    const csvRows = [
      keys.join(','),
      ...rows.map(row => keys.map(k => `"${String(row[k] || '').replace(/"/g, '""')}"`).join(','))
    ];

    const blob = new Blob([csvRows.join('\n')], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", url);
    downloadAnchor.setAttribute("download", `${dataset.id}_export_${Date.now()}.csv`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    document.body.removeChild(downloadAnchor);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <div className="p-6 rounded-2xl border border-purple-800/40 bg-slate-900/90 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-teal-400 text-xs font-bold uppercase tracking-wider">
              <Database className="w-4 h-4" />
              <span>Open Science &amp; Open Data Portal</span>
            </div>
            <h2 className="text-2xl font-black text-slate-100">Downloadable Research Datasets</h2>
            <p className="text-xs text-slate-300">
              Access, inspect, and export clean, machine-readable JSON and CSV datasets powering the UK Welfare Truth Index. Fully compliant with open data standards for campaigners and researchers.
            </p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <span className="text-xs px-3 py-1.5 rounded-lg bg-teal-500/20 text-teal-300 border border-teal-500/30 font-bold">
              {availableDatasets.length} Verified Datasets Available
            </span>
          </div>
        </div>

        {/* Search and Category Filter Bar */}
        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={datasetSearch}
              onChange={(e) => setDatasetSearch(e.target.value)}
              placeholder="Search datasets by keyword, title, or source..."
              className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-100 focus:outline-none focus:border-purple-500"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-slate-400 shrink-0" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="bg-slate-950 border border-slate-800 text-xs rounded-xl px-3 py-2.5 text-slate-200 font-medium focus:outline-none focus:border-purple-500"
            >
              {categories.map((cat, idx) => (
                <option key={idx} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Datasets Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {filteredDatasets.length > 0 ? (
          filteredDatasets.map((dataset) => (
            <div key={dataset.id} className="p-6 rounded-2xl border border-slate-800 bg-slate-900 flex flex-col justify-between space-y-4 hover:border-purple-500/40 transition shadow-lg">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30 uppercase tracking-wider">
                    {dataset.category}
                  </span>
                  <span className="text-xs text-slate-400 font-mono">
                    {dataset.recordCount} Records
                  </span>
                </div>

                <h3 className="text-base font-bold text-slate-100">{dataset.title}</h3>
                <p className="text-xs text-slate-300 leading-relaxed">{dataset.description}</p>
                <p className="text-[11px] text-teal-400 font-medium">
                  <strong>Source Authority:</strong> {dataset.source}
                </p>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-slate-800/80 gap-2">
                <button
                  onClick={() => {
                    if (typeof onSelectDeepDive === 'function') {
                      onSelectDeepDive({
                        title: dataset.title,
                        summary: dataset.description,
                        items: Object.entries(dataset.data || {}).map(([k, v]) => ({
                          date: '2026 Audit',
                          source: dataset.source,
                          quote: String(k),
                          factCheck: typeof v === 'object' ? JSON.stringify(v) : String(v),
                          category: dataset.category
                        }))
                      });
                    }
                  }}
                  className="px-3 py-2 bg-slate-950 hover:bg-slate-800 text-slate-200 rounded-xl text-xs font-semibold flex items-center gap-1.5 border border-slate-800 transition"
                >
                  <FileText className="w-3.5 h-3.5 text-purple-400" />
                  <span>Inspect Data</span>
                </button>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleDownloadCSV(dataset)}
                    className="px-3 py-2 bg-slate-950 hover:bg-slate-800 text-teal-300 rounded-xl text-xs font-semibold flex items-center gap-1.5 border border-slate-800 transition"
                  >
                    <FileSpreadsheet className="w-3.5 h-3.5" />
                    <span>CSV</span>
                  </button>
                  <button
                    onClick={() => handleDownloadJSON(dataset)}
                    className="px-3 py-2 bg-teal-500 hover:bg-teal-400 text-slate-950 rounded-xl text-xs font-bold flex items-center gap-1.5 transition shadow-md"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>JSON</span>
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full p-8 text-center text-slate-400/80 bg-slate-900/40 rounded-2xl border border-slate-800 text-sm">
            No datasets found matching your search criteria.
          </div>
        )}
      </div>
    </div>
  );
}
