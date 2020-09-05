import React from "react";
import styles from './User-Menu.module.css';

export const UserMenuComp = () => {

    return (
        <div className={styles['Container']}>
            <div className={styles['User-Image']}>
            </div>
            <div className={styles['User-Menu-Nav']}>
                <UserMenuButtons></UserMenuButtons>
            </div>
        </div>
    )
}

const UserMenuButtons = () => {
    return (
        <div className={styles['User-Menu-Btn']}>
            <button >:: Upload Package</button>
            <button >:: User Settings</button>
            <button >:: Donate</button>
        </div>

    )
}