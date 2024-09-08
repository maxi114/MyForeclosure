'use client';
import { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';
import { signOut } from 'firebase/auth';
// import ProfileService from '../api/profile/route';

// const AuthContext = createContext({});
const AuthContext = createContext(null);

// // To initialize firebase auth replace the current saveSession and removeSession functions with firebase auth functions
// // use firebase auth functions to get the user and set the user state - onAuthStateChanged listener to keep track of the user authentification state

export function AuthProvider({ children }) {
    // firebase auth functions
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
            if (firebaseUser) {
                const userDocRef = doc(db, "users", firebaseUser.uid);
                const userDoc = await getDoc(userDocRef);
                if (userDoc.exists()) {
                    setUser({ ...firebaseUser, ...userDoc.data() });
                } else {
                    setUser(firebaseUser);
                }
            } else {
                setUser(null);
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const logout = async () => {
        await signOut(auth);
        setUser(null);
    };

    const value = useMemo(() => {
        console.log('AuthContext value:', { user, loading, setUser, isAuthenticated: !!user, logout });
        return {
            user,
            loading,
            setUser,
            isAuthenticated: !!user,
            logout
        };
    }, [user, loading]);

    return(
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuthContext() {
    const context = useContext(AuthContext);
    if (context === null) {
        throw new Error('useAuthContext must be used within an AuthProvider');
    }
    return context;
}


export { AuthContext };