"""
wca_and_pip_rules.py
Rule Engine for PIP Descriptors and UC Work Capability Assessments (WCA).
Incorporates statutory criteria and myth verification parameters.
"""

from typing import Dict, List, Any

class PIPAssessmentEvaluator:
    """Evaluates Personal Independence Payment (PIP) criteria."""
    
    # Weekly PIP Rates (2026/27)
    DAILY_LIVING_STANDARD = 76.70
    DAILY_LIVING_ENHANCED = 114.60
    MOBILITY_STANDARD = 30.30
    MOBILITY_ENHANCED = 80.00

    @staticmethod
    def evaluate_pip_claim(daily_living_points: int, mobility_points: int) -> Dict[str, Any]:
        """
        PIP is non-means-tested and paid regardless of work status or savings.
        Points: 8-11 = Standard Rate; 12+ = Enhanced Rate.
        """
        dl_rate = 0.0
        dl_status = "None"
        if daily_living_points >= 12:
            dl_rate = PIPAssessmentEvaluator.DAILY_LIVING_ENHANCED
            dl_status = "Enhanced"
        elif daily_living_points >= 8:
            dl_rate = PIPAssessmentEvaluator.DAILY_LIVING_STANDARD
            dl_status = "Standard"

        mob_rate = 0.0
        mob_status = "None"
        if mobility_points >= 12:
            mob_rate = PIPAssessmentEvaluator.MOBILITY_ENHANCED
            mob_status = "Enhanced"
        elif mobility_points >= 8:
            mob_rate = PIPAssessmentEvaluator.MOBILITY_STANDARD
            mob_status = "Standard"

        total_weekly = dl_rate + mob_rate
        total_monthly_equivalent = (total_weekly * 52) / 12

        return {
            "daily_living_status": dl_status,
            "mobility_status": mob_status,
            "weekly_payout": total_weekly,
            "monthly_equivalent": total_monthly_equivalent,
            "means_tested": False, # PIP is never means-tested
            "work_restriction": False # Work status does not restrict PIP entitlement
        }


class WCAEvaluator:
    """Evaluates Universal Credit Work Capability Assessments."""

    @staticmethod
    def evaluate_wca_status(descriptors_met: List[str], substantial_risk: bool = False) -> Dict[str, Any]:
        """
        Evaluates Limited Capability for Work (LCW) and Limited Capability for 
        Work-Related Activity (LCWRA) criteria under the Welfare Reform Act.
        """
        if "LCWRA_CRITERIA_MET" in descriptors_met or substantial_risk:
            return {
                "group": "LCWRA",
                "work_search_required": False,
                "work_preparation_required": False,
                "description": "Claimant has Limited Capability for Work and Work-Related Activity. Exempt from work search."
            }
        elif "LCW_CRITERIA_MET" in descriptors_met:
            return {
                "group": "LCW",
                "work_search_required": False,
                "work_preparation_required": True,
                "description": "Claimant has Limited Capability for Work. Must attend work-focused interviews and preparation."
            }
        else:
            return {
                "group": "Fit for Work",
                "work_search_required": True,
                "work_preparation_required": True,
                "description": "Claimant is fit for work and placed in full intensive work-search conditionality."
            }
        
