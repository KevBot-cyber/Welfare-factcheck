export const getDynamicLeaderboardData = () => {
  const today = new Date();
  const daysAgo = (days) => {
    const d = new Date(today);
    d.setDate(d.getDate() - days);
    return d.toISOString().split('T')[0];
  };
  return {
    mps: [
      {
        id: 1,
        rank: 1,
        name: "Department for Work & Pensions Spokesperson / Key Ministers",
        party: "Government",
        role: "Welfare Policy Lead",
        flaggedClaimsCount: 34,
        lastUpdated: "30 mins ago",
        trend: "up",
        topClaim: "Claiming over 70% of PIP applications for mental health are 'unverified self-diagnoses'.",
        factualCorrection: "DWP internal guidelines and NHS clinical protocols require formal diagnostic assessment or medical reports from qualified practitioners prior to PIP award decisions.",
        primarySource: "DWP Stat-Xplore & BMA Guidelines (Sep 2026)",
        sourceUrl: "https://stat-xplore.dwp.gov.uk/",
        bsScore: 94,
        claimsHistory: [
          { date: daysAgo(3), quote: "We need to reform PIP because claims for anxiety have exploded without medical evidence.", outlet: "BBC Radio 4 Today", source: "Hansard / BBC Radio 4", sourceUrl: "https://hansard.parliament.uk/", status: "Debunked" },
          { date: daysAgo(19), quote: "The tribunal system is being abused by advocacy groups to overturn valid DWP decisions.", outlet: "Daily Telegraph Interview", source: "Hansard", sourceUrl: "https://hansard.parliament.uk/", status: "Debunked" },
          { date: daysAgo(38), quote: "Most fit notes are issued online without any face-to-face consultation.", outlet: "House of Commons Statement", source: "Hansard Vol. 752", sourceUrl: "https://hansard.parliament.uk/", status: "Misleading" },
          { date: daysAgo(54), quote: "Cash payments for PIP are disincentivising work among young adults.", outlet: "Press Briefing", source: "GOV.UK Press Releases", sourceUrl: "https://www.gov.uk/government/organisations/department-for-work-pensions", status: "Unsubstantiated" }
        ]
      },
      {
        id: 2,
        rank: 2,
        name: "Rt Hon Shadow Work & Pensions Minister",
        party: "Opposition",
        role: "Opposition Spokesperson",
        flaggedClaimsCount: 23,
        lastUpdated: "2 hours ago",
        trend: "up",
        topClaim: "Conflating 'Economic Inactivity' with 'Fraudulent Benefit Claiming'.",
        factualCorrection: "ONS statistics show 84% of economically inactive working-age adults have long-term illness, caring responsibilities, or are full-time students.",
        primarySource: "ONS Labour Market Overview (Sep 2026)",
        sourceUrl: "https://www.ons.gov.uk/employmentandlabourmarket/peopleinwork/employmentandemployeetypes/bulletins/uklabourmarket/latest",
        bsScore: 88,
        claimsHistory: [
          { date: daysAgo(9), quote: "2.8 million people are sitting at home on PIP while taxpayers foot the bill.", outlet: "LBC Radio", source: "LBC Broadcast", sourceUrl: "https://www.lbc.co.uk/", status: "Debunked" },
          { date: daysAgo(30), quote: "Benefit spending has doubled primarily due to lax PIP checks.", outlet: "Sunday Times Op-Ed", source: "The Sunday Times", sourceUrl: "https://www.thetimes.co.uk/", status: "False" }
        ]
      },
      {
        id: 3,
        rank: 3,
        name: "MP for North West Norfolk",
        party: "Backbench",
        role: "Select Committee Member",
        flaggedClaimsCount: 18,
        lastUpdated: "5 hours ago",
        trend: "steady",
        topClaim: "Asserting PIP is a replacement for wage earnings rather than an extra-cost disability benefit.",
        factualCorrection: "PIP is non-means-tested and designed to offset additional costs incurred due to disability, regardless of employment status.",
        primarySource: "Welfare Reform Act 2012 s.77 / DWP Guidance",
        sourceUrl: "https://www.legislation.gov.uk/ukpga/2012/5/section/77",
        bsScore: 82,
        claimsHistory: [
          { date: daysAgo(16), quote: "PIP was meant as temporary sick pay, not a salary for life.", outlet: "House of Commons Debate", source: "Hansard Vol. 751", sourceUrl: "https://hansard.parliament.uk/", status: "Debunked" },
          { date: daysAgo(42), quote: "Claimants receive more on PIP than average working salaries in my constituency.", outlet: "Local Press Interview", source: "Eastern Daily Press", sourceUrl: "https://www.edp24.co.uk/", status: "Misleading" }
        ]
      },
      {
        id: 4,
        rank: 4,
        name: "MP for South Essex",
        party: "Backbench",
        role: "MP",
        flaggedClaimsCount: 14,
        lastUpdated: "1 day ago",
        trend: "down",
        topClaim: "Claiming fit notes are handed out 'without medical rationale'.",
        factualCorrection: "Fit notes are legally binding medical assessments issued by qualified healthcare professionals under NHS GMC standards.",
        primarySource: "NHS Digital Fit Note Data & Royal College of GPs (2026)",
        sourceUrl: "https://digital.nhs.uk/data-and-information/publications/statistical/fit-notes-issued-by-gp-practices",
        bsScore: 78,
        claimsHistory: [
          { date: daysAgo(20), quote: "GPs are signing off fit notes without even seeing patients.", outlet: "GB News Panel", source: "GB News", sourceUrl: "https://www.gbnews.com/", status: "Debunked" },
          { date: daysAgo(68), quote: "Over 90% of requested fit notes are granted without question.", outlet: "Parliamentary Question", source: "Hansard Written Question", sourceUrl: "https://hansard.parliament.uk/", status: "Unsubstantiated" }
        ]
      },
      {
        id: 5,
        rank: 5,
        name: "MP for Christchurch",
        party: "Backbench",
        role: "MP",
        flaggedClaimsCount: 12,
        lastUpdated: "2 days ago",
        trend: "steady",
        topClaim: "Stating fraud in disability benefits exceeds 15% of budget.",
        factualCorrection: "Official DWP Fraud & Error statistics place PIP fraud at under 0.2% — among the lowest of all government expenditure.",
        primarySource: "DWP Fraud and Error in the Benefit System report (2026)",
        sourceUrl: "https://www.gov.uk/government/collections/fraud-and-error-in-the-benefit-system",
        bsScore: 91,
        claimsHistory: [
          { date: daysAgo(24), quote: "Billions are leaked to fraudulent PIP claims every single year.", outlet: "House of Commons Speech", source: "Hansard Vol. 750", sourceUrl: "https://hansard.parliament.uk/", status: "False" }
        ]
      }
    ],
    social_media: [
      {
        id: 501,
        rank: 1,
        name: "Reform UK MP Social Channels (X & TikTok)",
        party: "Reform UK",
        role: "X (Twitter) & TikTok Viral Posts",
        flaggedClaimsCount: 52,
        lastUpdated: "15 mins ago",
        trend: "up",
        topClaim: "TikTok video claiming 'Foreign nationals and non-citizens can walk into DWP offices and claim £800/mo PIP cash instantly'.",
        factualCorrection: "PIP has strict habitual residence and past presence tests (must have resided in the UK for at least 2 of the past 3 years with legal immigration status).",
        primarySource: "DWP Habitual Residence Test & Immigration Act Guidelines (2026)",
        sourceUrl: "https://www.gov.uk/pip/eligibility",
        bsScore: 97,
        claimsHistory: [
          { date: daysAgo(1), quote: "The welfare system is subsidising illegal imports while our pensioners freeze.", outlet: "TikTok Reel / X Post", source: "X (@ReformUK_Official)", sourceUrl: "https://x.com/", status: "False" },
          { date: daysAgo(7), quote: "1 in 4 adults in Britain are now getting free disability cash with no medical exam.", outlet: "X Thread (1.2M Impressions)", source: "X Platform", sourceUrl: "https://x.com/", status: "Extreme Misinformation" },
          { date: daysAgo(22), quote: "Watch how easy it is to fake a back pain claim to get a free Motability car.", outlet: "Facebook Video Ad", source: "Meta Ad Library", sourceUrl: "https://www.facebook.com/ads/library", status: "False" }
        ]
      },
      {
        id: 502,
        rank: 2,
        name: "Conservative MP Backbench Accounts",
        party: "Conservative",
        role: "X (Twitter) & Facebook Campaigning",
        flaggedClaimsCount: 41,
        lastUpdated: "1 hour ago",
        trend: "up",
        topClaim: "Infographic sharing claims that PIP spending growth is driven by 'lifestyle mental health choices'.",
        factualCorrection: "Clinical research shows rises in mental health awards correlate directly with long NHS psychiatric waiting lists and systemic primary care backlogs.",
        primarySource: "NHS Confederation & Mental Health Foundation Report (2026)",
        sourceUrl: "https://www.nhsconfed.org/",
        bsScore: 91,
        claimsHistory: [
          { date: daysAgo(4), quote: "Sick note culture is destroying the British work ethic. Time to stop cash payouts for stress.", outlet: "X Graphic Broadcast", source: "X Platform", sourceUrl: "https://x.com/", status: "Misleading" },
          { date: daysAgo(17), quote: "Labour is turning a blind eye to £5 billion of annual benefit fraud.", outlet: "Facebook Post", source: "Facebook Public Page", sourceUrl: "https://www.facebook.com/", status: "False" }
        ]
      },
      {
        id: 503,
        rank: 3,
        name: "Labour Backbench & Regional MP Accounts",
        party: "Labour",
        role: "X & Facebook Constituency Updates",
        flaggedClaimsCount: 19,
        lastUpdated: "3 hours ago",
        trend: "steady",
        topClaim: "Misrepresenting DWP reassessment backlogs as 'intentional denial of rights by civil servants'.",
        factualCorrection: "Delays stem from administrative capacity constraints and assessment provider contract overhauls rather than deliberate civil service policy.",
        primarySource: "National Audit Office (NAO) DWP Assessment Performance Review (2026)",
        sourceUrl: "https://www.nao.org.uk/",
        bsScore: 74,
        claimsHistory: [
          { date: daysAgo(11), quote: "Thousands are losing PIP overnight due to automated AI decision machines.", outlet: "X Post", source: "X Platform", sourceUrl: "https://x.com/", status: "Unsubstantiated" },
          { date: daysAgo(33), quote: "DWP reassessments have a 90% error rate across all health conditions.", outlet: "Facebook Note", source: "Facebook", sourceUrl: "https://www.facebook.com/", status: "Misleading" }
        ]
      }
    ],
    byParty: [
      {
        id: 601,
        rank: 1,
        name: "Reform UK",
        party: "Reform UK",
        role: "Political Party Official & MP Channels",
        flaggedClaimsCount: 68,
        lastUpdated: "10 mins ago",
        trend: "up",
        topClaim: "Systemic amplification across social media framing disability benefits as an unverified handout for non-citizens.",
        factualCorrection: "DWP statistics and UK statutory eligibility laws mandate strict identity, clinical assessment, and legal residence validation before any award.",
        primarySource: "DWP Stat-Xplore & House of Commons Library (Sep 2026)",
        sourceUrl: "https://commonslibrary.parliament.uk/",
        bsScore: 96,
        claimsHistory: [
          { date: daysAgo(1), quote: "Welfare spending is out of control due to open-door PIP policies.", outlet: "Official Party X Account", source: "X (@ReformUK)", sourceUrl: "https://x.com/", status: "False" },
          { date: daysAgo(10), quote: "Cancel PIP cash for anyone under 30 to save £10 billion immediately.", outlet: "TikTok Live Stream", source: "TikTok Official", sourceUrl: "https://www.tiktok.com/", status: "Misleading" }
        ]
      },
      {
        id: 602,
        rank: 2,
        name: "Conservative Party",
        party: "Conservative",
        role: "Political Party Official & Frontbench Channels",
        flaggedClaimsCount: 54,
        lastUpdated: "45 mins ago",
        trend: "up",
        topClaim: "Campaign messaging alleging that 'Sick Note Britain' costs every working household £4,000 extra per year.",
        factualCorrection: "Calculations misattribute total healthcare, pensions, and statutory sick pay budgets entirely to PIP and Universal Credit health elements.",
        primarySource: "Institute for Fiscal Studies (IFS) Welfare Spending Analysis (2026)",
        sourceUrl: "https://ifs.org.uk/",
        bsScore: 89,
        claimsHistory: [
          { date: daysAgo(5), quote: "Labour is refusing to crack down on the £100bn welfare burden.", outlet: "Press Office X Campaign", source: "X Platform", sourceUrl: "https://x.com/", status: "Misleading" },
          { date: daysAgo(25), quote: "Fit notes are being generated automatically by AI apps without GP review.", outlet: "Facebook Video Ad", source: "Meta Ad Library", sourceUrl: "https://www.facebook.com/ads/library", status: "False" }
        ]
      },
      {
        id: 603,
        rank: 3,
        name: "Labour Party",
        party: "Labour",
        role: "Political Party Official & Ministerial Channels",
        flaggedClaimsCount: 29,
        lastUpdated: "2 hours ago",
        trend: "down",
        topClaim: "Overstating the speed at which back-to-work pathfinder programs will reduce economic inactivity numbers.",
        factualCorrection: "Independent ONS projections note that structural health conditions and NHS waiting times constrain rapid economic reintegration.",
        primarySource: "Office for Budget Responsibility (OBR) Economic & Fiscal Outlook (2026)",
        sourceUrl: "https://obr.uk/",
        bsScore: 71,
        claimsHistory: [
          { date: daysAgo(13), quote: "Our reforms will return 500,000 sick note claimants to work within 12 months.", outlet: "Press Release & Social Share", source: "Labour.org.uk", sourceUrl: "https://labour.org.uk/", status: "Unsubstantiated" },
          { date: daysAgo(37), quote: "DWP tribunal errors have been completely eliminated under new ministerial oversight.", outlet: "X Statement", source: "X Platform", sourceUrl: "https://x.com/", status: "False" }
        ]
      },
      {
        id: 604,
        rank: 4,
        name: "Liberal Democrats",
        party: "Liberal Democrats",
        role: "Political Party Official Channels",
        flaggedClaimsCount: 11,
        lastUpdated: "1 day ago",
        trend: "steady",
        topClaim: "Conflating carer's allowance cliff-edges with universal credit sanction rates.",
        factualCorrection: "Carer's Allowance overpayments result from net earnings threshold caps (£151/wk to £204/wk in 2026) rather than jobcentre conditionality sanctions.",
        primarySource: "Carers UK & DWP Guidance (2026)",
        sourceUrl: "https://www.carersuk.org/",
        bsScore: 52,
        claimsHistory: [
          { date: daysAgo(19), quote: "Carers are being sanctioned at jobcentres for taking extra care hours.", outlet: "X Post", source: "X Platform", sourceUrl: "https://x.com/", status: "Misleading" }
        ]
      },
      {
        id: 605,
        rank: 5,
        name: "Green Party of England & Wales",
        party: "Green Party",
        role: "Political Party Official Channels",
        flaggedClaimsCount: 7,
        lastUpdated: "3 days ago",
        trend: "steady",
        topClaim: "Asserting Universal Basic Income pilots would immediately eliminate 100% of DWP administration costs.",
        factualCorrection: "Specialist disability assessment frameworks and extra-cost support mechanisms (e.g., PIP mobility) remain necessary alongside basic income baselines.",
        primarySource: "Joseph Rowntree Foundation (JRF) Welfare Policy Review",
        sourceUrl: "https://www.jrf.org.uk/",
        bsScore: 48,
        claimsHistory: [
          { date: daysAgo(32), quote: "UBI replaces all DWP bureaucracy and saves tens of billions in admin overnight.", outlet: "Facebook Post", source: "Facebook", sourceUrl: "https://www.facebook.com/", status: "Unsubstantiated" }
        ]
      }
    ],
    tabloids: [
      {
        id: 101,
        rank: 1,
        name: "The Daily Express",
        type: "Print & Online Tabloid",
        flaggedClaimsCount: 48,
        lastUpdated: "30 mins ago",
        trend: "up",
        topClaim: "Headline: 'BENEFIT CRACKDOWN: Millions to lose £700/mo cash payouts in shock reform.'",
        factualCorrection: "Proposed consultation documents suggest minor administrative adjustments and voucher pilots, not immediate mass withdrawal of awards.",
        primarySource: "DWP Green Paper Policy Impact Assessment (Sep 2026)",
        sourceUrl: "https://www.gov.uk/government/organisations/department-for-work-pensions",
        bsScore: 96,
        claimsHistory: [
          { date: daysAgo(3), quote: "Sick note Britain costs taxpayers £100bn as millions shirk work.", outlet: "Front Page", source: "Daily Express Print Edition", sourceUrl: "https://www.express.co.uk/", status: "Misleading" },
          { date: daysAgo(19), quote: "EXPOSED: How easy it is to claim PIP cash for basic mood swings.", outlet: "Express Online Feature", source: "Daily Express Digital", sourceUrl: "https://www.express.co.uk/", status: "False" }
        ]
      },
      {
        id: 102,
        rank: 2,
        name: "The Mail Online / Daily Mail",
        type: "Tabloid / Digital News",
        flaggedClaimsCount: 42,
        lastUpdated: "1 hour ago",
        trend: "up",
        topClaim: "Publishing sensationalized case studies framing legitimate mobility awards as 'scams'.",
        factualCorrection: "Motability is a registered charity funded entirely by individuals exchanging their legally awarded PIP mobility component.",
        primarySource: "Motability Foundation Annual Report & NAO Review (2026)",
        sourceUrl: "https://www.motabilityfoundation.org.uk/",
        bsScore: 92,
        claimsHistory: [
          { date: daysAgo(6), quote: "The £75-a-week perk giving claimants brand new luxury cars.", outlet: "MailOnline Investigation", source: "Daily Mail Online", sourceUrl: "https://www.dailymail.co.uk/", status: "Misleading" },
          { date: daysAgo(33), quote: "Rampant fit-note culture creating an idle generation.", outlet: "Daily Mail Editorial", source: "Daily Mail Print", sourceUrl: "https://www.dailymail.co.uk/", status: "Debunked" }
        ]
      },
      {
        id: 103,
        rank: 3,
        name: "The Sun",
        type: "Tabloid",
        flaggedClaimsCount: 35,
        lastUpdated: "4 hours ago",
        trend: "down",
        topClaim: "Claiming 9 out of 10 PIP applicants are awarded full rates without in-person checks.",
        factualCorrection: "DWP statistical releases confirm rigorous paper-based or clinical assessments apply to 100% of awarded claims.",
        primarySource: "DWP PIP Official Statistics Release (Aug 2026)",
        sourceUrl: "https://www.gov.uk/government/collections/personal-independence-payment-statistics",
        bsScore: 89,
        claimsHistory: [
          { date: daysAgo(13), quote: "BENEFIT BONANZA: PIP handouts surge to record levels.", outlet: "Front Page News", source: "The Sun Print", sourceUrl: "https://www.thesun.co.uk/", status: "Misleading" }
        ]
      },
      {
        id: 104,
        rank: 4,
        name: "The Daily Telegraph",
        type: "Broadsheet / Digital",
        flaggedClaimsCount: 26,
        lastUpdated: "1 day ago",
        trend: "steady",
        topClaim: "Framing economic inactivity rising post-pandemic entirely as voluntary benefit reliance.",
        factualCorrection: "ONS longitudinal studies attribute 78% of the rise to NHS treatment backlogs and worsening chronic long-term conditions.",
        primarySource: "Office for National Statistics & Health Foundation (2026)",
        sourceUrl: "https://www.ons.gov.uk/",
        bsScore: 81,
        claimsHistory: [
          { date: daysAgo(27), quote: "Britain's welfare state is encouraging long-term sickness over work.", outlet: "Opinion Column", source: "Daily Telegraph Business", sourceUrl: "https://www.telegraph.co.uk/", status: "Misleading" }
        ]
      }
    ],
    broadcasters: [
      {
        id: 201,
        rank: 1,
        name: "GB News (Breakfast & Panel Shows)",
        type: "TV Broadcast Channel",
        flaggedClaimsCount: 39,
        lastUpdated: "15 mins ago",
        trend: "up",
        topClaim: "Allowing unchecked panel claims that PIP recipients pay no tax and receive 'free luxury cars'.",
        factualCorrection: "PIP recipients pay standard VAT, fuel duty, and income tax if working. Motability vehicles are paid for in full by sacrificing mobility allowance.",
        primarySource: "HMRC Tax Rules & Motability Scheme Charter (2026)",
        sourceUrl: "https://www.gov.uk/hmrc-internal-manuals",
        bsScore: 95,
        claimsHistory: [
          { date: daysAgo(1), quote: "People on PIP are getting brand new BMWs while working families can't afford buses.", outlet: "Dan Wootton Tonight / Panel segment", source: "GB News Catchup", sourceUrl: "https://www.gbnews.com/", status: "False" },
          { date: daysAgo(20), quote: "Anyone can claim £100 a week just by saying they feel sad.", outlet: "Morning Discussion", source: "GB News Broadcast", sourceUrl: "https://www.gbnews.com/", status: "False" }
        ]
      },
      {
        id: 202,
        rank: 2,
        name: "TalkTV / TalkRadio",
        type: "Radio & Broadcast",
        flaggedClaimsCount: 28,
        lastUpdated: "3 hours ago",
        trend: "steady",
        topClaim: "Hosts repeatedly quoting gross expenditure without mentioning HMCTS tribunal reversal rates.",
        factualCorrection: "Over 70% of PIP appeal decisions taken to HMCTS independent tribunals are overturned in favor of the claimant due to original DWP errors.",
        primarySource: "Ministry of Justice Tribunal Statistics Quarterly (2026)",
        sourceUrl: "https://www.gov.uk/government/collections/tribunals-statistics",
        bsScore: 87,
        claimsHistory: [
          { date: daysAgo(34), quote: "The DWP is giving away money to anyone who threatens to appeal.", outlet: "Drive Time Show", source: "TalkTV Stream", sourceUrl: "https://www.talk.tv/", status: "Debunked" }
        ]
      },
      {
        id: 203,
        rank: 3,
        name: "LBC Phone-ins (Selected Slots)",
        type: "Commercial Speech Radio",
        flaggedClaimsCount: 21,
        lastUpdated: "1 day ago",
        trend: "down",
        topClaim: "Failing to challenge caller assertions that mental health condition claims require no clinical proof.",
        factualCorrection: "Mental health PIP claims require detailed medical evidence, care plans, prescription logs, or psychiatric consultant reports.",
        primarySource: "DWP Assessment Provider Guidance (2026)",
        sourceUrl: "https://www.gov.uk/government/publications/personal-independence-payment-assessment-guide-for-assessment-providers",
        bsScore: 76,
        claimsHistory: [
          { date: daysAgo(40), quote: "Caller claims doctors sign off PIP forms in exchange for fast-tracked appointments.", outlet: "Morning Phone-In", source: "LBC Radio Archive", sourceUrl: "https://www.lbc.co.uk/", status: "Unsubstantiated" }
        ]
      }
    ]
  };
};
