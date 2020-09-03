import React from 'react';
import { Header } from './components/Header';
import { FooterComp } from './components/Footer';
import styles from "./Template.module.css";

export const Template = (props) => {

    return (
        <div className={styles['grid-container']}>
            <div className={styles['header']}>
                <Header ></Header>
            </div>

            <div className={styles['main']}  >
                {props.children}
            </div>
            <div className={styles['footer']}>
                <FooterComp ></FooterComp>
            </div>

        </div>
    )
}