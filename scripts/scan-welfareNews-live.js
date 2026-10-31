import Parser from 'rss-parser';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const TERMS_PATHS = [
  path.join(__dirname, '../data/welfareNews_stigmaTerms_v2.json'),
  path.join(__dirname, '../public/data/welfareNews_stigmaTerms_v2.json')
];
const LOG_PATH = path.join(__dirname, '../data/welfareNews_live_log.json');
const PUBLIC_LOG_PATH = path.join(__dirname, '../public/data/welfareNews_live_log.json');

const parser = new Parser();

const FEEDS = [
  // Feed 1: Your original factual benefits feed (DWP/UC/PIP)
  { name: 'Google News DWP Welfare', url: 'https://news.google.com/rss/search?q=%28DWP+OR+%22Universal+Credit%22+OR+%22Personal+Independence+Payment%22+OR+PIP+OR+%22Carer%27s+Allowance%22+OR+%22Employment+Support+Allowance%22%29+UK+when:30d&hl=en-GB&gl=GB&ceid=GB:en', tag: 'Google News' },
  
  // Feed 2: NEW - Welfare bill political narrative (catches what Google shows)
  { name: 'Google News Welfare Bill', url: 'https://news.google.com/rss/search?q=%28%22welfare+bill%22+OR+%22benefits+bill%22+OR+%22cost+of+worklessness%22%29+UK+when:30d&hl=en-GB&gl=GB&ceid=GB:en', tag: 'Google News' },
  
  { name: 'Gov UK DWP Announcements', url: 'https://www.gov.uk/government/announcements.atom?departments%5B%5D=department-for-work-pensions', tag: 'DWP' },
  { name: 'Disability News Service', url: 'https://www.disabilitynewsservice.com/feed/', tag: 'DNS' },
  { name: 'Benefits and Work', url: 'https://www.benefitsandwork.co.uk/feed', tag: 'B&W' },
  { name: 'Rightsnet Welfare', url: 'https://www.rightsnet.org.uk/rss', tag: 'Rightsnet' }
];

const MUST_HAVE_KEYWORDS = [
  'universal credit','personal independence payment','disability living allowance',
  'employment and support allowance','esa','pip','dwp','carer allowance',
  'housing benefit','lha','benefit sanction','work capability assessment','wca',
  'jobseekers allowance','jsa','welfare reform','benefits bill','welfare bill',
  'cost of worklessness','unsustainable welfare','cost of living payment',
  'cold weather payment','attendance allowance','pension credit',
  'sponger','spongers','scrounger','scroungers','stealth tax revenue'
];

const EXCLUDE_KEYWORDS = [
  'killed by father','murder','haunted homes','body positivity','measles vaccination',
  'asking price','poshest postcodes','prisoners recalled'
];

function isWelfareArticle(title, summary) {
  const text = (title + ' ' + summary).toLowerCase();
  if (EXCLUDE_KEYWORDS.some(k => text.includes(k.toLowerCase()))) return false;
  return MUST_HAVE_KEYWORDS.some(k => text.includes(k));
}
function daysAgo(date){ try{ const d=new Date(date); if(isNaN(d))return 999; return (new Date()-d)/(1000*60*60*24);}catch{return 999;}}

function loadTerms(){
  for (const p of TERMS_PATHS){
    try{ if(fs.existsSync(p)){ console.log('Loaded terms from', p); return JSON.parse(fs.readFileSync(p,'utf8')); } }catch{}
  }
  console.log('No terms file found!');
  return {};
}

async function scan(){
  let newArticles=[];
  console.log('Scanning with welfare bill feed included...');
  for(const feed of FEEDS){
    try{
      const f=await parser.parseURL(feed.url);
      console.log(`Feed ${feed.name}: ${f.items.length} items`);
      for(const item of f.items.slice(0,40)){
        const pub=item.isoDate||item.pubDate||new Date().toISOString();
        if(daysAgo(pub)>32)continue;
        const title=(item.title||'').trim();
        const snippet=(item.contentSnippet||item.content||item.summary||'').trim();
        if(!title)continue;
        if(!isWelfareArticle(title,snippet))continue;
        let cat='DWP';
        if(/PIP|Personal Independence/i.test(title+snippet))cat='PIP';
        else if(/Universal Credit|\bUC\b/i.test(title+snippet))cat='UC';
        else if(/welfare bill|benefits bill|cost of worklessness|Budget|LHA|Treasury|Stealth tax|Healey|unsustainable/i.test(title+snippet))cat='Budget';

        newArticles.push({id:item.guid||item.link||title,title,link:item.link,source:feed.tag,outlet:feed.name,published:pub,summary:snippet.slice(0,220),category:cat,ago:Math.round(daysAgo(pub))+'d ago'});
      }
    }catch(e){ console.log('Feed fail', feed.name, e.message); }
  }
  const seen=new Set();
  newArticles=newArticles.filter(a=>{ const k=a.title.toLowerCase().replace(/[^a-z0-9]/g,'').slice(0,60); if(seen.has(k))return false; seen.add(k); return true; });
  newArticles.sort((a,b)=>new Date(b.published)-new Date(a.published));
  console.log(`Found ${newArticles.length} welfare articles (including bill)`);

  let log={totalIncidents:0,byTerm:{},byCategory:{},incidents:[],articles:[],lastUpdated:new Date().toISOString()};
  try{
    if(fs.existsSync(LOG_PATH)){
      const existing=JSON.parse(fs.readFileSync(LOG_PATH,'utf8'));
      log.articles=existing.articles||[];
      const cleaned=log.articles.filter(a=>isWelfareArticle(a.title,a.summary||''));
      console.log(`Cleaned existing: ${log.articles.length} -> ${cleaned.length} welfare articles`);
      log.articles=cleaned;
    }
  }catch{}

  const allMap=new Map();
  [...log.articles,...newArticles].forEach(a=>{ const key=(a.link||a.title).toLowerCase(); if(!allMap.has(key))allMap.set(key,a); });
  let merged=Array.from(allMap.values()).filter(a=>daysAgo(a.published)<=30).sort((a,b)=>new Date(b.published)-new Date(a.published)).slice(0,100);
  console.log(`Final merged: ${merged.length} welfare articles`);

  const termsData=loadTerms();
  const allTerms=[];
  for(const [cat, arr] of Object.entries(termsData)){
    if(Array.isArray(arr)) arr.forEach(term=>{ if(typeof term==='string') allTerms.push({term, category:cat}); });
  }
  console.log(`Loaded ${allTerms.length} stigma terms`);

  let totalIncidents=0; let byTerm={}; let byCategory={}; let incidents=[];
  for(const art of merged){
    const text=(art.title+' '+(art.summary||'')).toLowerCase();
    for(const {term, category} of allTerms){
      const t=term.toLowerCase();
      const re=new RegExp('\\b'+t.replace(/[.*+?^${}()|[\\]\\]/g,'\\$&')+'\\b','i');
      if(re.test(text) || text.includes(t)){
        totalIncidents++;
        byTerm[term]=(byTerm[term]||0)+1;
        byCategory[category]=(byCategory[category]||0)+1;
        incidents.push({term, category, title:art.title, link:art.link, date:art.published, source:art.source});
      }
    }
  }

  log.totalIncidents=totalIncidents;
  log.byTerm=byTerm;
  log.byCategory=byCategory;
  log.incidents=incidents;
  log.articles=merged;
  log.lastUpdated=new Date().toISOString();

  fs.mkdirSync(path.dirname(LOG_PATH),{recursive:true});
  fs.mkdirSync(path.dirname(PUBLIC_LOG_PATH),{recursive:true});
  fs.writeFileSync(LOG_PATH, JSON.stringify(log,null,2));
  fs.writeFileSync(PUBLIC_LOG_PATH, JSON.stringify(log,null,2));
  console.log('Saved', merged.length, 'articles,', totalIncidents, 'stigma incidents');
  if(Object.keys(byTerm).length) console.log('byTerm', JSON.stringify(byTerm));
  if(Object.keys(byCategory).length) console.log('byCategory', JSON.stringify(byCategory));
}

scan();
