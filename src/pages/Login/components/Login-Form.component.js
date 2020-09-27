import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { loginFirebase, logoutFirebase, createAccount } from "../../../shared/services/logging";
import styles from "./Login-Form.module.css";
import { CardShared } from '../../../shared/components/Card/Card.shared';
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import ReactGA from 'react-ga';

let isLogged;
export const LoginFormComponent = (props) => {
    isLogged = useSelector(state => state.auth.isLogged);
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [displayRegister, setDisplayRegister] = useState(false)
    const [hideLogging, setHideLogging] = useState(false)
    const [loggingStatus, setLoggingStatus] = useState({});
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
                            <p>Sign in<small className={styles['error']} style={{ display: loggingStatus?.status === false ? "block" : "none" }}>{loggingStatus?.error?.message || ""}</small></p>
                            <label htmlFor='user-email'>Email Address: </label>
                            <input id='user-email' type='email' name="email" value={email} onChange={e => setEmail(e.target.value)} ></input>
                            <label htmlFor='user-pass'>Password: </label>
                            <input id='user-pass' type='password' name="password" value={password} onChange={e => setPassword(e.target.value)}></input>
                            <button className={styles['Form-Btn']} type="button" onClick={e => authentication(e)}>Sign in</button>
                            <div className={styles['login-or-container']}><span className={styles['login-or']}>Or..</span></div>
                            <div className={styles['login-ext-container']}>
                                <div className={styles['login-btn']}>Sign in with your Google </div><img alt="" className={styles['login-btn-logo']} src="./images/google_logo.png" height="20px" ></img > </div>
                            <div className={styles['login-ext-container']}> <div className={styles['login-btn']}>Sign in with your Github </div><img alt="" className={styles['login-btn-logo-github']} src="./images/github.png" height="27px" ></img > </div>
                            <div className={styles['register-container']} onClick={e => handleDisplayRegister(e)}><div className={styles['register']}>Create account</div></div>


                        </div>
                    </div>
                    <CreateAccountForm showLoading={props.showLoading} display={displayRegister} toggleLogin={e => handleDisplayRegister(e)}>
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
        setLoggingStatus({})
        props.showLoading(true)
        e.preventDefault();
        const response = await loginFirebase(email, password, dispatch);
        setLoggingStatus(response)
        props.showLoading(false)
        ReactGA.event({
            category: 'User',
            action: 'Login'
          });

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
    const [nickname, setNickname] = useState('');

    return (
        <div style={{ display: props.display ? "block" : "none" }} className={styles['Login-Form']}>
            <div className={styles['Login-Form-Content']} >
                {props.children}
                <p>Create Account</p>

                <label htmlFor='user-email'>Email Address: </label>
                <input id='user-email' type='email' name="email" value={email} onChange={e => setEmail(e.target.value)} ></input>
                <label htmlFor='user-nickname'>NickName: </label>
                <input id='user-nickname' type='text' name="nickname" value={nickname} onChange={e => setNickname(e.target.value)} ></input>
                <label htmlFor='user-pass'>Password: </label>
                <input id='user-pass' type='password' name="password" value={password} onChange={e => setPassword(e.target.value)}></input>
                <label htmlFor='user-pass'>Confirm password: </label>
                <input id='user-pass' type='password' name="password" value={repassword} onChange={e => setRePassword(e.target.value)}></input>
                <div className={styles['Terms']}>
                <span style={{fontSize:"10px"}}>Wen you create an Account you confirm that agree with Terms and conditions for usage this website xvba.dev</span><br/>
                <span><Link to="/terms">See Terms and Condition</Link></span>
                </div>
                <button className={styles['Form-Btn']} type="button" onClick={e => register()}>Create Account</button>
                <div className={styles['register-container']} onClick={e => props.toggleLogin()}><div className={styles['register-back']}>Back to logging</div></div>

            </div>

        </div>)

    async function register() {
        props.showLoading(true)
        const postData = { email: email, nickname: nickname, password: password, repassword: repassword };
        await createAccount(postData, dispatch);
        props.showLoading(false)
        ReactGA.event({
            category: 'User',
            action: 'Created an Account'
          });

    }
}