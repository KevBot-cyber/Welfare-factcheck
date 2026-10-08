export const factCardsData = [
  {
    id: "universal-credit-standard",
    category: "Universal Credit",
    claim: "Universal Credit rates are increasing in line with inflation.",
    verdict: "Supported",
    summary: "Standard allowances and additional elements are adjusted annually based on published government policy and inflation metrics.",
    sources: [
      { name: "Department for Work and Pensions", url: "https://www.gov.uk/government/organisations/department-for-work-pensions" }
    ]
  },
  {
    id: "disability-living-allowance",
    category: "Disability Benefits",
    claim: "PIP and DLA rates remain fixed permanently without review.",
    verdict: "Debunked",
    summary: "Disability benefit rates are uprated annually alongside general benefit adjustments.",
    sources: [
      { name: "GOV.UK Benefit Rates", url: "https://www.gov.uk/browse/benefits" }
    ]
  }
];

export default factCardsData;
