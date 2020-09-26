import React from 'react';
import styles from "./Search-page.module.css";
import { SearchComp } from './components/Search/Search.comp';
import { InfoPage } from './sub-pages/Info/Info.page'

export const SearchPage = () => {



    return (
        <div className={styles['Container']} >
            <SearchComp></SearchComp>
            <InfoPage></InfoPage>
        </div>
    )
}

