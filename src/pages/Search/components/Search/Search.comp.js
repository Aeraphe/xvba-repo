import React, { useEffect, useState } from 'react';
import styles from './Search.module.css';
import { XvbaLogoSharedComp } from '../../../../shared/components/Xvba-Logo.shared.component';
import { SearchResultBarComp } from '../SearchResultBar/SearchResultBar.comp';
import { SearchResultListComp } from '../SearchResultList/SearchResultList.comp';
import { useDispatch, useSelector } from "react-redux";
import { searchPackagesThunk, getSearchPackagesThunk, getSearchTextThunk } from "../../../../shared/reducers/search-packages.slice";
import { LoadingSharedComp } from '../../../../shared/components/Loading/loading';
import ReactGA from 'react-ga';

let lastSearch = "";

export const SearchComp = () => {
    let dispatch = useDispatch();
    const [search, setSearch] = useState();
    const [loading, setLoading] = useState(false)
    let dbSearch = useSelector(state => state.search_packages.search);

    useEffect(() => {
        dispatch(getSearchTextThunk())
        setSearch(dbSearch);
    }, [dispatch, dbSearch])

    const handleOnClickSearch = async () => {

        if (lastSearch !== search) {
            ReactGA.event({
                category: 'Search',
                action: 'Search Package',
                value: search
              });
            lastSearch = search;
            setLoading(true)
            await dispatch(searchPackagesThunk(search));
            setLoading(false)
        }
    }
    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            handleOnClickSearch()
        }
    }

    return (
        <div className={styles['Container']}>
            <div className={styles['Search-Logo']}>
                <XvbaLogoSharedComp size="7rem" >

                </XvbaLogoSharedComp>
                <small style={{ fontSize: "10px", position: "relative", right: '0px', top: '110px' }}>Version 1.0.0-b</small>
                <div style={{ visibility: loading ? 'visible' : 'hidden' }} className={styles['Loading']}>
                    <LoadingSharedComp />
                </div>

            </div>
            <div className={styles['Search-Container']}>
                <input value={search ? search : ''} onKeyPress={e => handleKeyPress(e)} onChange={(e) => { setSearch(e.target.value) }} placeholder="Search VBA Package" className={styles['Search-Input']}></input>

                <button onClick={() => handleOnClickSearch()} className={styles['Search-Input-Btn']}>Search Packages</button>
            </div>
            <ListPackages></ListPackages>
        </div>

    )
}



const ListPackages = () => {
    let dispatch = useDispatch();
    const packages = useSelector(state => state.search_packages.entities);
    const search = useSelector(state => state.search_packages.search);

    let response = [];


    useEffect(() => {
        dispatch(getSearchPackagesThunk())
        dispatch(getSearchTextThunk())

    }, [dispatch])

    if (packages.length > 0) {
        let totalPackages = packages.length;
        response.push(<SearchResultBarComp key="search_result_bar_key" total={totalPackages}></SearchResultBarComp>);
        packages.forEach((item, index) => {
            const createAte = new Date(item.create_ate).toDateString()
            response.push(
                <SearchResultListComp key={index}
                    package={item.name}
                    user={item.username}
                    description={item.description}
                    create_ate={createAte}
                    downloads={item.downloads}
                    version={item.version.vn}
                    rating={item.rating}
                />
            )
        });
    } else {


        response =
            <div style={{ display: search ? 'block' : 'none' }}>
                <div key="searchNotFound" className={styles['NotFound']} >
                    <div key="notfound" >Packages Not Found for: <span className={styles['NotFoundSearch']}>{search}</span> </div>
                </div>
                <div className={styles['DefaultPackages-Container']} >
                    <div className={styles['DefaultPackages']}>
                        <h5>Try  example package : (search for linear)</h5>
                    </div>
                </div>
            </div>
    }


    return response;

}