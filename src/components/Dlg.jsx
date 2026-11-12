import {useEffect,useRef} from 'react'
export default function Dlg({open,onClose,children,...rest}){
const r=useRef()
useEffect(()=>{const d=r.current;if(open&&!d.open)d.showModal();if(!open&&d.open)d.close()},[open])
return <dialog ref={r} onClose={onClose} onClick={e=>e.target===r.current&&onClose()} {...rest}>{open&&children}</dialog>}
