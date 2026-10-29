from multiprocessing import freeze_support
from gdeltnews.download import download
from gdeltnews.reconstruct import reconstruct
from gdeltnews.filtermerge import filtermerge

def main():
    # 1. Download NGrams for the day you want (example: 2025-10-26)
    download(
        "2025-10-26T00:00:00",
        "2025-10-26T23:59:00",
        outdir="gdeltdata",
        decompress=False,
        workers=8
    )

    # 2. Reconstruct - English, UK sources only to keep it small
    reconstruct(
        input_dir="gdeltdata",
        output_dir="gdeltpreprocessed",
        language="en",
        url_filters=["【entity-bbc¦canonical_name=BBC】.co.uk", "theguardian.com", "metro.co.uk", "dailymail.co.uk", "birminghammail.co.uk"],
        processes=10
    )

    # 3. Filter to your incidents and make ONE csv
    filtermerge(
        input_dir="gdeltpreprocessed",
        output_file="welfare-2025-10-26.csv",
        query='("cut 50 billion welfare" OR "signed off work welfare" OR "handed PIP benefits" OR "striver vs scrounger")'
    )
    print("Done -> welfare-2025-10-26.csv")

if __name__ == "__main__":
    freeze_support() # required on Windows
    main()