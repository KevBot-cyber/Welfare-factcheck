import sqlite3

def query_gosport_companies():
    db_name = "uk_corporate_landscape.db"
    conn = sqlite3.connect(db_name)
    cursor = conn.cursor()

    print("Querying local companies for Gosport (PO12 and PO13 sectors) from database...\n")

    # Query matching outward codes directly from the stored columns
    cursor.execute("""
        SELECT company_number, company_name, address_line_1, postcode, incorporation_date, company_type
        FROM companies
        WHERE outward_code IN ('PO12', 'PO13')
        ORDER BY company_name ASC;
    """)

    results = cursor.fetchall()
    print(f"Found {len(results):,} companies registered in PO12 / PO13 sectors:\n")

    for idx, row in enumerate(results[:15], 1):  # Preview first 15 matches
        c_num, c_name, address, postcode, inc_date, c_type = row
        print(f"{idx}. [{c_num}] {c_name}")
        print(f"   Type: {c_type} | Incorporated: {inc_date}")
        print(f"   Address: {address}, {postcode}")
        print("-" * 50)

    # Summary breakdown by outward sector
    cursor.execute("""
        SELECT outward_code, COUNT(*) 
        FROM companies 
        WHERE outward_code IN ('PO12', 'PO13')
        GROUP BY outward_code;
    """)
    summary = cursor.fetchall()
    
    print("\nLocal Sector Population Breakdown:")
    for row in summary:
        print(f"Sector {row[0]} | Total Companies: {row[1]:,}")

    conn.close()

if __name__ == "__main__":
    query_gosport_companies()
