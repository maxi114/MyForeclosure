import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, sendPasswordResetEmail, signOut } from 'firebase/auth';
import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAt2sfTBWtTxSi6RNPnXQoBhc23ORiygZk",
    authDomain: "myforeclosure-21a0e.firebaseapp.com",
    projectId: "myforeclosure-21a0e",
    storageBucket: "myforeclosure-21a0e.appspot.com",
    messagingSenderId: "365708327473",
    appId: "1:365708327473:web:83c43120dc074915697310",
    measurementId: "G-B4EKFWX9WG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

async function login(email, password) {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Fetch additional user data from Firestore
    const userDoc = await getDoc(doc(db, "users", user.uid));
    if (userDoc.exists()) {
      return { ...user, ...userDoc.data() };
    } else {
      throw new Error('User data not found');
    }
  } catch (error) {
    throw new Error('Email or Password is incorrect');
  }
}

async function register(firstname, lastname, email, password, role) {
  try {
    // Validate role
    const validRoles = ['Homeowner', 'Attorney', 'Investor', 'Realtor'];
    if (!validRoles.includes(role)) {
      throw new Error('Invalid role. Must be one of: ' + validRoles.join(', '));
    }

    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Store additional user info in Firestore
    console.log("Storing user info in Firestore:", { firstname, lastname, email, role });
    await setDoc(doc(db, "users", user.uid), {
      firstName: firstname,
      lastName: lastname,
      email: email,
      role: role,
      createdAt: new Date().toISOString()
    });
    
    return user;
  } catch (error) {
    console.error('Registration error:', error);
    throw new Error('Registration failed: ' + error.message);
  }
}

async function forgotPassword(email) {
  try {
    await sendPasswordResetEmail(auth, email);
    return "We've sent you a link to reset password to your registered email.";
  } catch (error) {
    throw new Error('Sorry, we could not find any registered user with entered email');
  }
}

async function logout() {
  try {
      await signOut(auth);
  } catch (error) {
      throw new Error('Logout failed: ' + error.message);
  }
}

// Single consolidated export
export { auth, db, storage, app, login, logout, register, forgotPassword };
