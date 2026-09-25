import React from 'react';
import {
  Scale,
  Landmark,
  Gavel,
  ShieldCheck,
  AlertTriangle,
  BookOpen
} from 'lucide-react';

export default function LegalAndStandards() {
  return (
    <div className="space-y-8">
      {/* Header & Mission Statement */}
      <div className="p-6 rounded-2xl border border-purple-800/40 bg-slate-900/80 space-y-3">
        <div className="flex items-center gap-2 text-purple-400 text-xs font-bold uppercase tracking-wider">
          <Scale className="w-4 h-4" />
          <span>Legal Framework & Editorial Standards</span>
        </div>
        <h2 className="text-2xl md:text-3xl font-black text-slate-100">
          Non-Partisan Standards, Legal Disclaimers & Fair Comment Statement
        </h2>
        <p className="text-sm text-slate-300 leading-relaxed max-w-4xl">
          This platform operates as an open-access, non-commercial public interest utility. Its sole purpose is to provide members of the public, advocates, researchers, and constitutional representatives with verifiable, primary-source data to address misinformation, inaccurate statistical framing, and harmful discourse surrounding UK social protection policy.
        </p>
      </div>

      {/* Defensive Legal Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* 1. Bi-Partisan Neutrality & Objective Methodology */}
        <div className="p-6 rounded-2xl border border-slate-800 bg-slate-900 space-y-3">
          <div className="flex items-center gap-2 text-teal-400 font-bold text-sm uppercase">
            <Landmark className="w-4 h-4" />
            <span>1. Non-Partisan & Empirical Neutrality</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            This platform is strictly non-partisan, independent, and unaffiliated with any political party, media conglomerate, or campaign apparatus.
          </p>
          <p className="text-xs text-slate-300 leading-relaxed">
            Claims, statistics, and media reports are evaluated strictly against raw primary datasets—including DWP Stat-Xplore, Office for National Statistics (ONS) labour market statistics, HMCTS tribunal outcomes, and Office for Budget Responsibility (OBR) publications. Evaluations apply identically across all political affiliations, broadcasting outlets, and news commentators without bias or selective enforcement.
          </p>
        </div>

        {/* 2. Protection Against Defamation & Public Interest Defense */}
        <div className="p-6 rounded-2xl border border-slate-800 bg-slate-900 space-y-3">
          <div className="flex items-center gap-2 text-purple-400 font-bold text-sm uppercase">
            <Gavel className="w-4 h-4" />
            <span>2. Public Interest & Honest Comment Defense</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            Public statements, broadcast media, press reports, and parliamentary commentary cited on this website are analyzed pursuant to public interest accountability and the principles of Honest Comment / Fair Comment under UK law (Defamation Act 2013, Section 3 and Section 4).
          </p>
          <p className="text-xs text-slate-300 leading-relaxed">
            All ratings, "BS Scores," and rebuttals reflect value judgments and analytical conclusions grounded in underlying, cited factual premises. Public figures, politicians, and media entities are evaluated solely in respect of their public statements and published media output.
          </p>
        </div>

        {/* 3. Anti-Discrimination & Harm Prevention Standard */}
        <div className="p-6 rounded-2xl border border-slate-800 bg-slate-900 space-y-3">
          <div className="flex items-center gap-2 text-amber-400 font-bold text-sm uppercase">
            <ShieldCheck className="w-4 h-4" />
            <span>3. Harm Prevention & Stigma Reduction</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            Inaccurate statistical framing, exaggerated fraud narratives, and discriminatory tropes targeting disabled, ill, or vulnerable populations contribute to societal stigma, mental health distress, and harassment.
          </p>
          <p className="text-xs text-slate-300 leading-relaxed">
            By providing clear, empirical context, this platform seeks to elevate public discourse, promote statutory literacy, and ensure debate surrounding welfare reform remains accurate, evidence-based, and respectful of human rights.
          </p>
        </div>

        {/* 4. Limitation of Liability & No Legal/Welfare Advice Notice */}
        <div className="p-6 rounded-2xl border border-slate-800 bg-slate-900 space-y-3">
          <div className="flex items-center gap-2 text-rose-400 font-bold text-sm uppercase">
            <AlertTriangle className="w-4 h-4" />
            <span>4. Disclaimer of Legal & Financial Advice</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            Information provided on this site—including calculated benefit rates, statutory guides, and automated evaluations—is for educational and informational purposes only. It does not constitute formal legal, financial, or welfare benefits advice.
          </p>
          <p className="text-xs text-slate-300 leading-relaxed">
            While every effort is made to maintain complete accuracy with official DWP and ONS schedules, users undergoing mandatory reconsiderations, appeals, or claims should consult qualified advice agencies such as Citizens Advice, Law Centres, or accredited welfare advisors.
          </p>
        </div>
      </div>

      {/* Primary Source Verification & Right of Reply / Correction Policy */}
      <div className="p-6 rounded-2xl border border-slate-800 bg-slate-900/90 space-y-4">
        <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-teal-400" />
          Corrections, Submissions & Right of Reply Policy
        </h3>
        <div className="text-xs text-slate-300 leading-relaxed space-y-2">
          <p>
            We are committed to absolute factual integrity. If an MP, media outlet, journalist, or public figure believes a quote, context, or statistical analysis on this platform is inaccurate, incomplete, or incorrectly attributed, we welcome formal notification.
          </p>
          <p>
            Submissions accompanied by primary official data or official transcripts (such as Hansard records or published correction notices) will be reviewed promptly, and corrections or updates will be issued transparently.
          </p>
        </div>
        <div className="pt-2 border-t border-slate-800">
          <span className="text-xs font-mono text-slate-400">
            Official Repository & Audit Trail: All scoring models and statutory datasets are open-source and cross-verified against UK Government datasets.
          </span>
        </div>
      </div>
    </div>
  );
}
