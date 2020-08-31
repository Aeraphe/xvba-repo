import React from 'react';
import { Header } from './components/Header';
import { FooterComp } from './components/Footer';


export const Template = (props) => {

    return (
        <div>
            <Header></Header>
            {props.children}
           <FooterComp></FooterComp>
        </div>
    )
}