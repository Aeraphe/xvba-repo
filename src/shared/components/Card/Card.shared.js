import React from 'react';
import styles from "./Card.module.css";


export const CardShared = (props) => {
    return (
        <div className={styles['Card']}>
            <div className={styles['Card-Content']}>
                {props.children}
            </div>
        </div>
    )
}