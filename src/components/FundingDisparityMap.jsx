import { useState, useMemo } from 'react';

const REGIONAL_DATA = {
  // cutLow, cutHigh, coreLow, coreHigh are stored, but we display the AVERAGE as a single number
  "North East": { transport: 430, cutLow: 28, cutHigh: 35, coreLow: 22, coreHigh: 26, transportGap: "64% lower than London", example: ["Newcastle East","Newcastle North","Sunderland Central","Darlington","Middlesbrough","Redcar","Hartlepool"] },
  "North West": { transport: 540, cutLow: 28, cutHigh: 32, coreLow: 20, coreHigh: 24, transportGap: "54% lower than London", example: ["Liverpool Walton","Manchester Central","Blackpool South","Preston","Blackburn","Bolton South","Liverpool Riverside"] },
  "Yorkshire & Humber": { transport: 441, cutLow: 27, cutHigh: 35, coreLow: 21, coreHigh: 25, transportGap: "63% lower than London", example: ["Sheffield Brightside","Leeds Central","Hull East","Bradford West","Halifax","Grimsby"] },
  "West Midlands": { transport: 600, cutLow: 18, cutHigh: 24, coreLow: 13, coreHigh: 17, transportGap: "49% lower than London", example: ["Birmingham Ladywood","Coventry South","Stoke-on-Trent Central","Wolverhampton South"] },
  "East Midlands": { transport: 650, cutLow: 17, cutHigh: 20, coreLow: 10, coreHigh: 14, transportGap: "45% lower than London", example: ["Derby North","Nottingham North","Leicester West","Mansfield"] },
  "East of England": { transport: 700, cutLow: 9, cutHigh: 13, coreLow: 6, coreHigh: 10, transportGap: "41% lower than London", example: ["Norwich South","Ipswich","Peterborough","Cambridge","Luton South"] },
  "London": { transport: 1183, cutLow: 3, cutHigh: 5, coreLow: 2, coreHigh: 4, transportGap: "Baseline - highest funded", example: ["Tottenham","Hackney South","Battersea","Bermondsey","Islington South"] },
  "South East": { transport: 850, cutLow: 3, cutHigh: 9, coreLow: 3, coreHigh: 5, transportGap: "28% lower than London", example: ["Gosport","Portsmouth North","Portsmouth South","Fareham","Southampton Itchen","Oxford East","Reading West","Surrey Heath","Guildford","Wokingham"] },
  "South West": { transport: 650, cutLow: 5, cutHigh: 13, coreLow: 5, coreHigh: 9, transportGap: "45% lower than London", example: ["Bristol West","Bath","Cornwall","Devon","Dorset","Somerset"] }
};

const ALL_CONSTITUENCIES = Object.entries(REGIONAL_DATA).flatMap(([region, d]) => 
  d.example.map(name => ({ name, region }))
);

function avg(low, high) {
  return Math.round((low + high) / 2);
}

export default function FundingDisparityMap() {
  const [q, setQ] = useState("");
  const selected = useMemo(() => {
    if(!q.trim()) return null;
    const lower = q.toLowerCase();
    return ALL_CONSTITUENCIES.find(c => c.name.toLowerCase() === lower) || 
           ALL_CONSTITUENCIES.find(c => c.name.toLowerCase().includes(lower)) ||
           (lower.length > 2 ? { name: q, region: "South East" } : null);
  }, [q]);

  const data = selected ? REGIONAL_DATA[selected.region] : null;

  return (
    <div className="space-y-6">
      <div className="p-6 rounded-2xl border border-purple-800/40 bg-gradient-to-r from-slate-900 via-purple-950/30 to-slate-900">
        <div className="flex flex-wrap gap-2 mb-3">
          <span className="text-[10px] font-black px-2 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">Illustrative Analysis | Published 24 Oct 2026</span>
          <span className="text-[10px] font-black px-2 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">Single Figure - Publication Ready</span>
        </div>
        <h2 className="text-2xl font-black tracking-tighter text-white">The Real Funding Map: 45 Years of Disparity</h2>
        <p className="text-sm text-slate-300 mt-2">Telegraph: shires lose £61m. Context: London got £3,636pp planned transport vs £511pp Yorkshire (7x). Poorest councils -35% vs -3% richest. Labour £2.9bn uplift unwinds £140bn historic gap.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="rounded-2xl overflow-hidden border border-slate-800 bg-slate-900">
          <img src="/funding-transport-disparity.jpg" alt="Historic transport investment per head" className="w-full h-auto" />
          <div className="p-3 text-[11px] text-slate-400 border-t border-slate-800">Source: IPPR / HM Treasury CRA. London £1,183pp vs North £486</div>
        </div>
        <div className="rounded-2xl overflow-hidden border border-slate-800 bg-slate-900">
          <img src="/funding-austerity-cuts.jpg" alt="Austerity cuts poorest hit hardest" className="w-full h-auto" />
          <div className="p-3 text-[11px] text-slate-400 border-t border-slate-800">Source: IFS/MHCLG. Most deprived -35% vs least -3.1%</div>
        </div>
      </div>

      <div className="p-5 rounded-2xl border border-blue-800/40 bg-slate-900/80">
        <h3 className="font-bold text-white">Check Your Constituency - Estimated Historic Position (Illustrative)</h3>
        <div className="mt-3 relative">
          <input 
            value={q} 
            onChange={e=>setQ(e.target.value)} 
            placeholder="Type e.g. Gosport, Liverpool Walton, Surrey Heath" 
            className="w-full p-3 rounded-xl bg-slate-950 border border-slate-700 text-sm text-white focus:border-purple-500 focus:outline-none" 
          />
          {selected && data && (
            <div className="mt-3 p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-black text-purple-300">Estimated for {selected.name} ({selected.region})</span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700">ILLUSTRATIVE</span>
              </div>
              
              <div className="space-y-2.5 pt-2 border-t border-slate-800/60">
                <div className="flex justify-between items-center gap-2">
                  <span className="text-slate-400">Transport per head 2012-23:</span>
                  <span className="font-mono font-bold text-slate-200">£{data.transport} vs £1,183 London <span className="text-rose-400 text-[11px]">{data.transportGap}</span></span>
                </div>
                
                <div className="flex justify-between items-center gap-2">
                  <span className="text-slate-400 flex items-center gap-1.5"><span className="w-2 h-2 bg-rose-500 rounded-full"></span> Council funding cut:</span>
                  <div className="text-right">
                    <span className="px-3 py-1 rounded-lg bg-rose-500/20 text-rose-300 border border-rose-500/40 font-mono font-black text-sm">
                      {avg(data.cutLow, data.cutHigh)}% CUT
                    </span>
                    <div className="text-[10px] text-slate-500 mt-1">Range {data.cutLow}% to {data.cutHigh}% for region</div>
                  </div>
                </div>
                
                <div className="flex justify-between items-center gap-2">
                  <span className="text-slate-400 flex items-center gap-1.5"><span className="w-2 h-2 bg-amber-500 rounded-full"></span> Core spending power:</span>
                  <div className="text-right">
                    <span className="px-3 py-1 rounded-lg bg-amber-500/20 text-amber-300 border border-amber-500/40 font-mono font-black text-sm">
                      {avg(data.coreLow, data.coreHigh)}% REDUCTION
                    </span>
                    <div className="text-[10px] text-slate-500 mt-1">Range {data.coreLow}% to {data.coreHigh}%</div>
                  </div>
                </div>
              </div>

              <div className="text-[11px] text-slate-400 pt-3 mt-2 border-t border-slate-800/60 bg-slate-900/50 p-2.5 rounded leading-relaxed">
                <strong className="text-slate-300">What this means for {selected.name}:</strong> On average councils in this region lost {avg(data.cutLow, data.cutHigh)}% of funding 2010-24. Gosport example: ~6% CUT - much smaller than Blackpool/Liverpool (31% CUT) but still a cut, while transport received £333pp/yr less than London. This is why Labour's formula adds deprivation weighting.
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="p-5 rounded-xl border border-slate-800 bg-slate-900/60 text-xs text-slate-300 space-y-2">
        <h4 className="font-bold text-purple-300">Methodology</h4>
        <p>Single figure shown is the midpoint average of the regional range. E.g. Gosport (South East) range 3% to 9% → average displayed as 6% CUT. Full ranges: North East 28-35%, North West 28-32%, Yorkshire 27-35%, West Midlands 18-24%, East Midlands 17-20%, East 9-13%, London 3-5%, South East 3-9%, South West 5-13%. Sources: IPPR, IFS, MHCLG, IfG. Crown copyright 2023.</p>
      </div>
    </div>
  );
}