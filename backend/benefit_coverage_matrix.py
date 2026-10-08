"""
benefit_coverage_matrix.py
Comprehensive registry of all UK Social Security Types (Reserved, Devolved, Local).
Includes anti-stigma truth flags for the evaluationEngine.
"""

from dataclasses import dataclass
from typing import Dict, List, Any

@dataclass
class BenefitType:
    name: str
    code: str
    category: str  # Means-Tested, Contributory, Non-Means-Tested Disability, Universal
    jurisdiction: str  # UK-Wide, GB, Scotland Only, NI
    taxable: bool
    work_tested: bool
    key_anti_myth_fact: str

BENEFIT_REGISTRY: Dict[str, BenefitType] = {
    # --- WORKING-AGE & LOW INCOME ---
    "UC": BenefitType(
        name="Universal Credit", code="UC", category="Means-Tested", jurisdiction="GB",
        taxable=False, work_tested=True,
        key_anti_myth_fact="UC has a 55% earnings taper rate; working claimants face combined effective marginal tax rates up to 69% with NI/Tax."
    ),
    "JSA_CONT": BenefitType(
        name="New Style Jobseeker's Allowance", code="JSA_C", category="Contributory", jurisdiction="GB",
        taxable=True, work_tested=True,
        key_anti_myth_fact="Requires 2 years of National Insurance contributions; pays into the safety net before receiving support."
    ),
    "ESA_CONT": BenefitType(
        name="New Style Employment and Support Allowance", code="ESA_C", category="Contributory", jurisdiction="GB",
        taxable=True, work_tested=False,
        key_anti_myth_fact="Contributory benefit based on paid NI contributions, not an unearned giveaway."
    ),
    "LEGACY_IS": BenefitType(
        name="Income Support (Legacy)", code="IS", category="Means-Tested", jurisdiction="GB",
        taxable=False, work_tested=False, key_anti_myth_fact="Being phased out; closed to new claimants."
    ),
    "LEGACY_HB": BenefitType(
        name="Housing Benefit (Legacy/Pension Age)", code="HB", category="Means-Tested", jurisdiction="UK",
        taxable=False, work_tested=False, key_anti_myth_fact="Covers rent, not mortgage capital; subject to Local Housing Allowance (LHA) caps."
    ),

    # --- DISABILITY & CARERS ---
    "PIP": BenefitType(
        name="Personal Independence Payment", code="PIP", category="Non-Means-Tested Disability", jurisdiction="EW/NI",
        taxable=False, work_tested=False,
        key_anti_myth_fact="Designed strictly for extra costs of disability; completely compatible with full-time employment."
    ),
    "DLA": BenefitType(
        name="Disability Living Allowance (Children/Legacy)", code="DLA", category="Non-Means-Tested Disability", jurisdiction="UK",
        taxable=False, work_tested=False, key_anti_myth_fact="Replaced by PIP for adults; remains active for child disability."
    ),
    "AA": BenefitType(
        name="Attendance Allowance", code="AA", category="Non-Means-Tested Disability", jurisdiction="UK",
        taxable=False, work_tested=False, key_anti_myth_fact="For state pension age individuals needing care; no mobility component."
    ),
    "CARERS_ALLOWANCE": BenefitType(
        name="Carer's Allowance", code="CA", category="Carer Support", jurisdiction="EW/NI",
        taxable=True, work_tested=True,
        key_anti_myth_fact="Requires 35+ hours/week caring responsibilities; heavily clawed back if earnings exceed £151/week."
    ),

    # --- DEVOLVED SOCIAL SECURITY SCOTLAND (SSS) ---
    "ADP": BenefitType(
        name="Adult Disability Payment (Scotland)", code="ADP", category="Non-Means-Tested Disability", jurisdiction="Scotland",
        taxable=False, work_tested=False, key_anti_myth_fact="Scottish replacement for PIP with light-touch review procedures."
    ),
    "CDP": BenefitType(
        name="Child Disability Payment (Scotland)", code="CDP", category="Non-Means-Tested Disability", jurisdiction="Scotland",
        taxable=False, work_tested=False, key_anti_myth_fact="Replaces Child DLA in Scotland."
    ),
    "SCP": BenefitType(
        name="Scottish Child Payment", code="SCP", category="Means-Tested Top-Up", jurisdiction="Scotland",
        taxable=False, work_tested=False, key_anti_myth_fact="Unique devolved benefit paying £26.70/week per qualifying child under 16."
    ),
    "CARERS_SUPPORT_SCOTLAND": BenefitType(
        name="Carer Support Payment (Scotland)", code="CSP", category="Carer Support", jurisdiction="Scotland",
        taxable=True, work_tested=True, key_anti_myth_fact="Replaces Carer's Allowance in Scotland."
    ),

    # --- PENSIONS & OLDER PEOPLE ---
    "STATE_PENSION": BenefitType(
        name="New State Pension", code="NSP", category="Universal Contributory", jurisdiction="UK",
        taxable=True, work_tested=False, key_anti_myth_fact="Requires 35 qualifying NI years; forms the largest proportion (~48%) of UK welfare spending."
    ),
    "PENSION_CREDIT": BenefitType(
        name="Pension Credit", code="PC", category="Means-Tested Pension", jurisdiction="UK",
        taxable=False, work_tested=False, key_anti_myth_fact="Means-tested safety net topping up low pensioner income; high under-take-up (~35% unclaimed)."
    ),

    # --- LOCALIZED & STATUTORY RIGHTS ---
    "CTR": BenefitType(
        name="Council Tax Reduction / Support", code="CTR", category="Localized Means-Tested", jurisdiction="UK",
        taxable=False, work_tested=False, key_anti_myth_fact="Administered by local councils; rules vary significantly by local authority."
    ),
    "SSP": BenefitType(
        name="Statutory Sick Pay", code="SSP", category="Statutory Employment Right", jurisdiction="UK",
        taxable=True, work_tested=False, key_anti_myth_fact="Paid by employers, not directly from welfare budget; £116.75/week."
    ),
    "SMP": BenefitType(
        name="Statutory Maternity Pay", code="SMP", category="Statutory Employment Right", jurisdiction="UK",
        taxable=True, work_tested=False, key_anti_myth_fact="Paid by employers and reclaimed partially from HMRC."
    ),
}

def get_benefit_coverage_report() -> Dict[str, Any]:
    total_types = len(BENEFIT_REGISTRY)
    categories = list(set([b.category for b in BENEFIT_REGISTRY.values()]))
    return {
        "total_social_security_types_covered": total_types,
        "categories_covered": categories,
        "devolved_scotland_support": True,
        "local_authority_support": True
    }
