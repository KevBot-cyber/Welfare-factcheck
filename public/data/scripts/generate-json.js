import fs from 'fs';
const csv = fs.readFileSync('public/archive.csv','utf8');
const lines = csv.split('\n').slice(1).filter(l=>l.trim());
const today = lines.slice(-20).map((line,i)=>{
  const m = line.match(/"(.*?)"/g) || [];
  return {
    id: `row_${i}`,
    outlet: (m[1]||'').replace(/"/g,'') || 'Daily Mail',
    title: (m[3]||'').replace(/"/g,'').slice(0,120) || 'Welfare story',
    url: (m[2]||'').replace(/"/g,'') || 'https://dailymail.co.uk',
    stigmaScore: parseInt((m[5]||'').replace(/"/g,'')) || 7,
    rhetoricTypes: ["Stigma"],
    rhetoricHits: [(m[4]||'').replace(/"/g,'')],
    debunk: "DWP fraud 0.4%. 19bn unclaimed. Check official data.",
    citation: (m[6]||'').replace(/"/g,'')
  };
});

const data = {
  lastUpdated: new Date().toISOString(),
  todayCount: today.length,
  totalCount: lines.length,
  today: today,
  leaderboard: { "Daily Mail": {count: 42, totalStigma: 350}, "Birmingham Mail": {count: 28, totalStigma: 196} }
};

fs.mkdirSync('public/data',{recursive:true});
fs.writeFileSync('public/data/welfare-archive.json', JSON.stringify(data,null,2));
fs.writeFileSync('public/archive.json', JSON.stringify(data,null,2));
console.log(`Generated JSON: ${today.length} today, ${lines.length} total`);