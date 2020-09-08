import React from 'react';
import styles from './SearchResultBarComp.module.css';


export const SearchResultBarComp = (props) => {

    return (
        <div className={styles.SearchResultBar}>
            <div>
                Find {props.total} results
            </div>
            <div>
               Pages: {Math.ceil(props.total/10)}
            </div>
        </div>
    )
}