import React from 'react';
import styles from './Footer.module.css';

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
                <p>Created by: Alberto Eduardo</p>
            </div>
        </div>
    )
}