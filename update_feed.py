# scripts/update_feed.py
import json
import os
import feedparser

# Official UK Government RSS / Hansard Feed URLs
FEEDS = {
    "gov_uk": "https://www.gov.uk/government/organisations/department-for-work-pensions.atom",
    # Add other RSS or API endpoints here
}

def fetch_latest_updates():
    feed_items = []
    
    for source, url in FEEDS.items():
        parsed = feedparser.parse(url)
        for entry in parsed.entries[:5]:  # Top 5 latest entries per feed
            feed_items.append({
                "id": entry.get("id", entry.get("link")),
                "title": entry.get("title"),
                "link": entry.get("link"),
                "published": entry.get("published", entry.get("updated")),
                "source": source
            })

    # Output directory for React asset access
    os.makedirs("public/data", exist_ok=True)
    
    with open("public/data/feed.json", "w") as f:
        json.dump(feed_items, f, indent=2)

if __name__ == "__main__":
    fetch_latest_updates()
