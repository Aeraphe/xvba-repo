import React from 'react';
import { useSelector } from "react-redux";
import styles from './Header.module.css'
import { Link } from 'react-router-dom';



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
        <li><Link to="/">Home</Link></li>,
        <li><Link to="/xvba-extension">Xvba-Extension</Link></li>,
        <li><Link to="/xvba-cli">Xvba-Cli</Link></li>,
        <li><Link to="/tutorial">Tutorial</Link></li>,
        <li protected="true" > <Link to="/upload-package">Publish</Link></li>,

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
        linksChecked.push(<li key="logout"><Link to="/login">Logout</Link></li>)
    } else {
        linksChecked.push(<li key="login"><Link to="/login">Login</Link></li>)
    }

    return (linksChecked)
}