import React from 'react';
import { SerachResultBarComp } from './components/SearchResultBar/SearchResultBar.comp'
import { SearchResultListComp } from './components/SearchResultList/SearchResultList.comp'

export const SearchResultPage = () => {
    return (
        <div>
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