import React from 'react';
import styles from './SearchResultList.module.css';



export const SearchResultListComp = (prop) => {
    return (
        <div className={styles.SearchResultList} >
            <ul>
                <li>
                    <div className={styles['Package-Name']}><a href="/">{prop.package}</a></div>
                    <div className={styles['Description']}>{prop.description}</div>
                    <div className={styles['User']}><a href="/">{prop.user}</a> <span>published</span> <span>{prop.publishdate}</span></div>
                </li>
            </ul>
            <div className={styles.Classification}>
               <ul>
                   <li>
                       Version 1
                   </li>
                   <li>
                      Download: 5 mil
                   </li>
                   <li>
                       Range: 5
                   </li>
               </ul>
            </div>
        </div>
    )
}