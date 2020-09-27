import React, { useState,useEffect } from 'react';
import { XvbaLogoSharedComp } from '../../shared/components/Xvba-Logo.shared.component';
import { LoginFormComponent } from "./components/Login-Form.component";
import styles from './Login.module.css';
import { LoadingSharedComp } from '../../shared/components/Loading/loading';
import ReactGA from 'react-ga';

export const LoginPage = () => {
    useEffect(() => {
        ReactGA.event({
            category: 'Login',
            action: 'Access Login Page'
        });
    })
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

