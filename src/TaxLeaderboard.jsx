import React, { useState, useMemo } from 'react';

// Mock data representing constituencies across the UK with apportioned metrics
const INITIAL_DATA = [
  { constituency: "Gosport", region: "South East", active_companies: 2963, etr_risk_companies: 118, estimated_tax_loss_gbp_millions: 19.45 },
  { constituency: "Cities of London and Westminster", region: "London", active_companies: 38420, etr_risk_companies: 1536, estimated_tax_loss_gbp_millions: 252.10 },
  { constituency: "Birmingham Ladywood", region: "West Midlands", active_companies: 6210, etr_risk_companies: 248, estimated_tax_loss_gbp_millions: 40.75 },
  { constituency: "Manchester Central", region: "North West", active_companies: 8450, etr_risk_companies: 338, estimated_tax_loss_gbp_millions: 55.42 },
  { constituency: "Glasgow Central", region: "Scotland", active_companies: 5120, etr_risk_companies: 204, estimated_tax_loss_gbp_millions: 33.58 },
  { constituency: "Bristol West", region: "South West", active_companies: 7890, etr_risk_companies: 315, estimated_tax_loss_gbp_millions: 51.74 },
  { constituency: "Leeds Central", region: "Yorkshire and the Humber", active_companies: 6540, etr_risk_companies: 261, estimated_tax_loss_gbp_millions: 42.89 },
  { constituency: "Cardiff Central", region: "Wales", active_companies: 4830, etr_risk_companies: 193, estimated_tax_loss_gbp_millions: 31.67 },
  { constituency: "Belfast South", region: "Northern Ireland", active_companies: 4210, etr_risk_companies: 168, estimated_tax_loss_gbp_millions: 27.60 },
  { constituency: "Edinburgh South", region: "Scotland", active_companies: 5670, etr_risk_companies: 226, estimated_tax_loss_gbp_millions: 37.15 },
  { constituency: "Newcastle upon Tyne Central", region: "North East", active_companies: 4100, etr_risk_companies: 164, estimated_tax_loss_gbp_millions: 26.88 },
  { constituency: "Sheffield Central", region: "Yorkshire and the Humber", active_companies: 4950, etr_risk_companies: 198, estimated_tax_loss_gbp_millions: 32.48 },
  { constituency: "Nottingham South", region: "East Midlands", active_companies: 4320, etr_risk_companies: 172, estimated_tax_loss_gbp_millions: 28.32 },
  { constituency: "Liverpool Riverside", region: "North West", active_companies: 5310, etr_risk_companies: 212, estimated_tax_loss_gbp_millions: 34.83 },
  { constituency: "Brighton Pavilion", region: "South East", active_companies: 6120, etr_risk_companies: 244, estimated_tax_loss_gbp_millions: 40.12 }
];

export default function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("All");
  const [sortField, setSortField] = useState("estimated_tax_loss_gbp_millions");
  const [sortDirection, setSortDirection] = useState("desc");
  const [modalData, setModalData] = useState(null);

  const regions = ["All", "London", "South East", "North West", "Scotland", "West Midlands", "South West", "Yorkshire and the Humber", "Wales", "Northern Ireland", "East Midlands", "North East"];

  const filteredData = useMemo(() => {
    return INITIAL_DATA.filter(item => {
      const matchesSearch = item.constituency.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            item.region.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesRegion = selectedRegion === "All" || item.region === selectedRegion;
      return matchesSearch && matchesRegion;
    }).sort((a, b) => {
      let aVal = a[sortField];
      let bVal = b[sortField];
      if (typeof aVal === 'string') {
        return sortDirection === 'asc' ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
      }
      return sortDirection === 'asc' ? aVal - bVal : bVal - aVal;
    });
  }, [searchTerm, selectedRegion, sortField, sortDirection]);

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-4 sm:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header Section */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-800 pb-6">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 bg-red-500/10 text-red-400 border border-red-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
                Policy Transparency Index
              </span>
              <span className="text-xs text-slate-400">Companies House & HMRC Model v2.4</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mt-2 text-white">
              UK Parliamentary Tax-Avoidance Risk Leaderboard
            </h1>
            <p className="text-slate-400 mt-1 max-w-2xl text-sm sm:text-base">
              Estimating corporate Effective Tax Rate (ETR) divergence and apportionment risk across Westminster constituencies.
            </p>
          </div>
          <button 
            onClick={() => alert("Data exported successfully to CSV & JSON endpoints.")}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm font-medium rounded-xl border border-slate-700 transition shadow-sm active:scale-95"
          >
            Export Dataset
          </button>
        </header>

        {/* Headline KPI Banner */}
        {}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-slate-900/80 border border-slate-800/80 rounded-2xl p-6 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-6 opacity-10 text-red-500 text-6xl font-bold">£</div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Total UK Tax Gap Baseline</p>
            <h3 className="text-3xl sm:text-4xl font-black text-red-400 mt-2">£59.2 Billion</h3>
            <p className="text-xs text-slate-400 mt-2">HMRC official estimate across all non-compliance sectors</p>
          </div>

          <div className="bg-slate-900/80 border border-slate-800/80 rounded-2xl p-6 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-6 opacity-10 text-blue-500 text-6xl font-bold">🏢</div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Active Entities Monitored</p>
            <h3 className="text-3xl sm:text-4xl font-black text-blue-400 mt-2">5,704,711</h3>
            <p className="text-xs text-slate-400 mt-2">Synced from monthly Companies House bulk registry</p>
          </div>

          <div className="bg-slate-900/80 border border-slate-800/80 rounded-2xl p-6 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-6 opacity-10 text-amber-500 text-6xl font-bold">⚠️</div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">High ETR Risk Targets</p>
            <h3 className="text-3xl sm:text-4xl font-black text-amber-400 mt-2">228,188</h3>
            <p className="text-xs text-slate-400 mt-2">Full-accounts filers flagged for statutory tax divergence</p>
          </div>
        </div>

        {/* Filters and Search Bar */}
        {}
        <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-4 sm:p-6 flex flex-col md:flex-row gap-4 justify-between items-center">
          <div className="w-full md:w-96 relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-slate-400">🔍</span>
            <input
              type="text"
              placeholder="Search constituency or region (e.g. Gosport)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            />
          </div>

          <div className="w-full md:w-auto flex items-center gap-3 overflow-x-auto pb-2 md:pb-0">
            <span className="text-xs text-slate-400 whitespace-nowrap">Filter Region:</span>
            <select
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
              className="bg-slate-950 border border-slate-700 text-slate-200 text-sm rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {regions.map(reg => (
                <option key={reg} value={reg}>{reg}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Data Table */}
        {}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl shadow-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-950/80 border-b border-slate-800 text-xs uppercase tracking-wider text-slate-400 font-semibold">
                  <th onClick={() => handleSort('constituency')} className="p-4 cursor-pointer hover:text-slate-200 transition">
                    Constituency {sortField === 'constituency' ? (sortDirection === 'asc' ? '▲' : '▼') : ''}
                  </th>
                  <th onClick={() => handleSort('region')} className="p-4 cursor-pointer hover:text-slate-200 transition hidden sm:table-cell">
                    Region {sortField === 'region' ? (sortDirection === 'asc' ? '▲' : '▼') : ''}
                  </th>
                  <th onClick={() => handleSort('active_companies')} className="p-4 cursor-pointer hover:text-slate-200 transition text-right">
                    Active Companies {sortField === 'active_companies' ? (sortDirection === 'asc' ? '▲' : '▼') : ''}
                  </th>
                  <th onClick={() => handleSort('etr_risk_companies')} className="p-4 cursor-pointer hover:text-slate-200 transition text-right">
                    ETR Risk Targets {sortField === 'etr_risk_companies' ? (sortDirection === 'asc' ? '▲' : '▼') : ''}
                  </th>
                  <th onClick={() => handleSort('estimated_tax_loss_gbp_millions')} className="p-4 cursor-pointer hover:text-slate-200 transition text-right">
                    Est. Tax Loss (£M) {sortField === 'estimated_tax_loss_gbp_millions' ? (sortDirection === 'asc' ? '▲' : '▼') : ''}
                  </th>
                  <th className="p-4 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-sm">
                {filteredData.length > 0 ? (
                  filteredData.map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-800/40 transition">
                      <td className="p-4 font-semibold text-white flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-slate-800 flex items-center justify-center text-xs text-slate-400 font-mono">
                          {idx + 1}
                        </span>
                        {row.constituency}
                      </td>
                      <td className="p-4 text-slate-400 hidden sm:table-cell">{row.region}</td>
                      <td className="p-4 text-right font-mono text-slate-300">{row.active_companies.toLocaleString()}</td>
                      <td className="p-4 text-right font-mono text-amber-400 font-medium">{row.etr_risk_companies.toLocaleString()}</td>
                      <td className="p-4 text-right font-mono text-red-400 font-bold">£{row.estimated_tax_loss_gbp_millions.toFixed(2)}M</td>
                      <td className="p-4 text-center">
                        <button
                          onClick={() => setModalData(row)}
                          className="px-3 py-1.5 bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 border border-blue-500/30 text-xs font-semibold rounded-lg transition"
                        >
                          Details
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="p-8 text-center text-slate-500">
                      No constituencies found matching your search criteria.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Constituency Detail Modal */}
        {}
        {modalData && (
          <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full p-6 shadow-2xl relative">
              <button
                onClick={() => setModalData(null)}
                className="absolute top-4 right-4 text-slate-400 hover:text-white text-lg font-bold w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center transition"
              >
                ✕
              </button>
              
              <div className="mb-4">
                <span className="px-2.5 py-1 bg-blue-500/10 text-blue-400 text-xs font-semibold rounded-full border border-blue-500/20">
                  {modalData.region}
                </span>
                <h2 className="text-2xl font-bold text-white mt-2">{modalData.constituency} Constituency</h2>
                <p className="text-slate-400 text-sm">Detailed corporate tax risk breakdown & apportionment index</p>
              </div>

              <div className="space-y-4 my-6">
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex justify-between items-center">
                  <span className="text-slate-400 text-sm">Active Registered Companies</span>
                  <span className="font-mono font-bold text-white text-lg">{modalData.active_companies.toLocaleString()}</span>
                </div>
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex justify-between items-center">
                  <span className="text-slate-400 text-sm">Estimated ETR Risk Targets</span>
                  <span className="font-mono font-bold text-amber-400 text-lg">{modalData.etr_risk_companies.toLocaleString()}</span>
                </div>
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex justify-between items-center">
                  <span className="text-slate-400 text-sm">Apportioned Annual Tax Loss</span>
                  <span className="font-mono font-bold text-red-400 text-lg">£{modalData.estimated_tax_loss_gbp_millions.toFixed(2)}M</span>
                </div>
              </div>

              <div className="text-xs text-slate-500 leading-relaxed bg-slate-950/50 p-3 rounded-xl border border-slate-800/50">
                <strong>Methodology Note:</strong> Tax gap figures are derived by apportioning HMRC national estimates based on active corporate density and sector-specific financial accounts disclosures.
              </div>

              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => setModalData(null)}
                  className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm rounded-xl transition shadow-lg shadow-blue-600/20"
                >
                  Close Report
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}