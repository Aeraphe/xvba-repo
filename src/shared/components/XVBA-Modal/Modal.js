import React,{useState} from 'react'
import styles from './Modal.module.css'

export const Modal = (props) => {
    const [display,setDisplay] = useState(false);
    return (
        <div style={{ display: display ? 'block' : 'none' }} className={styles['Modal']}>
            <div style={{ height: props.height }} className={styles['Modal-Container']}>
                <div className={styles['Modal-Content']}>
                    {props.children}
                </div>
             
                <div onClick={()=>setDisplay(!display)} className={styles['Modal-Close']}>
                    <span className={styles['Modal-Close-btn']}>X</span>
                </div>
            </div>
        </div>
    )


}