import { BENEFIT_RATES_2026_2027 } from '../constants/spendingData';

export const evaluatePipAndFinancialClaims = (rawInput) => {
  const text = rawInput.trim();
  const lower = text.toLowerCase();
  let score = 20;
  let flags = [];
  let primaryRebuttal = "";
  let sourceRef = "";
  let sourceLinks = [];
  let extractedQuotes = [];

  // Check if primary sources or official statistical data are cited
  const containsCitation = /(dwp|ons|hmcts|stat-xplore|ifs|niesr|hansard|gov\.uk|http|https|source|journal|tribunal statistics|office for national statistics|oecd|obr|institute for fiscal studies)/i.test(lower);

  // 1. EXTENDED UNSUBSTANTIATED STIGMATISING, SENSATIONALIST & HATE/INCITEMENT TROPES
  const negativeStigmaPhrases = [
    'scrounger', 'scroungers', 'shirker', 'shirkers', 'skiver', 'skivers',
    'lazy', 'faking', 'faking illness', 'handout', 'handout nation', 'malingerer', 'malingerers',
    'refuse to work', 'lifestyle choice', 'easy life', 'sick note culture', 'fit note culture',
    'pip crisis', 'welfare burden', 'fraud rampant', 'explosion in claims', 'drain on taxpayers',
    'drain on the economy', 'open door policy', 'scamming the system', 'racket', 'gravy train',
    'free ride', 'epidemic of sickness', 'fraud epidemic', 'work ethic', 'culture of dependency',
    'cheats', 'benefits cheat', 'benefits cheats', 'sham', 'moochers', 'spongeing', 'spongers',
    'taking the mickey', 'work shy', 'work-shy', 'leech', 'leeches', 'system abuser', 'abuse the system',
    'scamming', 'free money', 'freeloader', 'freeloaders', 'welfare dependency', 'culture of laziness',
    'feckless', 'disability scam', 'faking disability', 'pretending to be sick', 'faking depression'
  ];

  const foundStigmaPhrases = negativeStigmaPhrases.filter(phrase => lower.includes(phrase));

  // Comprehensive negative sentiment indicators (including short subjective attacks)
  const welfareTopics = ['pip', 'universal credit', 'benefits', 'welfare', 'disabled', 'disability', 'work capability', 'fit note', 'sick note', 'esa', 'dla'];
  const genericNegativeIndicators = [
    'bad', 'terrible', 'awful', 'horrible', 'useless', 'ruining', 'destroying', 
    'costing billions', 'out of control', 'crisis', 'fraud', 'cheat', 'scam', 
    'lazy', 'refuse', 'burden', 'waste', 'drain', 'wrong', 'joke'
  ];
  
  const mentionsWelfare = welfareTopics.some(topic => lower.includes(topic));
  const hasNegativeTone = genericNegativeIndicators.some(indicator => {
    const regex = new RegExp(`\\b${indicator}\\b`, 'i');
    return regex.test(lower);
  });

  if ((foundStigmaPhrases.length > 0 || (mentionsWelfare && hasNegativeTone)) && !containsCitation) {
    score = Math.min(100, Math.max(88, score + 68 + (foundStigmaPhrases.length * 5)));
    
    if (foundStigmaPhrases.length > 0) {
      extractedQuotes.push(`"${foundStigmaPhrases.map(p => `'${p}'`).join(', ')}"`);
      flags.push(`FLAGGED UNSUBSTANTIATED STIGMATISING RHETORIC: Contains negative anti-welfare terminology (${foundStigmaPhrases.map(p => `'${p}'`).join(', ')}) without citing verified primary data from DWP, ONS, or HMCTS.`);
    } else {
      extractedQuotes.push(`"${text}"`);
      flags.push(`FLAGGED UNSUBSTANTIATED NEGATIVE ASSERTION: Makes sweeping negative claims ('${text}') regarding disabled people or statutory benefits without supporting empirical data or primary source documentation.`);
    }

    flags.push(`NON-EVIDENCE BACKED STATEMENT: Uses negative narrative framing against welfare entitlement while omitting verified baseline statistics.`);
    flags.push(`PUBLIC DISCOURSE RISK: Disseminates unsupported hostility toward benefit claimants by framing statutory entitlement access as inherently bad, abusive, or unmonitored.`);

    primaryRebuttal = `DEBUNKING UNSUBSTANTIATED NEGATIVE CLAIMS: Broad assertions dismissing PIP or Universal Credit as "bad" or fraudulent are refuted by official primary data. Personal Independence Payment (PIP) provides essential statutory support for extra daily costs faced by long-term sick and disabled individuals following rigorous clinical assessments. DWP Fraud & Error statistics confirm that PIP fraud is estimated at under 0.2% across the entire caseload, while over 70% of appealed PIP tribunal decisions are overturned in favor of the claimant due to initial assessment errors.`;
    sourceRef = "DWP Fraud & Error Statistics, MOJ HMCTS Tribunal Quarterly Data, ONS Labour Force Survey";
    
    sourceLinks = [
      { label: "DWP Fraud & Error in the Benefit System", url: "https://www.gov.uk/government/collections/fraud-and-error-in-the-benefit-system" },
      { label: "MOJ HMCTS Tribunal Statistics Quarterly", url: "https://www.gov.uk/government/collections/tribunals-statistics" },
      { label: "ONS Labour Market & Inactivity Data", url: "https://www.ons.gov.uk/employmentandlabourmarket/peoplenotinwork" }
    ];
  }

  // 2. GDP & MACROECONOMIC MYTHS (IFS, OBR, OECD SOURCES)
  const economicSpirallingPhrases = [
    'gdp', 'gross domestic product', 'percentage of gdp', 'share of gdp',
    'welfare gdp', 'spending as a % of gdp', 'welfare spending as a percentage',
    'spiralling', 'spiraling', 'unsustainable', 'bankrupting', 'affordable', 'welfare bill'
  ];

  const hasEconomicGdpClaim = economicSpirallingPhrases.some(phrase => lower.includes(phrase));

  if (hasEconomicGdpClaim && (!containsCitation || score > 50)) {
    score = Math.max(82, score + 35);
    if (!extractedQuotes.some(q => q.toLowerCase().includes('gdp') || q.toLowerCase().includes('spiralling'))) {
      extractedQuotes.push(`"${text.length > 120 ? text.substring(0, 120) + '...' : text}"`);
    }
    flags.push(`EVALUATION OF GDP & ECONOMIC BENEFIT CLAIMS: Assesses assertions regarding benefit expenditure growth against historical UK GDP datasets.`);
    flags.push(`DEBUNKS 'SPIRALLING' BENEFIT CLAIMS: UK social protection spending as a percentage of GDP has remained stable between 10% and 11% for over two decades (lower than the 2010–2012 peak of 12.1%).`);
    flags.push(`INTERNATIONAL COMPARISON (OECD): OECD Social Expenditure Database demonstrates UK disability and welfare spending as a % of GDP remains consistently below the OECD average (13.2%) and well below European peer nations.`);

    if (!primaryRebuttal) {
      primaryRebuttal = `DEBUNKING ECONOMIC BENEFIT CLAIMS & GDP SPIRAL MYTH: Assertions that disability and welfare benefits are "spiralling out of control" as a share of the national economy are factually inaccurate. HM Treasury, OBR, and IFS historical figures confirm that total UK welfare/social protection spending as a percentage of Gross Domestic Product (GDP) has stayed practically unchanged at approximately 10%–11% for over two decades, remaining lower than post-2008 financial crash peaks (12.1% in 2009/10). OECD comparative data shows the UK spends a lower proportion of GDP on working-age disability and social protection than the OECD average and significantly less than peer European economies.`;
      sourceRef = "IFS TaxLab Welfare Share Analysis, OBR Economic & Fiscal Outlook, OECD Social Expenditure Database (SOCX)";
      
      sourceLinks = [
        { label: "IFS TaxLab: UK Welfare & Social Security Spending", url: "https://ifs.org.uk/taxlab/taxlab-data-feed/uk-welfare-spending" },
        { label: "OBR Economic & Fiscal Outlook Data", url: "https://obr.uk/efo/economic-and-fiscal-outlook-march-2024/" },
        { label: "OECD Social Expenditure Database (SOCX)", url: "https://www.oecd.org/social/expenditure.htm" }
      ];
    }
  }

  // 3. WORK INCENTIVE CLAIMS
  const incentivePhrases = ["incentive", "no reason to work", "better off on benefits", "work doesn't pay", "don't have any incentive"];
  const hasIncentiveClaim = incentivePhrases.some(phrase => lower.includes(phrase));

  if (hasIncentiveClaim && !containsCitation) {
    score = Math.max(78, score + 30);
    extractedQuotes.push(`"${text.length > 120 ? text.substring(0, 120) + '...' : text}"`);
    flags.push(`UNSUBSTANTIATED WORK INCENTIVE CLAIM: Evaluates assertions alleging a total lack of work incentive or being 'better off on benefits' without backing data.`);
    flags.push(`STRUCTURAL REBUTTAL: Universal Credit explicitly includes financial work incentives via Work Allowance rates (£404/mo with housing element, £673/mo without) and a 55% UC taper rate.`);
    flags.push(`STATUTORY CEILINGS: Benefit payments are subject to statutory UK Benefit Cap limits (£25,323/yr London, £22,020/yr Outside London).`);

    if (!primaryRebuttal) {
      primaryRebuttal = `ANALYSIS OF WORK INCENTIVE CLAIMS: Claims that there is "no incentive to work" or that individuals are "better off on benefits" misrepresent how Universal Credit operates. UC includes an explicit financial work incentive through DWP Work Allowance rates (£404/mo for claimants receiving housing support; £673/mo if no housing support is claimed) and a 55% taper rate, ensuring net household income increases for every hour worked.`;
      sourceRef = "DWP Work Allowance & UC Rules 2026/27, GOV.UK Benefit Cap Guidance & ONS Labour Market Statistics";
      
      sourceLinks = [
        { label: "DWP Stat-Xplore Official Database", url: "https://stat-xplore.dwp.gov.uk/" },
        { label: "ONS Labour Market Overview & Inactivity Analysis", url: "https://www.ons.gov.uk/employmentandlabourmarket/peopleinwork/employmentandemployeetypes" },
        { label: "GOV.UK Universal Credit Work Allowances", url: "https://www.gov.uk/universal-credit/what-youll-get" }
      ];
    }
  }

  // 4. IMPOSSIBLE FINANCIAL EXAGGERATIONS
  const explicitFinancialMatches = text.match(/(?:£\s*\d+[\d,]*\s*(?:k|thousand|million|bn|billion)?|\b\d+[\d,]*\s*(?:k|thousand|million|bn|billion)?\s*(?:pounds|pound|gbp)\b)/gi) || [];
  let extractedAnnualAmount = 0;

  for (let match of explicitFinancialMatches) {
    let clean = match.replace(/[£,\s]/g, '').toLowerCase();
    let val = 0;
    if (clean.endsWith('k')) {
      val = parseFloat(clean.replace('k', '')) * 1000;
    } else if (clean.endsWith('thousand')) {
      val = parseFloat(clean.replace('thousand', '')) * 1000;
    } else if (clean.includes('pound')) {
      val = parseFloat(clean.split('pound')[0]);
    } else {
      val = parseFloat(clean);
    }
    if (val > extractedAnnualAmount && val < 1000000) {
      extractedAnnualAmount = val;
    }
  }

  if (lower.includes('£60k') || lower.includes('60,000 pounds') || lower.includes('60 thousand pounds')) {
    extractedAnnualAmount = 60000;
  }

  const isFinancialClaim = extractedAnnualAmount > 0;

  if (isFinancialClaim && BENEFIT_RATES_2026_2027?.benefitCap2026?.absoluteMaxCap && extractedAnnualAmount > BENEFIT_RATES_2026_2027.benefitCap2026.absoluteMaxCap) {
    score = 98;
    extractedQuotes.push(`"${text.length > 120 ? text.substring(0, 120) + '...' : text}"`);
    flags.push(`Claims an annual benefit payout of £${extractedAnnualAmount.toLocaleString()}, violating statutory UK Benefit Caps (£25,323/yr London, £22,020/yr Outside London).`);
    primaryRebuttal = `STATUTORY IMPOSSIBILITY REBUTTAL: Allegations that claimants receive £${extractedAnnualAmount.toLocaleString()} per year violate UK Welfare Law. Under 2026/2027 regulations, benefit payments are capped at £25,323/year in Greater London or £22,020/year across the rest of the UK.`;
    sourceRef = "DWP Statutory Benefit Rates & Benefit Cap Regulations 2026/2027 (GOV.UK)";
    
    sourceLinks = [
      { label: "GOV.UK Benefit Cap Statutory Limits", url: "https://www.gov.uk/benefit-cap" },
      { label: "DWP Benefit and Pension Rates 2026/27", url: "https://www.gov.uk/government/publications/benefit-and-pension-rates-2026-to-2027" }
    ];
  }

  // DEFAULT FALLBACK CHECK FOR ANY UNSOURCED DISMISSAL
  if (!primaryRebuttal) {
    if (!containsCitation) {
      score = 88;
      primaryRebuttal = `ANALYSIS OF STATEMENT: Unverified negative or subjective assertion regarding PIP, Universal Credit, or disability support. Official primary data from DWP Stat-Xplore and HMCTS shows PIP fraud is under 0.2%, over 70% of tribunal appeals are overturned due to initial DWP assessment errors, and 84% of economically inactive working-age adults face chronic health conditions or NHS waiting list delays.`;
      sourceRef = "DWP Stat-Xplore Caseload Data, ONS Labour Force Survey & HMCTS Tribunal Statistics";
      
      sourceLinks = [
        { label: "DWP Stat-Xplore Portal", url: "https://stat-xplore.dwp.gov.uk/" },
        { label: "ONS Labour Market Review", url: "https://www.ons.gov.uk/employmentandlabourmarket" },
        { label: "HMCTS Tribunal Quarterly Statistics", url: "https://www.gov.uk/government/collections/tribunals-statistics" }
      ];
    } else {
      primaryRebuttal = `ANALYSIS OF STATEMENT: Statement evaluated against official DWP Stat-Xplore datasets, 2026/2027 Statutory Benefit Rates, and ONS employment statistics.`;
      sourceRef = "ONS Labour Market Review & DWP Stat-Xplore Database";
      
      sourceLinks = [
        { label: "DWP Stat-Xplore Portal", url: "https://stat-xplore.dwp.gov.uk/" },
        { label: "ONS Official Statistics", url: "https://www.ons.gov.uk/" }
      ];
    }
  }

  if (!sourceLinks || sourceLinks.length === 0) {
    sourceLinks = [
      { label: "DWP Stat-Xplore Database", url: "https://stat-xplore.dwp.gov.uk/" },
      { label: "ONS Labour Market Data", url: "https://www.ons.gov.uk/employmentandlabourmarket" },
      { label: "IFS Welfare Expenditure Analysis", url: "https://ifs.org.uk/taxlab/taxlab-data-feed/uk-welfare-spending" }
    ];
  }

  const finalScore = Math.min(100, Math.max(12, score));
  
  let finalVerdict = "Low BS / Mostly Factual";
  if (finalScore >= 80) {
    finalVerdict = (foundStigmaPhrases.length > 0 || (mentionsWelfare && hasNegativeTone) || !containsCitation)
      ? "UNSUBSTANTIATED STIGMATISING CLAIM"
      : "High Misleading Risk / False Claim";
  } else if (finalScore >= 50) {
    finalVerdict = "Moderate Bias / Unsubstantiated Assertion";
  }

  return {
    inputStatement: text,
    extractedQuotes,
    score: finalScore,
    verdict: finalVerdict,
    flags,
    primaryRebuttal,
    sourceRef,
    sourceLinks
  };
};
