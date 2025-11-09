import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import { auth } from '../firebase/firebase.init';
import { GoogleAuthProvider } from "firebase/auth";



const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    // console.log(user) 


    // Create User
    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password)
    }



    //Email-Password Login

    const signInUser = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password)
    }

    //Google Sign In 

    const signInGoogleUser = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider)
    }

    //Log Out

    const signOutUser = () => {
        setLoading(true);
        return signOut(auth)
    }

    // Update User 

    const updateUser = ({ displayName, photoURL }) => {
        return updateProfile(auth.currentUser, { displayName, photoURL })
    }

    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });

        return () => unSubscribe(); // ✅ Proper cleanup
    }, []);

    const authInfo = {
        createUser,
        signInUser,
        signInGoogleUser,
        user,
        updateUser,
        setUser,
        signOutUser,
        loading
    }

    return (
        <AuthContext value={authInfo}>
            {children}
        </AuthContext>
    );
};

export default AuthProvider;