import {useState} from 'react'
import {useI} from '../utils'
import {COMPLAIN_ENDPOINT,COMPLAIN_EMAIL} from '../data'
const sv={fill:'none',stroke:'currentColor',strokeLinecap:'round',strokeLinejoin:'round','aria-hidden':'true'}
const Tick=()=><svg viewBox="0 0 24 24" {...sv} strokeWidth="3.2"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>
const Arrow=()=><svg viewBox="0 0 24 24" {...sv} strokeWidth="2.4"><path d="M7 17L17 7M8 7h9v9"/></svg>
const DEPTS=['CSE','SWE','EEE','ETE','BBA','Civil Engineering','Architecture','English','Law','Pharmacy','Textile Engineering','Public Health','Journalism & Media','Multimedia & Creative Technology']
export default function Complain(){
const{t,nf}=useI(),[msg,setMsg]=useState(''),[st,setSt]=useState({key:'',kind:''}),[busy,setBusy]=useState(false)
const submit=async e=>{e.preventDefault();const f=e.currentTarget,d=Object.fromEntries(new FormData(f));if(d.website)return;delete d.website;d.submittedAt=new Date().toISOString()
if(COMPLAIN_ENDPOINT){setBusy(true);setSt({key:'cbSending',kind:''})
try{const r=await fetch(COMPLAIN_ENDPOINT,{method:'POST',headers:{'Content-Type':'application/json',Accept:'application/json'},body:JSON.stringify(d)});if(!r.ok)throw new Error(r.status);f.reset();setMsg('');setSt({key:'cbOk',kind:'ok'})}
catch{setSt({key:'cbErr',kind:'err'})}finally{setBusy(false)}}
else if(COMPLAIN_EMAIL){const body=`Student ID: ${d.studentId}\nDepartment: ${d.department}\nType: ${d.type}\n\n${d.message}`
location.href=`mailto:${COMPLAIN_EMAIL}?subject=${encodeURIComponent('Transport '+d.type+' - '+d.studentId)}&body=${encodeURIComponent(body)}`;setSt({key:'cbMail',kind:'ok'})}
else setSt({key:'cbPreview',kind:''})}
return(<section id="complain"><div className="wrap"><h2>{t('cbH')}</h2><p className="lead">{t('cbP')}</p>
<div className="cb"><aside className="cbi"><span className="cbic" aria-hidden="true"><svg viewBox="0 0 24 24" {...sv} strokeWidth="2"><path d="M21 12a8 8 0 0 1-11.6 7.1L4 20.5l1.5-4.6A8 8 0 1 1 21 12z"/><path d="M8.5 11h7M8.5 14h4"/></svg></span>
<h3>{t('cbSideH')}</h3><p>{t('cbSideP')}</p><ul>{['cbTip1','cbTip2','cbTip3'].map(k=><li key={k}><Tick/><span>{t(k)}</span></li>)}</ul></aside>
<form className="cbf card" onSubmit={submit}>
<div className="frow"><div className="fld"><label htmlFor="cbId">{t('cbId')}</label><input id="cbId" name="studentId" type="text" required maxLength={20} pattern="[0-9A-Za-z\-]{6,20}" autoComplete="off" placeholder={t('cbIdPh')}/></div>
<div className="fld"><label htmlFor="cbDept">{t('cbDept')}</label><input id="cbDept" name="department" type="text" required maxLength={60} list="deptList" autoComplete="off" placeholder={t('cbDeptPh')}/>
<datalist id="deptList">{DEPTS.map(x=><option key={x} value={x}/>)}</datalist></div></div>
<fieldset className="types"><legend>{t('cbType')}</legend><div className="tw">{[['Complaint','cbT1'],['Suggestion','cbT2'],['Appreciation','cbT3']].map(([v,k],i)=><label className="opt" key={v}><input type="radio" name="type" value={v} defaultChecked={i===0}/><span>{t(k)}</span></label>)}</div></fieldset>
<div className="fld"><label htmlFor="cbMsg">{t('cbMsg')}</label><textarea id="cbMsg" name="message" required minLength={10} maxLength={1000} value={msg} onChange={e=>setMsg(e.target.value)} placeholder={t('cbMsgPh')}/>
<div className="cbm"><span className="meta">{nf(msg.length+'/1000')}</span></div></div>
<input className="hp" type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true"/>
<button className="btn g cbsend" type="submit" disabled={busy}><span>{t('cbSend')}</span><Arrow/></button>
<p className={'cbst'+(st.kind?' '+st.kind:'')} role="status" aria-live="polite">{st.key?t(st.key):''}</p>
</form></div></div></section>)}
