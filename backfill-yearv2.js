import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { parse } from 'csv-parse/sync';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();
dotenv.config({ path: '.env.local', override: false });

// 1. Load your NGrams CSV - this REPLACES the old GDELT API
const csvPath = path.join(__dirname, '..', 'welfare-2025-10-26.csv');
console.log(`Loading NGrams CSV from: ${csvPath}`);
const csvContent = fs.readFileSync(csvPath, 'utf8');
const tabloidArticles = parse(csvContent, { columns: true, skip_empty_lines: true });
console.log(`Loaded ${tabloidArticles.length} tabloid articles from NGrams (Telegraph, Mail, Sun, Times, Mirror, Express)`);

const tabloidFormatted = tabloidArticles.map(a => ({
  date: '2025-10-26',
  url: a.url,
  title: a.title,
  text: a.text,
  source: (() => { try { return new URL(a.url).hostname } catch { return 'gdelt'; } })(),
  type: 'tabloid_gdelt_ngrams'
}));

// 2. Your Guardian articles are already fetched above? 
// If your old file had a variable `guardianItems`, keep it.
// For now we merge what we have:
const archivePath = path.join(__dirname, '..', 'archive.json');
let existing = [];
if (fs.existsSync(archivePath)) {
  try { existing = JSON.parse(fs.readFileSync(archivePath, 'utf8')); } catch {}
}

const merged = [...existing, ...tabloidFormatted];
// Deduplicate by URL
const seen = new Set();
const deduped = merged.filter(it => {
  if (!it.url || seen.has(it.url)) return false;
  seen.add(it.url);
  return true;
});

fs.writeFileSync(archivePath, JSON.stringify(deduped, null, 2));
console.log(`Wrote ${deduped.length} total to archive.json`);