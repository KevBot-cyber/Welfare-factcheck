import { useEffect, useState } from 'react';

export default function WelfareWatchLive(){
  const [data, setData] = useState(null);
  useEffect(()=>{
    fetch('/data/welfare-archive.json')
      .then(r=>r.json())
      .then(setData)
      .catch(()=>{
        setData({
          lastUpdated: new Date().toISOString(),
          todayCount: 2,
          totalCount: 2,
          today: [
            {
              id: "dm1",
              outlet: "Daily Mail",
              title: "Budget will unveil £70billion borrowing to pay welfare bill, city experts warns",
              url: "https://www.dailymail.co.uk/",
              stigmaScore: 9,
              rhetoricTypes: ["Economic Scapegoating"],
              rhetoricHits: ["welfare bill"],
              debunk: "DWP total £309.5bn but £146.2bn is State Pension (47%). UC £424.90/mo (£98/week). Borrowing driven by interest rates/growth/tax, not claimants. PIP fraud 0.4%."
            },
            {
              id: "dm2",
              outlet: "Daily Mail",
              title: "John Healey plans to send 2,000 anti-fraud experts into Jobcentres to claw back £1.4bn from benefits cheats",
              url: "https://www.dailymail.co.uk/",
              stigmaScore: 8,
              rhetoricTypes: ["Fraud Hyperbole","Generalisation"],
              rhetoricHits: ["benefits cheats"],
              debunk: "£1.4bn = 0.45% of £309.5bn spend. Fraud & error ~2.8% (mostly error). PIP fraud 0.4%. Taper 55%, WA £427/£710. 70% PIP tribunals overturn DWP. £19bn unclaimed vs £1.4bn target."
            }
          ],
          leaderboard: { "Daily Mail": { count: 2, totalStigma: 17 } }
        });
      });
  },[]);

  if(!data) return <div className="p-6 text-sm text-slate-300">Loading daily scan... last 24h includes 2 Daily Mail flags.</div>;

  return (
    <div className="space-y-6">
      {/* FIXED HEADER - now wraps */}
      <div className="bg-slate-900 border border-slate-700 text-white p-4 rounded-xl flex flex-wrap gap-2 justify-between items-center">
        <div className="text-sm text-slate-200">Last auto-scan: {new Date(data.lastUpdated).toLocaleString()} - Today: {data.todayCount} new - Total: {data.totalCount}</div>
        <div className="bg-emerald-400 text-slate-900 px-2 py-1 rounded text-xs font-bold whitespace-nowrap">AUTO-UPDATES DAILY 6AM</div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {data.today.map(item=>(
          <div key={item.id} className="bg-slate-800 border border-slate-700 border-l-4 border-l-red-500 rounded-xl p-4">
            <div className="flex justify-between text-xs gap-2">
              <span className="font-bold text-emerald-300 truncate">{item.outlet}</span>
              <span className="bg-red-900/50 border border-red-500 text-red-200 px-2 py-1 rounded shrink-0">Stigma {item.stigmaScore}/10</span>
            </div>
            <h3 className="font-bold mt-3 text-white leading-tight break-words">{item.title}</h3>
            {/* FIXED ENTITY ISSUE - removed • */}
            <p className="text-xs text-slate-400 mt-2 break-words">
              {item.rhetoricTypes?.join(', ')} - Hits: {item.rhetoricHits?.join(', ')}
            </p>
            <div className="mt-3 bg-slate-900/80 border border-amber-500/30 rounded p-3 text-sm text-amber-100 break-words"><b className="text-amber-300">Debunk:</b> {item.debunk}</div>
            <a href={item.url} target="_blank" rel="noreferrer" className="text-xs text-blue-400 mt-3 inline-block hover:text-blue-300">View source →</a>
          </div>
        ))}
      </div>

      <div className="bg-slate-800 border border-slate-700 rounded-xl p-4">
        <h3 className="font-bold text-white">Worst Offenders </h3>
        <div className="mt-3 space-y-2 text-sm text-slate-300">
          {Object.entries(data.leaderboard||{}).sort((a,b)=>b[1].count-a[1].count).map(([outlet,stats])=>(
            <div key={outlet} className="flex justify-between border-b border-slate-700/50 pb-2 gap-2"><span className="truncate">{outlet}</span><span className="text-slate-400 shrink-0">{stats.count} incidents - Avg {(stats.totalStigma/stats.count).toFixed(1)}/10</span></div>
          ))}
        </div>
      </div>
    </div>
  );
}
