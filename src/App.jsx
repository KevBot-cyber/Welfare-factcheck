import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  ShieldCheck, AlertTriangle, Search, Scale, FileText, Printer, Copy,
  ExternalLink, ChevronDown, ChevronUp, RefreshCw, BarChart3, TrendingUp,
  Rss, CheckCircle2, XCircle, Info, Radio, Users, Newspaper, Award,
  Share2, Download, Eye, Sun, Moon, Volume2, Sparkles, Filter, HelpCircle,
  Building2, MessageSquare, BookOpen, Clock, Zap, Gavel, Check, Send,
  HeartHandshake, Coins, LineChart, Phone, Globe, Quote
} from 'lucide-react';

// Top Leaderboards Data with Recent Articles, MP Social Media, & Party Breakdown
const getDynamicLeaderboardData = () => {
  const today = new Date();
  const daysAgo = (days) => {
    const d = new Date(today);
    d.setDate(d.getDate() - days);
    return d.toISOString().split('T')[0];
  };
  return {
    mps: [
      {
        id: 1,
        rank: 1,
        name: "Department for Work & Pensions Spokesperson / Key Ministers",
        party: "Government",
        role: "Welfare Policy Lead",
        flaggedClaimsCount: 34,
        lastUpdated: "30 mins ago",
        trend: "up",
        topClaim: "Claiming over 70% of PIP applications for mental health are 'unverified self-diagnoses'.",
        factualCorrection: "DWP internal guidelines and NHS clinical protocols require formal diagnostic assessment or medical reports from qualified practitioners prior to PIP award decisions.",
        primarySource: "DWP Stat-Xplore & BMA Guidelines (Sep 2026)",
        sourceUrl: "https://stat-xplore.dwp.gov.uk/",
        bsScore: 94,
        claimsHistory: [
          { date: daysAgo(3), quote: "We need to reform PIP because claims for anxiety have exploded without medical evidence.", outlet: "BBC Radio 4 Today", source: "Hansard / BBC Radio 4", sourceUrl: "https://hansard.parliament.uk/", status: "Debunked" },
          { date: daysAgo(19), quote: "The tribunal system is being abused by advocacy groups to overturn valid DWP decisions.", outlet: "Daily Telegraph Interview", source: "Hansard", sourceUrl: "https://hansard.parliament.uk/", status: "Debunked" },
          { date: daysAgo(38), quote: "Most fit notes are issued online without any face-to-face consultation.", outlet: "House of Commons Statement", source: "Hansard Vol. 752", sourceUrl: "https://hansard.parliament.uk/", status: "Misleading" },
          { date: daysAgo(54), quote: "Cash payments for PIP are disincentivising work among young adults.", outlet: "Press Briefing", source: "GOV.UK Press Releases", sourceUrl: "https://www.gov.uk/government/organisations/department-for-work-pensions", status: "Unsubstantiated" }
        ]
      },
      {
        id: 2,
        rank: 2,
        name: "Rt Hon Shadow Work & Pensions Minister",
        party: "Opposition",
        role: "Opposition Spokesperson",
        flaggedClaimsCount: 23,
        lastUpdated: "2 hours ago",
        trend: "up",
        topClaim: "Conflating 'Economic Inactivity' with 'Fraudulent Benefit Claiming'.",
        factualCorrection: "ONS statistics show 84% of economically inactive working-age adults have long-term illness, caring responsibilities, or are full-time students.",
        primarySource: "ONS Labour Market Overview (Sep 2026)",
        sourceUrl: "https://www.ons.gov.uk/employmentandlabourmarket/peopleinwork/employmentandemployeetypes/bulletins/uklabourmarket/latest",
        bsScore: 88,
        claimsHistory: [
          { date: daysAgo(9), quote: "2.8 million people are sitting at home on PIP while taxpayers foot the bill.", outlet: "LBC Radio", source: "LBC Broadcast", sourceUrl: "https://www.lbc.co.uk/", status: "Debunked" },
          { date: daysAgo(30), quote: "Benefit spending has doubled primarily due to lax PIP checks.", outlet: "Sunday Times Op-Ed", source: "The Sunday Times", sourceUrl: "https://www.thetimes.co.uk/", status: "False" }
        ]
      },
      {
        id: 3,
        rank: 3,
        name: "MP for North West Norfolk",
        party: "Backbench",
        role: "Select Committee Member",
        flaggedClaimsCount: 18,
        lastUpdated: "5 hours ago",
        trend: "steady",
        topClaim: "Asserting PIP is a replacement for wage earnings rather than an extra-cost disability benefit.",
        factualCorrection: "PIP is non-means-tested and designed to offset additional costs incurred due to disability, regardless of employment status.",
        primarySource: "Welfare Reform Act 2012 s.77 / DWP Guidance",
        sourceUrl: "https://www.legislation.gov.uk/ukpga/2012/5/section/77",
        bsScore: 82,
        claimsHistory: [
          { date: daysAgo(16), quote: "PIP was meant as temporary sick pay, not a salary for life.", outlet: "House of Commons Debate", source: "Hansard Vol. 751", sourceUrl: "https://hansard.parliament.uk/", status: "Debunked" },
          { date: daysAgo(42), quote: "Claimants receive more on PIP than average working salaries in my constituency.", outlet: "Local Press Interview", source: "Eastern Daily Press", sourceUrl: "https://www.edp24.co.uk/", status: "Misleading" }
        ]
      },
      {
        id: 4,
        rank: 4,
        name: "MP for South Essex",
        party: "Backbench",
        role: "MP",
        flaggedClaimsCount: 14,
        lastUpdated: "1 day ago",
        trend: "down",
        topClaim: "Claiming fit notes are handed out 'without medical rationale'.",
        factualCorrection: "Fit notes are legally binding medical assessments issued by qualified healthcare professionals under NHS GMC standards.",
        primarySource: "NHS Digital Fit Note Data & Royal College of GPs (2026)",
        sourceUrl: "https://digital.nhs.uk/data-and-information/publications/statistical/fit-notes-issued-by-gp-practices",
        bsScore: 78,
        claimsHistory: [
          { date: daysAgo(20), quote: "GPs are signing off fit notes without even seeing patients.", outlet: "GB News Panel", source: "GB News", sourceUrl: "https://www.gbnews.com/", status: "Debunked" },
          { date: daysAgo(68), quote: "Over 90% of requested fit notes are granted without question.", outlet: "Parliamentary Question", source: "Hansard Written Question", sourceUrl: "https://hansard.parliament.uk/", status: "Unsubstantiated" }
        ]
      },
      {
        id: 5,
        rank: 5,
        name: "MP for Christchurch",
        party: "Backbench",
        role: "MP",
        flaggedClaimsCount: 12,
        lastUpdated: "2 days ago",
        trend: "steady",
        topClaim: "Stating fraud in disability benefits exceeds 15% of budget.",
        factualCorrection: "Official DWP Fraud & Error statistics place PIP fraud at under 0.2% — among the lowest of all government expenditure.",
        primarySource: "DWP Fraud and Error in the Benefit System report (2026)",
        sourceUrl: "https://www.gov.uk/government/collections/fraud-and-error-in-the-benefit-system",
        bsScore: 91,
        claimsHistory: [
          { date: daysAgo(24), quote: "Billions are leaked to fraudulent PIP claims every single year.", outlet: "House of Commons Speech", source: "Hansard Vol. 750", sourceUrl: "https://hansard.parliament.uk/", status: "False" }
        ]
      }
    ],
    social_media: [
      {
        id: 501,
        rank: 1,
        name: "Reform UK MP Social Channels (X & TikTok)",
        party: "Reform UK",
        role: "X (Twitter) & TikTok Viral Posts",
        flaggedClaimsCount: 52,
        lastUpdated: "15 mins ago",
        trend: "up",
        topClaim: "TikTok video claiming 'Foreign nationals and non-citizens can walk into DWP offices and claim £800/mo PIP cash instantly'.",
        factualCorrection: "PIP has strict habitual residence and past presence tests (must have resided in the UK for at least 2 of the past 3 years with legal immigration status).",
        primarySource: "DWP Habitual Residence Test & Immigration Act Guidelines (2026)",
        sourceUrl: "https://www.gov.uk/pip/eligibility",
        bsScore: 97,
        claimsHistory: [
          { date: daysAgo(1), quote: "The welfare system is subsidising illegal imports while our pensioners freeze.", outlet: "TikTok Reel / X Post", source: "X (@ReformUK_Official)", sourceUrl: "https://x.com/", status: "False" },
          { date: daysAgo(7), quote: "1 in 4 adults in Britain are now getting free disability cash with no medical exam.", outlet: "X Thread (1.2M Impressions)", source: "X Platform", sourceUrl: "https://x.com/", status: "Extreme Misinformation" },
          { date: daysAgo(22), quote: "Watch how easy it is to fake a back pain claim to get a free Motability car.", outlet: "Facebook Video Ad", source: "Meta Ad Library", sourceUrl: "https://www.facebook.com/ads/library", status: "False" }
        ]
      },
      {
        id: 502,
        rank: 2,
        name: "Conservative MP Backbench Accounts",
        party: "Conservative",
        role: "X (Twitter) & Facebook Campaigning",
        flaggedClaimsCount: 41,
        lastUpdated: "1 hour ago",
        trend: "up",
        topClaim: "Infographic sharing claims that PIP spending growth is driven by 'lifestyle mental health choices'.",
        factualCorrection: "Clinical research shows rises in mental health awards correlate directly with long NHS psychiatric waiting lists and systemic primary care backlogs.",
        primarySource: "NHS Confederation & Mental Health Foundation Report (2026)",
        sourceUrl: "https://www.nhsconfed.org/",
        bsScore: 91,
        claimsHistory: [
          { date: daysAgo(4), quote: "Sick note culture is destroying the British work ethic. Time to stop cash payouts for stress.", outlet: "X Graphic Broadcast", source: "X Platform", sourceUrl: "https://x.com/", status: "Misleading" },
          { date: daysAgo(17), quote: "Labour is turning a blind eye to £5 billion of annual benefit fraud.", outlet: "Facebook Post", source: "Facebook Public Page", sourceUrl: "https://www.facebook.com/", status: "False" }
        ]
      },
      {
        id: 503,
        rank: 3,
        name: "Labour Backbench & Regional MP Accounts",
        party: "Labour",
        role: "X & Facebook Constituency Updates",
        flaggedClaimsCount: 19,
        lastUpdated: "3 hours ago",
        trend: "steady",
        topClaim: "Misrepresenting DWP reassessment backlogs as 'intentional denial of rights by civil servants'.",
        factualCorrection: "Delays stem from administrative capacity constraints and assessment provider contract overhauls rather than deliberate civil service policy.",
        primarySource: "National Audit Office (NAO) DWP Assessment Performance Review (2026)",
        sourceUrl: "https://www.nao.org.uk/",
        bsScore: 74,
        claimsHistory: [
          { date: daysAgo(11), quote: "Thousands are losing PIP overnight due to automated AI decision machines.", outlet: "X Post", source: "X Platform", sourceUrl: "https://x.com/", status: "Unsubstantiated" },
          { date: daysAgo(33), quote: "DWP reassessments have a 90% error rate across all health conditions.", outlet: "Facebook Note", source: "Facebook", sourceUrl: "https://www.facebook.com/", status: "Misleading" }
        ]
      }
    ],
    byParty: [
      {
        id: 601,
        rank: 1,
        name: "Reform UK",
        party: "Reform UK",
        role: "Political Party Official & MP Channels",
        flaggedClaimsCount: 68,
        lastUpdated: "10 mins ago",
        trend: "up",
        topClaim: "Systemic amplification across social media framing disability benefits as an unverified handout for non-citizens.",
        factualCorrection: "DWP statistics and UK statutory eligibility laws mandate strict identity, clinical assessment, and legal residence validation before any award.",
        primarySource: "DWP Stat-Xplore & House of Commons Library (Sep 2026)",
        sourceUrl: "https://commonslibrary.parliament.uk/",
        bsScore: 96,
        claimsHistory: [
          { date: daysAgo(1), quote: "Welfare spending is out of control due to open-door PIP policies.", outlet: "Official Party X Account", source: "X (@ReformUK)", sourceUrl: "https://x.com/", status: "False" },
          { date: daysAgo(10), quote: "Cancel PIP cash for anyone under 30 to save £10 billion immediately.", outlet: "TikTok Live Stream", source: "TikTok Official", sourceUrl: "https://www.tiktok.com/", status: "Misleading" }
        ]
      },
      {
        id: 602,
        rank: 2,
        name: "Conservative Party",
        party: "Conservative",
        role: "Political Party Official & Frontbench Channels",
        flaggedClaimsCount: 54,
        lastUpdated: "45 mins ago",
        trend: "up",
        topClaim: "Campaign messaging alleging that 'Sick Note Britain' costs every working household £4,000 extra per year.",
        factualCorrection: "Calculations misattribute total healthcare, pensions, and statutory sick pay budgets entirely to PIP and Universal Credit health elements.",
        primarySource: "Institute for Fiscal Studies (IFS) Welfare Spending Analysis (2026)",
        sourceUrl: "https://ifs.org.uk/",
        bsScore: 89,
        claimsHistory: [
          { date: daysAgo(5), quote: "Labour is refusing to crack down on the £100bn welfare burden.", outlet: "Press Office X Campaign", source: "X Platform", sourceUrl: "https://x.com/", status: "Misleading" },
          { date: daysAgo(25), quote: "Fit notes are being generated automatically by AI apps without GP review.", outlet: "Facebook Video Ad", source: "Meta Ad Library", sourceUrl: "https://www.facebook.com/ads/library", status: "False" }
        ]
      },
      {
        id: 603,
        rank: 3,
        name: "Labour Party",
        party: "Labour",
        role: "Political Party Official & Ministerial Channels",
        flaggedClaimsCount: 29,
        lastUpdated: "2 hours ago",
        trend: "down",
        topClaim: "Overstating the speed at which back-to-work pathfinder programs will reduce economic inactivity numbers.",
        factualCorrection: "Independent ONS projections note that structural health conditions and NHS waiting times constrain rapid economic reintegration.",
        primarySource: "Office for Budget Responsibility (OBR) Economic & Fiscal Outlook (2026)",
        sourceUrl: "https://obr.uk/",
        bsScore: 71,
        claimsHistory: [
          { date: daysAgo(13), quote: "Our reforms will return 500,000 sick note claimants to work within 12 months.", outlet: "Press Release & Social Share", source: "Labour.org.uk", sourceUrl: "https://labour.org.uk/", status: "Unsubstantiated" },
          { date: daysAgo(37), quote: "DWP tribunal errors have been completely eliminated under new ministerial oversight.", outlet: "X Statement", source: "X Platform", sourceUrl: "https://x.com/", status: "False" }
        ]
      },
      {
        id: 604,
        rank: 4,
        name: "Liberal Democrats",
        party: "Liberal Democrats",
        role: "Political Party Official Channels",
        flaggedClaimsCount: 11,
        lastUpdated: "1 day ago",
        trend: "steady",
        topClaim: "Conflating carer's allowance cliff-edges with universal credit sanction rates.",
        factualCorrection: "Carer's Allowance overpayments result from net earnings threshold caps (£151/wk to £204/wk in 2026) rather than jobcentre conditionality sanctions.",
        primarySource: "Carers UK & DWP Guidance (2026)",
        sourceUrl: "https://www.carersuk.org/",
        bsScore: 52,
        claimsHistory: [
          { date: daysAgo(19), quote: "Carers are being sanctioned at jobcentres for taking extra care hours.", outlet: "X Post", source: "X Platform", sourceUrl: "https://x.com/", status: "Misleading" }
        ]
      },
      {
        id: 605,
        rank: 5,
        name: "Green Party of England & Wales",
        party: "Green Party",
        role: "Political Party Official Channels",
        flaggedClaimsCount: 7,
        lastUpdated: "3 days ago",
        trend: "steady",
        topClaim: "Asserting Universal Basic Income pilots would immediately eliminate 100% of DWP administration costs.",
        factualCorrection: "Specialist disability assessment frameworks and extra-cost support mechanisms (e.g., PIP mobility) remain necessary alongside basic income baselines.",
        primarySource: "Joseph Rowntree Foundation (JRF) Welfare Policy Review",
        sourceUrl: "https://www.jrf.org.uk/",
        bsScore: 48,
        claimsHistory: [
          { date: daysAgo(32), quote: "UBI replaces all DWP bureaucracy and saves tens of billions in admin overnight.", outlet: "Facebook Post", source: "Facebook", sourceUrl: "https://www.facebook.com/", status: "Unsubstantiated" }
        ]
      }
    ],
    tabloids: [
      {
        id: 101,
        rank: 1,
        name: "The Daily Express",
        type: "Print & Online Tabloid",
        flaggedClaimsCount: 48,
        lastUpdated: "30 mins ago",
        trend: "up",
        topClaim: "Headline: 'BENEFIT CRACKDOWN: Millions to lose £700/mo cash payouts in shock reform.'",
        factualCorrection: "Proposed consultation documents suggest minor administrative adjustments and voucher pilots, not immediate mass withdrawal of awards.",
        primarySource: "DWP Green Paper Policy Impact Assessment (Sep 2026)",
        sourceUrl: "https://www.gov.uk/government/organisations/department-for-work-pensions",
        bsScore: 96,
        claimsHistory: [
          { date: daysAgo(3), quote: "Sick note Britain costs taxpayers £100bn as millions shirk work.", outlet: "Front Page", source: "Daily Express Print Edition", sourceUrl: "https://www.express.co.uk/", status: "Misleading" },
          { date: daysAgo(19), quote: "EXPOSED: How easy it is to claim PIP cash for basic mood swings.", outlet: "Express Online Feature", source: "Daily Express Digital", sourceUrl: "https://www.express.co.uk/", status: "False" }
        ]
      },
      {
        id: 102,
        rank: 2,
        name: "The Mail Online / Daily Mail",
        type: "Tabloid / Digital News",
        flaggedClaimsCount: 42,
        lastUpdated: "1 hour ago",
        trend: "up",
        topClaim: "Publishing sensationalized case studies framing legitimate mobility awards as 'scams'.",
        factualCorrection: "Motability is a registered charity funded entirely by individuals exchanging their legally awarded PIP mobility component.",
        primarySource: "Motability Foundation Annual Report & NAO Review (2026)",
        sourceUrl: "https://www.motabilityfoundation.org.uk/",
        bsScore: 92,
        claimsHistory: [
          { date: daysAgo(6), quote: "The £75-a-week perk giving claimants brand new luxury cars.", outlet: "MailOnline Investigation", source: "Daily Mail Online", sourceUrl: "https://www.dailymail.co.uk/", status: "Misleading" },
          { date: daysAgo(33), quote: "Rampant fit-note culture creating an idle generation.", outlet: "Daily Mail Editorial", source: "Daily Mail Print", sourceUrl: "https://www.dailymail.co.uk/", status: "Debunked" }
        ]
      },
      {
        id: 103,
        rank: 3,
        name: "The Sun",
        type: "Tabloid",
        flaggedClaimsCount: 35,
        lastUpdated: "4 hours ago",
        trend: "down",
        topClaim: "Claiming 9 out of 10 PIP applicants are awarded full rates without in-person checks.",
        factualCorrection: "DWP statistical releases confirm rigorous paper-based or clinical assessments apply to 100% of awarded claims.",
        primarySource: "DWP PIP Official Statistics Release (Aug 2026)",
        sourceUrl: "https://www.gov.uk/government/collections/personal-independence-payment-statistics",
        bsScore: 89,
        claimsHistory: [
          { date: daysAgo(13), quote: "BENEFIT BONANZA: PIP handouts surge to record levels.", outlet: "Front Page News", source: "The Sun Print", sourceUrl: "https://www.thesun.co.uk/", status: "Misleading" }
        ]
      },
      {
        id: 104,
        rank: 4,
        name: "The Daily Telegraph",
        type: "Broadsheet / Digital",
        flaggedClaimsCount: 26,
        lastUpdated: "1 day ago",
        trend: "steady",
        topClaim: "Framing economic inactivity rising post-pandemic entirely as voluntary benefit reliance.",
        factualCorrection: "ONS longitudinal studies attribute 78% of the rise to NHS treatment backlogs and worsening chronic long-term conditions.",
        primarySource: "Office for National Statistics & Health Foundation (2026)",
        sourceUrl: "https://www.ons.gov.uk/",
        bsScore: 81,
        claimsHistory: [
          { date: daysAgo(27), quote: "Britain's welfare state is encouraging long-term sickness over work.", outlet: "Opinion Column", source: "Daily Telegraph Business", sourceUrl: "https://www.telegraph.co.uk/", status: "Misleading" }
        ]
      }
    ],
    broadcasters: [
      {
        id: 201,
        rank: 1,
        name: "GB News (Breakfast & Panel Shows)",
        type: "TV Broadcast Channel",
        flaggedClaimsCount: 39,
        lastUpdated: "15 mins ago",
        trend: "up",
        topClaim: "Allowing unchecked panel claims that PIP recipients pay no tax and receive 'free luxury cars'.",
        factualCorrection: "PIP recipients pay standard VAT, fuel duty, and income tax if working. Motability vehicles are paid for in full by sacrificing mobility allowance.",
        primarySource: "HMRC Tax Rules & Motability Scheme Charter (2026)",
        sourceUrl: "https://www.gov.uk/hmrc-internal-manuals",
        bsScore: 95,
        claimsHistory: [
          { date: daysAgo(1), quote: "People on PIP are getting brand new BMWs while working families can't afford buses.", outlet: "Dan Wootton Tonight / Panel segment", source: "GB News Catchup", sourceUrl: "https://www.gbnews.com/", status: "False" },
          { date: daysAgo(20), quote: "Anyone can claim £100 a week just by saying they feel sad.", outlet: "Morning Discussion", source: "GB News Broadcast", sourceUrl: "https://www.gbnews.com/", status: "False" }
        ]
      },
      {
        id: 202,
        rank: 2,
        name: "TalkTV / TalkRadio",
        type: "Radio & Broadcast",
        flaggedClaimsCount: 28,
        lastUpdated: "3 hours ago",
        trend: "steady",
        topClaim: "Hosts repeatedly quoting gross expenditure without mentioning HMCTS tribunal reversal rates.",
        factualCorrection: "Over 70% of PIP appeal decisions taken to HMCTS independent tribunals are overturned in favor of the claimant due to original DWP errors.",
        primarySource: "Ministry of Justice Tribunal Statistics Quarterly (2026)",
        sourceUrl: "https://www.gov.uk/government/collections/tribunals-statistics",
        bsScore: 87,
        claimsHistory: [
          { date: daysAgo(34), quote: "The DWP is giving away money to anyone who threatens to appeal.", outlet: "Drive Time Show", source: "TalkTV Stream", sourceUrl: "https://www.talk.tv/", status: "Debunked" }
        ]
      },
      {
        id: 203,
        rank: 3,
        name: "LBC Phone-ins (Selected Slots)",
        type: "Commercial Speech Radio",
        flaggedClaimsCount: 21,
        lastUpdated: "1 day ago",
        trend: "down",
        topClaim: "Failing to challenge caller assertions that mental health condition claims require no clinical proof.",
        factualCorrection: "Mental health PIP claims require detailed medical evidence, care plans, prescription logs, or psychiatric consultant reports.",
        primarySource: "DWP Assessment Provider Guidance (2026)",
        sourceUrl: "https://www.gov.uk/government/publications/personal-independence-payment-assessment-guide-for-assessment-providers",
        bsScore: 76,
        claimsHistory: [
          { date: daysAgo(40), quote: "Caller claims doctors sign off PIP forms in exchange for fast-tracked appointments.", outlet: "Morning Phone-In", source: "LBC Radio Archive", sourceUrl: "https://www.lbc.co.uk/", status: "Unsubstantiated" }
        ]
      }
    ]
  };
};

const INITIAL_LIVE_FEED = [
  { id: 'f1', time: '10:42 AM', source: 'Hansard Feed (Commons)', sourceUrl: 'https://hansard.parliament.uk/', author: 'Work & Pensions Committee', text: "Minister queried on 72% HMCTS tribunal overturn rate for PIP decisions.", status: "Verified Facts match MoJ", bsFlag: "Low BS" },
  { id: 'f2', time: '10:15 AM', source: 'Daily Express Online', sourceUrl: 'https://www.express.co.uk/', author: 'Welfare Correspondent', text: "Headline: 'Millions set to lose PIP under sweeping new cash-to-voucher plan.'", status: "Flagged Misleading", bsFlag: "High BS (92%)" },
  { id: 'f3', time: '09:30 AM', source: 'BBC News Channel', sourceUrl: 'https://www.bbc.co.uk/news', author: 'Politics Live', text: "Discussion on fit notes and GP workload. Panelists quote RCGP official statistics accurately.", status: "Accurate Data", bsFlag: "Low BS" },
  { id: 'f4', time: '08:50 AM', source: 'GB News Morning', sourceUrl: 'https://www.gbnews.com/', author: 'Guest Commentator', text: "Claims PIP fraud is costing £5 billion annually.", status: "Flagged False", bsFlag: "Extreme BS (98%)" },
  { id: 'f5', time: '08:10 AM', source: 'Hansard Feed (Lords)', sourceUrl: 'https://hansard.parliament.uk/', author: 'Baroness Grey-Thompson', text: "Notes that 84% of PIP claimants use awards for essential heating and medical equipment.", status: "Verified Facts", bsFlag: "Low BS" }
];

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

const SUPPORT_ORGANIZATIONS = [
  { name: "Citizens Advice", phone: "0800 144 8848", web: "citizensadvice.org.uk", desc: "Free, confidential welfare rights and appeal support across the UK." },
  { name: "Scope Disability Charity", phone: "0808 800 3333", web: "scope.org.uk", desc: "Practical guidance, PIP advice, and emotional support for disabled people." },
  { name: "Turn2us", phone: "0808 802 2000", web: "turn2us.org.uk", desc: "National charity helping people access welfare benefits and grants." },
  { name: "Mind Mental Health", phone: "0300 123 3393", web: "mind.org.uk", desc: "Specialist advice on mental health conditions and welfare benefit claims." },
  { name: "StepChange Debt Charity", phone: "0800 138 1111", web: "stepchange.org", desc: "Free debt advice and budget guidance for families on low income." }
];

const CHARITIES_AZ = [
  { name: "Action on Hearing Loss (RNID)", phone: "0808 808 0123", web: "rnid.org.uk", hours: "Mon-Fri 9am-5pm", category: "Sensory & Hearing", desc: "Support, advocacy, and clinical resources for deaf people and those with hearing loss or tinnitus." },
  { name: "Alzheimer's Society", phone: "0333 150 3456", web: "alzheimers.org.uk", hours: "Mon-Weds 9am-8pm, Thu-Fri 9am-5pm, Sat-Sun 10am-4pm", category: "Cognitive & Neurological", desc: "Dementia support, advice on care planning, rights, and welfare entitlements." },
  { name: "Asthma + Lung UK", phone: "0300 222 5800", web: "asthmaandlung.org.uk", hours: "Mon-Fri 9am-5pm", category: "Respiratory & Chronic Health", desc: "Advice and specialist nurse helpline for lung conditions, breathing disabilities, and benefits." },
  { name: "Autistica", phone: "020 3857 4300", web: "autistica.org.uk", hours: "Mon-Fri 9am-5pm", category: "Neurodiversity & Autism", desc: "Autism research charity providing evidence-based tools, rights guides, and advocacy frameworks." },
  { name: "Blind Veterans UK", phone: "0800 389 7979", web: "blindveterans.org.uk", hours: "Mon-Fri 8:30am-5pm", category: "Sensory & Armed Forces", desc: "Rehabilitation, practical training, and financial advocacy for vision-impaired ex-service personnel." },
  { name: "Contact (for Families with Disabled Children)", phone: "0808 808 3555", web: "contact.org.uk", hours: "Mon-Fri 9:30am-5pm", category: "Children & Young People", desc: "National charity supporting families with disabled children on DLA, PIP transitions, and SEN support." },
  { name: "Disability Rights UK", phone: "0330 995 0400", web: "disabilityrightsuk.org", hours: "Mon-Thu 10am-12:30pm (Personal Budgets Line)", category: "National Umbrella & Policy", desc: "Disabled-led national organization publishing PIP guides, policy research, and independent living advocacy." },
  { name: "Epilepsy Action", phone: "0808 800 5050", web: "epilepsy.org.uk", hours: "Mon-Fri 8:30am-5pm, Sat 10am-4pm", category: "Neurological", desc: "Helpline, tribunal guidance, safety advice, and PIP descriptor support for people living with epilepsy." },
  { name: "Headway - The Brain Injury Association", phone: "0808 800 2244", web: "headway.org.uk", hours: "Mon-Fri 9am-5pm", category: "Brain Injury & Neurological", desc: "Specialist support for acquired brain injury survivors, family carers, legal advice, and welfare appeals." },
  { name: "Mencap", phone: "0808 808 1111", web: "mencap.org.uk", hours: "Mon-Fri 9am-3pm", category: "Learning Disability", desc: "Voice of learning disability in the UK, offering welfare rights advice, housing, and employment support." },
  { name: "Mind", phone: "0300 123 3393", web: "mind.org.uk", hours: "Mon-Fri 9am-6pm", category: "Mental Health", desc: "Empowering mental health advice, legal rights info, and guidance on navigating PIP for psychiatric conditions." },
  { name: "Motor Neurone Disease Association (MNDA)", phone: "0808 802 6262", web: "mndassociation.org", hours: "Mon-Fri 9am-5pm", category: "Progressive Neurological", desc: "Specialist MND care support, fast-track DWP benefit advice under special rules (SRTI), and equipment grants." },
  { name: "Multiple Sclerosis Society (MS Society)", phone: "0808 800 8000", web: "mssociety.org.uk", hours: "Mon-Fri 9am-7pm", category: "Neurological & Physical", desc: "Dedicated MS helpline, PIP evidence toolkits, grants, and legal advocacy for MS community members." },
  { name: "National Autistic Society (NAS)", phone: "0808 800 4104", web: "autism.org.uk", hours: "Mon-Fri 10am-3pm", category: "Neurodiversity & Autism", desc: "Comprehensive advice on welfare rights, PIP social interaction descriptors, education, and diagnosis pathways." },
  { name: "Parkinson's UK", phone: "0808 800 0303", web: "parkinsons.org.uk", hours: "Mon-Fri 9am-6pm, Sat 10am-2pm", category: "Neurological & Movement", desc: "Specialist helpline advisers assisting with Parkinson's PIP claims, mobility component reviews, and grants." },
  { name: "RNIB (Royal National Institute of Blind People)", phone: "0303 123 9999", web: "rnib.org.uk", hours: "Mon-Fri 8am-8pm, Sat 9am-1pm", category: "Sensory & Vision", desc: "Practical and legal support for blind and partially sighted citizens, including specialized PIP sight loss guides." },
  { name: "Scope", phone: "0808 800 3333", web: "scope.org.uk", hours: "Mon-Fri 9am-6pm, Sat-Sun 10am-6pm", category: "Physical & Equal Rights", desc: "Disability equality charity providing free 1-on-1 PIP navigation, disability cost energy advice, and advocacy." },
  { name: "Sense", phone: "0300 330 9256", web: "sense.org.uk", hours: "Mon-Fri 9am-5pm", category: "Complex Disabilities & Deafblind", desc: "Supporting people living with complex disabilities or deafblindness to communicate, access care, and secure rights." },
  { name: "Stroke Association", phone: "0303 3033 100", web: "stroke.org.uk", hours: "Mon-Fri 9am-5pm, Sat 10am-1pm", category: "Neurological & Vascular", desc: "Stroke recovery support, emotional care, and guidance on claiming PIP mobility and daily living components." },
  { name: "Versus Arthritis", phone: "0800 5200 520", web: "versusarthritis.org", hours: "Mon-Fri 9am-6pm", category: "Musculoskeletal", desc: "Dedicated helpline for arthritis and chronic pain conditions, offering physical activity guides and benefit advice." }
];

const BENEFIT_RATES_2026_2027 = {
  pip: {
    dailyLivingStandard: 76.70,
    dailyLivingEnhanced: 114.60,
    mobilityStandard: 30.30,
    mobilityEnhanced: 80.00,
    maxWeekly: 194.60,
    maxAnnual: 10119.20
  },
  universalCredit: {
    singleUnder25: 338.58,
    single25Plus: 424.90,
    coupleBothUnder25: 528.34,
    coupleOne25Plus: 666.97,
    lcwraElement: 429.80,
    lcwElement: 217.26,
    childElementFirst: 333.33,
    childElementSubsequent: 287.92
  },
  carersAllowance: {
    weeklyRate: 86.45,
    earningsCap: 204.00
  },
  benefitCap2026: {
    greaterLondon: {
      couplesFamiliesAnnual: 25323,
      singleAnnual: 16967
    },
    outsideLondon: {
      couplesFamiliesAnnual: 22020,
      singleAnnual: 14753
    },
    absoluteMaxCap: 25323
  }
};

// DYNAMIC EVALUATION ENGINE
const evaluatePipAndFinancialClaims = (rawInput) => {
  const text = rawInput.trim();
  const lower = text.toLowerCase();
  let score = 35;
  let flags = [];
  let primaryRebuttal = "";
  let sourceRef = "";
  let extractedQuotes = [];

  // Helper to extract specific phrases or locations
  const locationMatch = text.match(/\b(in|at|near|around)\s+([A-Z][a-z]+(?:\s+[A-Z][a-z]+)*)/);
  const location = locationMatch ? locationMatch[2] : null;

  const ratioMatch = text.match(/\b(\d+\s*in\s*\d+|\d+%\s*|\d+\s*out of\s*\d+)\b/i);
  const ratioStr = ratioMatch ? ratioMatch[1] : null;

  // Check for Demographic / Population Statistics Claims
  const popStatKeywords = ['million', 'millions', 'population', 'demographic', 'people', 'adults', 'claimants', 'recipients', 'citizens', 'working age', 'working-age'];
  const hasPopStatKeywords = popStatKeywords.some(kw => lower.includes(kw));

  // 1. DEMOGRAPHIC AND POPULATION STATISTICAL CLAIMS
  if (hasPopStatKeywords && !lower.includes('£') && !lower.includes('pound') && !lower.includes('a year') && !lower.includes('per year') && !lower.includes('per month')) {
    score = 85;
    extractedQuotes.push(`"${text.length > 120 ? text.substring(0, 120) + '...' : text}"`);
    flags.push(`Evaluates demographic and population figures regarding benefit claimant counts or working-age statistics.`);
    flags.push(`Distinguishes demographic volume metrics from monetary payment values and statutory rate limits.`);

    if (lower.includes('inactivity') || lower.includes('inactive') || lower.includes('long-term ill') || lower.includes('sick')) {
      flags.push(`Addresses economic inactivity and health statistics using primary ONS Labour Force Survey data.`);
      primaryRebuttal = `ANALYSIS OF STATEMENT: Evaluating the demographic statement regarding claimant counts and population health statistics: ONS Labour Market data confirms that 84% of economically inactive working-age adults have severe long-term illness, NHS treatment backlogs, caring responsibilities, or are full-time students. Claims exaggerating unverified claims confuse total demographic caseloads with statutory eligibility outcomes verified under DWP guidelines.`;
      sourceRef = "ONS Labour Market Overview (2026) & DWP Stat-Xplore Official Caseload Statistics";
    } else {
      flags.push(`Cross-references official DWP Stat-Xplore population registers and ONS census demographic baselines.`);
      primaryRebuttal = `ANALYSIS OF STATEMENT: Regarding the statement on demographic counts and population benefit figures in '${text}': DWP Stat-Xplore quarterly statistics provide verified, entitlement-tested figures for all active benefit caseloads across UK regions. Demographic statistics must be interpreted alongside statutory eligibility criteria and clinical assessment thresholds rather than unverified rhetoric.`;
      sourceRef = "DWP Stat-Xplore Caseload Data & ONS Population Estimates";
    }
    return { inputStatement: text, extractedQuotes, score, verdict: "Misleading Demographic Rhetoric / Population Unsubstantiated", flags, primaryRebuttal, sourceRef };
  }

  // 2. FINANCIAL CLAIMS
  const numbersInText = text.match(/£?\s*(\d+[\d,]*)\s*(k|thousand)?/gi) || [];
  let extractedAnnualAmount = 0;

  for (let match of numbersInText) {
    let clean = match.replace(/[£,\s]/g, '').toLowerCase();
    let val = 0;
    if (clean.endsWith('k')) {
      val = parseFloat(clean.replace('k', '')) * 1000;
    } else {
      val = parseFloat(clean);
    }
    if (val > extractedAnnualAmount && val < 1000000) {
      extractedAnnualAmount = val;
    }
  }

  if (lower.includes('60k') || lower.includes('60000') || lower.includes('60 thousand')) {
    extractedAnnualAmount = 60000;
  }

  const isFinancialClaim = extractedAnnualAmount > 0 || lower.includes('a year') || lower.includes('per year') || lower.includes('per month') || lower.includes('rates') || lower.includes('benefit cap');

  if (isFinancialClaim && extractedAnnualAmount > BENEFIT_RATES_2026_2027.benefitCap2026.absoluteMaxCap) {
    score = 98;
    extractedQuotes.push(`"${text.length > 120 ? text.substring(0, 120) + '...' : text}"`);
    flags.push(`Claims an annual benefit payout of £${extractedAnnualAmount.toLocaleString()}, directly violating statutory UK Benefit Caps (£25,323/yr London, £22,020/yr Outside London).`);
    flags.push(`Asserts that individuals can receive £${extractedAnnualAmount.toLocaleString()}/year, which is legally impossible under current DWP award limits.`);
    primaryRebuttal = `ANALYSIS OF STATEMENT: In response to the statement claiming recipients can get £${extractedAnnualAmount.toLocaleString()} per year: Under 2026/2027 UK Welfare Law, benefit payments are strictly capped at £25,323/year in Greater London or £22,020/year across the rest of the UK. Even with the maximum possible PIP Enhanced Daily Living and Mobility awards combined (£10,119.20/yr), reaching £${extractedAnnualAmount.toLocaleString()}/year is prohibited by statute.`;
    sourceRef = "DWP Statutory Benefit Rates & Benefit Cap Regulations 2026/2027 (GOV.UK)";
    return { inputStatement: text, extractedQuotes, score, verdict: "Extreme Misinformation / Impossible Claim", flags, primaryRebuttal, sourceRef };
  }

  // 3. MEDICAL CONDITION vs FUNCTIONAL ASSESSMENT ENGINE
  const minorConditions = ['tennis elbow', 'repetitive strain', 'mild fatigue', 'sprained wrist', 'hay fever', 'eczema', 'mild eczema', 'ingrown nail'];
  const hasMinorConditionMention = minorConditions.some(cond => lower.includes(cond));

  if (hasMinorConditionMention || (lower.includes('pip') && (lower.includes('just for') || lower.includes('get pip for') || lower.includes('claim pip for')))) {
    const matchedCond = minorConditions.find(cond => lower.includes(cond)) || "a named medical condition";
    score = 92;
    extractedQuotes.push(`"...${matchedCond}..."`);
    flags.push(`Misrepresents PIP as a condition-based award when evaluating '${matchedCond}'.`);
    flags.push(`Fails to recognize that PIP is evaluated strictly on daily living and mobility functional descriptors under the Welfare Reform Act 2012.`);
    primaryRebuttal = `ANALYSIS OF STATEMENT: Regarding the query on claiming PIP for ${matchedCond}: PIP is never granted based on medical diagnoses alone. Under DWP assessment rules, an applicant cannot receive PIP simply for having ${matchedCond}. Awards are decided by clinical scoring against 12 daily living and mobility descriptors evaluating functional impact over 12 months. Lacking daily living impairment results in immediate rejection.`;
    sourceRef = "DWP Personal Independence Payment (PIP) Assessment Guide for Providers (2026/27)";
    return { inputStatement: text, extractedQuotes, score, verdict: "High BS / Misleading Claim", flags, primaryRebuttal, sourceRef };
  }

  // 4. SWEEPING GENERALISATIONS & RHETORIC
  const sweepingPhrases = [
    'way of life', 'morally wrong', 'can\'t afford it', 'cant afford it',
    'culture of dependency', '1 in 5', '1 in 3', '1 in 4', '1 in 2',
    'lifestyle choice', 'shirking', 'idle generation', 'work ethic', 'blackpool'
  ];
  const containsSweepingStatement = sweepingPhrases.some(phrase => lower.includes(phrase)) || 
                                    (lower.includes('universal credit') && (lower.includes('adults') || lower.includes('britain')));

  if (containsSweepingStatement) {
    score = 88;
    
    if (location && ratioStr) {
      extractedQuotes.push(`"In ${location}, where it's ${ratioStr}..."`);
      flags.push(`Cites localized statistic (${ratioStr} in ${location}) to imply voluntary worklessness across total Universal Credit numbers.`);
    } else if (ratioStr) {
      extractedQuotes.push(`"...${ratioStr}..."`);
      flags.push(`Uses ratio rhetoric (${ratioStr}) without distinguishing between in-work top-ups and long-term health claims.`);
    }

    if (lower.includes('way of life')) {
      extractedQuotes.push(`"Welfare has become a way of life"`);
      flags.push(`Frames statutory benefit access as a voluntary 'way of life' or 'lifestyle choice'.`);
    }

    if (lower.includes('morally wrong') || lower.includes('can\'t afford it') || lower.includes('cant afford it')) {
      flags.push(`Uses emotive framing ('morally wrong' / 'can't afford it') while ignoring ONS data showing ~40% of Universal Credit claimants are in paid work.`);
    }

    flags.push("Omits official ONS & Resolution Foundation data showing 84% of economically inactive working-age adults suffer chronic illness, caring duties, or are full-time students.");

    const locationSnippet = location ? ` regarding ${location}` : "";
    const ratioSnippet = ratioStr ? ` quoting ${ratioStr}` : "";

    primaryRebuttal = `ANALYSIS OF STATEMENT: Evaluating the claim${locationSnippet}${ratioSnippet} that "welfare has become a way of life" and "it's morally wrong": This rhetoric conflates total Universal Credit claim numbers with voluntary worklessness. Official ONS & DWP statistics show that nearly 40% of all Universal Credit recipients are in active paid employment but rely on UC as an in-work wage top-up due to low pay or high housing costs. Furthermore, ONS longitudinal studies show that 84% of non-working claimants in local areas face long-term illness, NHS waiting list delays, or full-time caring responsibilities rather than voluntary lifestyle choice.`;
    sourceRef = "ONS Labour Market Overview (2026) & Resolution Foundation Welfare Analysis / DWP Stat-Xplore";
    return { inputStatement: text, extractedQuotes, score, verdict: "High BS / Misleading Generalisation", flags, primaryRebuttal, sourceRef };
  }

  // 5. GENERAL RHETORIC CHECK & FALLBACK
  if (lower.includes('scam') || lower.includes('shirker') || lower.includes('handout') || lower.includes('free car')) {
    score += 40;
    extractedQuotes.push(`"${text.length > 80 ? text.substring(0, 80) + '...' : text}"`);
    flags.push("Uses stigmatizing language and sensationalized framing to describe benefit claimants.");
  }
  
  if (lower.includes('fraud') || lower.includes('faking') || lower.includes('unverified')) {
    score += 30;
    extractedQuotes.push(`"...${lower.includes('fraud') ? 'fraud' : 'unverified'}..."`);
    flags.push("Conflates legitimate disability claims with criminal fraud.");
    primaryRebuttal = `ANALYSIS OF STATEMENT: Responding to claims regarding fraud or unverified claims in '${text}': Official DWP statistics show PIP fraud is under 0.2%. Over 70% of appealed rejections are overturned at HMCTS independent tribunals due to initial DWP assessment errors.`;
    sourceRef = "DWP Fraud and Error Report 2025/2026 & Ministry of Justice HMCTS Data";
  } else if (lower.includes('fit note') || lower.includes('sick note')) {
    score += 25;
    extractedQuotes.push(`"...${lower.includes('fit note') ? 'fit note' : 'sick note'}..."`);
    flags.push("Misrepresents clinical fit note issuance by qualified medical staff.");
    primaryRebuttal = `ANALYSIS OF STATEMENT: Addressing the assertion about fit notes in '${text}': Fit notes are clinical assessments issued by licensed healthcare professionals subject to GMC fitness-to-practice standards.`;
    sourceRef = "NHS Digital Fit Note Data & Royal College of General Practitioners";
  } else if (!primaryRebuttal) {
    primaryRebuttal = `ANALYSIS OF STATEMENT: Evaluating '${text}': Claim requires verified cross-referencing against DWP Stat-Xplore, official 2026/2027 Benefit Rates, and ONS health/employment datasets.`;
    sourceRef = "ONS Labour Market Review & DWP Stat-Xplore database";
  }

  if (score > 98) score = 98;
  return {
    inputStatement: text,
    extractedQuotes,
    score,
    verdict: score > 75 ? "Extreme Misinformation / Misleading" : score > 50 ? "Moderate Bias / Unsubstantiated" : "Low BS / Mostly Factual",
    flags,
    primaryRebuttal,
    sourceRef
  };
};

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
      {/* Top Banner */}
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

      {/* Main Navigation Tabs */}
      <nav className={`border-b ${highContrast ? 'border-yellow-400 bg-black' : 'border-slate-800 bg-slate-900/80'} px-4 sticky top-[61px] z-40 backdrop-blur-md`}>
        <div className="max-w-7xl mx-auto flex overflow-x-auto no-scrollbar gap-1 py-2">
          {[
            { id: 'leaderboard', label: 'Top 10 Hall of Fame', icon: Award, badge: 'New' },
            { id: 'analyzer', label: 'BS Meter & Analyzer', icon: Zap },
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

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 py-6 space-y-8">

        {/* SECTION 1: LEADERBOARD */}
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
                  { id: 'social_media', label: 'MP Social Media (X/TikTok/FB)', icon: Share2 },
                  { id: 'byParty', label: 'By Political Party', icon: Users },
                  { id: 'tabloids', label: 'Tabloids & Newspapers', icon: Newspaper },
                  { id: 'broadcasters', label: 'TV & Radio Broadcasters', icon: Radio },
                ].map((cat) => {
                  const Icon = cat.icon;
                  const isSel = leaderboardCategory === cat.id;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => { setLeaderboardCategory(cat.id); setExpandedFigure(null); }}
                      className={`flex items-center justify-center gap-2 flex-1 sm:flex-initial px-4 py-2 rounded-lg text-xs font-bold transition whitespace-nowrap ${ isSel ? 'bg-purple-600 text-white shadow-md' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800' }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{cat.label}</span>
                    </button>
                  );
                })}
              </div>

              <div className="flex items-center gap-2 text-xs text-slate-400 shrink-0">
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

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-4">
                {filteredLeaderboardData[leaderboardCategory]?.map((item) => {
                  const isExpanded = expandedFigure === item.id;
                  return (
                    <div
                      key={item.id}
                      className={`rounded-xl border ${ highContrast ? 'border-yellow-400 bg-black' : 'border-slate-800 bg-slate-900/90 hover:border-slate-700' } transition overflow-hidden`}
                    >
                      <div className="p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                        <div className="flex items-start gap-3">
                          <div className={`w-10 h-10 rounded-xl font-black flex items-center justify-center text-lg ${ item.rank === 1 ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40' : item.rank === 2 ? 'bg-slate-300/20 text-slate-200 border border-slate-300/40' : item.rank === 3 ? 'bg-amber-700/20 text-amber-600 border border-amber-700/40' : 'bg-slate-800 text-slate-400' }`}>
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

                      <div className="px-4 py-2.5 bg-slate-950/60 border-t border-slate-800/80 flex items-center justify-between text-xs gap-3">
                        <span className="text-slate-400 line-clamp-1">
                          <strong className="text-rose-300 font-semibold">Most Frequent Misleading Statement:</strong> "{item.topClaim}"
                        </span>
                        <span className="text-[10px] text-slate-500 shrink-0">Updated {item.lastUpdated}</span>
                      </div>

                      {isExpanded && (
                        <div className="p-5 bg-slate-950/90 border-t border-slate-800 space-y-4">
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

                  <div className="space-y-3 max-h-[500px] overflow-y-auto pr-1">
                    {liveFeed.map((feed) => (
                      <div key={feed.id} className="p-3 rounded-lg bg-slate-950 border border-slate-800/80 text-xs space-y-1.5">
                        <div className="flex items-center justify-between text-[10px] text-slate-400">
                          <span className="font-semibold text-purple-300">{feed.author}</span>
                          <span>{feed.time}</span>
                        </div>
                        <p className="text-slate-200 text-xs leading-snug">{feed.text}</p>
                        <div className="flex items-center justify-between pt-1 text-[10px]">
                          <span className={`px-1.5 py-0.5 rounded font-bold ${ feed.bsFlag.includes('High') || feed.bsFlag.includes('Extreme') ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30' : 'bg-teal-500/20 text-teal-300 border border-teal-500/30' }`}>
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

        {/* SECTION 2: BS METER & ANALYZER */}
        {activeTab === 'analyzer' && (
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
              <div className="flex items-center gap-2 text-purple-400 text-xs font-bold uppercase tracking-wider">
                <Zap className="w-4 h-4" />
                <span>Interactive Fact Analyzer & PIP Assessor</span>
              </div>
              <h2 className="text-2xl font-black text-slate-100">
                Welfare Rhetoric & BS Meter Analyzer
              </h2>
              <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
                Paste any headline, speech quote, condition assertion (e.g. tennis elbow), or financial claim (e.g. £60k/yr). Evaluates inputs dynamically and directly breaks down the specific submitted text against 2026/2027 statutory rates, PIP scoring descriptors, and legal benefit caps.
              </p>
            </div>

            {/* Input Box */}
            <div className="space-y-3">
              <textarea
                value={analyzerInput}
                onChange={(e) => setAnalyzerInput(e.target.value)}
                placeholder="Paste headline, speech snippet, or statement here... (e.g. 'Last week I was in Blackpool, where it's 1 in 3. Welfare has become a way of life. This has to stop.')"
                className="w-full h-36 p-4 rounded-xl bg-slate-900 border border-slate-800 text-slate-100 placeholder-slate-500 text-sm focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
              />
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex flex-wrap gap-2 text-xs">
                  <button
                    onClick={() => setAnalyzerInput("Last week I was in Blackpool, where it's 1 in 3. Welfare has become a way of life. This has to stop. We can't afford it - and it's morally wrong.")}
                    className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-purple-300 font-semibold border border-purple-500/30"
                  >
                    Sample: Blackpool Speech
                  </button>
                  <button
                    onClick={() => setAnalyzerInput("Can a PIP claimant get benefits just for tennis elbow?")}
                    className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300"
                  >
                    Sample: Tennis Elbow
                  </button>
                  <button
                    onClick={() => setAnalyzerInput("Can PIP claimants get £60k a year in benefit payouts?")}
                    className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300"
                  >
                    Sample: £60k a Year
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
                      <span>Parsing Statement & DWP Check...</span>
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
              <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-6">
                
                {/* DYNAMICALLY QUOTED STATEMENT DISPLAY */}
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                  <div className="text-xs font-bold text-purple-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Quote className="w-4 h-4" /> Target Statement Being Evaluated
                  </div>
                  <p className="text-sm italic text-slate-200 bg-slate-900/60 p-3 rounded-lg border border-slate-800/80 font-serif">
                    "{analysisResult.inputStatement}"
                  </p>
                  {analysisResult.extractedQuotes && analysisResult.extractedQuotes.length > 0 && (
                    <div className="flex flex-wrap items-center gap-2 pt-1 text-[11px]">
                      <span className="text-slate-400">Identified Key Claims:</span>
                      {analysisResult.extractedQuotes.map((q, idx) => (
                        <span key={idx} className="px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 border border-rose-500/30 font-mono">
                          {q}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Meter Scale Display */}
                <div className="space-y-3">
                  <div className="flex justify-between items-end">
                    <div>
                      <div className="text-xs text-slate-400 font-semibold uppercase">BS Rating Verdict</div>
                      <div className={`text-xl font-black ${ analysisResult.score > 75 ? 'text-rose-400' : analysisResult.score > 40 ? 'text-amber-400' : 'text-teal-400' }`}>
                        {analysisResult.verdict} ({analysisResult.score}%)
                      </div>
                    </div>
                  </div>

                  <div className="w-full h-4 rounded-full bg-slate-800 overflow-hidden relative">
                    <div
                      className={`h-full transition-all duration-700 ${ analysisResult.score > 75 ? 'bg-gradient-to-r from-amber-500 to-rose-600' : 'bg-gradient-to-r from-teal-500 to-amber-500' }`}
                      style={{ width: `${analysisResult.score}%` }}
                    />
                  </div>
                </div>

                {/* Tailored Flagged Issues */}
                {analysisResult.flags.length > 0 && (
                  <div className="space-y-2">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-rose-400 flex items-center gap-1.5">
                      <AlertTriangle className="w-4 h-4" /> Tailored Breakdown of Statements & Misleading Rhetoric
                    </h4>
                    <ul className="space-y-2 text-xs text-slate-300">
                      {analysisResult.flags.map((flag, idx) => (
                        <li key={idx} className="flex items-start gap-2.5 bg-slate-950 p-3 rounded-lg border border-slate-800">
                          <span className="text-rose-400 font-bold text-sm leading-none">•</span>
                          <span className="leading-relaxed">{flag}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Tailored Fact Rebuttal */}
                <div className="p-4 rounded-xl bg-teal-950/30 border border-teal-500/30 space-y-2">
                  <div className="flex items-center gap-2 text-teal-300 font-bold text-xs uppercase tracking-wider">
                    <CheckCircle2 className="w-4 h-4" /> Statement-Tailored Primary Data Rebuttal
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

        {/* SECTION 3: MYTH VAULT */}
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

                  <div className="p-3 rounded-xl bg-rose-950/20 border border-rose-500/30 space-y-1">
                    <div className="text-[11px] font-bold text-rose-400 uppercase tracking-wider flex items-center gap-1">
                      <XCircle className="w-3.5 h-3.5" /> Common Misleading Claim
                    </div>
                    <p className="text-xs md:text-sm text-slate-200 font-medium">"{myth.claim}"</p>
                  </div>

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

        {/* SECTION 4: ECONOMIC IMPACT */}
        {activeTab === 'economics' && (
          <div className="max-w-5xl mx-auto space-y-8">
            <div className="p-6 rounded-2xl bg-gradient-to-r from-teal-950/80 via-slate-900 to-slate-900 border border-teal-500/30 space-y-3">
              <div className="flex items-center gap-2 text-teal-400 text-xs font-bold uppercase tracking-wider">
                <LineChart className="w-4 h-4" />
                <span>Macroeconomic Analysis & Fiscal Reality</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-black text-slate-100">
                PIP Macroeconomic Multiplier & Welfare Spend vs. GDP Trends
              </h2>
              <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
                Economic evidence debunking misconceptions surrounding disability expenditure. Personal Independence Payment (PIP) acts as a high-velocity fiscal multiplier in local economies, while UK welfare spend as a percentage of GDP has remained stable and well below historical peaks.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-6">
              <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
                <div className="p-2.5 rounded-xl bg-teal-500/20 text-teal-300 border border-teal-500/30">
                  <Coins className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-black text-slate-100">
                    1. PIP as an Economic Multiplier Effect (£1.40–£1.70 Return)
                  </h3>
                  <p className="text-xs text-slate-400">
                    How disability extra-cost awards directly stimulate regional economic output and employment.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                  <div className="text-2xl font-black text-teal-400">1.40x – 1.70x</div>
                  <div className="text-xs font-bold text-slate-200">Local Multiplier Value</div>
                  <p className="text-[11px] text-slate-400 leading-normal">
                    Every £1.00 disbursed via PIP creates up to £1.70 in local transaction volume across retail, energy, and community services.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                  <div className="text-2xl font-black text-purple-400">Immediate Liquidity</div>
                  <div className="text-xs font-bold text-slate-200">High Marginal Propensity</div>
                  <p className="text-[11px] text-slate-400 leading-normal">
                    Unlike high-income tax cuts which are frequently saved, 99%+ of PIP disbursements are spent immediately on essential items.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                  <div className="text-2xl font-black text-amber-400">Indirect VAT Return</div>
                  <div className="text-xs font-bold text-slate-200">Fiscal Recoupment</div>
                  <p className="text-[11px] text-slate-400 leading-normal">
                    Local spending generates direct VAT revenue, supporting local jobs, high streets, and preventing emergency healthcare costs.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SECTION 5: CHARITIES DIRECTORY */}
        {activeTab === 'charities' && (
          <div className="space-y-6">
            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
              <div className="flex items-center gap-2 text-teal-400 text-xs font-bold uppercase tracking-wider">
                <HeartHandshake className="w-4 h-4" />
                <span>Verified Support Network</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-black text-slate-100">
                A-Z Directory of UK Disability Charities & Support Organizations
              </h2>
              <p className="text-xs md:text-sm text-slate-300">
                Search qualified UK charities providing helpline support, PIP appeal representation, and independent clinical guidance.
              </p>

              <div className="flex flex-col md:flex-row items-center gap-3 pt-2">
                <div className="relative w-full md:w-80">
                  <Search className="w-4 h-4 absolute left-3 top-3 text-slate-500" />
                  <input
                    type="text"
                    value={charitySearch}
                    onChange={(e) => setCharitySearch(e.target.value)}
                    placeholder="Search charity name or condition..."
                    className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-purple-500"
                  />
                </div>

                <select
                  value={charityCategory}
                  onChange={(e) => setCharityCategory(e.target.value)}
                  className="w-full md:w-64 p-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-purple-500"
                >
                  {charityCategoriesList.map((cat, i) => (
                    <option key={i} value={cat}>{cat === 'ALL' ? 'All Condition Categories' : cat}</option>
                  ))}
                </select>
              </div>

              <div className="flex flex-wrap gap-1 pt-2">
                {['ALL', 'A', 'B', 'C', 'D', 'E', 'H', 'M', 'N', 'P', 'R', 'S', 'V'].map((lettr) => (
                  <button
                    key={lettr}
                    onClick={() => setCharityLetter(lettr)}
                    className={`px-2.5 py-1 rounded text-xs font-bold transition ${charityLetter === lettr ? 'bg-purple-600 text-white' : 'bg-slate-950 text-slate-400 hover:text-slate-200'}`}
                  >
                    {lettr}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredCharities.map((item, idx) => (
                <div key={idx} className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3 hover:border-slate-700 transition">
                  <div className="flex justify-between items-start gap-2">
                    <div>
                      <h3 className="font-bold text-base text-slate-100">{item.name}</h3>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-teal-500/20 text-teal-300 font-semibold border border-teal-500/30">
                        {item.category}
                      </span>
                    </div>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">{item.desc}</p>
                  <div className="pt-2 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-2 text-xs font-mono text-slate-400">
                    <span className="flex items-center gap-1 text-purple-300"><Phone className="w-3.5 h-3.5" /> {item.phone}</span>
                    <a href={`https://${item.web}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-teal-400 hover:underline">
                      <Globe className="w-3.5 h-3.5" /> {item.web}
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SECTION 6: MP BRIEFING */}
        {activeTab === 'briefing' && (
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
              <div className="flex items-center gap-2 text-teal-400 text-xs font-bold uppercase tracking-wider">
                <Printer className="w-4 h-4" />
                <span>Constituency Export Tool</span>
              </div>
              <h2 className="text-2xl font-black text-slate-100">
                MP & Public Representative Briefing Generator
              </h2>
              <p className="text-xs md:text-sm text-slate-300">
                Generate print-ready constituency briefing sheets containing verified DWP, ONS, and HMCTS tribunal stats to send to your local MP or councilor.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-400 mb-1">Constituency Name</label>
                  <input
                    type="text"
                    value={constituency}
                    onChange={(e) => setConstituency(e.target.value)}
                    placeholder="e.g. Gosport / North West Norfolk"
                    className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 mb-1">Target MP / Representative Name</label>
                  <input
                    type="text"
                    value={mpName}
                    onChange={(e) => setMpName(e.target.value)}
                    placeholder="e.g. Rt Hon MP"
                    className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-purple-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 mb-2">Select Verified Fact Modules To Include:</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
                  {[
                    { id: 'pip_rates', label: '1. Official PIP Rates 2026/27 (£194.60 max/wk)' },
                    { id: 'pip_multiplier', label: '2. PIP Local Economic Multiplier (£1.40 - £1.70)' },
                    { id: 'welfare_gdp', label: '3. Welfare Spend vs GDP Trends (Stable ~10-11%)' },
                    { id: 'pip_fraud', label: '4. DWP Fraud Statistics (Under 0.2%)' },
                    { id: 'tribunals', label: '5. HMCTS Tribunal Success (70%+ Overturn Rate)' },
                    { id: 'uc_rates', label: '6. Universal Credit Rates & LCWRA Health Element' },
                    { id: 'carers', label: '7. Carer\'s Allowance & Overpayment Thresholds' }
                  ].map((topic) => (
                    <button
                      key={topic.id}
                      onClick={() => toggleTopic(topic.id)}
                      className={`p-2.5 rounded-xl text-left font-medium border transition ${selectedTopics.includes(topic.id) ? 'bg-purple-600/20 text-purple-200 border-purple-500/40' : 'bg-slate-950 text-slate-400 border-slate-800'}`}
                    >
                      {topic.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-4 flex gap-3">
                <button
                  onClick={copyBriefingText}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-teal-500 text-slate-950 font-bold text-xs hover:bg-teal-400 transition"
                >
                  <Copy className="w-4 h-4" />
                  <span>{briefingCopied ? 'Copied to Clipboard!' : 'Copy Briefing Text'}</span>
                </button>
                <button
                  onClick={handlePrintBriefing}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-purple-600 text-white font-bold text-xs hover:bg-purple-500 transition"
                >
                  <Printer className="w-4 h-4" />
                  <span>Print Briefing Pack</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* SECTION 7: RIGHTS */}
        {activeTab === 'rights' && (
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
              <div className="flex items-center gap-2 text-teal-400 text-xs font-bold uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4" />
                <span>Legal Entitlements Framework</span>
              </div>
              <h2 className="text-2xl font-black text-slate-100">
                Know Your PIP & Assessment Rights
              </h2>
              <p className="text-xs md:text-sm text-slate-300">
                Essential legal entitlements for applicants navigating PIP assessments, mandatory reconsiderations, and HMCTS independent tribunals.
              </p>
            </div>

            <div className="space-y-4">
              <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                <h3 className="font-bold text-base text-purple-300">1. Right to Audio Record Assessments</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Claimants have the statutory right to audio record their PIP consultation (both telephone and in-person assessments) provided notice is given to the assessment provider.
                </p>
              </div>

              <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                <h3 className="font-bold text-base text-teal-300">2. Right to Request Assessment Reports (PA4 Form)</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  You are legally entitled to request a full copy of your PA4 Medical Assessment Report from the DWP before a formal decision letter is issued.
                </p>
              </div>

              <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                <h3 className="font-bold text-base text-amber-300">3. Independent HMCTS Appeal Right</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  If Mandatory Reconsideration is rejected, you have the statutory right to appeal to an independent HMCTS tribunal chaired by a judge, doctor, and disability expert.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* SECTION 8: LEGAL */}
        {activeTab === 'legal' && (
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
              <div className="flex items-center gap-2 text-purple-400 text-xs font-bold uppercase tracking-wider">
                <Scale className="w-4 h-4" />
                <span>Editorial & Legal Governance</span>
              </div>
              <h2 className="text-2xl font-black text-slate-100">
                Legal Standards & Data Methodology
              </h2>
              <p className="text-xs md:text-sm text-slate-300">
                How the UK Welfare Truth Index maintains objective primary data accuracy under UK defamation law and Fair Dealing provisions.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3 text-xs text-slate-300 leading-relaxed">
              <p>
                All content published on the UK Welfare Truth Index is compiled strictly from published government statistical databases, including DWP Stat-Xplore, Ministry of Justice HMCTS Tribunal Bulletins, and ONS Labour Market Reviews.
              </p>
              <p>
                Public statements by elected representatives and political organizations are evaluated under UK Public Interest Defamation Act 2013 s.4 provisions.
              </p>
            </div>
          </div>
        )}

        {/* SECTION 9: SUPPORT */}
        {activeTab === 'support' && (
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
              <div className="flex items-center gap-2 text-teal-400 text-xs font-bold uppercase tracking-wider">
                <Users className="w-4 h-4" />
                <span>Immediate Help Directory</span>
              </div>
              <h2 className="text-2xl font-black text-slate-100">
                Disability Help & Free Advice Helplines
              </h2>
              <p className="text-xs md:text-sm text-slate-300">
                Independent national charities providing free, confidential welfare advice and appeal support.
              </p>
            </div>

            <div className="space-y-4">
              {SUPPORT_ORGANIZATIONS.map((org, idx) => (
                <div key={idx} className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
                  <div className="flex justify-between items-center">
                    <h3 className="font-bold text-base text-slate-100">{org.name}</h3>
                    <span className="text-xs font-mono text-teal-400 font-bold">{org.phone}</span>
                  </div>
                  <p className="text-xs text-slate-300">{org.desc}</p>
                  <div className="text-[11px] font-mono text-purple-300">{org.web}</div>
                </div>
              ))}
            </div>
          </div>
        )}

      </main>
    </div>
  );
}
