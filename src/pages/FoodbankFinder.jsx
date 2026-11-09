// COPY THIS FILE TO: Desktop/welfare-facts/src/pages/FoodbankFinder.jsx
// Foodbank Finder - page for welfarefacts.org.uk - Vite + React
// Data: Desktop/welfare-facts/public/foodbanks_national.json (copy from data/national_simple/)
import { useEffect, useMemo, useRef, useState } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import markerIcon from 'leaflet/dist/images/marker-icon.png'
import markerShadow from 'leaflet/dist/images/marker-shadow.png'
L.Marker.prototype.options.icon = L.icon({ iconUrl: markerIcon, shadowUrl: markerShadow, iconSize: [25,41], iconAnchor: [12,41] })

const DEMO = [
  { name:'Jacobs Well Foodbank', address:'Gosport', postcode:'PO12 4UZ', lat:50.795, lng:-1.124, phone:'02392583050', email:'', website:'', network:'Trussell', parliamentary_constituency:'Gosport', mp:'', party:'', access_type:'referral_required', opening_hours_text:'Mon 10-12, Wed 10-12', verification_badge:'Unverified - from Give Food', source:'givefood', status:'open' },
  { name:'Portsmouth Foodbank', address:'Portsmouth', postcode:'PO5 4QA', lat:50.819, lng:-1.088, phone:'02392987976', email:'', website:'', network:'Trussell', parliamentary_constituency:'Portsmouth South', mp:'', party:'', access_type:'referral_required', opening_hours_text:'', verification_badge:'Unverified - from Give Food', source:'givefood', status:'open' },
  { name:'Fareham Foodbank', address:'Fareham', postcode:'PO14 4PG', lat:50.853, lng:-1.181, phone:'07857811962', email:'', website:'', network:'Trussell', parliamentary_constituency:'Hamble Valley', mp:'', party:'', access_type:'referral_required', opening_hours_text:'', verification_badge:'Unverified - from Give Food', source:'givefood', status:'open' },
]
function hav(a,b,c,d){const R=6371,dl=(c-a)*Math.PI/180,dn=(d-b)*Math.PI/180,x=Math.sin(dl/2)**2+Math.cos(a*Math.PI/180)*Math.cos(c*Math.PI/180)*Math.sin(dn/2)**2;return 2*R*Math.asin(Math.sqrt(x))}
// Give Food's address often already ends with the postcode, e.g. "Petersfield Methodist Church GU32 3EB".
// Strip it from the address so the card/popup shows it once: "Petersfield Methodist Church GU32 3EB", not "… GU32 3EB GU32 3EB".
function cleanAddress(b){const addr=String(b.address||'');const pc=String(b.postcode||'').trim();if(!addr||!pc) return addr;const pattern=new RegExp(pc.replace(/[.*+?^${}()|[\]\\]/g,'\\$&').replace(/\s+/g,'\\s*'),'gi');return addr.replace(pattern,'').replace(/,(\s*,)+/g,',').replace(/\s{2,}/g,' ').replace(/[\s,]+$/,'').trim()}

export default function FoodbankFinder(){
  const [banks,setBanks]=useState(DEMO); const [isDemo,setIsDemo]=useState(true)
  const [postcode,setPostcode]=useState('PO12'); const [centre,setCentre]=useState({lat:54.5,lng:-2.5})
  const [query,setQuery]=useState(''); const [network,setNetwork]=useState('All'); const [verified,setVerified]=useState('All'); const [constituency,setConstituency]=useState('All')
  const mapRef=useRef(null); const leafletRef=useRef(null); const markersRef=useRef([])

  // Load real data: /public/foodbanks_national.json -> served as /foodbanks_national.json
  useEffect(()=>{ fetch('/foodbanks_national.json').then(r=>r.ok?r.json():null).then(j=>{ if(Array.isArray(j)&&j.length>10){ setBanks(j.map(r=>({...r,lat:parseFloat(r.lat),lng:parseFloat(r.lng)}))); setIsDemo(false)} }).catch(()=>{}) },[])
  const constituencies=useMemo(()=>['All',...new Set(banks.map(b=>b.parliamentary_constituency).filter(Boolean))].sort(),[banks])
  const filtered=useMemo(()=>{
    let out=[...banks]
    if(query) out=out.filter(b=>(b.name+' '+b.address+' '+b.postcode+' '+b.parliamentary_constituency).toLowerCase().includes(query.toLowerCase()))
    if(network!=='All') out=out.filter(b=>(b.network||'').toLowerCase().includes(network.toLowerCase()))
    if(verified==='Verified') out=out.filter(b=>b.source==='manual_verified'||(b.verification_badge||'').startsWith('Verified'))
    if(verified==='Unverified') out=out.filter(b=>!(b.source==='manual_verified'||(b.verification_badge||'').startsWith('Verified')))
    if(constituency!=='All') out=out.filter(b=>b.parliamentary_constituency===constituency)
    if(centre.lat!==54.5) out=out.map(b=>({...b,distance_km:hav(centre.lat,centre.lng,b.lat,b.lng)})).sort((a,b)=>a.distance_km-b.distance_km)
    return out
  },[banks,query,network,verified,constituency,centre])

  useEffect(()=>{ if(!leafletRef.current){ leafletRef.current=L.map(mapRef.current).setView([54.5,-2.5],6); L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{attribution:'&copy; OpenStreetMap contributors'}).addTo(leafletRef.current) } },[])
  useEffect(()=>{
    if(!leafletRef.current) return; markersRef.current.forEach(m=>m.remove()); markersRef.current=[]
    filtered.slice(0,200).forEach(b=>{
      const ver=b.source==='manual_verified'||(b.verification_badge||'').startsWith('Verified')
      const icon=L.divIcon({html:`<div style="background:${ver?'#0B6B4F':'#D97706'};color:#fff;width:28px;height:28px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:700;border:2px solid #fff">♥</div>`,iconSize:[28,28]})
      const m=L.marker([b.lat,b.lng],{icon}).addTo(leafletRef.current); m.bindPopup(`<b>${b.name}</b><br>${cleanAddress(b)} ${b.postcode}<br>${b.parliamentary_constituency||''}<br>Phone: ${b.phone||'—'}`); markersRef.current.push(m)
    })
    if(centre.lat!==54.5) leafletRef.current.setView([centre.lat,centre.lng],12)
  },[filtered,centre])

  async function searchPostcode(){
    const raw = postcode.trim().toUpperCase().replace(/\s+/g,' ')
    if(!raw) return alert('Type a postcode first — e.g. LS12 or LS12 1AA')
    // 1) Full postcode e.g. LS12 1AA, PO12 1AA -> /postcodes/{full}
    // 2) Outcode / partial e.g. LS12, PO12, LS1 -> /outcodes/{outcode} (centroid)
    // 3) Anything else -> /postcodes?q={text} autocomplete, take first result
    const isFull = /^[A-Z]{1,2}\d[A-Z\d]?\s*\d[A-Z]{2}$/.test(raw)
    const isOutcode = /^[A-Z]{1,2}\d[A-Z\d]?$/.test(raw)
    try{
      let lat, lng, label
      if(isFull){
        const r=await fetch(`https://api.postcodes.io/postcodes/${encodeURIComponent(raw)}`); const j=await r.json()
        if(!j.result) return alert(`Couldn't find "${raw}". Check it and try again — e.g. LS12 1AA`)
        lat=j.result.latitude; lng=j.result.longitude; label=j.result.postcode
      } else if(isOutcode){
        const r=await fetch(`https://api.postcodes.io/outcodes/${encodeURIComponent(raw)}`); const j=await r.json()
        if(!j.result) return alert(`Couldn't find "${raw}". Try a full postcode — e.g. ${raw} 1AA`)
        lat=j.result.latitude; lng=j.result.longitude; label=j.result.outcode
      } else {
        const r=await fetch(`https://api.postcodes.io/postcodes?q=${encodeURIComponent(raw)}`); const j=await r.json()
        if(!j.result || !j.result.length) return alert(`Couldn't find "${raw}". Try a postcode like LS12 or LS12 1AA`)
        lat=j.result[0].latitude; lng=j.result[0].longitude; label=j.result[0].postcode
      }
      setCentre({lat,lng})
    }catch{ alert('Could not look up postcode — check your connection and try again') }
  }
  return (
    <div style={{maxWidth:1200,margin:'0 auto',padding:16,fontFamily:'system-ui'}}>
      <div style={{background:'#FDECEC',color:'#991B1B',padding:12,borderRadius:8}}>If you need help now, call Citizens Advice or your council — don't wait for a food bank to open.</div>
      <h1>Find Help Near You — Foodbank Finder</h1>
      <p>For people who need food support — not for donors. Search by postcode, see nearest places, check whether you need a referral.</p>
      <p><b>{banks.length}</b> banks {isDemo?'(demo — add public/foodbanks_national.json)':''} • {banks.filter(b=>b.source==='manual_verified').length} verified</p>
      <section style={{background:'#FFFBEB',border:'2px solid #92400E',borderRadius:12,padding:16,margin:'12px 0',color:'#111827'}}>
        <h2 style={{margin:'0 0 8px',fontSize:20,color:'#111827'}}>⚠️ Before you travel — please read this first</h2>
        <p style={{margin:'0 0 8px',color:'#111827',lineHeight:1.6}}><b>Always phone before you travel.</b> Opening hours, days, and referral rules change often, and some food banks only open on certain days or run out of parcels. The information on this page is a starting point, not a guarantee the bank will be open when you arrive. A 2-minute phone call can save you a wasted journey, bus fare, and disappointment.</p>
        <p style={{margin:'0 0 8px',color:'#111827',lineHeight:1.6}}><b>Not all food banks work the same way.</b> Some require a <b>referral or voucher</b> first — for example, many Trussell food banks need you to be referred by Citizens Advice, your GP, your council, your child's school, a social worker, or another support worker, who will give you a voucher or e-referral. Some require a voucher but will help you get one on the day. Others are <b>walk-in</b> — you can just turn up, no voucher needed, especially many independent and community food banks. The card for each bank says what we know about its access type, but if it says "unknown", please phone and ask: "Do I need a referral or voucher, or can I just walk in?"</p>
        <p style={{margin:0,color:'#111827',lineHeight:1.6}}><b>Don't struggle because of pride — please ask for help.</b> Food banks exist for exactly this moment. No one there will judge you. Staff and volunteers help people from every walk of life — people in work, people between jobs, parents, carers, students, pensioners, people who never thought they'd need one. Needing food support is not a failure, and asking for help is not something to be ashamed of. If you're hungry, if you're skipping meals so your children can eat, if you're choosing between food and heating — that is what these places are for. Please use them.</p>
      </section>
      <div style={{display:'flex',gap:8,flexWrap:'wrap'}}><input value={postcode} onChange={e=>setPostcode(e.target.value)} placeholder="Any UK postcode — e.g. LS12 or LS12 1AA" style={{padding:10,flex:1,background:"#fff",color:"#111827",border:"1px solid #94A3B8",borderRadius:6}} /><button onClick={searchPostcode} style={{padding:'10px 16px',background:'#0B6B4F',color:'#fff',border:0,borderRadius:6}}>Find nearest 5</button><button onClick={()=>navigator.geolocation.getCurrentPosition(p=>setCentre({lat:p.coords.latitude,lng:p.coords.longitude}),()=>alert('Location denied'))} style={{padding:'10px 16px',background:'#fff',color:'#111827',border:'2px solid #111827',borderRadius:6,fontWeight:700}}>Use my location</button></div>
      <div style={{display:'flex',gap:8,flexWrap:'wrap',margin:'12px 0'}}><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search name, town, constituency…" style={{padding:10,flex:1,background:"#fff",color:"#111827",border:"1px solid #94A3B8",borderRadius:6}} /><select value={network} onChange={e=>setNetwork(e.target.value)} style={{padding:10,background:"#fff",color:"#111827",border:"1px solid #94A3B8",borderRadius:6}}><option style={{background:"#fff",color:"#111827"}}>All</option><option style={{background:"#fff",color:"#111827"}}>Trussell</option><option style={{background:"#fff",color:"#111827"}}>IFAN</option><option style={{background:"#fff",color:"#111827"}}>Independent</option></select><select value={verified} onChange={e=>setVerified(e.target.value)} style={{padding:10,background:"#fff",color:"#111827",border:"1px solid #94A3B8",borderRadius:6}}><option style={{background:"#fff",color:"#111827"}}>All</option><option style={{background:"#fff",color:"#111827"}}>Verified</option><option style={{background:"#fff",color:"#111827"}}>Unverified</option></select><select value={constituency} onChange={e=>setConstituency(e.target.value)} style={{padding:10,background:"#fff",color:"#111827",border:"1px solid #94A3B8",borderRadius:6}}>{constituencies.map(c=><option key={c} style={{background:"#fff",color:"#111827"}}>{c}</option>)}</select></div>
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:16}}><div><div ref={mapRef} style={{height:520,borderRadius:12,border:'1px solid #ddd'}} /><p style={{fontSize:13}}>Map: © OpenStreetMap. Showing first 200.</p></div>
      <div style={{maxHeight:520,overflowY:'auto',display:'flex',flexDirection:'column',gap:12}}>{filtered.slice(0,50).map((b,i)=>(<article key={b.name+i} style={{border:'1px solid #ddd',borderRadius:12,padding:12}}><h3 style={{margin:0}}>{b.name} {b.distance_km!==undefined&&<span>• {b.distance_km.toFixed(2)} km</span>}</h3><p>{cleanAddress(b)} {b.postcode} • {b.parliamentary_constituency} {b.mp?`• MP: ${b.mp}`:''}</p><p><b>{b.network}</b> • {b.verification_badge||'Unverified'} • Access: {b.access_type||'unknown'}</p><p>Hours: {b.opening_hours_text||'Unknown — please phone to check'}</p><div style={{display:'flex',gap:8,flexWrap:'wrap',marginTop:10}}>
            {b.phone&&<a href={`tel:${b.phone}`} style={{display:'inline-flex',alignItems:'center',gap:6,padding:'10px 14px',borderRadius:999,background:'#0B6B4F',color:'#fff',fontWeight:700,fontSize:14,textDecoration:'none',minHeight:44}}>📞 Call {b.phone}</a>}
            {b.website&&<a href={b.website} target="_blank" rel="noreferrer" style={{display:'inline-flex',alignItems:'center',gap:6,padding:'10px 14px',borderRadius:999,background:'#111827',color:'#fff',fontWeight:700,fontSize:14,textDecoration:'none',minHeight:44}}>🌐 Website ↗</a>}
            <a href={`https://www.google.com/maps/dir/?api=1&destination=${b.lat},${b.lng}`} target="_blank" rel="noreferrer" style={{display:'inline-flex',alignItems:'center',gap:6,padding:'10px 14px',borderRadius:999,background:'#fff',color:'#1D4ED8',fontWeight:700,fontSize:14,textDecoration:'none',border:'2px solid #1D4ED8',minHeight:44}}>📍 Directions ↗</a>
          </div></article>))}{filtered.length===0&&<p>No banks match those filters.</p>}</div></div>
      <p style={{fontSize:13,color:'#555'}}>Data: Give Food + manual phone checks. Always phone ahead — hours, referral rules and voucher requirements change. If a bank says it needs a referral, Citizens Advice (0800 144 8848 in England, or your local Citizens Advice) can usually refer you the same day.</p>
    </div>
  )
}
