import React from 'react';
import { useSelector } from "react-redux";
import styles from './Header.module.css'
import { NavLink } from 'react-router-dom';



export const Header = () => {




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
        <li><NavLink activeClassName={styles.active} exact to="/">Home</NavLink></li>,
        <li><NavLink activeClassName={styles.active} exact to="/xvba-extension">Xvba-Extension</NavLink></li>,
        <li><NavLink activeClassName={styles.active} exact to="/xvba-cli">Xvba-Cli</NavLink></li>,
        <li><NavLink activeClassName={styles.active} exact to="/tutorial">Tutorial</NavLink></li>,
        <li protected="true" > <NavLink activeClassName={styles.active} to="/upload-package">Publish</NavLink></li>,

    ];


const HeaderLinkGuard = () => {

    let isLogged = useSelector(state => state.auth.isLogged);

    let linksChecked = LINKS.reduce((prev, next, index) => {
        if (isLogged) {

            prev.push({ ...next, key: index })
        } else if (next.props.protected === undefined) {

            prev.push({ ...next, key: index })
        }
        return prev
    }, [])


    if (isLogged) {
        linksChecked.push(<li key="logout"><NavLink activeClassName={styles.active} to="/login">Logout</NavLink></li>)
    } else {
        linksChecked.push(<li key="login"><NavLink activeClassName={styles.active} to="/login">Login</NavLink></li>)
    }

    return (linksChecked)
}