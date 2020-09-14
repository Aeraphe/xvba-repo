import React from 'react';
import { useSelector } from "react-redux";
import styles from './Header.module.css'
import { Link } from 'react-router-dom';
let isLogged;

export const Header = () => {

    isLogged = useSelector(state => state.auth.isLogged);

    return (
        <div className={styles['Container']} >
            <header className={styles.header}>
                <a href="/"><span style={{ color: '#81B441', fontWeight: 'bold' }}>X</span>vba<span style={{ color: '#6B913A' }}>repository</span></a>
                <nav >
                    <ul className={styles['header-menu']}>
                        {HeaderLinkGuard()}
                    </ul>
                </nav>
            </header>
        </div>

    )
}


const LINKS =
    [
        <li><Link to="/">Home</Link></li>,
        <li><Link to="/donate">Donate</Link></li>,
        <li><Link to="/tutorial">Tutorial</Link></li>,
        <li protected="true" > <Link to="/upload-package">Publish</Link></li>,
        <li><Link to="login">{isLogged ? 'Logout' : 'Login'}</Link></li>
    ];


const HeaderLinkGuard = () => {
    let linksChecked = LINKS.reduce((prev, next, index) => {
        if (isLogged) {
            prev.push({ ...next, key: index })
        } else if (next.props.protected === undefined) {
            prev.push({ ...next, key: index })
        }
        return prev
    }, [])




    return (linksChecked)
}