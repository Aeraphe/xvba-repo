import React, { useState } from 'react';
import { XvbaLogoSharedComp } from '../../shared/components/Xvba-Logo.shared.component';
import { LoginFormComponent } from "./components/Login-Form.component";
import styles from './Login.module.css';
import { LoadingSharedComp } from '../../shared/components/Loading/loading';

export const LoginPage = () => {
    const [show, setShow] = useState(false)
    const handleShowLoading = (show) => {
        setShow(show)
    }
    return (
        <div className={styles['LoginPage']} >

            <LoginFormComponent showLoading={handleShowLoading}>
                <XvbaLogoSharedComp size="3rem">


                </XvbaLogoSharedComp>
                <div style={{ display: show ? 'block' : 'none' }} className={styles['Loading']}>
                    <LoadingSharedComp />
                </div>

            </LoginFormComponent>
        </div>
    )
}

