import sqlite3
import time
import requests
from requests.auth import HTTPBasicAuth

BASE_URL = "https://api.company-information.service.gov.uk"

def get_company_accounts_details(company_number, api_key):
    """Fetches full filing history and extracts accounts metadata."""
    url = f"{BASE_URL}/company/{company_number}/filing-history"
    headers = {"Accept": "application/json"}
    auth = HTTPBasicAuth(api_key.strip(), "")

    response = requests.get(url, params={"category": "accounts", "items_per_page": 5}, headers=headers, auth=auth)
    if response.status_code == 200:
        return response.json().get("items", [])
    elif response.status_code == 429:
        print("⚠️ Rate limit hit! Pausing for 60 seconds...")
        time.sleep(60)
        return get_company_accounts_details(company_number, api_key)
    return []

def estimate_expected_tax(profit_before_tax):
    """Applies UK statutory corporation tax rules and marginal relief."""
    if profit_before_tax <= 0:
        return 0.0
    elif profit_before_tax <= 50000:
        return profit_before_tax * 0.19
    elif profit_before_tax > 250000:
        return profit_before_tax * 0.25
    else:
        # Marginal relief formula: 25% tax minus standard marginal fraction relief
        base_tax = profit_before_tax * 0.25
        marginal_relief = ((250000 - profit_before_tax) * 3) / 200
        return base_tax - marginal_relief

def run_etr_model():
    db_name = "uk_corporate_landscape.db"
    conn = sqlite3.connect(db_name)
    cursor = conn.cursor()

    print("Loading candidate companies filing full accounts or small exemptions...")
    
    cursor.execute("""
        SELECT company_number, company_name, address_line_1, postcode, company_type
        FROM companies
        WHERE outward_code IN ('PO12', 'PO13')
        ORDER BY company_name ASC;
    """)
    
    companies = cursor.fetchall()
    API_KEY = "23841c6c-eadb-4f3b-aac2-0c1585cae78f"

    print(f"Analyzing {len(companies):,} local entities for tax-risk scoring...\n")
    
    scored_leaderboard = []

    for idx, row in enumerate(companies[:15], 1):
        c_num, c_name, address, postcode, c_type = row
        print(f"[{idx}] Inspecting: {c_name} ({c_num})")
        
        filings = get_company_accounts_details(c_num, API_KEY)
        
        # Check if the company files full or small statutory accounts
        is_full_filer = any("full" in f.get("description", "").lower() for f in filings)
        
        if is_full_filer:
            # Note: Detailed P&L line items require pulling individual iXBRL/XML accounts documents 
            # from the filing history transaction history. Here we flag the target for deep inspection.
            scored_leaderboard.append({
                "number": c_num,
                "name": c_name,
                "tier": "Full Accounts Filer (High Priority Model Target)",
                "address": f"{address}, {postcode}"
            })
        else:
            scored_leaderboard.append({
                "number": c_num,
                "name": c_name,
                "tier": "Exempt / Micro-Entity (Low Visibility)",
                "address": f"{address}, {postcode}"
            })

        time.sleep(0.4)

    conn.close()

    print("\n" + "="*60)
    print("CONSTITUENCY TAX-RISK LEADERBOARD PREVIEW")
    print("="*60)
    for entry in scored_leaderboard:
        print(f"• [{entry['number']}] {entry['name']}")
        print(f"  Classification : {entry['tier']}")
        print(f"  Location       : {entry['address']}")
        print("-" * 60)

if __name__ == "__main__":
    run_etr_model()
