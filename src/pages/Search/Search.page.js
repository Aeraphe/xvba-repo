import React, { useEffect } from 'react';
import styles from "./Search-page.module.css";
import { SearchComp } from './components/Search/Search.comp';
import { InfoPage } from './sub-pages/Info/Info.page'
import ReactGA from 'react-ga';


export const SearchPage = () => {

    useEffect(() => {
        ReactGA.event({
            category: 'Home',
            action: 'Access Home',
        });

    })

    return (
        <div className={styles['Container']} >
            <SearchComp></SearchComp>
            <InfoPage></InfoPage>
        </div>
    )
}

