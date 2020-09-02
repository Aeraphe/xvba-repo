import React from 'react';
import { useSelector } from "react-redux";
import styles from './Header.module.css'
import { Link } from 'react-router-dom';
let isLogged;

export const Header = () => {
    isLogged = useSelector(state=>state.auth.isLogged);
    return (
        <header className={styles.header}>
            <a href="/"><span style={{ color: '#81B441', fontWeight: 'bold' }}>X</span>vba<span style={{ color: '#6B913A' }}>repository</span></a>
            <nav >
                <ul className={styles['header-menu']}>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/donate">Donate</Link></li>
                    <li><Link to="/tutorial">Tutorial</Link></li>
                    <li> <Link to="/upload-package">Publish</Link></li>
                    <li><Link to="login">{isLogged?'Logout':'Login'}</Link></li>
                </ul>
            </nav>
        </header>

    )
}
