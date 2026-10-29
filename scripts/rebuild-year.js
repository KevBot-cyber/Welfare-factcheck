const taxonomy = {
  Classic_DWP_Slurs: ["scroungers","scrounger","shirkers","shirker","skivers","skiver","workshy","benefit cheat","benefits cheat","benefits cheats","dole dosser","layabout"],
  Disability_Specific_Motability: ["free cars","free car","motability free car","motability cars","bmw on benefits","mercedes on disability","free cars for disabled"],
  Fake_Disability_Malingering: ["fake disability","faking disability","not really disabled","malingering","fit to work","pretend disability","playing the system","exaggerating disability"],
  Economic_Envy_Better_Off: ["benefits more than working","more on benefits than work","better off on benefits","better off on the dole","earn more on benefits","lifestyle choice","benefits lifestyle"],
  Free_Money_Handouts: ["free money","free cash","free handouts","handouts","something for nothing","money for nothing","freebie culture","taxpayer handouts"],
  Laziness_Moral_Failings: ["lazy","bone idle","feckless","feral","chav","workless","refuse to work","idle","benefits britain","underclass","drain on society","burden on taxpayers"],
  Dependency_Culture: ["dependency culture","culture of dependency","benefits culture","welfare dependency","welfare culture","entitlement culture","welfare trap","benefits trap"],
  Economic_Scapegoating_Bill: ["bloated welfare","welfare bill","benefits bill","out of control welfare","welfare out of control","welfare bill soars","benefits bill soars","unsustainable welfare","burden on economy"],
  Visual_Stereotypes_Media: ["benefits street","benefits britain","curtains closed","daytime tv","sky tv on benefits"],
  Mental_Health_Minimising: ["anxiety not real","depression excuse","mental health excuse","just anxious","snowflake generation","mental health card"],
  PIP_Assessment_Failings: ["fit for work","zero points","scored zero","PIP cheat","【entity-ESA¦canonical_name=esa】 cheat","work capability"]
};

import fs from 'fs';
const welfareTerms = ["welfare","benefits","benefit"," dwp "," pip "," universal credit"," 【entity-esa¦canonical_name=esa】 "," jobcentre"];
const stigmaTerms = Object.values(taxonomy).flat();
const folder = 'gdeltpreprocessed';
const files = fs.readdirSync(folder).filter(f=>f.endsWith('.csv'));

let allClean = [];
for(const file of files){
  const content = fs.readFileSync(`${folder}/${file}`,'utf8');
  const lines = content.split('\n');
  for(const line of lines){
    const low = line.toLowerCase();
    if(!welfareTerms.some(w=>low.includes(w))) continue;
    const hits = stigmaTerms.filter(t=>low.includes(t));
    if(hits.length===0) continue;
    const urlMatch = line.match(/https?:\/\/[^\s,"]+/);
    if(!urlMatch) continue;
    let source="unknown"; try{source=new URL(urlMatch[0]).hostname.replace('www.','');}catch{}
    allClean.push({date:file.slice(0,10), source, url:urlMatch[0], title:line.slice(0,200).replace(/"/g,'""'), hits:hits.slice(0,3).join('; '), score:hits.length>=2?8:6});
  }
}

console.log(`YEAR TOTAL: ${allClean.length} welfare stigma articles`);
const header="date,source,url,title,stigmatising_quote,stigma_score,citation\n";
const csv=header+allClean.map(r=>`"${r.date}","${r.source}","${r.url}","${r.title}","${r.hits}",${r.score},"${r.source}. Accessed 2026-10-27. ${r.url}"`).join('\n');
fs.writeFileSync('public/archive.csv', csv);
console.log(`Wrote public/archive.csv with ${allClean.length} rows - should be thousands`);