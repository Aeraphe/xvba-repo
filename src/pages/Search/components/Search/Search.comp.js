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
    }, 200)

    const handleOnChangeSearchText = (e) => {
        debounceSearch(e.target.value)
    }
    const handleOnClickSearch = async () => {
        setPackages(await handlerGetPackages(search))
    }
    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            handleOnClickSearch()
        }
    }

    return (
        <div>
            <div className={styles['Search-Logo']}>
                <XvbaLogoSharedComp size="7rem"></XvbaLogoSharedComp>
            </div>
            <div className={styles['Search-Container']}>
                <input onKeyPress={e => handleKeyPress(e)} onChange={(e) => handleOnChangeSearchText(e)} placeholder="Search VBA Package" className={styles['Search-Input']}></input>
                <button onClick={() => handleOnClickSearch()} className={styles['Search-Input-Btn']}>Search</button>
            </div>
            
            {packages}
        </div>

    )
}



const handlerGetPackages = async (val) => {

    let packages = await PackagesHttpService.search(val);
    let response = [];
    let totalPackages = packages.data.length;
    if (totalPackages > 0) {
         response.push(<SearchResultBarComp key="search_result_bar_key" total={totalPackages}></SearchResultBarComp>);
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
    } else {

        response.push(<p key="packagers_not_found" style={{ margin: "15px", color: 'red' }}>Packages not Found for: <b>{val}</b></p>)
    }


    return response;

}