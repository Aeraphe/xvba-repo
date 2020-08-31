import React from 'react';
import styles from "./Card.module.css";


export const CardShared = (props) => {
    return (
        <div style={{width:props.width,height:props.height}} className={styles['Card']}>
            <div  className={styles['Card-Content']}>
                {props.children}
            </div>
        </div>
    )
}