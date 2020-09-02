import React, { useState } from 'react';
import FirebaseService from "../../../shared/services/loggin.service";
import styles from "./Login-Form.module.css";
import { CardShared } from '../../../shared/components/Card/Card.shared'
import { login,logout} from "./authenticationSlice";
import {  useDispatch,useSelector} from "react-redux";

let dispatch;
let isLogged;
export const LoginFormComponent = (props) => {
    isLogged = useSelector(state=>state.auth.isLogged);
    dispatch = useDispatch();
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
                    <button className={styles['Form-Logout-Btn']} type="submit" onClick={e => sginout(e)}>Logout</button>
                </CardShared>

            </div>
        </div>

    )

    async function authentication(e) {
        e.preventDefault();
        try {

            await FirebaseService.login(email, password);
            dispatch(login())

        } catch (error) {

        }
    }

    async function sginout(e) {
        e.preventDefault();
        try {
            await FirebaseService.logout();
        
        } catch (error) {
            console.error(error.message);
        }

    }

}