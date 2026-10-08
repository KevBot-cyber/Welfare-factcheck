"""
uc_rates_and_rules.py
Evaluation engine module for GOV.UK benefit rates, Universal Credit calculation,
capital limits, and conditionality thresholds for 2026/27.
"""

from dataclasses import dataclass
from typing import Dict, Any, Optional

@dataclass
class UCRates2026:
    # Monthly Standard Allowances (2026/27)
    STANDARD_SINGLE_UNDER_25: float = 338.58
    STANDARD_SINGLE_25_PLUS: float = 424.90
    STANDARD_COUPLE_UNDER_25: float = 528.34
    STANDARD_COUPLE_25_PLUS: float = 666.97
    
    # Universal Credit Elements
    CHILD_ELEMENT: float = 303.94  # Per eligible child (Two-child limit removed Apr 2026)
    CARER_ELEMENT: float = 209.34
    LCWRA_ELEMENT_NEW: float = 217.26  # Post-April 2026 rate for new LCWRA claimants
    
    # Work Allowances (Monthly)
    WORK_ALLOWANCE_HIGHER: float = 710.00  # No housing support received
    WORK_ALLOWANCE_LOWER: float = 427.00   # Housing support received
    
    # Earnings Taper
    TAPER_RATE: float = 0.55  # 55p reduction per £1 earned above work allowance
    
    # Capital Limits
    LOWER_CAPITAL_LIMIT: float = 6000.00
    UPPER_CAPITAL_LIMIT: float = 16000.00
    TARIFF_INCOME_PER_250: float = 4.35  # £4.35/mo per £250 between £6k and £16k
    
    # Administrative Earnings Thresholds (AET)
    AET_INDIVIDUAL: float = 991.00
    AET_COUPLE: float = 1597.00


class UniversalCreditEvaluator:
    def __init__(self, rates: UCRates2026 = UCRates2026()):
        self.rates = rates

    def calculate_tariff_income(self, capital: float) -> float:
        """Calculates assumed tariff income on capital between £6,000 and £16,000."""
        if capital <= self.rates.LOWER_CAPITAL_LIMIT:
            return 0.0
        if capital >= self.rates.UPPER_CAPITAL_LIMIT:
            return float('inf')  # Disqualifies claimant
        
        excess = capital - self.rates.LOWER_CAPITAL_LIMIT
        # Each complete or partial £250 adds £4.35
        import math
        units = math.ceil(excess / 250.0)
        return units * self.rates.TARIFF_INCOME_PER_250

    def evaluate_monthly_award(
        self,
        age: int,
        is_couple: bool,
        partner_age: Optional[int],
        num_children: int,
        capital: float,
        net_earned_income: float,
        has_housing_costs: bool,
        has_lcwra: bool,
        is_carer: bool
    ) -> Dict[str, Any]:
        """Calculates maximum entitlement, deductions, and final monthly UC payout."""
        
        # 1. Capital Disqualification Check
        if capital >= self.rates.UPPER_CAPITAL_LIMIT:
            return {
                "eligible": False,
                "reason": f"Capital (£{capital:.2f}) meets or exceeds upper limit of £16,000.",
                "net_award": 0.0
            }

        # 2. Base Standard Allowance
        if not is_couple:
            standard = self.rates.STANDARD_SINGLE_UNDER_25 if age < 25 else self.rates.STANDARD_SINGLE_25_PLUS
        else:
            p_age = partner_age if partner_age else age
            if age < 25 and p_age < 25:
                standard = self.rates.STANDARD_COUPLE_UNDER_25
            else:
                standard = self.rates.STANDARD_COUPLE_25_PLUS

        # 3. Add Elements
        child_elem = num_children * self.rates.CHILD_ELEMENT
        carer_elem = self.rates.CARER_ELEMENT if is_carer else 0.0
        lcwra_elem = self.rates.LCWRA_ELEMENT_NEW if has_lcwra else 0.0

        max_entitlement = standard + child_elem + carer_elem + lcwra_elem

        # 4. Unearned Income (Tariff Income on Capital)
        tariff_income = self.calculate_tariff_income(capital)

        # 5. Work Allowance & Earnings Taper
        has_work_allowance = (num_children > 0) or has_lcwra
        if has_work_allowance:
            work_allowance = self.rates.WORK_ALLOWANCE_LOWER if has_housing_costs else self.rates.WORK_ALLOWANCE_HIGHER
        else:
            work_allowance = 0.0

        assessable_earnings = max(0.0, net_earned_income - work_allowance)
        earnings_deduction = assessable_earnings * self.rates.TAPER_RATE

        # 6. Final Calculation
        total_deductions = earnings_deduction + tariff_income
        final_award = max(0.0, max_entitlement - total_deductions)

        # 7. Conditionality Regime Evaluation
        aet = self.rates.AET_COUPLE if is_couple else self.rates.AET_INDIVIDUAL
        if net_earned_income >= aet:
            conditionality = "Light Touch Regime (Earnings above AET)"
        else:
            conditionality = "Intensive Work Search Group (Subject to Work Search Mandates and Sanctions)"

        return {
            "eligible": True,
            "max_entitlement": max_entitlement,
            "tariff_income": tariff_income,
            "work_allowance_applied": work_allowance,
            "earnings_deduction": earnings_deduction,
            "net_award": final_award,
            "conditionality_group": conditionality
        }
