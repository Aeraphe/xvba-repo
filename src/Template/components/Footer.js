import React from 'react';
import styles from './Footer.module.css';
import { Link } from 'react-router-dom';
export const FooterComp = () => {

    return (
        <div className={styles.Footer}>
            <div className={styles['Footer-Content']}>
                <a href="/">
                    <span style={{ color: '#81B441', fontWeight: 'bold' }}>X</span>vba
                    <span style={{ color: '#6B913A' }}>repository</span>
                </a>
            </div>
            <div className={styles['Footer-Created-By']}>
                <ul>
                    
                    <li> <Link to="/privacy">Privacy Policy</Link></li>
                    <li> <Link to="/terms">Terms and conditions</Link></li>
                    <li> Created by: Alberto Eduardo</li>
                </ul>


            </div>

        </div>
    )
}