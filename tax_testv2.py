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
    print(f"\nFound {len(local_list)} unique local companies. Inspecting recent filings...\n")

    # Step 2: Loop through discovered local companies and check filings
    for idx, company in enumerate(local_list[:5], 1): # Limited to first 5 for test run
        c_num = company.get("company_number")
        c_name = company.get("title")
        address = company.get("address_snippet", "Address unavailable")
        
        print(f"{idx}. [{c_num}] {c_name}")
        print(f"   Address: {address}")
        
        filings = get_company_filing_history(c_num, API_KEY)
        if filings:
            print("   Recent Account Filings:")
            for filing in filings:
                desc = filing.get("description", "No description")
                f_date = filing.get("date", "Unknown date")
                print(f"     - [{f_date}] {desc}")
        else:
            print("   No recent account filings found.")
        print("-" * 60)
