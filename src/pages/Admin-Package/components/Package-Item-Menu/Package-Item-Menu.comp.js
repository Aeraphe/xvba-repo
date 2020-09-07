import React, { useState } from "react";
import styles from './Package-Item-Menu.module.css'



export const PackageItemMenuComp = ({ children }) => {

    const [show, setShow] = useState(false)


    const handleClick = () => {
        setShow(!show)

    }


    return (
        <div style={{ border: '0px' }} className={styles['Container']}>
            <div style={{ border: '0px' }} className={styles['List-Item']}>
                {children} <span onClick={() => handleClick()} className={styles['Btn-Show']}>::</span>
            </div>

            <div onMouseLeave={() => setShow(false)} style={{ display: show ? 'block' : 'none' }} className={styles['Menu']}>
                <ul>
                    <li >
                        Update
                    </li>
                    <li>
                        Delete
                    </li>
                </ul>
            </div>
        </div>
    )


}