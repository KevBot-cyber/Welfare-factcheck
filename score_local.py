import sqlite3
import time
import requests
from requests.auth import HTTPBasicAuth

BASE_URL = "https://api.company-information.service.gov.uk"

def get_company_profile(company_number, api_key):
    """Fetches company profile and accounts metadata from the live API."""
    url = f"{BASE_URL}/company/{company_number}"
    headers = {"Accept": "application/json"}
    auth = HTTPBasicAuth(api_key.strip(), "")

    response = requests.get(url, headers=headers, auth=auth)
    if response.status_code == 200:
        return response.json()
    elif response.status_code == 429:
        print("⚠️ Rate limit hit! Pausing for 60 seconds...")
        time.sleep(60)
        return get_company_profile(company_number, api_key)
    return None

def run_local_scoring():
    db_name = "uk_corporate_landscape.db"
    conn = sqlite3.connect(db_name)
    cursor = conn.cursor()

    print("Fetching local Gosport companies from SQLite database...")
    
    # Query companies in PO12 and PO13
    cursor.execute("""
        SELECT company_number, company_name, address_line_1, postcode, incorporation_date, company_type
        FROM companies
        WHERE outward_code IN ('PO12', 'PO13')
        ORDER BY company_name ASC;
    """)
    
    local_companies = cursor.fetchall()
    print(f"Loaded {len(local_companies):,} local companies from database. Beginning API profile check...\n")

    # Replace with your actual REST API key
    API_KEY = "23841c6c-eadb-4f3b-aac2-0c1585cae78f"

    scored_results = []
    
    # Let's inspect a batch of 20 to test the scoring pipeline
    for idx, row in enumerate(local_companies[:20], 1):
        c_num, c_name, address, postcode, inc_date, c_type = row
        
        print(f"[{idx}/20] Checking: {c_name} ({c_num})")
        
        profile = get_company_profile(c_num, API_KEY)
        if profile:
            accounts_info = profile.get("accounts", {})
            acc_type = accounts_info.get("last_accounts", {}).get("type", "unknown")
            next_due = accounts_info.get("next_due", "unknown")
            
            # Simple risk scoring classification heuristic
            risk_tag = "Low Risk / Standard Micro-Entity"
            if acc_type in ["full", "medium", "large"]:
                risk_tag = "Full Accounts Target (Potential ETR Model)"
            elif acc_type == "total-exemption-full":
                risk_tag = "Small Company Exemption"

            scored_results.append({
                "number": c_num,
                "name": c_name,
                "accounts_type": acc_type,
                "risk_tier": risk_tag,
                "address": f"{address}, {postcode}"
            })
        else:
            print(f"   -> Profile unavailable or dissolved.")

        # Brief delay to maintain polite scraping speeds and prevent throttling
        time.sleep(0.5)

    conn.close()

    print("\n" + "="*50)
    print("LOCAL TAX-RISK SCORECARD PREVIEW")
    print("="*50)
    
    for item in scored_results:
        print(f"• [{item['number']}] {item['name']}")
        print(f"  Accounts Tier : {item['accounts_type']}")
        print(f"  Model Status  : {item['risk_tier']}")
        print(f"  Address       : {item['address']}")
        print("-" * 50)

if __name__ == "__main__":
    run_local_scoring()
