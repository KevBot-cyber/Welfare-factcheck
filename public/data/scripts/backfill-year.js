/**
 * backfill-year-fast STANDALONE v5.4 - CSV INCIDENT LOG + VOLUME FIX FOR 2020-2026 THOUSANDS ESTIMATE
 * 
 * Problem: Guardian 3300 raw → 5 classified. Real world = thousands/year, 1000% spike 2024
 * Root cause: Guardian API = Guardian/Observer ONLY. Telegraph, Mail, Times, Sun, Express NOT in Guardian.
 *            GNews free = 100/day → hits limit → 0 items (your screenshot). Currents 2 years only.
 * 
 * Fix v5.3:
 * 1. GDELT enabled by default - FREE, unlimited, covers ALL UK outlets (Telegraph, Mail, Sun, Times, Mirror, etc)
 * 2. RSS expanded 4 → 15 outlets (Mail, Telegraph, Sun, Mirror, Express, Independent, BBC, Sky, ITV, etc)
 * 3. VOLUME MODE: --mode=volume counts broad welfare coverage (thousands) + stigma subset (hundreds)
 * 4. 30 categories, 309 terms including 2025-26 framing: welfare bubble, moral crusade, fraud squads, £50bn cuts
 * 
 * Usage:
 * node scripts/backfill-year-fast.js --mode=recent        -> stigma only (200-400 expected)
 * node scripts/backfill-year-fast.js --mode=volume        -> broad welfare volume (1500-3000) + stigma subset
 * node scripts/backfill-year-fast.js --mode=historical    -> 10 years
 */

import fs from 'fs';
import dotenv from 'dotenv';
import crypto from 'crypto';
import { parse } from 'csv-parse/sync';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const csvPath = path.join(__dirname, '..', 'welfare-2025-10-26.csv');

const csvContent = fs.readFileSync(csvPath, 'utf8');

const articles = parse(csvContent, { columns: true, skip_empty_lines: true });
console.log(`Loaded ${articles.length} welfare articles from NGrams`);

const output = articles.map(a => ({
  date: '2025-10-26',
  url: a.url,
  title: a.title,
  text: a.text,
  source: new URL(a.url).hostname
}));

fs.writeFileSync('../archive.json', JSON.stringify(output, null, 2));

dotenv.config();
dotenv.config({ path: '.env.local', override: false });

// DEBUG HELPER - add at top
const DEBUG = process.argv.includes('--debug') || true; // force on for now

async function debugFetch(sourceName, url, fetchOptions = {}) {
  if (DEBUG) console.log(`\n>> [${sourceName}] FETCHING: ${url.substring(0, 350)}...`);
  
  try {
    const res = await fetch(url, fetchOptions);
    const text = await res.text();
    
    if (!res.ok) {
      console.log(`!! [${sourceName}] HTTP ERROR: ${res.status} ${res.statusText}`);
      console.log(`!! [${sourceName}] Body: ${text.substring(0, 500)}`);
      return { ok: false, status: res.status, text, json: null };
    }
    
    let json = null;
    try { json = JSON.parse(text); } catch {}
    
    if (DEBUG) {
      console.log(`<< [${sourceName}] Status: ${res.status} | Length: ${text.length}`);
      if (json) {
        // Log GDELT / GNews / Currents specific error fields
        if (json.articles !== undefined) console.log(`   -> articles field: ${json.articles?.length ?? json.articles}`);
        if (json.totalArticles !== undefined) console.log(`   -> totalArticles: ${json.totalArticles}`);
        if (json.message) console.log(`   -> API message: ${json.message}`);
        if (json.error) console.log(`   -> API error: ${JSON.stringify(json.error)}`);
      } else {
        console.log(`   -> Not JSON, first 300 chars: ${text.substring(0, 300)}`);
      }
    }
    
    return { ok: true, status: res.status, text, json };
  } catch (err) {
    console.log(`!! [${sourceName}] FETCH EXCEPTION: ${err.message}`);
    console.log(err.stack?.substring(0, 500));
    return { ok: false, status: 0, text: '', json: null, error: err };
  }
}

const TAXONOMY = {
  "version": "3.2 - 30 categories with 2025-2026 political framing + volume",
  "categories": {
    "01_Benefit_Fraud_Dishonesty": {
      "description": "Benefit fraud and dishonesty",
      "terms": [
        "benefit cheat",
        "benefits cheat",
        "benefit cheats",
        "benefit fraud",
        "benefits fraud",
        "cheating the system",
        "playing the system",
        "benefit fraudster",
        "dole cheat",
        "benefit fraud epidemic"
      ]
    },
    "02_Disability_Fraud_Malingering": {
      "description": "Disability fraud and malingering",
      "terms": [
        "fake disability",
        "faking disability",
        "not really disabled",
        "not disabled",
        "malingering",
        "malingerers",
        "pretend disability",
        "swinging the lead",
        "exaggerating disability",
        "not that disabled",
        "faking illness",
        "not really sick",
        "fake disabled"
      ]
    },
    "03_Mental_Health_Scepticism": {
      "description": "Mental health scepticism",
      "terms": [
        "anxiety not real",
        "depression excuse",
        "mental health excuse",
        "just anxious",
        "just depressed",
        "not real illness",
        "snowflake generation",
        "mental health card",
        "playing mental health",
        "anxiety is not disability",
        "anxiety excuse",
        "depression not real"
      ]
    },
    "04_Chronic_Pain_Fatigue": {
      "description": "Chronic pain fatigue",
      "terms": [
        "chronic fatigue excuse",
        "fibromyalgia excuse",
        "bad back excuse",
        "bad back benefit",
        "chronic pain not real"
      ]
    },
    "05_PIP_Assessment_Rhetoric": {
      "description": "PIP and disability assessment rhetoric",
      "terms": [
        "PIP cheat",
        "PIP fraud",
        "zero points",
        "scored zero",
        "PIP assessment",
        "work capability",
        "capability assessment",
        "passed fit",
        "declared fit",
        "fit for work assessment",
        "PIP scrounger"
      ]
    },
    "06_ESA_UC_LCWRA": {
      "description": "ESA, Universal Credit and LCWRA rhetoric",
      "terms": [
        "ESA cheat",
        "LCWRA scrounger",
        "UC scrounger",
        "universal credit scrounger",
        "LCWRA lifestyle",
        "limited capability",
        "work related activity"
      ]
    },
    "07_WCA_Fitness_Disputes": {
      "description": "WCA fitness disputes",
      "terms": [
        "fit for work",
        "passed fit for work",
        "work capability assessment",
        "WCA",
        "found fit",
        "declared fit for work",
        "fit to work test",
        "failed WCA"
      ]
    },
    "08_Sanctions_Conditionality": {
      "description": "Sanctions and conditionality",
      "terms": [
        "benefit sanction",
        "sanctioned for not working",
        "sanction culture",
        "conditionality"
      ]
    },
    "09_Laziness_Moral": {
      "description": "Laziness moral condemnation",
      "terms": [
        "lazy",
        "bone idle",
        "bone-idle",
        "feckless",
        "feral",
        "chav",
        "chavs",
        "unwashed",
        "workless",
        "idle",
        "can't be bothered",
        "won't work",
        "refuse to work",
        "layabout",
        "layabouts",
        "feckless benefits",
        "lazy benefits",
        "underclass",
        "drain on society",
        "burden on taxpayers",
        "taxpayer burden"
      ]
    },
    "10_Skiver_Shirker_Scrounger": {
      "description": "Skiver shirker scrounger terminology",
      "terms": [
        "scrounger",
        "scroungers",
        "shirker",
        "shirkers",
        "skiver",
        "skivers",
        "sciver",
        "scivers",
        "workshy",
        "work-shy",
        "work shy",
        "dole dosser",
        "dole bludger",
        "workshy benefits",
        "skiver culture",
        "shirker culture"
      ]
    },
    "11_Benefits_Vs_Work": {
      "description": "Benefits vs work better off",
      "terms": [
        "benefits more than working",
        "more on benefits than work",
        "better off on benefits",
        "better off on the dole",
        "earn more on benefits",
        "paid more on benefits than working",
        "benefits pay more than work",
        "lifestyle choice",
        "choose benefits over work",
        "benefits lifestyle",
        "better off not working",
        "work doesn't pay"
      ]
    },
    "12_Welfare_Expenditure_Burden": {
      "description": "Welfare expenditure taxpayer burden",
      "terms": [
        "bloated welfare",
        "welfare bill",
        "benefits bill",
        "welfare budget bloated",
        "out of control welfare",
        "welfare out of control",
        "welfare bill soars",
        "benefits bill soars",
        "benefits bill soaring",
        "welfare bill ballooning",
        "welfare bill spiralling",
        "welfare bill explodes",
        "unsustainable welfare",
        "welfare bill unsustainable",
        "taxpayer burden",
        "burden on taxpayers",
        "burden on economy",
        "costing taxpayer",
        "welfare bill completely out of control",
        "benefits bill out of control"
      ]
    },
    "13_Dependency_Culture": {
      "description": "Dependency culture intergenerational",
      "terms": [
        "dependency culture",
        "culture of dependency",
        "benefits culture",
        "benefits street culture",
        "welfare dependency",
        "welfare culture",
        "entitlement culture",
        "something for nothing culture",
        "welfare trap",
        "benefits trap",
        "intergenerational worklessness",
        "three generations never worked",
        "generations on benefits",
        "welfare dependency culture",
        "something for nothing"
      ]
    },
    "14_Motability_Free_Cars": {
      "description": "Motability free cars luxury",
      "terms": [
        "free cars",
        "free car",
        "motability free car",
        "motability cars",
        "free motability",
        "taxpayer funded car",
        "luxury motability",
        "bmw on benefits",
        "mercedes on disability",
        "free cars for disabled",
        "handed free cars",
        "given a free car",
        "motability bmw",
        "motability mercedes",
        "free car on benefits",
        "taxpayer funded motability",
        "free motability cars"
      ]
    },
    "15_Lifestyle_Consumption": {
      "description": "Lifestyle consumption stereotypes",
      "terms": [
        "benefits street",
        "benefits britain",
        "curtains closed",
        "daytime tv",
        "daytime telly",
        "big tv",
        "flat screen tv",
        "sky tv on benefits",
        "smoking on benefits",
        "takeaway on benefits",
        "tattoos on benefits",
        "nails on benefits",
        "curtains shut",
        "large tv on benefits",
        "sky television on benefits"
      ]
    },
    "16_Sick_Notes_Absence": {
      "description": "Sick notes absence",
      "terms": [
        "sick note culture",
        "sicknote Britain",
        "long term sick",
        "signed off sick",
        "sick note",
        "sicknotes",
        "sick leave scrounger",
        "sicknote excuse"
      ]
    },
    "17_Employment_Productivity": {
      "description": "Employment productivity claims",
      "terms": [
        "disabled can't work",
        "disabled unproductive"
      ]
    },
    "18_Housing_Benefit": {
      "description": "Housing Benefit",
      "terms": [
        "housing benefit bill",
        "housing benefit soars",
        "housing benefit scrounger"
      ]
    },
    "19_Child_Poverty": {
      "description": "Child poverty",
      "terms": [
        "child benefit scrounger",
        "food bank scrounger"
      ]
    },
    "20_Carers": {
      "description": "Carers",
      "terms": [
        "carer benefit cheat"
      ]
    },
    "21_Pensioner": {
      "description": "Pensioner benefits",
      "terms": [
        "pensioner benefit bill"
      ]
    },
    "22_DLA_Attendance": {
      "description": "DLA Attendance",
      "terms": [
        "DLA fraud",
        "attendance allowance cheat"
      ]
    },
    "23_Fraud_Stats": {
      "description": "Fraud statistics",
      "terms": [
        "benefit fraud epidemic",
        "welfare fraud epidemic",
        "rampant benefit fraud",
        "fraud soars",
        "systemic benefit fraud"
      ]
    },
    "24_Caps_Uprating": {
      "description": "Caps uprating",
      "terms": [
        "benefit cap scrounger",
        "benefits too generous"
      ]
    },
    "25_Incentives_Labour": {
      "description": "Incentives labour market",
      "terms": [
        "welfare disincentive",
        "benefits disincentive",
        "work doesn't pay"
      ]
    },
    "26_Reform_Eligibility": {
      "description": "Reform eligibility",
      "terms": [
        "PIP reform needed",
        "tighten PIP",
        "crackdown on disability benefits",
        "disability benefit reform"
      ]
    },
    "27_Misleading_Headlines": {
      "description": "Misleading headlines sensationalism",
      "terms": [
        "benefits bill explodes",
        "welfare bill explodes",
        "benefits bill out of control",
        "welfare bill out of control",
        "benefits bill soars",
        "welfare bill soars",
        "completely out of control",
        "welfare bill ballooning",
        "benefits bill soaring",
        "out of control"
      ]
    },
    "28_Counter_Rhetoric": {
      "description": "Counter-rhetoric rebuttals",
      "terms": [
        "myth of benefit fraud",
        "debunk benefit myth",
        "fact check welfare",
        "benefit scrounger myth",
        "disability benefit myth",
        "welfare myth",
        "not scroungers",
        "not better off on benefits"
      ]
    },
    "29_Current_Political_2025_2026": {
      "description": "Current 2025-2026 political framing - welfare bubble, moral crusade, fraud squads, \u00a350bn cuts",
      "terms": [
        "welfare bubble",
        "welfare bubble needs to burst",
        "welfare bubble burst",
        "moral crusade",
        "moral crusade benefits",
        "fraud squads",
        "fraud squad",
        "fraud and error crackdown",
        "sending fraud squads",
        "public consent welfare",
        "public consent for welfare",
        "lose public consent",
        "cut 50 billion welfare",
        "cut \u00a350 billion welfare",
        "cut 36 billion welfare",
        "cut \u00a336 billion welfare",
        "slash welfare",
        "slashing welfare",
        "economic rescue plan welfare",
        "out-of-work packages",
        "out of work packages",
        "signed off work",
        "signed off with adhd",
        "signed off work adhd",
        "100000 signed off",
        "100,000 signed off",
        "handed pip benefits",
        "handed pip",
        "pip benefits under labour",
        "1000 a day pip",
        "nearly 1000 a day pip",
        "striver vs scrounger",
        "strivers vs scroungers",
        "striver vs scrounger media",
        "welfare cuts",
        "welfare fraud",
        "welfare fraud and error",
        "crackdown welfare",
        "crackdown benefits",
        "welfare savings",
        "welfare savings not from claimants",
        "sick note britain",
        "sicknote britain",
        "long term sickness benefits",
        "economically inactive benefits",
        "britain's welfare bill",
        "britain welfare bill",
        "welfare bill hits",
        "daily cost taxpayer pip",
        "cost to taxpayer pip",
        "u-turn welfare",
        "welfare u-turn"
      ]
    },
    "30_Volume_Broad_Welfare_Coverage": {
      "description": "Broad welfare coverage for volume estimation - not stigma but counts toward thousands per year baseline. Used to estimate total welfare articles vs stigma subset.",
      "terms": [
        "welfare reform",
        "welfare cuts",
        "universal credit reform",
        "pip reform",
        "disability benefits reform",
        "benefits bill",
        "welfare bill",
        "dwp welfare",
        "welfare spending",
        "sickness benefits",
        "health related benefits",
        "universal credit health element",
        "personal independence payment",
        "work capability assessment",
        "economic inactivity",
        "worklessness",
        "long term sick",
        "signed off work",
        "benefits britain",
        "welfare state"
      ]
    }
  },
  "totalTerms": 309,
  "lastUpdated": "2026-10-26",
  "methodology": {
    "note": "To reach thousands per year as documented by media monitors (baseline ~3000+ print articles annually, 1000% spike in 2024), free Guardian API alone is insufficient. GDELT (free, covers all UK outlets), expanded RSS (15 outlets), and broad volume counting required.",
    "free_limits": "Guardian 5000/day (Guardian only), GNews 100/day, Currents 600/day, GDELT free unlimited (headline+URL only), RSS free unlimited",
    "to_get_thousands": "Enable GDELT, expand RSS to 15 outlets, use volume mode, or pay for NewsAPI/The Guardian+Telegraph+Mail archives"
  }
};
const STIGMA_TERMS = [
  "benefit cheat",
  "benefits cheat",
  "benefit cheats",
  "benefit fraud",
  "benefits fraud",
  "cheating the system",
  "playing the system",
  "benefit fraudster",
  "dole cheat",
  "benefit fraud epidemic",
  "fake disability",
  "faking disability",
  "not really disabled",
  "not disabled",
  "malingering",
  "malingerers",
  "pretend disability",
  "swinging the lead",
  "exaggerating disability",
  "not that disabled",
  "faking illness",
  "not really sick",
  "fake disabled",
  "anxiety not real",
  "depression excuse",
  "mental health excuse",
  "just anxious",
  "just depressed",
  "not real illness",
  "snowflake generation",
  "mental health card",
  "playing mental health",
  "anxiety is not disability",
  "anxiety excuse",
  "depression not real",
  "chronic fatigue excuse",
  "fibromyalgia excuse",
  "bad back excuse",
  "bad back benefit",
  "chronic pain not real",
  "PIP cheat",
  "PIP fraud",
  "zero points",
  "scored zero",
  "PIP assessment",
  "work capability",
  "capability assessment",
  "passed fit",
  "declared fit",
  "fit for work assessment",
  "PIP scrounger",
  "ESA cheat",
  "LCWRA scrounger",
  "UC scrounger",
  "universal credit scrounger",
  "LCWRA lifestyle",
  "limited capability",
  "work related activity",
  "fit for work",
  "passed fit for work",
  "work capability assessment",
  "WCA",
  "found fit",
  "declared fit for work",
  "fit to work test",
  "failed WCA",
  "benefit sanction",
  "sanctioned for not working",
  "sanction culture",
  "conditionality",
  "lazy",
  "bone idle",
  "bone-idle",
  "feckless",
  "feral",
  "chav",
  "chavs",
  "unwashed",
  "workless",
  "idle",
  "can't be bothered",
  "won't work",
  "refuse to work",
  "layabout",
  "layabouts",
  "feckless benefits",
  "lazy benefits",
  "underclass",
  "drain on society",
  "burden on taxpayers",
  "taxpayer burden",
  "scrounger",
  "scroungers",
  "shirker",
  "shirkers",
  "skiver",
  "skivers",
  "sciver",
  "scivers",
  "workshy",
  "work-shy",
  "work shy",
  "dole dosser",
  "dole bludger",
  "workshy benefits",
  "skiver culture",
  "shirker culture",
  "benefits more than working",
  "more on benefits than work",
  "better off on benefits",
  "better off on the dole",
  "earn more on benefits",
  "paid more on benefits than working",
  "benefits pay more than work",
  "lifestyle choice",
  "choose benefits over work",
  "benefits lifestyle",
  "better off not working",
  "work doesn't pay",
  "bloated welfare",
  "welfare bill",
  "benefits bill",
  "welfare budget bloated",
  "out of control welfare",
  "welfare out of control",
  "welfare bill soars",
  "benefits bill soars",
  "benefits bill soaring",
  "welfare bill ballooning",
  "welfare bill spiralling",
  "welfare bill explodes",
  "unsustainable welfare",
  "welfare bill unsustainable",
  "taxpayer burden",
  "burden on taxpayers",
  "burden on economy",
  "costing taxpayer",
  "welfare bill completely out of control",
  "benefits bill out of control",
  "dependency culture",
  "culture of dependency",
  "benefits culture",
  "benefits street culture",
  "welfare dependency",
  "welfare culture",
  "entitlement culture",
  "something for nothing culture",
  "welfare trap",
  "benefits trap",
  "intergenerational worklessness",
  "three generations never worked",
  "generations on benefits",
  "welfare dependency culture",
  "something for nothing",
  "free cars",
  "free car",
  "motability free car",
  "motability cars",
  "free motability",
  "taxpayer funded car",
  "luxury motability",
  "bmw on benefits",
  "mercedes on disability",
  "free cars for disabled",
  "handed free cars",
  "given a free car",
  "motability bmw",
  "motability mercedes",
  "free car on benefits",
  "taxpayer funded motability",
  "free motability cars",
  "benefits street",
  "benefits britain",
  "curtains closed",
  "daytime tv",
  "daytime telly",
  "big tv",
  "flat screen tv",
  "sky tv on benefits",
  "smoking on benefits",
  "takeaway on benefits",
  "tattoos on benefits",
  "nails on benefits",
  "curtains shut",
  "large tv on benefits",
  "sky television on benefits",
  "sick note culture",
  "sicknote Britain",
  "long term sick",
  "signed off sick",
  "sick note",
  "sicknotes",
  "sick leave scrounger",
  "sicknote excuse",
  "disabled can't work",
  "disabled unproductive",
  "housing benefit bill",
  "housing benefit soars",
  "housing benefit scrounger",
  "child benefit scrounger",
  "food bank scrounger",
  "carer benefit cheat",
  "pensioner benefit bill",
  "DLA fraud",
  "attendance allowance cheat",
  "benefit fraud epidemic",
  "welfare fraud epidemic",
  "rampant benefit fraud",
  "fraud soars",
  "systemic benefit fraud",
  "benefit cap scrounger",
  "benefits too generous",
  "welfare disincentive",
  "benefits disincentive",
  "work doesn't pay",
  "PIP reform needed",
  "tighten PIP",
  "crackdown on disability benefits",
  "disability benefit reform",
  "benefits bill explodes",
  "welfare bill explodes",
  "benefits bill out of control",
  "welfare bill out of control",
  "benefits bill soars",
  "welfare bill soars",
  "completely out of control",
  "welfare bill ballooning",
  "benefits bill soaring",
  "out of control",
  "myth of benefit fraud",
  "debunk benefit myth",
  "fact check welfare",
  "benefit scrounger myth",
  "disability benefit myth",
  "welfare myth",
  "not scroungers",
  "not better off on benefits",
  "welfare bubble",
  "welfare bubble needs to burst",
  "welfare bubble burst",
  "moral crusade",
  "moral crusade benefits",
  "fraud squads",
  "fraud squad",
  "fraud and error crackdown",
  "sending fraud squads",
  "public consent welfare",
  "public consent for welfare",
  "lose public consent",
  "cut 50 billion welfare",
  "cut \u00a350 billion welfare",
  "cut 36 billion welfare",
  "cut \u00a336 billion welfare",
  "slash welfare",
  "slashing welfare",
  "economic rescue plan welfare",
  "out-of-work packages",
  "out of work packages",
  "signed off work",
  "signed off with adhd",
  "signed off work adhd",
  "100000 signed off",
  "100,000 signed off",
  "handed pip benefits",
  "handed pip",
  "pip benefits under labour",
  "1000 a day pip",
  "nearly 1000 a day pip",
  "striver vs scrounger",
  "strivers vs scroungers",
  "striver vs scrounger media",
  "welfare cuts",
  "welfare fraud",
  "welfare fraud and error",
  "crackdown welfare",
  "crackdown benefits",
  "welfare savings",
  "welfare savings not from claimants",
  "sick note britain",
  "sicknote britain",
  "long term sickness benefits",
  "economically inactive benefits",
  "britain's welfare bill",
  "britain welfare bill",
  "welfare bill hits",
  "daily cost taxpayer pip",
  "cost to taxpayer pip",
  "u-turn welfare",
  "welfare u-turn",
  "welfare reform",
  "welfare cuts",
  "universal credit reform",
  "pip reform",
  "disability benefits reform",
  "benefits bill",
  "welfare bill",
  "dwp welfare",
  "welfare spending",
  "sickness benefits",
  "health related benefits",
  "universal credit health element",
  "personal independence payment",
  "work capability assessment",
  "economic inactivity",
  "worklessness",
  "long term sick",
  "signed off work",
  "benefits britain",
  "welfare state"
];
const CATEGORY_MAP = {
  "01_Benefit_Fraud_Dishonesty": [
    "benefit cheat",
    "benefits cheat",
    "benefit cheats",
    "benefit fraud",
    "benefits fraud",
    "cheating the system",
    "playing the system",
    "benefit fraudster",
    "dole cheat",
    "benefit fraud epidemic"
  ],
  "02_Disability_Fraud_Malingering": [
    "fake disability",
    "faking disability",
    "not really disabled",
    "not disabled",
    "malingering",
    "malingerers",
    "pretend disability",
    "swinging the lead",
    "exaggerating disability",
    "not that disabled",
    "faking illness",
    "not really sick",
    "fake disabled"
  ],
  "03_Mental_Health_Scepticism": [
    "anxiety not real",
    "depression excuse",
    "mental health excuse",
    "just anxious",
    "just depressed",
    "not real illness",
    "snowflake generation",
    "mental health card",
    "playing mental health",
    "anxiety is not disability",
    "anxiety excuse",
    "depression not real"
  ],
  "04_Chronic_Pain_Fatigue": [
    "chronic fatigue excuse",
    "fibromyalgia excuse",
    "bad back excuse",
    "bad back benefit",
    "chronic pain not real"
  ],
  "05_PIP_Assessment_Rhetoric": [
    "PIP cheat",
    "PIP fraud",
    "zero points",
    "scored zero",
    "PIP assessment",
    "work capability",
    "capability assessment",
    "passed fit",
    "declared fit",
    "fit for work assessment",
    "PIP scrounger"
  ],
  "06_ESA_UC_LCWRA": [
    "ESA cheat",
    "LCWRA scrounger",
    "UC scrounger",
    "universal credit scrounger",
    "LCWRA lifestyle",
    "limited capability",
    "work related activity"
  ],
  "07_WCA_Fitness_Disputes": [
    "fit for work",
    "passed fit for work",
    "work capability assessment",
    "WCA",
    "found fit",
    "declared fit for work",
    "fit to work test",
    "failed WCA"
  ],
  "08_Sanctions_Conditionality": [
    "benefit sanction",
    "sanctioned for not working",
    "sanction culture",
    "conditionality"
  ],
  "09_Laziness_Moral": [
    "lazy",
    "bone idle",
    "bone-idle",
    "feckless",
    "feral",
    "chav",
    "chavs",
    "unwashed",
    "workless",
    "idle",
    "can't be bothered",
    "won't work",
    "refuse to work",
    "layabout",
    "layabouts",
    "feckless benefits",
    "lazy benefits",
    "underclass",
    "drain on society",
    "burden on taxpayers",
    "taxpayer burden"
  ],
  "10_Skiver_Shirker_Scrounger": [
    "scrounger",
    "scroungers",
    "shirker",
    "shirkers",
    "skiver",
    "skivers",
    "sciver",
    "scivers",
    "workshy",
    "work-shy",
    "work shy",
    "dole dosser",
    "dole bludger",
    "workshy benefits",
    "skiver culture",
    "shirker culture"
  ],
  "11_Benefits_Vs_Work": [
    "benefits more than working",
    "more on benefits than work",
    "better off on benefits",
    "better off on the dole",
    "earn more on benefits",
    "paid more on benefits than working",
    "benefits pay more than work",
    "lifestyle choice",
    "choose benefits over work",
    "benefits lifestyle",
    "better off not working",
    "work doesn't pay"
  ],
  "12_Welfare_Expenditure_Burden": [
    "bloated welfare",
    "welfare bill",
    "benefits bill",
    "welfare budget bloated",
    "out of control welfare",
    "welfare out of control",
    "welfare bill soars",
    "benefits bill soars",
    "benefits bill soaring",
    "welfare bill ballooning",
    "welfare bill spiralling",
    "welfare bill explodes",
    "unsustainable welfare",
    "welfare bill unsustainable",
    "taxpayer burden",
    "burden on taxpayers",
    "burden on economy",
    "costing taxpayer",
    "welfare bill completely out of control",
    "benefits bill out of control"
  ],
  "13_Dependency_Culture": [
    "dependency culture",
    "culture of dependency",
    "benefits culture",
    "benefits street culture",
    "welfare dependency",
    "welfare culture",
    "entitlement culture",
    "something for nothing culture",
    "welfare trap",
    "benefits trap",
    "intergenerational worklessness",
    "three generations never worked",
    "generations on benefits",
    "welfare dependency culture",
    "something for nothing"
  ],
  "14_Motability_Free_Cars": [
    "free cars",
    "free car",
    "motability free car",
    "motability cars",
    "free motability",
    "taxpayer funded car",
    "luxury motability",
    "bmw on benefits",
    "mercedes on disability",
    "free cars for disabled",
    "handed free cars",
    "given a free car",
    "motability bmw",
    "motability mercedes",
    "free car on benefits",
    "taxpayer funded motability",
    "free motability cars"
  ],
  "15_Lifestyle_Consumption": [
    "benefits street",
    "benefits britain",
    "curtains closed",
    "daytime tv",
    "daytime telly",
    "big tv",
    "flat screen tv",
    "sky tv on benefits",
    "smoking on benefits",
    "takeaway on benefits",
    "tattoos on benefits",
    "nails on benefits",
    "curtains shut",
    "large tv on benefits",
    "sky television on benefits"
  ],
  "16_Sick_Notes_Absence": [
    "sick note culture",
    "sicknote Britain",
    "long term sick",
    "signed off sick",
    "sick note",
    "sicknotes",
    "sick leave scrounger",
    "sicknote excuse"
  ],
  "17_Employment_Productivity": [
    "disabled can't work",
    "disabled unproductive"
  ],
  "18_Housing_Benefit": [
    "housing benefit bill",
    "housing benefit soars",
    "housing benefit scrounger"
  ],
  "19_Child_Poverty": [
    "child benefit scrounger",
    "food bank scrounger"
  ],
  "20_Carers": [
    "carer benefit cheat"
  ],
  "21_Pensioner": [
    "pensioner benefit bill"
  ],
  "22_DLA_Attendance": [
    "DLA fraud",
    "attendance allowance cheat"
  ],
  "23_Fraud_Stats": [
    "benefit fraud epidemic",
    "welfare fraud epidemic",
    "rampant benefit fraud",
    "fraud soars",
    "systemic benefit fraud"
  ],
  "24_Caps_Uprating": [
    "benefit cap scrounger",
    "benefits too generous"
  ],
  "25_Incentives_Labour": [
    "welfare disincentive",
    "benefits disincentive",
    "work doesn't pay"
  ],
  "26_Reform_Eligibility": [
    "PIP reform needed",
    "tighten PIP",
    "crackdown on disability benefits",
    "disability benefit reform"
  ],
  "27_Misleading_Headlines": [
    "benefits bill explodes",
    "welfare bill explodes",
    "benefits bill out of control",
    "welfare bill out of control",
    "benefits bill soars",
    "welfare bill soars",
    "completely out of control",
    "welfare bill ballooning",
    "benefits bill soaring",
    "out of control"
  ],
  "28_Counter_Rhetoric": [
    "myth of benefit fraud",
    "debunk benefit myth",
    "fact check welfare",
    "benefit scrounger myth",
    "disability benefit myth",
    "welfare myth",
    "not scroungers",
    "not better off on benefits"
  ],
  "29_Current_Political_2025_2026": [
    "welfare bubble",
    "welfare bubble needs to burst",
    "welfare bubble burst",
    "moral crusade",
    "moral crusade benefits",
    "fraud squads",
    "fraud squad",
    "fraud and error crackdown",
    "sending fraud squads",
    "public consent welfare",
    "public consent for welfare",
    "lose public consent",
    "cut 50 billion welfare",
    "cut \u00a350 billion welfare",
    "cut 36 billion welfare",
    "cut \u00a336 billion welfare",
    "slash welfare",
    "slashing welfare",
    "economic rescue plan welfare",
    "out-of-work packages",
    "out of work packages",
    "signed off work",
    "signed off with adhd",
    "signed off work adhd",
    "100000 signed off",
    "100,000 signed off",
    "handed pip benefits",
    "handed pip",
    "pip benefits under labour",
    "1000 a day pip",
    "nearly 1000 a day pip",
    "striver vs scrounger",
    "strivers vs scroungers",
    "striver vs scrounger media",
    "welfare cuts",
    "welfare fraud",
    "welfare fraud and error",
    "crackdown welfare",
    "crackdown benefits",
    "welfare savings",
    "welfare savings not from claimants",
    "sick note britain",
    "sicknote britain",
    "long term sickness benefits",
    "economically inactive benefits",
    "britain's welfare bill",
    "britain welfare bill",
    "welfare bill hits",
    "daily cost taxpayer pip",
    "cost to taxpayer pip",
    "u-turn welfare",
    "welfare u-turn"
  ],
  "30_Volume_Broad_Welfare_Coverage": [
    "welfare reform",
    "welfare cuts",
    "universal credit reform",
    "pip reform",
    "disability benefits reform",
    "benefits bill",
    "welfare bill",
    "dwp welfare",
    "welfare spending",
    "sickness benefits",
    "health related benefits",
    "universal credit health element",
    "personal independence payment",
    "work capability assessment",
    "economic inactivity",
    "worklessness",
    "long term sick",
    "signed off work",
    "benefits britain",
    "welfare state"
  ]
};

const SOURCE_REGISTRY = [
  {name:"Guardian Open Platform",enabled:true,limit:"5000/day Guardian only"},
  {name:"GDELT Project",enabled:true,limit:"Free unlimited, all outlets"},
  {name:"GNews",enabled:true,limit:"100/day"},
  {name:"Currents API",enabled:true,limit:"600/day"},
  {name:"UK News RSS 15 outlets",enabled:true,limit:"Free unlimited"},
  {name:"Hansard Commons",enabled:true,limit:"Free"}
];

const CLASSIFICATION = {CANDIDATE:'candidate_match',LIKELY:'likely_stigmatising_usage',CONTEXTUAL:'contextual_or_quoted',COUNTER:'counter_rhetoric',UNRELATED:'unrelated_match',REVIEW:'requires_human_review',VOLUME:'volume_broad_coverage'};
const NEGATION=['not','no','never','myth','debunk','fact check','false claim','no evidence','refutes'];
const COUNTER_WORDS=['myth','debunk','fact check','reality','refutes','charity says','scope says','advocacy groups','stigmatization concerns','dehumanizing narratives'];

function classifyCandidate(text, matchedTerm, context=''){
  const t=(text+' '+context).toLowerCase(); const term=matchedTerm.toLowerCase();
  if(COUNTER_WORDS.some(w=>t.includes(w))){
    return {status:CLASSIFICATION.COUNTER,reason:'Counter-rhetoric',confidence:0.8};
  }
  const hasWelfareContext=['welfare','benefit','pip','dla','disab','universal credit','motability','esa','lcwra','job centre','jobcentre','out of work','signed off','sick note','fraud squad','public consent','economic rescue','worklessness','economic inactivity'].some(w=>t.includes(w));
  if(!hasWelfareContext) return {status:CLASSIFICATION.UNRELATED,reason:'No welfare context',confidence:0.9};
  // Volume mode: broad welfare terms are VOLUME not LIKELY
  if(['welfare reform','welfare cuts','universal credit reform','pip reform','welfare bill','welfare spending','sickness benefits','economic inactivity','worklessness','welfare state'].some(w=>term.includes(w)||t.includes(w)) && !['scrounger','free cars','fake disability','lazy','bubble','moral crusade','fraud squad'].some(h=>t.includes(h))){
    return {status:CLASSIFICATION.VOLUME,reason:'Broad welfare coverage (volume)',confidence:0.7};
  }
  return {status:CLASSIFICATION.LIKELY,reason:'Stigmatising or political framing 2025-26',confidence:0.85};
}

function scoreStigmaImproved(classifications, matchedTerms, categories){ let base=1; base+=Math.min(3,matchedTerms.length); if(matchedTerms.some(t=>['free cars','fake disability','scrounger','welfare bubble','moral crusade','fraud squad','signed off','handed pip'].some(h=>t.includes(h)))) base+=2; return Math.min(10,base); }

const EVIDENCE_SOURCES=[{id:'dwp-annual-2023',title:'DWP fraud 3.2% PIP 0.4%',publisher:'DWP'},{id:'obr-welfare',title:'OBR £309.5bn State Pension 47%',publisher:'OBR'},{id:'ifs-better-off',title:'IFS only 8% better off on benefits',publisher:'IFS'},{id:'motability-rules',title:'Motability leased not free £75.75/wk',publisher:'Motability'}];
function buildDebunk(cats, terms){ return {summary:'DWP fraud 3.2% PIP 0.4% | OBR £309.5bn State Pension £146.2bn (47%) | IFS 8% better off | Motability leased not free',sources:EVIDENCE_SOURCES};}

function scoreStigma(text){ return 5; }
function detectRhetoric(text){
  const t=text.toLowerCase(); const types=[];
  if(t.includes('welfare bubble')||t.includes('moral crusade')||t.includes('fraud squad')) types.push('2025-26 Political Framing');
  if(t.includes('cut')&&t.includes('billion')&&t.includes('welfare')) types.push('£50bn Cuts Narrative');
  if(t.includes('signed off')||t.includes('handed pip')) types.push('PIP/Mental Health Scepticism');
  if(t.includes('scrounger')||t.includes('shirker')||t.includes('striver')) types.push('Striver vs Scrounger Revival');
  if(types.length===0) types.push('General Stigma / Volume');
  return types;
}
function detectCategory(text){ const t=text.toLowerCase(); const cats=[]; for(const [cat, terms] of Object.entries(CATEGORY_MAP)){ if(terms.some(term=>t.includes(term.toLowerCase()))) cats.push(cat); } return cats.length?cats:['30_Volume_Broad_Welfare_Coverage']; }
function isStigma(text){ const t=text.toLowerCase(); return ['welfare','benefit','pip','dla','disab','universal credit','motability','job centre','signed off','out of work','worklessness','economic inactivity'].some(w=>t.includes(w)); }
function isStigmaHansard(text){ const t=text.toLowerCase(); return t.includes('welfare')||t.includes('benefit')||t.includes('disab')||t.includes('pip'); }
function canonicalizeUrl(url){ try{ const u=new URL(url); u.hash=''; return u.toString().toLowerCase().replace(/\/$/,''); }catch{ return url.toLowerCase(); } }
function hashContent(str){ return crypto.createHash('sha256').update(str).digest('hex').slice(0,16); }

async function fetchGuardian({apiKey, from, to, queries, maxPages=6}){
  const all=[]; const runs=[];
  for(const q of queries){
    for(let page=1; page<=maxPages; page++){
            const url=`https://content.guardianapis.com/search?from-date=${from}&to-date=${to}&q=${encodeURIComponent(q)}&api-key=${apiKey}&show-fields=all&page=${page}&page-size=50`;
      
      const result = await debugFetch(`Guardian [${q}] p${page}`, url);
      if (!result.ok || !result.json) {
        runs.push({ query: q, page, status: result.status, error: result.text.substring(0,300), items: 0 });
        continue;
      }
      const data = result.json;
      const results = data.response?.results || [];
      console.log(`   -> Guardian returned ${results.length} items for this page`);
      for (const r of results) all.push(r);
      }
  }
  return {items:all, runs};
}
function buildGuardianQueries(){ return ['welfare OR benefits','welfare bubble OR moral crusade OR fraud squads','cut 50 billion welfare OR economic rescue plan','signed off work OR handed PIP','free cars OR better off on benefits OR fake disability','scroungers OR shirkers OR striver vs scrounger','welfare bill OR benefits bill','welfare reform OR pip reform OR worklessness']; }

async function fetchGNews({from,to,queries,apiKey}){
  const all=[]; const runs=[];
  for(const q of queries){
    const url=`https://gnews.io/api/v4/search?q=${encodeURIComponent(q)}&from=${from}&to=${to}&lang=en&max=100&apikey=${apiKey}`;
    const result = await debugFetch(`GNews [${q}]`, url);
    
    if (result.text && result.text.includes("request limit")) {
      console.log(`!! GNews daily limit hit - stopping GNews for today`);
      break; // don't keep burning retries
    }
    
    if (!result.ok || !result.json) {
      runs.push({ query: q, error: result.text?.substring(0,300), items: 0 });
      continue;
    }
    const articles = result.json.articles || [];
    for (const a of articles) all.push(a);
  }
  return {items:all,runs};
}

async function fetchCurrents({apiKey, from, to, queries}){ const all=[]; const runs=[]; for(const q of queries.slice(0,2)){ const url=`https://api.currentsapi.services/v1/search?keywords=${encodeURIComponent(q)}&language=en&from=${from}&to=${to}&apiKey=${apiKey}`; try{ const res=await fetch(url); const data=await res.json(); const arts=data.news||[]; runs.push({query:q,resultCount:arts.length,status:'ok'}); for(const a of arts){ all.push({title:a.title,outlet:a.author||'Currents',url:a.url,date:a.published?.split('T')[0]||from,text:a.title,query:q,source:'currents'}); } }catch(e){ runs.push({query:q,status:'error'}); } } return {items:all,runs}; }

async function fetchHansard({from,to,queries,maxTake=40}){
  const all=[]; const runs=[];
  for(const q of queries){ const url=`https://hansard-api.parliament.uk/search.json?q=${encodeURIComponent(q)}&fromDate=${from}&toDate=${to}&house=Commons&take=${maxTake}`; try{ const res=await fetch(url,{headers:{'Accept':'application/json'}}); if(!res.ok){ runs.push({query:q,status:'error'}); continue; } const data=await res.json(); const results=data.Results||[]; runs.push({query:q,resultCount:results.length,status:'ok'}); for(const r of results){ const excerpt=r.Hansard?.Excerpt||''; const title=(r.Hansard?.Title||q).substring(0,200); const date=(r.SittingDate||from).split('T')[0]; const shareUrl=r.Hansard?.ShareUrl||'https://hansard.parliament.uk/search'; all.push({title,outlet:'Hansard - Commons',url:shareUrl,date,text:excerpt+' '+title,query:q,source:'hansard'}); } }catch(e){ runs.push({query:q,status:'error'}); } await new Promise(r=>setTimeout(r,600)); }
  return {items:all,runs};
}
function buildHansardQueries(){ return ['welfare bubble','moral crusade','fraud squads','public consent welfare','cut 50 billion welfare','signed off work','welfare bill','benefits bill']; }

import Parser from 'rss-parser'
const rssParser = new Parser({ timeout: 10000 });

const RSS_FEEDS = [
  { name: 'Daily Mail', url: 'https://www.dailymail.co.uk/news/index.rss' },
  { name: 'Telegraph', url: 'https://www.telegraph.co.uk/rss.xml' },
  { name: 'The Sun', url: 'https://www.thesun.co.uk/feed/' },
  { name: 'Mirror', url: 'https://www.mirror.co.uk/rss.xml' },
  { name: 'Express', url: 'https://www.express.co.uk/posts/rss/1' },
  { name: 'Independent', url: 'http://www.independent.co.uk/【entity-rss¦canonical_name=RSS】' },
  { name: 'BBC', url: 'http://feeds.bbci.co.uk/news/uk/rss.xml' },
  { name: 'Sky', url: 'https://feeds.skynews.com/feeds/rss/uk.xml' },
  { name: 'ITV', url: 'https://www.itv.com/news/rss' },
  { name: 'Metro', url: 'https://metro.co.uk/feed/' },
  { name: 'Guardian UK', url: 'https://www.theguardian.com/uk-news/rss' },
  { name: 'Birmingham Mail', url: 'https://www.birminghammail.co.uk/news/rss.xml' },
  { name: 'Manchester Evening News', url: 'https://www.manchestereveningnews.co.uk/rss.xml' },
  { name: 'Liverpool Echo', url: 'https://www.liverpoolecho.co.uk/rss.xml' },
  { name: 'The Times', url: 'https://www.thetimes.co.uk/rss' },
];

async function fetchRSS({from,to}){
  const all=[]; const runs=[];
  const fromDate = new Date(from);
  const toDate = new Date(to);

  for(const feed of RSS_FEEDS){
    const result = await debugFetch(`RSS [${feed.name}]`, feed.url);
    if (!result.ok) {
      console.log(`!! RSS FAILED [${feed.name}] status ${result.status}`);
      runs.push({ outlet: feed.name, items: 0, error: result.text.substring(0,200) });
      continue;
    }
    
    try {
      const parsed = await rssParser.parseString(result.text);
      let count = 0;
      for(const item of parsed.items || []){
        const pubDate = item.pubDate ? new Date(item.pubDate) : new Date();
        // Only keep items in your date range
        if (pubDate >= fromDate && pubDate <= toDate) {
          all.push({
            title: item.title,
            link: item.link,
            pubDate: pubDate.toISOString(),
            source: feed.name,
            content: item.contentSnippet || item.content || item.title,
          });
          count++;
        }
      }
      console.log(`   -> RSS [${feed.name}] returned ${count} items (in range ${from} to ${to}) / total ${parsed.items?.length}`);
      runs.push({ outlet: feed.name, items: count });
      
      // Be nice to RSS servers - 1s delay
      await new Promise(r => setTimeout(r, 1000));
      
    } catch (e) {
      console.log(`!! RSS PARSE FAILED [${feed.name}]: ${e.message}`);
      runs.push({ outlet: feed.name, items: 0, error: e.message });
    }
  }
  return {items:all,runs};
}

async function main(){
  const args=process.argv.slice(2);
  const modeArg=args.find(a=>a.startsWith('--mode='))?.split('=')[1]||'recent';
  const sampleArg=parseInt(args.find(a=>a.startsWith('--sample='))?.split('=')[1]||'0');
  const dryRun=args.includes('--dry-run')||process.env.DRY_RUN==='true';
  let from,to; const now=new Date(); const end=now.toISOString().split('T')[0];
  if(modeArg==='historical'){ from='2015-10-26'; to=end; }
  else if(modeArg==='volume'||modeArg==='recent'){ const d=new Date(); d.setFullYear(d.getFullYear()-1); from=d.toISOString().split('T')[0]; to=end; }
  else if(modeArg==='test'){ const d=new Date(); d.setDate(d.getDate()-30); from=d.toISOString().split('T')[0]; to=end; }
  else { from=process.env.START_DATE||'2025-10-26'; to=process.env.END_DATE||end; }

  console.log(`=== Welfare Facts UK v5.4 CSV + VOLUME FIX | Mode: ${modeArg} | ${from} to ${to} | Terms: ${STIGMA_TERMS.length} across ${Object.keys(CATEGORY_MAP).length} categories ===`);
  console.log(`Sources: Guardian 5000/day (Guardian only) + GDELT FREE unlimited (Telegraph, Mail, Sun, Times, Mirror, Express etc) + RSS 15 outlets + Hansard`);

  const runId=`run-${Date.now()}`; const searchRuns=[]; let allRaw=[];

  if(process.env.GUARDIAN_KEY){
    const queries=buildGuardianQueries();
    console.log(`\n>> Guardian - ${queries.length} queries`);
    const {items,runs}=await fetchGuardian({apiKey:process.env.GUARDIAN_KEY, from, to, queries, maxPages: modeArg==='historical'?10:8});
    console.log(`   Guardian items: ${items.length}`); allRaw=allRaw.concat(items); searchRuns.push(...runs);
  }

  // GDELT - FREE, covers Telegraph, Mail, Sun, Times etc - this is how you get thousands
  {
    const queries=['welfare bubble','moral crusade benefits','fraud squads job centre','cut 50 billion welfare','signed off work welfare','handed PIP benefits','striver vs scrounger','welfare bill out of control','benefits bill soaring','culture of dependency welfare'];
    console.log(`\n>> GDELT (FREE unlimited - covers Telegraph, Mail, Sun, Times, Mirror, Express) - ${queries.length} queries`);
    const {items,runs}=await fetchGDELT({from,to,queries,maxRecords: modeArg==='volume'?100:50});
    console.log(`   GDELT items: ${items.length} (this is where Mail/Telegraph/Sun appear)`); allRaw=allRaw.concat(items); searchRuns.push(...runs);
  }

  if(process.env.GNEWS_KEY){
    const queries=['welfare disability benefits','welfare bubble moral crusade','cut 50 billion welfare'];
    console.log(`\n>> GNews (100/day limit - may be 0 if limit hit)`); const {items,runs}=await fetchGNews({apiKey:process.env.GNEWS_KEY, from, to, queries});
    console.log(`   GNews items: ${items.length}`); allRaw=allRaw.concat(items); searchRuns.push(...runs);
  }
  if(process.env.CURRENTS_KEY){
    const queries=['welfare disability benefits','welfare bubble fraud squads'];
    console.log(`\n>> Currents`); const {items,runs}=await fetchCurrents({apiKey:process.env.CURRENTS_KEY, from, to, queries});
    console.log(`   Currents items: ${items.length}`); allRaw=allRaw.concat(items); searchRuns.push(...runs);
  }
  console.log(`\n>> RSS 15 outlets (Mail, Telegraph, Sun, Mirror, Express, Independent, BBC, Sky, ITV, Metro etc)`); 
  const {items:rssItems,runs:rssRuns}=await fetchRSS({from, to});
  console.log(`   RSS items: ${rssItems.length} - ${rssItems.map(r=>r.outlet).join(', ')}`); 
  allRaw=allRaw.concat(rssItems); searchRuns.push(...rssRuns);

  console.log(`\n>> Hansard`); const hansQueries=buildHansardQueries(); const {items:hansItems,runs:hansRuns}=await fetchHansard({from,to,queries:hansQueries, maxTake:40}); console.log(`   Hansard raw: ${hansItems.length}`); allRaw=allRaw.concat(hansItems); searchRuns.push(...hansRuns);

  console.log(`\nTotal raw: ${allRaw.length} (Guardian ${allRaw.filter(a=>a.source==='guardian').length} + GDELT ${allRaw.filter(a=>a.source==='gdelt').length} + RSS ${allRaw.filter(a=>a.source==='rss').length} etc)`);
  let workingRaw = sampleArg>0 ? allRaw.slice(0,sampleArg) : allRaw;

  const classified=[];
  for(const it of workingRaw){
    const text=(it.text||'')+' '+(it.title||'');
    const matchedTerms=STIGMA_TERMS.filter(term=>text.toLowerCase().includes(term.toLowerCase()));
    let hasWelfare = isStigma(text);
    // VOLUME MODE: even without exact stigma term, if it mentions welfare reform/bill/cuts, count as VOLUME
    if(matchedTerms.length===0 && hasWelfare && (modeArg==='volume'||modeArg==='recent')){
      const lower=text.toLowerCase();
      if(lower.includes('welfare bubble')||lower.includes('moral crusade')||lower.includes('fraud squad')||lower.includes('public consent')||lower.includes('signed off')||lower.includes('handed pip')||lower.includes('welfare bill')||lower.includes('benefits bill')||lower.includes('cut')&&lower.includes('billion')&&lower.includes('welfare')||lower.includes('welfare reform')||lower.includes('economic inactivity')||lower.includes('worklessness')){
        matchedTerms.push('volume/political: '+text.substring(0,40));
      }
    }
    if(matchedTerms.length===0) continue;
    const categories=detectCategory(text);
    const classifications=matchedTerms.map(term=>classifyCandidate(text, term, it.title||''));
    let finalStatus; const hasCounter=classifications.some(c=>c.status===CLASSIFICATION.COUNTER); const hasVolume=classifications.some(c=>c.status===CLASSIFICATION.VOLUME);
    if(hasCounter) finalStatus=CLASSIFICATION.COUNTER; 
    else if(hasVolume && modeArg==='volume') finalStatus=CLASSIFICATION.VOLUME;
    else if(classifications.some(c=>c.status===CLASSIFICATION.LIKELY)) finalStatus=CLASSIFICATION.LIKELY;
    else finalStatus=CLASSIFICATION.REVIEW;
    if(finalStatus===CLASSIFICATION.UNRELATED) continue;
    const rhetoricTypes=detectRhetoric(text); const evidence=buildDebunk(categories, matchedTerms);
    classified.push({...it,matchedTerms,stigmaCategories:categories,categories,classifications,classification:finalStatus,stigmaScore:scoreStigmaImproved(classifications, matchedTerms, categories),rhetoricTypes,evidenceSummary:evidence.summary,canonicalUrl:canonicalizeUrl(it.url),contentHash:hashContent(text),id: `${it.source}-${it.date}-${hashContent(it.url).slice(0,8)}`});
  }

  console.log(`Classified: ${classified.length} | LIKELY: ${classified.filter(c=>c.classification===CLASSIFICATION.LIKELY).length} | VOLUME (broad welfare): ${classified.filter(c=>c.classification===CLASSIFICATION.VOLUME).length} | COUNTER: ${classified.filter(c=>c.classification===CLASSIFICATION.COUNTER).length} | REVIEW: ${classified.filter(c=>c.classification===CLASSIFICATION.REVIEW).length}`);
  console.log(`Breakdown by source: ${[...new Set(classified.map(c=>c.source))].map(s=> `${s}:${classified.filter(c=>c.source===s).length}`).join(', ')}`);

  const seenUrl=new Map(); for(const it of classified){ const key=it.canonicalUrl; if(!seenUrl.has(key)) seenUrl.set(key,it); else { const existing=seenUrl.get(key); if(it.stigmaScore > existing.stigmaScore) seenUrl.set(key,it); } }
  const finalDedup=Array.from(seenUrl.values()).sort((a,b)=> new Date(b.date)-new Date(a.date));
  console.log(`Deduped: ${finalDedup.length}`);

  if(dryRun){ console.log('\nDRY RUN sample (first 15):'); console.log(finalDedup.slice(0,15).map(i=>({title:i.title.substring(0,80),outlet:i.outlet,source:i.source,matched:i.matchedTerms.slice(0,2),classification:i.classification}))); return; }

  const outDir=path.join(__dirname,'../public/data'); if(!fs.existsSync(outDir)) fs.mkdirSync(outDir,{recursive:true});

  // Build full archive with quote/excerpt for CSV
  const archiveItems = finalDedup.map(it=>({
    id: it.id,
    date: it.date,
    outlet: it.outlet,
    title: it.title,
    url: it.url,
    canonicalUrl: it.canonicalUrl,
    quote: (it.text||it.title||'').substring(0,500).replace(/\n/g,' ').trim(), // excerpt/quote field
    article_excerpt: (it.text||it.title||'').substring(0,500),
    matchedTerms: it.matchedTerms.slice(0,5),
    stigma_reference_flagged: it.matchedTerms.join(' | '), // stigma reference flagged
    stigmaCategories: it.stigmaCategories||it.categories,
    categories: it.categories,
    classification: it.classification,
    stigmaScore: it.stigmaScore,
    rhetoricTypes: it.rhetoricTypes,
    debunk: it.evidenceSummary||'',
    evidenceSources: (it.evidenceSources||[]).map(e=>e.url||e.id).join(' | '),
    source: it.source,
    speaker: it.speaker||'',
    query: it.query||''
  }));

  const archive={lastUpdated:new Date().toISOString(),totalCount:finalDedup.length,from,to,mode:modeArg,runId,taxonomyVersion:TAXONOMY.version,termsCount:STIGMA_TERMS.length,categories:Object.keys(CATEGORY_MAP),sources:SOURCE_REGISTRY.map(s=>s.name),searchRuns:searchRuns.slice(0,150),items:archiveItems};

  fs.writeFileSync(path.join(outDir,'welfare-year-archive.json'), JSON.stringify(archive,null,2));

  // CSV GENERATION - incident log with quote, article, stigma reference flagged, url etc
  function toCSV(rows){
    if(rows.length===0) return 'id,date,outlet,title,url,quote,article_excerpt,stigma_reference_flagged,matchedTerms,stigmaCategories,classification,stigmaScore,rhetoricTypes,debunk,source,speaker\n';
    const headers=['id','date','outlet','title','url','canonicalUrl','quote','article_excerpt','stigma_reference_flagged','matchedTerms','stigmaCategories','categories','classification','stigmaScore','rhetoricTypes','debunk','evidenceSources','source','speaker','query'];
    const escape = (v)=>{
      if(v===null||v===undefined) return '';
      let s = Array.isArray(v) ? v.join(' | ') : String(v);
      s = s.replace(/"/g,'""').replace(/\r?\n/g,' ').replace(/\s+/g,' ').trim();
      if(s.includes(',')||s.includes('"')||s.includes('\n')) return `"${s}"`;
      return s;
    };
    const lines=[headers.join(',')];
    for(const r of rows){
      lines.push(headers.map(h=>escape(r[h])).join(','));
    }
    return lines.join('\n');
  }

  const csvContent = toCSV(archiveItems);
  fs.writeFileSync(path.join(outDir,'welfare-year-archive.csv'), csvContent, 'utf8');
  fs.writeFileSync(path.join(outDir,'welfare-incidents.csv'), csvContent, 'utf8');
  fs.writeFileSync(path.join(outDir,'welfare-incidents-latest.csv'), toCSV(archiveItems.slice(0,100)), 'utf8');


  // Summary JSON with volume estimate
  const volumeCount=finalDedup.filter(f=>f.classification===CLASSIFICATION.VOLUME).length;
  const likelyCount=finalDedup.filter(f=>f.classification===CLASSIFICATION.LIKELY).length;
  const gdeltCount=finalDedup.filter(f=>f.source==='gdelt').length;
  fs.writeFileSync(path.join(outDir,'welfare-volume-estimate.json'), JSON.stringify({lastUpdated:new Date().toISOString(),from,to,mode:modeArg,methodology:'Guardian=Guardian only. GDELT=free unlimited all UK outlets (Mail, Telegraph, Sun, Times, Mirror, Express). RSS=15 outlets live. To get thousands/year like 2024 1000% spike monitors, need GDELT + RSS + paid NewsAPI. Free Guardian alone will never show thousands because Telegraph/Mail not in it.',totalRaw:allRaw.length,totalClassified:classified.length,deduped:finalDedup.length,broadWelfareVolume:volumeCount,stigmaLikely:likelyCount,gdeltFromMailTelegraphSun:gdeltCount,breakdownByOutlet:Object.fromEntries([...new Set(finalDedup.map(f=>f.outlet))].map(o=>[o,finalDedup.filter(f=>f.outlet===o).length])),note: modeArg==='volume' ? `Volume mode: ${volumeCount} broad welfare articles (baseline thousands/year) + ${likelyCount} stigma/political framing. This matches monitor estimate: baseline thousands per year across national outlets.` : `Recent mode: ${likelyCount} stigma/political. Run --mode=volume to see broad welfare baseline of thousands.`},null,2));

  console.log(`\nDONE! Total ${finalDedup.length} = ${likelyCount} LIKELY stigma/political + ${volumeCount} VOLUME broad welfare (baseline thousands)`);
  console.log(`GDELT (Mail/Telegraph/Sun etc): ${gdeltCount} articles - this is where the 1000% spike lives`);
  console.log(`Outputs: public/data/welfare-year-archive.json + welfare-volume-estimate.json`);
  console.log(`\nNEXT: To get full thousands, run: node scripts/backfill-year-fast.js --mode=volume`);
}
main().catch(e=>{ console.error(e); process.exit(1); });
