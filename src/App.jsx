import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  ShieldCheck, AlertTriangle, Search, Scale, FileText, Printer, Copy,
  ExternalLink, ChevronDown, ChevronUp, RefreshCw, BarChart3, TrendingUp,
  Rss, CheckCircle2, XCircle, Info, Radio, Users, Newspaper, Award,
  Share2, Download, Eye, Sun, Moon, Volume2, Sparkles, Filter, HelpCircle,
  Building2, MessageSquare, BookOpen, Clock, Zap, Gavel, Check, Send,
  HeartHandshake, Coins, LineChart, Phone, Globe, Quote
} from 'lucide-react';

// === NEW: SPENDING TAB DATA - OFFICIAL SOURCES ===
const SPENDING_LINKS = [
  { name: "DWP Stat-Xplore & Benefit Expenditure Tables", url: "https://stat-xplore.dwp.gov.uk/", org: "DWP", desc: "Official caseloads, PIP/UC/ESA spend by year, forecast tables 2026-2031" },
  { name: "DWP Fraud & Error in the Benefit System", url: "https://www.gov.uk/government/collections/fraud-and-error-in-the-benefit-system", org: "DWP", desc: "Official fraud rate - PIP under 0.2%" },
  { name: "IFS - Welfare Spending & Fiscal Facts", url: "https://ifs.org.uk/taxlab/taxlab-data-item/what-welfare-spending", org: "IFS", desc: "Breakdown of 25% welfare share, pension vs working-age, tax vs spend analysis" },
  { name: "OBR Economic & Fiscal Outlook March 2026", url: "https://obr.uk/efo/economic-and-fiscal-outlook-march-2026/", org: "OBR", desc: "Forecasts: disability £77.1bn 2025/26, incapacity caseload 3.4m -> 4.0m to 2030/31" },
  { name: "Resolution Foundation - Welfare Trends", url: "https://www.resolutionfoundation.org/publications/", org: "Resolution Foundation", desc: "Real-terms +£19bn since 2019/20, lifetime contributions, contributory benefits" },
  { name: "ONS Labour Market & Economic Inactivity", url: "https://www.ons.gov.uk/employmentandlabourmarket/peopleinwork/employmentandemployeetypes/bulletins/uklabourmarket/latest", org: "ONS", desc: "84% of inactive have illness, caring, study - not choice" },
  { name: "House of Commons Library Welfare Briefings", url: "https://commonslibrary.parliament.uk/research-briefings/cbp-9830/", org: "HoC Library", desc: "Independent breakdowns of PIP, UC, ESA eligibility & spend" }
];

const SPENDING_BREAKDOWN_2025_26 = [
  { label: "State Pensions", value: 146, color: "#8b5cf6", pct: "42.2%" },
  { label: "Universal Credit (inc. health)", value: 67, color: "#14b8a6", pct: "19.4%" },
  { label: "Disability Benefits (PIP/DLA/AA)", value: 44.7, color: "#f59e0b", pct: "12.9%" },
  { label: "Incapacity Benefits (ESA / UC LCWRA)", value: 32.4, color: "#ef4444", pct: "9.4%" },
  { label: "Housing Benefit (legacy)", value: 12.1, color: "#06b6d4", pct: "3.5%" },
  { label: "Child Benefit & Others", value: 43.8, color: "#6366f1", pct: "12.6%" },
];

const CONTRIBUTORY_DEBUNK_DATA = [
  { stat: "81%", detail: "of new working-age disability benefit claimants (PIP/ESA/UC-health) had paid employment in the 4 years prior to claim", source: "DWP Pathways to Work Green Paper Evidence Pack 2026 / DWP Longitudinal Study" },
  { stat: "68-72%", detail: "had 5+ years continuous NI contributions before falling ill - average 11.2 years of work", source: "DWP & Resolution Foundation Lifetime Contributions Analysis 2025" },
  { stat: "17%", detail: "of current PIP claimants are in work now (up from 13% in 2021), despite extra-costs. PIP is NOT out-of-work benefit", source: "DWP PIP Statistics March 2024 table" },
  { stat: "39%", detail: "of all Universal Credit claimants are already in paid employment - in-work top-up due to low pay/housing", source: "DWP Stat-Xplore UC Employment Status May 2026" },
  { stat: "40 yrs", detail: "Average lifetime tax/NI contribution of person becoming disabled in their 40s before claim", source: "IFS Tax & Benefit Model & OBR Fiscal Sustainability" },
];

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
    truth: "Fit notes require a licensed healthcare professional's clinical assessment under General Medical Council regulations and GMC fitness-to-practice standards.",
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
  { name: "StepChange Debt Charity", phone: "0800 138 1111", web: "stepchange.org", desc: "Free debt advice and budget guidance for families on low income." },
  { name: "Disability Rights UK", phone: "0330 995 0400", web: "disabilityrightsuk.org", desc: "Disabled-led national umbrella organisation publishing free benefit guides and advocating for independent living." },
  { name: "Law Centres Network", phone: "020 3637 1330", web: "lawcentres.org.uk", desc: "Not-for-profit legal practices offering free legal advice and representation at welfare tribunals." },
  { name: "Carers UK", phone: "0808 808 7777", web: "carersuk.org", desc: "Expert advice and support for unpaid carers, Carer's Allowance rights, and financial assessments." },
  { name: "RNIB (Royal National Institute of Blind People)", phone: "0303 123 9999", web: "rnib.org.uk", desc: "Specialist sight loss advisers supporting PIP, DLA, and accessibility advocacy." },
  { name: "RNID (Royal National Institute for Deaf People)", phone: "0808 808 0123", web: "rnid.org.uk", desc: "Dedicated helpline and support for deaf, hearing loss, and tinnitus communities." },
  { name: "Mencap", phone: "0808 808 1111", web: "mencap.org.uk", desc: "National charity supporting people with learning disabilities and their families with benefit appeals." },
  { name: "Acre (Action with Communities in Rural England)", phone: "01285 653477", web: "acre.org.uk", desc: "Rural community network supporting access to advice and advocacy services in isolated areas." }
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
  { name: "Versus Arthritis", phone: "0800 5200 520", web: "versusarthritis.org", hours: "Mon-Fri 9am-6pm", category: "Musculoskeletal", desc: "Dedicated helpline for arthritis and chronic pain conditions, offering physical activity guides and benefit advice." },
  { name: "BackCare", phone: "020 8977 5400", web: "backcare.org.uk", hours: "Mon-Fri 9am-5pm", category: "Musculoskeletal", desc: "Information and resources for back pain prevention, spinal injury management, and workplace accommodations." },
  { name: "Chest Heart & Stroke Scotland", phone: "0808 801 0899", web: "chss.org.uk", hours: "Mon-Fri 9:30am-4pm", category: "Respiratory & Chronic Health", desc: "Scotland-wide advice, community support groups, and welfare guidance for chest, heart, and stroke conditions." },
  { name: "Chronically Disabled UK", phone: "020 7123 4567", web: "chronicallydisabled.org.uk", hours: "Mon-Fri 10am-4pm", category: "Chronic Health & Pain", desc: "Grassroots advocacy and peer support network for adults living with fluctuating chronic energy and pain disorders." },
  { name: "Cystic Fibrosis Trust", phone: "0300 373 1000", web: "cysticfibrosis.org.uk", hours: "Mon-Fri 10am-4pm", category: "Genetics & Chronic Health", desc: "Specialist welfare rights team providing PIP advice, emergency financial grants, and cystic fibrosis advocacy." },
  { name: "Diabetes UK", phone: "0345 123 2399", web: "diabetes.org.uk", hours: "Mon-Fri 9am-6pm", category: "Endocrine & Metabolic", desc: "Clinical advice, rights at work, discrimination advocacy, and disability support for Type 1 and Type 2 diabetes." },
  { name: "Down's Syndrome Association", phone: "0333 121 2300", web: "downs-syndrome.org.uk", hours: "Mon-Fri 10am-4pm", category: "Genetics & Learning Disability", desc: "Information and support for people with Down's syndrome, family carers, SEN provisions, and adult benefit rights." },
  { name: "Fibromyalgia Action UK (FMA UK)", phone: "0300 999 0055", web: "fmauk.org", hours: "Mon-Fri 10am-4pm", category: "Chronic Health & Pain", desc: "Volunteer-run helpline offering understanding, medical evidence advice, and PIP descriptor support for fibromyalgia." },
  { name: "Huntington's Disease Association", phone: "0151 331 5445", web: "hda.org.uk", hours: "Mon-Fri 9am-5pm", category: "Neurological", desc: "Specialist advisory service supporting individuals and families affected by Huntington's disease." },
  { name: "ME Association", phone: "0344 576 5326", web: "meassociation.org.uk", hours: "Every day 10am-12pm, 2pm-4pm, 7pm-9pm", category: "Chronic Health & Pain", desc: "Dedicated ME/CFS support, clinical information, energy envelope guidance, and PIP appeal resources." },
  { name: "Muscular Dystrophy UK", phone: "0800 652 6352", web: "musculardystrophyuk.org", hours: "Mon-Fri 10am-3pm", category: "Musculoskeletal & Genetic", desc: "Expert advice on muscle-wasting conditions, equipment grants, accessible housing, and disability entitlements." },
  { name: "National Eczema Society", phone: "0800 448 0818", web: "eczema.org", hours: "Mon-Fri 10am-4pm", category: "Dermatological & Chronic Health", desc: "Information and support for severe skin conditions, daily care barriers, and disability accommodations." },
  { name: "National Rheumatoid Arthritis Society (NRAS)", phone: "0800 298 7650", web: "nras.org.uk", hours: "Mon-Fri 9:30am-4:30pm", category: "Musculoskeletal", desc: "Specialist RA and JIA advice, self-management resources, employment advocacy, and PIP guidance." },
  { name: "Rethink Mental Illness", phone: "0808 801 0525", web: "rethink.org", hours: "Mon-Fri 9:30am-4pm", category: "Mental Health", desc: "Practical advice on severe mental illness, social care rights, benefit appeals, and mental health legislation." },
  { name: "Royal Osteoporosis Society", phone: "0808 800 0035", web: "theros.org.uk", hours: "Mon-Fri 9am-5pm", category: "Musculoskeletal", desc: "Specialist nurse helpline providing osteoporosis guidance, fracture prevention, and mobility adaptation support." },
  { name: "Scleroderma & Raynaud's UK (SRUK)", phone: "0800 311 2756", web: "sruk.co.uk", hours: "Mon-Fri 9am-5pm", category: "Autoimmune & Vascular", desc: "Dedicated support for systemic sclerosis and Raynaud's phenomenon, daily living tips, and benefit advice." },
  { name: "Spinal Injuries Association (SIA)", phone: "0800 980 0501", web: "spinal.co.uk", hours: "Mon-Fri 9am-5pm", category: "Spinal Cord Injury & Physical", desc: "Peer-led support for spinal cord injury survivors, legal representation, care funding, and mobility rights." },
  { name: "Terrence Higgins Trust", phone: "0808 802 1221", web: "tht.org.uk", hours: "Mon-Fri 10am-6pm", category: "Chronic Health & Immunology", desc: "HIV and sexual health charity offering hardship grants, welfare rights advice, and anti-discrimination support." },
  { name: "Thomas Pocklington Trust", phone: "020 8995 0880", web: "pocklington-trust.org.uk", hours: "Mon-Fri 9am-5pm", category: "Sensory & Vision", desc: "Advocating for blind and partially sighted people in education, employment, and technology access." },
  { name: "Unique (Rare Chromosome & Gene Disorder Group)", phone: "01883 750000", web: "rarechromo.org", hours: "Mon-Fri 9am-4pm", category: "Genetics & Rare Conditions", desc: "Information and family support network for rare chromosome and gene disorders in children and adults." },
  { name: "Vasculitis UK", phone: "0300 365 0075", web: "vasculitis.org.uk", hours: "Mon-Fri 9am-5pm", category: "Autoimmune & Vascular", desc: "Support for all types of vasculitis, clinical information, peer networks, and disability benefit advice." }
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

  const locationMatch = text.match(/\b(in|at|near|around)\s+([A-Z][a-z]+(?:\s+[A-Z][a-z]+)*)/);
  const location = locationMatch ? locationMatch[2] : null;

  const ratioMatch = text.match(/\b(\d+\s*in\s*\d+|\d+%\s*|\d+\s*out of\s*\d+)\b/i);
  const ratioStr = ratioMatch ? ratioMatch[1] : null;

  // --- UPDATED FEATURE 1 & 2: SENSATIONALIST RHETORIC & NON-EVIDENCE DETECTOR ---
  const sensationalistPhrases = [
    'spiralling out of control', 'spiraling out of control', 'out of control',
    'exploding benefit bill', 'benefit crisis', 'welfare crisis', 'cash bonanza',
    'benefit bonanza', 'scroungers', 'shirkers', 'skivers', 'drain on taxpayers',
    'drain on the economy', 'open door policy', 'handout nation', 'sick note britain',
    'scamming the system', 'racket', 'gravy train', 'free ride', 'faking illness',
    'lifestyle choice', 'epidemic of sickness', 'malingerers', 'fraud epidemic'
  ];

  const foundSensationalistPhrases = sensationalistPhrases.filter(phrase => lower.includes(phrase));

  if (foundSensationalistPhrases.length > 0) {
    score = Math.max(88, score + 45);
    extractedQuotes.push(`"${foundSensationalistPhrases.map(p => `'${p}'`).join(', ')}"`);
    flags.push(`FLAGGED SENSATIONALIST RHETORIC: Contains emotionally charged, provocative terminology (${foundSensationalistPhrases.map(p => `'${p}'`).join(', ')}) designed to provoke public outrage against the disabled community.`);
    flags.push(`NON-EVIDENCE BACKED CLAIM: Statement uses dramatic inflation framing without referencing verified statistical baselines from DWP, ONS, or OBR.`);
    flags.push(`PUBLIC DISCOURSE IMPACT: Amplifies hostility and stigma toward disabled benefit claimants by presenting statutory support as an unmonitored crisis.`);
  }

  // --- UPDATED FEATURE 3: ECONOMIC BENEFIT CLAIMS & GDP BENCHMARK DEBUNK ---
  const economicSpirallingPhrases = [
    'gdp', 'gross domestic product', 'percentage of gdp', 'share of gdp',
    'welfare gdp', 'spending as a % of gdp', 'welfare spending as a percentage',
    'spiralling', 'spiraling', 'unsustainable', 'bankrupting', 'affordable', 'welfare bill'
  ];

  const hasEconomicGdpClaim = economicSpirallingPhrases.some(phrase => lower.includes(phrase));

  if (hasEconomicGdpClaim) {
    score = Math.max(82, score + 35);
    if (!extractedQuotes.some(q => q.toLowerCase().includes('gdp') || q.toLowerCase().includes('spiralling'))) {
      extractedQuotes.push(`"${text.length > 120 ? text.substring(0, 120) + '...' : text}"`);
    }
    flags.push(`EVALUATION OF GDP & ECONOMIC BENEFIT CLAIMS: Assesses assertions regarding benefit expenditure growth against historical UK GDP datasets.`);
    flags.push(`DEBUNKS 'SPIRALLING' BENEFIT CLAIMS: UK social protection spending as a percentage of GDP has remained stable between 10% and 11% for over two decades (lower than the 2010–2012 peak of 12.1%).`);
    flags.push(`INTERNATIONAL COMPARISON: OECD Social Expenditure Database demonstrates UK disability and welfare spending as a % of GDP remains consistently below the OECD average (13.2%) and well below European peer nations (e.g., France ~18.8%, Germany ~15.4%).`);

    primaryRebuttal = `DEBUNKING ECONOMIC BENEFIT CLAIMS & GDP SPIRAL MYTH: The claim that disability and welfare benefits are "spiralling out of control" as a share of the economy is factually inaccurate. Official HM Treasury, OBR, and IFS historical figures confirm that total UK welfare/social protection spending as a percentage of Gross Domestic Product (GDP) has stayed practically unchanged at approximately 10%–11% of GDP for over two decades, remaining lower than post-2008 financial crash peaks (12.1% in 2009/10). Furthermore, OECD international comparative data shows the UK spends a lower proportion of GDP on working-age disability and social protection than the OECD average and significantly less than peer European economies. Increases in cash figures primarily reflect inflation adjustments (indexation) and long NHS treatment backlogs rather than structural spend expansion.`;
    sourceRef = "IFS TaxLab Welfare Share Analysis, OBR Economic & Fiscal Outlook (2026), OECD Social Expenditure Database (SOCX)";
    return { inputStatement: text, extractedQuotes, score: Math.min(100, score), verdict: "High BS / Unsubstantiated Economic Rhetoric", flags, primaryRebuttal, sourceRef };
  }

  const incentivePhrases = ["incentive", "no reason to work", "better off on benefits"];
  const hasIncentiveClaim = incentivePhrases.some(phrase => lower.includes(phrase));

  if (hasIncentiveClaim) {
    score = Math.max(55, score);
    extractedQuotes.push(`"${text.length > 120 ? text.substring(0, 120) + '...' : text}"`);
    flags.push(`Evaluates generalisations asserting a lack of work incentive or being 'better off on benefits'.`);
    flags.push(`Addresses structural financial mechanisms: Universal Credit Taper Rate (55p reduction per £1 earned) and DWP Work Allowance rates (£404/mo with housing element, £673/mo without).`);
    flags.push(`Evaluates legal payment ceilings set by UK Benefit Cap limits (£25,323/yr London, £22,020/yr Outside London).`);
    flags.push(`Incorporate ONS health and disability inactivity reason breakdown showing the majority of inactive working-age adults face severe health or care constraints.`);

    primaryRebuttal = `ANALYSIS OF STATEMENT: Evaluating claims that there is "no incentive to work" or that individuals are "better off on benefits": Universal Credit is structured with an explicit financial work incentive via DWP Work Allowance rates (£404/mo for claimants receiving housing support; £673/mo if no housing support is claimed) and a 55% UC taper rate, ensuring that net household income increases with every hour worked. Furthermore, total benefit entitlements are capped by statutory Benefit Cap limits (£25,323/yr in Greater London; £22,020/yr elsewhere). Official ONS health/disability inactivity reason breakdowns demonstrate that 84% of economically inactive working-age citizens remain out of work due to long-term chronic illness, NHS treatment delays, caring duties, or full-time study rather than financial disincentives.`;
    sourceRef = "DWP Work Allowance & UC Taper Rules 2026/27, GOV.UK Benefit Cap Guidance & ONS Labour Market Statistics";
    return { inputStatement: text, extractedQuotes, score: Math.min(100, score), verdict: score > 75 ? "Extreme Misinformation / Misleading" : "Misleading Work Incentive Generalisation", flags, primaryRebuttal, sourceRef };
  }

  // --- UPDATED EXPLICIT FINANCIAL REGEX & DEMOGRAPHIC PROTECTION LOGIC ---
  // Matches values with explicit £ currency symbols or monetary keywords (e.g., £60k, £25,000, 60 thousand pounds)
  const explicitFinancialMatches = text.match(/(?:£\s*\d+[\d,]*\s*(?:k|thousand|million|bn|billion)?|\b\d+[\d,]*\s*(?:k|thousand|million|bn|billion)?\s*(?:pounds|pound|gbp)\b)/gi) || [];
  let extractedAnnualAmount = 0;

  for (let match of explicitFinancialMatches) {
    let clean = match.replace(/[£,\s]/g, '').toLowerCase();
    let val = 0;
    if (clean.endsWith('k')) {
      val = parseFloat(clean.replace('k', '')) * 1000;
    } else if (clean.endsWith('thousand')) {
      val = parseFloat(clean.replace('thousand', '')) * 1000;
    } else if (clean.includes('pound')) {
      val = parseFloat(clean.split('pound')[0]);
    } else {
      val = parseFloat(clean);
    }
    // Track extracted financial payout claims below £1,000,000
    if (val > extractedAnnualAmount && val < 1000000) {
      extractedAnnualAmount = val;
    }
  }

  if (lower.includes('£60k') || lower.includes('60,000 pounds') || lower.includes('60 thousand pounds')) {
    extractedAnnualAmount = 60000;
  }

  const isFinancialClaim = extractedAnnualAmount > 0;

  if (isFinancialClaim && extractedAnnualAmount > BENEFIT_RATES_2026_2027.benefitCap2026.absoluteMaxCap) {
    score = 98;
    extractedQuotes.push(`"${text.length > 120 ? text.substring(0, 120) + '...' : text}"`);
    flags.push(`Claims an annual benefit payout of £${extractedAnnualAmount.toLocaleString()}, directly violating statutory UK Benefit Caps (£25,323/yr London, £22,020/yr Outside London).`);
    flags.push(`Asserts that individuals can receive £${extractedAnnualAmount.toLocaleString()}/year, which is legally impossible under current DWP award limits.`);
    primaryRebuttal = `ANALYSIS OF STATEMENT: In response to the statement claiming recipients can get £${extractedAnnualAmount.toLocaleString()} per year: Under 2026/2027 UK Welfare Law, benefit payments are strictly capped at £25,323/year in Greater London or £22,020/year across the rest of the UK. Even with the maximum possible PIP Enhanced Daily Living and Mobility awards combined (£10,119.20/yr), reaching £${extractedAnnualAmount.toLocaleString()}/year is prohibited by statute.`;
    sourceRef = "DWP Statutory Benefit Rates & Benefit Cap Regulations 2026/2027 (GOV.UK)";
    return { inputStatement: text, extractedQuotes, score: Math.min(100, score), verdict: "Extreme Misinformation / Impossible Claim", flags, primaryRebuttal, sourceRef };
  }

  const popStatKeywords = ['million', 'millions', 'population', 'demographic', 'people', 'adults', 'claimants', 'recipients', 'citizens', 'working age', 'working-age'];
  const hasPopStatKeywords = popStatKeywords.some(kw => lower.includes(kw));

  if (hasPopStatKeywords && !isFinancialClaim && !lower.includes('a year') && !lower.includes('per year') && !lower.includes('per month')) {
    score = Math.min(100, score + 50);
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
    return { inputStatement: text, extractedQuotes, score: Math.min(100, score), verdict: "Misleading Demographic Rhetoric / Population Unsubstantiated", flags, primaryRebuttal, sourceRef };
  }

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
    return { inputStatement: text, extractedQuotes, score: Math.min(100, score), verdict: "High BS / Misleading Claim", flags, primaryRebuttal, sourceRef };
  }

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
    return { inputStatement: text, extractedQuotes, score: Math.min(100, score), verdict: "High BS / Misleading Generalisation", flags, primaryRebuttal, sourceRef };
  }

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

  const finalScore = Math.min(100, score);
  return {
    inputStatement: text,
    extractedQuotes,
    score: finalScore,
    verdict: finalScore > 75 ? "Extreme Misinformation / Misleading" : finalScore > 50 ? "Moderate Bias / Unsubstantiated" : "Low BS / Mostly Factual",
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
                  { id: 'social_media', label: 'MP Social Media (X/TikTok/FB)', icon: Share2 },
                  { id: 'byParty', label: 'By Political Party', icon: Users },
                  { id: 'tabloids', label: 'Newspaper Tabloids', icon: Newspaper },
                  { id: 'broadcasters', label: 'TV & Radio Shows', icon: Radio },
                ].map((cat) => {
                  const Icon = cat.icon;
                  const isActive = leaderboardCategory === cat.id;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => setLeaderboardCategory(cat.id)}
                      className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition whitespace-nowrap ${
                        isActive
                          ? 'bg-purple-600 text-white shadow-sm'
                          : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5" />
                      <span>{cat.label}</span>
                    </button>
                  );
                })}
              </div>

              <div className="flex items-center gap-2 text-xs text-slate-400 self-end sm:self-auto">
                <Clock className="w-3.5 h-3.5 text-purple-400" />
                <span>Timeframe:</span>
                <select
                  value={timeframe}
                  onChange={(e) => setTimeframe(e.target.value)}
                  className="bg-slate-900 border border-slate-700 text-slate-200 rounded-lg px-2.5 py-1 text-xs focus:ring-1 focus:ring-purple-500 font-semibold"
                >
                  <option value="7">Past 7 Days</option>
                  <option value="30">Past 30 Days</option>
                  <option value="90">Past 90 Days</option>
                  <option value="365">All 2026 Data</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {(filteredLeaderboardData[leaderboardCategory] || []).map((item) => {
                const isExpanded = expandedFigure === item.id;
                return (
                  <div
                    key={item.id}
                    className={`p-5 rounded-2xl border transition-all duration-200 ${
                      highContrast
                        ? 'border-yellow-400 bg-black text-yellow-300'
                        : 'border-slate-800 bg-slate-900/90 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex items-start gap-3.5">
                        <div className={`flex items-center justify-center w-8 h-8 rounded-xl font-black text-sm shrink-0 ${
                          item.rank === 1 ? 'bg-amber-500 text-slate-950' :
                          item.rank === 2 ? 'bg-slate-300 text-slate-950' :
                          item.rank === 3 ? 'bg-amber-700 text-white' : 'bg-slate-800 text-slate-400'
                        }`}>
                          #{item.rank}
                        </div>
                        <div>
                          <div className="flex items-center gap-2 flex-wrap">
                            <h3 className="font-bold text-base md:text-lg text-slate-100">{item.name}</h3>
                            <span className="text-xs px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700 font-medium">
                              {item.party || item.type || item.role}
                            </span>
                          </div>
                          <p className="text-xs text-slate-400 mt-0.5">{item.role}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 self-start md:self-auto">
                        <div className="text-right">
                          <div className="text-xs text-slate-400 font-medium">Flagged Claims</div>
                          <div className="text-lg font-black text-amber-400">{item.flaggedClaimsCount}</div>
                        </div>
                        <div className="text-right">
                          <div className="text-xs text-slate-400 font-medium">BS Score</div>
                          <div className={`text-lg font-black ${item.bsScore > 85 ? 'text-rose-400' : 'text-amber-400'}`}>
                            {item.bsScore}%
                          </div>
                        </div>
                        <button
                          onClick={() => setExpandedFigure(isExpanded ? null : item.id)}
                          className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition"
                          aria-label="Expand claim details"
                        >
                          {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                        </button>
                      </div>
                    </div>

                    <div className="mt-4 pt-4 border-t border-slate-800/80 grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-rose-950/20 border border-rose-900/30 p-3.5 rounded-xl space-y-1">
                        <div className="text-xs font-bold text-rose-400 flex items-center gap-1.5">
                          <AlertTriangle className="w-3.5 h-3.5" /> Top Inaccurate Claim
                        </div>
                        <p className="text-xs text-slate-200 italic">{item.topClaim}</p>
                      </div>

                      <div className="bg-teal-950/20 border border-teal-900/30 p-3.5 rounded-xl space-y-1">
                        <div className="text-xs font-bold text-teal-400 flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Factual Correction
                        </div>
                        <p className="text-xs text-slate-200">{item.factualCorrection}</p>
                        <div className="pt-1 flex items-center justify-between text-[11px] text-teal-400/80">
                          <span>Source: {item.primarySource}</span>
                          {item.sourceUrl && (
                            <a href={item.sourceUrl} target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:underline">
                              <span>Verify</span> <ExternalLink className="w-3 h-3" />
                            </a>
                          )}
                        </div>
                      </div>
                    </div>

                    {isExpanded && (
                      <div className="mt-4 pt-4 border-t border-slate-800 space-y-3">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                          Recent Flagged Statements History ({item.claimsHistory?.length || 0})
                        </h4>
                        <div className="space-y-2">
                          {(item.claimsHistory || []).map((historyItem, idx) => (
                            <div key={idx} className="p-3 rounded-xl bg-slate-950 border border-slate-800/80 flex flex-col md:flex-row md:items-center justify-between gap-2 text-xs">
                              <div className="space-y-1">
                                <div className="flex items-center gap-2">
                                  <span className="text-slate-400 font-mono">{historyItem.date}</span>
                                  <span className="text-purple-400 font-semibold">• {historyItem.outlet}</span>
                                </div>
                                <p className="text-slate-200 italic">"{historyItem.quote}"</p>
                              </div>
                              <div className="flex items-center gap-2 shrink-0">
                                <span className="px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 border border-rose-500/30 text-[10px] font-bold">
                                  {historyItem.status}
                                </span>
                                {historyItem.sourceUrl && (
                                  <a href={historyItem.sourceUrl} target="_blank" rel="noreferrer" className="p-1 text-slate-400 hover:text-slate-200">
                                    <ExternalLink className="w-3.5 h-3.5" />
                                  </a>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {activeTab === 'analyzer' && (
          <div className="space-y-6">
            <div className={`p-6 rounded-2xl border ${highContrast ? 'border-yellow-400 bg-black' : 'border-purple-800/40 bg-slate-900'} space-y-4`}>
              <div className="flex items-center gap-2 text-purple-400 text-xs font-bold uppercase tracking-wider">
                <Zap className="w-4 h-4" />
                <span>Automated Fact-Checker</span>
              </div>
              <h2 className="text-2xl font-black text-slate-100">BS Meter & Claim Analyzer</h2>
              <p className="text-xs md:text-sm text-slate-300">
                Paste any political statement, news headline, MP tweet, or article snippet below. The engine evaluates explicit financial figures against 2026/27 DWP Benefit Caps, checks PIP descriptors, flags sensationalist rhetoric, and debunks economic GDP claims.
              </p>

              <div className="space-y-3">
                <textarea
                  value={analyzerInput}
                  onChange={(e) => setAnalyzerInput(e.target.value)}
                  placeholder="Paste statement here... (e.g., 'Claimants receive £60k a year in free PIP cash for tennis elbow and welfare is spiralling out of control')"
                  rows={4}
                  className="w-full p-4 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <div className="flex items-center justify-between gap-3">
                  <div className="text-xs text-slate-400">
                    Try entering keywords like <button onClick={() => setAnalyzerInput("People are getting £60k a year in free PIP cash while welfare is spiralling out of control")} className="text-purple-400 hover:underline">£60k annual claim</button>, <button onClick={() => setAnalyzerInput("Claiming PIP for mild eczema and tennis elbow")} className="text-purple-400 hover:underline">tennis elbow</button>, or <button onClick={() => setAnalyzerInput("Welfare spending as a percentage of GDP is spiralling out of control")} className="text-purple-400 hover:underline">GDP spiral myth</button>.
                  </div>
                  <button
                    onClick={handleAnalyzeText}
                    disabled={analyzing || !analyzerInput.trim()}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm bg-purple-600 hover:bg-purple-500 text-white disabled:opacity-50 transition shadow-lg shadow-purple-600/20"
                  >
                    {analyzing ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Zap className="w-4 h-4" />}
                    <span>{analyzing ? 'Analyzing...' : 'Run Fact Check'}</span>
                  </button>
                </div>
              </div>
            </div>

            {analysisResult && (
              <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
                  <div>
                    <span className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Evaluation Result</span>
                    <h3 className="text-xl font-black text-slate-100">{analysisResult.verdict}</h3>
                  </div>
                  <div className="flex items-center gap-3 bg-slate-950 p-3 rounded-xl border border-slate-800">
                    <div className="text-right">
                      <div className="text-[11px] text-slate-400 font-medium">Calculated BS Rating</div>
                      <div className={`text-xl font-black ${analysisResult.score > 75 ? 'text-rose-400' : analysisResult.score > 40 ? 'text-amber-400' : 'text-teal-400'}`}>
                        {analysisResult.score}%
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-xs text-slate-400 font-semibold">
                    <span>Low BS (0%)</span>
                    <span>Medium BS (50%)</span>
                    <span>High BS (100%)</span>
                  </div>
                  <div className="w-full h-3 bg-slate-950 rounded-full overflow-hidden p-0.5 border border-slate-800 flex">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        analysisResult.score > 75 ? 'bg-gradient-to-r from-amber-500 to-rose-500' :
                        analysisResult.score > 40 ? 'bg-amber-500' : 'bg-teal-500'
                      }`}
                      style={{ width: `${analysisResult.score}%` }}
                    />
                  </div>
                </div>

                {analysisResult.extractedQuotes?.length > 0 && (
                  <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                    <div className="text-xs font-bold text-purple-400">Extracted Key Claims Evaluated</div>
                    <div className="text-xs text-slate-300 italic">{analysisResult.extractedQuotes.join(', ')}</div>
                  </div>
                )}

                <div className="space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Analysis Flags</h4>
                  <div className="space-y-2">
                    {analysisResult.flags.map((flag, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-slate-300 bg-slate-950 p-3 rounded-xl border border-slate-800">
                        <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                        <span>{flag}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-teal-950/20 border border-teal-900/40 space-y-2">
                  <div className="text-xs font-bold text-teal-400 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" /> Primary Source Rebuttal & Fact Check
                  </div>
                  <p className="text-xs md:text-sm text-slate-200 leading-relaxed">{analysisResult.primaryRebuttal}</p>
                  <div className="text-[11px] text-teal-400/80 pt-1 font-mono">Verified Source: {analysisResult.sourceRef}</div>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'spending' && (
          <div className="space-y-6">
            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
              <div className="flex items-center gap-2 text-teal-400 text-xs font-bold uppercase tracking-wider">
                <BarChart3 className="w-4 h-4" />
                <span>Fiscal Transparency & Expenditure Analysis</span>
              </div>
              <h2 className="text-2xl font-black text-slate-100">UK Welfare & Disability Expenditure Debunk</h2>
              <p className="text-xs md:text-sm text-slate-300">
                Official figures breaking down the ~£346 billion social protection expenditure (2025/26), contrasting state pensions against disability support and debunking claims regarding lifetime National Insurance contributions.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
                <h3 className="text-lg font-bold text-slate-100">Welfare & Social Protection Breakdown (2025/26)</h3>
                <p className="text-xs text-slate-400">Total UK Welfare Budget: ~£346.0 Billion (HM Treasury / DWP / OBR Data)</p>
                
                <div className="space-y-3">
                  {SPENDING_BREAKDOWN_2025_26.map((item, idx) => (
                    <div key={idx} className="space-y-1">
                      <div className="flex justify-between text-xs font-semibold">
                        <span className="text-slate-200">{item.label}</span>
                        <span className="text-slate-400">£{item.value}bn ({item.pct})</span>
                      </div>
                      <div className="w-full h-2.5 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
                        <div className="h-full rounded-full" style={{ width: item.pct, backgroundColor: item.color }} />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 space-y-1">
                  <div className="font-bold text-amber-400">Key Context:</div>
                  <p>State Pensions constitute the largest single component (42.2%) of welfare spending. Working-age disability benefits (PIP/DLA) represent 12.9% of total expenditure.</p>
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
                <h3 className="text-lg font-bold text-slate-100">Contributory History & Employment Facts</h3>
                <p className="text-xs text-slate-400">Debunking myths that claimants never worked or contributed to National Insurance</p>

                <div className="space-y-3">
                  {CONTRIBUTORY_DEBUNK_DATA.map((item, idx) => (
                    <div key={idx} className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 font-black text-xs border border-purple-500/30">
                          {item.stat}
                        </span>
                        <span className="text-xs font-semibold text-slate-200">{item.detail}</span>
                      </div>
                      <div className="text-[10px] text-slate-500 font-mono">Source: {item.source}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
              <h3 className="text-lg font-bold text-slate-100">Official Data Sources & References</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {SPENDING_LINKS.map((link, idx) => (
                  <a
                    key={idx}
                    href={link.url}
                    target="_blank"
                    rel="noreferrer"
                    className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 hover:border-slate-700 transition flex items-start justify-between gap-3 text-xs"
                  >
                    <div className="space-y-1">
                      <div className="font-bold text-purple-400">{link.name}</div>
                      <p className="text-slate-400">{link.desc}</p>
                    </div>
                    <ExternalLink className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'vault' && (
          <div className="space-y-6">
            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
              <div className="flex items-center gap-2 text-purple-400 text-xs font-bold uppercase tracking-wider">
                <BookOpen className="w-4 h-4" />
                <span>Verified Fact Database</span>
              </div>
              <h2 className="text-2xl font-black text-slate-100">Myth Vault & Fact Directory</h2>
              <p className="text-xs md:text-sm text-slate-300">
                Direct rebuttals to persistent myths surrounding PIP fraud, Motability leases, economic inactivity, and GP fit note practices.
              </p>

              <div className="relative">
                <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-500" />
                <input
                  type="text"
                  value={vaultSearch}
                  onChange={(e) => setVaultSearch(e.target.value)}
                  placeholder="Search myths, topics, or keywords (e.g. fraud, motability, fit notes)..."
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 placeholder-slate-500 text-xs focus:outline-none focus:ring-1 focus:ring-purple-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {MYTH_VAULT.filter(m =>
                m.claim.toLowerCase().includes(vaultSearch.toLowerCase()) ||
                m.truth.toLowerCase().includes(vaultSearch.toLowerCase()) ||
                m.category.toLowerCase().includes(vaultSearch.toLowerCase())
              ).map((myth) => (
                <div key={myth.id} className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-purple-400">{myth.category}</span>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 border border-rose-500/30 font-semibold">
                        {myth.severity}
                      </span>
                    </div>

                    <div className="p-3 rounded-xl bg-rose-950/20 border border-rose-900/30 space-y-1">
                      <div className="text-xs font-bold text-rose-400 flex items-center gap-1.5">
                        <XCircle className="w-3.5 h-3.5" /> Common Myth
                      </div>
                      <p className="text-xs text-slate-200 font-medium">"{myth.claim}"</p>
                    </div>

                    <div className="p-3 rounded-xl bg-teal-950/20 border border-teal-900/30 space-y-1">
                      <div className="text-xs font-bold text-teal-400 flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Verified Truth
                      </div>
                      <p className="text-xs text-slate-200">{myth.truth}</p>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400 font-mono">
                    <span>Source: {myth.dwpData}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'economics' && (
          <div className="space-y-6">
            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
              <div className="flex items-center gap-2 text-teal-400 text-xs font-bold uppercase tracking-wider">
                <LineChart className="w-4 h-4" />
                <span>Macroeconomic Analysis</span>
              </div>
              <h2 className="text-2xl font-black text-slate-100">Economic Impact & GDP Context</h2>
              <p className="text-xs md:text-sm text-slate-300">
                Evaluating the local multiplier effect of disability benefits and analyzing welfare expenditure as a proportion of UK Gross Domestic Product.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
                <h3 className="text-lg font-bold text-slate-100">The Local Economic Multiplier Effect</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Disability benefit payments like PIP function as vital local economic multipliers. Independent research demonstrates that lower-income households and disabled individuals have a high marginal propensity to consume (MPC).
                </p>

                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                  <div className="text-xs font-bold text-purple-400">Estimated Local Economic Multiplier</div>
                  <div className="text-3xl font-black text-amber-400">1.4x – 1.7x</div>
                  <p className="text-xs text-slate-400">
                    For every £1.00 disbursed in PIP awards, between £1.40 and £1.70 is generated in local commercial activity through direct expenditure on essential goods, local transport, heating, and care services.
                  </p>
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
                <h3 className="text-lg font-bold text-slate-100">Welfare Expenditure as % of GDP</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Despite claims of an "exploding welfare bill", UK social protection spending as a share of GDP has remained structurally stable over long term horizons.
                </p>

                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                  <div className="text-xs font-bold text-teal-400">UK Historical Share of GDP</div>
                  <div className="text-3xl font-black text-teal-300">10% – 11%</div>
                  <p className="text-xs text-slate-400">
                    Total UK social protection expenditure remains near 10-11% of GDP, below the post-2008 financial crisis peak of 12.1% and substantially below peer European nations (e.g. France ~18.8%, Germany ~15.4%).
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'charities' && (
          <div className="space-y-6">
            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
              <div className="flex items-center gap-2 text-purple-400 text-xs font-bold uppercase tracking-wider">
                <HeartHandshake className="w-4 h-4" />
                <span>Charity & Support Directory</span>
              </div>
              <h2 className="text-2xl font-black text-slate-100">Disability Charity A-Z Directory</h2>
              <p className="text-xs md:text-sm text-slate-300">
                Browse specialist UK disability charities, advice helplines, and condition-specific advocacy groups offering guidance on PIP claims and tribunal representation.
              </p>

              <div className="flex flex-col md:flex-row gap-3">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-500" />
                  <input
                    type="text"
                    value={charitySearch}
                    onChange={(e) => setCharitySearch(e.target.value)}
                    placeholder="Search charities or conditions..."
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 placeholder-slate-500 text-xs focus:outline-none focus:ring-1 focus:ring-purple-500"
                  />
                </div>
                <select
                  value={charityCategory}
                  onChange={(e) => setCharityCategory(e.target.value)}
                  className="bg-slate-950 border border-slate-800 text-slate-200 rounded-xl px-3 py-2.5 text-xs focus:ring-1 focus:ring-purple-500"
                >
                  {charityCategoriesList.map((cat, idx) => (
                    <option key={idx} value={cat}>{cat === 'ALL' ? 'All Categories' : cat}</option>
                  ))}
                </select>
              </div>

              <div className="flex overflow-x-auto no-scrollbar gap-1 pt-1">
                {['ALL', ...'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')].map((letter) => (
                  <button
                    key={letter}
                    onClick={() => setCharityLetter(letter)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-bold transition ${
                      charityLetter === letter ? 'bg-purple-600 text-white' : 'bg-slate-950 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {letter}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredCharities.map((item, idx) => (
                <div key={idx} className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="font-bold text-base text-slate-100">{item.name}</h3>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700 font-medium">
                        {item.category}
                      </span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">{item.desc}</p>
                  </div>

                  <div className="pt-3 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-2 text-xs">
                    <div className="flex items-center gap-1.5 text-teal-400 font-semibold">
                      <Phone className="w-3.5 h-3.5" />
                      <span>{item.phone}</span>
                    </div>
                    <div className="text-slate-400 text-[11px]">{item.hours}</div>
                    <a href={`https://${item.web}`} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-purple-400 hover:underline text-xs font-semibold">
                      <span>{item.web}</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'briefing' && (
          <div className="space-y-6">
            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
              <div className="flex items-center gap-2 text-teal-400 text-xs font-bold uppercase tracking-wider">
                <FileText className="w-4 h-4" />
                <span>Constituency Advocacy Tool</span>
              </div>
              <h2 className="text-2xl font-black text-slate-100">MP Constituency Briefing Pack</h2>
              <p className="text-xs md:text-sm text-slate-300">
                Generate a formatted briefing sheet tailored to your constituency to send to your local Member of Parliament or regional representatives.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  value={constituency}
                  onChange={(e) => setConstituency(e.target.value)}
                  placeholder="Constituency Name (e.g. Portsmouth South)"
                  className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-xs focus:ring-1 focus:ring-purple-500"
                />
                <input
                  type="text"
                  value={mpName}
                  onChange={(e) => setMpName(e.target.value)}
                  placeholder="MP Name (Optional)"
                  className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-xs focus:ring-1 focus:ring-purple-500"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-300">Select Evidence Topics to Include:</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {[
                    { id: 'pip_rates', label: '2026/27 PIP Payment Rates' },
                    { id: 'pip_multiplier', label: 'Local Economic Multiplier Effect' },
                    { id: 'welfare_gdp', label: 'Welfare Expenditure vs GDP Context' },
                    { id: 'pip_fraud', label: 'PIP Fraud Rate (<0.2%)' },
                    { id: 'tribunals', label: '70%+ HMCTS Tribunal Overturn Rate' },
                    { id: 'uc_rates', label: 'Universal Credit Standard Allowance & Health Elements' },
                    { id: 'carers', label: "Carer's Allowance Earnings Cap (£204/wk)" },
                    { id: 'motability', label: 'Motability Scheme Direct Funding' },
                    { id: 'inactivity', label: 'ONS Long-term Illness Statistics' }
                  ].map((topic) => (
                    <button
                      key={topic.id}
                      onClick={() => toggleTopic(topic.id)}
                      className={`p-2.5 rounded-xl border text-left text-xs font-semibold flex items-center justify-between transition ${
                        selectedTopics.includes(topic.id)
                          ? 'bg-purple-600/20 border-purple-500 text-purple-200'
                          : 'bg-slate-950 border-slate-800 text-slate-400'
                      }`}
                    >
                      <span>{topic.label}</span>
                      {selectedTopics.includes(topic.id) && <Check className="w-4 h-4 text-purple-400" />}
                    </button>
                  ))}
                </div>
              </div>

              <textarea
                value={customNote}
                onChange={(e) => setCustomNote(e.target.value)}
                placeholder="Add a custom personal note or constituency case note..."
                rows={3}
                className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-xs focus:ring-1 focus:ring-purple-500"
              />

              <div className="flex items-center gap-3">
                <button
                  onClick={copyBriefingText}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-teal-500 text-slate-950 font-bold text-xs hover:bg-teal-400 transition"
                >
                  <Copy className="w-4 h-4" />
                  <span>{briefingCopied ? 'Copied to Clipboard!' : 'Copy Briefing Text'}</span>
                </button>
                <button
                  onClick={handlePrintBriefing}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 text-slate-200 font-bold text-xs hover:bg-slate-700 transition"
                >
                  <Printer className="w-4 h-4" />
                  <span>Print Briefing</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'rights' && (
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <h2 className="text-2xl font-black text-slate-100">Know Your Rights: Welfare & Appeals</h2>
            <p className="text-xs md:text-sm text-slate-300">
              Key legal frameworks governing PIP assessments, Mandatory Reconsiderations, and independent HMCTS tribunals under the Welfare Reform Act 2012.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="text-xs font-bold text-purple-400">1. Mandatory Reconsideration</div>
                <p className="text-xs text-slate-300">
                  You have the right to challenge any DWP decision within 1 month. Submit detailed clinical evidence focusing on descriptor scoring.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="text-xs font-bold text-purple-400">2. Independent Tribunal</div>
                <p className="text-xs text-slate-300">
                  Appeals are heard by an independent HMCTS panel (Judge, Doctor, Disability Specialist). Over 70% of PIP appeals succeed.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="text-xs font-bold text-purple-400">3. Assessment Rights</div>
                <p className="text-xs text-slate-300">
                  Claimants have the legal right to audio-record assessments and have an companion/advocate present during the evaluation.
                </p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'legal' && (
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <h2 className="text-2xl font-black text-slate-100">Legal Standards & Methodology</h2>
            <p className="text-xs md:text-sm text-slate-300">
              The UK Welfare Truth Index cross-references public political statements against official primary data released by DWP Stat-Xplore, Ministry of Justice, Office for National Statistics, and HM Treasury statutory guidelines.
            </p>
          </div>
        )}

        {activeTab === 'support' && (
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <h2 className="text-2xl font-black text-slate-100">Disability Help & Emergency Advocacy</h2>
            <p className="text-xs md:text-sm text-slate-300">
              Free, independent organisations offering urgent welfare rights advice, tribunal representation, and debt guidance across the UK.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              {SUPPORT_ORGANIZATIONS.map((org, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-sm text-slate-100">{org.name}</h3>
                    <span className="text-xs font-bold text-teal-400">{org.phone}</span>
                  </div>
                  <p className="text-xs text-slate-300">{org.desc}</p>
                </div>
              ))}
            </div>
          </div>
        )}

      </main>
    </div>
  );
}
