import React, { useState, useEffect } from 'react';
import { SearchResultBarComp } from './components/SearchResultBar/SearchResultBar.comp'
import { SearchResultListComp } from './components/SearchResultList/SearchResultList.comp'
import { SearchComp } from './components/Search/Search.comp';
import PackagesHttpService from '../../shared/services/packagesHttp.service';

export const SearchPage = () => {

    const [packages, setPackages] = useState([]);
    //Get all packages from firestore
    async function get() { setPackages(await handlerGetPackages()) }

    useEffect(() => {
        get();
    }, []);

    return (
        <div style={{ marginBottom: '57px' }}>
            <SearchComp></SearchComp>
            <SearchResultBarComp></SearchResultBarComp>
            {packages}

        </div>
    )
}


const handlerGetPackages = async () => {

    let packages = await PackagesHttpService.get();
    let response = [];

    packages.forEach((item, index) => {
        response.push(
            <SearchResultListComp key={index}
                package={item.package.name}
                user="Beto"
                description="Function for calc Gauss Curves"
                publish_date="14/08/1980"
            ></SearchResultListComp>
        )
    });
    return response;

}