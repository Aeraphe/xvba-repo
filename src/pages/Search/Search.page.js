import React from 'react';
import { SerachResultBarComp } from './components/SearchResultBar/SearchResultBar.comp'
import { SearchResultListComp } from './components/SearchResultList/SearchResultList.comp'
import { SearchComp } from './components/Search/Search.comp';
export const SearchPage = () => {
    return (
        <div>
            <SearchComp></SearchComp>
            <SerachResultBarComp></SerachResultBarComp>
            <SearchResultListComp 
            package="GausCurve" 
            user="Beto" 
            description="Fucntion for calc Gaus Cruves"
            publishdate="14/08/1980"
            ></SearchResultListComp>
            <SearchResultListComp></SearchResultListComp>
            <SearchResultListComp></SearchResultListComp>
        </div>
    )
}