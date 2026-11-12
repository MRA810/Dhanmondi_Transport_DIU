import {useEffect,useState,createContext,useContext} from 'react'
import {T} from './data'
export const A=p=>import.meta.env.BASE_URL+p
export const I18n=createContext(null)
export const useI=()=>useContext(I18n)
export function makeI18n(lang){
const t=k=>T[lang][k]??T.en[k]
const L=o=>o[lang]||o.en
const nf=s=>lang==='bn'?String(s).replace(/\d/g,d=>'০১২৩৪৫৬৭৮৯'[d]):String(s)
const fmtT=s=>{const[h,m]=s.split(':').map(Number);const a=lang==='bn'?(h<12?'পূর্বাহ্ণ':'অপরাহ্ণ'):(h<12?'AM':'PM');return nf(`${(h%12)||12}:${String(m).padStart(2,'0')}`)+' '+a}
const fmtD=iso=>new Intl.DateTimeFormat(lang==='bn'?'bn-BD':'en-GB',{dateStyle:'medium',timeZone:'Asia/Dhaka'}).format(new Date(iso+'T00:00:00+06:00'))
const dayStr=d=>d.length===6&&!d.includes('fri')?t('satThu'):d.map(k=>t('dayN')[k]).join(', ')
return{lang,t,L,nf,fmtT,fmtD,dayStr}}
export function useNow(){const[n,setN]=useState(()=>new Date());useEffect(()=>{const i=setInterval(()=>setN(new Date()),1000);return()=>clearInterval(i)},[]);return n}
export function useLocal(key,def){const[v,setV]=useState(()=>{try{return localStorage.getItem(key)||def}catch{return def}});useEffect(()=>{try{localStorage.setItem(key,v)}catch{}},[v,key]);return[v,setV]}
