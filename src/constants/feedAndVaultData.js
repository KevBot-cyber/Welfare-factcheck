export const INITIAL_LIVE_FEED = [
  { id: 'f1', time: '10:42 AM', source: 'Hansard Feed (Commons)', sourceUrl: 'https://hansard.parliament.uk/', author: 'Work & Pensions Committee', text: "Minister queried on 72% HMCTS tribunal overturn rate for PIP decisions.", status: "Verified Facts match MoJ", bsFlag: "Low BS" },
  { id: 'f2', time: '10:15 AM', source: 'Daily Express Online', sourceUrl: 'https://www.express.co.uk/', author: 'Welfare Correspondent', text: "Headline: 'Millions set to lose PIP under sweeping new cash-to-voucher plan.'", status: "Flagged Misleading", bsFlag: "High BS (92%)" },
  { id: 'f3', time: '09:30 AM', source: 'BBC News Channel', sourceUrl: 'https://www.bbc.co.uk/news', author: 'Politics Live', text: "Discussion on fit notes and GP workload. Panelists quote RCGP official statistics accurately.", status: "Accurate Data", bsFlag: "Low BS" },
  { id: 'f4', time: '08:50 AM', source: 'GB News Morning', sourceUrl: 'https://www.gbnews.com/', author: 'Guest Commentator', text: "Claims PIP fraud is costing £5 billion annually.", status: "Flagged False", bsFlag: "Extreme BS (98%)" },
  { id: 'f5', time: '08:10 AM', source: 'Hansard Feed (Lords)', sourceUrl: 'https://hansard.parliament.uk/', author: 'Baroness Grey-Thompson', text: "Notes that 84% of PIP claimants use awards for essential heating and medical equipment.", status: "Verified Facts", bsFlag: "Low BS" }
];

export const MYTH_VAULT = [
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
