import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const input = path.join(__dirname, '..', 'welfare-2025-10-26.csv');
const output = path.join(__dirname, '..', 'public', 'archive.csv');

// Read as raw but properly handle quoted CSV
import { parse } from 'csv-parse/sync';
const content = fs.readFileSync(input, 'utf8');
let rows;
try { rows = parse(content, {columns:true, relax:true}); } 
catch { 
  // fallback for your broken file - read line by line and extract last URL
  console.log("Broken format detected, repairing...");
  rows = content.split('\n').slice(1).map(line => {
    const urlMatch = line.match(/(https?:\/\/[^\s|]+)/);
    return { url: urlMatch ? urlMatch[1] : "", title: line.slice(0,120), text: line, date: "2025-10-26" };
  }).filter(r=>r.url);
}

const header = "date,source,url,title,stigmatising_quote,stigma_score,citation\n";
const fixed = rows.map(r => {
  let domain = "unknown"; try { domain = new URL(r.url).hostname; } catch {}
  const quote = (r.text || "").slice(0,120).replace(/"/g,'""');
  const citation = `${domain}. ${r.title}. Accessed 2026-10-27. ${r.url}`;
  return `${r.date||"2025-10-26"},${domain},"${r.url}","${(r.title||"").replace(/"/g,'""')}","${quote}",0,"${citation}"`;
}).join('\n');

fs.mkdirSync(path.dirname(output), {recursive:true});
fs.writeFileSync(output, header+fixed);
console.log(`Fixed ${rows.length} rows -> public/archive.csv`);