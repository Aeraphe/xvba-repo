import React from 'react';
//import { firebaseLoginService } from "../../../shared/services/loggin.service";
import styles from "./Login-Form.module.css";

export const LoginFormComponent = (props) => {
    return (
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
    )
}