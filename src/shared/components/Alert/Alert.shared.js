import React from 'react'
import styles from './Alert.module.css'


export const Alert = ({ show, onToggle, onAccept, title, content, btnAccept, btnCancel }) => {


    return (
        <div style={{ display: show ? 'block' : 'none' }} className={styles['Container']}>
            <div onClick={() => onToggle()} className={styles['Background']}>
                <div className={styles['Header']}>
                    {title}
                </div>
                <div className={styles['Content']}>
                    {content}
                </div>
                <div className={styles['Footer']}>
                    <button onClick={() => onAccept()}>{btnAccept && 'Cancel'}</button>
                    <button onClick={() => onToggle()}>{btnCancel && 'Ok'}</button>
                </div>
            </div>
        </div>
    )
}