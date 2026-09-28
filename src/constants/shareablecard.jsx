// src/components/ShareableCard.jsx
import React, { useRef, useState } from 'react';
import { Download, Copy, Check, Share2 } from 'lucide-react';
import { toPng } from 'html-to-image';

export default function ShareableCard({ evaluationResult }) {
  const cardRef = useRef(null);
  const [sharing, setSharing] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleDirectShare = async () => {
    if (!cardRef.current || sharing) return;

    try {
      setSharing(true);

      // Generate the high-resolution PNG data URL with mobile safety flags
      const dataUrl = await toPng(cardRef.current, { 
        cacheBust: true,
        pixelRatio: 2,
        skipFonts: true, // Prevents iOS Webkit foreignObject font-fetching locks
      });

      // Convert dataUrl to a Blob and then a File object
      const res = await fetch(dataUrl);
      const blob = await res.blob();
      const file = new File([blob], `welfare-factcheck-${Date.now()}.png`, { type: 'image/png' });

      // Check if standard Web Share API with files is supported (Android/supported mobile browsers)
      if (navigator.share && navigator.canShare && navigator.canShare({ files: [file] })) {
        try {
          await navigator.share({
            title: 'UK Welfare Truth Index Fact-Check',
            text: `Fact-Check: "${evaluationResult.detectedClaims?.[0] || evaluationResult.inputStatement}"\n\nVerdict: ${evaluationResult.verdict}\n\n#WelfareFacts`,
            files: [file],
          });
          setSharing(false);
          return;
        } catch (shareErr) {
          if (shareErr.name === 'AbortError') {
            setSharing(false);
            return; // User cancelled share sheet
          }
        }
      }

      // iOS Safari fallback: link.click() is blocked for data URLs on iOS.
      // Open the image directly in a new tab so the user can long-press to save to Photos.
      const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
      if (isIOS) {
        const opened = window.open(dataUrl, '_blank');
        if (!opened) {
          alert('Popup blocked! Please allow popups to view and save your fact card image, or use "Copy Text" instead.');
        }
      } else {
        // Standard Desktop / Android download fallback
        const link = document.createElement('a');
        link.download = `welfare-facts-factcheck-${Date.now()}.png`;
        link.href = dataUrl;
        document.body.appendChild(link);
        link.click();
        link.remove();
      }
    } catch (err) {
      if (err.name !== 'AbortError') {
        console.error('Failed to share or generate card image:', err);
        alert('Could not process image sharing. Please try copying the text instead.');
      }
    } finally {
      setSharing(false);
    }
  };

  const handleCopyText = () => {
    const claim = evaluationResult.detectedClaims?.[0] || evaluationResult.inputStatement;
    const textToCopy = `[UK Welfare Truth Index] Fact-Check\n\nStatement: "${claim}"\n\nVerdict: ${evaluationResult.verdict}\n\nFact: ${evaluationResult.primaryRebuttal}\n\nSource: ${evaluationResult.sourceRef}\nhttps://welfarefacts.org.uk`;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!evaluationResult) return null;

  return (
    <div className="mt-6 flex flex-col items-center space-y-4 w-full px-2 sm:px-0">
      {/* Exportable Graphic Container (Safe Hex styling for html-to-image) */}
      <div 
        ref={cardRef} 
        style={{ backgroundColor: '#0f172a', borderColor: 'rgba(168, 85, 247, 0.3)' }}
        className="w-full max-w-md border rounded-xl p-6 text-white shadow-2xl relative overflow-hidden box-border"
      >
        <div className="absolute top-0 right-0 bg-purple-600 text-[10px] px-3 py-1 rounded-bl-xl font-bold tracking-wider">
          WELFAREFACTS.ORG.UK
        </div>
        <div className="text-xs uppercase tracking-widest text-purple-400 font-semibold mb-2">
          Automated Fact-Check Verdict
        </div>
        <div className="text-lg font-bold text-red-400 mb-3">
          {evaluationResult.verdict}
        </div>
        <blockquote className="italic text-sm text-slate-300 border-l-2 border-purple-500 pl-3 mb-4">
          {evaluationResult.detectedClaims?.[0] || evaluationResult.inputStatement}
        </blockquote>
        <p 
          style={{ backgroundColor: 'rgba(30, 41, 59, 0.6)', borderColor: 'rgba(51, 65, 85, 0.5)' }}
          className="text-xs text-slate-200 leading-relaxed p-3 rounded-lg border mb-3"
        >
          {evaluationResult.primaryRebuttal}
        </p>
        <div className="flex justify-between items-center text-[10px] text-slate-400 border-t border-slate-800 pt-3">
          <span>Source: {evaluationResult.sourceRef}</span>
          <span className="text-purple-400 font-semibold">#WelfareFacts</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full max-w-md pb-4">
        <button 
          type="button"
          onClick={handleCopyText}
          className="w-full sm:flex-1 px-3.5 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-lg transition-all shadow-md flex items-center justify-center gap-1.5 border border-slate-700 cursor-pointer"
        >
          {copied ? <Check className="w-4 h-4 text-teal-400" /> : <Copy className="w-4 h-4 text-purple-400" />}
          <span>{copied ? 'Copied Text!' : 'Copy Text'}</span>
        </button>

        <button 
          type="button"
          onClick={handleDirectShare}
          disabled={sharing}
          className="w-full sm:flex-1 px-4 py-2.5 bg-teal-500 hover:bg-teal-400 text-slate-950 text-xs font-bold rounded-lg transition-all shadow-md flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
        >
          <Share2 className="w-4 h-4" />
          <span>{sharing ? 'Preparing...' : 'Share Fact Card'}</span>
        </button>
      </div>
    </div>
  );
}
