import React, { useState, useEffect } from 'react';
import { loginFirebase, logoutFirebase } from "../../../shared/services/logging";
import styles from "./Login-Form.module.css";
import { CardShared } from '../../../shared/components/Card/Card.shared';
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

let isLogged;
export const LoginFormComponent = (props) => {
    isLogged = useSelector(state => state.auth.isLogged);
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [displayRegister, setDisplayRegister] = useState(false)
    const [hideLogging, setHideLogging] = useState(false)
    const handleDisplayRegister = () => {
        setDisplayRegister(!displayRegister);
        setHideLogging(!hideLogging)

    }
    useEffect(() => {
        props.showLoading(false)

        // eslint-disable-next-line
    }, [isLogged])
    return (
        <div >



            <div style={{ display: !isLogged ? "block" : "none" }}>

                <form className={styles['Login-Form']}>
                    <div style={{ display: !hideLogging ? "block" : "none" }}>
                        <div className={styles['Login-Form-Content']} >
                            {props.children}
                            <p>Login</p>
                            <label htmlFor='user-email'>Email Address: </label>
                            <input id='user-email' type='email' name="email" value={email} onChange={e => setEmail(e.target.value)} ></input>
                            <label htmlFor='user-pass'>Password: </label>
                            <input id='user-pass' type='password' name="password" value={password} onChange={e => setPassword(e.target.value)}></input>
                            <button className={styles['Form-Btn']} type="button" onClick={e => authentication(e)}>Logging</button>
                            <div className={styles['login-or-container']}><span className={styles['login-or']}>Or..</span></div>
                            <div className={styles['login-ext-container']}>
                                <div className={styles['login-btn']}>Logging with your Google </div><img alt="" className={styles['login-btn-logo']} src="./images/google_logo.png" height="20px" ></img > </div>
                            <div className={styles['login-ext-container']}> <div className={styles['login-btn']}>Logging with your Github </div><img alt="" className={styles['login-btn-logo-github']} src="./images/github.png" height="27px" ></img > </div>
                            <div className={styles['register-container']} onClick={e => handleDisplayRegister(e)}><div className={styles['register']}>Create account</div></div>


                        </div>
                    </div>
                    <CreateAccountForm display={displayRegister} toggleLogin={e => handleDisplayRegister(e)}>
                        {props.children}
                    </CreateAccountForm>
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
        props.showLoading(true)
        e.preventDefault();
        await loginFirebase(email, password, dispatch);

    }

    async function signout(e) {
        e.preventDefault();
        await logoutFirebase(dispatch);

    }

}

const CreateAccountForm = (props) => {

    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repassword, setRePassword] = useState('');

    return (
        <form style={{ display: props.display ? "block" : "none" }} className={styles['Login-Form']}>
            <div className={styles['Login-Form-Content']} >
                {props.children}
                <p>Create Account</p>
                <label htmlFor='user-email'>Email Address: </label>
                <input id='user-email' type='email' name="email" value={email} onChange={e => setEmail(e.target.value)} ></input>
                <label htmlFor='user-pass'>Password: </label>
                <input id='user-pass' type='password' name="password" value={password} onChange={e => setPassword(e.target.value)}></input>
                <label htmlFor='user-pass'>Confirm password: </label>
                <input id='user-pass' type='password' name="password" value={repassword} onChange={e => setRePassword(e.target.value)}></input>
                <button className={styles['Form-Btn']} type="button" onClick={e => register(e)}>Create Account</button>
                <div className={styles['register-container']} onClick={e => props.toggleLogin(e)}><div className={styles['register']}>Back to logging</div></div>

            </div>

        </form>)

    async function register(e) {
        props.showLoading(true)
        e.preventDefault();
        await loginFirebase(email, password, dispatch);

    }
}