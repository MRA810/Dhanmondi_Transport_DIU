import {useI,A} from '../utils'
import {COMMITTEE} from '../data'
const AV=<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="8" r="4"/><path d="M4 21c0-4.4 3.6-7 8-7s8 2.6 8 7z"/></svg>
export default function Committee(){
const{t,L}=useI()
return(<main id="comView"><section style={{minHeight:'60vh'}}><div className="wrap">
<p><a className="back" href="#home">{t('back')}</a></p><h2>{t('comH')}</h2><p className="lead">{t('comP')}</p><span className="sample">{t('comSample')}</span>
<div className="grid three">{COMMITTEE.map((m,i)=>{const nm=m.ph?t('memName'):L(m.name),rl=m.ph?t('memRole'):L(m.role)
return(<article key={i} className="card mem"><div className="av">{m.photo?<img src={A(m.photo)} alt={nm}/>:AV}</div><h3>{nm}</h3><p className="role">{rl}</p>
{m.phone&&<p><a href={'tel:'+m.phone}>{m.phone}</a></p>}{m.email&&<p><a href={'mailto:'+m.email}>{m.email}</a></p>}</article>)})}</div>
</div></section></main>)}
