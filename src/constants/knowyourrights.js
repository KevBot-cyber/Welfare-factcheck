
export const KNOW_YOUR_RIGHTS_CONTENT = {
  overview: {
    title: "Navigating Your Statutory Rights in the UK Welfare System",
    subtitle: "Evidence-based strategies, statutory rules, and legal protections for claimants.",
    keyPrinciples: [
      {
        heading: "The 'Majority of Time' Rule (50% Rule)",
        description: "Under Regulation 7 of the PIP Regulations 2013, a descriptor applies if it satisfies the condition on at least 50% of the days in a 12-month period. You do not need to be affected every single day."
      },
      {
        heading: "The Reliability Criteria (SAFELY)",
        description: "Under Regulation 4, an activity can only be counted as completed if you can perform it **Safely**, to an **Acceptable standard**, **Repeatedly** (as often as necessary), and in a **Reasonable time frame** (no more than twice as long as non-disabled peers)."
      },
      {
        heading: "Fluctuating Conditions Protection",
        description: "If your health condition varies day-to-day, DWP health assessors must evaluate your worst days as well as your best. Failure to account for bad days is one of the most common grounds for overturning decisions at tribunal."
      }
    ]
  },

  guides: [
    {
      id: "pip-form-guide",
      category: "Form Completion & Evidence",
      title: "How to Complete the PIP2 How Your Disability Affects You Form",
      summary: "Detailed strategies for answering PIP descriptors, writing effective personal impact statements, and gathering clinical evidence.",
      sections: [
        {
          subheading: "1. Applying the 'SAFELY' Standards to Descriptors",
          text: "When describing daily living and mobility tasks (e.g., preparing food, washing, moving around), frame every answer around the four legal reliability criteria (Regulation 4):",
          bullets: [
            "**Safely:** Do you risk falls, burns, exhaustion, or mental distress?",
            "**Acceptable Standard:** Do you require prompting, experience pain, or suffer severe fatigue afterwards?",
            "**Repeatedly:** Can you do the task again if needed within the same day without severe consequences?",
            "**In a Reasonable Time:** Does it take you more than twice as long as a non-disabled person?"
          ]
        },
        {
          subheading: "2. Gathering High-Impact Clinical Evidence",
          text: "Independent clinical evidence carries significantly more weight than self-reporting alone. Aim to request and attach:",
          bullets: [
            "GP summary records and diagnostic letters",
            "Occupational Therapy (OT) assessments or care plans",
            "Specialist consultant clinic letters and prescription histories",
            "Third-party support letters from carers, social workers, or family members documenting daily assistance needed"
          ]
        }
      ],
      usefulToolsAndLinks: [
        { label: "Turn2us PIP Claim & Descriptor Guide", url: "https://www.turn2us.org.uk/benefit-information-page/pip-how-to-claim" },
        { label: "Citizens Advice PIP Form Helper", url: "https://www.citizensadvice.org.uk/benefits/sick-or-disabled-people-and-carers/pip/help-with-claiming-pip/filling-in-your-claim-form/" },
        { label: "GOV.UK PIP Assessment Guide for Health Professionals", url: "https://www.gov.uk/government/publications/pip-assessment-guide-for-assessment-providers" }
      ]
    },
    {
      id: "mandatory-reconsideration",
      category: "Challenging Decisions",
      title: "Mandatory Reconsideration (MR): Step-by-Step Challenge",
      summary: "How to challenge an unfair PIP or UC decision letter within the 1-month statutory deadline.",
      sections: [
        {
          subheading: "1. What is Mandatory Reconsideration?",
          text: "Before appealing to an independent tribunal, you must ask the DWP to review their decision. You usually have **1 calendar month** from the date on your decision notice to submit an MR request (late requests can be accepted up to 13 months if good cause is shown)."
        },
        {
          subheading: "2. Key Steps for your MR Notice",
          text: "Submit form CRMR1 or write a letter detailing:",
          bullets: [
            "Which specific descriptors/scores you disagree with (e.g., Activity 1: Preparing Food).",
            "Where the healthcare professional's assessment report was inaccurate or ignored evidence.",
            "Any new clinical evidence supporting your actual level of impairment."
          ]
        }
      ],
      usefulToolsAndLinks: [
        { label: "GOV.UK Mandatory Reconsideration Request Form (CRMR1)", url: "https://www.gov.uk/government/publications/challenge-a-decision-made-by-the-department-for-work-and-pensions-dwp" },
        { label: "Advicenow Mandatory Reconsideration Tool", url: "https://www.advicenow.org.uk/guides/how-turn-around-pip-decision" }
      ]
    },
    {
      id: "tribunal-appeals",
      category: "Legal Appeals & Hearings",
      title: "Independent First-tier Tribunal Appeals (SSCS1)",
      summary: "Navigating the Courts and Tribunals Service (HMCTS) appeal process—where over 70% of PIP appeals are successful.",
      sections: [
        {
          subheading: "1. Submitting Your SSCS1 Appeal",
          text: "If your Mandatory Reconsideration notice does not award the correct rate, you can appeal directly to HMCTS using form SSCS1 or online within 1 month.",
          bullets: [
            "Appeals are completely independent of the DWP.",
            "You can choose between an oral hearing (in person, video, or phone) or a paper assessment. Oral hearings have a significantly higher success rate."
          ]
        },
        {
          subheading: "2. Tribunal Composition",
          text: "Your appeal panel consists of three independent experts: a Judge, a Registered Doctor/Medical Member, and a Disability Specialist Member."
        }
      ],
      usefulToolsAndLinks: [
        { label: "HMCTS Online Benefit Appeal Service (SSCS1)", url: "https://www.gov.uk/appeal-benefit-decision/submit-appeal" },
        { label: "Free Representation Unit (FRU) Tribunal Guidance", url: "https://www.thefru.org.uk/get-advice" },
        { label: "Law Centres Network Representation Directory", url: "https://www.lawcentres.org.uk/" }
      ]
    }
  ],

  supportNetworksAndLegalHelp: [
    {
      name: "Advicenow",
      category: "Self-Help Legal Guides",
      website: "https://www.advicenow.org.uk/",
      description: "Step-by-step guides, letter generators, and appeal tools produced by the charity Law for Life."
    },
    {
      name: "Citizens Advice",
      category: "Free Local Welfare Advice",
      website: "https://www.citizensadvice.org.uk/",
      phone: "0800 144 8848",
      description: "Confidential advice on benefits, tribunal representation, and local caseworker support."
    },
    {
      name: "Law Centres Network",
      category: "Free Pro Bono Legal Representation",
      website: "https://www.lawcentres.org.uk/",
      description: "Not-for-profit legal practices offering free legal assistance and tribunal representation for welfare appeals."
    },
    {
      name: "Disability Rights UK",
      category: "Policy & Rights Guides",
      website: "https://www.disabilityrightsuk.org/",
      description: "Disabled-led national charity providing comprehensive legal guides on PIP, Universal Credit, and tribunal preparation."
    },
    {
      name: "Free Representation Unit (FRU)",
      category: "Tribunal Legal Representation",
      website: "https://www.thefru.org.uk/",
      description: "Provides legal representation for social security tribunal hearings (referral via advice agencies required)."
    },
    {
      name: "Scope Disability Energy & Welfare Advice",
      category: "One-to-One Navigators",
      website: "https://www.scope.org.uk/support/disabled-people/disability-energy-support/",
      phone: "0808 800 3333",
      description: "Free 1-on-1 caseworker navigation for benefit applications, PIP challenges, and disability grants."
    }
  ]
};
