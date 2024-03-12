import React from "react";
import { useState } from "react";
import {
    createAuthUserWithEmailandPassword,
    createUserDocFromAuth,

} from "../../utils/firebase/firebase.utils";

const defualtFormField = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
}

const Signup = () => {

    const [formFields, setFormField] = useState(defualtFormField);
    const { displayName, email, password, confirmPassword } = formFields;

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormField({ ...formFields, [name]: value })
    }


    const resetFormFields = ()=>{
        setFormField(defualtFormField);
    }

    const handleSubmit = async (event) => {

        event.preventDefault();

        if (password !== confirmPassword) {
            alert('Password Do not Match');
            return;
        }

        try {
            const { user } = await createAuthUserWithEmailandPassword(email, password);

            await createUserDocFromAuth(user, { displayName });
            resetFormFields();

        } catch (error) {
            if(error.code === 'auth/email-already-in-use'){
                alert('Can not create user. Email already exists');
                return;
            }
            else if(error.code === 'auth/weak-password'){
                alert('Password Length Must be 6 characters');
                return;
            }
            else{
                console.log('Error: User Creation',error);
            }
        }
    }

    return (
        <div>
            <h1>Signup with your Email & Password</h1>
            <form>
                <label>Display Name</label>
                <input type="text" name="displayName" value={displayName} onChange={handleChange} required />
                <label>Email</label>
                <input type="email" name="email" value={email} onChange={handleChange} required />
                <label>Password</label>
                <input type="password" name="password" value={password} onChange={handleChange} required />
                <label>Confirm Password</label>
                <input type="password" name="confirmPassword" value={confirmPassword} onChange={handleChange} required />
                <button type="submit" onClick={handleSubmit}>Signup</button>
            </form>
        </div>
    )
}
export default Signup;