import Fuse from 'fuse.js';

export interface FactCard {
  id: string;
  claim: string;
  verdict: 'False' | 'Misleading' | 'Context Needed' | 'Supported';
  summary: string;
  officialData: string;
  sourceUrl: string;
  category: string;
  tags: string[];
}

export interface SearchResult {
  item: FactCard;
  score?: number;
  matches?: readonly Fuse.FuseResultMatch[];
}

const fuseOptions: Fuse.IFuseOptions<FactCard> = {
  keys: [
    { name: 'claim', weight: 0.4 },
    { name: 'summary', weight: 0.3 },
    { name: 'tags', weight: 0.2 },
    { name: 'officialData', weight: 0.1 }
  ],
  threshold: 0.4, // Lowered threshold slightly for better precision
  includeScore: true,
  includeMatches: true,
  ignoreLocation: true,
  useExtendedSearch: true,
  minMatchCharLength: 2
};

const STOP_WORDS = new Set([
  'a', 'an', 'and', 'are', 'as', 'at', 'be', 'but', 'by', 'for', 'if', 'in',
  'into', 'is', 'it', 'no', 'not', 'of', 'on', 'or', 'such', 'that', 'the',
  'their', 'then', 'there', 'these', 'they', 'this', 'to', 'was', 'will', 'with'
]);

function extractKeywords(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^\w\s]/g, '')
    .split(/\s+/)
    .filter(word => word.length > 2 && !STOP_WORDS.has(word));
}

export class DebunkEngine {
  private fuse: Fuse<FactCard>;

  constructor(cards: FactCard[]) {
    this.fuse = new Fuse(cards, fuseOptions);
  }

  public setCards(cards: FactCard[]): void {
    this.fuse.setCollection(cards);
  }

  public analyzeText(inputQuery: string): SearchResult[] {
    const trimmed = inputQuery.trim();
    if (!trimmed) {
      return [];
    }

    const keywords = extractKeywords(trimmed);

    if (keywords.length === 0) {
      return this.fuse.search(trimmed);
    }

    // Pass space-separated extracted keywords or tokenized search string
    // exact match prefix (') can prevent fuzzy fallbacks if card text varies slightly
    const searchQuery = keywords.join(' ');

    const results = this.fuse.search(searchQuery);

    // Fallback to extended search OR query if direct keyword search yields no results
    if (results.length === 0) {
      const extendedQuery = keywords.map(token => token).join(' | ');
      return this.fuse.search(extendedQuery);
    }

    return results;
  }
}
