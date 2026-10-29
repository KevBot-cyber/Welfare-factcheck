export default async function handler(req, res){
  if(req.method !== 'GET' && req.method !== 'POST'){
    return res.status(405).json({error:"Method not allowed"});
  }
  // Security: optional simple token check ?token=YOUR_SECRET
  const expectedToken = process.env.SCAN_SECRET;
  if(expectedToken && req.query.token !== expectedToken){
    return res.status(401).json({error:"Unauthorized"});
  }

  const GUARDIAN_KEY = process.env.GUARDIAN_KEY;
  const GNEWS_KEY = process.env.GNEWS_KEY;

  const KEYWORDS = ["scrounger","workshy","benefits cheat","welfare bill","black hole","sick note","borrowing to pay welfare","handouts"];

  function detect(text){
    const lower=(text||"").toLowerCase();
    const hits=KEYWORDS.filter(k=>lower.includes(k));
    return {hits, score: Math.min(10, hits.length*2+2)};
  }

  let results = [];

  if(GUARDIAN_KEY){
    try{
      const today = new Date().toISOString().slice(0,10);
      const r = await fetch(`https://content.guardianapis.com/search?q=welfare%20OR%20benefits&from-date=${today}&page-size=10&api-key=${GUARDIAN_KEY}`);
      const j = await r.json();
      results.push(...(j.response?.results||[]).map(a=>({outlet:"Guardian", title:a.webTitle, url:a.webUrl, ...detect(a.webTitle)})));
    }catch{}
  }

  if(GNEWS_KEY){
    try{
      const r = await fetch(`https://gnews.io/api/v4/search?q=UK%20welfare%20benefits&lang=en&country=gb&max=10&apikey=${GNEWS_KEY}`);
      const j = await r.json();
      results.push(...(j.articles||[]).map(a=>({outlet:a.source?.name, title:a.title, url:a.url, ...detect(a.title+a.description)})));
    }catch{}
  }

  const flagged = results.filter(r=>r.hits.length>0);

  return res.status(200).json({lastUpdated:new Date().toISOString(), flagged, count:flagged.length});
}