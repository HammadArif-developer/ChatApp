import React from 'react';
import './Login.css';
import { Button } from '@material-ui/core';
import { auth, provider } from './firebase';
import { useStateValue } from './StateProvider';
import { actionTypes } from './Reducer';
export default function Login() {
    const [{}, dispatch] = useStateValue();
    const signIn = () => {
        auth.signInWithPopup(provider).then(result => {
            dispatch({
                type: actionTypes.SET_USER,
                user: result.user
            })
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
