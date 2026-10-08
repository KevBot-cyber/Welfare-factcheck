/**
 * factCheckerMyths.js
 * Automated fact-checking and debunking rules for common welfare narratives.
 * Uses statutory rules, age constraints, and conditionality requirements.
 */

// Import rates or evaluation engine dependencies as required
import { BENEFIT_RATES_2026_2027 } from '../constants/spendingData';
import { UniversalCreditEvaluator } from './ucRatesAndRules'; // Adjust path if needed

export class WelfareMythDebunker {
  constructor() {
    this.ucEngine = new UniversalCreditEvaluator();
  }

  /**
   * Debunks: 'Young people leave school and go straight onto full benefits.'
   * Fact Base:
   * 1. 16-17 year olds are generally EXCLUDED from Universal Credit by law, except under rare hardship conditions.
   * 2. Single under-25s receive a significantly lower standard allowance (£338.58/mo).
   * 3. Full intensive work search conditionality applies immediately upon claiming.
   * 4. Habitual Residence and National Insurance/Identity verification rules apply.
   */
  evaluateSchoolLeaverMyth(
    age,
    livingWithParents = true,
    educationStatus = '',
    savings = 0.0
  ) {
    const facts = [];
    let isEligible = true;

    if (age < 16) {
      isEligible = false;
      facts.push("Under 16s are strictly ineligible for Universal Credit.");
    } else if (age === 16 || age === 17) {
      isEligible = false;
      facts.push(
        "16 and 17-year-olds are legally excluded from claiming Universal Credit unless they meet specific statutory exceptions (e.g., estranged, caring for a child, or severe disability)."
      );
    }

    if (
      educationStatus === "full_time_secondary" ||
      educationStatus === "non_advanced_education"
    ) {
      isEligible = false;
      facts.push(
        "Young people in full-time non-advanced education (e.g., A-Levels, T-Levels, College) cannot claim Universal Credit as independent claimants."
      );
    }

    // Rate analysis for eligible 18-24 year olds using imported UC engine or static rates
    const awardInfo = this.ucEngine.evaluateMonthlyAward({
      age,
      isCouple: false,
      partnerAge: null,
      numChildren: 0,
      capital: savings,
      netEarnedIncome: 0.0,
      hasHousingCosts: !livingWithParents,
      hasLcwra: false,
      isCarer: false
    });

    const standardRateUnder25 = BENEFIT_RATES_2026_2027?.STANDARD_SINGLE_UNDER_25 || 338.58;
    const standardRate25Plus = BENEFIT_RATES_2026_2027?.STANDARD_SINGLE_25_PLUS || 427.06;

    const debunkSummary = [
      "CLAIM: 'Young people leave school and go straight onto benefits.'",
      "VERDICT: MISLEADING / FALSE.",
      "STATUTORY CONTEXT:",
      "- 16-17 year olds leaving school CANNOT claim Universal Credit (exceptions are extremely rare).",
      `- An 18-24 year old living at home receives a standard allowance of only £${standardRateUnder25.toFixed(2)}/month (£${(standardRateUnder25 / 4.333).toFixed(2)}/week).`,
      "- Claimants are immediately placed in the 'Intensive Work Search Group', requiring up to 35 hours/week of documented job search activities under threat of benefit sanctions."
    ].join('\n');

    return {
      claim: "Young people leave school and go straight onto benefits",
      verdict: "FALSE / MISLEADING",
      eligible: isEligible,
      monthlyStandardAllowance: age < 25 ? standardRateUnder25 : standardRate25Plus,
      statutoryFacts: facts,
      debunkSummary
    };
  }

  /**
   * Debunks: 'People on PIP are paid not to work' / 'You lose PIP if you get a job.'
   * Fact Base:
   * PIP is completely non-means-tested. It is designed to cover the extra costs of disability.
   * Work status, hours worked, and salary level do NOT reduce PIP entitlement.
   */
  evaluatePipWorkMyth(isEmployed = false, earnings = 0.0) {
    return {
      claim: "People on PIP are paid not to work / You lose PIP if you start working",
      verdict: "FALSE",
      facts: [
        "PIP is not an out-of-work benefit; it is an extra-costs disability benefit.",
        "There is no earnings cap or work hour limit for PIP.",
        "Claimants can work full-time and earn any income level without losing any portion of their PIP award."
      ]
    };
  }
}
