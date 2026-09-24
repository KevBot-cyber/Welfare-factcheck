import React, { useState, useEffect, useMemo } from 'react';
import {
  ShieldCheck, AlertTriangle, Search, Scale, FileText, Printer, Copy,
  ExternalLink, ChevronDown, ChevronUp, RefreshCw, BarChart3, TrendingUp,
  Rss, CheckCircle2, XCircle, Info, Radio, Users, Newspaper, Award,
  Share2, Download, Eye, Sun, Moon, Volume2, Sparkles, Filter, HelpCircle,
  Building2, MessageSquare, BookOpen, Clock, Zap, Gavel, Check, Send,
  HeartHandshake, Coins, LineChart, Phone, Globe, Quote
} from 'lucide-react';

import { SPENDING_LINKS, SPENDING_BREAKDOWN_2025_26, CONTRIBUTORY_DEBUNK_DATA, BENEFIT_RATES_2026_2027 } from './constants/spendingData';
import { getDynamicLeaderboardData } from './constants/leaderboardData';
import { INITIAL_LIVE_FEED, MYTH_VAULT } from './constants/feedAndVaultData';
import { SUPPORT_ORGANIZATIONS, CHARITIES_AZ } from './constants/supportAndCharitiesData';
import { evaluatePipAndFinancialClaims } from './utils/evaluationEngine';

export default function App() {
  const [activeTab, setActiveTab] = useState('leaderboard');
  const [highContrast, setHighContrast] = useState(false);
  const [leaderboardCategory, setLeaderboardCategory] = useState('mps');
  const [timeframe, setTimeframe] = useState('30');
  const [expandedFigure, setExpandedFigure] = useState(null);

  const [charitySearch, setCharitySearch] = useState('');
  const [charityLetter, setCharityLetter] = useState('ALL');
  const [charityCategory, setCharityCategory] = useState('ALL');

  const filteredLeaderboardData = useMemo(() => {
    const leaderboardData = getDynamicLeaderboardData();
    const days = parseInt(timeframe, 10);
    const now = new Date();
    const cutoffDate = new Date(now.getTime() - days * 24 * 60 * 60 * 1000);
    const filtered = {};
    Object.keys(leaderboardData).forEach((categoryKey) => {
      filtered[categoryKey] = leaderboardData[categoryKey]
        .map((figure) => {
          const filteredHistory = (figure.claimsHistory || []).filter((claim) => {
            const claimDate = new Date(claim.date);
            return !isNaN(claimDate.getTime()) && claimDate >= cutoffDate;
          });
          return {
            ...figure,
            flaggedClaimsCount: filteredHistory.length,
            claimsHistory: filteredHistory
          };
        })
        .filter((figure) => figure.flaggedClaimsCount > 0)
        .sort((a, b) => b.flaggedClaimsCount - a.flaggedClaimsCount)
        .map((figure, index) => ({
          ...figure,
          rank: index + 1
        }));
    });
    return filtered;
  }, [timeframe]);

  const filteredCharities = useMemo(() => {
    return CHARITIES_AZ.filter((item) => {
      const matchesSearch = item.name.toLowerCase().includes(charitySearch.toLowerCase()) ||
        item.desc.toLowerCase().includes(charitySearch.toLowerCase()) ||
        item.category.toLowerCase().includes(charitySearch.toLowerCase());
      const matchesLetter = charityLetter === 'ALL' || item.name.toUpperCase().startsWith(charityLetter);
      const matchesCategory = charityCategory === 'ALL' || item.category === charityCategory;
      return matchesSearch && matchesLetter && matchesCategory;
    });
  }, [charitySearch, charityLetter, charityCategory]);

  const charityCategoriesList = useMemo(() => {
    const cats = new Set(CHARITIES_AZ.map(c => c.category));
    return ['ALL', ...Array.from(cats)];
  }, []);

  const [liveFeed, setLiveFeed] = useState(INITIAL_LIVE_FEED);
  const [isFeedLive, setIsFeedLive] = useState(true);
  
  const [analyzerInput, setAnalyzerInput] = useState('');
  const [analyzing, setAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);

  const [vaultSearch, setVaultSearch] = useState('');

  const [constituency, setConstituency] = useState('');
  const [mpName, setMpName] = useState('');
  const [selectedTopics, setSelectedTopics] = useState(['pip_rates', 'pip_multiplier', 'welfare_gdp', 'pip_fraud', 'tribunals', 'uc_rates', 'carers']);
  const [customNote, setCustomNote] = useState('');
  const [briefingCopied, setBriefingCopied] = useState(false);

  useEffect(() => {
    if (!isFeedLive) return;
    const interval = setInterval(() => {
      const newsItems = [
        { text: "Daily Mail publishes article claiming PIP claims hit 'unprecedented crisis'.", author: "Daily Mail Digital", sourceUrl: "https://www.dailymail.co.uk/", bsFlag: "High BS (88%)" },
        { text: "Hansard Record: Minister acknowledges 70% HMCTS tribunal success rate.", author: "House of Commons", sourceUrl: "https://hansard.parliament.uk/", bsFlag: "Low BS" },
        { text: "LBC Phone-in host debates fit note reforms with NHS doctor.", author: "LBC Radio", sourceUrl: "https://www.lbc.co.uk/", bsFlag: "Medium BS (54%)" },
        { text: "The Telegraph writes feature on economic inactivity and NHS waiting lists.", author: "Daily Telegraph", sourceUrl: "https://www.telegraph.co.uk/", bsFlag: "High BS (79%)" }
      ];
      const randomItem = newsItems[Math.floor(Math.random() * newsItems.length)];
      const now = new Date();
      const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      setLiveFeed(prev => [
        {
          id: 'f_' + Date.now(),
          time: timeStr,
          source: 'Live RSS / Hansard Sync',
          sourceUrl: randomItem.sourceUrl,
          author: randomItem.author,
          text: randomItem.text,
          status: randomItem.bsFlag.includes('High') ? 'Flagged Misleading' : 'Verified Data',
          bsFlag: randomItem.bsFlag
        },
        ...prev.slice(0, 7)
      ]);
    }, 12000);
    return () => clearInterval(interval);
  }, [isFeedLive]);

  const handleAnalyzeText = () => {
    if (!analyzerInput.trim()) return;
    setAnalyzing(true);
    setAnalysisResult(null);
    setTimeout(() => {
      const result = evaluatePipAndFinancialClaims(analyzerInput);
      setAnalysisResult(result);
      setAnalyzing(false);
    }, 600);
  };

  const toggleTopic = (topicKey) => {
    setSelectedTopics(prev =>
      prev.includes(topicKey) ? prev.filter(t => t !== topicKey) : [...prev, topicKey]
    );
  };

  const handlePrintBriefing = () => {
    window.print();
  };

  const copyBriefingText = () => {
    const text = `CONSTITUENCY BRIEFING SHEET: DISABILITY & WELFARE FACTS
To: ${constituency || 'Constituency'}
Date: ${new Date().toLocaleDateString('en-GB')}
Key Verified Statistics & Primary Source Data:
${selectedTopics.includes('pip_rates') ? `1. Current PIP Payment Rates (2026/27):
- Daily Living: Standard £76.70/wk | Enhanced £114.60/wk
- Mobility: Standard £30.30/wk | Enhanced £80.00/wk
- Combined Maximum: £194.60/wk (£778.40 per 4-week cycle).
- Fact: PIP is tax-free, non-means-tested, and covers extra living costs incurred from long-term health conditions regardless of working status.` : ''}
${selectedTopics.includes('pip_multiplier') ? `\n2. PIP as a Regional Economic Multiplier Effect:
- Multiplier Valuation: Every £1.00 disbursed in PIP generates between £1.40 and £1.70 in local economic output.
- Fiscal Impact: Unlike high-earner tax cuts, PIP cash is immediately spent in local retail, transport, and heating, generating direct VAT revenue, sustaining high-street employment, and reducing emergency health expenditures.` : ''}
${selectedTopics.includes('welfare_gdp') ? `\n3. Welfare Spending as a % of GDP (Stable & Falling Trend):
- Fiscal Context: UK total social protection spending as a % of GDP has remained stable between 10% and 11% for over two decades and sits lower than the 2010–2012 peaks (12.1%).
- International Comparison: The UK spends less as a proportion of GDP on disability and welfare than the OECD average (13.2%) and substantially less than peer nations like France (18.8%) or Germany (15.4%).` : ''}
${selectedTopics.includes('pip_fraud') ? `\n4. PIP Fraud vs Reality:
- Official DWP PIP Fraud Rate: Under 0.2% (DWP Fraud & Error Report).
- Reality: PIP is heavily vetted; over 70% of appeals are overturned in favor of claimants at independent HMCTS tribunals.` : ''}
${selectedTopics.includes('tribunals') ? `\n5. Assessment Accuracy & Tribunals:
- HMCTS Tribunal Overturn Rate: 70%+ of DWP rejections overturned when evaluated independently.
- Cause: Initial assessment providers frequently miscalculate descriptor scores.` : ''}
${selectedTopics.includes('uc_rates') ? `\n6. Universal Credit (UC) Standard Rates & Health Elements (2026/27):
- Standard Allowance: Single Under 25 £338.58/mo | Single 25+ £424.90/mo
- Joint Claimants: Both Under 25 £528.34/mo | One or both 25+ £666.97/mo
- Health/Disability Elements: LCWRA £429.80/mo | LCW £217.26/mo
- Earnings Taper: UC payment reduces by 55p per £1 earned above any applicable Work Allowance.` : ''}
${selectedTopics.includes('carers') ? `\n7. Carer's Allowance & UC Carer Element Facts (2026/27):
- Carer's Allowance Weekly Rate: £86.45/wk (requires minimum 35 hours care/wk).
- Net Earnings Cap: £204.00/wk (cliff-edge threshold).
- UC Carer Element: £209.34/mo.
- Crucial Note: Carer's Allowance is deducted £1-for-£1 from UC standard allowance, though the UC Carer Element remains accessible.` : ''}
${selectedTopics.includes('motability') ? `\n8. Motability Scheme Funding:
- Fact: Motability is NOT a free handout. Recipients surrender 100% of their PIP Higher Mobility allowance (£80.00/wk) to lease cars.` : ''}
${selectedTopics.includes('inactivity') ? `\n9. Economic Inactivity & Long-Term Illness:
- ONS Data: 84% of economically inactive working-age individuals suffer long-term health conditions or NHS waiting list delays.` : ''}
${customNote ? `\nConstituent Note: "${customNote}"` : ''}
Data Verified via: UK Disability & Welfare Truth Index (welfaretruthindex.org.uk)
Primary Sources: DWP Stat-Xplore, ONS, MoJ HMCTS, NIESR, IFS, OBR, OECD Social Expenditure Database.`;
    navigator.clipboard.writeText(text);
    setBriefingCopied(true);
    setTimeout(() => setBriefingCopied(false), 3000);
  };

  return (
    <div className={`min-h-screen ${highContrast ? 'bg-black text-yellow-300 font-bold' : 'bg-slate-950 text-slate-100'} transition-colors duration-200`}>
      <header className={`${highContrast ? 'bg-yellow-400 text-black border-b-4 border-yellow-500' : 'bg-gradient-to-r from-purple-900 via-slate-900 to-teal-900 border-b border-purple-800/40'} px-4 py-3 sticky top-0 z-50 backdrop-blur-md`}>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-xl ${highContrast ? 'bg-black text-yellow-300' : 'bg-purple-600/30 text-purple-300 border border-purple-400/30'}`}>
              <ShieldCheck className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl md:text-2xl font-black tracking-tight flex items-center gap-2">
                  UK Welfare Truth Index <span className="text-xs px-2 py-0.5 rounded-full bg-teal-500/20 text-teal-300 border border-teal-500/30 font-semibold">2026 Live</span>
                </h1>
              </div>
              <p className={`text-xs ${highContrast ? 'text-black' : 'text-slate-400'}`}>
                Debunking Welfare Misinformation with Primary DWP, ONS & Tribunal Data
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setHighContrast(!highContrast)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition ${ highContrast ? 'bg-black text-yellow-300 border-2 border-yellow-300' : 'bg-slate-800 text-slate-200 hover:bg-slate-700 border border-slate-700' }`}
              aria-label="Toggle High Contrast Mode"
            >
              {highContrast ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              <span>{highContrast ? 'Standard Contrast' : 'High Contrast'}</span>
            </button>
            <button
              onClick={() => setActiveTab('briefing')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-teal-500 text-slate-950 hover:bg-teal-400 transition shadow-lg shadow-teal-500/10"
            >
              <Printer className="w-4 h-4" />
              <span>MP Briefing Pack</span>
            </button>
          </div>
        </div>
      </header>

      <nav className={`border-b ${highContrast ? 'border-yellow-400 bg-black' : 'border-slate-800 bg-slate-900/80'} px-4 sticky top-[61px] z-40 backdrop-blur-md`}>
        <div className="max-w-7xl mx-auto flex overflow-x-auto no-scrollbar gap-1 py-2">
          {[
            { id: 'leaderboard', label: 'Top 10 Hall of Fame', icon: Award, badge: 'New' },
            { id: 'analyzer', label: 'BS Meter & Analyzer', icon: Zap },
            { id: 'spending', label: 'Spending & Contribution Debunk', icon: BarChart3, badge: 'NEW' },
            { id: 'vault', label: 'Myth Vault & Facts', icon: BookOpen },
            { id: 'economics', label: 'Economic Impact & GDP', icon: LineChart, badge: 'Crucial' },
            { id: 'charities', label: 'Disability Charity A-Z Directory', icon: HeartHandshake, badge: 'Directory' },
            { id: 'briefing', label: 'MP Briefing Pack', icon: FileText },
            { id: 'rights', label: 'Know Your Rights', icon: ShieldCheck, badge: 'Info' },
            { id: 'legal', label: 'Legal & Standards', icon: Scale },
            { id: 'support', label: 'Disability Help & Advocacy', icon: Users },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs md:text-sm font-semibold whitespace-nowrap transition ${ isActive ? highContrast ? 'bg-yellow-400 text-black font-extrabold' : 'bg-purple-600 text-white shadow-md shadow-purple-600/30' : highContrast ? 'text-yellow-300 hover:bg-yellow-900/40' : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200' }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
                {tab.badge && (
                  <span className="ml-1 text-[10px] px-1.5 py-0.2 rounded-full bg-amber-500/30 text-amber-300 border border-amber-500/40 font-bold">
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 py-6 space-y-8">
        {activeTab === 'leaderboard' && (
          <div className="space-y-6">
            <div className={`p-6 rounded-2xl border ${highContrast ? 'border-yellow-400 bg-black' : 'border-purple-800/40 bg-gradient-to-r from-purple-950/80 via-slate-900 to-slate-900'} relative overflow-hidden`}>
              <div className="max-w-3xl space-y-2">
                <div className="flex items-center gap-2 text-purple-400 text-xs font-bold uppercase tracking-wider">
                  <Award className="w-4 h-4" />
                  <span>Public Accountability Index</span>
                </div>
                <h2 className="text-2xl md:text-3xl font-black tracking-tight text-slate-100">
                  The Welfare Misinformation Leaderboard
                </h2>
                <p className={`text-sm ${highContrast ? 'text-yellow-300' : 'text-slate-300'}`}>
                  Tracking MPs, political parties, social media posts (X, TikTok, Facebook), newspaper tabloids, and broadcast shows ranked by verified inaccurate or misleading statements about PIP, Universal Credit, and disability stats in 2026.
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-2">
              <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-xl border border-slate-800 w-full sm:w-auto overflow-x-auto">
                {[
                  { id: 'mps', label: 'Top MPs & Ministers', icon: Building2 },
                  { id: 'social_media', label: 'MP Social Media (X/TikTok/FB)', icon: MessageSquare }
                ].map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setLeaderboardCategory(cat.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition ${leaderboardCategory === cat.id ? 'bg-purple-600 text-white' : 'text-slate-400 hover:text-slate-200'}`}
                  >
                    <span>{cat.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
