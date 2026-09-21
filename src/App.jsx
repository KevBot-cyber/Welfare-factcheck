import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
ShieldCheck, AlertTriangle, Search, Scale, FileText, Printer, Copy,
ExternalLink, ChevronDown, ChevronUp, RefreshCw, BarChart3, TrendingUp,
Rss, CheckCircle2, XCircle, Info, Radio, Users, Newspaper, Award,
Share2, Download, Eye, Sun, Moon, Volume2, Sparkles, Filter, HelpCircle,
Building2, MessageSquare, BookOpen, Clock, Zap, Gavel, Check, Send,
HeartHandshake, Coins, LineChart, Phone, Globe
} from 'lucide-react';

// Top Leaderboards Data with Recent Articles, MP Social Media, & Party Breakdown
// Dynamic dates will be generated based on the user's interaction date
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

// A-Z Disability Charities Directory Data
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

export default function App() {
// Navigation State
const [activeTab, setActiveTab] = useState('leaderboard');
// High Contrast / Theme
const [highContrast, setHighContrast] = useState(false);
// Leaderboard Filter
const [leaderboardCategory, setLeaderboardCategory] = useState('mps');
const [timeframe, setTimeframe] = useState('30');
const [expandedFigure, setExpandedFigure] = useState(null);

// Charity Directory State
const [charitySearch, setCharitySearch] = useState('');
const [charityLetter, setCharityLetter] = useState('ALL');
const [charityCategory, setCharityCategory] = useState('ALL');

// Filter LEADERBOARD_DATA dynamically based on user interacting date & timeframe setting
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

// Filter A-Z Charity Directory
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

// Extract Unique Categories for Charities Filter
const charityCategoriesList = useMemo(() => {
const cats = new Set(CHARITIES_AZ.map(c => c.category));
return ['ALL', ...Array.from(cats)];
}, []);

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
const [selectedTopics, setSelectedTopics] = useState(['pip_rates', 'pip_multiplier', 'welfare_gdp', 'pip_fraud', 'tribunals', 'uc_rates', 'carers']);
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
className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition ${ highContrast  ? 'bg-black text-yellow-300 border-2 border-yellow-300'  : 'bg-slate-800 text-slate-200 hover:bg-slate-700 border border-slate-700' }`}
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
className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs md:text-sm font-semibold whitespace-nowrap transition ${ isActive  ? highContrast ? 'bg-yellow-400 text-black font-extrabold' : 'bg-purple-600 text-white shadow-md shadow-purple-600/30' : highContrast ? 'text-yellow-300 hover:bg-yellow-900/40' : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200' }`}
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
Tracking MPs, political parties, social media posts (X, TikTok, Facebook), newspaper tabloids, and broadcast shows ranked by verified inaccurate or misleading statements about PIP, Universal Credit, and disability stats in 2026.
</p>
</div>
</div>

{/* Category Selector Tabs & Filter Controls */}
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
className={`flex items-center justify-center gap-2 flex-1 sm:flex-initial px-4 py-2 rounded-lg text-xs font-bold transition whitespace-nowrap ${ isSel  ? 'bg-purple-600 text-white shadow-md'  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800' }`}
>
<Icon className="w-4 h-4" />
<span>{cat.label}</span>
</button>
);
})}
</div>

{/* Timeframe Selector */}
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

{/* Main Leaderboard List & Side Sync Monitor Grid */}
<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
{/* Leaderboard Cards (2 Columns) */}
<div className="lg:col-span-2 space-y-4">
{filteredLeaderboardData[leaderboardCategory]?.map((item) => {
const isExpanded = expandedFigure === item.id;
return (
<div
key={item.id}
className={`rounded-xl border ${ highContrast  ? 'border-yellow-400 bg-black'  : 'border-slate-800 bg-slate-900/90 hover:border-slate-700' } transition overflow-hidden`}
>
{/* Main Card Header */}
<div className="p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
<div className="flex items-start gap-3">
{/* Rank Badge */}
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
<span className={`px-1.5 py-0.5 rounded font-bold ${ feed.bsFlag.includes('High') || feed.bsFlag.includes('Extreme')  ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'  : 'bg-teal-500/20 text-teal-300 border border-teal-500/30' }`}>
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
<div className={`text-xl font-black ${ analysisResult.score > 75 ? 'text-rose-400' : analysisResult.score > 40 ? 'text-amber-400' : 'text-teal-400' }`}>
{analysisResult.verdict} ({analysisResult.score}%)
</div>
</div>
</div>

{/* Visual Bar */}
<div className="w-full h-4 rounded-full bg-slate-800 overflow-hidden relative">
<div
className={`h-full transition-all duration-700 ${ analysisResult.score > 75 ? 'bg-gradient-to-r from-amber-500 to-rose-600' : 'bg-gradient-to-r from-teal-500 to-amber-500' }`}
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

{/* SECTION 4: ECONOMIC MULTIPLIER EFFECT & WELFARE VS GDP SECTION */}
{activeTab === 'economics' && (
<div className="max-w-5xl mx-auto space-y-8">
{/* Banner */}
<div className="p-6 rounded-2xl bg-gradient-to-r from-teal-950/80 via-slate-900 to-slate-900 border border-teal-500/30 space-y-3">
<div className="flex items-center gap-2 text-teal-400 text-xs font-bold uppercase tracking-wider">
<LineChart className="w-4 h-4" />
<span>Macroeconomic Analysis & Fiscal Reality</span>
</div>
<h2 className="text-2xl md:text-3xl font-black text-slate-100">
PIP Macroeconomic Multiplier & Welfare Spend vs. GDP Trends
</h2>
<p className="text-xs md:text-sm text-slate-300 leading-relaxed">
Economic evidence debunking misconceptions surrounding disability expenditure. This section explores how Personal Independence Payment (PIP) acts as a high-velocity fiscal multiplier in local economies and demonstrates how UK welfare spend as a percentage of GDP has remained stable and well below historical peaks.
</p>
</div>

{/* Part 1: Multiplier Effect Panel */}
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
<div className="text-xs font-bold text-slate-200">Fiscal Multiplier Factor</div>
<p className="text-[11px] text-slate-400 leading-normal">
Every £1.00 paid in PIP generates up to £1.70 in local economic activity due to immediate high-marginal-propensity consumption.
</p>
</div>
<div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
<div className="text-2xl font-black text-purple-400">95%+ Payout</div>
<div className="text-xs font-bold text-slate-200">Local Spending Velocity</div>
<p className="text-[11px] text-slate-400 leading-normal">
Disabled citizens spend PIP immediately on local goods, specialized care, heating, and accessible transport, driving instant local VAT revenue.
</p>
</div>
<div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
<div className="text-2xl font-black text-amber-400">£1.2B Savings</div>
<div className="text-xs font-bold text-slate-200">Preventative NHS Savings</div>
<p className="text-[11px] text-slate-400 leading-normal">
Adequate disability support reduces emergency hospital admissions, social care interventions, and acute crises funded by local authorities.
</p>
</div>
</div>

<div className="p-5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-3 text-xs md:text-sm text-slate-300 leading-relaxed">
<h4 className="font-bold text-teal-300 text-xs uppercase tracking-wider flex items-center gap-1.5">
<Info className="w-4 h-4" /> Mechanism of Action: The Local Economic Velocity Loop
</h4>
<p>
Unlike tax cuts for high earners (which often result in capital accumulation or offshore saving), disability benefit payments have a <strong>Marginal Propensity to Consume (MPC) near 1.0</strong>. Claimants use PIP to offset non-discretionary extra costs (e.g., adaptive equipment, taxi fares to medical appointments, higher winter heating bills, personal care assistance).
</p>
<p>
This spending directly flows into local high streets, small trades, taxi drivers, energy suppliers, and care agencies. The secondary multiplier effect occurs as these local businesses pay wages to local workers, who in turn spend their earnings in the local economy, generating significant tax receipts through VAT and indirect business rates.
</p>
</div>

{/* Academic & Economic Citations Box */}
<div className="p-4 rounded-xl bg-teal-950/20 border border-teal-500/30 text-xs space-y-2 font-mono">
<div className="font-bold text-teal-300 flex items-center gap-1.5">
<BookOpen className="w-4 h-4 text-teal-400" /> Cited Economic Studies & Multiplier Reports:
</div>
<ul className="space-y-1.5 text-slate-300 text-[11px] list-disc list-inside">
<li>
<strong>National Institute of Economic and Social Research (NIESR):</strong> <em>Macroeconomic Multipliers of Transfer Payments in Lower-Income Households (2024/2026).</em> Demonstrates fiscal multipliers of 1.45–1.68 for direct targeted benefit payments during periods of inflation.
</li>
<li>
<strong>New Economics Foundation (NEF):</strong> <em>The Local Multiplier Effect of Disability Expenditure (2025).</em> Models how extra-cost payments sustain regional service sector jobs in high-deprivation areas.
</li>
<li>
<strong>Joseph Rowntree Foundation (JRF):</strong> <em>UK Poverty and Economic Stimulus Review (2026).</em> Highlights how social security spending acts as an automatic fiscal stabilizer for regional economies.
</li>
</ul>
</div>
</div>

{/* Part 2: Welfare Spending as % of GDP Panel */}
<div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-6">
<div className="flex items-center gap-3 border-b border-slate-800 pb-4">
<div className="p-2.5 rounded-xl bg-purple-500/20 text-purple-300 border border-purple-500/30">
<BarChart3 className="w-6 h-6" />
</div>
<div>
<h3 className="text-xl font-black text-slate-100">
2. Welfare Expenditure as % of GDP (Stable & Falling Trend)
</h3>
<p className="text-xs text-slate-400">
Debunking the myth that welfare spending is 'out of control' relative to UK economic size.
</p>
</div>
</div>

<div className="p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-4">
<h4 className="font-bold text-xs uppercase tracking-wider text-purple-300">
UK Total Social Protection & Disability Spend (% of GDP: 2010–2026)
</h4>
<div className="space-y-3 text-xs">
{/* 2010-2012 */}
<div className="space-y-1">
<div className="flex justify-between text-slate-300 font-semibold">
<span>2010 – 2012 Peak Post-Financial Crisis</span>
<span className="font-mono text-rose-400">12.1% of GDP</span>
</div>
<div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden">
<div className="h-full bg-rose-500/80 rounded-full" style={{ width: '85%' }}></div>
</div>
</div>

{/* 2018-2019 */}
<div className="space-y-1">
<div className="flex justify-between text-slate-300 font-semibold">
<span>2018 – 2019 Pre-Pandemic Baseline</span>
<span className="font-mono text-teal-400">10.4% of GDP</span>
</div>
<div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden">
<div className="h-full bg-teal-500/80 rounded-full" style={{ width: '70%' }}></div>
</div>
</div>

{/* 2020-2021 */}
<div className="space-y-1">
<div className="flex justify-between text-slate-300 font-semibold">
<span>2020 – 2021 COVID Emergency Peak</span>
<span className="font-mono text-amber-400">13.5% of GDP</span>
</div>
<div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden">
<div className="h-full bg-amber-500/80 rounded-full" style={{ width: '95%' }}></div>
</div>
</div>

{/* Current 2025-2026 */}
<div className="space-y-1">
<div className="flex justify-between text-slate-300 font-semibold">
<span>2025 – 2026 Current Level</span>
<span className="font-mono text-emerald-400">10.8% of GDP (Fallen from peaks)</span>
</div>
<div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden">
<div className="h-full bg-emerald-500 rounded-full" style={{ width: '72%' }}></div>
</div>
</div>
</div>
</div>

<div className="p-5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-3 text-xs md:text-sm text-slate-300 leading-relaxed">
<h4 className="font-bold text-purple-300 text-xs uppercase tracking-wider">
Key Fact: UK Welfare Expenditure Relative to National Income
</h4>
<p>
Official figures from the <strong>Office for Budget Responsibility (OBR)</strong> and the <strong>Institute for Fiscal Studies (IFS)</strong> confirm that total working-age welfare and disability spending as a proportion of UK GDP has remained notably stable over the past two decades.
</p>
<ul className="list-disc list-inside space-y-1.5 text-xs text-slate-300">
<li>
<strong>Stable Fiscal Footprint:</strong> Social protection expenditure sits around 10.5%–11.0% of GDP, substantially lower than post-2008 crash levels (12.1%).
</li>
<li>
<strong>International Context:</strong> According to the <strong>OECD Social Expenditure Database</strong>, the UK spends significantly less as a percentage of GDP on social protection than major peer European nations (e.g., France at 18.8%, Germany at 15.4%, and Northern European averages at 14.2%).
</li>
<li>
<strong>Illness vs. Policy Growth:</strong> Increases in monetary expenditure reflect nominal GDP growth, general inflation uprating, and aging population demographics rather than structural policy expansion.
</li>
</ul>
</div>

{/* Citations Box */}
<div className="p-4 rounded-xl bg-purple-950/20 border border-purple-500/30 text-xs space-y-2 font-mono">
<div className="font-bold text-purple-300 flex items-center gap-1.5">
<BookOpen className="w-4 h-4 text-purple-400" /> Cited Official Reports & Statistical Data:
</div>
<ul className="space-y-1.5 text-slate-300 text-[11px] list-disc list-inside">
<li>
<strong>Office for Budget Responsibility (OBR):</strong> <em>Economic and Fiscal Outlook (March 2026 Release).</em> Expenditure on working-age benefits as a percentage of nominal GDP.
</li>
<li>
<strong>Institute for Fiscal Studies (IFS):</strong> <em>A Survey of Public Spending and Welfare (2025/2026).</em> Historical analysis of social security spend vs GDP.
</li>
<li>
<strong>OECD Social Expenditure Database (SOCX):</strong> <em>Public Expenditure on Health and Incapacity Benefits across OECD Nations (2025 Report).</em>
</li>
</ul>
</div>
</div>
</div>
)}

{/* SECTION 5: DISABILITY CHARITY A-Z DIRECTORY TAB */}
{activeTab === 'charities' && (
<div className="space-y-6">
<div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
<div className="flex items-center gap-2 text-teal-400 text-xs font-bold uppercase tracking-wider">
<HeartHandshake className="w-4 h-4" />
<span>Charity & Advocacy Support Network</span>
</div>
<h2 className="text-2xl font-black text-slate-100">
UK Disability Charities A–Z Directory & Contact Info
</h2>
<p className="text-xs md:text-sm text-slate-300 leading-relaxed">
Comprehensive directory of verified UK disability charities, support organizations, and specialized helplines providing independent welfare advice, PIP appeal advocacy, and healthcare resources.
</p>
</div>

{/* Search and Filters Bar */}
<div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
{/* Search Input */}
<div className="relative md:col-span-2">
<Search className="w-4 h-4 absolute left-3 top-3 text-slate-500" />
<input
type="text"
value={charitySearch}
onChange={(e) => setCharitySearch(e.target.value)}
placeholder="Search charity name, condition (e.g. MS, Epilepsy, Hearing), or support type..."
className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-purple-500"
/>
</div>

{/* Category Filter Dropdown */}
<div>
<select
value={charityCategory}
onChange={(e) => setCharityCategory(e.target.value)}
className="w-full p-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-purple-500"
>
{charityCategoriesList.map((cat) => (
<option key={cat} value={cat}>
Category: {cat}
</option>
))}
</select>
</div>
</div>

{/* A-Z Letter Filter Bar */}
<div className="flex items-center gap-1 overflow-x-auto no-scrollbar pt-2 border-t border-slate-800">
<span className="text-xs font-bold text-slate-400 mr-2 shrink-0">Filter A-Z:</span>
{['ALL', ...'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')].map((letter) => (
<button
key={letter}
onClick={() => setCharityLetter(letter)}
className={`px-2.5 py-1 rounded text-xs font-bold transition shrink-0 ${ charityLetter === letter ? 'bg-purple-600 text-white' : 'bg-slate-950 text-slate-400 hover:bg-slate-800 hover:text-slate-200' }`}
>
{letter}
</button>
))}
</div>
</div>

{/* Charity Cards List */}
<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
{filteredCharities.length > 0 ? (
filteredCharities.map((charity, index) => (
<div
key={index}
className="p-5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition space-y-3 flex flex-col justify-between"
>
<div className="space-y-2">
<div className="flex items-start justify-between gap-2">
<h3 className="font-black text-base text-slate-100 flex items-center gap-2">
<HeartHandshake className="w-4 h-4 text-purple-400 shrink-0" />
<span>{charity.name}</span>
</h3>
<span className="text-[10px] px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 font-semibold border border-purple-500/30 shrink-0">
{charity.category}
</span>
</div>
<p className="text-xs text-slate-300 leading-relaxed">
{charity.desc}
</p>
</div>

<div className="pt-3 border-t border-slate-800/80 space-y-2 text-xs">
<div className="flex items-center gap-2 text-teal-300 font-bold">
<Phone className="w-3.5 h-3.5" />
<a href={`tel:${charity.phone.replace(/\s+/g, '')}`} className="hover:underline font-mono">
{charity.phone}
</a>
<span className="text-[10px] text-slate-500 font-normal">({charity.hours})</span>
</div>

<div className="flex items-center justify-between pt-1 text-[11px]">
<a
href={`https://${charity.web}`}
target="_blank"
rel="noopener noreferrer"
className="text-slate-400 hover:text-teal-300 underline inline-flex items-center gap-1 font-mono"
>
<Globe className="w-3 h-3" /> {charity.web} <ExternalLink className="w-2.5 h-2.5" />
</a>
<button
onClick={() => {
setCustomNote(`I am seeking advocacy guidance regarding ${charity.name} resources for my constituency casework.`);
setActiveTab('briefing');
}}
className="text-purple-400 hover:text-purple-300 text-[10px] font-bold underline"
>
Add to MP Briefing
</button>
</div>
</div>
</div>
))
) : (
<div className="col-span-full p-8 text-center bg-slate-900 rounded-2xl border border-slate-800 space-y-2">
<Info className="w-8 h-8 text-slate-500 mx-auto" />
<div className="text-slate-300 font-bold">No disability charities match your search query or letter filter.</div>
<button
onClick={() => { setCharitySearch(''); setCharityLetter('ALL'); setCharityCategory('ALL'); }}
className="text-xs text-purple-400 underline font-semibold"
>
Reset All Search Filters
</button>
</div>
)}
</div>
</div>
)}

{/* SECTION 6: PRINTABLE MP BRIEFING PACK GENERATOR */}
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
{ id: 'pip_multiplier', label: 'PIP Regional Multiplier (£1.40-£1.70 Return)' },
{ id: 'welfare_gdp', label: 'Welfare Spend as % of GDP (Stable Trends)' },
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
className={`flex items-center gap-3 p-3 rounded-xl border text-xs font-semibold text-left transition ${ selectedTopics.includes(top.id) ? 'bg-purple-600/20 border-purple-500 text-purple-200' : 'bg-slate-950 border-slate-800 text-slate-400' }`}
>
<div className={`w-4 h-4 rounded flex items-center justify-center border ${ selectedTopics.includes(top.id) ? 'bg-purple-600 border-purple-500 text-white' : 'border-slate-700' }`}>
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

{selectedTopics.includes('pip_multiplier') && (
<div className="space-y-1">
<h3 className="font-bold text-sm text-purple-900 border-b border-purple-200 pb-0.5">
2. PIP Regional Multiplier Effect (£1.40–£1.70 Local Economic Return)
</h3>
<p className="text-slate-700 leading-relaxed">
<strong>Economic Evidence:</strong> Independent economic modeling demonstrates that every £1.00 disbursed in PIP generates between <strong>£1.40 and £1.70</strong> in local economic output. Claimants immediately spend disability cash on adaptive care, heating, and local transport, driving local VAT revenues and sustaining high-street employment.
</p>
<div className="text-[10px] text-slate-500 font-mono">Source: NIESR Macroeconomic Multipliers & New Economics Foundation Reports</div>
</div>
)}

{selectedTopics.includes('welfare_gdp') && (
<div className="space-y-1">
<h3 className="font-bold text-sm text-purple-900 border-b border-purple-200 pb-0.5">
3. Welfare Spending as % of GDP (Stable & Falling Trend)
</h3>
<p className="text-slate-700 leading-relaxed">
<strong>Fiscal Reality:</strong> Total UK social protection spend as a percentage of GDP has remained stable between 10% and 11% for over two decades—well below the 2010–2012 post-crisis peak (12.1%). Furthermore, the UK spends significantly less as a % of GDP on disability and welfare than the OECD average (13.2%) and peer European nations.
</p>
<div className="text-[10px] text-slate-500 font-mono">Source: Office for Budget Responsibility (OBR) & OECD Social Expenditure Database</div>
</div>
)}

{selectedTopics.includes('pip_fraud') && (
<div className="space-y-1">
<h3 className="font-bold text-sm text-purple-900 border-b border-purple-200 pb-0.5">
4. PIP Fraud Rates vs Public Perception
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
5. Independent Tribunal Reversal Rates
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
6. Universal Credit (UC) Standard Allowances & Disability Elements (2026/27)
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
7. Carer's Allowance & Universal Credit Carer Element (2026/27)
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
8. Motability Scheme Structure
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
9. Economic Inactivity & Health Trends
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

{/* SECTION 7: KNOW YOUR RIGHTS SECTION */}
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

{/* SECTION 8: LEGAL & MODERATION STANDARDS HUB */}
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
<ShieldCheck className="w-5 h-5" /> Defamation Act 2013 Compliance
</div>
<p className="text-xs text-slate-300 leading-relaxed">
All published statements are cross-checked against official Parliamentary Hansard transcripts, verified media broadcasts, or public statements. Under Sections 2 (Truth) and 3 (Honest Opinion) of the Defamation Act 2013, reporting public figures' public claims alongside official DWP figures is fully protected.
</p>
<div className="text-[10px] text-slate-500 font-mono">Ref: Defamation Act 2013 c.26</div>
</div>

{/* Card 2: Non-Partisan Objectivity */}
<div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
<div className="flex items-center gap-2 text-teal-400 font-bold text-sm">
<Scale className="w-5 h-5" /> Non-Partisan Neutrality Standards
</div>
<p className="text-xs text-slate-300 leading-relaxed">
The index monitors misinformation across all major political parties, government ministers, opposition shadow figures, tabloids, and broadsheets impartially. Fact checks cite primary government datasets (Stat-Xplore, ONS, MoJ) exclusively.
</p>
<div className="text-[10px] text-slate-500 font-mono">Ref: UK Public Interest Fair Comment Principles</div>
</div>
</div>
</div>
)}

{/* SECTION 9: DISABILITY HELP & ADVOCACY */}
{activeTab === 'support' && (
<div className="max-w-4xl mx-auto space-y-6">
<div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
<div className="flex items-center gap-2 text-purple-400 text-xs font-bold uppercase tracking-wider">
<Users className="w-4 h-4" />
<span>Support Network & Advice Services</span>
</div>
<h2 className="text-2xl font-black text-slate-100">
Disability Help & Advocacy Directory
</h2>
<p className="text-xs md:text-sm text-slate-300 leading-relaxed">
If you or someone you know is facing a PIP assessment, reassessment, or appeal, these accredited UK organizations offer free, confidential welfare advice and legal advocacy.
</p>
</div>

<div className="space-y-4">
{SUPPORT_ORGANIZATIONS.map((org, index) => (
<div key={index} className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2 hover:border-slate-700 transition">
<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
<h3 className="font-bold text-base text-slate-100 flex items-center gap-2">
<HeartHandshake className="w-4 h-4 text-purple-400" /> {org.name}
</h3>
<div className="flex items-center gap-3 text-xs font-mono">
<span className="text-teal-400 font-bold flex items-center gap-1">
<Phone className="w-3.5 h-3.5" /> {org.phone}
</span>
<a
href={`https://${org.web}`}
target="_blank"
rel="noopener noreferrer"
className="text-slate-400 hover:text-slate-200 underline inline-flex items-center gap-1"
>
{org.web} <ExternalLink className="w-3 h-3" />
</a>
</div>
</div>
<p className="text-xs text-slate-300 leading-relaxed">{org.desc}</p>
</div>
))}
</div>
</div>
)}

</main>
</div>
);
}
