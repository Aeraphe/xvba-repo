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
                <div className={styles['Content-Grid']}>
                    <div className={styles['Package-Title-Bar']}>
                        <div className={styles['Package-Title']}>Gauss-Curve</div>
                        <div className={styles['Package-Version']}>1.1.2  Public  Published 2 months ago</div>
                    </div>
                    <div className={styles['Package-Info']}>

                        <div className={styles['Package-Info-Readme']}>Readme</div>
                        <div className={styles['Package-Info-Statistics']}>
                            <div>
                                <div className={styles['Install-Title']}>Install</div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}


