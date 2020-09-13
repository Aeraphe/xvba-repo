import React from 'react'
import styles from './Alert.module.css'


export const Alert = ({ show, onToggle, onAccept, title, message, btnAccept, btnCancel }) => {



    return (
        <div style={{ display: show ? 'block' : 'none' }} className={styles['Container']}>
            <div onClick={() => onToggle()} className={styles['Background']}>  </div>
            <div className={styles['Alert']}>
                <div className={styles['Header']}>
                    {title}
                </div>
                <div className={styles['Content']}>
                    {message}
                </div>
                <div className={styles['Footer']}>
                    <button className={styles['Footer-btn-cancel']} onClick={() => onToggle()}>{btnAccept || 'Cancel'}</button>
                    <button className={styles['Footer-btn-accept']} onClick={() => onAccept()}><span >{btnCancel || 'Ok'}</span></button>
                </div>
            </div>

        </div>
    )
}