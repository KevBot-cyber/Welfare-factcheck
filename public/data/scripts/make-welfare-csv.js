import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const inputDir = path.join(__dirname, '..', 'gdeltpreprocessed');
const outputPath = path.join(__dirname, '..', 'welfare-2025-10-26.csv');

const keywords = ["welfare","benefit","benefits","DWP","PIP","Universal Credit","workless","【entity-ESA¦canonical_name=ESA】","JSA","LHA"];

const files = fs.readdirSync(inputDir).filter(f => f.endsWith('.csv'));
console.log(`Checking ${files.length} files...`);

let out = "url,title,text\n";
let matched = 0;

for (const file of files) {
  const content = fs.readFileSync(path.join(inputDir, file), 'utf8');
  const lines = content.split('\n');
  for (let i=1; i<lines.length; i++) {
    const line = lines[i].toLowerCase();
    if (keywords.some(k => line.includes(k.toLowerCase()))) {
      out += lines[i] + "\n";
      matched++;
    }
  }
}

fs.writeFileSync(outputPath, out);
console.log(`Wrote ${matched} matching rows to welfare-2025-10-26.csv - ${Buffer.byteLength(out)/1024/1024} MB`);