import {useEffect,useMemo,useState} from 'react'
import {I18n,makeI18n,useLocal} from './utils'
import Header from './components/Header'
import Hero from './components/Hero'
import Schedule from './components/Schedule'
import {Exams,Routes,Notices,Gallery,Uni,About,Band} from './components/Sections'
import Complain from './components/Complain'
import Committee from './components/Committee'
import Footer from './components/Footer'
const IDS=['home','schedule','exams','routes','notices','gallery','about','complain','contact']
export default function App(){
const[lang,setLang]=useLocal('dtc-lang','en'),[theme,setTheme]=useLocal('dtc-theme','light')
const[hash,setHash]=useState(location.hash),[active,setActive]=useState('home'),[show,setShow]=useState(false)
const i18n=useMemo(()=>makeI18n(lang),[lang]),page=hash==='#committee'?'committee':'home'
useEffect(()=>{document.documentElement.lang=lang;document.documentElement.dataset.theme=theme},[lang,theme])
useEffect(()=>{const h=()=>setHash(location.hash);addEventListener('hashchange',h);return()=>removeEventListener('hashchange',h)},[])
useEffect(()=>{if(page==='committee'){scrollTo(0,0);return}const id=hash.slice(1),el=id&&document.getElementById(id);if(el)el.scrollIntoView();else scrollTo(0,0)},[hash,page])
useEffect(()=>{const on=()=>{setShow(scrollY>500);if(page!=='home'){setActive('committee');return}
let cur='home';IDS.forEach(id=>{const e=document.getElementById(id);if(e&&e.getBoundingClientRect().top<120)cur=id});setActive(cur)}
on();addEventListener('scroll',on,{passive:true});return()=>removeEventListener('scroll',on)},[page])
return(<I18n.Provider value={i18n}>
<Header active={active} setLang={setLang} theme={theme} setTheme={setTheme}/>
{page==='home'?<main id="homeView"><Hero/><Schedule/><Exams/><Routes/><Notices/><Gallery/><Uni/><About/><Complain/><Band/></main>:<Committee/>}
<Footer/>
<button className={'ic'+(show?' show':'')} id="top" aria-label="Back to top" onClick={()=>scrollTo({top:0})}>↑</button>
</I18n.Provider>)}
