import React, { useState } from 'react';
import styles from './Search.module.css';
import { XvbaLogoSharedComp } from '../../../../shared/components/Xvba-Logo.shared.component';
import { SearchResultBarComp } from '../SearchResultBar/SearchResultBar.comp';
import { SearchResultListComp } from '../SearchResultList/SearchResultList.comp';
import PackagesHttpService from '../../../../shared/services/packagesHttp.service';
import _ from 'lodash';

export const SearchComp = () => {
    const [packages, setPackages] = useState([]);
    const [search, setSearch] = useState("");

    const debounceSearch = _.debounce((val) => {
        if (val) {
            setSearch(val)
        }
    }, 500)

    const handleOnChangeSearchText = (e) => {
        debounceSearch(e.target.value)
    }
    const handleOnClickSearch = async () => {
        setPackages(await handlerGetPackages(search))
    }


    return (
        <div>
            <div className={styles['Search-Logo']}>
                <XvbaLogoSharedComp size="7rem"></XvbaLogoSharedComp>
            </div>
            <div className={styles['Search-Container']}>
                <input onChange={(e) => handleOnChangeSearchText(e)} placeholder="Search VBA Package" className={styles['Search-Input']}></input>
                <button onClick={() => handleOnClickSearch()} className={styles['Search-Input-Btn']}>Search</button>
            </div>
            <SearchResultBarComp></SearchResultBarComp>
            {packages}
        </div>

    )
}



const handlerGetPackages = async (val) => {

    let packages = await PackagesHttpService.search(val);
    let response = [];
    if (packages?.data) {
        packages.data.forEach((item, index) => {
            response.push(
                <SearchResultListComp key={index}
                    package={item.package.name}
                    user="Beto"
                    description="Function for calc Gauss Curves"
                    publish_date="14/08/1980"
                ></SearchResultListComp>
            )
        });
    }
    return response;

}