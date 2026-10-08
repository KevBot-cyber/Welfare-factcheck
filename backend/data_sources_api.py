"""
data_sources_api.py
API & Data Ingestion Client Suite for ONS, DWP Stat-Xplore, OECD, OBR, and Policy Institutes.
"""

import requests
import json
from typing import Dict, Any, Optional

class DWPStatXploreClient:
    """
    Client for DWP Stat-Xplore REST API.
    API Docs: https://stat-xplore.dwp.gov.uk/
    Requires API Key from Stat-Xplore Account Settings.
    """
    BASE_URL = "https://stat-xplore.dwp.gov.uk/webapi/rest"

    def __init__(self, api_key: str):
        self.headers = {"APIKey": api_key, "Content-Type": "application/json"}

    def get_schema(self, folder_id: str = "str:database:UC_Monthly") -> Dict[str, Any]:
        """Fetch database fields/schema for Universal Credit, PIP, or ESA."""
        url = f"{self.BASE_URL}/schema/{folder_id}"
        response = requests.get(url, headers=self.headers)
        return response.json() if response.status_code == 200 else {"error": response.text}

    def query_caseload(self, database: str, measures: list, dimensions: list) -> Dict[str, Any]:
        """Submit a custom table query for live caseload data."""
        url = f"{self.BASE_URL}/table"
        payload = {
            "database": database,
            "measures": measures,
            "dimensions": dimensions
        }
        response = requests.post(url, headers=self.headers, data=json.dumps(payload))
        return response.json() if response.status_code == 200 else {"error": response.text}


class ONSDataClient:
    """
    Client for ONS Beta API.
    No API Key required. Accesses labor market, CPI inflation, and earnings stats.
    """
    BASE_URL = "https://api.beta.ons.gov.uk/v1"

    def get_latest_cpi(self) -> Dict[str, Any]:
        """Fetch latest CPI inflation time-series observations."""
        url = f"{self.BASE_URL}/datasets/cpih01/editions/time-series/versions/1/observations?time=*"
        response = requests.get(url)
        if response.status_code == 200:
            data = response.json()
            latest_obs = data.get("observations", [])[-1]
            return {
                "indicator": "CPIH",
                "period": latest_obs.get("dimensions", {}).get("Time", {}).get("label"),
                "value": latest_obs.get("observation")
            }
        return {"error": "Failed to query ONS API"}

    def get_labour_market_summary((self) -> Dict[str, Any]:
        """Fetch latest UK employment/unemployment stats."""
        url = f"{self.BASE_URL}/datasets/employment-status-by-economic-activity/editions/time-series/versions/1"
        response = requests.get(url)
        return response.json() if response.status_code == 200 else {"error": "ONS query failed"}


class OECDDataClient:
    """
    Client for OECD SDMX-JSON REST API.
    Used for international comparisons on social expenditure (% of GDP) and net income replacement.
    """
    BASE_URL = "https://sdmx.oecd.org/public/rest/data"

    def get_social_expenditure_gdp(self, country_code: str = "GBR") -> Dict[str, Any]:
        """Fetches public social expenditure as % of GDP for international benchmarking."""
        url = f"{self.BASE_URL}/OECD.ELS.SAD,DSD_SOCX@DF_SOCX,1.0/{country_code}.A.EXPPUB.AGG...PCT_GDP"
        headers = {"Accept": "application/vnd.sdmx.data+json;version=2.0"}
        response = requests.get(url, headers=headers)
        if response.status_code == 200:
            return {"country": country_code, "status": "Success", "raw_sdmx": response.json()}
        return {"error": f"OECD API call returned status {response.status_code}"}


class ExternalResearchIngestor:
    """
    Structured store for non-API research bodies (OBR Fiscal Outlook, Resolution Foundation, IFS).
    Updated quarterly/seasonally via structured JSON payloads.
    """
    def __init__(self):
        # Seeded with official OBR Economic & Fiscal Outlook baselines
        self.obr_forecasts = {
            "welfare_spending_total_billion": 315.4,
            "state_pension_share_pct": 47.8,
            "universal_credit_spending_billion": 85.2,
            "pip_spending_billion": 28.6,
            "source": "OBR Economic and Fiscal Outlook (EFO)"
        }
        self.resolution_foundation_insights = {
            "effective_marginal_tax_rate_uc_and_ni": 69.0,
            "unclaimed_means_tested_benefits_billion": 19.0,
            "poverty_reduction_impact_of_uc": "UC reduces deep poverty compared to legacy system due to higher take-up."
        }

    def get_fiscal_context(self) -> Dict[str, Any]:
        return {
            "obr_data": self.obr_forecasts,
            "resolution_foundation_data": self.resolution_foundation_insights
        }
