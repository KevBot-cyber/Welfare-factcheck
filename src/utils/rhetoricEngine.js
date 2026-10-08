/**
 * rhetoricDeconstructionEngine.js
 * Engine to deconstruct rhetoric, political myths, and welfare stigma using statutory rules
 * and real-time statistical API data.
 */

import { BENEFIT_REGISTRY } from '../constants/benefitCoverageMatrix';
import { ONSDataClient, ExternalResearchIngestor } from './dataSourcesApi';

export class RhetoricDeconstructionEngine {
  constructor() {
    this.onsClient = new ONSDataClient();
    this.researchStore = new ExternalResearchIngestor();
  }

  /**
   * Evaluates input text against known rhetoric scenarios.
   */
  analyzeRhetoric(rhetoricStatement) {
    const text = rhetoricStatement.toLowerCase();

    // Scenario A: 'Better off on benefits than working'
    if (text.includes("better off") && text.includes("work")) {
      return this._deconstructWorkPayoffMyth();
    }

    // Scenario B: 'Benefits are spiralling due to young people'
    if (text.includes("young") || text.includes("school") || text.includes("lazy")) {
      return this._deconstructYoungPeopleMyth();
    }

    // Scenario C: 'Disability claimants are faking / not trying to work'
    if (text.includes("pip") || text.includes("disability") || text.includes("faking")) {
      return this._deconstructPipStigma();
    }

    // Fallback General Analysis
    return {
      statement: rhetoricStatement,
      verdict: "UNSUBSTANTIATED / GENERALISATION",
      analytical_breakdown:
        "Statement lacks statutory backing. All UK working-age benefits carry strict conditionality or objective physical/mental descriptor thresholds."
    };
  }

  /**
   * Deconstructs work vs benefits myths using marginal tax rate calculations.
   */
  _deconstructWorkPayoffMyth() {
    const research = this.researchStore.getFiscalContext();
    const emtr = research.resolution_foundation_data.effective_marginal_tax_rate_uc_and_ni;

    return {
      claim: "People are better off on benefits than working",
      verdict: "FALSE",
      evidence_base: [
        "Under Universal Credit, there is no 100% cliff-edge deduction. The taper rate is fixed at 55%.",
        "For every £1 earned net, a claimant keeps 45p of their award, ensuring net income ALWAYS increases with work.",
        `Even at high marginal rates (combined ~${emtr}% with tax/NI), work remains financially remunerative relative to zero-earnings.`
      ],
      statutory_mechanism: "Universal Credit Earnings Taper (Section 22 Welfare Reform Act 2012)"
    };
  }

  /**
   * Deconstructs disability/PIP stigma using statutory definition and employment statistics.
   */
  _deconstructPipStigma() {
    const pipInfo = BENEFIT_REGISTRY.PIP;
    return {
      claim: "PIP claimants are avoiding work / abusing out-of-work benefits",
      verdict: "FACTUALLY INACCURATE",
      evidence_base: [
        pipInfo ? pipInfo.keyAntiMythFact : "Designed strictly for extra costs of disability; completely compatible with full-time employment.",
        "PIP is not an out-of-work benefit. Over 20% of PIP recipients are in active full-time or part-time employment.",
        "Assessment requires objective evidence against 12 daily living and mobility activities evaluated by independent health professionals."
      ]
    };
  }

  /**
   * Deconstructs youth claims using statutory eligibility rules.
   */
  _deconstructYoungPeopleMyth() {
    return {
      claim: "Young people leave school and go straight onto benefits",
      verdict: "STATUTORILY IMPOSSIBLE",
      evidence_base: [
        "16-17 year olds are legally prohibited from claiming Universal Credit except in rare hardship cases (e.g., care leavers, severe disability).",
        "Under-25s receive a reduced standard allowance (£338.58/mo), making independent living on benefits alone non-viable without additional housing elements.",
        "Intensive Work Search Group rules require up to 35 hours per week of verified job-seeking activity."
      ]
    };
  }
}
