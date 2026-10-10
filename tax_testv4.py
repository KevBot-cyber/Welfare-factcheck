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

def get_company_profile(company_number, api_key):
    """Fetches full profile details including company type and accounting metadata."""
    url = f"{BASE_URL}/company/{company_number}"
    headers = {"Accept": "application/json"}
    auth = HTTPBasicAuth(api_key.strip(), "")

    response = requests.get(url, headers=headers, auth=auth)
    if response.status_code == 200:
        return response.json()
    return None

if __name__ == "__main__":
    API_KEY = "23841c6c-eadb-4f3b-aac2-0c1585cae78f"

    # Step 1: Discover local companies in Gosport sectors
    search_terms = ["PO12", "PO13", "Gosport"]
    unique_companies = {}

    print("Scanning local postcode sectors and filtering out micro-entities...")
    for term in search_terms:
        results = search_companies(term, API_KEY)
        for company in results:
            address = company.get("address_snippet", "").lower()
            if "gosport" in address or "po12" in address or "po13" in address:
                c_num = company.get("company_number")
                unique_companies[c_num] = company

    local_list = list(unique_companies.values())
    print(f"Discovered {len(local_list)} raw matches. Inspecting profiles to filter for larger entities...\nJ")

    filtered_targets = []

    # Step 2: Inspect company profile type and filter out micro/dormant structures
    for company in local_list:
        c_num = company.get("company_number")
        c_name = company.get("title")
        status = company.get("company_status")

        # Only process active companies
        if status != "active":
            continue

        profile = get_company_profile(c_num, API_KEY)
        if profile:
            # Check company type (e.g., 'ltd', 'plc')
            comp_type = profile.get("type", "")
            
            # Check accounts filing type designation if available
            accounts_info = profile.get("accounts", {})
            acc_type = accounts_info.get("last_accounts", {}).get("type", "")

            # Filter criteria: Focus on private limited companies that don't report as micro-entities
            if comp_type in ["ltd", "private-limited-shares"] and acc_type not in ["micro-entity", "dormant"]:
                filtered_targets.append({
                    "number": c_num,
                    "name": c_name,
                    "type": comp_type,
                    "accounts_type": acc_type,
                    "address": company.get("address_snippet")
                })

    print(f"\nSuccessfully isolated {len(filtered_targets)} qualified corporate entities for tax-risk modeling:\n")

    for idx, target in enumerate(filtered_targets[:10], 1):
        print(f"{idx}. [{target['number']}] {target['name']}")
        print(f"   Type: {target['type']} | Accounts Tier: {target['accounts_type']}")
        print(f"   Address: {target['address']}")
        print("-" * 50)
