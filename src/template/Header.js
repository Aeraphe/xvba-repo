import React from 'react';
import styles from './Header.module.css'



export const Header = () => {

    return (
        <header className={styles.header}>
            <a href="/"><span style={{color:'#81B441', fontWeight:'bold'}}>X</span>vba<span style={{color:'#6B913A'}}>repository</span></a>
            <nav >
                <ul className={styles['header-menu']}>
                    <li><a href="/">Suport</a></li>
                    <li><a href="/">Tutorial</a></li>
                    <li><a href="/">Login</a></li>
                </ul>
            </nav>
        </header>

    )
}
