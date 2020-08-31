import React from 'react';
import { auth } from 'firebase';


export const LoginPage = () => {

    return (
        <div>
            <LoginComp></LoginComp>
        </div>
    )
}

const LoginComp = () => {

    const log = () => {
        let authFire = auth().signInWithEmailAndPassword('alberto.aeraph@gmail.com', 'yuri123#$');
        console.log(authFire);
    }
    return (
        <div>
            {log()}
        </div>
    )
}