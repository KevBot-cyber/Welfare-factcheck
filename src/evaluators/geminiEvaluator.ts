import { GoogleGenAI, Type } from '@google/genai';
import { EvaluationResult } from '../types/evaluation';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const WELFARE_GROUND_TRUTH_SYSTEM_PROMPT = `
You are an expert UK social security fact-checker. Analyze input text for misleading claims, political rhetoric, or false information about PIP, Universal Credit, and UK welfare.

Grounding Rules:
- Statutory Benefit Cap: £25,323/yr (London) or £22,020/yr (Rest of UK). Claims above this without severe disability exemptions are false.
- UK Social Protection Spend: ~10-11% of GDP for over two decades (stable, not spiralling).
- PIP: Awarded on functional daily living/mobility points, NOT diagnosis alone.
- UC Taper: 55% taper rate + Work Allowances ensure work pays.
- Fraud vs Error: DWP overpayments total ~3.2%, but fraud is ~2.2%. Conflating overpayments or claimant count with fraud is misleading.

Evaluate the claim and return a score (0-100 where higher means higher BS/risk), flags, primaryRebuttal, and sourceRef.
`;

export async function evaluateWithGemini(rawInput: string): Promise<EvaluationResult> {
  const response = await ai.models.generateContent({
    model: 'gemini-1.5-flash',
    config: {
      systemInstruction: WELFARE_GROUND_TRUTH_SYSTEM_PROMPT,
      responseMimeType: 'application/json',
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          score: { type: Type.INTEGER },
          flags: { type: Type.ARRAY, items: { type: Type.STRING } },
          primaryRebuttal: { type: Type.STRING },
          sourceRef: { type: Type.STRING },
        },
        required: ['score', 'flags', 'primaryRebuttal', 'sourceRef'],
      },
    },
    contents: [rawInput],
  });

  const parsed = JSON.parse(response.text!);

  return {
    ...parsed,
    sourceLinks: [
      { label: "DWP Stat-Xplore Portal", url: "https://stat-xplore.dwp.gov.uk/" },
      { label: "IFS TaxLab: UK Welfare Spending", url: "https://ifs.org.uk/taxlab/taxlab-data-feed/uk-welfare-spending" }
    ],
    analyzedBy: 'Gemini',
    attribution: 'Powered by Google Gemini'
  };
}
