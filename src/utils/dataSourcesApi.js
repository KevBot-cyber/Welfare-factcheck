/**
 * dataSourcesApi.js
 * API & Data Ingestion Client Suite for ONS, DWP Stat-Xplore, OECD, OBR, and Policy Institutes.
 */

/**
 * Client for DWP Stat-Xplore REST API.
 * API Docs: https://stat-xplore.dwp.gov.uk/
 * Requires API Key from Stat-Xplore Account Settings.
 */
export class DWPStatXploreClient {
  static BASE_URL = "https://stat-xplore.dwp.gov.uk/webapi/rest";

  constructor(apiKey) {
    this.apiKey = apiKey;
    this.headers = {
      "APIKey": apiKey,
      "Content-Type": "application/json"
    };
  }

  /**
   * Fetch database fields/schema for Universal Credit, PIP, or ESA.
   */
  async getSchema(folderId = "str:database:UC_Monthly") {
    try {
      const response = await fetch(`${DWPStatXploreClient.BASE_URL}/schema/${folderId}`, {
        headers: this.headers
      });

      if (!response.ok) {
        const errorText = await response.text();
        return { error: errorText };
      }

      return await response.json();
    } catch (error) {
      return { error: error.message };
    }
  }

  /**
   * Submit a custom table query for live caseload data.
   */
  async queryCaseload(database, measures, dimensions) {
    try {
      const payload = { database, measures, dimensions };
      const response = await fetch(`${DWPStatXploreClient.BASE_URL}/table`, {
        method: "POST",
        headers: this.headers,
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        const errorText = await response.text();
        return { error: errorText };
      }

      return await response.json();
    } catch (error) {
      return { error: error.message };
    }
  }
}

/**
 * Client for ONS Beta API.
 * No API Key required. Accesses labor market, CPI inflation, and earnings stats.
 */
export class ONSDataClient {
  static BASE_URL = "https://api.beta.ons.gov.uk/v1";

  /**
   * Fetch latest CPI inflation time-series observations.
   */
  async getLatestCPI() {
    try {
      const url = `${ONSDataClient.BASE_URL}/datasets/cpih01/editions/time-series/versions/1/observations?time=*`;
      const response = await fetch(url);

      if (response.ok) {
        const data = await response.json();
        const observations = data.observations || [];
        const latestObs = observations[observations.length - 1];

        return {
          indicator: "CPIH",
          period: latestObs?.dimensions?.Time?.label,
          value: latestObs?.observation
        };
      }

      return { error: "Failed to query ONS API" };
    } catch (error) {
      return { error: error.message };
    }
  }

  /**
   * Fetch latest UK employment/unemployment stats.
   */
  async getLabourMarketSummary() {
    try {
      const url = `${ONSDataClient.BASE_URL}/datasets/employment-status-by-economic-activity/editions/time-series/versions/1`;
      const response = await fetch(url);

      if (!response.ok) {
        return { error: "ONS query failed" };
      }

      return await response.json();
    } catch (error) {
      return { error: error.message };
    }
  }
}

/**
 * Client for OECD SDMX-JSON REST API.
 * Used for international comparisons on social expenditure (% of GDP) and net income replacement.
 */
export class OECDDataClient {
  static BASE_URL = "https://sdmx.oecd.org/public/rest/data";

  /**
   * Fetches public social expenditure as % of GDP for international benchmarking.
   */
  async getSocialExpenditureGDP(countryCode = "GBR") {
    try {
      const url = `${OECDDataClient.BASE_URL}/OECD.ELS.SAD,DSD_SOCX@DF_SOCX,1.0/${countryCode}.A.EXPPUB.AGG...PCT_GDP`;
      const response = await fetch(url, {
        headers: {
          "Accept": "application/vnd.sdmx.data+json;version=2.0"
        }
      });

      if (response.ok) {
        const json = await response.json();
        return {
          country: countryCode,
          status: "Success",
          raw_sdmx: json
        };
      }

      return { error: `OECD API call returned status ${response.status}` };
    } catch (error) {
      return { error: error.message };
    }
  }
}

/**
 * Structured store for non-API research bodies (OBR Fiscal Outlook, Resolution Foundation, IFS).
 * Updated quarterly/seasonally via structured JSON payloads.
 */
export class ExternalResearchIngestor {
  constructor() {
    // Seeded with official OBR Economic & Fiscal Outlook baselines
    this.obrForecasts = {
      welfare_spending_total_billion: 315.4,
      state_pension_share_pct: 47.8,
      universal_credit_spending_billion: 85.2,
      pip_spending_billion: 28.6,
      source: "OBR Economic and Fiscal Outlook (EFO)"
    };

    this.resolutionFoundationInsights = {
      effective_marginal_tax_rate_uc_and_ni: 69.0,
      unclaimed_means_tested_benefits_billion: 19.0,
      poverty_reduction_impact_of_uc: "UC reduces deep poverty compared to legacy system due to higher take-up."
    };
  }

  getFiscalContext() {
    return {
      obr_data: this.obrForecasts,
      resolution_foundation_data: this.resolutionFoundationInsights
    };
  }
}
