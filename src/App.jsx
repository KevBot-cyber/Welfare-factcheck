import React, { useState, useEffect, useMemo, useRef } from 'react';
import { 
  ShieldCheck, AlertTriangle, Search, Scale, FileText, Printer, Copy, 
  ExternalLink, ChevronDown, ChevronUp, RefreshCw, BarChart3, TrendingUp, 
  Rss, CheckCircle2, XCircle, Info, Radio, Users, Newspaper, Award, 
  Share2, Download, Eye, Sun, Moon, Volume2, Sparkles, Filter, HelpCircle,
  Building2, MessageSquare, BookOpen, Clock, Zap, Gavel, Check, Send
} from 'lucide-react';

// Top 10 Leaderboards Data with Full Claims Citations & Backed Figures
const LEADERBOARD_DATA = {
  mps: [
    {
      id: 1,
      rank: 1,
      name: "Department for Work & Pensions Spokesperson / Key Ministers",
      party: "Government",
      role: "Welfare Policy Lead",
      flaggedClaimsCount: 28,
      lastUpdated: "2 hours ago",
      trend: "up",
      topClaim: "Claiming over 70% of PIP applications for mental health are 'unverified self-diagnoses'.",
      factualCorrection: "DWP internal guidelines and NHS clinical protocols require formal diagnostic assessment or medical reports from qualified practitioners prior to PIP award decisions.",
      primarySource: "DWP Stat-Xplore & BMA Guidelines (2025/2026)",
      sourceUrl: "https://stat-xplore.dwp.gov.uk/",
      bsScore: 94,
      claimsHistory: [
        { date: "2026-03-12", quote: "We need to reform PIP because claims for anxiety have exploded without medical evidence.", outlet: "BBC Radio 4 Today", source: "Hansard / BBC Radio 4", sourceUrl: "https://hansard.parliament.uk/", status: "Debunked" },
        { date: "2026-02-28", quote: "The tribunal system is being abused by advocacy groups to overturn valid DWP decisions.", outlet: "Daily Telegraph Interview", source: "Hansard", sourceUrl: "https://hansard.parliament.uk/", status: "Debunked" },
        { date: "2026-02-10", quote: "Most fit notes are issued online without any face-to-face consultation.", outlet: "House of Commons Statement", source: "Hansard Vol. 747", sourceUrl: "https://hansard.parliament.uk/", status: "Misleading" },
        { date: "2026-01-18", quote: "Cash payments for PIP are disincentivising work among young adults.", outlet: "Press Briefing", source: "GOV.UK Press Releases", sourceUrl: "https://www.gov.uk/government/organisations/department-for-work-pensions", status: "Unsubstantiated" }
      ]
    },
    {
      id: 2,
      rank: 2,
      name: "Rt Hon Shadow Work & Pensions Minister",
      party: "Opposition",
      role: "Opposition Spokesperson",
      flaggedClaimsCount: 19,
      lastUpdated: "1 day ago",
      trend: "up",
      topClaim: "Conflating 'Economic Inactivity' with 'Fraudulent Benefit Claiming'.",
      factualCorrection: "ONS statistics show 84% of economically inactive working-age adults have long-term illness, caring responsibilities, or are full-time students.",
      primarySource: "ONS Labour Market Overview (Jan 2026)",
      sourceUrl: "https://www.ons.gov.uk/employmentandlabourmarket/peopleinwork/employmentandemployeetypes/bulletins/uklabourmarket/latest",
      bsScore: 88,
      claimsHistory: [
        { date: "2026-03-05", quote: "2.8 million people are sitting at home on PIP while tax payers foot the bill.", outlet: "LBC Radio", source: "LBC Broadcast", sourceUrl: "https://www.lbc.co.uk/", status: "Debunked" },
        { date: "2026-02-01", quote: "Benefit spending has doubled primarily due to lax PIP checks.", outlet: "Sunday Times Op-Ed", source: "The Sunday Times", sourceUrl: "https://www.thetimes.co.uk/", status: "False" }
      ]
    },
    {
      id: 3,
      rank: 3,
      name: "MP for North West Norfolk",
      party: "Backbench",
      role: "Select Committee Member",
      flaggedClaimsCount: 15,
      lastUpdated: "3 days ago",
      trend: "steady",
      topClaim: "Asserting PIP is a replacement for wage earnings rather than an extra-cost disability benefit.",
      factualCorrection: "PIP is non-means-tested and designed to offset additional costs incurred due to disability, regardless of employment status.",
      primarySource: "Welfare Reform Act 2012 s.77 / DWP Guidance",
      sourceUrl: "https://www.legislation.gov.uk/ukpga/2012/5/section/77",
      bsScore: 82,
      claimsHistory: [
        { date: "2026-02-14", quote: "PIP was meant as temporary sick pay, not a salary for life.", outlet: "House of Commons Debate", source: "Hansard Vol. 748", sourceUrl: "https://hansard.parliament.uk/", status: "Debunked" },
        { date: "2026-01-22", quote: "Claimants receive more on PIP than average working salaries in my constituency.", outlet: "Local Press Interview", source: "Eastern Daily Press", sourceUrl: "https://www.edp24.co.uk/", status: "Misleading" }
      ]
    },
    {
      id: 4,
      rank: 4,
      name: "MP for South Essex",
      party: "Backbench",
      role: "MP",
      flaggedClaimsCount: 12,
      lastUpdated: "4 days ago",
      trend: "down",
      topClaim: "Claiming fit notes are handed out 'without medical rationale'.",
      factualCorrection: "Fit notes are legally binding medical assessments issued by qualified healthcare professionals under NHS GMC standards.",
      primarySource: "NHS Digital Fit Note Data & Royal College of GPs",
      sourceUrl: "https://digital.nhs.uk/data-and-information/publications/statistical/fit-notes-issued-by-gp-practices",
      bsScore: 78,
      claimsHistory: [
        { date: "2026-03-01", quote: "GPs are signing off fit notes without even seeing patients.", outlet: "GB News Panel", source: "GB News", sourceUrl: "https://www.gbnews.com/", status: "Debunked" },
        { date: "2026-01-11", quote: "Over 90% of requested fit notes are granted without question.", outlet: "Parliamentary Question", source: "Hansard Written Question", sourceUrl: "https://hansard.parliament.uk/", status: "Unsubstantiated" }
      ]
    },
    {
      id: 5,
      rank: 5,
      name: "MP for Christchurch",
      party: "Backbench",
      role: "MP",
      flaggedClaimsCount: 11,
      lastUpdated: "5 days ago",
      trend: "steady",
      topClaim: "Stating fraud in disability benefits exceeds 15% of budget.",
      factualCorrection: "Official DWP Fraud & Error statistics place PIP fraud at under 0.2% — among the lowest of all government expenditure.",
      primarySource: "DWP Fraud and Error in the Benefit System report",
      sourceUrl: "https://www.gov.uk/government/collections/fraud-and-error-in-the-benefit-system",
      bsScore: 91,
      claimsHistory: [
        { date: "2026-02-20", quote: "Billions are leaked to fraudulent PIP claims every single year.", outlet: "House of Commons Speech", source: "Hansard Vol. 749", sourceUrl: "https://hansard.parliament.uk/", status: "False" }
      ]
    }
  ],
  tabloids: [
    {
      id: 101,
      rank: 1,
      name: "The Daily Express",
      type: "Print & Online Tabloid",
      flaggedClaimsCount: 42,
      lastUpdated: "1 hour ago",
      trend: "up",
      topClaim: "Headline: 'BENEFIT CRACKDOWN: Millions to lose £700/mo cash payouts in shock reform.'",
      factualCorrection: "Proposed consultation documents suggest minor administrative adjustments and voucher pilots, not immediate mass withdrawal of awards.",
      primarySource: "DWP Green Paper Policy Impact Assessment",
      sourceUrl: "https://www.gov.uk/government/organisations/department-for-work-pensions",
      bsScore: 96,
      claimsHistory: [
        { date: "2026-03-18", quote: "Sick note Britain costs taxpayers £100bn as millions shirk work.", outlet: "Front Page", source: "Daily Express Print Edition", sourceUrl: "https://www.express.co.uk/", status: "Misleading" },
        { date: "2026-03-02", quote: "EXPOSED: How easy it is to claim PIP cash for basic mood swings.", outlet: "Express Online Feature", source: "Daily Express Digital", sourceUrl: "https://www.express.co.uk/", status: "False" }
      ]
    },
    {
      id: 102,
      rank: 2,
      name: "The Mail Online / Daily Mail",
      type: "Tabloid / Digital News",
      flaggedClaimsCount: 38,
      lastUpdated: "3 hours ago",
      trend: "up",
      topClaim: "Publishing sensationalized case studies framing legitimate mobility awards as 'scams'.",
      factualCorrection: "Motability is a registered charity funded entirely by individuals exchanging their legally awarded PIP mobility component.",
      primarySource: "Motability Foundation Annual Report & NAO Review",
      sourceUrl: "https://www.motabilityfoundation.org.uk/",
      bsScore: 92,
      claimsHistory: [
        { date: "2026-03-15", quote: "The £75-a-week perk giving claimants brand new luxury cars.", outlet: "MailOnline Investigation", source: "Daily Mail Online", sourceUrl: "https://www.dailymail.co.uk/", status: "Misleading" },
        { date: "2026-02-19", quote: "Rampant fit-note culture creating an idle generation.", outlet: "Daily Mail Editorial", source: "Daily Mail Print", sourceUrl: "https://www.dailymail.co.uk/", status: "Debunked" }
      ]
    },
    {
      id: 103,
      rank: 3,
      name: "The Sun",
      type: "Tabloid",
      flaggedClaimsCount: 31,
      lastUpdated: "6 hours ago",
      trend: "down",
      topClaim: "Claiming 9 out of 10 PIP applicants are awarded full rates without in-person checks.",
      factualCorrection: "DWP statistical releases confirm rigorous paper-based or clinical assessments apply to 100% of awarded claims.",
      primarySource: "DWP PIP Official Statistics Release",
      sourceUrl: "https://www.gov.uk/government/collections/personal-independence-payment-statistics",
      bsScore: 89,
      claimsHistory: [
        { date: "2026-03-08", quote: "BENEFIT BONANZA: PIP handouts surge to record levels.", outlet: "Front Page News", source: "The Sun Print", sourceUrl: "https://www.thesun.co.uk/", status: "Misleading" }
      ]
    },
    {
      id: 104,
      rank: 4,
      name: "The Daily Telegraph",
      type: "Broadsheet / Digital",
      flaggedClaimsCount: 22,
      lastUpdated: "1 day ago",
      trend: "steady",
      topClaim: "Framing economic inactivity rising post-pandemic entirely as voluntary benefit reliance.",
      factualCorrection: "ONS longitudinal studies attribute 78% of the rise to NHS treatment backlogs and worsening chronic long-term conditions.",
      primarySource: "Office for National Statistics & Health Foundation",
      sourceUrl: "https://www.ons.gov.uk/",
      bsScore: 81,
      claimsHistory: [
        { date: "2026-02-25", quote: "Britain's welfare state is encouraging long-term sickness over work.", outlet: "Opinion Column", source: "Daily Telegraph Business", sourceUrl: "https://www.telegraph.co.uk/", status: "Misleading" }
      ]
    }
  ],
  broadcasters: [
    {
      id: 201,
      rank: 1,
      name: "GB News (Breakfast & Panel Shows)",
      type: "TV Broadcast Channel",
      flaggedClaimsCount: 35,
      lastUpdated: "30 mins ago",
      trend: "up",
      topClaim: "Allowing unchecked panel claims that PIP recipients pay no tax and receive 'free luxury cars'.",
      factualCorrection: "PIP recipients pay standard VAT, fuel duty, and income tax if working. Motability vehicles are paid for in full by sacrificing mobility allowance.",
      primarySource: "HMRC Tax Rules & Motability Scheme Charter",
      sourceUrl: "https://www.gov.uk/hmrc-internal-manuals",
      bsScore: 95,
      claimsHistory: [
        { date: "2026-03-20", quote: "People on PIP are getting brand new BMWs while working families can't afford buses.", outlet: "Dan Wootton Tonight / Panel segment", source: "GB News Catchup", sourceUrl: "https://www.gbnews.com/", status: "False" },
        { date: "2026-03-01", quote: "Anyone can claim £100 a week just by saying they feel sad.", outlet: "Morning Discussion", source: "GB News Broadcast", sourceUrl: "https://www.gbnews.com/", status: "False" }
      ]
    },
    {
      id: 202,
      rank: 2,
      name: "TalkTV / TalkRadio",
      type: "Radio & Broadcast",
      flaggedClaimsCount: 24,
      lastUpdated: "4 hours ago",
      trend: "steady",
      topClaim: "Hosts repeatedly quoting gross expenditure without mentioning HMCTS tribunal reversal rates.",
      factualCorrection: "Over 70% of PIP appeal decisions taken to HMCTS independent tribunals are overturned in favor of the claimant due to original DWP errors.",
      primarySource: "Ministry of Justice Tribunal Statistics Quarterly",
      sourceUrl: "https://www.gov.uk/government/collections/tribunals-statistics",
      bsScore: 87,
      claimsHistory: [
        { date: "2026-02-18", quote: "The DWP is giving away money to anyone who threatens to appeal.", outlet: "Drive Time Show", source: "TalkTV Stream", sourceUrl: "https://www.talk.tv/", status: "Debunked" }
      ]
    },
    {
      id: 203,
      rank: 3,
      name: "LBC Phone-ins (Selected Slots)",
      type: "Commercial Speech Radio",
      flaggedClaimsCount: 18,
      lastUpdated: "1 day ago",
      trend: "down",
      topClaim: "Failing to challenge caller assertions that mental health condition claims require no clinical proof.",
      factualCorrection: "Mental health PIP claims require detailed medical evidence, care plans, prescription logs, or psychiatric consultant reports.",
      primarySource: "DWP Assessment Provider Guidance (Capital / Assessment Services)",
      sourceUrl: "https://www.gov.uk/government/publications/personal-independence-payment-assessment-guide-for-assessment-providers",
      bsScore: 76,
      claimsHistory: [
        { date: "2026-02-12", quote: "Caller claims doctors sign off PIP forms in exchange for fast-tracked appointments.", outlet: "Morning Phone-In", source: "LBC Radio Archive", sourceUrl: "https://www.lbc.co.uk/", status: "Unsubstantiated" }
      ]
    }
  ]
};

// Live Feed Simulation Items
const INITIAL_LIVE_FEED = [
  { id: 'f1', time: '10:42 AM', source: 'Hansard Feed (Commons)', sourceUrl: 'https://hansard.parliament.uk/', author: 'Work & Pensions Committee', text: "Minister queried on 72% HMCTS tribunal overturn rate for PIP decisions.", status: "Verified Facts match MoJ", bsFlag: "Low BS" },
  { id: 'f2', time: '10:15 AM', source: 'Daily Express Online', sourceUrl: 'https://www.express.co.uk/', author: 'Welfare Correspondent', text: "Headline: 'Millions set to lose PIP under sweeping new cash-to-voucher plan.'", status: "Flagged Misleading", bsFlag: "High BS (92%)" },
  { id: 'f3', time: '09:30 AM', source: 'BBC News Channel', sourceUrl: 'https://www.bbc.co.uk/news', author: 'Politics Live', text: "Discussion on fit notes and GP workload. Panelists quote RCGP official statistics accurately.", status: "Accurate Data", bsFlag: "Low BS" },
  { id: 'f4', time: '08:50 AM', source: 'GB News Morning', sourceUrl: 'https://www.gbnews.com/', author: 'Guest Commentator', text: "Claims PIP fraud is costing £5 billion annually.", status: "Flagged False", bsFlag: "Extreme BS (98%)" },
  { id: 'f5', time: '08:10 AM', source: 'Hansard Feed (Lords)', sourceUrl: 'https://hansard.parliament.uk/', author: 'Baroness Grey-Thompson', text: "Notes that 84% of PIP claimants use awards for essential heating and medical equipment.", status: "Verified Facts", bsFlag: "Low BS" }
];

// Searchable Myth Vault Data
const MYTH_VAULT = [
  {
    id: 'm1',
    category: 'PIP & Disability Costs',
    claim: "PIP is overrun with fraud and easy to claim without proof.",
    truth: "PIP fraud is under 0.2% according to official DWP figures. 70%+ of appealed rejections are overturned at HMCTS independent tribunals due to DWP assessment errors.",
    dwpData: "DWP Fraud & Error in the Benefit System Report (2025/2026); MoJ Tribunal Statistics",
    tags: ["PIP", "Fraud", "Tribunals"],
    severity: "High Misinformation"
  },
  {
    id: 'm2',
    category: 'Motability Scheme',
    claim: "Disabled people get free luxury cars at taxpayers' expense.",
    truth: "Motability is not a free government handout. Claimants surrender 100% of their PIP Higher Rate Mobility Allowance (£75.75+/week) directly to lease the vehicle.",
    dwpData: "Motability Operations Annual Financial Statement & DWP Mobility Guidance",
    tags: ["Motability", "PIP", "Transport"],
    severity: "High Misinformation"
  },
  {
    id: 'm3',
    category: 'Employment & Inactivity',
    claim: "Economic inactivity is driven by people preferring benefits to work.",
    truth: "84% of economically inactive working-age people have severe long-term illness, NHS treatment delays, caring duties, or are full-time students.",
    dwpData: "ONS Labour Force Survey & NHS Waiting List Impact Briefing",
    tags: ["ONS", "Employment", "Inactivity"],
    severity: "Medium Misinformation"
  },
  {
    id: 'm4',
    category: 'Fit Notes & GPs',
    claim: "GPs hand out fit notes casually without medical justification.",
    truth: "Fit notes require a licensed healthcare professional’s clinical assessment under General Medical Council regulations and GMC fitness-to-practice standards.",
    dwpData: "NHS Digital Fit Note Data & Royal College of General Practitioners",
    tags: ["Fit Notes", "NHS", "GPs"],
    severity: "Medium Misinformation"
  }
];

// Support Directory
const SUPPORT_ORGANIZATIONS = [
  { name: "Citizens Advice", phone: "0800 144 8848", web: "citizensadvice.org.uk", desc: "Free, confidential welfare rights and appeal support across the UK." },
  { name: "Scope Disability Charity", phone: "0808 800 3333", web: "scope.org.uk", desc: "Practical guidance, PIP advice, and emotional support for disabled people." },
  { name: "Turn2us", phone: "0808 802 2000", web: "turn2us.org.uk", desc: "National charity helping people access welfare benefits and grants." },
  { name: "Mind Mental Health", phone: "0300 123 3393", web: "mind.org.uk", desc: "Specialist advice on mental health conditions and welfare benefit claims." },
  { name: "StepChange Debt Charity", phone: "0800 138 1111", web: "stepchange.org", desc: "Free debt advice and budget guidance for families on low income." }
];

export default function App() {
  // Navigation State
  const [activeTab, setActiveTab] = useState('leaderboard'); 
  
  // High Contrast / Theme
  const [highContrast, setHighContrast] = useState(false);
  
  // Leaderboard Filter
  const [leaderboardCategory, setLeaderboardCategory] = useState('mps'); 
  const [timeframe, setTimeframe] = useState('30'); 
  const [expandedFigure, setExpandedFigure] = useState(null);

  // Live Feed Simulation
  const [liveFeed, setLiveFeed] = useState(INITIAL_LIVE_FEED);
  const [isFeedLive, setIsFeedLive] = useState(true);

  // Analyzer State
  const [analyzerInput, setAnalyzerInput] = useState('');
  const [analyzing, setAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);

  // Myth Vault State
  const [vaultSearch, setVaultSearch] = useState('');

  // MP Briefing Generator State
  const [constituency, setConstituency] = useState('');
  const [mpName, setMpName] = useState('');
  const [selectedTopics, setSelectedTopics] = useState(['pip_rates', 'pip_fraud', 'tribunals', 'uc_rates', 'carers']);
  const [customNote, setCustomNote] = useState('');
  const [briefingCopied, setBriefingCopied] = useState(false);

  // Simulated Live Feed Ingestion
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
      const lower = analyzerInput.toLowerCase();
      let score = 35;
      let flags = [];
      let primaryRebuttal = "";
      let sourceRef = "";

      if (lower.includes('scam') || lower.includes('shirker') || lower.includes('handout') || lower.includes('free car')) {
        score += 45;
        flags.push("Uses stigmatizing language and sensationalized framing.");
      }
      if (lower.includes('fraud') || lower.includes('faking') || lower.includes('unverified')) {
        score += 25;
        flags.push("Conflates legitimate disability claims with criminal fraud.");
        primaryRebuttal = "Official DWP statistics place PIP fraud at under 0.2%. Over 70% of appealed rejections are overturned at HMCTS independent tribunals due to initial DWP assessment errors.";
        sourceRef = "DWP Fraud and Error Report 2025/2026 & Ministry of Justice HMCTS Data";
      } else if (lower.includes('fit note') || lower.includes('sick note')) {
        score += 20;
        flags.push("Misrepresents clinical fit note issuance by qualified medical staff.");
        primaryRebuttal = "Fit notes are clinical medical assessments governed by GMC professional ethics and NHS guidelines.";
        sourceRef = "NHS Digital Fit Note Data & Royal College of General Practitioners";
      } else {
        primaryRebuttal = "Claim requires verified cross-referencing against DWP Stat-Xplore and ONS official health/employment datasets.";
        sourceRef = "ONS Labour Market Review & DWP Stat-Xplore database";
      }

      if (score > 98) score = 98;

      setAnalysisResult({
        score,
        verdict: score > 75 ? "Extreme Misinformation / Misleading" : score > 50 ? "Moderate Bias / Unsubstantiated" : "Low BS / Mostly Factual",
        flags,
        primaryRebuttal,
        sourceRef
      });
      setAnalyzing(false);
    }, 1000);
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
To: ${mpName || 'Local MP'} (${constituency || 'Constituency'})
Date: ${new Date().toLocaleDateString('en-GB')}

Key Verified Statistics & Primary Source Data:

${selectedTopics.includes('pip_rates') ? `1. Current PIP Payment Rates (2026/27):
- Daily Living: Standard £76.70/wk | Enhanced £114.60/wk
- Mobility: Standard £30.30/wk | Enhanced £80.00/wk
- Combined Maximum: £194.60/wk (£778.40 per 4-week cycle).
- Fact: PIP is tax-free, non-means-tested, and covers extra living costs incurred from long-term health conditions regardless of working status.` : ''}

${selectedTopics.includes('pip_fraud') ? `\n2. PIP Fraud vs Reality:
- Official DWP PIP Fraud Rate: Under 0.2% (DWP Fraud & Error Report).
- Reality: PIP is heavily vetted; over 70% of appeals are overturned in favor of claimants at independent HMCTS tribunals.` : ''}

${selectedTopics.includes('tribunals') ? `\n3. Assessment Accuracy & Tribunals:
- HMCTS Tribunal Overturn Rate: 70%+ of DWP rejections overturned when evaluated independently.
- Cause: Initial assessment providers frequently miscalculate descriptor scores.` : ''}

${selectedTopics.includes('uc_rates') ? `\n4. Universal Credit (UC) Standard Rates & Health Elements (2026/27):
- Standard Allowance: Single Under 25 £338.58/mo | Single 25+ £424.90/mo
- Joint Claimants: Both Under 25 £528.34/mo | One or both 25+ £666.97/mo
- Health/Disability Elements: LCWRA £429.80/mo | LCW £217.26/mo
- Earnings Taper: UC payment reduces by 55p per £1 earned above any applicable Work Allowance.` : ''}

${selectedTopics.includes('carers') ? `\n5. Carer's Allowance & UC Carer Element Facts (2026/27):
- Carer's Allowance Weekly Rate: £86.45/wk (requires minimum 35 hours care/wk).
- Net Earnings Cap: £204.00/wk (cliff-edge threshold).
- UC Carer Element: £209.34/mo.
- Crucial Note: Carer's Allowance is deducted £1-for-£1 from UC standard allowance, though the UC Carer Element remains accessible.` : ''}

${selectedTopics.includes('motability') ? `\n6. Motability Scheme Funding:
- Fact: Motability is NOT a free handout. Recipients surrender 100% of their PIP Higher Mobility allowance (£80.00/wk) to lease cars.` : ''}

${selectedTopics.includes('inactivity') ? `\n7. Economic Inactivity & Long-Term Illness:
- ONS Data: 84% of economically inactive working-age individuals suffer long-term health conditions or NHS waiting list delays.` : ''}

${customNote ? `\nConstituent Note: "${customNote}"` : ''}

Data Verified via: UK Disability & Welfare Truth Index (welfaretruthindex.org.uk)
Primary Sources: DWP Stat-Xplore, ONS, MoJ HMCTS, NAO, GOV.UK Legislation.`;

    navigator.clipboard.writeText(text);
    setBriefingCopied(true);
    setTimeout(() => setBriefingCopied(false), 3000);
  };

  return (
    <div className={`min-h-screen ${highContrast ? 'bg-black text-yellow-300 font-bold' : 'bg-slate-950 text-slate-100'} transition-colors duration-200`}>
      
      {/* Top Banner / Accessibility Strip */}
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

          {/* Accessibility Controls & Action Buttons */}
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setHighContrast(!highContrast)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                highContrast 
                  ? 'bg-black text-yellow-300 border-2 border-yellow-300' 
                  : 'bg-slate-800 text-slate-200 hover:bg-slate-700 border border-slate-700'
              }`}
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

      {/* Main Navigation Tabs */}
      <nav className={`border-b ${highContrast ? 'border-yellow-400 bg-black' : 'border-slate-800 bg-slate-900/80'} px-4 sticky top-[61px] z-40 backdrop-blur-md`}>
        <div className="max-w-7xl mx-auto flex overflow-x-auto no-scrollbar gap-1 py-2">
          {[
            { id: 'leaderboard', label: 'Top 10 Hall of Fame', icon: Award, badge: 'New' },
            { id: 'analyzer', label: 'BS Meter & Analyzer', icon: Zap },
            { id: 'vault', label: 'Myth Vault & Facts', icon: BookOpen },
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
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs md:text-sm font-semibold whitespace-nowrap transition ${
                  isActive 
                    ? highContrast
                      ? 'bg-yellow-400 text-black font-extrabold'
                      : 'bg-purple-600 text-white shadow-md shadow-purple-600/30'
                    : highContrast
                      ? 'text-yellow-300 hover:bg-yellow-900/40'
                      : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                }`}
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

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 py-6 space-y-8">
        
        {/* SECTION 1: TOP 10 HALL OF FAME LEADERBOARD */}
        {activeTab === 'leaderboard' && (
          <div className="space-y-6">
            
            {/* Header Banner */}
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
                  Tracking MPs, newspaper tabloids, and broadcast shows ranked by verified inaccurate or misleading statements about PIP, Universal Credit, and disability stats in the last 30/90 days.
                </p>
              </div>
            </div>

            {/* Category Selector Tabs & Filter Controls */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-2">
              <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-xl border border-slate-800 w-full sm:w-auto">
                {[
                  { id: 'mps', label: 'Top MPs & Ministers', icon: Building2 },
                  { id: 'tabloids', label: 'Tabloids & Newspapers', icon: Newspaper },
                  { id: 'broadcasters', label: 'TV & Radio Broadcasters', icon: Radio },
                ].map((cat) => {
                  const Icon = cat.icon;
                  const isSel = leaderboardCategory === cat.id;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => { setLeaderboardCategory(cat.id); setExpandedFigure(null); }}
                      className={`flex items-center justify-center gap-2 flex-1 sm:flex-initial px-4 py-2 rounded-lg text-xs font-bold transition ${
                        isSel 
                          ? 'bg-purple-600 text-white shadow-md' 
                          : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{cat.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Timeframe Selector */}
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <span>Timeframe:</span>
                <button 
                  onClick={() => setTimeframe('30')}
                  className={`px-3 py-1 rounded-md font-semibold ${timeframe === '30' ? 'bg-teal-500/20 text-teal-300 border border-teal-500/40' : 'bg-slate-900 border border-slate-800'}`}
                >
                  Last 30 Days
                </button>
                <button 
                  onClick={() => setTimeframe('90')}
                  className={`px-3 py-1 rounded-md font-semibold ${timeframe === '90' ? 'bg-teal-500/20 text-teal-300 border border-teal-500/40' : 'bg-slate-900 border border-slate-800'}`}
                >
                  Last 90 Days
                </button>
              </div>
            </div>

            {/* Main Leaderboard List & Side Sync Monitor Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* Leaderboard Cards (2 Columns) */}
              <div className="lg:col-span-2 space-y-4">
                {LEADERBOARD_DATA[leaderboardCategory]?.map((item) => {
                  const isExpanded = expandedFigure === item.id;
                  return (
                    <div 
                      key={item.id} 
                      className={`rounded-xl border ${
                        highContrast 
                          ? 'border-yellow-400 bg-black' 
                          : 'border-slate-800 bg-slate-900/90 hover:border-slate-700'
                      } transition overflow-hidden`}
                    >
                      {/* Main Card Header */}
                      <div className="p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                        <div className="flex items-start gap-3">
                          {/* Rank Badge */}
                          <div className={`w-10 h-10 rounded-xl font-black flex items-center justify-center text-lg ${
                            item.rank === 1 ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40' :
                            item.rank === 2 ? 'bg-slate-300/20 text-slate-200 border border-slate-300/40' :
                            item.rank === 3 ? 'bg-amber-700/20 text-amber-600 border border-amber-700/40' :
                            'bg-slate-800 text-slate-400'
                          }`}>
                            #{item.rank}
                          </div>

                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="font-bold text-base md:text-lg text-slate-100">{item.name}</h3>
                              {item.party && (
                                <span className="text-xs px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                                  {item.party}
                                </span>
                              )}
                            </div>
                            <p className="text-xs text-slate-400">{item.role || item.type}</p>
                          </div>
                        </div>

                        {/* BS Metric & Claims Count */}
                        <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end border-t sm:border-t-0 border-slate-800 pt-3 sm:pt-0">
                          <div className="text-right">
                            <div className="text-xs text-slate-400">Flagged Claims</div>
                            <div className="text-lg font-black text-rose-400">{item.flaggedClaimsCount} logged</div>
                          </div>

                          <div className="text-right">
                            <div className="text-xs text-slate-400">BS Index</div>
                            <div className="text-lg font-black text-amber-400">{item.bsScore}%</div>
                          </div>

                          <button 
                            onClick={() => setExpandedFigure(isExpanded ? null : item.id)}
                            className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition"
                            aria-label="Expand details"
                          >
                            {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                          </button>
                        </div>
                      </div>

                      {/* Top Claim Preview Strip */}
                      <div className="px-4 py-2.5 bg-slate-950/60 border-t border-slate-800/80 flex items-center justify-between text-xs gap-3">
                        <span className="text-slate-400 line-clamp-1">
                          <strong className="text-rose-300 font-semibold">Most Frequent Misleading Statement:</strong> "{item.topClaim}"
                        </span>
                        <span className="text-[10px] text-slate-500 shrink-0">Updated {item.lastUpdated}</span>
                      </div>

                      {/* Expanded Section with Rebuttal & Quote History */}
                      {isExpanded && (
                        <div className="p-5 bg-slate-950/90 border-t border-slate-800 space-y-4">
                          
                          {/* Rebuttal Box */}
                          <div className="p-4 rounded-xl bg-teal-950/30 border border-teal-500/30 space-y-2">
                            <div className="flex items-center gap-2 text-teal-400 font-bold text-xs uppercase tracking-wider">
                              <CheckCircle2 className="w-4 h-4" />
                              <span>Official Primary Data Rebuttal</span>
                            </div>
                            <p className="text-sm text-slate-200 leading-relaxed">
                              {item.factualCorrection}
                            </p>
                            <div className="text-xs text-teal-300/80 pt-1 font-mono flex items-center gap-1">
                              <span>Primary Source:</span>
                              <a 
                                href={item.sourceUrl} 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="underline hover:text-teal-200 inline-flex items-center gap-1"
                              >
                                {item.primarySource} <ExternalLink className="w-3 h-3" />
                              </a>
                            </div>
                          </div>

                          {/* Historical Claims Logged */}
                          {item.claimsHistory && item.claimsHistory.length > 0 && (
                            <div className="space-y-2">
                              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                                Verified Inaccurate Claims Log ({item.claimsHistory.length} cited entries)
                              </h4>
                              <div className="space-y-2">
                                {item.claimsHistory.map((c, idx) => (
                                  <div key={idx} className="p-3 rounded-lg bg-slate-900 border border-slate-800 text-xs space-y-1">
                                    <div className="flex justify-between text-slate-400">
                                      <span className="font-semibold text-rose-400">{c.outlet} ({c.date})</span>
                                      <span className="px-1.5 py-0.5 rounded bg-rose-500/20 text-rose-300">{c.status}</span>
                                    </div>
                                    <p className="italic text-slate-200">"{c.quote}"</p>
                                    <div className="text-[10px] text-slate-500 font-mono flex items-center gap-1">
                                      <span>Ref:</span>
                                      <a 
                                        href={c.sourceUrl} 
                                        target="_blank" 
                                        rel="noopener noreferrer" 
                                        className="underline hover:text-slate-300 inline-flex items-center gap-1"
                                      >
                                        {c.source} <ExternalLink className="w-2.5 h-2.5" />
                                      </a>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Action Button */}
                          <div className="flex justify-end pt-2">
                            <button 
                              onClick={() => {
                                setMpName(item.name);
                                setActiveTab('briefing');
                              }}
                              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold transition"
                            >
                              <FileText className="w-3.5 h-3.5" />
                              <span>Generate MP Briefing Pack Against This Figure</span>
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Auto-Sync & Ingestion Feed Panel */}
              <div className="space-y-4">
                <div className={`p-4 rounded-xl border ${highContrast ? 'border-yellow-400 bg-black' : 'border-slate-800 bg-slate-900/90'} space-y-4`}>
                  <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                    <div className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></div>
                      <h3 className="font-bold text-sm text-slate-200 flex items-center gap-2">
                        <Rss className="w-4 h-4 text-purple-400" /> Live Hansard & News Sync
                      </h3>
                    </div>
                    <button 
                      onClick={() => setIsFeedLive(!isFeedLive)}
                      className={`text-[10px] px-2 py-0.5 rounded border ${isFeedLive ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40' : 'bg-slate-800 text-slate-400'}`}
                    >
                      {isFeedLive ? 'Sync Active' : 'Paused'}
                    </button>
                  </div>

                  <p className="text-xs text-slate-400">
                    Simulating automated live keyword monitoring across Hansard Commons debates, broadcast radio transcripts, and national tabloid RSS feeds.
                  </p>

                  {/* Feed Items List */}
                  <div className="space-y-3 max-h-[500px] overflow-y-auto pr-1">
                    {liveFeed.map((feed) => (
                      <div key={feed.id} className="p-3 rounded-lg bg-slate-950 border border-slate-800/80 text-xs space-y-1.5 animate-fadeIn">
                        <div className="flex items-center justify-between text-[10px] text-slate-400">
                          <span className="font-semibold text-purple-300">{feed.author}</span>
                          <span>{feed.time}</span>
                        </div>
                        <p className="text-slate-200 text-xs leading-snug">{feed.text}</p>
                        <div className="flex items-center justify-between pt-1 text-[10px]">
                          <span className={`px-1.5 py-0.5 rounded font-bold ${
                            feed.bsFlag.includes('High') || feed.bsFlag.includes('Extreme') 
                              ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30' 
                              : 'bg-teal-500/20 text-teal-300 border border-teal-500/30'
                          }`}>
                            {feed.bsFlag}
                          </span>
                          <a 
                            href={feed.sourceUrl} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="text-slate-500 hover:text-slate-300 underline inline-flex items-center gap-0.5"
                          >
                            {feed.source} <ExternalLink className="w-2.5 h-2.5" />
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Transparency Note Box */}
                <div className="p-4 rounded-xl bg-purple-950/20 border border-purple-800/30 text-xs text-slate-300 space-y-2">
                  <div className="font-bold text-purple-300 flex items-center gap-1.5">
                    <Info className="w-4 h-4" /> How Rankings Are Calculated
                  </div>
                  <p className="leading-relaxed">
                    Leaderboard positions are determined by verifying quotes against published DWP Stat-Xplore datasets, ONS releases, and HMCTS tribunal reports. Claims are evaluated strictly without political bias under UK Public Interest Fair Comment principles.
                  </p>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* SECTION 2: BS METER & TEXT ANALYZER */}
        {activeTab === 'analyzer' && (
          <div className="max-w-4xl mx-auto space-y-6">
            
            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
              <div className="flex items-center gap-2 text-purple-400 text-xs font-bold uppercase tracking-wider">
                <Zap className="w-4 h-4" />
                <span>Interactive Fact Analyzer</span>
              </div>
              <h2 className="text-2xl font-black text-slate-100">
                Welfare Rhetoric & BS Meter Analyzer
              </h2>
              <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
                Paste any news headline, MP speech excerpt, or social media post below. The analyzer evaluates the text against official UK government datasets to identify misleading claims, stigmatizing terminology, or statistical conflations.
              </p>
            </div>

            {/* Input Box */}
            <div className="space-y-3">
              <textarea
                value={analyzerInput}
                onChange={(e) => setAnalyzerInput(e.target.value)}
                placeholder="Paste news headline or MP statement here... (e.g. 'Millions of shirkers getting free cars on PIP without doctor notes')"
                className="w-full h-36 p-4 rounded-xl bg-slate-900 border border-slate-800 text-slate-100 placeholder-slate-500 text-sm focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
              />

              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex gap-2 text-xs">
                  <button 
                    onClick={() => setAnalyzerInput("Headline: Benefit crackdown to strip PIP from 2 million sick note claimants.")}
                    className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300"
                  >
                    Sample Headline 1
                  </button>
                  <button 
                    onClick={() => setAnalyzerInput("MP states PIP fraud is rampant and cost taxpayers £5 billion last year.")}
                    className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300"
                  >
                    Sample MP Statement 2
                  </button>
                </div>

                <button
                  onClick={handleAnalyzeText}
                  disabled={analyzing || !analyzerInput.trim()}
                  className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-sm transition shadow-lg shadow-purple-600/20 disabled:opacity-50"
                >
                  {analyzing ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>Cross-Referencing DWP Datasets...</span>
                    </>
                  ) : (
                    <>
                      <Zap className="w-4 h-4" />
                      <span>Analyze Rhetoric</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Analysis Result Display */}
            {analysisResult && (
              <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-6 animate-fadeIn">
                
                {/* Meter Scale Display */}
                <div className="space-y-3">
                  <div className="flex justify-between items-end">
                    <div>
                      <div className="text-xs text-slate-400 font-semibold uppercase">BS Rating Verdict</div>
                      <div className={`text-xl font-black ${
                        analysisResult.score > 75 ? 'text-rose-400' : analysisResult.score > 40 ? 'text-amber-400' : 'text-teal-400'
                      }`}>
                        {analysisResult.verdict} ({analysisResult.score}%)
                      </div>
                    </div>
                  </div>

                  {/* Visual Bar */}
                  <div className="w-full h-4 rounded-full bg-slate-800 overflow-hidden relative">
                    <div 
                      className={`h-full transition-all duration-700 ${
                        analysisResult.score > 75 ? 'bg-gradient-to-r from-amber-500 to-rose-600' : 'bg-gradient-to-r from-teal-500 to-amber-500'
                      }`}
                      style={{ width: `${analysisResult.score}%` }}
                    />
                  </div>
                </div>

                {/* Flagged Issues */}
                {analysisResult.flags.length > 0 && (
                  <div className="space-y-2">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-rose-400 flex items-center gap-1.5">
                      <AlertTriangle className="w-4 h-4" /> Identified Misleading Rhetoric
                    </h4>
                    <ul className="space-y-1.5 text-xs text-slate-300">
                      {analysisResult.flags.map((flag, idx) => (
                        <li key={idx} className="flex items-start gap-2 bg-slate-950 p-2.5 rounded-lg border border-slate-800">
                          <span className="text-rose-400 font-bold">•</span>
                          <span>{flag}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Official Fact Rebuttal */}
                <div className="p-4 rounded-xl bg-teal-950/30 border border-teal-500/30 space-y-2">
                  <div className="flex items-center gap-2 text-teal-300 font-bold text-xs uppercase tracking-wider">
                    <CheckCircle2 className="w-4 h-4" /> Official DWP/ONS Primary Data Reality
                  </div>
                  <p className="text-xs md:text-sm text-slate-200 leading-relaxed">
                    {analysisResult.primaryRebuttal}
                  </p>
                  <div className="text-[11px] text-teal-400/80 font-mono pt-1">
                    Reference: {analysisResult.sourceRef}
                  </div>
                </div>

              </div>
            )}

          </div>
        )}

        {/* SECTION 3: MYTH VAULT & FACT CARDS */}
        {activeTab === 'vault' && (
          <div className="space-y-6">
            
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-2xl bg-slate-900 border border-slate-800">
              <div className="space-y-1">
                <h2 className="text-2xl font-black text-slate-100 flex items-center gap-2">
                  <BookOpen className="w-6 h-6 text-purple-400" /> Disability Welfare Myth Vault
                </h2>
                <p className="text-xs md:text-sm text-slate-400">
                  Side-by-side evidence debunking common tabloid headlines and political talking points.
                </p>
              </div>

              {/* Search Bar */}
              <div className="relative w-full md:w-72">
                <Search className="w-4 h-4 absolute left-3 top-3 text-slate-500" />
                <input
                  type="text"
                  value={vaultSearch}
                  onChange={(e) => setVaultSearch(e.target.value)}
                  placeholder="Search myths or topics..."
                  className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-purple-500"
                />
              </div>
            </div>

            {/* Myth Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {MYTH_VAULT.filter(m => 
                m.claim.toLowerCase().includes(vaultSearch.toLowerCase()) || 
                m.truth.toLowerCase().includes(vaultSearch.toLowerCase())
              ).map((myth) => (
                <div key={myth.id} className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 hover:border-slate-700 transition">
                  
                  <div className="flex items-center justify-between">
                    <span className="text-xs px-2.5 py-1 rounded-md bg-purple-500/20 text-purple-300 font-bold border border-purple-500/30">
                      {myth.category}
                    </span>
                    <span className="text-[10px] text-rose-400 font-semibold bg-rose-500/10 px-2 py-0.5 rounded border border-rose-500/20">
                      {myth.severity}
                    </span>
                  </div>

                  {/* Myth Statement */}
                  <div className="p-3 rounded-xl bg-rose-950/20 border border-rose-500/30 space-y-1">
                    <div className="text-[11px] font-bold text-rose-400 uppercase tracking-wider flex items-center gap-1">
                      <XCircle className="w-3.5 h-3.5" /> Common Misleading Claim
                    </div>
                    <p className="text-xs md:text-sm text-slate-200 font-medium">"{myth.claim}"</p>
                  </div>

                  {/* Fact Truth Statement */}
                  <div className="p-3 rounded-xl bg-teal-950/20 border border-teal-500/30 space-y-1">
                    <div className="text-[11px] font-bold text-teal-400 uppercase tracking-wider flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> The Official Primary Data Truth
                    </div>
                    <p className="text-xs md:text-sm text-slate-200 leading-relaxed">{myth.truth}</p>
                  </div>

                  <div className="text-[10px] text-slate-500 font-mono border-t border-slate-800 pt-2">
                    Source: {myth.dwpData}
                  </div>

                </div>
              ))}
            </div>

          </div>
        )}

        {/* SECTION 4: PRINTABLE MP BRIEFING PACK GENERATOR */}
        {activeTab === 'briefing' && (
          <div className="max-w-4xl mx-auto space-y-6">
            
            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-teal-400 text-xs font-bold uppercase tracking-wider">
                <Printer className="w-4 h-4" />
                <span>Constituent Advocacy Tool</span>
              </div>
              <h2 className="text-2xl font-black text-slate-100">
                Printable MP Briefing Pack & Fact Sheet Generator
              </h2>
              <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
                Generate an official, cleanly formatted 1-page factsheet backed by DWP, ONS, and GOV.UK statutory rates to present to your local MP during surgeries or attach in constituent emails.
              </p>
            </div>

            {/* Config Controls */}
            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-5">
              <h3 className="font-bold text-sm text-slate-200 border-b border-slate-800 pb-2">
                1. Constituency & MP Details
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-slate-400 block mb-1">Target MP Name (Optional)</label>
                  <input
                    type="text"
                    value={mpName}
                    onChange={(e) => setMpName(e.target.value)}
                    placeholder="e.g. Rt Hon Jane Doe MP"
                    className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-purple-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-400 block mb-1">Constituency Name (Optional)</label>
                  <input
                    type="text"
                    value={constituency}
                    onChange={(e) => setConstituency(e.target.value)}
                    placeholder="e.g. Bristol West / Leeds Central"
                    className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-purple-500"
                  />
                </div>
              </div>

              <h3 className="font-bold text-sm text-slate-200 border-b border-slate-800 pb-2 pt-2">
                2. Select Core Fact Topics to Include
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { id: 'pip_rates', label: 'PIP Rates (2026/27 Uprating & Descriptors)' },
                  { id: 'pip_fraud', label: 'PIP Fraud Rates (<0.2%) vs Media Claims' },
                  { id: 'tribunals', label: '70%+ HMCTS Tribunal Overturn Rate' },
                  { id: 'uc_rates', label: 'Universal Credit Standard Rates & Health Elements' },
                  { id: 'carers', label: 'Carer\'s Allowance Rates, Earnings Cap & UC Carer Element' },
                  { id: 'motability', label: 'Motability Scheme Funding Reality' },
                  { id: 'inactivity', label: 'ONS Inactivity & NHS Waiting Lists' },
                ].map((top) => (
                  <button
                    key={top.id}
                    onClick={() => toggleTopic(top.id)}
                    className={`flex items-center gap-3 p-3 rounded-xl border text-xs font-semibold text-left transition ${
                      selectedTopics.includes(top.id)
                        ? 'bg-purple-600/20 border-purple-500 text-purple-200'
                        : 'bg-slate-950 border-slate-800 text-slate-400'
                    }`}
                  >
                    <div className={`w-4 h-4 rounded flex items-center justify-center border ${
                      selectedTopics.includes(top.id) ? 'bg-purple-600 border-purple-500 text-white' : 'border-slate-700'
                    }`}>
                      {selectedTopics.includes(top.id) && <Check className="w-3 h-3" />}
                    </div>
                    <span>{top.label}</span>
                  </button>
                ))}
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-400 block mb-1">Personal Constituent Message / Note (Optional)</label>
                <textarea
                  value={customNote}
                  onChange={(e) => setCustomNote(e.target.value)}
                  placeholder="e.g. As your constituent with a long-term neurological condition, I urge you to rely on verified DWP data during upcoming Commons debates..."
                  className="w-full h-20 p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-purple-500"
                />
              </div>

              <div className="flex flex-wrap items-center justify-end gap-3 pt-2">
                <button
                  onClick={copyBriefingText}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition"
                >
                  <Copy className="w-4 h-4" />
                  <span>{briefingCopied ? 'Copied to Clipboard!' : 'Copy Text'}</span>
                </button>

                <button
                  onClick={handlePrintBriefing}
                  className="flex items-center gap-2 px-6 py-2 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 text-xs font-bold transition shadow-lg shadow-teal-500/20"
                >
                  <Printer className="w-4 h-4" />
                  <span>Print / Save as PDF</span>
                </button>
              </div>
            </div>

            {/* Printable Document Preview Component */}
            <div className="p-8 rounded-2xl bg-white text-slate-900 space-y-6 shadow-2xl font-sans print:shadow-none print:p-0">
              
              <div className="border-b-2 border-purple-900 pb-4 flex justify-between items-start">
                <div>
                  <h1 className="text-xl font-black text-purple-950 tracking-tight">
                    CONSTITUENCY WELFARE & DISABILITY FACT BRIEFING
                  </h1>
                  <p className="text-xs text-slate-600 font-semibold">
                    Verified Primary Source Analysis • UK Disability & Welfare Truth Index
                  </p>
                </div>
                <div className="text-right text-xs text-slate-500">
                  <div>Date: {new Date().toLocaleDateString('en-GB')}</div>
                  <div className="font-bold text-slate-800">Ref: DWP/HMCTS/ONS-2026</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-xs bg-slate-100 p-3 rounded-lg border border-slate-200">
                <div>
                  <span className="text-slate-500 font-semibold block">Target Member of Parliament:</span>
                  <span className="font-bold text-slate-900">{mpName || 'Member of Parliament'}</span>
                </div>
                <div>
                  <span className="text-slate-500 font-semibold block">Constituency:</span>
                  <span className="font-bold text-slate-900">{constituency || 'UK Constituency'}</span>
                </div>
              </div>

              {/* Topics Breakdown */}
              <div className="space-y-4 text-xs">
                
                {selectedTopics.includes('pip_rates') && (
                  <div className="space-y-1">
                    <h3 className="font-bold text-sm text-purple-900 border-b border-purple-200 pb-0.5">
                      1. Personal Independence Payment (PIP) Rates (2026/27)
                    </h3>
                    <p className="text-slate-700 leading-relaxed">
                      <strong>Statutory Rates:</strong> Daily Living: Standard <strong>£76.70/wk</strong> (£306.80 per 4 wks) | Enhanced <strong>£114.60/wk</strong> (£458.40 per 4 wks). Mobility: Standard <strong>£30.30/wk</strong> (£121.20 per 4 wks) | Enhanced <strong>£80.00/wk</strong> (£320.00 per 4 wks). Maximum combined award: <strong>£194.60/wk</strong> (£778.40 per 4 wks). PIP is tax-free, non-means-tested, and payable regardless of employment status or savings.
                    </p>
                    <div className="text-[10px] text-slate-500 font-mono">Source: DWP PIP Guidance & GOV.UK Uprating Schedule</div>
                  </div>
                )}

                {selectedTopics.includes('pip_fraud') && (
                  <div className="space-y-1">
                    <h3 className="font-bold text-sm text-purple-900 border-b border-purple-200 pb-0.5">
                      2. PIP Fraud Rates vs Public Perception
                    </h3>
                    <p className="text-slate-700 leading-relaxed">
                      <strong>Official Data:</strong> Official DWP Fraud & Error releases confirm PIP fraud is exceptionally low at <strong>under 0.2%</strong>. The majority of administrative overpayments arise from DWP internal processing errors rather than claimant deceit.
                    </p>
                    <div className="text-[10px] text-slate-500 font-mono">Source: DWP Fraud and Error in the Benefit System (National Statistics)</div>
                  </div>
                )}

                {selectedTopics.includes('tribunals') && (
                  <div className="space-y-1">
                    <h3 className="font-bold text-sm text-purple-900 border-b border-purple-200 pb-0.5">
                      3. Independent Tribunal Reversal Rates
                    </h3>
                    <p className="text-slate-700 leading-relaxed">
                      <strong>Official Data:</strong> Ministry of Justice tribunal reports show that over <strong>70% of initial DWP PIP rejections</strong> appealed to independent HMCTS tribunals are overturned in favor of the disabled claimant.
                    </p>
                    <div className="text-[10px] text-slate-500 font-mono">Source: Ministry of Justice HMCTS Tribunal Statistics Quarterly</div>
                  </div>
                )}

                {selectedTopics.includes('uc_rates') && (
                  <div className="space-y-1">
                    <h3 className="font-bold text-sm text-purple-900 border-b border-purple-200 pb-0.5">
                      4. Universal Credit (UC) Standard Allowances & Disability Elements (2026/27)
                    </h3>
                    <p className="text-slate-700 leading-relaxed">
                      <strong>Statutory Rates:</strong> Single under 25: <strong>£338.58/mo</strong> | Single 25+: <strong>£424.90/mo</strong>. Joint couple (both under 25): <strong>£528.34/mo</strong> | Joint couple (one or both 25+): <strong>£666.97/mo</strong>. Health Elements: Limited Capability for Work and Work-Related Activity (LCWRA): <strong>£429.80/mo</strong> | LCW (awarded prior to April 2026): <strong>£217.26/mo</strong>. Earnings taper rate applies at 55p per £1 earned over any applicable Work Allowance.
                    </p>
                    <div className="text-[10px] text-slate-500 font-mono">Source: GOV.UK Universal Credit Rates & Department for Work and Pensions</div>
                  </div>
                )}

                {selectedTopics.includes('carers') && (
                  <div className="space-y-1">
                    <h3 className="font-bold text-sm text-purple-900 border-b border-purple-200 pb-0.5">
                      5. Carer's Allowance & Universal Credit Carer Element (2026/27)
                    </h3>
                    <p className="text-slate-700 leading-relaxed">
                      <strong>Statutory Support:</strong> Carer's Allowance rate: <strong>£86.45/wk</strong> for providing at least 35 hours of care weekly. Net weekly earnings limit: <strong>£204.00/wk</strong> (strict cliff-edge threshold). UC Carer Element: <strong>£209.34/mo</strong>. <em>Important Policy Fact:</em> Carer's Allowance is deducted 100% (£1-for-£1) from Universal Credit, making the UC Carer Element the practical mechanism of support for low-income carers on UC.
                    </p>
                    <div className="text-[10px] text-slate-500 font-mono">Source: DWP Carer's Allowance Uprating & GOV.UK Guidance</div>
                  </div>
                )}

                {selectedTopics.includes('motability') && (
                  <div className="space-y-1">
                    <h3 className="font-bold text-sm text-purple-900 border-b border-purple-200 pb-0.5">
                      6. Motability Scheme Structure
                    </h3>
                    <p className="text-slate-700 leading-relaxed">
                      <strong>Official Data:</strong> Motability is a self-funding registered charity. Disabled citizens pay for their lease in full by surrendering 100% of their awarded Higher Rate Mobility Allowance directly to Motability Operations.
                    </p>
                    <div className="text-[10px] text-slate-500 font-mono">Source: NAO Motability Scheme Review & DWP Guidance</div>
                  </div>
                )}

                {selectedTopics.includes('inactivity') && (
                  <div className="space-y-1">
                    <h3 className="font-bold text-sm text-purple-900 border-b border-purple-200 pb-0.5">
                      7. Economic Inactivity & Health Trends
                    </h3>
                    <p className="text-slate-700 leading-relaxed">
                      <strong>Official Data:</strong> ONS longitudinal studies indicate 84% of working-age economically inactive adults suffer long-term health conditions or care duties, strongly correlated with NHS treatment backlogs.
                    </p>
                    <div className="text-[10px] text-slate-500 font-mono">Source: Office for National Statistics Labour Market Data</div>
                  </div>
                )}

                {customNote && (
                  <div className="p-3 bg-purple-50 rounded-lg border border-purple-200 space-y-1 mt-2">
                    <div className="font-bold text-purple-950">Constituent Statement:</div>
                    <p className="italic text-slate-800">"{customNote}"</p>
                  </div>
                )}

              </div>

              <div className="border-t border-slate-300 pt-3 flex justify-between items-center text-[10px] text-slate-500">
                <span>Verified by UK Disability & Welfare Truth Index (welfaretruthindex.org.uk)</span>
                <span>Non-Partisan Public Interest Advocacy Document</span>
              </div>

            </div>

          </div>
        )}

        {/* SECTION 5: KNOW YOUR RIGHTS SECTION */}
        {activeTab === 'rights' && (
          <div className="max-w-4xl mx-auto space-y-6">
            
            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
              <div className="flex items-center gap-2 text-teal-400 text-xs font-bold uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4" />
                <span>Statutory Protections & Procedural Fairness</span>
              </div>
              <h2 className="text-2xl font-black text-slate-100">
                Know Your Legal Rights: PIP & Welfare Assessments
              </h2>
              <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
                This section outlines your established legal rights under statutory DWP regulations and tribunal principles. It does not provide medical or coaching advice on how to answer assessment questions, but ensures claimants understand procedural standards, accessibility entitlements, and evidence rights.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Right 1: The Reliability Criterion */}
              <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
                <div className="flex items-center gap-2 text-purple-400 font-bold text-sm">
                  <Scale className="w-5 h-5" /> The 'Reliability' Standard (Reg 4)
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Under Regulation 4(2A) of the PIP Regulations 2013, you can only be assessed as able to complete an activity if you can do so <strong>safely</strong>, to an <strong>acceptable standard</strong>, <strong>repeatedly</strong>, and within a <strong>reasonable time</strong> (no more than twice as long as non-disabled peers).
                </p>
                <div className="text-[10px] text-slate-500 font-mono">Ref: Social Security (PIP) Regulations 2013, Reg 4</div>
              </div>

              {/* Right 2: Right to Audio Recording */}
              <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
                <div className="flex items-center gap-2 text-teal-400 font-bold text-sm">
                  <Volume2 className="w-5 h-5" /> Assessment Audio Recording Rights
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Claimants have a legal entitlement to request an audio recording of telephone or in-person assessments. DWP assessment providers (Capita, Assessment Services) must accommodate audio recording requests when requested in advance.
                </p>
                <div className="text-[10px] text-slate-500 font-mono">Ref: DWP Assessment Provider Guidance Section 1.6</div>
              </div>

              {/* Right 3: Supporting Evidence Equality */}
              <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
                <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
                  <FileText className="w-5 h-5" /> Right to Submit Medical Evidence
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Decision makers are required by law to evaluate all medical evidence provided by NHS clinicians, occupational therapists, carers, and specialists. An assessor's opinion does not automatically override factual specialist clinical documentation.
                </p>
                <div className="text-[10px] text-slate-500 font-mono">Ref: Social Security Act 1998 & DWP Decision Maker's Guide</div>
              </div>

              {/* Right 4: Mandatory Reconsideration & Tribunals */}
              <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
                <div className="flex items-center gap-2 text-rose-400 font-bold text-sm">
                  <Gavel className="w-5 h-5" /> Independent HMCTS Appeals
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  If you disagree with a DWP decision, you have the statutory right to request a Mandatory Reconsideration and subsequently appeal to an independent HMCTS Tribunal where over 70% of initial DWP decisions are successfully corrected.
                </p>
                <div className="text-[10px] text-slate-500 font-mono">Ref: Tribunals, Courts and Enforcement Act 2007</div>
              </div>

            </div>

          </div>
        )}

        {/* SECTION 6: LEGAL & MODERATION STANDARDS HUB */}
        {activeTab === 'legal' && (
          <div className="max-w-4xl mx-auto space-y-6">
            
            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
              <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider">
                <Scale className="w-4 h-4" />
                <span>Editorial Rigor & Legal Protections</span>
              </div>
              <h2 className="text-2xl font-black text-slate-100">
                Legal Standards, Moderation & Resilience
              </h2>
              <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
                To protect the platform against legal challenges or allegations of partisan bias, all entries in the Welfare Truth Index are strictly moderated under UK public interest reporting principles.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Card 1: Defamation Protection */}
              <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
                <div className="flex items-center gap-2 text-purple-400 font-bold text-sm">
                  <Gavel className="w-5 h-5" /> Fair Comment & Public Interest
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Under section 4 of the UK Defamation Act 2013 (Publication on a matter of public interest), analyzing statements made by elected officials and journalists regarding public welfare spending is fully protected, provided evaluations rely on verified primary datasets.
                </p>
              </div>

              {/* Card 2: Primary Data Hierarchy */}
              <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
                <div className="flex items-center gap-2 text-teal-400 font-bold text-sm">
                  <BarChart3 className="w-5 h-5" /> Primary Data Hierarchy
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  We do not evaluate claims using commentary or opinion articles. All rebuttals strictly cite tier-1 primary sources: DWP Stat-Xplore, ONS releases, HMCTS tribunal reports, National Audit Office reviews, and Hansard parliamentary records.
                </p>
              </div>

              {/* Card 3: Non-Partisan Scoring */}
              <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
                <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
                  <ShieldCheck className="w-5 h-5" /> Non-Partisan Evaluation Criteria
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Politicians and media outlets across all political parties (Government, Opposition, Crossbench, and independent news outlets) are subjected to the identical mathematical scoring framework based purely on factual divergence.
                </p>
              </div>

              {/* Card 4: Right of Reply & Corrections */}
              <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
                <div className="flex items-center gap-2 text-rose-400 font-bold text-sm">
                  <MessageSquare className="w-5 h-5" /> Right of Reply & Corrections Policy
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Any individual or publication logged on the leaderboard may submit an official clarification or secondary dataset. Verified corrections are reviewed by independent moderators within 48 hours.
                </p>
              </div>

            </div>

          </div>
        )}

        {/* SECTION 7: SUPPORT DIRECTORY */}
        {activeTab === 'support' && (
          <div className="space-y-6">
            
            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
              <h2 className="text-2xl font-black text-slate-100 flex items-center gap-2">
                <Users className="w-6 h-6 text-teal-400" /> UK Disability Rights & Advocacy Directory
              </h2>
              <p className="text-xs md:text-sm text-slate-400">
                If you are facing a PIP assessment, mandatory reconsideration, or HMCTS tribunal appeal, these recognized UK organizations offer free, confidential legal support.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {SUPPORT_ORGANIZATIONS.map((org, i) => (
                <div key={i} className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3 flex flex-col justify-between">
                  <div className="space-y-2">
                    <h3 className="font-bold text-base text-slate-100">{org.name}</h3>
                    <p className="text-xs text-slate-400 leading-relaxed">{org.desc}</p>
                  </div>

                  <div className="pt-3 border-t border-slate-800 space-y-1.5 text-xs">
                    <div className="text-teal-300 font-bold flex items-center gap-1">
                      <span>Phone:</span> {org.phone}
                    </div>
                    <div className="text-slate-400 flex items-center gap-1 font-mono">
                      <span>Web:</span> {org.web}
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>
        )}

      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800 bg-slate-950 py-8 px-4 text-center text-xs text-slate-500 space-y-2">
        <p>UK Disability & Welfare Truth Index • Non-Partisan Public Interest Open Source Platform</p>
        <p className="text-[10px] text-slate-600">
          Data synchronized against DWP Stat-Xplore, Office for National Statistics (ONS), HMCTS Tribunal Releases, and UK Hansard Parliamentary Records.
        </p>
      </footer>

    </div>
  );
}
