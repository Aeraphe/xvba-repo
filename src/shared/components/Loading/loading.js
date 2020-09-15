import React from "react";
import styles from './loading.module.css'


export const LoadingSharedComp = () => {
    return (
        <div className={styles["lds-ripple"]}><div></div><div></div></div>
    )
}