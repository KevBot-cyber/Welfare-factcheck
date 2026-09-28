// src/components/DeepDiveBreakdown.jsx
import React from 'react';

export default function DeepDiveBreakdown({ evaluationResult }) {
  if (!evaluationResult || !evaluationResult.sourceLinks) return null;

  return (
    <div className="mt-4 p-4 bg-slate-800/40 border border-slate-700/60 rounded-xl">
      <h4 className="text-sm font-semibold text-purple-300 mb-2 flex items-center gap-2">
        <span>📊 Deep-Dive Data & Open Access References</span>
      </h4>
      <p className="text-xs text-slate-300 mb-3">
        Verify the underlying primary metrics, historical caseloads, and statutory instruments used in this evaluation:
      </p>
      <div className="flex flex-col gap-2">
        {evaluationResult.sourceLinks.map((link, idx) => (
          <a
            key={idx}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-purple-400 hover:text-purple-300 bg-slate-900/60 hover:bg-slate-900 px-3 py-2 rounded-lg border border-purple-500/20 transition-all flex justify-between items-center"
          >
            <span>{link.label}</span>
            <span className="text-[10px] bg-purple-950 text-purple-300 px-2 py-0.5 rounded border border-purple-800">
              Official Source ↗
            </span>
          </a>
        ))}
      </div>
      
      {/* Optional Data Export Toolbar for Researchers/Campaigners */}
      <div className="mt-3 pt-3 border-t border-slate-700/50 flex justify-between items-center text-xs text-slate-400">
        <span>Export structured analysis package:</span>
        <div className="flex gap-2">
          <button 
            onClick={() => {
              const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(evaluationResult, null, 2));
              const downloadAnchor = document.createElement('a');
              downloadAnchor.setAttribute("href", dataStr);
              downloadAnchor.setAttribute("download", "factcheck_export.json");
              document.body.appendChild(downloadAnchor);
              downloadAnchor.click();
              downloadAnchor.remove();
            }}
            className="px-2.5 py-1 bg-slate-700 hover:bg-slate-600 text-slate-200 rounded text-[11px] transition"
          >
            JSON
          </button>
        </div>
      </div>
    </div>
  );
}
