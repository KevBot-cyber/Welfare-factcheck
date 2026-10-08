/**
 * ucRatesAndRules.js
 * Evaluation engine module for GOV.UK benefit rates, Universal Credit calculation,
 * capital limits, and conditionality thresholds for 2026/27.
 */

export const UC_RATES_2026 = {
  // Monthly Standard Allowances (2026/27)
  STANDARD_SINGLE_UNDER_25: 338.58,
  STANDARD_SINGLE_25_PLUS: 424.90,
  STANDARD_COUPLE_UNDER_25: 528.34,
  STANDARD_COUPLE_25_PLUS: 666.97,

  // Universal Credit Elements
  CHILD_ELEMENT: 303.94, // Per eligible child (Two-child limit removed Apr 2026)
  CARER_ELEMENT: 209.34,
  LCWRA_ELEMENT_NEW: 217.26, // Post-April 2026 rate for new LCWRA claimants

  // Work Allowances (Monthly)
  WORK_ALLOWANCE_HIGHER: 710.00, // No housing support received
  WORK_ALLOWANCE_LOWER: 427.00,  // Housing support received

  // Earnings Taper
  TAPER_RATE: 0.55, // 55p reduction per £1 earned above work allowance

  // Capital Limits
  LOWER_CAPITAL_LIMIT: 6000.00,
  UPPER_CAPITAL_LIMIT: 16000.00,
  TARIFF_INCOME_PER_250: 4.35, // £4.35/mo per £250 between £6k and £16k

  // Administrative Earnings Thresholds (AET)
  AET_INDIVIDUAL: 991.00,
  AET_COUPLE: 1597.00
};

export class UniversalCreditEvaluator {
  constructor(rates = UC_RATES_2026) {
    this.rates = rates;
  }

  /**
   * Calculates assumed tariff income on capital between £6,000 and £16,000.
   */
  calculateTariffIncome(capital) {
    if (capital <= this.rates.LOWER_CAPITAL_LIMIT) {
      return 0.0;
    }
    if (capital >= this.rates.UPPER_CAPITAL_LIMIT) {
      return Infinity; // Disqualifies claimant
    }

    const excess = capital - this.rates.LOWER_CAPITAL_LIMIT;
    // Each complete or partial £250 adds £4.35
    const units = Math.ceil(excess / 250.0);
    return units * this.rates.TARIFF_INCOME_PER_250;
  }

  /**
   * Calculates maximum entitlement, deductions, and final monthly UC payout.
   */
  evaluateMonthlyAward({
    age,
    isCouple = false,
    partnerAge = null,
    numChildren = 0,
    capital = 0.0,
    netEarnedIncome = 0.0,
    hasHousingCosts = false,
    hasLcwra = false,
    isCarer = false
  }) {
    // 1. Capital Disqualification Check
    if (capital >= this.rates.UPPER_CAPITAL_LIMIT) {
      return {
        eligible: false,
        reason: `Capital (£${capital.toFixed(2)}) meets or exceeds upper limit of £16,000.`,
        netAward: 0.0
      };
    }

    // 2. Base Standard Allowance
    let standard = 0.0;
    if (!isCouple) {
      standard = age < 25 ? this.rates.STANDARD_SINGLE_UNDER_25 : this.rates.STANDARD_SINGLE_25_PLUS;
    } else {
      const pAge = partnerAge !== null ? partnerAge : age;
      if (age < 25 && pAge < 25) {
        standard = this.rates.STANDARD_COUPLE_UNDER_25;
      } else {
        standard = this.rates.STANDARD_COUPLE_25_PLUS;
      }
    }

    // 3. Add Elements
    const childElem = numChildren * this.rates.CHILD_ELEMENT;
    const carerElem = isCarer ? this.rates.CARER_ELEMENT : 0.0;
    const lcwraElem = hasLcwra ? this.rates.LCWRA_ELEMENT_NEW : 0.0;

    const maxEntitlement = standard + childElem + carerElem + lcwraElem;

    // 4. Unearned Income (Tariff Income on Capital)
    const tariffIncome = this.calculateTariffIncome(capital);

    // 5. Work Allowance & Earnings Taper
    const hasWorkAllowance = numChildren > 0 || hasLcwra;
    let workAllowance = 0.0;
    if (hasWorkAllowance) {
      workAllowance = hasHousingCosts ? this.rates.WORK_ALLOWANCE_LOWER : this.rates.WORK_ALLOWANCE_HIGHER;
    }

    const assessableEarnings = Math.max(0.0, netEarnedIncome - workAllowance);
    const earningsDeduction = assessableEarnings * this.rates.TAPER_RATE;

    // 6. Final Calculation
    const totalDeductions = earningsDeduction + tariffIncome;
    const finalAward = Math.max(0.0, maxEntitlement - totalDeductions);

    // 7. Conditionality Regime Evaluation
    const aet = isCouple ? this.rates.AET_COUPLE : this.rates.AET_INDIVIDUAL;
    const conditionality = netEarnedIncome >= aet
      ? "Light Touch Regime (Earnings above AET)"
      : "Intensive Work Search Group (Subject to Work Search Mandates and Sanctions)";

    return {
      eligible: true,
      maxEntitlement,
      tariffIncome,
      workAllowanceApplied: workAllowance,
      earningsDeduction,
      netAward: finalAward,
      conditionalityGroup: conditionality
    };
  }
}
