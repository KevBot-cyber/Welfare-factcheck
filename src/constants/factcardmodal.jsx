import React, { useRef, useState } from 'react';
import { toPng } from 'html-to-image';
import { Share2, Download, Copy, Check } from 'lucide-react';

export default function FactCardModal({ isOpen, onClose, factData }) {
  const cardRef = useRef(null);
  const [generating, setGenerating] = useState(false);
  const [copiedText, setCopiedText] = useState(false);
  const [iosImageUri, setIosImageUri] = useState(null);

  if (!isOpen) return null;

  const handleAction = async (e) => {
    e.stopPropagation();
    
    if (!cardRef.current) {
      console.error("Card ref is null");
      return;
    }

    try {
      setGenerating(true);
      setIosImageUri(null);
      
      // Wait briefly for modal entrance animations to finish painting
      await new Promise(resolve => setTimeout(resolve, 150));
      
      // Generate PNG data URL with mobile-safe options
      const dataUrl = await toPng(cardRef.current, { 
        cacheBust: true,
        pixelRatio: 2,
        skipFonts: true,
      });

      const blob = await (await fetch(dataUrl)).blob();
      const file = new File([blob], 'welfare-fact-card.png', { type: 'image/png' });

      // Check if mobile native share supports files
      if (navigator.share && navigator.canShare && navigator.canShare({ files: [file] })) {
        try {
          await navigator.share({
            title: 'UK Welfare Truth Index Fact-Card',
            text: `Fact-Check: "${factData?.statement || ''}"\n\n#WelfareFacts`,
            files: [file],
          });
          setGenerating(false);
          return;
        } catch (shareErr) {
          if (shareErr.name === 'AbortError') {
            setGenerating(false);
            return;
          }
          console.warn('Native file share failed, falling back:', shareErr);
        }
      }

      // iOS Safari Fallback: Display preview inline to allow long-press save
      const isIOS = /iphone|ipad|ipod/i.test(navigator.userAgent);
      if (isIOS) {
        setIosImageUri(dataUrl);
      } else {
        // Standard programmatic download fallback (Desktop & Android Chrome)
        const link = document.createElement('a');
        link.download = `welfare-fact-card-${Date.now()}.png`;
        link.href = dataUrl;
        document.body.appendChild(link);
        link.click();
        link.remove();
      }

    } catch (error) {
      if (error.name !== 'AbortError') {
        console.error('Error generating or sharing image from fact card:', error);
        alert('Could not generate image on this mobile browser. Try using "Copy Text" instead.');
      }
    } finally {
      setGenerating(false);
    }
  };

  const handleCopyText = () => {
    const textToCopy = `[UK Welfare Truth Index] Fact-Check\n\nStatement: "${factData?.statement || ''}"\n\n✓ Fact: ${factData?.factCheck || factData?.correction || ''}\n\nSource: ${factData?.source || 'Official Statistics'}\nhttps://welfarefacts.org.uk`;
    navigator.clipboard.writeText(textToCopy);
    setCopiedText(true);
    setTimeout(() => setCopiedText(false), 2500);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <div 
        className="bg-slate-900 border border-purple-500/50 rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-2xl relative flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Close Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3 shrink-0">
          <span className="text-xs uppercase tracking-wider text-purple-400 font-semibold flex items-center gap-1.5">
            <Share2 className="w-3.5 h-3.5" /> Branded Shareable Fact Card
          </span>
          <button type="button" onClick={onClose} className="text-slate-400 hover:text-white text-lg p-1 cursor-pointer">✕</button>
        </div>

        {/* Scrollable Content Area */}
        <div className="overflow-y-auto space-y-4 my-auto pr-1">
          {iosImageUri ? (
            <div className="space-y-3 text-center">
              <div className="p-3 bg-purple-950/40 border border-purple-500/30 rounded-xl">
                <p className="text-xs text-purple-200 font-medium mb-2">
                  👇 Long-press the image below and select <strong className="text-white">"Add to Photos"</strong>:
                </p>
                <img 
                  src={iosImageUri} 
                  alt="Generated Fact Card" 
                  className="w-full rounded-lg border border-purple-500/40 shadow-md object-contain max-h-[40vh]" 
                />
              </div>
              <button 
                type="button"
                onClick={() => setIosImageUri(null)}
                className="text-xs text-purple-400 hover:text-purple-300 underline cursor-pointer font-medium"
              >
                ← Back to Edit View
              </button>
            </div>
          ) : (
            <div 
              ref={cardRef} 
              id="shareable-fact-card" 
              style={{ 
                backgroundColor: '#030712', 
                color: '#ffffff',
                borderColor: 'rgba(168, 85, 247, 0.4)',
                borderWidth: '1px',
                borderStyle: 'solid',
                padding: '24px',
                borderRadius: '12px',
                fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '11px', color: '#d8b4fe', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '16px' }}>
                <span>UK Welfare Truth Index</span>
                <span>2026 Verified</span>
              </div>

              <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#ffffff', marginBottom: '12px', lineHeight: '1.4' }}>
                Fact-Check: {factData?.politician || factData?.title || 'Statement'}
              </h3>
              
              <div style={{ backgroundColor: 'rgba(0, 0, 0, 0.4)', borderColor: 'rgba(51, 65, 85, 0.5)', borderWidth: '1px', borderStyle: 'solid', padding: '12px', borderRadius: '8px', color: '#e2e8f0', fontSize: '13px', marginBottom: '12px', lineHeight: '1.4' }}>
                &ldquo;{factData?.statement}&rdquo;
              </div>

              <div style={{ backgroundColor: 'rgba(59, 7, 100, 0.4)', borderColor: 'rgba(168, 85, 247, 0.3)', borderWidth: '1px', borderStyle: 'solid', padding: '12px', borderRadius: '8px', color: '#99f6e4', fontSize: '13px', marginBottom: '16px', lineHeight: '1.4' }}>
                ✓ Fact: {factData?.factCheck || factData?.correction}
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '11px', color: '#94a3b8', paddingTop: '12px', borderTop: '1px solid #1e293b' }}>
                <span>Source: {factData?.source || 'Official Statistics'}</span>
                <span style={{ color: '#c084fc' }}>welfarefacts.org.uk</span>
              </div>
            </div>
          )}
        </div>

        {/* Action Buttons Footer - Explicitly styled to avoid disappearing */}
        <div className="flex flex-wrap items-center justify-end gap-2.5 pt-3 border-t border-slate-800 shrink-0">
          <button 
            type="button"
            onClick={handleCopyText}
            className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold rounded-lg transition flex items-center gap-1.5 cursor-pointer"
          >
            {copiedText ? <Check className="w-3.5 h-3.5 text-teal-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copiedText ? 'Copied Text!' : 'Copy Text'}</span>
          </button>
          
          <button 
            type="button"
            onClick={handleAction}
            disabled={generating}
            className="px-4 py-2 bg-purple-600 hover:bg-purple-500 disabled:opacity-50 text-white text-xs font-bold rounded-lg transition shadow-lg flex items-center gap-1.5 cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>{generating ? 'Generating Image...' : 'Download Fact Card'}</span>
          </button>
        </div>

      </div>
    </div>
  );
}
