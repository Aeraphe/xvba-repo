import React from 'react';
import styles from './SearchResultList.module.css';
import { Link } from 'react-router-dom';



export const SearchResultListComp = (prop) => {
    return (
        <div className={styles.SearchResultList} >
            <ul>
                <li>
                    <div className={styles['Package-Name']}><Link to={'show-package/' + prop.package} >{prop.package}</Link></div>
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