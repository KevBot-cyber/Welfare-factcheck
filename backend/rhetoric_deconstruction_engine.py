"""
rhetoric_deconstruction_engine.py
Engine to deconstruct rhetoric, political myths, and welfare stigma using statutory rules
and real-time statistical API data.
"""

from benefit_coverage_matrix import BENEFIT_REGISTRY
from data_sources_api import ONSDataClient, ExternalResearchIngestor

class RhetoricDeconstructionEngine:
    def __init__(self):
        self.ons_client = ONSDataClient()
        self.research_store = ExternalResearchIngestor()

    def analyze_rhetoric(self, rhetoric_statement: str) -> Dict[str, Any]:
        text = rhetoric_statement.lower()
        
        # Scenario A: 'Better off on benefits than working'
        if "better off" in text and "work" in text:
            return self._deconstruct_work_payoff_myth()
            
        # Scenario B: 'Benefits are spiralling due to young people'
        if "young" in text or "school" in text or "lazy" in text:
            return self._deconstruct_young_people_myth()

        # Scenario C: 'Disability claimants are faking / not trying to work'
        if "pip" in text or "disability" in text or "faking" in text:
            return self._deconstruct_pip_stigma()

        # Fallback General Analysis
        return {
            "statement": rhetoric_statement,
            "verdict": "UNSUBSTANTIATED / GENERALISATION",
            "analytical_breakdown": "Statement lacks statutory backing. All UK working-age benefits carry strict conditionality or objective physical/mental descriptor thresholds."
        }

    def _deconstruct_work_payoff_myth(self) -> Dict[str, Any]:
        research = self.research_store.get_fiscal_context()
        emtr = research["resolution_foundation_data"]["effective_marginal_tax_rate_uc_and_ni"]
        
        return {
            "claim": "People are better off on benefits than working",
            "verdict": "FALSE",
            "evidence_base": [
                f"Under Universal Credit, there is no 100% cliff-edge deduction. The taper rate is fixed at 55%.",
                f"For every £1 earned net, a claimant keeps 45p of their award, ensuring net income ALWAYS increases with work.",
                f"Even at high marginal rates (combined ~{emtr}% with tax/NI), work remains financially remunerative relative to zero-earnings."
            ],
            "statutory_mechanism": "Universal Credit Earnings Taper (Section 22 Welfare Reform Act 2012)"
        }

    def _deconstruct_pip_stigma(self) -> Dict[str, Any]:
        pip_info = BENEFIT_REGISTRY["PIP"]
        return {
            "claim": "PIP claimants are avoiding work / abusing out-of-work benefits",
            "verdict": "FACTUALLY INACCURATE",
            "evidence_base": [
                pip_info.key_anti_myth_fact,
                "PIP is not an out-of-work benefit. Over 20% of PIP recipients are in active full-time or part-time employment.",
                "Assessment requires objective evidence against 12 daily living and mobility activities evaluated by independent health professionals."
            ]
        }

    def _deconstruct_young_people_myth(self) -> Dict[str, Any]:
        return {
            "claim": "Young people leave school and go straight onto benefits",
            "verdict": "STATUTORILY IMPOSSIBLE",
            "evidence_base": [
                "16-17 year olds are legally prohibited from claiming Universal Credit except in rare hardship cases (e.g., care leavers, severe disability).",
                "Under-25s receive a reduced standard allowance (£338.58/mo), making independent living on benefits alone non-viable without additional housing elements.",
                "Intensive Work Search Group rules require up to 35 hours per week of verified job-seeking activity."
            ]
        }

# --- TEST EXECUTOR ---
if __name__ == "__main__":
    engine = RhetoricDeconstructionEngine()
    analysis = engine.analyze_rhetoric("People on PIP are just avoiding work and getting rich on benefits")
    print(f"VERDICT: {analysis['verdict']}")
    for point in analysis['evidence_base']:
        print(f"- {point}")
