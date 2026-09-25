export const SPENDING_LINKS = [
  { name: "DWP Stat-Xplore & Benefit Expenditure Tables", url: "https://stat-xplore.dwp.gov.uk/", org: "DWP", desc: "Official caseloads, PIP/UC/ESA spend by year, forecast tables 2026-2031" },
  { name: "DWP Fraud & Error in the Benefit System", url: "https://www.gov.uk/government/collections/fraud-and-error-in-the-benefit-system", org: "DWP", desc: "Official fraud rate - PIP official DWP estimate 0.4% - 0.5%" },
  { name: "IFS - Welfare Spending & Fiscal Facts", url: "https://ifs.org.uk/taxlab/taxlab-data-item/what-welfare-spending", org: "IFS", desc: "Breakdown of working-age benefit spend at ~4.7% of GDP, static relative to 2009/10 peak (~5.5%)" },
  { name: "OBR Economic & Fiscal Outlook March 2026", url: "https://obr.uk/efo/economic-and-fiscal-outlook-march-2026/", org: "OBR", desc: "Forecasts: disability £77.1bn 2025/26, incapacity caseload 3.4m -> 4.0m to 2030/31" },
  { name: "Resolution Foundation - Welfare Trends", url: "https://www.resolutionfoundation.org/publications/", org: "Resolution Foundation", desc: "Real-terms +£19bn since 2019/20, lifetime contributions, contributory benefits" },
  { name: "ONS Labour Market & Economic Inactivity", url: "https://www.ons.gov.uk/employmentandlabourmarket/peopleinwork/employmentandemployeetypes/bulletins/uklabourmarket/latest", org: "ONS", desc: "84% of inactive have illness, caring, study - not choice" },
  { name: "House of Commons Library Welfare Briefings", url: "https://commonslibrary.parliament.uk/research-briefings/cbp-9830/", org: "HoC Library", desc: "Independent breakdowns of PIP, UC, ESA eligibility & spend" }
];

export const SPENDING_BREAKDOWN_2025_26 = [
  { label: "State Pensions", value: 146, color: "#8b5cf6", pct: "42.2%" },
  { label: "Universal Credit (inc. health)", value: 67, color: "#14b8a6", pct: "19.4%" },
  { label: "Disability Benefits (PIP/DLA/AA)", value: 44.7, color: "#f59e0b", pct: "12.9%" },
  { label: "Incapacity Benefits (ESA / UC LCWRA)", value: 32.4, color: "#ef4444", pct: "9.4%" },
  { label: "Housing Benefit (legacy)", value: 12.1, color: "#06b6d4", pct: "3.5%" },
  { label: "Child Benefit & Others", value: 43.8, color: "#6366f1", pct: "12.6%" },
];

export const CONTRIBUTORY_DEBUNK_DATA = [
  {
    stat: "81%",
    myth: "Disability claimants have never worked or paid into the tax system.",
    fact: "81% of new working-age disability benefit claimants (PIP/ESA/UC-health) had paid employment in the 4 years prior to claim.",
    detail: "of new working-age disability benefit claimants (PIP/ESA/UC-health) had paid employment in the 4 years prior to claim",
    source: "DWP Pathways to Work Green Paper Evidence Pack 2026 / DWP Longitudinal Study"
  },
  {
    stat: "68-72%",
    myth: "Claimants rely on state support without long-term tax contributions.",
    fact: "68–72% of claimants had 5+ years of continuous NI contributions before falling ill, averaging 11.2 years of work.",
    detail: "had 5+ years continuous NI contributions before falling ill - average 11.2 years of work",
    source: "DWP & Resolution Foundation Lifetime Contributions Analysis 2025"
  },
  {
    stat: "17%",
    myth: "PIP is an out-of-work benefit that discourages employment.",
    fact: "17% of PIP claimants are in active paid work (up from 13% in 2021). PIP is a non-means-tested extra-costs benefit, not an out-of-work benefit.",
    detail: "of current PIP claimants are in work now (up from 13% in 2021), despite extra-costs. PIP is NOT out-of-work benefit",
    source: "DWP PIP Statistics March 2024 table"
  },
  {
    stat: "39%",
    myth: "Universal Credit is only paid to unemployed individuals.",
    fact: "39% of all Universal Credit claimants are currently in paid employment receiving in-work top-ups due to low pay or high housing costs.",
    detail: "of all Universal Credit claimants are already in paid employment - in-work top-up due to low pay/housing",
    source: "DWP Stat-Xplore UC Employment Status May 2026"
  },
  {
    stat: "40 yrs",
    myth: "Disabled individuals are a net drain on public finances over their lifetime.",
    fact: "The average person becoming disabled in their 40s has contributed over 20–25 years of lifetime tax and National Insurance prior to claiming.",
    detail: "Average lifetime tax/NI contribution of person becoming disabled in their 40s before claim",
    source: "IFS Tax & Benefit Model & OBR Fiscal Sustainability"
  },
  {
    stat: "1.4x-1.7x",
    myth: "PIP spending is a passive drain on the economy.",
    fact: "Disability spending acts as a high-velocity fiscal multiplier, generating £1.40–£1.70 in local economic output per £1 paid, with up to 20% returned directly via VAT.",
    detail: "Fiscal multiplier generated per £1 disbursed due to immediate spend on utilities, accessible transport, and high street goods",
    source: "NIESR Macroeconomic Evaluations & Keynesian Transfer Models"
  },
  {
    stat: "0.4%",
    myth: "PIP is rife with systemic benefit fraud.",
    fact: "Official DWP estimates confirm intentional PIP fraud sits at just 0.4% (under 0.5%), making it one of the lowest across all public spending.",
    detail: "Official DWP estimated fraud rate across total PIP expenditure",
    source: "DWP Fraud and Error in the Benefit System 2024–2025 Estimates"
  }
];

export const BENEFIT_RATES_2026_2027 = {
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

export const ECONOMIC_IMPACT_DATA = {
  multiplier: {
    stat: "1.4x – 1.7x Local Multiplier & Circular Economy",
    title: "100% Domestic Retention vs. Offshoring & Tax Havens",
    description: "Every £1 disbursed in PIP is spent directly within the local UK economy on immediate non-discretionary costs, generating £1.40–£1.70 in local trade while returning up to 20% to the Treasury via VAT.",
    fullOverview: `
      Unlike tax breaks for top earners—which carry high marginal savings rates and frequently leak into offshore wealth structures or international asset markets—disability benefit payments are 100% re-spent domestically within days of receipt.
      
      Because PIP recipients face non-discretionary, unavoidable extra living expenses (energy bills, specialized transport, local care support, and accessible equipment), disability expenditure functions as a high-velocity circular economic driver. Money flows directly to high-street merchants, local utility providers, transport operators, and independent tradespeople.
      
      This continuous domestic circulation sustains regional business revenues, protects frontline retail and service jobs, and directly generates immediate tax receipts for HM Treasury via VAT and local business rates.
    `,
    sources: [
      { name: "NIESR Macroeconomic Evaluations & Keynesian Transfer Models", url: "https://www.niesr.ac.uk/" },
      { name: "House of Lords Library - Cost of Living & Disabled Households", url: "https://lordslibrary.parliament.uk/cost-of-living-impact-of-rising-costs-on-disabled-people/" },
      { name: "Scope & Purple Pound Economic Research", url: "https://www.scope.org.uk/" }
    ]
  },
  motability: {
    stat: "£4.3bn GDP & 34,000 Jobs Supported",
    title: "Anchor of UK Automotive & Used Vehicle Ecosystem",
    description: "The Motability Scheme contributes £4.3bn to UK GDP, underpins 34,000 automotive supply chain jobs, and acts as the primary engine supplying reliable, high-quality stock to the UK second-hand car market.",
    fullOverview: `
      The Motability Scheme operates as a cornerstone industrial pillar for the UK automotive sector. According to independent Oxford Economics evaluation, the Scheme directly and indirectly contributes £4.3 billion to UK GDP (0.2% of national economic output) and supports 34,000 skilled jobs across dealership networks, vehicle conversion facilities, maintenance providers, and vehicle manufacturing plants. Notably, 40% of these supported jobs are located within the most economically deprived UK constituencies.

      Crucially, Motability plays an indispensable structural role in the broader UK used car market. By rotating well-maintained vehicles after 3-year lease periods, Motability acts as the UK's single largest supplier of young, low-mileage second-hand cars equipped with full service histories. 

      This steady influx of high-quality ex-lease inventory stabilizes prices across the second-hand car market—making safe, reliable vehicles affordable for millions of working families while accelerating the national transition to zero-emission electric vehicles across all socioeconomic demographics.
    `,
    sources: [
      { name: "Motability Scheme Economic Impact Factsheet (Oxford Economics Analysis)", url: "https://news.mo.co.uk/news/scheme-impact" },
      { name: "Parliamentary Written Evidence on Motability & Automotive Sector", url: "https://committees.parliament.uk/writtenevidence/149659/pdf/" },
      { name: "Motability Operations Response to Automotive Trade Impact", url: "https://news.mo.co.uk/news/adam-smith-institute-proposals-would-push-up-costs" }
    ]
  },
  gdp: {
    stat: "Static Share of GDP",
    title: "Below 2009/10 Financial Crash Peak",
    description: "UK working-age welfare spending stands steady at ~4.7%–4.9% of GDP—remaining below its post-crash peak (~5.5%). Total public social expenditure remains significantly lower than European peers like France (18.8%) and Germany (15.4%).",
    fullOverview: `
      Despite claims of ballooning public expenditure, working-age disability and health spending as a proportion of UK GDP remains stable and below historical crisis peaks. Institute for Fiscal Studies (IFS) analysis confirms working-age welfare spending sits at ~4.7% of GDP, compared to 5.5% in 2009/10.

      In an international context, the UK spends significantly less on social protection than European economic peers, operating far below France (18.8% of GDP) and Germany (15.4% of GDP).
    `,
    sources: [
      { name: "IFS - What is Welfare Spending? (TaxLab Data)", url: "https://ifs.org.uk/taxlab/taxlab-data-item/what-welfare-spending" },
      { name: "OBR Economic & Fiscal Outlook", url: "https://obr.uk/efo/economic-and-fiscal-outlook-march-2026/" }
    ]
  },
  fraud: {
    stat: "0.4% – 0.5% PIP Fraud",
    title: "Among Lowest Across All Public Spending",
    description: "Official DWP estimates confirm PIP overpayment due to fraud is just 0.4%–0.5%, compared to higher rates in wage-tracked benefits. Over 70% of appealed decisions are overturned at independent tribunals.",
    fullOverview: `
      Official DWP Fraud and Error statistics consistently prove that PIP maintains one of the lowest fraud rates across the entire government budget at just 0.4%–0.5%. The vast majority of overpayments are due to administrative or claimant error during complex medical reporting, rather than intentional deception.

      Furthermore, tribunal statistics show that over 70% of PIP assessment appeals taken to independent courts are decided in favor of the claimant, proving that initial administrative refusals often misrepresent genuine eligibility rather than fraudulent intent.
    `,
    sources: [
      { name: "DWP Fraud and Error in the Benefit System Estimates", url: "https://www.gov.uk/government/collections/fraud-and-error-in-the-benefit-system" },
      { name: "House of Commons Library - PIP Appeal Success Rates", url: "https://commonslibrary.parliament.uk/research-briefings/cbp-9830/" }
    ]
  }
};
