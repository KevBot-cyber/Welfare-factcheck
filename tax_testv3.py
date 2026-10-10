import os
import requests
from requests.auth import HTTPBasicAuth

BASE_URL = "https://api.company-information.service.gov.uk"

def search_companies(query_term, api_key):
    """Searches Companies House directory with higher page limits."""
    url = f"{BASE_URL}/search/companies"
    headers = {"Accept": "application/json"}
    auth = HTTPBasicAuth(api_key.strip(), "")

    response = requests.get(url, params={"q": query_term, "items_per_page": 50}, headers=headers, auth=auth)
    if response.status_code == 200:
        return response.json().get("items", [])
    return []

def get_company_filing_history(company_number, api_key):
    """Fetches recent filing history to identify accounts type."""
    url = f"{BASE_URL}/company/{company_number}/filing-history"
    headers = {"Accept": "application/json"}
    auth = HTTPBasicAuth(api_key.strip(), "")

    response = requests.get(url, params={"category": "accounts", "items_per_page": 3}, headers=headers, auth=auth)
    if response.status_code == 200:
        return response.json().get("items", [])
    return []

def classify_filing_type(filings):
    """Analyzes the latest filings to determine company reporting tier."""
    if not filings:
        return "Unknown / No Filings"
    
    # Check the most recent filing description
    latest_desc = filings[0].get("description", "").lower()
    
    if "micro-entity" in latest_desc:
        return "Micro-Entity (Exempt / Simplified)"
    elif "small" in latest_desc or "total-exemption-full" in latest_desc:
        return "Small Company Exemption"
    elif "full" in latest_desc:
        return "Full Accounts (Potential ETR Target)"
    else:
        return f"Other: {latest_desc[:30]}..."

if __name__ == "__main__":
    API_KEY = "23841c6c-eadb-4f3b-aac2-0c1585cae78f"

    # Step 1: Discover local companies
    search_terms = ["PO12", "PO13", "Gosport"]
    unique_companies = {}

    print("Scanning local postcode sectors and town records...")
    for term in search_terms:
        results = search_companies(term, API_KEY)
        for company in results:
            address = company.get("address_snippet", "").lower()
            if "gosport" in address or "po12" in address or "po13" in address:
                c_num = company.get("company_number")
                unique_companies[c_num] = company

    local_list = list(unique_companies.values())
    print(f"\nFound {len(local_list)} unique local companies. Running classification filter...\n")

    # Counters for our summary
    tiers = {"Micro-Entity (Exempt / Simplified)": 0, "Small Company Exemption": 0, "Full Accounts (Potential ETR Target)": 0, "Other / Unknown": 0}

    # Step 2: Classify each local company
    for idx, company in enumerate(local_list[:15], 1): # Inspecting first 15 for this test
        c_num = company.get("company_number")
        c_name = company.get("title")
        status = company.get("company_status")
        
        filings = get_company_filing_history(c_num, API_KEY)
        classification = classify_filing_type(filings)
        
        print(f"{idx}. [{c_num}] {c_name}")
        print(f"   Status: {status}")
        print(f"   Classification: {classification}")
        print("-" * 50)

    print("\nFiltering pipeline complete. This categorization allows your model to automatically filter out micro-firms and isolate entities that publish detailed financial statements.")
