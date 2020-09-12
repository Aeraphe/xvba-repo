import React, { useState } from "react";
import styles from './Package-Item-Menu.module.css'

import { Alert } from '../../../../shared/components/Alert/Alert.shared';


export const PackageItemMenuComp = ({ children, id }) => {

    const [show, setShow] = useState(false)



    const handleClick = () => {
        setShow(!show)

    }
    const handleAlert = (action) => {
        switch (action) {
            case 'delete':
                
                break;
        
            default:
                break;
        }
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
                    <li onClick={() => handleAlert('delete')}>
                        Delete
                    </li>
                </ul>
            </div>
            <Alert onToggle={()=>handleAlert} onAccept={handleAlert}  ></Alert>
        </div>
    )


}