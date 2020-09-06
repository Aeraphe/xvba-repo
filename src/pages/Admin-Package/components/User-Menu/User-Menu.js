import React from "react";
import styles from './User-Menu.module.css';

export const UserMenuComp = (props) => {

    return (
        <div className={styles['Container']}>
            <div className={styles['Menu']}>
                <div className={styles['User-Image']}>
                </div>
                <div className={styles['User-Menu-Nav']}>
                    <UserMenuButtons showModalPackages={props.showModalPackageUpload}></UserMenuButtons>
                </div>
            </div>
        </div>
    )
}

const UserMenuButtons = (props) => {
    return (
        <div className={styles['User-Menu-Btn']}>
            <button onClick={props.showModalPackages()} >:: Upload Package</button>
            <button >:: User Settings</button>
            <button >:: Donate</button>
        </div>

    )
}