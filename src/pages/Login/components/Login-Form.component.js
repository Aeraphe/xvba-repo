import React, { useState } from 'react';
import { loginFirebase, logoutFirebase } from "../../../shared/services/logging";
import styles from "./Login-Form.module.css";
import { CardShared } from '../../../shared/components/Card/Card.shared'
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

let isLogged;
export const LoginFormComponent = (props) => {
    isLogged = useSelector(state => state.auth.isLogged);
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    return (
        <div>
            <div style={{ display: !isLogged ? "block" : "none" }}>
                <form className={styles['Login-Form']}>
                    <div className={styles['Login-Form-Content']} >
                        {props.children}
                        <p>Login</p>
                        <label htmlFor='user-email'>Email Address: </label>
                        <input id='user-email' type='email' name="email" value={email} onChange={e => setEmail(e.target.value)} ></input>
                        <label htmlFor='user-pass'>password: </label>
                        <input id='user-pass' type='password' name="password" value={password} onChange={e => setPassword(e.target.value)}></input>
                        <button className={styles['Form-Btn']} type="button" onClick={e => authentication(e)}>Login</button>
                    </div>
                </form>
            </div>
            <div style={{ display: isLogged ? "block" : "none" }}>
                <CardShared height="180px" width="250px">
                    {props.children}
                    <button className={styles['Form-Logout-Btn']} type="submit" onClick={e => signout(e)}>Logout</button>
                </CardShared>

            </div>
        </div>

    )

    async function authentication(e) {
        e.preventDefault();
        await loginFirebase(email, password, dispatch);
    }

    async function signout(e) {
        e.preventDefault();
        await logoutFirebase(dispatch);

    }

}