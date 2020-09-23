import React from 'react';
import styles from './SearchResultList.module.css';
import { Link } from 'react-router-dom';
import { CopyToClipboard } from "../../../../shared/components/CopyToClipboard/CopyToClipboard-shared";



export const SearchResultListComp = (prop) => {



    return (
        <div className={styles.SearchResultList} >
            <ul>
                <li>
                    <div className={styles['Package-Name']}><Link to={'show-package/' + prop.package} >{prop.package}</Link></div>
                    <div className={styles['Description']}>{prop.description}</div>
                    <div className={styles['User']}><a href="/">{prop.user}</a> <span>Published: </span> <span>{prop.create_ate}</span></div>
                </li>
            </ul>
            <div className={styles.Classification}>
                <ul>
                    <li>
                        <CopyToClipboard package={prop.package} />
                    </li>
                    <li>
                        Version {prop.version}
                    </li>
                    <li>
                        Download: {prop.downloads}
                    </li>
                    <li>
                        Rating: {prop.rating}
                    </li>
                </ul>
            </div>
        </div>
    )
}