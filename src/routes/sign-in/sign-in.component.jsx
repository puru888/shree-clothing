import React from "react";
import { signInWithGooglePopup, createUserDocFromAuth } from '../../utils/firebase/firebase.utils'

const SignIn = () => {
    const logGoogleUser = async () => {
        const { user } = await signInWithGooglePopup();
        const userDocRef = await createUserDocFromAuth(user);
    }
    return (
        <div>
            <h1>Sign-in</h1>
            <button onClick={logGoogleUser}>Sign In With Google Popup</button>
        </div>
    )
}
export default SignIn;