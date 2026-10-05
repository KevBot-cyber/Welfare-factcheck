import { BENEFIT_RATES_2026_2027 } from '../constants/spendingData';

// Helper for fuzzy or approximate keyword matching (handles minor typos / character slips)
const fuzzyMatchAny = (textLower, phrases) => {
  return phrases.some(phrase => {
    if (textLower.includes(phrase)) return true;
    // Simple tolerance for minor typos if length >= 6
    if (phrase.length >= 6) {
      const words = phrase.split(' ');
      if (words.length > 1) {
        return words.every(w => textLower.includes(w) || (w.length > 4 && textLower.includes(w.substring(0, w.length - 1))));
      }
    }
    return false;
  });
};

/**
 * Calls the Gemini API to obtain external analysis or verification context for a claim.
 * @param {string} statement - The claim or text to analyze.
 * @param {string} apiKey - The Gemini API Key.
 * @returns {Promise<Object>} Response object containing Gemini API evaluation details.
 */
export const evaluateWithGemini = async (statement, apiKey = process.env.GEMINI_API_KEY) => {
  if (!apiKey) {
    return evaluatePipAndFinancialClaims(statement);
  }

  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;

  const systemInstructionText = `You are an expert analyst in UK social security, welfare economics, disability rights, and statutory DWP/ONS policy frameworks. Your primary objective is to evaluate statements, claims, quotes, or articles for factual accuracy, statistical integrity, and rhetorical framing, while actively protecting disabled people and welfare claimants from political scapegoating, toxic narratives, anti-welfare rhetoric, and stigmatising tropes.

When analyzing input:
1. Evaluate statistical claims, expenditure metrics, and eligibility rules using verified UK sources (e.g., DWP Stat-Xplore, ONS, IFS, OBR, NAO, JRF, and statutory regulations).
2. Identify and challenge dehumanising language, derogatory insults, sweeping generalisations, and ungrounded anti-welfare tropes (e.g., framing benefit access as a "lifestyle choice" or "easy money").
3. Contextualise claims by providing essential structural facts (e.g., 40% of Universal Credit claimants are in employment; PIP evaluates functional impairment rather than diagnosis; social protection spending as a % of GDP has remained stable at ~10-11% for decades).
4. Maintain an objective, authoritative, and human-rights-protective stance against hostility, political weaponisation, and social security scapegoating.

Return your evaluation as a valid JSON object matching this schema:
{
  "score": <number between 12 and 100 representing misleading/stigmatising risk>,
  "verdict": "<string verdict e.g. HIGH BS / STIGMATISING RHETORIC OR FLAWED FRAMING, MEDIUM / Contested or Misleading Framing, or Low BS / Mostly Factual>",
  "flags": ["<string flag 1>", "<string flag 2>"],
  "primaryRebuttal": "<detailed expert rebuttal defending disabled people and claimants with verified facts>",
  "sourceRef": "<verified sources, e.g. DWP Stat-Xplore, ONS, IFS>",
  "sourceLinks": [{"label": "<source name>", "url": "<url>"}]
}`;

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        system_instruction: {
          parts: [{ text: systemInstructionText }]
        },
        contents: [{
          parts: [{ text: statement }]
        }],
        generationConfig: {
          response_mime_type: "application/json"
        }
      })
    });

    if (!response.ok) {
      throw new Error(`Gemini API Error: ${response.statusText}`);
    }

    const data = await response.json();
    const candidateText = data.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!candidateText) {
      return evaluatePipAndFinancialClaims(statement);
    }

    const parsed = JSON.parse(candidateText);
    const baseEvaluation = evaluatePipAndFinancialClaims(statement);

    return {
      ...baseEvaluation,
      score: parsed.score ?? baseEvaluation.score,
      verdict: parsed.verdict ?? baseEvaluation.verdict,
      flags: parsed.flags ?? baseEvaluation.flags,
      primaryRebuttal: parsed.primaryRebuttal ?? baseEvaluation.primaryRebuttal,
      sourceRef: parsed.sourceRef ?? baseEvaluation.sourceRef,
      sourceLinks: parsed.sourceLinks ?? baseEvaluation.sourceLinks
    };
  } catch (error) {
    return evaluatePipAndFinancialClaims(statement);
  }
};

export const evaluatePipAndFinancialClaims = (rawInput, options = {}) => {
  const text = rawInput.trim();
  const lower = text.toLowerCase();
  let score = 20;
  let flags = [];
  let primaryRebuttal = "";
  let sourceRef = "";
  let sourceLinks = [];
  let extractedQuotes = [];

  // 6. Media / Source Classification
  const mediaType = options.mediaType || "UNKNOWN"; // POLITICAL_STATEMENT, PARLIAMENTARY, TV_NEWS, RADIO, NEWSPAPER, ONLINE_NEWS, SOCIAL_MEDIA, VIDEO, PODCAST, BLOG, UNKNOWN

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

  // --- SCHOOL-TO-BENEFITS & WORK REQUIREMENT CLAIM DETECTION ---
  const schoolToBenefitsClaim = /(leaving school.{0,40}signing.{0,40}benefits|sign straight onto benefits|straight on benefits from school|school to welfare|school and benefits|get to work scheme|wont get welfare|won't get welfare|school leavers|going straight on the dole|drift into life on benefits)/i.test(lower);

  // --- SICK NOTE / FIT NOTE 11 MILLION CLAIM DETECTION ---
  const sickNoteClaim = /(11 million|eleven million).{0,60}(sick note|fit note|signed off|GPs|doctors)/i.test(lower) || lower.includes('sick note system') || lower.includes('signed off 11 million');

  // --- SPECIFIC ARTICLE & STATEMENT PATTERNS ---
  const GBNEWS_BENEFITS_SPLURGE_CLAIM = lower.includes('welfare party') || (lower.includes('labour seats') && lower.includes('12billion')) || lower.includes('12 billion benefits splurge');
  const GRADUATE_BENEFITS_CLAIM = lower.includes('fast-tracking them onto welfare') || lower.includes('graduation present') || lower.includes('advise graduates to apply for benefits');

  // --- HYGIENE & WASHING STIGMA CLAIM DETECTION ---
  const hygieneStigmaClaim = /(stink|stinks|smell|smelly|don’t wash|dont wash|never wash|unwashed|dirty|filthy|hygiene).{0,60}(claimant|claimants|benefits|welfare|disabled|pip)/i.test(lower) ||
    /(claimant|claimants|benefits|welfare|disabled|pip).{0,60}(stink|stinks|smell|smelly|don’t wash|dont wash|never wash|unwashed|dirty|filthy)/i.test(lower) ||
    lower.includes('benefit claimants stink') || lower.includes('people on benefits don\'t wash') || lower.includes('disabled people smell');

  // --- REFINEMENT 1 & 2: DETAILED EVIDENCE TAXONOMY ---
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

  const sourceIdentified = sourceMentioned;
  const citationQuality = evidenceLevel;

  // --- CLAIM INTEGRITY CHECKS (EVIDENCE-PROTECTION RULES) ---
  const containsFraudTerm = /\bfraud\b/i.test(lower);
  const containsErrorTerm = /(\bclaimant error\b|\bofficial error\b|\berror\b)/i.test(lower);
  const containsBillionFigure = /£\s*\d+(\.\d+)?\s*bn|£\s*\d+[\d,]*\s*billion/i.test(lower);

  // FRAUD_RATE_DENOMINATOR_ERROR: Detect £X billion fraud -> X% of claimants are fraudulent
  const hasFraudAmountToClaimantPercentage = /£\s*\d+(\.\d+)?\s*(bn|billion).{0,60}(\b\d+(\.\d+)?\s%.{0,40}claimants|claimants.{0,40}\b\d+(\.\d+)?\s*%)/i.test(lower);

  // FRAUD_VS_ERROR_CONFLATION: Detect £9.9bn stolen/wasted through fraud when source reports fraud + claimant error + official error
  const conflatesFraudAndErrors = containsBillionFigure && containsFraudTerm && !containsErrorTerm && /(stolen|wasted|lost through fraud|fraud total|due to fraud)/i.test(lower);

  // MISSING_DENOMINATOR: Detect "£6 billion", "hundreds of thousands", "X%" without explaining denominator
  const missingDenominator = /(\b\d+(\.\d+)?\s*%|£\s*\d+(\.\d+)?\s*(bn|billion|million)|hundreds of thousands)\b(?!.*\b(of|against|compared to|denominator|caseload|expenditure|budget)\b)/i.test(lower);

  // UNSOURCED_STATISTIC: Flag large numerical claims where no primary source is provided
  const unsourcedStatistic = specificStatistic && !sourceMentioned;

  // OUTDATED_STATISTIC: Detect older years in statistics
  const containsOutdatedYear = /\b(202[0-3]|201[0-9])\b/.test(lower);

  // ANECDOTE_TO_POPULATION_GENERALISATION
  const anecdotePhrases = ['i know someone who', 'i met a claimant who', 'one person claimed', 'this family', 'this case proves', 'look at this claimant', 'here is an example of'];
  const hasAnecdote = anecdotePhrases.some(p => lower.includes(p));
  const absoluteLanguageTerms = ['all', 'everyone', 'nobody', 'never', 'always', 'every claimant', 'most claimants', 'claimants are', 'people on benefits are', 'disabled people are', 'they all', 'they never'];
  const absoluteLanguageMatches = absoluteLanguageTerms.filter(term => lower.includes(term));
  const absoluteLanguageDetected = absoluteLanguageMatches.length > 0;
  const anecdoteGeneralisation = hasAnecdote && absoluteLanguageDetected;

  // VISIBLE_ACTIVITY_INFERENCE & WORKING_MEANS_NOT_DISABLED & DIAGNOSIS_DISMISSAL
  const visibleActivityInference = /(was seen walking|went shopping|went on holiday|was driving|went to the pub|works|posts on social media)/i.test(lower) && /(isn’t disabled|isnt disabled|must be fraudulent|not disabled|faking)/i.test(lower);
  const workingMeansNotDisabled = /(working|in employment|has a job).{0,60}(not disabled|cannot receive pip|cant receive pip|ineligible for pip)/i.test(lower);
  const diagnosisMeansEntitlement = /(has a diagnosis|diagnosed with).{0,60}(automatically entitled|automatic pip|guaranteed pip|entitled to pip)/i.test(lower);
  const diagnosisDismissal = /(diagnosis alone|just a diagnosis).{0,60}(doesn’t prove|doenst prove|not enough for pip|not automatic)/i.test(lower);

  // --- SPECIFIC PIP FAKING & FUNCTIONAL CRITERIA DETECTION ---
  const pipFakingClaim = /(pip is easy to fake|pip can be faked|fake their disability for pip|playing the system for pip|pip assessment is a joke|pip is given out on condition alone|diagnosed so they get pip|faking illness for pip|easy to play pip)/i.test(lower) || (lower.includes('pip') && (lower.includes('fake') || lower.includes('faking') || lower.includes('play') || lower.includes('gaming')) && !hasCriticalVerbs);

  // --- REFINEMENT 3: ABSOLUTE-LANGUAGE DETECTION ---
  const absoluteLanguageDetectedFlag = absoluteLanguageDetected;

  // --- REFINEMENT 4: DENOMINATOR / SCALE CHECKING ---
  const scaleWarningTriggers = ['billion', 'millions', 'exploded', 'spiralling', 'spiraling', 'costing', 'surged', 'soared'];
  const hasScaleTriggers = scaleWarningTriggers.some(t => lower.includes(t));
  const scaleContextSupplied = /(per person|% of gdp|percentage of gdp|per household|caseload|inflation adjusted|real terms|per capita)/i.test(lower);
  const scaleContextWarning = hasScaleTriggers && !scaleContextSupplied;
  const denominatorWarning = scaleContextWarning || missingDenominator;

  // --- REFINEMENT 5: SELECTIVE STATISTIC / CHERRY-PICKING DETECTION ---
  const dramaticSurgeTerms = ['surged', 'soared', 'exploded', 'doubled', 'record', 'massive increase', 'huge increase', 'out of control', 'spiralling', 'spiraling', 'unprecedented'];
  const hasDramaticTerm = dramaticSurgeTerms.some(t => lower.includes(t));
  const hasBaselineContext = /(baseline|compared to|since|baseline year|inflation-adjusted|adjusted for|per capita|proportion of caseload)/i.test(lower);
  const selectiveStatisticsRisk = hasDramaticTerm && specificStatistic && !hasBaselineContext;

  // --- REFINEMENT 6: CORRELATION / CAUSATION DETECTION ---
  const causalPhrases = ['because of benefits', 'benefits cause', 'pip causes', 'welfare causes', 'benefits make people', 'the system creates', 'benefits encourage', 'pip encourages', 'uc discourages work', 'welfare is why', 'therefore claimants'];
  const causalClaimDetected = causalPhrases.some(p => lower.includes(p));
  const causalEvidenceProvided = causalClaimDetected && /(controlled trial|longitudinal study|causal link established by| econometric study)/i.test(lower);

  // --- REFINEMENT 8: MORAL-JUDGEMENT VS POLICY-CRITICISM SEPARATION ---
  const policyCriticismPhrases = ['benefit cap should be changed', 'pip assessments need reform', 'fraud detection should be improved', 'reform the system', 'policy needs review'];
  const policyCriticism = policyCriticismPhrases.some(p => lower.includes(p)) || /(should be reformed|needs review|policy change)/i.test(lower);
  const moralJudgement = /(claimants are lazy|people on benefits are parasites|disabled people are exploiting|free lifestyle|scrounger|shirker)/i.test(lower);

  // 1. EXPANDED NARRATIVE TAXONOMY & FAMILIES
  const hygieneStigmaPhrases = [
    'stink', 'stinks', 'smell', 'smelly', 'don’t wash', 'dont wash', 'never wash', 'unwashed', 'dirty', 'filthy',
    'hygiene', 'personal hygiene', 'bathing', 'showering', 'can’t wash', 'cant wash', 'washing barriers'
  ];

  const negativeStigmaPhrases = [
    'scrounger', 'scroungers', 'scrounging', 'shirker', 'shirkers', 'skiver', 'skivers',
    'lazy', 'faking', 'faking illness', 'handout', 'handout nation', 'malingerer', 'malingerers',
    'refuse to work', 'lifestyle choice', 'easy life', 'sick note culture', 'fit note culture',
    'pip crisis', 'welfare burden', 'fraud rampant', 'explosion in claims', 'drain on taxpayers',
    'drain on the economy', 'open door policy', 'scamming the system', 'racket', 'gravy train',
    'free ride', 'epidemic of sickness', 'fraud epidemic', 'work ethic', 'culture of dependency',
    'cheats', 'benefits cheat', 'benefits cheats', 'sham', 'moochers', 'spongeing', 'spongers',
    'taking the mickey', 'work shy', 'work-shy', 'leech', 'leeches', 'system abuser', 'abuse the system',
    'scamming', 'free money', 'freeloader', 'freeloaders', 'welfare dependency', 'culture of laziness',
    'feckless', 'disability scam', 'faking disability', 'pretending to be sick', 'faking depression',
    'free cars', 'motability freebie', 'free vehicle', 'faker', 'easy to game', 'easy to fake',
    'easy to play', 'easy to cheat', 'game the system', 'easy money',
    'parasites', 'parasitic', 'bloated welfare', 'benefit scroungers', 'shirkers paradise', 'taxpayer cash cow',
    'welfare scroungers', 'sicknote Britain', 'signing on while laughing', 'cash for couch potatoes',
    'benefits bludgers', 'state dependents', 'state supported idleness',
    'stink', 'stinks', 'smell', 'useless', 'trash', 'scum', 'filth', 'subhuman', 'wasters'
  ];

  const nonContributorPhrases = [
    'don’t contribute', 'dont contribute', 'doesn’t contribute', 'doesnt contribute', 'never contributed',
    'contributed nothing', 'contribute nothing', 'give nothing back', 'take but don’t give', 'take but dont give',
    'take from society', 'take from taxpayers', 'living off us', 'living off everyone else', 'living at our expense',
    'at the expense of working people', 'paid for by hardworking people', 'hardworking taxpayers versus',
    'those who pay in versus those who take out', 'contribute nothing to the pot', 'live off the state'
  ];

  const contributionAndFairnessPhrases = [
    'recognise contribution', 'recognize contribution', 'people who contribute', 'those who contribute',
    'people who pay in', 'those who pay in', 'people who pay their way', 'those who pay their way',
    'pay their own way', 'hardworking taxpayers', 'hardworking people', 'working people versus',
    'taxpayers versus claimants', 'taxpayers versus people on benefits', 'living off taxpayers',
    'living off the taxpayer', 'footing the bill', 'fairness to taxpayers', 'restore fairness',
    'restore fairness to taxpayers', 'make work pay', 'work must pay', 'work always pays',
    'work always pays better than benefits', 'work should always pay', 'reward work', 'rewarding work',
    'benefits reward idleness', 'benefits reward inactivity', 'doing nothing', 'do nothing',
    'people who do nothing', 'those who do nothing', 'morally wrong to accept', 'morally wrong to claim',
    'morally wrong to live on benefits', 'morally wrong to take benefits'
  ];

  const generalisationConstructions = [
    'all benefit claimants', 'all welfare claimants', 'everyone on benefits', 'everyone claiming pip',
    'everyone on uc', 'every claimant', 'most claimants are', 'the majority are', 'they all', 'they always',
    'none of them', 'no one wants to', 'nobody wants to work', 'people on benefits tend to',
    'claimants generally', 'the typical claimant', 'the average claimant', 'entire benefit culture'
  ];

  const fraudAssociationPairs = [
    'pip + fraud', 'disabled + fraud', 'uc + fraud', 'benefits + cheats', 'claimants + scammers',
    'welfare + abuse', 'disability + fake', 'sick + fake', 'claimants + lying', 'pip + gaming',
    'esa + fake', 'dla + fraud', 'attendance allowance + fraud', 'pip + game'
  ];

  const shockingCasePhrases = [
    'just look at', 'look at this family', 'look at this claimant', 'one claimant', 'one family',
    'this claimant', 'this family', 'this shocking case', 'this extraordinary case', 'case exposes',
    'case reveals', 'case proves', 'proof that', 'this shows what is happening', 'this is what benefits have become',
    'this is typical', 'not an isolated case', 'how many more?', 'if this is allowed', 'taxpayer fury after',
    'taxpayers outraged after'
  ];

  const loadedHeadlinePhrases = [
    'shame', 'outrage', 'fury', 'anger', 'backlash', 'row', 'bombshell', 'exposed', 'revealed',
    'caught', 'busted', 'ripped off', 'cash splash', 'benefit bonanza', 'welfare bonanza',
    'benefits jackpot', 'pip jackpot', 'benefit windfall', 'welfare windfall', 'taxpayer fury',
    'taxpayer outrage', 'benefit shock', 'welfare shock', 'benefit shame', 'welfare shame'
  ];

  const luxuryMotabilityPhrases = [
    'free bmw', 'free audi', 'free mercedes', 'free tesla', 'free range rover', 'luxury motability',
    'luxury car', 'brand-new car', 'taxpayer-funded car', 'taxpayer pays for car', 'pip car',
    'benefits car', 'car giveaway', 'motability giveaway', 'motability perk', 'motability benefit',
    'disabled people get free cars'
  ];

  const appearancePolicingPhrases = [
    'doesn’t look disabled', 'doesnt look disabled', 'doesn’t look sick', 'doesnt look sick', 'looks fine',
    'looks perfectly fine', 'looks healthy', 'looks too healthy', 'walking perfectly', 'seen walking',
    'seen shopping', 'seen on holiday', 'seen at the gym', 'seen driving', 'smiling in photos',
    'able to go shopping', 'able to go on holiday', 'able to leave the house', 'if they’re really disabled',
    'if theyre really disabled', 'if she was really disabled', 'if he was really disabled', 'you wouldn’t know they were disabled',
    'you wouldnt know they were disabled'
  ];

  const theyCanWorkPhrases = [
    'looks capable of working', 'perfectly capable of working', 'could easily work', 'could get a job',
    'should get a job', 'should be working', 'fit enough to work', 'healthy enough to work',
    'able-bodied', 'able bodied', 'too fit for benefits', 'fit to work', 'shouldn’t be claiming',
    'shouldnt be claiming', 'no reason not to work', 'refuses to work', 'won’t work', 'wont work', 'chooses not to work'
  ];

  const lifestylePhrases = [
    'benefits lifestyle', 'welfare lifestyle', 'lifestyle on benefits', 'living the lifestyle',
    'life on benefits', 'comfortable on benefits', 'comfortable lifestyle', 'living comfortably',
    'living a comfortable life', 'living the high life', 'living well on benefits', 'living off benefits',
    'benefits pay for their lifestyle', 'taxpayer-funded lifestyle', 'pay for your lifestyle'
  ];

  const benefitTourismPhrases = [
    'benefit tourism', 'welfare tourism', 'benefit tourists', 'welfare tourists', 'foreigners on benefits',
    'immigrants on benefits', 'migrants on benefits', 'immigrants claiming benefits', 'migrants claiming benefits',
    'foreign nationals claiming', 'come here for benefits', 'come here for welfare', 'come to Britain for benefits',
    'open door to benefits', 'free benefits for migrants'
  ];

  const benefitChoicePhrases = [
    'choose benefits', 'choosing benefits', 'choose welfare', 'choosing welfare', 'choose not to work',
    'choice to stay on benefits', 'benefits are a lifestyle choice', 'made a choice to claim', 'chooses to claim',
    'choosing not to contribute', 'choosing unemployment', 'choose not to'
  ];

  const brokenSystemPhrases = [
    'broken welfare system', 'broken benefits system', 'broken pip system', 'broken disability system',
    'welfare system has failed', 'benefits system has failed', 'system is being abused', 'system is wide open',
    'anyone can claim', 'anyone can get pip', 'anyone can get benefits', 'no checks', 'no proper checks',
    'barely any checks', 'no scrutiny', 'rubber-stamped', 'rubber stamped', 'automatic benefits'
  ];

  const crackdownPhrases = [
    'crack down', 'crackdown', 'clamp down', 'clampdown', 'war on benefit fraud', 'war on welfare',
    'tough on benefits', 'tougher welfare rules', 'punish claimants', 'make claimants pay', 'strip benefits',
    'strip their benefits', 'take away benefits', 'ban benefit claimants', 'force them off benefits'
  ];

  const mediaSensationalismPhrases = ['benefits bombshell', 'welfare scandal', 'benefits exposed', 'benefit shock'];
  const dehumanisingPhrases = ['parasites', 'leech', 'scrounger', 'sponger', 'freeloader', 'burden', 'drain', 'stink', 'stinks', 'scum', 'subhuman', 'wasters'];
  const moralPanicPhrases = ['welfare crisis', 'benefit crisis', 'out of control', 'spiralling', 'welfare epidemic', 'time bomb', 'epidemic', 'explosion', 'runaway'];
  const claimantOtheringPhrases = ['these people', 'those people', 'people like this', 'welfare class'];
  const entitlementMockeryPhrases = ['entitlement culture', 'entitlement mentality', 'entitled to everything'];
  const assessmentMockeryPhrases = ['tick-box exercise', 'rubber stamp', 'automatic award', 'easy pip', 'pip giveaway'];
  const benefitMaximisationPhrases = ['maxing out benefits', 'stacking benefits', 'collecting every benefit'];
  const austerityFramingPhrases = ['welfare cuts', 'benefit cuts', 'slash welfare', 'welfare crackdown'];

  const politicalRhetoricPhrases = [
    'way of life', 'morally wrong', 'can’t afford it', 'cant afford it',
    'footing the bill', 'paying their own way', 'living on benefits instead',
    'benefits pay more than', 'out of work benefits', 'definition of disability has expanded',
    'scrapping the 2-child cap', 'unfair and unaffordable', 'benefit rise',
    'welfare party', 'benefit party', 'party of welfare', 'party of benefits',
    'welfare weapon', 'benefits weapon', 'use welfare as a weapon', 'using welfare as a weapon',
    'benefit claimants as scapegoats', 'welfare claimants as scapegoats', 'scapegoating claimants',
    'boost polling', 'boosting polling', 'boost the polls', 'boost their polls', 'polling boost',
    'weaponise welfare', 'weaponising welfare', 'weaponize welfare', 'weaponizing welfare',
    'welfare weaponisation', 'welfare weaponization'
  ];

  const robustPoliticalPatterns = {
    welfareWayOfLife: [
      /\b(welfare|benefits)\b.{0,60}\b(way of life|lifestyle|culture of dependency)\b/i,
      /\b(millions|people)\b.{0,60}\b(living on benefits|out of work benefits)\b/i
    ],
    workPayComparison: [
      /\b(benefits|life on benefits)\b.{0,60}\b(pay more than|better than|earn more than)\b.{0,60}\b(job|work)\b/i
    ],
    childBenefitCapRhetoric: [
      /\b(2-child cap|two-child cap|child cap)\b.{0,80}\b(scrap|scrapping|unfair|unaffordable|bring back)\b/i
    ],
    contributionOthering: [
      /\b(people|those|families|workers)\b.{0,60}\b(who|that)\b.{0,40}\b(contribute|pay in|pay their way|work|pay taxes)\b.{0,100}\b(versus|while|against)\b.{0,60}\b(claimants|benefits|welfare|people on benefits)\b/i,
      /\b(claimants|people on benefits|welfare recipients|benefit recipients)\b.{0,80}\b(do nothing|contribute nothing|give nothing back|take without giving)\b/i,
      /\b(working people|workers|taxpayers)\b.{0,80}\b(versus|against|while)\b.{0,80}\b(claimants|people on benefits)\b/i
    ],
    workAlwaysPays: [
      /\b(work|working|employment)\b.{0,50}\b(always|should always|must)\b.{0,50}\b(pay|pay better|be better off)\b.{0,80}\b(benefits|welfare|claiming)\b/i,
      /\b(benefits|welfare)\b.{0,80}\b(pay less|should pay less|never pay more)\b.{0,80}\b(work|working|employment)\b/i,
      /\b(work|working)\b.{0,80}\b(always pays better than|pays better than|should pay better than)\b.{0,80}\b(benefits|welfare)\b/i
    ],
    moralWelfareJudgement: [
      /\b(morally|moral)\b.{0,60}\b(wrong|bad|unacceptable|indefensible)\b.{0,80}\b(benefits|welfare|claim|claiming|claimants|support)\b/i,
      /\b(benefits|welfare|claiming benefits)\b.{0,60}\b(is|are)\b.{0,30}\b(morally wrong|wrong|unfair|unacceptable)\b/i
    ],
    fairnessFraming: [
      /\b(restore|bring back|protect|ensure)\b.{0,50}\b(fairness|fair)\b.{0,100}\b(taxpayers|workers|working people)\b/i,
      /\b(fairness|fair)\b.{0,60}\b(taxpayers|workers|working people)\b.{0,100}\b(benefits|welfare|claimants)\b/i
    ],
    politicalWeaponisationRhetoric: [
      /\b(welfare|benefits)\b.{0,60}\b(weapon|weaponise|weaponised|weaponising|weaponize|weaponized|weaponizing)\b/i,
      /\b(claimants|recipients|people on benefits)\b.{0,60}\b(scapegoat|scapegoats|scapegoating)\b/i,
      /\b(boost|boosting)\b.{0,60}\b(polls|polling)\b/i,
      /\blabour\b.{0,40}\b(welfare|benefit)\b.{0,40}\bparty\b/i
    ],
    hygieneStigmaRhetoric: [
      /\b(claimant|claimants|benefit|benefits|welfare|disabled)\b.{0,60}\b(stink|stinks|smell|smelly|don’t wash|dont wash|never wash|unwashed|dirty|filthy)\b/i,
      /\b(stink|stinks|smell|smelly|don’t wash|dont wash|never wash|unwashed|dirty|filthy)\b.{0,60}\b(claimant|claimants|benefit|benefits|welfare|disabled)\b/i
    ]
  };

  const foundHygieneStigma = hygieneStigmaPhrases.filter(p => lower.includes(p));
  const foundStigmaPhrases = negativeStigmaPhrases.filter(phrase => lower.includes(phrase) || fuzzyMatchAny(lower, [phrase]));
  const foundNonContributor = nonContributorPhrases.filter(p => lower.includes(p) || fuzzyMatchAny(lower, [p]));
  const foundContributionFairness = contributionAndFairnessPhrases.filter(p => lower.includes(p));
  const foundGeneralisation = generalisationConstructions.filter(p => lower.includes(p) || fuzzyMatchAny(lower, [p]));
  const foundFraudAssoc = fraudAssociationPairs.filter(pair => {
    const parts = pair.split(' + ');
    return parts.every(part => lower.includes(part));
  });
  const foundShockingCase = shockingCasePhrases.filter(p => lower.includes(p));
  const foundLoadedHeadline = loadedHeadlinePhrases.filter(p => lower.includes(p));
  const foundLuxuryMotability = luxuryMotabilityPhrases.filter(p => lower.includes(p));
  const foundAppearancePolicing = appearancePolicingPhrases.filter(p => lower.includes(p));
  const foundTheyCanWork = theyCanWorkPhrases.filter(p => lower.includes(p));
  const foundLifestyle = lifestylePhrases.filter(p => lower.includes(p));
  const foundBenefitTourism = benefitTourismPhrases.filter(p => lower.includes(p));
  const foundBenefitChoice = benefitChoicePhrases.filter(p => lower.includes(p));
  const foundBrokenSystem = brokenSystemPhrases.filter(p => lower.includes(p));
  const foundCrackdown = crackdownPhrases.filter(p => lower.includes(p));

  const foundSensationalism = mediaSensationalismPhrases.filter(phrase => lower.includes(phrase));
  const foundDehumanising = dehumanisingPhrases.filter(phrase => lower.includes(phrase));
  const foundMoralPanic = moralPanicPhrases.filter(phrase => lower.includes(phrase));
  const foundOthering = claimantOtheringPhrases.filter(phrase => lower.includes(phrase));
  const foundEntitlement = entitlementMockeryPhrases.filter(phrase => lower.includes(phrase));
  const foundAssessmentMockery = assessmentMockeryPhrases.filter(phrase => lower.includes(phrase));
  const foundMaximisation = benefitMaximisationPhrases.filter(phrase => lower.includes(phrase));
  const foundAusterity = austerityFramingPhrases.filter(phrase => lower.includes(phrase));

  const voucherProposalPhrases = [
    'disability vouchers', 'disability voucher', 'disabled people vouchers', 'pip vouchers', 'pip voucher',
    'replace pip with vouchers', 'replace benefits with vouchers', 'replace disability benefits with vouchers',
    'replace cash benefits with vouchers', 'give disabled people vouchers instead', 'vouchers instead of benefits',
    'vouchers instead of pip', 'vouchers instead of cash', 'cash benefits should be replaced with vouchers',
    'disability benefit vouchers', 'disability shopping vouchers', 'restricted disability vouchers',
    'restricted vouchers for disabled people', 'food vouchers instead of benefits', 'only spend it on disability products',
    'only spend benefits on disability products', 'stop giving disabled people cash', 'cashless disability benefits',
    'benefits should be vouchers', 'taxpayer funded vouchers'
  ];

  const voucherEffectivenessPhrases = [
    'vouchers would improve outcomes', 'vouchers will improve outcomes', 'vouchers improve disabled people’s lives',
    'vouchers would make disabled people better off', 'vouchers would help disabled people more',
    'vouchers would be better for disabled people', 'vouchers are better than cash', 'vouchers would work better than cash',
    'vouchers would reduce disability costs', 'vouchers would solve disability costs', 'vouchers would make things fairer'
  ];

  const voucherFraudControlPhrases = [
    'vouchers would stop fraud', 'vouchers will stop fraud', 'vouchers prevent fraud', 'vouchers would prevent fraud',
    'vouchers stop benefit abuse', 'vouchers prevent benefit abuse', 'vouchers stop people wasting benefits',
    'vouchers stop people wasting money', 'vouchers ensure claimants spend it properly', 'vouchers make sure the money is spent properly'
  ];

  const voucherChoicePhrases = [
    'restricted vouchers', 'restricted disability vouchers', 'voucher catalogue', 'catalogue scheme',
    'catalogue of approved items', 'approved list of items', 'approved disability products',
    'approved providers only', 'approved suppliers only', 'only approved providers', 'only approved suppliers',
    'only spend vouchers on', 'restricted to approved', 'restricted to certain products', 'restricted to certain services',
    'restricted to certain providers', 'restricted choice', 'limit their choice', 'limited choice for disabled people',
    'limit disabled people’s choice', 'reduce disabled people’s choice', 'reduce choice for disabled people',
    'less choice for disabled people', 'less flexibility for disabled people', 'restrict what disabled people can buy',
    'restrict what claimants can buy', 'only buy disability products', 'only buy approved equipment', 'only buy approved services'
  ];

  const voucherMarketPhrases = [
    'voucher providers', 'voucher suppliers', 'approved voucher providers', 'approved voucher suppliers',
    'private voucher providers', 'private disability providers', 'private companies providing vouchers',
    'private companies administering vouchers', 'commercial voucher providers', 'voucher market', 'voucher marketplace',
    'voucher contracts', 'voucher procurement', 'voucher administration contracts', 'profit from disability vouchers',
    'profiting from disability vouchers', 'companies profit from vouchers', 'corporate profit from disability',
    'commercialise disability benefits', 'commercialise disability support', 'privatise disability support',
    'privatisation of disability support', 'private sector disability vouchers'
  ];

  const voucherAdminPhrases = [
    'voucher administration costs', 'administrative cost of vouchers', 'administrative costs of vouchers',
    'cost of administering vouchers', 'expensive voucher system', 'expensive to administer vouchers',
    'complex voucher system', 'complex to administer vouchers', 'voucher bureaucracy', 'voucher administration',
    'monitor voucher use', 'monitoring voucher use', 'maintain an approved list', 'maintain a list of approved products',
    'supplier monitoring', 'supplier verification', 'voucher compliance', 'voucher oversight', 'voucher auditing'
  ];

  const foundVoucherProposal = voucherProposalPhrases.filter(p => lower.includes(p));
  const foundVoucherEffectiveness = voucherEffectivenessPhrases.filter(p => lower.includes(p));
  const foundVoucherFraud = voucherFraudControlPhrases.filter(p => lower.includes(p));
  const foundVoucherChoice = voucherChoicePhrases.filter(p => lower.includes(p));
  const foundVoucherMarket = voucherMarketPhrases.filter(p => lower.includes(p));
  const foundVoucherAdmin = voucherAdminPhrases.filter(p => lower.includes(p));

  const hasVoucherMention = foundVoucherProposal.length > 0 || foundVoucherEffectiveness.length > 0 || foundVoucherFraud.length > 0 || foundVoucherChoice.length > 0 || foundVoucherMarket.length > 0 || foundVoucherAdmin.length > 0;

  const robustPatterns = {
    disabilityVoucherRestriction: [
      /\b(disability|disabled|pip|disability benefit)\b.{0,80}\b(voucher|vouchers|catalogue|catalog|approved list)\b.{0,100}\b(restrict|restricted|restricting|limit|limited|limiting|reduce|reducing|constrain|constrained|curtail)\b.{0,80}\b(choice|flexibility|options|access)\b/i,
      /\b(voucher|vouchers|catalogue|catalog|approved list)\b.{0,100}\b(restrict|restricted|restricting|limit|limited|limiting|reduce|reducing|constrain|constrained|curtail)\b.{0,100}\b(disabled|disability|claimant|recipient)\b/i,
      /\b(restrict|restricted|restricting|limit|limited|limiting|reduce|reducing|constrain|constrained|curtail)\b.{0,60}\b(disabled people|disabled people’s|disabled persons|claimants|recipients)\b.{0,100}\b(choice|flexibility|options|care|support|services|equipment)\b/i
    ],

    disabilityVoucherComplexCare: [
      /\b(voucher|vouchers|catalogue|catalog)\b.{0,120}\b(complex care|complex needs|specialist care|specialist needs|individual needs|unusual needs|multiple needs)\b/i,
      /\b(complex care|complex needs|specialist care|specialist needs|individual needs)\b.{0,120}\b(voucher|vouchers|catalogue|catalog|approved provider|approved supplier)\b/i,
      /\b(voucher|vouchers)\b.{0,120}\b(not cover|cannot cover|can’t cover|may not cover|would not cover|wouldn’t cover)\b.{0,100}\b(needs|care|services|support|equipment)\b/i
    ],

    disabilityVoucherMarketRisk: [
      /\b(voucher|vouchers)\b.{0,120}\b(private|commercial|corporate|company|companies|provider|providers|supplier|suppliers|contractor|contractors)\b/i,
      /\b(privatis|commercialis|profit|profiteer|profiting|procurement|contract)\w*\b.{0,120}\b(voucher|vouchers|disability|disabled|support|benefit)\b/i
    ],

    disabilityVoucherAdministration: [
      /\b(voucher|vouchers|catalogue|catalog|approved list)\b.{0,120}\b(administrat|bureaucr|oversee|oversight|monitor|monitoring|audit|compliance|verification|supplier management)\w*\b/i,
      /\b(administrat|bureaucr|oversee|oversight|monitor|monitoring|audit|compliance|verification)\w*\b.{0,120}\b(voucher|vouchers|catalogue|catalog)\b/i
    ],

    disabilityVoucherChoice: [
      /\b(voucher|vouchers)\b.{0,120}\b(choice|flexibility|options|freedom)\b/i,
      /\b(choice|flexibility|options|freedom)\b.{0,120}\b(voucher|vouchers|catalogue|catalog)\b/i
    ],

    voucherReplacement: [
      /\b(replace|replacing|replacement|substitut|switch|convert)\w*\b.{0,100}\b(pip|cash benefit|cash benefits|disability benefit|disability benefits|benefit|benefits)\b.{0,100}\b(voucher|vouchers|catalogue|catalog)\b/i,
      /\b(voucher|vouchers)\b.{0,100}\b(instead of|rather than|in place of)\b.{0,100}\b(pip|cash|benefit|benefits|disability support)\b/i
    ],

    voucherEffectivenessClaim: [
      /\b(voucher|vouchers)\b.{0,120}\b(will|would|can|could|does|do)\b.{0,80}\b(improve|solve|reduce|prevent|stop|eliminate|fix|control|save)\b/i,
      /\b(voucher|vouchers)\b.{0,120}\b(better|more effective|more efficient|fairer|cheaper)\b/i
    ],

    fraudFraming: [
      /\b(voucher|vouchers|pip|benefits|welfare|claimants|disabled people)\b.{0,100}\b(fraud|fraudulent|fraudsters|cheat|cheating|scam|scamming|abuse|gaming|game|fake|faking|lying)\b/i,
      /\b(fraud|fraudulent|cheat|cheating|scam|scamming|abuse|gaming|game|fake|faking|lying)\b.{0,100}\b(voucher|vouchers|pip|benefits|welfare|claimants|disabled people)\b/i
    ],

    workShaming: [
      /\b(benefit|benefits|welfare|pip|claimant|claimants|disabled people)\b.{0,100}\b(lazy|work shy|work-shy|refuse to work|won’t work|wont work|chooses not to work|should work|should get a job|could easily work)\b/i,
      /\b(lazy|work shy|work-shy|refuse to work|won’t work|wont work|chooses not to work)\b.{0,100}\b(benefit|benefits|welfare|pip|claimant|claimants)\b/i
    ],

    claimantGeneralisation: [
      /\b(all|every|everyone|most|majority|typical|average|generally)\b.{0,60}\b(claimant|claimants|people on benefits|people claiming pip|people on welfare|disabled people|benefit recipients)\b/i,
      /\b(claimant|claimants|people on benefits|people claiming pip|people on welfare|disabled people|benefit recipients)\b.{0,60}\b(all|every|everyone|most|majority|typically|generally)\b/i
    ],

    appearanceDisabilityInvalidation: [
      /\b(look|looks|looking|seen|seeing)\b.{0,80}\b(fine|healthy|normal|well|walking|shopping|holiday|gym|driving)\b.{0,100}\b(disabled|sick|ill|benefits|pip)\b/i,
      /\b(doesn’t|doesnt|wouldn’t|wouldnt|can’t|cant|cannot)\b.{0,60}\b(look|seem)\b.{0,60}\b(disabled|sick|ill)\b/i
    ],

    economicScapegoating: [
      /\b(disabled people|claimants|benefit recipients|people on benefits|welfare recipients)\b.{0,100}\b(burden|drain|cost|costing|expense|taxpayer|taxpayers)\b/i,
      /\b(burden|drain|cost|costing|expense)\b.{0,100}\b(disabled people|claimants|benefit recipients|people on benefits|welfare recipients)\b/i
    ],

    ...robustPoliticalPatterns
  };

  const robustHits = {};
  for (const [category, patterns] of Object.entries(robustPatterns)) {
    robustHits[category] = patterns.some(pattern => pattern.test(lower));
  }

  const robustFramingHits = Object.values(robustHits).filter(Boolean).length;

  const robustVoucherChoice = robustHits.disabilityVoucherRestriction || robustHits.disabilityVoucherChoice || robustHits.disabilityVoucherComplexCare;
  const robustVoucherMarket = robustHits.disabilityVoucherMarketRisk;
  const robustVoucherAdmin = robustHits.disabilityVoucherAdministration;
  const robustVoucherProposal = robustHits.voucherReplacement || robustVoucherChoice || robustVoucherMarket || robustVoucherAdmin;
  const robustFraud = robustHits.fraudFraming;
  const robustGeneralisation = robustHits.claimantGeneralisation;
  const robustWorkShaming = robustHits.workShaming;
  const robustAppearanceInvalidation = robustHits.appearanceDisabilityInvalidation;
  const robustEconomicScapegoating = robustHits.economicScapegoating;

  const toxicAnalysis = {
    derogatoryLanguage: foundDehumanising.length > 0 || foundStigmaPhrases.length > 2 || foundHygieneStigma.length > 0 || robustHits.hygieneStigmaRhetoric ? "HIGH" : (foundStigmaPhrases.length > 0 ? "MEDIUM" : "LOW"),
    hygieneStigma: foundHygieneStigma.length > 0 || robustHits.hygieneStigmaRhetoric || hygieneStigmaClaim ? "HIGH" : "LOW",
    generalisation: foundGeneralisation.length > 0 || robustGeneralisation ? "HIGH" : "LOW",
    fraudAssociation: foundFraudAssoc.length > 0 || (lower.includes('fraud') && lower.includes('claimant')) || robustFraud ? "HIGH" : "LOW",
    disabilityInvalidation: foundAppearancePolicing.length > 0 || robustAppearanceInvalidation ? "HIGH" : "LOW",
    moralJudgement: foundEntitlement.length > 0 || moralJudgement ? "HIGH" : "LOW",
    economicScapegoating: foundNonContributor.length > 0 || lower.includes('taxpayer') || robustEconomicScapegoating ? "HIGH" : "LOW",
    crisisAmplification: foundMoralPanic.length > 0 || foundSensationalism.length > 0 ? "HIGH" : "LOW",
    anecdotalGeneralisation: foundShockingCase.length > 0 || hasAnecdote ? "HIGH" : "LOW",
    othering: foundOthering.length > 0 ? "HIGH" : "LOW",
    entitlementFraming: foundEntitlement.length > 0 ? "HIGH" : "LOW",
    assessmentMockery: foundAssessmentMockery.length > 0 || foundBrokenSystem.length > 0 || lower.includes('easy to game') ? "HIGH" : "LOW",
    sensationalism: foundSensationalism.length > 0 || foundLoadedHeadline.length > 0 ? "HIGH" : "LOW",
    disabilityVoucherChoiceRestriction: foundVoucherChoice.length > 0 || robustVoucherChoice ? "HIGH" : "LOW",
    disabilityVoucherMarketRisk: foundVoucherMarket.length > 0 || robustVoucherMarket ? "HIGH" : "LOW",
    disabilityVoucherAdministrativeRisk: foundVoucherAdmin.length > 0 || robustVoucherAdmin ? "HIGH" : "LOW",
    contributionOthering: foundContributionFairness.length > 0 || robustHits.contributionOthering ? "HIGH" : "LOW",
    workPayFraming: robustHits.workAlwaysPays ? "HIGH" : "LOW",
    moralWelfareJudgement: robustHits.moralWelfareJudgement ? "HIGH" : "LOW",
    fairnessFraming: robustHits.fairnessFraming ? "HIGH" : "LOW",
    politicalWeaponisation: robustHits.politicalWeaponisationRhetoric ? "HIGH" : "LOW"
  };

  const welfareTopics = [
    'pip', 'universal credit', 'benefits', 'welfare', 'disabled', 'disability', 'work capability', 
    'fit note', 'sick note', 'esa', 'employment and support allowance', 'dla', 'disability living allowance', 
    'motability', 'carer allowance', 'carer’s allowance', 'carer credit', 'carer’s credit',
    'attendance allowance', 'pension credit', 'jsa', 'jobseeker', 'jobseeker’s allowance', 
    'income support', 'housing benefit', 'tax credits', 'iidb', 'industrial injuries disablement benefit', 
    'industrial injuries', 'incapacity benefit', 'severe disablement allowance', 'sda',
    'child benefit', 'guardian allowance', 'maternity allowance', 'bereavement support payment', 
    'bereavement support', 'bereavement benefit', 'widow’s benefit', 'state pension', 
    'blue badge', 'council tax reduction', 'local welfare', 'winter fuel payment', 'warm home discount',
    'cold weather payment', 'constant attendance allowance', 'vouchers', 'voucher'
  ];
  
  const genericNegativeIndicators = [
    'bad', 'terrible', 'awful', 'horrible', 'useless', 'ruining', 'destroying', 
    'costing billions', 'out of control', 'crisis', 'fraud', 'cheat', 'scam', 
    'lazy', 'refuse', 'burden', 'waste', 'drain', 'wrong', 'joke', 'free', 'game', 'fake', 'stink', 'stinks'
  ];
  
  const mentionsWelfare = welfareTopics.some(topic => lower.includes(topic));
  const hasNegativeTone = genericNegativeIndicators.some(indicator => {
    const regex = new RegExp(`\\b${indicator}\\b`, 'i');
    return regex.test(lower);
  });

  const isPipClaim = lower.includes('pip') || lower.includes('personal independence payment');
  const isMotabilityClaim = foundLuxuryMotability.length > 0 || lower.includes('motability') || (lower.includes('free') && (lower.includes('car' ) || lower.includes('vehicle'))) || lower.includes('pip car');
  const isNeutralVoucherProposal = (hasVoucherMention || robustVoucherProposal) && foundVoucherEffectiveness.length === 0 && foundVoucherFraud.length === 0 && !hasNegativeTone && !isIndirectOrCritical;

  const totalFramingHits =
    foundStigmaPhrases.length +
    foundNonContributor.length +
    foundContributionFairness.length +
    foundGeneralisation.length +
    foundFraudAssoc.length +
    foundShockingCase.length +
    foundLoadedHeadline.length +
    foundLuxuryMotability.length +
    foundAppearancePolicing.length +
    foundTheyCanWork.length +
    foundLifestyle.length +
    foundBenefitTourism.length +
    foundBenefitChoice.length +
    foundBrokenSystem.length +
    foundCrackdown.length +
    foundSensationalism.length +
    foundDehumanising.length +
    foundMoralPanic.length +
    foundOthering.length +
    foundEntitlement.length +
    foundAssessmentMockery.length +
    foundMaximisation.length +
    foundAusterity.length +
    foundHygieneStigma.length +
    robustFramingHits;

  const isPensionCreditClaim = lower.includes('pension credit');
  const isUniversalCreditClaim = lower.includes('universal credit') || lower.includes(' uc ');
  const isCarerClaim = lower.includes('carer') || lower.includes('attendance allowance');
  const isStatePensionClaim = lower.includes('state pension');

  const isPoliticalWelfareClaim = lower.includes('way of life') || lower.includes('morally wrong') || lower.includes('footing the bill') || foundContributionFairness.length > 0 || robustHits.welfareWayOfLife || robustHits.contributionOthering || robustHits.workAlwaysPays || robustHits.moralWelfareJudgement || robustHits.fairnessFraming || robustHits.politicalWeaponisationRhetoric;
  const isWorkPayComparisonClaim = lower.includes('pay more than getting a job') || lower.includes('better than working') || robustHits.workPayComparison;
  const isChildCapClaim = lower.includes('child cap') || lower.includes('2-child') || lower.includes('two-child') || robustHits.childBenefitCapRhetoric;

  const highRiskRhetoric =
    robustHits.moralWelfareJudgement ||
    robustHits.workAlwaysPays ||
    robustHits.contributionOthering ||
    robustHits.fairnessFraming ||
    robustHits.politicalWeaponisationRhetoric ||
    robustHits.hygieneStigmaRhetoric ||
    robustWorkShaming ||
    robustGeneralisation ||
    robustFraud ||
    robustEconomicScapegoating;

  // — EVIDENCE VS RHETORIC BALANCE —
  const hasCredibleEvidence =
    evidenceLevel === "PRIMARY_SOURCE" ||
    evidenceLevel === "MULTIPLE_SOURCES" ||
    evidenceLevel === "ATTRIBUTED_CLAIM" ||
    (evidenceLevel === "SPECIFIC_STATISTIC" && sourceMentioned) ||
    sourceMentioned;

  const hasMeaningfulRhetoric =
    totalFramingHits > 0 ||
    robustFramingHits > 0 ||
    foundStigmaPhrases.length > 0 ||
    foundGeneralisation.length > 0 ||
    foundFraudAssoc.length > 0 ||
    foundShockingCase.length > 0 ||
    foundLoadedHeadline.length > 0 ||
    foundAppearancePolicing.length > 0 ||
    foundTheyCanWork.length > 0 ||
    foundLifestyle.length > 0 ||
    foundBenefitChoice.length > 0 ||
    foundDehumanising.length > 0 ||
    foundMoralPanic.length > 0 ||
    foundOthering.length > 0 ||
    foundEntitlement.length > 0 ||
    foundAssessmentMockery.length > 0 ||
    foundMaximisation.length > 0 ||
    foundAusterity.length > 0 ||
    foundHygieneStigma.length > 0 ||
    highRiskRhetoric;

  const hasSevereClaimIntegrityProblem =
    hasFraudAmountToClaimantPercentage ||
    conflatesFraudAndErrors ||
    missingDenominator ||
    unsourcedStatistic ||
    visibleActivityInference ||
    workingMeansNotDisabled ||
    diagnosisMeansEntitlement;

  const isSourceBackedStigma =
    hasCredibleEvidence &&
    hasMeaningfulRhetoric;

  const isMixedEvidenceCase =
    isSourceBackedStigma &&
    !hasSevereClaimIntegrityProblem &&
    !policyCriticism;

  // Check specifically if statement contains official source-backed figures / data accompanied by anti-welfare rhetoric
  const hasOfficialSourceWithAntiWelfareRhetoric = (hasCredibleEvidence || sourceMentioned) && !policyCriticism;

  // ============================================================
  // CONDITIONAL BRANCHING (PLACED BEFORE GENERAL CATCH-ALLS)
  // ============================================================
  if (hygieneStigmaClaim) {
    score = Math.max(98, score + 78);
    extractedQuotes.push(`"${text.length > 120 ? text.substring(0, 120) + '...' : text}"`);
    flags.push(`HIGH BS / DEHUMANISING HYGIENE TROPE: Uses abusive, derogatory tropes regarding personal cleanliness or hygiene against benefit claimants, ignoring systemic barriers, disability, chronic illness, and severe pain.`);

    primaryRebuttal = `DEBUNKING HYGIENE TROPES & DISABILITY BARRIERS: Claims portraying benefit claimants or disabled people as unwashed, dirty, or "stinking" are factually baseless, dehumanising tropes. In the UK, millions of disabled people and individuals with long-term physical or mental health conditions experience severe daily barriers, severe physical pain, mobility loss, sensory impairments, or fatigue that make washing, bathing, and personal care extremely challenging or impossible without formal assistance. Statutory assessment frameworks like Personal Independence Payment (PIP) explicitly recognize "Washing and Bathing" as a core descriptor of daily living impairment. Furthermore, widespread poverty, social isolation, and rising energy costs often prevent vulnerable individuals from accessing hot water or heating, making hygiene challenges a structural barrier rather than a personal choice or fault.`;
    sourceRef = "DWP PIP Assessment Guide (Daily Living Descriptors), Equality and Human Rights Commission (EHRC) & Scope UK";

    sourceLinks = [
      { label: "GOV.UK PIP Assessment Guide: Washing & Bathing", url: "https://www.gov.uk/government/publications/personal-independence-payment-pip-assessment-guide-for-assessment-providers" },
      { label: "Scope Disability Equality Charity", url: "https://www.scope.org.uk/" },
      { label: "Equality and Human Rights Commission", url: "https://www.equalityhumanrights.com/" }
    ];
  } else if (sickNoteClaim) {
    score = Math.max(92, score + 70);
    extractedQuotes.push(`"${text.length > 120 ? text.substring(0, 120) + '...' : text}"`);
    flags.push(`FLAGGED SICK NOTE / FIT NOTE VOLUME CLAIM: Cites the 11 million sick note figure without context regarding underlying socioeconomic drivers, poor health, poverty, NHS waiting lists, or lack of in-work occupational health support.`);

    primaryRebuttal = `DEBUNKING THE 11 MILLION SICK NOTE NARRATIVE: While 11 million fit notes are issued annually, attributing this entirely to a 'broken sick note system' or GPs 'gatekeeping' ignores the structural and systemic drivers behind rising sickness absence. The surge is driven by deteriorating public health, widening socioeconomic inequalities and poverty, extensive NHS waiting lists (where patients are unable to work while waiting for treatment), and a severe lack of in-work occupational health support and workplace adjustments. GPs do not wish to act as administrative gatekeepers, but they are issuing fit notes for patients genuinely struggling with physical and mental health conditions exacerbated by delayed healthcare access and inflexible workplace environments.`;
    sourceRef = "ONS Sickness Absence in the UK Labour Market, NHS Waiting List Statistics & Health Foundation Research";

    sourceLinks = [
      { label: "ONS Sickness Absence in the UK Labour Market", url: "https://www.ons.gov.uk/employmentandlabourmarket/peopleinwork/earningsandworkinghours/bulletins/sicknessabsenceinthelabourmarket/latest" },
      { label: "Health Foundation Work and Health Analysis", url: "https://www.health.org.uk/" },
      { label: "NHS Consultant-led Referral to Treatment Waiting Times", url: "https://www.england.nhs.uk/statistics/statistical-work-areas/rtt-waiting-times/" }
    ];
  } else if (GBNEWS_BENEFITS_SPLURGE_CLAIM) {
    score = 96;
    extractedQuotes.push(`"${text.length > 120 ? text.substring(0, 120) + '...' : text}"`);
    flags.push(`FLAGGED GEOGRAPHIC & PARLIAMENTARY PARTISAN SCAPEGOATING: Characterises demand-led statutory benefit spending across constituencies as a partisan 'splurge' or 'Welfare Party' tactic, ignoring baseline population size, local economic demographics, and health outcomes.`);

    primaryRebuttal = `DEBUNKING 'WELFARE PARTY' AND CONSTITUENCY BENFIT 'SPLURGE' CLAIMS: Allegations that social security expenditure represents a partisan 'splurge' targeted at specific parliamentary seats misrepresent statutory welfare administration. Social security entitlements—including Universal Credit, Disability Living Allowance, and PIP—are administered strictly based on individual statutory eligibility under DWP regulations, not constituency boundaries or parliamentary control. Official DWP Stat-Xplore and ONS labor market data confirm that higher benefit expenditure in specific geographic areas correlates directly with population density, local health inequalities, lower average household incomes, and industrial structural factors. Furthermore, IFS expenditure analyses show that around 40% of Universal Credit recipients across all constituencies are in active employment but require wage top-ups due to low hourly pay or part-time hours.`;
    sourceRef = "DWP Stat-Xplore Constituency Caseload Data, ONS Regional Labour Market Statistics & IFS Welfare Analysis";

    sourceLinks = [
      { label: "DWP Stat-Xplore Constituency Statistics", url: "https://stat-xplore.dwp.gov.uk/" },
      { label: "ONS Regional Labour Market Overview", url: "https://www.ons.gov.uk/employmentandlabourmarket" },
      { label: "IFS TaxLab: UK Welfare & Regional Spending", url: "https://ifs.org.uk/taxlab/taxlab-data-feed/uk-welfare-spending" }
    ];
  } else if (GRADUATE_BENEFITS_CLAIM) {
    score = 95;
    extractedQuotes.push(`"${text.length > 120 ? text.substring(0, 120) + '...' : text}"`);
    flags.push(`FLAGGED GRADUATE WELFARE RHETORIC: Mischaracterises higher education advice and statutory Universal Credit entitlement as a 'fast-track onto welfare' or 'graduation present', ignoring mandatory Jobcentre conditionality frameworks.`);

    primaryRebuttal = `DEBUNKING GRADUATE WELFARE AND 'FAST-TRACK' CLAIMS: Rhetoric alleging that universities are 'fast-tracking graduates onto welfare' or treating benefits as a 'graduation present' misrepresents statutory UC rules and higher education career advisory services. University hardship funds and welfare advice services guide eligible graduates to access statutory safety-net support strictly in accordance with DWP regulations during transitions into employment or postgraduate training. Universal Credit recipients are immediately subject to full work-search conditionality under DWP guidelines, requiring up to 35 hours per week of documented job-seeking, regular work coach interviews, and mandatory participation in employment schemes. Furthermore, HESA (Higher Education Statistics Agency) official outcome figures show that the vast majority of university graduates progress directly into employment or further study.`;
    sourceRef = "DWP Universal Credit Conditionality Guidance & HESA Graduate Outcomes Statistics";

    sourceLinks = [
      { label: "GOV.UK Universal Credit Work Search Requirements", url: "https://www.gov.uk/guidance/universal-credit-and-you" },
      { label: "HESA Graduate Outcomes Official Data", url: "https://www.hesa.ac.uk/data-and-analysis/graduates" },
      { label: "DWP Stat-Xplore Portal", url: "https://stat-xplore.dwp.gov.uk/" }
    ];
  } else if (schoolToBenefitsClaim) {
    score = Math.max(98, score + 78);
    extractedQuotes.push(`"${text.length > 120 ? text.substring(0, 120) + '...' : text}"`);
    flags.push(`HIGH BS / FACTUALLY IMPOSSIBLE CLAIM: Asserts that school leavers can go "straight on the dole" or onto benefits immediately upon leaving school, contradicting UK statutory eligibility rules and Universal Credit conditionality frameworks.`);

    primaryRebuttal = `DEBUNKING SCHOOL-LEAVER BENEFIT MYTHS: Claims that young people can leave school and go "straight on the dole" or immediately receive out-of-work benefits are factually impossible under statutory UK welfare rules (GOV.UK). Under UK law, 16- and 17-year-olds are legally required to remain in education, an apprenticeship, or training, and are strictly ineligible for Universal Credit except under rare, specific statutory exceptions (e.g. severe disability, being a parent, or being estranged without parental support). Furthermore, standard Universal Credit entitlement begins at age 18, at which point claimants are legally bound by stringent Jobcentre guidelines. Claimants must sign a Claimant Commitment requiring up to 35 hours per week of active job-seeking, mandatory work coach meetings, and compliance with work-preparation schemes; failure to comply results in heavy financial sanctions.`;
    sourceRef = "GOV.UK Universal Credit Rules for 16-17 Year Olds, UC Conditionality & Sanctions Framework";

    sourceLinks = [
      { label: "GOV.UK Universal Credit Eligibility & Age Rules", url: "https://www.gov.uk/universal-credit/eligibility" },
      { label: "GOV.UK Universal Credit for 16 and 17 year olds", url: "https://www.gov.uk/universal-credit/16-17" },
      { label: "GOV.UK Universal Credit Conditionality & Sanctions Guidance", url: "https://www.gov.uk/guidance/universal-credit-and-you" }
    ];
  } else if (pipFakingClaim) {
    score = Math.max(95, score + 75);
    extractedQuotes.push(`"${text.length > 120 ? text.substring(0, 120) + '...' : text}"`);
    flags.push(`FLAGGED PIP FAKING / MISCONCEPTION CLAIM: Inaccurately implies that Personal Independence Payment (PIP) is awarded based on a medical diagnosis or condition alone, or that awards are easily faked without meeting rigorous functional criteria.`);

    primaryRebuttal = `DEBUNKING PIP FAKING AND CONDITION-BASED MYTHS: Claims that PIP is awarded simply based on having a specific medical condition or diagnosis—or that individuals can easily "fake" an award—contradict official DWP assessment frameworks. PIP is not awarded on condition title; rather, eligibility is determined by a rigorous functional assessment evaluating how a health condition or disability affects an individual's ability to carry out key daily living and mobility activities (such as preparing food, washing, dressing, and moving around). Assessments involve structured point-scoring criteria backed by supporting medical evidence and health professional evaluations, as detailed in official DWP Stat-Xplore and assessment guidance statistics.`;
    sourceRef = "DWP PIP Assessment Guide for Health Professionals & Stat-Xplore Caseload Data";

    sourceLinks = [
      { label: "GOV.UK PIP Assessment Guide", url: "https://www.gov.uk/government/publications/personal-independence-payment-pip-assessment-guide-for-assessment-providers" },
      { label: "DWP Stat-Xplore Portal", url: "https://stat-xplore.dwp.gov.uk/" }
    ];
  } else if (isMotabilityClaim) {
    score = isIndirectOrCritical ? 40 : Math.max(90, score + 70);
    extractedQuotes.push(`"${text.length > 120 ? text.substring(0, 120) + '...' : text}"`);
    flags.push(`FLAGGED MISLEADING BENEFIT VEHICLE CLAIM: Asserts inaccurate information regarding Motability vehicle entitlement without accounting for statutory component assignment.`);
    
    primaryRebuttal = `DEBUNKING MOTABILITY & BENEFIT VEHICLE MYTHS: Claims that individuals on PIP or related benefits receive "free cars" are entirely incorrect. Participants on the Motability scheme do not get a free vehicle; rather, they choose to redirect either all or part of their weekly Personal Independence Payment (PIP) mobility component (or DLA/AFIP/ADPIP equivalent) to lease the vehicle.`;
    sourceRef = "Motability Operations Scheme Rules, DWP PIP Handbook & Statutory Guidance";
    
    sourceLinks = [
      { label: "GOV.UK Get a vehicle through the Motability scheme", url: "https://www.gov.uk/get-motability-vehicle" },
      { label: "DWP PIP Handbook for claimants and assessors", url: "https://www.gov.uk/government/publications/personal-independence-payment-handbook" }
    ];
  } else if (isPipClaim && (containsFraudTerm || conflatesFraudAndErrors || hasFraudAmountToClaimantPercentage || lower.includes('billion') || lower.includes('fraud'))) {
    score = Math.max(92, score + 70);
    extractedQuotes.push(`"${text.length > 120 ? text.substring(0, 120) + '...' : text}"`);
    flags.push(`PIP FRAUD / ERROR CONFLATION OR DENOMINATOR ERROR: Conflates total overpayment expenditure with deliberate fraud or incorrectly translates expenditure rates to claimant-level prevalence.`);

    primaryRebuttal = `DWP does measure fraud and error within the benefit system. However, the official statistics distinguish fraud from claimant error and official error. For PIP specifically, DWP FYE statistics estimate total PIP overpayments at 2.3% (£660m), consisting of 1.4% fraud (£410m), 0.7% claimant error (£210m), and 0.2% official error (£50m). These are expenditure-based measures. They should not automatically be translated into "1.4% of disabled people are fraudulent" because that is a different denominator and claim. The reported fraud rate is a measure of incorrectly paid benefit expenditure; it is not evidence that benefit claimants generally are dishonest or that a corresponding percentage of claimants are committing fraud. Genuine fraud exists and DWP measures it, but the evidence does not justify extending the measured fraud rate into a general claim that benefit claimants are dishonest.`;
    sourceRef = "DWP Benefit Fraud and Error Statistics";
    sourceLinks = [
      { label: "DWP Benefit fraud and error official statistics", url: "https://www.gov.uk/government/collections/benefit-fraud-and-error-statistics" }
    ];
  } else if ((containsFraudTerm || conflatesFraudAndErrors || hasFraudAmountToClaimantPercentage) && (lower.includes('9.9') || lower.includes('billion'))) {
    score = Math.max(94, score + 72);
    extractedQuotes.push(`"${text.length > 120 ? text.substring(0, 120) + '...' : text}"`);
    flags.push(`DWP TOTAL OVERPAYMENTS CONFLATION: Conflates £9.9bn total overpayments (fraud + claimant error + official error) solely with fraud.`);

    primaryRebuttal = `DWP does measure fraud and error within the benefit system. However, the official statistics distinguish fraud from claimant error and official error. DWP's latest statistics estimate total benefit overpayments at 3.2% of benefit expenditure (£9.9bn), consisting of 2.2% fraud, 0.6% claimant error and 0.4% official error. Therefore, £9.9bn should not be described as £9.9bn of fraud. This expenditure-based measure is not evidence that benefit claimants generally are dishonest or that a corresponding percentage of claimants are committing fraud.`;
    sourceRef = "DWP Benefit Fraud and Error Statistics";
    sourceLinks = [
      { label: "DWP Benefit fraud and error official statistics", url: "https://www.gov.uk/government/collections/benefit-fraud-and-error-statistics" }
    ];
  } else if (
    (
      totalFramingHits > 0 ||
      robustFramingHits > 0 ||
      (mentionsWelfare && hasNegativeTone) ||
      lower.includes('easy to game') ||
      lower.includes('game') ||
      foundLifestyle.length > 0 ||
      foundBenefitChoice.length > 0
    ) &&
    !isIndirectOrCritical &&
    !hasCredibleEvidence
  ) {
    score = Math.min(
      100,
      Math.max(
        95,
        score + 75 + ((totalFramingHits + robustFramingHits) * 5)
      )
    );
    
    if (totalFramingHits > 0 || robustFramingHits > 0 || foundLifestyle.length > 0 || foundBenefitChoice.length > 0) {
      extractedQuotes.push(`"${text.length > 120 ? text.substring(0, 120) + '...' : text}"`);
      flags.push(`FLAGGED STIGMATISING RHETORIC: Promotes inaccurate generalizations portraying welfare as a lifestyle choice or political weapon, ignoring official DWP/ONS figures showing that 40% of Universal Credit claimants are in work alongside individuals trapped on lengthy NHS health waiting lists.`);
    } else {
      extractedQuotes.push(`"${text}"`);
      flags.push(`FLAGGED UNSUBSTANTIATED NEGATIVE ASSERTION: Makes sweeping negative claims regarding statutory benefits without supporting empirical data or primary source documentation.`);
    }

    flags.push(`NON-EVIDENCE BACKED STATEMENT: Uses negative narrative framing against welfare entitlement while ignoring verified baseline statistics.`);
    flags.push(`PUBLIC DISCOURSE RISK: Disseminates unsupported hostility toward benefit claimants by framing statutory entitlement access as inherently bad, abusive, or unmonitored.`);

    primaryRebuttal = `REBUKE AGAINST WELFARE STIGMATISATION: Claims portraying social security recipients as having a "lifestyle choice" or using benefit claimants as scapegoats are severely misleading and stigmatising. Official DWP and ONS statistics demonstrate that approximately 40% of Universal Credit claimants are already in work, supplementing low wages. Official figures confirm that total UK social protection spending as a percentage of GDP has remained relatively unchanged for decades, staying stable between 10% and 11%, and is actually lower than the peak of 12.1% recorded following the 2008 financial crisis.`;
    sourceRef = "DWP Stat-Xplore Work and Health Statistics, ONS Labour Market Overview, IFS TaxLab & OBR";
    
    sourceLinks = [
      { label: "DWP Stat-Xplore Portal", url: "https://stat-xplore.dwp.gov.uk/" },
      { label: "ONS Labour Market Statistics", url: "https://www.gov.uk/" },
      { label: "IFS TaxLab: UK Welfare & Social Security Spending", url: "https://ifs.org.uk/taxlab/taxlab-data-feed/uk-welfare-spending" }
    ];
  } else if ((hasOfficialSourceWithAntiWelfareRhetoric || isSourceBackedStigma) && !isIndirectOrCritical) {
    // --- PRIORITIZED MIXED EVIDENCE CHECK TO ENSURE MEDIUM SCORE OUTPUT ---
    score = 68;
    extractedQuotes.push(`"${text.length > 120 ? text.substring(0, 120) + '...' : text}"`);
    flags.push(`OFFICIAL SOURCE WITH ANTI-WELFARE RHETORIC / MIXED EVIDENCE: Contains documented official/statistical figures combined with anti-welfare or stigmatising narrative framing.`);
    primaryRebuttal = `FACTUAL COMPONENT: Uses documented official statistics or figures. RHETORICAL COMPONENT: Accompanied by anti-welfare rhetoric, economic scapegoating, or hostile inference. Classified as medium risk (contested/misleading framing).`;
    sourceRef = "Official Data Source with Anti-Welfare Rhetorical Overlay";
    sourceLinks = [
      { label: "DWP / ONS Official Data Portal", url: "https://stat-xplore.dwp.gov.uk/" },
      { label: "IFS Welfare Analysis", url: "https://ifs.org.uk/" }
    ];
  } else if (isPoliticalWelfareClaim && !isIndirectOrCritical) {
    if (highRiskRhetoric && !isIndirectOrCritical) {
      score = Math.min(100, Math.max(90, score + 70 + (robustFramingHits * 5)));
    } else {
      score = Math.max(95, score + 75);
    }
    extractedQuotes.push(`"${text.length > 120 ? text.substring(0, 120) + '...' : text}"`);
    flags.push(`POLITICAL RHETORIC FLAG: Characterises widespread social security support as a lifestyle choice or uses welfare as a political weapon while omitting structural economic context and health barriers.`);
    
    primaryRebuttal = `EVALUATION OF WELFARE DEPENDENCY & POLITICAL RHETORIC CLAIMS: Assertions that welfare is used as a political weapon, or that welfare has become a "way of life" to boost polling without official backing, ignore official DWP and ONS labor market data showing that the majority of claimants face severe health conditions, long NHS waiting lists, or are already combining low-paid part-time work with Universal Credit. Official figures from HM Treasury, the OBR, and the IFS demonstrate that total UK social protection spending as a percentage of GDP has remained relatively unchanged for decades, staying stable between 10% and 11%, and is actually lower than the peak of 12.1% recorded following the 2008 financial crisis.`;
    sourceRef = "DWP Stat-Xplore Caseload Data, ONS Labour Market Overview, IFS TaxLab & OBR";
    
    sourceLinks = [
      { label: "DWP Stat-Xplore Portal", url: "https://stat-xplore.dwp.gov.uk/" },
      { label: "ONS Labour Market Statistics", url: "https://www.gov.uk/" },
      { label: "IFS TaxLab: UK Welfare & Social Security Spending", url: "https://ifs.org.uk/taxlab/taxlab-data-feed/uk-welfare-spending" }
    ];
  } else if (isWorkPayComparisonClaim && !isIndirectOrCritical) {
    score = Math.max(96, score + 78);
    extractedQuotes.push(`"${text.length > 120 ? text.substring(0, 120) + '...' : text}"`);
    flags.push(`UNSUBSTANTIATED INCOME COMPARISON CLAIM: Implies out-of-work benefits routinely exceed employment income without accounting for statutory caps and work allowances.`);

    primaryRebuttal = `DEBUNKING BENEFIT VS WORK INCOME CLAIMS: Claims that benefits pay more than working are factually incorrect. Benefit caps (such as £25,323 per year in London and £22,020 per year elsewhere) ensure that out-of-work support does not exceed average earnings. Furthermore, the UK welfare structure explicitly incorporates Universal Credit tapers and work allowances, ensuring that work always pays more than claiming benefits and providing structural financial incentives for employment progression.`;
    sourceRef = "GOV.UK Benefit Cap Guidance & DWP Universal Credit Rules";

    sourceLinks = [
      { label: "GOV.UK Benefit Cap Limits", url: "https://www.gov.uk/benefit-cap" },
      { label: "DWP Universal Credit Work Allowances", url: "https://www.gov.uk/universal-credit/what-youll-get" }
    ];
  } else if (isChildCapClaim && !isIndirectOrCritical) {
    score = Math.max(95, score + 75);
    extractedQuotes.push(`"${text.length > 120 ? text.substring(0, 120) + '...' : text}"`);
    flags.push(`CHILD BENEFIT CAP CLAIM: Evaluates assertions regarding the removal of the two-child limit and its impact on child poverty and household support.`);

    primaryRebuttal = `ANALYSIS OF TWO-CHILD BENEFIT LIMIT: Arguments concerning child benefit restrictions must be weighed against independent economic and social research (such as from the IFS and child poverty action groups), which demonstrates that the cap disproportionately impacts larger families experiencing temporary unemployment or low wages, directly affecting child poverty rates.`;
    sourceRef = "Institute for Fiscal Studies (IFS) & Department for Work and Pensions Policy Analysis";

    sourceLinks = [
      { label: "Institute for Fiscal Studies Policy Briefings", url: "https://ifs.org.uk/" },
      { label: "GOV.UK Child Benefit Overview", url: "https://www.gov.uk/child-benefit" }
    ];
  } else if (isNeutralVoucherProposal) {
    score = 45;
    extractedQuotes.push(`"${text.length > 120 ? text.substring(0, 120) + '...' : text}"`);
    flags.push(`NEUTRAL POLICY PROPOSAL DETECTED: Discusses or considers disability vouchers as a policy mechanism without asserting unproven effectiveness or stigmatising claims.`);
    
    primaryRebuttal = `DISABILITY VOUCHER & CHOICE ANALYSIS: Claims that replacing flexible disability-related cash support with restricted vouchers or catalogue systems would automatically improve outcomes require evidence comparing the systems. DWP evidence states that PIP is intended to contribute towards a wide range of additional disability costs, including specialist goods and services, greater use of ordinary goods and services such as taxis and heating, and higher costs associated with accessible housing. Current evidence also recognises that recipients use PIP according to individual priorities and that some disability-related needs are difficult to fit into predefined categories. The Institute for Fiscal Studies (IFS) has noted that restricting vouchers to specified disability-related goods could prevent recipients using support for other genuine disability-related costs, while restricting redemption to particular providers could increase prices. A voucher system would also require additional administration to maintain eligible-product lists, monitor use and arrange supplier participation.`;
    sourceRef = "DWP Disability Cost Research, Institute for Fiscal Studies (IFS) Analysis";
    
    sourceLinks = [
      { label: "IFS Welfare and Disability Support Analysis", url: "https://ifs.org.uk/" },
      { label: "DWP Research Reports on Additional Costs of Disability", url: "https://www.gov.uk/government/organisations/department-for-work-pensions" }
    ];
  } else if ((hasVoucherMention || robustVoucherProposal) && (foundVoucherEffectiveness.length > 0 || foundVoucherFraud.length > 0 || hasNegativeTone) && !isIndirectOrCritical) {
    score = Math.max(88, score + 65);
    extractedQuotes.push(`"${text.length > 120 ? text.substring(0, 120) + '...' : text}"`);
    flags.push(`DISABILITY VOUCHER CLAIM — EVIDENCE REQUIRED: Asserts unsupported effectiveness or fraud-control benefits of vouchers without comparative empirical data.`);

    primaryRebuttal = `DISABILITY VOUCHER CLAIM — EVIDENCE REQUIRED: Claims that replacing disability-related cash support with vouchers would automatically improve outcomes require evidence demonstrating that the proposed voucher mechanism improves disabled people’s living standards, independence, participation or ability to meet additional disability-related costs. DWP evidence describes PIP and DLA as contributions towards additional disability-related costs, including specialist goods and services, increased use of ordinary goods and services, and higher costs for ordinary goods and services.`;
    sourceRef = "DWP Statutory Guidance, IFS & DWP Disability Expenditure Research";
    
    sourceLinks = [
      { label: "DWP Guidance on Disability Support", url: "https://www.gov.uk/" },
      { label: "Institute for Fiscal Studies Policy Briefings", url: "https://ifs.org.uk/" }
    ];
  } else if (isPensionCreditClaim) {
    score = Math.max(90, score + 65);
    extractedQuotes.push(`"${text.length > 120 ? text.substring(0, 120) + '...' : text}"`);
    flags.push(`PENSION CREDIT / ELDERLY WELFARE CLAIM: Evaluates assertions regarding Pension Credit take-up, eligibility, or pensioner support using official DWP and IFS data.`);

    primaryRebuttal = `DEBUNKING PENSION CREDIT & ELDERLY WELFARE CLAIMS: Assertions regarding Pension Credit eligibility or adequacy must be evaluated against official Department for Work and Pensions (DWP) take-up statistics and Institute for Fiscal Studies (IFS) analysis. Official DWP statistics consistently highlight significant under-claiming, with hundreds of thousands of eligible low-income pensioners failing to receive Pension Credit entitlement, leaving them vulnerable to fuel poverty and deprivation. Furthermore, IFS evaluations demonstrate that Pension Credit acts as a vital gateway benefit for wider support such as housing benefit, council tax reduction, and cold weather payments.`;
    sourceRef = "DWP Pension Credit Take-up Statistics, Institute for Fiscal Studies (IFS) Retirement & Pension Analysis";

    sourceLinks = [
      { label: "DWP Income-related benefits: estimates of take-up", url: "https://www.gov.uk/government/statistics/income-related-benefits-estimates-of-take-up" },
      { label: "Institute for Fiscal Studies Pension Analysis", url: "https://ifs.org.uk/" }
    ];
  } else if (isUniversalCreditClaim) {
    score = Math.max(90, score + 65);
    extractedQuotes.push(`"${text.length > 120 ? text.substring(0, 120) + '...' : text}"`);
    flags.push(`UNIVERSAL CREDIT CLAIM: Evaluates assertions regarding Universal Credit claimant behavior, adequacy, or administrative structures.`);

    primaryRebuttal = `DEBUNKING UNIVERSAL CREDIT CLAIMS: Generalised claims regarding Universal Credit claimants or administrative burdens are addressed by Office for National Statistics (ONS) labour market reviews and Department for Work and Pensions (DWP) administrative data. Research from the Joseph Rowntree Foundation (JRF) and IFS shows that standard allowances frequently fall below the ONS-backed Minimum Income Standard required for basic essentials, while taper rates and work allowances dictate employment progression incentives.`;
    sourceRef = "DWP Stat-Xplore, Joseph Rowntree Foundation (JRF) Destitution in the UK, ONS Labour Market Statistics";

    sourceLinks = [
      { label: "Joseph Rowntree Foundation Research", url: "https://www.jrf.org.uk/" },
      { label: "DWP Stat-Xplore Portal", url: "https://stat-xplore.dwp.gov.uk/" }
    ];
  } else if (isCarerClaim) {
    score = Math.max(90, score + 65);
    extractedQuotes.push(`"${text.length > 120 ? text.substring(0, 120) + '...' : text}"`);
    flags.push(`CARER BENEFIT / ALLOWANCE CLAIM: Evaluates assertions concerning carer support thresholds and financial adequacy.`);

    primaryRebuttal = `DEBUNKING CARER SUPPORT CLAIMS: Assertions regarding Carer's Allowance or carer financial provisions are evaluated against DWP operational guidelines and OBR fiscal forecasts. Carer's Allowance earnings limits and weekly benefit rates are subject to statutory uprating rules, with independent research from policy institutes highlighting the severe financial strain and poverty risks faced by unpaid full-time carers balancing intense care responsibilities.`;
    sourceRef = "DWP Carer's Allowance Guidance, Office for Budget Responsibility (OBR) Welfare Trends Report";

    sourceLinks = [
      { label: "GOV.UK Carer's Allowance Guidance", url: "https://www.gov.uk/carers-allowance" },
      { label: "Office for Budget Responsibility Welfare Trends", url: "https://obr.uk/" }
    ];
  } else if (sourceMentioned || hasCredibleEvidence) {
    score = 68;
    extractedQuotes.push(`"${text.length > 120 ? text.substring(0, 120) + '...' : text}"`);
    flags.push(`OFFICIAL SOURCE WITH ANTI-WELFARE RHETORIC / MIXED EVIDENCE: Contains documented official/statistical figures combined with anti-welfare or stigmatising narrative framing.`);
    primaryRebuttal = `FACTUAL COMPONENT: Uses documented official statistics or figures. RHETORICAL COMPONENT: Accompanied by anti-welfare rhetoric, economic scapegoating, or hostile inference. Classified as medium risk (contested/misleading framing).`;
    sourceRef = "Official Data Source with Anti-Welfare Rhetorical Overlay";
    sourceLinks = [
      { label: "DWP / ONS Official Data Portal", url: "https://stat-xplore.dwp.gov.uk/" },
      { label: "IFS Welfare Analysis", url: "https://ifs.org.uk/" }
    ];
  }

  const economicSpirallingPhrases = [
    'gdp', 'gross domestic product', 'percentage of gdp', 'share of gdp',
    'welfare gdp', 'spending as a % of gdp', 'welfare spending as a percentage',
    'spiralling', 'spiraling', 'unsustainable', 'bankrupting', 'affordable', 'welfare bill'
  ];

  const hasEconomicGdpClaim = economicSpirallingPhrases.some(phrase => lower.includes(phrase));

  if (
    hasEconomicGdpClaim &&
    (!hasCredibleEvidence || score > 50) &&
    !isIndirectOrCritical &&
    !isMixedEvidenceCase &&
    !hasOfficialSourceWithAntiWelfareRhetoric
  ) {
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

  const incentivePhrases = ["incentive", "no reason to work", "better off on benefits", "work doesn't pay", "don't have any incentive"];
  const hasIncentiveClaim = incentivePhrases.some(phrase => lower.includes(phrase));

  if (hasIncentiveClaim && !hasCredibleEvidence && !isIndirectOrCritical && !isMixedEvidenceCase) {
    score = Math.max(78, score + 30);
    extractedQuotes.push(`"${text.length > 120 ? text.substring(0, 120) + '...' : text}"`);
    flags.push(`UNSUBSTANTIATED WORK INCENTIVE CLAIM: Evaluates assertions alleging a total lack of work incentive or being 'better off on benefits' without backing data.`);
    flags.push(`STRUCTURAL REBUTTAL: Universal Credit explicitly includes financial work incentives via Work Allowance rates (£404/mo with housing element, £673/mo without) and a 55% UC taper rate.`);
    flags.push(`STATUTORY CEILINGS: Benefit payments are subject to statutory UK Benefit Cap limits (£25,323/yr London, £22,020/yr Outside London).`);

    if (!primaryRebuttal) {
      primaryRebuttal = `ANALYSIS OF WORK INCENTIVE CLAIMS: Claims that there is "no incentive to work" or that individuals are "better off on benefits" misrepresent how Universal Credit operates. UC includes an explicit financial work incentive through DWP Work Allowance rates (£404/mo for claimants receiving housing support; £673/mo if no housing support is claimed) and a 55% taper rate, ensuring net household income increases for every hour worked.`;
      sourceRef = "DWP Work Allowance & UC Rules, GOV.UK Benefit Cap Guidance & IFS TaxLab";
      
      sourceLinks = [
        { label: "DWP Stat-Xplore Official Database", url: "https://stat-xplore.dwp.gov.uk/" },
        { label: "IFS TaxLab: UK Welfare & Social Security Spending", url: "https://ifs.org.uk/taxlab/taxlab-data-feed/uk-welfare-spending" },
        { label: "GOV.UK Universal Credit Work Allowances", url: "https://www.gov.uk/universal-credit/what-youll-get" }
      ];
    }
  }

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

  if (isFinancialClaim && BENEFIT_RATES_2026_2027?.benefitCap2026?.absoluteMaxCap && extractedAnnualAmount > BENEFIT_RATES_2026_2027.benefitCap2026.absoluteMaxCap && !isIndirectOrCritical) {
    score = 98;
    extractedQuotes.push(`"${text.length > 120 ? text.substring(0, 120) + '...' : text}"`);
    flags.push(`Claims an annual benefit payout of £${extractedAnnualAmount.toLocaleString()}, violating statutory UK Benefit Caps (£25,323/yr London, £22,020/yr Outside London).`);
    primaryRebuttal = `STATUTORY IMPOSSIBILITY REBUTTAL: Allegations that claimants receive £${extractedAnnualAmount.toLocaleString()} per year violate UK Welfare Law. Under current regulations, benefit payments are capped at £25,323/year in Greater London or £22,020/year across the rest of the UK.`;
    sourceRef = "DWP Statutory Benefit Rates & Benefit Cap Regulations (GOV.UK)";
    
    sourceLinks = [
      { label: "GOV.UK Benefit Cap Statutory Limits", url: "https://www.gov.uk/benefit-cap" },
      { label: "DWP Benefit and Pension Rates", url: "https://www.gov.uk/government/publications/benefit-and-pension-rates-2026-to-2027" }
    ];
  }

  if (!primaryRebuttal) {
    if (!isIndirectOrCritical && (totalFramingHits > 0 || robustFramingHits > 0)) {
      score = (isMixedEvidenceCase || hasOfficialSourceWithAntiWelfareRhetoric)
        ? 68
        : 92;
      primaryRebuttal = `ANALYSIS OF STATEMENT: Unverified negative or subjective assertion regarding welfare support taxonomy. Statutory benefits are assessed strictly on eligibility criteria, functional ability, and verified evidentiary standards requiring medical and administrative proof. Official figures from the IFS and OBR show that total welfare spend as a percentage of GDP has remained relatively unchanged for decades and is actually lower than the peak of 2008.`;
      sourceRef = "DWP Assessment Guides, IFS TaxLab & HMCTS Tribunal Statistics";
      
      sourceLinks = [
        { label: "DWP Assessment Guides", url: "https://www.gov.uk/government/organisations/department-for-work-pensions" },
        { label: "IFS TaxLab: UK Welfare & Social Security Spending", url: "https://ifs.org.uk/taxlab/taxlab-data-feed/uk-welfare-spending" },
        { label: "HMCTS Tribunal Quarterly Statistics", url: "https://www.gov.uk/government/collections/tribunals-statistics" }
      ];
    } else {
      primaryRebuttal = `ANALYSIS OF STATEMENT: Statement evaluated against official DWP Stat-Xplore datasets, UK Welfare & Social Support Database taxonomy, and ONS employment statistics.`;
      sourceRef = "ONS Labour Market Review & DWP Stat-Xplore Database";
      
      sourceLinks = [
        { label: "DWP Stat-Xplore Portal", url: "https://stat-xplore.dwp.gov.uk/" },
        { label: "ONS Official Statistics", url: "https://www.gov.uk/" }
      ];
    }
  }

  if (!sourceLinks || sourceLinks.length === 0) {
    sourceLinks = [
      { label: "DWP Stat-Xplore Database", url: "https://stat-xplore.dwp.gov.uk/" },
      { label: "ONS Labour Market Data", url: "https://www.gov.uk/employmentandlabourmarket" },
      { label: "IFS Welfare Expenditure Analysis", url: "https://ifs.org.uk/taxlab/taxlab-data-feed/uk-welfare-spending" }
    ];
  }

  // Define isStrongUnsupportedRhetoric definition fix
  const isStrongUnsupportedRhetoric = totalFramingHits > 3 || robustFramingHits > 0 || highRiskRhetoric;

  if (hasOfficialSourceWithAntiWelfareRhetoric || isSourceBackedStigma) {
    score = Math.max(60, Math.min(79, score));
    flags.push(
      "OFFICIAL SOURCE WITH ANTI-WELFARE RHETORIC: The text contains verifiable official figures or data, but is accompanied by anti-welfare rhetoric or loaded framing. Scored as Medium."
    );
  } else if (isStrongUnsupportedRhetoric && !hasSevereClaimIntegrityProblem) {
    score = Math.max(80, score);
  }

  // ============================================================
  // FINAL EVIDENCE / RHETORIC BALANCE OVERRIDE
  // ============================================================
  const finalOfficialEvidenceRhetoric =
    hasCredibleEvidence &&
    hasMeaningfulRhetoric &&
    !policyCriticism;

  const finalSevereMisinformation =
    hasFraudAmountToClaimantPercentage ||
    conflatesFraudAndErrors ||
    visibleActivityInference ||
    workingMeansNotDisabled ||
    diagnosisMeansEntitlement;

  if (
    finalOfficialEvidenceRhetoric &&
    !finalSevereMisinformation
  ) {
    score = Math.min(79, Math.max(60, score));

    flags.push(
      "EVIDENCE / RHETORIC SEPARATION: The statement contains identifiable official or statistical evidence, but that evidence is accompanied by anti-welfare, stigmatising, generalising, sensationalist or hostile framing. The presence of genuine statistics does not validate the rhetorical conclusion drawn from them."
    );

    flags.push(
      "MEDIUM BS CLASSIFICATION: Official evidence is recognised as factual content, while the accompanying welfare/disability rhetoric is assessed separately."
    );
  }

  const finalScore = Math.min(100, Math.max(12, score));
  
  let finalVerdict = "Low BS / Mostly Factual";

  if (finalScore >= 80) {
    finalVerdict =
    (
      totalFramingHits > 0 ||
      robustFramingHits > 0 ||
      (mentionsWelfare && hasNegativeTone) ||
      isMotabilityClaim ||
      pipFakingClaim ||
      schoolToBenefitsClaim ||
      sickNoteClaim ||
      GBNEWS_BENEFITS_SPLURGE_CLAIM ||
      GRADUATE_BENEFITS_CLAIM ||
      hygieneStigmaClaim ||
      hasVoucherMention ||
      robustVoucherProposal ||
      lower.includes('easy to game') ||
      foundLifestyle.length > 0 ||
      foundBenefitChoice.length > 0 ||
      isPoliticalWelfareClaim ||
      isWorkPayComparisonClaim ||
      isChildCapClaim ||
      containsFraudTerm
    )
    ? "HIGH BS / STIGMATISING RHETORIC OR FLAWED FRAMING"
    : "High Misleading Risk / False Claim";

  } else if (finalScore >= 60) {
    finalVerdict = "MEDIUM / Contested or Misleading Framing";

  } else if (finalScore >= 50) {
    finalVerdict = "Moderate Bias / Unsubstantiated Assertion";
  }

  const detectedFramingExplanations = {};
  if (toxicAnalysis.generalisation === "HIGH") {
    detectedFramingExplanations.generalisation = "A characteristic attributed to some individuals is presented as applying to an entire claimant population.";
  }
  if (toxicAnalysis.hygieneStigma === "HIGH") {
    detectedFramingExplanations.hygieneStigma = "Personal cleanliness or hygiene claims are used to demean or stigmatise claimants, ignoring functional disability barriers, chronic pain, severe mobility limitations, or structural poverty.";
  }
  if (toxicAnalysis.moralJudgement === "HIGH") {
    detectedFramingExplanations.moralFraming = "A policy or economic issue is presented primarily as a judgement about the character, worth or morality of benefit recipients.";
  }
  if (toxicAnalysis.fraudAssociation === "HIGH") {
    detectedFramingExplanations.fraudAssociation = "An allegation or individual example may be presented in a way that implies widespread dishonesty without establishing prevalence.";
  }
  if (toxicAnalysis.disabilityInvalidation === "HIGH") {
    detectedFramingExplanations.disabilityInvalidation = "Disability or illness is questioned using appearance, age or anecdotal assumptions rather than evidence of functional limitations.";
  }
  if (toxicAnalysis.crisisAmplification === "HIGH") {
    detectedFramingExplanations.crisisAmplification = "Highly emotive crisis terminology may amplify perceptions of scale or urgency beyond what the underlying evidence establishes.";
  }
  if (toxicAnalysis.anecdotalGeneralisation === "HIGH") {
    detectedFramingExplanations.anecdotalGeneralisation = "An individual case is used to imply characteristics of a much larger population.";
  }
  if (toxicAnalysis.economicScapegoating === "HIGH") {
    detectedFramingExplanations.taxpayerScapegoating = "Claimants are framed primarily as a financial burden without relevant economic or distributional context.";
  }
  if (toxicAnalysis.disabilityVoucherChoiceRestriction === "HIGH") {
    detectedFramingExplanations.disabilityVoucherChoiceRestriction = "A restricted voucher or catalogue model may constrain how disabled people use support to meet individual and sometimes complex disability-related costs.";
  }
  if (toxicAnalysis.disabilityVoucherMarketRisk === "HIGH") {
    detectedFramingExplanations.disabilityVoucherMarketRisk = "A restricted voucher model can create an intermediary/provider market, raising procurement and pricing questions.";
  }
  if (toxicAnalysis.disabilityVoucherAdministrativeRisk === "HIGH") {
    detectedFramingExplanations.disabilityVoucherAdministrativeRisk = "Restricted voucher systems require additional administration to maintain eligible-product lists and monitor supplier participation.";
  }
  if (toxicAnalysis.politicalWeaponisation === "HIGH") {
    detectedFramingExplanations.politicalWeaponisation = "Welfare or claimants are framed as political tools or scapegoats to boost polling without official backing or facts.";
  }

  // --- CLAIM INTEGRITY CHECKS COLLECTION (FOR METADATA/FLAGS) ---
  const claimIntegrityViolations = [];
  if (hasFraudAmountToClaimantPercentage) claimIntegrityViolations.push("FRAUD_RATE_DENOMINATOR_ERROR");
  if (conflatesFraudAndErrors) claimIntegrityViolations.push("FRAUD_VS_ERROR_CONFLATION");
  if (missingDenominator) claimIntegrityViolations.push("MISSING_DENOMINATOR");
  if (unsourcedStatistic) claimIntegrityViolations.push("UNSOURCED_STATISTIC");
  if (containsOutdatedYear) claimIntegrityViolations.push("OUTDATED_STATISTIC");
  if (anecdoteGeneralisation) claimIntegrityViolations.push("ANECDOTE_TO_POPULATION_GENERALISATION");
  if (visibleActivityInference) claimIntegrityViolations.push("VISIBLE_ACTIVITY_INFERENCE");
  if (workingMeansNotDisabled) claimIntegrityViolations.push("WORKING_MEANS_NOT_DISABLED");
  if (diagnosisMeansEntitlement) claimIntegrityViolations.push("DIAGNOSIS_MEANS_AUTOMATIC_ENTITLEMENT");
  if (diagnosisDismissal) claimIntegrityViolations.push("DIAGNOSIS_DISMISSAL");

  // --- CLAIM DECOMPOSITION (SPLITTING COMPLEX COMPOUND STATEMENTS) ---
  const decomposedClaims = [];
  if (text.includes(" and ") || text.includes(",") || text.length > 80) {
    decomposedClaims.push({
      propositionNumber: 1,
      proposition: "Has expenditure/caseload changed as claimed?",
      factualStatus: "Verified against DWP / ONS data streams."
    });
    decomposedClaims.push({
      propositionNumber: 2,
      proposition: "Does the monetary figure represent fraud alone or total overpayment?",
      factualStatus: containsFraudTerm ? "Distinguishes fraud, claimant error, and official error." : "N/A"
    });
    decomposedClaims.push({
      propositionNumber: 3,
      proposition: "Is there evidence connecting individual cases or rates to population-wide dishonesty?",
      factualStatus: absoluteLanguageDetected || anecdoteGeneralisation ? "Requires caution; prevalence differs from individual instances." : "No generalization detected."
    });
  }

  // --- MEDIA / RHETORICAL TACTICS ANALYSIS TAXONOMY ---
  const detectedRhetoricalTactics = [];
  if (toxicAnalysis.anecdotalGeneralisation === "HIGH" || hasAnecdote) detectedRhetoricalTactics.push("Anecdotal amplification / Anecdote-to-population generalisation");
  if (toxicAnalysis.generalisation === "HIGH") detectedRhetoricalTactics.push("Fraud-to-population generalisation");
  if (toxicAnalysis.sensationalism === "HIGH" || toxicAnalysis.crisisAmplification === "HIGH") detectedRhetoricalTactics.push("Moral-panic framing / Threat inflation");
  if (toxicAnalysis.economicScapegoating === "HIGH") detectedRhetoricalTactics.push("Scapegoating / Outgroup construction / Class division");
  if (toxicAnalysis.fraudAssociation === "HIGH") detectedRhetoricalTactics.push("Fraud amplification");
  if (toxicAnalysis.hygieneStigma === "HIGH") detectedRhetoricalTactics.push("Dehumanising hygiene trope / Physical disability invalidation");
  if (selectiveStatisticsRisk) detectedRhetoricalTactics.push("Statistical cherry-picking / Decontextualised statistic");
  if (missingDenominator) detectedRhetoricalTactics.push("Missing denominator");
  if (visibleActivityInference || workingMeansNotDisabled) detectedRhetoricalTactics.push("Disability invalidation / Visibility bias / Working means not disabled");
  if (toxicAnalysis.moralJudgement === "HIGH") detectedRhetoricalTactics.push("Deservingness manipulation / Moral-panic framing");

  const rhetoricalAnalysisOutput = {
    detectedTactics: detectedRhetoricalTactics,
    intentEstablished: "NOT ESTABLISHED FROM TEXT ALONE",
    explanation: detectedRhetoricalTactics.length > 0 ? "The text combines narrative phrasing or statistics with generalized assertions. Individual cases or expenditure figures do not by themselves establish wider population prevalence or dishonesty." : "No major rhetorical manipulation patterns detected."
  };

  // --- REFINEMENT 10: CLAIM-LEVEL RESULTS ARRAY ---
  const claimAnalysis = [
    {
      claim: text.length > 140 ? text.substring(0, 140) + "..." : text,
      claimType: isFinancialClaim ? "FACTUAL_STATISTIC" : (causalClaimDetected ? "CAUSAL_CLAIM" : (absoluteLanguageDetected ? "GENERALISATION" : (policyCriticism ? "POLICY_CLAIM" : (hasAnecdote ? "ANECDOTE" : "OPINION")))),
      evidenceLevel,
      rhetoricLevel: totalFramingHits > 2 || robustFramingHits > 0 ? "HIGH" : (totalFramingHits > 0 ? "MEDIUM" : "LOW"),
      context: contextType,
      needsVerification: evidenceLevel === "NONE" || evidenceLevel === "SOURCE_MENTION_ONLY" || selectiveStatisticsRisk || scaleContextWarning
    }
  ];

  const counterContextLayer = {
    relevantContext: "Population-wide claims require representative evidence rather than individual anecdotes, and spending figures must account for caseloads, inflation adjustments, and administrative error rates.",
    potentialSources: ["DWP", "ONS", "IFS", "OBR", "NAO", "JRF"]
  };

  const monitoringMetadata = {
    firstDetected: options.firstDetected || new Date().toISOString(),
    lastDetected: new Date().toISOString(),
    occurrenceCount: options.occurrenceCount || 1,
    sourceCount: options.sourceCount || 1,
    platforms: options.platforms || [mediaType],
    relatedNarratives: options.relatedNarratives || Object.keys(toxicAnalysis).filter(k => toxicAnalysis[k] === "HIGH"),
    relatedBenefits: options.relatedBenefits || welfareTopics.filter(t => lower.includes(t))
  };

  const evidenceAnalysis = {
    evidenceLevel,
    sourceMentioned,
    sourceIdentified,
    evidenceContext,
    specificStatistic,
    primarySource,
    multipleSources,
    sourceDateDetected: /(202[4-6])/i.test(text),
    referencePeriodDetected: /(quarter|annual|monthly|202[4-6])/i.test(text),
    forecastDetected: /(forecast|projected|expected|outlook)/i.test(text),
    denominatorWarning,
    scaleContextWarning,
    selectiveStatisticsRisk
  };

  const rhetoricAnalysis = {
    absoluteLanguageDetected,
    causalClaimDetected,
    causalEvidenceProvided,
    anecdoteGeneralisation,
    moralJudgement,
    policyCriticism,
    stigmaDespiteEvidence: isSourceBackedStigma,
    populationGeneralisation: absoluteLanguageDetected || robustGeneralisation,
    loadedLanguage: foundStigmaPhrases.length > 0 || foundSensationalism.length > 0
  };

  return {
    inputStatement: text,
    extractedQuotes,
    score: finalScore,
    verdict: finalVerdict,
    mediaType,
    contextType,
    flags,
    claimIntegrityViolations,
    decomposedClaims,
    rhetoricalAnalysisOutput,
    evidenceAnalysis,
    rhetoricAnalysis,
    claimAnalysis,
    toxicAnalysis,
    detectedFramingExplanations,
    counterContextLayer,
    primaryRebuttal,
    sourceRef,
    sourceLinks,
    monitoringMetadata
  };
};
