import React, { useState } from 'react';

// ==========================================
// 1. MP DIRECTORY & CONSTITUENCY DATABASE
// ==========================================
const constituencyDatabase = {
  "gosport": {
    constituency: "Gosport",
    mpName: "Dame Caroline Dinenage",
    address: "Constituency Office, St Vincent Campus, Milon Road, Gosport, PO12 4LH",
    party: "Conservative"
  },
  "fareham": {
    constituency: "Fareham and Waterlooville",
    mpName: "Suella Braverman",
    address: "Constituency Office, 147 West Street, Fareham, PO16 0DZ",
    party: "Conservative"
  },
  "portsmouth south": {
    constituency: "Portsmouth South",
    mpName: "Stephen Morgan",
    address: "Constituency Office, Ergon House, 157-193 Brunswick Road, Portsmouth, PO5 1DT",
    party: "Labour"
  }
};

export function lookupConstituency(query) {
  const cleanQuery = query.trim().toLowerCase();
  return constituencyDatabase[cleanQuery] || {
    constituency: query || "Local Constituency",
    mpName: "Your Local Member of Parliament",
    address: "House of Commons, London, SW1A 0AA",
    party: "Independent / Unknown"
  };
}

// ==========================================
// 2. MAIN REACT COMPONENT
// ==========================================
export default function MPBriefingPackModule() {
  const [townInput, setTownInput] = useState('Gosport');
  const [mpInfo, setMpInfo] = useState(lookupConstituency('Gosport'));
  
  const [constituentName, setConstituentName] = useState('');
  const [constituentAddress, setConstituentAddress] = useState('');
  const [personalNote, setPersonalNote] = useState('');

  // Fact section toggles (including new pipVouchers section)
  const [sections, setSections] = useState({
    pipRates: true,
    economicMultiplier: true,
    welfareGdp: true,
    fraudReality: true,
    hmctsOverturns: true,
    ucRates: true,
    carersCap: true,
    pipVouchers: true
  });

  const handleTownChange = (e) => {
    const val = e.target.value;
    setTownInput(val);
    setMpInfo(lookupConstituency(val));
  };

  const handleToggleSection = (key) => {
    setSections(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-4xl mx-auto p-6 font-sans">
      {/* Print isolation stylesheet injection */}
      <style dangerouslySetInnerHTML={{__html: `
        @media print {
          /* Hide non-printable UI elements and controls */
          .print\\:hidden, 
          button, 
          input, 
          textarea, 
          label, 
          nav, 
          header {
            display: none !important;
          }

          /* Force exact background colors and graphics */
          * {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }

          /* Isolate and display the printable letter container cleanly */
          #printable-letter-container {
            display: block !important;
            position: absolute !important;
            left: 0 !important;
            top: 0 !important;
            width: 100% !important;
            max-width: 100% !important;
            margin: 0 !important;
            padding: 15mm !important;
            background: white !important;
            color: black !important;
            box-shadow: none !important;
            border: none !important;
            z-index: 999999;
          }
        }
      `}} />

      {/* INTERACTIVE CONTROLS PANEL (Hidden on Print) */}
      <div className="bg-slate-900 text-white p-6 rounded-xl shadow-xl mb-8 space-y-6 print:hidden">
        <div>
          <h2 className="text-xl font-bold">MP Briefing Pack & Formal Correspondence Generator</h2>
          <p className="text-sm text-slate-400">
            Enter your location to auto-map your MP, select relevant fact indices, and print a fully formatted parliamentary briefing letter.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider mb-1 text-slate-300">
              Town / Constituency
            </label>
            <input 
              type="text" 
              value={townInput} 
              onChange={handleTownChange}
              placeholder="e.g. Gosport"
              className="w-full p-2.5 rounded bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-purple-500"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider mb-1 text-slate-300">
              Mapped MP (Auto-Resolved)
            </label>
            <input 
              type="text" 
              value={`${mpInfo.mpName} (${mpInfo.constituency})`} 
              readOnly
              className="w-full p-2.5 rounded bg-slate-800 border border-slate-700 text-slate-400 cursor-not-allowed"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider mb-1 text-slate-300">
              Your Full Name
            </label>
            <input 
              type="text" 
              value={constituentName} 
              onChange={(e) => setConstituentName(e.target.value)}
              placeholder="e.g. Kevin Mitchell"
              className="w-full p-2.5 rounded bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-purple-500"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider mb-1 text-slate-300">
              Your Postal Address / Postcode
            </label>
            <input 
              type="text" 
              value={constituentAddress} 
              onChange={(e) => setConstituentAddress(e.target.value)}
              placeholder="e.g. High Street, Gosport"
              className="w-full p-2.5 rounded bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-purple-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider mb-2 text-slate-300">
            Include Fact Sections in Letter & Briefing
          </label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
            {Object.keys(sections).map((key) => (
              <button
                key={key}
                type="button"
                onClick={() => handleToggleSection(key)}
                className={`p-2 rounded text-left border text-xs font-medium transition-colors ${
                  sections[key] 
                    ? 'bg-purple-900/50 border-purple-500 text-purple-200' 
                    : 'bg-slate-800 border-slate-700 text-slate-400'
                }`}
              >
                {sections[key] ? '✓ ' : '+ '} {key.replace(/([A-Z])/g, ' $1').toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider mb-1 text-slate-300">
            Optional Personal Constituent Note / Context
          </label>
          <textarea 
            value={personalNote}
            onChange={(e) => setPersonalNote(e.target.value)}
            rows={2}
            placeholder="Add a custom statement or local observation here..."
            className="w-full p-2.5 rounded bg-slate-800 border border-slate-700 text-white text-sm focus:outline-none focus:border-purple-500"
          />
        </div>

        <div className="flex justify-end gap-3 pt-2">
          <button 
            type="button"
            onClick={handlePrint}
            className="bg-purple-600 hover:bg-purple-500 text-white font-semibold px-6 py-2.5 rounded-lg shadow transition-colors flex items-center gap-2 cursor-pointer"
          >
            Print Formal Letter & Fact Sheet PDF
          </button>
        </div>
      </div>

      {/* ========================================== */}
      {/* 3. PRINTABLE LETTER & FACT SHEET LAYOUT    */}
      {/* ========================================== */}
      <div 
        id="printable-letter-container" 
        className="bg-white text-slate-900 p-8 rounded-xl shadow-lg border border-slate-200 font-serif text-sm leading-relaxed"
      >
        {/* Letterhead and Addresses */}
        <div className="flex justify-between items-start border-b pb-6 mb-6">
          <div>
            <p className="font-bold text-base">{constituentName || "[Your Full Name]"}</p>
            <p className="text-slate-600">{constituentAddress || "[Your Address / Postcode]"}</p>
            <p className="text-slate-600">{townInput ? `${townInput}, UK` : "[Town/Constituency]"}</p>
          </div>
          <div className="text-right">
            <p className="font-bold text-base">To: {mpInfo.mpName}</p>
            <p className="text-slate-600 font-semibold">{mpInfo.constituency} Constituency Office</p>
            <p className="text-slate-600 whitespace-pre-line text-xs mt-1">{mpInfo.address}</p>
            <p className="text-slate-500 text-xs mt-2">Date: {new Date().toLocaleDateString('en-GB')}</p>
          </div>
        </div>

        {/* Salutation */}
        <p className="mb-4 font-sans font-semibold">Dear {mpInfo.mpName},</p>

        {/* Opening Paragraph */}
        <p className="mb-4 text-justify">
          I am writing to you as your constituent in <strong>{townInput || "the local area"}</strong> to present verified primary-source evidence regarding welfare administrative metrics, tribunal statistics, and economic data. Given your parliamentary responsibilities, I trust you will find this briefing pack instructive when evaluating policy frameworks.
        </p>

        {personalNote && (
          <blockquote className="my-4 p-3 bg-slate-50 border-l-4 border-purple-700 italic text-slate-700 text-xs font-sans">
            "{personalNote}"
          </blockquote>
        )}

        {/* Section Header */}
        <h3 className="font-sans font-bold text-sm tracking-widest text-purple-900 uppercase border-b border-purple-200 pb-1 mt-6 mb-3">
          Enclosed Evidence Summary & Fact Sections
        </h3>

        {/* Fact Sections List */}
        <div className="space-y-3 font-sans text-xs">
          {sections.pipVouchers && (
            <div className="p-3 bg-slate-50 rounded border border-slate-200">
              <strong className="text-purple-900 block mb-0.5">Opposition to Proposed PIP Voucher & Catalogue Schemes:</strong>
              Proposals floated regarding replacing cash-based Personal Independence Payments with restricted-use vouchers, catalogues, or one-off grants would severely restrict disabled individuals' autonomy, choice, and flexibility in sourcing specialized treatments, bespoke therapies, and custom aids. Research and disability sector feedback indicate such schemes would push disabled people further into poverty by removing financial agility, risk creating administrative bottlenecks that cost significantly more to implement and maintain than standard cash payments, and open avenues for private contractors or corporate suppliers to exploit vulnerable consumers for profit. (Source: Disability Charities Consortium / Parliamentary Welfare Policy Research).
            </div>
          )}
          {sections.pipRates && (
            <div className="p-3 bg-slate-50 rounded border border-slate-200">
              <strong className="text-purple-900 block mb-0.5">PIP Payment Rates & Primary Thresholds:</strong>
              Department for Work and Pensions (DWP) administrative records show that statutory Personal Independence Payment (PIP) components cover basic daily living and mobility needs, yet indexation lags behind real-world inflation experienced by disabled households. (Source: DWP Benefit Statistics / ONS Consumer Price Inflation indices).
            </div>
          )}
          {sections.economicMultiplier && (
            <div className="p-3 bg-slate-50 rounded border border-slate-200">
              <strong className="text-purple-900 block mb-0.5">Economic Multiplier Effects:</strong>
              Economic analyses from fiscal research groups indicate that social protection expenditure has a high local velocity of money multiplier, directly supporting regional retail, supply chains, and small-to-medium enterprise ecosystems across constituencies like {townInput || "the local area"}. (Source: HM Treasury / Office for Budget Responsibility economic multipliers).
            </div>
          )}
          {sections.welfareGdp && (
            <div className="p-3 bg-slate-50 rounded border border-slate-200">
              <strong className="text-purple-900 block mb-0.5">Welfare % of GDP:</strong>
              Macroeconomic tracking reports position total UK social protection spending at roughly 11% to 12% of Gross Domestic Product, serving as a vital automatic stabilizer during periods of economic restructuring. (Source: Office for National Statistics / OBR Fiscal Outlook).
            </div>
          )}
          {sections.fraudReality && (
            <div className="p-3 bg-slate-50 rounded border border-slate-200">
              <strong className="text-purple-900 block mb-0.5">Fraud Rate Reality vs. Administrative Error:</strong>
              Official DWP fraud and error accountability statistics document that total overpayments comprise a mix of claimant error, official oversight, and deliberate fraud, with administrative complexity driving a significant proportion of non-fraudulent discrepancies. (Source: DWP Fraud and Error in the Benefit System Bulletin).
            </div>
          )}
          {sections.hmctsOverturns && (
            <div className="p-3 bg-slate-50 rounded border border-slate-200">
              <strong className="text-purple-900 block mb-0.5">&gt;70% HMCTS Tribunal Overturns:</strong>
              Ministry of Justice tribunal statistics consistently demonstrate that over 70% of appealed DWP disability benefit decisions are overturned at HM Courts & Tribunals Service (HMCTS) appeal hearings, evidencing systemic structural flaws in initial medical assessments. (Source: Ministry of Justice Tribunals Statistics Quarterly).
            </div>
          )}
          {sections.ucRates && (
            <div className="p-3 bg-slate-50 rounded border border-slate-200">
              <strong className="text-purple-900 block mb-0.5">Universal Credit Standard & Health Rates:</strong>
              Comparative poverty metrics from independent social research institutes illustrate that baseline Universal Credit standard allowances fall below the Minimum Income Standard required to afford essential household bills and nutrition. (Source: Joseph Rowntree Foundation / Department for Work and Pensions).
            </div>
          )}
          {sections.carersCap && (
            <div className="p-3 bg-slate-50 rounded border border-slate-200">
              <strong className="text-purple-900 block mb-0.5">Carer’s Allowance Earnings Caps:</strong>
              Departmental operational reports highlight that strict earnings threshold rules under Carer’s Allowance create severe cliff-edge disincentives, penalizing unpaid carers who take on marginal extra hours of employment. (Source: DWP Benefit Expenditure and Caseload Forecasts).
            </div>
          )}
        </div>

        {/* Closing Paragraph */}
        <p className="mt-6 text-justify">
          I urge you to examine these metrics closely and consider raising these accountability measures directly within parliamentary channels. I look forward to receiving your thoughts and feedback on these critical issues.
        </p>

        {/* Sign-off */}
        <div className="mt-8 font-sans">
          <p>Yours sincerely,</p>
          <p className="mt-6 font-bold text-base">{constituentName || "[Your Full Name]"}</p>
          <p className="text-xs text-slate-500">Constituent, {townInput || "Local Area"}</p>
        </div>
      </div>
    </div>
  );
}
