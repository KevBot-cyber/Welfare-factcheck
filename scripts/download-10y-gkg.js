import fs from 'fs';
import https from 'https';
import { execSync } from 'child_process';

const START = new Date('2015-02-19T00:00:00Z');
const END = new Date('2025-10-26T00:00:00Z');
const BASE = 'https://data.gdeltproject.org/gdeltv2/';
if(!fs.existsSync('gdeltpreprocessed')) fs.mkdirSync('gdeltpreprocessed');

function download(date){
  const p=n=>String(n).padStart(2,'0');
  const file=`${date.getFullYear()}${p(date.getMonth()+1)}${p(date.getDate())}${p(date.getHours())}${p(date.getMinutes())}00.gkg.csv.zip`;
  const dest=`gdeltpreprocessed/${file.replace('.zip','')}`;
  if(fs.existsSync(dest)) return Promise.resolve('skip');
  return new Promise(res=>{
    https.get(BASE+file, r=>{
      if(r.statusCode!==200){ r.resume(); return res('404'); }
      const out=fs.createWriteStream(dest+'.zip');
      r.pipe(out);
      out.on('finish',()=>{
        try{
          execSync(`powershell -command "Expand-Archive -Force '${dest}.zip' -DestinationPath 'gdeltpreprocessed'"`);
          fs.unlinkSync(dest+'.zip');
          res('ok');
        }catch{ res('ok'); }
      });
    }).on('error',()=>res('err'));
  });
}

let cur=new Date(START); let ok=0, skip=0;
while(cur<=END){
  const s=await download(cur);
  if(s==='ok') ok++; if(s==='skip') skip++;
  if((ok+skip)%100===0) console.log(`${cur.toISOString().slice(0,10)} ok:${ok} skip:${skip}`);
  cur.setMinutes(cur.getMinutes()+15);
  await new Promise(r=>setTimeout(r,100));
}
console.log('DONE');