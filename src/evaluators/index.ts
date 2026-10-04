import { evaluatePipAndFinancialClaims } from './ruleBasedEvaluator';
import { evaluateWithGemini } from './geminiEvaluator';
import { EvaluationResult } from '../types/evaluation';

export interface EvaluationOptions {
  /** Force the orchestrator to bypass local rules and run Gemini directly */
  forceAI?: boolean;
  /** Minimum score threshold from rule engine to skip AI evaluation (default: 80) */
  confidenceThreshold?: number;
}

/**
 * Main evaluation orchestrator that routes user input through a two-tier pipeline:
 * 1. Tier 1: Fast, deterministic local regex & heuristic engine ($0 cost, 0ms)
 * 2. Tier 2: LLM evaluation via Gemini 1.5 Flash for nuanced or unseen claims
 */
export async function analyzeClaim(
  rawInput: string,
  options: EvaluationOptions = {}
): Promise<EvaluationResult> {
  const threshold = options.confidenceThreshold ?? 80;

  // Trim and validate input early
  const sanitizedInput = rawInput.trim();
  if (!sanitizedInput) {
    return {
      score: 0,
      flags: ['EMPTY_INPUT: No claim text was provided for evaluation.'],
      primaryRebuttal: 'Please enter a claim or statement to fact-check.',
      sourceRef: 'N/A',
      analyzedBy: 'RuleEngine',
      attribution: null,
    };
  }

  // ---------------------------------------------------------------------------
  // Tier 1: Fast Rule-Based Local Evaluation
  // ---------------------------------------------------------------------------
  if (!options.forceAI) {
    const ruleResult = evaluatePipAndFinancialClaims(sanitizedInput);

    // If local rules hit a high-confidence match, return immediately
    if (ruleResult.flags.length > 0 && ruleResult.score >= threshold) {
      return {
        ...ruleResult,
        analyzedBy: 'RuleEngine',
        attribution: null,
      };
    }
  }

  // ---------------------------------------------------------------------------
  // Tier 2: Gemini AI Fallback Evaluation
  // ---------------------------------------------------------------------------
  try {
    return await evaluateWithGemini(sanitizedInput);
  } catch (error) {
    console.error('Gemini API call failed. Falling back to local rule engine:', error);

    // Fall back gracefully to local rule engine so the application never breaks
    const fallbackResult = evaluatePipAndFinancialClaims(sanitizedInput);
    return {
      ...fallbackResult,
      analyzedBy: 'RuleEngineFallback',
      attribution: null,
    };
  }
}
