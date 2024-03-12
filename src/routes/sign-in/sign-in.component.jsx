import React from "react";
import { signInWithGooglePopup, createUserDocFromAuth } from '../../utils/firebase/firebase.utils'
import Signup from "../../components/signup/signup.component";

const SignIn = () => {
    const logGoogleUser = async () => {
        const { user } = await signInWithGooglePopup();
        const userDocRef = await createUserDocFromAuth(user);
    }
    return (
        <div>
            <h1>Sign-in</h1>
            <button onClick={logGoogleUser}>Sign In With Google Popup</button>
            <Signup/>
        </div>
    )
}
export default SignIn;