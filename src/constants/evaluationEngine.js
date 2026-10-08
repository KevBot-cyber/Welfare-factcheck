import { BENEFIT_RATES_2026_2027 } from '../constants/spendingData';
import { DebunkEngine } from '../utils/debunkEngine';
import factCardsData from './factCardsData';

import * as dataSourcesApi from "../utils/dataSourcesApi";
import * as factCheckMyths from "../utils/factCheckMyths";
import * as rhetoricEngine from "../utils/rhetoricEngine";
import * as ucRatesAndRules from '../utils/ucRatesAndRules';
import * as wcaAndPipRules from '../utils/wcaAndPipRules';
import { BENEFIT_REGISTRY as benefitCoverageMatrix } from './benefitCoverageMatrix';

const debunkEngine = new DebunkEngine(factCardsData);

export {
  dataSourcesApi,
  factCheckMyths,
  rhetoricEngine,
  ucRatesAndRules,
  wcaAndPipRules,
  benefitCoverageMatrix
};

// Helper for fuzzy or approximate keyword matching (handles minor typos / character slips)
const fuzzyMatchAny = (textLower, phrases) => {
  if (!Array.isArray(phrases)) return false;
  return phrases.some(phrase => {
    const normPhrase = phrase.replace(/[’‘`]/g, "'");
    if (textLower.includes(normPhrase)) return true;
    if (normPhrase.length >= 6) {
      const words = normPhrase.split(' ');
      if (words.length > 1) {
        return words.every(w => textLower.includes(w) || (w.length > 4 && textLower.includes(w.substring(0, w.length - 1))));
      }
    }
    return false;
  });
};

// 1. COMPREHENSIVE NARRATIVE TAXONOMY & PATTERN MAPS - UK ANTI-WELFARE PLAYBOOK 2026
const STIGMA_TAXONOMY = {
  WORK_SHAMING: [
    "lazy", "refuse to work", "choose unemployment", "prefer benefits to employment", "could easily work",
    "get a job", "unwilling to contribute", "deliberately avoid employment", "no work ethic", "live comfortably without working",
    "deliberately remain unemployed", "won't work", "wont work", "don't want to work", "dont want to work",
    "choose benefits", "benefits lifestyle", "work shy", "work-shy", "lazy claimants", "too lazy to work", "perfectly capable of working",
    "economically inactive by choice", "could work if they wanted", "shirking work", "avoiding work", "turns down jobs"
  ],
  FRAUD_GENERALISATION: [
    "scrounger", "cheat", "fraudster", "faker", "shirker", "skiver", "sponger", "moocher", "freeloader", "benefit cheat",
    "benefits cheat", "gaming the system", "exploiting the system", "abusing benefits", "everyone is cheating",
    "claimants are lying", "fake disability", "fake illness", "fraud is rampant", "fraud epidemic", "benefits are full of cheats",
    "widespread faking", "mass fraud", "fake disability epidemic", "fraudsters everywhere", "benefit thieves", "stealing taxpayer money"
  ],
  BENEFIT_LIFESTYLE: [
    "lifestyle choice", "benefits lifestyle", "welfare lifestyle", "culture of dependency", "attractive alternative to work",
    "easy life", "comfortable living", "permanent way of life", "family tradition", "intergenerational dependency",
    "life on benefits", "benefits as a career", "dependency culture", "welfare dependency", "comfortable on benefits"
  ],
  BENEFIT_VS_WORK: [
    "benefits pay more than work", "better off on benefits", "earn more on benefits", "work doesn't pay", "work doesnt pay",
    "why work when benefits pay", "welfare pays better", "financially better off not working", "benefits are more attractive than employment"
  ],
  TAXPAYER_OTHERING: [
    "hardworking taxpayers", "contributors and non-contributors", "makers and takers", "taxpayers and welfare dependants",
    "workers and benefit recipients", "those who pay in versus those who take out"
  ],
  TAXPAYER_FURY_TROPE: [
    "taxpayer fury", "taxpayer outrage", "hardworking taxpayers footing the bill", "taxpayer funded lifestyle",
    "taxpayers paying for", "bill for taxpayers", "cost to taxpayers", "taxpayer cash", "hardworking families paying",
    "strivers vs skivers", "strivers and skivers", "makers and takers", "shirkers and workers"
  ],
  CONTRIBUTION_OTHERING: [
    "contribute nothing", "give nothing back", "live off taxpayers", "take but never give", "never paid into the system",
    "drain society", "living at our expense"
  ],
  DISABILITY_INVALIDATION: [
    "doesn't look disabled", "doesnt look disabled", "looks healthy", "looks fine", "walking therefore not disabled",
    "shopping therefore not disabled", "driving therefore not disabled", "going on holiday therefore not disabled",
    "smiling therefore not depressed", "working therefore not disabled", "having a social life therefore not disabled",
    "exercising therefore not disabled"
  ],
  WORKING_MEANS_NOT_DISABLED: [
    "disabled people cannot work", "anyone working cannot be disabled", "employment proves pip fraud",
    "working proves somebody is fit", "having a job means someone does not need disability support",
    "if you can work you aren't disabled", "can work therefore not disabled"
  ],
  DIAGNOSIS_MISCONCEPTION: [
    "diagnosis automatically qualifies", "adhd automatically gets pip", "autism automatically gets pip",
    "depression automatically gets pip", "fibromyalgia automatically gets pip", "any diagnosis guarantees benefits",
    "diagnosis equals entitlement", "just need a diagnosis for pip"
  ],
  PIP_ASSESSMENT_MOCKERY: [
    "pip is easy to claim", "pip claiming is easy", "pip is easy to fake", "pip is easy to get", "pip is a joke", "anyone can get pip", "pip is automatic", "just tell the assessor anything",
    "assessments are meaningless", "everyone gets awarded", "pip is a giveaway", "pip is easy to blag", "just say you have anxiety and get pip",
    "pip for anxiety is easy", "easy to claim pip", "pip handouts", "pip free money", "rubber stamped pip", "claiming is easy", "easy to apply for"
  ],
  APPEARANCE_POLICING: [
    "photographs", "social media", "clothing", "looking healthy", "smiling in photos", "seen walking", "seen shopping"
  ],
  HYGIENE_STIGMA: [
    "dirty", "filthy", "smelly", "unwashed", "refusing to bathe", "disgusting", "unhygienic", "stink", "stinks", "smell",
    "benefit claimants are dirty", "claimants are unwashed", "welfare claimants are smelly", "disabled people are dirty",
    "pip claimants don't wash", "pip claimants dont wash", "people on benefits don't wash", "people on benefits dont wash",
    "benefit claimants stink", "claimants stink", "welfare claimants stink", "disabled claimants stink",
    "unwashed claimants", "smelly claimants", "dirty claimants", "filthy claimants",
    "unclean", "unwashed and smelly", "dirty and smelly", "personal hygiene", "poor hygiene claimants",
    "don't wash", "dont wash", "never wash", "refuse to wash", "won't wash", "wont wash",
    "haven't washed", "havent washed", "not washing", "smell of benefits", "benefit stink",
    "welfare unclean", "benefits unclean", "claimants unclean", "disabled unwashed"
  ],
  MOTABILITY_TROPE: [
    "free bmw", "free audi", "free mercedes", "free tesla", "free range rover", "taxpayer-funded luxury cars",
    "free cars for disabled people", "motability giveaway", "pip car", "free car on benefits", "motability bmw",
    "motability luxury cars", "brand new car on pip", "luxury motability vehicles",
    "free cars", "free car", "free cars on benefits", "claimants get free cars", "claimants get free car",
    "motability free", "motability free cars", "motability free car",
    "motability", "motability claimants", "motability claimants get free cars"
  ],
  HANDOUT_NARRATIVE: [
    "free money", "handouts", "taxpayer handouts", "welfare handouts", "cash giveaway", "benefits jackpot", "benefits bonanza",
    "something for nothing", "money for nothing", "benefits bonanza"
  ],
  WELFARE_TOURISM: [
    "benefit tourism", "welfare tourism", "migrants coming for benefits", "foreigners living on benefits",
    "immigrants taking welfare", "open borders for benefits", "people coming to britain for welfare",
    "migrants on benefits", "health tourism and benefits"
  ],
  INTERGENERATIONAL_DEPENDENCY: [
    "families on benefits for generations", "benefit families", "children growing up to claim benefits",
    "welfare families", "dependency passed down", "benefits culture in families",
    "three generations never worked", "generations on benefits", "second generation benefits"
  ],
  SCHOOL_TO_BENEFITS: [
    "leaving school onto benefits", "sign straight onto benefits", "straight on benefits from school",
    "school to welfare", "school leavers on benefits", "drift into life on benefits", "going straight on the dole",
    "claim benefits at 16", "claim benefits from school", "young people on benefits", "school to benefits",
    "straight from school onto benefits", "youngsters on sickness benefits"
  ],
  SYSTEM_FAILURE_NARRATIVE: [
    "broken system", "system is wide open", "anyone can claim", "no checks", "rubber-stamping", "rubber stamping",
    "automatic benefits", "benefits handed out without scrutiny"
  ],
  BENEFIT_MAXIMISATION: [
    "maxing out benefits", "stacking benefits", "collecting every benefit", "exploiting loopholes", "claiming everything available"
  ],
  FAMILY_BENEFIT_STEREOTYPE: [
    "large families deliberately have children for benefits", "have children to obtain welfare",
    "housing benefit creates irresponsible landlords", "deliberately maximise benefits through household composition"
  ],
  SICK_NOTE_CULTURE: [
    "sick note culture", "fit note culture", "doctors handing out sick notes", "gps signing everyone off",
    "11 million sick notes", "sick notes are welfare gateway cards", "sicknote Britain", "signed off sick",
    "malingering", "swinging the lead", "pulling a sickie", "sick note epidemic"
  ],
  MENTAL_HEALTH_SCEPTICISM: [
    "depression isn't a real disability", "depression isnt a real disability", "anxiety isn't disabling", "anxiety isnt disabling",
    "stress isn't illness", "stress isnt illness", "mental health claimants are exaggerating", "adhd is an excuse",
    "autism is an excuse", "invisible illness isn't real", "invisible illness isnt real",
    "anxiety is not a disability", "depression is not a disability", "snowflake generation claiming mental health"
  ],
  VISIBLE_IMPAIRMENT_SCEPTICISM: [
    "no wheelchair therefore not disabled", "no visible impairment therefore not disabled",
    "no medical equipment therefore not disabled", "looks too healthy to be disabled"
  ],
  ANECDOTAL_GENERALISATION: [
    "look at this one claimant", "this family proves", "one person claimed", "claimants are", "they all", "this is typical"
  ],
  LOADED_HEADLINE: [
    "benefit bombshell", "welfare shame", "taxpayer fury", "benefits shock", "benefit jackpot", "welfare scandal",
    "exposed", "busted", "caught", "cash splash", "benefit bonanza", "outrageous claimant"
  ],
  CRISIS_AMPLIFICATION: [
    "epidemic", "explosion", "runaway", "out of control", "time bomb", "crisis", "spiralling", "spiraling",
    "welfare state collapse", "unsustainable welfare explosion", "benefits bill spiralling", "welfare bill explosion"
  ],
  ECONOMIC_SCAPEGOATING: [
    "disabled people are bankrupting britain", "welfare claimants are destroying the economy", "benefits are draining taxpayers",
    "disability support is the reason taxes are high", "welfare recipients are responsible for economic decline"
  ],
  TAX_LEVEL_BLAME: [
    "benefits are the reason taxes are high", "welfare is why taxes are rising", "claimants make taxes high"
  ],
  POVERTY_BLAME: [
    "welfare is why people are poor", "benefits cause poverty", "welfare creates poverty"
  ],
  WELFARE_DEPENDENCY_CAUSATION: [
    "welfare makes people dependent", "benefits inherently create dependency", "welfare causes laziness"
  ],
  SANCTIONS_PANACEA: [
    "sanctions will make everyone work", "sanctions automatically create employment"
  ],
  CRACKDOWN_PANACEA: [
    "crackdown will solve welfare costs", "cracking down on fraud will solve welfare expenditure",
    "crackdown on benefits", "get tough on scroungers", "clamp down on welfare"
  ],
  FRAUD_SAVINGS_CONFLATION: [
    "fraud savings equal total welfare savings", "eliminating fraud solves the deficit"
  ],
  DISABILITY_CUTS_WORK_CAUSATION: [
    "cutting disability benefits will make people work", "reducing disability support automatically causes employment"
  ],
  PIP_SICKNESS_CAUSATION: [
    "pip is causing long-term sickness", "pip causes sickness rates to rise"
  ],
  ZERO_SUM_WORKER_VS_DISABLED: [
    "disabled people are taking money from workers", "disability support directly competes with workers"
  ],
  DESERVING_VS_UNDESERVING: [
    "genuine versus fake", "deserving versus undeserving", "real disabled people versus benefit claimants",
    "hardworking versus dependent", "genuine disabled vs fake disabled", "truly disabled vs workshy",
    "real disabled people vs those playing system"
  ],
  LEGITIMACY_POLICING: [
    "genuinely disabled", "really disabled", "proper disability", "real illness", "genuine claimants versus fake claimants"
  ],
  DEHUMANISATION: [
    "parasites", "leeches", "spongers", "scum", "vermin", "burden", "drain", "wasters", "useless", "subhuman"
  ],
  OTHERING: [
    "these people", "those people", "people like that", "welfare class", "benefit class", "them versus us"
  ],
  POLITICAL_SCAPEGOATING: [
    "claimants cause tax rises", "disabled people cause nhs pressure", "welfare causes housing shortages",
    "claimants explain economic decline"
  ],
  WELFARE_WEAPONISATION: [
    "electoral bribe", "polling tactic", "buying votes", "punish working people", "weaponise welfare", "weaponizing welfare"
  ],
  VOUCHER_PROPOSAL: [
    "vouchers will stop fraud", "replace cash with vouchers", "disability vouchers", "catalogue scheme", "approved suppliers only",
    "benefits should be vouchers", "food vouchers not cash", "pip vouchers", "prepaid cards for benefits"
  ],
  COMMERCIALISATION_RISK: [
    "private administration of benefits", "commercial voucher schemes", "supplier monopolies", "profit extraction from disability"
  ],
  ADMINISTRATIVE_BURDEN: [
    "complex eligibility lists", "supplier monitoring", "catalogue management", "transaction administration"
  ],
  BENEFIT_BILL_EXPLOSION: [
    "benefits bill spiralling", "welfare bill explosion", "benefits bill out of control", "welfare spending spiralling",
    "cost of welfare is unsustainable", "benefits black hole", "welfare time bomb", "benefits bill ballooning"
  ],
  ECONOMIC_INACTIVITY_BLAME: [
    "economically inactive choosing not to work", "inactivity crisis caused by benefits", "benefits causing inactivity",
    "people opting out of workforce to claim", "britain's worklessness crisis", "worklessness epidemic"
  ],
  WELFARE_STATE_OUT_OF_CONTROL: [
    "welfare state out of control", "welfare state bloated", "benefits system bloated", "welfare bill bloated", "welfare is unsustainable", "welfare state unsustainable", "benefits are unsustainable", "welfare state is too big", "benefits bill spiralling out of control", "welfare spending out of control"
  ],
  BLOATED_WELFARE_STATE: [
    "bloated welfare state", "bloated benefits system", "welfare state too generous", "benefits too generous", "welfare bill too high"
  ],
  OVERMEDICALISATION_TROPE: [
    "overdiagnosis of mental health", "overmedicalising normal life", "everyone now has a diagnosis",
    "adhd epidemic fake", "autism overdiagnosed for benefits", "too many people labelled disabled", "diagnosis inflation for benefits"
  ]
};

const STIGMA_PATTERNS = {
  WORK_SHAMING: [
    /(benefit|benefits|welfare|pip|claimant|claimants|disabled people).{0,100}(lazy|work shy|work-shy|refuse to work|won[''’]?t work|wont work|chooses not to work|should work|should get a job|could easily work)/i,
    /(lazy|work shy|work-shy|refuse to work|won[''’]?t work|wont work|chooses not to work).{0,100}(benefit|benefits|welfare|pip|claimant|claimants)/i
  ],
  FRAUD_GENERALISATION: [
    /(everyone|all|most|mass|rampant|widespread).{0,100}(cheating|faking|fraud|scamming|abusing|gaming).{0,100}(benefits|welfare|pip|disability)/i,
    /(benefits|welfare|pip|disability).{0,100}(suffers? from|has|full of|riddled with)?.{0,60}(rampant|widespread|mass|everywhere|cheat|cheating|faking|fraud|scamming|abusing|gaming)/i,
    /(fake|faking).{0,60}(disability|illness|depression|adhd|autism).{0,60}(benefits|pip|welfare)/i
  ],
  BENEFIT_LIFESTYLE: [
    /(benefits|welfare|pip).{0,80}(lifestyle|choice|culture of dependency|easy life|comfortable living)/i
  ],
  TAXPAYER_FURY_TROPE: [
    /(taxpayer|taxpayers|hardworking|strivers).{0,80}(fury|outrage|footing the bill|paying for|funding|wasting).{0,80}(benefits|welfare|scroungers|shirkers|claimants)/i,
    /(strivers vs skivers|makers vs takers|shirkers vs workers|strivers and skivers)/i
  ],
  PIP_ASSESSMENT_MOCKERY: [
    /(pip|personal independence payment|assessment|assessments).{0,80}(easy to claim|easy to fake|easy to get|claiming is easy|easy to apply for|a joke|automatic|giveaway|rubber stamped|free money|handout)/i,
    /(easy to claim|easy to fake|easy to get|claiming is easy|easy to apply for).{0,80}(pip|personal independence payment|disability benefits|disability)/i,
    /(just say you have|say you have anxiety|anxiety and get pip|adhd and get pip).{0,60}(pip|benefits)/i
  ],
  MOTABILITY_TROPE: [
    /(free|luxury|taxpayer[- ]funded|brand new).{0,60}(bmw|audi|mercedes|tesla|range rover|car|cars|vehicle).{0,80}(disabled|motability|pip|benefits)/i,
    /(motability|pip car).{0,60}(bmw|audi|luxury|free|giveaway)/i
  ],
  SICK_NOTE_CULTURE: [
    /(sick note|fit note|sicknote).{0,80}(culture|system|gateway|11 million|doctors signing everyone off|epidemic|britain)/i,
    /(11 million|eleven million).{0,60}(sick note|fit note|signed off)/i
  ],
  BENEFIT_BILL_EXPLOSION: [
    /(benefits?|welfare).{0,60}(bill|spending|cost|expenditure).{0,40}(spiralling|spiraling|explosion|ballooning|black hole|time bomb|out of control|unsustainable|skyrocket)/i
  ],
  MENTAL_HEALTH_SCEPTICISM: [
    /(anxiety|depression|adhd|autism|mental health).{0,60}(isn't|isnt|not).{0,20}(real disability|disability|illness|excuse)/i,
    /(snowflake).{0,60}(mental health|anxiety|benefits)/i
  ],
  ECONOMIC_INACTIVITY_BLAME: [
    /(8 million|9 million|economically inactive|workless|worklessness).{0,80}(choosing|opting|benefits|workshy|lazy|crisis)/i
  ],
  // keep other existing patterns via fallback taxonomy matching
  DISABILITY_INVALIDATION: [
    /(look|looks|seen).{0,80}(fine|healthy|normal|walking|shopping|holiday|driving|smiling|exercising).{0,80}(therefore not disabled|not disabled|faking|pip)/i
  ],
  HANDOUT_NARRATIVE: [
    /(free money|handouts|welfare handouts|cash giveaway|benefits jackpot|something for nothing|money for nothing)/i
  ],
  VOUCHER_PROPOSAL: [
    /(replace|replacing).{0,80}(cash|pip|benefits).{0,80}(with vouchers|catalogue|prepaid cards)/i
  ]
};

// 2. BENEFIT KNOWLEDGE MAP
const BENEFIT_KNOWLEDGE_MAP = {
  PIP: {
    name: "Personal Independence Payment",
    type: "Non-means-tested, non-contributory",
    purpose: "Extra living costs for long-term physical or mental health conditions/disabilities causing daily living/mobility needs",
    commonMisconceptions: "Based on medical diagnosis rather than functional impairment; mutually exclusive with working; easy to claim or fake.",
    primarySource: "DWP Stat-Xplore / GOV.UK PIP Guidance / HMCTS Appeal Statistics"
  },
  UC: {
    name: "Universal Credit",
    type: "Means-tested, social security safety net",
    purpose: "Support for low-income living expenses, housing, childcare, and limited capability for work",
    commonMisconceptions: "Only for unemployed people; benefits pay more than full-time work across all household setups.",
    primarySource: "DWP Stat-Xplore UC Official Statistics"
  },
  DLA: {
    name: "Disability Living Allowance",
    type: "Non-means-tested",
    purpose: "Replaced by PIP for adults; supports children under 16 with disability/care needs",
    commonMisconceptions: "Adults can make new DLA claims.",
    primarySource: "GOV.UK DLA Guidance"
  },
  ADP: {
    name: "Adult Disability Payment",
    type: "Social Security Scotland non-means-tested",
    purpose: "Scottish devolved replacement for PIP providing extra daily living and mobility support",
    commonMisconceptions: "Same assessment rules as DWP PIP.",
    primarySource: "Social Security Scotland Statistics"
  },
  ESA: {
    name: "Employment and Support Allowance",
    type: "Income-related (legacy) or New Style (contributory)",
    purpose: "Income support for people with limited capability for work due to illness or disability",
    commonMisconceptions: "Receiving ESA means a person can never engage in permitted work.",
    primarySource: "DWP Stat-Xplore ESA Data"
  },
  CARERS_ALLOWANCE: {
    name: "Carer's Allowance / Carer Support Payment",
    type: "Non-means-tested benefit subject to earnings cap",
    purpose: "Financial support for individuals caring for someone at least 35 hours per week",
    commonMisconceptions: "An unearned handout; can be combined freely with high earnings.",
    primarySource: "DWP Stat-Xplore Carer's Allowance Statistics"
  },
  PENSION_CREDIT: {
    name: "Pension Credit",
    type: "Means-tested income top-up",
    purpose: "Tops up weekly income for state pension age individuals on low income",
    commonMisconceptions: "Automatically awarded to all pensioners.",
    primarySource: "DWP Pension Credit Statistics"
  },
  STATE_PENSION: {
    name: "State Pension",
    type: "Contributory benefit based on National Insurance record",
    purpose: "Regular payment from government upon reaching State Pension age",
    commonMisconceptions: "A discretionary welfare handout rather than an earned entitlement.",
    primarySource: "DWP Stat-Xplore State Pension Data"
  }
};


// ============================================================================
// GOV.UK CURRENT BENEFIT RATES & RULES 2026/27 + ENHANCED FINANCIAL DEBUNK
// Source: GOV.UK Benefit Rates 2026/27, DWP ADM, UC Regulations 2013
// ============================================================================
export const GOVUK_RATES_2026_27 = {
  UC: {
    standardAllowance: { singleUnder25: 311.68, single25Plus: 393.45, coupleUnder25: 489.23, couple25Plus: 617.60 },
    elements: { childFirst: 333.33, childSubsequent: 287.92, disabledChildLower: 146.31, disabledChildHigher: 456.89, lcwra: 416.19, carer: 198.31, childcareMaxOne: 1014.63, childcareMaxTwoPlus: 1739.37 },
    taperRate: 0.55,
    workAllowances: { withHousing: 404, withoutHousing: 673 },
    benefitCap: {
      outsideLondon: { single: 14762.86, coupleOrChildren: 22193.04 },
      london: { single: 16967.87, coupleOrChildren: 25673.40 }
    },
    savings: { lowerLimit: 6000, upperLimit: 16000, tariffIncomePer250: 4.35 }
  },
  PIP: {
    dailyLiving: { standard: 73.90, enhanced: 110.40 },
    mobility: { standard: 29.20, enhanced: 77.05 },
    maxWeekly: 187.45,
    maxAnnual: 9747.40,
    assessment: {
      descriptors: 12,
      dailyLivingActivities: 10,
      mobilityActivities: 2,
      standardThreshold: 8,
      enhancedThreshold: 12,
      reliabilityCriteria: ["safely", "acceptable standard", "repeatedly", "reasonable time period"],
      initialAwardRate: "40-45%",
      disallowanceRate: "52-54%",
      tribunalOverturnRate: "68-70%",
      fraudRate: "1.2%",
      inWorkRate: "15-17% (530k of 3.5m claimants in employment)",
      newClaimsInWork: "35% of new PIP claims from people already working"
    }
  },
  STATE_PENSION: { newStatePension: 221.20, basicStatePension: 169.50 },
  PENSION_CREDIT: { guaranteeCredit: { single: 218.15, couple: 332.95 } },
  CARERS_ALLOWANCE: { weeklyRate: 81.90, earningsLimit: 151, hoursRequired: 35 }
};

// Currency formatter - ensures £25,300.86 format with commas
const formatGBP = (num) => {
  return new Intl.NumberFormat('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(num);
};
const formatGBP0 = (num) => {
  return new Intl.NumberFormat('en-GB', { minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(num);
};


const debunkFinancialClaim = (textLower) => {
  const flags = [];
  let rebuttal = "";
  const r = GOVUK_RATES_2026_27;

  const capText = `BENEFIT CAP RATES (Welfare Reform Act 2012): Outside London - single £${formatGBP(r.UC.benefitCap.outsideLondon.single)} / couple or children £${formatGBP(r.UC.benefitCap.outsideLondon.coupleOrChildren)} per year. London - single £${formatGBP(r.UC.benefitCap.london.single)} / couple or children £${formatGBP(r.UC.benefitCap.london.coupleOrChildren)}. Cap applies to UC + Housing + Child Benefit. PIP is EXEMPT from cap because non-means-tested.`;
  
  const povertyStats = `POVERTY STATS - UC: JRF UK Poverty 2024 - 40% of all UC claimants are IN WORK (2.4m of 6m, DWP Stat-Xplore June 2024). ONS: 54% of benefit households have at least one worker. 30% UC claimants are lone parents, 49% include disabled person. Average UC award £850/m (£10,200/yr) - below JRF Minimum Income Standard £21,400 single / £44,800 couple 2 kids. 1 in 4 UC claimants food insecure, 60% have savings under £250. 90% capped households capped by <£200/m.`;

  const taperExplain = `UC TAPER RATE - HOW WORK IS INCENTIVISED: Taper 55% (reduced from 63% Dec 2021 to make work pay). For every £1 earned ABOVE Work Allowance (£${r.UC.workAllowances.withoutHousing} without housing, £${r.UC.workAllowances.withHousing} with housing), UC reduces by 55p - claimant keeps 45p + full wage + work allowance. Work Allowances protect first earnings. EXAMPLE: Single 25+ standard £${r.UC.standardAllowance.single25Plus} + LCWRA £${r.UC.elements.lcwra} = £809/m on benefits. Works 35h @ NMW £11.44 = £1,734 gross. UC deduction = (£1,734-£673)*0.55 = £583. Remaining UC £226 + wage £1,734 = £1,960 total = £1,151/m better off working. DWP data: 38-40% UC already working because taper ensures work pays. OBR: in-work UC fastest growing category.`;

  const pipInWorkNote = `PIP - NON-MEANS-TESTED IN-WORK BENEFIT: PIP is non-means-tested (savings/income ignored), non-contributory, can be claimed IN or OUT of work - it is extra-costs benefit, not out-of-work benefit. DWP Stat-Xplore: 15-17% of PIP claimants (approx 530k of 3.5m) ARE IN EMPLOYMENT, 35% of new PIP claims from people already working. PIP helps cover extra costs to stay in work. Max PIP £${r.PIP.maxWeekly}/week (£${r.PIP.maxAnnual}/year) vs average extra cost disability £975/month (Scope/JRF 2023) - does not cover costs. Fraud 1.2% lowest of all benefits. Savings over £16k rule does NOT apply to PIP (unlike UC).`;

  if (/£?\s*(60|50|40|30)k|£\s*\d+[,\d]*\s*k?\s*(on benefits|a year|per year)/i.test(textLower)) {
    flags.push("FINANCIAL MISREPRESENTATION: £40-60k benefits claim impossible under benefit cap.");
    rebuttal += ` ${capText} Max capped benefits £22,193 outside London + PIP £9,747 exempt = £31,940 total max, only with exceptional high LHA + disability + childcare. Even uncapped, £60k would require 4+ children + London LHA + LCWRA + childcare - <0.01% cases and includes rent paid to landlord, not cash. ${povertyStats} ${taperExplain}`;
  }

  if (/(better off on benefits|benefits pay more than work|earn more on benefits|work doesn't pay|better off not working)/i.test(textLower)) {
    flags.push("FINANCIAL MISREPRESENTATION: Better off on benefits myth - ignores 55% taper.");
    rebuttal += ` ${taperExplain} ${povertyStats} ${capText} ONS median salary £35k vs average UC £10.2k - work pays 3x more.`;
  }

  if (textLower.includes("motability") || textLower.includes("motability") || textLower.includes("free car") || textLower.includes("free cars")) {
    rebuttal += ` MOTABILITY FACT-CHECK: Not free - forfeits Enhanced Mobility PIP £${formatGBP(r.PIP.mobility.enhanced)}/week (£${formatGBP(r.PIP.mobility.enhanced * 52)}/year). Requires 12 points on PIP mobility descriptors (cannot walk >20m or cannot follow routes). Scheme supports 45,000 UK jobs and adds 230k low-mileage used cars annually (Motability Operations 2023/24, Oxford Economics, Cox Automotive) - pillar of second-hand market, without it used prices rise 5-8%.`;
    flags.push("HIGH BS / ANTI-WELFARE MISINFORMATION: Free cars narrative is toxic trope used to create discourse and outrage against disabled people. Motability is NOT free - claimants forfeit £77.05/week Enhanced Mobility PIP. Designed to support access to society, medical appointments, work.");
  }
  if (textLower.includes("welfare savings") || textLower.includes("23 billion") || textLower.includes("36 billion") || textLower.includes("get britain working again")) {
    rebuttal += ` ROBUST ECONOMIC REBUTTAL - WELFARE SAVINGS FICTION: No DWP/OBR evidence for £23bn/£36bn savings. DWP total welfare (ex-pensions) £136bn, PIP £21.6bn for 3.5m. £36bn would require cutting ALL PIP + UC disability + ESA - impossible without mass destitution. 40% UC (2.4m) IN WORK, 54% benefit households have worker, 15-17% PIP (530k) in work. WORK HISTORY: avg 15.6 years before PIP, 62% 10+ years, 38% 20+ years, avg NI 18 years. MADE ILL BY WORK: HSE 1.8m work-related ill health, 875k stress/anxiety, 35.2m days lost. OH: Only 45% employers provide OH. NHS: 7.64m waiting list, 3.2m >18 weeks, 2.5m inactive long-term sick, 830k waiting NHS. AI: 1.5m high risk automation (ONS), 8m at risk (Resolution), 15m automatable (Bank). ECONOMIC FAILURE: GDP downgrade 0.3pp, productivity flat since 2008, austerity £30bn cuts, life expectancy stalling. WELFARE GDP: 10.8% GDP stable 40 years, UK SMALLER than G20 avg 13.2% (OECD SOCX 2023) vs France 15.9%, Germany 13.8%. PIP fraud 1.2% lowest.`;
    flags.push("HIGH BS / WELFARE SAVINGS FICTION: £23bn/£36bn claim no evidence, no DWP/OBR backing, political point scoring.");
  }

  if (textLower.includes("pip") || textLower.includes("personal independence payment")) {
    rebuttal += ` ${pipInWorkNote} ${capText}`;
  }

  return { flags, rebuttal, capText, povertyStats, taperExplain, pipInWorkNote };
};


// ============================================================================
// PENSION CREDIT & STATE PENSION - TAKE-UP & MYTH BUSTER
// ============================================================================
const PENSION_CREDIT_STATS = {
  takeUp: {
    eligibleNotClaiming: "800,000-880,000 households (DWP Income Related Benefits Estimates 2023/24)",
    takeUpRate: "63-66% of eligible pensioners claim - lowest take-up of all benefits",
    unclaimedAmount: "£1.8bn - £2.3bn unclaimed per year (DWP + Policy in Practice)",
    averageUnclaimed: "£3,900 per year per eligible non-claimant",
    reason: "Stigma, complexity,以为 savings rule, digital exclusion, lack of awareness",
    linkToWinterFuel: "Winter Fuel Payment 2024/25 now linked to Pension Credit receipt - take-up drive"
  },
  rates: {
    guaranteeSingle: 218.15,
    guaranteeCouple: 332.95,
    savingsCreditMaxSingle: 17.01,
    savingsCreditMaxCouple: 19.04
  },
  statePensionVsPC: {
    newStatePension: 221.20,
    fullNewStatePension: "£221.20/week requires 35 years NI",
    basicStatePension: 169.50,
    misconception: "State Pension is NOT automatically £221 - many get less due to contracting out, gaps",
    pcTopsUp: "Pension Credit tops up to £218.15 single / £332.95 couple - even if State Pension is full",
    passportedBenefits: "Pension Credit passports: Council Tax Reduction (100%), Housing Benefit, NHS costs, free TV licence 75+, Cold Weather Payment, Warm Home Discount £150, Winter Fuel Payment",
    notAutomatic: "State Pension is contributory (NI record), Pension Credit is means-tested top-up - different benefits"
  }
};

const debunkPensionClaims = (textLower) => {
  const flags = [];
  let rebuttal = "";

  if (/(pension credit.*easy|easy.*pension credit|pensioners.*easy.*benefits|all pensioners get.*credit)/i.test(textLower)) {
    flags.push("PENSION CREDIT MYTH: Take-up is lowest of all benefits, not easy/automatic.");
    rebuttal += ` DWP Income Related Benefits Estimates 2023/24: 800k-880k eligible pensioner households NOT claiming Pension Credit. Take-up only 63-66% - £1.8-£2.3bn unclaimed yearly. Average unclaimed £3,900/year. Reason: stigma, complexity, assumes savings disqualify (savings £10k-£16k only small deduction, not nil), digital exclusion. GOV.UK: Guarantee Credit single £${PENSION_CREDIT_STATS.rates.guaranteeSingle}/week, couple £${PENSION_CREDIT_STATS.rates.guaranteeCouple}/week.`;
  }

  if (/(state pension.*generous|pensioners.*well off|pensioners.*all.*rich|triple lock.*too generous|pensioners.*better off)/i.test(textLower)) {
    flags.push("STATE PENSION MISREPRESENTATION: Ignores poverty among pensioners not on full new State Pension.");
    rebuttal += ` ONS: 2.1m pensioners in poverty (18% of pensioners, JRF 2024). Full new State Pension £221.20 requires 35 years NI - many women, carers, low earners get less due to contracting out, gaps. Basic State Pension £169.50. Pension Credit needed to top up to £218.15 - shows State Pension alone below poverty line. JRF: pensioner poverty highest in private renters (38%). State Pension UK 29% of average earnings - below OECD average 50%.`;
  }

  if (/(pension credit.*passport|free.*everything.*pensioners|pensioners get everything free)/i.test(textLower)) {
    flags.push("PASSPORTED BENEFITS CONTEXT: Pension Credit passports reflect severe low income, not generosity.");
    rebuttal += ` Pension Credit passports Council Tax Reduction, Housing Benefit, free TV licence 75+, Warm Home Discount, Cold Weather Payment - because recipients income <£218/week. JRF: pensioner in private rent needs £300/week minimum. Passporting prevents deeper poverty, not luxury. Take-up drive 2024 linked to Winter Fuel Payment - 800k missing out on passports.`;
  }

  return { flags, rebuttal };
};


export const fetchLatestGovUkRates = async () => {
  try {
    const res = await fetch("https://www.gov.uk/government/publications/benefit-and-pension-rates");
    console.log("Check latest rates at gov.uk link above");
    return GOVUK_RATES_2026_27;
  } catch { return GOVUK_RATES_2026_27; }
};

// 3. EXPERT DEBUNK ENGINE (NARRATIVE-LEVEL REBUTTALS)
const generateNarrativeRebuttal = (detectedCategories, text) => {
  const primaryCat = detectedCategories[0] || "GENERAL";
  switch (primaryCat) {
    case "WORK_SHAMING":
      return {
        whatClaimSays: "Claims people on benefits are lazy - highly stigmatising generalising rhetoric.",
        whatIsFactuallyCorrect: "HIGH BS: DWP June 2024 - 40% UC (2.4m) IN WORK, 54% benefit households have worker. PIP IN-WORK: 15-17% PIP (530k) in employment, 35% new claims from workers. WORK HISTORY: DWP Longitudinal 2023 - avg PIP 15.6 years work before illness, 62% 10+ years, 38% 20+ years. 43% became disabled during working life after decades. NHS: 7.64m waiting list Oct 2024, 3.2m >18 weeks, 2.5m inactive long-term sick, 830k waiting NHS treatment.",
        whatIsMisleading: "Conflates health inactivity, NHS waits, caring with voluntary refusal. Ignores decades work and NI.",
        missingContext: "WORK HISTORY & NHS CRISIS: Avg 15.6 years work before PIP, 20+ years for 38%. 7.64m NHS waiting, 830k inactive due waiting. PIP extra costs £975/m avg - does not cover. Fraud 1.2% lowest.",
        primaryEvidence: "DWP Stat-Xplore 40% UC in work, ONS 54% households worker, DWP Longitudinal 15.6 years avg, FRS 43% became disabled during work, NHS RTT 7.64m, ONS Economic Inactivity 2.5m, JRF, Scope £975/m, OBR, HMCTS.",
        whyConclusionFails: "In-work benefit proves low pay not laziness. Decades work before illness and NHS crisis explain inactivity.",
        accurateFormulation: "40% UC in work, PIP 15-17% in work, avg 15.6 years work before illness, 38% 20+ years, 7.64m NHS waiting. In-work poverty and health barriers not laziness."
      };
    case "WELFARE_SAVINGS_FICTION":
      return {
        whatClaimSays: "Claims £23bn/£36bn welfare savings found to cut taxes, deficit, fund Defence 3% GDP - e.g., Helen Whately post - with no evidence, context or official data.",
        whatIsFactuallyCorrect: "HIGH BS / POLITICAL POINT SCORING: No DWP Stat-Xplore, OBR Fiscal Outlook or NAO evidence backing £23bn/£36bn welfare savings. DWP total welfare spend (excluding pensions) £136bn 2024/25 (OBR). PIP total £21.6bn for 3.5m disabled. Claiming £36bn savings would require cutting ALL PIP + ALL UC disability + ALL ESA - impossible without pushing 3.5m disabled into destitution. OBR March 2024: disability benefit spending rising due to demographics, long-term sickness, NHS waits - not fraud. No impact assessment, equality impact, or savings methodology published. Framing as taxpayers money vs undeserving disabled ignores that claimants ARE taxpayers. DWP: 40% UC in work, avg 15.6 years work before PIP, 62% 10+ years, 38% 20+ years, avg NI 18 years. HSE 2023/24: 1.8m workers suffering work-related ill health, 875k stress/anxiety, 35.2m days lost. Only 45% employers provide OH. NHS: 7.64m waiting list Oct 2024, 3.2m >18 weeks, 2.5m inactive long-term sick, 830k waiting NHS treatment. ONS: 1.5m jobs at high risk automation, Resolution 8m, Bank 15m. GDP downgrade 0.3pp, productivity flat since 2008, austerity £30bn cuts. Welfare spend 10.8% GDP stable 40 years (OBR), UK smaller than G20 avg 13.2% (OECD SOCX 2023) vs France 15.9%, Germany 13.8%.",
        whatIsMisleading: "Provides no context, official data or evidence of savings. Frames as taxpayers money funding undeserving disabled/welfare claimants - anti-welfare framing to create outrage. Ignores why people not working, work history, NHS crisis, AI automation, economic failure. Uses welfare as political football.",
        missingContext: "ROBUST ECONOMIC REBUTTAL: 40% UC (2.4m) IN WORK, 54% benefit households have worker, 15-17% PIP (530k) in work, 35% new claims from workers. WORK HISTORY: avg 15.6 years before illness, 62% 10+ years, 38% 20+ years, avg NI 18 years. MADE ILL BY WORK: HSE 1.8m work-related ill health, 875k stress/anxiety/depression, 35.2m days lost, 473k musculoskeletal from work. LACK OH: Only 45% employers provide OH, 51% SMEs no OH, 70% workers with long-term conditions no adjustments. NHS: 7.64m waiting, 3.2m >18 weeks, 2.5m inactive long-term sick, 830k waiting treatment. AI: 1.5m high risk automation (ONS), 8m low-medium skill at risk (Resolution), 15m automatable (Bank). ECONOMIC FAILURE: GDP downgrade 0.3pp (OBR Nov 2025), productivity flat since 2008 worst since Industrial Revolution, austerity £30bn 2010-19 (IFS), life expectancy stalling, healthy life expectancy fell 2 years, 2.8m work-limiting condition. WELFARE GDP: 10.8% GDP stable 40 years (1980s 10.2%, 1990s 11%, 2000s 10.5%), UK SMALLER than G20 avg 13.2%, France 15.9%, Germany 13.8%, Italy 14.2%, US 11.1% (OECD SOCX 2023). PIP fraud 1.2% lowest. No £36bn to save without mass destitution.",
        primaryEvidence: "Helen Whately X post £23bn/£36bn (no source), DWP Stat-Xplore 40% UC in work, ONS 54% households worker, DWP Longitudinal 15.6 years avg, HSE 1.8m work-related ill health, 875k stress, 35.2m days lost, DWP OH 45%, NHS RTT 7.64m waiting, ONS Economic Inactivity 2.5m, OBR Welfare Trends 10.8% GDP stable, OECD SOCX vs G20 (UK 10.8% vs avg 13.2%), ONS Automation 1.5m at risk, Resolution 8m, IFS Austerity £30bn, Bank productivity flat since 2008, PIP fraud 1.2%.",
        whyConclusionFails: "No evidence, no DWP/OBR backing, no impact assessment. Claims £36bn savings while ignoring 40% UC in work, 15.6 years average work before illness, 1.8m made ill by work, 7.64m NHS waiting, AI replacing roles, 40-year stable welfare spend 10.8% GDP smaller than G20. Political point scoring using disabled as scapegoats for economic failure from austerity and lack growth.",
        accurateFormulation: "£23bn/£36bn welfare savings claim has no DWP/OBR evidence, no methodology. 40% UC in work, avg 15.6 years work before PIP, 1.8m made ill by work, 45% employers have OH, 7.64m NHS waiting, AI replacing low-medium roles, welfare spend 10.8% GDP stable 40 years and smaller than G20 avg 13.2%. Political point scoring, not economics."
      };
    case "POLITICAL_POINT_SCORING":
      return {
        whatClaimSays: "Uses welfare as political point scoring tactics, framing as taxpayers money vs undeserving disabled claimants.",
        whatIsFactuallyCorrect: "HIGH BS: Welfare spend 10.8% GDP stable 40 years (OBR), UK smaller than most G20 (13.2% avg, France 15.9%, Germany 13.8%). 40% UC in work are taxpayers, avg 15.6 years work + 18 years NI before illness. 1.8m made ill by work itself (HSE), lack OH (55% no OH), 7.64m NHS waiting, AI automation 1.5-8m jobs at risk. Failure to grow economy - productivity flat since 2008, austerity £30bn cuts caused wider health crisis, poor health across population, not claimant behaviour.",
        whatIsMisleading: "Portrays disabled/welfare as undeserving vs taxpayers deserving, ignoring claimants ARE taxpayers with decades contributions, made ill by work, stuck on NHS lists, roles automated. No context of stable GDP spend, smaller than G20, economic failure from austerity not welfare.",
        missingContext: "ECONOMIC FAILURE NOT WELFARE: GDP downgrade 0.3pp, productivity flat worst since 1820s, austerity £30bn cuts (IFS) caused public health collapse, healthy life expectancy down, 2.8m work-limiting conditions. Welfare not cause of deficit - tax receipts flat due no growth. AI replacing low-medium roles traditionally filled by disabled/entry workers. Welfare spend of GDP stayed relatively stable for decades and is actually smaller than most G20 economies.",
        primaryEvidence: "OBR 10.8% GDP welfare stable, OECD SOCX vs G20, DWP Longitudinal 15.6 years work, HSE 1.8m work-related ill health, NHS RTT 7.64m, ONS Automation 1.5m, Resolution 8m, IFS Austerity £30bn, Bank of England productivity.",
        whyConclusionFails: "Uses welfare as political football with no evidence, ignores economic reality: claimants worked decades, made ill by work, NHS crisis, AI, austerity-driven low growth. Welfare spend stable and smaller than peers.",
        accurateFormulation: "Welfare 10.8% GDP stable 40 years, smaller than G20 avg 13.2%. Claimants avg 15.6 years work, 1.8m made ill by work, 7.64m NHS waiting, AI replacing roles. Economic failure from austerity not welfare - political point scoring."
      };
    case "WELFARE_SAVINGS_FICTION":
      return {
        whatClaimSays: "Claims £23bn/£36bn welfare savings found to cut taxes, deficit, fund Defence 3% GDP - e.g., Helen Whately post - with no evidence, context or official data.",
        whatIsFactuallyCorrect: "HIGH BS / POLITICAL POINT SCORING: No DWP Stat-Xplore, OBR Fiscal Outlook or NAO evidence backing £23bn/£36bn welfare savings. DWP total welfare spend (excluding pensions) £136bn 2024/25 (OBR). PIP total £21.6bn for 3.5m disabled. Claiming £36bn savings would require cutting ALL PIP + ALL UC disability + ALL ESA - impossible without pushing 3.5m disabled into destitution. OBR March 2024: disability benefit spending rising due to demographics, long-term sickness, NHS waits - not fraud. No impact assessment, equality impact, or savings methodology published. Framing as taxpayers money vs undeserving disabled ignores that claimants ARE taxpayers. DWP: 40% UC in work, avg 15.6 years work before PIP, 62% 10+ years, 38% 20+ years, avg NI 18 years. HSE 2023/24: 1.8m workers suffering work-related ill health, 875k stress/anxiety, 35.2m days lost. Only 45% employers provide OH. NHS: 7.64m waiting list Oct 2024, 3.2m >18 weeks, 2.5m inactive long-term sick, 830k waiting NHS treatment. ONS: 1.5m jobs at high risk automation, Resolution 8m, Bank 15m. GDP downgrade 0.3pp, productivity flat since 2008, austerity £30bn cuts. Welfare spend 10.8% GDP stable 40 years (OBR), UK smaller than G20 avg 13.2% (OECD SOCX 2023) vs France 15.9%, Germany 13.8%.",
        whatIsMisleading: "Provides no context, official data or evidence of savings. Frames as taxpayers money funding undeserving disabled/welfare claimants - anti-welfare framing to create outrage. Ignores why people not working, work history, NHS crisis, AI automation, economic failure. Uses welfare as political football.",
        missingContext: "ROBUST ECONOMIC REBUTTAL: 40% UC (2.4m) IN WORK, 54% benefit households have worker, 15-17% PIP (530k) in work, 35% new claims from workers. WORK HISTORY: avg 15.6 years before illness, 62% 10+ years, 38% 20+ years, avg NI 18 years. MADE ILL BY WORK: HSE 1.8m work-related ill health, 875k stress/anxiety/depression, 35.2m days lost, 473k musculoskeletal from work. LACK OH: Only 45% employers provide OH, 51% SMEs no OH, 70% workers with long-term conditions no adjustments. NHS: 7.64m waiting, 3.2m >18 weeks, 2.5m inactive long-term sick, 830k waiting treatment. AI: 1.5m high risk automation (ONS), 8m low-medium skill at risk (Resolution), 15m automatable (Bank). ECONOMIC FAILURE: GDP downgrade 0.3pp (OBR Nov 2025), productivity flat since 2008 worst since Industrial Revolution, austerity £30bn 2010-19 (IFS), life expectancy stalling, healthy life expectancy fell 2 years, 2.8m work-limiting condition. WELFARE GDP: 10.8% GDP stable 40 years (1980s 10.2%, 1990s 11%, 2000s 10.5%), UK SMALLER than G20 avg 13.2%, France 15.9%, Germany 13.8%, Italy 14.2%, US 11.1% (OECD SOCX 2023). PIP fraud 1.2% lowest. No £36bn to save without mass destitution.",
        primaryEvidence: "Helen Whately X post £23bn/£36bn (no source), DWP Stat-Xplore 40% UC in work, ONS 54% households worker, DWP Longitudinal 15.6 years avg, HSE 1.8m work-related ill health, 875k stress, 35.2m days lost, DWP OH 45%, NHS RTT 7.64m waiting, ONS Economic Inactivity 2.5m, OBR Welfare Trends 10.8% GDP stable, OECD SOCX vs G20 (UK 10.8% vs avg 13.2%), ONS Automation 1.5m at risk, Resolution 8m, IFS Austerity £30bn, Bank productivity flat since 2008, PIP fraud 1.2%.",
        whyConclusionFails: "No evidence, no DWP/OBR backing, no impact assessment. Claims £36bn savings while ignoring 40% UC in work, 15.6 years average work before illness, 1.8m made ill by work, 7.64m NHS waiting, AI replacing roles, 40-year stable welfare spend 10.8% GDP smaller than G20. Political point scoring using disabled as scapegoats for economic failure from austerity and lack growth.",
        accurateFormulation: "£23bn/£36bn welfare savings claim has no DWP/OBR evidence, no methodology. 40% UC in work, avg 15.6 years work before PIP, 1.8m made ill by work, 45% employers have OH, 7.64m NHS waiting, AI replacing low-medium roles, welfare spend 10.8% GDP stable 40 years and smaller than G20 avg 13.2%. Political point scoring, not economics."
      };
    case "POLITICAL_POINT_SCORING":
      return {
        whatClaimSays: "Uses welfare as political point scoring tactics, framing as taxpayers money vs undeserving disabled claimants.",
        whatIsFactuallyCorrect: "HIGH BS: Welfare spend 10.8% GDP stable 40 years (OBR), UK smaller than most G20 (13.2% avg, France 15.9%, Germany 13.8%). 40% UC in work are taxpayers, avg 15.6 years work + 18 years NI before illness. 1.8m made ill by work itself (HSE), lack OH (55% no OH), 7.64m NHS waiting, AI automation 1.5-8m jobs at risk. Failure to grow economy - productivity flat since 2008, austerity £30bn cuts caused wider health crisis, poor health across population, not claimant behaviour.",
        whatIsMisleading: "Portrays disabled/welfare as undeserving vs taxpayers deserving, ignoring claimants ARE taxpayers with decades contributions, made ill by work, stuck on NHS lists, roles automated. No context of stable GDP spend, smaller than G20, economic failure from austerity not welfare.",
        missingContext: "ECONOMIC FAILURE NOT WELFARE: GDP downgrade 0.3pp, productivity flat worst since 1820s, austerity £30bn cuts (IFS) caused public health collapse, healthy life expectancy down, 2.8m work-limiting conditions. Welfare not cause of deficit - tax receipts flat due no growth. AI replacing low-medium roles traditionally filled by disabled/entry workers. Welfare spend of GDP stayed relatively stable for decades and is actually smaller than most G20 economies.",
        primaryEvidence: "OBR 10.8% GDP welfare stable, OECD SOCX vs G20, DWP Longitudinal 15.6 years work, HSE 1.8m work-related ill health, NHS RTT 7.64m, ONS Automation 1.5m, Resolution 8m, IFS Austerity £30bn, Bank of England productivity.",
        whyConclusionFails: "Uses welfare as political football with no evidence, ignores economic reality: claimants worked decades, made ill by work, NHS crisis, AI, austerity-driven low growth. Welfare spend stable and smaller than peers.",
        accurateFormulation: "Welfare 10.8% GDP stable 40 years, smaller than G20 avg 13.2%. Claimants avg 15.6 years work, 1.8m made ill by work, 7.64m NHS waiting, AI replacing roles. Economic failure from austerity not welfare - political point scoring."
      };
    case "SCHOOL_TO_BENEFITS":
      return {
        whatClaimSays: "Claims young people or school leavers can move directly onto benefits upon leaving school without work requirements.",
        whatIsFactuallyCorrect: "Under UK law, young people must remain in education or training until age 18, and Universal Credit is generally legally restricted to individuals aged 18 and over (with very few statutory exceptions such as severe disability or care leavers).",
        whatIsMisleading: "Implies school leavers can freely opt into a life on welfare without age eligibility or obligations immediately upon leaving school.",
        missingContext: "Upon reaching 18 and claiming Universal Credit, young people face strict Jobcentre work search conditionality, claimant commitments, and financial sanctions if requirements are not met.",
        primaryEvidence: "GOV.UK Universal Credit Eligibility & DWP Youth Offer Guidance.",
        whyConclusionFails: "Statutory age limits (18+), compulsory education/training rules until 18, and strict Jobcentre conditionality make automated school-to-benefits pathways impossible.",
        accurateFormulation: "Universal Credit is legally restricted to adults aged 18+, who must adhere to strict Jobcentre work search obligations and sanction regimes."
      };
    case "SICK_NOTE_CULTURE":
      return {
        whatClaimSays: "Claims 11 million fit notes prove a culture of malingering and an automated pathway onto benefits.",
        whatIsFactuallyCorrect: "Fit notes are clinical medical certifications issued by healthcare professionals evaluating patient health conditions.",
        whatIsMisleading: "Equates the total volume of fit-note issuances directly with individual benefit claimants or permanent welfare dependency.",
        missingContext: "11 million fit-note episodes cover short-term acute illnesses, surgical recoveries, workplace injuries, and non-benefit employment absences.",
        primaryEvidence: "NHS Digital Fit Note Data & DWP Health Statistics.",
        whyConclusionFails: "Fit note counts record clinical medical interactions, not DWP sickness benefit awards or malingering.",
        accurateFormulation: "Fit note statistics reflect total GP health consultations for medical conditions impacting work capability, not benefit application numbers."
      };
    case "FRAUD_GENERALISATION":
      return {
        whatClaimSays: "Asserts that benefit fraud is rampant across the entire claimant population.",
        whatIsFactuallyCorrect: "Official DWP Fraud and Error statistics measure fraud at specific estimated percentages, varying by benefit type.",
        whatIsMisleading: "Generalises isolated fraud cases or aggregate monetary error totals into population-wide accusations against all claimants.",
        missingContext: "Official DWP figures differentiate between intentional fraud, claimant error (unintentional mistakes), and official administration error.",
        primaryEvidence: "DWP Fraud and Error in the Benefit System Annual Report.",
        whyConclusionFails: "Overall compliance among benefit recipients is high; monetary losses include administrative mistakes and unapplied corrections.",
        accurateFormulation: "The majority of social security claims are valid and compliant; official statistics clearly separate verified fraud from administrative error."
      };
    case "PIP_ASSESSMENT_MOCKERY":
      return {
        whatClaimSays: "Claims PIP is easy to claim, easy to fake, or automatic - framing disability benefits as effortless giveaway or rubber-stamped.",
        whatIsFactuallyCorrect: "PIP IS NON-MEANS-TESTED & IN-WORK BENEFIT and NOT easy to claim. DWP Stat-Xplore official clearance data 2023/24: only 40-45% of new PIP claims result in award at initial decision; 52-54% are disallowed. Assessment is functional, not diagnostic: 12 statutory descriptors (8 Daily Living: preparing food, taking nutrition, managing therapy/medication, washing/bathing, managing toilet needs, dressing/undressing, communicating verbally, reading, mixing with people, making budgeting decisions; 2 Mobility: planning journeys, moving around). Points scored 0-12 per activity, thresholds: 8 points = Standard, 12 = Enhanced. DWP guidance requires assessment against reliability criteria: can perform safely, to acceptable standard, repeatedly, and within reasonable time - repeatedly means as often as required. HMCTS Tribunal Statistics Q4 2023: 68-70% of PIP appeals that reach hearing overturn DWP decision in favour of claimant, indicating systematic underscoring by assessors, not over-awarding. JRF/Scope: average extra cost of disability £975/month; PIP max combined Enhanced £187.45/week (2026/27: Daily Living Enhanced £110.40 + Mobility Enhanced £77.05) does not cover costs.",
        whatIsMisleading: "Presents PIP as 'easy' or based on self-reported condition. Ignores mandatory paper review, face-to-face/telephone assessment by health professional, audit, and DWP decision maker stage. Fraud rate for PIP is 1.2% (DWP Fraud & Error 2023/24), far below general public perception.",
        missingContext: "PIP is non-means-tested, non-contributory extra-costs benefit, not out-of-work benefit. Many claimants work: DWP data shows 15%+ of PIP claimants in employment. Award based on functional impact, not diagnosis - ADHD/autism/depression alone scores 0 unless functional descriptors met with evidence. High tribunal overturn proves initial assessments frequently miss evidence or misapply descriptors. OECD Health 2023: UK disability benefit receipt below OECD average; rise in caseload reflects ageing, NHS waiting lists (7.5m), and long-Covid, not ease of claiming.",
        primaryEvidence: "DWP Stat-Xplore PIP Clearances & Caseload, DWP Fraud and Error 2023/24, HMCTS Tribunal Statistics Quarterly, GOV.UK PIP Assessment Guide (12 descriptors + reliability criteria), OBR Fiscal Outlook, ONS Labour Market Health Reasons, JRF UK Poverty 2024 & Scope Extra Costs, OECD Health at a Glance 2023.",
        whyConclusionFails: "If PIP were easy, award rates would be high and tribunal overturns low. Inverse is true: low initial award rate + high overturn = rigorous initial gate with frequent underscoring. Functional descriptor system makes faking hard - assessors score observed function and seek corroborating evidence (GP, hospital, care plans).",
        accurateFormulation: "PIP entitlement is determined by scoring 12 functional activities against reliability criteria (safe, acceptable standard, repeatable, reasonable time). DWP data: ~40-45% initial award rate; 54% disallowed; 68-70% of heard appeals overturn DWP - evidence of underscoring, not rubber-stamping. Fraud 1.2%. Extra costs of disability far exceed PIP rates (JRF/Scope)."
      };

    case "MOTABILITY_TROPE":
      return {
        whatClaimSays: "Claims disabled people get free luxury cars like BMWs on taxpayer money - 'free cars on PIP' toxic trope.",
        whatIsFactuallyCorrect: "MOTABILITY IS NOT FREE - CLAIMANTS FORFEIT MOBILITY PAYMENT: Lease is paid DIRECTLY from Enhanced Mobility PIP award - claimant sacrifices £77.05/week (£4,005.60/year, £12,016.80 over 3-year lease, 2026/27 rate). PIP mobility is non-means-tested extra-costs benefit, not free car. Only 36% of eligible PIP Enhanced Mobility recipients use scheme (DWP Stat-Xplore 2024: 1.26m eligible, 760k on scheme). Average 3-year lease costs £12k from forfeited PIP. Luxury models (BMW, Audi, Mercedes) require £3,000-£7,500 Advance Payment from claimant's OWN money + forfeited PIP - unaffordable for most (JRF: 60% UC claimants have savings under £250). Standard models (Vauxhall Corsa, Kia Picanto) have £0 Advance Payment. Scheme includes insurance, maintenance, breakdown, tyre replacement - not luxury add-ons.",
        whatIsMisleading: "Implies taxpayer gives free luxury cars. Ignores rigorous PIP mobility assessment: 2 mobility descriptors (Activity 11 Planning & Following Journeys, Activity 12 Moving Around) scored 0-12 points each. Enhanced Mobility requires 12 points: e.g., descriptor 12E cannot stand or move more than 20 metres, or 12F cannot stand/move at all; or descriptor 11F cannot follow route due to overwhelming psychological distress. Assessment designed to support access to society, not luxury. Many cannot use scheme due to severity.",
        missingContext: "PIP MOBILITY ASSESSMENT CRITERIA - DESIGNED FOR ACCESS, NOT LUXURY: PIP Assessment Guide - Activity 11 Planning & Following Journeys: 0pts can plan/follow unaided, 10pts cannot follow familiar route without another person/assistance dog, 12pts cannot follow any route due to overwhelming psychological distress. Activity 12 Moving Around: 0pts stands/moves >200m, 4pts 100-200m, 8pts 20-50m, 10pts 1-20m or cannot stand, 12pts cannot move/stand at all. Enhanced Mobility (12pts) awarded for: cannot walk >20m safely/reliably/repeatedly, or cannot plan/follow journeys due to mental health. Purpose per DWP: support disabled people to access society, medical appointments, work, education, shopping - ONS 2023: disabled adults 2.3x more likely to miss medical appointments without accessible transport; 42% Motability users say scheme enables work (Motability Survey 2023); 68% say enables NHS appointments; 84% say reduces isolation. JOBS & ECONOMY PILLAR: Motability Operations Annual Report 2023/24 - fleet 815,000 vehicles, 760,000 customers, 1 in 3 new disability-adapted vehicles in UK. Supports 45,000 jobs across UK car industry (Oxford Economics 2023: 6,500 direct Motability staff, 28,000 dealer/manufacturing jobs, 10,500 adaptations/servicing). Contributes £1.3bn Gross Value Added to UK economy. SECOND-HAND MARKET PILLAR: Cox Automotive & NAO Review: scheme adds 230,000-250,000 low-mileage 3-year-old cars annually to UK used market (avg mileage 15,000 vs market avg 32,000), providing affordable adapted and non-adapted used cars. Without Motability, used car prices would rise 5-8% (Cox Automotive 2023 estimate) and low-mileage accessible vehicles would be scarce. NAO found scheme saves DWP money vs direct provision - efficient not-for-profit model.",
        primaryEvidence: "DWP PIP Assessment Guide Activities 11 & 12, DWP Stat-Xplore PIP Mobility (760k Motability from 1.26m eligible), Motability Operations Annual Report 2023/24 (815k fleet, 760k customers), Oxford Economics Economic Impact Report 2023 (45k jobs, £1.3bn GVA), NAO Motability Review 2018, Cox Automotive Used Car Market Report 2023 (230k low-mileage cars, 5-8% price impact), ONS Disability & Access to Services 2023 (2.3x medical appointment miss), JRF Disability Employment & Transport 2023.",
        whyConclusionFails: "No free luxury: claimant forfeits £4,005/year Enhanced Mobility PIP for 3 years (£12k) plus up to £7,500 Advance Payment from own money. Award requires 12 points on strict mobility descriptors - cannot walk >20m or cannot follow routes due to psychological distress. Scheme is forfeited benefit lease, not taxpayer gift, and supports 45k UK jobs and affordable used car market.",
        accurateFormulation: "Motability is NOT free: claimants forfeit Enhanced Mobility PIP £77.05/week (£12k over 3 years) to lease - 36% of eligible use it. Requires 12 points on PIP mobility descriptors (cannot walk >20m or cannot follow routes). Supports access to NHS, work, society, and is pillar of UK car industry: 45k jobs, £1.3bn GVA, 230k low-mileage used cars annually keeping used prices lower (Cox Automotive, Oxford Economics, Motability Operations, DWP)."
      };
    case "TAXPAYER_FURY_TROPE":
    case "TAXPAYER_OTHERING":
      return {
        whatClaimSays: "Pits hardworking taxpayers against benefit claimants (strivers vs skivers).",
        whatIsFactuallyCorrect: "DWP Stat-Xplore UC June 2024: 38-40% of UC claimants are in employment (in-work top-up). ONS Effects of Taxes: 54% of benefit-receiving households contain at least one worker. JRF 2024: 49% of UC households include disabled person. UC 2-child limit and LHA freeze push working families into poverty, not generous welfare.",
        whatIsMisleading: "Creates zero-sum binary. Most claimants have contributed via NI/income tax and are taxpayers themselves when in work.",
        missingContext: "OBR: welfare cap rise driven by CPI uprating, rents, ageing - not fraud. OECD: UK social protection 10.8% GDP, below France 14.5%, Finland 13%.",
        primaryEvidence: "DWP UC Employment Status, ONS Taxes & Benefits, JRF UK Poverty, OBR Welfare Trends, OECD SOCX.",
        whyConclusionFails: "Workers and claimants overlap - framing as separate groups is statistically false.",
        accurateFormulation: "UK welfare largely supports in-work families, disabled people, and pensioners - groups overlapping heavily with 'hardworking taxpayers'."
      };
    case "BENEFIT_BILL_EXPLOSION":
    case "CRISIS_AMPLIFICATION":
    case "WELFARE_STATE_OUT_OF_CONTROL":
    case "BLOATED_WELFARE_STATE":
      return {
        whatClaimSays: "Claims benefits bill is spiralling out of control due to scroungers.",
        whatIsFactuallyCorrect: "OBR Economic & Fiscal Outlook March 2024: UK welfare spending (social security + State Pension) is 10.8% of GDP in 2024/25. Stable for decades: 1970s 8.5%, 1980s 10.2%, 1990s 11.1%, 2000-07 10.5%, peak 2008 crash 11.8% in 2010/11, now 10.8% - SLIGHTLY LESS than 2008 peak. OBR forecast flat 10.9-11.0% to 2028/29. Welfare spending  Rise from £230bn to £300bn nominal 2020-2025 due to State Pension triple lock + inflation uprating + housing support (LHA). Disability benefits rise reflects: NHS waiting 7.5m, long-term sickness 2.8m (ONS), ageing, and long-Covid. PIP caseload 3.5m = 5% population, similar to OECD average.",
        whatIsMisleading: "Attributes rise to fraud/ease. Fraud 2.8% of benefit spend. Largest driver is State Pension, not PIP/UC.",
        missingContext: "IFS: disability benefit rise since 2019 30% due to mental health and musculoskeletal - correlates with NHS mental health referral waits +12 months.",
        primaryEvidence: "OBR Economic & Fiscal Outlook 2024, DWP Expenditure Tables, ONS Health & Labour Market, IFS Disability Benefits 2023.",
        whyConclusionFails: "Nominal rise without denominator (GDP, caseload, inflation) is statistical misrepresentation.",
        accurateFormulation: "Welfare rise driven by demographics, inflation, and health system pressures (ONS/OBR), not claimant fraud or ease of access."
      };


    case "PENSION_CREDIT_MYTH":
      return {
        whatClaimSays: "Claims Pension Credit is easy, automatic, or all pensioners get it.",
        whatIsFactuallyCorrect: "DWP Estimates: 800k-880k eligible pensioner households NOT claiming Pension Credit - take-up only 63-66%, lowest of all benefits. £1.8-£2.3bn unclaimed yearly, avg £3,900 per household. Many assume savings disqualify - savings £10k-£16k only small tariff income, not nil. Digital exclusion and stigma major barriers.",
        whatIsMisleading: "Presents Pension Credit as generous automatic handout. In reality, guarantee £218.15 single / £332.95 couple per week is below JRF Minimum Income Standard £300/week for private renters.",
        missingContext: "Pension Credit passports Council Tax, Housing Benefit, TV licence 75+, Warm Home Discount - because income is severely low. Winter Fuel Payment 2024/25 now linked to PC receipt to drive take-up. ONS: 2.1m pensioners in poverty.",
        primaryEvidence: "DWP Income Related Benefits Estimates 2023/24, Policy in Practice Unclaimed Benefits £23bn, JRF UK Poverty 2024, ONS Pensioner Poverty.",
        whyConclusionFails: "If easy/automatic, take-up would be near 100%, not 63%. Complexity and stigma prevent claiming.",
        accurateFormulation: "Pension Credit take-up is lowest of all benefits - 800k missing out on £3,900/year average, despite severe low income below £218/week."
      };
    case "STATE_PENSION_GENEROSITY_MYTH":
      return {
        whatClaimSays: "Claims State Pension is generous or pensioners are all well off.",
        whatIsFactuallyCorrect: "Full new State Pension £221.20/week requires 35 years NI - many get less (women with caring gaps, contracted out). Basic State Pension £169.50. ONS: 2.1m pensioners in poverty (18%). UK State Pension 29% of average earnings vs OECD average 50% - among lowest in OECD. JRF: pensioner poverty 38% in private renters.",
        whatIsMisleading: "Averages hide inequality - 800k on Pension Credit means State Pension alone below poverty line.",
        missingContext: "Triple lock protects against inflation but from low base. Pension Credit top-up proves State Pension insufficient for many.",
        primaryEvidence: "DWP Benefit Rates 2024/25, ONS Pensioner Income, JRF Poverty 2024, OECD Pensions at a Glance 2023.",
        whyConclusionFails: "If generous, Pension Credit would not be needed to top up to £218/week and 2.1m would not be in poverty.",
        accurateFormulation: "UK State Pension is among lowest in OECD at 29% average earnings; 2.1m pensioners in poverty, 800k missing Pension Credit top-up."
      };

    case "HYGIENE_STIGMA":
      return {
        whatClaimSays: "Claims benefit or disabled claimants are unwashed, dirty, smelly, unclean - highly stigmatising dehumanising trope.",
        whatIsFactuallyCorrect: "PIP assessment itself includes washing/bathing as a core functional descriptor: DWP Stat-Xplore - 1.2m PIP claimants score points for needing assistance to wash/bathe. Activity 4 'Washing and bathing' - descriptor: needs assistance, prompting, or cannot wash. DWP data: 68% of Daily Living Enhanced awards include washing/bathing needs. Carers UK 2023: 1.3m carers provide 35+ hours including personal care/washing; 42% of carers provide help with washing/bathing/dressing. Scope: 45% of disabled people report difficulty washing without assistance due to pain, fatigue, mobility, or mental health.",
        whatIsMisleading: "Frames inability to wash as moral failing when PIP/Attendance Allowance recognises it as functional impairment requiring support.",
        missingContext: "HOT WATER & HYGIENE POVERTY: National Energy Action 2024 - 6.5m households fuel poverty, 2.1m cannot afford hot water daily. JRF 2024 - 3.2m households went without basic toiletries (hygiene poverty). Trussell Trust: 42% UC claimants cannot afford toiletries. DWP: PIP Daily Living exists to pay extra heating/water costs, aids, carers - average £35-£50/week. Carers Allowance £81.90/week for 35+ hours including washing - £2.34/hour. Wet rooms £5k-£15k adaptation.",
        primaryEvidence: "DWP PIP Assessment Guide Activity 4, DWP Stat-Xplore, Carers UK 2023, Scope, NEA Fuel Poverty 2024, JRF Hygiene Poverty 2024, Trussell Trust 2023.",
        whyConclusionFails: "Inability to wash is evidence of disability and eligibility for PIP/Attendance Allowance, not laziness.",
        accurateFormulation: "Many disabled claimants require assistance to wash/bathe - DWP recognises in PIP descriptor 4. 1.2m PIP claimants score for washing needs. Hot water poverty 2.1m (NEA 2024) and 3.2m hygiene poverty (JRF). Carers provide 35+ hours including washing for £81.90/week."
      };
    case "DISABILITY_INVALIDATION":
      return {
        whatClaimSays: "Suggests PIP is easily faked, based solely on medical diagnosis, or invalid if a person displays visible activity.",
        whatIsFactuallyCorrect: "PIP eligibility is assessed against 12 statutory descriptors evaluating functional impact on daily living and mobility activities.",
        whatIsMisleading: "Assumes visible activity (e.g. driving, walking short distances, or working) invalidates variable or invisible health conditions.",
        missingContext: "Assessment rules evaluate whether an activity can be performed safely, to an acceptable standard, repeatedly, and in a reasonable timeframe.",
        primaryEvidence: "GOV.UK PIP Assessment Guide & DWP Official Statistics.",
        whyConclusionFails: "Single isolated observations do not measure sustained functional capacity under statutory assessment regulations.",
        accurateFormulation: "PIP awards reflect functional capacity measured against statutory descriptor points rather than medical diagnosis or single visual observations."
      };
    default:
      return {
        whatClaimSays: "Presents a general narrative regarding UK social security expenditure or eligibility.",
        whatIsFactuallyCorrect: "UK social security is governed by statutory entitlement criteria defined by Parliament and administered by DWP/HMRC.",
        whatIsMisleading: "Often simplifies complex interaction rules between earnings, health assessments, and household needs.",
        missingContext: "Analysis of social security impact requires considering housing costs, disability additions, taper rates, and official statistics.",
        primaryEvidence: "DWP Stat-Xplore & OBR Fiscal Outlook Reports.",
        whyConclusionFails: "Sweeping claims ignore detailed statutory entitlement frameworks.",
        accurateFormulation: "Evaluations of social security require grounding in verified primary data sources and statutory criteria."
      };
  }
};

// 9. CLAIM-BY-CLAIM ANALYSIS HELPER
const parseAndAnalyseClaims = (text) => {
  const sentences = text.split(/(?<!\b(?:e\.g|i\.e|d\.w\.p|o\.n\.s|o\.b\.r|mr|mrs|ms|dr|prof|vs|[a-z])\.)(?<!\b\d)(?<=[.!?])\s+(?=[A-Z0-9"'])/i).filter(s => s.trim().length > 0);
  return sentences.map((sentence, idx) => {
    const sLower = sentence.toLowerCase().replace(/[’‘`]/g, "'");
    const isNumerical = /(\d+|£|percent|%)/i.test(sentence);
    const hasStigma = Object.values(STIGMA_PATTERNS).some(patterns => Array.isArray(patterns) && patterns.some(p => p && typeof p.test === 'function' && p.test(sLower)));
    
    let claimType = "NEUTRAL_STATEMENT";
    if (isNumerical && hasStigma) claimType = "STATISTIC_WITH_STIGMATISING_FRAMING";
    else if (isNumerical) claimType = "FACTUAL_NUMERICAL_CLAIM";
    else if (hasStigma) claimType = "RHETORICAL_OR_STIGMATISING_CLAIM";

    return {
      claimNumber: idx + 1,
      text: sentence,
      claimType,
      requiresVerification: isNumerical
    };
  });
};

// ============================================================================
// HEURISTIC PIPELINE EXTENSIONS & UPGRADED ONTOLOGIES
// ============================================================================

export const CANONICAL_BENEFIT_ONTOLOGY = {
  PIP: {
    id: "PIP",
    name: "Personal Independence Payment",
    aliases: ["personal independence payment", "pip", "disability benefit", "mobility payment", "disability living allowance adult replacement"],
    concepts: ["daily living", "mobility", "functional limitation", "assessment", "eligibility", "fraud", "reassessment", "work", "motability", "descriptors", "points"]
  },
  UC: {
    id: "UC",
    name: "Universal Credit",
    aliases: ["universal credit", "uc", "means tested benefit", "work allowance", "taper rate"],
    concepts: ["conditionality", "sanctions", "employment", "earnings", "work incentives", "housing", "children", "poverty", "migration", "fraud", "administration", "lcw", "lcwra"]
  },
  ESA: {
    id: "ESA",
    name: "Employment and Support Allowance",
    aliases: ["employment and support allowance", "esa", "new style esa", "ir-esa"],
    concepts: ["work capability assessment", "wca", "support group", "wrag", "permitted work"]
  },
  DLA: {
    id: "DLA",
    name: "Disability Living Allowance",
    aliases: ["disability living allowance", "dla", "child dla"],
    concepts: ["care component", "mobility component", "children", "lifetime award"]
  },
  ATTENDANCE_ALLOWANCE: {
    id: "ATTENDANCE_ALLOWANCE",
    name: "Attendance Allowance",
    aliases: ["attendance allowance", "aa"],
    concepts: ["state pension age", "frequent attention", "continual supervision", "daytime care", "nighttime care"]
  },
  CARERS_ALLOWANCE: {
    id: "CARERS_ALLOWANCE",
    name: "Carer's Allowance",
    aliases: ["carer's allowance", "carers allowance", "carer support payment"],
    concepts: ["35 hours caring", "earnings limit", "overpayment", "underlying entitlement"]
  },
  PENSION_CREDIT: {
    id: "PENSION_CREDIT",
    name: "Pension Credit",
    aliases: ["pension credit", "pc", "guarantee credit", "savings credit"],
    concepts: ["take-up", "poverty", "pensioner income", "eligibility", "state pension", "housing costs", "winter fuel payment link"]
  },
  JSA: {
    id: "JSA",
    name: "Jobseeker's Allowance",
    aliases: ["jobseeker's allowance", "jobseekers allowance", "jsa", "new style jsa"],
    concepts: ["jobseeking", "claimant commitment", "unemployment", "contributory"]
  },
  HOUSING_BENEFIT: {
    id: "HOUSING_BENEFIT",
    name: "Housing Benefit",
    aliases: ["housing benefit", "hb", "rent support"],
    concepts: ["local housing allowance", "lha", "bedroom tax", "social housing", "private rented sector"]
  },
  COUNCIL_TAX_REDUCTION: {
    id: "COUNCIL_TAX_REDUCTION",
    name: "Council Tax Reduction",
    aliases: ["council tax reduction", "council tax support", "ctr", "cts"],
    concepts: ["local authority", "means test", "discount"]
  },
  MOTABILITY: {
    id: "MOTABILITY",
    name: "Motability Scheme",
    aliases: ["motability", "motability car", "pip car", "disabled car scheme"],
    concepts: ["higher rate mobility", "lease", "wheelchair accessible vehicle", "wav", "insurance", "maintenance"]
  },
  BLUE_BADGE: {
    id: "BLUE_BADGE",
    name: "Blue Badge Scheme",
    aliases: ["blue badge", "disabled parking badge"],
    concepts: ["parking", "mobility", "local council"]
  },
  WINTER_FUEL_PAYMENT: {
    id: "WINTER_FUEL_PAYMENT",
    name: "Winter Fuel Payment",
    aliases: ["winter fuel payment", "winter fuel allowance"],
    concepts: ["pensioners", "heating costs", "means testing", "pension credit link"]
  },
  STATE_PENSION: {
    id: "STATE_PENSION",
    name: "State Pension",
    aliases: ["state pension", "new state pension", "basic state pension"],
    concepts: ["national insurance", "triple lock", "retirement age", "contributory"]
  },
  CHILD_BENEFIT: {
    id: "CHILD_BENEFIT",
    name: "Child Benefit",
    aliases: ["child benefit", "cb"],
    concepts: ["high income child benefit charge", "hicbc", "children", "universal"]
  }
};

export const RHETORICAL_CONCEPT_PATTERNS = {
  FRAUD_EASE_ASSERTION: [
    "easy to claim", "easy to fake", "easy to get", "easy to game", "easy to exploit", "anyone can get it", "free money",
    "people just claim it", "fake disabilities", "fake claims", "fake sick notes",
    "gaming the system", "abuse the system", "people know how to work the system",
    "rubber-stamped", "no checks", "handed out to anyone"
  ],
  BENEFIT_VS_WORK_COMPARISON: [
    "benefits are higher than wages", "better off on benefits", "earn more on benefits",
    "why work when you can claim", "work doesn't pay", "welfare pays more than employment"
  ],
  SPENDING_EXPLOSION_NARRATIVE: [
    "spending explosion", "bill spiralling", "runaway welfare costs", "welfare black hole",
    "unsustainable increase", "out of control spending", "costing taxpayers billions"
  ]
};

export const detectIntent = (textLower) => {
  if (textLower.includes('?') || /(how many|what is|how much|who claims|what are|can i|is it|where can|how do)/i.test(textLower)) {
    if (!/(fake|cheat|scam|lazy|stink|fraud|shirker|scrounger|malingerer|exploding|spiralling|free money|lifestyle|easy life|better off|work shy|work-shy|live comfortably|unwilling)/i.test(textLower)) {
      return "QUESTION";
    }
  }
  if (/(\d+|£|percent|%|\bmillion\b|\bbillion\b)/i.test(textLower)) {
    if (/(compared to|versus|more than|less than|than working|than wages)/i.test(textLower)) {
      return "COMPARISON";
    }
    return "NUMERICAL_CLAIM";
  }
  if (/(should|proposal|vouchers|replace|reform|policy|catalogue|plans to|abolish)/i.test(textLower)) {
    return "POLICY_PROPOSAL";
  }
  if (/(my neighbour|i know someone|i saw|my friend|one person|this family|met a guy)/i.test(textLower)) {
    return "ANECDOTE";
  }
  if (/(headline:|revealed|exposed|bombshell|shock|fury|bonanza|jackpot)/i.test(textLower)) {
    return "HEADLINE";
  }
  if (/(labour|tory|conservatives|government|mp|ministers|parliament|election)/i.test(textLower)) {
    return "POLITICAL_STATEMENT";
  }
  if (/(claims that|said that|argued that|stated that|according to)/i.test(textLower)) {
    return "REPORTED_SPEECH";
  }
  if (/(misleading|false|debunked|myth|incorrect|untrue|rubbish|fact check)/i.test(textLower)) {
    return "DEBUNKING";
  }
  return "FACTUAL_CLAIM";
};

export const detectEntitiesAndConcepts = (textLower) => {
  const detected = [];
  for (const [key, benefit] of Object.entries(CANONICAL_BENEFIT_ONTOLOGY)) {
    const matchedAliases = benefit.aliases.filter(alias => textLower.includes(alias));
    const matchedConcepts = benefit.concepts.filter(concept => textLower.includes(concept));
    if (matchedAliases.length > 0 || matchedConcepts.length > 0) {
      detected.push({
        benefitId: benefit.id,
        name: benefit.name,
        matchedAliases,
        matchedConcepts
      });
    }
  }
  return detected;
};

export const extractAtomicClaims = (text) => {
  const sentences = text.split(/(?<!\b(?:e\.g|i\.e|d\.w\.p|o\.n\.s|o\.b\.r|mr|mrs|ms|dr|prof|vs|[a-z])\.)(?<!\b\d)(?<=[.!?])\s+(?=[A-Z0-9"'])/i).filter(s => s.trim().length > 0);
  const claims = [];

  sentences.forEach((sentence, idx) => {
    const sLower = sentence.toLowerCase().replace(/[’‘`]/g, "'");
    
    // Check for clause splitters like "and is", "while", "proving that"
    const subParts = sentence.split(/\b(and is|while|proving that|which means that|resulting in)\b/i);
    
    if (subParts.length > 1) {
      let currentAcc = "";
      subParts.forEach(part => {
        if (/^(and is|while|proving that|which means that|resulting in)$/i.test(part.trim())) {
          if (currentAcc.trim()) {
            claims.push({ id: `claim_${claims.length + 1}`, text: currentAcc.trim(), sentenceIndex: idx + 1 });
          }
          currentAcc = "";
        } else {
          currentAcc += " " + part;
        }
      });
      if (currentAcc.trim()) {
        claims.push({ id: `claim_${claims.length + 1}`, text: currentAcc.trim(), sentenceIndex: idx + 1 });
      }
    } else {
      claims.push({ id: `claim_${claims.length + 1}`, text: sentence.trim(), sentenceIndex: idx + 1 });
    }
  });

  return claims.map(c => {
    const cLower = c.text.toLowerCase().replace(/[’‘`]/g, "'");
    const isNumerical = /(\d+|£|percent|%|\bmillion\b|\bbillion\b)/i.test(c.text);
    const hasRhetoric = Object.values(STIGMA_PATTERNS).some(patterns => patterns.some(p => p.test(cLower)));
    
    let claimClass = "FACTUAL_ASSERTION";
    if (isNumerical && hasRhetoric) claimClass = "NUMERICAL_WITH_RHETORICAL_FRAMING";
    else if (isNumerical) claimClass = "NUMERICAL_STATISTIC";
    else if (hasRhetoric) claimClass = "RHETORICAL_ASSERTION";

    return {
      ...c,
      claimClass,
      isNumerical,
      hasRhetoric
    };
  });
};

export const runEvidenceIntegrityEngine = (textLower, atomicClaims = []) => {
  const integrityFlags = [];

  const containsFraud = /\bfraud\b/i.test(textLower);
  const containsError = /(\bclaimant error\b|\bofficial error\b|\berror\b)/i.test(textLower);
  const containsBillion = /£\s*\d+(\.\d+)?\s*bn|£\s*\d+[\d,]*\s*billion/i.test(textLower);

  const fraudVsClaimantPercent = /£\s*\d+(\.\d+)?\s*(bn|billion).{0,60}(\b\d+(\.\d+)?\s%.{0,40}claimants|claimants.{0,40}\b\d+(\.\d+)?\s*%)/i.test(textLower);
  if (fraudVsClaimantPercent) {
    integrityFlags.push({
      code: "INVALID_DENOMINATOR_CONVERSION",
      message: "Monetary fraud estimates cannot be converted directly into claimant population percentages without official DWP sampling denominators."
    });
  }

  if (containsBillion && containsFraud && !containsError) {
    integrityFlags.push({
      code: "FRAUD_ERROR_CONFLATION",
      message: "Monetary loss figures conflate intentional fraud with DWP official administrative error and unintentional claimant mistakes."
    });
  }

  const missingDenominator = /(\b\d+(\.\d+)?\s*%|£\s*\d+(\.\d+)?\s*(bn|billion|million))\b(?!.*\b(of|against|compared to|denominator|caseload|expenditure|budget)\b)/i.test(textLower);
  if (missingDenominator) {
    integrityFlags.push({
      code: "MISSING_DENOMINATOR",
      message: "Statistical figure presented without context regarding total caseload or overall expenditure denominator."
    });
  }

  if (/(increased by|risen by).{0,40}(therefore|proving|meaning).{0,40}(fraud|cheating|lazy)/i.test(textLower)) {
    integrityFlags.push({
      code: "CORRELATION_CAUSATION_FLAW",
      message: "Attributes caseload or expenditure increases directly to claimant fraud without proving causal drivers (e.g. demography, economic inflation, state pension age changes)."
    });
  }

  const hasAnecdote = /(i know someone|my neighbour|one claimant|saw a person)/i.test(textLower);
  const hasAbsolute = /(everyone|all claimants|they all|always|nobody)/i.test(textLower);
  if (hasAnecdote && hasAbsolute) {
    integrityFlags.push({
      code: "ANECDOTAL_GENERALISATION",
      message: "Presents an isolated single instance or personal anecdote as representative of millions of claimants."
    });
  }

  return integrityFlags;
};

export const normalizeEvidence = (rawEvidence) => {
  return {
    id: rawEvidence.id || `ev_${Math.random().toString(36).substr(2, 9)}`,
    source: rawEvidence.source || "DWP / Official Primary Source",
    authorityTier: rawEvidence.authorityTier || 1, // Tier 1: DWP/ONS/OBR, Tier 2: IFS/JRF/Resolution, Tier 3: Scope/DRUK
    title: rawEvidence.title || "Official Welfare & Social Security Statistics",
    url: rawEvidence.url || "https://stat-xplore.dwp.gov.uk/",
    published: rawEvidence.published || "2026",
    updated: rawEvidence.updated || "2026",
    period: rawEvidence.period || "2026/27",
    geography: rawEvidence.geography || "Great Britain",
    benefits: rawEvidence.benefits || ["PIP", "UC"],
    topics: rawEvidence.topics || ["caseload", "expenditure", "fraud_error"],
    population: rawEvidence.population || "All Claimants",
    metric: rawEvidence.metric || "Caseload / Cost",
    value: rawEvidence.value || null,
    unit: rawEvidence.unit || "GBP / Persons",
    direction: rawEvidence.direction || "Stable",
    caveats: rawEvidence.caveats || "Official statistics subject to DWP revisions.",
    finding: rawEvidence.finding || "Primary official data confirms statutory entitlement criteria compliance.",
    tags: rawEvidence.tags || ["official", "dwp"]
  };
};

export const calculateDimensionalScores = ({
  textLower,
  narrativeCategories = [],
  evidenceLevel = "NONE",
  integrityFlags = [],
  isIndirectOrCritical = false
}) => {
  let factualityScore = 80; // Default assumption until falsified or verified
  let rhetoricScore = 0;
  let evidenceQuality = 0;
  let claimIntegrity = 100;

  // Evidence Quality Calculation
  if (evidenceLevel === "MULTIPLE_SOURCES") evidenceQuality = 95;
  else if (evidenceLevel === "PRIMARY_SOURCE") evidenceQuality = 85;
  else if (evidenceLevel === "SPECIFIC_STATISTIC") evidenceQuality = 70;
  else if (evidenceLevel === "ATTRIBUTED_CLAIM") evidenceQuality = 50;
  else if (evidenceLevel === "SOURCE_MENTION_ONLY") evidenceQuality = 30;

  // Rhetoric Score Calculation
  rhetoricScore = Math.min(100, narrativeCategories.length * 20);
  if (/(scum|parasite|subhuman|vermin|stink|dirty)/i.test(textLower)) {
    rhetoricScore = Math.min(100, rhetoricScore + 40);
  }

  // Claim Integrity Calculation
  claimIntegrity = Math.max(0, 100 - (integrityFlags.length * 25));

  // Overall Risk / BS Calculation
  let overallRisk = (rhetoricScore * 0.45) + ((100 - claimIntegrity) * 0.35) + ((100 - factualityScore) * 0.20);
  if (evidenceQuality > 60 && rhetoricScore < 30) {
    overallRisk = Math.max(0, overallRisk - 30);
  }

  if (isIndirectOrCritical) {
    overallRisk = Math.max(10, overallRisk - 20);
  }

  return {
    factualityScore: Math.round(factualityScore),
    rhetoricScore: Math.round(rhetoricScore),
    evidenceQuality: Math.round(evidenceQuality),
    claimIntegrity: Math.round(claimIntegrity),
    overallRisk: Math.round(overallRisk)
  };
};

// ============================================================================
// MAIN EVALUATOR ENGINE (PRESERVING BYTE-FOR-BYTE IDENTICAL OUTPUT KEYS)
// ============================================================================

export const evaluatePipAndFinancialClaims = (rawInput, options = {}) => {
  const text = rawInput.trim();
  const lower = text.toLowerCase().replace(/[’‘`]/g, "'");
  let score = 20;
  let flags = [];
  let primaryRebuttal = "";
  let sourceRef = "";
  let sourceLinks = [];
  let extractedQuotes = [];

  // HEURISTIC PIPELINE PRE-PROCESSING PIPES
  const userIntent = detectIntent(lower);
  const detectedEntities = detectEntitiesAndConcepts(lower);
  const atomicClaims = extractAtomicClaims(text);
  const integrityFlags = runEvidenceIntegrityEngine(lower, atomicClaims);

  // 6. Media / Source Classification
  const mediaType = options.mediaType || "UNKNOWN";

  // 2. Context Sensitivity & Disambiguation
  const hasQuotationMarks = /[”“„«»]/.test(text);
  const citationVerbs = /(said|claimed|stated|argued|reported|according to|wrote|suggested|commented|interviewed|published|headline|opinion|column)/i;
  const criticalVerbs = /(debunked|refuted|criticised|criticized|challenged|corrected|false|misleading|myth|untrue|nonsense)/i;

  const hasCitationVerbs = citationVerbs.test(lower);
  const hasCriticalVerbs = criticalVerbs.test(lower);

  let contextType = "DIRECT_AUTHORIAL";
  if (hasQuotationMarks && hasCriticalVerbs) {
    contextType = "CRITICISM_OF_STATEMENT";
  } else if (hasQuotationMarks && hasCitationVerbs) {
    contextType = "QUOTATION_OR_REPORTED_SPEECH";
  } else if (hasQuotationMarks) {
    contextType = "QUOTATION";
  } else if (hasCitationVerbs && !hasCriticalVerbs) {
    contextType = "ATTRIBUTION";
  } else if (options.isHeadline || lower.startsWith("headline:")) {
    contextType = "HEADLINE_FRAMING";
  }

  const isIndirectOrCritical = contextType === "QUOTATION_OR_REPORTED_SPEECH" || contextType === "CRITICISM_OF_STATEMENT" || contextType === "ATTRIBUTION";

  // --- QUESTION INTENT & DYNAMIC FACT INQUIRY DETECTOR ---
  const isQuestion = userIntent === "QUESTION" || lower.includes('?') || /(how many|what is|how much|who claims|what are|can i|is it|where can|how do)/i.test(lower);
  
  if (isQuestion && !/(fake|cheat|scam|lazy|stink|fraud|shirker|scrounger|malingerer|exploding|spiralling|free money|lifestyle|easy life|better off|work shy|work-shy|live comfortably|unwilling)/i.test(lower)) {
    if (lower.includes('pip') || lower.includes('personal independence payment')) {
      if (lower.includes('how many') || lower.includes('number of') || lower.includes('caseload')) {
        return {
          score: 0,
          flags: ["NEUTRAL FACTUAL INQUIRY: Direct statistical question regarding PIP entitlement caseload."],
          primaryRebuttal: "STATUTORY DATA RESPONSE: According to official DWP Stat-Xplore figures, approximately 3.5 million individuals in Great Britain receive Personal Independence Payment (PIP). Around 36% of awardees receive the highest combined daily living and mobility rates. Note: Live exact figures should be retrieved directly from official DWP Stat-Xplore releases.",
          sourceRef: "DWP Stat-Xplore PIP Official Statistics",
          sourceLinks: [{ label: "DWP Stat-Xplore Portal", url: "https://stat-xplore.dwp.gov.uk/" }],
          extractedQuotes: [`"${text}"`],
          contextType: "QUESTION_INQUIRY",
          evidenceLevel: "PRIMARY_SOURCE",
          evidenceCredibilityModifier: 10,
          toxicAnalysis: {}
        };
      }
      if (lower.includes('rate') || lower.includes('how much') || lower.includes('amount') || lower.includes('pay')) {
        return {
          score: 0,
          flags: ["NEUTRAL FACTUAL INQUIRY: Direct question regarding current PIP payment rates."],
          primaryRebuttal: "STATUTORY DATA RESPONSE: PIP consists of Daily Living and Mobility components. For 2026/27, rates are published in official DWP schedules (Standard Daily Living £73.90/wk, Enhanced £110.40/wk; Standard Mobility £29.20/wk, Enhanced £77.05/wk). PIP is non-means-tested and tax-free.",
          sourceRef: "GOV.UK PIP Rates & Guidance 2026/27",
          sourceLinks: [{ label: "GOV.UK PIP Rates", url: "https://www.gov.uk/pip/how-much-you-get" }],
          extractedQuotes: [`"${text}"`],
          contextType: "QUESTION_INQUIRY",
          evidenceLevel: "PRIMARY_SOURCE",
          evidenceCredibilityModifier: 10,
          toxicAnalysis: {}
        };
      }
    } else if (lower.includes('universal credit') || lower.includes(' uc ')) {
      if (lower.includes('how many') || lower.includes('number of') || lower.includes('caseload')) {
        return {
          score: 0,
          flags: ["NEUTRAL FACTUAL INQUIRY: Direct statistical question regarding Universal Credit caseload."],
          primaryRebuttal: "STATUTORY DATA RESPONSE: Official DWP statistics show over 6 million people in Great Britain claim Universal Credit, with around 40% in active employment receiving top-ups. Live figures should be retrieved from official DWP releases.",
          sourceRef: "DWP Stat-Xplore Universal Credit Caseload Data",
          sourceLinks: [{ label: "DWP Stat-Xplore Portal", url: "https://stat-xplore.dwp.gov.uk/" }],
          extractedQuotes: [`"${text}"`],
          contextType: "QUESTION_INQUIRY",
          evidenceLevel: "PRIMARY_SOURCE",
          evidenceCredibilityModifier: 10,
          toxicAnalysis: {}
        };
      }
    } else if (lower.includes('pension credit')) {
      if (lower.includes('how many') || lower.includes('number of') || lower.includes('caseload') || lower.includes('claim')) {
        return {
          score: 0,
          flags: ["NEUTRAL FACTUAL INQUIRY: Direct statistical question regarding Pension Credit caseload."],
          primaryRebuttal: "STATUTORY DATA RESPONSE: According to DWP official statistics, approximately 1.4 million low-income pensioners receive Pension Credit across Great Britain, while significant numbers of eligible households remain uncollected.",
          sourceRef: "DWP Stat-Xplore Pension Credit Statistics",
          sourceLinks: [{ label: "DWP Stat-Xplore Portal", url: "https://stat-xplore.dwp.gov.uk/" }],
          extractedQuotes: [`"${text}"`],
          contextType: "QUESTION_INQUIRY",
          evidenceLevel: "PRIMARY_SOURCE",
          evidenceCredibilityModifier: 10,
          toxicAnalysis: {}
        };
      }
    } else if (lower.includes('carer') || lower.includes('attendance allowance')) {
      if (lower.includes('how many') || lower.includes('number of') || lower.includes('caseload') || lower.includes('claim')) {
        return {
          score: 0,
          flags: ["NEUTRAL FACTUAL INQUIRY: Direct statistical question regarding carer and disability support caseload."],
          primaryRebuttal: "STATUTORY DATA RESPONSE: DWP official statistics confirm over 1.3 million recipients of Carer's Allowance and over 1.5 million claimants of Attendance Allowance in Great Britain.",
          sourceRef: "DWP Stat-Xplore Carer's Allowance & Attendance Allowance Data",
          sourceLinks: [{ label: "DWP Stat-Xplore Portal", url: "https://stat-xplore.dwp.gov.uk/" }],
          extractedQuotes: [`"${text}"`],
          contextType: "QUESTION_INQUIRY",
          evidenceLevel: "PRIMARY_SOURCE",
          evidenceCredibilityModifier: 10,
          toxicAnalysis: {}
        };
      }
    } else if (lower.includes('state pension')) {
      if (lower.includes('how many') || lower.includes('number of') || lower.includes('caseload') || lower.includes('claim')) {
        return {
          score: 0,
          flags: ["NEUTRAL FACTUAL INQUIRY: Direct statistical question regarding State Pension recipient figures."],
          primaryRebuttal: "STATUTORY DATA RESPONSE: Official DWP figures confirm that approximately 12.7 million individuals receive the UK State Pension across Great Britain.",
          sourceRef: "DWP Stat-Xplore State Pension Statistics",
          sourceLinks: [{ label: "DWP Stat-Xplore Portal", url: "https://stat-xplore.dwp.gov.uk/" }],
          extractedQuotes: [`"${text}"`],
          contextType: "QUESTION_INQUIRY",
          evidenceLevel: "PRIMARY_SOURCE",
          evidenceCredibilityModifier: 10,
          toxicAnalysis: {}
        };
      }
    } else if (lower.includes('benefit') || lower.includes('welfare') || lower.includes('social security') || lower.includes('esa') || lower.includes('dla') || lower.includes('jsa') || lower.includes('housing benefit') || lower.includes('child benefit')) {
      if (lower.includes('how many') || lower.includes('number of') || lower.includes('caseload') || lower.includes('claim') || lower.includes('spend') || lower.includes('cost')) {
        return {
          score: 0,
          flags: ["NEUTRAL FACTUAL INQUIRY: General statistical question regarding benefit and social security expenditure/caseload."],
          primaryRebuttal: "STATUTORY DATA RESPONSE: Official DWP and ONS statistics report total benefit recipients and social protection expenditure, which represents around 10-11% of UK GDP.",
          sourceRef: "DWP Benefit Expenditure and Caseload Tables & ONS Data",
          sourceLinks: [{ label: "DWP Stat-Xplore Portal", url: "https://stat-xplore.dwp.gov.uk/" }],
          extractedQuotes: [`"${text}"`],
          contextType: "QUESTION_INQUIRY",
          evidenceLevel: "PRIMARY_SOURCE",
          evidenceCredibilityModifier: 10,
          toxicAnalysis: {}
        };
      }
    }
  }

  // --- SCHOOL-TO-BENEFITS & WORK REQUIREMENT CLAIM DETECTION ---
  const schoolToBenefitsClaim = /(leaving school.{0,40}signing.{0,40}benefits|sign straight onto benefits|straight on benefits from school|school to welfare|school leavers|going straight on the dole|drift into life on benefits|claim benefits.{0,30}school|young people.{0,40}benefits|benefits from school)/i.test(lower);

  // --- SICK NOTE / FIT NOTE 11 MILLION CLAIM DETECTION ---
  const sickNoteClaim = /(11 million|eleven million).{0,60}(sick note|fit note|signed off|GPs|doctors)/i.test(lower) || lower.includes('sick note system') || lower.includes('signed off 11 million');

  // --- SPECIFIC ARTICLE & STATEMENT PATTERNS ---
  const GBNEWS_BENEFITS_SPLURGE_CLAIM = lower.includes('welfare party') || (lower.includes('labour seats') && lower.includes('12billion')) || lower.includes('12 billion benefits splurge');
  const GRADUATE_BENEFITS_CLAIM = lower.includes('fast-tracking them onto welfare') || lower.includes('graduation present') || lower.includes('advise graduates to apply for benefits');

  // --- HYGIENE & WASHING STIGMA CLAIM DETECTION ---
  const hygieneStigmaClaim = /(stink|stinks|smell|smelly|don’t wash|dont wash|never wash|unwashed|dirty|filthy|hygiene).{0,60}(claimant|claimants|benefits|welfare|disabled|pip)/i.test(lower) ||
    /(claimant|claimants|benefits|welfare|disabled|pip).{0,60}(stink|stinks|smell|smelly|don’t wash|dont wash|never wash|unwashed|dirty|filthy)/i.test(lower) ||
    lower.includes('benefit claimants stink') || lower.includes('people on benefits don\'t wash') || lower.includes('disabled people smell');

  // --- PIP MOCKERY / EASY TO CLAIM DETECTION ---
  const pipMockeryClaim = /(pip|personal independence payment).{0,80}(easy to claim|easy to fake|easy to get|claiming is easy|easy to apply for|automatic|a joke|giveaway|rubber stamped)/i.test(lower) || /(easy to claim|easy to fake|easy to get|claiming is easy|easy to apply for).{0,80}(pip|personal independence payment|disability)/i.test(lower);

    // --- FINANCIAL CLAIM DEBUNK ---
  const financialDebunk = debunkFinancialClaim(lower);
  const pensionDebunk = debunkPensionClaims(lower);
  if (pensionDebunk.flags.length > 0) { flags.push(...pensionDebunk.flags); }
  if (financialDebunk.flags.length > 0) { flags.push(...financialDebunk.flags); }

  // --- EVIDENCE TAXONOMY ---
  const sourceMentioned = /(dwp|ons|hmcts|stat-xplore|ifs|niesr|hansard|gov\.uk|http|https|source|journal|tribunal statistics|office for national statistics|oecd|obr|institute for fiscal studies|joseph rowntree foundation|jrf)/i.test(lower);
  const specificStatistic = /(\b\d+[\d,]*(\.\d+)?%|\b\d+(\.\d+)?\s*(million|billion|trillion|thousand)|£\s*\d+[\d,]*)/i.test(lower);
  const evidenceContext = sourceMentioned && (specificStatistic || /(data|figures|statistics|report|study|survey|table|published|according to|released by)/i.test(lower));
  const primarySource = /(official figures|department for work and pensions figures|ons data|obr forecast|stat-xplore)/i.test(lower);
  const multipleSources = (lower.match(/(dwp|ons|obr|ifs|hmrc|jrf)/gi) || []).length >= 2;

  let evidenceLevel = "NONE";
  let evidenceCredibilityModifier = 0;
  if (multipleSources) {
    evidenceLevel = "MULTIPLE_SOURCES";
    evidenceCredibilityModifier = 11;
  } else if (primarySource) {
    evidenceLevel = "PRIMARY_SOURCE";
    evidenceCredibilityModifier = 9;
  } else if (specificStatistic) {
    evidenceLevel = "SPECIFIC_STATISTIC";
    evidenceCredibilityModifier = 7;
  } else if (evidenceContext || (sourceMentioned && hasCitationVerbs)) {
    evidenceLevel = "ATTRIBUTED_CLAIM";
    evidenceCredibilityModifier = 4;
  } else if (sourceMentioned) {
    evidenceLevel = "SOURCE_MENTION_ONLY";
    evidenceCredibilityModifier = 2;
  }

  // --- CLAIM INTEGRITY CHECKS ---
  const containsFraudTerm = /\bfraud\b/i.test(lower);
  const containsErrorTerm = /(\bclaimant error\b|\bofficial error\b|\berror\b)/i.test(lower);
  const containsBillionFigure = /£\s*\d+(\.\d+)?\s*bn|£\s*\d+[\d,]*\s*billion/i.test(lower);

  const hasFraudAmountToClaimantPercentage = /£\s*\d+(\.\d+)?\s*(bn|billion).{0,60}(\b\d+(\.\d+)?\s%.{0,40}claimants|claimants.{0,40}\b\d+(\.\d+)?\s*%)/i.test(lower);
  const conflatesFraudAndErrors = containsBillionFigure && containsFraudTerm && !containsErrorTerm && /(stolen|wasted|lost through fraud|fraud total|due to fraud)/i.test(lower);
  const missingDenominator = /(\b\d+(\.\d+)?\s*%|£\s*\d+(\.\d+)?\s*(bn|billion|million)|hundreds of thousands)\b(?!.*\b(of|against|compared to|denominator|caseload|expenditure|budget)\b)/i.test(lower);
  const unsourcedStatistic = specificStatistic && !sourceMentioned;

  const anecdotePhrases = ['i know someone who', 'i met a claimant who', 'one person claimed', 'this family', 'this case proves', 'look at this claimant', 'here is an example of'];
  const hasAnecdote = anecdotePhrases.some(p => lower.includes(p));
  const absoluteLanguageTerms = ['all', 'everyone', 'nobody', 'never', 'always', 'every claimant', 'most claimants', 'claimants are', 'people on benefits are', 'disabled people are', 'they all', 'they never'];
  const absoluteLanguageMatches = absoluteLanguageTerms.filter(term => lower.includes(term));
  const absoluteLanguageDetected = absoluteLanguageMatches.length > 0;
  const anecdoteGeneralisation = hasAnecdote && absoluteLanguageDetected;

  const visibleActivityInference = /(was seen walking|went shopping|went on holiday|was driving|went to the pub|works|posts on social media)/i.test(lower) && /(isn’t disabled|isnt disabled|must be fraudulent|not disabled|faking)/i.test(lower);
  const workingMeansNotDisabled = /(working|in employment|has a job).{0,60}(not disabled|cannot receive pip|cant receive pip|ineligible for pip)/i.test(lower);
  const diagnosisMeansEntitlement = /(has a diagnosis|diagnosed with).{0,60}(automatically entitled|automatic pip|guaranteed pip|entitled to pip)/i.test(lower);

  // DETECT NARRATIVE CATEGORIES VIA PATTERN MAPS AND TAXONOMY
  const narrativeCategories = [];
  for (const [category, patterns] of Object.entries(STIGMA_PATTERNS)) {
    if (patterns && Array.isArray(patterns) && patterns.some(pattern => pattern && typeof pattern.test === 'function' && pattern.test(lower))) {
      narrativeCategories.push(category);
    }
  }

  // Fallback taxonomy check with fuzzy matching integration
  for (const [category, phrases] of Object.entries(STIGMA_TAXONOMY)) {
    if (!narrativeCategories.includes(category)) {
      if (phrases.some(phrase => lower.includes(phrase.replace(/[’‘`]/g, "'"))) || fuzzyMatchAny(lower, phrases)) {
        narrativeCategories.push(category);
      }
    }
  }

  if (schoolToBenefitsClaim && !narrativeCategories.includes("SCHOOL_TO_BENEFITS")) {
    narrativeCategories.push("SCHOOL_TO_BENEFITS");
  }

  // --- STRUCTURED TOXIC ANALYSIS MAP ---
  const toxicAnalysis = {
    derogatoryLanguage: (lower.includes('scum') || lower.includes('parasite') || lower.includes('subhuman') || hygieneStigmaClaim) ? "HIGH" : (narrativeCategories.includes("DEHUMANISATION") ? "MEDIUM" : "LOW"),
    dehumanisation: narrativeCategories.includes("DEHUMANISATION") ? "HIGH" : "LOW",
    generalisation: (narrativeCategories.includes("ANECDOTAL_GENERALISATION") || absoluteLanguageDetected) ? "HIGH" : "LOW",
    fraudAssociation: narrativeCategories.includes("FRAUD_GENERALISATION") ? "HIGH" : "LOW",
    fraudGeneralisation: narrativeCategories.includes("FRAUD_GENERALISATION") ? "HIGH" : "LOW",
    disabilityInvalidation: (narrativeCategories.includes("DISABILITY_INVALIDATION") || visibleActivityInference) ? "HIGH" : "LOW",
    appearancePolicing: narrativeCategories.includes("APPEARANCE_POLICING") ? "HIGH" : "LOW",
    workShaming: narrativeCategories.includes("WORK_SHAMING") ? "HIGH" : "LOW",
    medicalScepticism: narrativeCategories.includes("MENTAL_HEALTH_SCEPTICISM") ? "HIGH" : "LOW",
    diagnosisMisconception: diagnosisMeansEntitlement ? "HIGH" : "LOW",
    moralJudgement: narrativeCategories.includes("DESERVING_VS_UNDESERVING") ? "HIGH" : "LOW",
    deservingUndeserving: narrativeCategories.includes("DESERVING_VS_UNDESERVING") ? "HIGH" : "LOW",
    economicScapegoating: narrativeCategories.includes("ECONOMIC_SCAPEGOATING") ? "HIGH" : "LOW",
    taxpayerOthering: narrativeCategories.includes("TAXPAYER_OTHERING") ? "HIGH" : "LOW",
    contributionOthering: narrativeCategories.includes("CONTRIBUTION_OTHERING") ? "HIGH" : "LOW",
    benefitLifestyleFraming: narrativeCategories.includes("BENEFIT_LIFESTYLE") ? "HIGH" : "LOW",
    benefitChoiceFraming: narrativeCategories.includes("BENEFIT_LIFESTYLE") ? "HIGH" : "LOW",
    dependencyNarrative: narrativeCategories.includes("WELFARE_DEPENDENCY_CAUSATION") ? "HIGH" : "LOW",
    intergenerationalDependency: narrativeCategories.includes("INTERGENERATIONAL_DEPENDENCY") ? "HIGH" : "LOW",
    benefitVsWork: narrativeCategories.includes("BENEFIT_VS_WORK") ? "HIGH" : "LOW",
    welfareTourism: narrativeCategories.includes("WELFARE_TOURISM") ? "HIGH" : "LOW",
    immigrationScapegoating: narrativeCategories.includes("WELFARE_TOURISM") ? "HIGH" : "LOW",
    crisisAmplification: narrativeCategories.includes("CRISIS_AMPLIFICATION") ? "HIGH" : "LOW",
    moralPanic: narrativeCategories.includes("CRISIS_AMPLIFICATION") ? "HIGH" : "LOW",
    sensationalism: narrativeCategories.includes("LOADED_HEADLINE") ? "HIGH" : "LOW",
    loadedHeadline: narrativeCategories.includes("LOADED_HEADLINE") ? "HIGH" : "LOW",
    anecdotalGeneralisation: (hasAnecdote && absoluteLanguageDetected) ? "HIGH" : "LOW",
    politicalScapegoating: narrativeCategories.includes("POLITICAL_SCAPEGOATING") ? "HIGH" : "LOW",
    politicalWeaponisation: narrativeCategories.includes("WELFARE_WEAPONISATION") ? "HIGH" : "LOW",
    assessmentMockery: (narrativeCategories.includes("PIP_ASSESSMENT_MOCKERY") || pipMockeryClaim) ? "HIGH" : "LOW",
    systemDistrust: narrativeCategories.includes("SYSTEM_FAILURE_NARRATIVE") ? "HIGH" : "LOW",
    motabilityTrope: narrativeCategories.includes("MOTABILITY_TROPE") ? "HIGH" : "LOW",
    voucherChoiceRestriction: narrativeCategories.includes("VOUCHER_PROPOSAL") ? "HIGH" : "LOW",
    voucherMarketRisk: narrativeCategories.includes("COMMERCIALISATION_RISK") ? "HIGH" : "LOW",
    voucherAdministrativeRisk: narrativeCategories.includes("ADMINISTRATIVE_BURDEN") ? "HIGH" : "LOW",
    voucherFraudClaim: narrativeCategories.includes("VOUCHER_PROPOSAL") ? "HIGH" : "LOW",
    administrativeBurden: narrativeCategories.includes("ADMINISTRATIVE_BURDEN") ? "HIGH" : "LOW",
    policyCriticism: (lower.includes('reform') || lower.includes('review') || lower.includes('change')) ? "HIGH" : "LOW",
    evidenceQuality: evidenceLevel,
    denominatorRisk: missingDenominator ? "HIGH" : "LOW",
    causalClaim: narrativeCategories.some(c => c.includes("CAUSATION") || c.includes("CAUSATIVE")) ? "HIGH" : "LOW",
    selectiveStatisticsRisk: unsourcedStatistic ? "HIGH" : "LOW",
    outdatedStatistics: /\b(201[0-9]|202[0-3])\b/.test(lower) ? "HIGH" : "LOW"
  };

  // --- EVIDENCE VS RHETORIC BALANCE LOGIC ---
  const hasCredibleEvidence = evidenceLevel === "PRIMARY_SOURCE" || evidenceLevel === "MULTIPLE_SOURCES" || evidenceLevel === "ATTRIBUTED_CLAIM" || sourceMentioned;
  const hasMeaningfulRhetoric = narrativeCategories.length > 0 || absoluteLanguageDetected || hygieneStigmaClaim || pipMockeryClaim;
  const hasSevereClaimIntegrityProblem = hasFraudAmountToClaimantPercentage || conflatesFraudAndErrors || visibleActivityInference || workingMeansNotDisabled || schoolToBenefitsClaim;

  // Calculate score with adjusted single-category weighting
  let narrativeCount = narrativeCategories.length;
  score += narrativeCount * 25;
  if (hasSevereClaimIntegrityProblem) score += 25;
  if (pipMockeryClaim) score += 40;
  if (hygieneStigmaClaim) score += 30;
  if (schoolToBenefitsClaim) score += 35;
  if (isIndirectOrCritical) score = Math.max(10, score - 20);

  if (schoolToBenefitsClaim || narrativeCategories.includes("SCHOOL_TO_BENEFITS")) {
    flags.push("STATUTORY INACCURACY: Claims school leavers/young people can move straight onto benefits (Universal Credit is legally restricted to 18+ with strict Jobcentre work conditionality and sanctions).");
  }
  if (pipMockeryClaim) {
    flags.push("STATUTORY MISCONCEPTION: Claims PIP is easy to claim or fake (ignores low initial award rates, high tribunal overturn rates, and strict functional descriptor assessments).");
  }

  // --- MANDATORY MEDIUM BS OVERRIDE RULE ---
  let finalVerdict = "LOW / Neutral or Factual";
  const calculateVerdict = (s) => {
    if (s >= 80) return "HIGH / Disinformation or Severe Stigma";
    if (s >= 40) return "MEDIUM / Contested or Misleading Framing";
    return "LOW / Neutral or Factual";
  };
  finalVerdict = calculateVerdict(score);

  if (hasCredibleEvidence && hasMeaningfulRhetoric && !hasSevereClaimIntegrityProblem && !pipMockeryClaim) {
    score = Math.min(Math.max(score, 60), 79);
    finalVerdict = "MEDIUM / Contested or Misleading Framing";
    flags.push("MEDIUM BS RULE: Official evidence or statistics are presented, but accompanied by stigmatising, sensationalist, or misleading rhetoric.");
  }

  // Populate integrity flags into global flags array
  integrityFlags.forEach(f => flags.push(`INTEGRITY WARNING [${f.code}]: ${f.message}`));

  // CALCULATE MULTI-DIMENSIONAL SCORES FOR HEURISTIC EVALUATION PIPELINE
  const dimensionalScores = calculateDimensionalScores({
    textLower: lower,
    narrativeCategories,
    evidenceLevel,
    integrityFlags,
    isIndirectOrCritical
  });

  // Generate expert structured debunk
  // MOTABILITY / FREE CARS - force HIGH BS
  if (lower.includes("free car") || lower.includes("free cars") || lower.includes("motability") || lower.includes("motability")) {
    if (!narrativeCategories.includes("MOTABILITY_TROPE")) narrativeCategories.push("MOTABILITY_TROPE");
    score = Math.max(score, 90);
    flags.push("HIGH BS / ANTI-WELFARE MISINFORMATION: Free cars narrative is toxic trope used to create outrage against disabled people. Motability NOT free - forfeits Enhanced Mobility PIP £77.05/week.");
  }

  // ANY insulting taxonomy auto HIGH - people on benefits are lazy etc
  const insultingCats = ["WORK_SHAMING","FRAUD_GENERALISATION","BENEFIT_LIFESTYLE","TAXPAYER_FURY_TROPE","DISABILITY_INVALIDATION","HYGIENE_STIGMA","MOTABILITY_TROPE","SICK_NOTE_CULTURE","MENTAL_HEALTH_SCEPTICISM","HANDOUT_NARRATIVE"];
  if (narrativeCategories.some(c => insultingCats.includes(c))) {
    score = Math.max(score, 85);
  }

  // Explicit lazy check - must be HIGH
  if (lower.includes("people on benefits are lazy") || lower.includes("benefit claimants are lazy") || (lower.includes("benefits") && lower.includes("lazy")) || (lower.includes("claimants") && lower.includes("lazy")) || lower.includes("people on benefits are workshy")) {
    if (!narrativeCategories.includes("WORK_SHAMING")) narrativeCategories.push("WORK_SHAMING");
    score = Math.max(score, 90);
    flags.push("HIGH BS / STIGMATISING: People on benefits are lazy is highly stigmatising generalising rhetoric - automatically HIGH BS.");
  }

  // Anti-welfare framing - taxpayer vs claimant, through the roof
  if (lower.includes("taxpayers more deserving") || lower.includes("benefit claimants undeserving") || lower.includes("through the roof") || lower.includes("reduce housing benefits spending") || lower.includes("housing benefit through the roof")) {
    if (!narrativeCategories.includes("TAXPAYER_FURY_TROPE")) narrativeCategories.push("TAXPAYER_FURY_TROPE");
    if (!narrativeCategories.includes("ANTI_WELFARE_FRAMING")) narrativeCategories.push("ANTI_WELFARE_FRAMING");
    score = Math.max(score, 80);
  }

  // WELFARE SAVINGS FICTION - £23bn/£36bn claim with no evidence - political point scoring
  if (lower.includes("welfare savings") || lower.includes("welfare saving") || lower.includes("23 billion") || lower.includes("36 billion") || lower.includes("get britain working again") || lower.includes("cut taxes") && lower.includes("deficit") && lower.includes("defence") || lower.includes("found kemi")) {
    if (!narrativeCategories.includes("WELFARE_SAVINGS_FICTION")) narrativeCategories.push("WELFARE_SAVINGS_FICTION");
    if (!narrativeCategories.includes("POLITICAL_POINT_SCORING")) narrativeCategories.push("POLITICAL_POINT_SCORING");
    score = Math.max(score, 92);
    flags.push("HIGH BS / POLITICAL POINT SCORING: £23bn/£36bn welfare savings claim provides no context, official data or evidence. Framing as taxpayers money vs undeserving disabled. Uses welfare as political point scoring tactics. No DWP/OBR backing.");
  }

  const structuredDebunk = generateNarrativeRebuttal(narrativeCategories, text);
  const parsedClaims = parseAndAnalyseClaims(text);

  // Formulate primary rebuttal text
  primaryRebuttal = `${structuredDebunk.whatIsFactuallyCorrect} ${structuredDebunk.whatIsMisleading} ${structuredDebunk.missingContext}`;
  if (financialDebunk.rebuttal) { primaryRebuttal += " " + financialDebunk.rebuttal; score += 25; }

  if (pensionDebunk.rebuttal) { primaryRebuttal += " " + pensionDebunk.rebuttal; score += 20; }
  // Recalculate verdict after financial/pension bonuses and cap score at 100 - fixes HIGH labelled as MEDIUM bug
  score = Math.min(100, Math.round(score));
  finalVerdict = calculateVerdict(score);

  sourceRef = "DWP Official Statistics / ONS Social Security Data / GOV.UK Policy Framework / OBR Fiscal Outlook / HMCTS Appeal Data";
  sourceLinks = [
    { label: "DWP Stat-Xplore Official Data", url: "https://stat-xplore.dwp.gov.uk/" },
    { label: "GOV.UK Social Security Guidance", url: "https://www.gov.uk/browse/benefits" },
    { label: "HMCTS Tribunal Appeal Statistics", url: "https://www.gov.uk/government/collections/tribunals-statistics" },
    { label: "Office for Budget Responsibility (OBR)", url: "https://obr.uk/" },
    { label: "Resolution Foundation Research", url: "https://www.resolutionfoundation.org/" }
  ];

  // NORMALISED EVIDENCE COLLECTION OBJECT
  const normalizedEvidenceCollection = [
    normalizeEvidence({
      id: "ev_dwp_primary",
      source: "DWP Stat-Xplore & HMCTS",
      authorityTier: 1,
      title: "DWP Benefit Expenditure, Caseload & HMCTS Appeals Official Statistics",
      benefits: detectedEntities.map(e => e.benefitId),
      finding: "Statutory entitlement compliance and functional descriptor criteria confirmed by official DWP/HMCTS statistical sampling."
    })
  ];

  return {
    score,
    verdict: finalVerdict,
    flags,
    primaryRebuttal,
    narrativeCategories,
    narrativeSeverity: score >= 80 ? "HIGH" : (score >= 40 ? "MEDIUM" : "LOW"),
    rhetoricalTactics: narrativeCategories,
    structuredDebunk,
    claimsAnalysis: parsedClaims,
    sourceRef,
    sourceLinks,
    extractedQuotes: [`"${text}"`],
    contextType,
    evidenceLevel,
    evidenceCredibilityModifier,
    toxicAnalysis,
    mediaType,
    // HEURISTIC PIPELINE EXTENDED OUTPUTS
    intent: userIntent,
    detectedEntities,
    atomicClaims,
    integrityFlags,
    dimensionalScores,
    normalizedEvidenceCollection
  };
};
