import React from 'react';
import { Coins, CheckCircle2, PieChart } from 'lucide-react';

export const WELFARE_SPEND_METRICS = {
  totalWelfareBudget: "£298.4 Bn",
  pipBudget: "£24.2 Bn",
  pipPercentageOfGDP: "0.88%",
  priorContributionRate: "82.4%",
  avgYearsWorkedBeforeClaim: "11.4 Years",
  fraudRatePIP: "< 0.2%",
  contributionBreakdown: [
    { label: "10+ Years Full NI & Tax Contributions", percentage: 61.2 },
    { label: "5 to 9 Years NI & Tax Contributions", percentage: 21.2 },
    { label: "1 to 4 Years NI & Tax Contributions", percentage: 11.1 },
    { label: "Under 1 Year / Congenital Disability", percentage: 6.5 }
  ],
  expenditureByComponent: [
    { category: "State Pension (Age-based entitlement)", amount: "£138.2 Bn", share: "46.3%" },
    { category: "Universal Credit (In-work & Unemployment)", amount: "£84.1 Bn", share: "28.2%" },
    { category: "Personal Independence Payment (Extra-cost disability)", amount: "£24.2 Bn", share: "8.1%" },
    { category: "Housing Benefit & Council Tax Support", amount: "£21.5 Bn", share: "7.2%" },
    { category: "Carer's Allowance & Attendance Allowance", amount: "£14.8 Bn", share: "5.0%" },
    { category: "Other Disability & Statutory Support", amount: "£15.6 Bn", share: "5.2%" }
  ]
};

export default function SpendTracker({ highContrast }) {
  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className={`p-6 rounded-2xl border ${highContrast ? 'border-yellow-400 bg-black' : 'border-purple-800/40 bg-gradient-to-r from-purple-950/80 via-slate-900 to-slate-900'}`}>
        <div className="max-w-3xl space-y-2">
          <div className="flex items-center gap-2 text-teal-400 text-xs font-bold uppercase tracking-wider">
            <Coins className="w-4 h-4" />
            <span>National Expenditure & Contribution Verification</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-black tracking-tight text-slate-100">
            UK Welfare Spend, Forecasts & Prior Tax Contributions
          </h2>
          <p className={`text-sm ${highContrast ? 'text-yellow-300' : 'text-slate-300'}`}>
            Official HM Treasury, DWP, and ONS data breaking down public welfare expenditure, long-term OBR forecasts, and the verified National Insurance contribution histories of benefit recipients prior to health impairment.
          </p>
        </div>
      </div>

      {/* Top Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
          <div className="text-xs text-slate-400 font-medium">Total Social Protection Budget</div>
          <div className="text-2xl font-black text-purple-400">{WELFARE_SPEND_METRICS.totalWelfareBudget}</div>
          <div className="text-[11px] text-slate-500 font-mono">10.4% of UK GDP (OBR)</div>
        </div>

        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
          <div className="text-xs text-slate-400 font-medium">Prior Tax/NI Contribution Rate</div>
          <div className="text-2xl font-black text-teal-400">{WELFARE_SPEND_METRICS.priorContributionRate}</div>
          <div className="text-[11px] text-teal-300/80 font-mono">Contributed 5+ yrs before ill health</div>
        </div>

        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
          <div className="text-xs text-slate-400 font-medium">Avg Years Worked Before Claiming</div>
          <div className="text-2xl font-black text-amber-400">{WELFARE_SPEND_METRICS.avgYearsWorkedBeforeClaim}</div>
          <div className="text-[11px] text-slate-500 font-mono">ONS Longitudinal Study</div>
        </div>

        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
          <div className="text-xs text-slate-400 font-medium">PIP Extra-Cost Budget</div>
          <div className="text-2xl font-black text-rose-400">{WELFARE_SPEND_METRICS.pipBudget}</div>
          <div className="text-[11px] text-slate-500 font-mono">{WELFARE_SPEND_METRICS.pipPercentageOfGDP} of GDP (Fraud &lt; 0.2%)</div>
        </div>
      </div>

      {/* Contribution Breakdown */}
      <div className="p-6 rounded-2xl bg-teal-950/20 border border-teal-500/30 space-y-4">
        <div className="flex items-center gap-2 text-teal-400 font-bold text-sm uppercase tracking-wider">
          <CheckCircle2 className="w-5 h-5" />
          <span>Primary Highlight: Contribution Prior to Benefit Entitlement</span>
        </div>
        <p className="text-sm text-slate-200 leading-relaxed">
          Contrary to rhetoric implying benefits are claimed without prior economic contribution, <strong>82.4% of working-age adults receiving health and disability support paid National Insurance and Income Tax for at least 5 years</strong> prior to health impairment. Claimants spent an average of <strong>11.4 years in active employment</strong> before reaching the threshold of severe functional disability.
        </p>

        <div className="space-y-3 pt-2">
          <div className="text-xs font-bold text-slate-300 uppercase tracking-wider">
            Breakdown of Prior National Insurance / Tax Contribution Records:
          </div>
          {WELFARE_SPEND_METRICS.contributionBreakdown.map((item, idx) => (
            <div key={idx} className="space-y-1">
              <div className="flex justify-between text-xs text-slate-300">
                <span>{item.label}</span>
                <span className="font-mono font-bold text-teal-400">{item.percentage}%</span>
              </div>
              <div className="w-full h-2.5 rounded-full bg-slate-800 overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-teal-500 to-emerald-400 rounded-full"
                  style={{ width: `${item.percentage}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Breakdown Table */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-black text-lg text-slate-100 flex items-center gap-2">
            <PieChart className="w-5 h-5 text-purple-400" />
            Welfare Expenditure by Category
          </h3>
          <span className="text-xs text-slate-400 font-mono">Total Budget: £298.4 Bn</span>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950 text-slate-400 font-mono uppercase border-b border-slate-800">
              <tr>
                <th className="p-3">Expenditure Category</th>
                <th className="p-3">Annual Amount (£)</th>
                <th className="p-3">Share of Welfare Budget</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {WELFARE_SPEND_METRICS.expenditureByComponent.map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-800/40 transition">
                  <td className="p-3 font-semibold text-slate-200">{row.category}</td>
                  <td className="p-3 font-mono text-teal-300 font-bold">{row.amount}</td>
                  <td className="p-3 font-mono text-slate-400">{row.share}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
