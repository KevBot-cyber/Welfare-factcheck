export interface EvaluationResult {
  score: number;
  flags: string[];
  primaryRebuttal: string;
  sourceRef: string;
  sourceLinks?: { label: string; url: string }[];
  analyzedBy: 'RuleEngine' | 'Gemini' | 'RuleEngineFallback';
  attribution?: string | null;
}
