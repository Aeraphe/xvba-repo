import React from 'react';
import styles from './Header.module.css'
import { Link } from 'react-router-dom';



export const Header = () => {

    return (
        <header className={styles.header}>
            <a href="/"><span style={{ color: '#81B441', fontWeight: 'bold' }}>X</span>vba<span style={{ color: '#6B913A' }}>repository</span></a>
            <nav >
                <ul className={styles['header-menu']}>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/suport">Suport</Link></li>
                    <li><Link to="/tutorial">Tutorial</Link></li>
                    <li> <Link to="/upload-package">Publish</Link></li>
                    <li><Link to="login">Login</Link></li>
                </ul>
            </nav>
        </header>

    )
}
