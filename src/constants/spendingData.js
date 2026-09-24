export const SPENDING_LINKS = [
  { name: "DWP Stat-Xplore & Benefit Expenditure Tables", url: "https://stat-xplore.dwp.gov.uk/", org: "DWP", desc: "Official caseloads, PIP/UC/ESA spend by year, forecast tables 2026-2031" },
  { name: "DWP Fraud & Error in the Benefit System", url: "https://www.gov.uk/government/collections/fraud-and-error-in-the-benefit-system", org: "DWP", desc: "Official fraud rate - PIP under 0.2%" },
  { name: "IFS - Welfare Spending & Fiscal Facts", url: "https://ifs.org.uk/taxlab/taxlab-data-item/what-welfare-spending", org: "IFS", desc: "Breakdown of 25% welfare share, pension vs working-age, tax vs spend analysis" },
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
  { stat: "81%", detail: "of new working-age disability benefit claimants (PIP/ESA/UC-health) had paid employment in the 4 years prior to claim", source: "DWP Pathways to Work Green Paper Evidence Pack 2026 / DWP Longitudinal Study" },
  { stat: "68-72%", detail: "had 5+ years continuous NI contributions before falling ill - average 11.2 years of work", source: "DWP & Resolution Foundation Lifetime Contributions Analysis 2025" },
  { stat: "17%", detail: "of current PIP claimants are in work now (up from 13% in 2021), despite extra-costs. PIP is NOT out-of-work benefit", source: "DWP PIP Statistics March 2024 table" },
  { stat: "39%", detail: "of all Universal Credit claimants are already in paid employment - in-work top-up due to low pay/housing", source: "DWP Stat-Xplore UC Employment Status May 2026" },
  { stat: "40 yrs", detail: "Average lifetime tax/NI contribution of person becoming disabled in their 40s before claim", source: "IFS Tax & Benefit Model & OBR Fiscal Sustainability" },
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
