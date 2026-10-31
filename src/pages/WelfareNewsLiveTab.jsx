
// src/pages/WelfareNewsLiveTab.jsx
// No-clash version - uses welfareNews_stigmaTerms_v2.json and welfareNews_live_log.json
// Place this file as src/pages/WelfareNewsLiveTab.jsx
// Route: /welfare-news-live - FIXED TO READ ARTICLES FROM LOG FILE

import React, { useState, useEffect, useMemo, useRef } from 'react';

const stigmaTerms = {
  "Classic_DWP_Slurs": ["scrounger","scroungers","skiver","skivers","dole dosser","benefit cheat","benefits cheat","chav","chavs","unwashed","workless","workshy","dole bludger","benefit scrounger"],
  "Disability_Specific_Motability": ["free cars for disabled","handed free cars","given a free car","motability scam","free motability","luxury cars on benefits","80k car on benefits","free car on PIP"],
  "Fake_Disability_Malingering": ["fake disability","faking disability","not really disabled","not disabled","malingering","malingers","fit to work","not really sick","pretend disability","faking anxiety","faking depression","swinging the lead","playing the system","exaggerating disability"],
  "Economic_Envy_Better_Off": ["benefits more than working","more on benefits than work","better off on benefits","better off on the dole","earn more on benefits","paid more on benefits than working","benefits lifestyle","better off not working"],
  "Free_Money_Handouts": ["free money","handouts","something for nothing","freebies","taxpayer funded lifestyle","free cash"],
  "Laziness_Moral_Failings": ["lazy","bone idle","can't be bothered to work","refuse to work","won't work","too lazy to work"],
  "Dependency_Culture": ["dependency culture","welfare dependent","generations on benefits","benefits family","lifestyle choice","welfare dependency"],
  "Economic_Scapegoating_Bill": ["welfare bill","benefits bill spiralling","cost of worklessness","unsustainable welfare","benefits bill","welfare bill hits","cost of benefits"],
  "Visual_Stereotypes_Media": ["benefits street","benefits scroungers on tv","shameless benefits"],
  "Mental_Health_Minimising": ["just anxious","just depressed","not real mental illness","snowflake","work-shy anxiety","just anxiety"],
  "PIP_Assessment_Failings": ["PIP too easy","anyone gets PIP","PIP handout","automatic PIP","PIP for anxiety is a joke"]
};

const mockNews = [
  {id:"1",title:"DWP confirms Universal Credit managed migration deadline extended to 2026",link:"#",pubDate:new Date().toISOString(),source:"The Guardian",description:"Department says 800k still to move, with enhanced support for vulnerable claimants.",categoryTag:"UC",daysAgo:1},
  {id:"2",title:"PIP assessment backlog hits 18 months as tribunal overturns 68% of decisions",link:"#",pubDate:new Date().toISOString(),source:"BBC News",description:"Disabled campaigners say system in crisis.",categoryTag:"PIP",daysAgo:2},
  {id:"3",title:"Autumn Budget: Chancellor freezes LHA again despite rent inflation",link:"#",pubDate:new Date().toISOString(),source:"FT",description:"Housing charities warn freeze will push 120k families into arrears.",categoryTag:"Budget",daysAgo:3},
  {id:"4",title:"DWP sanctions data shows 42% of Universal Credit claimants sanctioned",link:"#",pubDate:new Date().toISOString(),source:"Mirror",description:"FOI reveals scale of conditionality.",categoryTag:"DWP",daysAgo:4},
];

export default function WelfareNewsLiveTab() {
  const [highContrast, setHighContrast] = useState(false);
  const [tab, setTab] = useState('live');
  const [filter, setFilter] = useState('All');
  const [news, setNews] = useState(mockNews);
  const [loading, setLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [log, setLog] = useState({totalIncidents:0, byTerm:{}, byCategory:{}, incidents:[]});
  const [scanText, setScanText] = useState('');
  const [matches, setMatches] = useState([]);
  const [showMP, setShowMP] = useState(false);

  // FIXED: Load log AND articles from same file - keeps running total
  useEffect(() => {
    async function loadLog() {
      const paths = ['/data/welfareNews_live_log.json', '/public/data/welfareNews_live_log.json'];
      for (const p of paths) {
        try {
          const res = await fetch(p + '?t=' + Date.now());
          if (!res.ok) continue;
          const data = await res.json();
          if (data) {
            // FIX 1: set log for stigma monitor
            if (data.totalIncidents !== undefined || data.incidents) {
              setLog(prev => ({
                totalIncidents: data.totalIncidents || 0,
                byTerm: data.byTerm || {},
                byCategory: data.byCategory || {},
                incidents: data.incidents || []
              }));
            }
            // FIX 2: set news from data.articles - THIS WAS MISSING
            if (data.articles && Array.isArray(data.articles) && data.articles.length > 0) {
              const mapped = data.articles.map((a,i) => ({
                id: a.id || `a_${i}`,
                title: a.title,
                link: a.link || '#',
                pubDate: a.published || a.pubDate || new Date().toISOString(),
                source: a.source || a.outlet || 'DWP',
                description: a.summary || a.description || '',
                categoryTag: a.category || a.categoryTag || 'DWP',
                daysAgo: a.ago ? parseInt(a.ago) : Math.floor((Date.now() - new Date(a.published || a.pubDate).getTime())/86400000)
              }));
              setNews(mapped);
              setLastUpdated(new Date(data.lastUpdated || Date.now()));
              console.log('Loaded', mapped.length, 'articles from', p);
              break; // stop after first successful load
            }
          }
        } catch (e) { console.log('Failed to load', p); }
      }
    }
    loadLog();
  }, []);

  // REMOVED: the rss2json fetch that was blocked by CORS and overwrote with 0
  // News now comes from the log file which is updated daily by GitHub Action + Node scanner

  const filteredNews = useMemo(()=>{
    if(filter==='All') return news;
    return news.filter(n=>n.categoryTag===filter);
  },[news,filter]);

  function scanForStigma(text) {
    const results=[];
    if(!text) return results;
    for(const [cat, terms] of Object.entries(stigmaTerms)) {
      for(const term of terms) {
        const re = new RegExp(`\\b${term.replace(/[.*+?^${}()|[\\]\\]/g,'\\$&')}\\b`,'i');
        if(re.test(text)) results.push({term, category:cat});
      }
    }
    return results;
  }

  const handleScan = ()=>{
    const res = scanForStigma(scanText);
    setMatches(res);
    if(res.length){
      const newIncidents = res.map(r=>({
        term:r.term,
        category:r.category,
        articleTitle: scanText.slice(0,80),
        articleLink:'#manual',
        source:'Manual Scan',
        timestamp: new Date().toISOString()
      }));
      const updated = {
        totalIncidents: log.totalIncidents + newIncidents.length,
        byTerm: {...log.byTerm},
        byCategory: {...log.byCategory},
        incidents: [...newIncidents, ...log.incidents].slice(0,2000)
      };
      newIncidents.forEach(i=>{
        updated.byTerm[i.term]=(updated.byTerm[i.term]||0)+1;
        updated.byCategory[i.category]=(updated.byCategory[i.category]||0)+1;
      });
      setLog(updated);
      try{ localStorage.setItem('welfareNews_live_log', JSON.stringify(updated)); }catch(e){}
    }
  };

  const exportCSV = ()=>{
    const rows = [['timestamp','term','category','title','source'], ...log.incidents.map(i=>[i.timestamp,i.term,i.category,i.articleTitle,i.source])];
    const csv = rows.map(r=>r.map(v=>`"${String(v).replace(/"/g,'""')}"`).join(',')).join('\n');
    const blob = new Blob([csv],{type:'text/csv'});
    const url = URL.createObjectURL(blob);
    const a=document.createElement('a'); a.href=url; a.download=`welfareNews_live_log_${new Date().toISOString().slice(0,10)}.csv`; a.click();
    setTimeout(()=>URL.revokeObjectURL(url),1000);
  };

  return (
    <div className="min-h-screen w-full antialiased" style={{backgroundColor: highContrast?'#000':'#0f0f1e', color: highContrast?'#ffff00':'#e4e4e7'}}>
      <header className="sticky top-0 z-30 border-b backdrop-blur-xl" style={{background: highContrast?'#000':'linear-gradient(90deg,#4a1a8a 0%,#3a2a7a 35%,#0d3d3a 100%)', borderColor:'#2a2040'}}>
        <div className="mx-auto max-w-[1160px] px-4 md:px-6 py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-lg grid place-items-center font-black text-sm" style={{background:'#2dd4bf', color:'#0f0f1e'}}>W</div>
            <div>
              <h1 className="text-[16px] md:text-[18px] font-extrabold leading-none">UK Welfare Truth Index</h1>
              <p className="text-[10px] md:text-[11px] opacity-70 mt-1 font-mono">WelfareNewsLiveTab • v2.0 no-clash • LIVE • {news.length} articles • Running total {log.totalIncidents}</p>
            </div>
            <span className="ml-2 hidden md:inline-flex text-[10px] px-2 py-1 rounded-full border font-mono" style={{background:'rgba(45,212,191,0.15)', borderColor:'rgba(45,212,191,0.3)', color:'#2dd4bf'}}>● LIVE FEED</span>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={()=>setHighContrast(!highContrast)} className="text-[11px] px-3 py-2 rounded-lg border" style={{background:'rgba(26,26,46,0.8)', borderColor:'#2a2040'}}>{highContrast?'Standard':'High Contrast'}</button>
            <button onClick={()=>setShowMP(!showMP)} className="text-[11px] px-3 py-2 rounded-lg font-bold" style={{background:'#2dd4bf', color:'#0f0f1e'}}>MP Briefing Pack</button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-[1160px] px-4 md:px-6 py-5">
        <div className="flex p-1 rounded-xl w-fit border" style={{background:'#1a1a2e', borderColor:'#2a2040'}}>
          <button onClick={()=>setTab('live')} className={`text-[12px] px-4 py-2 rounded-lg flex items-center gap-2 ${tab==='live'?'bg-[#2dd4bf] text-[#0f0f1e] font-bold':'text-zinc-400'}`}>Live News (30 Days) <span className="px-1.5 py-0.5 rounded text-[10px] bg-black/20">{news.length}</span></button>
          <button onClick={()=>setTab('stigma')} className={`text-[12px] px-4 py-2 rounded-lg flex items-center gap-2 ${tab==='stigma'?'bg-[#2dd4bf] text-[#0f0f1e] font-bold':'text-zinc-400'}`}>Stigma Monitor <span className="px-1.5 py-0.5 rounded text-[10px] bg-[#2a2040]">{log.totalIncidents}</span></button>
        </div>

        {tab==='live' && (
          <div className="mt-6">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
              <div className="flex gap-1.5">{['All','DWP','UC','PIP','Budget'].map(f=>(
                <button key={f} onClick={()=>setFilter(f)} className={`text-[11px] px-3 py-1.5 rounded-full border ${filter===f?'bg-white text-black border-white':'border-[#2a2040] text-zinc-400'}`}>{f}</button>
              ))}</div>
              <div className="text-[11px] text-zinc-500 font-mono flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse"></span>{loading?'Refreshing...':`Updated ${lastUpdated.toLocaleTimeString()} • ${news.length} in last 30d`}</div>
            </div>
            <div className="grid gap-3">
              {filteredNews.map(item=>(
                <a key={item.id} href={item.link} target="_blank" rel="noopener" className="group rounded-xl border p-4 flex flex-col gap-2 transition hover:translate-y-[-1px]" style={{background:'#1a1a2e', borderColor:'#2a2040'}}>
                  <div className="flex items-center gap-2"><span className="text-[10px] px-2 py-0.5 rounded-full font-bold" style={{background:'rgba(45,212,191,0.15)', color:'#2dd4bf'}}>{item.categoryTag}</span><span className="text-[11px] text-zinc-500 font-mono">{item.source} • {item.daysAgo}d ago</span><span className="ml-auto text-[10px] text-zinc-600 group-hover:text-[#2dd4bf]">↗ open</span></div>
                  <h3 className="text-[15px] font-bold text-white group-hover:text-[#2dd4bf]">{item.title}</h3>
                  <p className="text-[13px] text-zinc-400 line-clamp-2">{item.description}</p>
                </a>
              ))}
            </div>
          </div>
        )}

        {tab==='stigma' && (
          <div className="mt-6 space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
              <div className="rounded-xl border p-4" style={{background:'#1a1a2e', borderColor:'#2a2040'}}><div className="text-[11px] text-zinc-500 font-mono">TOTAL INCIDENTS</div><div className="text-3xl font-black text-white mt-1">{log.totalIncidents}</div><div className="text-[11px] text-[#2dd4bf] mt-1 font-mono">last 30d • v2.0 terms • running total</div></div>
              <div className="md:col-span-3 rounded-xl border p-4" style={{background:'#1a1a2e', borderColor:'#2a2040'}}>
                <div className="flex justify-between"><div className="text-[11px] text-zinc-500 font-mono">BY CATEGORY</div><button onClick={exportCSV} className="text-[11px] px-2.5 py-1 rounded border hover:bg-white hover:text-black">Export CSV</button></div>
                <div className="mt-3 flex flex-wrap gap-2">{Object.entries(log.byCategory).map(([k,v])=><span key={k} className="text-[11px] px-2.5 py-1 rounded-full border font-mono" style={{background:'#131325', borderColor:'#2a2040'}}>{k}: {v}</span>)}{Object.keys(log.byCategory).length===0 && <span className="text-[11px] text-zinc-500">No incidents yet - paste text below to test</span>}</div>
              </div>
            </div>

            <div className="rounded-xl border p-5" style={{background:'#1a1a2e', borderColor:'#2a2040'}}>
              <h3 className="font-bold text-[14px]">Stigma Detector — \b boundaries (new paths)</h3>
              <p className="text-[11px] text-zinc-500 font-mono mt-1">Reads /data/welfareNews_live_log.json • Terms: /data/welfareNews_stigmaTerms_v2.json • This file is src/pages/WelfareNewsLiveTab.jsx</p>
              <textarea value={scanText} onChange={e=>setScanText(e.target.value)} placeholder="Paste headline: e.g. 'Benefits bill spiralling as workshy scroungers exploit...'" className="mt-4 w-full min-h-[110px] rounded-lg border p-3 text-[13px] bg-[#0f0f1e] text-white" style={{borderColor:'#2a2040'}}></textarea>
              <div className="mt-3 flex gap-2">
                <button onClick={handleScan} className="text-[12px] px-4 py-2 rounded-lg font-bold bg-[#2dd4bf] text-[#0f0f1e]">Scan text + Log</button>
                <button onClick={()=>{setScanText(''); setMatches([])}} className="text-[12px] px-3 py-2 rounded-lg border border-[#2a2040] text-zinc-400">Clear</button>
              </div>
              {matches.length>0 && <div className="mt-4 rounded-lg border p-3" style={{background:'#131325', borderColor:'rgba(45,212,191,0.3)'}}><div className="text-[11px] text-[#2dd4bf] font-bold">{matches.length} term(s) found</div><div className="mt-2 flex flex-wrap gap-2">{matches.map((m,i)=><span key={i} className="text-[11px] px-2 py-1 rounded bg-[#1a1a2e] border border-[#2a2040]">"{m.term}" → {m.category}</span>)}</div></div>}
            </div>

            <div className="rounded-xl border p-4" style={{background:'#1a1a2e', borderColor:'#2a2040'}}>
              <h4 className="font-bold text-[13px]">Recent Incidents (last 5)</h4>
              <div className="mt-3 space-y-2">{log.incidents.slice(0,5).map((inc,i)=><div key={i} className="rounded-lg border p-3" style={{background:'#131325', borderColor:'#2a2040'}}><div className="text-[11px] text-zinc-500 font-mono">{new Date(inc.timestamp || inc.date).toLocaleString()} • {inc.source}</div><div className="text-[13px] font-semibold text-white mt-1">{inc.articleTitle || inc.title}</div><div className="text-[11px] text-zinc-400 mt-1">match: "{inc.term}" • {inc.category}</div></div>)}{log.incidents.length===0 && <div className="text-[11px] text-zinc-500">No incidents logged yet.</div>}</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}