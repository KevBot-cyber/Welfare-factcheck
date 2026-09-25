export const INITIAL_LIVE_FEED = [
  { id: 'f1', time: '10:42 AM', source: 'Hansard Feed (Commons)', sourceUrl: 'https://hansard.parliament.uk/', author: 'Work & Pensions Committee', text: "Minister queried on 72% HMCTS tribunal overturn rate for PIP decisions.", status: "Verified Facts match MoJ", bsFlag: "Low BS" },
  { id: 'f2', time: '10:15 AM', source: 'Daily Express Online', sourceUrl: 'https://www.express.co.uk/', author: 'Welfare Correspondent', text: "Headline: 'Millions set to lose PIP under sweeping new cash-to-voucher plan.'", status: "Flagged Misleading", bsFlag: "High BS (92%)" },
  { id: 'f3', time: '09:30 AM', source: 'BBC News Channel', sourceUrl: 'https://www.bbc.co.uk/news', author: 'Politics Live', text: "Discussion on fit notes and GP workload. Panelists quote RCGP official statistics accurately.", status: "Accurate Data", bsFlag: "Low BS" },
  { id: 'f4', time: '08:50 AM', source: 'GB News Morning', sourceUrl: 'https://www.gbnews.com/', author: 'Guest Commentator', text: "Claims PIP fraud is costing £5 billion annually.", status: "Flagged False", bsFlag: "Extreme BS (98%)" },
  { id: 'f5', time: '08:10 AM', source: 'Hansard Feed (Lords)', sourceUrl: 'https://hansard.parliament.uk/', author: 'Baroness Grey-Thompson', text: "Notes that 84% of PIP claimants use awards for essential heating and medical equipment.", status: "Verified Facts", bsFlag: "Low BS" }
];

export const MYTH_VAULT = [
  {
    id: 'm1',
    category: 'PIP & Disability Costs',
    claim: "PIP is overrun with fraud and easy to claim without proof.",
    truth: "According to DWP official statistics, PIP fraud is just 0.4% (compared to Universal Credit overpayment rates of over 10%). Furthermore, 70%+ of appealed rejections are overturned at HMCTS independent tribunals due to flawed initial DWP assessment criteria.",
    myth: "PIP is overrun with fraud and easy to claim without proof.",
    fact: "According to DWP official statistics, PIP fraud is just 0.4% (compared to Universal Credit overpayment rates of over 10%). Furthermore, 70%+ of appealed rejections are overturned at HMCTS independent tribunals due to flawed initial DWP assessment criteria.",
    title: "PIP is overrun with fraud and easy to claim without proof.",
    description: "According to DWP official statistics, PIP fraud is just 0.4% (compared to Universal Credit overpayment rates of over 10%). Furthermore, 70%+ of appealed rejections are overturned at HMCTS independent tribunals due to flawed initial DWP assessment criteria.",
    dwpData: "DWP Fraud and Error in the Benefit System (2024/25); MoJ Tribunal Statistics",
    sources: [
      { name: "DWP Fraud & Error Statistics", url: "https://www.gov.uk/government/statistics/fraud-and-error-in-the-benefit-system-financial-year-2024-to-2025-estimates" },
      { name: "MoJ Tribunal Statistics", url: "https://www.gov.uk/government/collections/tribunals-statistics" }
    ],
    tags: ["PIP", "Fraud", "Tribunals"],
    severity: "High Misinformation"
  },
  {
    id: 'm2',
    category: 'Motability Scheme',
    claim: "Disabled people get free luxury cars at taxpayers' expense.",
    truth: "Motability is not a free state handout. Claimants surrender 100% of their mobility allowance (Higher Rate PIP/DLA) directly to lease a vehicle. The charity receives zero direct cash funding from government tax revenue; it operates as an independent commercial lease mechanism.",
    myth: "Disabled people get free luxury cars at taxpayers' expense.",
    fact: "Motability is not a free state handout. Claimants surrender 100% of their mobility allowance (Higher Rate PIP/DLA) directly to lease a vehicle. The charity receives zero direct cash funding from government tax revenue; it operates as an independent commercial lease mechanism.",
    title: "Disabled people get free luxury cars at taxpayers' expense.",
    description: "Motability is not a free state handout. Claimants surrender 100% of their mobility allowance (Higher Rate PIP/DLA) directly to lease a vehicle. The charity receives zero direct cash funding from government tax revenue; it operates as an independent commercial lease mechanism.",
    dwpData: "Motability Operations Annual Financial Statement & DWP Mobility Guidance",
    sources: [
      { name: "Motability Scheme Financial Briefing", url: "https://www.motabilityoperations.co.uk/" },
      { name: "DWP PIP Assessment Guide", url: "https://www.gov.uk/pip/eligibility" }
    ],
    tags: ["Motability", "PIP", "Transport"],
    severity: "High Misinformation"
  },
  {
    id: 'm3',
    category: 'Employment & Inactivity',
    claim: "Economic inactivity is driven by 'lifestyle choices' and people preferring benefits to working.",
    truth: "The ONS Labour Force Survey shows that over 80% of working-age economically inactive people are out of the labor force due to long-term sickness, disability, full-time study, or heavy caring duties. Resolution Foundation analysis notes that long-term sickness has been exacerbated by NHS treatment backlogs and systemic workplace exclusion.",
    myth: "Economic inactivity is driven by 'lifestyle choices' and people preferring benefits to working.",
    fact: "The ONS Labour Force Survey shows that over 80% of working-age economically inactive people are out of the labor force due to long-term sickness, disability, full-time study, or heavy caring duties. Resolution Foundation analysis notes that long-term sickness has been exacerbated by NHS treatment backlogs and systemic workplace exclusion.",
    title: "Economic inactivity is driven by 'lifestyle choices' and people preferring benefits to working.",
    description: "The ONS Labour Force Survey shows that over 80% of working-age economically inactive people are out of the labor force due to long-term sickness, disability, full-time study, or heavy caring duties. Resolution Foundation analysis notes that long-term sickness has been exacerbated by NHS treatment backlogs and systemic workplace exclusion.",
    dwpData: "ONS Labour Force Survey; Resolution Foundation 'From Review to Reality'",
    sources: [
      { name: "ONS Labour Force Survey Data", url: "https://www.ons.gov.uk/employmentandlabourmarket/peoplenotinwork/economicinactivity" },
      { name: "Resolution Foundation Analysis", url: "https://www.resolutionfoundation.org/comment/from-review-to-reality/" }
    ],
    tags: ["ONS", "Employment", "Inactivity"],
    severity: "Medium Misinformation"
  },
  {
    id: 'm4',
    category: 'Fit Notes & GPs',
    claim: "GPs hand out 'sick notes' casually without medical justification or clinical oversight.",
    truth: "Fit notes require a clinical evaluation by qualified medical professionals under GMC standards. NHS Digital data demonstrates that the vast majority of fit notes are issued for acute mental health crises, structural musculoskeletal conditions, or recovery following secondary surgical care.",
    myth: "GPs hand out 'sick notes' casually without medical justification or clinical oversight.",
    fact: "Fit notes require a clinical evaluation by qualified medical professionals under GMC standards. NHS Digital data demonstrates that the vast majority of fit notes are issued for acute mental health crises, structural musculoskeletal conditions, or recovery following secondary surgical care.",
    title: "GPs hand out 'sick notes' casually without medical justification or clinical oversight.",
    description: "Fit notes require a clinical evaluation by qualified medical professionals under GMC standards. NHS Digital data demonstrates that the vast majority of fit notes are issued for acute mental health crises, structural musculoskeletal conditions, or recovery following secondary surgical care.",
    dwpData: "NHS Digital Fit Note Data & Royal College of General Practitioners",
    sources: [
      { name: "NHS Digital Fit Note Data", url: "https://digital.nhs.uk/data-and-information/publications/statistical/fit-notes-issued-by-gp-practices" },
      { name: "RCGP Clinical Guidance", url: "https://www.rcgp.org.uk/" }
    ],
    tags: ["Fit Notes", "NHS", "GPs"],
    severity: "Medium Misinformation"
  },
  {
    id: 'm5',
    category: 'Fiscal Impact & GDP',
    claim: "UK disability and incapacity spending is uniquely exploding and unsustainable compared to other developed nations.",
    truth: "OECD comparative data demonstrates that UK spending on incapacity-related benefits as a share of GDP (~2.4%–3.0%) is broadly in line with or lower than comparable Northern/Western European nations (such as Sweden, Norway, Denmark, and the Netherlands). While the IFS notes spending has grown due to demographic aging and health deterioration, total working-age benefit spending as a share of GDP (4.7%) remains comparable to 2015–16 levels.",
    myth: "UK disability and incapacity spending is uniquely exploding and unsustainable compared to other developed nations.",
    fact: "OECD comparative data demonstrates that UK spending on incapacity-related benefits as a share of GDP (~2.4%–3.0%) is broadly in line with or lower than comparable Northern/Western European nations (such as Sweden, Norway, Denmark, and the Netherlands). While the IFS notes spending has grown due to demographic aging and health deterioration, total working-age benefit spending as a share of GDP (4.7%) remains comparable to 2015–16 levels.",
    title: "UK disability and incapacity spending is uniquely exploding and unsustainable compared to other developed nations.",
    description: "OECD comparative data demonstrates that UK spending on incapacity-related benefits as a share of GDP (~2.4%–3.0%) is broadly in line with or lower than comparable Northern/Western European nations (such as Sweden, Norway, Denmark, and the Netherlands). While the IFS notes spending has grown due to demographic aging and health deterioration, total working-age benefit spending as a share of GDP (4.7%) remains comparable to 2015–16 levels.",
    dwpData: "IFS 'Options for Reforming PIP' (2026); OECD Social Expenditure Database (SOCX)",
    sources: [
      { name: "IFS PIP Reform Briefing", url: "https://ifs.org.uk/publications/options-reforming-personal-independence-payment" },
      { name: "OECD Social Expenditure Database", url: "https://www.oecd.org/en/data/datasets/social-expenditure-database.html" }
    ],
    tags: ["IFS", "OECD", "GDP", "Economics"],
    severity: "High Misinformation"
  },
  {
    id: 'm6',
    category: 'Living Costs & Poverty',
    claim: "Disabled claimants receive generous benefits that leave them better off than lower-paid workers.",
    truth: "IFS research reveals that 51% of PIP claimants live in severe material deprivation—unable to afford 5 or more basic daily essentials—compared to 15% of non-disabled adults. Extra-cost benefits like PIP do not replace wages; they partially offset the significant extra living costs (specialised equipment, heating, transport) inherent to managing a long-term health condition.",
    myth: "Disabled claimants receive generous benefits that leave them better off than lower-paid workers.",
    fact: "IFS research reveals that 51% of PIP claimants live in severe material deprivation—unable to afford 5 or more basic daily essentials—compared to 15% of non-disabled adults. Extra-cost benefits like PIP do not replace wages; they partially offset the significant extra living costs (specialised equipment, heating, transport) inherent to managing a long-term health condition.",
    title: "Disabled claimants receive generous benefits that leave them better off than lower-paid workers.",
    description: "IFS research reveals that 51% of PIP claimants live in severe material deprivation—unable to afford 5 or more basic daily essentials—compared to 15% of non-disabled adults. Extra-cost benefits like PIP do not replace wages; they partially offset the significant extra living costs (specialised equipment, heating, transport) inherent to managing a long-term health condition.",
    dwpData: "IFS Analysis on Disability Benefits & Living Standards (2026); OBR Welfare Trends",
    sources: [
      { name: "IFS PIP & Material Deprivation Report", url: "https://ifs.org.uk/publications/options-reforming-personal-independence-payment" },
      { name: "OBR Welfare Spending Review", url: "https://obr.uk/forecasts-in-depth/tax-by-tax-spend-by-spend/welfare-spending-disability-benefits/" }
    ],
    tags: ["IFS", "OBR", "Poverty", "Living Costs"],
    severity: "High Misinformation"
  },
  {
    id: 'm7',
    category: 'Work Incentives & Off-Flows',
    claim: "People stay on sickness benefits forever because the system makes it financially unrewarding to ever return to work.",
    truth: "Resolution Foundation research shows off-flow rates have dropped not because claimants refuse to work, but because of severe structural barriers: the massive drop between Universal Credit health awards and basic awards creates a 'cliff-edge' risk if a job fails, paired with a lack of employer adjustments and occupational health support.",
    myth: "People stay on sickness benefits forever because the system makes it financially unrewarding to ever return to work.",
    fact: "Resolution Foundation research shows off-flow rates have dropped not because claimants refuse to work, but because of severe structural barriers: the massive drop between Universal Credit health awards and basic awards creates a 'cliff-edge' risk if a job fails, paired with a lack of employer adjustments and occupational health support.",
    title: "People stay on sickness benefits forever because the system makes it financially unrewarding to ever return to work.",
    description: "Resolution Foundation research shows off-flow rates have dropped not because claimants refuse to work, but because of severe structural barriers: the massive drop between Universal Credit health awards and basic awards creates a 'cliff-edge' risk if a job fails, paired with a lack of employer adjustments and occupational health support.",
    dwpData: "Resolution Foundation Benefit Off-Flow Analysis (2025); DWP WCA Statistics",
    sources: [
      { name: "Resolution Foundation Reforms Briefing", url: "https://www.resolutionfoundation.org/publications/" },
      { name: "OBR Economic and Fiscal Outlook", url: "https://obr.uk/" }
    ],
    tags: ["Resolution Foundation", "Employment", "Incapacity"],
    severity: "Medium Misinformation"
  },
  {
    id: 'm8',
    category: 'PIP Eligibility',
    claim: "You can get PIP automatically just for having a medical diagnosis or condition.",
    truth: "PIP is never awarded based on medical diagnoses or condition labels. It is strictly assessed on functional impact across 12 daily living and mobility descriptors (e.g., preparing food, washing, moving around) regardless of whether you have a rare condition, long COVID, or arthritis.",
    myth: "You can get PIP automatically just for having a medical diagnosis or condition.",
    fact: "PIP is never awarded based on medical diagnoses or condition labels. It is strictly assessed on functional impact across 12 daily living and mobility descriptors (e.g., preparing food, washing, moving around) regardless of whether you have a rare condition, long COVID, or arthritis.",
    title: "You can get PIP automatically just for having a medical diagnosis or condition.",
    description: "PIP is never awarded based on medical diagnoses or condition labels. It is strictly assessed on functional impact across 12 daily living and mobility descriptors (e.g., preparing food, washing, moving around) regardless of whether you have a rare condition, long COVID, or arthritis.",
    dwpData: "DWP PIP Assessment Guide for Health Professionals (2026)",
    sources: [
      { name: "GOV.UK PIP Assessment Criteria", url: "https://www.gov.uk/government/publications/personal-independence-payment-assessment-guide-for-assessment-providers" }
    ],
    tags: ["PIP", "Eligibility", "Descriptors"],
    severity: "Medium Misinformation"
  },
  {
    id: 'm9',
    category: 'PIP & Work',
    claim: "If you work or earn a high salary, you are not allowed to claim PIP.",
    truth: "PIP is entirely non-means-tested and tax-free. It is designed to cover extra living costs resulting from disability. Working full-time, part-time, or having significant savings has zero legal bearing on PIP eligibility.",
    myth: "If you work or earn a high salary, you are not allowed to claim PIP.",
    fact: "If you work or earn a high salary, you are not allowed to claim PIP.",
    title: "If you work or earn a high salary, you are not allowed to claim PIP.",
    description: "If you work or earn a high salary, you are not allowed to claim PIP.",
    dwpData: "DWP PIP Eligibility Rules; Stat-Xplore Employment Cross-analysis",
    sources: [
      { name: "DWP PIP Guidance for Claimants", url: "https://www.gov.uk/pip" }
    ],
    tags: ["PIP", "Employment", "Means Testing"],
    severity: "High Misinformation"
  },
  {
    id: 'm10',
    category: 'Assessment Quality',
    claim: "DWP assessment providers like Capita and Serco/Ingeus accurately evaluate health conditions on the first try.",
    truth: "Over 70% of initial DWP decisions taken to an independent HMCTS tribunal are overturned in favor of the claimant, proving that initial healthcare provider assessments frequently misapply descriptor criteria or ignore medical evidence.",
    myth: "DWP assessment providers like Capita and Serco/Ingeus accurately evaluate health conditions on the first try.",
    fact: "Over 70% of initial DWP decisions taken to an independent HMCTS tribunal are overturned in favor of the claimant, proving that initial healthcare provider assessments frequently misapply descriptor criteria or ignore medical evidence.",
    title: "DWP assessment providers like Capita and Serco/Ingeus accurately evaluate health conditions on the first try.",
    description: "Over 70% of initial DWP decisions taken to an independent HMCTS tribunal are overturned in favor of the claimant, proving that initial healthcare provider assessments frequently misapply descriptor criteria or ignore medical evidence.",
    dwpData: "Ministry of Justice Tribunal and Gender Statistics Quarterly (2025/26)",
    sources: [
      { name: "MoJ HMCTS Tribunal Data", url: "https://www.gov.uk/government/collections/tribunals-statistics" }
    ],
    tags: ["Tribunals", "Capita", "Assessment"],
    severity: "High Misinformation"
  },
  {
    id: 'm11',
    category: 'Carer\'s Allowance',
    claim: "Carers are well-supported by the state and can easily balance work with Carer's Allowance.",
    truth: "Carer's Allowance (£86.45/wk) has a harsh earnings cap (£151/wk net). Earning just £1 over the threshold results in 100% loss of benefit (the 'cliff edge'), causing thousands of unpaid carers to face catastrophic overpayment debts.",
    myth: "Carers are well-supported by the state and can easily balance work with Carer's Allowance.",
    fact: "Carer's Allowance (£86.45/wk) has a harsh earnings cap (£151/wk net). Earning just £1 over the threshold results in 100% loss of benefit (the 'cliff edge'), causing thousands of unpaid carers to face catastrophic overpayment debts.",
    title: "Carers are well-supported by the state and can easily balance work with Carer's Allowance.",
    description: "Carer's Allowance (£86.45/wk) has a harsh earnings cap (£151/wk net). Earning just £1 over the threshold results in 100% loss of benefit (the 'cliff edge'), causing thousands of unpaid carers to face catastrophic overpayment debts.",
    dwpData: "National Audit Office (NAO) Report on Carer's Allowance Overpayments",
    sources: [
      { name: "NAO Carer's Allowance Overpayment Review", url: "https://www.nao.org.uk/" }
    ],
    tags: ["Carers", "Carer's Allowance", "Overpayments"],
    severity: "High Misinformation"
  },
  {
    id: 'm12',
    category: 'Universal Credit Health',
    claim: "UC LCWRA recipients receive thousands in extra disposable income without scrutiny.",
    truth: "The Universal Credit LCWRA element (£429.80/month in 2026/27) requires passing a rigorous Work Capability Assessment. It replaces former ESA support and covers essential costs for individuals assessed by medical experts as having severe functional limitations.",
    myth: "UC LCWRA recipients receive thousands in extra disposable income without scrutiny.",
    fact: "The Universal Credit LCWRA element (£429.80/month in 2026/27) requires passing a rigorous Work Capability Assessment. It replaces former ESA support and covers essential costs for individuals assessed by medical experts as having severe functional limitations.",
    title: "UC LCWRA recipients receive thousands in extra disposable income without scrutiny.",
    description: "The Universal Credit LCWRA element (£429.80/month in 2026/27) requires passing a rigorous Work Capability Assessment. It replaces former ESA support and covers essential costs for individuals assessed by medical experts as having severe functional limitations.",
    dwpData: "DWP Universal Credit Rates and Statistics 2026/27",
    sources: [
      { name: "GOV.UK Universal Credit Rates", url: "https://www.gov.uk/universal-credit/what-youll-get" }
    ],
    tags: ["UC", "LCWRA", "Rates"],
    severity: "Medium Misinformation"
  },
  {
    id: 'm13',
    category: 'Mental Health Claims',
    claim: "Mental health claims are 'easy to fake' and driving the surge in PIP applications.",
    truth: "PIP mental health assessments evaluate severe everyday impairment (e.g. overwhelming distress, cognitive dysfunction). Over 80% of mental health claimants provide primary psychiatric, clinical, or prescription evidence, and mental health conditions have lower award approval rates than many physical conditions.",
    myth: "Mental health claims are 'easy to fake' and driving the surge in PIP applications.",
    fact: "PIP mental health assessments evaluate severe everyday impairment (e.g. overwhelming distress, cognitive dysfunction). Over 80% of mental health claimants provide primary psychiatric, clinical, or prescription evidence, and mental health conditions have lower award approval rates than many physical conditions.",
    title: "Mental health claims are 'easy to fake' and driving the surge in PIP applications.",
    description: "PIP mental health assessments evaluate severe everyday impairment (e.g. overwhelming distress, cognitive dysfunction). Over 80% of mental health claimants provide primary psychiatric, clinical, or prescription evidence, and mental health conditions have lower award approval rates than many physical conditions.",
    dwpData: "DWP Stat-Xplore Award Rates by Primary Medical Condition",
    sources: [
      { name: "DWP Stat-Xplore", url: "https://stat-xplore.dwp.gov.uk/" }
    ],
    tags: ["Mental Health", "PIP", "Award Rates"],
    severity: "High Misinformation"
  },
  {
    id: 'm14',
    category: 'Vouchers vs Cash',
    claim: "Replacing PIP cash with shopping vouchers would save billions and stop benefit abuse.",
    truth: "Independent economic evaluations show voucher schemes incur massive administrative overhead, reduce economic liquidity, and restrict disabled people from paying for flexible personal care, specialized therapies, or home utility bills.",
    myth: "Replacing PIP cash with shopping vouchers would save billions and stop benefit abuse.",
    fact: "Independent economic evaluations show voucher schemes incur massive administrative overhead, reduce economic liquidity, and restrict disabled people from paying for flexible personal care, specialized therapies, or home utility bills.",
    title: "Replacing PIP cash with shopping vouchers would save billions and stop benefit abuse.",
    description: "Replacing PIP cash with shopping vouchers would save billions and stop benefit abuse.",
    dwpData: "IFS & Disability Rights UK Green Paper Evaluation (2024/25)",
    sources: [
      { name: "IFS PIP Reform Response", url: "https://ifs.org.uk/" }
    ],
    tags: ["Vouchers", "PIP", "Reforms"],
    severity: "High Misinformation"
  },
  {
    id: 'm15',
    category: 'Regional Economy',
    claim: "Disability spending is a drain on local taxpayers that provides no economic return.",
    truth: "Disability benefits have a direct fiscal multiplier effect of 1.4x–1.7x. PIP funds are spent immediately on local high streets, energy suppliers, accessible transport, and food retailers, directly sustaining local businesses and generating VAT revenues.",
    myth: "Disability spending is a drain on local taxpayers that provides no economic return.",
    fact: "Disability benefits have a direct fiscal multiplier effect of 1.4x–1.7x. PIP funds are spent immediately on local high streets, energy suppliers, accessible transport, and food retailers, directly sustaining local businesses and generating VAT revenues.",
    title: "Disability spending is a drain on local taxpayers that provides no economic return.",
    description: "Disability spending is a drain on local taxpayers that provides no economic return.",
    dwpData: "NIESR Economic Impact Evaluation of Disability Transfers",
    sources: [
      { name: "NIESR Research Briefings", url: "https://www.niesr.ac.uk/" }
    ],
    tags: ["Multiplier", "Economy", "Regional Growth"],
    severity: "Medium Misinformation"
  },
  {
    id: 'm16',
    category: 'Assessment Recording',
    claim: "Claimants are legally forbidden from audio recording their PIP assessments.",
    truth: "Claimants have a statutory right to record their PIP phone or in-person assessment consultations using standard recording equipment, provided they inform the assessment provider in advance under DWP rules.",
    myth: "Claimants are legally forbidden from audio recording their PIP assessments.",
    fact: "Claimants have a statutory right to record their PIP phone or in-person assessment consultations using standard recording equipment, provided they inform the assessment provider in advance under DWP rules.",
    title: "Claimants are legally forbidden from audio recording their PIP assessments.",
    description: "Claimants are legally forbidden from audio recording their PIP assessments.",
    dwpData: "DWP PIP Assessment Guide Section 1.6",
    sources: [
      { name: "GOV.UK PIP Provider Guidance", url: "https://www.gov.uk/government/publications/personal-independence-payment-assessment-guide-for-assessment-providers" }
    ],
    tags: ["Recording", "Rights", "Assessments"],
    severity: "Low Misinformation"
  },
  {
    id: 'm17',
    category: 'Sanctions & Compliance',
    claim: "Disabled people on PIP are routinely sanctioned for failing to apply for jobs.",
    truth: "PIP is a non-conditional, extra-cost benefit. There are zero job-search requirements or work-related activity mandates attached to PIP, and it cannot be sanctioned for job-seeking non-compliance.",
    myth: "Disabled people on PIP are routinely sanctioned for failing to apply for jobs.",
    fact: "Disabled people on PIP are routinely sanctioned for failing to apply for jobs.",
    title: "Disabled people on PIP are routinely sanctioned for failing to apply for jobs.",
    description: "Disabled people on PIP are routinely sanctioned for failing to apply for jobs.",
    dwpData: "DWP Sanctions Statistics and PIP Framework",
    sources: [
      { name: "GOV.UK PIP Overview", url: "https://www.gov.uk/pip" }
    ],
    tags: ["Sanctions", "PIP", "Conditionality"],
    severity: "Medium Misinformation"
  },
  {
    id: 'm18',
    category: 'Prescriptions & Care',
    claim: "Receiving PIP automatically entitles claimants to free NHS prescriptions and dental care.",
    truth: "PIP entitlement does NOT automatically qualify a person for free NHS prescriptions or dental treatment in England. Exemption relies on low income via Universal Credit/HC2 schemes or specific physical condition exemptions.",
    myth: "Receiving PIP automatically entitles claimants to free NHS prescriptions and dental care.",
    fact: "Receiving PIP automatically entitles claimants to free NHS prescriptions and dental care.",
    title: "Receiving PIP automatically entitles claimants to free NHS prescriptions and dental care.",
    description: "Receiving PIP automatically entitles claimants to free NHS prescriptions and dental care.",
    dwpData: "NHS Help with Health Costs & DWP Passporting Rules",
    sources: [
      { name: "NHS Business Services Authority", url: "https://www.nhsbsa.nhs.uk/nhs-help-health-costs" }
    ],
    tags: ["NHS", "Prescriptions", "PIP"],
    severity: "Low Misinformation"
  },
  {
    id: 'm19',
    category: 'International Comparisons',
    claim: "The UK pays significantly higher welfare rates than all European peer nations.",
    truth: "According to Eurostat and OECD datasets, total social protection spending as a percentage of GDP in the UK (~10-11%) is lower than France (18.8%), Germany (15.4%), and the OECD average (13.2%).",
    myth: "The UK pays significantly higher welfare rates than all European peer nations.",
    fact: "According to Eurostat and OECD datasets, total social protection spending as a percentage of GDP in the UK (~10-11%) is lower than France (18.8%), Germany (15.4%), and the OECD average (13.2%).",
    title: "The UK pays significantly higher welfare rates than all European peer nations.",
    description: "According to Eurostat and OECD datasets, total social protection spending as a percentage of GDP in the UK (~10-11%) is lower than France (18.8%), Germany (15.4%), and the OECD average (13.2%).",
    dwpData: "OECD Social Expenditure Database (SOCX 2025/26)",
    sources: [
      { name: "OECD SOCX Database", url: "https://www.oecd.org/en/data/datasets/social-expenditure-database.html" }
    ],
    tags: ["OECD", "Europe", "GDP"],
    severity: "High Misinformation"
  },
  {
    id: 'm20',
    category: 'Mandatory Reconsideration',
    claim: "Mandatory Reconsideration effectively resolves most bad initial DWP decisions without needing court action.",
    truth: "DWP internal Mandatory Reconsiderations uphold the initial decision in over 75% of cases. True independent scrutiny only occurs when claimants proceed to HMCTS tribunals, where 70%+ of decisions are overturned.",
    myth: "Mandatory Reconsideration effectively resolves most bad initial DWP decisions without needing court action.",
    fact: "Mandatory Reconsideration effectively resolves most bad initial DWP decisions without needing court action.",
    title: "Mandatory Reconsideration effectively resolves most bad initial DWP decisions without needing court action.",
    description: "Mandatory Reconsideration effectively resolves most bad initial DWP decisions without needing court action.",
    dwpData: "DWP PIP Official Statistics & MoJ HMCTS Tribunal Overturn Rates",
    sources: [
      { name: "DWP Official PIP Statistics", url: "https://www.gov.uk/government/collections/personal-independence-payment-statistics" }
    ],
    tags: ["MR", "Tribunals", "DWP Appeals"],
    severity: "Medium Misinformation"
  }
];

export const OFFICIAL_POLICY_FAQS = [
  {
    id: 'q_pip_rates',
    keywords: ['pip', 'pip rate', 'pip rates', 'personal independence payment', 'daily living', 'mobility'],
    question: "What are the official DWP Personal Independence Payment (PIP) rates for 2026/2027?",
    answer: "PIP is non-means-tested and paid tax-free every 4 weeks. Daily Living Component: Enhanced £114.30/wk (£457.20/mo), Standard £76.55/wk (£306.20/mo). Mobility Component: Enhanced £79.80/wk (£319.20/mo), Standard £30.30/wk (£121.20/mo). Maximum combined payout is £194.10/wk (£776.40 every 4 weeks).",
    sourceName: "DWP Benefit and Pension Rates 2026/2027",
    sourceOrg: "DWP / GOV.UK",
    sourceUrl: "https://www.gov.uk/government/publications/benefit-and-pension-rates-2026-to-2027"
  },
  {
    id: 'q_pension_rates',
    keywords: ['pension', 'state pension', 'new state pension', 'basic state pension', 'triple lock', 'retirement', 'pensioner'],
    question: "What are the official UK State Pension rates and rules for 2026/2027?",
    answer: "Full New State Pension: £230.05/wk (£920.20 every 4 weeks). Full Basic State Pension (Category A/B): £176.30/wk (£705.20 every 4 weeks). State Pension is paid every 4 weeks and is taxable income, requiring 35 qualifying National Insurance years for the full new rate.",
    sourceName: "DWP State Pension Statutory Rates 2026/2027",
    sourceOrg: "DWP / GOV.UK",
    sourceUrl: "https://www.gov.uk/state-pension-rates"
  },
  {
    id: 'q_pension_credit',
    keywords: ['pension credit', 'pension guarantee', 'savings credit', 'low income pensioner'],
    question: "What is Pension Credit and what are the 2026/2027 guarantee credit rates?",
    answer: "Pension Credit tops up weekly income for state pension age adults on low incomes. Standard Guarantee Credit: Single person £227.10/wk; Couples £346.60/wk. It acts as a primary gateway benefit to Housing Benefit, Council Tax Support, and Winter Heating Support.",
    sourceName: "DWP Pension Credit Guidance 2026/2027",
    sourceOrg: "DWP / GOV.UK",
    sourceUrl: "https://www.gov.uk/pension-credit"
  },
  {
    id: 'q_uc_rates',
    keywords: ['universal credit', 'uc', 'standard allowance', 'lcwra', 'child element', 'housing element'],
    question: "What are the official Universal Credit (UC) standard allowances and elements for 2026/2027?",
    answer: "Monthly UC Standard Allowance: Single Under 25 £318.42/mo; Single 25+ £402.10/mo; Couples Under 25 £500.07/mo; Couples 25+ £631.25/mo. Key additional elements: LCWRA (Limited Capability for Work and Work-Related Activity) £429.80/mo; First Child (born before 6 Apr 2017) £339.60/mo; Subsequent Children £292.80/mo; Carer Element £203.45/mo.",
    sourceName: "DWP Universal Credit Statutory Schedule 2026/2027",
    sourceOrg: "DWP / GOV.UK",
    sourceUrl: "https://www.gov.uk/universal-credit/what-youll-get"
  },
  {
    id: 'q_aa_rates',
    keywords: ['attendance allowance', 'aa', 'pensioner disability', 'elderly care'],
    question: "What are the Attendance Allowance rates for pension-age individuals in 2026/2027?",
    answer: "Attendance Allowance is a non-means-tested, tax-free benefit for individuals who have reached State Pension age and require care or supervision due to disability or illness. Higher Rate (day & night care): £114.30/wk; Lower Rate (frequent day OR night care): £76.55/wk.",
    sourceName: "DWP Disability Allowances Schedule 2026/2027",
    sourceOrg: "DWP / GOV.UK",
    sourceUrl: "https://www.gov.uk/attendance-allowance"
  },
  {
    id: 'q_esa_rates',
    keywords: ['esa', 'employment and support allowance', 'new style esa', 'support group', 'wrag'],
    question: "What are the official Employment and Support Allowance (ESA) rates for 2026/2027?",
    answer: "Assessment Phase (first 13 weeks): Single Under 25 £72.90/wk; Single 25+ £92.05/wk. Main Phase: Support Group £143.70/wk; Work-Related Activity Group (WRAG) £92.05/wk. New Style ESA is contributory and non-means-tested.",
    sourceName: "DWP ESA Guidance 2026/2027",
    sourceOrg: "DWP / GOV.UK",
    sourceUrl: "https://www.gov.uk/employment-support-allowance"
  },
  {
    id: 'q_carers_rates',
    keywords: ['carer', 'carers allowance', 'carers', 'caring', 'carer earnings limit'],
    question: "What are the Carer's Allowance rates and net earnings thresholds for 2026/2027?",
    answer: "Carer's Allowance: £86.45/wk. Requirement: Care for a severely disabled person for at least 35 hours/week. Net Earnings Cap: £151.00/wk (after allowable deductions like tax, NI, and 50% pension contributions).",
    sourceName: "DWP Carers Rates & Thresholds 2026/2027",
    sourceOrg: "DWP / GOV.UK",
    sourceUrl: "https://www.gov.uk/carers-allowance"
  },
  {
    id: 'q_child_benefit_rates',
    keywords: ['child benefit', 'chb', 'high income child benefit charge', 'children'],
    question: "What are the official Child Benefit rates and thresholds for 2026/2027?",
    answer: "Child Benefit is paid every 4 weeks: Eldest or Only Child £26.05/wk (£104.20/mo); Additional Children £17.25/wk (£69.00/mo) per child. High Income Child Benefit Charge (HICBC) threshold remains £60,000 adjusted net income before clawback begins.",
    sourceName: "HMRC Child Benefit Schedule 2026/2027",
    sourceOrg: "HMRC / GOV.UK",
    sourceUrl: "https://www.gov.uk/child-benefit"
  },
  {
    id: 'q_jsa_rates',
    keywords: ['jsa', 'jobseekers allowance', 'unemployment benefit', 'job seeker'],
    question: "What are the New Style Jobseeker's Allowance (JSA) rates for 2026/2027?",
    answer: "New Style JSA is a contribution-based weekly payment for unemployed individuals actively seeking work: Under 25 £72.90/wk; Aged 25 and over £92.05/wk. Payable for up to 182 days (approx. 6 months).",
    sourceName: "DWP JSA Statutory Guidance 2026/2027",
    sourceOrg: "DWP / GOV.UK",
    sourceUrl: "https://www.gov.uk/jobseekers-allowance"
  },
  {
    id: 'q1',
    keywords: ['pip fraud', 'fraud rate', 'how much fraud', 'cheating pip'],
    question: "What is the actual rate of fraud in Personal Independence Payment (PIP)?",
    answer: "Official DWP statistics show that PIP fraud is estimated at just 0.4% of total benefit expenditure. Overpayments are primarily due to administrative or claimant error rather than intentional fraud.",
    sourceName: "DWP Fraud and Error in the Benefit System (2024/25)",
    sourceOrg: "DWP",
    sourceUrl: "https://www.gov.uk/government/statistics/fraud-and-error-in-the-benefit-system-financial-year-2024-to-2025-estimates"
  },
  {
    id: 'q2',
    keywords: ['tribunal', 'appeal', 'overturn', 'hmcts', 'court'],
    question: "What percentage of PIP appeals are successful at independent tribunal?",
    answer: "Ministry of Justice statistics confirm that over 70% of PIP decisions taken to independent HMCTS tribunals are overturned in favor of the claimant.",
    sourceName: "HMCTS Tribunal and Gender Statistics Quarterly",
    sourceOrg: "Ministry of Justice / DWP",
    sourceUrl: "https://www.gov.uk/government/collections/tribunals-statistics"
  },
  {
    id: 'q3',
    keywords: ['inactivity', 'economically inactive', 'unemployed', 'lifestyle choice', 'sick'],
    question: "What is driving the rise in UK economic inactivity?",
    answer: "ONS Labour Force Survey data shows over 80% of economically inactive working-age individuals are out of work due to long-term sickness, full-time study, or caring responsibilities, exacerbated by NHS waiting times.",
    sourceName: "ONS Labour Force Survey: Economic Inactivity",
    sourceOrg: "ONS",
    sourceUrl: "https://www.ons.gov.uk/employmentandlabourmarket/peoplenotinwork/economicinactivity"
  },
  {
    id: 'q4',
    keywords: ['deprivation', 'poverty', 'material deprivation', 'living costs', 'poverty rate'],
    question: "How does PIP impact claimant poverty and material deprivation?",
    answer: "IFS research finds that 51% of PIP claimants suffer from severe material deprivation, compared to 15% of non-disabled adults, because PIP only partially offsets the higher costs of living with a disability.",
    sourceName: "IFS Options for Reforming Personal Independence Payment",
    sourceOrg: "IFS",
    sourceUrl: "https://ifs.org.uk/publications/options-reforming-personal-independence-payment"
  },
  {
    id: 'q5',
    keywords: ['gdp', 'spending', 'europe', 'international', 'oecd', 'other countries'],
    question: "How does UK disability spending compare to other OECD countries?",
    answer: "OECD social expenditure datasets show UK spending on incapacity benefits (2.4%–3.0% of GDP) is on par with or lower than European peer nations such as Denmark, Sweden, Norway, and Germany.",
    sourceName: "OECD Social Expenditure Database (SOCX)",
    sourceOrg: "OECD",
    sourceUrl: "https://www.oecd.org/en/data/datasets/social-expenditure-database.html"
  },
  {
    id: 'q6',
    keywords: ['work', 'working', 'earn', 'wage', 'job', 'salary'],
    question: "Can I work while receiving Personal Independence Payment (PIP)?",
    answer: "Yes. PIP is non-means-tested and tax-free. Working full-time, part-time, or having savings has zero impact on your legal eligibility or award amount.",
    sourceName: "DWP PIP Guidance & Rules",
    sourceOrg: "DWP",
    sourceUrl: "https://www.gov.uk/pip/eligibility"
  },
  {
    id: 'q7',
    keywords: ['off-flow', 'return to work', 'barrier', 'work incentives'],
    question: "Why do so few sickness benefit recipients return to employment?",
    answer: "Resolution Foundation research indicates that steep benefit drops between Universal Credit health awards and basic awards create severe cliff-edges, compounded by a lack of workplace adjustments and occupational health support.",
    sourceName: "Resolution Foundation: Benefit Off-Flows & Labour Market Reform",
    sourceOrg: "Resolution Foundation",
    sourceUrl: "https://www.resolutionfoundation.org/publications/"
  },
  {
    id: 'q8',
    keywords: ['welfare forecast', 'future spending', 'budget', 'spending trend'],
    question: "What are the long-term fiscal forecasts for UK disability benefits?",
    answer: "The Office for Budget Responsibility (OBR) tracks welfare spending trends, noting that demographics, population aging, and worsening health contribute to rising spending, while remaining stable as a proportion of total public expenditure.",
    sourceName: "OBR Welfare Spending Forecasts",
    sourceOrg: "OBR",
    sourceUrl: "https://obr.uk/forecasts-in-depth/tax-by-tax-spend-by-spend/welfare-spending-disability-benefits/"
  }
];

export const queryOfficialSources = (userQuery) => {
  if (!userQuery || userQuery.trim() === '') return [];
  const cleanQuery = userQuery.toLowerCase().trim();
  const queryWords = cleanQuery.split(/\s+/).filter(w => w.length > 2);
  
  // 1. Search FAQ items matching keywords, question text, or answer text
  const exactMatches = OFFICIAL_POLICY_FAQS.filter(faq => 
    faq.keywords.some(kw => cleanQuery.includes(kw.toLowerCase())) ||
    queryWords.some(word => faq.question.toLowerCase().includes(word)) ||
    faq.question.toLowerCase().includes(cleanQuery) ||
    faq.answer.toLowerCase().includes(cleanQuery)
  );

  if (exactMatches.length > 0) {
    return exactMatches;
  }

  // 2. Fall back to searching Myth Vault claims, category, and tags
  const vaultMatches = MYTH_VAULT.filter(item =>
    item.claim.toLowerCase().includes(cleanQuery) ||
    item.truth.toLowerCase().includes(cleanQuery) ||
    item.category.toLowerCase().includes(cleanQuery) ||
    item.tags.some(tag => cleanQuery.includes(tag.toLowerCase()) || tag.toLowerCase().includes(cleanQuery))
  ).map(item => ({
    id: item.id,
    question: item.claim,
    answer: item.truth,
    sourceName: item.dwpData,
    sourceOrg: item.category,
    sourceUrl: item.sources[0]?.url || "https://www.gov.uk/government/organisations/department-for-work-pensions"
  }));

  if (vaultMatches.length > 0) {
    return vaultMatches;
  }

  // 3. Return empty array if no matches are found
  return [];
};
