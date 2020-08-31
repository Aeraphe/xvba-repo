import React from 'react';
import styles from './Search.module.css';


export const SearchComp = () => {

    return (
        <div>
            <div className={styles.Search}>
                <div className={styles['Search-Title']}><span style={{ color: '#81B441', fontWeight: 'bold' }}>X</span>vba</div>

            </div>
            <SearchInputComp></SearchInputComp>
        </div>

    )
}

const SearchInputComp = () => {
    return (
        <div>
            <input placeholder="Search VBA Package" className={styles['Search-Input']}></input>
            <button className={styles['Search-Input-Btn']}>Search</button>
        </div>
    )
}