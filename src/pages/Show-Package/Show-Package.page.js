import React from 'react';
import styles from './Show-Package.module.css'
import { SearchShareComp } from "../../shared/components/Search/Search-comp-shared";
export const ShowPackagePage = (props) => {

    console.log(props);
    return (

        <div className={styles['Container']}>
            <div className={styles['Search']}>
                <SearchShareComp></SearchShareComp>
            </div>
            <div className={styles['Content']}>
            <div className={styles['Logo']}>
                Readme div
            </div>
            <div className={styles}>
                Package download info
            </div>
            </div>
          
        </div>
    )
}


