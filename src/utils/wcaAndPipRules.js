/**
 * wcaAndPipRules.js
 * Rule Engine for PIP Descriptors and UC Work Capability Assessments (WCA).
 * Incorporates statutory criteria and myth verification parameters.
 */

export class PIPAssessmentEvaluator {
  // Weekly PIP Rates (2026/27)
  static DAILY_LIVING_STANDARD = 76.70;
  static DAILY_LIVING_ENHANCED = 114.60;
  static MOBILITY_STANDARD = 30.30;
  static MOBILITY_ENHANCED = 80.00;

  /**
   * PIP is non-means-tested and paid regardless of work status or savings.
   * Points: 8-11 = Standard Rate; 12+ = Enhanced Rate.
   */
  static evaluatePipClaim(dailyLivingPoints = 0, mobilityPoints = 0) {
    let dlRate = 0.0;
    let dlStatus = "None";
    if (dailyLivingPoints >= 12) {
      dlRate = PIPAssessmentEvaluator.DAILY_LIVING_ENHANCED;
      dlStatus = "Enhanced";
    } else if (dailyLivingPoints >= 8) {
      dlRate = PIPAssessmentEvaluator.DAILY_LIVING_STANDARD;
      dlStatus = "Standard";
    }

    let mobRate = 0.0;
    let mobStatus = "None";
    if (mobilityPoints >= 12) {
      mobRate = PIPAssessmentEvaluator.MOBILITY_ENHANCED;
      mobStatus = "Enhanced";
    } else if (mobilityPoints >= 8) {
      mobRate = PIPAssessmentEvaluator.MOBILITY_STANDARD;
      mobStatus = "Standard";
    }

    const totalWeekly = dlRate + mobRate;
    const totalMonthlyEquivalent = (totalWeekly * 52) / 12;

    return {
      dailyLivingStatus: dlStatus,
      mobilityStatus: mobStatus,
      weeklyPayout: totalWeekly,
      monthlyEquivalent: totalMonthlyEquivalent,
      meansTested: false, // PIP is never means-tested
      workRestriction: false // Work status does not restrict PIP entitlement
    };
  }
}

export class WCAEvaluator {
  /**
   * Evaluates Limited Capability for Work (LCW) and Limited Capability for 
   * Work-Related Activity (LCWRA) criteria under the Welfare Reform Act.
   */
  static evaluateWcaStatus(descriptorsMet = [], substantialRisk = false) {
    if (descriptorsMet.includes("LCWRA_CRITERIA_MET") || substantialRisk) {
      return {
        group: "LCWRA",
        workSearchRequired: false,
        workPreparationRequired: false,
        description:
          "Claimant has Limited Capability for Work and Work-Related Activity. Exempt from work search."
      };
    } else if (descriptorsMet.includes("LCW_CRITERIA_MET")) {
      return {
        group: "LCW",
        workSearchRequired: false,
        workPreparationRequired: true,
        description:
          "Claimant has Limited Capability for Work. Must attend work-focused interviews and preparation."
      };
    } else {
      return {
        group: "Fit for Work",
        workSearchRequired: true,
        workPreparationRequired: true,
        description:
          "Claimant is fit for work and placed in full intensive work-search conditionality."
      };
    }
  }
}
