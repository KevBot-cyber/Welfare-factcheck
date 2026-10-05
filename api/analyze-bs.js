  const handleAnalyzeText = async () => {
    if (!analyzerInput.trim()) return;
    setAnalyzing(true);
    setAnalysisResult(null);

    try {
      // 1. Run local evaluation engine
      let localResult = null;
      if (typeof evaluatePipAndFinancialClaims === 'function') {
        localResult = await evaluatePipAndFinancialClaims(analyzerInput);
      }

      // 2. Call Vercel serverless function (bypasses browser OAuth requirement & keeps API key private)
      const response = await fetch('/api/analyze-bs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          input: analyzerInput,
          localContext: localResult,
        }),
      });

      if (!response.ok) {
        throw new Error(`Server returned status ${response.status}`);
      }

      const parsed = await response.json();
      setAnalysisResult(parsed);
    } catch (e) {
      console.error("Evaluation error:", e);
      // Fallback to local evaluation on network/API failure
      if (typeof evaluatePipAndFinancialClaims === 'function') {
        try {
          const fallback = await evaluatePipAndFinancialClaims(analyzerInput);
          setAnalysisResult(fallback);
        } catch (err) {
          console.error("Fallback error:", err);
        }
      }
    } finally {
      setAnalyzing(false);
    }
  };
