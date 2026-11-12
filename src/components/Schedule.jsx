import {useState} from 'react'
import {useI,useNow,A} from '../utils'
import {ROUTES,BUSES,PDF_SCHEDULE} from '../data'
const DAYS=['sun','mon','tue','wed','thu','fri','sat']
function dhaka(now){const p=Object.fromEntries(new Intl.DateTimeFormat('en-US',{timeZone:'Asia/Dhaka',weekday:'short',hour:'2-digit',minute:'2-digit',hour12:false}).formatToParts(now).map(x=>[x.type,x.value]));return{day:p.weekday.toLowerCase().slice(0,3),min:(+p.hour%24)*60+ +p.minute}}
function nextBus(now){const n=dhaka(now),i0=DAYS.indexOf(n.day)
for(let d=0;d<8;d++){const k=DAYS[(i0+d)%7],c=BUSES.map((b,i)=>({b,i,m:+b.dep.slice(0,2)*60+ +b.dep.slice(3)})).filter(x=>x.b.days.includes(k)&&(d>0||x.m>n.min)).sort((a,c)=>a.m-c.m)[0]
if(c)return{i:c.i,bus:c.b,d,k,wait:d*1440+c.m-n.min}}return null}
export default function Schedule(){
const{t,L,nf,fmtT,dayStr,lang}=useI(),now=useNow()
const[q,setQ]=useState(''),[fr,setFr]=useState(''),[fd,setFd]=useState(''),[open,setOpen]=useState({})
const nb=nextBus(now),idx=id=>ROUTES.findIndex(x=>x.id===id)
const list=BUSES.map((b,i)=>({...b,i})).filter(b=>{const r=ROUTES.find(x=>x.id===b.route)
const hay=[r.name.en,r.name.bn,...r.stops.map(x=>x.en+' '+x.bn),b.dep].join(' ').toLowerCase()
return(!q||hay.includes(q.trim().toLowerCase()))&&(!fr||b.route===fr)&&(!fd||b.days.includes(fd))})
.sort((a,b)=>idx(a.route)-idx(b.route)||a.days.includes('fri')-b.days.includes('fri')||a.dep.localeCompare(b.dep))
let cd='',nr
if(nb){nr=ROUTES.find(x=>x.id===nb.bus.route);const h=Math.floor(nb.wait/60),m=nb.wait%60
cd=nb.d>0?t('dayN')[nb.k]:(lang==='bn'?nf(`${h?h+' ঘণ্টা ':''}${m} মিনিট পরে`):`in ${h?h+'h ':''}${m}m`)}
return(<section id="schedule"><div className="wrap">
<h2>{t('schH')}</h2><p className="lead">{t('schP')}</p>
<div className="sumrow"><span className="tag">{t('sumTag')}</span><a className="btn g" href={A(PDF_SCHEDULE)} target="_blank" rel="noopener" download>{t('dlSch')}</a></div>
{nb&&<div className="nextbar" aria-live="polite"><span className="lb">{t('nextBus')}</span><b>{fmtT(nb.bus.dep)}</b><span>{L(nr.name)}</span><span className="cd">{cd}</span></div>}
<div className="tools"><input type="search" value={q} onChange={e=>setQ(e.target.value)} placeholder={t('search')} aria-label="Search schedules"/>
<select value={fr} onChange={e=>setFr(e.target.value)} aria-label="Route"><option value="">{t('allRoutes')}</option>{ROUTES.map(r=><option key={r.id} value={r.id}>{L(r.name)}</option>)}</select>
<select value={fd} onChange={e=>setFd(e.target.value)} aria-label="Day"><option value="">{t('allDays')}</option>{Object.keys(t('dayN')).map(k=><option key={k} value={k}>{t('dayN')[k]}</option>)}</select></div>
<div className="slist">{!list.length&&<p className="empty">{t('none')}</p>}
{list.map((b,n)=>{const r=ROUTES.find(x=>x.id===b.route),f=fmtT(b.dep),sp=f.lastIndexOf(' '),o=!!open[b.i]
return(<article key={b.i+q+fr+fd} className={'sch'+(o?' open':'')+(nb&&nb.i===b.i?' isnext':'')} style={{'--i':n}}>
<button className="sh" type="button" aria-expanded={o} onClick={()=>setOpen(s=>({...s,[b.i]:!s[b.i]}))}>
<span className="tb"><b>{f.slice(0,sp)}</b><i>{f.slice(sp+1)}</i></span>
<span className="mid"><strong>{L(r.name)}<span className="nx">{t('nextL')}</span></strong><small>{L(r.from)} – {L(r.to)} · {dayStr(b.days)}</small></span><span className="chev"/></button>
<div className="sb"><div><div className="sbi"><div className="facts">
<div><span>{t('from')}</span><b>{L(r.from)}</b></div><div><span>{t('to')}</span><b>{L(r.to)}</b></div><div><span>{t('dep')}</span><b>{f}</b></div><div><span>{t('days')}</span><b>{dayStr(b.days)}</b></div></div>
<ol className="path">{r.stops.map((x,k)=><li key={k}><span className="p">{L(x)}</span></li>)}</ol></div></div></div></article>)})}</div>
</div></section>)}
