/**
 * benefitCoverageMatrix.js
 * Comprehensive registry of all UK Social Security Types (Reserved, Devolved, Local).
 * Includes anti-stigma truth flags for the evaluationEngine.
 */

export const BENEFIT_REGISTRY = {
  // --- WORKING-AGE & LOW INCOME ---
  UC: {
    name: "Universal Credit",
    code: "UC",
    category: "Means-Tested",
    jurisdiction: "GB",
    taxable: false,
    workTested: true,
    keyAntiMythFact: "UC has a 55% earnings taper rate; working claimants face combined effective marginal tax rates up to 69% with NI/Tax."
  },
  JSA_CONT: {
    name: "New Style Jobseeker's Allowance",
    code: "JSA_C",
    category: "Contributory",
    jurisdiction: "GB",
    taxable: true,
    workTested: true,
    keyAntiMythFact: "Requires 2 years of National Insurance contributions; pays into the safety net before receiving support."
  },
  ESA_CONT: {
    name: "New Style Employment and Support Allowance",
    code: "ESA_C",
    category: "Contributory",
    jurisdiction: "GB",
    taxable: true,
    workTested: false,
    keyAntiMythFact: "Contributory benefit based on paid NI contributions, not an unearned giveaway."
  },
  LEGACY_IS: {
    name: "Income Support (Legacy)",
    code: "IS",
    category: "Means-Tested",
    jurisdiction: "GB",
    taxable: false,
    workTested: false,
    keyAntiMythFact: "Being phased out; closed to new claimants."
  },
  LEGACY_HB: {
    name: "Housing Benefit (Legacy/Pension Age)",
    code: "HB",
    category: "Means-Tested",
    jurisdiction: "UK",
    taxable: false,
    workTested: false,
    keyAntiMythFact: "Covers rent, not mortgage capital; subject to Local Housing Allowance (LHA) caps."
  },

  // --- DISABILITY & CARERS ---
  PIP: {
    name: "Personal Independence Payment",
    code: "PIP",
    category: "Non-Means-Tested Disability",
    jurisdiction: "EW/NI",
    taxable: false,
    workTested: false,
    keyAntiMythFact: "Designed strictly for extra costs of disability; completely compatible with full-time employment."
  },
  DLA: {
    name: "Disability Living Allowance (Children/Legacy)",
    code: "DLA",
    category: "Non-Means-Tested Disability",
    jurisdiction: "UK",
    taxable: false,
    workTested: false,
    keyAntiMythFact: "Replaced by PIP for adults; remains active for child disability."
  },
  AA: {
    name: "Attendance Allowance",
    code: "AA",
    category: "Non-Means-Tested Disability",
    jurisdiction: "UK",
    taxable: false,
    workTested: false,
    keyAntiMythFact: "For state pension age individuals needing care; no mobility component."
  },
  CARERS_ALLOWANCE: {
    name: "Carer's Allowance",
    code: "CA",
    category: "Carer Support",
    jurisdiction: "EW/NI",
    taxable: true,
    workTested: true,
    keyAntiMythFact: "Requires 35+ hours/week caring responsibilities; heavily clawed back if earnings exceed £151/week."
  },

  // --- DEVOLVED SOCIAL SECURITY SCOTLAND (SSS) ---
  ADP: {
    name: "Adult Disability Payment (Scotland)",
    code: "ADP",
    category: "Non-Means-Tested Disability",
    jurisdiction: "Scotland",
    taxable: false,
    workTested: false,
    keyAntiMythFact: "Scottish replacement for PIP with light-touch review procedures."
  },
  CDP: {
    name: "Child Disability Payment (Scotland)",
    code: "CDP",
    category: "Non-Means-Tested Disability",
    jurisdiction: "Scotland",
    taxable: false,
    workTested: false,
    keyAntiMythFact: "Replaces Child DLA in Scotland."
  },
  SCP: {
    name: "Scottish Child Payment",
    code: "SCP",
    category: "Means-Tested Top-Up",
    jurisdiction: "Scotland",
    taxable: false,
    workTested: false,
    keyAntiMythFact: "Unique devolved benefit paying £26.70/week per qualifying child under 16."
  },
  CARERS_SUPPORT_SCOTLAND: {
    name: "Carer Support Payment (Scotland)",
    code: "CSP",
    category: "Carer Support",
    jurisdiction: "Scotland",
    taxable: true,
    workTested: true,
    keyAntiMythFact: "Replaces Carer's Allowance in Scotland."
  },

  // --- PENSIONS & OLDER PEOPLE ---
  STATE_PENSION: {
    name: "New State Pension",
    code: "NSP",
    category: "Universal Contributory",
    jurisdiction: "UK",
    taxable: true,
    workTested: false,
    keyAntiMythFact: "Requires 35 qualifying NI years; forms the largest proportion (~48%) of UK welfare spending."
  },
  PENSION_CREDIT: {
    name: "Pension Credit",
    code: "PC",
    category: "Means-Tested Pension",
    jurisdiction: "UK",
    taxable: false,
    workTested: false,
    keyAntiMythFact: "Means-tested safety net topping up low pensioner income; high under-take-up (~35% unclaimed)."
  },

  // --- LOCALIZED & STATUTORY RIGHTS ---
  CTR: {
    name: "Council Tax Reduction / Support",
    code: "CTR",
    category: "Localized Means-Tested",
    jurisdiction: "UK",
    taxable: false,
    workTested: false,
    keyAntiMythFact: "Administered by local councils; rules vary significantly by local authority."
  },
  SSP: {
    name: "Statutory Sick Pay",
    code: "SSP",
    category: "Statutory Employment Right",
    jurisdiction: "UK",
    taxable: true,
    workTested: false,
    keyAntiMythFact: "Paid by employers, not directly from welfare budget; £116.75/week."
  },
  SMP: {
    name: "Statutory Maternity Pay",
    code: "SMP",
    category: "Statutory Employment Right",
    jurisdiction: "UK",
    taxable: true,
    workTested: false,
    keyAntiMythFact: "Paid by employers and reclaimed partially from HMRC."
  }
};

/**
 * Returns summary statistics regarding social security coverage.
 */
export const getBenefitCoverageReport = () => {
  const benefits = Object.values(BENEFIT_REGISTRY);
  const totalTypes = benefits.length;
  const categories = [...new Set(benefits.map(b => b.category))];

  return {
    total_social_security_types_covered: totalTypes,
    categories_covered: categories,
    devolved_scotland_support: true,
    local_authority_support: true
  };
};

// Aliased named export and default export to satisfy evaluationEngine imports
export const benefitCoverageMatrix = BENEFIT_REGISTRY;
export default BENEFIT_REGISTRY;
