import React from 'react';
import styles from './Show-Package.module.css'

export const ShowPackagePage = (props) => {

    console.log(props);
    return (

        <div className={styles['Show-Package']}>
            <section>
                Readme section
            </section>
            <section>
                Package download info
            </section>
        </div>
    )
}