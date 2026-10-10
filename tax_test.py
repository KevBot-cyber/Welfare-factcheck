import os
import requests
from requests.auth import HTTPBasicAuth

BASE_URL = "https://api.company-information.service.gov.uk"

def search_companies(query_term, api_key):
    """Searches Companies House directory with higher page limits."""
    url = f"{BASE_URL}/search/companies"
    headers = {"Accept": "application/json"}
    auth = HTTPBasicAuth(api_key.strip(), "")

    # Request up to 50 items per search query
    response = requests.get(url, params={"q": query_term, "items_per_page": 50}, headers=headers, auth=auth)

    if response.status_code == 200:
        return response.json().get("items", [])
    else:
        print(f"API Error {response.status_code}: {response.text}")
        return []

if __name__ == "__main__":
    API_KEY = "23841c6c-eadb-4f3b-aac2-0c1585cae78f"

    # Search for broader local terms covering Gosport
    search_terms = ["PO12", "PO13", "Gosport"]
    unique_companies = {}

    for term in search_terms:
        print(f"Searching directory for: {term}...")
        results = search_companies(term, API_KEY)
        
        for company in results:
            address = company.get("address_snippet", "").lower()
            # Keep if it's explicitly local to Gosport postcodes or town text
            if "gosport" in address or "po12" in address or "po13" in address:
                c_num = company.get("company_number")
                unique_companies[c_num] = company

    local_list = list(unique_companies.values())
    print(f"\nTotal unique local companies indexed: {len(local_list)}\n")

    # Preview the first 10 unique matches
    for idx, company in enumerate(local_list[:10], 1):
        c_num = company.get("company_number")
        c_name = company.get("title")
        address = company.get("address_snippet", "Address unavailable")
        status = company.get("company_status")

        print(f"{idx}. [{c_num}] {c_name}")
        print(f"   Status: {status} | Address: {address}")
        print("-" * 50)
