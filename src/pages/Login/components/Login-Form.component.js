import React, { useState } from 'react';
import FirebaseService from "../../../shared/services/loggin.service";
import styles from "./Login-Form.module.css";
import { CardShared } from '../../../shared/components/Card/Card.shared'

export const LoginFormComponent = (props) => {
    const [loginStatus, setLoginStatus] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    return (
        <div>
            <div style={{ display: !loginStatus ? "block" : "none" }}>
                <form className={styles['Login-Form']}>
                    <div className={styles['Login-Form-Content']} >
                        {props.children}
                        <p>Login</p>
                        <label htmlFor='user-email'>Email Address: </label>
                        <input id='user-email' type='email' name="email" value={email} onChange={e => setEmail(e.target.value)} ></input>
                        <label htmlFor='user-pass'>password: </label>
                        <input id='user-pass' type='password' name="password" value={password} onChange={e => setPassword(e.target.value)}></input>
                        <button className={styles['Form-Btn']} type="button" onClick={e => login(e)}>Login</button>
                    </div>
                </form>
            </div>
            <div style={{ display: loginStatus ? "block" : "none" }}>
                <CardShared height="180px" width="250px">
                    {props.children}
                    <button className={styles['Form-Logout-Btn']} type="submit" onClick={e => logout(e)}>Logout</button>
                </CardShared>

            </div>
        </div>

    )

    async function login(e) {
        e.preventDefault();
        try {

            await FirebaseService.login(email, password);
            setLoginStatus(true);

        } catch (error) {
            setLoginStatus(false);
        }
    }

    async function logout(e) {
        e.preventDefault();
        try {
            await FirebaseService.logout();
            setLoginStatus(false);
        } catch (error) {
            console.error(error.message);
        }

    }

}