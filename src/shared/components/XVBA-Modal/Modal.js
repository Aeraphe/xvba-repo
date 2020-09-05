import React from 'react'
import styles from './Modal.module.css'

export const Modal = (props) => {

    return (
        <div style={{ display: props.show ? 'block' : 'none' }} className={styles['Modal-Outer']}>
            <div onClick={props.showModal()} className={styles['Modal']}>
            </div>
            <div style={{ height: props.height }} className={styles['Modal-Container']}>
                <div className={styles['Modal-Content']}>
                    {props.children}
                </div>

                <div className={styles['Modal-Close']}>
                    <span onClick={props.showModal()} className={styles['Modal-Close-btn']}>X</span>
                </div>
            </div>
        </div>
    )


}