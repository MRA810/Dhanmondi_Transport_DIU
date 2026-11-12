import {useState} from 'react'
import {useI,A} from '../utils'
const LINKS=[['home','nHome'],['schedule','nSch'],['exams','nEx'],['routes','nRoutes'],['notices','nNot'],['gallery','nGal'],['about','nAbout'],['complain','nComplain'],['committee','nCom'],['contact','nContact']]
export default function Header({active,setLang,theme,setTheme}){
const{t,lang}=useI(),[open,setOpen]=useState(false)
return(<header><nav className="nav" aria-label="Main">
<a className="brand" href="#home"><img src={A('logos/dtc.jpg')} alt="Dhanmondi Transport Community logo"/><span><b>Dhanmondi Transport Community</b><small>{t('affilShort')}</small></span></a>
<ul className={'links'+(open?' open':'')} id="links">{LINKS.map(([id,k])=><li key={id}><a href={'#'+id} className={active===id?'on':''} onClick={()=>setOpen(false)}>{t(k)}</a></li>)}</ul>
<div className="actions">
<button className="ic" onClick={()=>setLang(lang==='en'?'bn':'en')} aria-label={lang==='en'?'বাংলায় দেখুন':'Switch to English'}>{lang==='en'?'বাং':'EN'}</button>
<button className="ic" onClick={()=>setTheme(theme==='dark'?'light':'dark')} aria-label="Toggle dark mode">{theme==='dark'?'☀️':'🌙'}</button>
<button className="ic" id="menu" aria-label="Menu" aria-expanded={open} aria-controls="links" onClick={()=>setOpen(o=>!o)}>☰</button>
</div></nav></header>)}
