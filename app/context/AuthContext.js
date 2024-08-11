'use client';

//import {createContext, useContext, useState, useEffect } from 'react;
//import { auth } from '@/app/firebase; 
//import { onAuthStateChanged } from 'firebase/auth';

import { createContext, useContext, useState, useCallback } from 'react';

const AuthContext = createContext({});

export function useAuthContext() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuthContext must be used within an AuthProvider');
    }
    return context;
}


// To initialize firebase auth replace the current saveSession and removeSession functions with firebase auth functions
// use firebase auth functions to get the user and set the user state - onAuthStateChanged listener to keep track of the user authentification state

const authSessionKey = '_HYPER_AUTH'; //remove when firebase auth is implemented

export function AuthProvider({ children }) {
    
    //firebase auth functions
    //const [user, setUser] = useState(null);
    // useEffect(() => {
    //     const unsubscribe = onAuthStateChanged(auth, (user) => {
    //         setUser(user);
    //     });
    //     return () => unsubscribe();
    // }, []);

    // return(
    //     <AuthContext.Provider value={{ user, isAuthenticated: Boolean(user), }}>
    //         {children}
    //     </AuthContext.Provider>
    // );

    const [user, setUser] = useState(
        typeof window !== 'undefined' && localStorage.getItem(authSessionKey)
        ? JSON.parse(localStorage.getItem(authSessionKey) || '{}')
        : undefined
    );

    const saveSession = useCallback((user) => {
        if (typeof window !== 'undefined') {
            localStorage.setItem(authSessionKey, JSON.stringify(user));
        }
        setUser(user);
    }, [setUser]);

    const removeSession = useCallback(() => {
        if (typeof window !== 'undefined') {
            localStorage.removeItem(authSessionKey);
        }
        setUser(undefined);
    }, [setUser]);

    return (
        <AuthContext.Provider value={{ user, isAuthenticated: Boolean(user), saveSession, removeSession }}>
            {children}
        </AuthContext.Provider>
    );    
}

export { AuthContext };