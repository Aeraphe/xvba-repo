import React from "react";
import styles from './Tutorial-page.module.css'


export const TutorialPage = () => {
return (
    <>
    <div className={styles['Container']}>
        <div className={styles['Container-Grid']}>
            <div className={styles['Menu-Container']}>
                <div className={styles['Menu-Title']}>Tutorial</div>
                <div className={styles['Menu']}>
                    <ul>
                        <li className={styles['Menu-Btn']}><span>: : </span>Installation</li>
                    </ul>
                </div>
            </div>
            <div className={styles['Readme-Container']}>
                <div className={styles['Readme']}  ></div>
            </div>

        </div>

    </div>
</>
)
}