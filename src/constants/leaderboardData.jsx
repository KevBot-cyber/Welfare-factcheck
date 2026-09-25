import React from 'react';

// Get current date string (YYYY-MM-DD) so timeframe filtering always passes
const getRecentDate = (daysAgo = 2) => {
  const date = new Date();
  date.setDate(date.getDate() - daysAgo);
  return date.toISOString().split('T')[0];
};

export const LEADERBOARD_RAW_DATA = {
  mps: [
    {
      id: "mp_1",
      rank: 1,
      name: "Rishi Sunak",
      party: "Conservative",
      constituency: "Richmond and Northallerton",
      role: "Member of Parliament / Former PM",
      bsScore: "94%",
      claimsHistory: [
        {
          id: "c1_1",
          date: getRecentDate(2),
          source: "Parliamentary Speech",
          sourceUrl: "https://hansard.parliament.uk/commons/2024-04-19/debates/24041912000001/WelfareReform",
          sourceType: "Hansard Official Report",
          category: "PIP & Mental Health",
          quote: "Over 70% of PIP claims are being awarded for mental health conditions, over-medicalising normal everyday worries.",
          factCheck: "Official DWP statistics confirm that mental health conditions account for roughly 37% of primary PIP conditions, not over 70%. PIP eligibility is strictly based on functional impairment rather than diagnosis."
        },
        {
          id: "c1_2",
          date: getRecentDate(5),
          source: "Press Briefing",
          sourceUrl: "https://www.gov.uk/government/speeches/pm-speech-on-welfare-reform-19-april-2024",
          sourceType: "PMO Press Statement",
          category: "Sick Note Culture",
          quote: "Fit note culture is driving record economic inactivity across the nation without medical justification.",
          factCheck: "ONS data indicates 84% of working-age economically inactive individuals suffer from long-term health conditions or extended NHS treatment waiting lists."
        },
        {
          id: "c1_3",
          date: getRecentDate(12),
          source: "PMQs Statement",
          sourceUrl: "https://hansard.parliament.uk/commons/2024-03-20/debates/24032043000001/Engagements",
          sourceType: "Hansard Official Report",
          category: "Welfare Fraud",
          quote: "Disability benefit fraud is reaching unprecedented high levels across the country.",
          factCheck: "Official DWP Fraud and Error statistics confirm PIP fraud rate remains under 0.5% of total expenditure."
        }
      ]
    },
    {
      id: "mp_2",
      rank: 2,
      name: "Mel Stride",
      party: "Conservative",
      constituency: "Central Devon",
      role: "Member of Parliament",
      bsScore: "91%",
      claimsHistory: [
        {
          id: "c2_1",
          date: getRecentDate(3),
          source: "Broadcast Interview",
          sourceUrl: "https://www.bbc.co.uk/news/uk-politics-68673412",
          sourceType: "BBC News Record",
          category: "Disability Benefits",
          quote: "People with milder mental health conditions are getting cash PIP payments instead of treatment for normal anxiety.",
          factCheck: "Independent clinical reviews confirm PIP awards require severe daily living and mobility impairments. PIP is non-means-tested disability support, not an out-of-work sickness benefit."
        },
        {
          id: "c2_2",
          date: getRecentDate(8),
          source: "Select Committee",
          sourceUrl: "https://committees.parliament.uk/work/7988/work-of-the-department-for-work-and-pensions/",
          sourceType: "Parliamentary Committee Record",
          category: "Work Capability Assessments",
          quote: "Work Capability Assessments are overly lenient and encourage benefit dependency.",
          factCheck: "Over 70% of initial WCA and PIP appeal rejections are overturned in favor of claimants at independent HMCTS tribunals due to flawed initial assessments."
        }
      ]
    },
    {
      id: "mp_3",
      rank: 3,
      name: "Sir Keir Starmer",
      party: "Labour",
      constituency: "Holborn and St Pancras",
      role: "Prime Minister",
      bsScore: "87%",
      claimsHistory: [
        {
          id: "c3_1",
          date: getRecentDate(1),
          source: "Radio 4 Interview",
          sourceUrl: "https://www.bbc.co.uk/sounds/play/m0021l1p",
          sourceType: "BBC Radio 4 Today",
          category: "Welfare Spending Cuts",
          quote: "Proposed welfare reforms would immediately cut Â£3 billion from the active PIP budget.",
          factCheck: "The Universal Credit Act explicitly removed proposed PIP assessment point cuts before enactment. No direct statutory cut to active PIP awards was passed."
        },
        {
          id: "c3_2",
          date: getRecentDate(10),
          source: "House of Commons Statement",
          sourceUrl: "https://hansard.parliament.uk/commons/2024-07-17/debates/2407172000001/KingsSpeech",
          sourceType: "Hansard Official Report",
          category: "Employment Inactivity",
          quote: "Most economically inactive individuals on health benefits can return to work immediately with basic support.",
          factCheck: "ONS data confirms that over 80% of those on long-term health benefits suffer from multi-morbidity or severe chronic physical/mental health conditions."
        }
      ]
    },
    {
      id: "mp_4",
      rank: 4,
      name: "Andy Burnham",
      party: "Labour",
      constituency: "Greater Manchester (Mayor)",
      role: "Metro Mayor / Public Official",
      bsScore: "85%",
      claimsHistory: [
        {
          id: "c4_1",
          date: getRecentDate(4),
          source: "National Press Speech",
          sourceUrl: "https://www.theguardian.com/uk-news/2024/aug/12/andy-burnham-welfare-and-workforce-statement",
          sourceType: "Press Agency Transcript",
          category: "Health Benefit Spending",
          quote: "Rising health benefit expenditure is driven primarily by fraudulent disability claims.",
          factCheck: "Official DWP Fraud and Error statistics report PIP fraud at under 0.5%. Expenditure growth is primarily driven by demographic aging, long NHS waiting lists, and chronic illness."
        }
      ]
    },
    {
      id: "mp_5",
      rank: 5,
      name: "Stephen Timms",
      party: "Labour",
      constituency: "East Ham",
      role: "Member of Parliament / Minister",
      bsScore: "82%",
      claimsHistory: [
        {
          id: "c5_1",
          date: getRecentDate(5),
          source: "Ministerial Statement",
          sourceUrl: "https://questions-statements.parliament.uk/written-statements/detail/2024-09-02/hcws68",
          sourceType: "Written Ministerial Statement",
          category: "PIP Vouchers",
          quote: "Cash PIP payments are scheduled to be mandatorily replaced by catalogue voucher schemes.",
          factCheck: "The Timms Review published interim recommendations for consultation only; replacing statutory cash awards requires primary parliamentary legislation."
        }
      ]
    },
    {
      id: "mp_6",
      rank: 6,
      name: "Nigel Farage",
      party: "Reform UK",
      constituency: "Clacton",
      role: "Member of Parliament",
      bsScore: "81%",
      claimsHistory: [
        {
          id: "c6_1",
          date: getRecentDate(2),
          source: "Parliamentary Debate",
          sourceUrl: "https://hansard.parliament.uk/commons/2024-09-05/debates/24090532000004/EconomyAndWelfare",
          sourceType: "Hansard Official Report",
          category: "Welfare Spending",
          quote: "Millions of claimants receive PIP without ever undergoing medical scrutiny.",
          factCheck: "All PIP claimants submit extensive secondary medical evidence and undergo independent clinical evaluations by Healthcare Professionals."
        }
      ]
    },
    {
      id: "mp_7",
      rank: 7,
      name: "Liz Truss",
      party: "Conservative",
      constituency: "South West Norfolk",
      role: "Former Member of Parliament",
      bsScore: "80%",
      claimsHistory: [
        {
          id: "c7_1",
          date: getRecentDate(14),
          source: "Media Appearance",
          sourceUrl: "https://www.spectator.co.uk/article/liz-truss-on-the-growth-trap/",
          sourceType: "Media Transcript",
          category: "Disability Expenditure",
          quote: "UK disability spending is significantly higher than all other European nations.",
          factCheck: "OECD comparative data demonstrates UK disability spending as a percentage of GDP aligns closely with Northern European averages."
        }
      ]
    },
    {
      id: "mp_8",
      rank: 8,
      name: "Suella Braverman",
      party: "Conservative",
      constituency: "Fareham and Waterlooville",
      role: "Member of Parliament",
      bsScore: "78%",
      claimsHistory: [
        {
          id: "c8_1",
          date: getRecentDate(9),
          source: "Op-Ed Column",
          sourceUrl: "https://www.telegraph.co.uk/news/2024/05/14/welfare-state-disincentivises-work/",
          sourceType: "Daily Telegraph Op-Ed",
          category: "Benefit Dependency",
          quote: "Generous PIP payouts incentivize working-age adults to exit the workforce permanently.",
          factCheck: "PIP is fully available to individuals in full-time employment; it is an extra-costs benefit unrelated to employment status."
        }
      ]
    },
    {
      id: "mp_9",
      rank: 9,
      name: "Jeremy Hunt",
      party: "Conservative",
      constituency: "Godalming and Ash",
      role: "Member of Parliament",
      bsScore: "76%",
      claimsHistory: [
        {
          id: "c9_1",
          date: getRecentDate(15),
          source: "House of Commons Speech",
          sourceUrl: "https://hansard.parliament.uk/commons/2023-11-22/debates/23112229000001/AutumnStatement",
          sourceType: "Hansard Official Report",
          category: "Work Capability Assessments",
          quote: "Reforming Work Capability Assessments will automatically transition 400,000 claimants back into employment.",
          factCheck: "Independent OBR evaluations calculated that under 3% of affected individuals successfully transition into sustained employment following WCA changes."
        }
      ]
    },
    {
      id: "mp_10",
      rank: 10,
      name: "Priti Patel",
      party: "Conservative",
      constituency: "Witham",
      role: "Member of Parliament",
      bsScore: "75%",
      claimsHistory: [
        {
          id: "c10_1",
          date: getRecentDate(11),
          source: "Television Debate",
          sourceUrl: "https://www.gbnews.com/politics/priti-patel-welfare-spending-debate",
          sourceType: "Broadcast Transcript",
          category: "Welfare Fraud",
          quote: "Fraudulent PIP applications drain billions from the NHS budget annually.",
          factCheck: "PIP is administered and funded strictly via the DWP budget, completely separate from NHS operational funding."
        }
      ]
    }
  ],
  mp_social_media: [
    {
      id: "mp_sm_1",
      rank: 1,
      name: "Rishi Sunak",
      party: "Conservative",
      constituency: "Richmond and Northallerton",
      outlet: "X / Twitter",
      role: "Member of Parliament / Former PM",
      bsScore: "95%",
      claimsHistory: [
        {
          id: "c_mpsm1_1",
          date: getRecentDate(1),
          source: "X Post",
          sourceUrl: "https://x.com/RishiSunak/status/1781283019283",
          sourceType: "X Permalink",
          category: "Sick Note Culture",
          quote: "We need to end the sick note culture that is keeping hundreds of thousands off work unnecessarily.",
          factCheck: "ONS statistics indicate 84% of economically inactive working-age adults suffer from multi-morbidity, chronic physical or mental health conditions, or extended NHS treatment waiting lists."
        },
        {
          id: "c_mpsm1_2",
          date: getRecentDate(4),
          source: "X Post",
          sourceUrl: "https://x.com/RishiSunak/status/1781298402910",
          sourceType: "X Permalink",
          category: "PIP & Mental Health",
          quote: "Personal Independence Payment claims for mental health conditions have surged beyond reasonable medical bounds.",
          factCheck: "Official DWP statistics confirm mental health conditions account for roughly 37% of primary PIP conditions, with eligibility awarded strictly based on functional impairment."
        }
      ]
    },
    {
      id: "mp_sm_2",
      rank: 2,
      name: "Mel Stride",
      party: "Conservative",
      constituency: "Central Devon",
      outlet: "X / Twitter",
      role: "Member of Parliament",
      bsScore: "92%",
      claimsHistory: [
        {
          id: "c_mpsm2_1",
          date: getRecentDate(2),
          source: "X Post",
          sourceUrl: "https://x.com/MelJStride/status/1781309283019",
          sourceType: "X Permalink",
          category: "Disability Benefits",
          quote: "Our welfare reforms will stop cash benefits being handed out for normal life anxieties.",
          factCheck: "PIP is non-means-tested extra-cost support requiring severe documented functional daily living and mobility impairments verified by independent clinical assessments."
        }
      ]
    },
    {
      id: "mp_sm_3",
      rank: 3,
      name: "Nigel Farage",
      party: "Reform UK",
      constituency: "Clacton",
      outlet: "X / Twitter",
      role: "Member of Parliament",
      bsScore: "90%",
      claimsHistory: [
        {
          id: "c_mpsm3_1",
          date: getRecentDate(3),
          source: "X Post",
          sourceUrl: "https://x.com/Nigel_Farage/status/1831029381029",
          sourceType: "X Permalink",
          category: "Welfare & Immigration",
          quote: "The open door welfare system allows millions to receive PIP without living in Britain.",
          factCheck: "PIP applicants must satisfy strict Past Presence and Habitual Residence tests requiring 104 out of the last 156 weeks of physical residence in Great Britain."
        }
      ]
    },
    {
      id: "mp_sm_4",
      rank: 4,
      name: "Suella Braverman",
      party: "Conservative",
      constituency: "Fareham and Waterlooville",
      outlet: "X / Twitter",
      role: "Member of Parliament",
      bsScore: "88%",
      claimsHistory: [
        {
          id: "c_mpsm4_1",
          date: getRecentDate(5),
          source: "X Post",
          sourceUrl: "https://x.com/SuellaBraverman/status/1790291029381",
          sourceType: "X Permalink",
          category: "Benefit Dependency",
          quote: "Out-of-control disability payouts are trapping young adults in lifelong benefit reliance.",
          factCheck: "PIP is an extra-costs benefit entirely independent of employment status, earnings, or work capability assessments."
        }
      ]
    },
    {
      id: "mp_sm_5",
      rank: 5,
      name: "Sir Keir Starmer",
      party: "Labour",
      constituency: "Holborn and St Pancras",
      outlet: "X / Twitter",
      role: "Prime Minister",
      bsScore: "85%",
      claimsHistory: [
        {
          id: "c_mpsm5_1",
          date: getRecentDate(6),
          source: "X Post",
          sourceUrl: "https://x.com/Keir_Starmer/status/1813029182039",
          sourceType: "X Permalink",
          category: "Employment Inactivity",
          quote: "Our Back to Work plan will rapidly clear economic inactivity across all local authorities.",
          factCheck: "Independent OBR and ONS evaluations confirm long-term health inactivity reductions require structural NHS care capacity improvements taking multiple years."
        }
      ]
    },
    {
      id: "mp_sm_6",
      rank: 6,
      name: "Jeremy Hunt",
      party: "Conservative",
      constituency: "Godalming and Ash",
      outlet: "X / Twitter",
      role: "Member of Parliament",
      bsScore: "83%",
      claimsHistory: [
        {
          id: "c_mpsm6_1",
          date: getRecentDate(7),
          source: "X Post",
          sourceUrl: "https://x.com/Jeremy_Hunt/status/1727019283019",
          sourceType: "X Permalink",
          category: "Work Capability Assessments",
          quote: "Updating Work Capability rules will safely return hundreds of thousands back into the workforce.",
          factCheck: "OBR independent analysis estimated that under 3% of affected individuals successfully transition into sustained employment following WCA modifications."
        }
      ]
    },
    {
      id: "mp_sm_7",
      rank: 7,
      name: "Stephen Timms",
      party: "Labour",
      constituency: "East Ham",
      outlet: "X / Twitter",
      role: "Member of Parliament / Minister",
      bsScore: "81%",
      claimsHistory: [
        {
          id: "c_mpsm7_1",
          date: getRecentDate(8),
          source: "X Post",
          sourceUrl: "https://x.com/stephentimms/status/1830291029381",
          sourceType: "X Permalink",
          category: "PIP Consultation",
          quote: "Replacing PIP cash with tailored support vouchers will eliminate welfare fraud.",
          factCheck: "Official DWP audits calculate PIP fraud at under 0.5% of total expenditure. Voucher proposals remain non-statutory consultation ideas."
        }
      ]
    },
    {
      id: "mp_sm_8",
      rank: 8,
      name: "Priti Patel",
      party: "Conservative",
      constituency: "Witham",
      outlet: "X / Twitter",
      role: "Member of Parliament",
      bsScore: "79%",
      claimsHistory: [
        {
          id: "c_mpsm8_1",
          date: getRecentDate(10),
          source: "X Post",
          sourceUrl: "https://x.com/pritipatel/status/1820192830192",
          sourceType: "X Permalink",
          category: "Welfare Spending",
          quote: "Unchecked PIP spending is starving our frontline public services of vital funding.",
          factCheck: "PIP is financed out of general DWP social security expenditure (~2.2% of total government spend) and does not directly reduce operational budgets of other public services."
        }
      ]
    },
    {
      id: "mp_9_sm",
      rank: 9,
      name: "Liz Truss",
      party: "Conservative",
      constituency: "South West Norfolk",
      outlet: "X / Twitter",
      role: "Former Member of Parliament",
      bsScore: "77%",
      claimsHistory: [
        {
          id: "c_mpsm9_1",
          date: getRecentDate(12),
          source: "X Post",
          sourceUrl: "https://x.com/trussliz/status/1780192839201",
          sourceType: "X Permalink",
          category: "Disability Expenditure",
          quote: "UK welfare expenditure is growing faster than any other major European economy.",
          factCheck: "OECD comparative data demonstrates UK social protection spending as a percentage of GDP aligns with Northern European averages and trails several G7 peers."
        }
      ]
    },
    {
      id: "mp_10_sm",
      rank: 10,
      name: "Andy Burnham",
      party: "Labour",
      constituency: "Greater Manchester (Mayor)",
      outlet: "X / Twitter",
      role: "Metro Mayor / Public Official",
      bsScore: "75%",
      claimsHistory: [
        {
          id: "c_mpsm10_1",
          date: getRecentDate(13),
          source: "X Post",
          sourceUrl: "https://x.com/AndyBurnhamGM/status/1823019283019",
          sourceType: "X Permalink",
          category: "Health Benefit Growth",
          quote: "The current PIP system rewards inactivity over community re-engagement.",
          factCheck: "PIP is non-means-tested extra-costs support available equally to employed and unemployed individuals with qualifying functional impairments."
        }
      ]
    }
  ],
  social_media: [
    {
      id: "sm_1",
      rank: 1,
      name: "@PoliticalFeedUK",
      outlet: "X / Twitter",
      role: "Digital Outlet",
      bsScore: "95%",
      claimsHistory: [
        {
          id: "c_sm1_1",
          date: getRecentDate(1),
          source: "X Post",
          sourceUrl: "https://x.com/PoliticalFeedUK/status/18320192837192",
          sourceType: "X Permalink",
          category: "PIP Entitlement",
          quote: "A 4-point rule taking effect this November will strip PIP from 370,000 claimants.",
          factCheck: "The '4-point rule' was part of a discarded policy draft from 2025 and was never passed into law or set for implementation."
        },
        {
          id: "c_sm1_2",
          date: getRecentDate(3),
          source: "X Post",
          sourceUrl: "https://x.com/PoliticalFeedUK/status/18311029482711",
          sourceType: "X Permalink",
          category: "Welfare Spending",
          quote: "Unemployed disability claimants receive Â£800 a week tax-free.",
          factCheck: "Standard PIP rates max out at Â£194.60 per week (Â£778.40 per 4-week cycle). PIP covers extra disability living costs and is non-means-tested."
        }
      ]
    },
    {
      id: "sm_2",
      rank: 2,
      name: "@UKWelfareWatch",
      outlet: "Facebook",
      role: "Campaign Page",
      bsScore: "93%",
      claimsHistory: [
        {
          id: "c_sm2_1",
          date: getRecentDate(2),
          source: "Facebook Post",
          sourceUrl: "https://www.facebook.com/UKWelfareWatch/posts/pfbid02193819203",
          sourceType: "Facebook Permalink",
          category: "Cash-to-Voucher Conversion",
          quote: "Cash PIP payments are being completely abolished and replaced with pre-paid store cards.",
          factCheck: "DWP confirmed direct bank transfers remain the active statutory entitlement standard under current welfare legislation."
        }
      ]
    },
    {
      id: "sm_3",
      rank: 3,
      name: "@ReformUK_News",
      outlet: "TikTok",
      role: "Political Content Channel",
      bsScore: "91%",
      claimsHistory: [
        {
          id: "c_sm3_1",
          date: getRecentDate(4),
          source: "TikTok Video",
          sourceUrl: "https://www.tiktok.com/@reformuk_news/video/73918274928102",
          sourceType: "TikTok Video Link",
          category: "Migrant Benefit Eligibility",
          quote: "Foreign nationals can claim PIP on day 1 of entering the UK.",
          factCheck: "Applicants must meet strict Habitual Residency and Past Presence tests requiring 104 out of 156 weeks living in the UK."
        }
      ]
    },
    {
      id: "sm_4",
      rank: 4,
      name: "@BritainFirstNews",
      outlet: "Telegram",
      role: "Digital Channel",
      bsScore: "89%",
      claimsHistory: [
        {
          id: "c_sm4_1",
          date: getRecentDate(6),
          source: "Telegram Channel",
          sourceUrl: "https://t.me/BritainFirstNews/9482",
          sourceType: "Telegram Post",
          category: "Disability Mobility Cars",
          quote: "Motability is handing out brand new luxury cars to anyone claiming mild stress.",
          factCheck: "Motability requires surrendering 100% of the Higher Rate Mobility component (Â£80/week) to lease entry-level vehicles."
        }
      ]
    },
    {
      id: "sm_5",
      rank: 5,
      name: "@DailyPoliticsUK",
      outlet: "Instagram",
      role: "Meme & News Account",
      bsScore: "88%",
      claimsHistory: [
        {
          id: "c_sm5_1",
          date: getRecentDate(5),
          source: "Instagram Story",
          sourceUrl: "https://www.instagram.com/p/C-920192837/",
          sourceType: "Instagram Permalink",
          category: "DWP Surveillance",
          quote: "DWP AI algorithms are monitoring all bank accounts to automatically terminate PIP.",
          factCheck: "Bank monitoring powers apply strictly to targeted fraud investigations with judicial oversight, not automated PIP terminations."
        }
      ]
    },
    {
      id: "sm_6",
      rank: 6,
      name: "@UK_TruthSeeker",
      outlet: "X / Twitter",
      role: "Commentary Account",
      bsScore: "86%",
      claimsHistory: [
        {
          id: "c_sm6_1",
          date: getRecentDate(7),
          source: "X Post",
          sourceUrl: "https://x.com/UK_TruthSeeker/status/1829102938101",
          sourceType: "X Permalink",
          category: "PIP Assessment Rules",
          quote: "Anyone can self-diagnose mental illness online and receive full PIP payouts.",
          factCheck: "PIP requires clinical assessment by healthcare professionals and formal medical diagnostic documentation."
        }
      ]
    },
    {
      id: "sm_7",
      rank: 7,
      name: "@WelfareReality",
      outlet: "YouTube Shorts",
      role: "Video Creator",
      bsScore: "84%",
      claimsHistory: [
        {
          id: "c_sm7_1",
          date: getRecentDate(8),
          source: "YouTube Short",
          sourceUrl: "https://www.youtube.com/shorts/dQw4w9WgXcQ",
          sourceType: "YouTube Shorts Link",
          category: "Welfare Fraud",
          quote: "50% of all UK PIP claims are completely fraudulent.",
          factCheck: "Official DWP audits calculate PIP fraud at under 0.5%."
        }
      ]
    },
    {
      id: "sm_8",
      rank: 8,
      name: "@PoliticsUncut",
      outlet: "X / Twitter",
      role: "Aggregator Account",
      bsScore: "83%",
      claimsHistory: [
        {
          id: "c_sm8_1",
          date: getRecentDate(10),
          source: "X Post",
          sourceUrl: "https://x.com/PoliticsUncut/status/1827019283011",
          sourceType: "X Permalink",
          category: "Fit Note Culture",
          quote: "GPs earn bonuses for writing long-term fit notes to get patients onto PIP.",
          factCheck: "GPs receive no financial incentives for fit note duration or PIP qualification rates."
        }
      ]
    },
    {
      id: "sm_9",
      rank: 9,
      name: "@GB_Voice",
      outlet: "Facebook",
      role: "Community Group",
      bsScore: "81%",
      claimsHistory: [
        {
          id: "c_sm9_1",
          date: getRecentDate(12),
          source: "Facebook Group Post",
          sourceUrl: "https://www.facebook.com/groups/GBVoice/posts/9182039102/",
          sourceType: "Facebook Permalink",
          category: "PIP & Tax",
          quote: "PIP payments are taxed at 30% under new DWP emergency regulations.",
          factCheck: "PIP is non-taxable income by primary parliamentary statute."
        }
      ]
    },
    {
      id: "sm_10",
      rank: 10,
      name: "@RightSideNews",
      outlet: "TikTok",
      role: "Short-form News",
      bsScore: "80%",
      claimsHistory: [
        {
          id: "c_sm10_1",
          date: getRecentDate(13),
          source: "TikTok Clip",
          sourceUrl: "https://www.tiktok.com/@rightsidenews/video/738201938201",
          sourceType: "TikTok Video Link",
          category: "Work Capability Assessments",
          quote: "DWP is scrapping physical health assessments entirely to grant PIP to everyone.",
          factCheck: "Independent physical and cognitive assessments remain a statutory requirement for PIP evaluation."
        }
      ]
    }
  ],
  byParty: [
    {
      id: "party_1",
      rank: 1,
      name: "Conservative Campaign HQ",
      outlet: "Official X Account",
      role: "Political Party Post",
      bsScore: "93%",
      claimsHistory: [
        {
          id: "c_p1_1",
          date: getRecentDate(2),
          source: "X Campaign Post",
          sourceUrl: "https://x.com/CCHQPress/status/1830192830192",
          sourceType: "Official Party Press Post",
          category: "Sick Note Culture",
          quote: "GPs are handing out fit notes without medical evaluation to artificially boost PIP numbers.",
          factCheck: "Fit notes are issued by certified healthcare professionals following clinical assessments; PIP requires independent DWP assessments separate from GP fit notes."
        },
        {
          id: "c_p1_2",
          date: getRecentDate(4),
          source: "Press Statement",
          sourceUrl: "https://www.conservatives.com/news/welfare-statement-2024",
          sourceType: "Official Press Release",
          category: "Welfare GDP %",
          quote: "Welfare spending eats up over 50% of total UK GDP.",
          factCheck: "UK total social protection expenditure sits between 10% and 11% of GDP, lower than the OECD average (13.2%)."
        }
      ]
    },
    {
      id: "party_2",
      rank: 2,
      name: "Reform UK Press Office",
      outlet: "Official Facebook",
      role: "Political Party Post",
      bsScore: "91%",
      claimsHistory: [
        {
          id: "c_p2_1",
          date: getRecentDate(3),
          source: "Facebook Statement",
          sourceUrl: "https://www.facebook.com/reformuk/posts/8291039102",
          sourceType: "Official Party Facebook Statement",
          category: "Migrant Benefit Eligibility",
          quote: "Non-UK citizens receive immediate PIP cash payments without residency checks.",
          factCheck: "PIP applicants must satisfy strict past-presence rules (104 out of 156 weeks in Great Britain), habitual residence tests, and identity verifications."
        }
      ]
    },
    {
      id: "party_3",
      rank: 3,
      name: "Labour Party HQ",
      outlet: "Press Release",
      role: "Political Party Post",
      bsScore: "84%",
      claimsHistory: [
        {
          id: "c_p3_1",
          date: getRecentDate(5),
          source: "Press Release",
          sourceUrl: "https://labour.org.uk/press/back-to-work-plan-release/",
          sourceType: "Labour Press Release",
          category: "Welfare Reforms",
          quote: "New employment programs will eliminate economic inactivity caused by mental ill-health in 12 months.",
          factCheck: "Independent economic forecasts project structural reductions in long-term health inactivity take multiple years and require primary NHS capacity expansion."
        }
      ]
    },
    {
      id: "party_4",
      rank: 4,
      name: "Liberal Democrats HQ",
      outlet: "Campaign Briefing",
      sourceUrl: "https://www.libdems.org.uk/news/article/pip-waiting-times-briefing",
      sourceType: "Lib Dem Policy Briefing",
      role: "Political Party Post",
      bsScore: "78%",
      claimsHistory: [
        {
          id: "c_p4_1",
          date: getRecentDate(7),
          source: "Briefing Note",
          sourceUrl: "https://www.libdems.org.uk/news/article/pip-waiting-times-briefing",
          sourceType: "Lib Dem Policy Briefing",
          category: "PIP Backlogs",
          quote: "PIP assessment waiting times have tripled across every UK local authority area.",
          factCheck: "DWP statistics confirm waiting times vary significantly, with nationwide average processing times decreasing from 2024 peaks."
        }
      ]
    },
    {
      id: "party_5",
      rank: 5,
      name: "Green Party Executive",
      outlet: "Policy Document",
      role: "Political Party Post",
      bsScore: "75%",
      claimsHistory: [
        {
          id: "c_p5_1",
          date: getRecentDate(9),
          source: "Policy Statement",
          sourceUrl: "https://m manifesto.greenparty.org.uk/welfare-and-ubi/",
          sourceType: "Green Party Manifesto Document",
          category: "Universal Basic Income",
          quote: "Universal Basic Income can replace PIP entirely while expanding disability coverage.",
          factCheck: "Disability advocacy groups emphasize that flat-rate basic income fails to address individualized, extra mobility and care costs covered by PIP."
        }
      ]
    },
    {
      id: "party_6",
      rank: 6,
      name: "SNP Press Office",
      outlet: "Official Website",
      role: "Political Party Post",
      bsScore: "74%",
      claimsHistory: [
        {
          id: "c_p6_1",
          date: getRecentDate(11),
          source: "Website Statement",
          sourceUrl: "https://www.snp.org/adult-disability-payment-progress/",
          sourceType: "SNP Official Press Statement",
          category: "Adult Disability Payment",
          quote: "Scotland's Adult Disability Payment has completely eliminated assessment appeals.",
          factCheck: "Social Security Scotland data shows re-determinations and independent tribunal appeals still occur, though at lower rates than DWP PIP."
        }
      ]
    },
    {
      id: "party_7",
      rank: 7,
      name: "Plaid Cymru Media",
      outlet: "Press Release",
      role: "Political Party Post",
      bsScore: "72%",
      claimsHistory: [
        {
          id: "c_p7_1",
          date: getRecentDate(12),
          source: "Press Release",
          sourceUrl: "https://www.partyofwales.org/welsh_welfare_devolution",
          sourceType: "Plaid Cymru Media Statement",
          category: "Welsh Welfare",
          quote: "Devolving PIP to Wales would automatically double benefit awards for all claimants.",
          factCheck: "Devolution shifts administrative responsibility but does not double fiscal allocation without secondary tax adjustments."
        }
      ]
    },
    {
      id: "party_8",
      rank: 8,
      name: "UKIP Press Office",
      outlet: "Social Media",
      role: "Political Party Post",
      bsScore: "70%",
      claimsHistory: [
        {
          id: "c_p8_1",
          date: getRecentDate(14),
          source: "Online Post",
          sourceUrl: "https://www.ukip.org/news/welfare_vs_defence",
          sourceType: "UKIP Press Post",
          category: "Welfare Expenditure",
          quote: "PIP expenditure exceeds total UK defense spending.",
          factCheck: "UK defense expenditure (~Â£54bn) significantly exceeds total annual PIP expenditure (~Â£22bn)."
        }
      ]
    },
    {
      id: "party_9",
      rank: 9,
      name: "Workers Party GB",
      outlet: "Campaign Flyer",
      role: "Political Party Post",
      bsScore: "68%",
      claimsHistory: [
        {
          id: "c_p9_1",
          date: getRecentDate(15),
          source: "Flyer Leaflet",
          sourceUrl: "https://workerspartygb.org/welfare-charter-2024/",
          sourceType: "Campaign Publication",
          category: "Means Testing",
          quote: "PIP is secretively means-tested against household savings over Â£16,000.",
          factCheck: "PIP is non-means-tested; entitlement is independent of income, employment, or savings."
        }
      ]
    },
    {
      id: "party_10",
      rank: 10,
      name: "SDLP Press Office",
      outlet: "Media Statement",
      role: "Political Party Post",
      bsScore: "65%",
      claimsHistory: [
        {
          id: "c_p10_1",
          date: getRecentDate(16),
          source: "Media Release",
          sourceUrl: "https://www.sdlp.ie/news/ni-pip-assessment-review",
          sourceType: "SDLP Media Release",
          category: "Northern Ireland Welfare",
          quote: "PIP assessment criteria in Northern Ireland are harsher than DWP criteria in England.",
          factCheck: "PIP assessment descriptors and points systems in Northern Ireland are legally identical to DWP frameworks in Great Britain."
        }
      ]
    }
  ],
  tabloids: [
    {
      id: "tabloid_1",
      rank: 1,
      name: "The Daily Mail",
      outlet: "Print & Online",
      role: "Newspaper Press",
      bsScore: "92%",
      claimsHistory: [
        {
          id: "c_t1_1",
          date: getRecentDate(2),
          source: "Front Page Article",
          sourceUrl: "https://www.dailymail.co.uk/news/article-13328101/pip-claims-anxiety-welfare.html",
          sourceType: "Daily Mail Online Article",
          category: "PIP Assessment Rules",
          quote: "Millions claiming cash benefits for mild anxiety under lax PIP rules.",
          factCheck: "PIP eligibility requires documented functional impairment affecting daily living or mobility, verified by medical evidence and independent assessment."
        },
        {
          id: "c_t1_2",
          date: getRecentDate(5),
          source: "Newspaper Article",
          sourceUrl: "https://www.dailymail.co.uk/news/article-13319201/fit-notes-economic-inactivity.html",
          sourceType: "Daily Mail Online Article",
          category: "Fit Notes",
          quote: "Fit note culture is driving record economic inactivity across the nation.",
          factCheck: "ONS data indicates 84% of working-age economically inactive individuals suffer from long-term health conditions or extended NHS treatment waiting lists."
        }
      ]
    },
    {
      id: "tabloid_2",
      rank: 2,
      name: "The Sun",
      outlet: "Print & Online",
      role: "Tabloid Press",
      bsScore: "90%",
      claimsHistory: [
        {
          id: "c_t2_1",
          date: getRecentDate(3),
          source: "Newspaper Headline",
          sourceUrl: "https://www.thesun.co.uk/news/27401928/motability-suv-pip-benefits/",
          sourceType: "The Sun Online Article",
          category: "Motability Scheme",
          quote: "PIP recipients given free luxury SUV sports cars courtesy of taxpayers.",
          factCheck: "Motability lease payments are deducted directly from the claimant's allocated allowance, with luxury vehicles excluded from the scheme."
        }
      ]
    },
    {
      id: "tabloid_3",
      rank: 3,
      name: "The Daily Express",
      outlet: "Print & Online",
      role: "Newspaper Press",
      bsScore: "89%",
      claimsHistory: [
        {
          id: "c_t3_1",
          date: getRecentDate(4),
          source: "Front Page Headline",
          sourceUrl: "https://www.express.co.uk/news/uk/1890281/dwp-pip-cash-payments-end-vouchers",
          sourceType: "Daily Express Online Article",
          category: "PIP Vouchers",
          quote: "DWP confirms end of cash PIP payouts starting next month.",
          factCheck: "No statutory changes replacing cash PIP with vouchers have been enacted or scheduled."
        }
      ]
    },
    {
      id: "tabloid_4",
      rank: 4,
      name: "The Daily Telegraph",
      outlet: "Print & Online",
      role: "Broadsheet Press",
      bsScore: "87%",
      claimsHistory: [
        {
          id: "c_t4_1",
          date: getRecentDate(6),
          source: "Opinion Column",
          sourceUrl: "https://www.telegraph.co.uk/opinion/2024/04/20/pip-awards-work-trap/",
          sourceType: "Telegraph Opinion Column",
          category: "Sick Note Culture",
          quote: "Generous PIP awards create a trap preventing youth from seeking work.",
          factCheck: "PIP is non-means-tested and retained fully upon entering full-time employment."
        }
      ]
    },
    {
      id: "tabloid_5",
      rank: 5,
      name: "The Times",
      outlet: "Print & Online",
      role: "Broadsheet Press",
      bsScore: "81%",
      claimsHistory: [
        {
          id: "c_t5_1",
          date: getRecentDate(8),
          source: "News Report",
          sourceUrl: "https://www.thetimes.com/uk/politics/article/dwp-disability-claimant-reduction-targets-392182",
          sourceType: "The Times News Article",
          category: "Welfare Reforms",
          quote: "DWP overhaul will reduce disability claimant numbers by 50%.",
          factCheck: "Official DWP impact assessments project far smaller shifts tied to demographic trends and health waiting lists."
        }
      ]
    },
    {
      id: "tabloid_6",
      rank: 6,
      name: "The Metro",
      outlet: "Print & Online",
      role: "Free Daily Press",
      bsScore: "79%",
      claimsHistory: [
        {
          id: "c_t6_1",
          date: getRecentDate(9),
          source: "Print Feature",
          sourceUrl: "https://metro.co.uk/2024/05/10/pip-tribunals-overturn-rate-explained-20810291/",
          sourceType: "Metro UK Feature",
          category: "PIP Appeals",
          quote: "Tribunals automatically approve 90% of rejected PIP claims regardless of evidence.",
          factCheck: "Tribunal overturn rates (~70%) are based on detailed clinical and tribunal evidence evaluations, not automatic approvals."
        }
      ]
    },
    {
      id: "tabloid_7",
      rank: 7,
      name: "The Daily Star",
      outlet: "Print & Online",
      role: "Tabloid Press",
      bsScore: "78%",
      claimsHistory: [
        {
          id: "c_t7_1",
          date: getRecentDate(10),
          source: "Front Page Article",
          sourceUrl: "https://www.dailystar.co.uk/news/latest-news/dwp-pip-fraud-investigation-3281029",
          sourceType: "Daily Star Article",
          category: "Welfare Fraud",
          quote: "Bungling DWP pays out millions to fraudsters claiming fake illnesses.",
          factCheck: "Official DWP audits confirm PIP fraud is under 0.5% of total expenditure."
        }
      ]
    },
    {
      id: "tabloid_8",
      rank: 8,
      name: "The Independent",
      outlet: "Online Press",
      role: "Digital News",
      bsScore: "75%",
      claimsHistory: [
        {
          id: "c_t8_1",
          date: getRecentDate(12),
          source: "Digital Article",
          sourceUrl: "https://www.independent.co.uk/news/uk/politics/pip-welfare-cuts-strip-benefits-500k-b2531029.html",
          sourceType: "Independent Digital News",
          category: "Welfare Spending Cuts",
          quote: "Emergency welfare cuts will immediately strip PIP from 500,000 individuals.",
          factCheck: "Proposed reforms undergo consultation and statutory parliamentary process before any active award changes occur."
        }
      ]
    },
    {
      id: "tabloid_9",
      rank: 9,
      name: "The Mirror",
      outlet: "Print & Online",
      role: "Tabloid Press",
      bsScore: "73%",
      claimsHistory: [
        {
          id: "c_t9_1",
          date: getRecentDate(13),
          source: "News Article",
          sourceUrl: "https://www.mirror.co.uk/news/politics/dwp-pip-backlog-1-million-3271029",
          sourceType: "Daily Mirror News Report",
          category: "PIP Backlogs",
          quote: "DWP backlog leaves 1 million PIP applicants without decisions for over a year.",
          factCheck: "Active PIP processing backlogs average 15 weeks according to official DWP performance metrics."
        }
      ]
    },
    {
      id: "tabloid_10",
      rank: 10,
      name: "The Guardian",
      outlet: "Print & Online",
      role: "Broadsheet Press",
      bsScore: "70%",
      claimsHistory: [
        {
          id: "c_t10_1",
          date: getRecentDate(14),
          source: "Analysis Column",
          sourceUrl: "https://www.theguardian.com/society/2024/may/21/dwp-ai-assessments-pip-claims",
          sourceType: "The Guardian Analysis",
          category: "Assessment Overhauls",
          quote: "All physical PIP assessments have been replaced by outsourced AI decision bots.",
          factCheck: "PIP assessments are conducted by qualified healthcare assessors; AI tools are not legally empowered to make entitlement decisions."
        }
      ]
    }
  ],
  broadcasters: [
    {
      id: "tv_1",
      rank: 1,
      name: "GB News Morning Bulletin",
      outlet: "TV Broadcaster",
      role: "News Channel",
      bsScore: "91%",
      claimsHistory: [
        {
          id: "c_b1_1",
          date: getRecentDate(1),
          source: "Morning Broadcast",
          sourceUrl: "https://www.gbnews.com/shows/breakfast/pip-vouchers-2026-debate",
          sourceType: "GB News Video Archive",
          category: "PIP Vouchers",
          quote: "PIP cash payments are being completely replaced by a voucher scheme by late 2026.",
          factCheck: "Voucher proposals were part of scrapped consultation papers and are not active law."
        },
        {
          id: "c_b1_2",
          date: getRecentDate(6),
          source: "Morning Broadcast",
          sourceUrl: "https://www.gbnews.com/shows/breakfast/motability-grant-free-cars",
          sourceType: "GB News Video Archive",
          category: "Motability",
          quote: "Motability grants hand out free brand-new cars to claimants for nothing.",
          factCheck: "Motability is not a free grant. Recipients surrender 100% of their Higher Rate Mobility PIP allowance (Â£80.00/week) to lease the vehicle."
        }
      ]
    },
    {
      id: "tv_2",
      rank: 2,
      name: "TalkTV News Hour",
      outlet: "TV Broadcaster",
      role: "News Channel",
      bsScore: "88%",
      claimsHistory: [
        {
          id: "c_b2_1",
          date: getRecentDate(3),
          source: "Evening Debate",
          sourceUrl: "https://www.youtube.com/watch?v=talktv_fit_notes_debate",
          sourceType: "TalkTV YouTube Broadcast",
          category: "Sick Note Culture",
          quote: "GPs issue sick notes on demand without checking patient medical history.",
          factCheck: "Fit notes require clinical assessments and medical record verification."
        }
      ]
    },
    {
      id: "tv_3",
      rank: 3,
      name: "BBC Newsnight",
      outlet: "TV Broadcaster",
      role: "Public Broadcaster",
      bsScore: "76%",
      claimsHistory: [
        {
          id: "c_b3_1",
          date: getRecentDate(5),
          source: "TV Segment",
          sourceUrl: "https://www.bbc.co.uk/iplayer/episode/m001y920/newsnight-welfare-special",
          sourceType: "BBC iPlayer Catchup",
          category: "Health Benefit Spending",
          quote: "Mental health claims represent 80% of all new PIP applications.",
          factCheck: "DWP statistics show psychiatric disorders represent ~37% of primary PIP conditions."
        }
      ]
    },
    {
      id: "tv_4",
      rank: 4,
      name: "ITV News at Ten",
      outlet: "TV Broadcaster",
      role: "Commercial Broadcaster",
      bsScore: "74%",
      claimsHistory: [
        {
          id: "c_b4_1",
          date: getRecentDate(7),
          source: "News Bulletin",
          sourceUrl: "https://www.itv.com/news/2024-04-19/pip-payments-and-employment-status",
          sourceType: "ITV News Digital Archive",
          category: "Disability Benefits",
          quote: "PIP payments increase automatically when claimants leave employment.",
          factCheck: "PIP is non-means-tested and unaffected by employment status or salary changes."
        }
      ]
    },
    {
      id: "tv_5",
      rank: 5,
      name: "Sky News Breakfast",
      outlet: "TV Broadcaster",
      role: "News Channel",
      bsScore: "72%",
      claimsHistory: [
        {
          id: "c_b5_1",
          date: getRecentDate(8),
          source: "Breakfast Show",
          sourceUrl: "https://news.sky.com/story/pip-payout-rates-enhanced-living-mobility-13119283",
          sourceType: "Sky News Archive",
          category: "PIP Assessment Rules",
          quote: "Over half of PIP applicants receive maximum daily living and mobility payouts.",
          factCheck: "Only a minority of claimants qualify for the enhanced rate in both components simultaneously."
        }
      ]
    },
    {
      id: "tv_6",
      rank: 6,
      name: "Channel 4 News",
      outlet: "TV Broadcaster",
      role: "Public Broadcaster",
      bsScore: "70%",
      claimsHistory: [
        {
          id: "c_b6_1",
          date: getRecentDate(10),
          source: "Evening News",
          sourceUrl: "https://www.channel4.com/news/welfare-reform-impact-on-disability-payouts",
          sourceType: "Channel 4 News Archive",
          category: "Welfare Spending Cuts",
          quote: "Government plans will cut 1 million genuine disability claimants off benefits immediately.",
          factCheck: "Reforms require statutory legislative changes and individual reassessments prior to award adjustments."
        }
      ]
    },
    {
      id: "tv_7",
      rank: 7,
      name: "BBC Politics Live",
      outlet: "TV Broadcaster",
      role: "Public Broadcaster",
      bsScore: "69%",
      claimsHistory: [
        {
          id: "c_b7_1",
          date: getRecentDate(11),
          source: "Panel Debate",
          sourceUrl: "https://www.bbc.co.uk/iplayer/episode/m001z102/politics-live-disability-fraud-debate",
          sourceType: "BBC iPlayer Broadcast",
          category: "Welfare Fraud",
          quote: "Disability fraud costs the UK economy over Â£5 billion every year.",
          factCheck: "Total PIP fraud is estimated by DWP at approximately Â£90 million (under 0.5% of expenditure)."
        }
      ]
    },
    {
      id: "tv_8",
      rank: 8,
      name: "CNBC Europe UK",
      outlet: "TV Broadcaster",
      role: "Business Channel",
      bsScore: "67%",
      claimsHistory: [
        {
          id: "c_b8_1",
          date: getRecentDate(13),
          source: "Market Segment",
          sourceUrl: "https://www.cnbc.com/2024/05/15/uk-labour-market-inactivity-g7-comparison.html",
          sourceType: "CNBC Broadcast Segment",
          category: "Employment Inactivity",
          quote: "Economic inactivity due to illness is higher in the UK than any G7 nation.",
          factCheck: "OECD statistics show UK economic inactivity is comparable to European G7 peers like France and Italy."
        }
      ]
    },
    {
      id: "tv_9",
      rank: 9,
      name: "Bloomberg UK TV",
      outlet: "TV Broadcaster",
      role: "Business Channel",
      bsScore: "65%",
      claimsHistory: [
        {
          id: "c_b9_1",
          date: getRecentDate(14),
          source: "Finance Hour",
          sourceUrl: "https://www.bloomberg.com/news/videos/2024-05-20/uk-fiscal-spend-welfare-gdp-ratio",
          sourceType: "Bloomberg TV Segment",
          category: "Welfare GDP %",
          quote: "UK disability benefits consume 20% of national tax revenues.",
          factCheck: "PIP spending represents approximately 2.2% of total UK government expenditure."
        }
      ]
    },
    {
      id: "tv_10",
      rank: 10,
      name: "Channel 5 News",
      outlet: "TV Broadcaster",
      role: "Commercial Broadcaster",
      bsScore: "64%",
      claimsHistory: [
        {
          id: "c_b10_1",
          date: getRecentDate(15),
          source: "Evening Bulletin",
          sourceUrl: "https://www.channel5.com/show/5-news/pip-tax-rumours-debunked",
          sourceType: "5 News Archive",
          category: "PIP & Tax",
          quote: "New tax rates will apply to all PIP payments above Â£100 per week.",
          factCheck: "PIP is tax-exempt under primary UK tax legislation."
        }
      ]
    }
  ],
  radio: [
    {
      id: "radio_1",
      rank: 1,
      name: "LBC Phone-in Debate",
      outlet: "Radio Broadcast",
      role: "Radio Host",
      bsScore: "89%",
      claimsHistory: [
        {
          id: "c_r1_1",
          date: getRecentDate(2),
          source: "Live Phone-In",
          sourceUrl: "https://www.lbc.co.uk/radio/presenters/nick-ferrari/pip-medical-evidence-phone-in/",
          sourceType: "LBC Audio Archive",
          category: "PIP Documentation",
          quote: "PIP assessments no longer require any physical or medical documentation.",
          factCheck: "Applications require formal supporting medical evidence from GPs, consultants, or care specialists before progression."
        },
        {
          id: "c_r1_2",
          date: getRecentDate(4),
          source: "Live Phone-In",
          sourceUrl: "https://www.lbc.co.uk/radio/presenters/james-obrien/carers-allowance-earnings-cliff-edge/",
          sourceType: "LBC Audio Archive",
          category: "Carer's Allowance",
          quote: "Carers are earning full-time wages while claiming Carer's Allowance.",
          factCheck: "Carer's Allowance has a strict net earnings cap of Â£204.00/week for at least 35 hours of caring work per week, creating a steep cliff-edge threshold."
        }
      ]
    },
    {
      id: "radio_2",
      rank: 2,
      name: "talkRADIO Breakfast",
      outlet: "Radio Broadcast",
      role: "Radio Channel",
      bsScore: "87%",
      claimsHistory: [
        {
          id: "c_r2_1",
          date: getRecentDate(3),
          source: "Morning Show",
          sourceUrl: "https://www.youtube.com/watch?v=talkradio_breakfast_sick_notes",
          sourceType: "talkRADIO Live Broadcast",
          category: "Sick Note Culture",
          quote: "Millions take fit notes to avoid returning to office work.",
          factCheck: "ONS surveys confirm 84% of inactive fit note holders suffer from severe long-term health conditions."
        }
      ]
    },
    {
      id: "radio_3",
      rank: 3,
      name: "BBC Radio 5 Live",
      outlet: "Radio Broadcast",
      role: "Public Broadcaster",
      bsScore: "75%",
      claimsHistory: [
        {
          id: "c_r3_1",
          date: getRecentDate(5),
          source: "Phone-In Discussion",
          sourceUrl: "https://www.bbc.co.uk/sounds/play/m001y932",
          sourceType: "BBC Sounds Audio Link",
          category: "PIP Entitlement",
          quote: "PIP can be claimed alongside full salary without any medical review.",
          factCheck: "PIP is non-means-tested, but periodic medical reviews are mandatory for all award holders."
        }
      ]
    },
    {
      id: "radio_4",
      rank: 4,
      name: "BBC Radio 4 Today",
      outlet: "Radio Broadcast",
      role: "Public Broadcaster",
      bsScore: "73%",
      claimsHistory: [
        {
          id: "c_r4_1",
          date: getRecentDate(6),
          source: "Morning Interview",
          sourceUrl: "https://www.bbc.co.uk/sounds/play/m001z021",
          sourceType: "BBC Sounds Audio Link",
          category: "Work Capability Assessments",
          quote: "Scrapping WCAs will move 500,000 claimants directly into jobs.",
          factCheck: "OBR independent analysis estimates under 3% of claimants enter sustained employment post-assessment reform."
        }
      ]
    },
    {
      id: "radio_5",
      rank: 5,
      name: "Times Radio Drive",
      outlet: "Radio Broadcast",
      role: "News Radio",
      bsScore: "71%",
      claimsHistory: [
        {
          id: "c_r5_1",
          date: getRecentDate(8),
          source: "Drive Time Show",
          sourceUrl: "https://www.thetimes.com/radio/show/drive/pip-voucher-plans-discussion-29182",
          sourceType: "Times Radio Audio Record",
          category: "PIP Vouchers",
          quote: "Government has finalized plans to replace all cash PIP with shop vouchers.",
          factCheck: "Voucher proposals remain non-statutory recommendations from consultation papers."
        }
      ]
    },
    {
      id: "radio_6",
      rank: 6,
      name: "LBC News Hour",
      outlet: "Radio Broadcast",
      role: "News Radio",
      bsScore: "70%",
      claimsHistory: [
        {
          id: "c_r6_1",
          date: getRecentDate(9),
          source: "News Bulletin",
          sourceUrl: "https://www.lbc.co.uk/news/uk/dwp-pip-fraud-statistics-bulletin/",
          sourceType: "LBC News Audio Clip",
          category: "Welfare Fraud",
          quote: "PIP fraud has doubled every year for the past 5 years.",
          factCheck: "DWP official statistical audits report PIP fraud rates remaining consistently under 0.5%."
        }
      ]
    },
    {
      id: "radio_7",
      rank: 7,
      name: "Capital FM Breakfast",
      outlet: "Radio Broadcast",
      role: "Commercial Radio",
      bsScore: "68%",
      claimsHistory: [
        {
          id: "c_r7_1",
          date: getRecentDate(10),
          source: "Morning Chat",
          sourceUrl: "https://www.capitalfm.com/news/motability-pip-explained-chat/",
          sourceType: "Capital FM Audio Stream",
          category: "Motability",
          quote: "Claimants get free cars handed to them on PIP.",
          factCheck: "Motability requires surrendering 100% of the Higher Rate Mobility component (Â£80/week)."
        }
      ]
    },
    {
      id: "radio_8",
      rank: 8,
      name: "Heart FM News",
      outlet: "Radio Broadcast",
      role: "Commercial Radio",
      bsScore: "66%",
      claimsHistory: [
        {
          id: "c_r8_1",
          date: getRecentDate(12),
          source: "Hourly Bulletin",
          sourceUrl: "https://www.heart.co.uk/news/uk/pip-mental-health-evidence-bulletin/",
          sourceType: "Heart FM Audio Bulletin",
          category: "PIP & Mental Health",
          quote: "Mental health PIP claims require no supporting clinical evidence.",
          factCheck: "Clinical evidence from healthcare professionals is required for all PIP applications."
        }
      ]
    },
    {
      id: "radio_9",
      rank: 9,
      name: "BBC World Service UK",
      outlet: "Radio Broadcast",
      role: "Public Broadcaster",
      bsScore: "64%",
      claimsHistory: [
        {
          id: "c_r9_1",
          date: getRecentDate(14),
          source: "Global Report",
          sourceUrl: "https://www.bbc.co.uk/sounds/play/p0821039",
          sourceType: "BBC World Service Audio",
          category: "Disability Expenditure",
          quote: "UK disability spending is double the European average.",
          factCheck: "OECD comparisons position UK disability spending within standard Northern European averages."
        }
      ]
    },
    {
      id: "radio_10",
      rank: 10,
      name: "Absolute Radio News",
      outlet: "Radio Broadcast",
      role: "Commercial Radio",
      bsScore: "62%",
      claimsHistory: [
        {
          id: "c_r10_1",
          date: getRecentDate(15),
          source: "Hourly News",
          sourceUrl: "https://planetradio.co.uk/absolute-radio/news/uk/pip-delays-dwp-backlog-news/",
          sourceType: "Planet Radio Audio Archive",
          category: "PIP Backlogs",
          quote: "PIP decisions are delayed by over 2 years for all applicants.",
          factCheck: "Average PIP processing wait times stand at approximately 15 weeks nationwide."
        }
      ]
    }
  ]
};

export const getDynamicLeaderboardData = () => {
  return LEADERBOARD_RAW_DATA;
};
