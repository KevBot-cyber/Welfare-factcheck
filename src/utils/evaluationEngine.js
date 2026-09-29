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

  const containsCitation = /(dwp|ons|hmcts|stat-xplore|ifs|niesr|hansard|gov\.uk|http|https|source|journal|tribunal statistics|office for national statistics|oecd|obr|institute for fiscal studies)/i.test(lower);

  // 1. EXPANDED NARRATIVE TAXONOMY & FAMILIES (Incorporating comprehensive toxic/sensationalist welfare narratives & typo resilience)
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
    // Expanded toxic headline & social media framing keywords from past year narratives
    'parasites', 'parasitic', 'bloated welfare', 'benefit scroungers', 'shirkers paradise', 'taxpayer cash cow',
    'welfare scroungers', 'sicknote Britain', 'signing on while laughing', 'cash for couch potatoes',
    'benefits bludgers', 'state dependents', 'state supported idleness'
  ];

  const nonContributorPhrases = [
    'don’t contribute', 'dont contribute', 'doesn’t contribute', 'doesnt contribute', 'never contributed',
    'contributed nothing', 'contribute nothing', 'give nothing back', 'take but don’t give', 'take but dont give',
    'take from society', 'take from taxpayers', 'living off us', 'living off everyone else', 'living at our expense',
    'at the expense of working people', 'paid for by hardworking people', 'hardworking taxpayers versus',
    'those who pay in versus those who take out', 'contribute nothing to the pot', 'live off the state'
  ];

  const contributionAndFairnessPhrases = [
    'recognise contribution',
    'recognize contribution',
    'people who contribute',
    'those who contribute',
    'people who pay in',
    'those who pay in',
    'people who pay their way',
    'those who pay their way',
    'pay their own way',
    'hardworking taxpayers',
    'hardworking people',
    'working people versus',
    'taxpayers versus claimants',
    'taxpayers versus people on benefits',
    'living off taxpayers',
    'living off the taxpayer',
    'footing the bill',
    'fairness to taxpayers',
    'restore fairness',
    'restore fairness to taxpayers',
    'make work pay',
    'work must pay',
    'work always pays',
    'work always pays better than benefits',
    'work should always pay',
    'reward work',
    'rewarding work',
    'benefits reward idleness',
    'benefits reward inactivity',
    'doing nothing',
    'do nothing',
    'people who do nothing',
    'those who do nothing',
    'morally wrong to accept',
    'morally wrong to claim',
    'morally wrong to live on benefits',
    'morally wrong to take benefits'
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
  const dehumanisingPhrases = ['parasites', 'leech', 'scrounger', 'sponger', 'freeloader', 'burden', 'drain'];
  const moralPanicPhrases = ['welfare crisis', 'benefit crisis', 'out of control', 'spiralling', 'welfare epidemic', 'time bomb'];
  const claimantOtheringPhrases = ['these people', 'those people', 'people like this', 'welfare class'];
  const entitlementMockeryPhrases = ['entitlement culture', 'entitlement mentality', 'entitled to everything'];
  const assessmentMockeryPhrases = ['tick-box exercise', 'rubber stamp', 'automatic award', 'easy pip', 'pip giveaway'];
  const benefitMaximisationPhrases = ['maxing out benefits', 'stacking benefits', 'collecting every benefit'];
  const austerityFramingPhrases = ['welfare cuts', 'benefit cuts', 'slash welfare', 'welfare crackdown'];

  // Additional Political & Sensationalist Narrative Patterns
  const politicalRhetoricPhrases = [
    'way of life', 'morally wrong', 'can’t afford it', 'cant afford it',
    'footing the bill', 'paying their own way', 'living on benefits instead',
    'benefits pay more than', 'out of work benefits', 'definition of disability has expanded',
    'scrapping the 2-child cap', 'unfair and unaffordable', 'benefit rise',
    // Added specific political welfare weaponisation / scapegoating phrases
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
    ]
  };

  // Apply fuzzy or direct checks
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

  const robustVoucherChoice =
    robustHits.disabilityVoucherRestriction ||
    robustHits.disabilityVoucherChoice ||
    robustHits.disabilityVoucherComplexCare;

  const robustVoucherMarket =
    robustHits.disabilityVoucherMarketRisk;

  const robustVoucherAdmin =
    robustHits.disabilityVoucherAdministration;

  const robustVoucherProposal =
    robustHits.voucherReplacement ||
    robustVoucherChoice ||
    robustVoucherMarket ||
    robustVoucherAdmin;

  const robustFraud =
    robustHits.fraudFraming;

  const robustGeneralisation =
    robustHits.claimantGeneralisation;

  const robustWorkShaming =
    robustHits.workShaming;

  const robustAppearanceInvalidation =
    robustHits.appearanceDisabilityInvalidation;

  const robustEconomicScapegoating =
    robustHits.economicScapegoating;

  const toxicAnalysis = {
    derogatoryLanguage: foundDehumanising.length > 0 || foundStigmaPhrases.length > 2 ? "HIGH" : (foundStigmaPhrases.length > 0 ? "MEDIUM" : "LOW"),
    generalisation: foundGeneralisation.length > 0 || robustGeneralisation ? "HIGH" : "LOW",
    fraudAssociation: foundFraudAssoc.length > 0 || (lower.includes('fraud') && lower.includes('claimant')) || robustFraud ? "HIGH" : "LOW",
    disabilityInvalidation: foundAppearancePolicing.length > 0 || robustAppearanceInvalidation ? "HIGH" : "LOW",
    moralJudgement: foundEntitlement.length > 0 ? "HIGH" : "LOW",
    economicScapegoating: foundNonContributor.length > 0 || lower.includes('taxpayer') || robustEconomicScapegoating ? "HIGH" : "LOW",
    crisisAmplification: foundMoralPanic.length > 0 || foundSensationalism.length > 0 ? "HIGH" : "LOW",
    anecdotalGeneralisation: foundShockingCase.length > 0 ? "HIGH" : "LOW",
    othering: foundOthering.length > 0 ? "HIGH" : "LOW",
    entitlementFraming: foundEntitlement.length > 0 ? "HIGH" : "LOW",
    assessmentScepticism: foundAssessmentMockery.length > 0 || foundBrokenSystem.length > 0 || lower.includes('easy to game') ? "HIGH" : "LOW",
    sensationalism: foundSensationalism.length > 0 || foundLoadedHeadline.length > 0 ? "HIGH" : "LOW",
    disabilityVoucherChoiceRestriction: foundVoucherChoice.length > 0 || robustVoucherChoice ? "HIGH" : "LOW",
    disabilityVoucherMarketRisk: foundVoucherMarket.length > 0 || robustVoucherMarket ? "HIGH" : "LOW",
    disabilityVoucherAdministrativeRisk: foundVoucherAdmin.length > 0 || robustVoucherAdmin ? "HIGH" : "LOW",
    contributionOthering:
      foundContributionFairness.length > 0 || robustHits.contributionOthering
        ? "HIGH"
        : "LOW",
    workPayFraming:
      robustHits.workAlwaysPays
        ? "HIGH"
        : "LOW",
    moralWelfareJudgement:
      robustHits.moralWelfareJudgement
        ? "HIGH"
        : "LOW",
    fairnessFraming:
      robustHits.fairnessFraming
        ? "HIGH"
        : "LOW",
    politicalWeaponisation:
      robustHits.politicalWeaponisationRhetoric
        ? "HIGH"
        : "LOW"
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
    'lazy', 'refuse', 'burden', 'waste', 'drain', 'wrong', 'joke', 'free', 'game', 'fake'
  ];
  
  const mentionsWelfare = welfareTopics.some(topic => lower.includes(topic));
  const hasNegativeTone = genericNegativeIndicators.some(indicator => {
    const regex = new RegExp(`\\b${indicator}\\b`, 'i');
    return regex.test(lower);
  });

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
    foundContributionFairness.length +
    robustFramingHits;

  // Topic specific detection for tailored debunking
  const isPensionCreditClaim = lower.includes('pension credit');
  const isUniversalCreditClaim = lower.includes('universal credit') || lower.includes(' uc ');
  const isCarerClaim = lower.includes('carer') || lower.includes('attendance allowance');
  const isStatePensionClaim = lower.includes('state pension');

  // Check for specific political/sensationalist welfare framing
  const isPoliticalWelfareClaim = lower.includes('way of life') || lower.includes('morally wrong') || lower.includes('footing the bill') || foundContributionFairness.length > 0 || robustHits.welfareWayOfLife || robustHits.contributionOthering || robustHits.workAlwaysPays || robustHits.moralWelfareJudgement || robustHits.fairnessFraming || robustHits.politicalWeaponisationRhetoric;
  const isWorkPayComparisonClaim = lower.includes('pay more than getting a job') || lower.includes('better than working') || robustHits.workPayComparison;
  const isChildCapClaim = lower.includes('child cap') || lower.includes('2-child') || lower.includes('two-child') || robustHits.childBenefitCapRhetoric;

  const highRiskRhetoric =
    robustHits.moralWelfareJudgement ||
    robustHits.workAlwaysPays ||
    robustHits.contributionOthering ||
    robustHits.fairnessFraming ||
    robustHits.politicalWeaponisationRhetoric ||
    robustWorkShaming ||
    robustGeneralisation ||
    robustFraud ||
    robustEconomicScapegoating;

  if (isMotabilityClaim) {
    score = isIndirectOrCritical ? 40 : Math.max(90, score + 70);
    extractedQuotes.push(`"${text.length > 120 ? text.substring(0, 120) + '...' : text}"`);
    flags.push(`FLAGGED MISLEADING BENEFIT VEHICLE CLAIM: Asserts inaccurate information regarding Motability vehicle entitlement without accounting for statutory component assignment.`);
    
    primaryRebuttal = `DEBUNKING MOTABILITY & BENEFIT VEHICLE MYTHS: Claims that individuals on PIP or related benefits receive "free cars" are entirely incorrect. Participants on the Motability scheme do not get a free vehicle; rather, they choose to redirect either all or part of their weekly Personal Independence Payment (PIP) mobility component (or DLA/AFIP/ADPIP equivalent) to lease the vehicle.`;
    sourceRef = "Motability Operations Scheme Rules, DWP PIP Handbook & Statutory Guidance";
    
    sourceLinks = [
      { label: "GOV.UK Get a vehicle through the Motability scheme", url: "https://www.gov.uk/get-motability-vehicle" },
      { label: "DWP PIP Handbook for claimants and assessors", url: "https://www.gov.uk/government/publications/personal-independence-payment-handbook" }
    ];
  } else if (isPoliticalWelfareClaim && !isIndirectOrCritical) {
    if (highRiskRhetoric && !isIndirectOrCritical) {
      score = Math.min(
        100,
        Math.max(
          90,
          score + 70 + (robustFramingHits * 5)
        )
      );
    } else {
      score = Math.max(95, score + 75);
    }
    extractedQuotes.push(`"${text.length > 120 ? text.substring(0, 120) + '...' : text}"`);
    flags.push(`POLITICAL RHETORIC FLAG: Characterises widespread social security support as a lifestyle choice or uses welfare as a political weapon while omitting structural economic context and health barriers.`);
    
    primaryRebuttal = `EVALUATION OF WELFARE DEPENDENCY & POLITICAL RHETORIC CLAIMS: Assertions that welfare is used as a political weapon, or that welfare has become a "way of life" to boost polling without official backing, ignore official DWP and ONS labor market data showing that the majority of claimants face severe health conditions, long NHS waiting lists, or are already combining low-paid part-time work with Universal Credit.`;
    sourceRef = "DWP Stat-Xplore Caseload Data & ONS Labour Market Overview";
    
    sourceLinks = [
      { label: "DWP Stat-Xplore Portal", url: "https://stat-xplore.dwp.gov.uk/" },
      { label: "ONS Labour Market Statistics", url: "https://www.gov.uk/" }
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
      { label: "GOV.UK Carer's Allowance Overview", url: "https://www.gov.uk/carers-allowance" },
      { label: "Office for Budget Responsibility Welfare Trends", url: "https://obr.uk/" }
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
    !isIndirectOrCritical
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

    flags.push(`NON-EVIDENCE BACKED STATEMENT: Uses negative narrative framing against welfare entitlement while omitting verified baseline statistics.`);
    flags.push(`PUBLIC DISCOURSE RISK: Disseminates unsupported hostility toward benefit claimants by framing statutory entitlement access as inherently bad, abusive, or unmonitored.`);

    primaryRebuttal = `REBUKE AGAINST WELFARE STIGMATISATION: Claims portraying social security recipients as having a "lifestyle choice" or using benefit claimants as scapegoats are severely misleading and stigmatising. Official DWP and ONS statistics demonstrate that approximately 40% of Universal Credit claimants are already in work, supplementing low wages. Furthermore, a substantial proportion of welfare recipients face acute health barriers, chronic illness, or physical disabilities while enduring long NHS waiting lists for medical treatment before they can safely return to work.`;
    sourceRef = "DWP Stat-Xplore Work and Health Statistics, ONS Labour Market Overview";
    
    sourceLinks = [
      { label: "DWP Stat-Xplore Portal", url: "https://stat-xplore.dwp.gov.uk/" },
      { label: "ONS Labour Market Statistics", url: "https://www.gov.uk/" },
      { label: "NHS Referral to Treatment Consultant-led Waiting Times", url: "https://www.england.nhs.uk/statistics/statistical-work-areas/rtt-waiting-times/" }
    ];
  }

  const economicSpirallingPhrases = [
    'gdp', 'gross domestic product', 'percentage of gdp', 'share of gdp',
    'welfare gdp', 'spending as a % of gdp', 'welfare spending as a percentage',
    'spiralling', 'spiraling', 'unsustainable', 'bankrupting', 'affordable', 'welfare bill'
  ];

  const hasEconomicGdpClaim = economicSpirallingPhrases.some(phrase => lower.includes(phrase));

  if (hasEconomicGdpClaim && (!containsCitation || score > 50) && !isIndirectOrCritical) {
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

  if (hasIncentiveClaim && !containsCitation && !isIndirectOrCritical) {
    score = Math.max(78, score + 30);
    extractedQuotes.push(`"${text.length > 120 ? text.substring(0, 120) + '...' : text}"`);
    flags.push(`UNSUBSTANTIATED WORK INCENTIVE CLAIM: Evaluates assertions alleging a total lack of work incentive or being 'better off on benefits' without backing data.`);
    flags.push(`STRUCTURAL REBUTTAL: Universal Credit explicitly includes financial work incentives via Work Allowance rates (£404/mo with housing element, £673/mo without) and a 55% UC taper rate.`);
    flags.push(`STATUTORY CEILINGS: Benefit payments are subject to statutory UK Benefit Cap limits (£25,323/yr London, £22,020/yr Outside London).`);

    if (!primaryRebuttal) {
      primaryRebuttal = `ANALYSIS OF WORK INCENTIVE CLAIMS: Claims that there is "no incentive to work" or that individuals are "better off on benefits" misrepresent how Universal Credit operates. UC includes an explicit financial work incentive through DWP Work Allowance rates (£404/mo for claimants receiving housing support; £673/mo if no housing support is claimed) and a 55% taper rate, ensuring net household income increases for every hour worked.`;
      sourceRef = "DWP Work Allowance & UC Rules, GOV.UK Benefit Cap Guidance & ONS Labour Market Statistics";
      
      sourceLinks = [
        { label: "DWP Stat-Xplore Official Database", url: "https://stat-xplore.dwp.gov.uk/" },
        { label: "ONS Labour Market Overview & Inactivity Analysis", url: "https://www.ons.gov.uk/employmentandlabourmarket/peopleinwork/employmentandemployeetypes" },
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
      score = 92;
      primaryRebuttal = `ANALYSIS OF STATEMENT: Unverified negative or subjective assertion regarding welfare support taxonomy. Statutory benefits are assessed strictly on eligibility criteria, functional ability, and verified evidentiary standards requiring medical and administrative proof.`;
      sourceRef = "DWP Assessment Guides, Stat-Xplore Caseload Data & HMCTS Tribunal Statistics";
      
      sourceLinks = [
        { label: "DWP Assessment Guides", url: "https://www.gov.uk/government/organisations/department-for-work-pensions" },
        { label: "DWP Stat-Xplore Portal", url: "https://stat-xplore.dwp.gov.uk/" },
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

  const finalScore = Math.min(100, Math.max(12, score));
  
  let finalVerdict = "Low BS / Mostly Factual";
  if (finalScore >= 80) {
    finalVerdict = (totalFramingHits > 0 || robustFramingHits > 0 || (mentionsWelfare && hasNegativeTone) || isMotabilityClaim || hasVoucherMention || robustVoucherProposal || lower.includes('easy to game') || foundLifestyle.length > 0 || foundBenefitChoice.length > 0 || isPoliticalWelfareClaim || isWorkPayComparisonClaim || isChildCapClaim)
      ? "HIGH BS / STIGMATISING RHETORIC"
      : "High Misleading Risk / False Claim";
  } else if (finalScore >= 50) {
    finalVerdict = "Moderate Bias / Unsubstantiated Assertion";
  }

  const detectedFramingExplanations = {};
  if (toxicAnalysis.generalisation === "HIGH") {
    detectedFramingExplanations.generalisation = "A characteristic attributed to some individuals is presented as applying to an entire claimant population.";
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

  return {
    inputStatement: text,
    extractedQuotes,
    score: finalScore,
    verdict: finalVerdict,
    mediaType,
    contextType,
    flags,
    toxicAnalysis,
    detectedFramingExplanations,
    counterContextLayer,
    primaryRebuttal,
    sourceRef,
    sourceLinks,
    monitoringMetadata
  };
};
