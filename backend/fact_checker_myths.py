"""
fact_checker_myths.py
Automated fact-checking and debunking rules for common welfare narratives.
Uses statutory rules, age constraints, and conditionality requirements.
"""

from typing import Dict, Any
from uc_rates_and_rules import UniversalCreditEvaluator, UCRates2026

class WelfareMythDebunker:
    def __init__(self):
        self.uc_engine = UniversalCreditEvaluator()

    def evaluate_school_leaver_myth(self, age: int, living_with_parents: bool, education_status: str, savings: float = 0.0) -> Dict[str, Any]:
        """
        Debunks: 'Young people leave school and go straight onto full benefits.'
        Fact Base:
        1. 16-17 year olds are generally EXCLUDED from Universal Credit by law, except under rare hardship conditions.
        2. Single under-25s receive a significantly lower standard allowance (£338.58/mo).
        3. Full intensive work search conditionality applies immediately upon claiming.
        4. Habitual Residence and National Insurance/Identity verification rules apply.
        """
        facts = []
        is_eligible = True
        
        if age < 16:
            is_eligible = False
            facts.append("Under 16s are strictly ineligible for Universal Credit.")
        elif age in [16, 17]:
            is_eligible = False
            facts.append("16 and 17-year-olds are legally excluded from claiming Universal Credit unless they meet specific statutory exceptions (e.g., estranged, caring for a child, or severe disability).")
        
        if education_status in ["full_time_secondary", "non_advanced_education"]:
            is_eligible = False
            facts.append("Young people in full-time non-advanced education (e.g., A-Levels, T-Levels, College) cannot claim Universal Credit as independent claimants.")

        # Rate analysis for eligible 18-24 year olds
        award_info = self.uc_engine.evaluate_monthly_award(
            age=age,
            is_couple=False,
            partner_age=None,
            num_children=0,
            capital=savings,
            net_earned_income=0.0,
            has_housing_costs=not living_with_parents,
            has_lcwra=False,
            is_carer=False
        )

        monthly_payout = award_info.get("net_award", 0.0)

        debunk_summary = (
            f"CLAIM: 'Young people leave school and go straight onto benefits.'\n"
            f"VERDICT: MISLEADING / FALSE.\n"
            f"STATUTORY CONTEXT:\n"
            f"- 16-17 year olds leaving school CANNOT claim Universal Credit (exceptions are extremely rare).\n"
            f"- An 18-24 year old living at home receives a standard allowance of only £{UCRates2026.STANDARD_SINGLE_UNDER_25:.2f}/month (£78.13/week).\n"
            f"- Claimants are immediately placed in the 'Intensive Work Search Group', requiring up to 35 hours/week of documented job search activities under threat of benefit sanctions."
        )

        return {
            "claim": "Young people leave school and go straight onto benefits",
            "verdict": "FALSE / MISLEADING",
            "eligible": is_eligible,
            "monthly_standard_allowance": UCRates2026.STANDARD_SINGLE_UNDER_25 if age < 25 else UCRates2026.STANDARD_SINGLE_25_PLUS,
            "statutory_facts": facts,
            "debunk_summary": debunk_summary
        }

    def evaluate_pip_work_myth(self, is_employed: bool, earnings: float) -> Dict[str, Any]:
        """
        Debunks: 'People on PIP are paid not to work' / 'You lose PIP if you get a job.'
        Fact Base:
        PIP is completely non-means-tested. It is designed to cover the extra costs of disability.
        Work status, hours worked, and salary level do NOT reduce PIP entitlement.
        """
        return {
            "claim": "People on PIP are paid not to work / You lose PIP if you start working",
            "verdict": "FALSE",
            "facts": [
                "PIP is not an out-of-work benefit; it is an extra-costs disability benefit.",
                "There is no earnings cap or work hour limit for PIP.",
                "Claimants can work full-time and earn any income level without losing any portion of their PIP award."
            ]
        }


# --- QUICK VERIFICATION TEST ---
if __name__ == "__main__":
    debunker = WelfareMythDebunker()
    result = debunker.evaluate_school_leaver_myth(age=17, living_with_parents=True, education_status="leaving_school")
    print(result["debunk_summary"])
