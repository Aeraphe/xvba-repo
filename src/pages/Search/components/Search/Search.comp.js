import React, { useEffect, useState } from 'react';
import styles from './Search.module.css';
import { XvbaLogoSharedComp } from '../../../../shared/components/Xvba-Logo.shared.component';
import { SearchResultBarComp } from '../SearchResultBar/SearchResultBar.comp';
import { SearchResultListComp } from '../SearchResultList/SearchResultList.comp';
import { useDispatch, useSelector } from "react-redux";
import { searchPackagesThunk, getSearchPackagesThunk, getSearchTextThunk } from "../../../../shared/reducers/search-packages.slice";

let lastSearch = "";

export const SearchComp = () => {
    let dispatch = useDispatch();
    const [search, setSearch] = useState();
    let dbSearch = useSelector(state => state.search_packages.search);

    useEffect(() => {
        dispatch(getSearchTextThunk())
        setSearch(dbSearch);
    }, [dispatch, dbSearch])

    const handleOnClickSearch = async () => {
        console.log(search);
        if (lastSearch !== search) {
            lastSearch = search;
            dispatch(searchPackagesThunk(search));
        }
    }
    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            handleOnClickSearch()
        }
    }

    return (
        <div>
            <div className={styles['Search-Logo']}>
                <XvbaLogoSharedComp size="7rem" />
            </div>
            <div className={styles['Search-Container']}>
                <input value={search ? search : ''} onKeyPress={e => handleKeyPress(e)} onChange={(e) => { setSearch(e.target.value) }} placeholder="Search VBA Package" className={styles['Search-Input']}></input>
                <button onClick={() => handleOnClickSearch()} className={styles['Search-Input-Btn']}>Search</button>
            </div>
            <ListPackages></ListPackages>
        </div>

    )
}



const ListPackages = () => {
    let dispatch = useDispatch();
    const packages = useSelector(state => state.search_packages.entities);
    let response = [];

    useEffect(() => {
        dispatch(getSearchPackagesThunk())
        dispatch(getSearchTextThunk())

    }, [dispatch])

    if (packages && packages.length > 0) {
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
                    downloads = {item.downloads}
                    version={item.version.version}
                    rating={item.rating}
                />
            )
        });
    }


    return response;

}