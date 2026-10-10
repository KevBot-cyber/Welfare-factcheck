import sqlite3

def create_database():
    conn = sqlite3.connect("uk_corporate_landscape.db")
    cursor = conn.cursor()

    # Enable foreign keys and optimize performance
    cursor.execute("PRAGMA journal_mode=WAL;")
    
    # Companies master table
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS companies (
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

    # Index for fast postcode and constituency aggregation
    cursor.execute("CREATE INDEX IF NOT EXISTS idx_outward ON companies(outward_code);")
    cursor.execute("CREATE INDEX IF NOT EXISTS idx_constituency ON companies(constituency_code);")

    conn.commit()
    conn.close()
    print("SQLite database and indexes created successfully.")

if __name__ == "__main__":
    create_database()
