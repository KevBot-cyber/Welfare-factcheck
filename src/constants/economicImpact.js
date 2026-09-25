// src/constants/economicImpact.js

export const MACROECONOMIC_METRICS = {
  fiscalMultiplier: {
    stat: "1.4x – 1.7x",
    label: "Local Fiscal Multiplier",
    badge: "Fiscal Multiplier",
    subtitle: "High Propensity to Consume & Economic Yield",
    summary: "Every £1 disbursed in PIP generates £1.40 to £1.70 in local economic activity. Beneficiaries spend directly in local high-street economies on vital food, energy, transport, and adaptive equipment—generating immediate local trade and VAT return.",
    citations: [
      {
        source: "Institute for Fiscal Studies (IFS)",
        title: "The Distributional and Local Economic Impacts of Benefit Spending",
        link: "https://ifs.org.uk/research",
        quote: "Targeted cash transfers to low-wealth households deliver high local demand multipliers, as funds are spent locally rather than saved."
      },
      {
        source: "Office for Budget Responsibility (OBR)",
        title: "Fiscal Studies & Demand Multipliers",
        link: "https://obr.uk/efo/economic-and-fiscal-outlook-march-2024/",
        quote: "Welfare spending targeting low-income groups yields higher fiscal multiplier effects compared to un-targeted tax adjustments."
      },
      {
        source: "Motability Operations / Oxford Economics",
        title: "Economic and Social Impact Evaluation",
        link: "https://news.mo.co.uk/news/scheme-impact",
        quote: "For every £1 of disabled people's allowances invested, £1.50 of direct economic benefit is generated back into the UK economy."
      }
    ]
  },
  gdpExpenditure: {
    stat: "10% – 11%",
    label: "GDP Expenditure",
    badge: "Macro Context",
    subtitle: "Historical Stability & Comparative Benchmark",
    summary: "UK social protection spending has remained exceptionally stable over decades relative to GDP (10%–11%), remaining below the peak levels seen following the 2008 global financial crisis. It also ranks below European peers like France (18.8%) or Germany (15.4%), well below the OECD average.",
    citations: [
      {
        source: "OECD Social Expenditure Database (SOCX)",
        title: "Social Expenditure Indicators",
        link: "https://www.oecd.org/social/expenditure.htm",
        quote: "UK public social expenditure relative to GDP ranks below the OECD average (13.2%) and well below Northwestern European economies."
      },
      {
        source: "HM Treasury / IFS TaxLab",
        title: "UK Welfare and Social Security Expenditure Trends",
        link: "https://ifs.org.uk/taxlab/taxlab-data-feed/uk-welfare-spending",
        quote: "Welfare spending as a proportion of UK national income remains below post-2008 peaks."
      },
      {
        source: "Resolution Foundation",
        title: "Welfare Spending and Economic Trends Analysis",
        link: "https://www.resolutionfoundation.org/press-releases/welfare-spending-is-set-to-rise-over-the-next-parliament-but-so-too-are-risks-around-child-poverty-and-homelessness/",
        quote: "Overall working-age social protection as a share of GDP has remained stable around 10%–11% over recent decades, below post-2008 financial crisis peaks."
      }
    ]
  },
  nhsOffset: {
    stat: "Preventative",
    label: "Preventative NHS & Social Care Offset",
    badge: "Systemic Savings",
    subtitle: "Healthcare & Care Expenditure Protection",
    summary: "Targeted disability financial support acts as vital preventative care, preventing catastrophic health deterioration, protecting the NHS from being overwhelmed by reducing emergency hospital admissions, and significantly lowering local authority adult social care costs.",
    citations: [
      {
        source: "Department of Health & Social Care (DHSC)",
        title: "Prevention in Health and Care: Economic Impact Evaluation",
        link: "https://www.gov.uk/government/organisations/department-of-health-and-social-care",
        quote: "Early preventative financial support for independent living significantly reduces emergency secondary care utilization."
      },
      {
        source: "Local Government Association (LGA)",
        title: "High Impact Change Model: Reducing Preventable Admissions",
        link: "https://www.local.gov.uk/our-support/partners-care-and-health/better-care-fund-support-programme-2025-26/high-impact-change",
        quote: "Preventative community-based support buffers health and social care systems, preventing acute hospital admissions and escalation to formal residential care."
      },
      {
        source: "The Productivity Institute",
        title: "Augmenting Social Care to Prevent Hospital Admissions",
        link: "https://www.productivity.ac.uk/wp-content/uploads/2026/04/CS5-Social-care-case-study-170426.pdf",
        quote: "Preventative community interventions deliver up to a 38% reduction in A&E ambulance conveyances and save hundreds of thousands per thousand recipients."
      }
    ]
  },
  circularEconomyAndJobs: {
    stat: "34,000 Jobs",
    label: "Circular Economy & Employment",
    badge: "Industrial Support",
    subtitle: "Automotive & Used Car Market Stability",
    summary: "PIP powers the Motability Scheme, contributing £4.3 billion to UK GDP and supporting 34,000 jobs across manufacturing, dealerships, and maintenance. By releasing well-maintained 3-year-old vehicles back into the market, it underpins the UK's secondhand car market, keeping quality used vehicles accessible and affordable for British families.",
    citations: [
      {
        source: "Oxford Economics / Motability Operations",
        title: "Economic Impact Report: Supporting Jobs and Growth",
        link: "https://news.mo.co.uk/news/scheme-impact",
        quote: "The Motability Scheme contributes £4.3bn to UK GDP and underpins 34,000 jobs nationwide across direct, supply chain, and retail automotive operations."
      },
      {
        source: "Motability Operations Factsheet",
        title: "Impact on Used Vehicle Market and Automotive Industry",
        link: "https://news.mo.co.uk/news/adam-smith-institute-proposals-would-push-up-costs",
        quote: "The scheme provides a predictable supply of well-maintained three-year-old vehicles, stabilizing secondhand car availability and preventing price inflation for UK motorists."
      }
    ]
  },
  laborMarketParticipation: {
    stat: "+14 Hours/Wk",
    label: "Labor Force Participation",
    badge: "Economic Enablement",
    subtitle: "Employment & Productivity Support",
    summary: "Disability support directly unlocks workforce participation by mitigating additional disability costs. PIP and Motability enable disabled workers to increase employment participation by an average of 14 hours per week, contributing over £500m annually in direct employment economic output.",
    citations: [
      {
        source: "Oxford Economics / DWP Research",
        title: "Disability Benefits and Labor Market Outcomes",
        link: "https://news.mo.co.uk/news/scheme-impact",
        quote: "Access to adapted mobility and disability transfers allows working-age recipients to increase working hours by an average of 14 hours per week."
      }
    ]
  }
};

export const MACROECONOMIC_SUMMARIES = [
  {
    id: "consumption-injection",
    title: "Direct Consumption Injection",
    description: "Unlike high-earner tax cuts that are frequently saved or invested overseas, PIP payments have an immediate 100% velocity of circulation within local British businesses and essential services.",
    citations: [
      {
        source: "Office for Budget Responsibility (OBR)",
        title: "Fiscal Multipliers & Expenditure Velocity Assessment",
        link: "https://obr.uk/efo/economic-and-fiscal-outlook-march-2024/",
        quote: "Low-income benefit transfers exhibit immediate local high-street circulation velocity."
      }
    ]
  },
  {
    id: "lowest-fraud",
    title: "Lowest Fraud Overhead Across Government",
    description: "With an official DWP fraud rate of under 0.2%, PIP delivers maximum fiscal efficiency directly to verified eligible recipients without administrative leakages.",
    citations: [
      {
        source: "Department for Work and Pensions (DWP)",
        title: "Fraud and Error in the Benefit System: Financial Year Estimates",
        link: "https://www.gov.uk/government/collections/fraud-and-error-in-the-benefit-system",
        quote: "Overpayment due to fraud in Personal Independence Payment is estimated at under 0.2% of total expenditure."
      }
    ]
  }
];
