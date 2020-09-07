import React from 'react';
import './Login.css';
import { Button } from '@material-ui/core';
import { auth, provider } from './firebase';
export default function Login() {
    const signIn = () => {
        auth.signInWithPopup(provider).then(result => {
            console.log(result)
        }).catch((error) => alert(error.message));
    };
    return (
        <div className="login">
            <div className="loginContainer">
                <div className="loginText">
                    <h1>Sign In to ChatApp</h1>
                </div>
                <Button onClick={signIn}>Sign In with Google</Button>
            </div>
        </div>
    )
}
