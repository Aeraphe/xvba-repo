import React from 'react';
//import { firebaseLoginService } from "../../../shared/services/loggin.service";
import styles from "./Login-Form.module.css";
import {CardShared} from '../../../shared/components/Card/Card.shared'

export const LoginFormComponent = (props) => {
    let loggin = false;

    return (
        <div>
            <div style={{ display: !loggin ? "block" : "none" }}>
                <form className={styles['Login-Form']}>
                    <div className={styles['Login-Form-Content']} >
                        {props.children}
                        <p>Login</p>
                        <label for='user-email'>e-mail: </label>
                        <input id='user-email' type='email' ></input>
                        <label for='user-pass'>password: </label>
                        <input id='user-pass' type='password'></input>
                        <button className={styles['Form-Btn']} type='submit'>Login</button>
                    </div>
                </form>
            </div>
            <div style={{ display: loggin ? "block" : "none" }}>
                <CardShared height="180px" width="250px">
                {props.children}
                <button className={styles['Form-Logout-Btn']} type="button">Logout</button>
                </CardShared>
                
            </div>
        </div>

    )
}