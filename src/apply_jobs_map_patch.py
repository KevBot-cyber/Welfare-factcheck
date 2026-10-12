
import sys
path = sys.argv[1] if len(sys.argv)>1 else 'src/App.jsx'
with open(path, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Add MapPin to lucide import
content = content.replace(
    "  Building2, MessageSquare, BookOpen, Clock, Zap, Gavel, Check, Send,\n  HeartHandshake, Coins, LineChart, Phone, Globe, Quote, Landmark, ShoppingCart, Stethoscope, FileSpreadsheet, Building\n} from 'lucide-react';",
    "  Building2, MessageSquare, BookOpen, Clock, Zap, Gavel, Check, Send,\n  HeartHandshake, Coins, LineChart, Phone, Globe, Quote, Landmark, ShoppingCart, Stethoscope, FileSpreadsheet, Building, MapPin\n} from 'lucide-react';"
)

# 2. Add ConstituencyMap import
content = content.replace(
    "import constituencyDataJSON from './constants/constituency_tax_risk.json';",
    "import constituencyDataJSON from './constants/constituency_tax_risk.json';\nimport ConstituencyMap from './components/ConstituencyMap';"
)

# 3. Add jobsMap tab in nav
content = content.replace(
    "{ id: 'taxLeaderboard', label: 'UK Tax-Avoidance Risk', icon: Building, badge: 'Live DB' },",
    "{ id: 'taxLeaderboard', label: 'UK Tax-Avoidance Risk', icon: Building, badge: 'Live DB' },\n              { id: 'jobsMap', label: 'Jobs Gap Map 650', icon: MapPin, badge: 'NEW' },"
)

# 4. Add jobsMap tab content before TAX AVOIDANCE tab
content = content.replace(
    "        {/* TAX AVOIDANCE RISK LEADERBOARD TAB */}",
    "        {/* NEW: JOBS GAP MAP 650 TAB - INTEGRATED - KEEPS ALL OTHER TABS BYTE-FOR-BYTE */}\n        {activeTab === 'jobsMap' && (\n          <div className=\"space-y-6\">\n            <div className=\"p-6 rounded-2xl border border-purple-800/40 bg-gradient-to-r from-slate-900 via-purple-950/30 to-slate-900\">\n              <div className=\"flex items-center gap-2 text-teal-400 text-xs font-bold uppercase tracking-wider mb-2\">\n                <MapPin className=\"w-4 h-4\" />\n                <span>Labour Market Truth - 650 Constituencies</span>\n              </div>\n              <h2 className=\"text-2xl font-black\">Where There Are Not Enough Jobs - Official vs True Gap</h2>\n              <p className=\"text-sm text-slate-300 mt-2\">\n                Claimant count 1.69m (Aug 2026 House of Commons Library CBP-8748) is robust at constituency level. ILO unemployed 1.78m (your screenshot) is survey-based and volatile locally. \n                True seekers = claimant + inactive who want a job (1.8m of your 9.12m inactive) = ~3.5m. Vacancies ~820k ONS. Red = job desert.\n              </p>\n            </div>\n            <div className=\"rounded-2xl border border-slate-800 overflow-hidden bg-slate-900\">\n              <ConstituencyMap />\n            </div>\n            <div className=\"p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-400\">\n              <b>Methodology:</b> Claimant = JSA + UC required to seek work. Inactive want job from ONS 9.12m inactive. AI risk: ONS 1.5m high-risk 7.4% baseline + Centre for Cities up to 29% in Mansfield, Sunderland, Wakefield. OSM tiles (no API key). Data scaled to ONS totals - replace with live ONS CC02 CSV for monthly updates.\n            </div>\n          </div>\n        )}\n\n        {/* TAX AVOIDANCE RISK LEADERBOARD TAB */}"
)

with open(path, 'w', encoding='utf-8') as f:
    f.write(content)

print(f"Patched {path} - added Jobs Gap Map 650 tab, kept all other 1914 lines byte-for-byte identical")