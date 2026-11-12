import {useState} from 'react'
import {useI,A} from '../utils'
import {ROUTES,BUSES,EXAM_SLOTS,NOTICES,GALLERY,MAP_URL} from '../data'
import Dlg from './Dlg'

export function Exams(){
const{t,nf,fmtT}=useI(),[cat,setCat]=useState('all')
return(<section id="exams" style={{background:'var(--surface)'}}><div className="wrap">
<h2>{t('exH')}</h2><p className="lead">{t('exP')}</p><span className="sample">{t('sample')}</span>
<div className="chips" role="group" aria-label="Exam type">{[['all',t('exAll')],['mid',t('exMid')],['final',t('exFinal')]].map(([k,n])=><button key={k} type="button" className="chip" aria-pressed={cat===k} onClick={()=>setCat(k)}>{n}</button>)}</div>
<div className="exg">{['mid','final'].filter(k=>cat==='all'||cat===k).map(k=>(
<article key={k} className={'card exc'+(k==='final'?' fin':'')}><div className="exh"><h3>{t(k==='mid'?'exMidT':'exFinalT')}</h3><span className="tag">{t('sampleTag')}</span></div>
<ul className="exs">{EXAM_SLOTS[k].map((x,n)=><li key={n}><span>{t('slot')} {nf(n+1)}</span><b>{fmtT(x[0])} – {fmtT(x[1])}</b></li>)}</ul></article>))}</div>
</div></section>)}

export function Routes(){
const{t,L,fmtT,dayStr}=useI()
return(<section id="routes"><div className="wrap"><h2>{t('rtH')}</h2><p className="lead">{t('rtP')}</p>
<div className="grid">{ROUTES.map(r=>{const g={};BUSES.filter(b=>b.route===r.id).forEach(b=>{const k=dayStr(b.days);(g[k]=g[k]||[]).push(b.dep)})
return(<article key={r.id} className="card"><h3>{L(r.name)}</h3>
<ul className="stops">{r.stops.map((x,i)=><li key={i}>{L(x)}</li>)}</ul>
{Object.entries(g).map(([k,v])=><p key={k} className="meta">{k}: {v.sort().map(fmtT).join(', ')}</p>)}</article>)})}</div>
<a className="mapcta" href={MAP_URL} target="_blank" rel="noopener"><span className="mi" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s7-6.2 7-12a7 7 0 0 0-14 0c0 5.8 7 12 7 12z"/><circle cx="12" cy="10" r="2.6"/></svg></span>
<span className="mt"><strong>{t('mapH')}</strong><small>{t('mapP')}</small></span>
<span className="mb"><span>{t('mapBtn')}</span><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M7 17L17 7M8 7h9v9"/></svg></span></a>
</div></section>)}

const Pdf=({n})=>{const{t}=useI();return n.pdf?<><a className="btn" href={A(n.pdf)} target="_blank" rel="noopener">{t('pdfOpen')}</a><a className="btn g" href={A(n.pdf)} download>{t('pdfDl')}</a></>:<span className="nopdf">{t('noPdf')}</span>}

export function Notices(){
const{t,L,fmtD}=useI(),[cat,setCat]=useState('all'),[q,setQ]=useState(''),[all,setAll]=useState(false),[sel,setSel]=useState(null)
let list=NOTICES.filter(n=>(cat==='all'||n.cat===cat)&&(!q||(L(n.title)+L(n.body)).toLowerCase().includes(q.toLowerCase()))).sort((a,b)=>b.date.localeCompare(a.date))
const more=!all&&list.length>6;if(!all)list=list.slice(0,6)
const meta=n=>`${n.eff?t('effL')+': ':''}${fmtD(n.date)}`
return(<section id="notices" style={{background:'var(--surface)'}}><div className="wrap">
<h2>{t('notH')}</h2><p className="lead">{t('notP')}</p>
<div className="tools" style={{gridTemplateColumns:'1fr'}}><input type="search" value={q} onChange={e=>setQ(e.target.value)} placeholder={t('search')} aria-label="Search notices"/></div>
<div className="chips" role="group" aria-label="Categories">{['all',...Object.keys(t('cats'))].map(k=><button key={k} type="button" className="chip" aria-pressed={cat===k} onClick={()=>setCat(k)}>{k==='all'?t('all'):t('cats')[k]}</button>)}</div>
<div className="grid three">{!list.length&&<p className="empty">{t('none')}</p>}
{list.map(n=>(<article key={n.id} className={'card notice'+(n.level?' imp':'')}>
<span className={'badge'+(n.level==='urgent'?' u':'')}>{t('cats')[n.cat]}{n.level?' · '+t(n.level):''}</span>
<h3>{L(n.title)}</h3><div className="meta">{meta(n)}</div><p>{L(n.body)}</p>
<div className="row"><button className="btn o" type="button" onClick={()=>setSel(n)}>{t('viewMore')}</button><Pdf n={n}/></div></article>))}</div>
{more&&<p style={{marginTop:'1.2rem'}}><button className="btn o" onClick={()=>setAll(true)}>{t('viewAll')}</button></p>}
<Dlg open={!!sel} onClose={()=>setSel(null)}>{sel&&<><h3>{L(sel.title)}</h3><p className="meta" style={{margin:'.4rem 0 .8rem'}}>{t('cats')[sel.cat]} · {meta(sel)}</p><p>{L(sel.body)}</p>
<div className="row" style={{marginTop:'1.2rem'}}><Pdf n={sel}/><button className="btn o" type="button" onClick={()=>setSel(null)}>{t('close')}</button></div></>}</Dlg>
</div></section>)}

export function Gallery(){
const{t,L}=useI(),[mine,setMine]=useState([]),[i,setI]=useState(null)
const all=[...GALLERY.map(p=>({...p,src:A(p.src)})),...mine]
const add=e=>{const f=[...e.target.files].map(x=>({src:URL.createObjectURL(x),cap:{en:x.name,bn:x.name}}));setMine(m=>[...m,...f]);e.target.value=''}
return(<section id="gallery"><div className="wrap"><h2>{t('gH')}</h2><p className="lead">{t('gP')}</p>
<label className="btn g" htmlFor="gFile">{t('gAdd')}</label><input type="file" id="gFile" accept="image/*" multiple hidden onChange={add}/>
<p className="meta" style={{marginTop:'.5rem'}}>{t('gNote')}</p>
<div className="gal">{all.map((p,k)=><button key={p.src} type="button" style={{'--i':k}} aria-label={L(p.cap)} onClick={()=>setI(k)}><img src={p.src} alt={L(p.cap)} loading="lazy"/><figcaption>{L(p.cap)}</figcaption></button>)}</div>
<Dlg id="lb" open={i!==null} onClose={()=>setI(null)}>{i!==null&&all[i]&&<><img src={all[i].src} alt={L(all[i].cap)}/><p className="meta" style={{margin:'.6rem 0'}}>{L(all[i].cap)}</p>
<div className="row"><button className="btn o" type="button" aria-label="Previous" onClick={()=>setI((i+all.length-1)%all.length)}>‹</button><button className="btn o" type="button" aria-label="Next" onClick={()=>setI((i+1)%all.length)}>›</button><button className="btn" type="button" onClick={()=>setI(null)}>{t('close')}</button></div></>}</Dlg>
</div></section>)}

export function Uni(){
const{t}=useI()
return(<section id="uni" style={{background:'var(--surface)'}}><div className="wrap"><h2>{t('uniH')}</h2><div className="uni">
<div className="lg"><img src={A('logos/diu.png')} alt="Daffodil International University logo"/></div>
<div><p className="lead">{t('uniP')}</p><ul className="pl"><li>{t('uniName')}: Daffodil International University (DIU)</li><li>{t('uniNote')}</li></ul>
<div className="cta" style={{marginTop:'1rem'}}><a className="btn" href="https://daffodilvarsity.edu.bd/" target="_blank" rel="noopener">{t('uniSite')}</a></div></div></div></div></section>)}

export function About(){
const{t}=useI()
return(<section id="about"><div className="wrap"><h2>{t('abH')}</h2>
<div className="grid"><div className="card"><p>{t('ab1')}</p></div><div className="card"><p>{t('ab2')}</p></div></div>
<img className="strip" src={A('images/gallery-4.jpg')} alt={t('gPh')} loading="lazy"/></div></section>)}

export function Band(){
const{t}=useI()
return(<section id="meet" style={{background:'var(--surface)'}}><div className="wrap"><div className="band"><div><h2>{t('bandH')}</h2><p>{t('bandB')}</p></div><a className="btn g" href="#committee">{t('visitCom')}</a></div></div></section>)}
