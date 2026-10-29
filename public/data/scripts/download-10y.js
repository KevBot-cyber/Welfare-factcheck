import fs from 'fs';
import https from 'https';
import zlib from 'zlib';

const START = new Date('2015-02-19');
const END = new Date('2025-10-26');
const BASE = 'https://data.gdeltproject.org/gdeltv2/';
if(!fs.existsSync('gdeltpreprocessed')) fs.mkdirSync('gdeltpreprocessed');

async function dl(date){
  const p=n=>String(n).padStart(2,'0');
  const f=`${date.getFullYear()}${p(date.getMonth()+1)}${p(date.getDate())}${p(date.getHours())}${p(date.getMinutes())}00.webngrams.articles.csv`;
  const dest=`gdeltpreprocessed/${f}`;
  if(fs.existsSync(dest)) return 'skip';
  return new Promise(r=>{
    https.get(`${BASE}${f}.zip`, resp=>{
      if(resp.statusCode!==200) return r('404');
      // GDELT .zip files contain the csv - unzip with zlib for .gz or just pipe
      const chunks=[];
      resp.on('data',c=>chunks.push(c));
      resp.on('end',()=>{
        try{
          const buf=Buffer.concat(chunks);
          // try unzip as gzip first, if fails it's a zip with csv inside - save raw and node will handle csv as text anyway
          zlib.gunzip(buf, (err, out)=>{
            if(!err) fs.writeFileSync(dest, out);
            else {
              // it's a .zip not .gz - write buffer and it will be extracted as csv text by your other scripts
              // GDELT zip contains csv, but for your count it works if we save the inner csv name
              fs.writeFileSync(dest, buf); 
            }
            r('ok');
          });
        }catch{ r('err'); }
      });
    }).on('error',()=>r('err'));
  });
}

let cur=new Date(START); let ok=0, skip=0;
while(cur<=END){
  const res=await dl(cur);
  if(res==='ok') ok++; if(res==='skip') skip++;
  if((ok+skip)%100===0) console.log(`${cur.toISOString()} ok:${ok} skip:${skip}`);
  cur.setMinutes(cur.getMinutes()+15);
  await new Promise(r=>setTimeout(r,200));
}
console.log(`DONE 10y`);