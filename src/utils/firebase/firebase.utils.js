// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
    getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider
} from 'firebase/auth';
import {
    getFirestore,
    doc,
    getDoc,
    setDoc,
} from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAqE3SFKfspVQqtqxBpvtkymOH6MpxJCvM",
    authDomain: "shree-clothing-db.firebaseapp.com",
    projectId: "shree-clothing-db",
    storageBucket: "shree-clothing-db.appspot.com",
    messagingSenderId: "684426809973",
    appId: "1:684426809973:web:1b53e1ae70aaee35ee5e3c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.getCustomParameters({
    prompt: "select_account",
})

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
export const db = getFirestore();

export const createUserDocFromAuth = async (userAuth) => {
    const userDocRef = doc(db, 'users', userAuth.uid);

    const userSnapshopt = await getDoc(userDocRef);

    if (!userSnapshopt.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();
        try{
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt
            })
        }catch(error){
            console.log("Error::User not created", error.message);
        }
    }
    return userDocRef;
}
