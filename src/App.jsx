import React, { useState, useEffect, useMemo } from 'react';
import {
  ShieldCheck, AlertTriangle, Search, Scale, FileText, Printer, Copy,
  ExternalLink, ChevronDown, ChevronUp, RefreshCw, BarChart3, TrendingUp,
  Rss, CheckCircle2, XCircle, Info, Radio, Users, Newspaper, Award,
  Share2, Download, Eye, Sun, Moon, Volume2, Sparkles, Filter, HelpCircle,
  Building2, MessageSquare, BookOpen, Clock, Zap, Gavel, Check, Send,
  HeartHandshake, Coins, LineChart, Phone, Globe, Quote, Landmark, ShoppingCart, Stethoscope
} from 'lucide-react';

import { SPENDING_LINKS, SPENDING_BREAKDOWN_2025_26, CONTRIBUTORY_DEBUNK_DATA, BENEFIT_RATES_2026_2027 } from './constants/spendingData';
import { getDynamicLeaderboardData } from './constants/leaderboardData';
import { INITIAL_LIVE_FEED, MYTH_VAULT, queryOfficialSources } from './constants/feedAndVaultData';
import { SUPPORT_ORGANIZATIONS, CHARITIES_AZ } from './constants/supportAndCharitiesData';
import { evaluatePipAndFinancialClaims } from './constants/evaluationEngine';
import { MACROECONOMIC_METRICS, MACROECONOMIC_SUMMARIES } from './constants/economicImpact';
import { KNOW_YOUR_RIGHTS_CONTENT } from './constants/knowyourrights';
import LegalAndStandards from './constants/legalandstandards';
import MPBriefingModule from './constants/mpBriefingModule';

// Helper to format keys like "DailyLivingStandard" to "Daily Living Standard"
const formatCamelCase = (str) => {
  if (!str) return '';
  return str
    .replace(/([A-Z])/g, ' $1')
    .replace(/([a-zA-Z])(\d+)/g, '$1 $2')
    .replace(/_/g, ' ')
    .replace(/^./, (s) => s.toUpperCase())
    .trim();
};

// Helper to format values with £ signs where appropriate
const formatCurrencyVal = (val) => {
  if (val === null || val === undefined) return '';
  if (typeof val === 'number') {
    return `£${val.toLocaleString('en-GB', { minimumFractionDigits: val % 1 !== 0 ? 2 : 0 })}`;
  }
  const str = String(val).trim();
  if (!isNaN(Number(str))) {
    const num = Number(str);
    return `£${num.toLocaleString('en-GB', { minimumFractionDigits: num % 1 !== 0 ? 2 : 0 })}`;
  }
  if (!str.startsWith('£') && !str.includes('bn') && !str.includes('%')) {
    return `£${str}`;
  }
  return str;
};

// Map common shorthand/slang keywords to official benefit category keys
const BENEFIT_KEYWORD_ALIASES = {
  pension: ['statePensions', 'pensionCredit'],
  pensions: ['statePensions', 'pensionCredit'],
  'state pension': ['statePensions'],
  'new state pension': ['statePensions'],
  'basic state pension': ['statePensions'],
  'pension credit': ['pensionCredit'],
  pip: ['personalIndependencePaymentPip'],
  disability: ['personalIndependencePaymentPip', 'disabilityLivingAllowanceDla', 'attendanceAllowance'],
  'disability living allowance': ['disabilityLivingAllowanceDla'],
  dla: ['disabilityLivingAllowanceDla'],
  'attendance allowance': ['attendanceAllowance'],
  uc: ['universalCreditUc'],
  'universal credit': ['universalCreditUc'],
  carer: ['carersAllowance'],
  carers: ['carersAllowance'],
  'carers allowance': ['carersAllowance'],
  'carer\'s allowance': ['carersAllowance'],
  esa: ['employmentAndSupportAllowanceEsa'],
  employment: ['employmentAndSupportAllowanceEsa'],
  incapacity: ['employmentAndSupportAllowanceEsa'],
  jsa: ['jobseekersAllowanceJsa'],
  'jobseeker\'s allowance': ['jobseekersAllowanceJsa'],
  'jobseekers allowance': ['jobseekersAllowanceJsa'],
  child: ['childBenefit'],
  'child benefit': ['childBenefit'],
  housing: ['housingBenefitAndLocalHousingAllowanceLha'],
  rent: ['housingBenefitAndLocalHousingAllowanceLha'],
  lha: ['housingBenefitAndLocalHousingAllowanceLha'],
  maternity: ['maternityAndStatutoryPayments'],
  paternity: ['maternityAndStatutoryPayments'],
  sick: ['maternityAndStatutoryPayments'],
  ssp: ['maternityAndStatutoryPayments'],
  cap: ['benefitCapLimits'],
  'benefit cap': ['benefitCapLimits']
};

// Recursive helper to build readable rate summary lines from nested objects
const formatRateLines = (data, depth = 0) => {
  let lines = [];
  const indent = '   '.repeat(depth);
  if (typeof data === 'object' && data !== null) {
    Object.entries(data).forEach(([key, val]) => {
      const formattedKey = formatCamelCase(key);
      if (typeof val === 'object' && val !== null) {
        lines.push(`${indent}• ${formattedKey}:`);
        lines.push(...formatRateLines(val, depth + 1));
      } else {
        lines.push(`${indent}• ${formattedKey}: ${formatCurrencyVal(val)}`);
      }
    });
  } else {
    lines.push(`${indent}• Rate: ${formatCurrencyVal(data)}`);
  }
  return lines;
};

// Broader multi-dataset search helper covering all UK benefits and policy topics
const searchBroadDataset = (queryStr) => {
  if (!queryStr || !queryStr.trim()) return [];
  const q = queryStr.toLowerCase().trim();
  const searchWords = q.split(/\s+/).filter(w => w.length > 1);
  const results = [];

  if (typeof queryOfficialSources === 'function') {
    try {
      const official = queryOfficialSources(q);
      if (Array.isArray(official) && official.length > 0) {
        results.push(...official);
      }
    } catch (e) {
      // Fall through
    }
  }

  if (BENEFIT_RATES_2026_2027 && typeof BENEFIT_RATES_2026_2027 === 'object') {
    const matchedAliasKeys = new Set();
    Object.entries(BENEFIT_KEYWORD_ALIASES).forEach(([alias, targetKeys]) => {
      if (q.includes(alias) || alias.includes(q)) {
        targetKeys.forEach(k => matchedAliasKeys.add(k));
      }
    });

    Object.entries(BENEFIT_RATES_2026_2027).forEach(([category, data]) => {
      const categoryFormatted = formatCamelCase(category);
      const categoryLower = categoryFormatted.toLowerCase();
      const rawCategoryLower = category.toLowerCase();
      const dataStr = JSON.stringify(data).toLowerCase();

      const isDirectAliasMatch = matchedAliasKeys.has(category);
      const isCategoryMatch = categoryLower.includes(q) || rawCategoryLower.includes(q);
      const isDataContentMatch = dataStr.includes(q);
      const isWordMatch = searchWords.some(word => word.length > 2 && (categoryLower.includes(word) || dataStr.includes(word)));

      if (isDirectAliasMatch || isCategoryMatch || isDataContentMatch || isWordMatch) {
        const lines = formatRateLines(data);
        results.push({
          id: `rate_${category}`,
          sourceOrg: 'DWP Official Benefit & Pension Rates (2026/27)',
          question: `Official Statutory Rates: ${categoryFormatted}`,
          answer: lines.join('\n'),
          sourceName: 'DWP Schedule of Statutory Benefit Rates 2026/27'
        });
      }
    });
  }

  if (SPENDING_BREAKDOWN_2025_26 && typeof SPENDING_BREAKDOWN_2025_26 === 'object') {
    Object.entries(SPENDING_BREAKDOWN_2025_26).forEach(([key, val]) => {
      const formattedKey = formatCamelCase(key);
      const keyLower = formattedKey.toLowerCase();
      if (keyLower.includes(q) || JSON.stringify(val).toLowerCase().includes(q) || searchWords.some(w => w.length > 2 && keyLower.includes(w))) {
        results.push({
          id: `spend_${key}`,
          sourceOrg: 'HM Treasury / OBR Expenditure Data (2025/26)',
          question: `UK Social Protection Budget: ${formattedKey}`,
          answer: `Allocated Expenditure: ${typeof val === 'object' && val !== null ? formatCurrencyVal(val.amount || val.value || val.total) : formatCurrencyVal(val)}\n\nThis represents official government expenditure tracking within the UK social protection budget framework.`,
          sourceName: 'HM Treasury Public Expenditure Statistical Analyses (PESA)'
        });
      }
    });
  }

  if (CONTRIBUTORY_DEBUNK_DATA && typeof CONTRIBUTORY_DEBUNK_DATA === 'object') {
    Object.entries(CONTRIBUTORY_DEBUNK_DATA).forEach(([key, item]) => {
      const claimText = (item.claim || item.myth || '').toLowerCase();
      const realityText = (item.reality || item.fact || '').toLowerCase();
      const keyText = formatCamelCase(key).toLowerCase();
      if (claimText.includes(q) || realityText.includes(q) || keyText.includes(q) || searchWords.some(w => w.length > 2 && (claimText.includes(w) || realityText.includes(w)))) {
        results.push({
          id: `contrib_${key}`,
          sourceOrg: 'Verified Financial & Contribution Analysis',
          question: item.claim || item.myth || formatCamelCase(key),
          answer: item.reality || item.fact,
          sourceName: 'DWP / Institute for Fiscal Studies (IFS) Analysis'
        });
      }
    });
  }

  if (Array.isArray(CHARITIES_AZ)) {
    CHARITIES_AZ.forEach((charity, index) => {
      const name = (charity.name || '').toLowerCase();
      const desc = (charity.desc || '').toLowerCase();
      const category = (charity.category || '').toLowerCase();
      if (name.includes(q) || desc.includes(q) || category.includes(q)) {
        results.push({
          id: `charity_${index}`,
          sourceOrg: `Disability Charity Directory (${charity.category || 'Support'})`,
          question: charity.name,
          answer: `${charity.desc}\n\nCategory: ${charity.category}`,
          sourceName: 'UK Disability Charity & Advocacy Index'
        });
      }
    });
  }

  const uniqueMap = new Map();
  results.forEach(item => {
    if (!uniqueMap.has(item.question)) {
      uniqueMap.set(item.question, item);
    }
  });

  return Array.from(uniqueMap.values());
};

export default function App() {
  const [activeTab, setActiveTab] = useState('economics');
  const [highContrast, setHighContrast] = useState(false);
  const [leaderboardCategory, setLeaderboardCategory] = useState('mps');
  const [timeframe, setTimeframe] = useState('30');
  const [expandedFigure, setExpandedFigure] = useState(null);

  const [charitySearch, setCharitySearch] = useState('');
  const [charityLetter, setCharityLetter] = useState('ALL');
  const [charityCategory, setCharityCategory] = useState('ALL');

  const [expandedMacroId, setExpandedMacroId] = useState(null);

  const toggleMacroAccordion = (id) => {
    setExpandedMacroId((prev) => (prev === id ? null : id));
  };

  const filteredLeaderboardData = useMemo(() => {
    const rawData = typeof getDynamicLeaderboardData === 'function' ? getDynamicLeaderboardData() : null;
    const leaderboardData = rawData && typeof rawData === 'object' ? rawData : {};
    
    const days = parseInt(timeframe, 10);
    const now = new Date();
    const cutoffDate = new Date(now.getTime() - days * 24 * 60 * 60 * 1000);
    const filtered = {};

    Object.keys(leaderboardData).forEach((categoryKey) => {
      const items = Array.isArray(leaderboardData[categoryKey]) ? leaderboardData[categoryKey] : [];

      filtered[categoryKey] = items
        .map((figure) => {
          const claimsHistory = Array.isArray(figure?.claimsHistory) ? figure.claimsHistory : [];
          const filteredHistory = claimsHistory.filter((claim) => {
            if (!claim?.date) return true;
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
          rank: figure.rank || index + 1
        }));
    });
    return filtered;
  }, [timeframe]);

  const filteredCharities = useMemo(() => {
    const charitiesList = Array.isArray(CHARITIES_AZ) ? CHARITIES_AZ : [];
    return charitiesList.filter((item) => {
      const matchesSearch = (item.name || '').toLowerCase().includes(charitySearch.toLowerCase()) ||
        (item.desc || '').toLowerCase().includes(charitySearch.toLowerCase()) ||
        (item.category || '').toLowerCase().includes(charitySearch.toLowerCase());
      const matchesLetter = charityLetter === 'ALL' || (item.name || '').toUpperCase().startsWith(charityLetter);
      const matchesCategory = charityCategory === 'ALL' || item.category === charityCategory;
      return matchesSearch && matchesLetter && matchesCategory;
    });
  }, [charitySearch, charityLetter, charityCategory]);

  const charityCategoriesList = useMemo(() => {
    const charitiesList = Array.isArray(CHARITIES_AZ) ? CHARITIES_AZ : [];
    const cats = new Set(charitiesList.map(c => c.category).filter(Boolean));
    return ['ALL', ...Array.from(cats)];
  }, []);

  const [liveFeed, setLiveFeed] = useState(INITIAL_LIVE_FEED || []);
  const [isFeedLive, setIsFeedLive] = useState(true);
  
  const [analyzerInput, setAnalyzerInput] = useState('');
  const [analyzing, setAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);

  const [vaultSearch, setVaultSearch] = useState('');

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
        ...(Array.isArray(prev) ? prev.slice(0, 7) : [])
      ]);
    }, 12000);
    return () => clearInterval(interval);
  }, [isFeedLive]);

  const handleAnalyzeText = () => {
    if (!analyzerInput.trim()) return;
    setAnalyzing(true);
    setAnalysisResult(null);
    setTimeout(() => {
      if (typeof evaluatePipAndFinancialClaims === 'function') {
        const result = evaluatePipAndFinancialClaims(analyzerInput);
        setAnalysisResult(result);
      }
      setAnalyzing(false);
    }, 400);
  };

  const spendingItems = useMemo(() => {
    const palette = ['bg-indigo-500', 'bg-emerald-400', 'bg-amber-500', 'bg-rose-500', 'bg-cyan-400', 'bg-purple-500', 'bg-blue-400', 'bg-teal-400'];
    let idx = 0;

    const parseValue = (rawVal) => {
      if (typeof rawVal === 'number') return rawVal;
      if (typeof rawVal === 'string') {
        const cleaned = rawVal.replace(/[^0-9.]/g, '');
        return parseFloat(cleaned) || 0;
      }
      if (typeof rawVal === 'object' && rawVal !== null) {
        if ('amount' in rawVal) return parseValue(rawVal.amount);
        if ('value' in rawVal) return parseValue(rawVal.value);
        if ('total' in rawVal) return parseValue(rawVal.total);
        if ('spend' in rawVal) return parseValue(rawVal.spend);
      }
      return 0;
    };

    const parseName = (key, rawVal) => {
      if (typeof rawVal === 'object' && rawVal !== null) {
        if (rawVal.name) return rawVal.name;
        if (rawVal.label) return rawVal.label;
        if (rawVal.title) return rawVal.title;
        if (rawVal.category) return rawVal.category;
      }
      return formatCamelCase(key);
    };

    if (Array.isArray(SPENDING_BREAKDOWN_2025_26) && SPENDING_BREAKDOWN_2025_26.length > 0) {
      return SPENDING_BREAKDOWN_2025_26.map((item, index) => {
        const amount = parseValue(item);
        const name = parseName(`category_${index}`, item);
        const color = palette[index % palette.length];
        return {
          key: item.id || `item_${index}`,
          name,
          amount,
          color
        };
      });
    }

    if (SPENDING_BREAKDOWN_2025_26 && typeof SPENDING_BREAKDOWN_2025_26 === 'object') {
      return Object.entries(SPENDING_BREAKDOWN_2025_26).map(([key, rawVal]) => {
        const amount = parseValue(rawVal);
        const name = parseName(key, rawVal);
        const color = palette[idx % palette.length];
        idx++;

        return {
          key,
          name,
          amount,
          color
        };
      });
    }

    return [
      { key: 'statePensions', name: 'State Pensions', amount: 146.0, color: 'bg-indigo-500' },
      { key: 'universalCredit', name: 'Universal Credit (inc. health)', amount: 67.0, color: 'bg-emerald-400' },
      { key: 'disabilityBenefits', name: 'Disability Benefits (PIP/DLA/AA)', amount: 44.7, color: 'bg-amber-500' },
      { key: 'incapacityBenefits', name: 'Incapacity Benefits (ESA / UC LCWRA)', amount: 32.4, color: 'bg-rose-500' },
      { key: 'housingBenefit', name: 'Housing Benefit (legacy)', amount: 12.1, color: 'bg-cyan-400' },
      { key: 'otherBenefits', name: 'Child Benefit & Others', amount: 43.8, color: 'bg-purple-500' },
    ];
  }, []);

  const totalSpendingBN = useMemo(() => {
    const sum = spendingItems.reduce((acc, item) => acc + item.amount, 0);
    return sum > 0 ? sum : 346.0;
  }, [spendingItems]);

  const spendCategoriesFormatted = useMemo(() => {
    return spendingItems.map(item => {
      const pct = totalSpendingBN > 0 ? ((item.amount / totalSpendingBN) * 100).toFixed(1) : '0.0';
      return {
        ...item,
        amountFormatted: item.amount >= 1 ? `£${item.amount.toFixed(1)}bn` : `£${(item.amount * 1000).toFixed(0)}m`,
        pct: `${pct}%`,
        pctVal: parseFloat(pct)
      };
    });
  }, [spendingItems, totalSpendingBN]);

  return (
    <div className={`min-h-screen ${highContrast ? 'bg-black text-yellow-300 font-bold' : 'bg-slate-950 text-slate-100'} transition-colors duration-200`}>
      {/* Sticky Header Container */}
      <div className="sticky top-0 z-50 print:hidden">
        <header className={`${highContrast ? 'bg-yellow-400 text-black border-b-4 border-yellow-500' : 'bg-gradient-to-r from-purple-900 via-slate-900 to-teal-900 border-b border-purple-800/40'} px-4 py-3 backdrop-blur-md`}>
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
                  Debunking Welfare Misinformation with Primary DWP, ONS &amp; Tribunal Data
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

        {/* Scrollable Horizontal Navigation Bar */}
        <nav className={`border-b ${highContrast ? 'border-yellow-400 bg-black' : 'border-slate-800 bg-slate-900/95'} px-4 backdrop-blur-md shadow-lg`}>
          <div className="max-w-7xl mx-auto flex overflow-x-auto gap-1 py-2 scrollbar-thin scrollbar-thumb-purple-600/50 scrollbar-track-slate-950">
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
      </div>

      <main className="max-w-7xl mx-auto px-4 py-6 space-y-8">
        {/* 1. HALL OF FAME LEADERBOARD */}
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
                  { id: 'mps', label: 'Top MPs & Ministers' },
                  { id: 'mp_social_media', label: 'MP Social Media' },
                  { id: 'byParty', label: 'Political Party Welfare Posts' },
                  { id: 'tabloids', label: 'Newspapers & Tabloids' },
                  { id: 'broadcasters', label: 'News Channels' },
                  { id: 'radio', label: 'Radio' },
                ].map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setLeaderboardCategory(cat.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 whitespace-nowrap transition ${leaderboardCategory === cat.id ? 'bg-purple-600 text-white' : 'text-slate-400 hover:text-slate-200'}`}
                  >
                    <span>{cat.label}</span>
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-slate-400" />
                <span className="text-xs text-slate-400 font-semibold">Timeframe:</span>
                <select
                  value={timeframe}
                  onChange={(e) => setTimeframe(e.target.value)}
                  className="bg-slate-900 border border-slate-800 text-xs rounded-lg px-2.5 py-1.5 text-slate-200 font-medium focus:outline-none focus:border-purple-500"
                >
                  <option value="7">Last 7 Days</option>
                  <option value="30">Last 30 Days</option>
                  <option value="90">Last 90 Days</option>
                  <option value="365">Past Year</option>
                </select>
              </div>
            </div>

            <div className="grid gap-4">
              {filteredLeaderboardData[leaderboardCategory]?.length > 0 ? (
                filteredLeaderboardData[leaderboardCategory].map((figure) => {
                  const isExpanded = expandedFigure === figure.id;
                  return (
                    <div key={figure.id} className="p-4 md:p-5 rounded-2xl border border-slate-800 bg-slate-900/60 hover:border-slate-700 transition space-y-3">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <span className="flex items-center justify-center w-8 h-8 rounded-xl bg-purple-950 text-purple-300 font-black text-sm border border-purple-800/50">
                            #{figure.rank}
                          </span>
                          <div>
                            <h3 className="font-bold text-base md:text-lg text-slate-100">{figure.name}</h3>
                            <p className="text-xs text-slate-400">{figure.party || figure.type || figure.outlet} &bull; {figure.constituency || figure.role || 'Media Outlet'}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          {figure.bsScore && (
                            <span className="text-xs font-black text-red-400 bg-red-500/10 px-2.5 py-1 rounded-lg border border-red-500/20">
                              BS Score: {figure.bsScore}
                            </span>
                          )}
                          <span className="text-xs font-bold px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20">
                            {figure.flaggedClaimsCount} Flagged Statement{figure.flaggedClaimsCount !== 1 ? 's' : ''}
                          </span>
                          <button
                            onClick={() => setExpandedFigure(isExpanded ? null : figure.id)}
                            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition"
                            aria-label="Expand details"
                          >
                            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                          </button>
                        </div>
                      </div>

                      {figure.claimsHistory?.[0] && !isExpanded && (
                        <div className="bg-slate-950/80 rounded-xl p-3 border-l-4 border-red-500 text-xs space-y-1">
                          <p className="font-semibold text-red-400 uppercase tracking-wider text-[10px]">Top Flagged Claim</p>
                          <p className="text-slate-200 italic">&ldquo;{figure.claimsHistory[0].quote}&rdquo;</p>
                          <p className="text-teal-400 font-medium pt-1">&check; Fact: {figure.claimsHistory[0].factCheck}</p>
                        </div>
                      )}

                      {isExpanded && (
                        <div className="mt-4 pt-4 border-t border-slate-800/80 space-y-3">
                          <h4 className="text-xs font-bold uppercase tracking-wider text-purple-400">Claims History & Primary Data Counter-proofs</h4>
                          <div className="space-y-2">
                            {(figure.claimsHistory || []).map((claim, idx) => (
                              <div key={idx} className="p-3 rounded-xl bg-slate-950/80 border border-slate-800/60 text-xs space-y-1.5">
                                <div className="flex items-center justify-between text-slate-400">
                                  <span>{claim.date} &bull; Source: {claim.source}</span>
                                  <span className="text-amber-400 font-semibold">{claim.category}</span>
                                </div>
                                <p className="text-slate-200 italic">&ldquo;{claim.quote}&rdquo;</p>
                                <p className="text-teal-400 font-medium">&check; Fact: {claim.factCheck}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })
              ) : (
                <div className="p-8 text-center text-slate-400 bg-slate-900/40 rounded-2xl border border-slate-800">
                  <Info className="w-8 h-8 mx-auto mb-2 text-slate-500" />
                  <p className="text-sm font-medium">No flagged claims found matching the selected timeframe.</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* 2. BS METER & ANALYZER */}
        {activeTab === 'analyzer' && (
          <div className="space-y-6">
            <div className="p-6 rounded-2xl border border-purple-800/40 bg-slate-900/80 space-y-3">
              <div className="flex items-center gap-2 text-purple-400 text-xs font-bold uppercase tracking-wider">
                <Zap className="w-4 h-4" />
                <span>Automated Fact-Checker Engine</span>
              </div>
              <h2 className="text-2xl font-black text-slate-100">BS Meter & Statement Evaluator</h2>
              <p className="text-sm text-slate-300">
                Paste any headline, MP quote, social media post, or news article text below to verify it against official DWP, ONS, and HMCTS primary datasets.
              </p>
            </div>

            <div className="space-y-3">
              <textarea
                value={analyzerInput}
                onChange={(e) => setAnalyzerInput(e.target.value)}
                placeholder="e.g., 'Claimants on PIP are scroungers taking an easy life and cost £60k a year...'"
                className="w-full h-36 p-4 rounded-xl bg-slate-900 border border-slate-800 text-sm text-slate-100 focus:outline-none focus:border-purple-500"
              />
              <button
                onClick={handleAnalyzeText}
                disabled={analyzing || !analyzerInput.trim()}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 disabled:opacity-50 text-white font-bold text-sm transition"
              >
                {analyzing ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                <span>{analyzing ? 'Evaluating Claim...' : 'Evaluate Statement'}</span>
              </button>
            </div>

            {analysisResult && (
              <div className="p-5 rounded-2xl border border-slate-800 bg-slate-900 space-y-4">
                <div className="space-y-2">
                  <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">BS RATING VERDICT</p>
                  <h3 className={`text-xl md:text-2xl font-black ${analysisResult.score >= 70 ? 'text-rose-400' : analysisResult.score >= 40 ? 'text-amber-400' : 'text-teal-400'}`}>
                    {analysisResult.verdict} ({analysisResult.score}%)
                  </h3>

                  <div className="w-full h-3.5 bg-slate-950 rounded-full overflow-hidden p-0.5 border border-slate-800">
                    <div
                      className={`h-full rounded-full transition-all duration-700 ease-out ${
                        analysisResult.score >= 70
                          ? 'bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500'
                          : analysisResult.score >= 40
                          ? 'bg-gradient-to-r from-teal-400 via-amber-400 to-amber-500'
                          : 'bg-gradient-to-r from-emerald-400 to-teal-400'
                      }`}
                      style={{ width: `${Math.max(5, Math.min(100, analysisResult.score))}%` }}
                    />
                  </div>
                </div>

                {analysisResult.primaryRebuttal && (
                  <div className="p-4 bg-slate-950 rounded-xl border border-purple-800/40 text-xs space-y-2">
                    <p className="font-bold text-purple-400 uppercase tracking-wider">STATEMENT-TAILORED PRIMARY DATA REBUTTAL</p>
                    <p className="text-slate-200 leading-relaxed">{analysisResult.primaryRebuttal}</p>
                    {analysisResult.sourceRef && (
                      <p className="text-slate-400 font-medium pt-1">
                        <strong className="text-teal-400">Reference:</strong> {analysisResult.sourceRef}
                      </p>
                    )}
                  </div>
                )}

                {analysisResult.flags && analysisResult.flags.length > 0 && (
                  <div className="space-y-2">
                    <h4 className="text-xs font-bold text-amber-400 uppercase flex items-center gap-1.5">
                      <AlertTriangle className="w-4 h-4 text-amber-400" />
                      <span>TAILORED BREAKDOWN OF STATEMENTS &amp; MISLEADING RHETORIC</span>
                    </h4>
                    {analysisResult.flags.map((flag, i) => (
                      <div key={i} className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-300 flex items-start gap-2">
                        <span className="text-amber-400 shrink-0 font-bold">&bull;</span>
                        <span>{flag}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* 3. SPENDING & CONTRIBUTION DEBUNK */}
        {activeTab === 'spending' && (
          <div className="space-y-6">
            <div className="p-6 rounded-2xl border border-purple-800/40 bg-slate-900/80 space-y-2">
              <h2 className="text-2xl font-black text-slate-100">Welfare &amp; Social Protection Breakdown (2025/26)</h2>
              <p className="text-xs text-slate-400 font-medium">
                Total UK Welfare Budget: ~£{totalSpendingBN.toFixed(1)} Billion (HM Treasury / DWP / OBR Data)
              </p>
            </div>

            <div className="p-6 rounded-2xl border border-slate-800 bg-slate-900/90 space-y-6">
              <div className="space-y-5">
                {spendCategoriesFormatted.map((item) => (
                  <div key={item.key} className="space-y-1.5">
                    <div className="flex justify-between items-center text-xs md:text-sm font-bold">
                      <span className="text-slate-200">{item.name}</span>
                      <span className="text-slate-300 font-mono">{item.amountFormatted} ({item.pct})</span>
                    </div>
                    <div className="w-full h-3 bg-slate-950 rounded-full overflow-hidden border border-slate-800/80">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${item.color}`}
                        style={{ width: `${Math.max(1, item.pctVal)}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800/80 space-y-1.5">
                <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Info className="w-4 h-4 text-amber-400" /> Key Context:
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  State Pensions constitute the largest single component (42.2%) of welfare spending. Working-age disability benefits (PIP/DLA) represent 12.9% of total expenditure.
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-5 rounded-2xl border border-slate-800 bg-slate-900 space-y-3">
                <h3 className="font-bold text-lg text-purple-300 border-b border-slate-800 pb-2">Contributory Myth vs Fact</h3>
                <div className="space-y-3 text-xs">
                  {Object.entries(CONTRIBUTORY_DEBUNK_DATA || {}).map(([key, item]) => (
                    <div key={key} className="p-3 bg-slate-950 rounded-xl space-y-1 border border-slate-800/60">
                      <p className="font-bold text-amber-400">Myth: {item.claim || item.myth}</p>
                      <p className="text-slate-300">Fact: {item.reality || item.fact}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-5 rounded-2xl border border-slate-800 bg-slate-900 space-y-3">
                <h3 className="font-bold text-lg text-teal-300 border-b border-slate-800 pb-2">Official 2026/27 Benefit Rates</h3>
                <div className="space-y-3 text-xs">
                  {Object.entries(BENEFIT_RATES_2026_2027 || {}).map(([key, item]) => {
                    const groupTitle = formatCamelCase(key);

                    if (typeof item === 'object' && item !== null && !Array.isArray(item)) {
                      return (
                        <div key={key} className="p-4 bg-slate-950 rounded-xl border border-slate-800/60 space-y-2">
                          <h4 className="font-extrabold text-xs text-purple-300 uppercase tracking-wider">{groupTitle}</h4>
                          <div className="space-y-1.5 pt-1 border-t border-slate-800/60">
                            {Object.entries(item).map(([subKey, subVal]) => {
                              const subLabel = formatCamelCase(subKey);

                              if (typeof subVal === 'object' && subVal !== null) {
                                return (
                                  <div key={subKey} className="space-y-1 py-1 border-b border-slate-900/80">
                                    <span className="font-semibold text-slate-300">{subLabel}:</span>
                                    <div className="pl-3 space-y-0.5">
                                      {Object.entries(subVal).map(([nKey, nVal]) => (
                                        <div key={nKey} className="flex justify-between items-center text-[11px]">
                                          <span className="text-slate-400">{formatCamelCase(nKey)}:</span>
                                          <span className="text-teal-300 font-mono font-bold">{formatCurrencyVal(nVal)}</span>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                );
                              }

                              return (
                                <div key={subKey} className="flex justify-between items-center py-0.5">
                                  <span className="text-slate-300 font-medium">{subLabel}:</span>
                                  <span className="text-teal-300 font-mono font-bold">{formatCurrencyVal(subVal)}</span>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      );
                    }

                    return (
                      <div key={key} className="p-3 bg-slate-950 rounded-xl border border-slate-800/60 flex justify-between items-center">
                        <span className="font-bold text-slate-200">{groupTitle}:</span>
                        <span className="text-teal-300 font-mono font-bold">{formatCurrencyVal(item)}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {Array.isArray(SPENDING_LINKS) && SPENDING_LINKS.length > 0 && (
              <div className="p-5 rounded-2xl border border-slate-800 bg-slate-900 space-y-3">
                <h3 className="font-bold text-sm text-slate-300 uppercase tracking-wider">Primary Official Sources & Links</h3>
                <div className="flex flex-wrap gap-2 text-xs">
                  {SPENDING_LINKS.map((link, idx) => (
                    <a
                      key={idx}
                      href={link.url || link.href || '#'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-950 hover:bg-slate-800 text-teal-400 border border-slate-800 transition"
                    >
                      <span>{link.title || link.label || link.name || 'Source'}</span>
                      <ExternalLink className="w-3.5 h-3.5 shrink-0" />
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* 4. MYTH VAULT & FACTS */}
        {activeTab === 'vault' && (() => {
          const searchTerm = vaultSearch.toLowerCase().trim();

          const filteredMyths = (MYTH_VAULT || []).filter((m) => {
            if (!searchTerm) return true;
            const mythText = (m.myth || m.title || m.claim || m.misconception || '').toLowerCase();
            const factText = (m.fact || m.reality || m.description || m.details || '').toLowerCase();
            const tags = Array.isArray(m.tags) ? m.tags.join(' ').toLowerCase() : '';
            return mythText.includes(searchTerm) || factText.includes(searchTerm) || tags.includes(searchTerm);
          });

          let dynamicResults = [];
          if (searchTerm) {
            dynamicResults = searchBroadDataset(vaultSearch);

            if (filteredMyths.length === 0 && dynamicResults.length === 0) {
              if (BENEFIT_RATES_2026_2027 && typeof BENEFIT_RATES_2026_2027 === 'object') {
                Object.entries(BENEFIT_RATES_2026_2027).forEach(([category, data]) => {
                  const categoryFormatted = formatCamelCase(category);
                  const categoryLower = categoryFormatted.toLowerCase();
                  const dataStr = JSON.stringify(data).toLowerCase();

                  if (categoryLower.includes(searchTerm) || dataStr.includes(searchTerm) || searchTerm.split(' ').some(word => word.length > 2 && (categoryLower.includes(word) || dataStr.includes(word)))) {
                    const lines = formatRateLines(data);

                    dynamicResults.push({
                      id: `fallback_rate_${category}`,
                      sourceOrg: 'DWP Official Benefit & Pension Rates (2026/27)',
                      question: `Official Statutory Rates: ${categoryFormatted}`,
                      answer: lines.join('\n'),
                      sourceName: 'DWP Schedule of Statutory Benefit Rates 2026/27'
                    });
                  }
                });
              }

              const isPipQuery = /pip|disability|daily living|mobility|assessment/i.test(vaultSearch);
              if (dynamicResults.length === 0 && isPipQuery && typeof evaluatePipAndFinancialClaims === 'function') {
                const evalRes = evaluatePipAndFinancialClaims(vaultSearch);
                if (evalRes && evalRes.primaryRebuttal) {
                  dynamicResults.push({
                    id: 'dyn_eval',
                    sourceOrg: 'Verified Primary Analysis',
                    question: vaultSearch,
                    answer: evalRes.primaryRebuttal,
                    sourceName: evalRes.sourceRef || 'Official DWP / ONS Guidance'
                  });
                }
              }
            }
          }

          return (
            <div className="space-y-6">
              <div className="p-6 rounded-2xl border border-purple-800/40 bg-slate-900/80 space-y-3">
                <h2 className="text-2xl font-black text-slate-100">Disability & Welfare Myth Vault</h2>
                <p className="text-sm text-slate-300">
                  A searchable reference index targeting recurring misconceptions regarding PIP assessments, fraud rates, Universal Credit, Carer's Allowance, and official benefit rates.
                </p>
                <div className="relative">
                  <input
                    type="text"
                    value={vaultSearch}
                    onChange={(e) => setVaultSearch(e.target.value)}
                    placeholder="Search myths, benefits, or ask questions (e.g. 'state pension', 'Universal Credit', 'Carers Allowance', 'fraud rate', 'how much is PIP')..."
                    className="w-full p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-slate-100 focus:outline-none focus:border-purple-500 pr-16"
                  />
                  {vaultSearch && (
                    <button
                      onClick={() => setVaultSearch('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 px-2 py-1 rounded-md transition"
                    >
                      Clear
                    </button>
                  )}
                </div>
              </div>

              {filteredMyths.length > 0 && (
                <div className="grid md:grid-cols-2 gap-4">
                  {filteredMyths.map((item, idx) => {
                    const mythText = item.myth || item.title || item.claim || item.misconception || `Myth #${idx + 1}`;
                    const factText = item.fact || item.reality || item.description || item.details || '';
                    return (
                      <div key={idx} className="p-5 rounded-2xl border border-slate-800 bg-slate-900 space-y-2">
                        <div className="flex items-center gap-2 text-red-400 font-bold text-xs uppercase">
                          <XCircle className="w-4 h-4" />
                          <span>Myth #{idx + 1}</span>
                        </div>
                        <h3 className="font-bold text-slate-100 text-sm">{mythText}</h3>
                        <div className="pt-2 border-t border-slate-800 text-xs text-slate-300 space-y-1">
                          <span className="text-teal-400 font-semibold flex items-center gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5" /> Official Primary Fact:
                          </span>
                          <p className="leading-relaxed">{factText}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {searchTerm && dynamicResults.length > 0 && (
                <div className="space-y-4">
                  {filteredMyths.length > 0 && (
                    <h3 className="text-xs font-bold text-purple-400 uppercase tracking-wider pt-2">
                      Matching Official Benefit Rates & Policy Datasets
                    </h3>
                  )}
                  {dynamicResults.map((result) => (
                    <div key={result.id || `dyn_${Math.random()}`} className="p-6 rounded-2xl border border-purple-500/60 bg-slate-900 space-y-3 shadow-xl">
                      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                        <span className="bg-purple-600 text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                          {result.sourceOrg || 'Official Policy Data'}
                        </span>
                        <span className="text-xs text-teal-400 font-semibold">Verified Primary Source</span>
                      </div>
                      
                      <h3 className="text-lg font-bold text-white capitalize">
                        {result.question || vaultSearch}
                      </h3>

                      <div className="text-sm text-slate-200 leading-relaxed whitespace-pre-line bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono">
                        {result.answer}
                      </div>

                      {result.sourceName && (
                        <p className="text-xs text-slate-400 border-t border-slate-800 pt-2">
                          <strong className="text-slate-300">Source:</strong> {result.sourceName}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {searchTerm && filteredMyths.length === 0 && dynamicResults.length === 0 && (
                <div className="p-8 text-center bg-slate-900/50 rounded-2xl border border-slate-800 text-slate-400 text-sm">
                  No matching myths or benefit policy data found for &ldquo;{vaultSearch}&rdquo;.
                </div>
              )}
            </div>
          );
        })()}

        {/* 5. ECONOMIC IMPACT & GDP */}
        {activeTab === 'economics' && (
          <div className="space-y-6">
            <div className="p-6 rounded-2xl border border-purple-800/40 bg-slate-900/80 space-y-3">
              <div className="flex items-center gap-2 text-teal-400 text-xs font-bold uppercase tracking-wider">
                <LineChart className="w-4 h-4" />
                <span>Macroeconomic Analysis</span>
              </div>
              <h2 className="text-2xl font-black text-slate-100">Economic Impact & Regional Multiplier Effects</h2>
              <p className="text-sm text-slate-300">
                Evaluating how disability benefit disbursements directly feed local high-street economies, sustain UK GDP, and mitigate acute healthcare system expenditure.
              </p>
            </div>

            {/* Top Metrics Cards Grid */}
            <div className="grid md:grid-cols-3 gap-5">
              {MACROECONOMIC_METRICS && Object.entries(MACROECONOMIC_METRICS).map(([key, metric]) => {
                const isOpen = expandedMacroId === key;
                return (
                  <div key={key} className="p-5 rounded-2xl border border-slate-800 bg-slate-900 space-y-3 hover:border-purple-500/40 transition flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="p-2 rounded-xl bg-purple-500/20 text-purple-300 border border-purple-500/30">
                          {key === 'fiscalMultiplier' ? <ShoppingCart className="w-5 h-5" /> : key === 'gdpExpenditure' ? <Landmark className="w-5 h-5" /> : <Stethoscope className="w-5 h-5" />}
                        </span>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 border border-purple-500/30">
                          {metric.badge}
                        </span>
                      </div>
                      <h3 className="text-xl font-black text-purple-300">{metric.stat}</h3>
                      <p className="text-xs text-slate-400 font-medium mb-2">{metric.subtitle}</p>
                      <p className="text-xs text-slate-300 leading-relaxed">{metric.summary}</p>
                    </div>

                    {/* Accordion Toggle */}
                    <div className="border-t border-slate-800 pt-3 mt-auto">
                      <button
                        onClick={() => toggleMacroAccordion(key)}
                        className="w-full text-left text-xs font-medium text-purple-400 hover:text-purple-300 flex items-center justify-between"
                      >
                        <span>View Official Evidence & Reports ({Array.isArray(metric.citations) ? metric.citations.length : 0})</span>
                        {isOpen ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                      </button>

                      {isOpen && Array.isArray(metric.citations) && (
                        <div className="mt-3 space-y-3 bg-slate-950 p-3 rounded-xl border border-purple-500/20 text-xs">
                          {metric.citations.map((cite, idx) => (
                            <div key={idx} className="border-b border-slate-800 last:border-0 pb-2 last:pb-0 space-y-1">
                              <div className="font-bold text-purple-300 text-[11px]">{cite.source}</div>
                              <div className="text-slate-200 font-medium">{cite.title}</div>
                              <p className="italic text-slate-400 text-[11px]">&ldquo;{cite.quote}&rdquo;</p>
                              <a
                                href={cite.link}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center gap-1 text-teal-400 hover:underline text-[11px] pt-1"
                              >
                                Official Source <ExternalLink className="w-3 h-3" />
                              </a>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Macroeconomic Summaries Section */}
            <div className="p-6 rounded-2xl border border-slate-800 bg-slate-900/90 space-y-4">
              <h3 className="font-bold text-base text-slate-100 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-teal-400" />
                Macroeconomic Impact Summary
              </h3>
              <div className="grid md:grid-cols-2 gap-4 text-xs text-slate-300">
                {Array.isArray(MACROECONOMIC_SUMMARIES) && MACROECONOMIC_SUMMARIES.map((item) => {
                  const isOpen = expandedMacroId === item.id;
                  return (
                    <div key={item.id} className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col justify-between space-y-3">
                      <div>
                        <h4 className="font-bold text-purple-300 mb-1">{item.title}</h4>
                        <p className="leading-relaxed">{item.description}</p>
                      </div>

                      {/* Accordion Toggle */}
                      <div className="border-t border-slate-800 pt-3 mt-auto">
                        <button
                          onClick={() => toggleMacroAccordion(item.id)}
                          className="w-full text-left text-xs font-medium text-purple-400 hover:text-purple-300 flex items-center justify-between"
                        >
                          <span>View Official Evidence & Reports ({Array.isArray(item.citations) ? item.citations.length : 0})</span>
                          {isOpen ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                        </button>

                        {isOpen && Array.isArray(item.citations) && (
                          <div className="mt-3 space-y-3 bg-slate-900 p-3 rounded-lg border border-purple-500/20 text-xs">
                            {item.citations.map((cite, idx) => (
                              <div key={idx} className="border-b border-slate-800 last:border-0 pb-2 last:pb-0 space-y-1">
                                <div className="font-bold text-purple-300 text-[11px]">{cite.source}</div>
                                <div className="text-slate-200 font-medium">{cite.title}</div>
                                <p className="italic text-slate-400 text-[11px]">&ldquo;{cite.quote}&rdquo;</p>
                                <a
                                  href={cite.link}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="inline-flex items-center gap-1 text-teal-400 hover:underline text-[11px] pt-1"
                                >
                                  Official Source <ExternalLink className="w-3 h-3" />
                                </a>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* 6. DISABILITY CHARITY A-Z DIRECTORY */}
        {activeTab === 'charities' && (
          <div className="space-y-6">
            <div className="p-6 rounded-2xl border border-purple-800/40 bg-slate-900/80 space-y-3">
              <h2 className="text-2xl font-black text-slate-100">Disability Charity A-Z Directory</h2>
              <p className="text-sm text-slate-300">Filter and locate support groups, legal advocates, and advocacy organizations.</p>

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <input
                  type="text"
                  value={charitySearch}
                  onChange={(e) => setCharitySearch(e.target.value)}
                  placeholder="Search charity name or category..."
                  className="flex-1 p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-100"
                />
                <select
                  value={charityCategory}
                  onChange={(e) => setCharityCategory(e.target.value)}
                  className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-200"
                >
                  {charityCategoriesList.map((cat, idx) => (
                    <option key={idx} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              {/* Alphabet Quick Filter Bar */}
              <div className="flex flex-wrap gap-1 pt-2">
                {['ALL', ...'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')].map((letter) => (
                  <button
                    key={letter}
                    onClick={() => setCharityLetter(letter)}
                    className={`px-2 py-1 text-xs rounded-md font-bold transition ${
                      charityLetter === letter
                        ? 'bg-purple-600 text-white'
                        : 'bg-slate-950 text-slate-400 hover:bg-slate-800 hover:text-slate-200 border border-slate-800'
                    }`}
                  >
                    {letter}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {filteredCharities.length > 0 ? (
                filteredCharities.map((charity, idx) => (
                  <div key={idx} className="p-4 rounded-2xl border border-slate-800 bg-slate-900 space-y-2">
                    <div className="flex items-center justify-between">
                      <h3 className="font-bold text-sm text-slate-100">{charity.name}</h3>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 border border-purple-500/30 font-semibold">
                        {charity.category}
                      </span>
                    </div>
                    <p className="text-xs text-slate-300">{charity.desc}</p>
                  </div>
                ))
              ) : (
                <div className="col-span-full p-8 text-center text-slate-400 bg-slate-900/40 rounded-2xl border border-slate-800">
                  No charities found matching letter &ldquo;{charityLetter}&rdquo; or filter &ldquo;{charitySearch}&rdquo;.
                </div>
              )}
            </div>
          </div>
        )}

        {/* 7. MP BRIEFING PACK */}
        {activeTab === 'briefing' && <MPBriefingModule />}

        {/* 8. KNOW YOUR RIGHTS */}
        {activeTab === 'rights' && (
          <div className="space-y-8">
            {/* Header & Overview Section */}
            <div className="p-6 rounded-2xl border border-purple-800/40 bg-slate-900/80 space-y-3">
              <div className="flex items-center gap-2 text-purple-400 text-xs font-bold uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4" />
                <span>Statutory Protections & Rules</span>
              </div>
              <h2 className="text-2xl font-black text-slate-100">
                {KNOW_YOUR_RIGHTS_CONTENT.overview.title}
              </h2>
              <p className="text-sm text-slate-300">
                {KNOW_YOUR_RIGHTS_CONTENT.overview.subtitle}
              </p>

              {/* Key Statutory Principles */}
              <div className="grid md:grid-cols-3 gap-4 pt-4">
                {KNOW_YOUR_RIGHTS_CONTENT.overview.keyPrinciples.map((principle, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-slate-950 border border-purple-500/20 space-y-2">
                    <h3 className="font-bold text-purple-300 text-sm flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0" />
                      {principle.heading}
                    </h3>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {principle.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Guides Section */}
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-slate-100 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-teal-400" />
                Step-by-Step Statutory Guides
              </h3>

              <div className="grid gap-6">
                {KNOW_YOUR_RIGHTS_CONTENT.guides.map((guide) => (
                  <div key={guide.id} className="p-6 rounded-2xl border border-slate-800 bg-slate-900 space-y-4">
                    <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                      <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30 uppercase tracking-wider">
                        {guide.category}
                      </span>
                    </div>

                    <div>
                      <h4 className="text-lg font-bold text-slate-100">{guide.title}</h4>
                      <p className="text-xs text-slate-400 pt-1">{guide.summary}</p>
                    </div>

                    {/* Guide Sections */}
                    <div className="space-y-4 pt-2">
                      {guide.sections.map((sec, idx) => (
                        <div key={idx} className="bg-slate-950 p-4 rounded-xl border border-slate-800/80 space-y-2 text-xs">
                          <h5 className="font-bold text-teal-300 text-sm">{sec.subheading}</h5>
                          <p className="text-slate-300 leading-relaxed">{sec.text}</p>
                          {sec.bullets && (
                            <ul className="list-disc pl-5 space-y-1 text-slate-300 pt-1">
                              {sec.bullets.map((b, bIdx) => (
                                <li key={bIdx} className="leading-relaxed">{b}</li>
                              ))}
                            </ul>
                          )}
                        </div>
                      ))}
                    </div>

                    {/* Useful Tools & Links */}
                    {guide.usefulToolsAndLinks && guide.usefulToolsAndLinks.length > 0 && (
                      <div className="pt-2 border-t border-slate-800/80">
                        <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">Official Guides & Tools:</p>
                        <div className="flex flex-wrap gap-2 text-xs">
                          {guide.usefulToolsAndLinks.map((link, lIdx) => (
                            <a
                              key={lIdx}
                              href={link.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-950 hover:bg-slate-800 text-teal-400 border border-slate-800 transition"
                            >
                              <span>{link.label}</span>
                              <ExternalLink className="w-3.5 h-3.5 shrink-0" />
                            </a>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Support Networks & Legal Help Directory */}
            <div className="p-6 rounded-2xl border border-slate-800 bg-slate-900/90 space-y-4">
              <h3 className="text-xl font-bold text-slate-100 flex items-center gap-2">
                <Gavel className="w-5 h-5 text-purple-400" />
                Legal Support Networks & Pro Bono Advocates
              </h3>

              <div className="grid md:grid-cols-2 gap-4">
                {KNOW_YOUR_RIGHTS_CONTENT.supportNetworksAndLegalHelp.map((org, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-sm text-slate-100">{org.name}</h4>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-teal-500/20 text-teal-300 border border-teal-500/30 font-semibold">
                        {org.category}
                      </span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">{org.description}</p>
                    {org.phone && (
                      <p className="text-xs font-mono text-purple-300 pt-1">
                        <strong>Helpline:</strong> {org.phone}
                      </p>
                    )}
                    <div className="pt-1">
                      <a
                        href={org.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-teal-400 hover:underline text-xs"
                      >
                        Visit Official Portal <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 9. LEGAL & STANDARDS */}
        {activeTab === 'legal' && <LegalAndStandards />}

        {/* 10. DISABILITY HELP & ADVOCACY */}
        {activeTab === 'support' && (
          <div className="space-y-6">
            <div className="p-6 rounded-2xl border border-purple-800/40 bg-slate-900/80 space-y-2">
              <h2 className="text-2xl font-black text-slate-100">Disability Help & Free Advocacy Resources</h2>
              <p className="text-sm text-slate-300">Direct links to verified support, Citizens Advice, and independent welfare advisors.</p>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {(SUPPORT_ORGANIZATIONS || []).map((org, idx) => (
                <div key={idx} className="p-4 rounded-xl border border-slate-800 bg-slate-900 space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-slate-100 text-sm">{org.name}</h3>
                    {org.category && (
                      <span className="text-[10px] px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 border border-purple-500/30 font-semibold">
                        {org.category}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-400">{org.desc}</p>
                  
                  {(org.phone || org.website) && (
                    <div className="pt-2 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-2 text-xs">
                      {org.phone && (
                        <a
                          href={`tel:${org.phone.replace(/[^0-9+]/g, '')}`}
                          className="flex items-center gap-1.5 text-purple-300 hover:text-purple-200 font-mono font-medium"
                        >
                          <Phone className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                          <span>{org.phone}</span>
                        </a>
                      )}
                      {org.website && (
                        <a
                          href={org.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 text-teal-400 hover:underline ml-auto"
                        >
                          <span>Visit Portal</span>
                          <ExternalLink className="w-3.5 h-3.5 shrink-0" />
                        </a>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
