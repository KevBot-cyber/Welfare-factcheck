import { GoogleGenAI } from '@google/genai';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { statement, localResult } = req.body || {};
    
    // Server-side environment variable check
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      console.error("Missing GEMINI_API_KEY on server.");
      return res.status(200).json(localResult || { verdict: 'Evaluated via Local Rules Engine' });
    }

    const ai = new GoogleGenAI({ apiKey });

    const prompt = `You are a UK welfare data analyst. Analyze this statement strictly using official DWP, ONS, and HMCTS statistics:
"${statement}"

Primary local evaluation context:
${JSON.stringify(localResult)}

Return a raw JSON object with these exact keys:
{
  "verdict": "Rating Label",
  "score": 85,
  "primaryRebuttal": "Specific statutory rebuttal based on DWP, ONS, or official UK statutory data",
  "sourceRef": "Official citation or reference string",
  "flags": ["Specific misleading point 1"]
}`;

    const response = await ai.models.generateContent({
      model: 'gemini-1.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
      },
    });

    const cleanedText = response.text.replace(/^```json\s*/i, '').replace(/```\s*$/i, '').trim();
    const resultJson = JSON.parse(cleanedText);

    return res.status(200).json(resultJson);
  } catch (error) {
    console.error("API route error:", error);
    return res.status(500).json({ error: "Failed to process evaluation" });
  }
}
