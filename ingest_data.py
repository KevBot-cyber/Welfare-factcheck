import sqlite3
import csv
import os

def parse_outward_postcode(full_postcode):
    """Extracts the outward code (e.g., 'PO13' from 'PO13 0AA')."""
    if not full_postcode:
        return ""
    clean = full_postcode.strip().upper()
    parts = clean.split()
    return parts[0] if parts else ""

def ingest_companies_csv(csv_filepath):
    db_name = "uk_corporate_landscape.db"
    
    # If a blank DB was created, clear it out to start fresh
    if os.path.exists(db_name):
        os.remove(db_name)

    conn = sqlite3.connect(db_name)
    cursor = conn.cursor()
    cursor.execute("PRAGMA journal_mode=WAL;")

    cursor.execute("""
        CREATE TABLE companies (
            company_number TEXT PRIMARY KEY,
            company_name TEXT,
            company_status TEXT,
            address_line_1 TEXT,
            postcode TEXT,
            outward_code TEXT,
            constituency_code TEXT,
            incorporation_date TEXT,
            company_type TEXT
        )
    """)
    cursor.execute("CREATE INDEX idx_outward ON companies(outward_code);")
    conn.commit()

    print(f"Opening bulk data file: {csv_filepath}...")
    
    batch_size = 5000
    batch_data = []
    total_inserted = 0

    postcode_to_constituency = {
        "PO12": "Gosport",
        "PO13": "Gosport"
    }

    with open(csv_filepath, mode="r", encoding="utf-8", errors="ignore") as f:
        reader = csv.DictReader(f)
        
        for row in reader:
            # Clean dictionary keys to remove potential BOM or whitespace padding
            cleaned_row = {k.strip(): v for k, v in row.items() if k is not None}
            
            c_num = cleaned_row.get("CompanyNumber", "").zfill(8)
            c_name = cleaned_row.get("CompanyName", "")
            c_status = cleaned_row.get("CompanyStatus", "Active")
            
            # Official Companies House bulk column names use dots
            postcode = cleaned_row.get("RegAddress.PostCode", "")
            address_1 = cleaned_row.get("RegAddress.AddressLine1", "")
            c_type = cleaned_row.get("CompanyCategory", "")
            inc_date = cleaned_row.get("IncorporationDate", "")

            outward = parse_outward_postcode(postcode)
            constituency = postcode_to_constituency.get(outward, "Unmapped Constituency")

            batch_data.append((
                c_num, c_name, c_status, address_1, postcode, outward, constituency, inc_date, c_type
            ))

            if len(batch_data) >= batch_size:
                cursor.executemany("""
                    INSERT OR REPLACE INTO companies 
                    (company_number, company_name, company_status, address_line_1, postcode, outward_code, constituency_code, incorporation_date, company_type)
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
                """, batch_data)
                conn.commit()
                total_inserted += len(batch_data)
                print(f"Ingested {total_inserted:,} records...")
                batch_data = []

        if batch_data:
            cursor.executemany("""
                INSERT OR REPLACE INTO companies 
                (company_number, company_name, company_status, address_line_1, postcode, outward_code, constituency_code, incorporation_date, company_type)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
            """, batch_data)
            conn.commit()
            total_inserted += len(batch_data)

    conn.close()
    print(f"\nIngestion complete! Total records processed: {total_inserted:,}")

if __name__ == "__main__":
    csv_path = "BasicCompanyDataAsOneFile-2026-10-01.csv"
    if os.path.exists(csv_path):
        ingest_companies_csv(csv_path)
    else:
        print(f"⚠️ File not found: {csv_path}")
