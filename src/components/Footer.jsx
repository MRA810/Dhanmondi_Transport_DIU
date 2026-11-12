import {useI,A} from '../utils'
export default function Footer(){
const{t}=useI(),Ph=({k})=><li><b>{t(k)}</b><br/><span className="ph">{t('coPending')}</span></li>
return(<footer id="contact"><div className="wrap"><div className="fgrid">
<div><div className="fl"><img src={A('logos/dtc.jpg')} alt="Dhanmondi Transport Community logo"/><img src={A('logos/diu.png')} alt="Daffodil International University logo"/></div>
<p>{t('affil')}</p><p style={{marginTop:'.8rem',opacity:.85,fontSize:'.88rem'}}>{t('disc')}</p></div>
<div><h3>{t('ftQuick')}</h3><ul>{[['home','nHome'],['schedule','nSch'],['exams','nEx'],['routes','nRoutes'],['notices','nNot'],['gallery','nGal'],['about','nAbout'],['complain','nComplain'],['committee','nCom']].map(([id,k])=><li key={id}><a href={'#'+id}>{t(k)}</a></li>)}</ul></div>
<div><h3>{t('ftCon')}</h3><ul><Ph k="coPhone"/><Ph k="coMail"/><Ph k="ftSup"/></ul></div>
<div><h3>{t('ftUse')}</h3><ul><li><a href="https://daffodilvarsity.edu.bd/" target="_blank" rel="noopener">{t('uniSite')}</a></li><Ph k="ftUniCon"/><li><a href="#committee">{t('visitCom')}</a></li></ul></div>
</div><div className="fbar"><span>{t('ftRights')}</span><span>{t('tag')}</span></div></div></footer>)}
