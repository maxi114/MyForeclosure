'use client';

import {createContext, useContext, useState, useEffect } from 'react';
import authApi from '../api/auth/route';
import { onAuthStateChanged } from 'firebase/auth';


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

export function AuthProvider({ children }) {
    
    // firebase auth functions
    const [user, setUser] = useState(null);
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(authApi, (user) => {
            setUser(user);
        });
        return () => unsubscribe();
    }, []);

    return(
        <AuthContext.Provider value={{ user, isAuthenticated: Boolean(user), }}>
            {children}
        </AuthContext.Provider>
    );
}

export { AuthContext };