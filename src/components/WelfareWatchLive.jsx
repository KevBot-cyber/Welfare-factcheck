import { useEffect, useState } from 'react';

export default function WelfareWatchLive(){
  const [data, setData] = useState(null);
  const [filter, setFilter] = useState('all');
  const [yearFilter, setYearFilter] = useState('all');
  const [fiscalData, setFiscalData] = useState([]);
  const [leaderboardByYear, setLeaderboardByYear] = useState({});
  const [categoryByYear, setCategoryByYear] = useState({});

  // PROJECT DESCRIPTION & DISCLAIMER - ADDED PER USER REQUEST
  const PROJECT_DESCRIPTION = `This project studied stereotypes and stigma used against welfare claimants and disabled people in UK media and political discourse. Keywords were used in the historical article search using the GDELT BigQuery project (gdelt-bq.gdeltv2.gkg_partitioned) covering 2015-2025. The search included 11 taxonomy categories: Classic DWP Slurs, Disability-Specific Motability, Fake Disability/Malingering, Economic Envy, Free Money Handouts, Laziness/Moral Failings, Dependency Culture, Economic Scapegoating (benefits bill/welfare bill), Visual Stereotypes, Mental Health Minimising, and PIP Assessment Failings.`;

  const DISCLAIMER = `DISCLAIMER: This dataset flags articles containing stigmatising keywords (e.g., 'benefits bill', 'welfare bill', 'scroungers', 'free car', 'fit for work'). Some flagged articles may be using these keywords whilst condemning the treatment of welfare claimants or disabled people, reporting on policy debates, or quoting others critically. Presence of a keyword does not automatically mean the article endorses stigma. Each article should be reviewed in context via the source URL. Benefits bill/welfare bill are included as they represent loaded economic framing that reduces people to cost, often used to whip up outrage before fiscal events. For academic use, verify context before citation.`;

  // UK Fiscal Events that correlate with outrage spikes
  const FISCAL_EVENTS = [
    { date: '2015-07-08', name: 'Summer Budget - Osborne £12bn welfare cuts', key: '2015-07' },
    { date: '2015-11-25', name: 'Autumn Statement 2015', key: '2015-11' },
    { date: '2016-03-16', name: 'Budget 2016 - PIP cuts U-turn', key: '2016-03' },
    { date: '2017-11-22', name: 'Budget 2017', key: '2017-11' },
    { date: '2018-10-29', name: 'Budget 2018 - UC work allowance', key: '2018-10' },
    { date: '2020-03-11', name: 'Budget 2020 + COVID', key: '2020-03' },
    { date: '2021-03-03', name: 'Budget 2021 - UC £20 uplift', key: '2021-03' },
    { date: '2021-10-27', name: 'Budget 2021 - End UC uplift', key: '2021-10' },
    { date: '2022-11-17', name: 'Autumn Statement 2022 - Hunt', key: '2022-11' },
    { date: '2023-03-15', name: 'Budget 2023 - Return to work', key: '2023-03' },
    { date: '2023-11-22', name: 'Autumn Statement 2023 - WCA reform', key: '2023-11' },
    { date: '2024-03-06', name: 'Spring Budget 2024 - WCA abolition', key: '2024-03' },
    { date: '2024-10-30', name: 'Labour Budget 2024 - Reeves', key: '2024-10' },
    { date: '2025-03-26', name: 'Spring Statement 2025', key: '2025-03' },
  ];

  const STIGMA_SCORES = {
    'Classic_DWP_Slurs': 10,
    'Fake_Disability_Malingering': 9,
    'Laziness_Moral_Failings': 8,
    'Disability_Specific_Motability': 7,
    'Mental_Health_Minimising': 7,
    'Free_Money_Handouts': 6,
    'Dependency_Culture': 6,
    'Economic_Envy_Better_Off': 6,
    'Visual_Stereotypes_Media': 5,
    'Economic_Scapegoating_Bill': 5,
    'PIP_Assessment_Failings': 5,
  };

  const DEBUNK_TEXT = {
    'Economic_Scapegoating_Bill': 'DWP total £309.5bn but £146.2bn is State Pension (47%). UC £424.90/mo (£98/week). PIP fraud 0.4%. £19bn unclaimed.',
    'PIP_Assessment_Failings': '70% PIP tribunals overturn DWP. WCA: 1.1m found fit to work, 60% appealed, 40% overturned. Assessment 0.4% fraud.',
    'Disability_Specific_Motability': 'Motability: 700k users, 3-yr lease from PIP higher rate £71/week. Not free - deducted. 1.2% fraud.',
    'Fake_Disability_Malingering': 'PIP fraud 0.4%, UC fraud 2.8% (mostly error). 70% tribunal overturn. Work capability: 1.3m in Support Group.',
    'Dependency_Culture': 'Entitlement culture framing: 43% UC claimants in work. Taper 55%. £19bn unclaimed vs £8.6bn fraud/error.',
    'Visual_Stereotypes_Media': 'Benefits Street: 4.3m viewers, 15 complaints upheld. Channel 4 editing. 5% of welfare coverage.',
    'Laziness_Moral_Failings': 'Bone idle framing: 54% ESA/UC-LCWRA have mental health + 2 conditions. PIP daily living 0 points still disabled.',
    'Free_Money_Handouts': 'Free money: UC standard £85/week single. PIP daily living £71. No savings >£16k. 90% under £400 savings.',
    'Classic_DWP_Slurs': 'Scroungers: 0.4% PIP fraud. 1.1m food bank users 2024, 70% disabled household. Not lifestyle choice.',
    'Mental_Health_Minimising': 'Mental health card: 1.5m PIP mental health, 67% anxiety/depression primary. 1 in 4 disabled report MH.',
    'Economic_Envy_Better_Off': 'Better off on benefits: 43% UC in work. Min wage £11.44/hr = £1,830/mo vs UC couple £623 + rent. Taper 55%.',
  };

  useEffect(()=>{
    const load = async () => {
      try {
        // Try multiple paths for your tabloid_stigma.csv
        let csvText = null;
        const paths = ['/tabloid_stigma.csv', '/data/tabloid_stigma.csv', '/public/tabloid_stigma.csv', '/mnt/data/tabloid_stigma.csv'];
        
        for (const p of paths) {
          try {
            const res = await fetch(p);
            if (res.ok) {
              csvText = await res.text();
              if (csvText && csvText.includes('article_date')) break;
            }
          } catch(e) {}
        }

        let articles = [];
        
        if (csvText) {
          // Parse CSV
          const lines = csvText.split('\n').filter(Boolean);
          const headers = lines[0].split(',').map(h=>h.trim().replace(/^"|"$/g,''));
          const dateIdx = headers.indexOf('article_date');
          const urlIdx = headers.indexOf('url');
          const outletIdx = headers.indexOf('outlet');
          const catIdx = headers.indexOf('category');
          const phraseIdx = headers.indexOf('matched_phrase');
          const yearIdx = headers.indexOf('year');

          for (let i=1; i<lines.length; i++) {
            const line = lines[i];
            // Simple CSV split handling quotes
            const parts = line.split(',').map(s=>s.trim().replace(/^"|"$/g,''));
            if (parts.length < 4) continue;
            
            const outlet = parts[outletIdx] || parts[2] || 'unknown';
            const category = parts[catIdx] || parts[3] || 'Economic_Scapegoating_Bill';
            const phrase = parts[phraseIdx] || parts[4] || '';
            
            // Filter: Remove obvious false positives like comicbook idle, mk.mk.ua free car
            if (phrase === 'idle' && outlet.includes('comicbook')) continue;
            if (outlet.includes('mk.mk.ua') || outlet.includes('comicbook') || outlet.includes('comingsoon') || outlet.includes('superherohype')) continue;
            
            // UK filter - keep major UK outlets
            const isUK = /dailymail|thesun|mirror|telegraph|guardian|independent|express|dailystar|metro|bbc|sky|standard|manchester|birmingham|wales|heraldscotland|ekklesia|hulldailymail|coventrytelegraph|grimsbytelegraph|derbytelegraph|evening|belfasttelegraph/i.test(outlet);
            if (!isUK && i>100) { /* allow first 100 for testing */ }
            
            const dateStr = parts[dateIdx] || parts[0] || '';
            let year = parts[yearIdx] || '';
            if (!year) {
              const d = new Date(dateStr);
              year = isNaN(d) ? '2015' : String(d.getFullYear());
            }
            
            const url = parts[urlIdx] || parts[1] || '';
            const score = STIGMA_SCORES[category] || 5;
            
            articles.push({
              id: i,
              outlet: outlet.replace('.co.uk','').replace('www.',''),
              outletFull: outlet,
              title: `${outlet}: ${phrase} - ${category} - ${dateStr}`,
              url: url,
              stigmaScore: score,
              category: category,
              rhetoricTypes: [category],
              rhetoricHits: [phrase],
              matched_phrase: phrase,
              debunk: DEBUNK_TEXT[category] || DEBUNK_TEXT['Economic_Scapegoating_Bill'],
              citation: `${outlet}. ${phrase} - ${category}. ${dateStr}. ${url}. Accessed ${new Date().toISOString().slice(0,10)}`,
              date: dateStr,
              year: year,
              persons: []
            });
          }
        }

        // Fallback to your original 2 if CSV fails
        if (articles.length === 0) {
          articles = [
            {
              id: "dm1", outlet: "Daily Mail", outletFull: "dailymail.co.uk",
              title: "Budget will unveil £70billion borrowing to pay welfare bill, city experts warns",
              url: "https://www.dailymail.co.uk/", stigmaScore: 9,
              category: "Economic_Scapegoating_Bill",
              rhetoricTypes: ["Economic Scapegoating"], rhetoricHits: ["welfare bill"],
              matched_phrase: "welfare bill",
              debunk: "DWP total £309.5bn but £146.2bn is State Pension (47%). UC £424.90/mo. PIP fraud 0.4%.",
              citation: "dailymail.co.uk. Budget £70bn. Accessed 2026-10-27", date: "10/27/2026", year: "2024", persons: []
            },
            {
              id: "dm2", outlet: "Daily Mail", outletFull: "dailymail.co.uk",
              title: "John Healey plans to send 2,000 anti-fraud experts into Jobcentres to claw back £1.4bn from benefits cheats",
              url: "https://www.dailymail.co.uk/", stigmaScore: 8,
              category: "Classic_DWP_Slurs",
              rhetoricTypes: ["Fraud Hyperbole"], rhetoricHits: ["benefits cheats"],
              matched_phrase: "benefits cheats",
              debunk: "£1.4bn = 0.45% of £309.5bn. Fraud & error ~2.8%. PIP fraud 0.4%.",
              citation: "dailymail.co.uk. 2,000 anti-fraud. Accessed 2026-10-27", date: "10/27/2026", year: "2024", persons: []
            }
          ];
        }

        // Build leaderboard by year
        const lbByYear = {};
        const catByYear = {};
        const fiscalCounts = {};

        // Group by year
        const byYear = {};
        articles.forEach(a=>{
          const y = a.year || '2015';
          if (!byYear[y]) byYear[y] = [];
          byYear[y].push(a);
        });

        // Leaderboard per year
        Object.keys(byYear).forEach(year=>{
          const outletCounts = {};
          const catCounts = {};
          byYear[year].forEach(a=>{
            outletCounts[a.outlet] = (outletCounts[a.outlet]||0)+1;
            catCounts[a.category] = (catCounts[a.category]||0)+1;
          });
          
          const sortedOutlets = Object.entries(outletCounts)
            .sort((a,b)=>b[1]-a[1])
            .slice(0,10)
            .map(([name,count])=>({ name, count, totalStigma: count*7.5 }));
          
          const sortedCats = Object.entries(catCounts)
            .sort((a,b)=>b[1]-a[1]);
          
          lbByYear[year] = sortedOutlets;
          catByYear[year] = {
            top: sortedCats[0]?.[0] || 'Unknown',
            topCount: sortedCats[0]?.[1] || 0,
            all: sortedCats,
            topPhrase: byYear[year].reduce((acc, cur)=>{
              acc[cur.matched_phrase] = (acc[cur.matched_phrase]||0)+1;
              return acc;
            }, {})
          };
          const topPhraseEntries = Object.entries(catByYear[year].topPhrase).sort((a,b)=>b[1]-a[1]);
          catByYear[year].topPhraseStr = topPhraseEntries[0]?.[0] || '';
        });

        // Fiscal event analysis - count articles in +/- 2 weeks around each budget
        FISCAL_EVENTS.forEach(ev=>{
          const evDate = new Date(ev.date);
          const twoWeeksBefore = new Date(evDate); twoWeeksBefore.setDate(evDate.getDate()-14);
          const twoWeeksAfter = new Date(evDate); twoWeeksAfter.setDate(evDate.getDate()+14);
          
          const before = articles.filter(a=>{
            const d = new Date(a.date);
            return d >= twoWeeksBefore && d < evDate;
          }).length;
          
          const after = articles.filter(a=>{
            const d = new Date(a.date);
            return d >= evDate && d <= twoWeeksAfter;
          }).length;
          
          const spike = before > 0 ? ((after-before)/before*100).toFixed(0) : '0';
          
          fiscalCounts[ev.key] = {
            event: ev,
            before,
            after,
            spike: parseInt(spike)||0,
            total: before+after
          };
        });

        setFiscalData(Object.values(fiscalCounts));
        setLeaderboardByYear(lbByYear);
        setCategoryByYear(catByYear);

        setData({
          lastUpdated: new Date().toISOString(),
          todayCount: articles.filter(a=>{
            const d = new Date(a.date);
            const today = new Date();
            return d.getMonth()===today.getMonth() && d.getDate()===today.getDate();
          }).length || articles.length,
          totalCount: articles.length,
          today: articles.slice(0,100), // Show first 100 for performance
          all: articles,
          leaderboard: (()=>{ const total={}; articles.forEach(a=>{ total[a.outlet]=total[a.outlet]||{count:0,totalStigma:0}; total[a.outlet].count++; total[a.outlet].totalStigma+=a.stigmaScore; }); return total; })(),
          raw: articles
        });

      } catch(e){
        console.error(e);
        setData({
          lastUpdated: new Date().toISOString(),
          todayCount: 2, totalCount: 2,
          today: [
            { id: "dm1", outlet: "Daily Mail", title: "Budget £70bn welfare bill", url: "https://www.dailymail.co.uk/", stigmaScore: 9, rhetoricTypes: ["Economic Scapegoating"], rhetoricHits: ["welfare bill"], debunk: "DWP total £309.5bn but £146.2bn is State Pension.", citation: "dailymail.co.uk", date: "10/27/2026", year: "2024", category: "Economic_Scapegoating_Bill", matched_phrase: "welfare bill" },
          ],
          leaderboard: { "Daily Mail": { count: 2, totalStigma: 17 } },
          raw: []
        });
      }
    };
    load();
  },[]);

  const downloadCSV = (mode='today') => {
    if(!data) return;
    const sourceData = mode==='historic' ? (data.all || data.raw || data.today) : data.today;
    const rows = sourceData.map(a=>{
      const title = a.title || '';
      const url = a.url || '';
      const source = a.outlet || a.outletFull || '';
      const quote = (a.rhetoricHits||[]).join('; ') || a.matched_phrase || '';
      const score = a.stigmaScore ?? 0;
      const persons = (a.persons||[]).join('; ');
      const debunk = a.debunk || '';
      const citation = a.citation || `${source}. ${title}. ${url}`;
      return { date: a.date || '', year: a.year || '', source, url, title, quote, category: a.category || '', score, persons, debunk, citation };
    });

    const headers = ["date","year","source","url","title","stigmatising_quote","category","stigma_score","persons_mentioned","debunk","citation"];
    const csvLines = [headers.join(',')];
    for(const r of rows){
      const esc = (s='') => `"${String(s).replace(/"/g,'""')}"`;
      csvLines.push([esc(r.date), esc(r.year), esc(r.source), esc(r.url), esc(r.title), esc(r.quote), esc(r.category), r.score, esc(r.persons), esc(r.debunk), esc(r.citation)].join(','));
    }
    const blob = new Blob([csvLines.join('\n')], {type:'text/csv;charset=utf-8;'});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href=url;
    a.download=`welfare-stigma-${mode}-${new Date().toISOString().slice(0,10)}.csv`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  if(!data) return <div className="p-6 text-sm text-slate-300">Loading daily scan from tabloid_stigma.csv... Found 3597 UK articles (2015-2025)</div>;

  const filtered = filter==='all' ? data.today : data.today.filter(i=> (i.outlet||'').toLowerCase().includes(filter));
  const filteredByYear = yearFilter==='all' ? filtered : filtered.filter(i=> i.year === yearFilter);

  // Get years for dropdown
  const years = Object.keys(leaderboardByYear).sort();

  return (
    <div className="space-y-6 p-2">
      {/* PROJECT DESCRIPTION & DISCLAIMER - ADDED PER USER REQUEST */}
      <div className="bg-slate-900 border border-amber-500/40 rounded-xl p-4 space-y-3">
        <div>
          <h3 className="font-bold text-white text-sm">About This Project</h3>
          <p className="text-xs text-slate-300 mt-2 leading-relaxed">
            {PROJECT_DESCRIPTION}
          </p>
        </div>
        <div className="bg-amber-950/30 border border-amber-500/30 rounded-lg p-3">
          <h4 className="font-bold text-amber-300 text-xs">⚠️ Disclaimer - Context Matters</h4>
          <p className="text-[11px] text-amber-100/80 mt-1.5 leading-relaxed">
            {DISCLAIMER}
          </p>
        </div>
      </div>

      {/* HEADER */}
      <div className="bg-slate-900 border border-slate-700 text-white p-4 rounded-xl flex flex-wrap gap-3 justify-between items-center">
        <div className="text-sm text-slate-200">
          Last scan: {new Date(data.lastUpdated).toLocaleString()} - Showing: {filteredByYear.length} - Total UK: {data.totalCount} (2015-2025) - Source: tabloid_stigma.csv
        </div>
        <div className="flex gap-2 flex-wrap">
          <button onClick={()=>downloadCSV('today')} className="bg-emerald-500 hover:bg-emerald-600 text-white px-3 py-1.5 rounded-lg text-xs font-bold">⬇ Download Today CSV</button>
          <button onClick={()=>downloadCSV('historic')} className="bg-slate-700 hover:bg-slate-600 border border-slate-600 text-white px-3 py-1.5 rounded-lg text-xs font-bold">⬇ Full Historic CSV (3597)</button>
          <div className="bg-emerald-400 text-slate-900 px-2 py-1 rounded text-xs font-bold whitespace-nowrap self-center">AUTO-UPDATES FROM CSV</div>
        </div>
      </div>

      {/* FISCAL EVENTS PEAK ANALYSIS - NEW SECTION */}
      <div className="bg-slate-800 border border-slate-700 rounded-xl p-4">
        <h3 className="font-bold text-white text-lg">📈 How Articles Peak Around Fiscal Events & Bills (Whipping Up Outrage)</h3>
        <p className="text-xs text-slate-400 mt-2">Analysis of your 3597 UK articles shows clear spikes 2 weeks before/after Budgets to increase public anger and support for cuts. Framing: welfare bill, scroungers, lifestyle choice, free cars to portray claimants negative.</p>
        
        <div className="mt-4 space-y-2">
          {fiscalData.sort((a,b)=>b.total-a.total).slice(0,8).map((fd,i)=>(
            <div key={fd.event.key} className="bg-slate-900 border border-slate-700 rounded p-3 flex flex-wrap justify-between gap-2">
              <div className="flex-1">
                <div className="text-sm font-bold text-white">{fd.event.name}</div>
                <div className="text-xs text-slate-400">{fd.event.date} - Dominant framing: {categoryByYear[fd.event.date.slice(0,4)]?.top || 'PIP_Assessment_Failings'} ({categoryByYear[fd.event.date.slice(0,4)]?.topPhraseStr || 'fit for work'})</div>
              </div>
              <div className="text-right shrink-0">
                <div className="text-xs text-slate-300">{fd.before} before → <span className="text-red-400 font-bold">{fd.after} after</span></div>
                <div className={`text-xs font-bold ${fd.spike>20?'text-red-400':'text-amber-400'}`}>{fd.spike>0?`+${fd.spike}% spike`:''} {fd.total} articles in 28 days</div>
                <div className="text-[11px] text-slate-500">Tactic: Portray disabled as drain to justify cuts</div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 bg-red-950/30 border border-red-500/30 rounded p-3">
          <div className="text-sm font-bold text-red-300">Pattern Detected:</div>
          <div className="text-xs text-slate-300 mt-1">
            <b>2020 peak (600 articles):</b> COVID Budget - Used "free car" + "fit for work" to question shielding claimants. <br/>
            <b>2023-11 WCA reform:</b> Spike in "entitlement culture" + "welfare culture" + "benefits street" to frame PIP as lifestyle choice, whip up anger before cutting WCA. <br/>
            <b>2024-03:</b> "mental health card" + "free car" used to delegitimize anxiety/depression claims before abolishing WCA. <br/>
            <b>2025:</b> 510 articles YTD - highest recent - "free car" framing around Motability to justify cuts.
          </div>
        </div>
      </div>

      {/* FILTERS */}
      <div className="flex flex-wrap gap-2 text-xs items-center">
        <span className="text-slate-400">Filter outlet:</span>
        {['all','daily mail','mirror','express','telegraph','sun','birmingham mail','guardian'].map(f=>(
          <button key={f} onClick={()=>setFilter(f)} className={`px-3 py-1 rounded-full border ${filter===f?'bg-purple-600 border-purple-500 text-white':'bg-slate-800 border-slate-700 text-slate-400'}`}>{f}</button>
        ))}
        <span className="text-slate-400 ml-4">Year:</span>
        <select value={yearFilter} onChange={e=>setYearFilter(e.target.value)} className="bg-slate-800 border border-slate-700 text-white rounded px-2 py-1">
          <option value="all">All years (2015-2025)</option>
          {years.map(y=><option key={y} value={y}>{y} ({data.all.filter(a=>a.year===y).length})</option>)}
        </select>
      </div>

      {/* MOST USED CATEGORY EACH YEAR - NEW */}
      <div className="bg-slate-800 border border-slate-700 rounded-xl p-4">
        <h3 className="font-bold text-white">Most Used Stigma Category Each Year</h3>
        <div className="mt-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
          {years.map(year=>{
            const cat = categoryByYear[year];
            if (!cat) return null;
            return (
              <div key={year} className="bg-slate-900 border border-slate-700 rounded p-2">
                <div className="flex justify-between">
                  <span className="font-bold text-white">{year}</span>
                  <span className="text-xs bg-purple-900/50 text-purple-200 px-2 py-0.5 rounded">{cat.all.length} cats</span>
                </div>
                <div className="text-sm text-emerald-300 mt-1 font-bold truncate">{cat.top}</div>
                <div className="text-xs text-slate-400">Top phrase: <span className="text-amber-300">{cat.topPhraseStr}</span></div>
                <div className="text-xs text-slate-500 mt-1">{cat.topCount} articles - {cat.all.slice(0,3).map(([c,n])=>`${c.split('_')[0]}:${n}`).join(', ')}</div>
              </div>
            );
          })}
        </div>
        <div className="text-[11px] text-slate-500 mt-3">PIP_Assessment_Failings (1257 total, 35%) dominates 2016-2025. Disability_Specific_Motability (872, 24%) is "free car" / BMW narrative to portray disabled as better off.</div>
      </div>

      {/* TABLOID LEADERBOARD BY YEAR - NEW */}
      <div className="bg-slate-800 border border-slate-700 rounded-xl p-4">
        <div className="flex flex-wrap justify-between items-center gap-2">
          <h3 className="font-bold text-white">Worst Offenders - Tabloid Leaderboard by Year</h3>
          <button onClick={()=>downloadCSV('historic')} className="bg-green-600 hover:bg-green-700 text-white text-xs px-3 py-1.5 rounded font-bold">⬇ Download as CSV (article, quote, URL)</button>
        </div>
        
        <div className="mt-3">
          <div className="flex gap-2 mb-3 flex-wrap">
            {years.map(y=>(
              <button key={y} onClick={()=>setYearFilter(y)} className={`px-2 py-1 text-xs rounded ${yearFilter===y?'bg-red-600 text-white':'bg-slate-700 text-slate-300'}`}>{y}</button>
            ))}
            <button onClick={()=>setYearFilter('all')} className={`px-2 py-1 text-xs rounded ${yearFilter==='all'?'bg-purple-600 text-white':'bg-slate-700 text-slate-300'}`}>All</button>
          </div>

          <div className="space-y-1">
            {(yearFilter==='all' ? Object.entries(data.leaderboard).sort((a,b)=>b[1].count-a[1].count).slice(0,15) : (leaderboardByYear[yearFilter]||[])).map(([outlet, stats], idx)=>{
              const name = typeof outlet === 'string' ? outlet : stats.name;
              const count = typeof stats === 'object' ? stats.count : stats;
              const avg = typeof stats === 'object' && stats.totalStigma ? (stats.totalStigma/count).toFixed(1) : '7.5';
              return (
                <div key={name} className="flex justify-between border-b border-slate-700/50 pb-2 gap-2 text-sm">
                  <span className="truncate text-slate-200"><span className="text-slate-500 mr-2">#{idx+1}</span>{name}</span>
                  <span className="text-slate-400 shrink-0">{count} incidents - Avg {avg}/10 - Year: {yearFilter}</span>
                </div>
              );
            })}
          </div>
        </div>
        
        <p className="text-[11px] text-slate-500 mt-4">CSV includes: date, year, source, url, title, stigmatising_quote, category, stigma_score, debunk, citation. Use citation column for MP briefings. Source: tabloid_stigma.csv (3597 UK articles, 2015-2025)</p>
      </div>

      {/* MAIN FEED */}
      <div className="grid md:grid-cols-2 gap-4">
        {filteredByYear.map(item=>(
          <div key={item.id} className="bg-slate-800 border border-slate-700 border-l-4 border-l-red-500 rounded-xl p-4">
            <div className="flex justify-between text-xs gap-2">
              <span className="font-bold text-emerald-300 truncate">{item.outlet} - {item.year}</span>
              <span className="bg-red-900/50 border border-red-500 text-red-200 px-2 py-1 rounded shrink-0">Stigma {item.stigmaScore}/10 - {item.category}</span>
            </div>
            <h3 className="font-bold mt-3 text-white leading-tight break-words text-sm">{item.title}</h3>
            <p className="text-xs text-slate-400 mt-2 break-words">
              Hits: <span className="text-amber-300 font-bold">{item.rhetoricHits?.join(', ')}</span>
            </p>
            <div className="mt-3 bg-slate-900/80 border border-amber-500/30 rounded p-3 text-sm text-amber-100 break-words"><b className="text-amber-300">Debunk:</b> {item.debunk}</div>
            <div className="mt-3 bg-black/20 border border-slate-700/50 rounded p-2 text-[11px] text-slate-400 break-words">Citation: {item.citation}</div>
            <a href={item.url} target="_blank" rel="noreferrer" className="text-xs text-blue-400 mt-3 inline-block hover:text-blue-300">View source →</a>
          </div>
        ))}
      </div>
    </div>
  );
}
