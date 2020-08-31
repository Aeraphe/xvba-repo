import React from 'react';
import { XvbaLogoSharedComp } from '../../shared/components/Xvba-Logo.shared.component';
import { LoginFormComponent } from "./components/Login-Form.component";
import styles from './Login.module.css';

export const LoginPage = () => {

    return (
        <div className={styles['LoginPage']} >

            <LoginFormComponent>
                <XvbaLogoSharedComp size="3rem"></XvbaLogoSharedComp>

            </LoginFormComponent>
        </div>
    )
}

