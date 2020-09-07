import React from 'react';
import styles from './SearchResultBarComp.module.css';


export const SearchResultBarComp = () => {

    return (
        <div className={styles.SearchResultBar}>
            <div>
                Find 10 results
            </div>
            <div>
                1,2,3,4...
            </div>
        </div>
    )
}