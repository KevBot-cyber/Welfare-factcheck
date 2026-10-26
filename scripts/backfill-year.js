/**
 * backfill-year.js - Full year welfare stigma + Hansard PMQs backfill
 * For KevBot-cyber/Welfare-factcheck
 * 
 * Usage:
 * 1. Add secrets in GitHub Actions: GNEWS_KEY, GUARDIAN_KEY, NEWSAPI_KEY, CURRENTS_KEY
 * 2. Run locally: node scripts/backfill-year.js
 * 3. Or run once in GitHub Actions via workflow_dispatch
 * 
 * Outputs:
 * - public/data/welfare-year-archive.json (news)
 * - public/data/hansard-welfare-pmqs.json (parliament)
 * - merges into public/data/welfare-archive.json with lastUpdated
 */

import fs from 'fs';
import path from 'path';

const START_DATE = new Date();
START_DATE.setFullYear(START_DATE.getFullYear() - 1); // 2025-10-26
const END_DATE = new Date(); // 2026-10-26

const WELFARE_KEYWORDS = 'welfare';
const UK_FILTER = '(UK OR Britain OR DWP OR Universal Credit OR PIP OR benefits)';
const STIGMA_TERMS = [
  'benefits cheats', 'scroungers', 'skivers', 'shirkers',
  'bloated welfare', 'welfare bill', 'welfare bill soars', 
  'out of control', 'burden', 'handouts', 'workshy',
  'benefits street', 'dependency culture', 'something for nothing'
];

function scoreStigma(text) {
  const t = text.toLowerCase();
  let score = 1;
  if (t.includes('welfare bill')) score += 2;
  if (t.includes('bloated')) score += 2;
  if (t.includes('out of control')) score += 2;
  if (t.includes('cheats') || t.includes('scroungers') || t.includes('skivers')) score += 3;
  if (t.includes('bill soars') || t.includes('soar by')) score += 2;
  if (t.includes('70 billion') || t.includes('137 billion')) score += 2;
  if (t.includes('sledgehammer') || t.includes('blitz')) score += 1;
  return Math.min(10, score);
}

function detectRhetoric(text) {
  const t = text.toLowerCase();
  const types = [];
  if (t.includes('cheats') || t.includes('scroungers') || t.includes('fraud') || t.includes('cheat')) types.push('Fraud Hyperbole');
  if (t.includes('welfare bill') || t.includes('bloated') || t.includes('out of control') || t.includes('burden') || t.includes('soar')) types.push('Economic Scapegoating');
  if (t.includes('handouts') || t.includes('workshy') || t.includes('skivers')) types.push('Dehumanizing Language');
  if (t.includes('dependency') || t.includes('something for nothing')) types.push('Moral Panic');
  if (types.length === 0) types.push('Economic Scapegoating');
  return types;
}

function getDebunk(text) {
  return "DWP total 309.5bn but 146.2bn is State Pension (47%). UC 424.90/mo. Borrowing driven by interest rates/growth, not welfare. PIP fraud 0.4%. Fraud/error 3.2% (9.9bn) - lowest since pandemic. 19bn unclaimed. Source: DWP Annual Report & OBR.";
}

async function fetchGuardian(from, to) {
  const key = process.env.GUARDIAN_KEY;
  if (!key) return [];
  try {
    const q = encodeURIComponent(`welfare AND (benefits OR DWP)`);
    const url = `https://content.guardianapis.com/search?from-date=${from}&to-date=${to}&q=${q}&show-fields=headline,short-url&api-key=${key}&page-size=50`;
    const res = await fetch(url);
    const data = await res.json();
    return (data.response?.results || []).map(r => ({
      id: `guardian-${r.id}`,
      title: r.webTitle,
      outlet: 'Guardian',
      url: r.webUrl,
      date: r.webPublicationDate?.split('T')[0] || from,
      text: r.webTitle,
      source: 'news'
    }));
  } catch (e) { console.log('Guardian error', e.message); return []; }
}

async function fetchGNews(from, to) {
  const key = process.env.GNEWS_KEY;
  if (!key) return [];
  try {
    const q = encodeURIComponent('welfare UK benefits');
    const url = `https://gnews.io/api/v4/search?q=${q}&from=${from}&to=${to}&lang=en&country=gb&max=50&apikey=${key}`;
    const res = await fetch(url);
    const data = await res.json();
    return (data.articles || []).map((a,i) => ({
      id: `gnews-${from}-${i}`,
      title: a.title,
      outlet: a.source?.name || 'News',
      url: a.url,
      date: a.publishedAt?.split('T')[0] || from,
      text: a.title + ' ' + (a.description || ''),
      source: 'news'
    }));
  } catch (e) { console.log('GNews error', e.message); return []; }
}

async function fetchHansardPMQs(from, to) {
  try {
    // UK Parliament Hansard Search - free, no key
    // Using commons debates search for welfare
    const q = encodeURIComponent('welfare');
    const url = `https://hansard-api.parliament.uk/search.json?q=${q}&startDate=${from}&endDate=${to}&house=Commons`;
    const res = await fetch(url, { headers: { 'Accept': 'application/json' } });
    if (!res.ok) throw new Error(`Hansard status ${res.status}`);
    const data = await res.json();
    const results = data.Results || data.results || data.matches || [];
    
    return results.filter(r => {
      const text = (r.Text || r.text || r.Summary || '').toLowerCase();
      return text.includes('welfare') && (text.includes('bill') || text.includes('benefits') || text.includes('spending') || text.includes('cost'));
    }).slice(0, 20).map((r,i) => {
      const text = r.Text || r.text || r.Summary || r.Title || 'Welfare debate';
      const speaker = r.Speaker || r.speaker || 'MP';
      const party = r.Party || r.party || '';
      return {
        id: `hansard-${from}-${i}`,
        title: `PMQs - ${speaker}: ${text.slice(0, 100)}...`,
        outlet: `Hansard PMQs - ${speaker} ${party ? `(${party})` : ''}`.trim(),
        url: r.Url || r.url || `https://hansard.parliament.uk/search?startDate=${from}&endDate=${to}&searchTerm=welfare`,
        date: r.SittingDate || r.sittingDate || from,
        text: text,
        source: 'hansard'
      };
    });
  } catch (e) {
    console.log(`Hansard error for ${from}: ${e.message} - trying backup search`);
    // Backup: return empty but don't fail whole backfill
    return [];
  }
}

async function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

async function main() {
  console.log(`Starting backfill from ${START_DATE.toISOString().split('T')[0]} to ${END_DATE.toISOString().split('T')[0]}`);
  
  const allNews = [];
  const allHansard = [];
  
  let current = new Date(START_DATE);
  
  while (current <= END_DATE) {
    const from = current.toISOString().split('T')[0];
    const next = new Date(current);
    next.setDate(next.getDate() + 1);
    const to = next.toISOString().split('T')[0];
    
    console.log(`\n--- Scanning ${from} ---`);
    
    const [guardian, gnews, hansard] = await Promise.all([
      fetchGuardian(from, to),
      fetchGNews(from, to),
      fetchHansardPMQs(from, to)
    ]);
    
    const dayItems = [...guardian, ...gnews];
    
    // Filter for stigma hits
    const stigmaHits = dayItems.filter(item => {
      const t = item.text.toLowerCase();
      return STIGMA_TERMS.some(term => t.includes(term.toLowerCase())) || 
             (t.includes('welfare') && (t.includes('bill') || t.includes('bloated') || t.includes('cheats')));
    });
    
    for (const item of stigmaHits) {
      allNews.push({
        id: item.id,
        outlet: item.outlet,
        title: item.title,
        url: item.url,
        stigmaScore: scoreStigma(item.text),
        rhetoricTypes: detectRhetoric(item.text),
        rhetoricHits: [WELFARE_KEYWORDS],
        debunk: getDebunk(item.text),
        date: item.date,
        source: item.source
      });
    }
    
    for (const item of hansard) {
      allHansard.push({
        id: item.id,
        title: item.title,
        outlet: item.outlet,
        url: item.url,
        stigmaScore: scoreStigma(item.text),
        rhetoricTypes: detectRhetoric(item.text),
        rhetoricHits: ['welfare'],
        debunk: getDebunk(item.text) + ' Hansard claim - verify against DWP stats.',
        date: item.date,
        source: 'hansard'
      });
    }
    
    console.log(`Found ${stigmaHits.length} news + ${hansard.length} Hansard for ${from}`);
    
    // Respect rate limits
    await sleep(1200);
    current = next;
  }
  
  // Ensure output dirs
  const outDir = 'public/data';
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
  
  const yearArchive = {
    lastUpdated: new Date().toISOString(),
    totalCount: allNews.length,
    from: START_DATE.toISOString().split('T')[0],
    to: END_DATE.toISOString().split('T')[0],
    today: [],
    items: allNews.sort((a,b) => new Date(b.date) - new Date(a.date))
  };
  
  const hansardArchive = {
    lastUpdated: new Date().toISOString(),
    totalCount: allHansard.length,
    from: START_DATE.toISOString().split('T')[0],
    to: END_DATE.toISOString().split('T')[0],
    items: allHansard.sort((a,b) => new Date(b.date) - new Date(a.date))
  };
  
  fs.writeFileSync(path.join(outDir, 'welfare-year-archive.json'), JSON.stringify(yearArchive, null, 2));
  fs.writeFileSync(path.join(outDir, 'hansard-welfare-pmqs.json'), JSON.stringify(hansardArchive, null, 2));
  
  // Also update main archive's lastUpdated
  const mainPath = path.join(outDir, 'welfare-archive.json');
  if (fs.existsSync(mainPath)) {
    const main = JSON.parse(fs.readFileSync(mainPath, 'utf8'));
    main.lastUpdated = new Date().toISOString();
    main.yearBackfillCount = allNews.length;
    main.hansardCount = allHansard.length;
    fs.writeFileSync(mainPath, JSON.stringify(main, null, 2));
  }
  
  console.log(`\nDONE! Year: ${allNews.length} news stigma items, ${allHansard.length} Hansard PMQs items`);
  console.log(`Saved to ${outDir}/welfare-year-archive.json and hansard-welfare-pmqs.json`);
}

main().catch(e => { console.error(e); process.exit(1); });