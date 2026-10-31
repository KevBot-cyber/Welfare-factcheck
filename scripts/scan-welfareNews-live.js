import Parser from 'rss-parser';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const TERMS_PATH = path.join(__dirname, '../data/welfareNews_stigmaTerms_v2.json');
const LOG_PATH = path.join(__dirname, '../data/welfareNews_live_log.json');
const PUBLIC_LOG_PATH = path.join(__dirname, '../public/data/welfareNews_live_log.json');

const parser = new Parser({
  customFields: { item: [['media:content','mediaContent']] }
});

// FIXED FEEDS: Use Google News search RSS which ALWAYS returns welfare articles
const FEEDS = [
  { name: 'Google News DWP Welfare', url: 'https://news.google.com/rss/search?q=%28DWP+OR+%22Universal+Credit%22+OR+PIP+OR+%22Personal+Independence+Payment%22%29+UK+when:30d&hl=en-GB&gl=GB&ceid=GB:en', tag: 'Google News' },
  { name: 'BBC Business', url: 'http://feeds.bbci.co.uk/news/business/rss.xml', tag: 'BBC' },
  { name: 'BBC UK', url: 'http://feeds.bbci.co.uk/news/uk/rss.xml', tag: 'BBC' },
  { name: 'Guardian Society', url: 'https://www.theguardian.com/society/rss', tag: 'Guardian' },
  { name: 'Disability News Service', url: 'https://www.disabilitynewsservice.com/feed/', tag: 'DNS' },
  { name: 'Gov UK DWP Announcements', url: 'https://www.gov.uk/government/announcements.atom?departments%5B%5D=department-for-work-pensions', tag: 'DWP' },
  { name: 'Benefits and Work', url: 'https://www.benefitsandwork.co.uk/feed', tag: 'B&W' }
];

const KEYWORDS = ['Universal Credit','PIP','DWP','ESA','UC','LHA','benefit','welfare','disability','sanction','Carer','JSA','housing benefit','Personal Independence Payment'];

function isRelevant(title, content, feedName) {
  // If feed is already welfare-specific, accept it
  if (feedName.includes('DWP') || feedName.includes('Benefits and Work') || feedName.includes('Disability News') || feedName.includes('Google News')) return true;
  const text = (title + ' ' + content).toLowerCase();
  return KEYWORDS.some(k => text.includes(k.toLowerCase()));
}

function daysAgo(date) {
  try { const d = new Date(date); if (isNaN(d)) return 999; return (new Date() - d) / (1000*60*60*24); }
  catch { return 999; }
}

async function loadTerms() {
  try { return JSON.parse(fs.readFileSync(TERMS_PATH, 'utf8')); }
  catch { return { categories: {} }; }
}

async function scan() {
  let newArticles = [];
  console.log('Scanning feeds...');
  for (const feed of FEEDS) {
    try {
      const f = await parser.parseURL(feed.url);
      console.log(`Feed ${feed.name}: ${f.items.length} items`);
      for (const item of f.items.slice(0,30)) {
        const pub = item.isoDate || item.pubDate || new Date().toISOString();
        if (daysAgo(pub) > 35) continue; // 35d buffer
        const title = item.title || '';
        const snippet = item.contentSnippet || item.content || item.summary || '';
        if (!title) continue;
        if (!isRelevant(title, snippet, feed.name)) continue;
        
        let cat = 'DWP';
        if (/PIP|Personal Independence/i.test(title+snippet)) cat='PIP';
        else if (/Universal Credit|\bUC\b/i.test(title+snippet)) cat='UC';
        else if (/Budget|LHA|Treasury|Autumn Statement/i.test(title+snippet)) cat='Budget';

        newArticles.push({
          id: item.guid || item.link || title,
          title: title.trim(),
          link: item.link,
          source: feed.tag,
          outlet: feed.name,
          published: pub,
          summary: snippet.slice(0,220),
          category: cat,
          ago: Math.round(daysAgo(pub)) + 'd ago'
        });
      }
    } catch (e) { console.log('Feed fail', feed.name, e.message); }
  }

  // Dedupe new articles
  const seen = new Set();
  newArticles = newArticles.filter(a => {
    const k = a.title.toLowerCase().replace(/[^a-z0-9]/g,'').slice(0,60);
    if (seen.has(k)) return false; seen.add(k); return true;
  });
  newArticles.sort((a,b) => new Date(b.published) - new Date(a.published));
  console.log(`Found ${newArticles.length} NEW relevant articles`);

  // === LOAD EXISTING LOG TO KEEP RUNNING TOTAL ===
  let log = { totalIncidents:0, byTerm:{}, byCategory:{}, incidents:[], articles:[], lastUpdated: new Date().toISOString() };
  try {
    if (fs.existsSync(LOG_PATH)) {
      const existing = JSON.parse(fs.readFileSync(LOG_PATH,'utf8'));
      log.totalIncidents = existing.totalIncidents || 0;
      log.byTerm = existing.byTerm || {};
      log.byCategory = existing.byCategory || {};
      log.incidents = existing.incidents || [];
      log.articles = existing.articles || [];
      console.log(`Loaded existing log: ${log.articles.length} past articles, ${log.totalIncidents} past incidents`);
    }
  } catch (e) { console.log('No existing log or corrupt, starting fresh'); }

  // Merge articles: keep existing + add new, keep only last 30d, max 100
  const allArticlesMap = new Map();
  [...log.articles, ...newArticles].forEach(a => {
    const key = (a.link || a.title).toLowerCase();
    if (!allArticlesMap.has(key)) allArticlesMap.set(key, a);
  });
  let mergedArticles = Array.from(allArticlesMap.values())
    .filter(a => daysAgo(a.published) <= 30)
    .sort((a,b) => new Date(b.published) - new Date(a.published))
    .slice(0,100);

  // If still 0 (all feeds down), keep old articles so we never show 0
  if (mergedArticles.length === 0 && log.articles.length > 0) {
    console.log('No new articles but keeping old ones to avoid 0');
    mergedArticles = log.articles;
  }

  // Stigma scan ONLY on NEW articles to build running total
  const termsData = await loadTerms();
  const allTerms = [];
  for (const [cat, arr] of Object.entries(termsData.categories || termsData || {})) {
    if (Array.isArray(arr)) arr.forEach(t => {
      const termObj = typeof t === 'string' ? { term: t } : t;
      if (termObj.term) allTerms.push({ term: termObj.term, category: cat });
    });
  }

  let newIncidents = 0;
  for (const art of newArticles) {
    const text = (art.title + ' ' + art.summary).toLowerCase();
    for (const {term, category} of allTerms) {
      if (!term) continue;
      if (text.includes(term.toLowerCase())) {
        newIncidents++;
        log.totalIncidents++;
        log.byTerm[term] = (log.byTerm[term]||0)+1;
        log.byCategory[category] = (log.byCategory[category]||0)+1;
        log.incidents.push({ term, category, title: art.title, link: art.link, date: art.published });
        console.log(`Stigma hit: "${term}" in "${art.title}"`);
      }
    }
  }

  log.articles = mergedArticles;
  log.lastUpdated = new Date().toISOString();

  console.log(`Final: ${mergedArticles.length} total articles (30d), +${newIncidents} new incidents, running total ${log.totalIncidents}`);

  fs.mkdirSync(path.dirname(LOG_PATH), {recursive:true});
  fs.mkdirSync(path.dirname(PUBLIC_LOG_PATH), {recursive:true});
  fs.writeFileSync(LOG_PATH, JSON.stringify(log, null, 2));
  fs.writeFileSync(PUBLIC_LOG_PATH, JSON.stringify(log, null, 2));
  console.log('Saved to', LOG_PATH, 'and', PUBLIC_LOG_PATH);
}

scan();